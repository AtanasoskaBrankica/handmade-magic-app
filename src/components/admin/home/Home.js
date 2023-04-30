import React, {useEffect} from 'react';
import styled from 'styled-components';
import InformationBox from '../../informationBox/InformationBox';
import {AiOutlineDollarCircle, AiOutlineShoppingCart} from 'react-icons/ai';
import {TfiShoppingCartFull} from 'react-icons/tfi';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectProducts,
  STORE_PRODUCTS,
} from '../../../redux/slice/productSlice';
import {
  CALCULATE_TOTAL_ORDERS_AMOUNT,
  selectOrders,
  selectTotalOrdersAmount,
  STORE_ORDERS,
} from '../../../redux/slice/orderSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import Chart from '../../chart/Chart';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerChart = styled.div`
  width: 70%;
`;

const earningIcon = <AiOutlineDollarCircle size={30} color="green" />;
const productsIcon = <AiOutlineShoppingCart size={30} color="blue" />;
const ordersIcon = <TfiShoppingCartFull size={30} color="orange" />;
const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);
  const totalOrdersAmount = useSelector(selectTotalOrdersAmount);
  const {data: fbProducts} = useFetchCollection('products');
  const {data: fbOrders} = useFetchCollection('orders');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts,
      })
    );
    dispatch(STORE_ORDERS(fbOrders));
    dispatch(CALCULATE_TOTAL_ORDERS_AMOUNT());
  }, [fbProducts, fbOrders]);
  return (
    <div>
      <h1>Admin Home</h1>
      <Container>
        <InformationBox
          title="Earnings"
          count={`${totalOrdersAmount}`}
          icon={earningIcon}
        />
        <InformationBox
          title="Products"
          count={products.length}
          icon={productsIcon}
        />
        <InformationBox
          title="Orders"
          count={orders.length}
          icon={ordersIcon}
        />
      </Container>
      <ContainerChart>
        <Chart />
      </ContainerChart>
    </div>
  );
};

export default Home;
