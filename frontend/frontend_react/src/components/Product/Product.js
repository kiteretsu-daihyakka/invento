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
import prdctClasses from "./Product.module.css";

const Product = (props) => {
  const { id, name, price, category, categories } = props;
  console.log("categories: ", categories);
  function markCheck(e) {
    if (e.target.checked == true) {
      props.selectedList({ id, name, price, category });
    } else {
      props.removeFromSelectedList(id);
    }
  }
  return (
    <React.Fragment>
      <tr id={`product${id}`} key={id} className={prdctClasses.productRow}>
        {/* {name} {props.stock} {props.amount} */}
        {/* <span> */}
        {/* {props.selectMode == true && ( */}
        <td>
          <input type="checkbox" onClick={markCheck} />
        </td>
        {/* )} */}
        <td className={prdctClasses.productdetail}>{name}</td>
        <td className={prdctClasses.productdetail}>{parseInt(price)} Rs.</td>
        <td className={prdctClasses.productdetail}>
          {categories.map((cat) => {
            if (cat.id == category) {
              return cat.name;
            }
          })}
        </td>
        {/* </span> */}
      </tr>
    </React.Fragment>
  );
};

export default Product;
