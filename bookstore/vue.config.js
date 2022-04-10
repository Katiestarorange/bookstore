module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
		}

    // dev: {
    //   // assetsPublicPath: './'
    //   baseURL: './'
    // },
    //   build: {
    //     // assetsPublicPath: './'
    //     baseURL: './'
    //   }
	},
  publicPath: '/',
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('assets', resolve('src/assets'))
  //     .set('@', resolve('src'))
  //   config.output.filename('[name].js?[hash]').end()
  // }
}



