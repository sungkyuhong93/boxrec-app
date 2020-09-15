import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profile";
import loma from "../../assets/loma.jpg";
import teo from "../../assets/teo.jpg";
import shakur from "../../assets/shakur.jpg";
import terrance from "../../assets/crawford.jpg";

const FIGHTERS = [
  {
    id: "1",
    name: "Vasily Lomachenko",
    image: loma,
    wins: "14",
    losses: "1",
    draws: "0",
    kos: "10",
  },
  {
    id: "2",
    name: "Teofimo Lopez",
    image: teo,
    wins: "15",
    losses: "0",
    draws: "0",
    kos: "12",
  },
  {
    id: "3",
    name: "Shakur Stevenson",
    image: shakur,
    wins: "14",
    losses: "0",
    draws: "0",
    kos: "8",
  },
  {
    id: "4",
    name: "Terrance Crawford",
    image: terrance,
    wins: "36",
    losses: "0",
    draws: "0",
    kos: "27",
  },
];

const FighterGrid = ({ getProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="fighter-grid">
      <div className="fighter-grid-inner">
        <h2 id="all">All Fighters</h2>
        <div className="fight-grid-inner-row">
          {FIGHTERS.map((fighter) => {
            return (
              <div className="fighter" key={fighter.id}>
                <div
                  className="fighter-img"
                  style={{
                    backgroundImage: `url(${fighter.image})`,
                  }}
                ></div>

                <div className="fighter-info">
                  <div className="fighter-info-record">
                    <p>{fighter.name}</p>
                    <p>{fighter.wins} Wins</p>
                    <p>{fighter.losses} Losses</p>
                    <p>{fighter.draws} Draws</p>
                    <p>{fighter.kos} KOS</p>

                    <Link
                      to={`/profile/${fighter.id}`}
                      className="sk-btn primary-btn-flip view-profile"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {profiles.map((profile) => {
            return (
              <div className="fighter" key={profile._id}>
                <div
                  className="fighter-img"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_ASSET_URL}/${profile.image})`,
                  }}
                ></div>

                <div className="fighter-info">
                  <div className="fighter-info-record">
                    <p>{profile.user.name}</p>
                    <p>{profile.wins} Wins</p>
                    <p>{profile.losses} Losses</p>
                    <p>{profile.draws} Draws</p>
                    <p>{profile.kos} KOS</p>

                    <Link
                      to={`/profile/${profile._id}`}
                      className="sk-btn primary-btn-flip view-profile"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FighterGrid.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(FighterGrid);
