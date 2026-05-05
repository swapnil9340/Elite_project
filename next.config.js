/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Windows + nested dynamic routes ([slug]/[service]) ke saath
    // jest-worker race condition fix.
    cpus: 1,
    workerThreads: false,
  },
};

module.exports = nextConfig;
