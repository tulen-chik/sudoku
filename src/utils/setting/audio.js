// src/app/user/setting/utils/audio.js

let audio = null;

export const loadAudio = (src) => {
    audio = new Audio(src);
    audio.loop = false; // По умолчанию зацикливание выключено
};

export const setVolume = (volume) => {
    if (audio) {
        audio.volume = volume / 100; // Устанавливаем громкость от 0 до 1
    }
};

export const toggleLoop = (shouldLoop) => {
    if (audio) {
        audio.loop = shouldLoop;
    }
};

export const playAudio = () => {
    if (audio) {
        audio.play();
    }
};

export const pauseAudio = () => {
    if (audio) {
        audio.pause();
    }
};