import Message from "./Message";
import User from "./User";
import Group from "./Group";
import RootStore from "../stores";

test("Create a message", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  const message = new Message({ store: store.messageStore, content: "test", userId: user.id, groupId: group.id });
  expect(message.content).toBe("test");
  expect(message.user).toBe(user);
  expect(message.unread).toBe(false);
  expect(message.group).toBe(group);
  expect(message.date).toBeInstanceOf(Date);
});

test("Can't create a message without a store", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  expect(() => new Message({ content: "test", userId: user.id, groupId: group.id })).toThrow();
});

test("Store must have a reference to a created message", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  expect(store.messageStore.messages.length).toBe(0);
  const message = new Message({ store: store.messageStore, content: "test", userId: user.id, groupId: group.id });
  expect(store.messageStore.messages.length).toBe(1);
  expect(store.messageStore.messages[0]).toStrictEqual(message);
});

test("message must have a user", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  expect(() => new Message({ store: store.messageStore, content: "test", groupId: group.id })).toThrow();
});

test("Message must have a group", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  expect(() => new Message({ store: store.messageStore, content: "test", userId: user.id })).toThrow();
});

test("Message must have some content", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  expect(() => new Message({ store: store.messageStore, groupId: group.id, userId: user.id })).toThrow();
  expect(() => new Message({ store: store.messageStore, content: "", groupId: group.id, userId: user.id })).toThrow();
});

test("updateFromJson sets the correct properties of the message", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });

  const oldDate = new Date(2020, 0, 1, 0);
  const now = new Date();
  const message = new Message({ store: store.messageStore, content: "test", date: oldDate, userId: user.id, groupId: group.id });

  message.updateFromJson({
    content: "updated content",
    date: now.toISOString(),
    unread: true
  });

  expect(message.content).toBe("updated content");
  expect(message.unread).toBe(true);
  expect(message.date.toISOString()).toBe(now.toISOString());
});

test("updateFromJson does not overwrite properties when not passed in", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });

  const oldDate = new Date(2020, 0, 1, 0);
  const now = new Date();
  const message = new Message({ store: store.messageStore, content: "test", date: oldDate, userId: user.id, groupId: group.id });

  message.updateFromJson({
    unread: true
  });

  expect(message.content).toBe("test");
  expect(message.unread).toBe(true);
  expect(message.date.toISOString()).toBe(oldDate.toISOString());

  message.updateFromJson({
    content: "updated content"
  });

  expect(message.content).toBe("updated content");
  expect(message.unread).toBe(true);
  expect(message.date.toISOString()).toBe(oldDate.toISOString());

  message.updateFromJson({
    date: now.toISOString()
  });

  expect(message.content).toBe("updated content");
  expect(message.unread).toBe(true);
  expect(message.date.toISOString()).toBe(now.toISOString());
});

test("asJson returns an object with the basic properties", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  const now = new Date();
  const message = new Message({ store: store.messageStore, content: "test", date: now, userId: user.id, groupId: group.id });

  expect(message.asJson).toMatchObject({
    id: message.id,
    content: "test",
    date: now.toISOString(),
    userId: user.id,
    groupId: group.id,
    unread: false,
  });
});

test("Create a unread message", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    unread: true,
    groupId: group.id,
    userId: user.id
  });
  expect(message.unread).toBe(true);
});

test("Set a message as read", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    unread: true,
    groupId: group.id,
    userId: user.id
  });
  message.setUnread(false);
  expect(message.unread).toBe(false);
});

test("User must have a reference to a created message", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    groupId: group.id,
    userId: user.id
  });
  expect(message.user).toBe(user);
  expect(message.user.messages).toContain(message);
});

test("Group must have a reference to a created message", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    groupId: group.id,
    userId: user.id
  });
  expect(message.group).toBe(group);
  expect(message.group.messages).toContain(message);
});

test("Set a user for a message", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    groupId: group.id,
    userId: user.id
  });
  const user2 = new User({ name: "testuser", store: store.userStore });
  message.setUser(user2);
  expect(message.user).toBe(user2);
  expect(message.user.messages).toContain(message);
});

test("Providing no user to setUser should unlink the user from a message", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    groupId: group.id,
    userId: user.id
  });
  expect(message.user).toStrictEqual(user);
  expect(user.messages[0]).toStrictEqual(message);
  message.setUser();
  expect(message.user).toBeUndefined();
  expect(user.messages.length).toBe(0);
});

test("Set a group for a message", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    groupId: group.id,
    userId: user.id
  });
  const group2 = new Group({ name: "testgroup", store: store.groupStore });
  message.setGroup(group2);
  expect(message.group).toBe(group2);
  expect(message.group.messages).toContain(message);
});

test("Providing no group to setGroup should unlink the group from a message", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const message = new Message({
    store: store.messageStore,
    content: "test",
    groupId: group.id,
    userId: user.id
  });
  expect(message.group).toStrictEqual(group);
  expect(group.messages[0]).toStrictEqual(message);
  message.setGroup();
  expect(message.group).toBeUndefined();
  expect(group.messages.length).toBe(0);
});