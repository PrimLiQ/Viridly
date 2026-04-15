import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Resume from "./pages/Resume";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: 60, padding: 20 }}>
      <h1 style={{ fontSize: 42, marginBottom: 10 }}>
        Free AI Tools for Everyone
      </h1>

      <p style={{ color: "#94a3b8", fontSize: 18 }}>
        Create resumes, bios, and captions instantly — no signup needed.
      </p>

      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 20,
        marginTop: 40
      }}>
        <Link to="/resume" style={{ textDecoration: "none" }}>
          <div style={card}>
            <h3>Resume Builder</h3>
            <p>Create professional resumes instantly</p>
          </div>
        </Link>

        <div style={card}>
          <h3>Bio Generator</h3>
          <p>Coming soon</p>
        </div>

        <div style={card}>
          <h3>Caption Tool</h3>
          <p>Coming soon</p>
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "#1e293b",
  padding: 25,
  borderRadius: 14,
  width: 240,
  color: "white",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  transition: "0.3s",
  cursor: "pointer"
};

export default function App() {
  return (
    <Router>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f172a, #020617)",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}>
        
        {/* NAVBAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid #1e293b",
          alignItems: "center"
        }}>
          <h2 style={{ fontWeight: "bold" }}>AI Tools Hub</h2>

          <div style={{ display: "flex", gap: 20 }}>
            <Link style={navLink} to="/">Home</Link>
            <Link style={navLink} to="/resume">Resume</Link>
            <Link style={navLink} to="/privacy">Privacy</Link>
            <Link style={navLink} to="/terms">Terms</Link>
            <Link style={navLink} to="/contact">Contact</Link>
          </div>
        </div>

        {/* CONTENT */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* FOOTER */}
        <div style={{
          textAlign: "center",
          padding: 20,
          marginTop: 40,
          color: "#64748b"
        }}>
          © {new Date().getFullYear()} AI Tools Hub. All rights reserved.
        </div>
      </div>
    </Router>
  );
}

const navLink = {
  color: "#cbd5f5",
  textDecoration: "none",
  fontSize: 14
};