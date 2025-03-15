import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import InputPage from "./pages/InputPage";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/roadmap">Roadmap</Link>
          </li>
          <li>
            <Link to="/input">Input</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/input" element={<InputPage />} />
      </Routes>
    </Router>
  );
}

export default App;
