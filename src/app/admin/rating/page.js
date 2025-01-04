"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './page.module.css';

export default function AdminRating() {
    const [topUsers, setTopUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/users'); // Replace with your API URL
                if (!res.ok) {
                    throw new Error(`Error fetching data: ${res.status}`);
                }
                const data = await res.json();
                setTopUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopUsers();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Рейтинг игроков</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Рейтинг игроков:</h1>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Место</th>
                        <th>Игрок</th>
                        <th>Счет</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topUsers.map((user, index) => (
                        <tr key={user.username}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.rating}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}