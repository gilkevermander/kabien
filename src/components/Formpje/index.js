import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Verhaal from "../../models/Verhaal.js";
import { useStore } from "../../hooks/useStore.js";
import { useParams } from "react-router-dom";
import style from "./Formpje.module.css";

const Formpje = () => {
  const [naam, setNaam] = useState("");
  const [verhaal, setVerhaal] = useState("");
  const { verhaalStore, landStore } = useStore();
  const { id } = useParams();

  const handleFormSubmit = e => {
    e.preventDefault();
    if (naam !== "") {
      const land = landStore.resolveLand(id);
      const verhaalt = new Verhaal({
        store: verhaalStore,
        naam,
        verhaal,
        landId: land.id
      });
      verhaalt.create();
      console.log(verhaal);
      console.log(naam);
      console.log(land.id);
      setNaam("");
      setVerhaal("");
    }
  };

  return useObserver(() => (
    <form onSubmit={handleFormSubmit}>
      <section className={style.form}>
        {/* <select name="per1" id="per1">
          <option value="chose">Choose one</option>
          {landStore.lands.map(land => (
            <option key={land.id} id="land" name="land" value={land.title} onChange={e => setLand(e.currentTarget.value)}>{land.title}</option>
          ))}
        </select> */}
        <input
          className={style.input}
          id="naam"
          name="naam"
          placeholder="naam"
          value={naam}
          onChange={e => setNaam(e.currentTarget.value)}
        />
        <input
          className={style.input}
          id="verhaal"
          name="verhaal"
          placeholder="Typ een verhaal"
          value={verhaal}
          onChange={e => setVerhaal(e.currentTarget.value)}
        />
        <input type="submit" value="go" className={style.button} />
      </section>
    </form>
  ));
};

export default Formpje;
