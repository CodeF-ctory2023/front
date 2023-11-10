/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:8080/ssmu-api',
  },
};

module.exports = nextConfig;
