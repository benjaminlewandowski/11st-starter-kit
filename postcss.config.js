module.exports = {
    plugins: [
        require('postcss-short'),
        require('postcss-sorting'),
        require('postcss-utilities'),
        require('tailwindcss'),
        require('postcss-preset-env')({ stage: 1 }),
        ...(process.env.NODE_ENV === 'production'
            ? [
                  require(`cssnano`)({
                      preset: 'default',
                  }),
                  require('postcss-sort-media-queries'),
              ]
            : []),
    ],
};
