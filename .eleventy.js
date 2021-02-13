const fs = require('fs');

const html_minifier = require('html-minifier');
const yaml = require('js-yaml');

const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSEO = require('eleventy-plugin-seo');
const pluginLazyImages = require('eleventy-plugin-lazyimages');
const pluginSvgContents = require('eleventy-plugin-svg-contents');
const pluginErrorOverlay = require('eleventy-plugin-error-overlay');
/* const pluginTypeset = require('eleventy-plugin-typeset'); */

const production = process.env.NODE_ENV === 'production';

module.exports = function (config) {
    config.setUseGitIgnore(true);
    config.setDataDeepMerge(true);
    config.setQuietMode(true);

    // Plugins
    config.addPlugin(pluginNavigation);
    config.addPlugin(pluginRss);
    config.addPlugin(pluginSvgContents);
    config.addPlugin(pluginErrorOverlay);
    /* config.addPlugin(pluginTypeset); */
    config.addPlugin(pluginSEO, require('./src/_site/_data/site.js'));
    config.addPlugin(pluginLazyImages, { preferNativeLazyLoad: true });

    // Static assets to pass through
    config.addPassthroughCopy({ './src/resources/fonts': 'fonts' });
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

    // Browser Sync 404
    if (!production) {
        config.setBrowserSyncConfig({
            callbacks: {
                ready: function (err, browserSync) {
                    const content_404 = fs.readFileSync('dist/404.html');

                    // noinspection JSUnresolvedFunction
                    browserSync.addMiddleware('*', (req, res) => {
                        // Provides the 404 content without redirect.
                        res.write(content_404);
                        res.end();
                    });
                },
            },
        });
    }

    // minify if production
    if (production) {
        config.addTransform('html_minifier', function (content, outputPath) {
            if (outputPath.endsWith('.html')) {
                return html_minifier.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true,
                });
            }
            return content;
        });
    }

    // Layout Aliases
    config.addLayoutAlias('default', 'default.njk');
    config.addLayoutAlias('post', 'post.njk');
    config.addLayoutAlias('page', 'page.njk');
    config.addLayoutAlias('profile', 'profile.njk');
    config.addLayoutAlias('listing', 'listing.njk');

    // Page Sub Layout Aliases
    config.addLayoutAlias('404', 'sub/page-404.njk');
    config.addLayoutAlias('about', 'sub/page-about.njk');
    config.addLayoutAlias('imprint', 'sub/page-imprint.njk');
    config.addLayoutAlias('index', 'sub/page-index.njk');
    config.addLayoutAlias('login', 'sub/page-login.njk');
    config.addLayoutAlias('privacy', 'sub/page-privacy.njk');
    config.addLayoutAlias('register', 'sub/page-register.njk');
    config.addLayoutAlias('register', 'sub/page-settings.njk');
    config.addLayoutAlias('register', 'sub/page-tos.njk');

    // Listing Sub Layout Aliases
    config.addLayoutAlias('blog', 'sub/listing-blog.njk');
    config.addLayoutAlias('explore', 'sub/listing-explore.njk');
    config.addLayoutAlias('feed', 'sub/listing-feed.njk');
    config.addLayoutAlias('help', 'sub/listing-help.njk');
    config.addLayoutAlias('jobs', 'sub/listing-jobs.njk');
    config.addLayoutAlias(
        'search_requests_popular',
        'sub/listing-search_requests_popular.njk'
    );
    config.addLayoutAlias('search_results', 'sub/listing-search_results.njk');
    config.addLayoutAlias('users', 'sub/listing-users.njk');

    // Post Sub Layout Aliases
    config.addLayoutAlias('job', 'sub/post-blog.njk');
    config.addLayoutAlias('future', 'sub/post-event-future.njk');
    config.addLayoutAlias('live', 'sub/post-event-live.njk');
    config.addLayoutAlias('past', 'sub/post-event-past.njk');
    config.addLayoutAlias('help_item', 'sub/post-help_item.njk');
    config.addLayoutAlias('job', 'sub/post-job.njk');

    // Profile Sub Layout Aliases
    config.addLayoutAlias('profile-own', 'sub/profile-own.njk');
    config.addLayoutAlias('profile-other', 'sub/profile-other.njk');
    config.addLayoutAlias('profile-location', 'sub/profile-location.njk');
    config.addLayoutAlias('profile-collective', 'sub/profile-collective.njk');

    // Enable yaml data files
    config.addDataExtension('yaml', (contents) => yaml.safeLoad(contents));

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
