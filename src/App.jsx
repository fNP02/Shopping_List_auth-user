import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { ProductList } from "./components/ProductList.jsx";
import { EditProduct } from "./components/EditProduct";
import { CreateProduct } from "./components/CreateProduct";
import { Login } from "./components/users/Login";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig/firebase";
import { useAuth } from "./store/UserAuth";
import { ProtectedRoute } from "./components/protected/ProtectedRoute";

import { db } from "./firebaseConfig/firebase";
import { doc, getDoc } from 'firebase/firestore'


function App() {
  const { setCurrentUser, currentUser, currentUserPermissions, setCurrentUserPermissions } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      const getPermissions = async () => {
        const docRef = doc(db, `users/${currentUser?.uid}`);
        const info = await getDoc(docRef);
        const permissions = info.data();
        setCurrentUserPermissions(permissions);
      };

      getPermissions();
      setLoading(false);
    });
  }, []);


  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <BrowserRouter>
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
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
