import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from "react-router-dom";
import Index from "./components/Index";
import RecieverClient from './components/RecieverClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Wrapper() {


  return (
    <BrowserRouter>      
      <Routes>
      <Route path="/reciever" element={<RecieverClient/>} />

      <Route path="/sender" element={<Index/>} />
      <Route path="/file" element={<App/>} />
      </Routes>  
    </BrowserRouter>
  )
}

root.render(
  <Wrapper/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
