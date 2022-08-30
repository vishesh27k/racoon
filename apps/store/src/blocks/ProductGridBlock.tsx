import styled from '@emotion/styled'
import { storyblokEditable } from '@storyblok/react'
import { useMemo } from 'react'
import { ProductCardBlock, ProductCardBlockProps } from '@/blocks/ProductCardBlock'
import { ProductGrid } from '@/components/ProductGrid/ProductGrid'
import { ExpectedBlockType, SbBaseBlockProps } from '@/services/storyblok/storyblok'

type ProductGridBlockProps = SbBaseBlockProps<{
  title?: string
  items: ExpectedBlockType<ProductCardBlockProps>
}>

export const ProductGridBlock = ({ blok }: ProductGridBlockProps) => {
  const items = useMemo(() => blok.items.map((item) => ({ key: item._uid, ...item })), [blok.items])
  return (
    <Wrapper>
      <ProductGrid title={blok.title} items={items} {...storyblokEditable(blok)}>
        {(nestedBlock) => <ProductCardBlock key={nestedBlock._uid} blok={nestedBlock} />}
      </ProductGrid>
    </Wrapper>
  )
}
ProductGridBlock.blockName = 'productGrid'

const Wrapper = styled.div(({ theme }) => ({
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
}))
