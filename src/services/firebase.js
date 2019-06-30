import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDjhDa7ZWRP2hqj-Btf7Ibh8Ngu1Q6B9eA",
    authDomain: "fibuds.firebaseapp.com",
    databaseURL: "https://fibuds.firebaseio.com",
    projectId: "fibuds",
    storageBucket: "fibuds.appspot.com",
    messagingSenderId: "933711680872",
    appId: "1:933711680872:web:cf55698e141fcfef"
};

firebase.initializeApp(firebaseConfig);

export default firebase;