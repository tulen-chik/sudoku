'use client';

import React, { useState } from 'react';
import initial from '/src/utils/sudoku/sudokuGenerator';
import SudokuBoard from '/src/components/sudoku/SudokuBoard';
import ButtonPanel from '/src/components/sudoku/ButtonPanel';
import { solver, checkSudokuValidity } from '/src/utils/sudoku/sudokuSolver';
import styles from '../../../styles/globals.css'; // Importing global styles

function Home() {
    const [sudokuArr, setSudokuArr] = useState(JSON.parse(JSON.stringify(initial)));

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
        let sudoku = JSON.parse(JSON.stringify(initial));
        solver(sudoku);
        setSudokuArr(sudoku);
    }

    function resetSudoku() {
        setSudokuArr(JSON.parse(JSON.stringify(initial)));
    }

    return (
        <div className={styles.App}>
            <div className={styles.header}>
                <h3>Sudoku Solver</h3>
                <SudokuBoard sudokuArr={sudokuArr} setSudokuArr={setSudokuArr} />
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