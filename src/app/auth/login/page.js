'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '/src/app/auth/login/login.module.css'; // Импорт стилей как CSS модуля

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
            localStorage.setItem('session', JSON.stringify({ role: data.role, username: data.username }));

            // Перенаправление на основе роли
            localStorage.setItem('volume', 50);
            localStorage.setItem('loop', true);
            localStorage.setItem('theme', "light");
            router.push(data.role === 'admin' ? '/admin' : '/user');
        } catch (error) {
            setMessage('Ошибка сети: ' + error.message);
            console.error('Login error:', error);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1 className={styles.loginTitle}>Вход</h1>
                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.loginButton} type="submit">Войти</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
                <p>Нет аккаунта? <a href="/auth/register">Регистрация</a></p>
            </div>
        </div>
    );
}