import React from "react";
import style from "./ContentHeader.module.css";

const ContentHeader = ({ title }) => {
  return (
    <header className={style.header}>
      <h1 className={style.title}>{title}</h1>
    </header>
  );
};

export default ContentHeader;
