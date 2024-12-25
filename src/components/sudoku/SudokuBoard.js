import React from 'react';
import SudokuCell from '/src/components/sudoku/SudokuCell';

function SudokuBoard({ sudokuArr, setSudokuArr, initial, errors }) {
    function onInputChange(e, row, col) {
        const val = parseInt(e.target.value) || -1;
        const grid = JSON.parse(JSON.stringify(sudokuArr));
        if (val === -1 || (val >= 1 && val <= 9)) {
            grid[row][col] = val;
        }
        setSudokuArr(grid);
    }

    return (
        <table>
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
                                disabled={initial[rIndex][cIndex] !== -1}
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