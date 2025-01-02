'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '/src/styles/login.css'; // Импорт стилей

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            // Сохранение сессии в localStorage только после успешного входа
            localStorage.setItem('session', JSON.stringify({ role: data.role }));

            // Перенаправление на основе роли
            router.push(data.role === 'admin' ? '/admin' : '/user');
        } catch (error) {
            setMessage('Ошибка сети: ' + error.message);
            console.error('Login error:', error);
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