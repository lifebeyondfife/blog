/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [50, 75, 90],
  },
  trailingSlash: true,
};

export default nextConfig;
