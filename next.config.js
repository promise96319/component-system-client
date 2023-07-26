/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // if (!isServer) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });
    // }
    return config;
  }
};

module.exports = nextConfig;
