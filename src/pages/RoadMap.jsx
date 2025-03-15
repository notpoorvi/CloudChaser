import { useLocation } from "react-router-dom";
import RiveAnimation from "../components/RiveAnimation";

function RoadmapPage() {
  const location = useLocation();
  const { steps, name } = location.state || {};

  if (!steps) {
    return <div>No steps found. Please go back and try again.</div>;
  }

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <RiveAnimation />
      </div>

      <div>
        <h1>{name}'s Roadmap</h1>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoadmapPage;
