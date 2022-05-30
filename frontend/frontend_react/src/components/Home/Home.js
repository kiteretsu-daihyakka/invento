import React from 'react';
import classes from './Home.module.css'
import Logo from "../UI/Logo"
import AboutUs from "./AboutUs"
import Actions from "./Actions"

const Home = (props) => {
  return <React.Fragment>
    <Logo/>
    <AboutUs/>
    <Actions/>
  </React.Fragment>;
};
export default Home;
