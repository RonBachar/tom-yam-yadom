/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/shop/p/herbal-boost-balance",
        destination: "/products/balance",
        permanent: true,
      },
      {
        source: "/shop/p/herbal-boost-vitality",
        destination: "/products/vitality",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
