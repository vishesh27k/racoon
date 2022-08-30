import styled from '@emotion/styled'
import { storyblokEditable } from '@storyblok/react'
import { Slideshow } from '@/components/Slideshow/Slideshow'
import { ExpectedBlockType, SbBaseBlockProps } from '@/services/storyblok/storyblok'
import { TopPickCardBlock, TopPickCardBlockProps } from './TopPickCardBlock'

type ProductSlideshowBlockProps = SbBaseBlockProps<{
  title?: string
  items: ExpectedBlockType<TopPickCardBlockProps>
}>

export const ProductSlideshowBlock = ({ blok }: ProductSlideshowBlockProps) => {
  return (
    <Wrapper {...storyblokEditable(blok)}>
      <Slideshow title={blok.title}>
        {blok.items.map((nestedBlock) => (
          <TopPickCardBlock key={nestedBlock._uid} blok={nestedBlock} />
        ))}
      </Slideshow>
    </Wrapper>
  )
}
ProductSlideshowBlock.blockName = 'productSlideshow'

const Wrapper = styled.div(({ theme }) => ({
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
}))
