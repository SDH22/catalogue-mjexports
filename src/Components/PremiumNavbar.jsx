import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './PremiumNavbar.css';

const PremiumNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Refs for GSAP animations
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const mobileMenuBtnRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  // Add to nav links ref array
  const addToNavLinksRef = (el) => {
    if (el && !navLinksRef.current.includes(el)) {
      navLinksRef.current.push(el);
    }
  };

  // Add to mobile links ref array
  const addToMobileLinksRef = (el) => {
    if (el && !mobileLinksRef.current.includes(el)) {
      mobileLinksRef.current.push(el);
    }
  };

  useEffect(() => {
    // Initial navbar animation
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(navLinksRef.current,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.4"
    );

    // Scroll effect with GSAP for smoother transitions
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      if (scrolled) {
        gsap.to(navbarRef.current, {
          background: "rgba(255, 255, 255, 0.98)",
          padding: "var(--space-xs) 0",
          boxShadow: "var(--shadow-md)",
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Scale down logo slightly on scroll
        gsap.to(logoRef.current, {
          scale: 0.95,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(navbarRef.current, {
          background: "rgba(255, 255, 255, 0.8)",
          padding: "var(--space-sm) 0",
          boxShadow: "none",
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Reset logo scale
        gsap.to(logoRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced mobile menu toggle with GSAP
  const toggleMobileMenu = () => {
    if (!isMenuOpen) {
      // Open menu
      setIsMenuOpen(true);
      
      const tl = gsap.timeline();
      
      // Animate hamburger to X
      tl.to(mobileMenuBtnRef.current.querySelectorAll('span'), {
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(mobileMenuBtnRef.current.querySelector('span:nth-child(1)'), {
        y: 6,
        rotation: 45,
        duration: 0.3,
        ease: "power2.inOut"
      }, 0)
      .to(mobileMenuBtnRef.current.querySelector('span:nth-child(2)'), {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut"
      }, 0)
      .to(mobileMenuBtnRef.current.querySelector('span:nth-child(3)'), {
        y: -6,
        rotation: -45,
        duration: 0.3,
        ease: "power2.inOut"
      }, 0)
      
      // Animate mobile menu
      .to(mobileMenuRef.current, {
        y: 0,
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        ease: "power3.out"
      }, 0)
      
      // Animate mobile links
      .fromTo(mobileLinksRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.2"
      );
    } else {
      // Close menu
      const tl = gsap.timeline();
      
      // Animate mobile links out
      tl.to(mobileLinksRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in"
      })
      
      // Animate mobile menu out
      .to(mobileMenuRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0)
      
      // Animate hamburger back
      .to(mobileMenuBtnRef.current.querySelectorAll('span'), {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.2")
      
      // Set state after animation
      .eventCallback("onComplete", () => {
        setIsMenuOpen(false);
      });
    }
  };

  const closeMobileMenu = () => {
    if (isMenuOpen) {
      toggleMobileMenu();
    }
  };

  // Enhanced logo hover animation
  const handleLogoHover = () => {
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: "back.out(1.7)",
      color: "var(--warm-gray-700)"
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      color: "var(--warm-gray-900)"
    });
  };

  // Enhanced nav link hover animations
  const handleNavLinkHover = (event) => {
    const link = event.currentTarget;
    const underline = link.querySelector('.nav-underline');
    
    gsap.to(link, {
      color: "var(--warm-gray-900)",
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(underline, {
      width: "100%",
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleNavLinkLeave = (event) => {
    const link = event.currentTarget;
    const underline = link.querySelector('.nav-underline');
    
    if (!isActiveLink(link.getAttribute('href'))) {
      gsap.to(link, {
        color: "var(--warm-gray-700)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(underline, {
        width: "0%",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  // Enhanced mobile link hover
  const handleMobileLinkHover = (event) => {
    gsap.to(event.currentTarget, {
      x: 10,
      color: "var(--warm-gray-900)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMobileLinkLeave = (event) => {
    gsap.to(event.currentTarget, {
      x: 0,
      color: "var(--warm-gray-700)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav 
        className={`premium-navbar ${isScrolled ? 'scrolled' : ''}`} 
        ref={navbarRef}
      >
        <div className="nav-container">
          {/* Logo - Hem.com style */}
          <Link 
            to="/" 
            className="nav-logo" 
            onClick={closeMobileMenu}
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
          >
            <span className="logo-main" ref={logoRef}>MJ Exports</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            <div className="nav-links">
              <Link 
                to="/products" 
                className={`nav-link ${isActiveLink('/products') ? 'active' : ''}`}
                ref={addToNavLinksRef}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
              >
                <span>Products</span>
                <div className="nav-underline"></div>
              </Link>
              <Link 
                to="/collections" 
                className={`nav-link ${isActiveLink('/collections') ? 'active' : ''}`}
                ref={addToNavLinksRef}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
              >
                <span>Collections</span>
                <div className="nav-underline"></div>
              </Link>
              <Link 
                to="/inspiration" 
                className={`nav-link ${isActiveLink('/inspiration') ? 'active' : ''}`}
                ref={addToNavLinksRef}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
              >
                <span>Inspiration</span>
                <div className="nav-underline"></div>
              </Link>
              <Link 
                to="/about" 
                className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
                ref={addToNavLinksRef}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
              >
                <span>About</span>
                <div className="nav-underline"></div>
              </Link>
              <Link 
                to="/contact" 
                className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                ref={addToNavLinksRef}
                onMouseEnter={handleNavLinkHover}
                onMouseLeave={handleNavLinkLeave}
              >
                <span>Contact</span>
                <div className="nav-underline"></div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            ref={mobileMenuBtnRef}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
        <div className="mobile-menu-content">
          <Link 
            to="/products" 
            onClick={closeMobileMenu}
            ref={addToMobileLinksRef}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
          >
            Products
          </Link>
          <Link 
            to="/collections" 
            onClick={closeMobileMenu}
            ref={addToMobileLinksRef}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
          >
            Collections
          </Link>
          <Link 
            to="/inspiration" 
            onClick={closeMobileMenu}
            ref={addToMobileLinksRef}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
          >
            Inspiration
          </Link>
          <Link 
            to="/about" 
            onClick={closeMobileMenu}
            ref={addToMobileLinksRef}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            onClick={closeMobileMenu}
            ref={addToMobileLinksRef}
            onMouseEnter={handleMobileLinkHover}
            onMouseLeave={handleMobileLinkLeave}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default PremiumNavbar;