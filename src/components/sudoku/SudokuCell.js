import React from 'react';

function SudokuCell({ value, onInputChange, disabled }) {
    return (
        <td>
            <input
                onChange={onInputChange}
                value={value === -1 ? '' : value}
                className="cellInput"
                disabled={disabled}
            />
        </td>
    );
}

export default SudokuCell;