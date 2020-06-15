import React from "react";
import Qr from "./components/Qr/index";
import Kaart from "./components/Kaart/index";
import Start from "./components/Start/index";
import Manier from "./components/Manier/index";
import DetailSouvenir from "./components/DetailSouvenir/index";
import Camera from "./components/Camera/index";
import { Route, Switch } from "react-router-dom";
import DetailLand from "./components/DetailLand";
import { ROUTES } from "./consts/index";
import { Link } from "react-router-dom";
//import './validate';
import AppHeader from "./containers/Sidebar/AppHeader/index";


function App() {

  return (
    <>
      <header>
        <h1>
          <Link to={ROUTES.home}>home</Link>
          <AppHeader name="Kabien" title="start" />
        </h1>
      </header>

      <main>
        <Switch>
          <Route path={ROUTES.manier}>
            <Manier />
          </Route>
          <Route path={ROUTES.detailSouvenir.path}>
            <DetailSouvenir />
          </Route>
          <Route path={ROUTES.detailLand.path}>
            <DetailLand />
          </Route>
          <Route path={ROUTES.camera}>
            <Camera />
          </Route>
          <Route path={ROUTES.qr}>
            <Qr />
          </Route>
          <Route exact strict path={ROUTES.home}>
            <Start />
          </Route>
          <Route path={ROUTES.kaart}>
            <Kaart />
          </Route>


        </Switch>
      </main>
    </>
  );
}

export default App;
