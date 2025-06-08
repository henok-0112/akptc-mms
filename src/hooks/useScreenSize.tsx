import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const updateScreenSizeState = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setScreenSize({ width, height });

    setIsMobile(width <= 767);
    setIsTablet(width > 767 && width <= 1024);
    setIsDesktop(width > 1024);
  };

  useEffect(() => {
    updateScreenSizeState();
    window.addEventListener('resize', updateScreenSizeState);
    return () => {
      window.removeEventListener('resize', updateScreenSizeState);
    };
  }, []);

  return { isDesktop, isMobile, isTablet, screenSize };
};

export default useScreenSize;
