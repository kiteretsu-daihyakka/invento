import React, { useState } from "react";
import ThreeDots from "../UI/ThreeDots";
import classes from "../UI/Common.module.css";
import tclasses from "../UI/ThreeDots.module.css";
import Modal from "../UI/Modal";
import modelClasses from "../UI/Modal.module.css";
import axios from "axios";
import Button from "../UI/Button";
import btnClasses from "../UI/Button.module.css";
import EditCategory from "./EditCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Category = (props) => {
  const [threeDotMenuVisiblity, setThreeDotMenuVisiblity] = useState(false);
  const [catToOperate, setCatToOperate] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  function showThreeDotsMenu(e) {
    let category_id = e.currentTarget.closest("li[id]");
    let id = category_id.getAttribute("id").replace("category", "");
    let name = category_id.childNodes[0].textContent;
    setCatToOperate({id,name});
    // console.log('cat to operate: ',catToOperate);
    setThreeDotMenuVisiblity(true);
  }
  function hideThreeDotsMenu() {
    setThreeDotMenuVisiblity(false);
  }
  function deleteHandler() {
    console.log('clicked on delete.')
    hideThreeDotsMenu();
    setShowDeleteConfirm(true);
  }
  function showEditCategoryModal() {
    hideThreeDotsMenu();
    setShowEditCategory(true);
  }
  function onEditHandler(newCategoryName) {
    // setShowEditCategory(true);
    console.log({newCategoryName});
    setShowEditCategory(false);
  }
  function hideEditCategoryModal() {
    setShowEditCategory(false);
  }
  function hideDeleteConfirm() {
    setShowDeleteConfirm(false);
  }
  async function deleteCat() {
    let id = catToOperate.id;
    let name = catToOperate.name;
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
      {<ThreeDots className={`${classes.threeDot}`} onClick={showThreeDotsMenu} />}
      {threeDotMenuVisiblity == true && (
        <>
          {/* <FontAwesomeIcon icon="fa-solid fa-triangle" style={{color:'red'}}/> */}
          <Modal
            className={`${tclasses.threeDotMenuModal}`}
            onClose={hideThreeDotsMenu}
            backDropclass={modelClasses.transparentBackdrop}
          >
            <div className={tclasses.threeDotMenuAndCarretIcon}>
              <FontAwesomeIcon
                icon={solid("caret-up")}
              />
              <ul className={tclasses.threeDotMenu}>
                <li><Button onClick={showEditCategoryModal}>Edit</Button></li>
                <hr />
                <li onClick={deleteHandler}><Button>Delete</Button></li>
              </ul>
            </div>
          </Modal>
        </>
      )}
      {showDeleteConfirm == true && (
        <Modal className={modelClasses.confirmationModal} onClose={hideDeleteConfirm}>
          <p>Delete <strong>{props.categoryName}</strong> category?</p>
          <div className={btnClasses.btnGroup}>
            <Button onClick={deleteCat}>Yes</Button>
            &nbsp;
            <Button onClick={hideDeleteConfirm}>No</Button>
          </div>
        </Modal>
      )}
      {showEditCategory == true && (
        <EditCategory onEdit={onEditHandler} onClose={hideEditCategoryModal} categoryName={props.categoryName}/>
      )}
    </li>
  );
};

export default Category;
