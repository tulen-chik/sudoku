// src/app/layout.js
import '/src/styles/globals.css'; // Импортируйте ваши глобальные стили
import { ThemeProvider } from '/src/utils/setting/ThemeContext';

export default function RootLayout({ children }) {
  return (
      <html lang="ru">
      <body>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      </body>
      </html>
  );
}