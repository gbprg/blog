import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyN6gnRS12U2CmUwVcf4WIyrj7EIp0CWI",
  authDomain: "my-blog-aced7.firebaseapp.com",
  projectId: "my-blog-aced7",
  storageBucket: "my-blog-aced7.appspot.com",
  messagingSenderId: "572263996153",
  appId: "1:572263996153:web:8577898da32ea320b52028",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
