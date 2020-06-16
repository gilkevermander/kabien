import React from "react";
import Content from "../Content/Content";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { ROUTES } from "../../consts";
import LoginForm from "./LoginForm";
import AppHeader from "../../containers/Sidebar/AppHeader";
import style from "./Authentication.module.css";
import RegisterForm from "./RegisterForm";
import { useStore } from "../../hooks/useStore";
import { useObserver } from "mobx-react-lite";
import ContentHeader from "../ContentHeader/ContentHeader";

const Authentication = () => {
  const { uiStore } = useStore();
  return useObserver(() => (
    <>
      <Switch>
        <Route exact path={ROUTES.login}>
          {uiStore.currentUser ? (
            <Redirect to={ROUTES.home} />
          ) : (
              <div className={style.wrapper}>
                <ContentHeader title={"Login"} />
                <LoginForm />
                <NavLink to={ROUTES.register} className={style.textlink}>
                  <span>Do you want to register?</span>
                </NavLink>
              </div>
            )}
        </Route>
        <Route exact path={ROUTES.register}>
          {uiStore.currentUser ? (
            <Redirect to={ROUTES.home} />
          ) : (
              <div className={style.wrapper}>
                <ContentHeader title={"Aanmelden"} />
                <RegisterForm />
              </div>
            )}
        </Route>
        <Route path={ROUTES.home}>
          {uiStore.currentUser ? (
            <>
              <AppHeader name="Kabien" title="Home" />
              <Content />
            </>
          ) : (
              <Redirect to={ROUTES.login} />
            )}
        </Route>
      </Switch>
    </>
  ));
};

export default Authentication;
