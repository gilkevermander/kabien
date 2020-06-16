import { decorate, observable, action, computed } from "mobx";


class Group {
  constructor({ id, store, messages = [], ...json }) {
    this.id = id;

    if (!store) {
      throw new Error("voorzie een store");
    }
    this.store = store;

    this._messages = messages;
    this.users = [];

    if (!json.pic) {
      json.pic = `https://avatars.dicebear.com/v2/identicon/${this.id}.svg`
    }
    this.updateFromJson(json);

    this.store.addGroup(this);
  }

  create = async () => this.store.createGroup(this.asJson);

  updateLinkedUsers = async () => {
    const data = this.asJson;
    data.users = this.users.map(user => user.asJson);
    return this.store.updateLinkedUsers(data);
  };

  linkMessage(message) {
    !this._messages.includes(message) && this._messages.push(message);
  }

  unlinkMessage(message) {
    const index = this._messages.findIndex(test => test.id === message.id);
    if (index !== -1) {
      this._messages.splice(index, 1);
    }
  }

  linkUser(user) {
    !this.users.includes(user) && this.users.push(user);
    !user.groups.includes(user) && user.linkGroup(this);
  }

  unlinkUser(user) {
    const index = this.users.findIndex(test => test.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    user.groups.includes(this) && user.unlinkGroup(this);
  }

  updateFromJson = ({name = undefined, pic = undefined, users = undefined}) => {
    this.name = (name !== undefined) ? name : this.name;
    this.pic = (pic !== undefined) ? pic : this.pic;
    if (users !== undefined) {
      // unlink the old users
      const oldUsers = this.users.concat();
      oldUsers.forEach(user => user.unlinkGroup(this));
      users.forEach(user => {
        this.store.rootStore.userStore.updateUserFromServer(user).linkGroup(this);
      });
    }
  };

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      pic: this.pic
    };
  }

  get messages() {
    return this._messages.slice().sort((a, b) => a.date - b.date);
  }

  get unreadLength() {
    return this.messages.filter(message => message.unread).length;
  }

  get lastMessageContent() {
    return this.messages.length > 0
      ? this.messages[this.messages.length - 1].content
      : "";
  }
}

decorate(Group, {
  _messages: observable,
  messages: computed,
  users: observable,
  addMessage: action,
  unreadLength: computed,
  lastMessageContent: computed,
  linkUser: action,
  linkMessage: action,
  updateFromJson: action,
  asJson: computed
});

export default Group;
