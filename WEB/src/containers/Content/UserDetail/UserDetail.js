import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../hooks/useStore";
import ContentHeader from "../../../components/ContentHeader/ContentHeader.js";

import style from "./UserDetail.module.css";
import Empty from "../../../components/Empty/Empty";
import { useObserver } from "mobx-react-lite";

const UserDetail = () => {
  const { id } = useParams();
  const { userStore } = useStore();

  const STATE_LOADING = "loading";
  const STATE_DOES_NOT_EXIST = "doesNotExist";
  const STATE_LOADING_MORE_DETAILS = "loadingMoreDetails";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [user, setUser] = useState(userStore.resolveUser(id));
  const [state, setState] = useState(user ? STATE_LOADING_MORE_DETAILS : STATE_LOADING);

  useEffect(() => {
    const loadUser = async (id) => {
      try {
        const user = await userStore.loadUser(id);
        if (!user) {
          setState(STATE_DOES_NOT_EXIST);
          return;
        }
        setUser(user);
        setState(STATE_LOADING_MORE_DETAILS);
        await userStore.loadUserGroups(id);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }
      }
    };
    loadUser(id);
  }, [ id, userStore, setUser ]);

  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      return <Empty message={"Contact not found"} />;
    }
    if (state === STATE_LOADING) {
      return <Empty message={"Loading User"} />;
    }
    return (<>
      <ContentHeader title={user.name} />
      <div className={style.container}>
        <section className={style.section}>
          <h3 className={style.subtitle}>Groups</h3>
          {user.groups.length > 0 ? (
            <ul className={style.groupsList}>
              {user.groups.map(group => (
                <li className={style.group} key={group.id}>
                  {group.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Not a member of a group</p>
          )}
        </section>
        <div className={style.container}>
          <img
            alt="Avatar"
            src={ user.avatar}
          />
        </div>
      </div>
    </>
  )});
};

export default UserDetail;
