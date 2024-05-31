import React from 'react';
import {Route, Routes} from 'react-router-dom';

import './App.css';


import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component.jsx';

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';



function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomePage />} /> 
        <Route path='/shop' element={<ShopPage />} /> 
        <Route path='/signin' element={<SignInAndSignUpPage />} /> 
      </Routes>  
    </div>
  );
}

export default App;
