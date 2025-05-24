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

    ACCESSTOKEN: process.env.ACCESSTOKEN,
    PUBLIC_KEY_BTN: process.env.PUBLIC_KEY_BTN,
    PATH_TO_API: process.env.PATH_TO_API,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ADMIN_PWD: process.env.ADMIN_PWD,
    BACK_URL: process.env.BACK_URL,
    WEBHOOK_KEY: process.env.WEBHOOK_KEY,
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
