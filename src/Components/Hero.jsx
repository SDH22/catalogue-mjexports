import React, { useRef, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Hero.css'

const Hero = () => {
  const videoRef = useRef(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Your video clips array - MAKE SURE THESE FILES EXIST IN public/videos/
  const videoClips = [
    '/videos/clip1.mp4',
    '/videos/clip2.mp4', 
    '/videos/clip3.mp4',
    '/videos/clip4.mp4' // Added the 4th clip
  ]

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoad = () => {
        setIsVideoLoaded(true)
        // Programmatically play the video to ensure it starts
        video.play().catch(error => {
          console.log('Video play failed:', error)
          // If autoplay fails, try muted play
          video.muted = true
          video.play().catch(console.error)
        })
      }

      video.addEventListener('loadeddata', handleLoad)
      video.addEventListener('ended', playNextVideo)

      // Try to load and play immediately
      video.load()
      
      return () => {
        video.removeEventListener('loadeddata', handleLoad)
        video.removeEventListener('ended', playNextVideo)
      }
    }
  }, [currentVideoIndex])

  const playNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      (prevIndex + 1) % videoClips.length
    )
  }

  // Manual video selection
  const selectVideo = (index) => {
    setCurrentVideoIndex(index)
    setIsVideoLoaded(false)
  }

  return (
    <section className="hero">
      {/* Video Background */}
      <div className={`hero-video ${isVideoLoaded ? 'loaded' : ''}`}>
        <video
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/images/hero-fallback.jpg"
        >
          <source src={videoClips[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
        
        {/* Video Controls */}
        <div className="video-controls">
          <p>Playing: Clip {currentVideoIndex + 1} of {videoClips.length}</p>
          <div className="video-thumbnails">
            {videoClips.map((_, index) => (
              <button
                key={index}
                className={`thumb-btn ${index === currentVideoIndex ? 'active' : ''}`}
                onClick={() => selectVideo(index)}
              >
                Clip {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fallback Image - Only show if video fails */}
      {!isVideoLoaded && (
        <div className="hero-fallback">
          <LazyLoadImage
            src="/images/hero-fallback.jpg"
            alt="MJ Exports Global Trade"
            effect="blur"
            width="100%"
            height="100%"
          />
        </div>
      )}

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Global Export</span>
            <span className="title-line">Solutions</span>
          </h1>
          <p className="hero-subtitle">
            Connecting businesses worldwide with reliable export services, 
            quality products, and seamless logistics solutions.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Explore Services</button>
            <button className="btn-secondary">Watch Story</button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Clients Worldwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">13+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-cards">
            <div className="floating-card card-1">
              <LazyLoadImage
                src="/images/product-preview-1.jpg"
                alt="Export Products"
                effect="blur"
                width="100%"
                height="100%"
              />
            </div>
            <div className="floating-card card-2">
              <LazyLoadImage
                src="/images/product-preview-2.jpg"
                alt="Quality Assurance"
                effect="blur"
                width="100%"
                height="100%"
              />
            </div>
            <div className="floating-card card-3">
              <LazyLoadImage
                src="/images/product-preview-3.jpg"
                alt="Global Logistics"
                effect="blur"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero