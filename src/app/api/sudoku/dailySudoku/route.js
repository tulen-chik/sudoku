// src/app/api/saveSudoku.js
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const sudokuData = await req.json();

        // Путь к файлу, в который будем сохранять данные
        const filePath = path.join(process.cwd(), 'src/sudokuData.json');

        // Сохраняем в файл
        fs.writeFileSync(filePath, JSON.stringify(sudokuData, null, 2));

        return new Response(JSON.stringify({ message: 'Судоку успешно сохранено!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Ошибка сервера: ' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}