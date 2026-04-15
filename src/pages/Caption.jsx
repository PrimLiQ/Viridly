import { useState } from "react";

export default function Caption() {
  const [topic, setTopic] = useState("");
  const [caption, setCaption] = useState("");

  const generateCaption = () => {
    if (!topic) {
      alert("Enter a topic");
      return;
    }

    const clean = topic.replace(/\s+/g, "");

    const styles = [
      `🔥 ${topic} is the mindset. Stay consistent 💯 #${clean}`,
      `${topic} isn't easy, but it's worth it 🚀 #${clean}`,
      `Keep going with ${topic} 💪 #growth #${clean}`
    ];

    setCaption(styles[Math.floor(Math.random() * styles.length)]);
  };

  return (
    <div style={container}>
      <h2>Caption Generator</h2>

      <input placeholder="Enter topic" value={topic} onChange={e => setTopic(e.target.value)} style={input}/>

      <button onClick={generateCaption} style={btn}>Generate Caption</button>

      {caption && <p style={output}>{caption}</p>}
    </div>
  );
}

const container = { padding: 30, textAlign: "center", color: "white" };
const input = { width: "100%", padding: 10, marginTop: 10 };
const btn = { marginTop: 10, padding: 10, background: "#22c55e", color: "white", border: "none" };
const output = { marginTop: 20 };