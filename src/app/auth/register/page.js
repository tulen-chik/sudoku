'use client';

import { useState } from 'react';
import styles from '/src/app/auth/register/register.module.css'; // Импорт стилей как CSS модуля

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
        <div className={styles.registerContainer}>
            <div className={styles.registerForm}>
                <h1 className={styles.registerTitle}>Регистрация</h1>
                <form onSubmit={handleRegister}>
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
                    <button className={styles.registerButton} type="submit">Зарегистрироваться</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
                <p>Уже есть аккаунт? <a href="/auth/login">Войти</a></p>
            </div>
        </div>
    );
}