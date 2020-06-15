import { decorate, observable, action, computed } from "mobx";


class Message {
  constructor({ id, store, content, date = new Date(), unread = false, groupId, userId }) {
    if (!store) {
      throw new Error("voorzie een store");
    }
    if (!groupId) {
      throw new Error("A message must have a groupId");
    }
    if (!userId) {
      throw new Error("A message must have a userId");
    }
    if (!content || content === "") {
      throw new Error("A message must have some content");
    }
    this.id = id;
    this.store = store;

    this.updateFromJson({
      content,
      date,
      unread,
      groupId,
      userId
    });

    this.store.addMessage(this);
  }

  create = async () => this.store.createMessage(this.asJson);

  update = async () => this.store.updateMessage(this.asJson);

  setGroup(group) {
    if (this.group) {
      this.group.unlinkMessage(this);
    }
    if (group) {
      this.groupId = group.id;
      this.group.linkMessage(this);
    } else {
      this.groupId = null;
    }
  }

  setUser(user) {
    if (this.user) {
      this.user.unlinkMessage(this);
    }
    if (user) {
      this.userId = user.id;
      this.user.linkMessage(this);
    } else {
      this.userId = null;
    }
  }

  get group() {
    return this.store.rootStore.groupStore.resolveGroup(this.groupId);
  }

  get user() {
    return this.store.rootStore.userStore.resolveUser(this.userId);
  }

  updateFromJson = ({
    content = undefined,
    date = undefined,
    userId = undefined,
    groupId = undefined,
    unread = undefined
  }) => {
    this.content = (content !== undefined) ? content : this.content;
    this.unread = (unread !== undefined) ? unread : this.unread;

    if (date instanceof Date) {
      date = date.toISOString();
    }
    this.date = (date !== undefined) ? new Date(date) : this.date;

    if (userId !== undefined) {
      this.setUser(this.store.rootStore.userStore.resolveUser(userId));
    }
    if (groupId !== undefined) {
      this.setGroup(this.store.rootStore.groupStore.resolveGroup(groupId));
    }
  };

  get asJson() {
    return {
      id: this.id,
      content: this.content,
      date: this.date.toISOString(),
      userId: this.userId,
      groupId: this.groupId,
      unread: this.unread
    };
  }

  setUnread(value) {
    this.unread = value;
  }
}

decorate(Message, {
  userId: observable,
  groupId: observable,
  unread: observable,
  setUnread: action,
  updateFromJson: action,
  asJson: computed,
  group: computed,
  user: computed
});

export default Message;
