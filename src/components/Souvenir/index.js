import React, { useState } from "react";
import { Form, Button } from 'semantic-ui-react';

import style from "./Souvenir.module.css";

const Souvenir = ({ nextStep, values, setSouvenir, prevStep }) => {

  const [error, setError] = useState("");

  const saveAndContinue = (e) => {
    e.preventDefault()
    if(values.souvenir === "" ){
      setError("duid een souvenir aan")
    } else {
      nextStep()
    }
  }

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  console.log(values);
  
  return (
    <section className={style.container}>
      <h2 className={style.message}>Souvenir</h2>
      <Form color='blue' >
        <h1 className="ui centered">kies een souvenir</h1>
        <p>{error}</p>
        <Form.Field>
        <label>
          <input type="radio" name="souvenir" value="sleutelhanger" onChange={e => setSouvenir(e.currentTarget.value)} /> <span>sleutelhanger</span>
        </label>
        <label>
          <input type="radio" name="souvenir" value="magneet" onChange={e => setSouvenir(e.currentTarget.value)} /> <span>magneet</span>
        </label>
        <label>
          <input type="radio" name="souvenir" value="sticker" onChange={e => setSouvenir(e.currentTarget.value)} /> <span>sticker</span>
        </label>
        </Form.Field>
        <Button onClick={back}>Back</Button>
        <Button onClick={saveAndContinue}>Save And Continue </Button>
      </Form>
    </section>
  );
};

export default Souvenir;