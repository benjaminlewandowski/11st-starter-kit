module.exports = {
    plugins: [
        require('postcss-short'),
        require('tailwindcss'),
        require('postcss-preset-env')({ stage: 1 }),
        ...(process.env.NODE_ENV === 'production'
            ? [
                  require('postcss-sorting'),
                  require('postcss-sort-media-queries'),
                  require(`cssnano`)({
                      preset: 'default',
                  }),
              ]
            : []),
    ],
};
