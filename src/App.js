import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";

const HatsPage = () => (
  <div>
    <h1>HAT PAGE</h1>
  </div>
);

//there is a new way to right routes in react course
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop/hats" element={<HatsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
