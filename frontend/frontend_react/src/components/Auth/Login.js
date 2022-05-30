import React, {useRef} from "react";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import btnClasses from "../UI/Button.module.css";
import {useNavigate} from "react-router-dom";
import TitleMedium from "../UI/Titles/TitleMedium";
import Card from "../UI/Card"


const Login = (props) => {
    const usrnm = useRef();
    const pswd = useRef();
    async function onSubmitHandler(e) {
        e.preventDefault();
        let uname = usrnm.current.value; 
        let pass = pswd.current.value;
        if (uname.trim().length > 0 && pass.trim().length > 0){
            let creds = {'username':uname, 'password':pass}
            let response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': csrfToken
                },
                body: JSON.stringify(creds)
            });
            const data = await response.json();
            console.log('data: ',data);
            if(data.status == 200){
                console.log('user logged in!');
                props.onSuccessfullLogin();
            }else{
                console.log('user could not logged in, some error occured..');
            }
        }
    }

    return <Card className={classes.input}>
        {/* <TitleMedium>Login</TitleMedium> */}
        <form onSubmit={onSubmitHandler}>
            <label>Enter Username</label>
            <input type='text' ref={uname}/>
            <label>Enter Password</label>
            <input type='password' ref={pswd}/>
            <Button>Login</Button>
        </form>
    </Card>
}
export default Login