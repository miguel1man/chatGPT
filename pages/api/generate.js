import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Texto inválido.",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(fraseEscrita) {
  const iaResponse = fraseEscrita;
  return `
  En base a esta frase "${iaResponse}" escoge palabras clave que serán utilizadas para buscar gifs graciosos para reaccionar a dicha frase.
  Sigue al pie de la letra las siguientes instrucciones para escribir tu respuesta:
  - Escribe de 3 a 5 palabras.
  - Escribe al menos una emoción.
  - Tu respuesta debe contener únicamente palabras clave optimizadas para búsqueda de gifs graciosos.
  - No escribas conjunciones, ni tampoco hashtags (#).
  - En tu respuesta no puedes escoger las palabras "Risa", "risas", "ríe", "reír", "carcajadas", "verbo", "emoción", "sustantivo" ni "palabras clave".`;
}
