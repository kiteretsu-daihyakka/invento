import React, {useState, useEffect} from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import Products from "./components/Product/Products";
import Home from "./components/Home/Home";
import MainHeader from "./components/Header/MainHeader";
import Categories from "./components/Category/Categories";
import CheckLogin from "./components/Auth/CheckLogin";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import NotFound from './components/Helpers/NotFound'


function App() {
  let navigate = useNavigate();
  const [present,setPresent] = useState("/categories/");

  // console.log('present: ',present);

  const [loginStatus, setLoggedInStatus] = useState(false);
  function onLoginCheck(result) {
    setLoggedInStatus(result)
  }
  useEffect(() => {
    // navigate("/categories/");
    let baseUrl = "http://127.0.0.1:8000"
    let endOfBaseUrl = baseUrl.length;
    
    if ((window.location.href).length > 23){
      setPresent((window.location.href).slice(endOfBaseUrl));
    }
    navigate("");
    // let mounted = true;
    // console.log('app rendering..  ',<CheckLogin onCheck={onLoginCheck}/>);
    // <CheckLogin onCheck={onLoginCheck}/>
    // return () => (mounted = false);
  }, []);
  return (
    <React.Fragment>
      {loginStatus == true && <MainHeader />}
      <Routes>
        <Route path="" element={<CheckLogin onCheck={onLoginCheck} dest={present}/>} />
        <Route path="login" element={<Login onSuccessfullLogin={onLoginCheck} dest={present}/>} />
        <Route path="signup" element={<SignUp onSuccessfullSignedIn={onLoginCheck}/>} />
        <Route path="home" element={<Home loginStatus={loginStatus}/>} />
        <Route path="products" excat element={<Products />} />
        <Route path="categories" excat element={<Categories />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
