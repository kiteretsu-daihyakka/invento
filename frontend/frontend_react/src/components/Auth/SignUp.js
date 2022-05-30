import React, {useRef} from "react";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import inptCls from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import {useNavigate} from "react-router-dom";
import TitleMedium from "../UI/Titles/TitleMedium";
import Card from "../UI/Card"

const SignUp = (props) => {
    const businessNameRef = useRef();
    const unameRef = useRef();
    const pswdRef = useRef();

    async function onSubmitHandler(e) {
        e.preventDefault();
        let busName = businessNameRef.current.value; 
        let uname = unameRef.current.value; 
        let pass = pswdRef.current.value;
        if (busName.trim().length > 0 && uname.trim().length > 0 && pass.trim().length > 0){
            let details = {'name':busName, 'username':uname, 'password':pass}
            let response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': csrfToken
                },
                body: JSON.stringify(details)
            });
            const data = await response.json();
            console.log('data: ',data);
            if(data.status == 201){
                console.log('user signed in!');
                props.onSuccessfullSignedIn();
            }else{
                console.log('user could not signed in, some error occured..');
            }
        }
    }

    return <Card className={inptCls.input}>
        {/* <TitleMedium>SignUp</TitleMedium> */}
        <form onSubmit={onSubmitHandler}>
            <label>What's Your Business Name?</label>
            <input type='text' ref={uname}/>
            <label>Create Username</label>
            <input type='text' ref={uname}/>
            <label>Create Password</label>
            <input type='password' ref={pswd}/>
            <Button>SignUp</Button>
        </form>
    </Card>
}
export default SignUp