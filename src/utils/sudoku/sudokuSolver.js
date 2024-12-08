import { checkRow, checkCol, checkBox } from './sudokuUtils';

export function checkSudokuValidity(currentSudoku, solveSudoku) {
    let res = {
        isComplete: true,
        isSolvable: true
    };
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (currentSudoku[i][j] !== solveSudoku[i][j]) {
                if (currentSudoku[i][j] !== -1) {
                    res.isSolvable = false;
                }
                res.isComplete = false;
            }
        }
    }
    return res;
}

export function solver(grid, row = 0, col = 0) {
    if (grid[row][col] !== -1) {
        const isLast = row >= 8 && col >= 8;
        if (!isLast) {
            const [newRow, newCol] = getNext(row, col);
            return solver(grid, newRow, newCol);
        }
    }

    for (let num = 1; num <= 9; num++) {
        if (checkValid(grid, row, col, num)) {
            grid[row][col] = num;
            const [newRow, newCol] = getNext(row, col);

            if (!newRow && !newCol) {
                return true;
            }

            if (solver(grid, newRow, newCol)) {
                return true;
            }
        }
    }

    grid[row][col] = -1;
    return false;
}

function getNext(row, col) {
    return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
}

function checkValid(grid, row, col, num) {
    return checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num);
}