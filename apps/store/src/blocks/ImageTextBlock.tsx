import styled from '@emotion/styled'
import { SbBlokData, StoryblokComponent } from '@storyblok/react'
import { ConditionalWrapper, mq, theme } from 'ui'
import { GridLayout } from '@/components/GridLayout/GridLayout'
import { SbBaseBlockProps, ExpectedBlockType } from '@/services/storyblok/storyblok'
import { filterByBlockType } from '@/services/storyblok/Storyblok.helpers'
import { ImageBlock, ImageBlockProps } from './ImageBlock'

type Orientation = 'vertical' | 'fluid'
type TextAlignment = 'top' | 'center' | 'bottom'
type TextHorizontalAlignment = 'left' | 'center' | 'right'
type ImagePlacement = 'left' | 'right'

const DEFAULT_ORIENTATION: Orientation = 'vertical'
const DEFAULT_TEXT_ALIGNMENT: TextAlignment = 'top'
const DEFAULT_TEXT_HORIZONTAL_ALIGNMENT: TextHorizontalAlignment = 'left'
const DEFAULT_IMAGE_PLACEMENT: ImagePlacement = 'right'

export type ImageTextBlockProps = SbBaseBlockProps<{
  image: ExpectedBlockType<ImageBlockProps>
  body?: SbBlokData[]
  orientation?: Orientation
  // TODO: rename this to 'textVerticalAlignment'
  textAlignment?: TextAlignment
  textHorizontalAlignment?: TextHorizontalAlignment
  imagePlacement?: ImagePlacement
}>

export const ImageTextBlock = ({ blok, nested }: ImageTextBlockProps) => {
  const { orientation = DEFAULT_ORIENTATION } = blok
  // We expect only one image from Storyblok
  const imageBlock = Array.isArray(blok.image)
    ? filterByBlockType(blok.image, ImageBlock.blockName)[0]
    : undefined

  switch (orientation) {
    case 'fluid':
      return (
        <FluidImageTextBlock
          imageBlock={imageBlock}
          body={blok.body}
          textAlignment={blok.textAlignment}
          textHorizontalAlignment={blok.textHorizontalAlignment}
          imagePlacement={blok.imagePlacement}
          nested={nested}
        />
      )
    case 'vertical':
      return <VerticalImageTextBlock imageBlock={imageBlock} body={blok.body} nested={nested} />
    default:
      console.warn(`orientation type '${orientation}' is not valid`)
      return null
  }
}
ImageTextBlock.blockName = 'imageText'

type VerticalImageTextBlockProps = Pick<ImageTextBlockProps['blok'], 'body' | 'nested'> & {
  imageBlock?: ImageBlockProps['blok']
}

const VerticalImageTextBlock = ({ imageBlock, body, nested }: VerticalImageTextBlockProps) => {
  return (
    <ConditionalWrapper
      condition={!nested}
      wrapWith={(children) => <ImageTextBlockWrapper>{children}</ImageTextBlockWrapper>}
    >
      {imageBlock && <ImageBlock key={imageBlock._uid} blok={imageBlock} nested={true} />}
      <VerticalBodyWrapper>
        {body?.map((nestedBlock) => (
          <StoryblokComponent key={nestedBlock._uid} blok={nestedBlock} nested={true} />
        ))}
      </VerticalBodyWrapper>
    </ConditionalWrapper>
  )
}

const VerticalBodyWrapper = styled.div({
  padding: theme.space.xs,

  [mq.md]: {
    paddingBlock: theme.space.md,
  },
})

type FluidImageTextBlockProps = Pick<
  ImageTextBlockProps['blok'],
  'body' | 'textAlignment' | 'textHorizontalAlignment' | 'imagePlacement' | 'nested'
> & { imageBlock?: ImageBlockProps['blok'] }

const FluidImageTextBlock = ({
  imageBlock,
  body,
  textAlignment = DEFAULT_TEXT_ALIGNMENT,
  textHorizontalAlignment = DEFAULT_TEXT_HORIZONTAL_ALIGNMENT,
  imagePlacement = DEFAULT_IMAGE_PLACEMENT,
  nested,
}: FluidImageTextBlockProps) => {
  return (
    <ConditionalWrapper
      condition={!nested}
      wrapWith={(children) => <ImageTextBlockWrapper>{children}</ImageTextBlockWrapper>}
    >
      <FluidImageTextBlockGrid>
        {imageBlock && (
          <GridLayout.Content width="1/2">
            <ImageBlock key={imageBlock._uid} blok={imageBlock} nested={true} />
          </GridLayout.Content>
        )}
        <FluidBodyWrapper
          imagePlacement={imagePlacement}
          textAlignment={textAlignment}
          textHorizontalAlignment={textHorizontalAlignment}
        >
          <FluidBodyInnerWrapper>
            {body?.map((nestedBlock) => (
              <StoryblokComponent key={nestedBlock._uid} blok={nestedBlock} nested={true} />
            ))}
          </FluidBodyInnerWrapper>
        </FluidBodyWrapper>
      </FluidImageTextBlockGrid>
    </ConditionalWrapper>
  )
}

const FluidImageTextBlockGrid = styled(GridLayout.Root)({
  rowGap: theme.space.md,
  '&&': {
    padding: 0,
  },

  [mq.lg]: {
    columnGap: theme.space.xxxl,
  },
})

const ImageTextBlockWrapper = styled.div({
  paddingInline: theme.space.xs,

  [mq.md]: {
    paddingInline: theme.space.md,
  },
})

export const FluidBodyWrapper = styled.div<{
  textAlignment: TextAlignment
  textHorizontalAlignment: TextHorizontalAlignment
  imagePlacement: ImagePlacement
}>(({ textAlignment, textHorizontalAlignment, imagePlacement }) => ({
  gridColumn: '1 / -1',

  [mq.lg]: {
    gridColumn: 'span 6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: getTextAlignmentStyles(textAlignment),
    alignItems: getTextAlignmentStyles(textHorizontalAlignment),
    order: imagePlacement === 'right' ? -1 : 'initial',
  },
}))

const FluidBodyInnerWrapper = styled.div({
  paddingInline: theme.space.xs,

  [mq.lg]: {
    paddingInline: 0,
    maxWidth: '37.5rem',
  },
})

const getTextAlignmentStyles = (alignment: TextAlignment | TextHorizontalAlignment) => {
  switch (alignment) {
    case 'top':
    case 'left':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'bottom':
    case 'right':
      return 'flex-end'
    default:
      return 'initial'
  }
}
