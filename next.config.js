/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

const { withContentlayer } = require('next-contentlayer')
module.exports = withContentlayer(nextConfig)
