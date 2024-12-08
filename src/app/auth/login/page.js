// src/components/Login.jsx

'use client';

import { useState } from "react";
import '/src/styles/login.css'; // Импорт стилей

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setMessage(data.token ? 'Вход успешен!' : data.message);

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = '/user'; // Перенаправление на страницу пользователя
        }
    };

    return (
        <div className="login-container">
            <h1>Вход</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Войти</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>Нет аккаунта? <a href="/auth/register">Регистрация</a></p>
        </div>
    );
}