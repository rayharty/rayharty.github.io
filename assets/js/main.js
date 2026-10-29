(() => {
  const ROOT = new URL('../../', document.currentScript.src);
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'cs';

  const STRINGS = {
    cs: {
      locale: 'cs-CZ',
      menu: 'Menu',
      close: 'Zavřít',
      tickets: 'Vstupenky',
      cover: 'obal',
      types: { single: 'Singl', ep: 'EP', album: 'Album' },
      latest: { single: 'Nejnovější singl', ep: 'Nejnovější EP', album: 'Nejnovější album' },
      tracklist: 'Tracklist nového alba',
      noReleases: 'Pracujeme na debutovém albu. Brzy tu bude.',
      noConcerts: 'Zrovna nemáme ohlášené žádné koncerty.',
      concertsError: 'Koncerty se teď nepodařilo načíst.',
      followIg: ['Nové termíny hlásíme na ', 'Instagramu', '.'],
    },
    en: {
      locale: 'en-GB',
      menu: 'Menu',
      close: 'Close',
      tickets: 'Tickets',
      cover: 'cover',
      types: { single: 'Single', ep: 'EP', album: 'Album' },
      latest: { single: 'Latest single', ep: 'Latest EP', album: 'Latest album' },
      tracklist: 'New album tracklist',
      noReleases: 'We’re working on our debut album. Coming soon.',
      noConcerts: 'No shows announced right now.',
      concertsError: 'We couldn’t load the shows right now.',
      followIg: ['New dates are announced on ', 'Instagram', '.'],
    },
  };
  const T = STRINGS[LANG];

  const LINK_LABELS = {
    spotify: 'Spotify',
    appleMusic: 'Apple Music',
    youtube: 'YouTube',
    bandcamp: 'Bandcamp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
  };

  // Brand icons for release links (Simple Icons, CC0), 24×24 path data.
  const ICONS = {
    spotify:
      'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z',
    appleMusic:
      'M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z',
    youtube:
      'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  };

  // --- helpers --------------------------------------------------------

  function h(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else node.setAttribute(key, value);
    }
    node.append(...children.flat().filter((c) => c != null && c !== false && c !== ''));
    return node;
  }

  const safeUrl = (url) => (/^https?:\/\//i.test(url || '') ? url.trim() : null);
  const asset = (path) => new URL(path, ROOT).href;
  const pad = (n) => String(n).padStart(2, '0');

  function externalLink(url, label, className) {
    return h('a', { href: url, class: className, target: '_blank', rel: 'noopener' }, label);
  }

  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    path.setAttribute('d', ICONS[name]);
    svg.append(path);
    return svg;
  }

  // Spotify / Apple Music / YouTube icon links of a release (missing ones are skipped).
  function platformLinks(release, className) {
    return Object.keys(ICONS).map((key) => {
      const url = safeUrl(release[key]);
      if (!url) return null;
      const label = LINK_LABELS[key];
      return h(
        'a',
        { href: url, class: className, target: '_blank', rel: 'noopener', title: label, 'aria-label': `${label}: ${release.title}` },
        icon(key)
      );
    });
  }

  function addJsonLd(data) {
    document.head.append(h('script', { type: 'application/ld+json' }, JSON.stringify(data)));
  }

  // --- header & mobile menu -------------------------------------------

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');

  const updateHeader = () => header.classList.toggle('is-solid', window.scrollY > 40);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  function setMenu(open) {
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('no-scroll', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? T.close : T.menu;
  }

  menuToggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  document.querySelector('.site-nav').addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  // --- links & contact ------------------------------------------------

  const links = Object.entries(SITE.links).filter(([, url]) => safeUrl(url));

  document.querySelectorAll('[data-links]').forEach((list) => {
    list.append(...links.map(([key, url]) => h('li', {}, externalLink(url, LINK_LABELS[key] || key))));
    if (!links.length) list.closest('[data-links-block]').hidden = true;
  });

  document.querySelectorAll('[data-email]').forEach((link) => {
    if (!SITE.email) {
      link.closest('[data-email-block]').hidden = true;
      return;
    }
    link.href = `mailto:${SITE.email}`;
    link.textContent = SITE.email;
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // --- releases -------------------------------------------------------

  const releases = SITE.releases || [];

  function cover(release) {
    const placeholder = () => h('div', { class: 'release__placeholder', 'aria-hidden': 'true' }, release.title);
    if (!release.cover) return placeholder();
    const img = h('img', { alt: `${release.title} – ${T.cover}`, loading: 'lazy', width: 600, height: 600 });
    img.addEventListener('error', () => img.replaceWith(placeholder()));
    img.src = asset(release.cover);
    return img;
  }

  function releaseCard(release) {
    return h(
      'article',
      { class: 'release' },
      h('div', { class: 'release__cover' }, cover(release)),
      h('h3', { class: 'release__title' }, release.title),
      h('p', { class: 'release__meta' }, [T.types[release.type], release.year].filter(Boolean).join(' · ')),
      h('div', { class: 'release__actions' }, platformLinks(release, 'button button--icon'))
    );
  }

  const releaseGrid = document.querySelector('[data-releases]');
  if (releases.length) releaseGrid.append(...releases.map(releaseCard));
  else releaseGrid.replaceWith(h('p', { class: 'empty' }, T.noReleases));

  const latest = releases[0];
  const heroRelease = document.querySelector('[data-hero-release]');
  if (latest) {
    heroRelease.append(
      h(
        'div',
        {},
        h('p', { class: 'hero__kicker' }, T.latest[latest.type] || T.latest.single),
        h('p', { class: 'hero__release-title' }, latest.title)
      ),
      h('div', { class: 'release__actions' }, platformLinks(latest, 'button button--icon button--solid'))
    );
    heroRelease.hidden = false;
  }

  // --- new album tracklist ticker ----------------------------------------

  const tracklist = SITE.tracklist || [];
  const ticker = document.querySelector('[data-album]');
  if (tracklist.length) {
    // The track moves by one list per loop, so four copies always cover the screen.
    const list = (copy) =>
      h(
        'ol',
        { class: 'ticker__list', 'aria-hidden': copy ? 'true' : null },
        tracklist.map((track) => h('li', {}, track))
      );
    ticker.append(h('div', { class: 'ticker__track' }, [0, 1, 2, 3].map(list)));
    ticker.setAttribute('aria-label', T.tracklist);
    ticker.hidden = false;
  }

  // --- concerts (Google Sheets → CSV) ---------------------------------

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quoted) {
        if (ch !== '"') field += ch;
        else if (text[i + 1] === '"') field += text[i++];
        else quoted = false;
      } else if (ch === '"') quoted = true;
      else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (ch !== '\r') field += ch;
    }
    if (field || row.length) rows.push([...row, field]);
    return rows;
  }

  // Sloupce lze pojmenovat česky (i s diakritikou) nebo anglicky.
  const COLUMN_ALIASES = {
    date: 'datum',
    time: 'cas',
    city: 'mesto',
    venue: 'misto',
    tickets: 'vstupenky',
    note: 'poznamka',
    note_en: 'poznamka_en',
  };

  function columnKey(name) {
    const key = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_');
    return COLUMN_ALIASES[key] || key;
  }

  // Přijímá 2026-09-21 i 21. 9. 2026 / 21.9.2026, volitelně čas 20:00.
  function parseDate(dateText, timeText) {
    let m = dateText.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    let year, month, day;
    if (m) [, year, month, day] = m;
    else if ((m = dateText.trim().match(/^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/))) [, day, month, year] = m;
    else return null;

    const t = (timeText || '').trim().match(/^(\d{1,2})[:.](\d{2})/);
    const date = new Date(+year, +month - 1, +day, t ? +t[1] : 0, t ? +t[2] : 0);
    const iso = `${year}-${pad(month)}-${pad(day)}` + (t ? `T${pad(t[1])}:${t[2]}` : '');
    return { date, iso };
  }

  function toConcerts(rows) {
    const [head, ...body] = rows;
    if (!head) return [];
    const keys = head.map(columnKey);
    return body
      .map((cells) => Object.fromEntries(keys.map((key, i) => [key, (cells[i] || '').trim()])))
      .map((row) => ({ ...row, ...parseDate(row.datum || '', row.cas) }))
      .filter((row) => row.date);
  }

  const dayFormat = new Intl.DateTimeFormat(T.locale, { day: 'numeric', month: LANG === 'en' ? 'short' : 'numeric' });
  const weekdayFormat = new Intl.DateTimeFormat(T.locale, { weekday: 'long' });

  function concertRow(c) {
    const tickets = safeUrl(c.vstupenky);
    const note = LANG === 'en' ? c.poznamka_en || c.poznamka : c.poznamka;
    return h(
      'li',
      { class: 'concert' },
      h(
        'time',
        { class: 'concert__date', datetime: c.iso },
        h('span', { class: 'concert__day' }, dayFormat.format(c.date)),
        h('span', { class: 'concert__weekday' }, `${weekdayFormat.format(c.date)} · ${c.date.getFullYear()}`)
      ),
      h(
        'div',
        { class: 'concert__place' },
        h('span', { class: 'concert__city' }, c.mesto),
        h('span', { class: 'concert__venue' }, [c.misto, c.cas].filter(Boolean).join(' · ')),
        note && h('span', { class: 'concert__note' }, note)
      ),
      h('div', { class: 'concert__action' }, tickets && externalLink(tickets, T.tickets, 'button'))
    );
  }

  function concertEvents(concerts) {
    return concerts.map((c) => ({
      '@context': 'https://schema.org',
      '@type': 'MusicEvent',
      name: `Ray Harty – ${c.misto || c.mesto}`,
      startDate: c.iso,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: c.misto || c.mesto,
        address: { '@type': 'PostalAddress', addressLocality: c.mesto },
      },
      performer: { '@type': 'MusicGroup', '@id': `${SITE.url}#band`, name: 'Ray Harty' },
      offers: safeUrl(c.vstupenky) ? { '@type': 'Offer', url: safeUrl(c.vstupenky) } : undefined,
    }));
  }

  const concertList = document.querySelector('[data-concerts]');
  const concertStatus = document.querySelector('[data-concerts-status]');

  function showConcertStatus(message) {
    const instagram = safeUrl(SITE.links.instagram);
    const [before, label, after] = T.followIg;
    concertStatus.replaceChildren(message, ...(instagram ? [' ', before, externalLink(instagram, label), after] : []));
  }

  async function loadConcerts() {
    if (!SITE.concertsCsv) return showConcertStatus(T.noConcerts);
    try {
      const response = await fetch(SITE.concertsCsv);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const concerts = toConcerts(parseCsv(await response.text()))
        .filter((c) => c.date >= today)
        .sort((a, b) => a.date - b.date);

      if (!concerts.length) return showConcertStatus(T.noConcerts);
      concertList.append(...concerts.map(concertRow));
      concertStatus.hidden = true;
      addJsonLd(concertEvents(concerts));
    } catch (error) {
      console.error('Koncerty:', error);
      showConcertStatus(T.concertsError);
    }
  }

  loadConcerts();

  // --- structured data for Google ---------------------------------------

  const bio = document.querySelector('[data-bio]');
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': `${SITE.url}#band`,
    name: 'Ray Harty',
    url: SITE.url,
    description: bio ? bio.textContent.trim().replace(/\s+/g, ' ') : undefined,
    email: SITE.email || undefined,
    foundingDate: SITE.founded,
    genre: SITE.genres,
    image: new URL('assets/img/hero.jpg', SITE.url).href,
    sameAs: [...links.map(([, url]) => url), ...(SITE.profiles || [])],
  });
})();
