import { createContext } from "react";
import RootStore from "../stores";

const store = new RootStore();

window.store = store;

const loadAllData = async () => {
  await store.landStore.loadAllLands();
  // await store.userStore.loadAllUsers();
  // store.uiStore.setCurrentUser(store.userStore.resolveUser("9969c1fc-0f51-3d3f-b687-d0835a081078"));
  // await store.messageStore.loadAllMessages();
};

loadAllData();

export const storeContext = createContext(store);

