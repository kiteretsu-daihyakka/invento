import React, { useState } from "react";
import ThreeDots from "../UI/ThreeDots";
import classes from "../UI/Common.module.css";
import tclasses from "../UI/ThreeDots.module.css";
import Modal from "../UI/Modal";
import modelClasses from "../UI/Modal.module.css";
import axios from "axios";
import Button from "../UI/Button";
import btnClasses from "../UI/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Product = (props) => {
  const {id,name,price,category} = props;

  function markCheck(e) {
    if (e.target.checked == true) {
      props.selectedList({ id, name, price, category });
    } else {
      props.removeFromSelectedList(id);
    }
  }
  return (
    <li id={`product${id}`} key={id} className={props.className}>
      {/* {name} {props.stock} {props.amount} */}
      <span>
        {/* {props.selectMode == true && ( */}
        <span>
          <input type="checkbox" onClick={markCheck} />
        </span>
        {/* )} */}
        {name} ({category}) {parseInt(price)} Rs.
      </span>
    </li>
  );
};

export default Product;
