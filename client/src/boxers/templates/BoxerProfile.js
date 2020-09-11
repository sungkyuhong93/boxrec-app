import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";

const BoxerProfile = ({ getProfiles, profile: { profiles } }) => {
  const profileId = useParams().id;

  console.log(profiles);

  const loadedProfile = profiles.find((profile) => {
    return profile._id == profileId;
  });
  console.log("loaded profile");
  console.log(loadedProfile);

  return (
    <div className="boxer-profile">
      <div className="boxer-profile-inner site-padding">
        <div className="boxer-profile-img">
          <img
            src={`${process.env.REACT_APP_ASSET_URL}/${loadedProfile.image}`}
          />
        </div>

        <div className="boxer-profile-info">
          <p>Name: {loadedProfile.name}</p>
          <p>Wins: {loadedProfile.wins}</p>
          <p>Losses: {loadedProfile.losses}</p>
          <p>Draws: {loadedProfile.draws}</p>
          <p>KOS: {loadedProfile.kos}</p>
          <p>Date of Birth: {loadedProfile.dob}</p>
          <p>Birth Place: {loadedProfile.birthPlace}</p>
        </div>
      </div>
    </div>
  );
};

BoxerProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(BoxerProfile);
