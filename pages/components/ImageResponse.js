import React from "react";

function ImageResponse({ urlImage1, urlImage2, urlImage3 }) {
    return (
      <>
        {urlImage1 && (
          <img
            className="imageResponse"
            src={urlImage1}
            alt="Primera respuesta de chatGPT"
          />
        )}
        {urlImage2 && (
          <img
            className="imageResponse"
            src={urlImage2}
            alt="Segunda respuesta de chatGPT"
          />
        )}
        {urlImage3 && (
          <img
            className="imageResponse"
            src={urlImage3}
            alt="Tercera respuesta de chatGPT"
          />
        )}
      </>
    );
  }

export default ImageResponse;
