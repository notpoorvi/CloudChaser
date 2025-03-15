import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function InputPage() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleDreamSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-steps",
        {
          goal,
        }
      );
      const cleanedResponse = response.data.steps
        .replace(/```json\n|\n```/g, "")
        .trim();
      const stepsArray = JSON.parse(cleanedResponse);
      setSteps(stepsArray);
      navigate("/roadmap", { state: { steps: stepsArray } });
    } catch {}
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button onClick={handleDreamSubmit}>Generate Steps</button>

      {error && <div>{error}</div>}

      <ul>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </>
  );
}

export default InputPage;
