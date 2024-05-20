import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyCMqy732qmCwo7BQQUDOz33tAAiCwTcO_o",
    authDomain: "loginadmin-f2b06.firebaseapp.com",
    projectId: "loginadmin-f2b06",
    storageBucket: "loginadmin-f2b06.appspot.com",
    messagingSenderId: "513572428753",
    appId: "1:513572428753:web:66e4d40723679e58cd5ef0",
    measurementId: "G-51S0KR7K5N"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);