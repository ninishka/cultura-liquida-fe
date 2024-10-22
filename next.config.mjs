/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  compiler: {
    styledComponents: true,
  },

  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/product/melena-de-leon-capsules',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
