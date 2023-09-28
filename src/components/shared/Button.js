import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const AuthButton = styled.button`
  width: 73%;
  height: 10%;
  font-size: 1.2rem;
  background: ${props => props.background};
  border: none;
  color: white;
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
`;

export const Button = styled.button`
  background: ${props => props.background};
  color: white;
  padding: 0.7rem;
  font-size: 1.2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

export const BackButton = styled.button`
  background: lightgrey;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
`;

export const BackLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const DecreaseCartButton = styled.button`
  width: 20px;
  height: 30px;
  margin-top: 1.5rem;
  margin-right: 0.5rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.5rem;
`;

export const IncreaseCartButton = styled.button`
  width: 20px;
  height: 30px;
  margin-top: 1.5rem;
  margin-left: 0.5rem;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
`;

export const Btn = styled.button`
  background: cornflowerblue;
  color: white;
  width: 70%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  border-radius: 10px;
  margin-left: 1rem;
  border: none;
  cursor: pointer;
`;
