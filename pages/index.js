import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./index.module.css";

const giphyApi = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function Home() {

  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [urlImage1, SeturlImage1] = useState();
  const [urlImage2, SeturlImage2] = useState();
  const [urlImage3, SeturlImage3] = useState();
  let SPLIT_RESPONSE;

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      SPLIT_RESPONSE = data.result.split(/[\s,]+/).filter(Boolean);
      setAnimalInput("");

      const joinResponse = SPLIT_RESPONSE.join("+");
      const PREFIX_IMAGE_URL = `https://api.giphy.com/v1/gifs/search?q=${joinResponse}&api_key=${giphyApi}&limit=3`;

      fetch(PREFIX_IMAGE_URL)
        .then(response => response.json())
        .then(res => {
          SeturlImage1(res.data[0].images.fixed_height.url);
          SeturlImage2(res.data[1].images.fixed_height.url);
          SeturlImage3(res.data[2].images.fixed_height.url);
        })
        .catch(e => {
          console.error(e);
          alert(e.message);
        });

    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>GPT Reacciona</title>
        <link rel="icon" href="/bot.png" />
      </Head>

      <main className={styles.main}>
        <img src="/bot.png" className={styles.icon} />
        <h3>Escribe...</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="... y chatGPT reaccionará"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Reaccionar" />
        </form>
        <div className={styles.result}>{result}</div>
        
        {urlImage1 && <img className="imageResponse" src={urlImage1} alt='Primera respuesta de chatGPT' />}
        {urlImage2 && <img className="imageResponse" src={urlImage2} alt='Segunda respuesta de chatGPT' />}
        {urlImage3 && <img className="imageResponse" src={urlImage3} alt='Tercera respuesta de chatGPT' />}
      </main>
    </div>
  );
}
