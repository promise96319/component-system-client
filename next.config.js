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
  }
};

module.exports = nextConfig;
