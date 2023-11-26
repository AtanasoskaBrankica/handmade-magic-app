import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {FaUser} from 'react-icons/fa';
import {RiArrowDropRightFill} from 'react-icons/ri';

const NavbarWrapper = styled.div`
  background-color: white;
  color: white;
  border: 1px solid lightgrey;
  border-bottom: 0px;
  height: 100%;
`;

const UserProfile = styled.div`
  height: 15vh;
  border-bottom: 1px solid lightgrey;
  padding-top: 1rem;
  background: #c1b199;
`;

const UserWrapper = styled.div`
  margin-top: 1rem;
  font-weight: bold;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  margin-left: 8.5rem;
`;

const NavBar = styled.nav`
  padding-top: 5px;
`;

const NavBarItem = styled.div`
  border-bottom: 1px solid lightgrey;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  font-size: 1rem;
  padding-left: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

const Navbar = () => {
  const userName = useSelector(state => state.auth.userName);

  return (
    <NavbarWrapper>
      <UserProfile>
        <UserWrapper>
          <FaUser size={35} color="white" style={{marginLeft: '9rem'}} />
          <UserName>{userName}</UserName>
        </UserWrapper>
      </UserProfile>
      <NavBar>
        <NavBarItem>
          <RiArrowDropRightFill color="black" size={25} />
          <StyledNavLink to="/admin/home">Home</StyledNavLink>
        </NavBarItem>
        <NavBarItem>
          <RiArrowDropRightFill color="black" size={25} />
          <StyledNavLink to="/admin/all-products">All Products</StyledNavLink>
        </NavBarItem>
        <NavBarItem>
          <RiArrowDropRightFill color="black" size={25} />
          <StyledNavLink to="/admin/add-product/ADD">Add Product</StyledNavLink>
        </NavBarItem>
        <NavBarItem>
          <RiArrowDropRightFill color="black" size={25} />
          <StyledNavLink to="/admin/orders">Orders</StyledNavLink>
        </NavBarItem>
      </NavBar>
    </NavbarWrapper>
  );
};

export default Navbar;
