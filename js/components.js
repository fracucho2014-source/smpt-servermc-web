/* ============================================
   COMPONENTES DINAMICOS - SMPT 10-17
   Datos y funciones de renderizado (i18n)
   ============================================ */

const AppData = {
  caracteristicas: {
    es: [
      { icon: '&#127758;', title: 'Mundo amplio', desc: 'Mapa enorme con biomas variados para explorar sin limites.' },
      { icon: '&#127918;', title: 'Eventos no programados', desc: 'Concursos, carreras, builders battles y mas actividades sorpresa.' },
      { icon: '&#128373;', title: 'Sistema de rangos', desc: 'Progresa a traves de rangos con ventajas y reconocimientos.' },
      { icon: '&#127760;', title: 'Mapa dinamico', desc: 'Sigue las construcciones y jugadores en tiempo real desde el navegador.' },
      { icon: '&#128274;', title: 'Proteccion de terrenos', desc: 'Sistema de claims para proteger tus construcciones y pertenencias.' },
      { icon: '&#127881;', title: 'Tienda virtual', desc: 'Economia basada en monedas del servidor con tienda entre jugadores.' },
      { icon: '&#128172;', title: 'Chat global y local', desc: 'Comunicacion por cercania y canales tematicos en el juego.' },
      { icon: '&#127939;', title: 'Misiones y logros', desc: 'Completa desafios y obtiene recompensas exclusivas.' },
      { icon: '&#9876;', title: 'Minijuegos', desc: 'SkyWars, BedWars y PvP tradicional. Compite contra otros jugadores.' },
    ],
    en: [
      { icon: '&#127758;', title: 'Wide world', desc: 'Huge map with varied biomes to explore without limits.' },
      { icon: '&#127918;', title: 'Unscheduled events', desc: 'Contests, races, builders battles and more surprise activities.' },
      { icon: '&#128373;', title: 'Rank system', desc: 'Progress through ranks with advantages and recognition.' },
      { icon: '&#127760;', title: 'Dynamic map', desc: 'Follow constructions and players in real time from the browser.' },
      { icon: '&#128274;', title: 'Land protection', desc: 'Claims system to protect your constructions and belongings.' },
      { icon: '&#127881;', title: 'Virtual shop', desc: 'Economy based on server coins with player-to-player shop.' },
      { icon: '&#128172;', title: 'Global and local chat', desc: 'Proximity communication and themed channels in-game.' },
      { icon: '&#127939;', title: 'Missions and achievements', desc: 'Complete challenges and get exclusive rewards.' },
      { icon: '&#9876;', title: 'Minigames', desc: 'SkyWars, BedWars and traditional PvP. Compete against other players.' },
    ]
  },

  mods: {
    es: [
      { icon: '&#128176;', title: 'AH', file: 'ah-1.0.0.jar', desc: 'Sistema de subastas y compras de todo el servidor entre todos los jugadores.' },
      { icon: '&#127978;', title: 'Better Home New', file: 'betterhomeNew-1.20.1.jar', desc: 'Mejoras en el sistema de hogares y teletransportacion.' },
      { icon: '&#128176;', title: 'Economy', file: 'economy-1.0.1.jar', desc: 'Sistema economico con monedas y tienda entre jugadores.' },
      { icon: '&#128663;', title: 'Immersive Vehicles', file: 'Immersive Vehicles-1.20.1-23.0.0.jar', desc: 'Vehiculos realistas para explorar el mundo.' },
      { icon: '&#128737;', title: 'LuckPerms', file: 'LuckPerms-Forge-5.4.102.jar', desc: 'Sistema de permisos y rangos del servidor.' },
      { icon: '&#9992;', title: 'MTS Official Pack', file: 'MTS Official Pack-1.20.1-V29.jar', desc: 'Pack oficial de transporte y vehiculos MTS.' },
      { icon: '&#128274;', title: 'OAmP', file: 'OAmP-1.20.1-V3.jar', desc: '' },
      { icon: '&#128640;', title: 'RTP', file: 'rtp-2.0.0.jar', desc: 'Teletransportacion aleatoria a ubicaciones del mundo.' },
      { icon: '&#127759;', title: 'Yawp', file: 'yawp-1.20.1-forge-0.6.0-beta1.jar', desc: 'Yet Another World Protector - protector de areas del mundo.' },
    ],
    en: [
      { icon: '&#128176;', title: 'AH', file: 'ah-1.0.0.jar', desc: 'Auction and purchase system for the entire server between all players.' },
      { icon: '&#127978;', title: 'Better Home New', file: 'betterhomeNew-1.20.1.jar', desc: 'Improvements to the home and teleportation system.' },
      { icon: '&#128176;', title: 'Economy', file: 'economy-1.0.1.jar', desc: 'Economic system with coins and player-to-player shop.' },
      { icon: '&#128663;', title: 'Immersive Vehicles', file: 'Immersive Vehicles-1.20.1-23.0.0.jar', desc: 'Realistic vehicles to explore the world.' },
      { icon: '&#128737;', title: 'LuckPerms', file: 'LuckPerms-Forge-5.4.102.jar', desc: 'Server permissions and rank system.' },
      { icon: '&#9992;', title: 'MTS Official Pack', file: 'MTS Official Pack-1.20.1-V29.jar', desc: 'Official MTS transport and vehicles pack.' },
      { icon: '&#128274;', title: 'OAmP', file: 'OAmP-1.20.1-V3.jar', desc: '' },
      { icon: '&#128640;', title: 'RTP', file: 'rtp-2.0.0.jar', desc: 'Random teleportation to world locations.' },
      { icon: '&#127759;', title: 'Yawp', file: 'yawp-1.20.1-forge-0.6.0-beta1.jar', desc: 'Yet Another World Protector - world area protector.' },
    ]
  },

  version: {
    es: {
      numero: '1.20.1',
      estado: 'Estable',
      desc: 'El servidor corre en Minecraft Java Edition 1.20.1 con Forge. Descarga la version correcta y los mods desde nuestro instalador automatico.',
      changelog: [
        { version: '1.20.1', date: 'Junio 2026', changes: ['Actualizacion mayor del servidor', 'Nuevos plugins instalados', 'Optimizacion de rendimiento'] },
        { version: '1.20.1', date: 'Marzo 2026', changes: ['Parche de seguridad', 'Correccion de bugs', 'Nuevos eventos'] },
      ]
    },
    en: {
      numero: '1.20.1',
      estado: 'Stable',
      desc: 'The server runs on Minecraft Java Edition 1.20.1 with Forge. Download the correct version and mods from our automatic installer.',
      changelog: [
        { version: '1.20.1', date: 'June 2026', changes: ['Major server update', 'New plugins installed', 'Performance optimization'] },
        { version: '1.20.1', date: 'March 2026', changes: ['Security patch', 'Bug fixes', 'New events'] },
      ]
    }
  },

  novedades: {
    es: [
      { title: 'Actualizacion 1.20.1 Forge', desc: 'El servidor se actualiza a la version 1.20.1 con Forge y nuevos mods.' },
      { title: 'Nuevo sistema de rangos', desc: 'Hemos renovado el sistema de rangos con mas beneficios y niveles.' },
      { title: 'Mantenimiento diario', desc: 'El servidor pasa por mantenimiento diario durante el horario de apagado (noche) para mantener un rendimiento optimo.' },
    ],
    en: [
      { title: '1.20.1 Forge Update', desc: 'The server updates to version 1.20.1 with Forge and new mods.' },
      { title: 'New rank system', desc: 'We have renewed the rank system with more benefits and levels.' },
      { title: 'Daily maintenance', desc: 'The server undergoes daily maintenance during the off hours (night) to maintain optimal performance.' },
    ]
  },

  faq: {
    es: [
      {
        q: 'Como puedo unirme al servidor?',
        a: 'Primero debes unirte a nuestro Discord desde la seccion de "Como funciona". Dentro del Discord encontraras la IP del servidor y todos los datos necesarios para conectarte.'
      },
      {
        q: 'Que version de Minecraft necesito?',
        a: 'Necesitas Minecraft Java Edition 1.20.1 con Forge (hasta la version 47.4.20). Puedes descargar la version correcta desde la seccion de requisitos.'
      },
      {
        q: 'El servidor tiene mods?',
        a: 'Si, contamos con entre 9 y 11 mods instalados. No utilizamos plugins, solo mods compatibles con Forge. La lista completa esta disponible en la seccion de Mods.'
      },
      {
        q: 'Hay restriccion de edad?',
        a: 'Si, el servidor esta disenado para jugadores entre 10 y 17 anos. Todos los ingresos son verificados.'
      },
      {
        q: 'El servidor es premium o cracked?',
        a: 'El servidor permite jugadores offline. Puedes conectarte desde TLauncher, SKLauncher, cuentas premium y cualquier otro launcher que soporte la version 1.20.1 con Forge.'
      },
      {
        q: 'Como reporto a un jugador?',
        a: 'Para reportar a un jugador debes escribir en el chat de avisos de nuestro Discord, mencionando: informacion del jugador, que cometio, fecha y hora del incidente, y por que envias esta denuncia.'
      },
      {
        q: 'Cada cuanto hay reinicios?',
        a: 'El servidor se reinicia diariamente durante el horario de apagado (noche), cuando no hay jugadores conectados, para mantener un rendimiento optimo.'
      },
      {
        q: 'Puedo invitar a un amigo?',
        a: 'Si, pero tu amigo tambien debe unirse al Discord y cumplir con los requisitos de edad.'
      },
    ],
    en: [
      {
        q: 'How can I join the server?',
        a: 'First you must join our Discord from the "How it works" section. Inside Discord you will find the server IP and all the information needed to connect.'
      },
      {
        q: 'What Minecraft version do I need?',
        a: 'You need Minecraft Java Edition 1.20.1 with Forge (up to version 47.4.20). You can download the correct version from the requirements section.'
      },
      {
        q: 'Does the server have mods?',
        a: 'Yes, we have between 9 and 11 mods installed. We do not use plugins, only Forge-compatible mods. The full list is available in the Mods section.'
      },
      {
        q: 'Is there an age restriction?',
        a: 'Yes, the server is designed for players between 10 and 17 years old. All entries are verified.'
      },
      {
        q: 'Is the server premium or cracked?',
        a: 'The server allows offline players. You can connect from TLauncher, SKLauncher, premium accounts and any other launcher that supports version 1.20.1 with Forge.'
      },
      {
        q: 'How do I report a player?',
        a: 'To report a player you must write in our Discord notice chat, mentioning: player information, what they did, date and time of the incident, and why you are sending this report.'
      },
      {
        q: 'How often are there restarts?',
        a: 'The server restarts daily during the off hours (night), when no players are connected, to maintain optimal performance.'
      },
      {
        q: 'Can I invite a friend?',
        a: 'Yes, but your friend must also join Discord and meet the age requirements.'
      },
    ]
  }
};

/* ===== RENDERIZADO DE COMPONENTES ===== */

function getLang() {
  return (typeof I18n !== 'undefined' && I18n.getLang) ? I18n.getLang() : 'es';
}

function renderCaracteristicas() {
  const container = document.getElementById('caracteristicas-container');
  if (!container) return;
  const lang = getLang();
  const items = AppData.caracteristicas[lang] || AppData.caracteristicas.es;

  container.innerHTML = items.map((item, i) => `
    <div class="feature-item fade-in" style="transition-delay: ${i * 0.08}s">
      <div class="feature-icon">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');

  observeFadeIns(container);
}

function renderMods() {
  const container = document.getElementById('mods-container');
  if (!container) return;
  const lang = getLang();
  const items = AppData.mods[lang] || AppData.mods.es;

  container.innerHTML = items.map((mod, i) => `
    <div class="mod-item fade-in" style="transition-delay: ${i * 0.08}s">
      <div class="mod-icon">${mod.icon}</div>
      <h3>${mod.title}</h3>
      <code class="mod-file">${mod.file}</code>
      ${mod.desc ? '<p style="margin-top: 10px; color: var(--text-muted); font-size: 0.85rem;">' + mod.desc + '</p>' : ''}
    </div>
  `).join('');

  observeFadeIns(container);
}

function renderVersion() {
  const container = document.getElementById('version-container');
  if (!container) return;
  const lang = getLang();
  const v = AppData.version[lang] || AppData.version.es;

  const changelogLabel = lang === 'en' ? 'Change history' : 'Historial de cambios';
  const versionLabel = lang === 'en' ? 'Version' : 'Version';

  container.innerHTML = `
    <div class="version-badge fade-in">
      ${versionLabel} <span class="ver-num">${v.numero}</span>
      <span style="font-size: 0.8rem; background: rgba(0,206,201,0.15); color: var(--secondary); padding: 2px 12px; border-radius: 20px;">${v.estado}</span>
    </div>
    <p class="version-detail fade-in">${v.desc}</p>
    <div style="width: 100%; max-width: 600px; margin-top: 40px;">
      <h3 style="text-align: center; margin-bottom: 20px; color: var(--text-muted);">${changelogLabel}</h3>
      ${v.changelog.map((entry, i) => `
        <div class="faq-item fade-in" style="margin-bottom: 12px; transition-delay: ${i * 0.1}s">
          <div style="padding: 16px 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <strong style="color: var(--primary);">${entry.version}</strong>
              <span style="color: var(--text-muted); font-size: 0.85rem;">${entry.date}</span>
            </div>
            <ul style="margin-top: 10px; list-style: disc; padding-left: 20px;">
              ${entry.changes.map(c => `<li style="color: var(--text-muted); font-size: 0.9rem; padding: 4px 0;">${c}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  observeFadeIns(container);
}

function renderNovedades() {
  const container = document.getElementById('novedades-container');
  if (!container) return;
  const lang = getLang();
  const items = AppData.novedades[lang] || AppData.novedades.es;

  container.innerHTML = items.map((item, i) => `
    <div class="news-item fade-in" style="transition-delay: ${i * 0.08}s">
      ${item.date ? '<span class="news-date">' + item.date + '</span>' : ''}
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');

  observeFadeIns(container);
}

function renderFAQ() {
  const container = document.getElementById('faq-container');
  if (!container) return;
  const lang = getLang();
  const items = AppData.faq[lang] || AppData.faq.es;

  container.innerHTML = items.map((item, i) => `
    <div class="faq-item fade-in" style="transition-delay: ${i * 0.05}s">
      <button class="faq-question" data-index="${i}">
        ${item.q}
        <span class="faq-arrow">&#9660;</span>
      </button>
      <div class="faq-answer">
        <p>${item.a}</p>
      </div>
    </div>
  `).join('');

  observeFadeIns(container);

  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');

      container.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ===== OBSERVADOR DE FADE-IN ===== */
function observeFadeIns(container) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  const targets = (container || document).querySelectorAll('.fade-in');
  targets.forEach(el => observer.observe(el));
}

/* ===== INICIALIZAR ===== */
function initComponents() {
  renderCaracteristicas();
  renderMods();
  renderVersion();
  renderNovedades();
  renderFAQ();
}

/* Re-render on language change */
document.addEventListener('langchange', function () {
  initComponents();
});

document.addEventListener('DOMContentLoaded', initComponents);
