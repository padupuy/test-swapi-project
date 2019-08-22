import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: var(--color-secondary);
  position: relative;
  padding-top: 5rem;
  height: 40vh;
  position: relative;
  display: flex;
  align-items: flex-end;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }

  ${props =>
    props.background &&
    props.imageLoaded &&
    `
    &:before {
      background-image: url(${props.background});
      background-size: cover;
      background-position: center center;
      opacity: 0.5;
    }
    `}
`;

function usePreloadImage(image) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const fakeImage = new Image();

  const handleImageLoaded = React.useCallback(() => {
    setImageLoaded(true);
  }, []);
  fakeImage.onload = handleImageLoaded;

  React.useEffect(() => {
    fakeImage.src = image;
  }, [fakeImage.src, image]);

  return [imageLoaded];
}

export default function Hero({ background, children, className }) {
  const [imageLoaded] = usePreloadImage(background);

  return (
    <Wrapper
      className={className}
      background={background}
      imageLoaded={imageLoaded}
    >
      <div>{children}</div>
    </Wrapper>
  );
}
