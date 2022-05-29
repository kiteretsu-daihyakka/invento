import React from 'react';
import './App.css'
import {Route, Routes} from 'react-router-dom'

import Products from './components/Product/Products';
import About from './components/About';
// import Home from './components/Home'
import MainHeader from './components/Header/MainHeader';
import Categories from './components/Category/Categories';

function App() {
  return (
    <React.Fragment>
    <MainHeader/>
    <Routes>
      <Route path='products' excat element={<Products/>}/>
      <Route path='categories' excat element={<Categories/>}/>
      <Route path='about' element={<About/>}/>
    </Routes> 
    </React.Fragment>
  );
}

export default App;
