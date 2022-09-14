import React from 'react';
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import classes from '../UI/input.module.css'
import addClasses from './AddProduct.module.css'
import btnClasses from '../UI/Button.module.css'
import { useState, useRef, useEffect } from "react";
// import addProductAPI from './apis.js'

const AddProduct = (props) => {
    // const [appliedDD,setApplied] = useState(false);
    useEffect(() => {
      // if(appliedDD == false){
        $('#category-dd').select2();
        // setApplied(true);
      // }
    }, []);

    let name = useRef()
    let price = useRef()
    let stock = useRef()
    let category = useRef()
    const submitHandler = (e) => {
        e.preventDefault();
        let new_product = {
          'name':name.current.value.trim(),
          'price':price.current.value.trim(),
          'stock':stock.current.value.trim(),
          'category':category.current.value
        }
        if(new_product.name.length == 0){
          alert('Please Enter Product Name.')
          return
        }
        if(new_product.price.length == 0){
          alert('Please Enter Product Price.')
          return
        }
        if(new_product.category == -1){
          alert('Please Select Product Category.')
          return
        }
        if(new_product.stock.length == 0){
          alert('Please Enter Product Stock.')
          return
        }
        console.log({new_product})
        props.onAdd(new_product)
        onCloseHandler();
    }
    const onCloseHandler = () => {
      props.onClose()
    }
  return (
    <Modal className={classes.input} onClose={props.onClose}>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Enter Product Name</label>
        <input type="text" id="name" ref={name}/>
        <label htmlFor="price">Enter Price</label>
        <input type="number" id="price" ref={price}/>
        <label htmlFor="stock">Enter Stock</label>
        <input type="number" id="stock" defaultValue="0" ref={stock}/>
        <label htmlFor="category">Select Category</label>
        {/* <input type="category" id="category" value={category} onChange={categoryChangeHandler}/> */}
        <select name="category-dropdown" id="category-dd" ref={category}>
          <option value="-1">Select Category</option>
          {props.categories.map((cat) => (
            <option value={cat.id} key={cat.id}>{cat.name}</option>
          ))}
        </select>
        <div className={btnClasses.btnGroup}>
          <Button type="submit">Add Product</Button>
          <Button type="button" onClick={onCloseHandler} className={btnClasses.paddingLeft}>Close</Button>
        </div>
      </form>
    </Modal>
  );
};
export default AddProduct;
