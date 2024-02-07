
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBtFYeEVfQBQwI-V5WwR8eEmMf63Gh5i0k",
  authDomain: "twitter-d107f.firebaseapp.com",
  projectId: "twitter-d107f",
  storageBucket: "twitter-d107f.appspot.com",
  messagingSenderId: "987368694129",
  appId: "1:987368694129:web:abe03b580cde360b9716d0",
  measurementId: "G-1LXP79Q4SM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;