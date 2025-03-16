import { useLocation } from "react-router-dom";
import RiveAnimation from "../components/RiveAnimation";
import { useState, useEffect } from "react";

function RoadmapPage() {
  const location = useLocation();
  const { steps, name } = location.state || {};
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (steps) {
        setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [steps]);

  if (!steps) {
    return (
      <div className="error-container">
        <h1>No roadmap found</h1>
        <button className="home-button" onClick={() => window.history.back()}>
          <span className="home-button-text">Go Back</span>
        </button>
      </div>
    );
  }

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <h1>{name}'s Cosmic Journey</h1>
        <p>Your path through the stars</p>
      </div>

      <div className="roadmap-content">
        <div className="roadmap-card">
          <div className="progress-bar">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${
                  index === activeStep ? "active" : ""
                } ${index < activeStep ? "completed" : ""}`}
                onClick={() => setActiveStep(index)}
              >
                <span className="progress-number">{index + 1}</span>
              </div>
            ))}
            <div className="progress-line"></div>
          </div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-item ${index === activeStep ? "active" : ""}`}
              >
                <div className="step-content">
                  <h3>Step {index + 1}</h3>
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hands-animation">
        <RiveAnimation />
      </div>
    </div>
  );
}

export default RoadmapPage;
