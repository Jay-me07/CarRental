import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import CarDetails from "./Pages/CarDetails";
import Cars from "./Pages/Cars";
import Mybookings from "./Pages/Mybookings";
import Footer from "./Components/Footer";
import Layout from "./Pages/Owner/Layout";
import Dashboard from "./Pages/Owner/Dashboard";
import Addcar from "./Pages/Owner/Addcar";
import ManageCars from "./Pages/Owner/ManageCars";
import Managebooking from "./Pages/Owner/Managebooking";
import Login from "./Components/Login";
import { Toaster } from 'react-hot-toast'
import { useAppContext } from "./Context/AppContext";

const App = () => {
  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      <Toaster />
      {showLogin && <Login />}

      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<Mybookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<Addcar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<Managebooking />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
