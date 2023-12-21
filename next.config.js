/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: {
    domains: ['a.storyblok.com', 'a-us.storyblok.com'],
    unoptimized: true
  },
};

module.exports = nextConfig;
