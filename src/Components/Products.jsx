import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Products.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [imageIndexes, setImageIndexes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [availableImages, setAvailableImages] = useState({});
  const [imageLoadingStates, setImageLoadingStates] = useState({});
  const [highlightedProduct, setHighlightedProduct] = useState(null);

  // Refs for GSAP animations
  const pageHeaderRef = useRef(null);
  const pageTitleRef = useRef(null);
  const pageSubtitleRef = useRef(null);
  const productsControlsRef = useRef(null);
  const categoryFiltersRef = useRef(null);
  const productStreamRef = useRef(null);
  const productItemsRef = useRef([]);

  const productsPerPage = 14;

  // Image mapping function - converts product data to local image paths
  const getProductImages = useCallback((product) => {
    const baseName = product.name.toLowerCase().replace(/\s+/g, '_');
    
    // Special cases for naming differences
    const imageMap = {
      // Cheetah products
      'cheetah_side_table': ['cheetah_side_1.png', 'cheetah_side_2.png', 'cheetah_side_3.png'],
      'coffee_cheetah_table': ['cheetah_coffee_1.png'],
      
      // Eagle products
      'eagle_side_table': ['eagle_side_1.png', 'eagle_side_2.png', 'eagle_side_3.png'],
      
      // Peacock products
      'peacock_side_table': ['peacock_side_1.png', 'peacock_side_2.png'],
      
      // Flamingo products
      'flamingo_side_table': ['flamingo_side_1.png', 'flamingo_side_2.png', 'flamingo_side_3.png'],
      
      // Giraffe products
      'giraffe_side_table': ['giraffe_side_1.png', 'giraffe_side_2.png', 'giraffe_side_3.png'],
      
      // Snake products
      'snake_side_table': ['snake_side_1.png', 'snake_side_2.png'],
      
      // Starfish products
      'starfish_table': ['starfish_side_1.png', 'starfish_side_3.png'],
      
      // Octopus products
      'octopus_coffee_table': ['octopus_side_1.png', 'octopus_side_2.png'],
      
      // Elephant products
      'elephant_side_table': ['elephant_side_1.png', 'elephant_side_2.png', 'elephant_side_3.png'],
      
      // Crocodile products
      'crocodile_side_table': ['croc_side_1.png', 'croc_side_2.png'],
      
      // Duck products
      'duck_side_table': ['duck_side_1.png', 'duck_side_2.png', 'duck_side_3.png'],
      
      // Seahorse products
      'seahorse_side_table': ['seahorse_side_1.png', 'seahorse_side_2.png', 'seahorse_side_3.png'],
      
      // Monkey products
      'monkey_side_table': ['monkey_side_1.png', 'monkey_side_2.png']
    };

    const images = imageMap[baseName] || [];
    
    // Convert to actual image paths
    return images.map(img => `/images/product/${img}`);
  }, []);

  // Product data - MOVED OUTSIDE OF useCallback to avoid dependency issues
  const productsData = [
    {
      id: 1370, name: 'Cheetah Side Table', itemCode: '1370', category: 'side', price: 1299, featured: true, inStock: true,
      description: 'Bold, artistic, and full of character - the Regal Brass Cheetah Accent Table by MJ Exports is more than a side table; it\'s a statement piece. Meticulously crafted in hand-polished antique brass finish, the cheetah sculpture anchors a round tempered glass top, merging form with function.',
      features: ['Material: Solid brass base with distressed antique finish', 'Top: 8mm thick tempered glass', 'Design: Sculptural cheetah with realistic texture and proud posture', 'Dimensions: Approx. 22" height x 18" diameter (customizable on request)', 'Finish: Hand-finished to highlight detail and patina', 'Weight: Sturdy for functional use without tipping'],
      specifications: { dimensions: '22" height x 18" diameter', material: 'Solid Brass, Tempered Glass', weight: 'Sturdy construction', customization: 'Available on request' }
    },
    {
      id: 9866, name: 'Coffee Cheetah Table', itemCode: '9866', category: 'coffee', price: 1899, featured: true, inStock: true,
      description: 'Dynamic and powerful, the Panther Brass Coffee Table by MJ Exports captures the strength of the wild in home décor. A hand-sculpted prowling panther forms the sturdy base of this conversation piece, topped with sleek tinted glass.',
      features: ['Material: Cast brass body with hand-applied finish', 'Top: Tinted round tempered glass', 'Design: Prowling panther sculpture as base', 'Dimensions: Approx. 40" length x 20" width x 18" height', 'Finish: Rich antique patina with black shading', 'Weight: Rugged construction for functional use'],
      specifications: { dimensions: '40"L x 20"W x 18"H', material: 'Cast Brass, Tempered Glass', weight: 'Rugged construction' }
    },
    {
      id: 10129, name: 'Eagle Side Table', itemCode: '10129', category: 'side', price: 899, featured: false, inStock: true,
      description: 'Add a bold statement piece to your living space with our Metal Eagle Side Table in a stunning Gold Finish. The radiant gold finish adds a touch of luxury, making it not just a side table but a true work of art.',
      features: ['Material: Solid Aluminum with gold finish', 'Top: 8mm thick tempered glass with realistic texture and proud posture', 'Dimensions: Approx. 21" height x 23"', 'Ideal for luxury interiors and boutique hotels'],
      specifications: { dimensions: '21"H x 23"', material: 'Aluminum, Tempered Glass', weight: 'Lightweight yet sturdy' }
    },
    {
      id: 10128, name: 'Peacock Side Table', itemCode: '10128', category: 'decorative', price: 1099, featured: true, inStock: true,
      description: 'Elevate your living space with the timeless elegance of our Peacock Side Table, featuring a beautifully detailed peacock motif and a shimmering Taffan Glass top.',
      features: ['Elegant peacock-inspired design', 'Lustrous Gold Finish', 'Premium Taffan Glass', 'Compact and stylish at 16x23 inches', 'Perfect for living rooms, bedrooms, or lounges'],
      specifications: { dimensions: '16" x 23"', material: 'Metal, Taffan Glass', weight: 'Perfect for accent placement' }
    },
    {
      id: 1619, name: 'Flamingo Side Table', itemCode: '1619', category: 'decorative', price: 749, featured: false, inStock: true,
      description: 'Add a touch of modern glamor to your home with the Flamingo Side Table. Featuring a sleek gold finish and a minimalist yet sophisticated design, this table effortlessly blends style with function.',
      features: ['Striking gold finish for a luxe look', 'Clean, modern lines for versatile styling', 'Durable construction with a polished design', 'Perfect for living rooms, bedrooms, or reading nooks'],
      specifications: { dimensions: 'Compact size', material: 'Metal, Glass', weight: 'Lightweight and portable' }
    },
    {
      id: 1114, name: 'Giraffe Side Table', itemCode: '1114', category: 'decorative', price: 899, featured: false, inStock: true,
      description: 'Elevate your living space with the sleek and sophisticated Giraffe Side Table—where modern design meets everyday functionality. Crafted with precision and a minimalist edge.',
      features: ['Modern minimalist design', 'Premium construction materials', 'Functional and stylish', 'Perfect for contemporary interiors'],
      specifications: { dimensions: 'Standard side table size', material: 'Metal, Glass', weight: 'Sturdy construction' }
    },
    {
      id: 10131, name: 'Snake Side Table', itemCode: '10131', category: 'side', price: 1199, featured: true, inStock: true,
      description: 'Looking for a side table that turns heads? This striking metal snake design is more than furniture — it\'s a conversation starter. Add a bold touch of luxury to your space with this unique handcrafted table.',
      features: ['Material: Solid Aluminum with gold finish', 'Top: 8mm thick tempered glass', 'Dimensions: Approx 15" height x 25" diameter', 'Ideal For: Luxury interiors, art-inspired homes, boutique hotels'],
      specifications: { dimensions: '15"H x 25" diameter', material: 'Aluminum, Tempered Glass', weight: 'Artistic centerpiece' }
    },
    {
      id: 10132, name: 'Starfish Table', itemCode: '10132', category: 'side', price: 849, featured: false, inStock: true,
      description: 'Inspired by the natural beauty of ocean life, this starfish-shaped base brings coastal charm and elegance. Crafted from durable metal, it blends artistic design with lasting function.',
      features: ['Material: Solid Aluminum with gold finish', 'Top: 8mm thick tempered glass', 'Dimensions: Approx. 15" height x 25" diameter', 'Ideal For: Luxury interiors and coastal themes'],
      specifications: { dimensions: '15"H x 25" diameter', material: 'Aluminum, Tempered Glass', weight: 'Coastal elegance' }
    },
    {
      id: 1224, name: 'Octopus Coffee Table', itemCode: '1224', category: 'coffee', price: 1599, featured: true, inStock: true,
      description: 'Make a bold statement in your living space with our Gold Finish Octopus Coffee Table - a true fusion of art and function. This striking center piece features intricately sculpted tentacles in a radiant gold finish.',
      features: ['Elegant Gold Finish', 'Durable 8mm Tempered Glass Top', 'Compact Size: 26 x 16 Inches', 'Sculpted Octopus Base', 'Versatile Décor Match'],
      specifications: { dimensions: '26" x 16"', material: 'Metal, Tempered Glass', weight: 'Sturdy centerpiece' }
    },
    {
      id: 4491, name: 'Elephant Side Table', itemCode: '4491', category: 'side', price: 1399, featured: true, inStock: true,
      description: 'Add a touch of exotic elegance to your space with this striking elephant side table, featuring a luxurious gold finish and a clear glass top. The intricately sculpted elephant base showcases fine detailing.',
      features: ['Artistic Detailing and engravings', '8mm Taffan glass integration', 'Durable, rust-resistant materials'],
      specifications: { dimensions: 'Standard side table size', material: 'Metal, Taffan Glass', weight: 'Detailed craftsmanship' }
    },
    {
      id: 7844, name: 'Crocodile Side Table', itemCode: '7844', category: 'side', price: 1299, featured: false, inStock: true,
      description: 'Add a touch of wild elegance to your space with our Crocodile Metal Side Table in a luxurious gold finish. Crafted with intricate crocodile-skin texture and a bold metallic sheen.',
      features: ['Durable metal construction', 'Elegant gold finish', 'Unique crocodile-skin texture', 'Compact size: 20 x 21 inches', 'Versatile for contemporary and eclectic interiors'],
      specifications: { dimensions: '20" x 21"', material: 'Metal, Glass', weight: 'Exotic design' }
    },
    {
      id: 1104, name: 'Duck Side Table', itemCode: '1104', category: 'side', price: 799, featured: false, inStock: true,
      description: 'Add a touch of whimsical luxury to your space with our Metal Duck Side Table, featuring an eye-catching gold finish and a sleek Taffan glass top.',
      features: ['Whimsical duck design with luxurious gold finish', 'Sleek Taffan glass top', 'Sturdy metal construction', 'High-quality glass for durability and style'],
      specifications: { dimensions: 'Standard side table size', material: 'Metal, Taffan Glass', weight: 'Whimsical elegance' }
    },
    {
      id: 10134, name: 'Seahorse Side Table', itemCode: '10134', category: 'side', price: 949, featured: false, inStock: true,
      description: 'Add a touch of coastal elegance to your space with our stunning Seahorse Side Table. The clear glass top offers a clean, modern contrast while showcasing the intricate detailing beneath.',
      features: ['Sculpted seahorse base for coastal charm', 'Elegant gold finish', 'Compact size: 15 x 25 inches', '8mm clear Taffan glass top', 'Ideal for statement side table use'],
      specifications: { dimensions: '15" x 25"', material: 'Metal, Taffan Glass', weight: 'Coastal sophistication' }
    },
    {
      id: 1083, name: 'Monkey Side Table', itemCode: '1083', category: 'side', price: 1099, featured: false, inStock: true,
      description: 'This striking monkey side table is crafted from durable metal and finished in a luxurious gold antique tone, blending whimsy with elegance. The detailed sculpting captures the playful charm of a monkey figure.',
      features: ['Unique monkey sculpture base', 'Premium metal finish with antique tone', 'Compact yet functional size (20x23")', 'Durable high-quality construction'],
      specifications: { dimensions: '20" x 23"', material: 'Metal, Glass', weight: 'Playful sophistication' }
    }
  ].map(product => ({
    ...product,
    images: getProductImages(product)
  }));

  // Preload images to reduce flickering
  const preloadImages = useCallback((images) => {
    images.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  // Initialize images
  const initializeImages = useCallback(() => {
    const imagesMap = {};
    productsData.forEach(product => {
      imagesMap[product.id] = product.images;
      preloadImages(product.images);
    });
    setAvailableImages(imagesMap);
    console.log('Local images initialized:', imagesMap);
  }, [preloadImages]);

  // Enhanced placeholder with SVG
  const getPlaceholderImage = useCallback(() => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0zMDAgMjAwTDM1MCAyNTBMMzAwIDMwMEwyNTAgMjUwTDMwMCAyMDBaIiBmaWxsPSIjRDRBRjM3IiBvcGFjaXR5PSIwLjUiLz4KPHRleHQgeD0iMzAwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NjYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+';
  }, []);

  // Get current image for product with fallback
  const getCurrentImage = useCallback((productId) => {
    const images = availableImages[productId] || [];
    const currentIndex = imageIndexes[productId] || 0;
    return images[currentIndex] || getPlaceholderImage();
  }, [availableImages, imageIndexes, getPlaceholderImage]);

  // Get thumbnail image with fallback
  const getThumbnailImage = useCallback((productId, thumbIndex) => {
    const images = availableImages[productId] || [];
    return images[thumbIndex] || getPlaceholderImage();
  }, [availableImages, getPlaceholderImage]);

  // Check if a thumbnail slot should be empty
  const isThumbnailEmpty = useCallback((productId, thumbIndex) => {
    const images = availableImages[productId] || [];
    return thumbIndex >= images.length;
  }, [availableImages]);

  // Enhanced image handlers
  const handleImageLoad = useCallback((productId, imageIndex) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [`${productId}-${imageIndex}`]: false
    }));
  }, []);

  const handleImageError = useCallback((e, productId, imageIndex) => {
    console.warn(`Image failed to load for product ${productId}. Falling back to placeholder.`);
    setImageLoadingStates(prev => ({
      ...prev,
      [`${productId}-${imageIndex}`]: false
    }));
    e.target.src = getPlaceholderImage();
  }, [getPlaceholderImage]);

  const handleImageStartLoad = useCallback((productId, imageIndex) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [`${productId}-${imageIndex}`]: true
    }));
  }, []);

  // MISSING FUNCTIONS - ADDED BACK
  const filteredProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(product => product.category === activeCategory);

  // Image navigation
  const handleNextImage = useCallback((productId, e) => {
    if (e) e.stopPropagation();
    const images = availableImages[productId] || [];
    const totalImages = images.length;
    if (totalImages <= 1) return;
    
    setImageIndexes(prev => {
      const currentIndex = prev[productId] || 0;
      const newIndex = (currentIndex + 1) % totalImages;
      return { ...prev, [productId]: newIndex };
    });
  }, [availableImages]);

  const handlePrevImage = useCallback((productId, e) => {
    if (e) e.stopPropagation();
    const images = availableImages[productId] || [];
    const totalImages = images.length;
    if (totalImages <= 1) return;
    
    setImageIndexes(prev => {
      const currentIndex = prev[productId] || 0;
      const newIndex = (currentIndex - 1 + totalImages) % totalImages;
      return { ...prev, [productId]: newIndex };
    });
  }, [availableImages]);

  const handleThumbnailClick = useCallback((productId, index, e) => {
    if (e) e.stopPropagation();
    setImageIndexes(prev => ({ ...prev, [productId]: index }));
  }, []);

  // Category filter change handler
  const handleCategoryFilter = useCallback((category) => {
    setActiveCategory(category);
    if (category === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${category}`);
    }
  }, [navigate]);

  // Button hover effects
  const handleInquireHover = useCallback((event) => gsap.to(event.currentTarget, { scale: 1.02, duration: 0.3, ease: "power2.out" }), []);
  const handleInquireLeave = useCallback((event) => gsap.to(event.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" }), []);
  const handleSaveHover = useCallback((event) => gsap.to(event.currentTarget, { scale: 1.1, duration: 0.3, ease: "power2.out" }), []);
  const handleSaveLeave = useCallback((event) => gsap.to(event.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" }), []);

  // Handle inquire - UPDATED WITH SCROLL RESET
  const handleInquire = useCallback((product) => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate('/contact', { 
      state: { 
        inquiryProduct: product, 
        inquiryType: 'product', 
        productName: product.name, 
        itemCode: product.itemCode 
      } 
    });
  }, [navigate]);

  // Handle save
  const handleSave = useCallback((product) => {
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    const updated = [...saved.filter(p => p.id !== product.id), product];
    localStorage.setItem('savedProducts', JSON.stringify(updated));
    const saveBtn = document.querySelector(`[data-product-id="${product.id}"] .btn-save`);
    if (saveBtn) {
      gsap.to(saveBtn, { scale: 1.3, color: '#dc2626', duration: 0.3, ease: "back.out(1.2)", yoyo: true, repeat: 1 });
    }
  }, []);

  // Get category display name
  const getCategoryName = useCallback((category) => ({
    all: 'All Products', side: 'Side Tables', coffee: 'Coffee Tables', decorative: 'Decorative Pieces'
  }[category] || category), []);

  // Format price
  const formatPrice = useCallback((price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price), []);

  // Add to product items ref array
  const addToProductItemsRef = useCallback((el) => {
    if (el && !productItemsRef.current.includes(el)) {
      productItemsRef.current.push(el);
    }
  }, []);

  // NEW: Handle product highlighting
  const highlightProduct = useCallback((productId) => {
    if (!productId) return;
    
    const element = document.querySelector(`[data-product-id="${productId}"]`);
    if (element) {
      // Scroll to the product
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add highlight animation
        gsap.fromTo(element, 
          { 
            boxShadow: '0 0 0 0px rgba(26, 26, 26, 0.3)',
            scale: 1
          },
          { 
            boxShadow: '0 0 0 10px rgba(26, 26, 26, 0.3)',
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 3
          }
        );
      }, 1000);
    }
  }, []);

  // Initialize images and products
  useEffect(() => {
    console.log('Initializing component with local images...');
    initializeImages();
    const initialProducts = filteredProducts.slice(0, productsPerPage);
    setDisplayedProducts(initialProducts);
    const initialIndexes = {};
    initialProducts.forEach(product => {
      initialIndexes[product.id] = 0;
    });
    setImageIndexes(initialIndexes);
    setHasMore(filteredProducts.length > productsPerPage);
    setIsLoading(false);
    console.log('Component initialized with products:', initialProducts.length);
  }, [initializeImages]);

  // Apply filtering when category changes
  useEffect(() => {
    setCurrentPage(1);
    const newProducts = filteredProducts.slice(0, productsPerPage);
    setDisplayedProducts(newProducts);
    setHasMore(filteredProducts.length > productsPerPage);
    
    productItemsRef.current.forEach(item => item._isAnimated = false);
    productItemsRef.current = [];
  }, [activeCategory, filteredProducts]);

  // Get category and highlight from URL - UPDATED
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const highlightId = searchParams.get('highlight');
    
    if (category && ['all', 'side', 'coffee', 'decorative'].includes(category)) {
      setActiveCategory(category);
    }
    
    if (highlightId) {
      const productId = parseInt(highlightId);
      setHighlightedProduct(productId);
      // Highlight the product after products are loaded
      setTimeout(() => highlightProduct(productId), 1500);
    }
  }, [location.search, highlightProduct]);

  // Configure GSAP for better performance
  useEffect(() => {
    gsap.config({ nullTargetWarn: false, force3D: true });
  }, []);

  // Initial animations
  useEffect(() => {
    if (isLoading || !pageTitleRef.current || !pageSubtitleRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(pageTitleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })
      .fromTo(pageSubtitleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8")
      .fromTo(productsControlsRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6");
    if (categoryFiltersRef.current?.children) {
      tl.fromTo(categoryFiltersRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.4");
    }
    return () => tl.kill();
  }, [isLoading]);

  // Product item animations
  useEffect(() => {
    if (isLoading || displayedProducts.length === 0) return;
    const items = productItemsRef.current.filter(item => item && !item._isAnimated);
    if (items.length === 0) return;
    items.forEach((item, index) => {
      item._isAnimated = true;
      gsap.fromTo(item, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: "power2.out" });
    });
  }, [displayedProducts, isLoading]);

  if (isLoading && displayedProducts.length === 0) {
    return (
      <div className="products"><div className="container"><div className="loading-indicator"><div className="loading-spinner"></div><p>Loading exquisite pieces...</p></div></div></div>
    );
  }

  return (
    <div className="products">
      <div className="container">
        <div className="page-header" ref={pageHeaderRef}>
          <h1 ref={pageTitleRef}>Artisan Collection</h1>
          <p ref={pageSubtitleRef}>Discover exquisite handcrafted furniture pieces that blend art with functionality</p>
        </div>

        <div className="products-controls" ref={productsControlsRef}>
          <div className="controls-left">
            <h2>{getCategoryName(activeCategory)}</h2>
            <span className="products-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'masterpiece' : 'masterpieces'} available</span>
          </div>
        </div>

        <div className="category-filters" ref={categoryFiltersRef}>
          {['all', 'side', 'coffee', 'decorative'].map(category => (
            <button 
              key={category} 
              className={`category-filter ${activeCategory === category ? 'active' : ''}`} 
              onClick={() => handleCategoryFilter(category)}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="product-stream" ref={productStreamRef}>
          {displayedProducts.map((product) => {
            const currentImageIndex = imageIndexes[product.id] || 0;
            const images = availableImages[product.id] || [];
            const imageCount = images.length;
            const isHighlighted = highlightedProduct === product.id;
            
            return (
              <div 
                key={product.id} 
                className={`product-detail-stream ${isHighlighted ? 'highlighted' : ''}`}
                ref={addToProductItemsRef} 
                data-product-id={product.id}
              >
                <div className="product-gallery">
                  <div className="gallery-main">
                    <div className="image-container">
                      <img 
                        src={getCurrentImage(product.id)} 
                        alt={product.name} 
                        className={`gallery-image ${imageLoadingStates[`${product.id}-${currentImageIndex}`] ? 'loading' : ''}`}
                        onLoad={() => handleImageLoad(product.id, currentImageIndex)}
                        onError={(e) => handleImageError(e, product.id, currentImageIndex)}
                        onLoadStart={() => handleImageStartLoad(product.id, currentImageIndex)}
                        loading="lazy"
                      />
                      {imageLoadingStates[`${product.id}-${currentImageIndex}`] && (
                        <div className="image-loading-overlay">
                          <div className="loading-spinner-small"></div>
                        </div>
                      )}
                    </div>
                    {imageCount > 1 && (
                      <div className="gallery-nav">
                        <button className="nav-btn" onClick={(e) => handlePrevImage(product.id, e)}>‹</button>
                        <button className="nav-btn" onClick={(e) => handleNextImage(product.id, e)}>›</button>
                      </div>
                    )}
                  </div>
                  
                  <div className="gallery-thumbnails">
                    {Array.from({ length: 3 }, (_, index) => {
                      const isEmpty = isThumbnailEmpty(product.id, index);
                      return (
                        <div 
                          key={index} 
                          className={`thumbnail ${!isEmpty && index === currentImageIndex ? 'active' : ''} ${isEmpty ? 'thumbnail-empty' : ''}`}
                          onClick={(e) => !isEmpty && handleThumbnailClick(product.id, index, e)}
                        >
                          {!isEmpty ? (
                            <div className="thumbnail-image-container">
                              <img 
                                src={getThumbnailImage(product.id, index)} 
                                alt={`${product.name} view ${index + 1}`} 
                                className={`thumbnail-image ${imageLoadingStates[`${product.id}-${index}`] ? 'loading' : ''}`}
                                onLoad={() => handleImageLoad(product.id, index)}
                                onError={(e) => handleImageError(e, product.id, index)}
                                onLoadStart={() => handleImageStartLoad(product.id, index)}
                                loading="lazy"
                              />
                              {imageLoadingStates[`${product.id}-${index}`] && (
                                <div className="thumbnail-loading-overlay"></div>
                              )}
                            </div>
                          ) : (
                            <div className="thumbnail-placeholder"><span>+</span></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-header">
                    <span className="product-category">{getCategoryName(product.category)} • Item #{product.itemCode}</span>
                    <h2 className="product-title">{product.name}</h2>
                    <div className="product-price">{formatPrice(product.price)}</div>
                  </div>
                  
                  <div className="product-description"><p>{product.description}</p></div>
                  
                  {product.features && product.features.length > 0 && (
                    <div className="product-features">
                      <h4>Craftsmanship Details</h4>
                      {product.features.map((feature, index) => (
                        <div key={index} className="feature-item">{feature}</div>
                      ))}
                    </div>
                  )}
                  
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
                  
                  <div className="product-actions-minimal">
                    <button 
                      className="btn-inquire" 
                      onClick={() => handleInquire(product)} 
                      onMouseEnter={handleInquireHover} 
                      onMouseLeave={handleInquireLeave}
                    >
                      Request This Piece
                    </button>
                    <button 
                      className="btn-save" 
                      onClick={() => handleSave(product)} 
                      onMouseEnter={handleSaveHover} 
                      onMouseLeave={handleSaveLeave}
                    >
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isLoading && displayedProducts.length === 0 && (
          <div className="no-products">
            <div className="no-products-content">
              <h3>Curating Your Collection</h3>
              <p>We're preparing exceptional pieces for this category.</p>
              <button className="btn-reset-filters" onClick={() => handleCategoryFilter('all')}>
                Explore All Collections
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;