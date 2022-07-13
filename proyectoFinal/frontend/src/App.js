import { AuthProvider } from "contexts/authContext";
import { CartProvider } from "contexts/cartContext";
import { Cart } from "pages/Cart";
import { Config } from "pages/Config";
import { Logout } from "pages/Logout";
import { ProductDetail } from "pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/config" element={<Config />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
