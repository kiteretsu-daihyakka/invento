import React, { useState } from "react";
import classes from "../UI/Common.module.css";
import Modal from "../UI/Modal";
import modelClasses from "../UI/Modal.module.css";
import axios from "axios";
import Button from "../UI/Button";
import btnClasses from "../UI/Button.module.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   solid,
//   regular,
//   brands,
// } from "@fortawesome/fontawesome-svg-core/import.macro";

const Category = (props) => {
  const { id, categoryName: name } = props;

  function markCheck(e) {
    if (e.target.checked == true) {
      props.selectedList({ id, name });
    } else {
      props.removeFromSelectedList(id);
    }
  }
  return (
    <li id={`category${id}`} key={id} className={props.className}>
      <span>
        <input type="checkbox" onClick={markCheck} />
      </span>
      <span>{name}</span>
    </li>
  );
};

export default Category;
