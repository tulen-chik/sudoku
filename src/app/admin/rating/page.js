import Head from 'next/head';
import styles from '/src/styles/rating.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Рейтинг игроков</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Рейтинг игроков:</h1>
                <div className={styles.medals}>
                    <div className={styles.medal} style={{ backgroundColor: 'gold' }}></div>
                    <div className={styles.medal} style={{ backgroundColor: 'silver' }}></div>
                    <div className={styles.medal} style={{ backgroundColor: 'orange' }}></div>
                </div>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Место</th>
                        <th>Игрок</th>
                        <th>Счет</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Игрок 1</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Игрок 2</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Игрок 3</td>
                        <td>6</td>
                    </tr>
                    </tbody>
                </table>
            </main>
        </div>
    );
}