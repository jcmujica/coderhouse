import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Cart } from "./pages/Cart";
import './App.css';
import CartContextComponent from "./contexts/cartContext";
import AuthContextComponent from "./contexts/authContext";
import { ProductForm } from "./pages/ProductForm";
import { ProductDetail } from "./pages/ProductDetail";

function App() {
  return (
    <div className="App">
      <AuthContextComponent>
        <CartContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<ProductForm />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartContextComponent>
      </AuthContextComponent>
    </div>
  );
}

export default App;
