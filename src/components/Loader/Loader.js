import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const StyledLoader = styled.div`
  --loader-size: 5rem;
  --loader-border-size: 0.5rem;
  --loader-bg: rgba(0, 0, 0, 0.1);
  --loader-color: rgba(0, 0, 0, 0.4);

  border-radius: 50%;
  width: var(--loader-size);
  height: var(--loader-size);
  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: var(--loader-border-size) solid var(--loader-bg);
  border-right: var(--loader-border-size) solid var(--loader-bg);
  border-bottom: var(--loader-border-size) solid var(--loader-bg);
  border-left: var(--loader-border-size) solid var(--loader-color);
  transform: translateZ(0);
  animation: ${rotate} 1.1s infinite linear;

  &:after {
    border-radius: 50%;
    width: var(--loader-size);
    height: var(--loader-size);
  }
`;

export default StyledLoader;
