import type { NextPageWithLayout, GetServerSideProps } from 'next'
import { CartPage } from '@/components/CartPage/CartPage'
import { CartPageProps } from '@/components/CartPage/CartPageProps.types'
import { LayoutWithMenu } from '@/components/LayoutWithMenu/LayoutWithMenu'
import { getLocale } from '@/lib/l10n/getLocale'
import { initializeApollo } from '@/services/apollo/client'
import { getShopSessionServerSide } from '@/services/shopSession/ShopSession.helpers'
import { isCountryCode } from '@/utils/isCountryCode'

const NextCartPage: NextPageWithLayout<CartPageProps> = (props) => {
  return <CartPage {...props} />
}

export const getServerSideProps: GetServerSideProps<CartPageProps> = async (context) => {
  const { req, res } = context
  const { marketLabel: countryCode } = getLocale(context.locale ?? context.defaultLocale)
  if (!isCountryCode(countryCode)) return { notFound: true }

  try {
    const apolloClient = initializeApollo()
    const shopSession = await getShopSessionServerSide({ req, res, apolloClient, countryCode })

    const totalCost = shopSession.cart.lines
      .map((line) => parseInt(line.price.amount, 10) || 0)
      .reduce((a, b) => a + b, 0)

    return {
      props: {
        products: shopSession.cart.lines.map((item) => {
          return {
            id: item.id,
            name: item.variant.title,
            cost: parseFloat(item.price.amount),
            currency: item.price.currencyCode,
          }
        }),
        cost: {
          total: totalCost,
          subTotal: totalCost,
        },
      },
    }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}

NextCartPage.getLayout = (children) => <LayoutWithMenu>{children}</LayoutWithMenu>

export default NextCartPage
