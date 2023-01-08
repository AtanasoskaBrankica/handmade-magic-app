import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Navbar from '../../components/admin/navbar/Navbar';
import Home from '../../components/admin/home/Home';
import classes from './Admin.module.scss';
import Products from '../../components/admin/products/Products';
import AddProduct from '../../components/admin/addProduct/AddProduct';
import Orders from '../../components/admin/orders/Orders';
const Admin = () => {
  return (
    <div className={classes.admin}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.content}>
        {/*Nested routes */}
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
