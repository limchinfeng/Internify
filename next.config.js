/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  experimental: {
    serverComponentsExternalPackages: ["pdf2json"],
  },
};

module.exports = nextConfig
