import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle, siteDescription } from '../components/layout'

export default function Home() {
  return (
    <div class="bg-hero-image bg-center bg-cover grid md:grid-cols-5">
      <section class="p-3 col-start-2 col-span-3 text-3xl text-sky-100 text-center
        md:text-left font-bold">{siteDescription}</section>
      <div class="col-start-2 col-span-3">
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
      </Layout>
      </div>
    </div>
  )
}
