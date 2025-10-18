import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

  // Sample product data - in a real app, this would come from an API
  const product = {
    id: 1,
    name: 'Modern Luxury Sofa',
    description: 'Experience ultimate comfort with our premium modern sofa. Crafted with precision and designed for contemporary living spaces, this sofa combines elegance with exceptional comfort. Features high-density foam cushions, solid hardwood frame, and premium fabric upholstery.',
    price: 1299,
    category: 'living',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop'
    ],
    features: [
      'Premium fabric upholstery',
      'High-density foam cushions',
      'Solid hardwood frame',
      'Easy to clean and maintain',
      '5-year warranty included',
      'Quick assembly required'
    ],
    specifications: {
      dimensions: '88"W x 35"D x 32"H',
      material: 'Premium Fabric, Solid Hardwood',
      weight: '120 lbs',
      seating: '3 persons',
      care: 'Spot clean with mild detergent'
    },
    colors: ['Charcoal Gray', 'Navy Blue', 'Cream White'],
    materials: ['Premium Fabric', 'Genuine Leather'],
    inStock: true,
    tags: ['new', 'premium', 'bestseller']
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleInquire = () => {
    alert(`Thank you for your interest in ${product.name}! Our team will contact you shortly with more details.`);
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    const updated = [...saved.filter(p => p.id !== product.id), product];
    localStorage.setItem('savedProducts', JSON.stringify(updated));
    alert(`Saved ${product.name} to your favorites!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb-link">Home</a>
          <span className="breadcrumb-separator">/</span>
          <a href="/products" className="breadcrumb-link">Products</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          {/* Product Gallery */}
          <div className="product-gallery-section">
            <div className="gallery-main">
              <img 
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="gallery-main-image"
              />
              
              {product.images.length > 1 && (
                <div className="gallery-navigation">
                  <button className="nav-btn prev-btn" onClick={handlePrevImage}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="nav-btn next-btn" onClick={handleNextImage}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              )}

              {product.tags && product.tags.includes('new') && (
                <div className="product-badge new-badge">New</div>
              )}
              {product.tags && product.tags.includes('bestseller') && (
                <div className="product-badge bestseller-badge">Bestseller</div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="gallery-thumbnails">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-header">
              <span className="product-category">{product.category} Furniture</span>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-price">{formatPrice(product.price)}</div>
              
              <div className="product-availability">
                <span className={`availability-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  <i className={`fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Color Selection */}
            {product.colors && (
              <div className="product-option">
                <h4>Color</h4>
                <div className="option-selector">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`option-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material Selection */}
            {product.materials && (
              <div className="product-option">
                <h4>Material</h4>
                <div className="option-selector">
                  {product.materials.map((material) => (
                    <button
                      key={material}
                      className={`option-btn ${selectedMaterial === material ? 'active' : ''}`}
                      onClick={() => setSelectedMaterial(material)}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && (
              <div className="product-features">
                <h4>Key Features</h4>
                <div className="features-list">
                  {product.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <i className="fas fa-check"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="product-specifications">
                <h4>Specifications</h4>
                <div className="specs-grid">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="product-actions">
              <button 
                className="btn-primary btn-inquire"
                onClick={handleInquire}
                disabled={!product.inStock}
              >
                <i className="fas fa-envelope"></i>
                Inquire About This Product
              </button>
              
              <button 
                className="btn-secondary btn-save"
                onClick={handleSave}
              >
                <i className="far fa-heart"></i>
                Save to Favorites
              </button>

              <button 
                className="btn-tertiary btn-share"
                onClick={() => alert('Share functionality coming soon!')}
              >
                <i className="fas fa-share-alt"></i>
                Share
              </button>
            </div>

            {/* Additional Info */}
            <div className="product-meta">
              <div className="meta-item">
                <i className="fas fa-shipping-fast"></i>
                <span>Free shipping worldwide</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-undo"></i>
                <span>30-day return policy</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-shield-alt"></i>
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;