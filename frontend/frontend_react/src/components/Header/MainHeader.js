import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import Logo from "../UI/Logo";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.logoItem}>
          <li >
            <NavLink activeClassName={classes.active} to="/home/">
              <Logo />
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/home/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/products/">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/categories/">
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
