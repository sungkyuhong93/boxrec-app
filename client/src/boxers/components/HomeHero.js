import React from "react";
import heroPic from "../../assets/hero.jpg";

const HomeHero = () => {
  return (
    <div className="home-hero">
      <div
        className="home-hero-inner"
        style={{
          backgroundImage: `url(${heroPic})`,
        }}
      >
        <div className="hero-text">
          <h2>BOXREC</h2>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
