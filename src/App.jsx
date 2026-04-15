import { useState } from "react";
import { jsPDF } from "jspdf";

export default function App() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState("");

  const generateResume = () => {
  const output = `
${name.toUpperCase()}

----------------------------

PROFILE
Motivated individual with skills in ${skills}.

----------------------------

SKILLS
• ${skills.split(",").join("\n• ")}

----------------------------

EXPERIENCE
${experience}

----------------------------
  `;
  setResume(output);
};

  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFont("Times", "Normal");
  doc.setFontSize(12);

  const lines = doc.splitTextToSize(resume, 180);
  doc.text(lines, 15, 20);

  doc.save(`${name || "resume"}.pdf`);
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#1e293b",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        maxWidth: 500
      }}>
        <h1 style={{ textAlign: "center" }}>
          Free Resume Generator
        </h1>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <textarea
          placeholder="Skills (e.g. Communication, Teamwork)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <textarea
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <button
          onClick={generateResume}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 10,
            background: "#22c55e",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            color: "white"
          }}
        >
          Generate Resume
        </button>

        {resume && (
          <>
            <button
              onClick={downloadPDF}
              style={{
                width: "100%",
                padding: 12,
                marginTop: 10,
                background: "#3b82f6",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                color: "white"
              }}
            >
              Download PDF
            </button>

            <pre style={{
              marginTop: 20,
              background: "#020617",
              padding: 15,
              borderRadius: 5,
              whiteSpace: "pre-wrap"
            }}>
              {resume}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}