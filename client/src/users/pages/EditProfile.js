import React, { useState, useRef, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { setAlert } from "../../actions/alert";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    imageFile: null,
    wins: "",
    losses: "",
    draws: "",
    kos: "",
    dob: "",
    birthPlace: "",
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      wins: profile.wins,
      losses: profile.losses,
      draws: profile.kos,
      kos: profile.kos,
      dob: profile.dob,
      birthPlace: profile.birthPlace,
    });
  }, []);

  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const { wins, losses, draws, kos, dob, birthPlace } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();

    createProfile(formData, history);
  };

  const filePickerRef = useRef();

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    console.log(previewUrl);
  }, []);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFormData({
        ...formData,
        imageFile: pickedFile,
      });
      setIsValid(true);
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const pickedImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="edit-create">
      <h2 className="text-center">Edit Profile Page</h2>
      <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-control">
          <input
            id="file"
            name="file"
            type="file"
            ref={filePickerRef}
            accept=".jpg,.png,.jpeg"
            style={{ display: "none" }}
            onChange={pickedHandler}
          />

          <div className="image-upload">
            <div className="image-upload__preview">
              {previewUrl && <img src={previewUrl} alt="Preview" />}
              {!previewUrl && <p>Please pick an image.</p>}
            </div>
            <button
              type="button"
              onClick={pickedImageHandler}
              className="sk-btn primary-btn"
            >
              Pick Image
            </button>
          </div>
        </div>

        <label for="wins">Wins</label>
        <input
          id="wins"
          name="wins"
          type="text"
          value={wins}
          onChange={(e) => onChange(e)}
        />

        <label for="losses">Losses</label>
        <input
          id="losses"
          name="losses"
          value={losses}
          type="text"
          onChange={(e) => onChange(e)}
        />

        <label for="draws">Draws</label>
        <input
          id="draws"
          name="draws"
          value={draws}
          type="text"
          onChange={(e) => onChange(e)}
        />

        <label for="kos">KOS</label>
        <input
          id="kos"
          name="kos"
          value={kos}
          type="text"
          onChange={(e) => onChange(e)}
        />

        <label for="dob">Date of Birth</label>
        <input
          id="dob"
          name="dob"
          value={dob}
          type="text"
          onChange={(e) => onChange(e)}
        />

        <label for="birthPlace">Birth Place</label>
        <input
          id="birthPlace"
          name="birthPlace"
          value={birthPlace}
          type="text"
          onChange={(e) => onChange(e)}
        />

        <button className="sk-btn primary-btn auth-submit" type="submit">
          SUBMIT
        </button>
        <Link className="back" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
