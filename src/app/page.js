'use client'; // Указываем, что это клиентский компонент

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Перенаправляем на страницу входа
        router.push('/auth/login');
    }, [router]);

    return null; // Не отображаем ничего на странице Home
}