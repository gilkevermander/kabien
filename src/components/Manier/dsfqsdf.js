import React, { useState }  from "react";

import style from "./Manier.module.css";

const Manier = () => {
  const [manier, setManier] = useState("");

  return (
    <section className={style.container}>
      <h1 className={style.message}>Kies op welke manier jij jouw reisverhaal wilt vertellen</h1>
      <form>
        <div className="radio">
          <label>
            <input type="radio" value={manier === 'podcast'} checked={true} onChange={e => setManier(e.currentTarget.value)} />
            Spreek een podcast in
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value={manier === 'video'} onChange={e => setManier(e.currentTarget.value)} />
            Neem een video op
          </label>
        </div>
        <input type="submit" value="neem de video op" className={style.button} />
      </form>
    </section>
  );
};

export default Manier;
