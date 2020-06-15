import { decorate, observable, action } from "mobx";
import Souvenir from "../models/Souvenir";
import SouvenirService from "../services/SouvenirService";

class SouvenirStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.souvenirs = [];
    this.souvenirService = new SouvenirService({ firebase: this.rootStore.firebase });
    this.loadAllSouvenirs();
    console.log(this.souvenirs)
  }

  loadAllSouvenirs = async () => {
    const jsonSouvenirs = await this.souvenirService.getAll();
    jsonSouvenirs.forEach((json) => this.updateSouvenirFromServer(json));
  };
  
  updateSouvenirFromServer(json) {
    let souvenir = this.souvenirs.find((souvenir) => souvenir.id === json.id);
    if (!souvenir) {
      souvenir = new Souvenir({
        id: json.id,
        store: this.rootStore.souvenirStore,
      });
    }
    if (json.isDeleted) {
      this.souvenirs.remove(souvenir);
    } else {
      souvenir.updateFromJson(json);
    }

    return souvenir;
  }

  loadLandSouvenir = async (landId) => {
    const jsonSouvenir = await this.souvenirService.getByLand(landId);
    console.log(jsonSouvenir)
    console.log(landId);
    this.updateSouvenirFromServer(jsonSouvenir);
    return this.resolveSouvenir(landId);
  }

  loadSouvenir = async (id) => {
    const jsonSouvenir = await this.souvenirService.getById(id);
    console.log(jsonSouvenir)
    this.updateSouvenirFromServer(jsonSouvenir);
    //this.loadLandVerhalen(id)
    return this.resolveSouvenir(id);
  };

  createSouvenir = async (souvenir) => {
    console.log(souvenir);
    await this.souvenirService.createSouvenir(souvenir);
  };

  // resolveUser = (id) => this.users.find((user) => user.id === id);
  resolveSouvenir = (id) => this.souvenirs.find((souvenir) => souvenir.id === id);

  addSouvenir = (souvenir) => {
    this.souvenirs.push(souvenir);
  };

  // searchUser = (search) =>
  //   this.users.filter((user) =>
  //     user.name.toLowerCase().includes(search.toLowerCase())
  //   );
}

decorate(SouvenirStore, {
  souvenirs: observable,
  addSouvenir: action,
  createSouvenir: action,
  updateSouvenirFromServer: action,
  empty: action,
});

export default SouvenirStore;
