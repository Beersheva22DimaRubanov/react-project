// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBH5Fkq8RgwuGkDJ8aTQUgsmfSdNmkXEI",
  authDomain: "employees-a6322.firebaseapp.com",
  projectId: "employees-a6322",
  storageBucket: "employees-a6322.appspot.com",
  messagingSenderId: "540157806853",
  appId: "1:540157806853:web:2363c133d8188150808f6c"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;