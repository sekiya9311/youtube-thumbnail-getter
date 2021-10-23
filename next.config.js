const withPwa = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPwa({
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
});
