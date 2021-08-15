import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCl_1IgGz4qt5g3usIEVfDlGvgrYXk5ON8",
    authDomain: "chit-chat-ce107.firebaseapp.com",
    projectId: "chit-chat-ce107",
    storageBucket: "chit-chat-ce107.appspot.com",
    messagingSenderId: "211968812211",
    appId: "1:211968812211:web:cb469aa0aa14079b73bcc6"
}).auth();
