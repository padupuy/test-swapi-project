import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
   from,
  to {
      transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
      transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
      transform: translate3d(10px, 0, 0);
  }
`;

const Wrapper = styled.div`
  height: 5rem;
  background-color: var(--navbar-bg);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: var(--zindex-header);
  padding: 0 2rem;

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
`;

const StyledLink = styled(NavLink)`
  color: var(--text-secondary);
  &.active,
  &:hover {
    border-bottom: 1px solid var(--color-primary);
  }
`;
const StyledLinkHome = styled(StyledLink)`
  &:hover {
    border-bottom: 0;
    > svg {
      animation-duration: 0.5s;
      animation-fill-mode: both;
      animation-name: ${shake};
    }
  }
`;

const HomeLinkWrapper = styled.div`
  flex: 1;
`;

const LinkWrapper = styled.div`
  margin-left: 2rem;
`;

export default function NavBar() {
  return (
    <Wrapper>
      <Nav>
        <HomeLinkWrapper>
          <StyledLinkHome to="/" exact title="Go to Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="30"
              version="1"
              viewBox="0 0 634 271"
            >
              <path
                fill="#ffe81f"
                d="M119 147l8 26a192 192 0 0 0 10 25l17-50h33l-39 115h-23l-24-70-26 69H52L13 147h33l18 51 18-51h37M2 139l4 11 39 115 2 5h34l2-5 17-48a13908 13908 0 0 0 17 49l2 5h34l2-5 40-116 4-10h-50l-2 5-10 30-2-5-9-25-1-6H76l-1 6-11 29-10-29-2-6H2zM625 147v30h-58c-3 1-5 7-4 9 0 2 3 6 6 10l12 15c8 10 10 12 10 18 2 10-3 20-11 27-9 7-9 7-72 7h-3l-61-1c-6-1-14-8-36-29a248 248 0 0 0-16-14v44h-36V148h80c24 1 40 25 37 40l-4 12c-3 5-12 12-18 15l-5 3c0 2 8 10 11 11l44 1h10c34 0 32 0 34-5 2-4 1-7-12-21-16-16-14-23-14-29 0-7 5-28 33-28h73m-215 53c16 0 19 0 22-2 11-4 12-19 1-25-2-1-5-2-22-2h-19v28l18 1m223-61h-81c-16 0-26 6-31 11-8 9-10 20-10 25v1c0 9 1 18 16 34l11 12h-37a496 496 0 0 1-42-2c7-4 13-11 17-16l5-14c2-10-1-21-9-31-9-11-22-18-36-19h-88v131h52v-34l2 2c25 23 33 30 40 31l63 1h3l57-1c11-1 14-3 19-7h1c10-9 16-22 14-35-1-8-3-11-12-22l-2-3-9-12-5-6a2057 2057 0 0 1 54 0h8v-46zm-233 53v-7-6h11l18 1c2 1 4 4 4 6 0 1-1 4-4 5l-19 1h-10zM283 146l40 116h-33l-5-17h-59l-5 17h-32l39-116h55m-26 17a4185 4185 0 0 1-21 57 3880 3880 0 0 1 40 0l-19-57m32-25h-66l-2 6-40 115-4 11h50l2-6 3-11h47l4 12 2 5h50l-4-10-40-116-2-6zm-41 74l6-18 2-6 2 6 6 17-16 1zM297 8v29h-58v87h-34V37h-67c-8 0-9 6-9 9s2 6 13 19l14 20c5 11-1 27-12 34-8 5-6 5-64 5H8V92h98l3-2c2-1 3-3 3-6 1-4 1-4-12-18-14-16-15-19-15-29 1-12 12-29 30-29h182m8-8H115c-10 0-20 5-27 13-6 7-10 15-11 23-1 14 3 19 18 36a204 204 0 0 1 9 11l-1 1H0v48h80l51-1c9 0 12-2 17-5 14-9 22-30 16-44l-16-22-11-15h60v87h50V45h58V0zM390 9l40 116h-33l-5-17-59-1-5 17h-33L334 9h56m-47 74h40l-20-58-20 58m52-82h-66l-2 5-40 115-4 11h51l2-6 3-11 47 1 3 11 2 6h50l-4-10L397 6l-2-5zm-41 74l9-26 9 26h-18zM502 9l48 1c8 1 15 6 21 12 5 7 6 10 7 20 1 13-5 24-17 32l-9 5c-1 0-1 1 2 4l6 6 3 3h62l1 32h-38l-42-1c-4-2-14-10-34-29l-14-14v44h-37V9h41m-5 52h20c19 0 19 0 22-2 5-4 7-8 6-14 0-6-3-9-8-11-4-2-7-2-22-2h-18v29m5-60h-49v131h53V99v1c25 23 33 29 38 30 3 2 10 2 44 2h46v-8l-1-32v-7l-8-1h-59l-1-1-2-2h2c15-9 22-24 21-40-1-11-3-16-9-24-7-8-16-13-26-15l-49-1zm3 39h10l18 1c4 2 4 2 4 5 1 3 0 4-3 6l-17 1h-12V40z"
              />
            </svg>
          </StyledLinkHome>
        </HomeLinkWrapper>
        <LinkWrapper className="NavBar__Link">
          <StyledLink to="/characters">Characters</StyledLink>
        </LinkWrapper>
        <LinkWrapper className="NavBar__Link">
          <StyledLink to="/vehicles">Vehicles</StyledLink>
        </LinkWrapper>
      </Nav>
    </Wrapper>
  );
}
