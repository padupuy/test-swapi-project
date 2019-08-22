import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { ErrorBoundary, Loader } from 'components';

/**
 * Animation from animate.css
 * @see https://daneden.github.io/animate.css/
 */
const fadeInDown = keyframes`
    0% {
    opacity: 0;
    transform: translateY(-2rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  padding-top: 30vh;
  height: 100%;
  margin: 0 auto;
  animation-name: ${fadeInDown};
  animation-duration: 1s;
  animation-fill-mode: both;
`;
const Title = styled.h1`
  color: var(--color-primary);
  font-size: 3rem;
  text-transform: uppercase;
  padding: 0 2rem;

  @media (min-width: 1024px) {
    padding: 0;
  }
`;
const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  flex: 1;
  margin: 0 auto;
  padding: 2rem 2rem;
  background-color: var(--bg-primary);
  position: relative;

  @media (min-width: 1024px) {
    padding: 2rem 3rem;
    border-radius: 2px;
    box-shadow: var(--elevation2);
  }
`;

function ContentLayout({ title, children, className, loading }) {
  return (
    <Wrapper className={className}>
      <Title>{title}</Title>
      <Content>
        {loading && <Loader />}
        <ErrorBoundary>{!loading && children}</ErrorBoundary>
      </Content>
    </Wrapper>
  );
}

ContentLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ContentLayout;
