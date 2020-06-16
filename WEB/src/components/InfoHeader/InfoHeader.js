import React from "react";
import style from "./InfoHeader.module.css";
import { useHistory } from "react-router-dom";
import { ReactComponent as backLogo } from "./back.svg";
import { Button } from 'semantic-ui-react';

const InfoHeader = ({ title }) => {
  const history = useHistory();

  return (
    <header className={style.header}>
      <button onClick={history.goBack}>&#60;</button>
      <h1 className={style.title}>{title}</h1>
    </header>
  );
};

export default InfoHeader;