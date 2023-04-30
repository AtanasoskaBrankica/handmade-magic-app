import styled from 'styled-components';

export const AuthWrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: space-between;
`;

export const FilterWrapper = styled.div`
  height: ${props => props.height};
`;

export const FilterContent = styled.div`
  padding-left: 7rem;
  font-size: ${props => props.fontSize};
`;

export const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const CartQuantity = styled.div`
  margin-top: 1.5rem;
`;
