import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import QRPage from "./components/QRPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/qr" element={<QRPage />} />
    </Routes>
  );
};

export default App;
