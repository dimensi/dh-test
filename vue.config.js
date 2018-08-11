const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: [path.join(__dirname, 'src/assets/variables.styl')]
      }
    }
  }
}
