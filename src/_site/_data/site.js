module.exports = {
    name: 'Stage',
    ...(process.env.NODE_ENV === 'production'
        ? `http://localhost:8080`
        : `https://tender-noyce-76153c.netlify.app/`),
};
