import React from "react";
import style from "./ContentHeader.module.css";

const ContentHeader = ({ title }) => {
  return (
    <header className={style.header}>
      <h2 className={style.title}>{title}</h2>
    </header>
  );
};

export default ContentHeader;
