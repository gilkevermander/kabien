import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import styles from "./Message.module.css";

const Message = ({ message }) => {
  const { uiStore } = useStore();
  return useObserver(() => (
    <li
      onClick={() => {
        message.setUnread(false);
        message.update();
      }}
      className={
        message.user === uiStore.currentUser ? styles.right : styles.left
      }
    >
      {message.user !== uiStore.currentUser && (
        <p className={styles.user}>{message.user.name}</p>
      )}
      <p className={message.unread ? styles.unread : ""}>{message.content}</p>
    </li>
  ));
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
