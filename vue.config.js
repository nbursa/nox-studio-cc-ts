module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  publicPath: '',
  pwa: {
    name: 'Nox - Underground Studio',
    themeColor: '#D9DD6C',
    manifestOptions: {
      backgroundColor: '#1E1111'
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
