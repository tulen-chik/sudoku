'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SudokuBoard from '/src/components/sudoku/SudokuBoard';
import ButtonPanel from '/src/components/sudoku/ButtonPanel';
import { solver } from '/src/utils/sudoku/sudokuSolver';
import { generateSudoku } from '/src/utils/sudoku/sudokuGenerator';
import styles from './page.module.css';

function Home() {
    const router = useRouter();
    const [difficulty, setDifficulty] = useState('medium');
    const [sudokuArr, setSudokuArr] = useState(generateSudoku('medium', true) || []);
    const [initial, setInitial] = useState(sudokuArr);
    const [errors, setErrors] = useState([]);
    const [errorCount, setErrorCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [notification, setNotification] = useState(null); // State for notification

    useEffect(() => {
        const generatedSudoku = generateSudoku(difficulty, true);
        setSudokuArr(generatedSudoku);
        setInitial(generatedSudoku);
        setErrors([]);
        setErrorCount(0);
        setTimer(0);
        setIsRunning(true);
    }, [difficulty]);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    function handleDifficultyChange(event) {
        setDifficulty(event.target.value);
    }

    function checkSudoku() {
        const newErrors = [];
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set();
            const colSet = new Set();
            const boxSet = new Set();

            for (let j = 0; j < 9; j++) {
                if (sudokuArr[i][j] !== -1) {
                    if (rowSet.has(sudokuArr[i][j])) {
                        newErrors.push({ row: i, col: j });
                    } else {
                        rowSet.add(sudokuArr[i][j]);
                    }
                }

                if (sudokuArr[j][i] !== -1) {
                    if (colSet.has(sudokuArr[j][i])) {
                        newErrors.push({ row: j, col: i });
                    } else {
                        colSet.add(sudokuArr[j][i]);
                    }
                }

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
        setErrorCount(newErrors.length);
        if (newErrors.length === 0) {
            alert("Все правильно!");
        }
    }

    function solveSudoku() {
        // Проверяем, заполнены ли все ячейки
        // const isCompleted = sudokuArr.flat().every(cell => cell !== -1);
        //
        // if (!isCompleted) {
        //     alert("Пожалуйста, заполните все ячейки перед решением судоку.");
        //     return; // Прерываем выполнение, если не все ячейки заполнены
        // }

        const session = localStorage.getItem('session'); // Получение имени пользователя из локального хранилища

        try {
            const filledSudoku = generateSudoku(difficulty, false);
            const solvedBoard = solver(filledSudoku);

            setSudokuArr(solvedBoard);
            setIsRunning(false);

            // Рассчитываем очки
            const score = Math.max(0, 81 - errorCount);

            // Отправляем очки на сервер
            fetch('/api/updateScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: JSON.parse(session).username, score }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    setNotification(`Игра закончена!\nВремя: ${timer}s\nОшибки: ${errorCount}\nСчет: **${score}**`);
                })
                .catch(err => {
                    console.error("Ошибка при отправке очков:", err);
                });
        } catch (error) {
            console.error("Ошибка при решении судоку:", error);
            alert("Произошла ошибка при решении судоку. Пожалуйста, попробуйте еще раз.");
        }
    }

    function resetSudoku() {
        setSudokuArr(generateSudoku(difficulty, false));
        setErrorCount(0);
        setTimer(0);
        setIsRunning(true);
    }

    useEffect(() => {
        if (Array.isArray(sudokuArr)) {
            const isCompleted = sudokuArr.flat().every(cell => cell !== -1);
            if (isCompleted) {
                setIsRunning(false);
            }
        }
    }, [sudokuArr]);

    return (
        <div className={styles.App}>
            <div className={styles.header}>
                <h3>Sudoku Solver</h3>
                <select value={difficulty} onChange={handleDifficultyChange}>
                    <option value="easy">Легкий</option>
                    <option value="medium">Средний</option>
                    <option value="hard">Сложный</option>
                </select>
                <div>Время: {timer}s</div>
                <div>Ошибки: {errorCount}</div>
                <div className={styles.sudoku_container}>
                    <SudokuBoard
                        sudokuArr={sudokuArr}
                        setSudokuArr={setSudokuArr}
                        initial={initial}
                        errors={errors}
                    />
                </div>

                <ButtonPanel
                    checkSudoku={checkSudoku}
                    solveSudoku={solveSudoku}
                    resetSudoku={resetSudoku}
                />
                <button
                    className={styles.orangeButton}
                    onClick={() => router.push('/user/sudoku/sudokyOfTheDay')}
                >
                    +
                </button>
            </div>

            {/* Notification Component */}
            {notification && (
                <div className={styles.notification}>
                    <div className={styles.notificationContent}>
                        <h2>Игра закончена!</h2>
                        <p>Время: {timer}s</p>
                        <p>Ошибки: {errorCount}</p>
                        <p style={{ fontWeight: 'bold' }}>Счет: {Math.max(0, 81 - errorCount)}</p>
                        <button onClick={() => setNotification(null)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;