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
  const [isLoading, setIsLoading] = useState(false);

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

    if (!dream) {
      setError("Please enter your dream/goal");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-steps",
        {
          dream,
        }
      );

      // The server now returns already stringified JSON
      const stepsArray = JSON.parse(response.data.steps);

      setSteps(stepsArray);
      navigate("/roadmap", { state: { steps: stepsArray, name: name } });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      setError("Failed to generate your roadmap. Please try again.");
      setIsLoading(false);
    }
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

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <span className="submit-button-text">
            {isLoading ? "Generating..." : "Generate Your Roadmap"}
          </span>
        </button>

        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
}

export default InputPage;
