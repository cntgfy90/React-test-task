import { firebase } from '../firebase/firebase';

export default {
  auth: {
    login: ({email, password}) =>
      firebase.auth().signInWithEmailAndPassword(email, password),
    logout: () =>
      firebase.auth().signOut()
  },
  events: {
    create: (uid, data) =>
      firebase.database().ref(`users/${uid}/events`).push(data).then((ref) => ref.key),
    fetch: (uid) =>
      firebase.database().ref(`users/${uid}/events`).once('value').then((snapshot) => {
        let events = [];
        snapshot.forEach((childSnapshot) => {
          events.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return events;
      }),
    update: () => (uid, id, updates) =>
      firebase.database().ref(`users/${uid}/events/${id}`).update(updates).then((event) => event),
    delete: () => (uid, id) =>
      firebase.database().ref(`users/${uid}/events/${id}`).remove().then((ref) => ref)
  }
};
