'use client'; // Указываем, что это клиентский компонент

import React, { useState, useEffect } from 'react';
import { loadAudio, setVolume, playAudio, pauseAudio } from '/src/utils/setting/audio';
import { useTheme } from '/src/utils/setting/ThemeContext'; // Импортируем контекст темы
import styles from '/src/styles/settingsMenu.module.css'; // Импортируем стили

export default function Settings() {
    const { theme, applyTheme } = useTheme(); // Получаем тему и функцию применения темы из контекста
    const [volume, setVolumeState] = useState(50); // Начальная громкость
    const [loop, setLoop] = useState(false); // Зацикливание
    const [difficulty, setDifficulty] = useState('medium'); // Сложность
    const [audio, setAudio] = useState(null); // Аудио объект

    // Состояния темы
    const [themeSelection, setThemeSelection] = useState('light');

    useEffect(() => {
        // Загрузка сохранённых настроек из localStorage
        const savedVolume = localStorage.getItem('volume') || 50;
        const savedLoop = localStorage.getItem('loop') === 'true';
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedDifficulty = localStorage.getItem('difficulty') || 'medium';

        setVolumeState(Number(savedVolume));
        setLoop(savedLoop);
        applyTheme(savedTheme);
        setDifficulty(savedDifficulty);
        setThemeSelection(savedTheme);

        const audioInstance = loadAudio("D:/Downloads/2ke-808iuli-x-slide-ultra-slowed-mp3.mp3");
        setAudio(audioInstance);

        return () => {
            if (audioInstance) {
                audioInstance.pause();
            }
        };
    }, []);

    useEffect(() => {
        if (audio) {
            setVolume(volume / 100); // Приводим к диапазону от 0 до 1
            audio.loop = loop;
        }
    }, [volume, loop, audio]);

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolumeState(newVolume);
        if (audio) {
            setVolume(newVolume / 100); // Приводим к диапазону от 0 до 1
        }
    };

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        applyTheme(newTheme); // Применяем тему
        localStorage.setItem('theme', newTheme); // Сохраняем тему в localStorage
        setThemeSelection(newTheme);
    };

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    const handleSaveSettings = () => {
        // Сохранение настроек в localStorage
        localStorage.setItem('volume', volume);
        localStorage.setItem('loop', loop);
        localStorage.setItem('difficulty', difficulty);
        localStorage.setItem('theme', themeSelection);
    };

    const handleResetSettings = () => {
        // Сброс настроек
        setVolumeState(50);
        setThemeSelection('light');
        setDifficulty('medium');
        setLoop(false);
        localStorage.clear();
    };

    return (
        <div className={`${styles.container} ${styles[themeSelection]}`}>
            <h1 className={styles.title}>Настройки</h1>

            <div className={styles.setting}>
                <label className={styles.label}>
                    Тема оформления:
                    <select
                        value={themeSelection}
                        onChange={handleThemeChange}
                        className={styles.select}
                    >
                        <option value="light">Светлая</option>
                        <option value="dark">Тёмная</option>
                        <option value="colorful">Цветная</option>
                    </select>
                </label>
            </div>

            <div className={styles.setting}>
                <label className={styles.label}>
                    Сложность игры:
                    <select
                        value={difficulty}
                        onChange={handleDifficultyChange}
                        className={styles.select}
                    >
                        <option value="easy">Легко</option>
                        <option value="medium">Средне</option>
                        <option value="hard">Сложно</option>
                    </select>
                </label>
            </div>

            <div className={styles.setting}>
                <label className={styles.label}>
                    Громкость звука:
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className={styles.slider}
                    />
                    <span>{volume}%</span>
                </label>
            </div>

            <div className={styles.buttonContainer}>
                <button type="button" onClick={handleSaveSettings} className={styles.button}>
                    Сохранить изменения
                </button>
                <button type="button" onClick={handleResetSettings} className={styles.button}>
                    Сбросить изменения
                </button>
            </div>
        </div>
    );
}