import Head from "next/head";
import styles from "./title.module.css";
import { useState } from "react";

export default function Title() {
    return (
        <>
            <Head>
                <title>GPT Reacciona</title>
                <link rel="icon" href="/bot.png" />
            </Head>
            <header className={styles.main}>
                <img src="/bot.png" className={styles.icon} />
                <h3>Escribe...</h3>
            </header>
      </>
    )
}