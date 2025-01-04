'use server';

import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        // Чтение пользователей из JSON файла
        const usersFilePath = path.join(process.cwd(), 'src/users.json');
        const usersData = fs.readFileSync(usersFilePath, 'utf-8');
        const users = JSON.parse(usersData);

        // Поиск пользователя
        const user = users.find((user) => user.username === username && user.password === password);

        if (!user) {
            return new Response(JSON.stringify({ message: 'Пользователь не найден или неверный пароль' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Возвращаем роль пользователя и сообщение об успешном входе
        return new Response(JSON.stringify({
            role: user.role,
            username: user.username,
            message: 'Успешный вход'
        }), {
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