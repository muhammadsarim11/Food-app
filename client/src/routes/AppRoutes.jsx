import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import PartnerLogin from '../pages/PartnerLogin';
import PartnerRegister from "../pages/PartnerRegister.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
        <Route path="/" element={<h1 className="text-white text-3xl text-center mt-20">Home</h1>} />
        <Route path="/about" element={<h1 className="text-white text-3xl text-center mt-20">About</h1>} />
        <Route path="/contact" element={<h1 className="text-white text-3xl text-center mt-20">Contact</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
