'use client';

import React, { useEffect, useState } from 'react';
import SudokuBoard from '/src/components/sudoku/SudokuBoard';
import ButtonPanel from '/src/components/sudoku/ButtonPanel';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import sudokuData from '/src/sudokuData.json';
import { generateSudoku } from "@/utils/sudoku/sudokuGenerator";
import { solver } from "@/utils/sudoku/sudokuSolver"; // Импортируйте ваш JSON файл

export default function SudokuOfTheDay() {
    const router = useRouter();
    const [sudokuArr, setSudokuArr] = useState([]);
    const [initial, setInitial] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const { sudoku } = sudokuData;
        console.log('Sudoku from JSON:', sudoku);

        if (typeof sudoku === 'string') {
            try {
                const parsedBoard = JSON.parse(sudoku);
                setSudokuArr(parsedBoard);
                setInitial(parsedBoard);
            } catch (error) {
                console.error('Ошибка при разборе таблицы:', error);
            }
        } else {
            console.error('sudoku is not a string or is null:', sudoku);
        }
    }, []);

    if (!sudokuArr.length) {
        return <div>Loading...</div>;
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
        let sudoku = generateSudoku('medium', false); // false для получения заполненной таблицы
        const solvedBoard = solver(sudoku);
        setSudokuArr(solvedBoard);
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

    const handleChange = (row, col, value) => {
        const newBoard = [...sudokuArr];
        newBoard[row][col] = value ? parseInt(value) : -1;
        setSudokuArr(newBoard);
    };

    return (
        <>
            <div className={styles.outer_container}>
                <div className={styles.header}>
                    <h1>Судоку дня</h1>
                    <SudokuBoard setSudokuArr={setSudokuArr} sudokuArr={sudokuArr} initial={initial} errors={errors}
                                 handleChange={handleChange}/>
                    <ButtonPanel checkSudoku={checkSudoku} solveSudoku={solveSudoku} resetSudoku={resetSudoku}/>
                </div>
            </div>
            <button
                className={styles.orangeButton}
                onClick={() => router.push('/user/sudoku')}
            >
                +
            </button>
        </>
    );
}