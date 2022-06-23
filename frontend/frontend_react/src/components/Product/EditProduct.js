import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import { useState } from "react";
import Modal from "../UI/Modal";
import axios from "axios";

const EditProduct = (props) => {
  let id = props.id;
  const [name, setName] = useState(props.productName);
  const [price, setPrice] = useState(props.price);
  const [category, setCategory] = useState(props.cat);
  let nekota = localStorage.getItem("nekota");

  const onSaveHandler = (e) => {
    e.preventDefault();
    let newProductName = name.trim();
    let newPrice = price.trim();
    let newCat = category;
    if (newProductName.length > 0) {
      EditCat(props.productID, newProductName, newPrice, newCat);
    }
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  async function EditCat(id, name, price, category) {
    console.log({ nekota });
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: nekota,
    };
    console.log("id to edit: ", id);
    let cat_detail_url = product_detail_url.replace("0", id);
    let response = await axios.put(cat_detail_url, { id, name , price, category}, { headers });
    console.log("resp after edit: ", response);
    if (response.status == 200) {
      props.onEdit(id, name , price, category);
    } else {
      console.log(
        "Failed to update product name, please try again after some time.."
      );
    }
  }
  
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.input}>
        <form onSubmit={onSaveHandler}>
          <label htmlFor="name">Edit Product Name</label>
          <input
            type="text"
            id="updateName"
            value={name}
            onChange={nameChangeHandler}
          />
          <label htmlFor="price">Edit Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={priceChangeHandler}
          />
          <label htmlFor="category">Change Category</label>
          <input
            type="category"
            id="category"
            value={category}
            onChange={categoryChangeHandler}
          />
          <Button type="submit" onClick={props.onSaveHandler}>
            Save
          </Button>
          <Button
            type="button"
            className={btnClasses.paddingLeft}
            onClick={props.onClose}
          >
            Close
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default EditProduct;
