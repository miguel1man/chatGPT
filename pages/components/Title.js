import Head from "next/head";
import styles from "./title.module.css";

export default function Title() {
    return (
        <>
            <Head>
                <title>GPT Reacciona</title>
                <link rel="icon" href="/bot.png" />
            </Head>
            <header className={styles.title}>
                <img src="/bot.png" className={styles.icon} />
                <h1>Escribe...</h1>
            </header>
        </>
    )
}