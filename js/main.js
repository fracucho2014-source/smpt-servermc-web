/* ============================================
   MAIN - SMPT 10-17
   Navegación, animaciones, interactividad
   ============================================ */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');
  const allSections = document.querySelectorAll('.section');
  const navAnchors = document.querySelectorAll('[data-section]');

  /* ===== LANGUAGE SWITCHER ===== */
  var langSwitcher = document.getElementById('langSwitcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', function () {
      var current = (typeof I18n !== 'undefined' && I18n.getLang) ? I18n.getLang() : 'es';
      var next = current === 'es' ? 'en' : 'es';
      if (typeof I18n !== 'undefined' && I18n.switchLang) {
        I18n.switchLang(next);
      }
    });
  }

  /* ===== HAMBURGER MENU ===== */
  navToggle.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ===== NAVEGACIÓN POR SECCIONES ===== */
  function navigateTo(sectionId) {
    allSections.forEach(function (sec) {
      sec.classList.remove('active');
    });

    const target = document.getElementById('sec-' + sectionId);
    if (target) {
      target.classList.add('active');
    }

    navAnchors.forEach(function (a) {
      a.classList.remove('active');
      if (a.getAttribute('data-section') === sectionId) {
        a.classList.add('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navAnchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      if (section) navigateTo(section);
    });
  });

  /* ===== SCROLL INDICATOR ===== */
  var scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
      navigateTo('que-es');
    });
  }

  /* ===== COPY IP ===== */
  var copyBtn = document.getElementById('copyIP');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var ip = document.getElementById('ipAddress');
      if (!ip) return;
      var text = ip.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showCopied(copyBtn);
        }).catch(function () {
          fallbackCopy(text, copyBtn);
        });
      } else {
        fallbackCopy(text, copyBtn);
      }
    });
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function showCopied(btn) {
    btn.classList.add('copied');
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
    setTimeout(function () {
      btn.classList.remove('copied');
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    }, 2000);
  }

  /* ===== DISCORD MODAL ===== */
  var discordModal = document.getElementById('discordModal');
  var openDiscordBtn = document.getElementById('openDiscordModal');
  var closeDiscordBtn = document.getElementById('closeDiscordModal');
  var copyDiscordBtn = document.getElementById('copyDiscord');

  if (openDiscordBtn && discordModal) {
    openDiscordBtn.addEventListener('click', function () {
      discordModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeDiscordModal() {
    if (discordModal) {
      discordModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeDiscordBtn) {
    closeDiscordBtn.addEventListener('click', closeDiscordModal);
  }

  if (discordModal) {
    discordModal.addEventListener('click', function (e) {
      if (e.target === discordModal) closeDiscordModal();
    });
  }

  if (copyDiscordBtn) {
    copyDiscordBtn.addEventListener('click', function () {
      var link = document.getElementById('discordLink');
      if (!link) return;
      var text = link.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showCopied(copyDiscordBtn);
        }).catch(function () {
          fallbackCopy(text, copyDiscordBtn);
        });
      } else {
        fallbackCopy(text, copyDiscordBtn);
      }
    });
  }

  /* ===== MODS INFO MODAL ===== */
  var modsInfoModal = document.getElementById('modsInfoModal');
  var openModsInfoBtn = document.getElementById('modsInfoBtn');
  var closeModsInfoBtn = document.getElementById('closeModsInfoModal');

  if (openModsInfoBtn && modsInfoModal) {
    openModsInfoBtn.addEventListener('click', function () {
      modsInfoModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModsInfoModal() {
    if (modsInfoModal) {
      modsInfoModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeModsInfoBtn) {
    closeModsInfoBtn.addEventListener('click', closeModsInfoModal);
  }

  if (modsInfoModal) {
    modsInfoModal.addEventListener('click', function (e) {
      if (e.target === modsInfoModal) closeModsInfoModal();
    });
  }

  /* ===== GO TO STEP 3 ===== */
  var goToStep3Btn = document.getElementById('goToComoFunciona');
  if (goToStep3Btn) {
    goToStep3Btn.addEventListener('click', function () {
      closeModsInfoModal();
      setTimeout(function () {
        navigateTo('como-funciona');
        setTimeout(function () {
          var steps = document.querySelectorAll('#sec-como-funciona .step');
          if (steps[2]) {
            steps[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
            steps[2].classList.add('highlight');
            setTimeout(function () {
              steps[2].classList.remove('highlight');
            }, 3000);
          }
        }, 100);
      }, 350);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDiscordModal();
      closeModsInfoModal();
    }
  });

  /* ===== MOUSE TRACKING - HERO PARALLAX & SHADOWS ===== */
  (function initHeroTracking() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var heroContent = document.getElementById('heroContent');
    var heroBg = hero.querySelector('.hero-bg');
    var glare = document.getElementById('heroGlare');
    var particles = hero.querySelectorAll('.particle');
    var tiltElements = hero.querySelectorAll('.hero-tilt');

    var isMobile = window.innerWidth <= 768;

    window.addEventListener('resize', function () {
      isMobile = window.innerWidth <= 768;
    });

    function handleMove(clientX, clientY) {
      if (isMobile) return;

      var rect = hero.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;

      var deltaX = (clientX - centerX) / rect.width;
      var deltaY = (clientY - centerY) / rect.height;

      var tiltX = deltaY * -15;
      var tiltY = deltaX * 15;

      /* Tilt individual elements at different speeds */
      tiltElements.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-tilt-speed')) || 6;
        var factor = speed / 10;
        el.style.transform =
          'rotateX(' + (tiltX * factor) + 'deg) rotateY(' + (tiltY * factor) + 'deg)';
      });

      /* Move background opposite direction for depth */
      if (heroBg) {
        heroBg.style.transform =
          'translateX(' + (deltaX * -20) + 'px) translateY(' + (deltaY * -20) + 'px)';
      }

      /* Move glare spotlight */
      if (glare) {
        var gx = ((clientX - rect.left) / rect.width) * 100;
        var gy = ((clientY - rect.top) / rect.height) * 100;
        glare.style.background =
          'radial-gradient(circle at ' + gx + '% ' + gy + '%, rgba(255,255,255,0.06) 0%, transparent 50%)';
      }

      /* Parallax particles at different depths */
      particles.forEach(function (p) {
        var depth = parseFloat(p.getAttribute('data-depth')) || 0.1;
        var px = deltaX * 60 * depth;
        var py = deltaY * 60 * depth;
        p.style.transform = 'translate(' + px + 'px, ' + py + 'px)';
      });

      /* Dynamic shadow on hero title */
      var title = document.getElementById('heroTitle');
      if (title) {
        var shadowX = deltaX * 20;
        var shadowY = deltaY * 20;
        var shadowBlur = 40 + Math.abs(deltaX + deltaY) * 20;
        title.style.textShadow =
          shadowX + 'px ' + shadowY + 'px ' + shadowBlur + 'px rgba(108, 92, 231, 0.2)';
      }

      /* Dynamic shadow on buttons */
      var buttons = hero.querySelectorAll('.btn-primary');
      buttons.forEach(function (btn) {
        var bx = deltaX * 12;
        var by = deltaY * 12;
        btn.style.boxShadow =
          bx + 'px ' + by + 'px ' + '30px rgba(108, 92, 231, 0.3)';
      });
    }

    function handleLeave() {
      if (isMobile) return;

      tiltElements.forEach(function (el) {
        el.style.transform = '';
      });
      if (heroBg) heroBg.style.transform = '';
      if (glare) {
        glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)';
      }
      particles.forEach(function (p) {
        p.style.transform = '';
      });
      var title = document.getElementById('heroTitle');
      if (title) title.style.textShadow = '';
      var buttons = hero.querySelectorAll('.btn-primary');
      buttons.forEach(function (btn) {
        btn.style.boxShadow = '';
      });
    }

    hero.addEventListener('mousemove', handleMove);
    hero.addEventListener('mouseleave', handleLeave);

    /* Touch support for mobile */
    hero.addEventListener('touchmove', function (e) {
      var touch = e.touches[0];
      if (touch) handleMove(touch.clientX, touch.clientY);
    }, { passive: true });

    hero.addEventListener('touchend', handleLeave);
  })();

  /* ===== SCROLL EFFECTS ===== */
  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollY > 64) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDiscordModal();
      closeModsInfoModal();
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  /* ===== MUESTRA INICIO POR DEFECTO ===== */
  navigateTo('inicio');

  /* ===== INTERSECTION OBSERVER GLOBAL PARA FADE-IN ===== */
  var globalObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        globalObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  function observeAllFadeIns() {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      globalObserver.observe(el);
    });
  }

  observeAllFadeIns();

  var observerForNewContent = new MutationObserver(function () {
    observeAllFadeIns();
  });

  observerForNewContent.observe(document.getElementById('app'), {
    childList: true,
    subtree: true
  });

  /* ===== NAVEGAR CON TECLAS (1-0) ===== */
  document.addEventListener('keydown', function (e) {
    var key = parseInt(e.key, 10);
    if (isNaN(key) || key < 1 || key > 9) return;
    var sections = [
      'inicio', 'que-es', 'como-funciona', 'requisitos',
      'caracteristicas', 'mods', 'version', 'novedades', 'quienes-somos'
    ];
    if (key <= sections.length) {
      navigateTo(sections[key - 1]);
    }
  });

})();
