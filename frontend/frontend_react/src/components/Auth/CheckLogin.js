import {React, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom'

const CheckLogin = (props) => {
    let navigate = useNavigate();

    const fetchLoginStatus = useCallback(async () => {
        try {
            const response = await axios(checkLoginUrl);
            const data = await response.json();
            console.log('data: ',data);
            if(data.status == 200){
                console.log('user already logged in!');
                props.onCheck(true);
                navigate("/add/employee");
            }
        } catch (error) {
            if(error.response.status == 401){
                console.log('user not logged in!');
                props.onCheck(false);
                navigate("/home");
            }else{
                console.log('something went wrong, please try again.');
            }
        }
        
    }, []);
    useEffect(() => {
        console.log('fetching login result..');
        fetchLoginStatus();
    },[fetchLoginStatus]);
}
export default CheckLogin