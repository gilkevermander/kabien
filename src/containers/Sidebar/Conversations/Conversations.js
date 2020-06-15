import React from "react";
import GroupList from "../../../components/GroupsList/GroupList";
import { ROUTES } from "../../../consts/index.js";

const Conversations = () => {
  return <GroupList detailRoute={ROUTES.conversation.to} />;
};

export default Conversations;
