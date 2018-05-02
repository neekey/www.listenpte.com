import firebase from './firebase';
import db from './data';

export function getUser() {
  return firebase.auth().currentUser;
}

function getDefaultUserData() {
  return {
    answers: [],
  };
}

export function loadUserData() {
  const user = getUser();
  if (user) {
    return db.collection('users')
      .doc(user.uid)
      .get()
      .then(ret => {
        if (ret.exists) {
          return ret.data();
        }
        return getDefaultUserData();
      });
  }
  return Promise.reject(null);
}

export function addUserAnswer(answer = {}) {
  const user = getUser();
  if (user) {
    return db.collection('users')
      .doc(user.uid)
      .collection('answers')
      .add(answer)
      .then(newAnswer =>
        newAnswer.get().then(ret => ret.data()));
  }
  return Promise.reject(null);
}

export function isUserLogin() {
  return !!getUser();
}

export function signUp(email, password) {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password);
}

export function signOut() {
  return firebase.auth().signOut();
}
