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
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Free Resume Generator</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <textarea
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <button onClick={generateResume}>
        Generate Resume
      </button>

      <pre>{resume}</pre>
    </div>
  );
}