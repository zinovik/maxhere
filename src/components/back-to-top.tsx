import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.div`
  position: fixed;
  bottom: 30px;
  right: 50px;
  cursor: pointer;
  font-size: xxx-large;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const MIN_HEIGHT = 400;

const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > MIN_HEIGHT) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= MIN_HEIGHT) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showScroll ? <Button onClick={handleButtonClick}>⬆️</Button> : <></>;
};

export default BackToTop;
