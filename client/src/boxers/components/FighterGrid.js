import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profile";

const FighterGrid = ({ getProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="fighter-grid">
      <div className="fighter-grid-inner">
        <h2 id="all">All Fighters</h2>
        <div className="fight-grid-inner-row">
          {profiles.length > 0 ? (
            profiles.map((profile) => {
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
            })
          ) : (
            <h3>No Profiles Found</h3>
          )}
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
