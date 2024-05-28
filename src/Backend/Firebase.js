// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeOKX-rbJXTIDraqIbMRnYAxecrtGcZVo",
  authDomain: "fir-8a566.firebaseapp.com",
  projectId: "fir-8a566",
  storageBucket: "fir-8a566.appspot.com",
  messagingSenderId: "280411875649",
  appId: "1:280411875649:web:e5074bd878ffcc9edd99c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export {db}