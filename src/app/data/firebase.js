import firebaseConfig from 'app/config/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export default firebase;
