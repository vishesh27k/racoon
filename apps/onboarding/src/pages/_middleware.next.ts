import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const DEFAULT_PATH_LOCALE = 'se-en'

// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
const SUPPORTED_MARKETS = ['se', 'dk', 'no']

const guessLocale = (request: NextRequest) => {
  const requestCountry = request.geo?.country?.toLowerCase()

  if (requestCountry && SUPPORTED_MARKETS.includes(requestCountry)) {
    const requestLanguage = request.headers.get('accept-language')?.split(',')?.[0].toLowerCase()

    switch (requestCountry) {
      case 'se':
        return requestLanguage?.includes('sv') ? 'se' : 'se-en'
      case 'dk':
        return requestLanguage?.includes('da') ? 'dk' : 'dk-en'
      case 'no':
        return requestLanguage?.includes('nb') || requestLanguage?.includes('nn') ? 'no' : 'no-en'
    }
  }

  return null
}

export function middleware(request: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes('/api/') &&
    request.nextUrl.locale === 'default'

  if (shouldHandleLocale) {
    const locale = guessLocale(request) || DEFAULT_PATH_LOCALE
    return NextResponse.redirect(
      `${request.nextUrl.origin}/${locale}${request.nextUrl.pathname.replace('/default', '')}`,
    )
  }

  return undefined
}
