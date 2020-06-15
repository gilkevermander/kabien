import { decorate, observable, action, computed } from "mobx";
import { v4 } from "uuid";

class Souvenir {
  constructor({ id = v4(), store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error("voorzie een store");
    }
    // if (!landId) {
    //   throw new Error("A Souvenir must have a landId");
    // }
    // if (!userId) {
    //   throw new Error("A Souvenir must have a userId");
    // }
    //naam, stad, postcode, nr, straat, souvenir
    this.store = store;
    this.lands = []; //in commentaar
    this.users = []//x
    //this.updateFromJson(landId, userId, naam, stad, postcode, nr, straat, souvenir);
    this.updateFromJson(json);
    this.store.addSouvenir(this);
    this.souvenirs = []
  }

  get land() {
    return this.store.rootStore.landStore.resolveLand(this.landId);
  }

  setLand(land) {
    if (this.land) {
      this.land.unlinkSouvenir(this);
    }
    if (land) {
      this.landId = land.id;
      this.land.linkSouvenir(this);
    } else {
      this.landId = null;
    }
  }

  setUser(user) {
    if (this.user) {
      this.user.unlinkSouvenir(this);
    }
    //console.log(user);
    if (user) {
      this.userId = user.id;
      this.user.linkSouvenir(this);
    } else {
      //console.log('loser');
      this.userId = null;
    }
  }

  

  updateFromJson = ({naam = undefined, straat = undefined, nr = undefined, postcode = undefined, stad = undefined, souvenir = undefined, userId = undefined, landId = undefined, delen = undefined}) => {
    this.naam = (naam !== undefined) ? naam : this.naam;
    this.straat = (straat !== undefined) ? straat : this.straat;
    this.nr = (nr !== undefined) ? nr : this.nr;
    this.postcode = (postcode !== undefined) ? postcode : this.postcode;
    this.stad = (stad !== undefined) ? stad : this.stad;
    this.souvenir = (souvenir !== undefined) ? souvenir : this.souvenir;
    this.delen = (delen !== undefined) ? delen : this.delen;
    this.landId = this.lands.id
    if (landId !== undefined) {
      this.setLand(this.store.rootStore.landStore.resolveLand(landId));
    }
    this.userId = this.users.id//x
    if (userId !== undefined) {
      this.setUser(this.store.rootStore.userStore.resolveUser(userId));
      //console.log(this.store.rootStore.userStore.resolveUser(userId));
      //console.log(userId);
    }
  };


  create = async () => this.store.createSouvenir(this.asJson);

  linkLand(land) {
    !this.lands.includes(land) && this.lands.push(land);
    !land.souvenirs.includes(this) && land.linkSouvenir(this);
  }

  unlinkLand(land) {
    const index = this.lands.findIndex((test) => test.id === land.id);
    if (index !== -1) {
      this.souvenirs.splice(index, 1);
    }
    land.souvenirs.includes(this) && land.unlinkSouvenir(this);
  }

  get user() {
    return this.store.rootStore.userStore.resolveUser(this.userId);
  }
  
  
  get asJson() {
    return {
      id: this.id,
      naam: this.naam,
      stad: this.stad,
      nr: this.nr,
      straat: this.straat,
      postcode: this.postcode,
      landId: this.landId,
      userId: this.userId,
      souvenir: this.souvenir,
      delen: this.delen

    };
  }
}

decorate(Souvenir, {
  userId: observable,
  landId: observable,
  souvenirs: observable,
  updateFromJson: action,
  asJson: computed,
  users: observable,
  lands: observable,
  delen: observable
});

export default Souvenir;
