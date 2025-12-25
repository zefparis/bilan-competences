/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-lib']
  },
  images: {
    domains: ['localhost']
  }
}

module.exports = nextConfig
