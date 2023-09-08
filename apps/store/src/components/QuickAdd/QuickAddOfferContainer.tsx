import { useTranslation } from 'next-i18next'
import { Text } from 'ui'
import {
  OfferRecommendationFragment,
  ProductRecommendationFragment,
} from '@/services/apollo/generated'
import { AddToCartButton } from './AddToCartButton'
import { DismissButton } from './DismissButton'
import { QuickAdd } from './QuickAdd'
import { useShowQuickAdd } from './useShowQuickAdd'

const CO_INSURED_DATA_KEY = 'numberCoInsured'

type Props = {
  shopSessionId: string
  offer: OfferRecommendationFragment
  product: ProductRecommendationFragment
}

export const QuickAddOfferContainer = (props: Props) => {
  const { t } = useTranslation('cart')
  const [show] = useShowQuickAdd()

  // Assume Accident insurance
  const householdSize = (parseInt(props.offer.priceIntentData[CO_INSURED_DATA_KEY]) || 0) + 1
  const subtitle = t('QUICK_ADD_HOUSEHOLD_SIZE', { count: householdSize })

  const cost = {
    currencyCode: props.offer.cost.net.currencyCode,
    amount: props.offer.cost.gross.amount,
    reducedAmount: props.offer.cost.discount.amount > 0 ? props.offer.cost.net.amount : undefined,
  } as const

  if (!show) return null

  return (
    <QuickAdd
      title={props.product.displayNameFull}
      subtitle={subtitle}
      pillow={props.product.pillowImage}
      href={props.product.pageLink}
      cost={cost}
      Body={
        // Assume Accident insurance
        <Text as="p" color="textTranslucentSecondary">
          {t('ACCIDENT_OFFER_DESCRIPTION')}
        </Text>
      }
    >
      <AddToCartButton
        shopSessionId={props.shopSessionId}
        productName={props.product.name}
        offer={props.offer}
      />
      <DismissButton />
    </QuickAdd>
  )
}
