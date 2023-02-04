import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {
  query,
  orderBy,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import {db, storage} from '../../../firebase/config';
import {FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import {deleteObject, ref} from 'firebase/storage';
import Notiflix from 'notiflix';
import {STORE_PRODUCTS} from '../../../redux/slice/productSlice';
import {useDispatch} from 'react-redux';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, 'products');

      const q = query(productsRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, snapshot => {
        const allProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product',
      'Are you sure that you want to delete the product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {},
      {
        width: '320px',
        borderRadius: '8px',
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <div>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const {id, name, price, category, imageURL} = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={imageURL} alt={name} style={{width: '100px'}} />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td>
                      <Link to={`/admin/add-product/${id}`}>
                        <FiEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <BsTrash
                        onClick={() => confirmDelete(id, imageURL)}
                        size={18}
                        color="red"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Products;
