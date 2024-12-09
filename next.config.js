/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    RPC: process.env.RPC,
    GRAPHQL: process.env.GRAPHQL,
  },
};

module.exports = nextConfig;
