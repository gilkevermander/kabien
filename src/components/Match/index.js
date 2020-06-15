import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite';
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useStore } from "../../hooks/useStore";

const Match = ({ nextStep, values }) => {

  const history = useHistory();
  const { landStore } = useStore();

  const back = (e) => {
    e.preventDefault();
    history.push(ROUTES.home);
  }

  const souvenirs = landStore.loadLandSouvenirs(values.souvid);
  console.log(souvenirs);

  console.log(values);
  return (
    <>
      <h2 className="ui centered">Reisverhaal van {values.land}</h2>
      <p>met id: {souvenirs[0].id}</p>
      <Button onClick={back}>Terug naar startscherm</Button>
    </>
  )

}

export default Match;