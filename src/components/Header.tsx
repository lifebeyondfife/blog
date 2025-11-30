import { SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header className="bg-ocean-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{SITE_CONFIG.title}</h1>
            <p className="text-sm text-white opacity-90 mt-1">{SITE_CONFIG.description}</p>
          </div>
          <nav aria-label="Main navigation">
            <ul className="flex gap-6">
              <li>
                <a 
                  href="/" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/posts" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  Posts
                </a>
              </li>
              <li>
                <a 
                  href="/categories" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  Categories
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-white hover:opacity-80 transition-opacity font-medium border-b-2 border-transparent hover:border-white/50"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
