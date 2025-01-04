"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '/src/utils/setting/ThemeContext';
import styles from './page.module.css';

export default function Settings() {
    const { theme, applyTheme } = useTheme();
    const [volume, setVolumeState] = useState(50);
    const [loop, setLoop] = useState(false);
    const [audio, setAudio] = useState(null);
    const [themeSelection, setThemeSelection] = useState('light');
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const savedVolume = localStorage.getItem('volume') || 50;
        const savedLoop = localStorage.getItem('loop') === 'true';
        const savedTheme = localStorage.getItem('theme') || 'light';

        setVolumeState(Number(savedVolume));
        setLoop(savedLoop);
        applyTheme(savedTheme);
        setThemeSelection(savedTheme);

        const audioInstance = new Audio('/audio/1.mp3'); // Измените путь
        audioInstance.loop = savedLoop;
        audioInstance.volume = savedVolume / 100;

        setAudio(audioInstance);

        return () => {
            if (audioInstance) {
                audioInstance.pause();
                audioInstance.src = "";
            }
        };
    }, []);

    useEffect(() => {
        if (audio) {
            audio.volume = volume / 100;
            audio.loop = loop;
        }
    }, [volume, loop, audio]);

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolumeState(newVolume);
        if (audio) {
            audio.volume = newVolume / 100;
        }
    };

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        setThemeSelection(newTheme);
    };

    const handleSaveSettings = () => {
        localStorage.setItem('volume', volume);
        localStorage.setItem('loop', loop);
        localStorage.setItem('theme', themeSelection);
    };

    const handleResetSettings = () => {
        setVolumeState(50);
        setThemeSelection('light');
        setLoop(false);
        localStorage.clear();
    };

    const handlePlayMusic = () => {
        if (audio) {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Не удалось воспроизвести:", error);
            });
        }
    };

    return (
        <div className={styles.outer_container}>
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
                    {!isPlaying && (
                        <button type="button" onClick={handlePlayMusic} className={styles.button}>
                            Воспроизвести музыку
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
}