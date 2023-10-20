import React from "react";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

export const CreateProduct = () => {
  const productsCollection = collection(db, "products");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const infoToAdd = {
    //   title: title,
    //   description: description,
    //   quantity: quantity,
    // };
    const infoToAdd = {
      name: title,
      comment: description,
      quantity: quantity,
    };
    await addDoc(productsCollection, infoToAdd);
    navigate("/");
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState('');

  return (
    <div className="container-div">
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
          <button className="btn gr" type="submit"> Create</button>
          <Link className="btn cancel" to='/'>Cancel</Link>
        </div>
      </form>
    </div>
  );
};
