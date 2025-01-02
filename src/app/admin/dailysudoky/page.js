"use client";

import { useState, useEffect } from 'react';
import { generateSudoku } from '/src/utils/sudoku/sudokuGenerator';
import styles from '/src/styles/dailysudoky.css';
import { useRouter } from "next/navigation";

export default function DailySudoku() {
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

    const handleSubmit = async () => {
        const serializedInitial = JSON.stringify(initial); // Данные судоку

        // Создаем объект в нужном формате
        const dataToSend = {
            sudoku: serializedInitial
        };

        console.log("Судоку сохранено:", dataToSend);

        // Отправка данных на сервер
        try {
            const response = await fetch('/api/sudoku/dailySudoku', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend), // Отправляем отформатированный объект
            });

            if (!response.ok) {
                throw new Error('Ошибка при сохранении судоку');
            }

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            alert('Ошибка при сохранении судоку: ' + error.message);
        }
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