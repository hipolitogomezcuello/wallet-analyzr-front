import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {HomePage} from "./pages/HomePage";
import {RegisterPage} from "./pages/RegisterPage";
import NavBar from "./components/NavBar";

function App() {
  useEffect(() => {
    document.title = "Securitize Wallet"
  }, [])
  return (
    <div style={{ height: "100%" }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
