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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });
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
