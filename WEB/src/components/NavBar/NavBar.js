import React from "react";
import style from "./NavBar.module.css";
import { ReactComponent as MessageLogo } from "./message.svg";
import { ReactComponent as ScanLogo } from "./scan.svg";
import { ReactComponent as HomeLogo } from "./home.svg";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../consts";

const NavBar = () => {
  return (
    <nav className={style.navbar}>
      <ul className={style.list}>
        <li>
          <NavLink className={style.button} to={ROUTES.home}>
            <HomeLogo fill="white" />
            <span className="visually-hidden">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={style.button} to={ROUTES.scan}>
            <ScanLogo fill="currentColor" />
            <span className="visually-hidden">scan</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={style.button} to={ROUTES.message}>
            <MessageLogo fill="white" />
            <span className="visually-hidden">Messages</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
