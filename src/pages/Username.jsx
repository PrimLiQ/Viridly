import React, { useState } from "react";

export default function Username() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("Modern");
  const [results, setResults] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generate = () => {
    if (!name) {
      alert("Please enter a base name to cultivate variations.");
      return;
    }

    const base = name.toLowerCase().replace(/\s+/g, "");
    
    const themes = {
      Modern: [
        `the${base}`, `real${base}`, `${base}_studio`, 
        `itshere${base}`, `${base}vibe`, `simply${base}`
      ],
      Nature: [
        `mossy${base}`, `${base}_leaf`, `ever${base}`, 
        `wild${base}`, `river${base}`, `${base}_blooms`
      ],
      Tech: [
        `${base}lab`, `pixel_${base}`, `code${base}`, 
        `${base}os`, `meta${base}`, `git_${base}`
      ]
    };

    setResults(themes[theme]);
    setCopiedIndex(null);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');

          .glow-button:hover {
            background-color: #7a8a6d !important;
            color: white !important;
            box-shadow: 0 0 15px rgba(122, 138, 109, 0.4) !important;
            transform: translateY(-2px);
          }
          
          .username-pill {
            cursor: pointer;
            transition: 0.2s all;
          }

          .username-pill:hover {
            background: #f1ede9 !important;
            border-color: #7a8a6d !important;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.mainWrapper}>
        {/* Branded Title Outside the Card */}
        <div style={{ marginBottom: "20px" }}>
           <h1 style={styles.brandedTitle}>Username</h1>
        </div>

        <div style={styles.card}>
          <h3 style={styles.panelHeading}>DISCOVER YOUR DIGITAL HANDLE</h3>
          <p style={styles.subtitle}>Cultivate a unique identity that feels natural.</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>BASE IDENTITY</label>
            <input 
              placeholder="e.g. Prim" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>AESTHETIC STYLE</label>
            <select 
              value={theme} 
              onChange={e => setTheme(e.target.value)} 
              style={styles.input}
            >
              <option value="Modern">Minimalist & Modern</option>
              <option value="Nature">Organic & Earthy</option>
              <option value="Tech">Clean & Technical</option>
            </select>
          </div>

          <button 
            onClick={generate} 
            className="glow-button" 
            style={styles.btn}
          >
            GENERATE HANDLES
          </button>

          {results.length > 0 && (
            <div style={styles.outputContainer}>
              <h3 style={styles.outputTitle}>CLICK TO COPY:</h3>
              <div style={styles.grid}>
                {results.map((u, i) => (
                  <div 
                    key={i} 
                    onClick={() => copyToClipboard(u, i)}
                    className="username-pill"
                    style={styles.pill}
                  >
                    {u}
                    {copiedIndex === i && <span style={styles.copiedText}>✓</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
  mainWrapper: {
    maxWidth: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  brandedTitle: { 
    fontSize: "32px", 
    color: "#7a8a6d", 
    fontFamily: "'Playfair Display', serif", 
    fontStyle: "italic", 
    margin: "0",
    textAlign: "left"
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    border: "1px solid #f1ede9",
    boxShadow: "0 10px 30px rgba(92, 102, 86, 0.05)",
    width: "100%",
    height: "fit-content",
  },
  panelHeading: { 
    fontSize: "12px", 
    letterSpacing: "2px", 
    color: "#aeb6a3", 
    marginBottom: "5px",
    fontWeight: "700",
    textTransform: "uppercase",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "14px",
    color: "#8c9488",
    marginBottom: "35px",
    textAlign: "center"
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "left"
  },
  label: {
    display: "block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#7a8a6d",
    marginBottom: "8px",
    letterSpacing: "1.2px"
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #ece5dd",
    background: "#fdfaf7",
    color: "#434b3e",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    marginTop: "10px",
    padding: "16px",
    background: "transparent",
    border: "1px solid #7a8a6d",
    color: "#7a8a6d",
    borderRadius: "30px",
    fontWeight: "700",
    fontSize: "12px",
    letterSpacing: "1.5px",
    cursor: "pointer",
    transition: "0.3s all ease"
  },
  outputContainer: {
    marginTop: "35px",
    paddingTop: "25px",
    borderTop: "1px solid #f1ede9",
    animation: "fadeIn 0.6s ease forwards",
    textAlign: "left"
  },
  outputTitle: {
    fontSize: "11px",
    color: "#aeb6a3",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "15px",
    textTransform: "uppercase"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px"
  },
  pill: {
    background: "#f9fbf8",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8de",
    color: "#434b3e",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  copiedText: {
    color: "#7a8a6d",
    fontSize: "12px",
    fontWeight: "bold"
  }
};