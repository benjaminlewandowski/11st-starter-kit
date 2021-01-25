module.exports = {
    plugins: [
        require('postcss-short'),
        require('postcss-sorting'),
        require('postcss-utilities'),
        require('tailwindcss'),
        require('postcss-nested'),
        require('postcss-preset-env')({ stage: 1 }),
        ...(process.env.NODE_ENV === 'production'
            ? [
                  require(`cssnano`)({
                      preset: 'default',
                  }),
                  require('@fullhuman/postcss-purgecss')({
                      content: [
                          './src/**/*.njk',
                          './src/**/*.js',
                          './src/**/*.md',
                          './src/resources/styles/*.css',
                      ],
                  }),
                  require('postcss-sort-media-queries'),
              ]
            : []),
    ],
};
