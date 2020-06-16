import RootStore from "./";
import MessageStore from "./MessageStore";
import Group from "../models/Group";
import Message from "../models/Message";
import User from "../models/User";

test("Create a new MessageStore", () => {
  const store = new MessageStore();
  expect(store.messages).toBeInstanceOf(Array);
  expect(store.messages.length).toBe(0);
});

test("Get a message by the id", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup1", store: store.groupStore });
  const message1 = new Message({
    store: store.messageStore,
    content: "content1",
    userId: user.id,
    unread: true,
    groupId: group.id
  });
  const message2 = new Message({
    store: store.messageStore,
    content: "content2",
    userId: user.id,
    unread: true,
    groupId: group.id
  });
  expect(store.messageStore.resolveMessage(message2.id)).toBe(message2);
});

test("updateMessageFromServer returns a new message when json is passed in", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup1", store: store.groupStore });
  const message = store.messageStore.updateMessageFromServer({ content: "testmessage", userId: user.id, groupId: group.id });
  expect(message).toBeInstanceOf(Message);
  expect(message.content).toBe("testmessage");
});

test("updateMessageFromServer updates an existing message", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup1", store: store.groupStore });
  const message = new Message({
    store: store.messageStore,
    content: "content",
    userId: user.id,
    unread: true,
    groupId: group.id
  });
  const updatedMessage = store.messageStore.updateMessageFromServer({ id: message.id, content: "message updated" });
  expect(updatedMessage.id).toBe(message.id);
  expect(updatedMessage.content).toBe("message updated");
  expect(updatedMessage).toBe(message);
});
