import {initializeApp } from "firebase/app";
import {getAuth,signInWithEmailAndPassword,signOut} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJCH3buOI1D5ZcrjaZGGyAAEBjMgukoO8",
  authDomain: "my-database-1f97a.firebaseapp.com",
  projectId: "my-database-1f97a",
  storageBucket: "my-database-1f97a.appspot.com",
  messagingSenderId: "332747795617",
  appId: "1:332747795617:web:d6420963766862c6d7d4e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



async function logInWithEmailAndPassword(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    var errorCode = error.code;
    // var errorMessage = error.message;
    alert(errorCode)
  }
}


function logout() {
  return signOut(auth);
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  logout,
};