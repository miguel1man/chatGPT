const giphyApi = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export async function fetchImages(joinResponse, SeturlImage1, SeturlImage2, SeturlImage3) {
  const PREFIX_IMAGE_URL = `https://api.giphy.com/v1/gifs/search?q=${joinResponse}&api_key=${giphyApi}&limit=3`;

  try {
    const response = await fetch(PREFIX_IMAGE_URL);
    const data = await response.json();

    SeturlImage1(data.data[0].images.fixed_height.url);
    SeturlImage2(data.data[1].images.fixed_height.url);
    SeturlImage3(data.data[2].images.fixed_height.url);
  } catch(error) {
    console.error(error);
    throw error;
  }
}