import React, { useRef, useCallback } from "react";
import axios from "axios";
import Button from "../UI/Button";
import classes from "./Login.module.css";
import inptCls from "../UI/input.module.css";
import btnClasses from "../UI/Button.module.css";
import { useNavigate } from "react-router-dom";
import TitleMedium from "../UI/Titles/TitleMedium";
import Card from "../UI/Card";

const SignUp = (props) => {
  const navigate = useNavigate();
  const businessNameRef = useRef();
  const unameRef = useRef();
  const pswdRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const busName = businessNameRef.current.value;
    let uname = unameRef.current.value;
    let pass = pswdRef.current.value;
    // console.log(busName);
    // console.log(uname);
    // console.log(pass);
    if (
      busName.trim().length > 0 &&
      uname.trim().length > 0 &&
      pass.trim().length > 0
    ) {
      const details = { name: busName, username: uname, password: pass };
      console.log("data to be sent:", details);
      let response = await axios.post(signupUrl,details, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-CSRFTOKEN": csrfToken,
        },
      });
      // let data = await resp;
      console.log("response: ", response);
      if (response.status == 201) {
        console.log("user signed in!");
        props.onSuccessfullSignedIn(true,uname,response.data.token);
      } else {
        console.log("user could not signed in, some error occured..");
        props.onSuccessfullSignedIn(false);
      }
      // }).then((err) => {
      //   console.log("user could not signed in, following error occured..");
      //   console.log("errors:", err);
      // });
    }
  };

  return (
    <Card className={inptCls.input}>
      {/* <TitleMedium>SignUp</TitleMedium> */}
      <form onSubmit={onSubmitHandler}>
        <label>What's Your Business Name?</label>
        <input type="text" ref={businessNameRef} />
        <label>Create Username</label>
        <input type="text" ref={unameRef} />
        <label>Create Password</label>
        <input type="password" ref={pswdRef} />
        <Button>SignUp</Button>
      </form>
    </Card>
  );
};
export default SignUp;
