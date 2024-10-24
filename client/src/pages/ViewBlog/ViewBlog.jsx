import React, { useContext, useState, useEffect } from "react";
import useFetch from "../../useFetch";
import {
  faCalendar,
  faMapLocationDot,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./view-blog.css";
import axios from "axios";
import { AuthContext } from "../../authContext";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";

const ViewBlog = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/entries/view/${id}`);
  const [slideNumber, setSlideNumber] = useState(0);
  const navigate = useNavigate();
  const [isUserBlog, setIsUserBlog] = useState(false);

  useEffect(() => {
    console.log("Fetched data:", data);
    if (data && user) {
      setIsUserBlog(data.author === user._id);
    }
  }, [data, user]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/entries/entry/${data._id}`,
        { withCredentials: true }
      );
      navigate("/my-blogs");
    } catch (err) {
      console.error(err);
    }
  };

  const handleMove = (direction) => {
    const size = data.photos.length;
    setSlideNumber((prev) =>
      direction === "left"
        ? prev === 0
          ? size - 1
          : prev - 1
        : prev === size - 1
        ? 0
        : prev + 1
    );
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading data.</div>;

  return (
    <div className="view-page">
      <h1 className="blog-title">{data?.title}</h1>

      <div className="content-container">
        <div className="image-section">
          {data?.photos?.length ? (
            <div className="image-slider">
              <img
                src={data.photos[slideNumber]}
                alt="Post content"
                className="slider-image"
              />
              {data.photos.length > 1 && (
                <div className="slider-arrows">
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => handleMove("left")}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => handleMove("right")}
                  />
                </div>
              )}
            </div>
          ) : (
            <p>No Images</p>
          )}
          <div className="header-section">
            <div className="header-content">
              <p>
                <BsCalendar2DateFill /> {data?.date}
              </p>
              <p className="view-info">
                <FaLocationDot />
                {data?.location}
              </p>
            </div>
          </div>

          {isUserBlog && (
            <div className="header-section">
              <div className="header-content">
                <div className="secondaryButton" onClick={handleDelete}>
                  Delete
                  <AiFillDelete />
                </div>
                <div
                  className="primaryButton"
                  onClick={() => navigate(`/edit/${data._id}`)}
                >
                  Edit
                  <RiEditBoxFill />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-section">
          <div className="post-text">{data?.text}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
