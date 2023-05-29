const runtimeCaching = require('next-pwa/cache');
const withPwa = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  runtimeCaching
});

module.exports = withPwa({
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
});
