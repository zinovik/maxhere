import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.div`
  position: fixed;
  bottom: 40px;
  right: 50px;
  cursor: pointer;
  font-size: xxx-large;
`;

const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);

    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showScroll ? <Button onClick={handleButtonClick}>⬆️</Button> : <></>;
};

export default BackToTop;
