import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // takes component as an argument and return the modified comp
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  const navigate = useNavigate(); //equavilent to history push
  const location = useLocation(); //equavilent to match url
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => navigate(`${location.pathname}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
