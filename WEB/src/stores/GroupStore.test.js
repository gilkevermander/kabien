import RootStore from "./";
import GroupStore from "./GroupStore";
import Group from "../models/Group";
import Message from "../models/Message";
import User from "../models/User";

test("Create a new GroupStore", () => {
  const store = new GroupStore();
  expect(store.groups).toBeInstanceOf(Array);
  expect(store.groups.length).toBe(0);
});

function getSeedData(store) {
  const user = new User({ name: "testuser", store: store.userStore });
  const group1 = new Group({ name: "testgroup1", store: store.groupStore });
  new Message({
    store: store.messageStore,
    content: "content1",
    userId: user.id,
    unread: true,
    groupId: group1.id
  });
  const group2 = new Group({ name: "testgroup1", store: store.groupStore });
  new Message({
    store: store.messageStore,
    content: "content2",
    userId: user.id,
    unread: true,
    groupId: group2.id
  });

  return [group1, group2];
}

test("Total unread length of all groups", () => {
  const store = new RootStore();
  getSeedData(store);
  expect(store.unreadLength).toBe(2);
  store.groupStore.groups[0].messages[0].setUnread(false);
  expect(store.unreadLength).toBe(1);
});

test("Get a group by the id", () => {
  const store = new GroupStore();
  const group = new Group({ name: "testgroup", store });
  const id = group.id;
  expect(store.resolveGroup(id)).toBe(group);
});

test("updateGroupFromServer returns a new group when json is passed in", () => {
  const store = new RootStore();
  const group = store.groupStore.updateGroupFromServer({ name: "testgroup" });
  expect(group).toBeInstanceOf(Group);
  expect(group.name).toBe("testgroup");
});

test("updateGroupFromServer updates an existing group", () => {
  const store = new RootStore();
  const group = new Group({ name: "testgroup", store: store.groupStore });
  const updatedGroup = store.groupStore.updateGroupFromServer({ id: group.id, name: "testgroupupdated" });
  expect(updatedGroup.id).toBe(group.id);
  expect(updatedGroup.name).toBe("testgroupupdated");
  expect(updatedGroup).toBe(group);
});
