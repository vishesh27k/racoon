import styled from '@emotion/styled'
import React from 'react'
import { mq } from 'ui'
import { Navigation } from '../HeaderStyles'
import { NavigationPrimaryList } from '../HeaderStyles'

export type TopMenuDesktopProps = {
  children: React.ReactNode
}

const Wrapper = styled.div({
  display: 'none',
  [mq.lg]: {
    display: 'block',
  },
})

export const TopMenuDesktop = ({ children }: TopMenuDesktopProps) => {
  return (
    <Wrapper>
      <Navigation>
        <NavigationPrimaryList>{children}</NavigationPrimaryList>
      </Navigation>
    </Wrapper>
  )
}
