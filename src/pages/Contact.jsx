import React from "react";

export default function Contact() {
  return (
    <div style={styles.container}>
      <style>
        {`
          .contact-btn:hover {
            background-color: #7a8a6d !important;
            color: white !important;
            box-shadow: 0 0 15px rgba(122, 138, 109, 0.4) !important;
            transform: translateY(-2px);
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.card}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>

        <div style={styles.section}>
          <label style={styles.label}>DIRECT CORRESPONDENCE</label>
          <div style={styles.infoBox}>
            <p style={styles.emailText}>JBworkamazing@gmail.com</p>
            <a 
              href="mailto:JBworkamazing@gmail.com" 
              className="contact-btn" 
              style={styles.btn}
            >
              SEND EMAIL
            </a>
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>TECHNICAL SUPPORT</label>
          <p style={styles.supportText}>
            For any issues with our tools, please reach out via email. Our team 
            is dedicated to refining your experience and will respond as 
            efficiently as possible.
          </p>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Thank you for cultivating your projects with our AI tools.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "80px 20px",
    background: "#fdfaf7", // Warm Nature White
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "50px",
    borderRadius: "16px",
    border: "1px solid #f1ede9",
    boxShadow: "0 10px 30px rgba(92, 102, 86, 0.05)",
    maxWidth: "700px",
    width: "100%",
    animation: "fadeIn 0.8s ease forwards",
  },
  title: {
    fontSize: "32px",
    color: "#434b3e", // Deep Moss Charcoal
    margin: "0 0 15px 0",
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "16px",
    color: "#8c9488",
    textAlign: "center",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  section: {
    marginBottom: "35px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    color: "#7a8a6d", // Moss Green
    marginBottom: "12px",
    letterSpacing: "1.5px",
  },
  infoBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f9fbf8",
    padding: "20px 25px",
    borderRadius: "12px",
    border: "1px solid #e2e8de",
  },
  emailText: {
    fontSize: "15px",
    color: "#434b3e",
    fontWeight: "500",
    margin: 0,
  },
  btn: {
    padding: "10px 20px",
    background: "transparent",
    border: "1px solid #7a8a6d",
    color: "#7a8a6d",
    borderRadius: "20px",
    fontWeight: "700",
    fontSize: "11px",
    letterSpacing: "1px",
    textDecoration: "none",
    transition: "0.3s all ease",
  },
  supportText: {
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
    color: "#aeb6a3",
    fontStyle: "italic",
    margin: 0,
  },
};