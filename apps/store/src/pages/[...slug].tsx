import { getStoryblokApi, StoryData, useStoryblokState } from '@storyblok/react'
import type { GetStaticPaths, GetStaticProps, NextPageWithLayout } from 'next'
import { LayoutWithMenu } from '@/components/LayoutWithMenu/LayoutWithMenu'

type Props = {
  story: StoryData
}

type Params = {
  slug: string[]
}

type Path = {
  params: {
    slug: string[]
  }
}

const Page: NextPageWithLayout<Props> = ({ story: initialStory }) => {
  const story = useStoryblokState(initialStory)

  return (
    <div>
      <h1>{story.name}</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const slug = params?.slug ? params.slug.join('/') : 'home'

  const sbParams = {
    version: 'draft',
  }

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get('cdn/links/')

  let paths: Path[] = []
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return
    }

    const slug = data.links[linkKey].slug
    const splittedSlug = slug.split('/')

    paths.push({ params: { slug: splittedSlug } })
  })

  return {
    paths: paths,
    fallback: false,
  }
}

Page.getLayout = (children) => <LayoutWithMenu>{children}</LayoutWithMenu>

export default Page
