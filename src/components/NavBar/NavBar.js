import React from "react";
import style from "./NavBar.module.css";
import { ReactComponent as UserLogo } from "./user.svg";
import { ReactComponent as GroupLogo } from "./users.svg";
import { ReactComponent as HomeLogo } from "./home.svg";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts";

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <ul className={style.list}>
        <li>
          <NavLink className={style.button} to={ROUTES.home}>
            <HomeLogo fill="currentColor" />
            <span className="visually-hidden">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={style.button} to={ROUTES.groups}>
            <GroupLogo fill="currentColor" />
            <span className="visually-hidden">Groups</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={style.button} to={ROUTES.users}>
            <UserLogo fill="currentColor" />
            <span className="visually-hidden">Users</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
