
module.exports = ({ env }) => ({
  plugins: {
    'postcss-import': {},
    //'postcss-nested': {},
    'postcss-simple-vars': {},
    //'postcss-property-lookup': {},
    //'postcss-color-function': {},
    //'postcss-size': {},
    //'postcss-custom-media': {},
    autoprefixer: {},
    cssnano: env === 'production' ? {} : false
  }
})
