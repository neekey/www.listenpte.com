import firebase from './firebase';

export function getUser() {
  return firebase.auth().currentUser;
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
