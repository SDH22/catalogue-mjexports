// Inspiration.jsx - COMPLETELY FIXED for Local Videos (Vite Project Version)
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './Inspiration.css';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

// Configuration
const CONFIG = {
  VIDEO_DURATION: 8000,
  TEXT_DISPLAY_DURATION: 5000,
  ANIMATION_DURATION: 600,
};

// ===== VIDEO DATA WITH CORRECT LOCAL PATHS =====
// IMPORTANT: Videos are in public/videos/inspiration/ folder (note: "videos" is plural)
const VIDEO_DATA = [
  {
    id: 1,
    title: 'Modern Luxury Living',
    description: 'Elegant living space featuring our Cheetah Side Table as a statement piece',
    video: `${import.meta.env.BASE_URL}videos/inspiration/1.mp4`, // Corrected for Vite
    placeholder: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=800&fit=crop',
    color: '#2c5530',
    duration: 8
  },
  {
    id: 2,
    title: 'Coastal Elegance',
    description: 'Beach-inspired interior with Starfish Table and Seahorse Side Table',
    video: `${import.meta.env.BASE_URL}videos/inspiration/2.mp4`, // Corrected for Vite
    placeholder: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=800&fit=crop',
    color: '#1e40af',
    duration: 8
  },
  {
    id: 3,
    title: 'Art Deco Revival',
    description: 'Bold geometric patterns complemented by Peacock and Flamingo tables',
    video: `${import.meta.env.BASE_URL}videos/inspiration/3.mp4`, // Corrected for Vite
    placeholder: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
    color: '#7c2d12',
    duration: 8
  },
  {
    id: 4,
    title: 'Safari Theme',
    description: 'Wildlife-inspired setting with Elephant and Giraffe accent pieces',
    video: `${import.meta.env.BASE_URL}videos/inspiration/4.mp4`, // Corrected for Vite
    placeholder: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&h=800&fit=crop',
    color: '#854d0e',
    duration: 8
  }
];

// VideoPlayer Component
const VideoPlayer = ({ video, isPlaying, onError, onCanPlay, onEnded, onLoadStart, onPlayError }) => {
  const videoRef = useRef(null);

  // Handle play/pause
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✓ Video playing successfully');
          })
          .catch(err => {
            console.warn('Play failed:', err.message);
            onPlayError && onPlayError(err);
          });
      }
    } else {
      videoElement.pause();
    }
  }, [isPlaying, onPlayError]);

  // Load new video when video changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      console.log('🎬 Loading video:', video.video);
      videoElement.src = video.video;
      videoElement.load();
      
      // Try to play after load
      if (isPlaying) {
        videoElement.play().catch(err => {
          console.warn('Auto-play failed:', err.message);
          onPlayError && onPlayError(err);
        });
      }
    }
  }, [video.id, video.video, isPlaying, onPlayError]);

  return (
    <video
      ref={videoRef}
      className="commercial-video"
      muted
      playsInline
      preload="metadata"
      onEnded={onEnded}
      onError={onError}
      onCanPlay={onCanPlay}
      onLoadStart={onLoadStart}
      aria-label={`Video showcasing ${video.title}`}
    />
  );
};

// ErrorFallback Component
const ErrorFallback = ({ video }) => (
  <div className="video-error-fallback">
    <div className="error-content">
      <div className="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2zm0-10h2v8h-2z"/>
        </svg>
      </div>
      <h3>Video Not Found</h3>
      <p>Unable to load: "{video.title}"</p>
      <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '0.5rem', wordBreak: 'break-all' }}>
        Path: {video.video}
      </p>
      <div style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '1rem', lineHeight: 1.6 }}>
        <p>Check that:</p>
        <p>1. Video file exists in public/videos/inspiration/</p>
        <p>2. Filename matches exactly (1.mp4, 2.mp4, etc.)</p>
        <p>3. File format is MP4</p>
      </div>
      <span className="error-badge">Video Missing</span>
    </div>
  </div>
);

// LoadingSpinner Component
const LoadingSpinner = () => (
  <div className="video-loading" role="status" aria-live="polite">
    <div className="loading-spinner"></div>
    <span>Loading video...</span>
  </div>
);

// TextOverlay Component
const TextOverlay = ({ video, show }) => {
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current || !titleRef.current || !descRef.current) return;

    if (show) {
      gsap.set([titleRef.current, descRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: CONFIG.ANIMATION_DURATION / 1000,
        ease: "power2.out"
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
      });

      gsap.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: "power2.out"
      });

      const hideTimeout = setTimeout(() => {
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: CONFIG.ANIMATION_DURATION / 1000,
            ease: "power2.in"
          });
        }
      }, CONFIG.TEXT_DISPLAY_DURATION);

      return () => clearTimeout(hideTimeout);
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: CONFIG.ANIMATION_DURATION / 1000,
        ease: "power2.in"
      });
    }
  }, [show, video.id]);

  return (
    <div 
      ref={overlayRef}
      className="text-overlay"
      style={{ '--accent-color': video.color }}
      aria-live="polite"
    >
      <div className="text-content">
        <h2 ref={titleRef} className="video-title">
          {video.title}
        </h2>
        <p ref={descRef} className="video-description">
          {video.description}
        </p>
      </div>
    </div>
  );
};

// ControlButton Component
const ControlButton = ({ onClick, disabled, title, children, size = 'medium', ariaLabel }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClass = {
    small: 'control-btn-small',
    medium: 'control-btn-medium', 
    large: 'control-btn-large'
  }[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel || title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`control-btn ${sizeClass} ${isHovered && !disabled ? 'hover' : ''} ${disabled ? 'disabled' : ''}`}
    >
      {children}
    </button>
  );
};

// ProgressBar Component
const ProgressBar = ({ current, total, color }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      const progress = ((current + 1) / total) * 100;
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [current, total]);
  
  return (
    <div className="progress-indicator" role="progressbar" 
         aria-valuenow={current + 1} aria-valuemin="1" aria-valuemax={total}>
      <div className="progress-track">
        <div 
          ref={progressRef}
          className="progress-fill"
          style={{ 
            backgroundColor: color,
            width: '0%'
          }} 
        />
      </div>
      <span className="progress-text">
        {current + 1} / {total}
      </span>
    </div>
  );
};

// Main Component
const Inspiration = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showText, setShowText] = useState(true);
  const [videoLoadErrors, setVideoLoadErrors] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  
  const tvFrameRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  const currentVideo = VIDEO_DATA[currentVideoIndex];
  const hasError = videoLoadErrors.has(currentVideoIndex);

  // Clear auto-play timer
  const clearAutoPlayTimer = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  // Handle video end
  const handleVideoEnd = useCallback(() => {
    console.log('📹 Video ended, moving to next');
    clearAutoPlayTimer();
    const nextIndex = (currentVideoIndex + 1) % VIDEO_DATA.length;
    setCurrentVideoIndex(nextIndex);
    setIsPlaying(true); // Auto-play next video
  }, [currentVideoIndex, clearAutoPlayTimer]);

  // Handle video error
  const handleVideoError = useCallback((e) => {
    const videoElement = e.target;
    const error = videoElement.error;
    
    console.error('❌ Video Error for:', currentVideo.video);
    
    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          console.error('   Error: Video loading aborted');
          break;
        case error.MEDIA_ERR_NETWORK:
          console.error('   Error: Network error - check if file exists');
          break;
        case error.MEDIA_ERR_DECODE:
          console.error('   Error: Video decoding failed - check file format');
          break;
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          console.error('   Error: Video format not supported or file not found');
          break;
        default:
          console.error('   Error: Unknown error');
      }
      console.error('   Full path:', videoElement.src);
    }
    
    setVideoLoadErrors(prev => {
      const newSet = new Set(prev);
      newSet.add(currentVideoIndex);
      return newSet;
    });
    setIsLoading(false);
    setIsPlaying(false); // Stop trying to play if there's an error
  }, [currentVideoIndex, currentVideo.video]);

  // Handle video ready
  const handleVideoCanPlay = useCallback(() => {
    console.log('✅ Video ready:', currentVideo.video);
    setIsLoading(false);
  }, [currentVideo.video]);

  // Handle video load start
  const handleVideoLoadStart = useCallback(() => {
    console.log('⏳ Loading video:', currentVideo.video);
    setIsLoading(true);
  }, [currentVideo.video]);

  // Handle play error
  const handlePlayError = useCallback((err) => {
    console.warn('⏸️ Auto-play blocked or failed:', err.message);
    setIsPlaying(false);
  }, []);

  // Navigation functions
  const nextVideo = useCallback(() => {
    clearAutoPlayTimer();
    const nextIndex = (currentVideoIndex + 1) % VIDEO_DATA.length;
    console.log('⏭️ Next video:', nextIndex + 1);
    setCurrentVideoIndex(nextIndex);
    setIsLoading(true);
    setIsPlaying(true); // Auto-play next video
  }, [currentVideoIndex, clearAutoPlayTimer]);

  const prevVideo = useCallback(() => {
    clearAutoPlayTimer();
    const prevIndex = (currentVideoIndex - 1 + VIDEO_DATA.length) % VIDEO_DATA.length;
    console.log('⏮️ Previous video:', prevIndex + 1);
    setCurrentVideoIndex(prevIndex);
    setIsLoading(true);
    setIsPlaying(true); // Auto-play previous video
  }, [currentVideoIndex, clearAutoPlayTimer]);

  const togglePlay = useCallback(() => {
    if (hasError) return;
    setIsPlaying(prev => !prev);
  }, [hasError]);

  const toggleText = useCallback(() => {
    setShowText(prev => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextVideo();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevVideo();
          break;
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          toggleText();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextVideo, prevVideo, togglePlay, toggleText]);

  // Auto-play timer
  useEffect(() => {
    clearAutoPlayTimer();
    
    // Only set timer if video is playing, no error, and not loading
    if (isPlaying && !hasError && !isLoading) {
      console.log(`⏱️ Auto-advance set for ${currentVideo.duration} seconds`);
      autoPlayTimerRef.current = setTimeout(() => {
        handleVideoEnd();
      }, currentVideo.duration * 1000);
    }

    return clearAutoPlayTimer;
  }, [currentVideoIndex, isPlaying, hasError, isLoading, currentVideo.duration, handleVideoEnd, clearAutoPlayTimer]);

  // Initialize TV frame animation
  useEffect(() => {
    if (tvFrameRef.current) {
      gsap.fromTo(tvFrameRef.current,
        {
          scale: 0.9,
          opacity: 0,
          rotationY: 10
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "power3.out"
        }
      );
    }
  }, []);

  // Debug: Log video paths on mount
  useEffect(() => {
    console.log('═══════════════════════════════════');
    console.log('🎬 VIDEO PATHS CONFIGURATION');
    console.log('═══════════════════════════════════');
    console.log('BASE_URL (Vite):', import.meta.env.BASE_URL || '(empty)'); // Log for Vite
    console.log('───────────────────────────────────');
    VIDEO_DATA.forEach((video, index) => {
      console.log(`Video ${index + 1}:`, video.video);
    });
    console.log('═══════════════════════════════════');
    console.log('Expected location: public/videos/inspiration/');
    console.log('Make sure files are named: 1.mp4, 2.mp4, 3.mp4, 4.mp4');
    console.log('═══════════════════════════════════');
  }, []);

  return (
    <div className="tv-commercial-container" role="main" aria-label="Artisan Collection Inspiration Showcase">
      
      {/* TV Frame */}
      <div className="tv-frame" ref={tvFrameRef}>
        
        {/* TV Screen */}
        <div className="tv-screen">
          {hasError ? (
            <ErrorFallback video={currentVideo} />
          ) : (
            <>
              <VideoPlayer
                video={currentVideo}
                isPlaying={isPlaying}
                onError={handleVideoError}
                onCanPlay={handleVideoCanPlay}
                onEnded={handleVideoEnd}
                onLoadStart={handleVideoLoadStart}
                onPlayError={handlePlayError}
              />
              {isLoading && <LoadingSpinner />}
            </>
          )}
          
          <TextOverlay video={currentVideo} show={showText} />
        </div>

        {/* TV Controls */}
        <div className="tv-controls" role="toolbar" aria-label="Video controls">
          
          <ControlButton 
            onClick={prevVideo} 
            title="Previous Video (←)" 
            ariaLabel="Previous video"
            size="small"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </ControlButton>

          <ControlButton 
            onClick={toggleText} 
            title={showText ? "Hide Text (T)" : "Show Text (T)"}
            ariaLabel={showText ? "Hide text overlay" : "Show text overlay"}
            size="small"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17h18v2H3zm0-4h18v2H3zm0-4h18v2H3zm0-6v2h18V3z"/>
            </svg>
          </ControlButton>
          
          <ControlButton 
            onClick={togglePlay}
            disabled={hasError}
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            size="large"
            ariaLabel={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </ControlButton>

          <ControlButton 
            onClick={nextVideo} 
            title="Next Video (→)"
            ariaLabel="Next video"
            size="small"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </ControlButton>

          <ProgressBar 
            current={currentVideoIndex} 
            total={VIDEO_DATA.length} 
            color={currentVideo.color}
          />
        </div>

        {/* TV Branding */}
        <div className="tv-branding">
          <div className="brand-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="brand-name">Artisan Collection</span>
        </div>
      </div>

      {/* Ambient Lighting */}
      <div 
        className="ambient-light" 
        style={{ '--glow-color': currentVideo.color }}
        aria-hidden="true" 
      />

      {/* Screen Reader Announcements */}
      <div className="sr-announcement" role="status" aria-live="polite" aria-atomic="true">
        Now showing: {currentVideo.title}. {currentVideo.description}
      </div>
    </div>
  );
};

export default Inspiration;