import React from "react";

export default function Terms() {
  return (
    <div style={styles.container}>
      <style>
        {`
          .terms-card {
            animation: fadeIn 0.8s ease forwards;
          }
          
          .internal-link {
            color: #7a8a6d;
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s opacity;
          }

          .internal-link:hover {
            opacity: 0.7;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="terms-card" style={styles.card}>
        <h1 style={styles.title}>Terms & Conditions</h1>
        <p style={styles.subtitle}>
          Guidelines for a respectful and productive use of our digital garden.
        </p>

        <div style={styles.section}>
          <label style={styles.label}>AGREEMENT OF USE</label>
          <p style={styles.text}>
            By accessing and utilizing this website, you accept and agree to be 
            bound by the terms and conditions outlined in this agreement. These 
            terms ensure a stable and reliable environment for all users.
          </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>PROVISION OF TOOLS</label>
          <p style={styles.text}>
            Our generation tools are provided for general use. While we strive 
            for quality, we do not guarantee the absolute accuracy, completeness, 
            or reliability of AI-generated content. Users should refine and verify 
            outputs as needed for their specific professional contexts.
          </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>USER CONDUCT</label>
          <p style={styles.text}>
            You agree to interact with these tools responsibly. Any misuse, 
            automated scraping, or activity intended to disrupt the website’s 
            performance or harm the community is strictly prohibited.
          </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>LIMITATION OF LIABILITY</label>
          <p style={styles.text}>
            The creators of this platform are not responsible for any damages—direct 
            or indirect—resulting from the use of the tools or the content they 
            produce. Use of this website is at the user's discretion.
          </p>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            We reserve the right to update these terms to reflect the growth of our 
            services. For inquiries, please visit our{" "}
            <a href="/contact" className="internal-link">Contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "80px 20px",
    background: "#fdfaf7",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "50px",
    borderRadius: "16px",
    border: "1px solid #f1ede9",
    boxShadow: "0 10px 30px rgba(92, 102, 86, 0.05)",
    maxWidth: "800px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    color: "#434b3e",
    margin: "0 0 10px 0",
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "15px",
    color: "#8c9488",
    textAlign: "center",
    marginBottom: "45px",
    lineHeight: "1.6",
  },
  section: {
    marginBottom: "35px",
  },
  label: {
    display: "block",
    fontSize: "10px",
    fontWeight: "700",
    color: "#7a8a6d",
    marginBottom: "12px",
    letterSpacing: "1.5px",
  },
  text: {
    fontSize: "15px",
    color: "#434b3e",
    lineHeight: "1.8",
    margin: 0,
  },
  footer: {
    marginTop: "20px",
    paddingTop: "30px",
    borderTop: "1px solid #f1ede9",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#8c9488",
    margin: 0,
    lineHeight: "1.6",
  },
};