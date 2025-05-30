import React from "react";
import "./Leaderboard.css";
import leader1 from "../assets/leader1.jpg";
import leader2 from "../assets/leader2.jpg";
import leader3 from "../assets/leader3.jpg";
import leader4 from "../assets/leader4.jpg";
import leader5 from "../assets/leader5.jpg";
import leader6 from "../assets/leader6.jpg";
import leader7 from "../assets/leader7.jpg";
import leader8 from "../assets/leader8.jpg";
import leader9 from "../assets/leader9.jpg";
import leader10 from "../assets/leader10.jpg";
import leader11 from "../assets/leader11.jpg";
import leader12 from "../assets/leader12.jpg";
import leader13 from "../assets/leader13.jpg";
import leader14 from "../assets/leader14.jpg";
import leader15 from "../assets/leader15.jpg";
import leader16 from "../assets/leader16.jpg";
import leader17 from "../assets/leader17.jpg";
import leader18 from "../assets/leader18.jpg";
import leader19 from "../assets/leader19.jpg";
import leader20 from "../assets/leader20.jpg";

export default function Leaderboard() {
  const users = [
    { rank: 1, username: "@user_1eett", points: 7053, avatar: leader1 },
    { rank: 2, username: "@user_2eett", points: 7000, avatar: leader2 },
    { rank: 3, username: "@user_3eett", points: 6504, avatar: leader3 },
    { rank: 4, username: "@user_4eett", points: 6350, avatar: leader4 },
    { rank: 5, username: "@user_5eett", points: 6200, avatar: leader5 },
    { rank: 6, username: "@user_6eett", points: 6150, avatar: leader6 },
    { rank: 7, username: "@user_7eett", points: 6100, avatar: leader7 },
    { rank: 8, username: "@user_8eett", points: 6050, avatar: leader8 },
    { rank: 9, username: "@user_9eett", points: 6000, avatar: leader9 },
    { rank: 10, username: "@user_10eett", points: 5950, avatar: leader10 },
    { rank: 11, username: "@user_11eett", points: 5900, avatar: leader11 },
    { rank: 12, username: "@user_12eett", points: 5850, avatar: leader12 },
    { rank: 13, username: "@user_13eett", points: 5800, avatar: leader13 },
    { rank: 14, username: "@user_14eett", points: 5750, avatar: leader14 },
    { rank: 15, username: "@user_15eett", points: 5700, avatar: leader15 },
    { rank: 16, username: "@user_16eett", points: 5650, avatar: leader16 },
    { rank: 17, username: "@user_17eett", points: 5600, avatar: leader17 },
    { rank: 18, username: "@user_18eett", points: 5550, avatar: leader18 },
    { rank: 19, username: "@user_19eett", points: 5500, avatar: leader19 },
    { rank: 20, username: "@user_20eett", points: 5450, avatar: leader20 },
  ];

  return (
    <div className="leaderboard">
      <h2 className="leaderboard-title">LeaderBoard Top 20</h2>
      <div className="leaderboard-list">
        {users.map((user) => (
          <div key={user.rank} className="leaderboard-item">
            <span className="rank">{user.rank}</span>
            <div className="user-info">
              <img src={user.avatar} alt={user.username} className="user-avatar" />
              <span className="username">{user.username}</span>
            </div>
            <span className="points">{user.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}