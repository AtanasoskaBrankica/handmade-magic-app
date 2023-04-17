import React from 'react';
import styled from 'styled-components';
import Card from '../card/Card';

const InformationBox = ({title, count, icon}) => {
  return (
    <div>
      <Card>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
};

export default InformationBox;
