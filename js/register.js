// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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
const signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const emailObject = document.getElementById("email");
  const usernameObject = document.getElementById("username");
  const passwordObject = document.getElementById("password");
  const checkbox = document.getElementById("tos");
  const ErrorEmailMsg = document.getElementById("error-email");
  const ErrorUserMsg = document.getElementById("error-user");
  const ErrorPassMsg = document.getElementById("error-pass");
  //values
  const email = emailObject.value;
  const password = passwordObject.value;
  const username = usernameObject.value;
  console.log(email, password, username);

  const shakeAnimation = "shake 0.2s linear forwards";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //authentication

  // empty value check
  let eligibleForRegister = true;
  if (!checkbox.checked) {
    checkbox.style.animation = shakeAnimation;
    checkbox.addEventListener(
      "animationend",
      () => {
        checkbox.style.animation = "";
      },
      { once: true }
    );
    eligibleForRegister = false;
  }

  //these events is used to hide the red border
  // once the input section is focused again.
  emailObject.addEventListener(
    "focus",
    () => {
      emailObject.classList.remove("input-error-box");
      ErrorEmailMsg.classList.add("hidden");
    },
    { once: true }
  );

  passwordObject.addEventListener(
    "focus",
    () => {
      passwordObject.classList.remove("input-error-box");
      ErrorPassMsg.classList.add("hidden");
    },
    { once: true }
  );
  usernameObject.addEventListener(
    "focus",
    () => {
      usernameObject.classList.remove("input-error-box");
      ErrorUserMsg.classList.add("hidden");
    },
    { once: true }
  );
  //validation part
  if (!email || !emailRegex.test(email)) {
    ErrorEmailMsg.classList.remove("hidden");
    emailObject.classList.add("input-error-box");
    emailObject.style.animation = shakeAnimation;

    emailObject.addEventListener(
      "animationend",
      () => {
        emailObject.style.animation = "";
      },
      { once: true }
    );
    eligibleForRegister = false;
  }
  if (!username) {
    ErrorUserMsg.classList.remove("hidden");
    usernameObject.classList.add("input-error-box");
    usernameObject.style.animation = shakeAnimation;

    usernameObject.addEventListener(
      "animationend",
      () => {
        usernameObject.style.animation = "";
      },
      { once: true }
    );
    eligibleForRegister = false;
  }
  if (!password || password.length < 8) {
    ErrorPassMsg.classList.remove("hidden");
    passwordObject.classList.add("input-error-box");
    passwordObject.style.animation = shakeAnimation;

    if (!password) ErrorPassMsg.textContent = "Valid password required";
    else ErrorPassMsg.textContent = "Password too short";
    passwordObject.addEventListener(
      "animationend",
      () => {
        passwordObject.style.animation = "";
      },
      { once: true }
    );
    eligibleForRegister = false;
  }

  if (eligibleForRegister) {
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        let userData = {
          email: email,
          password: password,
          pfp: "default",
          username: username,
        };
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData).then(() => {
          window.location.href = "app.html";
        });
      }
    );
  }
  // this one is used to remove the listener once executed
});
