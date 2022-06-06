import React from 'react';
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from '../UI/input.module.css'
import btnClasses from '../UI/Button.module.css'
import { useState } from "react";
// import addProductAPI from './apis.js'

const AddCategory = (props) => {
    const [name,setName] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
        let new_product = {
            'name':name,
        }
        props.onAdd(new_product)
        setName('')
    }
    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    const closeBtnHandler = () => {
      props.onClose();
    }
  return (
    <div className={classes.input}>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Enter Category Name</label>
        <input type="text" id="name" value={name} onChange={nameChangeHandler}/>
        <Button type='submit'>Add Category</Button>
        <Button type='button' className={btnClasses.paddingLeft} onClick={closeBtnHandler}>Close</Button>
      </form>
    </div>
  );
};
export default AddCategory;