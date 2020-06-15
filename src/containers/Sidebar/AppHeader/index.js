import React from "react";

//import style from "./../Sidebar.module.css";
import { useStore } from "../../../hooks/useStore";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";

const AppHeader = ({ name, title }) => {
  const { uiStore } = useStore();
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await uiStore.logout();
      history.push(ROUTES.home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header >
      <div >
        <h2 >{name}</h2>
        <button onClick={handleLogout} >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
