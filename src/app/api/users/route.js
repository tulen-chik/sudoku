import fs from 'fs';
import path from 'path';

export async function GET(req) {
    const scoresFilePath = path.join(process.cwd(), 'src/scores.json');

    // Проверяем, существует ли файл
    if (!fs.existsSync(scoresFilePath)) {
        return new Response(JSON.stringify({ message: 'Файл не найден.' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Читаем данные из файла
    const scoresData = fs.readFileSync(scoresFilePath, 'utf-8');
    let users;

    try {
        users = JSON.parse(scoresData);
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Ошибка при парсинге JSON.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Преобразуем объект в массив
    const usersArray = Object.entries(users).map(([username, rating]) => ({ username, rating }));

    // Сортируем пользователей по рейтингу в порядке убывания
    usersArray.sort((a, b) => b.rating - a.rating);

    // Возвращаем только топ-3
    return new Response(JSON.stringify(usersArray.slice(0, 3)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}