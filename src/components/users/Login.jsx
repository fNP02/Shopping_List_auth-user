import React from "react";
import { useState, useEffect } from "react";

import { useAuth } from "../../store/UserAuth";

import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; //cuando estado de autenticacion cambia
import { auth } from "../../firebaseConfig/firebase";

import { firebaseErrors } from "../../firebaseConfig/firebaseErrors";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [rol, setRol] = useState("");

  const [signIn, setSignIn] = useState(true);

  const {
    currentUser,
    logIn,
    signUp,
    logOut,
    errorMessage,
    errorCode,
    setErrorMessage,
    loginWithGoogle,
  } = useAuth();

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setErrorMessage("");
    setUser({ ...user, [name]: value }); //spread para guardar todos los datos que tenga y luego actualizar
  };

  const onSuccessfulLogin = () => {
    console.log("login ok");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signIn) {
      //login
      await logIn(user.email, user.password, onSuccessfulLogin);
    } else {
      //sign up
      await signUp(user.email, user.password, rol, onSuccessfulLogin);
      console.log("usted se esta registrando");
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle(onSuccessfulLogin);
  };

  const errorDisp = firebaseErrors(errorCode);
  return (
    <div className="login-container">
      <h1>{signIn ? "Sign In" : "Sign Up"}</h1>
      {errorMessage && (
        <div className="errorLog">
          <p>{errorDisp}</p>
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="text"
          value={user.email}
          placeholder="email"
          onChange={handleChange}
        />
        <label htmlFor="password"> Password *</label>
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          placeholder="password"
          onChange={handleChange}
        />
        {!signIn && (
          <>
            <label htmlFor="rol"> Rol *</label>
            <select
              name=""
              id=""
              defaultValue={"default"}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="default" disabled>
                Select a Rol
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}
        <button
          className="submit-button"
          type="submit"
          disabled={!signIn && rol == ""}
        >
          {signIn ? "Login" : "Register"}
        </button>
      </form>
      <div className="form-type">
        <p>
          {signIn
            ? "Don't have an account?"
            : "Do you already have an account?"}
        </p>
        <button
          onClick={() => {
            setSignIn(!signIn);
            setErrorMessage("");
          }}
        >
          {signIn ? "Sign Up" : "Sign In"}
        </button>
      </div>
      <div className="Auth-div">
        <p>Or</p>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <i className="fa-brands fa-google"></i>
          <p>Sign In with Google (as user)</p>
        </button>
      </div>
    </div>
  );
};
