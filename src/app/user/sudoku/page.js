// Home.js

'use client';

import React, { useState, useEffect } from 'react';
import SudokuBoard from '/src/components/sudoku/SudokuBoard';
import ButtonPanel from '/src/components/sudoku/ButtonPanel';
import { solver, checkSudokuValidity } from '/src/utils/sudoku/sudokuSolver';
import { generateSudoku } from '/src/utils/sudoku/sudokuGenerator'; // Импортируем генератор судоку
import styles from '../../../styles/globals.css'; // Importing global styles

function Home() {
    const [difficulty, setDifficulty] = useState('medium'); // Состояние для сложности
    const [sudokuArr, setSudokuArr] = useState(generateSudoku('medium')); // Генерация судоку по умолчанию
    const [initial, setInitial] = useState(generateSudoku('medium')); // Начальные значения

    useEffect(() => {
        const generatedSudoku = generateSudoku(difficulty);
        setSudokuArr(generatedSudoku);
        setInitial(generatedSudoku); // Сохраняем начальные значения
    }, [difficulty]);

    function handleDifficultyChange(event) {
        const chosenDifficulty = event.target.value;
        setDifficulty(chosenDifficulty);
    }

    function checkSudoku() {
        let sudoku = JSON.parse(JSON.stringify(sudokuArr));
        solver(sudoku);
        const compare = checkSudokuValidity(sudokuArr, sudoku);
        if (compare.isComplete) {
            alert("Ура молодец тип");
        } else if (compare.isSolvable) {
            alert("Продолжай в том же духе");
        } else {
            alert("Не решено.");
        }
    }

    function solveSudoku() {
        let sudoku = generateSudoku(difficulty);
        solver(sudoku);
        setSudokuArr(sudoku);
    }

    function resetSudoku() {
        setSudokuArr(generateSudoku(difficulty));
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
                <SudokuBoard sudokuArr={sudokuArr} setSudokuArr={setSudokuArr} initial={initial} />
                <ButtonPanel
                    checkSudoku={checkSudoku}
                    solveSudoku={solveSudoku}
                    resetSudoku={resetSudoku}
                />
            </div>
        </div>
    );
}

export default Home;