// sudokuGenerator.js

const SIZE = 9; // Размер поля
const SUBGRID_SIZE = 3; // Размер подрешетки

function createEmptyBoard() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(-1));
}

function isValid(board, row, col, num) {
    for (let i = 0; i < SIZE; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false; // Проверка строки и столбца
        }
    }
    const startRow = Math.floor(row / SUBGRID_SIZE) * SUBGRID_SIZE;
    const startCol = Math.floor(col / SUBGRID_SIZE) * SUBGRID_SIZE;
    for (let i = 0; i < SUBGRID_SIZE; i++) {
        for (let j = 0; j < SUBGRID_SIZE; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false; // Проверка подрешетки
            }
        }
    }
    return true; // Ввод допустим
}

function fillBoard(board) {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (board[row][col] === -1) {
                const numbers = [...Array(SIZE).keys()].map(x => x + 1); // Числа от 1 до 9
                shuffle(numbers); // Перемешиваем числа
                for (const num of numbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (fillBoard(board)) {
                            return true;
                        }
                        board[row][col] = -1; // Откат
                    }
                }
                return false; // Не удалось заполнить
            }
        }
    }
    return true; // Поле заполнено
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function removeNumbers(board, attempts) {
    while (attempts > 0) {
        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);
        if (board[row][col] !== -1) {
            const backup = board[row][col]; // Сохраняем значение
            board[row][col] = -1; // Удаляем число

            // Проверяем, есть ли уникальное решение
            if (!hasUniqueSolution(board)) {
                board[row][col] = backup; // Возвращаем число
            } else {
                attempts--; // Успешное удаление числа
            }
        }
    }
}

function hasUniqueSolution(board) {
    let count = 0;
    function solve() {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (board[row][col] === -1) {
                    for (let num = 1; num <= SIZE; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            solve();
                            board[row][col] = -1;
                        }
                    }
                    return; // Остановить, как только нашли одно решение
                }
            }
        }
        count++;
    }
    solve();
    return count === 1; // Проверяем, есть ли только одно решение
}

// Функция генерации судоку с учетом сложности
export function generateSudoku(difficulty) {
    const board = createEmptyBoard();
    fillBoard(board);

    // Условия генерации в зависимости от сложности
    let attempts;
    switch (difficulty) {
        case 'easy':
            attempts = 36; // Удаляем 36 чисел для легкой сложности
            break;
        case 'medium':
            attempts = 45; // Удаляем 45 чисел для средней сложности
            break;
        case 'hard':
            attempts = 54; // Удаляем 54 числа для сложной сложности
            break;
        default:
            attempts = 40; // Значение по умолчанию
            break;
    }

    removeNumbers(board, attempts); // Удаляем числа
    return board.map(row => row.map(cell => (cell === -1 ? -1 : cell))); // Убедимся, что удаленные ячейки обозначены как -1
}