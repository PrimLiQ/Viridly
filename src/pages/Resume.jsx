import React, { useState, useEffect } from "react";

export default function Resume() {
  /* ================= 1. COMPONENT STATE ================= */
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    location: "", linkedin: "", portfolio: "",
    summary: "", skills: "", experience: "", education: "",
    tools: "", certifications: ""
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [completion, setCompletion] = useState(0);
  const [profileImage, setProfileImage] = useState(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        currentTarget.removeAttribute("open");
      }
    });
  };

  const downloadPDF = () => { window.print(); };

  const downloadDOCX = () => {
    const content = `RESUME\n\n${formData.name}\n${formData.email} | ${formData.phone}\n${formData.location}\nLinkedIn: ${formData.linkedin}\nPortfolio: ${formData.portfolio}\n\nPROFESSIONAL SUMMARY\n${formData.summary}\n\nCORE EXPERTISE\n${formData.skills}\n\nPROFESSIONAL HISTORY\n${formData.experience}\n\nACADEMIC BACKGROUND\n${formData.education}\n\nTOOLS & EXPERTISE\n${formData.tools}\n\nCERTIFICATIONS\n${formData.certifications}`;
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Resume.doc";
    link.click();
  };

  const getMotiveText = () => {
    if (completion === 0) return "Every giant oak begins as a tiny seed. Start planting your details today.";
    if (completion < 20) return "The first sprout of your career path has emerged. Keep nurturing your story.";
    if (completion < 40) return "You're establishing strong professional roots. Your seedling is finding its way.";
    if (completion < 60) return "Growth is becoming visible! Your sapling is stretching toward new opportunities.";
    if (completion < 80) return "A sturdy tree is taking shape. Your narrative is reaching toward success.";
    if (completion < 100) return "Almost there! Your professional canopy is broad and ready to bear fruit.";
    return "Full harvest achieved. Your career ecosystem is thriving and ready for the world.";
  };

  const getGrowthIcon = () => {
    const iconPath = "/Icons/";
    let imgSrc = "";
    if (completion === 0) imgSrc = "seed.png";
    else if (completion <= 20) imgSrc = "sprout.png";
    else if (completion <= 40) imgSrc = "seedling.png";
    else if (completion <= 60) imgSrc = "sapling.png";
    else if (completion <= 80) imgSrc = "tree.png";
    else imgSrc = "fruit.png";

    return (
      <img 
        src={`${iconPath}${imgSrc}`} 
        alt="Growth" 
        style={{ width: "60px", height: "auto" }} 
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

          .floating-container {
            animation: float 3s ease-in-out infinite;
            position: fixed;
            right: 40px;
            top: 40%;
            z-index: 1000;
            display: flex;
            align-items: center;
          }

          .speech-bubble {
            position: relative;
            background: #ffffff;
            border: 1px solid #7a8a6d;
            border-radius: 12px;
            padding: 12px;
            margin-right: 20px;
            font-size: 12px;
            color: #434b3e;
            max-width: 180px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            line-height: 1.4;
          }

          .speech-bubble::after {
            content: '';
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 10px 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent transparent #7a8a6d;
          }

          .icon-circle {
            background: rgba(255,255,255,0.9);
            padding: 10px;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid #f1ede9;
          }

          @media (max-width: 1100px) {
            .floating-container { right: 10px; top: 50%; flex-direction: row; }
            .speech-bubble { display: none; }
          }
          
          details { border: 1px solid #f1ede9; border-radius: 12px; background: #f9f7f5; margin-bottom: 12px; }
          summary { padding: 16px; font-size: 10px; font-weight: 700; color: #7a8a6d; letter-spacing: 1.5px; cursor: pointer; list-style: none; }
          .resizable-textarea { width: calc(100% - 32px); min-height: 100px; background: #fafaf9; border: 1px solid #f1ede9; border-radius: 8px; padding: 15px; box-sizing: border-box; font-size: 14px; margin: 0 16px 16px 16px; }

          @media print {
            header, footer, nav, .no-print, .top-bar-progress, .floating-container { display: none !important; }
            .sheet { border: none !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; width: 100% !important; }
            body { background: white !important; }
          }
        `}
      </style>

      <div style={styles.topBar} className="no-print top-bar-progress" />
      <div style={{ ...styles.progress, width: `${completion}%` }} className="no-print top-bar-progress" />

      <div className="floating-container no-print">
        <div className="speech-bubble">{getMotiveText()}</div>
        <div className="icon-circle">{getGrowthIcon()}</div>
      </div>

      <main style={styles.mainGrid}>
        {/* Title Outside the Panel with Spacing */}
        <div className="no-print" style={{ marginBottom: "20px" }}>
           <h1 style={styles.brandedTitle}>Resume</h1>
        </div>

        <section style={styles.editPanel} className="no-print">
          <h3 style={styles.panelHeading}>CURATE YOUR STORY</h3>
          
          <div style={styles.fieldGroup}>
            <label style={styles.label}>IDENTITY</label>
            <input name="name" placeholder="Full Name" style={styles.input} onChange={handleInputChange} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
              <input name="email" placeholder="Email Address" style={styles.input} onChange={handleInputChange} />
              <input name="phone" placeholder="Phone Number" style={styles.input} onChange={handleInputChange} />
            </div>
            <input name="location" placeholder="Location" style={{...styles.input, marginTop: "10px"}} onChange={handleInputChange} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
              <input name="linkedin" placeholder="LinkedIn URL" style={styles.input} onChange={handleInputChange} />
              <input name="portfolio" placeholder="Portfolio URL" style={styles.input} onChange={handleInputChange} />
            </div>
          </div>

          <div style={styles.fieldGroup}>
             <label style={styles.label}>RESUME PHOTO</label>
             <div style={{ display: "flex", alignItems: "center", gap: "15px", background: "#f9f7f5", padding: "10px", borderRadius: "8px", border: "1px solid #f1ede9" }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: "11px" }} />
                {profileImage && <img src={profileImage} alt="Identified Photo" style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover" }} />}
             </div>
          </div>

          {[...sections, {id: 'tools', label: 'Tools & Expertise'}, {id: 'certifications', label: 'Certifications'}].map((s) => (
            <details key={s.id} onBlur={handleBlur}>
              <summary>{s.label.toUpperCase()}</summary>
              <textarea name={s.id} className="resizable-textarea" placeholder={`Share your ${s.label.toLowerCase()}...`} onChange={handleInputChange} />
            </details>
          ))}

          <button className="glow-button" style={styles.primaryBtn} onClick={() => setIsGenerated(true)}>
            REFINE & PREVIEW
          </button>
        </section>

        {isGenerated && (
          <section style={styles.previewPanel}>
            <div style={styles.sheet} className="sheet">
              <div style={styles.sheetHeader}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h2 style={styles.sheetName}>{formData.name || "YOUR NAME"}</h2>
                    <div style={styles.sheetContact}>
                      {formData.email} {formData.phone && `• ${formData.phone}`}
                      <br />
                      {formData.location && `${formData.location}`}
                      <br />
                      {formData.linkedin && `LinkedIn: ${formData.linkedin}`} {formData.portfolio && ` • Portfolio: ${formData.portfolio}`}
                    </div>
                  </div>
                  {profileImage && (
                    <img src={profileImage} alt="Profile" style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover", border: "1px solid #f1ede9" }} />
                  )}
                </div>
              </div>
              {sections.map((sec) => formData[sec.id] && (
                <div key={sec.id} style={{ marginBottom: "25px" }}>
                  <h4 style={styles.sheetSecLabel}>{sec.label}</h4>
                  <p style={styles.sheetSecBody}>{formData[sec.id]}</p>
                </div>
              ))}
              <div style={styles.actionButtons} className="no-print">
                <button onClick={downloadPDF} className="glow-button" style={styles.downloadBtn}>PDF</button>
                <button onClick={downloadDOCX} className="glow-button" style={styles.downloadBtn}>DOCX</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { background: "#fdfaf7", minHeight: "100vh", padding: "40px 20px", color: "#434b3e", fontFamily: "'Inter', sans-serif" },
  topBar: { position: "fixed", top: 0, left: 0, width: "100%", height: "4px", background: "#ece5dd", zIndex: 100 },
  progress: { position: "fixed", top: 0, left: 0, height: "4px", background: "#7a8a6d", transition: "width 0.7s ease", zIndex: 101 },
  mainGrid: { display: "flex", flexDirection: "column", gap: "0px", maxWidth: "800px", margin: "40px auto 0 auto" },
  editPanel: { background: "#ffffff", padding: "25px", borderRadius: "12px", border: "1px solid #f1ede9" },
  brandedTitle: { 
    fontSize: "32px", 
    color: "#7a8a6d", 
    fontFamily: "'Playfair Display', serif", 
    fontStyle: "italic", 
    margin: "0",
    textAlign: "left"
  },
  panelHeading: { fontSize: "12px", letterSpacing: "2px", color: "#aeb6a3", marginBottom: "20px" },
  fieldGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "10px", fontWeight: "700", color: "#7a8a6d", marginBottom: "8px" },
  input: { width: "100%", background: "#f9f7f5", border: "1px solid #f1ede9", borderRadius: "8px", padding: "12px", boxSizing: "border-box", outline: "none", fontSize: "13px" },
  primaryBtn: { width: "100%", padding: "16px", border: "1px solid #7a8a6d", color: "#7a8a6d", background: "transparent", borderRadius: "25px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" },
  previewPanel: { width: "100%", marginTop: "60px", marginBottom: "60px" },
  sheet: { width: "100%", background: "#ffffff", padding: "30px", minHeight: "500px", border: "1px solid #f1ede9", boxSizing: "border-box" },
  sheetHeader: { marginBottom: "30px", borderBottom: "1px solid #f1ede9", paddingBottom: "15px" },
  sheetName: { fontSize: "28px", margin: "0 0 5px 0" },
  sheetContact: { fontSize: "12px", color: "#8c9488", lineHeight: "1.5" },
  sheetSecLabel: { fontSize: "11px", fontWeight: "700", color: "#7a8a6d", textTransform: "uppercase", marginBottom: "8px" },
  sheetSecBody: { fontSize: "13px", lineHeight: "1.6", whiteSpace: "pre-wrap", color: "#555" },
  actionButtons: { display: "flex", gap: "10px", marginTop: "30px" },
  downloadBtn: { flex: 1, padding: "12px", border: "1px solid #7a8a6d", background: "transparent", color: "#7a8a6d", borderRadius: "20px", cursor: "pointer", fontSize: "12px" }
};