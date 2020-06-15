import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Conversations from "./Conversations/Conversations.js";
import Groups from "./Groups/Groups.js";
import UnreadMessages from "../../components/UnreadMessages/UnreadMessages.js";
import Users from "./Users/Users.js";

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../consts";

import style from "./Sidebar.module.css";
import AppHeader from "./AppHeader";

const Sidebar = () => {
  const { groupStore } = useStore();
  return useObserver(() => (
    <section className={style.container}>
      <AppHeader name="ThatsApp" unreadLength={groupStore.unreadLength} />
      <Switch>
        <Route path={ROUTES.adduser}>
          <Users />
        </Route>
        <Route path={ROUTES.users}>
          <Users />
        </Route>
        <Route path={ROUTES.addgroup}>
          <Groups />
        </Route>
        <Route path={ROUTES.groups}>
          <Groups />
        </Route>
        <Route path={ROUTES.home}>
          <Conversations />
        </Route>
      </Switch>
      <NavBar />
    </section>
  ));
};

export default Sidebar;
