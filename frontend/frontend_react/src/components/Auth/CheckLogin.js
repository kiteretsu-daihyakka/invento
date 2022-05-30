import {React, useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
import {Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'

const CheckLogin = () => {
    let navigate = useNavigate();

    const fetchLoginStatus = useCallback(async () => {
        const response = await fetch(checkLoginURL);
        const data = await response.json();
        console.log('data: ',data);
        if(data.status == 200){
            console.log('user already logged in!');
            props.onSet(true);
            navigate("/add/employee");
        }else{
            console.log('user not logged in!');
            props.onSet(false);
            navigate("/home");
        }
    }, []);
    useEffect(() => {
        console.log('fetching login result..');
        fetchLoginStatus();
    },[fetchLoginStatus]);
}
export default CheckLogin