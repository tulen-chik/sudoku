
'use client'; // Add this line

import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        document.body.className = newTheme; // Apply the theme to the body
    };

    return (
        <ThemeContext.Provider value={{ theme, applyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);