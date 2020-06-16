import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../hooks/useStore";
import { useObserver } from "mobx-react-lite";

import SearchUser from "../../../components/SearchUser/SearchUser.js";
import ContentHeader from "../../../components/ContentHeader/ContentHeader.js";
import Empty from "../../../components/Empty/Empty";
import style from "./GroupDetail.module.css";

const GroupDetail = () => {
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
      return <Empty message={"Group not found"} />;
    }
    if (state === STATE_LOADING) {
      return <Empty message={"Loading Group"} />;
    }
    return (
      <>
        <ContentHeader title={"Add group"} />
        <div className={style.container}>
          <section className={style.section}>
            <h3 className={style.subtitle}>Members</h3>
            <ul className={style.membersList}>
              {group.users.map((user) => (
                <li className={style.member} key={user.id}>
                  {user.name}
                  <button
                    onClick={() => {
                      group.unlinkUser(user)
                      //group.updateLinkedUsers();
                      groupStore.deleteMemberFromGroup(group, user);
                    }}
                  >
                    -
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className={style.section}>
            <h3 className={style.subtitle}>Add member</h3>
            <SearchUser
              onUserClick={(user) => {
                group.linkUser(user);
                groupStore.addMemberToGroup(group, user);
              }}
            />
          </section>
        </div>
      </>
    );
  });
};

export default GroupDetail;
