import { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you're looking for doesn't exist on ${SITE_CONFIG.title}`,
  openGraph: {
    title: `Page Not Found | ${SITE_CONFIG.title}`,
    description: `The page you're looking for doesn't exist on ${SITE_CONFIG.title}`,
    type: "website",
    url: `${SITE_CONFIG.siteUrl}/404/`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-horizon mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-cloud-grey mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-cloud-grey mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-ocean-dark dark:bg-ocean-slate text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-ocean-steel transition-colors shadow-sm"
          >
            Go to Homepage
          </Link>
          <Link
            href="/posts"
            className="inline-block bg-white dark:bg-ocean-deep text-ocean-dark dark:text-sky-blue border-2 border-ocean-blue dark:border-ocean-steel px-8 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-ocean-slate transition-colors shadow-sm"
          >
            Browse All Posts
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-ocean-slate">
          <p className="text-gray-600 dark:text-cloud-grey mb-4">
            You might be looking for:
          </p>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            <li>
              <Link href="/about" className="text-ocean-dark dark:text-sky-blue hover:text-gray-900 dark:hover:text-horizon hover:underline font-medium">
                About {SITE_CONFIG.title}
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-ocean-dark dark:text-sky-blue hover:text-gray-900 dark:hover:text-horizon hover:underline font-medium">
                Browse by category
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
