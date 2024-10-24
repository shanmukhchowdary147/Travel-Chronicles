import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./create-blog.css";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({
    title: "",
    location: "",
    date: "",
    text: "",
    isPublic: false,
  });
  const [visibility, setVisibility] = useState("private");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleCheckboxChange = (e) => {
    setInfo((prev) => ({ ...prev, isPublic: e.target.checked }));
  };

  const handleVisibilityPublic = (e) => {
    setInfo((prev) => ({ ...prev, isPublic: true }));
    setVisibility("public");
  };

  const handleVisibilityPrivate = (e) => {
    setInfo((prev) => ({ ...prev, isPublic: false }));
    setVisibility("private");
  };

  const uploadFiles = async (files) => {
    const urls = await Promise.all(
      Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        // Use environment variable in the API call
        const response = await axios.post(
          `${process.env.REACT_APP_CLOUDINARY_AUTH_URL}/image/upload`,
          data,
          { withCredentials: false }
        );

        return response.data.url; // Return the uploaded image URL
      })
    );

    return urls; // Return all uploaded URLs
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const newEntry = {
      ...info,
      author: user._id,
    };

    if (files.length) {
      newEntry.photos = await uploadFiles(files);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/entries/create`,
        newEntry,
        { withCredentials: true }
      );
      navigate(`/view/${response.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/my-blogs");
  };

  return (
    <div className="create">
      <div className="createContainer">
        <div className="leftContainer">
          <h1 className="mainTitle">Blog Details</h1>
          <div>Describe your experiences here</div>
          <div className="storyContainer">
            <textarea
              id="text"
              cols="150"
              rows="25"
              onChange={handleChange}
              className="blogText"
              autoFocus
            ></textarea>
          </div>
        </div>
        <div className="rightContainer">
          <div className="inputContainer">
            <div className="labelInput">Blog Title</div>
            <div className="containTextfield">
              <input
                type="text"
                id="title"
                placeholder="Enter Title"
                onChange={handleChange}
                className="newInput"
              />
            </div>
            <div className="labelInput">Location</div>
            <div className="containTextfield">
              <input
                type="text"
                id="location"
                placeholder="Enter Location"
                onChange={handleChange}
                className="newInput"
              />
            </div>
            <div className="labelInput">Date</div>
            <div className="containTextfield">
              <input
                type="date"
                id="date"
                placeholder="Choose Date"
                onChange={handleChange}
                className="newInput"
              />
            </div>
            <div className="picsContainer">
              <div className="formInput">
                <div className="labelWithIcon">
                  <div className="labelInput">Upload Images (max 3) </div>
                  <label htmlFor="file">
                    <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
                  </label>
                </div>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="uploadedPicturesContainer">
                <div className="uploadedPictures">
                  {Array.from(files).map((file, index) => (
                    <div key={index} className="upload_pic">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        height="80px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="ButtonContainer">
                <div
                  className={`visibilityButton ${
                    visibility === "public" ? "active" : ""
                  }`}
                  onClick={handleVisibilityPublic}
                >
                  Public
                </div>
                <div
                  className={`visibilityButton ${
                    visibility === "private" ? "active" : ""
                  }`}
                  onClick={handleVisibilityPrivate}
                >
                  Private
                </div>
              </div>
              <p className="instructions">Select who can view your blog</p>
            </div>
            <div className="ButtonContainer">
              <div className="cancelBtn" onClick={handleCancel}>
                Cancel
              </div>
              <div className="createBtn" onClick={handleClick}>
                Create Entry
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
