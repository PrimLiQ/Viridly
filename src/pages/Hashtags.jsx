import React, { useState } from "react";

export default function Hashtags() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("Creative");
  const [tags, setTags] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!topic) {
      alert("Please enter a topic to grow your tags.");
      return;
    }

    const clean = topic.replace(/\s+/g, "");
    
    const nicheTags = {
      Business: `#${clean} #entrepreneur #growthmindset #innovation #success #strategy`,
      Creative: `#${clean} #digitalart #storytelling #creativeprocess #design #inspiration`,
      Lifestyle: `#${clean} #mindfulness #wellness #nature #slowliving #dailyvlog`
    };

    setTags(nicheTags[niche]);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .glow-button:hover {
            background-color: #7a8a6d !important;
            color: white !important;
            box-shadow: 0 0 15px rgba(122, 138, 109, 0.4) !important;
            transform: translateY(-2px);
          }
          
          .utility-btn:hover {
            background-color: #f1ede9 !important;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.card}>
        <h2 style={styles.title}>Hashtag Generator</h2>
        <p style={styles.subtitle}>Cultivate your reach with curated, niche-focused tags.</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>TOPIC</label>
          <input 
            placeholder="e.g. Sustainability" 
            value={topic} 
            onChange={e => setTopic(e.target.value)} 
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>CONTENT NICHE</label>
          <select 
            value={niche} 
            onChange={e => setNiche(e.target.value)} 
            style={styles.input}
          >
            <option value="Creative">Creative & Arts</option>
            <option value="Business">Business & Tech</option>
            <option value="Lifestyle">Lifestyle & Wellness</option>
          </select>
        </div>

        <button 
          onClick={generate} 
          className="glow-button" 
          style={styles.btn}
        >
          GENERATE TAGS
        </button>

        {tags && (
          <div style={styles.outputContainer}>
            <div style={styles.outputHeader}>
              <h3 style={styles.outputTitle}>Cultivated Tags</h3>
              <button 
                onClick={copyToClipboard}
                className="utility-btn"
                style={styles.copyBtn}
              >
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
            <p style={styles.output}>{tags}</p>
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
    boxShadow: "0 10px 30px rgba(92, 102, 86, 0.05)",
    maxWidth: "500px",
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
    marginBottom: "35px"
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
    appearance: "none"
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
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  outputTitle: {
    fontSize: "11px",
    color: "#aeb6a3",
    fontWeight: "700",
    letterSpacing: "1px"
  },
  copyBtn: {
    padding: "4px 10px",
    fontSize: "10px",
    fontWeight: "700",
    background: "#fdfaf7",
    border: "1px solid #ece5dd",
    borderRadius: "4px",
    color: "#7a8a6d",
    cursor: "pointer",
    transition: "0.2s"
  },
  output: {
    background: "#f9fbf8",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e2e8de",
    color: "#7a8a6d", // Using Moss Green for tags
    fontSize: "15px",
    fontWeight: "500",
    lineHeight: "1.6",
    margin: 0,
    wordBreak: "break-word"
  }
};