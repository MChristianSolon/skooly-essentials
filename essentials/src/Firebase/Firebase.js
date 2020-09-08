import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDxT1wxqnMl9wrRd4W8tIgBKCxcxrcCO2M',
  authDomain: 'skooly-25b72.firebaseapp.com',
  databaseURL: 'https://skooly-25b72.firebaseio.com',
  projectId: 'skooly-25b72',
  storageBucket: 'skooly-25b72.appspot.com',
  messagingSenderId: '589849670073',
  appId: '1:589849670073:web:7f27299681f9c28a9ec668',
  measurementId: 'G-PFT954NZTV',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//user config file
var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, uiConfig, timestamp };
