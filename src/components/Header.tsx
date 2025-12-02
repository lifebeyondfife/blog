import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header className="bg-ocean-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link href="/" className="block group">
              <h1 className="text-2xl md:text-3xl font-bold text-white group-hover:opacity-80 transition-opacity">
                {SITE_CONFIG.title}
              </h1>
              <p className="text-sm text-white opacity-90 mt-1 group-hover:opacity-75 transition-opacity">
                {SITE_CONFIG.description}
              </p>
            </Link>
          </div>
          <nav aria-label="Main navigation">
            <ul className="flex gap-6">
              <li>
                <Link href="/" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/categories" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
