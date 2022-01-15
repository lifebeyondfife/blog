import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export const siteTitle = "Life Beyond Fife"
export const siteDescription = "Engineering from the glorious Kingdom"

export default function Layout({ children, home }) {
  const label = (
    <div class="m-6 p-6 bg-white md:mx-auto rounded-xl shadow-lg flex items-center space-x-4">
      <div class="shrink-0">
        <Image
          priority
          className="rounded-lg"
          src="/images/profile.jpg"
          height={144}
          width={144}
          alt="Iain McDonald"
        />
      </div>
      <div>
        <div class="text-2xl font-medium text-zinc-700"><span class="font-serif">I</span>ain McDonald</div>
        <p class="text-xl text-gray-700 cursor-sw-resize">Engineer</p>
      </div>
    </div>
  )

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={siteDescription}
        />
        <meta
          property="og:image"
          content="/images/profile.jpg"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header>
        {home ? (
          label
        ) : (
          <Link href="/">
            <a>
              {label}
            </a>
          </Link>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Home</a>
          </Link>
        </div>
      )}
    </div>
  )
}