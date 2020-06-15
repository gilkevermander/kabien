import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';


const Land = ({nextStep, values, setLand, landStore, prevStep}) => {

  const [error, setError] = useState("");

  const saveAndContinue = (e) => {
    e.preventDefault()
    if(values.land === "" ){
      setError("duid een land aan")
    } else {
      nextStep()
    }
  }

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  console.log(values);
  console.log(landStore.lands);

  return (
    <Form color='blue' >
      <h1 className="ui centered">Kies het land van jouw herinnering</h1>
      <p>{error}</p>
      <Form.Field>
        <select name="land" id="land" onChange={e => setLand(e.currentTarget.value)}>
        <option key="niks" id="land" name="land" value="" >kies een optie</option>
          {landStore.lands.map(land => (
            <option key={land.id} id="land" name="land" value={land.title} >{land.title}</option>
          ))}
        </select>
      </Form.Field>
      <Button onClick={back}>Back</Button>
      <Button onClick={saveAndContinue}>Save And Continue </Button>
    </Form>
  )
}

export default Land;