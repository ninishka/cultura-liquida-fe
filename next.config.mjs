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
    PUBLIC_KEY_BTN: process.env.PUBLIC_KEY_BTN,
    PATH_TO_API: process.env.PATH_TO_API,

    PAYU_API_KEY: process.env.PAYU_API_KEY,
    PAYU_API_MERCHANT: process.env.PAYU_API_MERCHANT,
    PAYU_ACCOUNT_ID: process.env.PAYU_ACCOUNT_ID
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
