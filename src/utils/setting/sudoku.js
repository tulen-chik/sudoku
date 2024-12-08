
const difficultyLevels = {
    easy: 36,   // 36 оставленных цифр
    medium: 30, // 30 оставленных цифр
    hard: 24,   // 24 оставленных цифр
};

export const getDifficultySettings = (difficulty) => {
    return difficultyLevels[difficulty] || difficultyLevels.medium;
};