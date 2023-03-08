const { defineConfig } = require('@vue/cli-service')
const pageName = 'packs'

const outputDir = pageName
const publicPath = process.env.NODE_ENV === 'production'
  ? `/2023/${pageName}`
  : '/'

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath,
  outputDir
})