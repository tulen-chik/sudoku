'use server';

import fs from 'fs';
import path from 'path';

export async function POST(req) {
    const { username, password, isAdmin } = await req.json();
    const role = isAdmin ? 'admin' : 'user';
    const usersFilePath = path.join(process.cwd(), 'src/users.json');

    let users = [];
    try {
        if (fs.existsSync(usersFilePath)) {
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            users = JSON.parse(usersData);
        }
    } catch (error) {
        console.error('Ошибка при чтении файла:', error);
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return new Response(JSON.stringify({ message: 'Пользователь с таким именем уже существует' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const newUser = { username, password, role };
    console.log('Новый пользователь:', newUser);
    users.push(newUser);

    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Ошибка при записи файла:', error);
        return new Response(JSON.stringify({ message: 'Ошибка сохранения пользователя' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ message: 'Пользователь зарегистрирован' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}