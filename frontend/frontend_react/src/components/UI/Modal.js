import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";

const Backdrop = props => {
  function onBackdropClickHandler (){
    props.onClose()
  }
  return <div className={`${classes.backdrop} ${props.backDropclass}`} onClick={onBackdropClickHandler}></div>
}
const ModalOverlay = props => {
  return <Card className={`${classes.modal} ${props.className}`}>{props.children}</Card>
}
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} backDropclass={props.backDropclass}/>, document.getElementById('backdrop'))}
      {ReactDOM.createPortal(<ModalOverlay className={props.className} children={props.children}/>, document.getElementById('overlay'))}
    </React.Fragment>
  );
};

export default Modal;
