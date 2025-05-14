import React, { useRef } from "react";
import "./TopFive.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import user4 from "../assets/user4.jpg";
import user5 from "../assets/user5.jpg";

export default function TopFive() {
  const scrollRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const topUsers = [
    { rank: 1, username: "@user_1eett", image: user1 },
    { rank: 2, username: "@user_2eett", image: user2 },
    { rank: 3, username: "@user_3eett", image: user3 },
    { rank: 4, username: "@user_4eett", image: user4 },
    { rank: 5, username: "@user_5eett", image: user5 },
  ];

  return (
    <div className="top-five-section">
      <div className="top-five-title-container">
        <h2 className="top-five-title">Top Global Monthly Challenges</h2>
      </div>
      <div className="top-five-container">
        <button 
          className="scroll-button prev" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="top-five-scroll" ref={scrollRef}>
          {topUsers.map((user) => (
            <div key={user.rank} className="top-user-card">
              <div className="rank-badge">TOP {user.rank}</div>
              <div className="card-content">
                <img src={user.image} alt={user.username} className="user-image" />
                <p className="username">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="scroll-button next" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}