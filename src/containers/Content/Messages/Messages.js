import React, { useState, useEffect } from "react";

import Message from "../../../components/Message/Message.js";
import Form from "../../../components/Form/Form.js";
import UnreadMessages from "../../../components/UnreadMessages/UnreadMessages.js";
import Empty from "../../../components/Empty/Empty";

import { useObserver } from "mobx-react-lite";
import { useStore } from "../../../hooks/useStore";
import { useParams } from "react-router-dom";

import style from "./Messages.module.css";

const Messages = () => {
  const { id } = useParams();
  const { groupStore } = useStore();

  const STATE_LOADING = "loading";
  const STATE_DOES_NOT_EXIST = "doesNotExist";
  const STATE_LOADING_MORE_DETAILS = "loadingMoreDetails";
  const STATE_FULLY_LOADED = "fullyLoaded";

  const [group, setGroup] = useState(groupStore.resolveGroup(id));
  const [state, setState] = useState(
    group ? STATE_LOADING_MORE_DETAILS : STATE_LOADING
  );

  useEffect(() => {
    const loadGroup = async (id) => {
      try {
        const group = await groupStore.resolveGroup(id);
        if (!group) {
          setState(STATE_DOES_NOT_EXIST);
          return;
        }
        setGroup(group);
        //setState(STATE_LOADING_MORE_DETAILS);
        //await groupStore.loadGroupUsers(id);
        setState(STATE_FULLY_LOADED);
      } catch (error) {
        /*if (error.response && error.response.status === 404) {
          setState(STATE_DOES_NOT_EXIST);
        }*/
      }
    };
    loadGroup(id);
  }, [id, groupStore, setGroup]);

  return useObserver(() => {
    if (state === STATE_DOES_NOT_EXIST) {
      return <Empty message={"Conversation not found"} />;
    }
    if (state === STATE_LOADING) {
      return <Empty message={"Loading Conversation"} />;
    }
    return (
      <>
        <header className={style.header}>
          {group && (
            <>
              <img
                className={style.img}
                src={group.pic}
                alt="Group img"
                width="50"
                height="50"
              />
              <h3 className={style.title}>{group.name}</h3>
              <span className={style.unread}>
                {group.users.length} members -{" "}
                <UnreadMessages length={group.unreadLength} />
              </span>
            </>
          )}
        </header>
        <ul className={style.list}>
          {group.messages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <Form />
      </>
    );
  });
};

export default Messages;
