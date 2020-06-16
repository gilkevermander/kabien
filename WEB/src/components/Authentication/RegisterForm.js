import React, { useState } from "react";
import style from "./Authentication.module.css";
import TextInputGroup from "../TextInputGroup";
import { useStore } from "../../hooks/useStore";

import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [gebruikersnaam, setGebruikersnaam] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordAgain, setPassWordAgain] = useState("");

  const { uiStore } = useStore();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === passwordAgain) {
      try {
        console.log('works yes')
        await uiStore.register({ voornaam, achternaam, gebruikersnaam, email, password });
        history.push(ROUTES.home);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <TextInputGroup
          label="Voornaam"
          name="voornaam"
          type="voornaam"
          placeholder="Vul je voornaam in."
          value={voornaam}
          onChange={(e) => setVoornaam(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Achternaam"
          name="achternaam"
          type="achternaam"
          placeholder="Vul je achternaam in."
          value={achternaam}
          onChange={(e) => setAchternaam(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Gebruikersnaam"
          name="gebruikersnaam"
          type="gebruikersnaam"
          placeholder="Vul je gebruikersnaam in."
          value={gebruikersnaam}
          onChange={(e) => setGebruikersnaam(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Email"
          name="email"
          type="email"
          placeholder="Vul je e-mail in."
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Password"
          type="password"
          name="Password"
          placeholder="Vul je wachtwoord in."
          value={password}
          onChange={(e) => setPassWord(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Passwordagain"
          type="password"
          name="Passwordagain"
          placeholder="Vul je wachtwoord opnieuw in."
          value={passwordAgain}
          onChange={(e) => setPassWordAgain(e.currentTarget.value)}
        />
        <input type="submit" value="Register" className={style.button} />
      </form>
    </div>
  );
};

export default RegisterForm;
