import fs from 'fs';
import bcrypt from 'bcryptjs';

const usersFilePath = './users.json';

export async function POST(req) {
    const { username, password } = await req.json();

    // Проверка существования пользователя
    let users = [];
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        users = JSON.parse(data);
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Ошибка чтения пользователей' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const existingUser = users.find(user => user.username === username);
    if (!existingUser) {
        return new Response(JSON.stringify({ message: 'Пользователь не найден' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return new Response(JSON.stringify({ message: 'Неверный пароль' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ message: 'Успешный вход' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}