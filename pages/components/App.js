import { useState } from "react";
import styles from "../index.module.css";
import Title from "./Title";
import ImageResponse from "./ImageResponse";

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
      const PREFIX_IMAGE_URL = `https://api.giphy.com/v1/gifs/search?q=${joinResponse}&api_key=${giphyApi}&limit=3`;

      fetch(PREFIX_IMAGE_URL)
        .then(response => response.json())
        .then(res => {
          SeturlImage1(res.data[0].images.fixed_height.url);
          SeturlImage2(res.data[1].images.fixed_height.url);
          SeturlImage3(res.data[2].images.fixed_height.url);
          setShowImages(true);
        })
        .catch(e => {
          console.error(e);
          alert(e.message);
        });
      
      console.log(result);

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
        {showImages && <ImageResponse urlImage1={urlImage1} urlImage2={urlImage2} urlImage3={urlImage3} />}
      </main>
    </div>
  );
}
