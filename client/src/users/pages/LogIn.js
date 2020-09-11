import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const LogIn = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //redirect if loggied in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-div">
      <div className="auth-div-inner site-padding">
        <div className="auth-div-inner-form-wrap">
          <h2 className="text-center">Log In</h2>

          <form className="auth-form" onSubmit={(e) => onSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={(e) => onChange(e)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={(e) => onChange(e)}
            />

            <button className="sk-btn primary-btn auth-submit" type="submit">
              LOG IN
            </button>
          </form>

          <p className="text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

LogIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(LogIn);
