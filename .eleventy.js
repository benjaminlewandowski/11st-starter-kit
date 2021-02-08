const fs = require('fs');

const htmlmin = require('html-minifier');

const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSEO = require('eleventy-plugin-seo');
const pluginLazyImages = require('eleventy-plugin-lazyimages');
const pluginSvgContents = require('eleventy-plugin-svg-contents');

module.exports = function (config) {
    config.setUseGitIgnore(true);
    config.setDataDeepMerge(true);
    config.setQuietMode(true);

    // Plugins
    config.addPlugin(pluginNavigation);
    config.addPlugin(pluginLazyImages);
    config.addPlugin(pluginRss);
    config.addPlugin(pluginSvgContents);
    config.addPlugin(pluginSEO, require('./src/_site/_data/site.js'));

    // Static assets to pass through
    config.addPassthroughCopy({ './src/fonts': 'fonts' });
    config.addPassthroughCopy({ './src/media/images': 'media/images' });
    config.addPassthroughCopy({ './src/media/video': 'media/video' });
    config.addPassthroughCopy({ './src/static': '/' });

    // WatchTargets
    config.addWatchTarget('./src/resources/css/**/');
    config.addWatchTarget('./src/resources/js/');
    config.addWatchTarget('./src/static/fonts/');
    config.addWatchTarget('./src/static/images/');
    config.addWatchTarget('./build/**');

    // Add dump filter to Nunjucks
    config.addFilter('dump', (obj) => {
        return util.inspect(obj);
    });

    // Add a HTML timestamp formatter filter to Nunjucks
    config.addFilter(
        'htmlDateDisplay',
        require('./src/_site/_includes/_filters/timestamp.js')
    );

    // Add a readable date formatter filter to Nunjucks
    config.addFilter(
        'dateDisplay',
        require('./src/_site/_includes/_filters/dates.js')
    );

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync('dist/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    // minify if production
    if (config.environment === 'production') {
        config.addTransform('htmlmin', function (content, outputPath) {
            if (outputPath.endsWith('.html')) {
                return htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true,
                });
            }
            return content;
        });
    }

    // Layout Aliases
    // Default Layouts
    config.addLayoutAlias('default', 'default.njk');
    config.addLayoutAlias('post', 'post.njk');
    config.addLayoutAlias('page', 'page.njk');

    // Special Layouts
    config.addLayoutAlias('index', 'special/index.njk');
    config.addLayoutAlias('login', 'special/login.njk');
    config.addLayoutAlias('register', 'special/register.njk');
    config.addLayoutAlias('404', 'special/404.njk');
    config.addLayoutAlias('feed', 'special/feed.njk');

    return {
        dir: {
            input: 'src/_site',
            output: '_build',
            data: '_data',
            includes: '_includes',
            layouts: '_layouts',
        },
        passthroughFileCopy: true,
        templateFormats: ['md', 'njk', 'js', 'json'],
    };
};
