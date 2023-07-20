/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/foundation/colors',
        permanent: true,
      },
    ]
  },
}

const { withContentlayer } = require('next-contentlayer')
module.exports = withContentlayer(nextConfig)
