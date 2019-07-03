var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
var merge = require('webpack-merge')


module.exports = function(webpackConfig) {
  let happyPackPlugins = [];

  let rules = webpackConfig.module.rules;

  rules.forEach(rule => {
    if (rule.test && rule.test instanceof RegExp && rule.test.test('chameleon.js')) {
      if (rule.use) {
        happyPackPlugins.push(new HappyPack({
          id: 'js',
          threadPool: happyThreadPool,
          loaders: rule.use
        }))
        rule.use = 'happypack/loader?id=js'
      }
    }

    if (rule.test && rule.test instanceof RegExp && rule.test.test('chameleon.interface')) {
      if (rule.use) {
        happyPackPlugins.push(new HappyPack({
          id: 'interface',
          threadPool: happyThreadPool,
          loaders: rule.use
        }))
        rule.use = 'happypack/loader?id=interface'
      }
    }

  })

  return merge(webpackConfig, {
    plugins: happyPackPlugins
  })
}