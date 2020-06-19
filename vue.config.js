const path = require('path')
const port = 7070

module.exports = {
    publicPath: './', // 部署应⽤包时的基本 URL
    devServer: {
        port
    },
    // configureWebpack: {
    //     name: 'vue-config',
    //     resolve: {
    //         alias: {
    //             comps: path.join(__dirname, 'src/components'),
    //         }
    //     }
    // }
    configureWebpack: config => {
        config.resolve.alias.comps = path.join(__dirname, 'src/components')
        if (process.env.NODE_ENV === 'development') {
            config.name = 'developmenet'
        } else {
            config.name = 'product'
        }
    },
    chainWebpack: config => {
        // 配置svg规则排除icons⽬录中svg⽂件处理
        // ⽬标给svg规则增加⼀个排除选项exclude:['path/to/icon']
        config.module.rule('svg').exclude.add(path.join(__dirname, 'src/icons'))
        // 新增icons规则，设置svg-sprite-loader处理icons⽬录中的svg
        config.module.rule('icons').test(/\.svg$/).include.add(path.join(__dirname, './src/icons'))
        .end().use('svg-sprite-loader').loader('svg-sprite-loader').options({symbolId: 'icon-[name]'})
    }
}