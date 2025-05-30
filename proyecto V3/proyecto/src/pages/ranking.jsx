import React from "react";
import Navbar from "../components/menu";
import MonthlyChallenges from "../components/MonthlyChallenges";
import TopFive from "../components/TopFive";
import Leaderboard from "../components/Leaaderboard";
import ScrollToTop from '../components/scrollableTop';

export default function Ranking() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex pt-16">
        <MonthlyChallenges />

        <div className="flex-1 ml-[256px] p-8"> {/* Ajustado el margen izquierdo */}
          <div className="max-w-[1200px] mx-auto"> {/* Contenedor con ancho máximo */}
            <TopFive />
            <Leaderboard />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}