import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import TextInputGroup from "../TextInputGroup";
import style from "./Gegevens.module.css";
import { useStore } from "../../hooks/useStore";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";


const Gegevens = ({ nextStep, values, prevStep, prevprevStep }) => {

  // const [errorVoor, setErrorVoor] = useState("");
  // const [errorAchter, setErrorAchter] = useState("");
  // const [errorGebruiker, setErrorGebruiker] = useState("");
  // const [errorEmail, setErrorEmail] = useState("");
  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [gebruikersnaam, setGebruikersnaam] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");

  const { uiStore } = useStore();
  const history = useHistory();


  // const saveAndContinue = (e) => {
  //   e.preventDefault();
  //   //let formIsValid = true
  //   // if (!values.voornaam) {
  //   //   //formIsValid = false;
  //   //   setErrorVoor("vul een voornaam in")
  //   // } 
  //   // if (!values.achternaam) {
  //   //   //formIsValid = false;
  //   //   setErrorAchter("vul een achternaam in")
  //   // } 
  //   // if (!values.gebruikersnaam) {
  //   //   //formIsValid = false;
  //   //   setErrorGebruiker("vul een gebruikersnaam in")
  //   // } 
  //   // if (!values.email) {
  //   //   //formIsValid = false;
  //   //   setErrorEmail("vul een E-mail in")
  //   // } 
    
  //   // else {
  //     nextStep();
  //   // }
  // }

  const back = (e) => {
    e.preventDefault();
    if(values.keuze === false) {
      prevprevStep();
    }else {
      prevStep();
    }
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password === values.passwordAgain) {
      try {
        await uiStore.registerUser({ voornaam, achternaam, gebruikersnaam, email, password });
        nextStep();
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(values);

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1 className="ui centered">Geef jouw gegevens in</h1>
      <TextInputGroup
          label="voornaam"
          name="voornaam"
          type="voornaam"
          placeholder="vul je voornaam in"
          value={voornaam}
          onChange={(e) => setVoornaam(e.currentTarget.value)}
        />
      <Form.Field>
        <label>Achternaam</label>
        {/* <span style={{ color: "red" }}>{errorAchter}</span> */}
        <input
          placeholder='Achternaam'
          onChange={e => setAchternaam(e.currentTarget.value)}
          defaultValue={values.achternaam}
          required
        />
      </Form.Field>
      <Form.Field>
        <label>Gebruikersnaam</label>
        {/* <span style={{ color: "red" }}>{errorGebruiker}</span> */}
        <input
          placeholder='Gebruikersnaam'
          onChange={e => setGebruikersnaam(e.currentTarget.value)}
          defaultValue={values.gebruikersnaam}
          required
        />
      </Form.Field>
      <Form.Field>
        <label>E-mail</label>
        {/* <span style={{ color: "red" }}>{errorEmail}</span> */}
        <input
          placeholder='E-mail'
          onChange={e => setEmail(e.currentTarget.value)}
          defaultValue={values.email}
          type="email"
          required
        />
      </Form.Field>
      <TextInputGroup
          label="Password"
          type="password"
          name="Password"
          placeholder="Fill in your password."
          value={password}
          onChange={(e) => setPassWord(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Passwordagain"
          type="password"
          name="Passwordagain"
          placeholder="Fill in your password again."
          value={passwordAgain}
          onChange={(e) => setPassWordAgain(e.currentTarget.value)}
        />
        <input type="submit" value="Register" className={style.button} />
      <Button onClick={back}>Back</Button>
      {/* <Button onClick={saveAndContinue}>Save And Continue </Button> */}
    </form>
  )
}

export default Gegevens;