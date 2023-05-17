import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/Layout";
import Login from "./pages/login";
import Cart from "./pages/cart";
import ProtectRoute from "./components/protectRout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login">
          <Route index element={<Login />} />
        </Route>
        <Route element={<ProtectRoute />}>
          <Route path="cart">
            <Route index element={<Cart />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
