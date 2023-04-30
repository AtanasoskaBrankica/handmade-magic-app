import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home, Contact, Login, Register, Reset, Admin} from './pages';
import {Header, Footer, AdminRoute} from './components';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './components/product/productDetails/ProductDetails';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orderDetails/OrderDetails';
import ReviewProducts from './components/reviewProducts/ReviewProducts';

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
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<Orders />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
