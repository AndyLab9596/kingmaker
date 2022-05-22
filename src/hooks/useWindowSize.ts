import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
  const defaultSize = 1050;
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      // const sizeC = size + (defaultSize - window.innerWidth);
      if (window.innerWidth > defaultSize) {
        setSize(0);
        return;
      }
      setSize(defaultSize - window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return { size, windowSize: window.innerWidth };
};
