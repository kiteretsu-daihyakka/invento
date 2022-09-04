import React from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import TitleBig from "../UI/Titles/TitleBig";
import classes from "./NotFound.module.css";
import btnClasses from '../UI/Button.module.css';

const NotFound = () => {
  return (
    <>
      <TitleBig className={classes.whity}>404 - URL Not Found!</TitleBig>
      <Link to="/" className={btnClasses.btnAlone}>
        <Button>Go Home</Button>
      </Link>
    </>
  );
};

export default NotFound;
