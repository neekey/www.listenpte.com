import firebase from './firebase';
import db from './data';

export function getUser() {
  return firebase.auth().currentUser;
}

export function loadUserData() {
  const user = getUser();
  if (user) {
    return Promise.all([
      db
        .collection('users')
        .doc(user.uid)
        .collection('answers')
        .get()
        .then(ret => (
          ret.docs.map(item => item.data())
        )),
      db
        .collection('users')
        .doc(user.uid)
        .get()
        .then(ret => {
          if (ret.exists) {
            return ret.data();
          }
          return {
            questionStats: {},
          };
        }),
    ]).then(results => (
      {
        answers: results[0],
        ...results[1],
      }
    ));
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

export function updateUserQuestionStats(questionId, stats = {}) {
  const user = getUser();
  if (user) {
    return db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(ret => {
        if (ret.exists) {
          return ret.data();
        }
        return {
          questionStats: {},
        };
      })
      .then(({ questionStats }) => {
        const newStats = {
          ...questionStats,
          [questionId]: stats,
        };
        return db
          .collection('users')
          .doc(user.uid)
          .set({
            questionStats: newStats,
          }, { merge: true });
      });
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

window.updateUserQuestionStats = updateUserQuestionStats;
