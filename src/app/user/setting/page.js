'use client';

import React, { useState, useEffect } from 'react';
import { loadAudio, setVolume, playAudio, pauseAudio, toggleLoop } from '/src/utils/setting/audio';
import { applyTheme } from '/src/utils/setting/theme';
import { getDifficultySettings } from '/src/utils/setting/sudoku';

export default function SettingsForm() {
    const [volume, setVolumeState] = useState(50);
    const [loop, setLoop] = useState(false);
    const [theme, setTheme] = useState('light');
    const [difficulty, setDifficulty] = useState('medium');
    const [audio, setAudio] = useState(null); // Состояние для хранения экземпляра аудио

    // Состояние для хранения предыдущих настроек
    const [previousSettings, setPreviousSettings] = useState({});

    useEffect(() => {
        // Загрузка предыдущих настроек из localStorage
        const savedVolume = localStorage.getItem('volume');
        const savedLoop = localStorage.getItem('loop') === 'true';
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedDifficulty = localStorage.getItem('difficulty') || 'medium';

        if (savedVolume) setVolumeState(Number(savedVolume));
        if (savedLoop) setLoop(savedLoop);
        setTheme(savedTheme);
        setDifficulty(savedDifficulty);

        const audioInstance = loadAudio("D:/Downloads/2ke-808iuli-x-slide-ultra-slowed-mp3.mp3"); // Замените на ваш трек
        setAudio(audioInstance);
        setVolume(savedVolume || volume);
        applyTheme(savedTheme);

        return () => {
            if (audioInstance) {
                audioInstance.pause(); // Остановка аудио при размонтировании компонента
            }
        };
    }, []);

    useEffect(() => {
        if (audio) {
            setVolume(volume);
            audio.loop = loop; // Установка зацикливания
        }
    }, [volume, loop, audio]);

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolumeState(newVolume);
        if (audio) {
            setVolume(newVolume);
        }
    };

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    const handleDifficultyChange = (e) => {
        const newDifficulty = e.target.value;
        setDifficulty(newDifficulty);
        console.log('Количество оставленных цифр:', getDifficultySettings(newDifficulty));
    };

    const handleLoopChange = () => {
        setLoop(!loop);
    };

    const handlePlayPause = () => {
        if (audio) {
            if (audio.paused) {
                playAudio(audio); // Воспроизведение аудио
                audio.play();
            } else {
                pauseAudio(audio); // Пауза аудио
                audio.pause();
            }
        }
    };

    const handleSaveSettings = () => {
        // Сохранение текущих настроек в localStorage
        localStorage.setItem('volume', volume);
        localStorage.setItem('loop', loop);
        localStorage.setItem('theme', theme);
        localStorage.setItem('difficulty', difficulty);
    };

    const handleCancelChanges = () => {
        // Возврат к предыдущим настройкам
        setVolumeState(previousSettings.volume || 50);
        setLoop(previousSettings.loop || false);
        setTheme(previousSettings.theme || 'light');
        setDifficulty(previousSettings.difficulty || 'medium');
        applyTheme(previousSettings.theme || 'light');
    };

    const handleBeforeSave = () => {
        // Сохраняем текущие настройки перед изменением
        setPreviousSettings({ volume, loop, theme, difficulty });
    };

    return (
        <form>
            <div className="form-group">
                <label htmlFor="volume">Громкость звука</label>
                <input
                    type="range"
                    id="volume"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                />
                <span>{volume}</span> %
            </div>
            <div className="form-group">
                <label htmlFor="theme">Тема оформления</label>
                <select
                    id="theme"
                    value={theme}
                    onChange={handleThemeChange}
                >
                    <option value="light">Светлая</option>
                    <option value="dark">Тёмная</option>
                    <option value="colorful">Цветная</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="difficulty">Сложность игры</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={handleDifficultyChange}
                >
                    <option value="easy">Легко</option>
                    <option value="medium">Средне</option>
                    <option value="hard">Сложно</option>
                </select>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={loop}
                        onChange={handleLoopChange}
                    />
                    Зацикливать трек
                </label>
            </div>
            <button type="button" onClick={handlePlayPause}>
                {audio && audio.paused ? 'Играть' : 'Пауза'}
            </button>
            <button type="button" onClick={() => { handleBeforeSave(); handleSaveSettings(); }}>
                Сохранить настройки
            </button>
            <button type="button" onClick={handleCancelChanges}>
                Отменить изменения
            </button>
        </form>
    );
}