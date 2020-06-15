import React, { useState } from "react";
import { useStore } from "../../../hooks/useStore.js";
import ContentHeader from "../../../components/ContentHeader/ContentHeader.js";
import style from "./AddUser.module.css";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const { uiStore, userStore } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userStore.createContactforUser(uiStore.currentUser, email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ContentHeader title={"Add contact"} />
      <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
          <label htmlFor="name" className={style.label}>
            Email:
            <input
              className={style.input}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <input type="submit" value="Add contact" className={style.button} />
        </form>
      </div>
    </>
  );
};

export default AddUser;
