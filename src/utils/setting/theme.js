// src/app/user/setting/utils/theme.js

const themes = {
    light: {
        background: '#ffffff',
        color: '#000000',
    },
    dark: {
        background: '#000000',
        color: '#ffffff',
    },
    colorful: {
        background: '#ffeb3b',
        color: '#673ab7',
    },
};

export const applyTheme = (theme) => {
    const selectedTheme = themes[theme] || themes.light;
    document.body.style.backgroundColor = selectedTheme.background;
    document.body.style.color = selectedTheme.color;
};