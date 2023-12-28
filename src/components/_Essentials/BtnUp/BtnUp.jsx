import React, { useState, useEffect } from 'react';
import './BtnUp.scss'; // Stelle sicher, dass du den richtigen Dateinamen für die CSS-Datei verwendest

const BtnUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Überwache den Scroll-Status
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Aufräumen, um unerwünschte Nebeneffekte zu vermeiden
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scrollt nach oben, wenn der Button geklickt wird
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    />
  );
};

export default BtnUp;
