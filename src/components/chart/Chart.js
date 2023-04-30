import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {selectOrders} from '../../redux/slice/orderSlice';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 1rem;
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrders);
  const array = [];
  orders.map(order => {
    const {orderStatus} = order;
    array.push(orderStatus);
  });

  const getOrderCount = (array, value) => {
    return array.filter(item => item === value).length;
  };

  const [x1, x2, x3, x4] = [
    'Order Placed...',
    'Processing...',
    'Shipped...',
    'Delivered',
  ];

  const placed = getOrderCount(array, x1);
  const processing = getOrderCount(array, x2);
  const shipped = getOrderCount(array, x3);
  const delivered = getOrderCount(array, x4);

  const data = {
    labels: ['Placed Orders', 'Processing', 'Shipped', 'Delivered'],
    datasets: [
      {
        label: 'Order count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Wrapper>
      <h2>Order Status Chart</h2>
      <Bar options={options} data={data} />
    </Wrapper>
  );
};

export default Chart;
