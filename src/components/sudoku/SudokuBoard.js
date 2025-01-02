import React from 'react';
import SudokuCell from '/src/components/sudoku/SudokuCell';
import styles from '/src/styles/sudoku.module.css'; // Добавьте стили, если нужно

function SudokuBoard({ sudokuArr, setSudokuArr, initial, errors }) {
    function onInputChange(e, row, col) {
        const val = parseInt(e.target.value) || -1; // Преобразуем ввод в число или -1
        const grid = JSON.parse(JSON.stringify(sudokuArr)); // Глубокое копирование массива

        // Проверяем, является ли ввод допустимым
        if (val === -1 || (val >= 1 && val <= 9)) {
            grid[row][col] = val; // Устанавливаем значение в сетке
            setSudokuArr(grid); // Обновляем состояние
        }
    }

    return (
        <table className={styles.sudokuTable}>
            <tbody>
            {sudokuArr.map((row, rIndex) => (
                <tr key={rIndex} className={rIndex % 3 === 2 ? 'bBorder' : ''}>
                    {row.map((cell, cIndex) => {
                        const isError = errors.some(error => error.row === rIndex && error.col === cIndex);
                        return (
                            <SudokuCell
                                key={cIndex}
                                value={cell}
                                onInputChange={(e) => onInputChange(e, rIndex, cIndex)}
                                disabled={initial[rIndex][cIndex] !== -1} // Блокируем редактирование, если это изначальное значение
                                error={isError} // Передаем информацию об ошибке
                            />
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default SudokuBoard;