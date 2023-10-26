import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import ResponsiveAppBar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { logout } from "./reducers/user";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

function App() {
  const online=useSelector((state)=>state.user.online)
    const user=useSelector((state)=>state.user.user)
  return (
    < >
      <Router>
      <ResponsiveAppBar/>
      <ToastContainer/>
        <Routes>
          {!online&&<Route path="/signin" element={<Signin/>}></Route>}
          {!online&&<Route path="/register" element={<Register/>}></Route>}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/product/:id" element={<ProductDetails/>}></Route>
          {online&&<Route path="/profile" element={<Profile/>}></Route>}
          {online&&<Route path="/cart" element={<Cart/>}></Route>}
          {online&&<Route path="/logout" element={<logout/>}></Route>}
          {online&&user.isAdmin&&<Route path="/admin" element={<AdminPage/>}></Route>}
          <Route path="/*" element={`error page not found`}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
