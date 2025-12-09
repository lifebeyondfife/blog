import { Metadata } from 'next';
import  Link  from 'next/link';
import { BookOpen, Code, Briefcase, Podcast, Plane, Dumbbell } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Engineering leader, writer, and creator. Learn about my work in engineering management, open source projects, podcasts, and blog series.',
  openGraph: {
    title: `About | ${SITE_CONFIG.title}`,
    description: 'Engineering leader, writer, and creator. Learn about my work in engineering management, open source projects, podcasts, and blog series.',
    type: 'website',
    url: `${SITE_CONFIG.siteUrl}/about/`,
  },
  alternates: {
    canonical: '/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <img 
              src="/images/originals/me.jpg" 
              alt={SITE_CONFIG.author}
              className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-white ring-2 ring-slate-200"
            />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">About {SITE_CONFIG.author}</h1>
        </div>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 p-4 rounded-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Engineering Leader</h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <p className="text-lg text-slate-700 mb-6">
              Engineering leader and AI PhD with two decades of industry experience, scaling teams, processes, and technology. Manager at Skyscanner (acquired for £1.4bn) for B2B white label and travel widget products, and SEO pages. Part of the engineering senior leadership team at Smartsheet (acquired for $8.4bn) for advanced automation, and audit, history, and event platforms — petabytes of storage, processing 100k events per second.
            </p>
            <p className="text-lg text-slate-700 mb-6">
              I've cultivated a deep understanding of what makes engineering teams thrive. My approach combines technical excellence with empathetic management, always prioritizing sustainable delivery and team growth.
            </p>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 text-lg mb-3">Key Resources:</h3>
              <Link href="/management/what-are-your-engineering-culture-values" className="block text-blue-600 hover:text-blue-700 hover:underline">
                → What are your engineering culture values?
              </Link>
              <Link href="/management/manager-readme-2021" className="block text-blue-600 hover:text-blue-700 hover:underline">
                → Manager README 2021
              </Link>
              <Link href="/management/manager-readme" className="block text-blue-600 hover:text-blue-700 hover:underline">
                → Manager README (2018)
              </Link>
              {/* <Link href="/management/management-books-recommendations" className="block text-blue-600 hover:text-blue-700 hover:underline">
                → Management Books I Recommend (coming soon)
              </Link> */}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-emerald-600 p-4 rounded-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Travel Widgets</h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <p className="text-lg text-slate-700 mb-6">
              In 2016, as an engineering manager at Skyscanner, I led the creation of Travel Widgets—configurable, 
              embeddable components that allow partners to integrate flight search functionality into their websites. 
              These widgets remain in production today, serving millions of searches globally and demonstrating the 
              power of well-architected, maintainable software.
            </p>
            <p className="text-slate-700 mb-6">
              The widgets are highly customizable, supporting multiple languages, currencies, and design configurations 
              to seamlessly integrate with partner sites.
            </p>
            <a 
              href="https://www.partners.skyscanner.net/affiliates/travel-widgets" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-700 hover:underline mb-8"
            >
              Learn more about Skyscanner Travel Widgets →
            </a>
            
            <div className="bg-cloud-grey rounded-lg p-6 border-2 border-solid border-slate-300">
              <div data-skyscanner-widget="FlightSearchWidget" data-locale="en-GB" data-params="colour:#B4C7D8;fontColour:#3d6585;associateId:API_SSV_10880_00001" data-powered-by-logo-colour="dark" data-button-colour="lunar" data-origin-geo-lookup="true"></div>
              <script src="https://widgets.skyscanner.net/widget-server/js/loader.js" async></script>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-slate-800 p-4 rounded-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">GitHub Projects</h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <p className="text-lg text-slate-700 mb-6">
              My GitHub account showcases various projects spanning constraint programming, infrastructure as code, 
              and practical utilities. These projects reflect my passion for solving interesting problems and sharing 
              knowledge with the developer community.
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  <a 
                    href="https://github.com/lifebeyondfife/Decider" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Decider ⭐ 150+
                  </a>
                </h3>
                <p className="text-slate-700">
                  A C# constraint programming library that makes solving complex combinatorial problems accessible and intuitive.
                </p>
              </div>
              
              <div className="border-l-4 border-emerald-600 pl-6">
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  <a 
                    href="https://github.com/lifebeyondfife/simple-static-website" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    simple-static-website
                  </a>
                </h3>
                <p className="text-slate-700">
                  CloudFormation script that provisions complete static website infrastructure on AWS — the very infrastructure 
                  powering this Next.js website you&apos;re reading now.
                </p>
              </div>

              <div className="border-l-4 border-slate-600 pl-6">
                <h3 className="font-bold text-xl text-slate-900 mb-2">
                  <a 
                    href="https://github.com/lifebeyondfife/blog" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    blog
                  </a>
                </h3>
                <p className="text-slate-700">
                  This Next.js TypeScript static website itself. Built from the ground up assisted by Anthropic Claude.
                </p>
              </div>

              <div className="mt-6">
                <a 
                  href="https://github.com/lifebeyondfife" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Explore more projects on GitHub →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-600 p-4 rounded-lg">
              <Podcast className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Engineering Culture Podcast</h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <p className="text-lg text-slate-700 mb-6">
              The Engineering Culture podcast explores the inner workings of great engineering teams. Through insights based
              on personal experience, we dive into the practices, values, and leadership principles that create environments where 
              engineers thrive and deliver exceptional work.
            </p>
            <p className="text-slate-700 mb-6">
              The first half of Series 1 is now available on all major podcast platforms. Episodes explore topics 
              ranging from the growth mindset, product-market fit, engineering excellence, being data led, and more.
            </p>
            <a 
              href="https://shows.acast.com/engineering-culture" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Listen Now on Acast
            </a>
            <p className="text-sm text-slate-600 mt-4">
              Also available on Apple Podcasts, Spotify, Google Podcasts, and other platforms
            </p>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-amber-600 p-4 rounded-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Blog Series</h2>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <p className="text-lg text-slate-700 mb-8">
              Over the years, I&apos;ve written comprehensive multi-part series exploring topics I&apos;m passionate about. 
              These deep dives provide practical knowledge and frameworks you can apply immediately.
            </p>
            
            <div className="space-y-8">
              <div className="border-l-4 border-red-600 pl-6">
                <div className="flex items-start gap-3 mb-3">
                  <Dumbbell className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-2xl text-slate-900 mb-2">
                      <Link href="/fitness/" className="text-blue-600 hover:text-blue-700 hover:underline">
                        Route to Fitness
                      </Link>
                    </h3>
                    <p className="text-slate-700 mb-3">
                      A comprehensive 27-part series on strength training and sustainable fitness. Learn the fundamentals 
                      of getting strong, understanding your body, and building lifelong fitness habits that actually work.
                    </p>
                    <a 
                      href="https://www.amazon.co.uk/Route-Fitness-Before-Setting-Foot-ebook/dp/B08RY8CJQ1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-semibold"
                    >
                      Available on Amazon Kindle
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-bold text-2xl text-slate-900 mb-2">
                  <Link href="/compsci/" className="text-blue-600 hover:text-blue-700 hover:underline">
                    Computer Science in Plain English
                  </Link>
                </h3>
                <p className="text-slate-700">
                  A 5-part series demystifying core computer science concepts. Perfect for those learning to program 
                  or wanting to understand the fundamentals without the academic jargon.
                </p>
              </div>

              <div className="border-l-4 border-slate-700 pl-6">
                <h3 className="font-bold text-2xl text-slate-900 mb-2">
                  <Link href="/git/" className="text-blue-600 hover:text-blue-700 hover:underline">
                    Introduction to Git
                  </Link>
                </h3>
                <p className="text-slate-700">
                  A 19-part series on gently introducing simple patterns in Git. Using basic commands to grasp the mental models 
                  and workflows that make Git an incredibly powerful tool for individual developers and teams alike.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
