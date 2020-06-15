import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useObserver } from 'mobx-react-lite';
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../consts";
import { useStore } from "../../hooks/useStore";
import { Link } from "react-router-dom";

const Result = ({ nextStep, values, setSouvid }) => {

  const history = useHistory();
  const { landStore, souvenirStore } = useStore();

  const [aantal, setAantal] = useState(233);
  const [landId, setLandId] = useState(landStore.resolveLandId(values.land));

  const saveAndContinue = (e) => {
    e.preventDefault()
    try {
      const land = landStore.resolveLandId(values.land);
      console.log(landId.id);
      console.log(values.land.id);
      const souvenirs = landStore.loadLandSouvenirs(landId.id);
      console.log(souvenirs);
      setSouvid(landId.id);
      nextStep()
    }catch (error) {
      console.log(error)
    }
    //history.push(`${ROUTES.detailSouvenir.to}${souvenir.id}`);
  }
  const back = (e) => {
    e.preventDefault();
    history.push(ROUTES.home);

  }
  //CODE HIERONDER ZORGT VOOR LOOP ???
  // const land = landStore.resolveLandId(values.land);
  // console.log(land)
  // setLandId(land.id)
  // console.log(landId);
  // console.log(values);
  // const souvenirs = souvenirStore.loadLandSouvenir(landId)
  // console.log(souvenirs);
  return (
    <>
      <h2 className="ui centered">Bedankt om je verhaal op te sturen!</h2>
      <p>Je ontvangt een bevestiging via mail en toegang tot de wereldkaart vol reisverhalen.</p>
      <p>Je verstuurde 1 van de {aantal} opnames over <span>{values.land}</span></p>
      <p>We vonden een ervaring die past bij die van jou!</p>
      {/* <Link to={`${ROUTES.detailSouvenir.to}${souvenir.id}`}> */}
        <Button onClick={saveAndContinue}>Beluister de ervaring </Button>
      {/* </Link> */}
      <Button onClick={back}>Terug naar startscherm</Button>
    </>
  )

}

export default Result;