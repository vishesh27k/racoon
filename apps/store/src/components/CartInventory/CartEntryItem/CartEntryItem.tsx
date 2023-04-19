import styled from '@emotion/styled'
import * as AccordionPrimitives from '@radix-ui/react-accordion'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Button, ChevronIcon, Dialog, Text, mq, theme } from 'ui'
import * as Accordion from '@/components/Accordion/Accordion'
import { Pillow } from '@/components/Pillow/Pillow'
import { CartFragmentFragment } from '@/services/apollo/generated'
import { useFormatter } from '@/utils/useFormatter'
import { CartEntry } from '../CartInventory.types'
import { RemoveEntryDialog } from '../RemoveEntryDialog'
import { DetailsSheet } from './DetailsSheet'

type Props = CartEntry & {
  cartId: string
  readOnly?: boolean
  onRemove?: (cart: CartFragmentFragment) => void
}

export const CartEntryItem = (props: Props) => {
  const { cartId, readOnly, onRemove, ...cartEntry } = props
  const { title: titleLabel, startDate, cost, pillow } = cartEntry
  const { t } = useTranslation('cart')
  const formatter = useFormatter()

  const [openedItem, setOpenedItem] = useState<string>()

  return (
    <Layout.Main>
      <Layout.Pillow>
        <Pillow size="small" {...pillow} />
      </Layout.Pillow>

      <Layout.Title>
        <Text>{titleLabel}</Text>
        <Text color="textSecondary">
          {startDate
            ? t('CART_ENTRY_DATE_LABEL', { date: formatter.fromNow(startDate) })
            : t('CART_ENTRY_AUTO_SWITCH')}
        </Text>
      </Layout.Title>

      <Layout.Details>
        <Accordion.Root
          type="single"
          collapsible
          value={openedItem}
          onValueChange={(value) => setOpenedItem(value)}
        >
          <AccordionPrimitives.Item value="details">
            <DetailsHeader>
              <Trigger>
                {t('VIEW_ENTRY_DETAILS_BUTTON')}
                <ChevronIcon color={theme.colors.textTertiary} size="1rem" />
              </Trigger>
              <PriceFlex>
                <Text>{formatter.monthlyPrice(cost)}</Text>
              </PriceFlex>
            </DetailsHeader>
            <Accordion.Content open={openedItem === 'details'}>
              <DetailsSheet {...cartEntry} />
            </Accordion.Content>
          </AccordionPrimitives.Item>
        </Accordion.Root>
      </Layout.Details>

      <Layout.Actions>
        <ActionsRow>
          {!readOnly && (
            <RemoveEntryDialog cartId={cartId} onCompleted={onRemove} {...cartEntry}>
              <Dialog.Trigger asChild>
                <Button variant="secondary-alt" size="small">
                  {t('REMOVE_ENTRY_BUTTON')}
                </Button>
              </Dialog.Trigger>
            </RemoveEntryDialog>
          )}
        </ActionsRow>
      </Layout.Actions>
    </Layout.Main>
  )
}

const GRID_AREAS = {
  Pillow: 'pillow',
  Title: 'title',
  Details: 'details',
  Price: 'price',
  Content: 'content',
  Actions: 'actions',
  Empty: 'empty',
} as const

const Main = styled.li({
  display: 'grid',
  columnGap: theme.space.sm,
  rowGap: theme.space.md,
  gridTemplateAreas: `
    "${GRID_AREAS.Pillow} ${GRID_AREAS.Title} ${GRID_AREAS.Title}"
    "${GRID_AREAS.Details} ${GRID_AREAS.Details} ${GRID_AREAS.Details}"
    "${GRID_AREAS.Actions} ${GRID_AREAS.Actions} ${GRID_AREAS.Actions}"
  `,
  gridTemplateColumns: '3rem minmax(0, 1fr)',
  padding: theme.space.md,
  borderRadius: theme.radius.sm,
  backgroundColor: theme.colors.opaque1,

  [mq.md]: {
    padding: theme.space.lg,
  },
})

const Layout = {
  Main,
  Pillow: styled.div({
    gridArea: GRID_AREAS.Pillow,
    [mq.md]: {
      marginBottom: theme.space.xs,
    },
  }),
  Title: styled.div({ gridArea: GRID_AREAS.Title }),
  Details: styled.div({
    gridArea: GRID_AREAS.Details,
    paddingTop: theme.space.md,
    borderTop: `1px solid ${theme.colors.borderTranslucent}`,
  }),
  Price: styled.div({ gridArea: GRID_AREAS.Price }),
  Content: styled.div({ gridArea: GRID_AREAS.Content }),
  Actions: styled.div({ gridArea: GRID_AREAS.Actions }),
} as const

const PriceFlex = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
})

const Trigger = styled(AccordionPrimitives.Trigger)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.space.xs,
  cursor: 'pointer',
  fontSize: theme.fontSizes.md,

  svg: {
    transition: 'transform 200ms cubic-bezier(0.77,0,0.18,1)',

    ['[data-state=open] &']: {
      transform: 'rotate(180deg)',
    },
  },
})

const DetailsHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
})

const ActionsRow = styled.div({
  display: 'flex',
  gap: theme.space.sm,
  '> *': {
    width: '50%',
  },
})
