import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';
import Notiflix from 'notiflix';
import {deleteDoc, doc} from 'firebase/firestore';
import {db, storage} from '../../firebase/config';
import {deleteObject, ref} from 'firebase/storage';
import {toast} from 'react-toastify';
import {QuantityWrapper} from './Container';
import {Button, DecreaseCartButton, IncreaseCartButton} from './Button';
import {useDispatch} from 'react-redux';
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
} from '../../redux/slice/cartSlice';
const Table = styled.table`
  width: 100%;
  text-align: center;
  border: 1px solid grey;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  font-size: 1.2rem;
  background: lightgrey;
  color: white;
`;

const TableBody = styled.tbody`
  font-size: 1.2rem;
`;
export const ProductsTable = ({filteredProducts}) => {
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
    <Table>
      <TableHead>
        <tr>
          <th>s/n</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </TableHead>
      <TableBody>
        {filteredProducts.map((product, index) => {
          const {id, name, price, category, imageURL} = product;
          return (
            <tr
              key={id}
              style={{border: '1px solid lightgrey', cursor: 'pointer'}}
            >
              <td>{index + 1}</td>
              <td>
                <img src={imageURL} alt={name} style={{width: '150px'}} />
              </td>
              <td>{name}</td>
              <td>{category}</td>
              <td>{`${price} MKD`}</td>
              <td>
                <Link to={`/admin/add-product/${id}`}>
                  <FiEdit size={20} color="green" />
                </Link>
                &nbsp;
                <BsTrash
                  onClick={() => confirmDelete(id, imageURL)}
                  size={18}
                  color="red"
                  cursor="pointer"
                />
              </td>
            </tr>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const OrdersTable = ({orders, handleClick}) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <th>s/n</th>
          <th>Date</th>
          <th>Order ID</th>
          <th>Order Amount</th>
          <th>Order Status</th>
        </tr>
      </TableHead>
      <TableBody>
        {orders.map((order, index) => {
          const {id, orderDate, orderTime, orderAmount, orderStatus} = order;
          return (
            <tr
              key={id}
              style={{border: '1px solid lightgrey', cursor: 'pointer'}}
              onClick={() => handleClick(id)}
            >
              <td>{index + 1}</td>
              <td>
                {orderDate} at {orderTime}
              </td>
              <td>{id}</td>
              <td>{`${orderAmount} MKD`}</td>
              <td>{orderStatus}</td>
            </tr>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const OrderDetailsTable = ({order, review}) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <th>s/n</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          {review && <th>Review</th>}
        </tr>
      </TableHead>
      <TableBody>
        {order.cartItems.map((cart, index) => {
          const {id, name, price, imageURL, cartQuantity} = cart;
          return (
            <tr key={id} style={{border: '1px solid lightgrey'}}>
              <td>{index + 1}</td>
              <td>
                <p style={{margin: '0'}}>
                  <b>{name}</b>
                </p>
                <img src={imageURL} alt={name} style={{width: '200px'}} />
              </td>
              <td>{`${price} MKD`}</td>
              <td>{cartQuantity}</td>
              <td>{`${(price * cartQuantity).toFixed(2)} MKD`}</td>
              {review && (
                <td>
                  <Link to={`/review-product/${id}`}>
                    <Button background="cornflowerblue">Review Product</Button>
                  </Link>
                </td>
              )}
            </tr>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const ShoppingCartTable = ({cartItems}) => {
  const dispatch = useDispatch();
  const increaseCart = cartItem => {
    dispatch(ADD_TO_CART(cartItem));
  };
  const decreaseCart = cartItem => {
    dispatch(DECREASE_CART(cartItem));
  };
  const removeFromCart = cartItem => {
    dispatch(REMOVE_FROM_CART(cartItem));
  };

  return (
    <Table>
      <TableHead>
        <tr>
          <th>s/n</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </TableHead>
      <TableBody>
        {cartItems.map((cartItem, index) => {
          const {id, name, price, cartQuantity, imageURL} = cartItem;
          return (
            <tr key={id} style={{border: '1px solid lightgrey'}}>
              <td>{index + 1}</td>
              <td>
                <p style={{margin: '0'}}>
                  <b>{name}</b>
                </p>
                <img src={imageURL} alt={name} style={{width: '200px'}} />
              </td>
              <td>{`${price} MKD`}</td>
              <td>
                <QuantityWrapper>
                  <DecreaseCartButton onClick={() => decreaseCart(cartItem)}>
                    -
                  </DecreaseCartButton>
                  <p>
                    <b>{cartQuantity}</b>
                  </p>
                  <IncreaseCartButton onClick={() => increaseCart(cartItem)}>
                    +
                  </IncreaseCartButton>
                </QuantityWrapper>
              </td>
              <td>{(price * cartQuantity).toFixed(2)} MKD</td>
              <td>
                <BsTrash
                  onClick={() => removeFromCart(cartItem)}
                  size={20}
                  color="red"
                  cursor="pointer"
                />
              </td>
            </tr>
          );
        })}
      </TableBody>
    </Table>
  );
};
