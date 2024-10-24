import React, { useState } from "react";
import "./register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [userDetails, setUserDetails] = useState({});

  const handleInputChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (profileImage) {
      const formData = new FormData();
      formData.append("file", profileImage);
      formData.append("upload_preset", "upload");

      try {
        const uploadResponse = await axios.post(
          "${process.env.CLOUDINARY_AUTH_URL}/image/upload",
          formData,
          { withCredentials: false }
        );

        const { url } = uploadResponse.data;

        const newUser = {
          ...userDetails,
          profilePicture: url,
        };

        await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/users/register`,
          newUser,
          {
            withCredentials: false,
          }
        );

        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/users/register`,
          userDetails,
          {
            withCredentials: false,
          }
        );

        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create an Account</h1>
        <form>
          <div className="image">
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Profile"
              height="100px"
            />
            <div className="txt_field_img">
              <label htmlFor="file">
                Image
                <FontAwesomeIcon className="icon" icon={faPlusCircle} />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="form-input">
            <div className="input-label">Username</div>
            <div className="txt_field">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                id="username"
                required
              />
            </div>
            <div className="input-label">Email Address</div>
            <div className="txt_field">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                id="email"
                required
              />
            </div>
            <div className="input-label">Password</div>
            <div className="txt_field">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                id="password"
                required
              />
            </div>
          </div>
          <div className="login_button">
            <button className="register-button" onClick={handleFormSubmit}>
              Register
            </button>
          </div>
          <div className="signup-link">
            <p>
              Already Registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
