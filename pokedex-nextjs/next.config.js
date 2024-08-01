const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.pokemon.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'app', 'components')],
  },
}

module.exports = nextConfig
