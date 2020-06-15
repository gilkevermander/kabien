import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';


const Land = ({ nextStep, values, setLand, landStore, prevStep }) => {

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const saveAndContinue = (e) => {
    e.preventDefault()
    if (values.land === "") {
      setError("duid een land aan")
    } else {
      nextStep()
    }
  }

  const back = (e) => {
    e.preventDefault();
    prevStep();
  }

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword)
  }

  const data = () => {
    let arr = landStore.lands
    console.log(arr);
    if(search === ""){
      return arr
    } else {
      return arr.filter(arr.title.toLowerCase().includes(search.toLowerCase()))
    }
  } 

  console.log(values);
  console.log(landStore.lands);

  return (
    <Form color='blue' >
      <h1 className="ui centered">Enter Personal Details</h1>
      <ul>
        {data().map(land => (
          <li key={land.id}>{land.title}</li>
        ))}
      </ul>
      <p>{error}</p>
      <div>
        <input type="text" placeholder="Enter item to be searched" onChange={(e) => searchSpace(e)} />
        {/* {landStore.lands} */}
      </div>
      <Button onClick={back}>Back</Button>
      <Button onClick={saveAndContinue}>Save And Continue </Button>
    </Form>
  )
}

export default Land;