import { decorate, observable, action } from "mobx";
import User from "../models/User";
import UserService from "../services/UserService";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.users = [];
    this.usersService = new UserService({ firebase: this.rootStore.firebase });
    this.loadAllUsers();
  }

  empty() {
    this.users = [];
  }

  loadContactsForUser = async (user) => {
    const contacts = await this.usersService.getContactsForUser(user);

    contacts.forEach((contact) => {
      this.updateUserFromServer(contact);
    });
  };

  createContactforUser = async (user, contactEmail) => {
    const contact = await this.usersService.createContactForUser(
      user,
      contactEmail
    );
    this.updateUserFromServer(contact);
    return this.resolveUser(contact.id);
  };

  loadAllUsers = async () => {
    const jsonUsers = await this.usersService.getAll();
    jsonUsers.forEach((json) => this.updateUserFromServer(json));
  };

  loadUser = async (id) => {
    const jsonUser = await this.usersService.getById(id);
    this.updateUserFromServer(jsonUser);
    return this.resolveUser(id);
  };

  loadUserGroups = async (id) => {
    const jsonGroups = await this.usersService.getById(id, "groups");
    this.updateUserFromServer({ id, groups: jsonGroups });
    return this.resolveUser(id);
  };

  createUser = async (user) => {
    await this.usersService.create(user);
  };

  // updateUser = async user => {
  //   const json = await this.usersService.update(user);
  //   this.updateUserFromServer(json);
  // };

  // deleteUser = async user => {
  //   const json = await this.usersService.delete(user);
  //   this.updateUserFromServer(json);
  // };

  updateUserFromServer(json) {
    let user = this.users.find((user) => user.id === json.id);
    if (!user) {
      user = new User({
        id: json.id,
        store: this.rootStore.userStore,
      });
    }
    if (json.isDeleted) {
      this.users.remove(user);
    } else {
      user.updateFromJson(json);
    }
    return user;
  }

  // resolveUsers = (userId) => {
  //   console.log(this.users)
  //   console.log(userId)
  //   console.log(this.users.find((user) => user.id === userId))
  //   this.users.find((user) => user.id === userId)
  // };

  resolveUser = (id) => this.users.find((user) => user.id === id);

  addUser = (user) => {
    this.users.push(user);
  };

  searchUser = (search) =>
    this.users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
}

decorate(UserStore, {
  users: observable,
  addUser: action,
  updateUserFromServer: action,
  empty: action,
});

export default UserStore;
