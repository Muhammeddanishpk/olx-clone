
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {getStorage} from  'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyASy-7jkT3SFV-cbeWtRVOYdvKZxNg4FLI",
    authDomain: "olx-clone-53daf.firebaseapp.com",
    projectId: "olx-clone-53daf",
    storageBucket: "olx-clone-53daf.appspot.com",
    messagingSenderId: "1003125216341",
    appId: "1:1003125216341:web:5bf059de3e511d61d8f0dc",
    measurementId: "G-4PSEMKSRST"
  };
  
 const Firebase = initializeApp(firebaseConfig)
  export const storage = getStorage(Firebase)
 export const db = getFirestore(Firebase)
 export const auth = getAuth(Firebase)