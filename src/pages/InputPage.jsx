import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "/src/App.css";

function InputPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dream, setDream] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    if (!dream.trim()) {
      setError("Please enter your dream/goal");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/generate-steps",
        { dream }
      );

      if (response.data && Array.isArray(response.data.steps)) {
        const stepsArray = response.data.steps;

        // Validate that we have steps
        if (stepsArray.length === 0) {
          throw new Error(
            "No steps were generated. Please try again with a different goal."
          );
        }

        // Navigate to roadmap page with the steps and name
        navigate("/roadmap", {
          state: {
            steps: stepsArray,
            name: name.trim() || "Dreamer", // Default name if empty
          },
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);

      // Handle different types of errors
      if (error.response && error.response.data && error.response.data.error) {
        setError(`Error: ${error.response.data.error}`);
      } else if (error.message) {
        setError(`Error: ${error.message}`);
      } else {
        setError("Failed to generate your roadmap. Please try again.");
      }

      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <h1>CloudChaser</h1>
        <p>
          Chase your dreams, and explore the endless sky of possibilities ✨
        </p>
      </header>
      <div className="input-main">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">ENTER YOUR NAME:</label>
            <input
              type="text"
              id="username"
              placeholder="Name"
              value={name}
              onChange={handleChange}
              name="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="dream">ENTER YOUR DREAM:</label>
            <input
              type="text"
              id="dream"
              placeholder="I want to achieve..."
              name="dream"
              value={dream}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            <span className="submit-button-text">
              {isLoading ? "Generating..." : "Generate Your Roadmap"}
            </span>
          </button>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </>
  );
}

export default InputPage;
