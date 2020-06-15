import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite';

const Delen = ({ nextStep, values, setDelen }) => {

  const [error, setError] = useState("");

  const saveAndContinue = (e) => {
    e.preventDefault()
    if (values.delen === false || values.delen === true) {
      nextStep()
    } else {
      setError("duid een optie aan")
    }

  }
  console.log(values);
  return (
    <Form >
      <h2 className="ui centered">Wil je jouw verhaal anoniem delen op
de wereldkaart vol reisverhalen?</h2>
      <p>{error}</p>
      <Form.Field>
        <label>
          <input type="radio" name="keuze" value="false" onChange={e => setDelen(false)} /> <span>Nee, liever niet</span>
        </label>
        <label>
          <input type="radio" name="keuze" value="true" onChange={e => setDelen(true)} /> <span>Ja, het mag op de
wereldkaart als audio</span>
        </label>
      </Form.Field>
      <Button onClick={saveAndContinue}>Save And Continue </Button>
    </Form>
  )

}

export default Delen;