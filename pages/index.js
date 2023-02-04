import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./index.module.css";

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

      console.log(SPLIT_RESPONSE.join("+"));
      const joinResponse = SPLIT_RESPONSE.join("+");
      const PREFIX_IMAGE_URL = `http://api.giphy.com/v1/gifs/search?q=${joinResponse}&api_key=y3hnhA4Cp8ZGBCg5fUJw0AozF9KsPvex&limit=3`;

      fetch(PREFIX_IMAGE_URL)
        .then(res => res.json())
        .then(responses => {
          const { url } = responses.data[0].images.fixed_height;
          SeturlImage1(url);
          SeturlImage2(responses.data[1].images.fixed_height.url);
          SeturlImage3(responses.data[2].images.fixed_height.url);
        })
        .catch(error => {
          console.error(error);
          alert(error.message);
        });

    } catch(error) {
      // Consider implementing your own error handling logic here
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
            placeholder="... Y chatGPT reaccionará"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Reacciona" />
        </form>
        <div className={styles.result}>{result}</div>
        <img src={urlImage1} alt=' ' />
        <img src={urlImage2} alt=' ' />
        <img src={urlImage3} alt=' ' />
      </main>
    </div>
  );
}
