/** @type {import('next').NextConfig} */
const nextConfig = {


}

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: '/:key',
        destination: '/api/redirect',
      },
    ]
  },
}
