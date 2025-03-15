import { useLocation } from "react-router-dom";

function RoadmapPage() {
  const location = useLocation();
  const { steps } = location.state || {};

  if (!steps) {
    return <div>No steps found. Please go back and try again.</div>;
  }

  return (
    <div>
      <h1>Your Roadmap</h1>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoadmapPage;
