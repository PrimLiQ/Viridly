import React, { useState, useEffect } from "react";

export default function Resume() {
  /* ================= 1. COMPONENT STATE ================= */
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    location: "", linkedin: "", portfolio: "",
    summary: "", skills: "", experience: "", education: "",
    tools: "", certifications: ""
  });

  const [photo, setPhoto] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [completion, setCompletion] = useState(0);

  const sections = [
    { id: "summary", label: "Professional Summary" },
    { id: "skills", label: "Core Expertise" },
    { id: "experience", label: "Professional History" },
    { id: "education", label: "Academic Background" },
  ];

  /* ================= 2. LOGIC & EFFECTS ================= */
  useEffect(() => {
    const core = ["name", "email", "summary", "skills", "experience"];
    const filled = core.filter(f => formData[f] && formData[f].length > 2).length;
    setCompletion(Math.floor((filled / core.length) * 100));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        currentTarget.removeAttribute("open");
      }
    });
  };

  const downloadPDF = () => {
    window.print();
  };

  const downloadDOCX = () => {
    const content = `
      ${formData.name}\n${formData.email} | ${formData.phone}\n\n
      ${formData.location ? `Location: ${formData.location}\n` : ''}
      ${formData.linkedin ? `LinkedIn: ${formData.linkedin}\n` : ''}
      ${formData.portfolio ? `Portfolio: ${formData.portfolio}\n` : ''}\n
      
      PROFESSIONAL SUMMARY\n${formData.summary}\n\n
      CORE EXPERTISE\n${formData.skills}\n\n
      PROFESSIONAL HISTORY\n${formData.experience}\n\n
      ACADEMIC BACKGROUND\n${formData.education}\n\n
      TECHNICAL TOOLS & EXPERTISE\n${formData.tools}\n\n
      CERTIFICATIONS & LICENSES\n${formData.certifications}\n\n
    `;
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Resume.doc";
    link.click();
  };

  // Updated motivational text logic based on growth stages
  const getMotiveText = () => {
    if (completion === 0) return "Every giant oak begins as a tiny seed. Start planting your details today.";
    if (completion < 20) return "The first sprout of your career path has emerged. Keep nurturing your story.";
    if (completion < 40) return "You're establishing strong professional roots. Your seedling is finding its way.";
    if (completion < 60) return "Growth is becoming visible! Your sapling is stretching toward new opportunities.";
    if (completion < 80) return "A sturdy tree is taking shape. Your narrative is reaching toward success.";
    if (completion < 100) return "Almost there! Your professional canopy is broad and ready to bear fruit.";
    return "Full harvest achieved. Your career ecosystem is thriving and ready for the world.";
  };

  // Updated logic to map specific percentages to growth stages
  const getGrowthIcon = () => {
    let imgSrc = "";
    let altText = "";
    // The leading "/" tells the browser to look in the public folder root
    const iconPath = "/Icons/";

    if (completion === 0) {
      imgSrc = `${iconPath}seed.png`;
      altText = "Stage 0: Seed (0%)";
    } else if (completion <= 20) {
      imgSrc = `${iconPath}sprout.png`;
      altText = "Stage 1: Sprout (20%)";
    } else if (completion <= 40) {
      imgSrc = `${iconPath}seedling.png`;
      altText = "Stage 2: Seedling (40%)";
    } else if (completion <= 60) {
      imgSrc = `${iconPath}sapling.png`;
      altText = "Stage 3: Sapling (60%)";
    } else if (completion <= 80) {
      imgSrc = `${iconPath}tree.png`;
      altText = "Stage 4: Tree (80%)";
    } else {
      imgSrc = `${iconPath}fruit.png`;
      altText = "Stage 5: Fruit (100%)";
    }

    return (
      <img 
        src={imgSrc} 
        alt={altText} 
        style={{ width: "100px", height: "auto" }} 
        // Prevents the broken image icon from showing if a file is missing
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  };

  /* ================= 3. RENDER ================= */
  return (
    <div style={styles.container}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
          
          .glow-button:hover {
            background-color: #7a8a6d !important;
            color: white !important;
            box-shadow: 0 0 20px rgba(122, 138, 109, 0.4) !important;
            transform: translateY(-2px);
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          details {
            border: 1px solid #f1ede9;
            border-radius: 12px;
            background: #f9f7f5;
            margin-bottom: 12px;
            transition: all 0.5s ease;
          }

          details[open] {
            background: #ffffff;
            box-shadow: 0 10px 25px rgba(122, 138, 109, 0.1);
          }

          summary {
            padding: 16px;
            font-size: 10px;
            font-weight: 700;
            color: #7a8a6d;
            letter-spacing: 1.5px;
            cursor: pointer;
            list-style: none;
            outline: none;
          }

          .resizable-textarea {
            width: calc(100% - 32px);
            min-height: 100px;
            background: #fafaf9;
            border: 1px solid #f1ede9;
            border-radius: 8px;
            padding: 15px;
            box-sizing: border-box;
            resize: both;
            font-size: 14px;
            outline: none;
            color: #434b3e;
            font-family: inherit;
            margin: 0 16px 16px 16px;
          }

          .growth-stage {
            animation: float 4s ease-in-out infinite;
            display: inline-block;
          }

          @media print {
            .no-print { display: none !important; }
            .sheet { border: none !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; width: 100% !important; }
            .previewPanel { width: 100% !important; padding: 0 !important; }
          }
        `}
      </style>

      <div style={styles.topBar} className="no-print">
        <div style={{ ...styles.progress, width: `${completion}%` }} />
      </div>

      <header style={styles.header} className="no-print">
        <div style={styles.branding}>
          <h1 style={{...styles.logo, ...{fontFamily: "'Playfair Display', serif", fontStyle: "italic"}}}>Resume</h1>
          <div style={styles.accentLine} />
        </div>
        <div style={styles.completionBadge}>
          {completion}% PREPARED
        </div>
      </header>

      <main style={styles.mainGrid}>
        <section style={styles.editPanel} className="no-print">
          <h3 style={styles.panelHeading}>CURATE YOUR STORY</h3>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>IDENTITY</label>
            <input name="name" placeholder="Full Name" style={styles.input} onChange={handleInputChange} />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <input name="email" placeholder="Email Address" style={styles.input} onChange={handleInputChange} />
              <input name="phone" placeholder="Phone Number" style={styles.input} onChange={handleInputChange} />
            </div>
            <input name="location" placeholder="Location (City, Country)" style={{...styles.input, marginTop: "10px"}} onChange={handleInputChange} />
          </div>

          {[...sections, 
            {id: 'tools', label: 'Tools & Expertise'}, 
            {id: 'certifications', label: 'Certifications & Licenses'}
          ].map((s) => (
            <details key={s.id} onBlur={handleBlur}>
              <summary>{s.label.toUpperCase()}</summary>
              <textarea 
                name={s.id} 
                className="resizable-textarea"
                placeholder={`Share your ${s.label.toLowerCase()}...`}
                onChange={handleInputChange} 
              />
            </details>
          ))}

          <button className="glow-button" style={styles.primaryBtn} onClick={() => setIsGenerated(true)}>
            REFINE & PREVIEW
          </button>
        </section>

        <section style={styles.previewPanel}>
          <div style={styles.sheet} className="sheet">
            {isGenerated ? (
              <div style={{animation: "fadeIn 1s ease"}}>
                <div style={styles.sheetHeader}>
                  <h2 style={styles.sheetName}>{formData.name || "YOUR NAME"}</h2>
                  <div style={styles.sheetContact}>
                    {formData.email} {formData.phone && `• ${formData.phone}`}
                  </div>
                </div>
                
                {sections.map((sec) => formData[sec.id] && (
                  <div key={sec.id} style={{ marginBottom: "30px" }}>
                    <h4 style={styles.sheetSecLabel}>{sec.label}</h4>
                    <p style={styles.sheetSecBody}>{formData[sec.id]}</p>
                  </div>
                ))}

                <div style={styles.actionButtons} className="no-print">
                  <button onClick={downloadPDF} className="glow-button" style={styles.downloadBtn}>PDF</button>
                  <button onClick={downloadDOCX} className="glow-button" style={styles.downloadBtn}>DOCX</button>
                </div>
              </div>
            ) : (
              <div style={styles.motivationalBox}>
                <h2 style={styles.motiveTitle}>Every great career starts with a single step.</h2>
                <div style={styles.iconContainer}>
                  <div className="growth-stage">
                    {getGrowthIcon()}
                  </div>
                </div>
                <p style={styles.motiveText}>{getMotiveText()}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: { background: "#fdfaf7", minHeight: "100vh", padding: "60px 40px", color: "#434b3e", fontFamily: "'Inter', sans-serif" },
  topBar: { position: "fixed", top: 0, left: 0, width: "100%", height: "4px", background: "#ece5dd", zIndex: 100 },
  progress: { height: "100%", background: "#7a8a6d", transition: "width 0.7s ease" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", maxWidth: "1200px", margin: "0 auto 60px auto" },
  branding: { display: "flex", flexDirection: "column", gap: "8px" },
  logo: { fontSize: "26px", color: "#7a8a6d", margin: 0 },
  accentLine: { width: "30px", height: "3px", background: "#aeb6a3" },
  completionBadge: { fontSize: "11px", fontWeight: "700", color: "#7a8a6d" },
  mainGrid: { display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "60px", maxWidth: "1200px", margin: "0 auto" },
  editPanel: { background: "#ffffff", padding: "40px", borderRadius: "12px", border: "1px solid #f1ede9" },
  panelHeading: { fontSize: "12px", letterSpacing: "2px", color: "#aeb6a3", marginBottom: "30px" },
  fieldGroup: { marginBottom: "25px" },
  label: { display: "block", fontSize: "10px", fontWeight: "700", color: "#7a8a6d", marginBottom: "8px" },
  input: { width: "100%", background: "#f9f7f5", border: "1px solid #f1ede9", borderRadius: "8px", padding: "14px", boxSizing: "border-box", outline: "none" },
  primaryBtn: { width: "100%", padding: "18px", border: "1px solid #7a8a6d", color: "#7a8a6d", background: "transparent", borderRadius: "25px", fontWeight: "bold", cursor: "pointer", marginTop: "20px" },
  previewPanel: { display: "flex", justifyContent: "center" },
  sheet: { width: "100%", background: "#ffffff", padding: "60px", minHeight: "800px", border: "1px solid #f1ede9", display: "flex", flexDirection: "column" },
  sheetHeader: { marginBottom: "40px", borderBottom: "1px solid #f1ede9", paddingBottom: "20px" },
  sheetName: { fontSize: "32px", margin: "0 0 10px 0" },
  sheetContact: { fontSize: "13px", color: "#8c9488" },
  sheetSecLabel: { fontSize: "12px", fontWeight: "700", color: "#7a8a6d", textTransform: "uppercase", marginBottom: "10px" },
  sheetSecBody: { fontSize: "14px", lineHeight: "1.6", whiteSpace: "pre-wrap", color: "#555" },
  motivationalBox: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", flexGrow: 1 },
  motiveTitle: { fontSize: "24px", color: "#5c6656", marginBottom: "20px" },
  motiveText: { fontSize: "15px", color: "#8c9488", maxWidth: "400px" },
  iconContainer: { padding: "30px", background: "rgba(122, 138, 109, 0.05)", borderRadius: "50%", marginBottom: "20px" },
  actionButtons: { marginTop: "auto", display: "flex", gap: "10px", paddingTop: "20px" },
  downloadBtn: { flex: 1, padding: "12px", border: "1px solid #7a8a6d", background: "transparent", color: "#7a8a6d", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }
};