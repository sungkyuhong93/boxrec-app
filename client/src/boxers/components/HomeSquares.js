import React from "react";
import HomeSquare from "./HomeSquare";

const HOME_SQUARES = [
  {
    id: 1,
    header: "CONVERSES",
    buttonText: "SHOP NOW",
    url: "/",
  },
  {
    id: 2,

    header: "JORDANS",
    buttonText: "SHOP NOW",
    url: "/",
  },
  {
    id: 3,

    header: "NIKES",
    buttonText: "SHOP NOW",
    url: "/",
  },
  {
    id: 4,

    header: "ADIDAS",
    buttonText: "SHOP NOW",
    url: "/",
  },
];

const HomeSquares = () => {
  return (
    <div className="home-squares">
      <div className="home-squares-inner">
        {HOME_SQUARES.map((homeSquare) => {
          return (
            <HomeSquare
              key={homeSquare.id}
              image={homeSquare.imageUrl}
              header={homeSquare.header}
              buttonText={homeSquare.buttonText}
              url={homeSquare.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomeSquares;
