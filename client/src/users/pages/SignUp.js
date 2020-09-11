import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const SignUp = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(password.length);

    if (password.length < 6) {
      setAlert("Password too short", "danger", 3000);
    } else if (name.length < 1) {
      setAlert("Enter a name", "danger", 3000);
    } else if (email.length < 1) {
      setAlert("Enter an email", "danger", 3000);
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-div">
      <div className="auth-div-inner site-padding">
        <div className="auth-div-inner-form-wrap">
          <h2 className="text-center">Sign Up</h2>

          <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            {/*
            <label htmlFor="wins">Wins</label>
            <input
              id="wins"
              name="wins"
              type="text"
              value={wins}
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="losses">Losses</label>
            <input
              id="losess"
              name="losses"
              type="text"
              value={losses}
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="draws">Draws</label>
            <input
              id="draws"
              name="draws"
              type="text"
              value={draws}
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="kos">KOS</label>
            <input
              id="kos"
              name="kos"
              type="text"
              value={kos}
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="text"
              value={dob}
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="birthPlace">Birth Place</label>
            <input
              id="birthPlace"
              name="birthPlace"
              type="text"
              value={birthPlace}
              onChange={(e) => onChange(e)}
            />
*/}
            <button className="sk-btn primary-btn auth-submit" type="submit">
              SUBMIT
            </button>
          </form>

          <p className="text-center">
            Already Have An Account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(SignUp);
