import { decorate, observable, action } from "mobx";
import Land from "../models/Land";
import LandService from "../services/LandService";

class LandStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.lands = [];
    this.landService = new LandService({
      firebase: this.rootStore.firebase,
    });
  }

  loadAllLands = async () => {
    const jsonLand = await this.landService.getAll();
    jsonLand.forEach((json) => this.updateLandFromServer(json));
  };

  loadLand = async (id) => {
    const jsonLand = await this.landService.getById(id);
    this.updateLandFromServer(jsonLand);
    this.loadLandSouvenirs(id)
    return this.resolveLand(id);
  };

  // loadLandVerhalen = async (id) => {
  //   console.log('test')
  //   const jsonVerhalen = await this.landService.getVerhalenForLand(id);
  //   this.updateLandFromServer({ id, verhalen: jsonVerhalen });
  //   return this.resolveLand(id);
  // };

  loadLandSouvenirs = async (id) => {
    console.log('test')
    const jsonSouvenirs = await this.landService.getSouvenirsForLand(id);
    console.log(jsonSouvenirs);
    console.log(id);
    this.updateLandFromServer({ id, souvenirs: jsonSouvenirs});
    return this.resolveLand(id);
  };

  loadSouvenirFromUrl = async (id, landId) => {
    console.log('test')
    const jsonSouvenir = await this.landService.getSouvenirsFromUrl(id, landId);
    console.log(jsonSouvenir);
    console.log(id);
    this.updateLandFromServer(jsonSouvenir);
    this.rootStore.souvenirStore.updateSouvenirFromServer(jsonSouvenir);
    return this.resolveLand(landId);
  };


  loadLandVerhalen = async (id) => {
    console.log('test')
    const jsonVerhalen = await this.landService.getVerhalenForLand(id, this.onxalAdded);
    console.log(jsonVerhalen);
    console.log(id);
    this.updateLandFromServer({ id, verhalen: jsonVerhalen });
    return this.resolveLand(id);
  };

  onVerhaalAdded = async (json) => {
    this.rootStore.verhaalStore.updateVerhaalFromServer(json);
  };

  updateLandFromServer(json) {
    let land = this.lands.find((land) => land.id === json.id);
    if (!land) {
      land = new Land({
        id: json.id,
        store: this.rootStore.landStore,
      });
    }
    if (json.isDeleted) {
      this.lands.remove(land);
    } else {
      land.updateFromJson(json);
    }
    return land;
  }

  resolveLand = (id) => this.lands.find((land) => land.id === id);
  resolveLandId = (title) => this.lands.find((land) => land.title === title);

  addLand = (land) => {
    this.lands.push(land);
  };

}

decorate(LandStore, {
  lands: observable,
  addLand: action,
  updateLandFromServer: action,
  empty: action,
});

export default LandStore;
