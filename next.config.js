/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  images: {
    domains: ['localhost'],
    minimumCacheTTL: 60,
    formats: ['image/webp']
  },
  experimental: {
    serverComponentsExternalPackages: ['pdf-lib'],
    optimizeCss: true,
    scrollRestoration: true
  },
  transpilePackages: ['lucide-react']
}

module.exports = nextConfig
