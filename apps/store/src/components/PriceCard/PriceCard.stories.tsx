import { ComponentMeta, Story } from '@storybook/react'
import { PriceCard, PriceCardProps } from './PriceCard'
import { HEDVIG_LOGO_SYMBOL } from './PriceCard.constants'

export default {
  title: 'Price Card',
  component: PriceCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof PriceCard>

const Template: Story<PriceCardProps> = (props) => {
  return <PriceCard {...props} />
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: `${HEDVIG_LOGO_SYMBOL} Home`,
  gradient: ['#aaaaaa', '#828282'],
  currencyCode: 'SEK',
  loading: false,
}

export const ShowingPrice = Template.bind({})
ShowingPrice.args = {
  name: `${HEDVIG_LOGO_SYMBOL} Home`,
  cost: 112,
  currencyCode: 'SEK',
  gradient: ['#aaaaaa', '#828282'],
  loading: false,
}
