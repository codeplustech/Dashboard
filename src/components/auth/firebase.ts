import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuMD3sdMcRsoAekUneAsZfkc4HaD1Aoo8",
  authDomain: "codeplus-b9a4f.firebaseapp.com",
  projectId: "codeplus-b9a4f",
  storageBucket: "codeplus-b9a4f.firebasestorage.app",
  messagingSenderId: "871294156224",
  appId: "1:871294156224:web:34f9a6adec59c2bf3e9c25",
  measurementId: "G-89M42YBLLM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 