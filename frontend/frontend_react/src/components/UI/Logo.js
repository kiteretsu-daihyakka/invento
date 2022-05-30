import React from "react";
import classes from "./Logo.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import TitleBig from "./Titles/TitleBig";


const Logo = () => {
  return (
    <div className={classes.logo}>
      <TitleBig>
        Invento
        <FontAwesomeIcon
          icon={solid("clipboard-list")}
          className={classes.logoIcon}
        />
      </TitleBig>
    </div>
  );
};
export default Logo
