import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import "./App.css";
import "./index.css";
import Layout from "./components/Layout";

import Category from "./pages/category";
import Item from "./pages/item";
import Order from "./pages/order";
import Setting from "./pages/setting";
import Customer from "./pages/customer";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import { UserPasswordReset } from "./pages/auth/resetPassword";
import GoToLogin from "./pages/auth/GoToLogin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 20 seconds
      staleTime: 1000 * 20,
      retry: false,
      cacheTime: 10000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval:10000
    },
  },
});



function App() {
  const [sideBar, setsideBar] = useState(true);
  const [reloadLoginPage, setReloadLoginPage] = useState(true)
  window.recaptchaOptions = {
    useRecaptchaNet: true,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="App flex w-full">
        {/* <ScrollToTop/> */}
        <Layout sideBarClickHandle={setsideBar} />
        <div
          style={{ marginLeft: sideBar ? "250px" : "70px", height: "100px" }}
          className="transition-all duration-200"
        ></div>
        <Routes>
          <Route
            path="/dashboard"
            element={<Navigate to="/category" replace />}
            // element={<Navigate to="/profile" replace />}
          />
          <Route path='/log_in' element={<GoToLogin/>}/> 
          {/* //<Navigate to="/login"  />}/> */}
          <Route path='/register' element={<Register/>} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/reset-password/:token" element={<UserPasswordReset/>} /> 
          <Route path="/category" element={<Category />}/>
          <Route path="/item" element={<Item />}/>
          <Route path="/orders" element={<Order />}/>
          <Route path="/setting" element={<Setting />}/>
          <Route path="/customers" element={<Customer />}/>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
