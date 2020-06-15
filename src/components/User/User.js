import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";

import style from "./User.module.css";

const User = ({ user }) => {
  return (
    <li>
      <Link to={`${ROUTES.userDetail.to}${user.id}`}>
        <div className={style.user}>
          <img
            className={style.img}
            src={user.avatar}
            alt="group img"
            width="50"
            height="50"
          />
          {user.name}
        </div>
      </Link>
    </li>
  );
};

export default User;
