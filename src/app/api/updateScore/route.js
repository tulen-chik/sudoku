import fs from 'fs';
import path from 'path';

export async function POST(req) {
    const { username, score } = await req.json(); // Получаем данные из запроса

    const scoresFilePath = path.join(process.cwd(), 'src/scores.json');

    // Читаем текущие очки
    const scoresData = fs.existsSync(scoresFilePath)
        ? JSON.parse(fs.readFileSync(scoresFilePath, 'utf-8'))
        : {};

    // Обновляем очки
    if (scoresData[username]) {
        scoresData[username] += score; // Увеличиваем очки
    } else {
        scoresData[username] = score; // Устанавливаем начальное значение
    }

    // Записываем обратно в файл
    fs.writeFileSync(scoresFilePath, JSON.stringify(scoresData, null, 2));

    return new Response(JSON.stringify({ message: 'Очки обновлены успешно.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}