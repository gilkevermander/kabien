import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import Locatie from "../Locatie/Locatie";
//useStore vroeger
import { useObserver } from "mobx-react-lite";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../consts";

import style from "./Content.module.css";

const Content = () => {

  return useObserver(() => (
    <section className={style.container}>
      <Switch>
        <Route path={ROUTES.locatie}>
          <Locatie />
        </Route>
        <Route exact strict path={ROUTES.home}>
          <HomePage />
        </Route>
      </Switch>
      <NavBar />
    </section>
  ));
};

export default Content;
