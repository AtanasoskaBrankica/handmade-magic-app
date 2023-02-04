import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {FaUser} from 'react-icons/fa';
const NavbarWrapper = styled.div`
  background-color: antiquewhite;
  border: 1px solid grey;
  height: 100vh;
`;
const UserProfile = styled.div`
  height: 15vh;
  border-bottom: 1px solid grey;
  padding-top: 1rem;
`;
const UserWrapper = styled.div`
  width: 20%;
  margin-left: 40%;
  margin-top: 2rem;
`;
const UserName = styled.div``;
const NavBar = styled.nav``;
const NavBarItem = styled.div`
  border-bottom: 1px solid grey;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
  const userName = useSelector(state => state.auth.userName);
  return (
    <NavbarWrapper>
      <UserProfile>
        <UserWrapper>
          <FaUser size={50} color="white" />
          <UserName>{userName}</UserName>
        </UserWrapper>
      </UserProfile>
      <NavBar>
        <NavBarItem>
          <StyledNavLink to="/admin/home">Home</StyledNavLink>
        </NavBarItem>
        <NavBarItem>
          <StyledNavLink to="/admin/all-products">All Products</StyledNavLink>
        </NavBarItem>
        <NavBarItem>
          <StyledNavLink to="/admin/add-product/ADD">Add Product</StyledNavLink>
        </NavBarItem>
        <NavBarItem>
          <StyledNavLink to="/admin/orders">Orders</StyledNavLink>
        </NavBarItem>
      </NavBar>
    </NavbarWrapper>
  );
};

export default Navbar;
