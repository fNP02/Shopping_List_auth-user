import React from "react";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Link } from "react-router-dom";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const productsCollection = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    // console.log(data.docs.map((doc)=> ({...doc.data(), id:doc.id})));
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  const confirmDelete = (id) => {
    mySwal
      .fire({
        title: "Remove the product?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          //funcion para eliminar
          deleteProduct(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container-div">
      <div className="headers">
        <h1>Products List</h1>
        <Link className="btn btt" to="/create-new-product">
          + New Product
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Comentario</th>
            <th>Editar</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.comment}</td>
              <td className="buttons">
                <Link
                  to={`/edit-id:/${product.id}`}
                  className="btn fa-regular fa-pen-to-square"
                ></Link>
                <button
                  className="btn fa-solid fa-trash"
                  onClick={() => confirmDelete(product.id)}
                ></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
