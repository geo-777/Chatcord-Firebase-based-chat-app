// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs4CJ6b87wxs9K7ZJxoxyLn2JDnKrd21s",
  authDomain: "chat-cord-ee3ef.firebaseapp.com",
  projectId: "chat-cord-ee3ef",
  storageBucket: "chat-cord-ee3ef.firebasestorage.app",
  messagingSenderId: "995917695984",
  appId: "1:995917695984:web:3e7df7093fd367fb542b35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
