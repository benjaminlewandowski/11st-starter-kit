module.exports = {
    mount: {
        _build: { url: '/', static: true, resolve: false },
        'src/resources/scripts': { url: '/' },
        'src/resources/styles': { url: '/' },
    },
    plugins: [
        '@snowpack/plugin-postcss',
        [
            '@snowpack/plugin-run-script',
            {
                cmd: 'eleventy --quiet',
                watch: '$1 --watch',
            },
        ],
    ],
    packageOptions: {
        NODE_ENV: true,
        source: 'remote',
    },
    buildOptions: {
        clean: true,
        out: 'dist',
    },
    devOptions: {
        hmrDelay: 600,
        open: 'none',
    },
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2020',
    },
};
