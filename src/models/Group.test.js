import Group from "./Group";
import Message from "./Message";
import User from "./User";
import RootStore from "../stores";

test("Create a new group", () => {
  const store = new RootStore();
  const group = new Group({ name: "Test", store: store.groupStore });
  expect(group.name).toBe("Test");
  expect(group.messages.length).toBe(0);
  expect(group.pic).not.toBe("");
});

test("Can't create a group without a store", () => {
  expect(() => new Group({ name: "testgroup" })).toThrow();
});

test("Store must have a reference to a created group", () => {
  const store = new RootStore();
  expect(store.groupStore.groups.length).toBe(0);
  const group = new Group({ name: "testuser", store: store.groupStore });
  expect(store.groupStore.groups.length).toBe(1);
  expect(store.groupStore.groups[0]).toStrictEqual(group);
});

test("updateFromJson sets the correct properties of the group", () => {
  const store = new RootStore();
  const group = new Group({ name: "Test", store: store.groupStore });
  group.updateFromJson({
    name: "updated name",
    pic: "updated pic"
  });
  expect(group.name).toBe("updated name");
  expect(group.pic).toBe("updated pic");
});

test("updateFromJson does not overwrite properties not passed in", () => {
  const store = new RootStore();
  const group = new Group({ name: "Test", store: store.groupStore });
  group.updateFromJson({
    pic: "updated pic"
  });
  expect(group.name).toBe("Test");
  expect(group.pic).toBe("updated pic");
  group.updateFromJson({
    name: "updated name"
  });
  expect(group.name).toBe("updated name");
});

test("updateFromJson links users when passed in", () => {
  const store = new RootStore();
  const group = new Group({ name: "Test", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  const userNotInGroup = new User({ name: "testuser2", store: store.userStore });
  group.updateFromJson({
    users: [user]
  });
  expect(group.users.length).toBe(1);
  expect(group.users[0]).toBe(user);
  expect(user.groups).toContain(group);
  expect(userNotInGroup.groups.length).toBe(0);
});

test("updateFromJson unlinks old users when new users are passed in", () => {
  const store = new RootStore();
  const group = new Group({ name: "Test", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  const userNotInGroup = new User({ name: "testuser2", store: store.userStore });
  group.updateFromJson({
    users: [userNotInGroup, new User({ name: "testuser", store: store.userStore })]
  });
  group.updateFromJson({
    users: [user]
  });
  expect(group.users.length).toBe(1);
  expect(group.users[0]).toBe(user);
  expect(user.groups).toContain(group);
  expect(userNotInGroup.groups.length).toBe(0);
});

test("updateFromJson links users when passed in as json objects", () => {
  const store = new RootStore();
  const group = new Group({ name: "Test", store: store.groupStore });
  group.updateFromJson({
    users: [{ name: "testuser" }]
  });
  expect(group.users.length).toBe(1);
  expect(group.users[0]).toBeInstanceOf(User);
  expect(group.users[0].name).toBe("testuser");
  expect(group.users[0].groups).toContain(group);
});

test("asJson returns an object with the basic properties", () => {
  const store = new RootStore();
  const group = new Group({ name: "test name", pic: "test pic", store: store.groupStore });
  expect(group.asJson).toMatchObject({
    id: group.id,
    name: "test name",
    pic: "test pic"
  });
});

test("Add user to group", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  expect(group.users.length).toBe(0);
  const user = new User({ name: "testuser", store: store.userStore });
  group.linkUser(user);
  expect(group.users.length).toBe(1);
  expect(group.users[0]).toBe(user);
  expect(group.users[0].groups).toContain(group);
});

test("Can only add the same user once to a group", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  expect(group.users.length).toBe(0);
  const user = new User({ name: "testuser", store: store.userStore });
  group.linkUser(user);
  expect(group.users.length).toBe(1);
  group.linkUser(user);
  expect(group.users.length).toBe(1);
});

test("Messages are sorted by date", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const m1 = new Message({
    store: store.messageStore,
    content: "content",
    date: new Date(2019, 0, 1, 0),
    groupId: group.id,
    userId: user.id
  });
  const m2 = new Message({
    store: store.messageStore,
    content: "content",
    date: new Date(2020, 0, 1, 0),
    groupId: group.id,
    userId: user.id
  });
  const m3 = new Message({
    store: store.messageStore,
    content: "content",
    date: new Date(2018, 0, 1, 0),
    groupId: group.id,
    userId: user.id
  });
  expect(group.messages.length).toBe(3);
  expect(group.messages).toEqual([m3, m1, m2]);
});

test("Unreadlength works as expected", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  expect(group.unreadLength).toBe(0);
  const message = new Message({
    store: store.messageStore,
    content: "content",
    unread: true,
    groupId: group.id,
    userId: user.id
  });
  group.linkMessage(message);
  expect(group.unreadLength).toBe(1);
  group.linkMessage(
    new Message({
      store: store.messageStore,
      content: "content2",
      unread: false,
      groupId: group.id,
      userId: user.id
    })
  );
  expect(group.unreadLength).toBe(1);
  group.messages[0].setUnread(false);
  expect(group.unreadLength).toBe(0);
});

test("lastMessageContent is the content of the last added message", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const user = new User({ name: "testuser", store: store.userStore });
  expect(group.lastMessageContent).toBe("");
  group.linkMessage(
    new Message({
      store: store.messageStore,
      content: "content",
      unread: true,
      groupId: group.id,
      userId: user.id
    })
  );
  expect(group.lastMessageContent).toBe("content");
});

test("Users provided on Group instantiation must have a refence to the created group", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({
    name: "testgroup",
    store: store.groupStore,
    users: [user]
  });
  expect(user.groups[0]).toBe(group);
});