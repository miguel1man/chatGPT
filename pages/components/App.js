import { useState } from "react";
import styles from "../index.module.css";
import Title from "./Title";
import { fetchImages } from './giphy';

const giphyApi = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function App() {

  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [inputValue, setInputValue] = useState("");
  const [showInputValue, setShowInputValue ] = useState(false);
  const [urlImage1, SeturlImage1] = useState();
  const [urlImage2, SeturlImage2] = useState();
  const [urlImage3, SeturlImage3] = useState();
  const [showImages, setShowImages] = useState(false);

  let splitResponse;

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
      splitResponse = data.result.split(/[\s,]+/).filter(Boolean);
      setAnimalInput("");

      const joinResponse = splitResponse.join("+");

      await fetchImages(joinResponse, SeturlImage1, SeturlImage2, SeturlImage3);

      setShowImages(true);

    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Title />
      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="... y chatGPT reaccionará"
            value={animalInput}
            onChange={(e) => {
              setAnimalInput(e.target.value);
            }}
          />
          <input type="submit" value="Reaccionar" onClick={() => {
            setShowImages(false);
            setInputValue(animalInput)
            setShowInputValue(true);
          }} />
        </form>
        {showInputValue && <p>Situación: {inputValue}</p>}
        {showImages && urlImage1 && <img src={urlImage1} alt='img1' />}
        {showImages && urlImage2 && <img src={urlImage2} alt='img2' />}
        {showImages && urlImage3 && <img src={urlImage3} alt='img3' />}
      </main>
    </div>
  );
}
