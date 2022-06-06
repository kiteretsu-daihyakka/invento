import React, {useState} from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Products from "./components/Product/Products";
import Home from "./components/Home/Home";
import MainHeader from "./components/Header/MainHeader";
import Categories from "./components/Category/Categories";
import CheckLogin from "./components/Auth/CheckLogin";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import NotFound from './components/Helpers/NotFound'


function App() {
  const [loginStatus, setLoggedInStatus] = useState(false);
  function onLoginCheck(result) {
    setLoggedInStatus(result)
  }
  return (
    <React.Fragment>
      {loginStatus == true && <MainHeader />}
      <Routes>
        <Route path="" element={<CheckLogin onCheck={onLoginCheck}/>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp onSuccessfullSignedIn={onLoginCheck}/>} />
        <Route path="home" element={<Home />} />
        <Route path="products" excat element={<Products />} />
        <Route path="categories" excat element={<Categories />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
