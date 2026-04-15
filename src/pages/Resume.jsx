import { useState } from "react";

export default function Resume() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState("");

  const generateResume = () => {
    const output = `
${name.toUpperCase()}

SKILLS
${skills}

EXPERIENCE
${experience}
    `;
    setResume(output);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: 50,
      padding: 20
    }}>
      <div style={{
        background: "#1e293b",
        padding: 30,
        borderRadius: 14,
        width: "100%",
        maxWidth: 500,
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Resume Builder
        </h2>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={input}
        />

        <button onClick={generateResume} style={button}>
          Generate Resume
        </button>

        {resume && (
          <pre style={outputBox}>
            {resume}
          </pre>
        )}
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  borderRadius: 8,
  border: "none",
  background: "#020617",
  color: "white"
};

const button = {
  width: "100%",
  padding: 12,
  marginTop: 15,
  borderRadius: 8,
  border: "none",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const outputBox = {
  marginTop: 20,
  background: "#020617",
  padding: 15,
  borderRadius: 8,
  whiteSpace: "pre-wrap"
};