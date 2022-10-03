import { useRouter } from 'next/router'
import { getLocaleOrFallback } from '@/lib/l10n/localeUtils'

export const useCurrentLocale = () => {
  const router = useRouter()
  return getLocaleOrFallback(router.locale)
}
