import "firebase/firestore";

class SouvenirService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  getByLand = async (landId) => {
    let souvenirs = this.db.collection('souvenirs');
    souvenirs.where('landId', '==', landId).get()
  }

  // getVerhalenForLand = async (id, onVerhaalAdded) => {
  //   this.db
  //     .collectionGroup("verhalen")
  //     .where("landId", "==", id)
  //     .onSnapshot(async (snapshot) => {
  //       snapshot.docChanges().forEach(async (change) => {
  //         console.log(change);
  //         if (change.type === "added") {
  //           onVerhaalAdded(change.doc.data());
  //         }
  //       });
  //     });
  // };

  getAll = async () => {
    const snapshot = await this.db.collection("souvenirs").get();
    return snapshot.docs.map((o) => o.data());
  };

  getById = async (id) => {
    return (await this.db.collection("souvenirs").doc(id).get()).data();
  };

  // createSouvenir = async (souvenir) => {
  //   const souvenirRef = await this.db.collection("souvenirs").doc(souvenir.id);
  //   await souvenirRef.set(souvenir);
  //   return souvenir;
  // };

  createSouvenir = async (souvenir) => {
    await this.db
      .collection("landen")
      .doc(souvenir.landId)
      .collection("souvenirs")
      .doc(souvenir.id)
      .set(souvenir);
    return souvenir;//moet dit of niet?
  };
}

export default SouvenirService;
