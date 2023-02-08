import Head from "next/head";
import styles from "./header.module.css";
import { useState } from "react";

export default function Header() {
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