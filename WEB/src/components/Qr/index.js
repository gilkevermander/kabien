import React, { useState } from "react";
import QRCode from "react-qr-code";
import TextInputGroup from "../TextInputGroup";
import style from "./Qr.module.css";
import QrReader from 'react-qr-reader'

const Qr = () => {

  const [text, setText] = useState("");
  const [scan, setScan] = useState("");

  const handleScan = data => {
    if (data) {
      setScan(data)
    }
  }
  const handleError = err => {
    console.error(err)
  }

  return (
    <>
      <QRCode value={text} />

      <form className={style.form}>
        <TextInputGroup
          label="text"
          name="text"
          type="text"
          placeholder="Fill in your text."
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <input type="submit" value="genereer qr code" className={style.button} />
      </form>
      <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '40%' }}
          mirrored={true}
        />
        <p>{scan}</p>
    </>

  );

}

export default Qr;

