import withPreconstruct from '@preconstruct/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPreconstruct(nextConfig);
