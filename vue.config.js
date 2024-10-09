const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/App-Firebase9/'  // Cambia esto al nombre de tu repositorio
    : '/'
})