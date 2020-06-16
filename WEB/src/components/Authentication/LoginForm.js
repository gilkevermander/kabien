import React, { useState } from "react";
import style from "./Authentication.module.css";
import TextInputGroup from "../TextInputGroup";
import { useStore } from "../../hooks/useStore";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";

const LoginForm = () => {
  const { uiStore } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uiStore.login(email, password);
      history.push(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <TextInputGroup
          label="Email"
          name="email"
          type="email"
          placeholder="Fill in your email."
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInputGroup
          label="Password"
          type="password"
          name="Password"
          placeholder="Fill in your password."
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input type="submit" value="Login" className={style.button} />
      </form>
    </div>
  );
};

export default LoginForm;
