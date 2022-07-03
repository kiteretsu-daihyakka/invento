import React, { useState } from "react";
import ThreeDots from "../UI/ThreeDots";
import classes from "../UI/Common.module.css";
import tclasses from "../UI/ThreeDots.module.css";
import Modal from "../UI/Modal";
import modelClasses from "../UI/Modal.module.css";
import axios from "axios";
import Button from "../UI/Button";
import btnClasses from "../UI/Button.module.css";
import EditProduct from "./EditProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Product = (props) => {
  const [threeDotMenuVisiblity, setThreeDotMenuVisiblity] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);

  const {id,name,price,category,categories} = props;
  // console.log({ id });
  function showThreeDotsMenu() {
    setThreeDotMenuVisiblity(true);
  }
  function hideThreeDotsMenu() {
    setThreeDotMenuVisiblity(false);
  }
  function showEditProductModal() {
    hideThreeDotsMenu();
    setShowEditProduct(true);
  }
  function onEditHandler(id, name, price, category) {
    // setShowEditProduct(true);
    // console.log({name});
    setShowEditProduct(false);
    props.onEdit(id, name, price, category);
  }
  function hideEditProductModal() {
    setShowEditProduct(false);
  }
  // function hideDeleteConfirm() {
  //   setShowDeleteConfirm(false);
  // }
  function deleteHandler() {
    hideThreeDotsMenu();
    props.selectedList({ id, name });
    props.setShowDeleteConfirm(true);
  }

  function markCheck(e) {
    if (e.target.checked == true) {
      props.selectedList({ id, name });
    } else {
      props.removeFromSelectedList({ id, name });
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
      {
        <ThreeDots
          className={`${classes.threeDot}`}
          onClick={showThreeDotsMenu}
        />
      }
      {threeDotMenuVisiblity == true && (
        <>
          {/* <FontAwesomeIcon icon="fa-solid fa-triangle" style={{color:'red'}}/> */}
          <Modal
            className={`${tclasses.threeDotMenuModal}`}
            onClose={hideThreeDotsMenu}
            backDropclass={modelClasses.transparentBackdrop}
          >
            <div className={tclasses.threeDotMenuAndCarretIcon}>
              <FontAwesomeIcon icon={solid("caret-up")} />
              <ul className={tclasses.threeDotMenu}>
                <li>
                  <Button onClick={showEditProductModal}>Edit</Button>
                </li>
                <hr />
                <li onClick={deleteHandler}>
                  <Button>Delete</Button>
                </li>
              </ul>
            </div>
          </Modal>
        </>
      )}
      {showEditProduct == true && (
        <EditProduct
          onEdit={onEditHandler}
          onClose={hideEditProductModal}
          productName={name}
          productID={id}
          price={price}
          cat={category}
          categories={categories}
        />
      )}
    </li>
  );
};

export default Product;
