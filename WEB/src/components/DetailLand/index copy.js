import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";

import Empty from "../Empty/Empty";
import Formpje from "../Formpje/index";
import Kaart from "../Kaart/index";
import style from "./DetailLand.module.css";

const DetailLand = () => {
  const { id } = useParams();
  const { landStore } = useStore();

  const STATE_LOADING = "loading";
  const STATE_DOES_NOT_EXIST = "doesNotExist";
  const STATE_LOADING_MORE_DETAILS = "loadingMoreDetails";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [land, setLand] = useState(landStore.resolveLand(id));
  const [state, setState] = useState(
    land ? STATE_LOADING_MORE_DETAILS : STATE_LOADING
  );

  useEffect(() => {
    const loadLand = async (id) => {
      try {
        const land = await landStore.loadLand(id); //resolveLand
        console.log(land);
        console.log(id);
        if (!land || land === undefined) {
          setState(STATE_DOES_NOT_EXIST);
          console.log('geen land gevonden');
          return;
        }
        setLand(land);
        setState(STATE_LOADING_MORE_DETAILS);
        await landStore.loadLandVerhalen(id); //hier blijft hij op wachten maar er komt niets
        setState(STATE_FULLY_LOADED);
        console.log(land.verhalen);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }
    };
    loadLand(id);
  }, [id, landStore, setLand]);

  console.log(state);
  //console.log(land.verhalen);

  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      console.log(`${land} is niet gevonden`);
      return <Empty message={"land not found"} />;

    }
    if (state === STATE_LOADING) {
      console.log(land);
      return <Empty message={"Loading land"} />;
    }
    return (
      <>
        <Kaart />
        <div className={style.container}>
          <section className={style.section}>
            <h3 className={style.subtitle}>{land.title}</h3>
            <p className={style.subtitle}>{land.id}</p>
          </section>
          <section>
            <h3>verhalen:</h3>
            {land.verhalen.map(verhaal => (
              <article key={verhaal.id}>
                <p>naam: {verhaal.naam} </p>
                <p>bestand:{verhaal.verhaal} </p>
              </article>
            ))}
          </section>
        </div>
        <Formpje/>
      </>
    );
  });
};

export default DetailLand;
