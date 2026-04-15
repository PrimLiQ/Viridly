import { useState } from "react";

export default function Essay() {
  const [topic, setTopic] = useState("");
  const [essay, setEssay] = useState("");

  const generate = () => {
    setEssay(`${topic} is an important subject that impacts many aspects of life. It plays a significant role in shaping perspectives and influencing decisions.

Understanding ${topic} helps individuals develop critical thinking skills and adapt to challenges. As society evolves, the relevance of ${topic} continues to grow.

In conclusion, ${topic} remains essential in today’s world and will continue to influence future generations.`);
  };

  return (
    <div style={container}>
      <h2>Essay Generator</h2>
      <input placeholder="Enter Topic" value={topic} onChange={e => setTopic(e.target.value)} style={input}/>
      <button onClick={generate} style={btn}>Generate</button>
      {essay && <p style={output}>{essay}</p>}
    </div>
  );
}

const container = { padding: 30, color: "white" };
const input = { width: "100%", padding: 10, marginTop: 10 };
const btn = { marginTop: 10, padding: 10, background: "#22c55e", color: "white" };
const output = { marginTop: 20 };