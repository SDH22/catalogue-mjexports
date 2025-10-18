import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import './Collections.css';

const Collections = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Local image configuration - uses images from public/images/collections/
  const collectionImages = [
    {
      id: 1,
      filename: '1.jpg',
      title: 'Modern Living',
      description: 'Contemporary furniture for modern living spaces with clean lines and premium materials',
      items: 'Sofas • Chairs • Tables • Storage',
      priceRange: 'Premium',
      category: 'living',
      aspectRatio: '3/4',
      productId: 10132, // Starfish Table
      productCategory: 'side'
    },
    {
      id: 2,
      filename: '2.jpg',
      title: 'Office Solutions',
      description: 'Ergonomic workspace furniture designed for productivity and comfort',
      items: 'Desks • Chairs • Cabinets • Accessories',
      priceRange: 'Professional',
      category: 'office',
      aspectRatio: '3/4',
      productId: 1114, // Giraffe Side Table
      productCategory: 'decorative'
    },
    {
      id: 3,
      filename: '3.jpg', 
      title: 'Dining Elegance',
      description: 'Beautiful dining sets that create the perfect atmosphere for gatherings',
      items: 'Tables • Chairs • Buffets • Lighting',
      priceRange: 'Luxury',
      category: 'dining',
      aspectRatio: '3/4',
      productId: 10128, // Peacock Side Table
      productCategory: 'decorative'
    },
    {
      id: 4,
      filename: '4.jpg',
      title: 'Bedroom Comfort',
      description: 'Luxurious bedroom furniture for ultimate relaxation and storage solutions',
      items: 'Beds • Wardrobes • Nightstands • Dressers',
      priceRange: 'Premium',
      category: 'bedroom',
      aspectRatio: '3/4',
      productId: 1370, // Cheetah Side Table
      productCategory: 'side'
    },
    {
      id: 5,
      filename: '5.jpg',
      title: 'Outdoor Living',
      description: 'Durable and stylish outdoor furniture for patios and gardens',
      items: 'Loungers • Tables • Umbrellas • Planters',
      priceRange: 'Standard',
      category: 'outdoor',
      aspectRatio: '3/4',
      productId: 9866, // Coffee Cheetah Table
      productCategory: 'coffee'
    },
    {
      id: 6,
      filename: '6.jpg',
      title: 'Kids Collection',
      description: 'Safe, durable and fun furniture designed for children spaces',
      items: 'Beds • Desks • Storage • Play',
      priceRange: 'Affordable',
      category: 'kids',
      aspectRatio: '3/4',
      productId: 1104, // Duck Side Table
      productCategory: 'side'
    }
  ];

  // Filter collections based on active filter
  const filteredCollections = activeFilter === 'all' 
    ? collectionImages 
    : collectionImages.filter(collection => collection.category === activeFilter);

  // Helper function to get image path
  const getImagePath = (filename) => {
    return `/images/collections/${filename}`;
  };

  // Handle filter click
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Handle view collection - UPDATED to navigate to products with category filter and highlight
  const handleViewCollection = (collection, e) => {
    e.stopPropagation(); // Prevent card click if needed
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    
    // Navigate to products page with the product's category and highlight
    navigate(`/products?category=${collection.productCategory}&highlight=${collection.productId}`);
  };

  // Handle inquire - UPDATED WITH SCROLL RESET
  const handleInquire = (collectionTitle, e) => {
    e.stopPropagation();
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate('/contact', { 
      state: { inquiry: `Interested in: ${collectionTitle}` } 
    });
  };

  // Handle card click - UPDATED to navigate to products with category filter and highlight
  const handleCardClick = (collection) => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    
    // Navigate to products page with the product's category and highlight
    navigate(`/products?category=${collection.productCategory}&highlight=${collection.productId}`);
  };

  return (
    <div className="collections">
      <div className="container">
        <div className="page-header">
          <h1>Our Collections</h1>
          <p>Carefully curated furniture sets for every room and style</p>
        </div>

        {/* Collection Categories Filter */}
        <div className="collection-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            All Collections
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'living' ? 'active' : ''}`}
            onClick={() => handleFilterClick('living')}
          >
            Living Room
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'office' ? 'active' : ''}`}
            onClick={() => handleFilterClick('office')}
          >
            Office
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'dining' ? 'active' : ''}`}
            onClick={() => handleFilterClick('dining')}
          >
            Dining
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'bedroom' ? 'active' : ''}`}
            onClick={() => handleFilterClick('bedroom')}
          >
            Bedroom
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'outdoor' ? 'active' : ''}`}
            onClick={() => handleFilterClick('outdoor')}
          >
            Outdoor
          </button>
        </div>

        {/* Collection Counter */}
        <div className="collection-counter">
          Showing {filteredCollections.length} of {collectionImages.length} collections
        </div>

        {/* Masonry Grid Layout */}
        <div className="collections-masonry">
          {filteredCollections.map((collection) => (
            <div 
              key={collection.id} 
              className="collection-card"
              data-category={collection.category}
              onClick={() => handleCardClick(collection)}
            >
              <div className="card-image">
                <OptimizedImage 
                  src={getImagePath(collection.filename)}
                  alt={collection.title}
                  aspectRatio={collection.aspectRatio}
                  className="collection-img"
                />
                <div className="card-badge">{collection.priceRange}</div>
              </div>
              
              <div className="card-content">
                <div className="card-header">
                  <h3>{collection.title}</h3>
                  <span className="category-tag">{collection.category}</span>
                </div>
                
                <p className="card-description">{collection.description}</p>
                
                <div className="card-items">
                  <span className="items-label">Includes:</span>
                  <span className="items-list">{collection.items}</span>
                </div>
                
                <div className="card-actions">
                  <button 
                    className="btn-view"
                    onClick={(e) => handleViewCollection(collection, e)}
                  >
                    View Collection
                  </button>
                  <button 
                    className="btn-inquire"
                    onClick={(e) => handleInquire(collection.title, e)}
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCollections.length === 0 && (
          <div className="no-collections">
            <h3>No collections found</h3>
            <p>Try selecting a different category filter</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="collections-cta">
          <div className="cta-content">
            <h2>Need a Custom Collection?</h2>
            <p>We can create bespoke furniture collections tailored to your specific needs and space requirements.</p>
            <button 
              className="cta-btn"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/contact');
              }}
            >
              Get Custom Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;