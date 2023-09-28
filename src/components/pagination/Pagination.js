import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

const ListItem = styled.li`
  list-style-type: none;
  border: 1px solid lightgrey;
  display: flex;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.2rem;
  flex-direction: row;
  text-align: center;
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.2rem;
  padding: 0.3rem;
`;

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <List>
        {currentPage !== pageNumbers[0] && (
          <ListItem onClick={paginatePrev}>Prev</ListItem>
        )}

        {pageNumbers.map(number => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <ListItem key={number} onClick={() => paginate(number)}>
                {number}
              </ListItem>
            );
          }
        })}
        {currentPage !== pageNumbers[pageNumbers.length - 1] && (
          <ListItem onClick={paginateNext}>Next</ListItem>
        )}
        <Text>
          <span style={{color: '#ffae00'}}>
            <b>{`Page ${currentPage}`}</b>
          </span>

          <span> of </span>
          <span>{`${Math.ceil(totalPages)}`}</span>
        </Text>
      </List>
    </Container>
  );
};

export default Pagination;
