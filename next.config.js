const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ued.qingteng.cn']
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

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // https://stackoverflow.com/questions/64376001/pass-options-to-the-builtin-svgo-from-svgr-webpack
            dimensions: false
          }
        }
      ]
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
};

module.exports = nextConfig;
