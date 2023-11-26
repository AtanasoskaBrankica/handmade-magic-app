import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 70vh;
`;

const WrapperText = styled.div`
  width: 40%;
  height: 70vh;
  margin-left: 3rem;
`;
const Title = styled.h1``;

const Text = styled.p``;

const BackButton = styled.button`
  height: 7%;
  width: 20%;
  border: none;
  border-radius: 1rem;
`;

const AdminRoute = ({children}) => {
  const userEmail = useSelector(state => state.auth.email);
  if (userEmail?.includes('admin')) {
    return children;
  }

  return (
    <Wrapper>
      <WrapperText>
        <Title>Permission Denied.</Title>
        <Text>This page can only be view by an Admin user.</Text>
        <Link to="/">
          <BackButton>&larr;Back To Home</BackButton>
        </Link>
      </WrapperText>
    </Wrapper>
  );
};

export const AdminLink = ({children}) => {
  const userEmail = useSelector(state => state.auth.email);

  if (userEmail?.includes('admin')) {
    return children;
  }
  return;
};

export default AdminRoute;
