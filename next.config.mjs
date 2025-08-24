import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

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
    optimizePackageImports: ['antd', 'styled-components'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Performance optimizations
    optimizeCss: true,
    optimizePackageImports: ['antd', 'styled-components', 'react', 'react-dom'],
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Optimized image configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
    domains: [],
    remotePatterns: [],
  },

  // Enhanced webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Improved code splitting with better chunk sizes
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 150000, // Reduced for better caching
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          antd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/,
            name: 'antd',
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
            enforce: true,
          },
          styled: {
            test: /[\\/]node_modules[\\/]styled-components[\\/]/,
            name: 'styled',
            chunks: 'all',
            priority: 15,
            reuseExistingChunk: true,
            enforce: true,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 25,
            reuseExistingChunk: true,
            enforce: true,
          },
          redux: {
            test: /[\\/]node_modules[\\/]@reduxjs[\\/]/,
            name: 'redux',
            chunks: 'all',
            priority: 18,
            reuseExistingChunk: true,
            enforce: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Enhanced tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.minimize = true;
      config.optimization.providedExports = true;
      
      // Module concatenation
      config.optimization.concatenateModules = true;
      
      // Remove unused code
      config.optimization.removeAvailableModules = true;
      config.optimization.removeEmptyChunks = true;
    }
    
    // Performance optimizations for all builds
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Optimize module resolution
    config.resolve.modules = ['node_modules'];
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
    
    return config;
  },

  // Performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Surrogate-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, s-maxage=31536000',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, s-maxage=31536000',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300',
          },
        ],
      },
    ];
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

export default withBundleAnalyzer(nextConfig);
