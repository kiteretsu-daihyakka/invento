import React from "react";
import classes from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState } from "react";
import axios from "axios";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import TitleBig from "../UI/Titles/TitleBig";
import modalClasses from "../UI/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import listClasses from '../UI/Lists.module.css';
import { useNavigate } from "react-router-dom";

const InvoiceMode = () => {
  const navigate = useNavigate();
  let nekota = localStorage.getItem("nekota");
  const [invoiceAutoMode, setInvoiceAutoMode] = useState(true);
  function setInvoiceMode(e) {
    if (e.target.value == "auto") {
      setInvoiceAutoMode(true);
    } else {
      setInvoiceAutoMode(false);
    }
  }
  function onCloseHandler() {
    window.history.back();
  }
  async function uploadImage() {
    // code to upload image
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: nekota,
    };
    var formData = new FormData();
    var imagefile = document.querySelector("#fileUploaded");
    formData.append("image", imagefile.files[0]);
    let response = await axios.put(sell_img_url, formData, { headers });
    console.log("resp after upload: ", response);
  }
  function continueHandler() {
    if (invoiceAutoMode) {
      // to select image
      document.getElementById("fileUploaded").click();
    }
    navigate('/order-summary/');
  }
  function onImageSelectHandler(e) {
    if (e.target.value.length > 0) {
      uploadImage();
    }
  }
  return (
    <Modal onClose={onCloseHandler}>
      <div>
        <TitleBig className={modalClasses.textFormat1}>Add New Sell</TitleBig>
        <ul className={listClasses.ulist}>
          <li>
            <input
              type="radio"
              id="clickphoto"
              name="invoice_mode"
              value="auto"
              onClick={setInvoiceMode}
              defaultChecked
            />
            <label htmlFor="clickphoto">
              Click Photo &nbsp;
              <FontAwesomeIcon
                icon={solid("camera")} //<i class="fa-solid fa-camera"></i>
                // className={classes.logoIcon}
              />
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="manually"
              name="invoice_mode"
              value="manual"
              onClick={setInvoiceMode}
            />
            <label htmlFor="manually">Manually</label>
          </li>
        </ul>
      </div>
      <div className={btnClasses.btnGroup}>
        <input
          type="file"
          accept="image/*;capture=camera"
          id="fileUploaded"
          onChange={onImageSelectHandler}
          hidden
        />
        <Button type="button" onClick={continueHandler}>
          Continue
        </Button>
        <Button
          type="button"
          onClick={onCloseHandler}
          className={btnClasses.paddingLeft}
        >
          Close
        </Button>
      </div>
      <br />
    </Modal>
  );
};
export default InvoiceMode;
