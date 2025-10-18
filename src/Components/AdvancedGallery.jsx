import React, { useState } from 'react';
import './AdvancedGallery.css';

const AdvancedGallery = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="advanced-gallery">
      <div 
        className={`gallery-viewport ${isZoomed ? 'zoomed' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img 
          src={images[currentIndex]} 
          alt={productName}
          className="gallery-image"
          style={{
            transform: isZoomed 
              ? `scale(2) translate(-${zoomPosition.x}%, -${zoomPosition.y}%)`
              : 'scale(1)'
          }}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button className="gallery-nav prev" onClick={handlePrev}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="gallery-nav next" onClick={handleNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="zoom-hint">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                  fill="currentColor"/>
          </svg>
          Hover to zoom
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="thumbnail-strip">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image} alt={`${productName} view ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="image-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default AdvancedGallery;