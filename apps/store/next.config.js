const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['a.storyblok.com', 'promise.hedvig.com'],
  },
  productionBrowserSourceMaps: true,
  i18n,
  transpilePackages: ['ui'],
  // Docs: https://nextjs.org/docs/advanced-features/security-headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

const scriptSrcDirectives = [
  'https://app.storyblok.com',
  'https://widget.intercom.io',
  'https://js.intercomcdn.com',
  'https://www.googletagmanager.com',
  'https://dc.insurely.com',
  'https://vercel.live',
  "'unsafe-inline'",
  "'unsafe-eval'",
  "'self'",
]
const styleSrcDirectives = [
  'fonts.googleapis.com', // GTM preview mode
  "'unsafe-inline'",
  "'self'",
]
const fontSrcDirectives = [
  'https://fonts.intercomcdn.com',
  'fonts.gstatic.com', // GTM preview mode
  "'self'",
]
const imgSrcDirectives = [
  'https://promise.hedvig.com',
  'https://*.storyblok.com',
  'https://downloads.intercomcdn.com',
  'https://static.intercomassets.com',
  'https://www.googletagmanager.com',
  'https://assets.vercel.com',
  'blob:',
  'data:',
  "'self'",
]
const mediaSrcDirectives = [
  'https://dc.insurely.com',
  'https://vercel.live',
  'https://a.storyblok.com', // Stortblok editor
  "'self'",
]
const connectSrcDirectives = [
  'https://*.browser-intake-datadoghq.eu',
  'https://*.google-analytics.com',
  'https://api-iam.intercom.io',
  'https://app.storyblok.com', // Stortblok editor
  'https://sockjs-eu.pusher.com/', // Stortblok editor
  'wss://ws-eu.pusher.com', // Stortblok editor
  'wss://*.intercom.io',
  'https://*.hedvigit.com',
  "'self'",
]
const frameSrcDirectives = [
  'https://dc.insurely.com',
  'https://vercel.live',
  "'self'", // Storyblok editor
]

// NOTE: report-to rule with Report-to header is recommended, but it's not universally supported and
// is impossible to test on localhost with non-TLS, so we're not using it
//
// script-src: NOT SAFE - https://www.hyperxiao.top/en/posts/6
// style-src: consider emotion + nonce: https://emotion.sh/docs/@emotion/cache#nonce

const ContentSecurityPolicy = `
  default-src 'self';
  script-src ${scriptSrcDirectives.join(' ')};
  style-src ${styleSrcDirectives.join(' ')}; 
  font-src ${fontSrcDirectives.join(' ')};
  img-src ${imgSrcDirectives.join(' ')};
  media-src ${mediaSrcDirectives.join(' ')};
  connect-src ${connectSrcDirectives.join(' ')};
  worker-src blob:;
  object-src data:;
  frame-src ${frameSrcDirectives.join(' ')};
  report-uri /api/csp-reports;
`

const securityHeaders = [
  // Reduce latency when the user clicks a link
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js %O', module.exports)
