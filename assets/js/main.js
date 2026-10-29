(() => {
  const ROOT = new URL('../../', document.currentScript.src);
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'cs';

  const STRINGS = {
    cs: {
      locale: 'cs-CZ',
      menu: 'Menu',
      close: 'Zavřít',
      listen: 'Poslouchat',
      watch: 'Video',
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
      listen: 'Listen',
      watch: 'Watch',
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
    const listen = safeUrl(release.listen);
    const video = safeUrl(release.video);
    return h(
      'article',
      { class: 'release' },
      h('div', { class: 'release__cover' }, cover(release)),
      h('h3', { class: 'release__title' }, release.title),
      h('p', { class: 'release__meta' }, [T.types[release.type], release.year].filter(Boolean).join(' · ')),
      h(
        'div',
        { class: 'release__actions' },
        listen && externalLink(listen, T.listen, 'button'),
        video && externalLink(video, T.watch, 'button')
      )
    );
  }

  const releaseGrid = document.querySelector('[data-releases]');
  if (releases.length) releaseGrid.append(...releases.map(releaseCard));
  else releaseGrid.replaceWith(h('p', { class: 'empty' }, T.noReleases));

  const latest = releases[0];
  const heroRelease = document.querySelector('[data-hero-release]');
  if (latest) {
    const listen = safeUrl(latest.listen);
    heroRelease.append(
      h(
        'div',
        {},
        h('p', { class: 'hero__kicker' }, T.latest[latest.type] || T.latest.single),
        h('p', { class: 'hero__release-title' }, latest.title)
      ),
      listen && externalLink(listen, T.listen, 'button button--solid')
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
