import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ photos, title, date, location, text, _id, author }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  date = formatDate(date);
  return (
    <Link to={`/view/${_id}`}>
      <div className="card">
        <div className="img-container">
          <img
            className="card-image"
            src={photos[0]}
            alt="Post content"
            loading="lazy"
          />
        </div>
        <div className="card-content">
          <div className="card-title">
            <span class="card-title-text">{title.slice(0, 44)}</span>
          </div>

          {author && (
            <div class="card-text">
              <span>by </span> {author}
            </div>
          )}

          <div className="card-text">{text.slice(0, 75)}...</div>

          <div class="line"></div>

          <div className="card-content1">
            <div className="card-date">{date}</div>
            <div className="card-location">{location}</div>
          </div>
          {/* <Link to={`view/${_id}`}>
            <button className="card-button">Read More</button>
          </Link> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
