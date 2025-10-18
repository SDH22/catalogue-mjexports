import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductGrid.css';

const ProductGrid = ({ products, title = "Our Products", showFilters = true, onProductSelect }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    } else {
      navigate(`/products/${product.id}`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getCategoryName = (category) => {
    const categoryNames = {
      living: 'Living Room',
      office: 'Office',
      dining: 'Dining',
      bedroom: 'Bedroom',
      outdoor: 'Outdoor',
      kids: 'Kids Furniture'
    };
    return categoryNames[category] || category;
  };

  return (
    <div className="product-grid-section">
      <div className="container">
        {/* Section Header */}
        {(title || showFilters) && (
          <div className="product-grid-header">
            {title && (
              <div className="section-title">
                <h2>{title}</h2>
                <span className="product-count">{products.length} products</span>
              </div>
            )}
            
            {showFilters && (
              <div className="grid-filters">
                <div className="filter-group">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select id="sort-select" className="filter-select">
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label htmlFor="category-select">Category:</label>
                  <select id="category-select" className="filter-select">
                    <option value="all">All Categories</option>
                    <option value="living">Living Room</option>
                    <option value="office">Office</option>
                    <option value="dining">Dining</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="product-img"
                />
                
                {/* Product Badges */}
                <div className="product-badges">
                  {product.tags && product.tags.includes('new') && (
                    <span className="badge new-badge">New</span>
                  )}
                  {product.tags && product.tags.includes('premium') && (
                    <span className="badge premium-badge">Premium</span>
                  )}
                  {!product.inStock && (
                    <span className="badge out-of-stock-badge">Out of Stock</span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="product-actions">
                  <button 
                    className="action-btn wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Added ${product.name} to wishlist!`);
                    }}
                  >
                    <i className="far fa-heart"></i>
                  </button>
                  <button 
                    className="action-btn quick-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>

              <div className="product-info">
                <span className="product-category">
                  {getCategoryName(product.category)}
                </span>
                
                <h3 className="product-name">{product.name}</h3>
                
                <p className="product-description">
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...` 
                    : product.description
                  }
                </p>

                <div className="product-features">
                  {product.features && product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="product-footer">
                  <div className="product-price">{formatPrice(product.price)}</div>
                  
                  <div className="product-meta">
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="rating">
                      <i className="fas fa-star"></i>
                      4.8
                    </span>
                  </div>
                </div>

                <button 
                  className="product-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Inquiring about ${product.name}`);
                  }}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Inquire Now' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-content">
              <i className="fas fa-search"></i>
              <h3>No Products Found</h3>
              <p>We couldn't find any products matching your criteria.</p>
              <button className="btn-reset">
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Load More (for pagination) */}
        {products.length > 0 && (
          <div className="load-more-section">
            <button className="btn-load-more">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;