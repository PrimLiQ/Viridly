import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
        
        {/* NAVBAR */}
        <nav style={styles.nav}>
          <h2 style={{ margin: 0 }}>AI Tools Hub</h2>
          <div>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/resume" style={styles.link}>Resume</Link>
            <Link to="/bio" style={styles.link}>Bio</Link>
            <Link to="/caption" style={styles.link}>Caption</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </div>
        </nav>

        {/* ROUTES */}
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

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>© 2026 AI Tools Hub. All rights reserved.</p>
          <div>
            <Link to="/privacy" style={styles.footerLink}>Privacy</Link>
            <Link to="/terms" style={styles.footerLink}>Terms</Link>
          </div>
        </footer>

      </div>
    </Router>
  );
}

/* ================= HOME PAGE ================= */

function Home() {
  return (
    <div>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          All-in-One Free AI Tools Platform
        </h1>
        <p style={styles.heroSubtitle}>
          Resume builder, content tools, and productivity tools — all in one place.
        </p>

        <Link to="/resume" style={styles.cta}>
          Start Building →
        </Link>
      </section>

      {/* ALL TOOLS GRID */}
      <section style={styles.features}>
        <FeatureCard title="Resume Builder" desc="ATS-friendly resume generator" link="/resume"/>
        <FeatureCard title="Cover Letter" desc="Job-ready cover letters" link="/cover-letter"/>
        <FeatureCard title="Bio Generator" desc="Professional bios instantly" link="/bio"/>
        <FeatureCard title="Caption Tool" desc="Social captions fast" link="/caption"/>
        <FeatureCard title="Essay Generator" desc="Write essays quickly" link="/essay"/>
        <FeatureCard title="Paraphraser" desc="Rewrite content easily" link="/paraphraser"/>
        <FeatureCard title="Username Generator" desc="Create unique usernames" link="/username"/>
        <FeatureCard title="Hashtag Generator" desc="Boost your reach" link="/hashtags"/>
      </section>

      {/* WHY SECTION */}
      <section style={styles.trust}>
        <h2>Why People Use AI Tools Hub</h2>
        <div style={styles.trustGrid}>
          <TrustItem title="⚡ Fast" desc="Instant results in seconds" />
          <TrustItem title="💯 Free" desc="No login, no cost" />
          <TrustItem title="📈 Productive" desc="Save hours of work" />
          <TrustItem title="🌍 Accessible" desc="Works on any device" />
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2>Start Using Free AI Tools Today</h2>
        <Link to="/resume" style={styles.ctaBig}>
          Try Resume Builder →
        </Link>
      </section>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function FeatureCard({ title, desc, link }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={{ opacity: 0.8 }}>{desc}</p>

      <Link to={link} style={styles.cardBtn}>
        Use Tool →
      </Link>
    </div>
  );
}

function TrustItem({ title, desc }) {
  return (
    <div style={styles.trustItem}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #1e293b"
  },

  link: {
    marginLeft: 20,
    textDecoration: "none",
    color: "white",
    fontWeight: "500"
  },

  hero: {
    textAlign: "center",
    marginTop: 80,
    padding: "0 20px"
  },

  heroTitle: {
    fontSize: "42px"
  },

  heroSubtitle: {
    opacity: 0.7,
    fontSize: "18px"
  },

  cta: {
    display: "inline-block",
    marginTop: 25,
    padding: "12px 25px",
    background: "#22c55e",
    borderRadius: 8,
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginTop: 60,
    flexWrap: "wrap"
  },

  card: {
    background: "#1e293b",
    padding: 25,
    borderRadius: 12,
    width: 260,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  },

  cardBtn: {
    display: "inline-block",
    marginTop: 15,
    color: "#22c55e",
    textDecoration: "none",
    fontWeight: "bold"
  },

  trust: {
    textAlign: "center",
    marginTop: 80
  },

  trustGrid: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    marginTop: 30,
    flexWrap: "wrap"
  },

  trustItem: {
    maxWidth: 200
  },

  ctaSection: {
    textAlign: "center",
    marginTop: 80
  },

  ctaBig: {
    display: "inline-block",
    marginTop: 20,
    padding: "14px 30px",
    background: "#22c55e",
    borderRadius: 10,
    color: "white",
    fontSize: 18,
    textDecoration: "none",
    fontWeight: "bold"
  },

  footer: {
    marginTop: 80,
    padding: 20,
    borderTop: "1px solid #1e293b",
    textAlign: "center"
  },

  footerLink: {
    marginLeft: 15,
    color: "#94a3b8",
    textDecoration: "none"
  }
};