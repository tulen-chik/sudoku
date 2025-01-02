import React from 'react';

const SudokuRules = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Правила игры в Судоку</h1>
            <p style={styles.intro}>
                Судоку — это логическая игра, цель которой заполнить квадратную сетку 9x9 так, чтобы каждая строка,
                каждый столбец и каждая из девяти 3x3 квадратов содержали все цифры от 1 до 9.
            </p>
            <h2 style={styles.subtitle}>Основные правила:</h2>
            <ul style={styles.list}>
                <li>Каждая строка должна содержать все цифры от 1 до 9 без повторений.</li>
                <li>Каждый столбец должен содержать все цифры от 1 до 9 без повторений.</li>
                <li>Каждый из девяти 3x3 квадратов (блоков) должен содержать все цифры от 1 до 9 без повторений.</li>
            </ul>
            <h2 style={styles.subtitle}>Советы для начинающих:</h2>
            <ul style={styles.list}>
                <li>Начинайте с самых заполненных строк, столбцов и блоков.</li>
                <li>Ищите цифры, которые могут быть единственными возможными в данной строке, столбце или блоке.</li>
                <li>Используйте карандашные заметки, чтобы пометить возможные цифры для пустых клеток.</li>
                <li>Не спешите; если застряли, сделайте паузу и вернитесь к задаче позже.</li>
            </ul>
            <h2 style={styles.subtitle}>Разновидности Судоку:</h2>
            <p>
                Существуют различные варианты Судоку, включая:
            </p>
            <ul style={styles.list}>
                <li>Судоку 4x4</li>
                <li>Судоку с буквами</li>
                <li>Судоку с дополнительными правилами (например, цветами)</li>
            </ul>
            <h2 style={styles.subtitle}>Удачи в игре!</h2>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: 'auto',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
    },
    intro: {
        fontSize: '18px',
        marginBottom: '20px',
        color: '#555', // Изменен цвет текста на тот же, что и у подзаголовков
    },
    subtitle: {
        marginTop: '20px',
        color: '#555',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
    },
};

export default SudokuRules;