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
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Category = (props) => {
  const [threeDotMenuVisiblity, setThreeDotMenuVisiblity] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  function showThreeDotsMenu() {
    setThreeDotMenuVisiblity(true);
  }
  function hideThreeDotsMenu() {
    setThreeDotMenuVisiblity(false);
  }
  function deleteHandler(e) {
    setThreeDotMenuVisiblity(false);
    setShowDeleteConfirm(true);
  }
  function hideDeleteConfirm() {
    setShowDeleteConfirm(false);
  }
  async function deleteCat(e) {
    let category_id = e.currentTarget.closest("li[id]");
    let id = category_id.getAttribute("id").replace("category", "");
    let name = category_id.childNodes[0].textContent;
    console.log("name of cat to del: ", name);
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: props.token,
    };
    console.log("id to delete: ", id);
    let cat_detail_url = category_detail_url.replace("0", id);
    let response = await axios.delete(cat_detail_url, { id: id }, { headers });
    console.log("resp after del: ", response);
    if (response.status == 204) {
      props.onDelete(id, name);
    }
    hideDeleteConfirm();
  }
  // function toggleDeleteConfirmation() {
  //   setShowDeleteConfirm((prevState) => {
  //     return !prevState;
  //   });
  // }
  return (
    <li
      id={"category" + `${props.id}`}
      key={props.id}
      className={props.className}
    >
      <span>{props.categoryName}</span>
      {<ThreeDots className={classes.threeDot} onClick={showThreeDotsMenu} />}
      {threeDotMenuVisiblity == true && (
        <>
          {/* <FontAwesomeIcon icon="fa-solid fa-triangle" style={{color:'red'}}/> */}
          <Modal
            className={`${tclasses.threeDotMenuModal}`}
            onClose={hideThreeDotsMenu}
            backDropclass={modelClasses.transparentBackdrop}
          >
            
            <div className={tclasses.threeDotMenu}>
              <FontAwesomeIcon
                icon={solid("caret-up")}
              />
              <ul>
                <li>Edit</li>
                <hr />
                <li onClick={deleteHandler}>Delete</li>
              </ul>
            </div>
          </Modal>
        </>
      )}
      {showDeleteConfirm == true && (
        <Modal onClose={hideDeleteConfirm}>
          <p>Are you sure you want to delete this category?</p>
          <div className={btnClasses.btnGroup}>
            <Button onClick={deleteCat}>Yes</Button>
            <Button onClick={hideDeleteConfirm}>No</Button>
          </div>
        </Modal>
      )}
    </li>
  );
};

export default Category;
