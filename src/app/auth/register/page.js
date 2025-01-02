'use client';

import { useState } from 'react';
import '/src/styles/regiser.css'; // Импорт стилей

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Состояние для роли админа

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, isAdmin }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
            } else {
                setMessage('Пользователь зарегистрирован');
                // Перенаправление на страницу логина или главную
                window.location.href = '/auth/login'; // Перенаправление на страницу логина
            }
        } catch (error) {
            setMessage('Ошибка сети: ' + error.message);
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="register-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(!isAdmin)} // Переключение роли админа
                        />
                        Я администратор
                    </label>
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>Уже есть аккаунт? <a href="/auth/login">Войти</a></p>
        </div>
    );
}