import React, { useState } from 'react';
import './ProductConfigurator.css';

const ProductConfigurator = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [currentPrice, setCurrentPrice] = useState(product.basePrice || product.price);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Update price based on color selection
    if (color.priceAdjustment) {
      setCurrentPrice(product.basePrice + color.priceAdjustment);
    }
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    // Update price based on material selection
    if (material.priceAdjustment) {
      setCurrentPrice(product.basePrice + material.priceAdjustment);
    }
  };

  return (
    <div className="product-configurator">
      <div className="configurator-header">
        <h3>Configure Your Piece</h3>
        <div className="current-price">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(currentPrice)}
        </div>
      </div>

      {/* Color Selection */}
      {product.colors && (
        <div className="configurator-section">
          <h4>Color</h4>
          <div className="color-selector">
            {product.colors.map((color) => (
              <div
                key={color.name}
                className={`color-option ${selectedColor.name === color.name ? 'selected' : ''}`}
                onClick={() => handleColorSelect(color)}
              >
                <div 
                  className="color-swatch"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="color-name">{color.name}</span>
                {color.priceAdjustment && (
                  <span className="price-adjustment">
                    {color.priceAdjustment > 0 ? '+' : ''}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(color.priceAdjustment)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Material Selection */}
      {product.materials && (
        <div className="configurator-section">
          <h4>Material</h4>
          <div className="material-selector">
            {product.materials.map((material) => (
              <div
                key={material.name}
                className={`material-option ${selectedMaterial.name === material.name ? 'selected' : ''}`}
                onClick={() => handleMaterialSelect(material)}
              >
                <div className="material-preview">
                  <img src={material.swatch} alt={material.name} />
                </div>
                <div className="material-info">
                  <span className="material-name">{material.name}</span>
                  <span className="material-description">{material.description}</span>
                  {material.priceAdjustment && (
                    <span className="price-adjustment">
                      {material.priceAdjustment > 0 ? '+' : ''}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(material.priceAdjustment)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && (
        <div className="configurator-section">
          <h4>Size</h4>
          <div className="size-selector">
            {product.sizes.map((size) => (
              <div
                key={size.name}
                className={`size-option ${selectedSize.name === size.name ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                <span className="size-name">{size.name}</span>
                <span className="size-dimensions">{size.dimensions}</span>
                {size.priceAdjustment && (
                  <span className="price-adjustment">
                    {size.priceAdjustment > 0 ? '+' : ''}
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(size.priceAdjustment)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Configuration Summary */}
      <div className="configuration-summary">
        <h4>Your Configuration</h4>
        <div className="summary-items">
          {selectedColor && (
            <div className="summary-item">
              <span>Color:</span>
              <span>{selectedColor.name}</span>
            </div>
          )}
          {selectedMaterial && (
            <div className="summary-item">
              <span>Material:</span>
              <span>{selectedMaterial.name}</span>
            </div>
          )}
          {selectedSize && (
            <div className="summary-item">
              <span>Size:</span>
              <span>{selectedSize.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="configurator-actions">
        <button className="btn-primary btn-inquire">
          Request Custom Quote
        </button>
        <button className="btn-secondary btn-save-config">
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default ProductConfigurator;