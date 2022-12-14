import styled from '@emotion/styled'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ReactNode, useState } from 'react'
import { CartCost } from '@/components/CartInventory/CartInventory.types'
import { MinusIcon } from '@/components/Perils/MinusIcon'
import { PlusIcon } from '@/components/Perils/PlusIcon'
import { Text } from '@/components/Text/Text'
import { useFormatter } from '@/utils/useFormatter'

type Props = {
  title: string
  cost: CartCost
  children: ReactNode
}

export const CartCollapsible = ({ children, title, cost }: Props) => {
  const formatter = useFormatter()

  const [open, setOpen] = useState(false)
  const closed = !open

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Trigger>
        <SpaceBetween>
          <Text size="l">{title}</Text>
          {closed && (
            <Text size="l" color="gray600">
              {formatter.monthlyPrice(cost.amount)}
            </Text>
          )}
        </SpaceBetween>
        {open ? <MinusIcon size="1.5rem" /> : <PlusIcon size="1.5rem" />}
      </Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  )
}

const Trigger = styled(Collapsible.Trigger)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.space[2],
}))

const SpaceBetween = styled.div(({ theme }) => ({
  flex: 1,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.space[2],
}))
