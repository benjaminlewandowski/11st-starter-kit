const isprod = process.en

module.exports = {
    name: isprod ? 'Stage' : 'DEVStage',
    url: isprod
        ? 'https://tender-noyce-76153c.netlify.app'
        : 'http://localhost:8080',
    lang: 'de-DE',
};
