import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAZi1xm4_xarGIFnAX7V5BygRT2NfZp5gw",
    authDomain: "todo-app-4e8f9.firebaseapp.com",
    projectId: "todo-app-4e8f9",
    storageBucket: "todo-app-4e8f9.appspot.com",
    messagingSenderId: "774512010856",
    appId: "1:774512010856:web:f36fde792b3291de2cfddd",
    measurementId: "G-CTX3LCEZ8G",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

export default db;
