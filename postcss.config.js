if (process.env.NODE_ENV === 'production') {
    module.exports = {
        plugins: [
            require('postcss-short'),
            require('postcss-sorting'),
            require('postcss-utilities'),
            require('tailwindcss'),
            require('postcss-nested'),
            require('postcss-preset-env')({ stage: 1 }),
            require('cssnano')({
                preset: 'default',
            }),
            require('@fullhuman/postcss-purgecss')({
                content: ['./src/**/*.njk', './src/**/*.js', './src/**/*.md'],
            }),
            require('postcss-sort-media-queries'),
        ],
    };
} else {
    module.exports = {
        plugins: [
            require('postcss-short'),
            require('postcss-sorting'),
            require('postcss-utilities'),
            require('tailwindcss'),
            require('postcss-nested'),
            require('postcss-preset-env')({ stage: 1 }),
        ],
    };
}
