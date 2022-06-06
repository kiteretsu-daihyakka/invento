import React from "react";
import Button from "../UI/Button";
import TitleBig from "../UI/Titles/TitleBig";
import classes from "./Actions.module.css";
import btnClasses from "../UI/Button.module.css";
import {useNavigate} from "react-router-dom";

const Actions = () => {
    let navigate = useNavigate();
    function loginRedirect(){
        navigate('/login');
    }
    function signUpRedirect(){
        navigate('/signup');
    }
    return <React.Fragment>
        <TitleBig>Let's Get Started!</TitleBig>
        <div className={btnClasses.btnGroup}>
            <Button onClick={loginRedirect}>Login</Button>
            <span className={btnClasses.or}>&nbsp;Or&nbsp;</span>
            <Button onClick={signUpRedirect}>SignUp</Button>
        </div>
    </React.Fragment>
}
export default Actions;