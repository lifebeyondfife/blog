import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Rss } from 'lucide-react';
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ocean-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-medium">
              © 2011-{currentYear} {SITE_CONFIG.author}
            </p>
            <p className="text-sm text-white opacity-80 mt-1">
              {SITE_CONFIG.bio}
            </p>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://github.com/lifebeyondfife" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/iain-m-mcdonald/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a 
              href="/rss.xml" 
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="RSS Feed"
            >
              <Rss className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
