import React from "react";
import Webcam from "react-webcam";
import paris from "./paris.jpeg"

import style from "./Camera.module.css";

const Camera = () => {

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
      <section className={style.container}>
        <Webcam
          audio={false}
          //ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={700}
          radius={4}
          className={style.mask}
          mirrored={true}
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc} alt="foto" className={style.img}
          />
        )}
        <img alt="tourist" className={style.paris} src={paris}></img>
      </section>
    );
  };

export default Camera;