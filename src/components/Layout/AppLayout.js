import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { NavBar } from 'components';

const Wrapper = styled.div`
  height: 100%;
`;

function AppLayout({ children, location: { pathname } }) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <Wrapper>
      <NavBar />
      {children}
    </Wrapper>
  );
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default withRouter(AppLayout);
