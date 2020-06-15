import React from "react";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import style from "./Group.module.css";

const Group = ({ group, detailRoute }) => {
  return useObserver(() => (
    <li>
      <Link to={`${detailRoute}${group.id}`}>
        <div className={true ? style.container : style.active}>
          <img
            className={style.img}
            src={group.pic}
            alt="group img"
            width="50"
            height="50"
          />
          <p className={style.title}>{group.name}</p>
          <p className={style.latest}>{group.lastMessageContent}</p>
        </div>
      </Link>
    </li>
  ));
};

Group.propTypes = {
  detailRoute: PropTypes.string.isRequired
};

export default Group;
