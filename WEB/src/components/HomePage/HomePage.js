import React, { useRef } from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import style from "./HomePage.module.css";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts/index";

const HomePage = () => {
  const innerRef = useRef();

  const getLocation = () => {
    innerRef.current && innerRef.current.getLocation();
  };
  return (
    <section className={style.container}>
      <ContentHeader title={"Kabien"} />
      <NavLink className={style.add} to={ROUTES.locatie}>
        <h2>Luister naar jouw souvenir</h2>
      </NavLink>
      <NavLink onClick={getLocation} className={style.add} to="/locatie">
        <h2>Deel jouw ervaringen</h2>
      </NavLink>
      <NavLink className={style.add} to={ROUTES.locatie}>
        <h2>Ontdek verhalen van KABIEN</h2>
      </NavLink>

    </section>
  );
};

export default HomePage;