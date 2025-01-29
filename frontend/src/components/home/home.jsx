import React from "react";
import "./home.css";
const home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
          Organize your <br /> Work.
        </h1>
        <p>
          Stay focused, organized, and calm with our Todo app <br />
          your perfect companion for managing tasks effortlessly.
        </p>
        <button class="home-btn p-2">Make Todo List</button>
      </div>
    </div>
  );
};

export default home;
