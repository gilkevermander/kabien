import "firebase/firestore";

class UserService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }
  create = async (user) => {
    return await this.db.collection("users").doc(user.id).set(user);
  };

  // create = async (user) => {
  //   return await this.db.collection("users").doc(user.email).set(user);
  // };

  getUserByEmail = async (email) => {
    const data = (await this.db.collection("users").doc(email).get()).data();
    if (!data.id) {
      data.id = data.userId; // quick fix to make it compatible with koens db
    }
    return data;
  };

  getAll = async () => {
    const snapshot = await this.db.collection("users").get();
    return snapshot.docs
      .map((o) => o.data())
      .map((u) => {
        u.id = u.userId; // quick fix to make it compatible with koens db
        return u;
      });
  };

  getContactsForUser = async (user) => {
    const contacts = await this.db
      .collection("users")
      .doc(user.email)
      .collection("contacts")
      .get();
    return contacts.docs.map((u) => u.data());
  };

  createContactForUser = async (user, contactEmail) => {
    const contact = await this.getUserByEmail(contactEmail);
    if (!contact) {
      throw new Error(`User ${contactEmail} does not exist`);
    }
    await this.db
      .collection("users")
      .doc(user.email)
      .collection("contacts")
      .doc(contact.email)
      .set(contact);

    return contact;
  };
}

export default UserService;
