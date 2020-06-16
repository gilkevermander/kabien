import { decorate, observable, action } from "mobx";
import Verhaal from "../models/Verhaal";
import VerhaalService from "../services/VerhaalService";

class VerhaalStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.verhalen = [];
    this.verhaalService = new VerhaalService({ firebase: this.rootStore.firebase });
    // // this.loadAllUsers();
    console.log(this.verhalen)
  }
  
  

  updateVerhaalFromServer(json) {
    let verhaal = this.verhalen.find((verhaal) => verhaal.id === json.id);
    if (!verhaal) {
      verhaal = new Verhaal({
        id: json.id,
        store: this.rootStore.verhaalStore,
      });
    }
    if (json.isDeleted) {
      this.verhalen.remove(verhaal);
    } else {
      verhaal.updateFromJson(json);
    }

    return verhaal;
  }

  createVerhaal = async (verhaal) => {
    console.log(verhaal);
    await this.verhaalService.createVerhaal(verhaal);
  };

  // resolveUser = (id) => this.users.find((user) => user.id === id);

  addVerhaal = (verhaal) => {
    this.verhalen.push(verhaal);
  };

  // searchUser = (search) =>
  //   this.users.filter((user) =>
  //     user.name.toLowerCase().includes(search.toLowerCase())
  //   );
}

decorate(VerhaalStore, {
  verhalen: observable,
  addVerhaal: action,
  createVerhaal: action,
  updateVerhaalFromServer: action,
  empty: action,
});

export default VerhaalStore;
