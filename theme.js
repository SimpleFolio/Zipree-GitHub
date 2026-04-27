// theme.js — shared dark/light mode across all SPS pages
// Reads/writes localStorage key 'sps-theme'
// Apply html.dark immediately (before DOMContentLoaded) to prevent flash

(function () {
  const KEY = 'sps-theme';
  const saved = localStorage.getItem(KEY) || 'light';
  if (saved === 'dark') document.documentElement.classList.add('dark');

  function applyTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    document.body.classList.toggle('dark', dark);
    localStorage.setItem(KEY, dark ? 'dark' : 'light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = dark ? '☀️' : '🌙';
    // Hook for market-indicator.html lightweight-charts re-theming
    if (typeof window.__onThemeChange === 'function') window.__onThemeChange(dark);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(saved === 'dark');
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(!document.body.classList.contains('dark'));
      });
    }
  });
})();
