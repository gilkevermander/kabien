import "firebase/firestore";

class VerhaalService {
  constructor({ firebase }) {
    this.db = firebase.firestore();
  }

  createVerhaal = async (verhaal) => {
    await this.db
      .collection("landen")
      .doc(verhaal.landId)
      .collection("verhalen")
      .doc(verhaal.id)
      .set(verhaal);
  };
}

export default VerhaalService;
