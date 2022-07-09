import React, { useState } from "react";
import Modal from "../UI/Modal";
import modelClasses from "../UI/Modal.module.css";
import axios from "axios";
import Button from "../UI/Button";
import btnClasses from "../UI/Button.module.css";

const DeleteCategories = (props) => {
    let _catList = props.categories;
    console.log({_catList});
    let _catIDList = _catList.map((cat) => cat.id);
    async function deleteCat() {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: props.token,
        };
        // console.log("id to delete: ", id);
        // let cat_detail_url = category_detail_url.replace("0", id);
        let response = await axios.put(cat_multiDelete, _catIDList, { headers });
        console.log("resp after del: ", response);
        if (response.status == 204) {
          props.onDelete(_catIDList);
        }
        props.hideDeleteConfirm();
      }
  return (
    <Modal
      className={modelClasses.confirmationModal}
      onClose={props.hideDeleteConfirm}
    >
      <p>
          Delete<br/>
          <strong>
            {_catList.map((catDetail) => (
              <>
                {catDetail.name}
                {_catList.length > 1 && <br />}
              </>
            ))}
          </strong>{" "}
          Categor{_catList.length == 1 ? "y" : "ies"}?
        </p>
      <div className={btnClasses.btnGroup}>
        <Button onClick={deleteCat}>Yes</Button>
        &nbsp;
        <Button onClick={props.hideDeleteConfirm}>No</Button>
      </div>
    </Modal>
  );
};
export default DeleteCategories;
