import "firebase/firestore";

import { firestore } from "firebase/app";

class MessageService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  createMessage = async (message) => {
    message.timestamp = firestore.Timestamp.fromDate(new Date(message.date));
    await this.db
      .collection("groups")
      .doc(message.groupId)
      .collection("messages")
      .doc(message.id)
      .set(message);
  };
}

export default MessageService;
