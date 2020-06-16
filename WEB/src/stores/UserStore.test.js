import UserStore from "./UserStore";
import User from "../models/User";
import RootStore from ".";

test("Create a new UserStore", () => {
  const store = new UserStore();
  expect(store.users).toBeInstanceOf(Array);
  expect(store.users.length).toBe(0);
});

test("Search for a user", () => {
  const store = new UserStore();
  const user = new User({ name: "testuser", store });
  expect(store.searchUser("niks").length).toBe(0);
  expect(store.searchUser("tus").length).toBe(1);
  expect(store.searchUser("tus")[0]).toBe(user);
});

test("Resolve a user", () => {
  const store = new UserStore();
  const user = new User({ name: "testuser", store });
  const id = user.id;
  expect(store.resolveUser(id)).toBe(user);
});


test("updateUserFromServer returns a new user when json is passed in", () => {
  const store = new RootStore();
  const user = store.userStore.updateUserFromServer({ name: "testuser" });
  expect(user).toBeInstanceOf(User);
  expect(user.name).toBe("testuser");
});

test("updateUserFromServer updates an existing user", () => {
  const store = new RootStore();
  const user = new User({ name: "testuser", store: store.userStore });
  const updateUser = store.userStore.updateUserFromServer({ id: user.id, name: "testuserupdated" });
  expect(updateUser.id).toBe(user.id);
  expect(updateUser.name).toBe("testuserupdated");
  expect(updateUser).toBe(user);
});
