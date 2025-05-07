import React, { useState } from 'react';

const ImageCarousel = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  return (
    <div className="carousel">
      <button onClick={handlePrev} disabled={imageUrls.length === 0}>
        &#10094; 
      </button>
   
      {imageUrls.length >0 && <div style={{backgroundImage:`url(/${imageUrls[currentIndex]} )`}}>
        </div>}
      

      <button onClick={handleNext} disabled={imageUrls.length === 0}>
        &#10095; 
      </button>
    </div>
  );
};

export default ImageCarousel;
