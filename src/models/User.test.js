import User from "./User";
import Group from "./Group";
import Message from "./Message";
import RootStore from "../stores";

test("Create a new user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  expect(user.name).toBe("testuser");
  expect(user.avatar).not.toBe("");
});

test("Can't create a user without a store", () => {
  expect(() => new User({ name: "testuser" })).toThrow("voorzie een store");
});

test("Store must have a reference to a created user", () => {
  const store = new RootStore();
  expect(store.userStore.users.length).toBe(0);
  const user = new User({ name: "testuser", store: store.userStore });
  expect(store.userStore.users.length).toBe(1);
  expect(store.userStore.users[0]).toStrictEqual(user);
});

test("updateFromJson sets the correct properties of the user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", avatar: "testavatar", store: store.userStore });
  user.updateFromJson({
    name: "updated name",
    avatar: "updated avatar"
  });
  expect(user.name).toBe("updated name");
  expect(user.avatar).toBe("updated avatar");
});

test("updateFromJson does not overwrite properties not passed in", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", avatar: "testavatar", store: store.userStore });
  user.updateFromJson({
    avatar: "updated avatar"
  });
  expect(user.name).toBe("testuser");
  expect(user.avatar).toBe("updated avatar");
  user.updateFromJson({
    name: "updated name",
  });
  expect(user.name).toBe("updated name");
  expect(user.avatar).toBe("updated avatar");
});

test("updateFromJson links groups when passedin", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", avatar: "testavatar", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const groupNotForUser = new Group({ name: "testgroup2", store: store.groupStore });
  user.updateFromJson({
    groups: [group]
  });
  expect(user.groups.length).toBe(1);
  expect(user.groups[0]).toBe(group);
  expect(group.users).toContain(user);
  expect(groupNotForUser.users.length).toBe(0);
});

test("updateFromJson unlinks old groups when new groups are passed in", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", avatar: "testavatar", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const groupNotForUser = new Group({ name: "testgroup2", store: store.groupStore });
  user.updateFromJson({
    groups: [groupNotForUser, new Group({ name: "testgroup2", store: store.groupStore })]
  });
  user.updateFromJson({
    groups: [group]
  });
  expect(user.groups.length).toBe(1);
  expect(user.groups[0]).toBe(group);
  expect(group.users).toContain(user);
  expect(groupNotForUser.users.length).toBe(0);
});

test("updateFromJson links groups when passed in as json objects", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", avatar: "testavatar", store: store.userStore });
  user.updateFromJson({
    groups: [{ name: "testgroup" }]
  });
  expect(user.groups.length).toBe(1);
  expect(user.groups[0]).toBeInstanceOf(Group);
  expect(user.groups[0].name).toBe("testgroup");
  expect(user.groups[0].users).toContain(user);
});

test("asJson returns an object with the basic properties", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", avatar: "testavatar", store: store.userStore });
  expect(user.asJson).toMatchObject({
    id: user.id,
    name: "testuser",
    avatar: "testavatar"
  });
});

test("Link a group to a user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  expect(user.groups).toStrictEqual([]);
  user.linkGroup(group);
  expect(user.groups).toContain(group);
  expect(user.groups[0].users).toContain(user);
});

test("Link a message to a user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const group = new Group({ name: "testgroup", store: store.groupStore });
  expect(user.messages).toStrictEqual([]);
  const message = new Message({ store: store.messageStore, content: "testgroup", userId: user.id, groupId: group.id });
  expect(user.messages).toContain(message);
});
