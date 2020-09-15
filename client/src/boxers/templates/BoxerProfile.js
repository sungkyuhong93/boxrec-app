import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
    dob: "02-17-1988",
    birthPlace: "Bilhorod-Dnistrovskyi, Ukraine",
  },
  {
    id: "2",
    name: "Teofimo Lopez",
    image: teo,
    wins: "15",
    losses: "0",
    draws: "0",
    kos: "12",
    dob: "07-30-1997",
    birthPlace: "Brooklyn, New York",
  },
  {
    id: "3",
    name: "Shakur Stevenson",
    image: shakur,
    wins: "14",
    losses: "0",
    draws: "0",
    kos: "8",
    dob: "06-28-1997",
    birthPlace: "Newark, New Jersey",
  },
  {
    id: "4",
    name: "Terrance Crawford",
    image: terrance,
    wins: "36",
    losses: "0",
    draws: "0",
    kos: "27",
    ob: "09-29-1987",
    birthPlace: "Omaha, Nebraska",
  },
];

const BoxerProfile = ({ getProfiles, profile: { profiles } }) => {
  const profileId = useParams().id;

  console.log(profiles);

  const loadedProfile = profiles.find((profile) => {
    return profile._id == profileId;
  });

  const loadedFighter = FIGHTERS.find((fighter) => {
    return fighter.id == profileId;
  });

  console.log("loaded profile");
  console.log(loadedProfile);

  return loadedProfile != null ? (
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
  ) : (
    <div className="boxer-profile">
      <div className="boxer-profile-inner site-padding">
        <div className="boxer-profile-img">
          <img src={`${loadedFighter.image}`} />
        </div>

        <div className="boxer-profile-info">
          <p>Name: {loadedFighter.name}</p>
          <p>Wins: {loadedFighter.wins}</p>
          <p>Losses: {loadedFighter.losses}</p>
          <p>Draws: {loadedFighter.draws}</p>
          <p>KOS: {loadedFighter.kos}</p>
          <p>Date of Birth: {loadedFighter.dob}</p>
          <p>Birth Place: {loadedFighter.birthPlace}</p>
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
