import React, { useState } from "react";

export default function CoverLetter() {
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [tone, setTone] = useState("Professional");
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!job || !company || !skills) {
      alert("Please provide the job, company, and skills to cultivate your letter.");
      return;
    }

    const templates = {
      Professional: `Dear Hiring Team at ${company},

I am writing to formally express my interest in the ${job} position. Having developed a robust foundation in ${skills}, I am confident that my background aligns with the high standards of excellence maintained by ${company}.

Throughout my career, I have focused on delivering measurable results and fostering a collaborative environment. I am eager to bring this same dedication and my specific expertise in ${skills} to your team to help drive your current initiatives forward.

Thank you for your time and consideration. I look forward to the possibility of discussing how my skills can contribute to the continued success of ${company}.

Sincerely,
[Your Name]`,

      Passionate: `Hi Team ${company}!

I’ve been following the work you do at ${company} for some time, and I am incredibly excited to apply for the ${job} role. My passion for innovation is matched only by my technical proficiency in ${skills}.

I don't just want a job; I want to contribute to a mission I believe in. With my background in ${skills}, I am ready to jump in and help ${company} tackle its next big challenge. I thrive in environments that value creativity and forward-thinking, which is exactly why I'm reaching out.

I’d love to share more about my vision for this role. Thanks for building such an inspiring company!

Best regards,
[Your Name]`,

      Modern: `To the ${company} Team,

The intersection of strategy and execution is where I do my best work. I’m applying for the ${job} position because I believe my expertise in ${skills} can provide immediate value to your current workflows.

I take a data-driven approach to problem-solving, ensuring that every project I touch is optimized for growth. At ${company}, I aim to leverage ${skills} to streamline processes and elevate the impact of your ${job} department.

I’m looking forward to the opportunity to connect and dive deeper into how we can work together.

Cheers,
[Your Name]`
    };

    setLetter(templates[tone]);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
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
        <h2 style={styles.title}>Cover Letter Generator</h2>
        <p style={styles.subtitle}>Cultivate a professional introduction tailored to your next role.</p>

        <div style={styles.inputGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>TARGET JOB</label>
            <input 
              placeholder="e.g. Lead Developer" 
              value={job} 
              onChange={e => setJob(e.target.value)} 
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>COMPANY NAME</label>
            <input 
              placeholder="e.g. Viridly Tech" 
              value={company} 
              onChange={e => setCompany(e.target.value)} 
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>CORE SKILLS & EXPERTISE</label>
          <input 
            placeholder="e.g. React, UX Research, Project Leadership" 
            value={skills} 
            onChange={e => setSkills(e.target.value)} 
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
            <option value="Professional">Corporate & Balanced</option>
            <option value="Passionate">Energetic & Mission-Driven</option>
            <option value="Modern">Direct & Efficiency-Focused</option>
          </select>
        </div>

        <button 
          onClick={generate} 
          className="glow-button" 
          style={styles.btn}
        >
          GENERATE LETTER
        </button>

        {letter && (
          <div style={styles.outputContainer}>
            <div style={styles.outputHeader}>
              <h3 style={styles.outputTitle}>Cultivated Draft</h3>
              <button 
                onClick={copyToClipboard}
                className="utility-btn"
                style={styles.copyBtn}
              >
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
            <pre style={styles.output}>{letter}</pre>
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
  inputGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
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
    animation: "fadeIn 0.6s ease forwards"
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
    padding: "4px 12px",
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
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #e2e8de",
    color: "#434b3e",
    fontSize: "14px",
    lineHeight: "1.7",
    margin: 0,
    whiteSpace: "pre-wrap",
    fontFamily: "'Inter', sans-serif"
  }
};