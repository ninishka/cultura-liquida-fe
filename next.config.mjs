/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  experimental: {
    instrumentationHook: true,
  },
  compiler: {
    styledComponents: true,
  },

  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    ACCESSTOKEN_TEST: process.env.ACCESSTOKEN_TEST,
    ACCESSTOKEN: process.env.ACCESSTOKEN,
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
