import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

// rest of the code

const firebaseConfig = {
    apiKey: "AIzaSyB97dl71GoS5WyyrJSiibN2PU495hlG2-M",
    authDomain: "webapi-messaging-app.firebaseapp.com",
    projectId: "webapi-messaging-app",
    storageBucket: "webapi-messaging-app.appspot.com",
    messagingSenderId: "230959655891",
    appId: "1:230959655891:web:8ea1a6a9561ddf87cc1d26",
    measurementId: "G-92JTDF533M"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export{auth,provider}
export default db