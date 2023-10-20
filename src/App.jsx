import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { ProductList } from "./components/ProductList.jsx";
import { EditProduct } from "./components/EditProduct";
import { CreateProduct } from "./components/CreateProduct";
import { Register } from "./components/users/Register";
import { Login } from "./components/users/Login";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig/firebase";
import { useAuth } from "./store/UserAuth";
import { ProtectedRoute } from "./components/protected/ProtectedRoute";

function App() {
  const { setCurrentUser, currentUser } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setCurrentUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <BrowserRouter>
        <Link to="/">INICIO</Link>
        <br />
        <Link to="/register">REGISTER</Link>
        <br />
        <Link to="/login">LOGIN</Link>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!!currentUser}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<ProductList />} />
          <Route path="/edit-id:/:id" element={<EditProduct />} />
          <Route path="/create-new-product" element={<CreateProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
