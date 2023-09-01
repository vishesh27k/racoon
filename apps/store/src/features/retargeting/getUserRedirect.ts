import { ShopSessionRetargetingQuery } from '@/services/apollo/generated'
import { ORIGIN_URL, PageLink } from '@/utils/PageLink'
import { UserParams } from './retargeting.types'

export enum RedirectType {
  Product = 'product',
  Cart = 'cart',
  Fallback = 'fallback',
}

type Redirect = { type: RedirectType; url: string }

export const getUserRedirect = (
  userParams: UserParams,
  data: ShopSessionRetargetingQuery | null,
): Redirect => {
  const fallbackRedirect = {
    type: RedirectType.Fallback,
    url: new URL(PageLink.store({ locale: userParams.locale }), ORIGIN_URL).toString(),
  }

  if (!data) return fallbackRedirect

  if (hasAddedCartEntries(data)) {
    return {
      type: RedirectType.Cart,
      url: PageLink.session({
        locale: userParams.locale,
        shopSessionId: data.shopSession.id,
        next: PageLink.cart({ locale: userParams.locale }),
        code: userParams.campaignCode,
      }),
    }
  }

  const priceIntentId = getSingleProduct(data)
  if (priceIntentId) {
    return {
      type: RedirectType.Product,
      url: PageLink.session({
        locale: userParams.locale,
        shopSessionId: data.shopSession.id,
        code: userParams.campaignCode,
        priceIntentId,
      }),
    }
  }

  return fallbackRedirect
}

const hasAddedCartEntries = (data: ShopSessionRetargetingQuery): boolean => {
  return data.shopSession.cart.entries.length > 0
}

const getSingleProduct = (data: ShopSessionRetargetingQuery): string | null => {
  const productNames = data.shopSession.priceIntents.map((priceIntent) => priceIntent.product.name)
  const products = new Set(productNames)
  if (products.size !== 1) return null

  // Assume that the last price intent is the latest one
  const priceIntent = data.shopSession.priceIntents[data.shopSession.priceIntents.length - 1]
  return priceIntent.id
}
