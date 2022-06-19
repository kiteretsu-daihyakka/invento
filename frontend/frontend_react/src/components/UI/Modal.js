import React from "react";
import Card from "./Card";
import classes from "./Modal.module.css";

const Modal = (props) => {
    function onBackdropClickHandler (){
        props.onClose()
    }
  return (
    <>
      <div className={`${classes.backdrop} ${props.backDropclass}`} onClick={onBackdropClickHandler}></div>
      <Card className={`${classes.modal} ${props.className}`}>{props.children}</Card>
    </>
  );
};

export default Modal;
