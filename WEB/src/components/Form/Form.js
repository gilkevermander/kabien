import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import Message from "../../models/Message.js";
import { useStore } from "../../hooks/useStore.js";
import { useParams } from "react-router-dom";
import style from "./Form.module.css";

const Form = () => {
  const [content, setContent] = useState("");
  const { uiStore, groupStore, messageStore } = useStore();
  const { id } = useParams();

  const handleFormSubmit = e => {
    e.preventDefault();
    if (content !== "") {
      const group = groupStore.resolveGroup(id);
      const message = new Message({
        store: messageStore,
        content,
        userId: uiStore.currentUser.id,
        groupId: group.id
      });
      message.create();

      setContent("");
    }
  };

  return useObserver(() => (
    <form onSubmit={handleFormSubmit}>
      <section className={style.form}>
        <button className={style.emoji}>
          <span role="img" aria-label="Smiley">
            😃
          </span>
        </button>
        <input
          className={style.input}
          id="content"
          name="content"
          placeholder="Typ een bericht"
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
      </section>
    </form>
  ));
};

export default Form;
