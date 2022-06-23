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
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Product = (props) => {
  const [threeDotMenuVisiblity, setThreeDotMenuVisiblity] = useState(false);
  const [prodToOperate, setProdToOperate] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);

  function showThreeDotsMenu(e) {
    let product_id = e.currentTarget.closest("li[id]");
    let id = product_id.getAttribute("id").replace("product", "");
    let name = product_id.childNodes[0].textContent;
    setProdToOperate({ id, name });
    console.log("prod to operate: ", prodToOperate.id, prodToOperate.name);
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
  function hideDeleteConfirm() {
    setShowDeleteConfirm(false);
  }
  function deleteHandler() {
    console.log("clicked on delete.");
    hideThreeDotsMenu();
    setShowDeleteConfirm(true);
  }
  async function deleteProd() {
    let id = prodToOperate.id;
    let name = prodToOperate.name;
    const headers = {
      "Content-type": "appliprodion/json; charset=UTF-8",
      Authorization: props.token,
    };
    console.log("id to delete: ", id);
    let prod_detail_url = product_detail_url.replace("0", id);
    let response = await axios.delete(prod_detail_url, { id: id }, { headers });
    console.log("resp after del: ", response);
    if (response.status == 204) {
      props.onDelete(id, name);
    }
    hideDeleteConfirm();
  }
  return (
    <li id={props.id} key={props.id} className={props.className}>
      {/* {props.name} {props.stock} {props.amount} */}

      <span>
        {props.name} ({props.category}) {parseInt(props.price)} Rs.
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
      {showDeleteConfirm == true && (
        <Modal
          className={modelClasses.confirmationModal}
          onClose={hideDeleteConfirm}
        >
          <p>
            Delete <strong>{props.name}</strong> product?
          </p>
          <div className={btnClasses.btnGroup}>
            <Button onClick={deleteProd}>Yes</Button>
            &nbsp;
            <Button onClick={hideDeleteConfirm}>No</Button>
          </div>
        </Modal>
      )}
      {showEditProduct == true && (
        <EditProduct
          onEdit={onEditHandler}
          onClose={hideEditProductModal}
          productName={props.name}
          productID={prodToOperate.id}
          price={props.price}
          cat={props.category}
        />
      )}
    </li>
  );
};

export default Product;
