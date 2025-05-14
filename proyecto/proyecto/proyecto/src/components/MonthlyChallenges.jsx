import React from "react";
import "./MonthlyChallenges.css";
import Logo from "../assets/logo.png";

export default function MonthlyChallenges() {
  const challenges = [
    { id: 1, name: "Morning Walk", completed: true },
    { id: 2, name: "Pet Training", completed: true },
    { id: 3, name: "Grooming Session", completed: false },
    { id: 4, name: "Playtime", completed: false },
    { id: 5, name: "Healthy Treats", completed: false },
    { id: 6, name: "Vet Visit", completed: false },
    { id: 7, name: "Photo Session", completed: false },
    { id: 8, name: "Social Walk", completed: false },
    { id: 9, name: "New Trick", completed: false },
    { id: 10, name: "Park Visit", completed: true },
  ];

  return (
    <div className="monthly-challenges">
      <div className="header">
        <img src={Logo} alt="Logo" className="logo" />
        <h2 className="section-title">Monthly Challenges</h2>
      </div>
      <div className="challenge-list">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`challenge-item ${challenge.completed ? 'completed' : ''}`}
          >
            {challenge.name} {challenge.completed && '✅'}
          </div>
        ))}
      </div>
    </div>
  );
}