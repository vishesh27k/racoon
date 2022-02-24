import { Heading, LinkButton, Space, mq } from 'ui'

import { Footer } from './components/footer'
import { Hero } from '../cart/components/hero'
import type { NextPage } from 'next'
import { PageLayout } from './components/page-layout'
import { SsnInputForm } from './components/ssn-input-form'
import styled from '@emotion/styled'

const Grid = styled.div({
  [mq.md]: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '100vh',
  },
})

const Col = styled.div({
  [mq.md]: {
    gridColumn: '2',
    width: '50vw',
    overflow: 'auto',
  },
})

const Content = styled.div({
  padding: '1rem',
  width: '100%',
  maxWidth: '30rem',
  margin: '0 auto',

  [mq.md]: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '4rem 1rem',
  },
})

const Text = styled.p(({ theme }) => ({
  lineHeight: '1.5rem',
  fontSize: '1rem',
  color: theme.colors.gray700,
  margin: 0,
}))

const Spacer = styled.div({
  height: '3rem',
})

const NewMemberStartPage: NextPage = () => {
  return (
    <PageLayout headerVariant="light">
      <Grid>
        <Hero
          mobileImgSrc="/racoon-assets/hero_start_mobile.jpg"
          desktopImgSrc="/racoon-assets/hero_start_desktop.jpg"
        />
        <Col>
          <Content>
            <Space y={1}>
              <Heading variant="s" headingLevel="h1" colorVariant="dark">
                Get faster, simpler and smoother insurance
              </Heading>
              <Text>
                Enter your personal number to get a smart price quote. We will pick up information
                about your home automatically.
              </Text>
              <SsnInputForm />
              <LinkButton href="https://www.hedvig.com/se-en/new-member/new" $variant="text">
                {'Submit my information manually  >'}
              </LinkButton>
              <Spacer />
              <Footer />
            </Space>
          </Content>
        </Col>
      </Grid>
    </PageLayout>
  )
}

export default NewMemberStartPage
