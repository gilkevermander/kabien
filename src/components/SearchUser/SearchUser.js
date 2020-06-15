import React, { useState } from "react";
import { useStore } from "../../hooks/useStore";
import PropTypes from "prop-types";

import style from "./SearchUser.module.css";

const SearchUser = ({ onUserClick }) => {
  const [search, setSearch] = useState("");
  const { userStore } = useStore();
  return (
    <div className={style.container}>
      <form>
        <label className={style.label}>
          <span>Search</span>
          <input
            className={style.input}
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </label>
      </form>
      <ul>
        {userStore.searchUser(search).map(user => (
          <li key={user.id}>
            <button className={style.button} onClick={() => onUserClick(user)}>
              + {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchUser.propTypes = {
  onUserClick: PropTypes.func.isRequired
};

export default SearchUser;
