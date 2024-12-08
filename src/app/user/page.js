'use client'; // Указываем, что это клиентский компонент

import Link from 'next/link';
import styles from '../../styles/mainMenu.module.css'; // Импортируем стили

export default function SudokuMenu() {
    return (
        <div className={styles.container}>
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
    );
}