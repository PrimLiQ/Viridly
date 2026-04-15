import { useState } from "react";

export default function Paraphraser() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const paraphrase = () => {
    setOutput(text.split(" ").reverse().join(" "));
  };

  return (
    <div style={container}>
      <h2>Paraphraser Tool</h2>
      <textarea value={text} onChange={e => setText(e.target.value)} style={input}/>
      <button onClick={paraphrase} style={btn}>Paraphrase</button>
      {output && <p style={outputStyle}>{output}</p>}
    </div>
  );
}

const container = { padding: 30, color: "white" };
const input = { width: "100%", padding: 10, marginTop: 10 };
const btn = { marginTop: 10, padding: 10, background: "#22c55e", color: "white" };
const outputStyle = { marginTop: 20 };