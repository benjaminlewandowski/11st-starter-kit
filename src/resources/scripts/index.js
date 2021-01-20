import '@ryangjchandler/spruce';

localStorage.setItem('logged-in', false);

import 'alpinejs';

const env = document.querySelector('body').dataset.env;

const root = document.documentElement;

const colorSchemeToggle = document.getElementById('js-colorscheme-toggle');

const colorSchemeDark = () => {
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem('colorScheme', 'dark');
};

const colorSchemeLight = () => {
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('colorScheme', 'light');
};

if (localStorage.getItem('colorScheme') === 'dark') {
    colorSchemeDark();
}

if (localStorage.getItem('colorScheme') === 'light') {
    colorSchemeLight();
}

if (localStorage.getItem('colorScheme') === null) {
    if (window.matchMedia('(prefers-color-scheme: dark)')) {
        colorSchemeLight();
    } else if (window.matchMedia('(prefers-color-scheme: light)')) {
        colorSchemeDark();
    }
}

colorSchemeToggle.addEventListener('click', () => {
    if (localStorage.getItem('colorScheme') === 'dark') {
        colorSchemeLight();
    } else if (localStorage.getItem('colorScheme') === 'light') {
        colorSchemeDark();
    }
});

// Check that service workers are supported
if ('serviceWorker' in navigator && env === 'production') {
    // use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        try {
            navigator.serviceWorker.register('/sw.js');
        } catch (error) {
            console.error('Service worker registration failed: ', error);
        }
    });
}
