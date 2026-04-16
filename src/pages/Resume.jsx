import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, AlignmentType, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Resume() {
  /* ================= 1. STATES ================= */
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", linkedin: "",
    summary: "", skills: "", experience: "", education: "", jobDesc: ""
  });

  const [isGenerated, setIsGenerated] = useState(false);
  const [loadingField, setLoadingField] = useState(null);
  const [syncLevel, setSyncLevel] = useState(0);

  const [sections, setSections] = useState([
    { id: "summary", label: "PROFESSIONAL SUMMARY" },
    { id: "skills", label: "CORE COMPETENCIES" },
    { id: "experience", label: "EXPERIENCE HISTORY" },
    { id: "education", label: "ACADEMIC INTEL" },
  ]);

  /* ================= 2. PROGRESS LOGIC ================= */
  useEffect(() => {
    const core = ["name", "email", "summary", "skills", "experience"];
    const filled = core.filter(f => formData[f]?.length > 10).length;
    setSyncLevel(Math.floor((filled / core.length) * 100));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ================= 3. AI ENGINE (FIXED FOR 400 ERROR) ================= */
  const optimizeField = async (field) => {
    // 1. Get the key from environment
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    // 2. Shield: Prevent 400 error by checking if key exists
    if (!apiKey || apiKey === "" || apiKey.includes("your_actual")) {
      alert("❌ API KEY ERROR: The 'VITE_GROQ_API_KEY' is missing from your .env file. Please add it and restart your terminal.");
      return;
    }

    if (!formData[field] && field !== "summary") {
      alert(`⚠️ INPUT REQUIRED: Please type something in ${field} first.`);
      return;
    }

    setLoadingField(field);
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}` 
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a professional ATS resume expert. Write in a clear, punchy, professional tone without using 'I' or 'me'." },
            { 
              role: "user", 
              content: field === "summary" 
                ? `Write a professional resume summary. Skills: ${formData.skills}. Experience: ${formData.experience}. Target Job: ${formData.jobDesc}`
                : `Rewrite this ${field} section for a ${formData.jobDesc} position: ${formData[field]}` 
            }
          ],
          temperature: 0.5
        })
      });

      const data = await res.json();
      
      if (data.error) {
        alert(`❌ AI ERROR: ${data.error.message}`);
        return;
      }

      if (data.choices) {
        setFormData(prev => ({ ...prev, [field]: data.choices[0].message.content.trim() }));
      }
    } catch (err) {
      alert("❌ CONNECTION ERROR: Could not reach the AI server.");
    } finally {
      setLoadingField(null);
    }
  };

  /* ================= 4. EXPORT LOGIC ================= */
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(formData.name.toUpperCase() || "CANDIDATE NAME", 105, y, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${formData.email} | ${formData.phone}`, 105, (y += 10), { align: "center" });

    sections.forEach(sec => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(12);
      doc.text(sec.label, 20, (y += 15));
      doc.line(20, (y + 1), 190, (y + 1));
      
      doc.setFont("helvetica", "normal"); doc.setFontSize(10);
      const splitText = doc.splitTextToSize(formData[sec.id] || " ", 170);
      doc.text(splitText, 20, (y += 8));
      y += (splitText.length * 5);
    });
    doc.save(`${formData.name || "Resume"}.pdf`);
  };

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
    saveAs(blob, `${formData.name || "Resume"}.docx`);
  };

  /* ================= 5. UI (JSX) ================= */
  return (
    <div style={shellStyle}>
      <header style={headerStyle}>
        <h1 style={{color: "#00ffcc", margin: 0}}>RESUME_SYNC_OS</h1>
        <div style={xpContainer}>
          <div style={{fontSize: "10px", textAlign: "right"}}>SYNC: {syncLevel}%</div>
          <div style={xpBg}><div style={{...xpFill, width: `${syncLevel}%`}} /></div>
        </div>
      </header>

      <div style={gridStyle}>
        {/* INPUTS */}
        <section style={panelStyle}>
          <div style={{marginBottom: "20px"}}>
             <label style={labelStyle}>IDENTITY</label>
             <input name="name" placeholder="Full Name" style={inputStyle} onChange={handleInputChange} />
             <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
                <input name="email" placeholder="Email" style={inputStyle} onChange={handleInputChange} />
                <input name="phone" placeholder="Phone" style={inputStyle} onChange={handleInputChange} />
             </div>
          </div>

          <label style={{...labelStyle, color: "#6366f1"}}>MISSION (JOB DESCRIPTION)</label>
          <textarea name="jobDesc" style={intelStyle} placeholder="Paste job details..." onChange={handleInputChange} />

          {["summary", "skills", "experience", "education"].map(f => (
            <div key={f} style={{marginBottom: "15px"}}>
              <div style={labelRow}>
                <label style={labelStyle}>{f.toUpperCase()}</label>
                <button style={miniAiBtn} onClick={() => optimizeField(f)}>
                  {loadingField === f ? "SYNCING..." : "✨ AI BUFF"}
                </button>
              </div>
              <textarea name={f} value={formData[f]} style={inputStyle} rows={3} onChange={handleInputChange} />
            </div>
          ))}

          <button style={genBtn} onClick={() => setIsGenerated(true)}>GENERATE PREVIEW</button>
        </section>

        {/* PREVIEW */}
        <section style={previewPanel}>
          <div style={resumePaper}>
            <h2 style={{textAlign: "center", margin: 0}}>{formData.name || "NAME"}</h2>
            <p style={{textAlign: "center", fontSize: "11px"}}>{formData.email} | {formData.phone}</p>
            
            <DragDropContext onDragEnd={(res) => {
              if(!res.destination) return;
              const items = [...sections];
              const [reordered] = items.splice(res.source.index, 1);
              items.splice(res.destination.index, 0, reordered);
              setSections(items);
            }}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sections.map((sec, i) => (
                      <Draggable key={sec.id} draggableId={sec.id} index={i}>
                        {(p) => (
                          <div ref={p.innerRef} {...p.draggableProps} style={{...p.draggableProps.style, marginBottom: "15px"}}>
                            <h4 style={resHead} {...p.dragHandleProps}>::: {sec.label}</h4>
                            <p style={{fontSize: "11px", whiteSpace: "pre-line", color: "#333"}}>{formData[sec.id] || "..."}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {isGenerated && (
              <div style={exportRow}>
                <button style={btnPdf} onClick={downloadPDF}>DOWNLOAD PDF</button>
                <button style={btnDocx} onClick={downloadDOCX}>DOWNLOAD DOCX</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* STYLES (NO CHANGES NEEDED) */
const shellStyle = { background: "#05070a", color: "#eee", minHeight: "100vh", padding: "20px", fontFamily: "monospace" };
const headerStyle = { display: "flex", justifyContent: "space-between", borderBottom: "1px solid #333", paddingBottom: "15px", marginBottom: "20px" };
const xpContainer = { width: "200px" };
const xpBg = { height: "6px", background: "#222" };
const xpFill = { height: "100%", background: "#00ffcc", transition: "0.5s" };
const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" };
const panelStyle = { background: "#0d1117", padding: "20px", border: "1px solid #333" };
const inputStyle = { width: "100%", background: "#000", border: "1px solid #444", color: "#fff", padding: "10px", boxSizing: "border-box" };
const intelStyle = { ...inputStyle, borderColor: "#6366f1", marginBottom: "20px" };
const labelRow = { display: "flex", justifyContent: "space-between", marginBottom: "5px" };
const labelStyle = { fontSize: "10px", color: "#888" };
const miniAiBtn = { background: "#6366f1", color: "#fff", border: "none", fontSize: "9px", cursor: "pointer", padding: "4px 8px" };
const genBtn = { width: "100%", padding: "15px", background: "#00ffcc", color: "#000", fontWeight: "bold", border: "none", cursor: "pointer", marginTop: "10px" };
const previewPanel = { display: "flex", justifyContent: "center" };
const resumePaper = { width: "100%", background: "#fff", color: "#000", padding: "40px", minHeight: "600px" };
const resHead = { borderBottom: "1px solid #000", fontSize: "12px", cursor: "grab", marginTop: "10px" };
const exportRow = { display: "flex", gap: "10px", marginTop: "30px" };
const btnPdf = { flex: 1, background: "#f43f5e", color: "#fff", border: "none", padding: "12px", fontWeight: "bold", cursor: "pointer" };
const btnDocx = { flex: 1, background: "#2563eb", color: "#fff", border: "none", padding: "12px", fontWeight: "bold", cursor: "pointer" };