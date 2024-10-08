import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import Yoga from "./pages/Yoga/Yoga";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/start" element={<Yoga />} />
      </Routes>
    </Router>
  );
}
