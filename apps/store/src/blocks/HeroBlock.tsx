import styled from '@emotion/styled'
import { storyblokEditable } from '@storyblok/react'
import { ButtonBlock, ButtonBlockProps } from '@/blocks/ButtonBlock'
import { HeadingBlock, HeadingBlockProps } from '@/blocks/HeadingBlock'
import { ExpectedBlockType, SbBaseBlockProps, StoryblokImage } from '@/services/storyblok/storyblok'

type HeroBlockProps = SbBaseBlockProps<{
  content: ExpectedBlockType<HeadingBlockProps>
  background: StoryblokImage
  buttons: ExpectedBlockType<ButtonBlockProps>
}>

export const HeroBlock = ({ blok }: HeroBlockProps) => {
  return (
    <HeroSection {...storyblokEditable(blok)} bgImage={blok.background.filename}>
      <div>
        {blok.content.map((nestedBlock) => {
          return <HeadingBlock blok={nestedBlock} key={nestedBlock._uid} />
        })}
      </div>
      <div>
        {blok.buttons.map((nestedBlock) => (
          <ButtonBlock blok={nestedBlock} key={nestedBlock._uid} />
        ))}
      </div>
    </HeroSection>
  )
}
HeroBlock.blockName = 'hero'

const HeroSection = styled.section<{ bgImage: string }>(({ theme, bgImage }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '80vh',
  paddingTop: theme.space[9],
  paddingBottom: theme.space[9],
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  textAlign: 'center',
}))
