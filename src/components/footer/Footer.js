import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  height: 10vh;
  text-align: center;
  padding-top: 3rem;
  font-weight: bold;
  background-color: #c1b199;
  color: white;
  font-size: 1.2rem;
`;

const date = new Date();
const currentYear = date.getFullYear();

const Footer = () => {
  return <FooterWrapper>&copy; {currentYear} All Right Reserved</FooterWrapper>;
};

export default Footer;
