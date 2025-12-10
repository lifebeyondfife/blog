import * as fs from 'fs';
import * as path from 'path';
import { SITE_CONFIG } from '../src/lib/constants';

const OUTPUT_DIR = path.join(process.cwd(), 'out');

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /

Sitemap: ${SITE_CONFIG.siteUrl}/sitemap.xml
`;
}

async function createRobotsFile(): Promise<void> {
  console.log('🤖 Generating robots.txt...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const robotsContent = generateRobotsTxt();
  const robotsPath = path.join(OUTPUT_DIR, 'robots.txt');
  
  fs.writeFileSync(robotsPath, robotsContent, 'utf-8');

  console.log(`✅ robots.txt generated`);
  console.log(`   📄 ${robotsPath}`);
  console.log(`   🔗 Sitemap: ${SITE_CONFIG.siteUrl}/sitemap.xml`);
}

createRobotsFile().catch(error => {
  console.error('❌ Error generating robots.txt:', error);
  process.exit(1);
});
