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

function App() {
  let navigate = useNavigate();
  const [present, setPresent] = useState("/categories/");
  const [loginStatus, setLoggedInStatus] = useState(
    localStorage.getItem("logStat") === "true"
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem("nekota"));
  const [categories, setCategories] = useState(false);
  const [products, setProducts] = useState(false);
    
  function onLoginCheck(result, token) {
    setLoggedInStatus(result);
    setAuthToken(token);
    if (result == true) {
      setTimeout(() => {
        navigate(present);
      }, 1000);
    }
  }
  async function loadCategories(){
    await fetch(categories_url, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Token " + localStorage.getItem("nekota"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("categories>>>", data);
        setCategories(data);
      });
  }

  useEffect(() => {
    localStorage.setItem("logStat", loginStatus);
    localStorage.setItem("nekota", authToken);
    console.log('running effect app')
    loadCategories();
  }, [loginStatus, authToken]);

  return (
    <React.Fragment>
      <MainHeader loginStatus={loginStatus} />
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
        <Route path="home" element={<Home loginStatus={loginStatus} />} />
        <Route path="products" excat element={<Products products={products} setProducts={setProducts} categories={categories}/>} />
        <Route path="categories" excat element={<Categories categories={categories} setCategories={setCategories} loadCategories={loadCategories}/>} />
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
