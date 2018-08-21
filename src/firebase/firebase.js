import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDvu9F517vz1UVm8kKSRmV4iB1flaEspeI",
  authDomain: "react-test-task-3cebb.firebaseapp.com",
  databaseURL: "https://react-test-task-3cebb.firebaseio.com",
  projectId: "react-test-task-3cebb",
  storageBucket: "react-test-task-3cebb.appspot.com",
  messagingSenderId: "663176813834"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database };
