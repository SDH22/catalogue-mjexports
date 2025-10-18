import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Refs for animation elements
  const heroRef = useRef(null);
  const brandLogoRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  const featuredSectionRef = useRef(null);
  const showcaseHeaderRef = useRef(null);
  const previewItemsRef = useRef([]);
  
  const philosophySectionRef = useRef(null);
  const philosophyContentRef = useRef(null);
  const statsRef = useRef([]);
  
  const contactCtaRef = useRef(null);

  // Add to preview items ref array
  const addToPreviewItemsRef = (el) => {
    if (el && !previewItemsRef.current.includes(el)) {
      previewItemsRef.current.push(el);
    }
  };

  // Add to stats ref array
  const addToStatsRef = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl
      .fromTo(brandLogoRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(heroTitleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(heroSubtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(heroCtaRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.4"
      );

    // Scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      opacity: 0.6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Featured section animations with ScrollTrigger
    gsap.fromTo(showcaseHeaderRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: featuredSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      }
    );

    // Preview items staggered animation
    previewItemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { y: 80, opacity: 0, rotationX: 10 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          ease: "power3.out"
        }
      );
    });

    // Philosophy section animations
    gsap.fromTo(philosophyContentRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        scrollTrigger: {
          trigger: philosophySectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      }
    );

    // Stats counter animation
    statsRef.current.forEach((stat, index) => {
      const numberElement = stat.querySelector('.stat-number');
      const originalText = numberElement.textContent;
      
      gsap.fromTo(stat,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: philosophySectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          },
          onStart: () => {
            // Animate numbers counting up
            if (originalText.includes('+') || originalText.includes('%')) {
              const num = parseInt(originalText);
              if (!isNaN(num)) {
                gsap.fromTo(numberElement,
                  { innerText: 0 },
                  {
                    innerText: num,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    onUpdate: function() {
                      numberElement.innerText = Math.floor(this.targets()[0].innerText) + originalText.replace(num, '');
                    }
                  }
                );
              }
            }
          },
          ease: "back.out(1.5)"
        }
      );
    });

    // Contact CTA animation
    gsap.fromTo(contactCtaRef.current,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: contactCtaRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      }
    );

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="home" ref={heroRef}>
      {/* Hero Section */}
      <section className="video-hero">
        <div className="video-container">
          <div 
            className="hero-video"
            style={{
              backgroundImage: `url(/images/home/1.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <div className="video-content">
            <div className="content-wrapper">
              <div className="brand-logo" ref={brandLogoRef}>
                <h1>AJ Exports</h1>
              </div>
              <h2 className="hero-title" ref={heroTitleRef}>
                Crafted for<br />Modern Living
              </h2>
              <p className="hero-subtitle" ref={heroSubtitleRef}>
                Timeless furniture pieces that transform spaces and inspire life
              </p>
              <div className="hero-cta" ref={heroCtaRef}>
                <Link to="/products" className="cta-primary">
                  Explore Collection
                </Link>
                <a href="#featured" className="cta-secondary">
                  View Featured
                </a>
              </div>
            </div>
          </div>

          <div className="scroll-indicator" ref={scrollIndicatorRef}>
            <span>Scroll to Discover</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="featured-showcase" ref={featuredSectionRef}>
        <div className="container-premium">
          <div className="showcase-header" ref={showcaseHeaderRef}>
            <h2>Curated Collection</h2>
            <p>Essential pieces for the modern home</p>
          </div>
          
          <div className="products-preview">
            <div className="preview-grid">
              <div className="preview-item" ref={addToPreviewItemsRef}>
                <div className="preview-image">
                  <img 
                    src="/images/home/2.jpg" 
                    alt="Luxury Sofa" 
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                  />
                </div>
                <h3>Giraffe Premium</h3>
                <p>Seating Collection</p>
              </div>
              
              <div className="preview-item" ref={addToPreviewItemsRef}>
                <div className="preview-image">
                  <img 
                    src="/images/home/3.jpg" 
                    alt="Dining Table" 
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                  />
                </div>
                <h3>Peacock Classic</h3>
                <p>Dining Collection</p>
              </div>
              
              <div className="preview-item" ref={addToPreviewItemsRef}>
                <div className="preview-image">
                  <img 
                    src="/images/home/4.jpg" 
                    alt="Lounge Chair" 
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                  />
                </div>
                <h3>Snake Table</h3>
                <p>Seating Collection</p>
              </div>
            </div>
            
            <div className="preview-cta">
              <Link to="/products" className="cta-outline">
                View All Pieces
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="minimal-philosophy" ref={philosophySectionRef}>
        <div className="container-premium">
          <div className="philosophy-content" ref={philosophyContentRef}>
            <h2>Design. Craft. Endure.</h2>
            <p>
              Each piece in our collection represents a commitment to exceptional craftsmanship, 
              sustainable materials, and timeless design that transcends trends.
            </p>
            <div className="philosophy-stats">
              <div className="stat" ref={addToStatsRef}>
                <span className="stat-number">20+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat" ref={addToStatsRef}>
                <span className="stat-number">100%</span>
                <span className="stat-label">Sustainable Materials</span>
              </div>
              <div className="stat" ref={addToStatsRef}>
                <span className="stat-number">Global</span>
                <span className="stat-label">Export Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta" ref={contactCtaRef}>
        <div className="container-premium">
          <div className="cta-content">
            <h2>Ready to Transform Your Space?</h2>
            <p>Contact us for custom solutions and bulk orders</p>
            <Link 
              to="/contact" 
              className="cta-primary"
              onClick={() => window.scrollTo(0, 0)}
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;