import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid grey;
  background: lightgrey;
  border-radius: 20px;
  width: 30%;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  padding-left: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Count = styled.div`
  font-size: 1.5rem;
  padding-left: 1rem;
`;

const Icon = styled.div`
  padding-right: 1rem;
`;

const InformationBox = ({title, count, icon, valute = ''}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>
        <Count>
          {`${count}`} {valute}
        </Count>
        <Icon>{icon}</Icon>
      </Content>
    </Wrapper>
  );
};

export default InformationBox;
