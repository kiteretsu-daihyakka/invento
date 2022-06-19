import React, {useRef} from "react";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import inptCls from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import {useNavigate} from "react-router-dom";
import TitleMedium from "../UI/Titles/TitleMedium";
import Card from "../UI/Card"
import axios from "axios";

const Login = (props) => {
    const navigate = useNavigate();
    const usrnm = useRef();
    const pswd = useRef();
    async function onSubmitHandler(e) {
        e.preventDefault();
        let uname = usrnm.current.value; 
        let pass = pswd.current.value;
        if (uname.trim().length > 0 && pass.trim().length > 0){
            let creds = {'username':uname, 'password':pass}
            const headers = {"Content-Type": 'application/json'}
            // let response = await axios.post(loginUrl,creds,{headers});
            let response = await axios.post(anotherLoginUrl,creds,{headers});
            console.log('response after login: ',response);
            // console.log('token after login: ',response.data.token);
            if(response.status == 200){
                console.log('user logged in!');
                props.onSuccessfullLogin(true,response.data.token);
            }else{
                console.log('user could not logged in, some error occured..');
            }
        }
    }

    return <Card className={inptCls.input}>
        {/* <TitleMedium>Login</TitleMedium> */}
        <form onSubmit={onSubmitHandler}>
            <label>Enter Username</label>
            <input type='text' ref={usrnm}/>
            <label>Enter Password</label>
            <input type='password' ref={pswd}/>
            <Button>Login</Button>
        </form>
    </Card>
}
export default Login