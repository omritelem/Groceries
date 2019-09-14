module.exports = () => ({
    plugins: [
        require('postcss-easy-import')({
            extensions: [
                '.pcss',
                '.css',
                '.postcss',
                '.sss',
            ],
        }),
        require('stylelint')({
            configFile: '.stylelintrc',
        }),
        require('postcss-nesting'),
        require('postcss-extend'),
        require('postcss-mixins')({
            mixins: {},
        }),
        require('autoprefixer')({
            browsers: [
                '>=1%',
                'not ie 11',
                'not op_mini all',
            ],
        }),
    ],
});
