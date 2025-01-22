const { environment } = require('@rails/webpacker')
const Dotenv = require('dotenv-webpack')

const postcssLoader = environment.loaders.get('postcss')

postcssLoader.use = [
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  },
]

environment.plugins.append('Dotenv', new Dotenv())

module.exports = environment
