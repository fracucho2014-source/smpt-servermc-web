/* ============================================
   i18n - SMPT 10-17
   Sistema de internacionalización (ES/EN)
   ============================================ */

const I18n = (() => {
  const STORAGE_KEY = 'smpt-lang';
  const DEFAULT_LANG = 'es';
  let currentLang = null;
  let translations = {};

  function getSavedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  async function loadLang(lang) {
    try {
      const response = await fetch('lang/' + lang + '.json');
      if (!response.ok) throw new Error('Failed to load');
      translations = await response.json();
      currentLang = lang;
      saveLang(lang);
      applyTranslations();
      document.documentElement.lang = lang;
      updateSwitcherUI();
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    } catch (e) {
      console.warn('I18n: Error loading ' + lang + ', falling back to ' + DEFAULT_LANG);
      if (lang !== DEFAULT_LANG) {
        await loadLang(DEFAULT_LANG);
      }
    }
  }

  function t(key) {
    var keys = key.split('.');
    var val = translations;
    for (var i = 0; i < keys.length; i++) {
      if (val && typeof val === 'object') {
        val = val[keys[i]];
      } else {
        return key;
      }
    }
    return val !== undefined && val !== null ? String(val) : key;
  }

  function applyTranslations() {
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = t(key);
      if (value !== key) {
        el.innerHTML = value;
      }
    });

    var attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(function (el) {
      var pairs = el.getAttribute('data-i18n-attr').split(',');
      pairs.forEach(function (pair) {
        var parts = pair.trim().split(':');
        if (parts.length === 2) {
          var attr = parts[0].trim();
          var key = parts[1].trim();
          var value = t(key);
          if (value !== key) {
            el.setAttribute(attr, value);
          }
        }
      });
    });
  }

  function switchLang(lang) {
    if (lang === currentLang) return;
    loadLang(lang);
  }

  function updateSwitcherUI() {
    var btn = document.getElementById('langSwitcher');
    if (!btn) return;
    if (currentLang === 'es') {
      btn.textContent = 'EN';
      btn.title = 'Switch to English';
    } else {
      btn.textContent = 'ES';
      btn.title = 'Cambiar a Español';
    }
  }

  function init() {
    var lang = getSavedLang();
    loadLang(lang);
  }

  return { init: init, t: t, switchLang: switchLang, getLang: () => currentLang };
})();

document.addEventListener('DOMContentLoaded', I18n.init);
