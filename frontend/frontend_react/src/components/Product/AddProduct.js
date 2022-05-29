import React from 'react';
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from './AddProduct.module.css'
import btnClasses from '../UI/Button.module.css'
import { useState } from "react";
// import addProductAPI from './apis.js'

const AddProduct = (props) => {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
        let new_product = {
            'name':name,
            'price':price,
            'category':category
        }

        props.onAdd(new_product)
        setName('')
        setPrice('')
        setCategory('')
    }
    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const priceChangeHandler = (e) => {
        setPrice(e.target.value)
    }
    const categoryChangeHandler = (e) => {
        setCategory(e.target.value)
    }
    const onCloseHandler = () => {
      props.onClose()
    }
  return (
    <Card className={classes.input}>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Enter Product Name</label>
        <input type="text" id="name" value={name} onChange={nameChangeHandler}/>
        <label htmlFor="price">Enter Price</label>
        <input type="number" id="price" value={price} onChange={priceChangeHandler}/>
        <label htmlFor="category">Select Category</label>
        <input type="category" id="category" value={category} onChange={categoryChangeHandler}/>
        <Button type="submit">Add Product</Button>
        <Button type="button" onClick={onCloseHandler} className={btnClasses.paddingLeft}>Close</Button>
      </form>
    </Card>
  );
};
export default AddProduct;
