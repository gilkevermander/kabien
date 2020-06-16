import { decorate, observable, action } from "mobx";
import Group from "../models/Group";
import GroupService from "../services/GroupService";

class GroupStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.groups = [];
    this.groupsService = new GroupService({
      firebase: this.rootStore.firebase,
    });
  }

  empty() {
    this.groups = [];
  }

  loadGroupsForUser = async (user) => {
    //parameter van dese functie
    return await this.groupsService.getGroupsForUser(
      user.id,
      async (groupId) => {
        console.log("dit is het groupid", groupId);
        if (!groupId) {
          console.log("het is gedelete dit groupid", groupId);
          this.groups.remove(groupId);
        }
        await this.loadGroup(groupId.id);
        await this.loadGroupUsers(groupId.id);
        //die is een callback functie(de volgende)
        await this.groupsService.getMessagesForGroup(
          groupId,
          this.onMessageAdded
        );
      }
    );
  };

  onMessageAdded = async (json) => {
    this.rootStore.messageStore.updateMessageFromServer(json);
  };

  // loadAllGroups = async () => {
  //   const jsonGroups = await this.groupsService.getAll();
  //   jsonGroups.forEach((json) => this.updateGroupFromServer(json));
  // };

  loadGroup = async (id) => {
    const jsonGroup = await this.groupsService.getById(id);
    this.updateGroupFromServer(jsonGroup);
    return this.resolveGroup(id);
  };

  loadGroupUsers = async (id) => {
    const jsonUsers = await this.groupsService.getMembersForGroup(id);

    this.updateGroupFromServer({ id, users: jsonUsers });
    return this.resolveGroup(id);
  };

  createGroup = async (group) => {
    group.ownerId = this.rootStore.uiStore.currentUser.id;
    const json = await this.groupsService.create(group);
    this.updateGroupFromServer(json);
    await this.addMemberToGroup(group, this.rootStore.uiStore.currentUser);
  };

  addMemberToGroup = async (group, contact) => {
    console.log(contact);
    return await this.groupsService.addMemberToGroup(group.id, contact.asJson);
  };

  deleteMemberFromGroup = async (group, contact) => {
    console.log(contact);
    return await this.groupsService.deleteMemberFromGroup(group.id, contact.asJson);
  };

  updateLinkedUsers = async (groupWithUsers) => {
    const jsonUsers = await this.groupsService.updateLinked(
      groupWithUsers,
      "users"
    );
    this.updateGroupFromServer({ id: groupWithUsers.id, users: jsonUsers });
    return this.resolveGroup(groupWithUsers.id);
  };

  // updateGroup = async group => {
  //   const json = await this.groupsService.update(group);
  //   this.updateGroupFromServer(json);
  // };

  // deleteGroup = async group => {
  //   const json = await this.groupsService.delete(group);
  //   this.updateGroupFromServer(json);
  // };

  updateGroupFromServer(json) {
    let group = this.groups.find((group) => group.id === json.id);
    if (!group) {
      group = new Group({
        id: json.id,
        store: this.rootStore.groupStore,
      });
    }
    if (json.isDeleted) {
      this.groups.remove(group);
    } else {
      group.updateFromJson(json);
    }
    return group;
  }

  resolveGroup = (id) => this.groups.find((group) => group.id === id);

  addGroup = (group) => {
    this.groups.push(group);
  };
}

decorate(GroupStore, {
  groups: observable,
  addGroup: action,
  updateGroupFromServer: action,
  empty: action,
});

export default GroupStore;
