
'use client';

import { useState } from "react";
import '/src/styles/regiser.css'; // Импорт стилей

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
            // Перенаправление на страницу логина после успешной регистрации
            window.location.href = '/auth/login';
        }
    };

    return (
        <div className="register-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Имя пользователя"
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
                <button type="submit">Зарегистрироваться</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>Уже есть аккаунт? <a href="/auth/login">Войти</a></p>
        </div>
    );
}