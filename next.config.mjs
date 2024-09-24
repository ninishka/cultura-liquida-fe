/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },

  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    APP_ID: process.env.APP_ID,
  },
};

export default nextConfig;
