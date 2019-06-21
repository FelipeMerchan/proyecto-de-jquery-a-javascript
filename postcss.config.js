module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        require('stylelint')
      ]
    }),
    require('postcss-font-magician')({
      variants: {
        'Open Sans': {
          '300': [],
          '400': [],
          '700': []
        }
      }
    }),
    require('postcss-cssnext')({
      features: {
        autoprefixer: {
          grid: true,
          flexbox: false,
        },
        customProperties: false,
        calc: false,
      }
    }),
    require('css-mqpacker'),
    /* require('cssnano') */
  ]
}