import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.div`
  flex: 1;
  ${props =>
    props.next &&
    `
      text-align: right;
    `}
`;

const StyledLink = styled(Link)`
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const Info = styled.div`
  text-align: center;
`;

const CurrentPage = styled.span`
  font-weight: bold;
`;

export default function Pagination({
  previousPageLink,
  nextPageLink,
  page = '-',
  total = '-'
}) {
  return (
    <Wrapper>
      <Nav>
        {previousPageLink && (
          <StyledLink to={previousPageLink} title="Go to previous page">
            ❮ Previous page
          </StyledLink>
        )}
      </Nav>
      <Info>
        <CurrentPage>{page}</CurrentPage>&nbsp;/&nbsp;
        {total}
      </Info>
      <Nav next>
        {nextPageLink && (
          <StyledLink to={nextPageLink} title="Go to next page">
            Next page ❯
          </StyledLink>
        )}
      </Nav>
    </Wrapper>
  );
}
