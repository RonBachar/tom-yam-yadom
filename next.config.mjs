/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/shop/p/herbal-boost-:scent",
        destination: "/products/:scent",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/story",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
