import React from "react";

import "./Derpartment.css";
import { Link } from 'react-router-dom';

function Department() {
  const departments = [
    { id: 1, title: "Full Stack Developer", imageSrc: "/image.png", link: "/fullstack" },
    { id: 2, title: "Data Analyst", imageSrc: "/dataana.png", link: "/dataana" },
    { id: 3, title: "Graphic Designer", imageSrc: "/graphic.jpeg", link: "/graphicdesigner" },  // Added a link for Graphic Designer
    { id: 4, title: "HR", imageSrc: "/hr.jpg", link: "/hr" },  // Added a link for HR
  ];

  return (
    <>
      {/* <Index /> */}
      <div className="main-container">
        {departments.map((dept) => (
          <Link
            key={dept.id}
            to={dept.link}  // Changed href to to for Link component
            className="container"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="image">
              <img src={dept.imageSrc} alt={dept.title} />
            </div>
            <p className="text">{dept.title}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Department;
