import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Products from "./components/Product/Products";
import Home from "./components/Home/Home";
import MainHeader from "./components/Header/MainHeader";
import Categories from "./components/Category/Categories";
import CheckLogin from "./components/Auth/CheckLogin";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import NotFound from "./components/Helpers/NotFound";
import InvoiceMode from "./components/Sell/InvoiceMode";
import axios from "axios";
import LogOut from "./components/Auth/LogOut";
import InvoiceForm from "./components/Sell/InvoiceForm";

function App() {
  let navigate = useNavigate();
  const [present, setPresent] = useState("/categories/");
  const [loginStatus, setLoggedInStatus] = useState(
    localStorage.getItem("logStat") === "true"
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("nekota"));
  const [username, setUsername] = useState(localStorage.getItem("uname"));
  const [categories, setCategories] = useState(false);
  const [products, setProducts] = useState([]);
    
  function onLoginCheck(result, uname, token) {
    setLoggedInStatus(result);
    setUsername(uname);
    setAuthToken(token);
    if (result == true) {
      setTimeout(() => {
        navigate(present);
      }, 1000);
    }
  }
  async function loadCategories(){
    //categories
    let cat_data = await axios.get(categories_url, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Token " + localStorage.getItem("nekota"),
      },
    })
    setCategories(cat_data.data);
    console.log("categories>>>", cat_data);
    
    //products
    let prods_data = await axios.get(products_url, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Token " + localStorage.getItem("nekota"),
      },
    })
    setProducts(prods_data.data);
    console.log("product list data", prods_data);
  }

  useEffect(() => {
    localStorage.setItem("logStat", loginStatus);
    localStorage.setItem("nekota", authToken);
    localStorage.setItem("uname", username);
    // localStorage.setItem("username", userName);
    loadCategories();
    console.log('running effect app')
  }, [loginStatus, authToken]);

  return (
    <React.Fragment>
      <MainHeader loginStatus={loginStatus}/>
      <Routes>
        <Route
          path=""
          element={<CheckLogin onCheck={onLoginCheck} dest={present} />}
        />
        <Route
          path="login"
          element={<Login onSuccessfullLogin={onLoginCheck} dest={present} />}
        />
        <Route
          path="signup"
          element={<SignUp onSuccessfullSignedIn={onLoginCheck} />}
        />
        <Route path="home" element={<Home loginStatus={loginStatus}  uname={username}/>} />
        <Route path="products" excat element={<Products products={products} setProducts={setProducts} categories={categories}/>} />
        <Route path="categories" excat element={<Categories categories={categories} setCategories={setCategories} loadCategories={loadCategories}/>} />
        <Route path="log-out" excat element={<LogOut onLogOut={onLoginCheck}/>} />
        <Route path="add-sell" element={<InvoiceMode />} />
        <Route path="order-summary" excat element={<InvoiceForm products={products}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

// useEffect(() => {
//   localStorage.setItem('logStat', loginStatus);

//   // navigate("/categories/");
//   // let baseUrl = "http://127.0.0.1:8000";
//   // let endOfBaseUrl = baseUrl.length;

//   // if ((window.location.href).length > 23){
//   //   setPresent((window.location.href).slice(endOfBaseUrl));
//   // }
//   // navigate("");
//   // let mounted = true;
//   // console.log('app rendering..  ',<CheckLogin onCheck={onLoginCheck}/>);
//   // <CheckLogin onCheck={onLoginCheck}/>
//   // return () => (mounted = false);
// }, [loginStatus]);
