import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import { useState, useEffect, useRef } from "react";
import Modal from "../UI/Modal";
import axios from "axios";

const EditProduct = (props) => {
  useEffect(() => {
    $("#category-dd").select2();
  }, []);

  const [name,setName] = useState(props.productName);
  const [price,setPrice] = useState(props.price);
  const [stock,setStock] = useState(props.stock);
  const category = props.cat;
  // const [category,setCategory] = useState(props.cat);
  const categoryRef = useRef();
  let nekota = localStorage.getItem("nekota");

  const onSaveHandler = (e) => {
    e.preventDefault();
    let new_product = {
      id: props.productID,
      name: name.trim(),
      price: price.trim(),
      stock: stock.toString().trim(),
      category: categoryRef.current.value
    };
    if (new_product.name.length == 0) {
      alert("Please Enter Product Name.");
      return;
    }
    if (new_product.price.length == 0) {
      alert("Please Enter Product Price.");
      return;
    }
    if (new_product.stock.length == 0) {
      alert("Please Enter Product Stock.");
      return;
    }
    if (new_product.category == -1) {
      alert("Please Select Product Category.");
      return;
    }
    console.log({ new_product });
    EditProd(new_product);
    props.onClose();
  };

  async function EditProd(new_product) {
    console.log({new_product});
    const {id, name, price, stock, category} = new_product;
    console.log({ nekota });
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: nekota,
    };
    console.log("id to edit: ", id);
    let cat_detail_url = product_detail_url.replace("0", id);
    let response = await axios.put(
      cat_detail_url,
      { id, name, price, stock, category },
      { headers }
    );
    console.log("resp after edit: ", response);
    if (response.status == 200) {
      props.onEdit(new_product);
    } else {
      console.log(
        "Failed to update product name, please try again after some time.."
      );
    }
  }
  function onNameChange(e){
    setName(e.target.value);
  }
  function onPriceChange(e){
    setPrice(e.target.value);
  }
  function onStockChange(e){
    setStock(e.target.value);
  }
  // function onCategoryChange(e){
  //   console.log('cat dd:',e.target.value)
  //   setCategory(e.target.value);
  // }
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.input}>
        <form onSubmit={onSaveHandler}>
          <label htmlFor="name">Edit Product Name</label>
          <input
            type="text"
            id="updateName"
            value={name}
            onChange={onNameChange}
          />
          <label htmlFor="price">Edit Price</label>
          <input type="number" id="price" value={price} onChange={onPriceChange}/>
          <label htmlFor="stock">Edit Stock</label>
          <input type="number" id="stock" value={stock} onChange={onStockChange}/>
          <label htmlFor="category">Change Category</label>
          {/* <input type="category" id="category" value={props.cat} ref={category}/> */}
          <select name="category-dropdown" id="category-dd" ref={categoryRef}>
            <option value="-1">Select Category</option>
            {props.categories.map((cat) => {
              if (cat.id == category) {
                // console.log(cat.id,' ',props.cat)
                return (
                  <option value={cat.id} key={cat.id} selected>
                    {cat.name}
                  </option>
                );
              } else {
                return (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                );
              }
            })}
          </select>
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
