import React, { useState, useEffect, useRef } from "react";
import "./Stats.css";

const AnimatedStat = ({ number, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(number.replace(/,/g, ''));
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, number, duration]);

  const displayNumber = count.toLocaleString();

  return (
    <div ref={ref} className="stat-card">
      <div className={`stat-number ${isVisible ? 'animated' : ''}`}>
        {displayNumber}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Stats = () => {
  const statsData = [
    { number: '1234', label: 'Happy Clients' },
    { number: '567', label: 'Projects Completed' },
    { number: '89', label: 'Awards Won' },
    { number: '15', label: 'Years Experience' }
  ];

  return (
    <div className="stats-container">
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <AnimatedStat
            key={index}
            number={stat.number}
            label={stat.label}
            duration={2000 + index * 500}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;