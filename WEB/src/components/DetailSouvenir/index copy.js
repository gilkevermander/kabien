import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";

import Empty from "../Empty/Empty";
import Formpje from "../Formpje/index";
import Kaart from "../Kaart/index";
import style from "./DetailSouvenir.module.css";

const DetailSouvenir = () => {
  const { id } = useParams();
  const { landId } = useParams();
  console.log(id);
  console.log(landId)
  const { souvenirStore, userStore } = useStore();

  const STATE_LOADING = "loading";
  const STATE_DOES_NOT_EXIST = "doesNotExist";
  const STATE_LOADING_MORE_DETAILS = "loadingMoreDetails";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [souvenir, setSouvenir] = useState(souvenirStore.resolveSouvenir(id));
  const [user, setUser] = useState("");
  const [state, setState] = useState(
    souvenir ? STATE_LOADING_MORE_DETAILS : STATE_LOADING
  );

  useEffect(() => {
    const loadSouvenir = async (id) => {
      try {
        const souvenir = await souvenirStore.loadSouvenir(id); //resolveLand
        console.log(souvenir);
        console.log(id);
        if (!souvenir || souvenir === undefined) {
          setState(STATE_DOES_NOT_EXIST);
          console.log('geen souvenir gevonden');
          return;
        }
        setSouvenir(souvenir);
        const user = userStore.resolveUser(souvenir.userId)
        console.log(user);
        console.log(souvenir.delen)
        setUser(user);
        // setState(STATE_LOADING_MORE_DETAILS);
        // //await souvenirStore.loadLandVerhalen(id); //hier blijft hij op wachten maar er komt niets
        setState(STATE_FULLY_LOADED);
        //console.log(souvenir.verhalen);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }
    };
    loadSouvenir(id);
  }, [id, souvenirStore, setSouvenir, setUser]);

  console.log(state);
  console.log(souvenir);

  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      console.log(`${souvenir} is niet gevonden`);
      return <Empty message={"Souvenir not found"} />;

    }
    if (state === STATE_LOADING) {
      console.log(souvenir);
      return <Empty message={"Loading Souvenir"} />;
    }
    return (
      <>
        <p>naam:{souvenir.naam}</p>
        <p>land:{souvenir.lands[0].title}</p>
        <p>userid:{souvenir.userId}</p>
        <p>verstuurder:{user.gebruikersnaam}</p>
        <p>voornaam: {user.voornaam}</p>
        <p>souvenir:{souvenir.souvenir}</p>
      </>
    );
  });
};

export default DetailSouvenir;
