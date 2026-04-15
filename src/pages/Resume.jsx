import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Resume() {
  /* ================= STATE & IDENTITY ================= */
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", linkedin: "",
    summary: "", skills: "", experience: "", education: "", jobDesc: ""
  });
  
  const [user, setUser] = useState(localStorage.getItem("active_user") || "");
  const [loadingField, setLoadingField] = useState(null);
  const [glitch, setGlitch] = useState(null); // Stores error messages
  const [powerLevel, setPowerLevel] = useState(0);

  const [sections, setSections] = useState([
    { id: "summary", label: "PROFESSIONAL SUMMARY" },
    { id: "skills", label: "CORE COMPETENCIES" },
    { id: "experience", label: "CAMPAIGN HISTORY" },
    { id: "education", label: "ACADEMIC INTEL" },
  ]);

  /* ================= CALCULATE SYNC (XP) ================= */
  useEffect(() => {
    const core = ["name", "email", "summary", "skills", "experience"];
    const filled = core.filter(f => formData[f]?.length > 10).length;
    setPowerLevel(Math.floor((filled / core.length) * 100));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ================= AI BUFF ENGINE (FIXED) ================= */
  const castAISpell = async (field) => {
    setLoadingField(field);
    setGlitch(null);
    
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey || apiKey.includes("your_actual")) {
        throw new Error("API KEY MISSING: Add it to your .env file.");
      }

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are an ATS Optimization Droid. Provide strictly professional, high-impact resume content. No conversational filler." },
            { role: "user", content: `Optimize this section: ${field}. Content: ${formData[field]}. Target Job: ${formData.jobDesc}` }
          ],
          temperature: 0.5,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      if (data.choices) {
        setFormData(prev => ({ ...prev, [field]: data.choices[0].message.content.trim() }));
      }
    } catch (err) {
      console.error("AI Error:", err.message);
      setGlitch(err.message || "Connection to Command Center lost.");
    } finally {
      setLoadingField(null);
    }
  };

  /* ================= EXPORT: PDF ================= */
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(formData.name.toUpperCase() || "NAME", 105, y, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${formData.email} | ${formData.phone} | ${formData.linkedin}`, 105, (y += 10), { align: "center" });

    sections.forEach(sec => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(sec.label, 20, (y += 15));
      doc.line(20, (y + 1), 190, (y + 1));
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(formData[sec.id] || " ", 170);
      doc.text(splitText, 20, (y += 8));
      y += (splitText.length * 5);
    });
    doc.save(`${formData.name.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  /* ================= EXPORT: DOCX ================= */
  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ text: formData.name.toUpperCase(), heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
          new Paragraph({ text: `${formData.email} | ${formData.phone}`, alignment: AlignmentType.CENTER }),
          ...sections.flatMap(sec => [
            new Paragraph({ text: "", spacing: { before: 200 } }),
            new Paragraph({ text: sec.label, heading: HeadingLevel.HEADING_1 }),
            new Paragraph({ text: formData[sec.id] }),
          ])
        ],
      }],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${formData.name.replace(/\s+/g, '_')}_Resume.docx`);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setSections(items);
  };

  return (
    <div style={shellStyle}>
      {/* HEADER: HUD */}
      <header style={headerStyle}>
        <div>
          <h1 style={logoStyle}>RESUME_COMMAND_CENTER v1.0</h1>
          {!user ? (
            <input 
              style={loginInput} 
              placeholder="ENTER PILOT DESIGNATION..." 
              onBlur={(e) => {setUser(e.target.value); localStorage.setItem("active_user", e.target.value);}} 
            />
          ) : <p style={{color: "#00ffcc", margin: 0}}>PILOT: {user.toUpperCase()}</p>}
        </div>
        <div style={powerBox}>
          <div style={{fontSize: "10px", textAlign: "right"}}>SYNC LEVEL: {powerLevel}%</div>
          <div style={xpBg}><div style={{...xpFill, width: `${powerLevel}%`}} /></div>
        </div>
      </header>

      <div style={gridStyle}>
        {/* INPUT PANEL */}
        <section style={panelStyle}>
          {glitch && <div style={glitchStyle}>⚠️ CRITICAL GLITCH: {glitch}</div>}
          
          <div style={fieldGroup}>
            <label style={labelStyle}>IDENTITY_DATALINK</label>
            <input name="name" placeholder="Full Name" style={inputStyle} onChange={handleInputChange} />
            <div style={{display: "flex", gap: "10px", marginTop: "5px"}}>
              <input name="email" placeholder="Email" style={inputStyle} onChange={handleInputChange} />
              <input name="phone" placeholder="Phone" style={inputStyle} onChange={handleInputChange} />
            </div>
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>MISSION_OBJECTIVE (JOB DESC)</label>
            <textarea name="jobDesc" style={intelStyle} placeholder="Paste job description here..." onChange={handleInputChange} />
          </div>

          {["summary", "skills", "experience", "education"].map(field => (
            <div key={field} style={fieldGroup}>
              <label style={labelStyle}>{field.toUpperCase()}</label>
              <textarea 
                name={field} 
                style={inputStyle} 
                rows={field === "experience" ? 6 : 3} 
                value={formData[field]} 
                onChange={handleInputChange} 
              />
              <button 
                style={aiBtn} 
                onClick={() => castAISpell(field)}
                disabled={loadingField === field}
              >
                {loadingField === field ? "SYNCING..." : "✨ ACTIVATE AI BUFF"}
              </button>
            </div>
          ))}
        </section>

        {/* PREVIEW PANEL */}
        <section style={previewPanel}>
          <div style={resumePaper}>
            <h2 style={{textAlign: "center", margin: 0}}>{formData.name || "DESIGNATION_NULL"}</h2>
            <p style={{textAlign: "center", fontSize: "11px"}}>{formData.email} | {formData.phone}</p>
            
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="res-sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sections.map((sec, index) => (
                      <Draggable key={sec.id} draggableId={sec.id} index={index}>
                        {(p) => (
                          <div ref={p.innerRef} {...p.draggableProps} style={{...p.draggableProps.style, marginBottom: "15px"}}>
                            <h4 style={sectionHeader} {...p.dragHandleProps}>::: {sec.label}</h4>
                            <p style={{fontSize: "11px", whiteSpace: "pre-line", color: "#333"}}>{formData[sec.id] || "Awaiting input..."}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div style={exportGroup}>
              <button style={btnPdf} onClick={downloadPDF}>DOWNLOAD PDF</button>
              <button style={btnDocx} onClick={downloadDOCX}>DOWNLOAD DOCX</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= STYLES (CYBER-DASHBOARD) ================= */
const shellStyle = { background: "#05070a", color: "#e0e0e0", minHeight: "100vh", padding: "20px", fontFamily: "monospace" };
const headerStyle = { display: "flex", justifyContent: "space-between", borderBottom: "1px solid #30363d", paddingBottom: "20px", marginBottom: "20px" };
const logoStyle = { margin: 0, color: "#00ffcc", fontSize: "1.2rem", letterSpacing: "2px", textShadow: "0 0 5px #00ffcc" };
const loginInput = { background: "#0d1117", border: "1px dashed #444", color: "#00ffcc", padding: "5px", fontSize: "10px" };
const powerBox = { width: "200px" };
const xpBg = { height: "6px", background: "#161b22", marginTop: "5px", borderRadius: "3px" };
const xpFill = { height: "100%", background: "linear-gradient(90deg, #00ffcc, #6366f1)", transition: "width 0.5s ease", borderRadius: "3px" };
const gridStyle = { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "30px" };
const panelStyle = { background: "#0d1117", padding: "25px", borderRadius: "4px", border: "1px solid #30363d", overflowY: "auto", maxHeight: "85vh" };
const previewPanel = { display: "flex", justifyContent: "center", position: "sticky", top: "20px" };
const resumePaper = { width: "100%", maxWidth: "500px", background: "#fff", color: "#000", padding: "40px", height: "fit-content", boxShadow: "0 0 30px rgba(0,0,0,0.5)" };
const fieldGroup = { marginBottom: "25px" };
const labelStyle = { display: "block", fontSize: "10px", color: "#8b949e", marginBottom: "8px", fontWeight: "bold" };
const inputStyle = { width: "100%", background: "#05070a", border: "1px solid #30363d", padding: "12px", color: "#fff", boxSizing: "border-box", fontSize: "13px" };
const intelStyle = { ...inputStyle, borderColor: "#6366f1", boxShadow: "0 0 5px rgba(99, 102, 241, 0.2)" };
const aiBtn = { background: "#6366f1", border: "none", color: "#fff", padding: "6px 12px", fontSize: "10px", cursor: "pointer", marginTop: "8px", fontWeight: "bold" };
const sectionHeader = { borderBottom: "1px solid #000", fontSize: "12px", cursor: "grab", padding: "5px 0", color: "#000", margin: "10px 0" };
const exportGroup = { marginTop: "40px", display: "flex", gap: "10px" };
const btnPdf = { flex: 1, padding: "12px", background: "#f43f5e", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "12px" };
const btnDocx = { flex: 1, padding: "12px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "12px" };
const glitchStyle = { padding: "12px", background: "rgba(244, 63, 94, 0.1)", border: "1px solid #f43f5e", color: "#f43f5e", marginBottom: "20px", fontSize: "11px" };