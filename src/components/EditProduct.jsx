import React from "react";
import { useState, useEffect } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";

import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    getProductByID(id);
  }, []);

  const getProductByID = async (id) => {
    const product = await getDoc(doc(db, "products", id));
    if (product.exists()) {
      setTitle(product.data().name);
      setDescription(product.data().comment);
      setQuantity(product.data().quantity);
    } else {
      console.log("producto no existe");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = doc(db, "products", id);
    const newData = {
      name: title,
      comment: description,
      quantity: quantity,
    };
    await updateDoc(product, newData);
    navigate("/");
  };

  return (
    <div className="container-list">
      <h1>Create new Product</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <div>
          <label> Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor=""> Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor=""> Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <button className="btn gr" type="submit">
            Save
          </button>
          <Link className="btn cancel" to="/">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
