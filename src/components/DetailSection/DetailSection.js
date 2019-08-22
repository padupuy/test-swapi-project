import React from 'react';
import styled from 'styled-components';

const Section = styled.section``;

export const Title = styled.h2`
  border-bottom: 1px solid var(--color-primary);
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`;

const List = styled.dl`
  ${props =>
    props.highlight &&
    `
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        text-align: center;
        grid-gap: 2rem;
        margin: 2rem 0;
        padding: 3rem 2rem;
        background-color: var(--color-primary);
    `}
`;
const Item = styled.div`
  margin-bottom: 1rem;
  text-transform: capitalize;
`;
const Label = styled.dd`
  font-size: 1.3rem;
  text-transform: uppercase;
`;
const Value = styled.dd`
  font-size: 1.8rem;
  font-weight: bold;
`;

export default function DetailSection({ title, highlight, items }) {
  const renderItem = React.useCallback((item, i) => {
    return (
      <Item key={i}>
        <Label>{item.label}</Label>
        <Value>{item.value}</Value>
      </Item>
    );
  }, []);

  return (
    <Section>
      {title && <Title>{title}</Title>}
      <List highlight={highlight}>{items.map(renderItem)}</List>
    </Section>
  );
}
