import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import { CurrencyCode } from '@/services/apollo/generated'
import { TierSelector, TierSelectorProps } from './TierSelector'

export default {
  title: 'Tier Selector',
  component: TierSelector,
} as ComponentMeta<typeof TierSelector>

const MockedOffers: TierSelectorProps['offers'] = [
  {
    id: '0',
    variant: { displayName: 'Trafikförsäkring', typeOfContract: 'Traffic' },
    price: { amount: 399, currencyCode: CurrencyCode.Sek, __typename: 'Money' },
  },
  {
    id: '1',
    variant: { displayName: 'Halvförsäkring', typeOfContract: 'Halvförsäkring' },
    price: { amount: 299, currencyCode: CurrencyCode.Sek, __typename: 'Money' },
  },
  {
    id: '2',
    variant: { displayName: 'Helförsäkring 🍒', typeOfContract: 'Driving' },
    price: { amount: 999, currencyCode: CurrencyCode.Sek, __typename: 'Money' },
  },
]

const Template: ComponentStory<typeof TierSelector> = (props) => {
  const [selected, setSelected] = useState(MockedOffers[0].id)
  return <TierSelector {...props} onValueChange={setSelected} selectedOfferId={selected} />
}

export const Default = Template.bind({})
Default.args = {
  offers: MockedOffers,
  currencyCode: 'SEK',
}
