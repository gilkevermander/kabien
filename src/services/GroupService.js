import "firebase/firestore";

class GroupService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  getAll = async () => {
    const snapshot = await this.db.collection("groups").get();
    return snapshot.docs.map((o) => o.data());
  };

  getById = async (id) => {
    return (await this.db.collection("groups").doc(id).get()).data();
  };

  create = async (group) => {
    const groupRef = await this.db.collection("groups").doc(group.id);
    await groupRef.set(group);
    return group;
  };

  getGroupsForUser = async (userId, onGroupAdded) => {
    return await this.db
      .collectionGroup("members")
      .where("id", "==", userId)
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          console.log(change);
          if (change.type === "added") {
            const groupId = change.doc.ref.parent.parent;
            onGroupAdded(groupId);
          }
          if (change.type === "removed") {
            const groupId = change.doc.ref.parent.parent;
            console.log("removed", groupId);
            onGroupAdded(groupId);;
          }
        });
      });
  };

  getMessagesForGroup = async (groupId, onMessageAdded) => {
    this.db
      .collectionGroup("messages")
      .where("groupId", "==", groupId)
      .orderBy("timestamp")
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          console.log(change);
          if (change.type === "added") {
            onMessageAdded(change.doc.data());
          }
        });
      });
  };

  getMembersForGroup = async (groupId) => {
    const members = await this.db
      .collection("groups")
      .doc(groupId)
      .collection("members")
      .get();
    return members.docs.map((u) => u.data());
  };

  getUserByEmail = async (email) => {
    const data = (await this.db.collection("users").doc(email).get()).data();
    if (!data.id) {
      data.id = data.userId; // quick fix to make it compatible with koens db
    }
    return data;
  };

  addMemberToGroup = async (groupId, user) => {
    console.log("add", user.name, " to ", groupId);
    const group = await this.getById(groupId);
    const contact = await this.getUserByEmail(user.email);
    console.log("de group is", group.id, "het contact email is", contact.email, ".");
    //const group = await this.getById(groupId);
    if (!group) {
      throw new Error(`Group ${groupId} does not exist`);
    }
    return await this.db

      .collection("groups")
      .doc(group.id)
      .collection("members")
      .doc(contact.email)
      .set(user);
  };

  deleteMemberFromGroup = async (groupId, user) => {
    console.log("delete", user.email, " from ", groupId);

    const group = await this.getById(groupId);
    const contact = await this.getUserByEmail(user.email);
    console.log("de group is", group.id, "het VERWIJDERD contact email is", contact.email, ".");
    if (!group) {
      throw new Error(`Group ${groupId} does not exist`);
    }
    return await this.db
      .collection("groups")
      .doc(group.id)
      .collection("members")
      .doc(contact.email)
      .delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

}

export default GroupService;
