import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ViewMovie from "./pages/ViewMovie";
import Cart from "./pages/Cart";
import FavMovies from "./pages/FavMovies";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";

function App() {
    return (
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/shop" element={<Shop />} /> 
        <Route path="movie/id:" element={<ViewMovie />} /> 
        <Route path="cart" element={<Cart />} /> 
        <Route path="/favourites" element={<FavMovies />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="*" element={<Error404 />} /> 
      </Routes>
      <Footer />
      </BrowserRouter>
    );
}

export default App;
