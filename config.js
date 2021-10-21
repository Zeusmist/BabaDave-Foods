// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9D0qn6AgC9i2ppYwJMEVfx0yin2tAOAs",
  authDomain: "babadavefoods.firebaseapp.com",
  projectId: "babadavefoods",
  storageBucket: "babadavefoods.appspot.com",
  messagingSenderId: "571290967215",
  appId: "1:571290967215:web:19a58f6720d942dc8f485a",
  measurementId: "G-4FTT3CC3DZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
