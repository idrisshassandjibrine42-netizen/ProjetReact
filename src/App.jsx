import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import Contact from "./pages/ContactPage";
import Cart from "./pages/CartPage";
import About from "./pages/AboutPage";
import ProductDetailsPage from "./pages/productDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
