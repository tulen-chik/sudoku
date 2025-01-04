import React from 'react';

function SudokuCell({ value, onInputChange, disabled, error }) {
    return (
        <td style={{
            border: error ? '2px solid red' : '1px solid black', // Граница ячейки
            backgroundColor: error ? 'lightcoral' : 'white', // Подсветка ошибок
        }}>
            <input
                type="number"
                value={value === -1 ? '' : value}
                onChange={onInputChange}
                disabled={disabled}
                style={{
                    width: '30px',
                    height: '30px',
                    textAlign: 'center',
                    fontSize: '16px',
                    border: 'none', // Убираем границу у input
                    outline: 'none', // Убираем обводку при фокусировке
                    backgroundColor: 'transparent', // Прозрачный фон, чтобы видно было подложку
                }}
            />
        </td>
    );
}

export default SudokuCell;