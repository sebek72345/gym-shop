import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyASGdaRWPrMjpQRcrzp66MEJn5Z4fDMTiQ",
  authDomain: "ecommerce-gym.firebaseapp.com",
  projectId: "ecommerce-gym",
  storageBucket: "ecommerce-gym.appspot.com",
  messagingSenderId: "68912583818",
  appId: "1:68912583818:web:e6435a552fd4d712670973",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
