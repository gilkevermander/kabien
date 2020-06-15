import React from "react";
import User from "../User/User";


import { useObserver } from "mobx-react-lite";

import { useStore } from "../../hooks/useStore";

const UsersList = () => {
  const { userStore } = useStore();
  return useObserver(() => (
    <>
      <ul>
        {userStore.users.map(user => (
          <User user={user} key={user.id} />
        ))}
      </ul>
    </>
  ));
};

export default UsersList;
