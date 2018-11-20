// En este arcuivo de van a configurar todos los elementos y aplicaicon
// en general
const defaultConfig = {
  // Clave de tokens JWT
  JWT_KEY: 'jwt',
  JWT_RFS_KEY: 'jwt-rfs',
  JWT_REHYDRATE_KEY: 'x-rehydrate-tok',

  // Content Security Policy (CSP)
  // @see server/middleware/security for more info.
  cspExtensions: {
    childSrc: [
      'https://player.vimeo.com',
      'https://www.google.com/recaptcha/api.js',
      'https://www.gstatic.com',
      'fast.wistia.com',
      'googletagmanager.com',
      // Tool GDRP
      't.sharethis.com'
    ],
    connectSrc: [
      'data:'
    ],
    defaultSrc: [],
    fontSrc: ['fonts.googleapis.com/css', 'fonts.gstatic.com'],
    imgSrc: [
      'fast.wistia.com',
      'embedwistia-a.akamaihd.net',
      'd39p6dv27gzlaf.cloudfront.net',
      'www.facebook.com',
      '*'
    ],
    mediaSrc: [
      'https://player.vimeo.com',
      'fast.wistia.com',
      'blob:'
    ],
    manifestSrc: [],
    objectSrc: [],
    scriptSrc: [
      // Allow scripts from cdn.polyfill.io so that we can import the
      // polyfill.
      'cdn.polyfill.io',
      'www.google.com/recaptcha/api.js',
      'www.gstatic.com',
      'fast.wistia.com',
      'connect.facebook.net',
      'facebook.com',
      'www.googletagmanager.com',
      'https://www.google-analytics.com',
      // Tool GDRP
      'platform-api.sharethis.com',
      'buttons-config.sharethis.com',
      'c.sharethis.mgr.consensu.org',
      't.sharethis.com'
    ],
    frameSrc: [
      'https://www.google.com/',
      'https://player.vimeo.com',
      'fast.wistia.com',
      'staticxx.facebook.com',
      'https://www.facebook.com/',
      // Tool GDRP
      'c.sharethis.mgr.consensu.org',
      't.sharethis.com'
    ],
    styleSrc: [
      'fonts.googleapis.com/css'
    ]
  }
}

export default defaultConfig
