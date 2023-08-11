const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    host: 'http://localhost:3000'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs/button/api',
        permanent: true
      }
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });

    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader'
    });

    if (!isServer) {
      // https://github.com/vercel/next.js/issues/31692
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['typescript']
        })
      );
    }

    return config;
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       destination: 'http://localhost:3000/api/v1/:path*'
  //     }
  //   ];
  // }
};

module.exports = nextConfig;
