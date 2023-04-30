import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {deleteDoc, doc} from 'firebase/firestore';
import {db, storage} from '../../../firebase/config';
import {FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import {deleteObject, ref} from 'firebase/storage';
import Notiflix from 'notiflix';
import {
  selectProducts,
  STORE_PRODUCTS,
} from '../../../redux/slice/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import Pagination from '../../pagination/Pagination';
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from '../../../redux/slice/filterSlice';
import styled from 'styled-components';
import Search from '../../search/Search';

const TopContainer = styled.div`
  height: 10%;

  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;

  padding-top: 2px;
  width: 30%;
  padding-bottom: 0.5rem;
  margin-right: 6rem;
`;

const SearchWrapper = styled.div`
  width: 60%;
`;

const Title = styled.h1`
  margin: 0;
`;

const Products = () => {
  const [searchValue, setSearchValue] = useState('');
  const {data, isLoading} = useFetchCollection('products');
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(2);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, searchValue}));
  }, [searchValue, products]);

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
        <Title>All Products</Title>
        <TopContainer>
          <GridWrapper>
            <p style={{margin: '0'}}>
              <b>{filteredProducts.length}</b>
              <span style={{marginLeft: '5px'}}>Products found</span>
            </p>
          </GridWrapper>
          <SearchWrapper>
            <Search
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </SearchWrapper>
        </TopContainer>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <>
            <table
              style={{
                width: '100%',
                textAlign: 'center',
                border: '1px solid grey',
                borderCollapse: 'collapse',
              }}
            >
              <thead
                style={{
                  fontSize: '1.2rem',

                  background: 'lightgrey',
                  color: 'white',
                }}
              >
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{fontSize: '1.2rem'}}>
                {filteredProducts.map((product, index) => {
                  const {id, name, price, category, imageURL} = product;
                  return (
                    <tr key={id} style={{border: '1px solid lightgrey'}}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{width: '150px'}}
                        />
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
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              productsPerPage={productsPerPage}
              totalProducts={products.length}
            ></Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
