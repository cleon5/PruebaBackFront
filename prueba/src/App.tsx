import React from "react";
import "./Styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import UserForm from "./Pages/User";

function App() {
  return (
    <>
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="/user/:id" element={<UserForm />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
