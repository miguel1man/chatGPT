## GPT reaction with gifs

<div align="center">
![Badge](https://img.shields.io/badge/React-18.2.0-blue)
![Badge](https://img.shields.io/badge/Next-13.1.1-blueviolet)
![Badge](https://img.shields.io/badge/OpenAI-3.1.0-orange)
![Badge](https://img.shields.io/badge/Node-%3E%3D14.6.0-green)
</div>

Write something and Chat GPT will react using gifs!

https://gptreacciona.vercel.app/

![imagen](https://user-images.githubusercontent.com/78570710/217940521-addca17d-cf1c-4f25-9c56-423f9d5c8166.png)

## Installation
- Run `npm i` to install dependencies.
- Write your API keys on the file `.env` (You can use `.env.example` as a template).
- Run in local with `npm run dev`.

## APIs
- [Open AI](https://openai.com/api/)
- [Giphy](https://developers.giphy.com/)

## Libraries
- React 18.2.0
- Next 13.1.1
- OpenAI 3.1.0
- Node >=14.6.0

## Config
- Path `pages/api/generate.js`
- Update the function:
```js
function generatePrompt(writtenPhrase) {
  const iaResponse = writtenPhrase;
  return `
    // Write your prompt to the AI.
  `
```