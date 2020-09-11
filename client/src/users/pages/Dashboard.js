import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div className="auth-div">
      <div className="auth-div-inner site-padding">
        <div className="auth-div-inner-form-wrap">
          <h2 className="text-center">Welcome {user && user.name}</h2>

          <h2 className="text-center">Dashboard</h2>

          {profile !== null ? (
            <div>
              <div className="dash-buttons">
                <Link className="sk-btn primary-btn" to="/edit-profile">
                  Edit Profile
                </Link>
                <button
                  className="sk-btn primary-btn"
                  onClick={() => deleteAccount()}
                >
                  Delete My Account
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p>You Have not yet setup a profile, please add some info.</p>
              <Link to="/create-profile">Create Profile</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
