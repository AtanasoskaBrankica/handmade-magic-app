import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Contact, Login, Register, Reset, Admin} from './pages';
import {Header, Footer, AdminRoute} from './components';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './components/product/productDetails/ProductDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          {/* this route will be accesible only for the admin*/}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
