import { decorate, observable, action, computed } from "mobx";
import { v4 } from "uuid";

class Verhaal {
  constructor({ id = v4(), store, /*landId,*/...json }) {
    this.id = id;
    if (!store) {
      throw new Error("voorzie een store");
    }
    // if (!landId) {
    //   throw new Error("A verhaal must have a landId");
    // }
    this.store = store;
    this.lands = []; //in commentaar
    this.updateFromJson(json);

    this.store.addVerhaal(this);
  }

  get land() {
    return this.store.rootStore.landStore.resolveLand(this.landId);
  }

  setLand(land) {
    if (this.land) {
      this.land.unlinkVerhaal(this);
    }
    if (land) {
      this.landId = land.id;
      this.land.linkVerhaal(this);
    } else {
      this.landId = null;
    }
  }

  updateFromJson = ({naam = undefined, verhaal = undefined, landId = undefined,}) => {
    this.naam = (naam !== undefined) ? naam : this.naam;
    this.verhaal = (verhaal !== undefined) ? verhaal : this.verhaal;
    this.landId = this.lands.id
    if (landId !== undefined) {
      this.setLand(this.store.rootStore.landStore.resolveLand(landId));
    }
  };


  create = async () => this.store.createVehaal(this.asJson);

  linkLand(land) {
    !this.lands.includes(land) && this.lands.push(land);
    !land.verhalen.includes(this) && land.linkVerhaal(this);
  }

  unlinkLand(land) {
    const index = this.lands.findIndex((test) => test.id === land.id);
    if (index !== -1) {
      this.lands.splice(index, 1);
    }
    land.verhalen.includes(this) && land.unlinkVerhaal(this);
  }
  
  get asJson() {
    return {
      id: this.id,
      naam: this.naam,
      verhaal: this.verhaal,
      landId: this.landId,
    };
  }

}

decorate(Verhaal, {
  Verhalen: observable,
  updateFromJson: action,
  asJson: computed,
  landId: observable,
});

export default Verhaal;
