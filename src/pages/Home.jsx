import "/src/App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Spline from '@splinetool/react-spline'

const InputPageButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/input");
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10rem 0 0 0",
        }}
      >
        <button className="home-button" onClick={handleClick}>
          <span className="home-button-text">Start Here</span>
        </button>
      </div>
    </>
  );
};

function Home() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/input");
  };
  return (
    <>
      <div className="soft-glow"></div>
      <header className="header">
        <h1>CloudChaser</h1>
        <p>
          Chase your dreams, and explore the endless sky of possibilities ✨
        </p>
      </header>

      <button onClick={handleClick}>
        <div className="spline-container">
          <Spline 
            scene="https://prod.spline.design/uJtUTdrviADhJRWo/scene.splinecode"
            style={{backgroundColor: "#3b2063"}}
          />
        </div>
      </button>
    </>
  );
}

export default Home;
