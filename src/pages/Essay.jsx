import React, { useState } from "react";

export default function Essay() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Academic");
  const [essay, setEssay] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!topic) {
      alert("Please enter a topic to cultivate your essay.");
      return;
    }

    const templates = {
      Academic: `${topic} represents a significant area of inquiry within modern discourse. Historically, the evolution of ${topic} has necessitated a rigorous re-evaluation of established paradigms, suggesting that its impact is both structural and conceptual. 

Furthermore, the analytical frameworks applied to ${topic} reveal a complex interplay between traditional methodologies and emerging trends. As research continues to broaden, the academic community must remain attentive to the nuanced shifts this subject introduces to the global stage.

In summary, the study of ${topic} remains a cornerstone of contemporary intellectual pursuit, offering a foundation for future scholarly exploration and critical synthesis.`,
      
      Professional: `${topic} is a critical driver of efficiency and innovation in today’s competitive landscape. By prioritizing a strategic approach to ${topic}, organizations can unlock significant value and streamline complex operational workflows.

Adopting a forward-thinking mindset regarding ${topic} allows professionals to adapt to market fluctuations with greater agility. As industries become more interconnected, the mastery of this subject serves as a key differentiator for leadership and long-term growth.

To conclude, integrating ${topic} into core business strategies is no longer optional but essential for maintaining a sustainable and impactful professional presence.`,

      Creative: `Imagine a world where ${topic} takes center stage, weaving through the fabric of our daily lives like a silent, powerful thread. It is more than just a concept; it is a catalyst for imagination, sparking ideas that transcend the ordinary.

Every encounter with ${topic} invites us to see the world through a prism of new possibilities. It challenges our boundaries and encourages us to dance on the edge of the unknown, finding beauty in the intersections of thought and feeling.

Ultimately, ${topic} is a testament to the human spirit's desire to explore, create, and redefine what is possible in the vast garden of our collective experience.`
    };

    setEssay(templates[tone]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(essay);
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
          
          .secondary-button:hover {
            background-color: #f1ede9 !important;
            transform: translateY(-1px);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.card}>
        <h2 style={styles.title}>Essay Generator</h2>
        <p style={styles.subtitle}>Cultivate structured thoughts and insightful perspectives.</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>DISCOURSE TOPIC</label>
          <input 
            placeholder="e.g. Sustainable Architecture" 
            value={topic} 
            onChange={e => setTopic(e.target.value)} 
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>NARRATIVE TONE</label>
          <select 
            value={tone} 
            onChange={e => setTone(e.target.value)} 
            style={styles.input}
          >
            <option value="Academic">Academic & Rigorous</option>
            <option value="Professional">Strategic & Professional</option>
            <option value="Creative">Creative & Inspired</option>
          </select>
        </div>

        <button 
          onClick={generate} 
          className="glow-button" 
          style={styles.btn}
        >
          GENERATE ESSAY
        </button>

        {essay && (
          <div style={styles.outputContainer}>
            <div style={styles.outputHeader}>
              <h3 style={styles.outputTitle}>Cultivated Draft</h3>
              <button 
                onClick={copyToClipboard} 
                className="secondary-button"
                style={styles.copyBtn}
              >
                {copied ? "COPIED!" : "COPY TEXT"}
              </button>
            </div>
            <div style={styles.output}>
              {essay.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: "15px" }}>{para}</p>
              ))}
            </div>
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
    maxWidth: "650px",
    width: "100%",
    height: "fit-content",
  },
  title: {
    fontSize: "26px",
    color: "#434b3e",
    margin: "0 0 10px 0",
    fontWeight: "700",
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
    marginTop: "40px",
    paddingTop: "30px",
    borderTop: "1px solid #f1ede9",
    animation: "fadeIn 0.6s ease forwards",
  },
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  outputTitle: {
    fontSize: "11px",
    color: "#aeb6a3",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase"
  },
  copyBtn: {
    padding: "6px 12px",
    fontSize: "10px",
    fontWeight: "700",
    background: "#f9fbf8",
    border: "1px solid #ece5dd",
    borderRadius: "4px",
    color: "#7a8a6d",
    cursor: "pointer",
    transition: "0.2s all"
  },
  output: {
    background: "#fdfaf7",
    padding: "30px",
    borderRadius: "12px",
    border: "1px solid #f1ede9",
    color: "#434b3e",
    fontSize: "15px",
    lineHeight: "1.8",
    margin: 0
  }
};