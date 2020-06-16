import React from "react";

import style from "./Empty.module.css";

const Empty = ({ message }) => {
  return (
    <section className={style.container}>
      <h2 className={style.message}>{message}</h2>
    </section>
  );
};

export default Empty;
