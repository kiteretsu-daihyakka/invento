import React from 'react';
import classes from './Home.module.css'
import Logo from "../UI/Logo"
import AboutUs from "./AboutUs"
import Actions from "./Actions"
import MainHeader from '../Header/MainHeader';
import Welcome from './Welcome';

const Home = (props) => {
  document.title = "Home"
  return <React.Fragment>
    {/* <MainHeader/> */}
    {/* <Logo/> */}
    <AboutUs uname={props.uname}/>
    {props.loginStatus === false && <Actions/>}
  </React.Fragment>;
};
export default Home;
