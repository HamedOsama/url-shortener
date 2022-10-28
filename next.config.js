/** @type {import('next').NextConfig} */
const nextConfig = {


}

module.exports = {
  compiler: { styledComponents: true },
  images: {
    domains: [
      "s2.googleusercontent.com",
      "www.google.com",
      "avatar.tobi.sh",
      "faisalman.github.io",
      "avatars.dicebear.com",
      "res.cloudinary.com",
    ],
  },
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
