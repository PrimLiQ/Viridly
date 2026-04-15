import { useState } from "react";

export default function CoverLetter() {
  const [job, setJob] = useState("");
  const [skills, setSkills] = useState("");
  const [letter, setLetter] = useState("");

  const generate = () => {
    setLetter(`Dear Hiring Manager,

I am excited to apply for the ${job} position. With skills in ${skills}, I am confident in my ability to contribute effectively to your team.

I am highly motivated, detail-oriented, and committed to delivering high-quality results. I would welcome the opportunity to bring my strengths to your organization.

Sincerely,
Your Name`);
  };

  return (
    <div style={container}>
      <h2>Cover Letter Generator</h2>
      <input placeholder="Job Title" value={job} onChange={e => setJob(e.target.value)} style={input}/>
      <input placeholder="Your Skills" value={skills} onChange={e => setSkills(e.target.value)} style={input}/>
      <button onClick={generate} style={btn}>Generate</button>
      {letter && <pre style={output}>{letter}</pre>}
    </div>
  );
}

const container = { padding: 30, color: "white" };
const input = { width: "100%", padding: 10, marginTop: 10 };
const btn = { marginTop: 10, padding: 10, background: "#22c55e", color: "white" };
const output = { marginTop: 20, whiteSpace: "pre-wrap" };