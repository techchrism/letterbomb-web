module.exports = {
    'transpileDependencies': [
        'vuetify'
    ],
    chainWebpack: config => {
        config.module
               .rule('raw')
               .test(/\.txt$/)
               .use('raw-loader')
               .loader('raw-loader')
               .end()
    }
};
