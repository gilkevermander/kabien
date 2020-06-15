import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../../consts";

import UsersList from "../../../components/UsersList/UsersList.js";

import style from "./Users.module.css";
const Users = () => {
  return (
    <div className={style.container}>
      <h2 className={style.titel}>Contacts</h2>
      <UsersList />
      <Link className={style.add} to={ROUTES.adduser}>
        + Add contact
      </Link>
    </div>
  );
};

export default Users;
