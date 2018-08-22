import { firebase, database } from '../firebase/firebase';

export default {
  auth: {
    login: ({email, password}) =>
      firebase.auth().signInWithEmailAndPassword(email, password),
    logout: () =>
      firebase.auth().signOut()
  },
  events: {
    create: (uid, data) =>
      database.ref(`users/${uid}/events`).push(data).then((ref) => ref.key),
    fetch: (uid) =>
      database.ref(`users/${uid}/events`).once('value').then((snapshot) => {
        let events = [];
        snapshot.forEach((childSnapshot) => {
          events.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return events;
      }),
    update: (uid, id, updates) =>
      database.ref(`users/${uid}/events/${id}`).update(updates),
    delete: (uid, id) =>
      database.ref(`users/${uid}/events/${id}`).remove().then((ref) => ref)
  }
};
