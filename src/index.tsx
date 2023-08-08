import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header_components';
import ProductsList from './components/products/products_list';
import BlogComponents from './components/blog/blog.components';
import AboutUsComponents from './components/aboutUs/aboutusComponents';
import SignInComponents from './modules/@UserModule/Sign-In/SignInComponents';
import SignUpComponents from './modules/@UserModule/Sign-Up/SignUpComponents';
import { Provider } from 'react-redux';
import appStore from './store';
import ProductDetails from './components/ProductDetails/ProductDetails';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={appStore}>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route key={1} path='/' element={<App />}></Route>
      <Route key={2} path='/products/:category' element={<ProductsList />}></Route>
      <Route key={3} path='/blog' element={<BlogComponents />}></Route>
      <Route key={4} path='/aboutus' element={<AboutUsComponents />}></Route>
      <Route key={5} path='/sign-In' element={<SignInComponents />}></Route>
      <Route key={6} path='/sign-Up' element={<SignUpComponents />}></Route>
      <Route key={7} path='/product/:id' element={<ProductDetails />}></Route>

    </Routes>
  </BrowserRouter>
  </Provider>
 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
