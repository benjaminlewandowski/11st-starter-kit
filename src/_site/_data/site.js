const isprod = process.env.NODE_ENV === 'production';

module.exports = {
    name: isprod ? 'Stage' : 'DEVStage',
    url: isprod
        ? 'https://tender-noyce-76153c.netlify.app'
        : 'http://localhost:8080',
    lang: 'de-DE',
};
