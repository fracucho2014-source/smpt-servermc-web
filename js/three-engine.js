/* ============================================
   THREE.JS ENGINE - SMPT 10-17
   Motor de animaciones 2D con THREE.js
   ============================================ */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('THREE.js no cargado. El motor de animaciones no iniciará.');
    return;
  }

  /* ===== SMPTEngine ===== */
  class SMPTEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.particles = [];
      this.shapes = [];
      this.time = 0;
      this.isMobile = window.innerWidth <= 768;

      this.init();
    }

    init() {
      /* Scene */
      this.scene = new THREE.Scene();

      /* Camera - Orthographic for 2D */
      const aspect = this.width / this.height;
      const frustumHeight = this.height;
      const frustumWidth = frustumHeight * aspect;
      this.camera = new THREE.OrthographicCamera(
        -frustumWidth / 2, frustumWidth / 2,
        frustumHeight / 2, -frustumHeight / 2,
        0.1, 1000
      );
      this.camera.position.z = 100;

      /* Renderer */
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
      });
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);

      /* Create layers */
      this.createBackgroundMesh();
      if (!this.isMobile) {
        this.createParticleField(120);
        this.createFloatingShapes(18);
        this.createGlowOrbs(6);
        this.createGridLines();
      } else {
        this.createParticleField(40);
        this.createFloatingShapes(8);
      }

      /* Events */
      this.bindEvents();

      /* Start */
      this.animate();
    }

    /* ---- Background gradient mesh ---- */
    createBackgroundMesh() {
      const geo = new THREE.PlaneGeometry(this.width * 2, this.height * 2, 1, 1);
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uResolution: { value: new THREE.Vector2(this.width, this.height) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float t = uTime * 0.3;

            /* Color blobs that move with mouse */
            vec2 p1 = vec2(0.2 + sin(t * 0.7) * 0.1 + uMouse.x * 0.15,
                            0.5 + cos(t * 0.5) * 0.1 + uMouse.y * 0.1);
            vec2 p2 = vec2(0.8 + cos(t * 0.6) * 0.1 + uMouse.x * -0.1,
                            0.3 + sin(t * 0.8) * 0.1 + uMouse.y * -0.1);
            vec2 p3 = vec2(0.5 + sin(t * 0.4) * 0.15,
                            0.8 + cos(t * 0.6) * 0.1 + uMouse.y * 0.05);
            vec2 p4 = vec2(0.3 + cos(t * 0.5) * 0.12,
                            0.2 + sin(t * 0.7) * 0.08);

            float d1 = length(uv - p1);
            float d2 = length(uv - p2);
            float d3 = length(uv - p3);
            float d4 = length(uv - p4);

            vec3 purple = vec3(0.424, 0.361, 0.906);
            vec3 cyan = vec3(0.0, 0.8, 0.788);
            vec3 pink = vec3(0.992, 0.475, 0.659);
            vec3 lavender = vec3(0.635, 0.608, 0.996);

            vec3 col = vec3(0.039, 0.039, 0.102);
            col += purple * exp(-d1 * d1 * 8.0) * 0.35;
            col += cyan * exp(-d2 * d2 * 10.0) * 0.25;
            col += pink * exp(-d3 * d3 * 9.0) * 0.2;
            col += lavender * exp(-d4 * d4 * 12.0) * 0.15;

            gl_FragColor = vec4(col, 0.95);
          }
        `,
        depthWrite: false,
      });
      this.bgMesh = new THREE.Mesh(geo, mat);
      this.bgMesh.position.z = -50;
      this.scene.add(this.bgMesh);
    }

    /* ---- Particle field ---- */
    createParticleField(count) {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const velocities = [];

      const palette = [
        [0.424, 0.361, 0.906],
        [0.0, 0.8, 0.788],
        [0.992, 0.475, 0.659],
        [0.635, 0.608, 0.996],
        [0.506, 0.863, 0.925],
      ];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * this.width * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * this.height * 2;
        positions[i * 3 + 2] = Math.random() * 50 - 25;

        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c[0];
        colors[i * 3 + 1] = c[1];
        colors[i * 3 + 2] = c[2];

        sizes[i] = Math.random() * 4 + 1;

        velocities.push({
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.2,
        });
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vAlpha;
          uniform float uTime;
          uniform float uPixelRatio;

          void main() {
            vColor = color;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            float pulse = sin(uTime * 2.0 + position.x * 0.01 + position.y * 0.01) * 0.3 + 0.7;
            vAlpha = pulse;
            gl_PointSize = size * uPixelRatio * pulse * (100.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float glow = 1.0 - smoothstep(0.0, 0.5, d);
            glow = pow(glow, 1.5);
            gl_FragColor = vec4(vColor, glow * vAlpha * 0.6);
          }
        `,
      });

      this.particleSystem = new THREE.Points(geo, mat);
      this.particleVelocities = velocities;
      this.scene.add(this.particleSystem);
    }

    /* ---- Floating geometric shapes ---- */
    createFloatingShapes(count) {
      const shapeTypes = ['hexagon', 'diamond', 'ring', 'triangle'];
      const palette = [
        0x6c5ce7, 0x00cec9, 0xfd79a8, 0xa29bfe, 0x81ecec, 0xfab1a0,
      ];

      for (let i = 0; i < count; i++) {
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const color = palette[Math.floor(Math.random() * palette.length)];
        const size = Math.random() * 30 + 10;

        let geo;
        if (type === 'hexagon') {
          geo = new THREE.CircleGeometry(size, 6);
        } else if (type === 'diamond') {
          const shape = new THREE.Shape();
          shape.moveTo(0, size);
          shape.lineTo(size * 0.6, 0);
          shape.lineTo(0, -size);
          shape.lineTo(-size * 0.6, 0);
          shape.closePath();
          geo = new THREE.ShapeGeometry(shape);
        } else if (type === 'ring') {
          geo = new THREE.RingGeometry(size * 0.6, size, 32);
        } else {
          const shape = new THREE.Shape();
          shape.moveTo(0, size);
          shape.lineTo(-size * 0.87, -size * 0.5);
          shape.lineTo(size * 0.87, -size * 0.5);
          shape.closePath();
          geo = new THREE.ShapeGeometry(shape);
        }

        const mat = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.08 + Math.random() * 0.08,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * this.width * 1.8,
          (Math.random() - 0.5) * this.height * 1.8,
          Math.random() * 30 - 15
        );
        mesh.rotation.z = Math.random() * Math.PI * 2;

        this.scene.add(mesh);
        this.shapes.push({
          mesh: mesh,
          baseX: mesh.position.x,
          baseY: mesh.position.y,
          rotSpeed: (Math.random() - 0.5) * 0.005,
          floatSpeed: Math.random() * 0.5 + 0.3,
          floatAmplitude: Math.random() * 20 + 10,
          phase: Math.random() * Math.PI * 2,
          mouseInfluence: Math.random() * 15 + 5,
        });
      }
    }

    /* ---- Glow orbs ---- */
    createGlowOrbs(count) {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 100 + 50;
        const geo = new THREE.CircleGeometry(size, 32);
        const mat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uColor: {
              value: new THREE.Vector3(
                0.2 + Math.random() * 0.3,
                0.3 + Math.random() * 0.4,
                0.7 + Math.random() * 0.3
              ),
            },
            uTime: { value: 0 },
            uPhase: { value: Math.random() * Math.PI * 2 },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 uColor;
            uniform float uTime;
            uniform float uPhase;
            varying vec2 vUv;

            void main() {
              float d = length(vUv - vec2(0.5)) * 2.0;
              float glow = exp(-d * d * 2.0);
              float pulse = sin(uTime * 0.8 + uPhase) * 0.3 + 0.7;
              gl_FragColor = vec4(uColor, glow * pulse * 0.15);
            }
          `,
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * this.width * 1.5,
          (Math.random() - 0.5) * this.height * 1.5,
          -30 + Math.random() * 10
        );

        this.scene.add(mesh);
        this.shapes.push({
          mesh: mesh,
          baseX: mesh.position.x,
          baseY: mesh.position.y,
          rotSpeed: 0,
          floatSpeed: Math.random() * 0.3 + 0.1,
          floatAmplitude: Math.random() * 40 + 20,
          phase: Math.random() * Math.PI * 2,
          mouseInfluence: Math.random() * 30 + 10,
        });
      }
    }

    /* ---- Grid lines ---- */
    createGridLines() {
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x6c5ce7,
        transparent: true,
        opacity: 0.03,
        blending: THREE.AdditiveBlending,
      });

      const step = 120;
      const halfW = this.width;
      const halfH = this.height;

      /* Vertical lines */
      for (let x = -halfW; x <= halfW; x += step) {
        const points = [
          new THREE.Vector3(x, -halfH, -40),
          new THREE.Vector3(x, halfH, -40),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        this.scene.add(new THREE.Line(geo, lineMat));
      }

      /* Horizontal lines */
      for (let y = -halfH; y <= halfH; y += step) {
        const points = [
          new THREE.Vector3(-halfW, y, -40),
          new THREE.Vector3(halfW, y, -40),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        this.scene.add(new THREE.Line(geo, lineMat));
      }
    }

    /* ---- Events ---- */
    bindEvents() {
      window.addEventListener('mousemove', (e) => {
        this.mouse.targetX = (e.clientX / this.width) * 2 - 1;
        this.mouse.targetY = -(e.clientY / this.height) * 2 + 1;
      });

      window.addEventListener('resize', () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.isMobile = window.innerWidth <= 768;

        const aspect = this.width / this.height;
        const frustumHeight = this.height;
        const frustumWidth = frustumHeight * aspect;

        this.camera.left = -frustumWidth / 2;
        this.camera.right = frustumWidth / 2;
        this.camera.top = frustumHeight / 2;
        this.camera.bottom = -frustumHeight / 2;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);
      });
    }

    /* ---- Update particles ---- */
    updateParticles(dt) {
      if (!this.particleSystem) return;

      const pos = this.particleSystem.geometry.attributes.position.array;
      const count = this.particleVelocities.length;

      for (let i = 0; i < count; i++) {
        const v = this.particleVelocities[i];
        const ix = i * 3;
        const iy = i * 3 + 1;

        pos[ix] += v.x + Math.sin(this.time * v.speed + v.phase) * 0.2;
        pos[iy] += v.y + Math.cos(this.time * v.speed + v.phase) * 0.2;

        /* Mouse repulsion */
        if (!this.isMobile) {
          const mouseWorldX = this.mouse.x * this.width;
          const mouseWorldY = this.mouse.y * this.height;
          const dx = pos[ix] - mouseWorldX;
          const dy = pos[iy] - mouseWorldY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200 * 0.8;
            pos[ix] += (dx / dist) * force;
            pos[iy] += (dy / dist) * force;
          }
        }

        /* Wrap around */
        const halfW = this.width;
        const halfH = this.height;
        if (pos[ix] > halfW) pos[ix] = -halfW;
        if (pos[ix] < -halfW) pos[ix] = halfW;
        if (pos[iy] > halfH) pos[iy] = -halfH;
        if (pos[iy] < -halfH) pos[iy] = halfH;
      }

      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    /* ---- Update shapes ---- */
    updateShapes(dt) {
      this.shapes.forEach((s) => {
        s.mesh.rotation.z += s.rotSpeed;
        s.mesh.position.y =
          s.baseY + Math.sin(this.time * s.floatSpeed + s.phase) * s.floatAmplitude;
        s.mesh.position.x =
          s.baseX + Math.cos(this.time * s.floatSpeed * 0.7 + s.phase) * s.floatAmplitude * 0.5;

        /* Mouse influence */
        if (!this.isMobile) {
          s.mesh.position.x += this.mouse.x * s.mouseInfluence;
          s.mesh.position.y += this.mouse.y * s.mouseInfluence;
        }
      });
    }

    /* ---- Update background shader ---- */
    updateBackground() {
      if (!this.bgMesh) return;
      this.bgMesh.material.uniforms.uTime.value = this.time;
      this.bgMesh.material.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);
    }

    /* ---- Update particle shader ---- */
    updateParticleShader() {
      if (!this.particleSystem) return;
      this.particleSystem.material.uniforms.uTime.value = this.time;
    }

    /* ---- Animation loop ---- */
    animate() {
      requestAnimationFrame(() => this.animate());

      const dt = 0.016;
      this.time += dt;

      /* Smooth mouse */
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

      this.updateBackground();
      this.updateParticleShader();
      this.updateParticles(dt);
      this.updateShapes(dt);

      this.renderer.render(this.scene, this.camera);
    }

    /* ---- Public: destroy ---- */
    destroy() {
      this.renderer.dispose();
      this.scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    }
  }

  /* ===== Initialize ===== */
  function initEngine() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas) return;
    window.smpEngine = new SMPTEngine('threeCanvas');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEngine);
  } else {
    initEngine();
  }

})();
