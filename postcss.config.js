module.exports = {
    plugins: [
        require('tailwindcss'),
        require('postcss-preset-env')({ stage: 1 }),
        ...(process.env.NODE_ENV === 'production'
            ? [
                  require('@fullhuman/postcss-purgecss'),
                  require('postcss-sorting'),
                  require('postcss-sort-media-queries'),
                  require(`cssnano`)({
                      preset: 'default',
                  }),
              ]
            : []),
    ],
};
