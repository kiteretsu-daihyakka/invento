import React from "react";
import Card from "./Card";
import classes from "./Modal.module.css";

const Modal = (props) => {
    function onBackdropClickHandler (){
        props.onClose()
    }
  return (
    <>
      <div className={classes.backdrop} onClick={onBackdropClickHandler}></div>
      <Card className={classes.modal}>{props.children}</Card>
    </>
  );
};

export default Modal;
