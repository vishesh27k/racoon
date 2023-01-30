import styled from '@emotion/styled'
import { Heading, Space, Text, theme } from 'ui'
import { LinkField } from '@/services/storyblok/storyblok'
import { getLinkFieldURL } from '@/services/storyblok/Storyblok.helpers'
import { ContactCard } from '../ContactCard/ContactCard'
import { IntercomChatButton } from './IntercomChatButton'

export type ContactSupportProps = {
  title: string
  chatTitle: string
  chatOpeningHours?: string
  phoneTitle: string
  phoneOpeningHours?: string
  phoneLink: LinkField
}

export const ContactSupport = ({
  title,
  chatTitle,
  chatOpeningHours,
  phoneTitle,
  phoneOpeningHours,
  phoneLink,
}: ContactSupportProps) => {
  return (
    <Main>
      <Space y={1.5}>
        <Heading
          as="h2"
          align="center"
          color="textPrimary"
          variant={{ _: 'standard.24', lg: 'standard.24' }}
          mb={theme.space.lg}
        >
          {title}
        </Heading>
        <CardWrapper>
          <IntercomChatButton>
            <ContactCard icon="icon">
              <Text size={{ _: 'sm', md: 'md' }}>{chatTitle}</Text>
              {chatOpeningHours && (
                <Text size={{ _: 'sm', md: 'md' }} color="textSecondary">
                  {chatOpeningHours}
                </Text>
              )}
            </ContactCard>
          </IntercomChatButton>
          <PhoneLink href={getLinkFieldURL(phoneLink)}>
            <ContactCard icon="icon">
              <Text size={{ _: 'sm', md: 'md' }}>{phoneTitle}</Text>
              {phoneOpeningHours && (
                <Text size={{ _: 'sm', md: 'md' }} color="textSecondary">
                  {phoneOpeningHours}
                </Text>
              )}
            </ContactCard>
          </PhoneLink>
        </CardWrapper>
      </Space>
    </Main>
  )
}

const Main = styled.main(({ theme }) => ({
  padding: theme.space[4],
  paddingTop: theme.space[5],
  paddingBottom: theme.space[5],
  textAlign: 'center',
}))

const CardWrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2,minmax(min-content, 14rem))',
  justifyContent: 'center',
  gap: theme.space.md,
})

const PhoneLink = styled.a({})
