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
    const { name, value } = event.target;
    if (name === "username") {
      setName(value);
    } else if (name === "dream") {
      setDream(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   console.log("dream == ", dream);
    //   const response = await axios.post(
    //     "http://localhost:3001/api/generate-steps",
    //     {
    //       dream,
    //     }
    //   );
    //   const cleanedResponse = response.data.steps
    //     .replace(/```json\n|\n```/g, "")
    //     .trim();
    //   const stepsArray = JSON.parse(cleanedResponse);
    //   setSteps(stepsArray);
    //   navigate("/roadmap", { state: { steps: stepsArray } });
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-steps",
        {
          dream,
        }
      );
      const cleanedResponse = response.data.steps
        .replace(/```json\n|\n```/g, "")
        .trim();
      const stepsArray = JSON.parse(cleanedResponse);
      setSteps(stepsArray);
      navigate("/roadmap", { state: { steps: stepsArray, name: name } });
    } catch {}
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
      <div className="input-main">
        <div>
          <label>ENTER YOUR NAME:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            name="username"
          />
        </div>
        <div>
          <label>ENTER YOUR DREAM:</label>
          <input
            type="text"
            placeholder="I want to achieve..."
            name="dream"
            value={dream || ""}
            onChange={handleChange}
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          <span className="submit-button-text">Generate Your Roadmap</span>
        </button>

        {error && <div>{error}</div>}

        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
      {/* <input
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
      </ul> */}
    </>
  );
}

export default InputPage;
