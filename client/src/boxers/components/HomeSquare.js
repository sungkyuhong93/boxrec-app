import React from "react";
import { Link } from "react-router-dom";
import HomeSquares from "./HomeSquares";

const HomeSquare = ({ image, header, buttonText, url }) => {
  return (
    <div className="home-square">
      <div className="home-square-inner">
        <Link to={url}>
          <div className="home-square-inner-img">
            <img src={image} />
          </div>

          <div className="home-square-inner-text">
            <h2>{header}</h2>
            <a href={url} className="primary-btn sk-btn">
              {buttonText}
            </a>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeSquare;
