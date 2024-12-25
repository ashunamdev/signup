// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDrB9FupDgjjVk4_guLC24ydG3retE3bME",
//   authDomain: "login-auth-4736e.firebaseapp.com",
//   projectId: "login-auth-4736e",
//   storageBucket: "login-auth-4736e.appspot.com",
//   messagingSenderId: "10562914305",
//   appId: "1:10562914305:web:2cff37be4fa9ccf0a29800"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDYp_MYOpBgfRCgx2pwbx-yyyAU54RHPUY",
  authDomain: "signuplogin-form.firebaseapp.com",
  projectId: "signuplogin-form",
  storageBucket: "signuplogin-form.firebasestorage.app",
  messagingSenderId: "54342412057",
  appId: "1:54342412057:web:598b603edf6b7bbd808788"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;