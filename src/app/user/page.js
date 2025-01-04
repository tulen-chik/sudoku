'use client'; // Указываем, что это клиентский компонент

import React, { useEffect, useState } from 'react'; // Импортируем useEffect и useState
import Link from 'next/link';
import styles from './page.module.css'; // Импортируем стили

export default function SudokuMenu() {
    const [theme, setTheme] = useState('light'); // Начальная тема

    // Используем useEffect для загрузки темы из localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    return (
        <div className={styles.outer_container}>
            <div className={`${styles.container} ${styles[theme]}`}>
                <h1 className={styles.title}>Судоку</h1>
                <Link href="/user/sudoku">
                    <button className={styles.button}>Старт</button>
                </Link>
                <Link href="/user/setting">
                    <button className={styles.button}>Настройки</button>
                </Link>
                <Link href="/user/training">
                    <button className={styles.button}>Обучение</button>
                </Link>
                <Link href="/">
                    <button className={styles.button}>Выход</button>
                </Link>
            </div>
        </div>

    );
}