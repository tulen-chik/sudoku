'use client';

import React, { useEffect, useState } from 'react';
import { useSudoku } from '/src/context/SudokuContext';
import SudokuBoard from '/src/components/sudoku/SudokuBoard';
import ButtonPanel from '/src/components/sudoku/ButtonPanel';
import styles from '/src/styles/globals.css';

export default function SudokuOfTheDay() {
    const { sudoku } = useSudoku();
    const [sudokuArr, setSudokuArr] = useState([]);
    const [initial, setInitial] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log('Sudoku from context:', sudoku);

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
    }, [sudoku]);

    if (!sudoku) {
        return <div>Loading...</div>;
    }

    function checkSudoku() {
        // Ваша логика валидации
    }

    function resetSudoku() {
        setSudokuArr(initial);
    }

    return (
        <div className={styles.App}>
            <div className={styles.header}>
                <h1>Судоку дня</h1>
                <SudokuBoard sudokuArr={sudokuArr} initial={initial} errors={errors} />
                <ButtonPanel checkSudoku={checkSudoku} resetSudoku={resetSudoku} />
            </div>
        </div>
    );
}