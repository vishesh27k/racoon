import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { countries } from '@/lib/l10n/countries'
import { normalizeLocale, routingLocale } from '@/lib/l10n/locales'
import { isLocale } from '@/utils/isLocale'

export const config = {
  matcher: '/',
}

export function middleware(req: NextRequest) {
  if (isLocale(normalizeLocale(firstPathFragment(req.url)))) {
    return
  }
  const country = req.geo?.country
  const nextURL = req.nextUrl.clone()
  switch (country) {
    case countries.NO.id:
      nextURL.pathname = routingLocale(countries.NO.defaultLocale)
      break
    case countries.DK.id:
      nextURL.pathname = routingLocale(countries.DK.defaultLocale)
      break
    case countries.SE.id:
      nextURL.pathname = routingLocale(countries.SE.defaultLocale)
      break
    default:
      console.debug(`Routing visitor from ${country} to country selector`)
      nextURL.pathname = '/country-selector'
      return NextResponse.rewrite(nextURL)
  }

  console.debug(`Routing visitor from ${country} to ${nextURL}`)
  return NextResponse.redirect(nextURL)
}

const firstPathFragment = (url: string): string => {
  const fragments = new URL(url).pathname.split('/').filter(Boolean)
  return fragments[0]
}
