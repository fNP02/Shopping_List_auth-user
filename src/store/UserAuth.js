import { create } from "zustand";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; //para google
import { auth } from "../firebaseConfig/firebase";

import { useNavigate } from "react-router-dom";

export const useAuth = create((set) => ({
  currentUser: [],
  errorCode: [],
  errorMessage: [],

  setErrorMessage: (message) => {
    set({ errorMessage: message });
  },
  setErrorCode: (code) => {
    set({ errorCode: code });
  },
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },

  login: async (email, password, onSuccess) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set({ currentUser: user });
        console.log(user);
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
      .then(() => {
        // Sign-out successful.
        console.log("singin google successful");
        onSuccess && onSuccess();
      })
      .catch((error) => {
        // An error happened.
        console.log("error happened in login google");
        set({ errorCode: error.code, errorMessage: error.message });

      });
  },

  logout: async () => {
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
