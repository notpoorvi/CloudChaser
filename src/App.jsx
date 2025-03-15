import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import InputPage from "./pages/InputPage";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const starContainer = document.createElement("div");
    starContainer.classList.add("stars");
    document.body.appendChild(starContainer);

    return () => {
      starContainer.remove();
    };
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/input" element={<InputPage />} />
        </Routes>
      </Router>
      <div>
        <main>
          <h1></h1>
        </main>
        <footer
          style={{
            position: "fixed",
            bottom: "0",
            textAlign: "center",
            width: "100%",
          }}
        >
          <p>✨ Follow your dreams and reach for the stars ✨</p>
          <p>© {new Date().getFullYear()} CloudChaser</p>
        </footer>
      </div>
    </>
  );
}

export default App;
