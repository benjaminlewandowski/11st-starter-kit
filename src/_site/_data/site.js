const isProduction = process.env.NODE_ENV === `production`;

module.exports = {
    name: 'Stage',
    url: isProduction
        ? `http://localhost:8080`
        : `https://tender-noyce-76153c.netlify.app/`,
};
