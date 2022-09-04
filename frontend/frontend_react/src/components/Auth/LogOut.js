import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const LogOut = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    props.onLogOut(false,'','')
    navigate("/home/");
  }, []);
};
export default LogOut;