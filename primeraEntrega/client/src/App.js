import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { CreateProduct } from "./pages/CreateProduct";
import { Cart } from "./pages/Cart";
import './App.css';
import CartContextComponent from "./contexts/cartContext";

function App() {
  return (
    <div className="App">
      <CartContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContextComponent>
    </div>
  );
}

export default App;
