import "firebase/auth";

class AuthService {
  constructor({ firebase, onAuthStateChanged }) {
    this.auth = firebase.auth();
    this.auth.onAuthStateChanged((data) => {
      if (data) {
        data.id = data.uid;
        data.gebruikersnaam = data.displayName;
      }
      onAuthStateChanged(data);
    });
  }

  login = async (email, password) => {
    const data = await this.auth.signInWithEmailAndPassword(email, password);
    return data;
  };

  logout = async () => {
    return await this.auth.signOut();
  };

  // register = async ({ name, email, password, avatar }) => {
  //   const userCredential = await this.auth.createUserWithEmailAndPassword(
  //     email,
  //     password
  //   );
  //   await userCredential.user.updateProfile({
  //     displayName: name,
  //     photoURL: avatar,
  //   });
  //   return userCredential.user;
  // };

  register = async ({ gebruikersnaam, email, password }) => {
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await userCredential.user.updateProfile({
      displayName: gebruikersnaam
    });

    return userCredential.user;
  };

  isRegistered = async (email) => {
    const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
    if (signInMethods.length > 0) {
      return true;
    }
    return false;
  };
}

export default AuthService;
