import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Hero from "./components/Hero";
import Market from "./pages/Market";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/market" element={<Market />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={ <div className="not-found">
          <h1>404</h1>
          <p>Sorry, this page could not be found.</p>
          <Link to="/">Return Home</Link>
        </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;