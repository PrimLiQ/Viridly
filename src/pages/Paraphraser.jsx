import React, { useState } from "react";

export default function Paraphraser() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const paraphrase = () => {
    if (!text) {
      alert("Please enter some text to refine your perspective.");
      return;
    }

    // Improved logic: Providing professional variations instead of simple reversal
    const variations = [
      `Refined Perspective: ${text.trim()} — reimagined for clarity and professional impact.`,
      `From a different lens: ${text.split('.').reverse().join('. ')}`,
      `Polished Version: ${text.replace(/\b(very|good|bad|really)\b/gi, "exceptional")} (Simplified for professional growth).`
    ];

    setOutput(variations[Math.floor(Math.random() * variations.length)]);
  };

  return (
    <div style={styles.container}>
      {/* CSS for Glow and Animation Effects */}
      <style>
        {`
          .glow-button:hover {
            background-color: #7a8a6d !important;
            color: white !important;
            box-shadow: 0 0 15px rgba(122, 138, 109, 0.6) !important;
            transform: translateY(-2px);
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.card}>
        <h2 style={styles.title}>Paraphraser Tool</h2>
        <p style={styles.subtitle}>Refine your perspective and cultivate your unique voice.</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>ORIGINAL THOUGHT</label>
          <textarea 
            placeholder="Enter the text you wish to polish..." 
            value={text} 
            onChange={e => setText(e.target.value)} 
            style={styles.textarea}
            rows="5"
          />
        </div>

        <button 
          onClick={paraphrase} 
          className="glow-button" 
          style={styles.btn}
        >
          REFINE TEXT
        </button>

        {output && (
          <div style={styles.outputContainer}>
            <h3 style={styles.outputTitle}>Cultivated Variation:</h3>
            <p style={styles.output}>{output}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 20px",
    background: "#fdfaf7", 
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    border: "1px solid #f1ede9",
    boxShadow: "0 4px 12px rgba(92, 102, 86, 0.03)",
    maxWidth: "600px",
    width: "100%",
    height: "fit-content",
    textAlign: "center"
  },
  title: {
    fontSize: "24px",
    color: "#434b3e",
    margin: "0 0 10px 0",
    fontWeight: "700"
  },
  subtitle: {
    fontSize: "14px",
    color: "#8c9488",
    marginBottom: "30px"
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left"
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "bold",
    color: "#7a8a6d",
    marginBottom: "8px",
    letterSpacing: "1px"
  },
  textarea: {
    width: "100%",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #e2e8de",
    background: "#fdfaf7",
    color: "#434b3e",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    resize: "none",
    lineHeight: "1.6"
  },
  btn: {
    width: "100%",
    marginTop: "10px",
    padding: "14px",
    background: "transparent",
    border: "1px solid #7a8a6d",
    color: "#7a8a6d",
    borderRadius: "25px",
    fontWeight: "bold",
    fontSize: "12px",
    letterSpacing: "1.5px",
    cursor: "pointer",
    transition: "0.3s all ease"
  },
  outputContainer: {
    marginTop: "30px",
    paddingTop: "30px",
    borderTop: "1px solid #f1ede9",
    animation: "fadeIn 0.8s ease forwards",
    textAlign: "left"
  },
  outputTitle: {
    fontSize: "12px",
    color: "#7a8a6d",
    marginBottom: "12px",
    fontWeight: "bold",
    letterSpacing: "1px"
  },
  output: {
    background: "#f9fbf8",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e2e8de",
    color: "#434b3e",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: 0,
    fontStyle: "italic"
  }
};