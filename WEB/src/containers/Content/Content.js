import React from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "../../consts";
import Messages from "./Messages/Messages.js";
import GroupDetail from "./GroupDetail/GroupDetail.js";
import UserDetail from "./UserDetail/UserDetail.js";
import AddGroup from "./AddGroup/AddGroup.js";
import AddUser from "./AddUser/AddUser.js";

import style from "./Content.module.css";
import Empty from "../../components/Empty/Empty";
import DetailLand from "../../components/DetailLand";

const Content = () => {
  return (
    <section className={style.container}>
      <Switch>
        <Route path={ROUTES.detailLand.path}>
          <DetailLand />
        </Route>
        <Route path={ROUTES.users}>
          <Empty message={"Choos a contact on the left"} />
        </Route>
        <Route path={ROUTES.adduser}>
          <AddUser />
        </Route>
        <Route path={ROUTES.groupDetail.path}>
          <GroupDetail />
        </Route>
        <Route path={ROUTES.groups}>
          <Empty message={"Choos a group on the left"} />
        </Route>
        <Route path={ROUTES.addgroup}>
          <AddGroup />
        </Route>
        <Route exact strict path={ROUTES.home}>
          <Empty message={"Pick a conversation"} />
        </Route>
        <Route path={ROUTES.conversation.path}>
          <Messages />
        </Route>
      </Switch>
    </section>
  );
};

export default Content;
