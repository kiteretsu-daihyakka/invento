import React from 'react';
import Button from "./Button";
import Card from "./Card";
import classes from './ErrorModal.module.css'

const ErrorModal = (props) => {
  return (
    <Card className={classes.modal}>
      <header>
        <h2>{props.title}</h2>
      </header>
      <div>
        <p>{props.message}</p>
      </div>
      <footer>
        <Button>Okay</Button>
      </footer>
    </Card>
  );
};
export default ErrorModal;
