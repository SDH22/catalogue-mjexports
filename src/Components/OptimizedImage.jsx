import React, { useState } from 'react';
import './OptimizedImage.css';

const OptimizedImage = ({ 
  src, 
  alt, 
  aspectRatio = '4/3', 
  objectPosition = 'center',
  className = '' 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const calculatePadding = (ratio) => {
    const [width, height] = ratio.split('/').map(Number);
    return (height / width) * 100;
  };

  return (
    <div 
      className={`optimized-image-container ${className} ${loaded ? 'loaded' : 'loading'}`}
      style={{ paddingBottom: `${calculatePadding(aspectRatio)}%` }}
    >
      {error ? (
        <div className="image-fallback">
          <span>Image not available</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ objectPosition }}
          className="optimized-image"
        />
      )}
      {!loaded && !error && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;