import React, { useState, useEffect } from "react";
import "./HomeFirst.css";

// Import images
import image1 from "../../assets/images/4.jpg";
import image3 from "../../assets/images/6.jpg";
import image4 from "../../assets/images/7.jpg";
import image5 from "../../assets/images/8.jpg";

const HomeFirst = () => {
  const images = [image1, image3, image4, image5];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-image-container">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>
      <button onClick={goToPrevious} className="carousel-button prev-button">
        &lt;
      </button>
      <button onClick={goToNext} className="carousel-button next-button">
        &gt;
      </button>
    </div>
  );
};

export default HomeFirst;
