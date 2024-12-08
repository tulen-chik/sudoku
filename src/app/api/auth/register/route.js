import fs from 'fs';
import bcrypt from 'bcryptjs';

const usersFilePath = './users.json';

export async function POST(req) {
    const { username, password } = await req.json();

    let users = [];
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        users = JSON.parse(data);
    } catch (error) {
        // Если файл не существует или содержит ошибку, инициализируем пустой массив
        if (error.code === 'ENOENT') {
            fs.writeFileSync(usersFilePath, JSON.stringify([]));
        } else {
            return new Response(JSON.stringify({ message: 'Ошибка чтения пользователей' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return new Response(JSON.stringify({ message: 'Пользователь уже существует' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    // Запись в файл
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return new Response(JSON.stringify({ message: 'Пользователь зарегистрирован' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}