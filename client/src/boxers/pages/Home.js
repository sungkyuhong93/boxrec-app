import React from "react";
import HomeHero from "../components/HomeHero";
import HomeSquares from "../components/HomeSquares";
import FighterGrid from "../components/FighterGrid";

const Home = () => {
  return (
    <div className="home">
      <div className="home-inner site-padding">
        <HomeHero />
        <FighterGrid />
      </div>
    </div>
  );
};

export default Home;
