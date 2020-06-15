import React, { useState, Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite';

const Keuze = ({ nextStep, values, setKeuze, prevStep, overStep }) => {

  const [error, setError] = useState("");

  const saveAndContinue = (e) => {
    e.preventDefault()
    if (values.keuze === false || values.keuze === true) {
      console.log(values.keuze)
      if (values.keuze === false) {
        overStep()
      } else {
        nextStep()
      }
    } else {
      setError("duide een keuze aan")
    }

  }
  const back = (e) => {
    e.preventDefault();
    prevStep();
  }
  console.log(values);
  return (
    <Form >
      <h2 className="ui centered">Wil jij jouw souvenir pimpen met een foto?</h2>
      <p>{error}</p>
      <Form.Field>
        <label>
          <input type="radio" name="keuze" value="false" onChange={e => setKeuze(false)} /> <span>Nee, liever niet</span>
        </label>
        <label>
          <input type="radio" name="keuze" value="true" onChange={e => setKeuze(true)} /> <span>Ja, Superleuk !</span>
        </label>
      </Form.Field>
      <Button onClick={saveAndContinue}>Save And Continue </Button>
      <Button onClick={back}>Back</Button>
    </Form>
  )

}

export default Keuze;