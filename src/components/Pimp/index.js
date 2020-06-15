import React, { useState } from "react";
import { Button } from 'semantic-ui-react';
import Webcam from "react-webcam";
import paris from "./paris.jpeg"

import style from "./Pimp.module.css";

const Pimp = ({ nextStep, values, prevStep }) => {

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState("");

  const saveAndContinue = (e) => {
    e.preventDefault()
    if (imgSrc === null) {
      setError("Neem eerst een foto!")
    } else {
      nextStep()
    }
  }

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  console.log(values);



  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <p>u koos voor een: {values.souvenir}</p>
      <p>{error}</p>
      <section className={style.container}>
        <Webcam
          audio={false}
          ref={webcamRef}
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
        <Button onClick={back}>Back</Button>
        <Button onClick={saveAndContinue}>Save And Continue </Button>
      </section>
    </>
  );
};

export default Pimp;