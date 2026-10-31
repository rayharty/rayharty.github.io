// Colour theme, applied in <head> before the page renders so it never flashes.
// A theme is a preset from SITE.themes ("cervena") or a custom trio of hex
// colours, primary-paper-accent ("c8231a-ffffff-141414"). Priority: ?theme=
// in the URL, then the visitor's last choice, then the first preset.

const THEME_STORAGE_KEY = 'rh-theme';

function resolveTheme(value) {
  const preset = (SITE.themes || []).find((theme) => theme.id === value);
  if (preset) return preset;
  const trio = /^([0-9a-f]{6})-([0-9a-f]{6})-([0-9a-f]{6})$/i.exec(value || '');
  if (!trio) return null;
  return { id: value.toLowerCase(), primary: `#${trio[1]}`, paper: `#${trio[2]}`, accent: `#${trio[3]}` };
}

// WCAG relative luminance and contrast ratio of #rrggbb colours.
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

// Same as --primary-dark in style.css: 62 % of the colour mixed with black.
function darken(hex) {
  return `#${[1, 3, 5]
    .map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * 0.62).toString(16).padStart(2, '0'))
    .join('')}`;
}

// Text colour on the accent: the theme colour with the best contrast, or plain
// black/white if none of them is readable (below WCAG AA 4.5:1).
function onAccent(theme) {
  const best = [theme.paper, theme.primary, darken(theme.primary)].reduce((a, b) =>
    contrast(b, theme.accent) > contrast(a, theme.accent) ? b : a
  );
  if (contrast(best, theme.accent) >= 4.5) return best;
  return contrast('#000000', theme.accent) > contrast('#ffffff', theme.accent) ? '#000000' : '#ffffff';
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--paper', theme.paper);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--on-accent', onAccent(theme));
  root.dataset.theme = theme.id;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme.primary;
}

function rememberTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme.id);
  } catch (e) {
    // Storage blocked (private mode): the choice just isn't remembered.
  }
}

(() => {
  const themes = SITE.themes || [];
  if (!themes.length) return;
  // With a single theme there is nothing to choose: ignore old choices and links.
  if (themes.length === 1) return applyTheme(themes[0]);

  const fromUrl = resolveTheme(new URLSearchParams(location.search).get('theme'));
  if (fromUrl) {
    applyTheme(fromUrl);
    rememberTheme(fromUrl);
    return;
  }
  let stored = null;
  try {
    stored = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (e) {
    // Storage blocked: fall back to the default theme.
  }
  applyTheme(resolveTheme(stored) || themes[0]);
})();
