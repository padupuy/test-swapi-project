import React from 'react';
import styled from 'styled-components';
import { Loader, Pagination } from 'components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0rem;

  margin: 2rem 0 3rem;

  & > * {
    min-width: 100%;
  }

  @media (min-width: 576px) {
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
const Header = styled.header``;
const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LoaderWrapper = styled.div`
  margin: 5rem 0;
`;

export default function List({
  data = [],
  renderItem = () => {},
  loading = false,
  title = '-',
  page = 0,
  totalPage = 0,
  previousPageLink,
  nextPageLink
}) {
  return (
    <React.Fragment>
      <Header>
        <h2>{title}</h2>
      </Header>

      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {!loading && <Grid>{data.map(renderItem)}</Grid>}

      <Footer>
        <Pagination
          previousPageLink={previousPageLink}
          nextPageLink={nextPageLink}
          page={page}
          total={totalPage}
        />
      </Footer>
    </React.Fragment>
  );
}
