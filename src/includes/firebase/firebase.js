import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSzDGGbU2pDedjAMOdmq46CAFKahTjIRk",
  authDomain: "vue-music-app-38d35.firebaseapp.com",
  projectId: "vue-music-app-38d35",
  storageBucket: "vue-music-app-38d35.appspot.com",
  appId: "1:246685020114:web:77fa3a1bddc06952c5e20b",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };
