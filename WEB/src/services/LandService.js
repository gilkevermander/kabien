import "firebase/firestore";

class LandService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  getAll = async () => {
    const snapshot = await this.db.collection("landen").get();
    return snapshot.docs.map((o) => o.data());
  };

  getById = async (id) => {
    return (await this.db.collection("landen").doc(id).get()).data();
  };

  // getVerhalenForLand = async (landId) => {
  //   const verhalen = await this.db
  //     .collection("landen")
  //     .doc(landId)
  //     .collection("verhalen")
  //     .get();
  //   return verhalen.docs.map((u) => u.data());
  // };

  getSouvenirsForLand = async (landId) => {
    const souvenirs = await this.db
      .collection("landen")
      .doc(landId)
      .collection("souvenirs")
      .get();
    return souvenirs.docs.map((u) => u.data());
  };

  getSouvenirsFromUrl = async (id, landId) => {
    const souvenirs = await this.db
      .collection("landen")
      .doc(landId)
      .collection("souvenirs")
      .doc(id)
      .get();

    return souvenirs.data();
  };

  getVerhalenForLand = async (id, onVerhaalAdded) => {
    this.db
      .collectionGroup("verhalen")
      .where("landId", "==", id)
      .onSnapshot(async (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          console.log(change);
          if (change.type === "added") {
            onVerhaalAdded(change.doc.data());
          }
        });
      });
  };

}

export default LandService;
