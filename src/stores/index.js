import * as firebase from "firebase/app";

import MessageStore from "./MessageStore";
import UserStore from "./UserStore";
import GroupStore from "./GroupStore";
import UiStore from "./UiStore";
import LandStore from "./LandStore";
import VerhaalStore from "./VerhaalStore";
import SouvenirStore from "./SouvenirStore";
import { decorate, computed } from "mobx";

class RootStore {
  constructor() {
    this.firebase = getFirebase();
    this.messageStore = new MessageStore(this);
    this.userStore = new UserStore(this);
    this.groupStore = new GroupStore(this);
    this.uiStore = new UiStore(this);
    this.landStore = new LandStore(this);
    this.verhaalStore = new VerhaalStore(this);
    this.souvenirStore = new SouvenirStore(this);
  }

  get unreadLength() {
    return this.groupStore.groups.reduce(
      (total, group) => (total += group.unreadLength),
      0
    );
  }
}

const getFirebase = () => {
  const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  };

  // prevent multiple app inits
  return !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();
};

decorate(RootStore, {
  unreadLength: computed,
});

export default RootStore;
