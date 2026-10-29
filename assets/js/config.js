// =====================================================================
//  RAY HARTY – nastavení webu
//  Tady se mění odkazy, vydané nahrávky a zdroj koncertů.
//  Prázdné hodnoty ('') se na webu jednoduše nezobrazí.
// =====================================================================

const SITE = {
  // Veřejná adresa webu (s lomítkem na konci) – kvůli Googlu.
  url: 'https://rayharty.github.io/',

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
  releases: [
    {
      title: 'the world is spinning (demo)',
      type: 'single',
      year: 2026,
      cover: 'assets/img/covers/the-world-is-spinning.jpg',
      listen: 'https://open.spotify.com/track/7AVFTibpwL3vFm9a5njG5d',
      video: 'https://www.youtube.com/watch?v=zDacJXE52W8',
    },
    {
      title: 'fomo',
      type: 'single',
      year: 2026,
      cover: 'assets/img/covers/fomo.jpg',
      listen: 'https://open.spotify.com/track/5rjDo5svzy5l32cqBmngrF',
      video: 'https://www.youtube.com/watch?v=Dm9zoJQu-_0',
    },
  ],
};
