"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from '/src/app/user/page.module.css';

const Home = () => {
    const router = useRouter();

    const handleRatingClick = () => {
        router.push('/admin/rating');
    };

    const handleDailySudokuClick = () => {
        router.push('/admin/dailysudoky');
    };

    const handleLogoutClick = () => {
        router.push('/auth/login');
    };

    return (
        <div className={styles.container}>
            <h1>Судоку</h1>
            <button className={styles.button} onClick={handleRatingClick}>
                Посмотреть рейтинг
            </button>
            <button className={styles.button} onClick={handleDailySudokuClick}>
                Добавить судоку дня
            </button>
            <button className={styles.button} onClick={handleLogoutClick}>
                Выход
            </button>
        </div>
    );
};

export default Home;