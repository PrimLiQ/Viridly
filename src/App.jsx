import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Resume from "./pages/Resume";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1>Free AI Tools for Everyone</h1>
      <p>Create resumes, bios, and captions instantly — no signup, no cost.</p>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        marginTop: 40
      }}>
        <Link to="/resume">
          <div style={cardStyle}>
            <h3>Resume Builder</h3>
            <p>Create professional resumes instantly</p>
          </div>
        </Link>

        <div style={cardStyle}>
          <h3>Bio Generator</h3>
          <p>Coming soon</p>
        </div>

        <div style={cardStyle}>
          <h3>Caption Tool</h3>
          <p>Coming soon</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: 20,
  borderRadius: 10,
  width: 200,
  color: "white",
  cursor: "pointer",
  textDecoration: "none"
};

export default function App() {
  return (
    <Router>
      <div style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white"
      }}>
        {/* NAVBAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 20,
          borderBottom: "1px solid #1e293b"
        }}>
          <h2>AI Tools Hub</h2>

          <div style={{ display: "flex", gap: 15 }}>
            <Link to="/">Home</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}