import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../authContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../CreateBlog/create-blog.css"; // Reusing the same CSS file

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/entries/view/${id}`,
          { withCredentials: true }
        );
        const blogData = response.data;
        setInfo({
          title: blogData.title,
          location: blogData.location,
          date: blogData.date.split("T")[0], // Format date for input
          text: blogData.text,
          isPublic: blogData.isPublic,
        });
        setVisibility(blogData.isPublic ? "public" : "private");
        // You might need to handle existing photos here
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleVisibilityPublic = () => {
    setInfo((prev) => ({ ...prev, isPublic: true }));
    setVisibility("public");
  };

  const handleVisibilityPrivate = () => {
    setInfo((prev) => ({ ...prev, isPublic: false }));
    setVisibility("private");
  };

  const uploadFiles = async (files) => {
    const urls = await Promise.all(
      Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dpg7vqgxa/image/upload",
          data,
          { withCredentials: false }
        );
        return response.data.url;
      })
    );
    return urls;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const updatedEntry = {
      ...info,
      author: user._id,
    };

    if (files.length) {
      updatedEntry.photos = await uploadFiles(files);
    }

    try {
      await axios.put(
        `http://localhost:5500/api/entries/entry/${id}`,
        updatedEntry,
        {
          withCredentials: true,
        }
      );
      navigate(`/view/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/view/${id}`);
  };

  return (
    <div className="create">
      <div className="createContainer">
        <div className="leftContainer">
          <h1 className="mainTitle">Edit Blog</h1>
          <div>Update your experiences here</div>
          <div className="storyContainer">
            <textarea
              id="text"
              cols="150"
              rows="25"
              onChange={handleChange}
              className="blogText"
              value={info.text}
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
                value={info.title}
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
                value={info.location}
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
                value={info.date}
                className="newInput"
              />
            </div>
            <div className="picsContainer">
              <div className="formInput">
                <div className="labelWithIcon">
                  <div className="labelInput">Upload New Images (max 3) </div>
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
                Update Entry
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
