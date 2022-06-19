import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import classes from "./ThreeDots.module.css";

const ThreeDots = (props) => {
  return (
    <Button className={`${props.className}`} type={props.type} onClick={props.onClick}>
      <FontAwesomeIcon
        icon={solid("ellipsis")}
        style={{ fontSize: "25px" }}
      />
    </Button>
  );
};
export default ThreeDots;
