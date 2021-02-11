import firebase from 'firebase';

// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyC-OD1xmL89lPzQdSXiH8npTfdsZ2a2ni0',
  authDomain: 'react-sync-be90d.firebaseapp.com',
  databaseURL:
    'https://react-sync-be90d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-sync-be90d',
  storageBucket: 'react-sync-be90d.appspot.com',
  messagingSenderId: '32227398414',
  appId: '1:32227398414:web:85623135b9356b61f87d5f',
  measurementId: 'G-910W7K34K0',
};
// Initialize Firebase
var fire = firebase.initializeApp(config);

export const database = fire.database();

export default fire;

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  return auth.signInWithPopup(provider);
};
