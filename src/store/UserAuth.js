import { create } from "zustand";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; //para google

import { db } from "../firebaseConfig/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

import { auth } from "../firebaseConfig/firebase";

import { useNavigate } from "react-router-dom";

export const useAuth = create((set) => ({
  currentUser: [],
  currentUserPermissions: [],
  errorCode: "",
  errorMessage: "",

  setErrorMessage: (message) => {
    set({ errorMessage: message });
  },
  setErrorCode: (code) => {
    set({ errorCode: code });
  },
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
  setCurrentUserPermissions: (user) => {
    set({ currentUserPermissions: user });
  },

  logIn: async (email, password, onSuccess) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set({ currentUser: user });
        onSuccess && onSuccess();
        // navigate("/");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        set({ errorCode: error.code, errorMessage: error.message });
      });
  },

  signUp: async (email, password, rol, onSuccess) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        set({ currentUser: user });

        //---------create object in db with user rol
        const userDocRef = doc(db, `users/${user.uid}`); //as template string

        const infoToAdd = {
          email: email,
          rol: rol,
        };
        await setDoc(userDocRef, infoToAdd); //if doc does not yet exist, it'll be created

        onSuccess && onSuccess();
        // navigate("/");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        set({ errorCode: error.code, errorMessage: error.message });
      });
  },

  loginWithGoogle: (onSuccess) => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(async (userCredential) => {
        const user = userCredential.user;
        set({ currentUser: user });
        //---------create object in db with user rol
        const userDocRef = doc(db, `users/${user.uid}`); //as template string
        const rol = "user";
        const infoToAdd = {
          email: user.email,
          rol: rol,
        };
        await setDoc(userDocRef, infoToAdd); //if doc does not yet exist, it'll be created
        console.log("singin google successful");
        onSuccess && onSuccess();
      })
      .catch((error) => {
        // An error happened.
        console.log("error happened in login google");
        set({ errorCode: error.code, errorMessage: error.message });
        console.log(error.message);
      });
  },

  logOut: async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("singout successful");
      })
      .catch((error) => {
        // An error happened.
        console.log("error happened in logout");
      });
  },
}));
