/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  experimental: {
    instrumentationHook: true,
  },
  compiler: {
    styledComponents: true,
  },

  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    APP_ID: process.env.APP_ID,
    API_URL: process.env.API_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    VERCEL_URL: process.env.VERCEL_URL
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
