import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import Logo from "../UI/Logo";
import Button from "../UI/Button";

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.logoItem}>
          <li>
            <NavLink to="/home/">
              <Logo />
            </NavLink>
          </li>
        </ul>
        {props.loginStatus === true && (
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : null)}
                to="/home/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : null)}
                to="/products/"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : null)}
                to="/categories/"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-sell/">
                <Button>New Sell</Button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/log-out/">
                <Button>Log Out</Button>
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
