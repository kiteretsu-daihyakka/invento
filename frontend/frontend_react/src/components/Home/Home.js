import React from 'react';
import classes from './Home.module.css'
import Logo from "../UI/Logo"
import AboutUs from "./AboutUs"
import Actions from "./Actions"
import MainHeader from '../Header/MainHeader';

const Home = (props) => {
  return <React.Fragment>
    {/* <MainHeader/> */}
    {/* <Logo/> */}
    <AboutUs/>
    {props.loginStatus === false && <Actions/>}
  </React.Fragment>;
};
export default Home;
