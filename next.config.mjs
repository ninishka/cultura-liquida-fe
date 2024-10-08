/** @type {import('next').NextConfig} */
const nextConfig = {
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
    MONGODB_URI: process.env.MONGODB_URI
  },
};

export default nextConfig;
