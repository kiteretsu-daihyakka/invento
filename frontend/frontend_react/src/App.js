import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Products from "./components/Product/Products";
import Home from "./components/Home/Home";
import MainHeader from "./components/Header/MainHeader";
import Categories from "./components/Category/Categories";
import CheckLogin from "./components/Auth/CheckLogin";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <React.Fragment>
      <MainHeader />
      <Routes>
        <Route path="" element={<CheckLogin />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<Home />} />
        <Route path="products" excat element={<Products />} />
        <Route path="categories" excat element={<Categories />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
