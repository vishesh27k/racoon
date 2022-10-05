import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { CheckoutContactDetailsPage } from '@/components/CheckoutContactDetailsPage/CheckoutContactDetails'
import { CheckoutContactDetailsPageProps } from '@/components/CheckoutContactDetailsPage/CheckoutContactDetails.types'
import { CheckoutSignPage } from '@/components/CheckoutContactDetailsPage/CheckoutSignPage'
import { isRoutingLocale } from '@/lib/l10n/localeUtils'
import { PageLink } from '@/lib/PageLink'
import { APOLLO_STATE_PROP_NAME, initializeApollo } from '@/services/apollo/client'
import { PaymentConnectionFlow } from '@/services/apollo/generated'
import { fetchCurrentCheckoutSigning } from '@/services/Checkout/Checkout.helpers'
import logger from '@/services/logger/server'
import { getCurrentShopSessionServerSide } from '@/services/shopSession/ShopSession.helpers'

type NextPageProps = Omit<CheckoutContactDetailsPageProps, 'onSuccess'> & {
  flow: PaymentConnectionFlow
}

const NextCheckoutContactDetailsPage: NextPage<NextPageProps> = (props) => {
  const { flow, ...pageProps } = props

  const router = useRouter()
  const handleSuccess = () => router.push(PageLink.checkoutPayment())

  return flow === PaymentConnectionFlow.BeforeSign ? (
    <CheckoutContactDetailsPage onSuccess={handleSuccess} {...pageProps} />
  ) : (
    <CheckoutSignPage onSuccess={handleSuccess} {...pageProps} />
  )
}

export const getServerSideProps: GetServerSideProps<NextPageProps> = async (params) => {
  const { req, res, locale } = params
  if (!isRoutingLocale(locale)) return { notFound: true }

  try {
    const apolloClient = initializeApollo(undefined, req, res)

    const shopSession = await getCurrentShopSessionServerSide({ req, res, apolloClient })
    const checkoutId = shopSession.checkout.id
    if (shopSession.checkout.completedAt) {
      // @TODO: confirmation page should have a unique link in the future
      return { redirect: { destination: PageLink.store({ locale }), permanent: false } }
    }

    const checkoutSigning = await fetchCurrentCheckoutSigning({ req, apolloClient, checkoutId })

    return {
      props: {
        checkoutId,
        prefilledData: shopSession.checkout.contactDetails,
        flow: shopSession.checkout.paymentConnectionFlow,
        checkoutSigningId: checkoutSigning?.id ?? null,

        ...(await serverSideTranslations(locale)),
        shopSessionId: shopSession.id,
        [APOLLO_STATE_PROP_NAME]: apolloClient.extract(),
      },
    }
  } catch (error) {
    logger.error(error, 'Failed to get server side props for checkout page')
    return { notFound: true }
  }
}

export default NextCheckoutContactDetailsPage
