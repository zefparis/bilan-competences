/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
    scrollRestoration: true
  },
  transpilePackages: ['lucide-react']
}

module.exports = nextConfig
