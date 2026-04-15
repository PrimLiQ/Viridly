import { useState } from "react";

export default function Hashtags() {
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState("");

  const generate = () => {
    const clean = topic.replace(/\s+/g, "");
    setTags(`#${clean} #viral #trending #explore #growth`);
  };

  return (
    <div style={container}>
      <h2>Hashtag Generator</h2>
      <input value={topic} onChange={e => setTopic(e.target.value)} style={input}/>
      <button onClick={generate} style={btn}>Generate</button>
      {tags && <p style={output}>{tags}</p>}
    </div>
  );
}

const container = { padding: 30, color: "white" };
const input = { width: "100%", padding: 10, marginTop: 10 };
const btn = { marginTop: 10, padding: 10, background: "#22c55e", color: "white" };
const output = { marginTop: 20 };