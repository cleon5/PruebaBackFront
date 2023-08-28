import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { //datos para conectarse a firebase
    apiKey: "AIzaSyBu7Hu22CYy0RJHZiax8TUcNO7DZneytbA",
    authDomain: "contacts-cd016.firebaseapp.com",
    projectId: "contacts-cd016",
    storageBucket: "contacts-cd016.appspot.com",
    messagingSenderId: "425985329156",
    appId: "1:425985329156:web:9c94a6726608fd25918d51"
};

//funciones para conexion a Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;