import { useState } from "react";

export default function Username() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  const generate = () => {
    const variations = [
      name + "123",
      "real_" + name,
      name + "_official",
      name + "_x",
      "the_" + name
    ];
    setResults(variations);
  };

  return (
    <div style={container}>
      <h2>Username Generator</h2>
      <input value={name} onChange={e => setName(e.target.value)} style={input}/>
      <button onClick={generate} style={btn}>Generate</button>
      {results.map((u, i) => <p key={i}>{u}</p>)}
    </div>
  );
}

const container = { padding: 30, color: "white" };
const input = { width: "100%", padding: 10, marginTop: 10 };
const btn = { marginTop: 10, padding: 10, background: "#22c55e", color: "white" };