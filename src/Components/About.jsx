import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from './OptimizedImage';
import './About.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Refs for animation elements
  const pageHeaderRef = useRef(null);
  const pageTitleRef = useRef(null);
  const pageSubtitleRef = useRef(null);
  
  const aboutHeroRef = useRef(null);
  const aboutTextRef = useRef(null);
  const aboutImageRef = useRef(null);
  
  const valuesSectionRef = useRef(null);
  const valueCardsRef = useRef([]);
  
  const teamSectionRef = useRef(null);
  const teamTitleRef = useRef(null);
  const commitmentTextRef = useRef(null);
  const statsGridRef = useRef(null);
  const statItemsRef = useRef([]);

  // Add to value cards ref array
  const addToValueCardsRef = (el) => {
    if (el && !valueCardsRef.current.includes(el)) {
      valueCardsRef.current.push(el);
    }
  };

  // Add to stat items ref array
  const addToStatItemsRef = (el) => {
    if (el && !statItemsRef.current.includes(el)) {
      statItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Page header animation
    const headerTl = gsap.timeline();
    headerTl
      .fromTo(pageTitleRef.current,
        { y: 80, opacity: 0, rotationX: 15 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.4, ease: "power3.out" }
      )
      .fromTo(pageSubtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.6"
      );

    // About hero section animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutHeroRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    heroTl
      .fromTo(aboutTextRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "power3.out" }
      )
      .fromTo(aboutImageRef.current,
        { x: 60, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
        "-=1"
      );

    // Values section animations
    valueCardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        {
          y: 100,
          opacity: 0,
          rotationY: 15,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          },
          ease: "back.out(1.4)"
        }
      );
    });

    // Team section animations
    gsap.fromTo(teamTitleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      }
    );

    // Commitment text animation
    gsap.fromTo(commitmentTextRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.4,
        scrollTrigger: {
          trigger: commitmentTextRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      }
    );

    // Stats grid animation
    gsap.fromTo(statsGridRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.4,
        scrollTrigger: {
          trigger: statsGridRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        },
        ease: "power3.out"
      }
    );

    // Stats items counter animation
    statItemsRef.current.forEach((stat, index) => {
      const numberElement = stat.querySelector('.stat-number');
      const originalText = numberElement.textContent;
      
      gsap.fromTo(stat,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          },
          onStart: () => {
            // Animate numbers counting up
            if (originalText.includes('+') || originalText.includes('%') || !isNaN(parseInt(originalText))) {
              const num = parseInt(originalText) || (originalText === '100%' ? 100 : 0);
              if (!isNaN(num)) {
                gsap.fromTo(numberElement,
                  { innerText: 0 },
                  {
                    innerText: num,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    onUpdate: function() {
                      const currentValue = Math.floor(this.targets()[0].innerText);
                      numberElement.innerText = originalText.includes('%') 
                        ? currentValue + '%'
                        : originalText.includes('+')
                        ? currentValue + '+'
                        : currentValue + (originalText.includes('k') ? 'k+' : '');
                    }
                  }
                );
              }
            }
          },
          ease: "back.out(1.7)"
        }
      );
    });

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="about-page">
      <div className="page-header" ref={pageHeaderRef}>
        <h1 ref={pageTitleRef}>Our Story</h1>
        <p ref={pageSubtitleRef}>Three generations of craftsmanship and design excellence</p>
      </div>

      <div className="about-container">
        <section className="about-hero" ref={aboutHeroRef}>
          <div className="about-hero-content">
            <div className="about-text" ref={aboutTextRef}>
              <h2>Design. Craft. Endure.</h2>
              <p>
                For over two decades, MJ Exports has been at the forefront of furniture design 
                and manufacturing. Our journey began with a simple belief: that furniture should 
                be built to last for generations, not just for seasons.
              </p>
              <p>
                Each piece in our collection represents a commitment to exceptional craftsmanship, 
                sustainable materials, and timeless design that transcends trends. We work with 
                master artisans and utilize the finest materials to create furniture that becomes 
                part of your story.
              </p>
            </div>
            <div className="about-image" ref={aboutImageRef}>
              <OptimizedImage 
                src="/images/about/workshop.jpg" 
                alt="Our Workshop - Master craftsmen creating premium furniture"
                aspectRatio="3/4"
              />
            </div>
          </div>
        </section>

        <section className="values-section" ref={valuesSectionRef}>
          <div className="values-grid">
            <div className="value-card" ref={addToValueCardsRef}>
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We source materials responsibly and prioritize environmental stewardship in every step of our process, ensuring minimal ecological impact.</p>
            </div>
            <div className="value-card" ref={addToValueCardsRef}>
              <div className="value-icon">⚒️</div>
              <h3>Craftsmanship</h3>
              <p>Traditional techniques meet modern design in pieces built to withstand the test of time, with attention to every detail.</p>
            </div>
            <div className="value-card" ref={addToValueCardsRef}>
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously evolve our designs and processes to meet the needs of modern living while maintaining timeless appeal.</p>
            </div>
          </div>
        </section>

        <section className="team-section" ref={teamSectionRef}>
          <h2 ref={teamTitleRef}>Our Commitment to Excellence</h2>
          <div className="commitment-content">
            <div className="commitment-text" ref={commitmentTextRef}>
              <p>
                We believe that great furniture should be accessible without compromising on quality 
                or design. Our direct-to-customer model allows us to maintain the highest standards 
                while offering exceptional value that lasts a lifetime.
              </p>
              <p>
                Every piece is backed by our comprehensive warranty and commitment to customer 
                satisfaction. We're not just selling furniture; we're helping you create spaces 
                where life happens, memories are made, and stories unfold.
              </p>
              <p>
                Our team of designers, craftsmen, and client specialists work together to ensure 
                that every piece not only meets but exceeds your expectations for quality, 
                functionality, and aesthetic appeal.
              </p>
            </div>
            <div className="stats-grid" ref={statsGridRef}>
              <div className="stat-item" ref={addToStatItemsRef}>
                <span className="stat-number">20+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-item" ref={addToStatItemsRef}>
                <span className="stat-number">15k+</span>
                <span className="stat-label">Pieces Delivered</span>
              </div>
              <div className="stat-item" ref={addToStatItemsRef}>
                <span className="stat-number">50+</span>
                <span className="stat-label">Countries Served</span>
              </div>
              <div className="stat-item" ref={addToStatItemsRef}>
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;