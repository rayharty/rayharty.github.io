// =====================================================================
//  RAY HARTY – nastavení webu
//  Tady se mění odkazy, vydané nahrávky a zdroj koncertů.
//  Prázdné hodnoty ('') se na webu jednoduše nezobrazí.
// =====================================================================

const SITE = {
  // Veřejná adresa webu (s lomítkem na konci) – kvůli Googlu.
  url: 'https://rayharty.github.io/',

  // Barevné varianty – přepínač je v záhlaví (na mobilu v menu). První je výchozí.
  // primary = hlavní barva (sekce, nadpisy), paper = pozadí světlých sekcí,
  // accent = doplňková barva (pás se skladbami, tlačítka, zvýraznění).
  // Barvy pište jako #rrggbb. Konkrétní variantu jde poslat odkazem: …/?theme=cervena
  // Když necháte jen jednu, přepínač zmizí a web bude mít jen ji.
  themes: [
    { id: 'modra', name: { cs: 'Modrá + oranžová', en: 'Blue + orange' }, primary: '#1838d6', paper: '#ffffff', accent: '#ff6b35' },
    { id: 'modra-ruzova', name: { cs: 'Modrá + růžová', en: 'Blue + pink' }, primary: '#1838d6', paper: '#ffffff', accent: '#ff8fd0' },
    { id: 'noc', name: { cs: 'Noc', en: 'Night' }, primary: '#101b4d', paper: '#f3efe4', accent: '#e8b931' },
    { id: 'cervena', name: { cs: 'Červená', en: 'Red' }, primary: '#c8231a', paper: '#f6f1e7', accent: '#141414' },
    { id: 'travnik', name: { cs: 'Trávník', en: 'Pitch' }, primary: '#1c6b38', paper: '#f4f1e8', accent: '#c4410c' },
    { id: 'cerna', name: { cs: 'Černá + modrá', en: 'Black + blue' }, primary: '#111111', paper: '#ffffff', accent: '#1838d6' },
  ],

  // Pro Google (knowledge panel).
  founded: '2025',
  genres: ['Indie rock', 'Post-punk', 'Britpop'],

  // Odkazy na platformy (pořadí = pořadí na webu).
  links: {
    spotify: 'https://open.spotify.com/artist/3stYsX85nZlBSV6mfdntzS',
    appleMusic: 'https://music.apple.com/cz/artist/ray-harty/1692380132',
    youtube: 'https://www.youtube.com/@RayHarty',
    bandcamp: '',
    instagram: 'https://www.instagram.com/rayhartyband',
    facebook: 'https://www.facebook.com/profile.php?id=61573711757179',
    tiktok: 'https://www.tiktok.com/@rayhartyband',
  },

  // Další profily, které se na webu nezobrazují, ale Google podle nich
  // propojí kapelu do knowledge panelu (MusicBrainz, Wikidata, Discogs…).
  profiles: ['https://musicbrainz.org/artist/6772378e-cd06-47b1-a184-712742f7bc94'],

  // Booking / kontakt.
  email: 'rayhartyband@gmail.com',

  // Tracklist nového alba – běží dokola v pásu dole na úvodní obrazovce.
  tracklist: [
    'fomo',
    'friendly',
    'oh damn',
    'cave',
    'the greatest love song',
    'post-pubertal mental breakdown',
    'the world is spinning',
    'hey',
  ],

  // Koncerty z Google Sheets: Soubor → Sdílet → Publikovat na webu →
  // vybrat list → „Hodnoty oddělené čárkami (.csv)“ → zkopírovat odkaz.
  // Sloupce: datum | cas | mesto | misto | vstupenky | poznamka | poznamka_en
  concertsCsv: '',

  // Vydané nahrávky, nejnovější první (ta se ukáže i nahoře na úvodu).
  // type: 'single' | 'ep' | 'album'
  // cover: obal zmenšený pro web (čtverec, 1000×1000 px) v assets/img/covers
  // spotify / appleMusic / youtube: odkazy na ikonách (prázdné se nezobrazí)
  releases: [
    {
      title: 'the world is spinning (demo)',
      type: 'single',
      year: 2026,
      cover: 'assets/img/covers/the-world-is-spinning.jpg',
      spotify: 'https://open.spotify.com/track/7AVFTibpwL3vFm9a5njG5d',
      appleMusic: 'https://music.apple.com/cz/album/the-world-is-spinning-demo-single/1881255500',
      youtube: 'https://www.youtube.com/watch?v=zDacJXE52W8',
    },
    {
      title: 'fomo',
      type: 'single',
      year: 2026,
      cover: 'assets/img/covers/fomo.jpg',
      spotify: 'https://open.spotify.com/track/5rjDo5svzy5l32cqBmngrF',
      appleMusic: 'https://music.apple.com/cz/album/fomo-single/1877581005',
      youtube: 'https://www.youtube.com/watch?v=Dm9zoJQu-_0',
    },
  ],
};
