/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  transpilePackages:['@tomo-inc/tomo-evm-kit']
};

module.exports = nextConfig;
