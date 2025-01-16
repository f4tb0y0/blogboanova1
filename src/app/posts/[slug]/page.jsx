import { SinglePost } from '@/queries/posts'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { draftMode } from 'next/headers'
import { HygraphClient } from '@/utils/client'


async function getData(slug) {
  const { isEnabled } = draftMode()
  const client = HygraphClient({preview: isEnabled})

  const variables = { slug: slug }


  const { post } = await client.request(SinglePost, variables)  
  return post
}

export async function generateMetadata({ params }) {

  const post = await getData(params.slug)
  if (!post) return notFound()
  return {
    title: post.title,
    description: post.description || post.seo?.description,
    openGraph: {
      images: [
        {
          url: post.coverImage?.url,
          width: post.coverImage?.width,
          height: post.coverImage?.height
        }
      ]
    }
  }
}

export default async function Post({ params }) {

  const post = await getData(params.slug)
 
  if (!post) {
    return notFound()
  }
  return (
    <article>
      <header className="pt-6 lg:pb-10">
        <div className="space-y-1">
          <div>
            <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {post.title}
            </h1>
          </div>
        </div>
      </header>
      <div
        className="divide-y lg:divide-y-0 divide-gray-200 lg:grid lg:grid-cols-[200px_1fr] gap-x-6 pb-16 lg:pb-20"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        {/* Conteúdo do Post */}
        <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 lg:col-start-1 lg:row-start-2">
          <div className="pt-8">
            <Link href="/" className="text-purple-500 hover:text-purple-600">
              &larr; De volta ao Inicio
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
