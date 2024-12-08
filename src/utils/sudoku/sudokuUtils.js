import React, { useState, useEffect } from 'react';
import { generateSudoku } from './sudokuGenerator'; // Импорт начального состоя

const SudokuGame = () => {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        const initialBoard = generateSudoku();
        setBoard(initialBoard);
    }, []);

    const handleCellClick = (row, col) => {
        console.log('Clicked cell:', row, col);
        console.log('Current cell value:', board[row][col]);

        if (board[row][col] === -1) {
            const num = prompt("Введите число от 1 до 9:");
            const number = parseInt(num);
            console.log('Input number:', number);

            if (number >= 1 && number <= 9) {
                const newBoard = [...board];
                newBoard[row][col] = number;

                console.log('New board state:', newBoard);

                if (isValidMove(newBoard, row, col, number)) {
                    setBoard(newBoard);
                } else {
                    alert("Неверный ход! Число нарушает правила судоку.");
                    newBoard[row][col] = -1;
                    setBoard(newBoard);
                }
            } else {
                alert("Пожалуйста, введите корректное число.");
            }
        } else {
            alert("Эта ячейка уже заполнена!");
        }
    };

    const isValidMove = (grid, row, col, num) => {
        return checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num);
    };

    return (
        <div>
            <h1>Sudoku Game</h1>
            <div className="sudoku-grid">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row.map((cell, colIndex) => (
                            <div className={`sudoku-cell ${cell !== -1 ? 'filled' : 'empty'}`}
                                 onClick={() => handleCellClick(rowIndex, colIndex)}>
                                {cell !== -1 ? cell : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Функции проверки
export function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
}

export function checkCol(grid, col, num) {
    return grid.map(row => row[col]).indexOf(num) === -1;
}

export function checkBox(grid, row, col, num) {
    const boxArr = [];
    const rowStart = row - (row % 3);
    const colStart = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            boxArr.push(grid[rowStart + i][colStart + j]);
        }
    }
    return boxArr.indexOf(num) === -1;
}

export default SudokuGame;