import React from "react";
import { useState, useEffect } from "react";

import { useAuth } from "../../store/UserAuth";

import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; //cuando estado de autenticacion cambia
import { auth } from "../../firebaseConfig/firebase";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [signIn, setSignIn] = useState(true);

  const {
    currentUser,
    login,
    logout,
    errorMessage,
    setErrorMessage,
    loginWithGoogle,
  } = useAuth();

  // const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setErrorMessage("");
    console.log(name, value);
    setUser({ ...user, [name]: value }); //spread para guardar todos los datos que tenga y luego actualizar
  };

  const onSuccessfulLogin = () => {
    console.log("okkk el login");
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(user.email, user.password, onSuccessfulLogin);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle(onSuccessfulLogin);
  };

  return (
    <div className="login-container">
      <h1>{signIn ? "Sign In" : "Sign Up"}</h1>
      {errorMessage && (
        <div className="errorLog">
          <p>{errorMessage}</p>
        </div>
      )}
      <form className="form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={user.email}
          placeholder="email"
          onChange={handleChange}
        />
        <label htmlFor="password"> Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button className="submit-button" type="submit">
          {signIn ? "Login" : "Register"}
        </button>
      </form>
      <div className="form-type">
        <p>{signIn?"Don't have an account?":'Do you already have an account?'}</p>
        <button onClick={()=>setSignIn(!signIn)}>{signIn?'Sign Up':'Sign In'}</button>
      </div>
        <div className="Auth-div">
          <p>Or</p>
          <button className="google-btn" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google"></i>
            <p>{`${signIn?'Sign In':'Sign Up'} with Google`}</p>
          </button>
        </div>
      {currentUser && <button onClick={() => logout()}>Logout</button>}
    </div>
  );
};
