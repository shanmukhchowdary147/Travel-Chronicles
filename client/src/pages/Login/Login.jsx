import React, { useState, useContext } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../authContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/login`,
        credentials,
        { withCredentials: true }
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.details,
      });
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data || "An error occurred while logging in";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="card-center">
        <div className="card-header">
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-label">Username</div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-label">Password</div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-actions">
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
          <div className="signup-link">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
