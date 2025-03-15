import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import RoadMap from "./pages/RoadMap";
import InputPage from "./pages/InputPage";
import "./App.css";
import { useEffect } from "react";

function Footer() {
  const location = useLocation();

  // Hide footer on the roadmap page
  if (location.pathname === "/roadmap") {
    return null;
  }

  return (
    <footer
      className="mainFooter"
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
  );
}

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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/input" element={<InputPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
