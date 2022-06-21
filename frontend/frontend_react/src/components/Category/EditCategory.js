import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import { useState } from "react";
import Modal from "../UI/Modal";
import axios from "axios";

const EditCategory = (props) => {
  const [name, setName] = useState(props.categoryName);
  const onSaveHandler = (e) => {
    e.preventDefault();
    let newCategoryName = name;
    props.onEdit(newCategoryName);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.input}>
        <form onSubmit={onSaveHandler}>
          <label htmlFor="name">Edit Category Name</label>
          <input
            type="text"
            id="updateName"
            value={name}
            onChange={nameChangeHandler}
          />
          <Button type="button" onClick={props.onSaveHandler}>
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
export default EditCategory;
