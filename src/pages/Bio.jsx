import { useState } from "react";

export default function Bio() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const generateBio = () => {
    if (!name || !skills) {
      alert("Fill all fields");
      return;
    }

    const styles = [
      `${name} is a results-driven professional specializing in ${skills}. Passionate about delivering quality work.`,
      `${name} brings strong expertise in ${skills}, focusing on innovation and efficiency.`,
      `${name} is a dedicated individual skilled in ${skills}, known for adaptability and growth.`
    ];

    setBio(styles[Math.floor(Math.random() * styles.length)]);
  };

  return (
    <div style={container}>
      <h2>Bio Generator</h2>

      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={input}/>
      <input placeholder="Skills" value={skills} onChange={e => setSkills(e.target.value)} style={input}/>

      <button onClick={generateBio} style={btn}>Generate Bio</button>

      {bio && <p style={output}>{bio}</p>}
    </div>
  );
}

const container = { padding: 30, textAlign: "center", color: "white" };
const input = { width: "100%", padding: 10, marginTop: 10 };
const btn = { marginTop: 10, padding: 10, background: "#22c55e", color: "white", border: "none" };
const output = { marginTop: 20 };