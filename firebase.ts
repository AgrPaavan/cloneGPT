import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_C6pDdAvG7NhD56Ai9jsiD_YRVm_dhqk",
  authDomain: "better-gpt-ed3b5.firebaseapp.com",
  projectId: "better-gpt-ed3b5",
  storageBucket: "better-gpt-ed3b5.appspot.com",
  messagingSenderId: "506727785788",
  appId: "1:506727785788:web:6b3b23413b04b0bc242a39",
  measurementId: "G-N38G0C7Z7C",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
