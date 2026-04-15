import { useState } from "react";
import { jsPDF } from "jspdf";

export default function App() {
  const [page, setPage] = useState("home");

  // RESUME STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState("");
  const [template, setTemplate] = useState("classic");

  // BIO
  const [bioInput, setBioInput] = useState("");
  const [bioOutput, setBioOutput] = useState("");

  // CAPTION
  const [captionInput, setCaptionInput] = useState("");
  const [captionOutput, setCaptionOutput] = useState("");

  // FUNCTIONS
  const generateResume = () => {
    const output = `
${name.toUpperCase()}
${email}
${phone}

PROFILE
Motivated individual with skills in ${skills}.

SKILLS
• ${skills.split(",").join("\n• ")}

EDUCATION
${education}

EXPERIENCE
${experience}
    `;
    setResume(output);
  };

  const improveResume = () => {
    const improved = `
${name.toUpperCase()}
${email}
${phone}

PROFILE
Highly motivated professional skilled in ${skills}.

SKILLS
• ${skills.split(",").join("\n• ")}

EDUCATION
${education}

EXPERIENCE
Proven experience: ${experience}
    `;
    setResume(improved);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(resume, 10, 10);
    doc.save("resume.pdf");
  };

  const generateBio = () => {
    setBioOutput(`Hi, I'm ${bioInput}. Passionate and always growing.`);
  };

  const generateCaption = () => {
    setCaptionOutput(`${captionInput} ✨ #life #growth`);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
        borderBottom: "1px solid #1e293b"
      }}>
        <h2>AI Tools Hub</h2>
        <div style={{ display: "flex", gap: 15 }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("resume")}>Resume</button>
          <button onClick={() => setPage("bio")}>Bio</button>
          <button onClick={() => setPage("caption")}>Caption</button>
        </div>
      </div>

      {/* HOME PAGE */}
      {page === "home" && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <h1 style={{ fontSize: 40 }}>Free AI Tools for Everyone</h1>
          <p style={{ marginTop: 10, color: "#94a3b8" }}>
            Create resumes, bios, and captions instantly — no signup, no cost.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20,
            marginTop: 40
          }}>
            <div style={cardStyle} onClick={() => setPage("resume")}>
              <h3>Resume Builder</h3>
              <p>Create professional resumes instantly</p>
            </div>

            <div style={cardStyle} onClick={() => setPage("bio")}>
              <h3>Bio Generator</h3>
              <p>Write clean personal bios fast</p>
            </div>

            <div style={cardStyle} onClick={() => setPage("caption")}>
              <h3>Caption Tool</h3>
              <p>Generate social media captions</p>
            </div>
          </div>
        </div>
      )}

      {/* RESUME PAGE */}
      {page === "resume" && (
        <div style={containerStyle}>
          <h2>Resume Generator</h2>

          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle}/>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}/>
          <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle}/>
          <textarea placeholder="Skills" value={skills} onChange={e => setSkills(e.target.value)} style={inputStyle}/>
          <textarea placeholder="Education" value={education} onChange={e => setEducation(e.target.value)} style={inputStyle}/>
          <textarea placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} style={inputStyle}/>

          <button onClick={generateResume} style={btn}>Create Resume</button>
          <button onClick={improveResume} style={btnPurple}>✨ Improve</button>
          <button onClick={downloadPDF} style={btnBlue}>Download PDF</button>

          {resume && <pre style={outputStyle}>{resume}</pre>}
        </div>
      )}

      {/* BIO PAGE */}
      {page === "bio" && (
        <div style={containerStyle}>
          <h2>Bio Generator</h2>

          <input
            placeholder="Enter your name or description"
            value={bioInput}
            onChange={e => setBioInput(e.target.value)}
            style={inputStyle}
          />

          <button onClick={generateBio} style={btn}>Generate</button>

          {bioOutput && <p style={outputStyle}>{bioOutput}</p>}
        </div>
      )}

      {/* CAPTION PAGE */}
      {page === "caption" && (
        <div style={containerStyle}>
          <h2>Caption Generator</h2>

          <input
            placeholder="What is your post about?"
            value={captionInput}
            onChange={e => setCaptionInput(e.target.value)}
            style={inputStyle}
          />

          <button onClick={generateCaption} style={btn}>Generate</button>

          {captionOutput && <p style={outputStyle}>{captionOutput}</p>}
        </div>
      )}

    </div>
  );
}

// STYLES
const containerStyle = {
  maxWidth: 500,
  margin: "40px auto",
  background: "#1e293b",
  padding: 20,
  borderRadius: 10
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 10
};

const btn = {
  width: "100%",
  padding: 12,
  marginTop: 10,
  background: "#22c55e",
  border: "none",
  color: "white",
  cursor: "pointer"
};

const btnPurple = {
  ...btn,
  background: "#a855f7"
};

const btnBlue = {
  ...btn,
  background: "#3b82f6"
};

const outputStyle = {
  marginTop: 20,
  background: "#020617",
  padding: 15
};

const cardStyle = {
  background: "#1e293b",
  padding: 20,
  borderRadius: 10,
  cursor: "pointer"
};