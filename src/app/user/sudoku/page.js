'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Импортируем useRouter
import SudokuBoard from '/src/components/sudoku/SudokuBoard';
import ButtonPanel from '/src/components/sudoku/ButtonPanel';
import { solver } from '/src/utils/sudoku/sudokuSolver';
import { generateSudoku } from '/src/utils/sudoku/sudokuGenerator';
import styles from '../../../styles/globals.css';

function Home() {
    const router = useRouter(); // Используем useRouter для навигации
    const [difficulty, setDifficulty] = useState('medium');
    const [sudokuArr, setSudokuArr] = useState(generateSudoku('medium', true)); // true для генерации с пустыми ячейками
    const [initial, setInitial] = useState(generateSudoku('medium', true)); // Начальные значения
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const generatedSudoku = generateSudoku(difficulty, true); // true для генерации с пустыми ячейками
        setSudokuArr(generatedSudoku);
        setInitial(generatedSudoku); // Сохраняем начальные значения
        setErrors([]); // Сбрасываем ошибки при изменении сложности
    }, [difficulty]);

    function handleDifficultyChange(event) {
        const chosenDifficulty = event.target.value;
        setDifficulty(chosenDifficulty);
    }

    function checkSudoku() {
        const newErrors = [];

        for (let i = 0; i < 9; i++) {
            const rowSet = new Set();
            const colSet = new Set();
            const boxSet = new Set();

            for (let j = 0; j < 9; j++) {
                // Проверка строки
                if (sudokuArr[i][j] !== -1) {
                    if (rowSet.has(sudokuArr[i][j])) {
                        newErrors.push({ row: i, col: j });
                    } else {
                        rowSet.add(sudokuArr[i][j]);
                    }
                }

                // Проверка столбца
                if (sudokuArr[j][i] !== -1) {
                    if (colSet.has(sudokuArr[j][i])) {
                        newErrors.push({ row: j, col: i });
                    } else {
                        colSet.add(sudokuArr[j][i]);
                    }
                }

                // Проверка подрешетки
                const boxRow = 3 * Math.floor(i / 3);
                const boxCol = 3 * Math.floor(i % 3);

                if (sudokuArr[boxRow + Math.floor(j / 3)][boxCol + (j % 3)] !== -1) {
                    const value = sudokuArr[boxRow + Math.floor(j / 3)][boxCol + (j % 3)];
                    if (boxSet.has(value)) {
                        newErrors.push({ row: boxRow + Math.floor(j / 3), col: boxCol + (j % 3) });
                    } else {
                        boxSet.add(value);
                    }
                }
            }
        }

        setErrors(newErrors);
        if (newErrors.length === 0) {
            alert("Все правильно!");
        }
    }

    function solveSudoku() {
        let sudoku = generateSudoku(difficulty, false); // false для получения заполненной таблицы
        solver(sudoku);
        setSudokuArr(sudoku);
    }

    function resetSudoku() {
        // Обновляем sudokuArr, сбрасывая только пользовательские вводы
        const newSudokuArr = sudokuArr.map((row, rIndex) =>
            row.map((cell, cIndex) =>
                initial[rIndex][cIndex] === -1 ? -1 : cell
            )
        );
        setSudokuArr(newSudokuArr);
    }

    return (
        <div className={styles.App}>
            <div className={styles.header}>
                <h3>Sudoku Solver</h3>
                <select value={difficulty} onChange={handleDifficultyChange}>
                    <option value="easy">Легкий</option>
                    <option value="medium">Средний</option>
                    <option value="hard">Сложный</option>
                </select>
                <SudokuBoard sudokuArr={sudokuArr} setSudokuArr={setSudokuArr} initial={initial} errors={errors} />
                <ButtonPanel
                    checkSudoku={checkSudoku}
                    solveSudoku={solveSudoku}
                    resetSudoku={resetSudoku}
                />
                {/* Кнопка в правом верхнем углу */}
                <button
                    className={styles.orangeButton}
                    onClick={() => router.push('/user/sudoku/sudokyOfTheDay')} // Путь к странице судоку дня
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default Home;