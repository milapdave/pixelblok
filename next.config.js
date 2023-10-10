/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['a.storyblok.com', 'a-us.storyblok.com'],
  },
};

module.exports = nextConfig;
