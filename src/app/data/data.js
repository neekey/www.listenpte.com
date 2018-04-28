import firebase from './firebase';
const db = firebase.firestore();
export default db;

// firebase.firestore.FieldPath.documentId()

window.firebaseDB = db;
