/** @type {import('next').NextConfig} */
const nextConfig = {


}

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: '/:key*',
        destination: '/api/redirect',
      },
    ]
  },
  headers: async () => {
    return [
      {
        source: "/:key*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Cache-Control",
            value: "no-cache"
          }
        ],
      },
    ];
  },
}
