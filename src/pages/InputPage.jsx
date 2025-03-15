import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "/src/App.css";

function InputPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dream, setDream] = useState("");
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "username") {
      setName(value);
    } else if (name === "dream") {
      setDream(value);
    }
  }

  const handleSubmit = async (e) => {
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
      <header>CloudChaser</header>
      <h2>Start Building Your Dream!!</h2>
        <label>ENTER YOUR NAME:</label>
        <input
          type="text"
          placeholder="name"
          value={goal}
          // onChange={(e) => S(e.target.value)}
          onChange={handleChange}
        />
        <label>ENTER YOUR DREAM:</label>
        <input 
          type="text" 
          name="dream" 
          value={dream || ""} 
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Generate Your Roadmap</button>

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
