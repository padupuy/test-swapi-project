import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-shadow: var(--elevation1);
  background-color: var(--text-secondary);
  position: relative;
  overflow: hidden;
  border-left: 2px solid var(--color-primary);

  &:before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform-origin: right center;
    transform: scaleX(0);
    background-color: var(--color-primary);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
    pointer-events: none;
  }

  &:hover:not(:disabled):before {
    transform-origin: left center;
    transform: scaleX(1);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  height: 100%;
  color: inherit;
  padding: 1rem 2rem;
`;

const Header = styled.div`
  position: relative;
  line-height: 1;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-transform: uppercase;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const SubTitle = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
`;
const Content = styled.div`
  font-size: 1.4rem;
  padding: 1rem 0;
  position: relative;
`;

export default function Card({ title, subTitle, link, content, className }) {
  return (
    <Wrapper className={className}>
      <StyledLink to={link} title={`Go to ${title}`}>
        <Header>
          <Title>{title}</Title>
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </Header>
        {content && <Content>{content}</Content>}
      </StyledLink>
    </Wrapper>
  );
}
