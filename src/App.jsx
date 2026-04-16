import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Importing your nature-themed pages
import Resume from "./pages/Resume";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Bio from "./pages/Bio";
import Caption from "./pages/Caption";
import CoverLetter from "./pages/CoverLetter";
import Essay from "./pages/Essay";
import Paraphraser from "./pages/Paraphraser";
import Username from "./pages/Username";
import Hashtags from "./pages/Hashtags";

export default function App() {
  return (
    <Router>
      <div style={styles.app}>
        
        {/* CSS for Glow and Hover Effects */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
            
            /* Unified Glow Effect for Links and Buttons */
            .nav-link-glow {
              transition: 0.3s all ease;
            }
            .nav-link-glow:hover {
              color: #7a8a6d !important;
              text-shadow: 0 0 12px rgba(122, 138, 109, 0.6);
              transform: translateY(-1px);
            }
            .glow-button {
              transition: 0.3s all ease;
            }
            .glow-button:hover {
              background-color: #7a8a6d !important;
              color: white !important;
              box-shadow: 0 0 15px rgba(122, 138, 109, 0.6) !important;
              transform: translateY(-2px);
            }
          `}
        </style>

        {/* TOP ACCENT LINE */}
        <div style={styles.topAccent} />

        {/* DARK NAVBAR */}
        <nav style={styles.nav}>
          <div style={styles.navContent}>
            <Link to="/" className="nav-link-glow" style={styles.logoLink}>
              <h2 style={{...styles.navLogo, ...{fontFamily: "'Playfair Display', serif", fontStyle: "italic"}}}>Viridly</h2>
            </Link>
            <div style={styles.navLinks}>
              <Link to="/" className="nav-link-glow" style={styles.link}>Home</Link>
              <Link to="/resume" className="nav-link-glow" style={styles.link}>Resume</Link>
              <Link to="/contact" className="nav-link-glow" style={styles.link}>Contact</Link>
            </div>
          </div>
        </nav>

        {/* ROUTES */}
        <div style={styles.routeContainer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/caption" element={<Caption />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/essay" element={<Essay />} />
            <Route path="/paraphraser" element={<Paraphraser />} />
            <Route path="/username" element={<Username />} />
            <Route path="/hashtags" element={<Hashtags />} />
          </Routes>
        </div>

        {/* DARK FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <p style={styles.copyright}>© 2026 Viridly. All rights reserved.</p>
            <div style={styles.footerLinksRow}>
              <Link to="/privacy" style={styles.footerLink}>Privacy</Link>
              <span style={styles.footerSeparator}>//</span>
              <Link to="/terms" style={styles.footerLink}>Terms</Link>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}

/* ================= HOME PAGE ================= */

function Home() {
  return (
    <div style={styles.homeWrapper}>

      <section style={styles.hero}>
        {/* Updated appeals tag */}
        <div style={styles.heroTag}>AWAKEN YOUR POTENTIAL</div>
        <h1 style={styles.heroTitle}>
          All-in-One Free AI Tools Platform
        </h1>
        <p style={styles.heroSubtitle}>
          The bridge between where you are and where you want to be. A calm, professional space to cultivate your growth and secure your success.
        </p>
      </section>

      <div style={styles.toolsTitleWrapper}>
        <div style={styles.titleLine} />
        <h2 style={styles.toolsSectionTitle}>CULTIVATE YOUR WORK</h2>
        <div style={styles.titleLine} />
      </div>

      <section style={styles.features}>
        <FeatureCard title="Resume Builder" desc="Design your professional path" link="/resume"/>
        <FeatureCard title="Cover Letter" desc="Introduce your potential" link="/cover-letter"/>
        <FeatureCard title="Bio Generator" desc="Define your digital presence" link="/bio"/>
        <FeatureCard title="Caption Tool" desc="Share your unique story" link="/caption"/>
        <FeatureCard title="Essay Generator" desc="Expand your knowledge base" link="/essay"/>
        <FeatureCard title="Paraphraser" desc="Refine your perspective" link="/paraphraser"/>
        <FeatureCard title="Username Creator" desc="Plant your online identity" link="/username"/>
        <FeatureCard title="Hashtag Tool" desc="Extend your reach" link="/hashtags"/>
      </section>

      <section style={styles.trust}>
        <h2 style={styles.sectionTitle}>Why Choose Viridly</h2>
        <div style={styles.trustGrid}>
          <TrustItem icon="✦" title="Fast" desc="Instant results in seconds" />
          <TrustItem icon="◎" title="Free" desc="No login, no hidden costs" />
          <TrustItem icon="↗" title="Productive" desc="Save hours on tedious tasks" />
          <TrustItem icon="◈" title="Universal" desc="Works on every device" />
        </div>
      </section>

    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function FeatureCard({ title, desc, link }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{desc}</p>
      <Link to={link} className="glow-button" style={styles.cardActionBtn}>
        OPEN TOOL
      </Link>
    </div>
  );
}

function TrustItem({ icon, title, desc }) {
  return (
    <div style={styles.trustItem}>
      <div style={styles.iconCircle}>{icon}</div>
      <h3 style={styles.trustTitle}>{title}</h3>
      <p style={styles.trustDesc}>{desc}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  app: {
    minHeight: "100vh",
    background: "#fdfaf7", 
    color: "#434b3e", 
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  topAccent: {
    height: "4px",
    background: "#7a8a6d", 
    width: "100%",
  },

  nav: {
    background: "#1a1c23", 
    padding: "0 40px",
    height: "70px",
    display: "flex",
    alignItems: "center",
  },

  navContent: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoLink: { textDecoration: "none" },
  navLogo: { 
    color: "#7a8a6d", 
    fontSize: "26px", 
    fontWeight: "400", 
    margin: 0, 
    letterSpacing: "0.5px" 
  },
  navLinks: { display: "flex", gap: "25px" },
  link: { textDecoration: "none", color: "#fffffe", fontSize: "14px", fontWeight: "500" },

  routeContainer: { flex: 1 },
  homeWrapper: { maxWidth: "1200px", margin: "0 auto", padding: "80px 40px" },

  hero: { textAlign: "center", marginBottom: "60px" },
  heroTag: { fontSize: "11px", color: "#7a8a6d", fontWeight: "bold", letterSpacing: "2px", marginBottom: "15px" },
  heroTitle: { fontSize: "48px", color: "#434b3e", margin: "0 0 20px 0", fontWeight: "700", letterSpacing: "-1px" },
  heroSubtitle: { color: "#8c9488", fontSize: "18px", maxWidth: "700px", margin: "0 auto", lineHeight: "1.7" },

  toolsTitleWrapper: { display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "40px", marginTop: "40px" },
  titleLine: { height: "1px", background: "#e2e8de", flex: 1, maxWidth: "100px" },
  toolsSectionTitle: { fontSize: "13px", color: "#7a8a6d", fontWeight: "bold", letterSpacing: "3px", margin: 0 },

  features: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginBottom: "100px" },

  card: {
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: "16px",
    border: "1px solid #f1ede9",
    boxShadow: "0 4px 12px rgba(92, 102, 86, 0.03)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardTitle: { fontSize: "19px", color: "#434b3e", margin: "0 0 10px 0", fontWeight: "600" },
  cardDesc: { color: "#8c9488", fontSize: "14px", margin: "0 0 25px 0", lineHeight: "1.5" },
  
  cardActionBtn: {
    textDecoration: "none",
    background: "transparent",
    border: "1px solid #7a8a6d",
    color: "#7a8a6d",
    padding: "10px 24px",
    borderRadius: "25px",
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    cursor: "pointer"
  },

  trust: { textAlign: "center", padding: "60px 0", borderTop: "1px solid #f1ede9" },
  sectionTitle: { fontSize: "24px", color: "#434b3e", marginBottom: "40px" },
  trustGrid: { display: "flex", justifyContent: "center", gap: "50px", flexWrap: "wrap" },
  trustItem: { maxWidth: "200px", display: "flex", flexDirection: "column", alignItems: "center" },
  
  iconCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#f1f3ef",
    color: "#7a8a6d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginBottom: "15px",
    border: "1px solid #e2e8de"
  },

  trustTitle: { fontSize: "18px", color: "#7a8a6d", margin: "0 0 10px 0", fontWeight: "700" },
  trustDesc: { fontSize: "14px", color: "#8c9488" },

  footer: {
    background: "#1a1c23", 
    padding: "50px 20px",
    textAlign: "center",
    borderTop: "1px solid #2e313e"
  },

  footerContent: { display: "flex", flexDirection: "column", gap: "12px" },
  copyright: { fontSize: "12px", color: "#9c9dad", margin: 0 },
  footerLinksRow: { display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" },
  footerLink: { color: "#fffffe", textDecoration: "none", fontSize: "12px" },
  footerSeparator: { color: "#5e606a", fontSize: "12px" }
};