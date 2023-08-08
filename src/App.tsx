import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header_components';
import Bannercarousel from './components/bannerCarousel/banner-carousel';
import ProductCategorious from './product-categories/product-categorious';




 function App() {
  return (
    <>
      <Bannercarousel></Bannercarousel>
      <ProductCategorious></ProductCategorious>
    </>
  );
}

export default App;
