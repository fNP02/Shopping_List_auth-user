import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebase";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

const [errorMessage, setErrorMessage] = useState('')
  const navigate=useNavigate()

  const handleChange = ({ target: { name, value } }) => {
	setErrorMessage('')
    console.log(name, value);
    setUser({ ...user, [name]: value }); //spread para guardar todos los datos que tenga y luego actualizar
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    console.log(user.email);
    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
		setErrorMessage(errorMessage)
        // ..
      });
    console.log(auth);
    // createUserWithEmailAndPassword()
  };

  return (
    <div>
		<div>
			{errorMessage&& <p>{errorMessage}</p>}
		</div>
      <form onSubmit={handleRegister}>
        <label htmlFor="email"></label>
        <input
          name="email"
          type="email"
		  value={user.email}
          placeholder="email"
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          name="password"
          type="password"
		  value={user.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};
 

// try {
// 	await funcion
// } catch (error) {
// 	setErrorState(error)  ->para mostrarlo, se puede primer sacar codigo y poner mensaje personalizado para cada codigo
// }