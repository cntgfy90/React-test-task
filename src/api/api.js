import { firebase } from '../firebase/firebase';

export default {
  auth: {
    login: ({email, password}) =>
      firebase.auth().signInWithEmailAndPassword(email, password),
    logout: () =>
      firebase.auth().signOut()
  }
};
