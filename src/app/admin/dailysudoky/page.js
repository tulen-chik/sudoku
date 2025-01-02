"use client";

import { useState, useEffect } from 'react';
import { generateSudoku } from '/src/utils/sudoku/sudokuGenerator';
import styles from '/src/styles/dailysudoky.css';
import { useRouter } from "next/navigation";
import { useSudoku } from '/src/context/SudokuContext'; // Импортируйте контекст

export default function DailySudoku() {
    const { setSudoku } = useSudoku(); // Используем контекст
    const [difficulty, setDifficulty] = useState('medium');
    const [sudokuArr, setSudokuArr] = useState(generateSudoku(difficulty, true));
    const [initial, setInitial] = useState(generateSudoku(difficulty, true));

    const router = useRouter(); // Используем useRouter для навигации

    useEffect(() => {
        const generatedSudoku = generateSudoku(difficulty, true);
        setSudokuArr(generatedSudoku);
        setInitial(generatedSudoku);
    }, [difficulty]);

    const handleGenerate = () => {
        const newBoard = generateSudoku(difficulty, true);
        setSudokuArr(newBoard);
    };

    const handleChange = (row, col, value) => {
        const newBoard = [...sudokuArr];
        newBoard[row][col] = value ? parseInt(value) : -1;
        setSudokuArr(newBoard);
    };

    const handleSubmit = () => {
        const serializedInitial = JSON.stringify(initial);
        setSudoku(serializedInitial); // Сохраняем в контексте
        console.log("Судоку сохранено:", serializedInitial); // Логируем сохраненное судоку
        alert("Судоку сохранено. Вы можете перейти на страницу Судоку дня, когда захотите.");
    };

    return (
        <div className={styles.App}>
            <div className={styles.header}>
                <h3>Добавление судоку дня</h3>
                <p>Заполните судоку</p>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Легкий</option>
                    <option value="medium">Средний</option>
                    <option value="hard">Сложный</option>
                </select>
            </div>
            <div className={styles.sudokuBoard}>
                {sudokuArr.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((cell, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`}>
                                <input
                                    type="number"
                                    value={cell === -1 ? '' : cell}
                                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                    className={styles.cell}
                                    readOnly={initial[rowIndex][colIndex] !== -1}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.buttonPanel}>
                <button className={styles.button} onClick={handleGenerate}>Сгенерировать судоку</button>
                <button className={styles.button} onClick={handleSubmit}>Добавить судоку дня</button>
            </div>
        </div>
    );
}
