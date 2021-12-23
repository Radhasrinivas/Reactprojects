import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD8NZLyUMOK8OIfpBQAsDhZHpZqTlR3ihY",
    authDomain: "profileapp-b6811.firebaseapp.com",
    projectId: "profileapp-b6811",
    storageBucket: "profileapp-b6811.appspot.com",
    messagingSenderId: "1017956653519",
    appId: "1:1017956653519:web:2b7f178d700212a61f5aba",
    measurementId: "G-WVS2TM56FZ"
  };

  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);

