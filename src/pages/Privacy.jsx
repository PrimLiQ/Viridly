import React from "react";

export default function Privacy() {
  return (
    <div style={styles.container}>
      <style>
        {`
          .policy-card {
            animation: fadeIn 0.8s ease forwards;
          }
          
          .contact-link {
            color: #7a8a6d;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 1px solid transparent;
            transition: 0.3s;
          }

          .contact-link:hover {
            border-bottom: 1px solid #7a8a6d;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="policy-card" style={styles.card}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.subtitle}>
          Your trust is essential to our growth. Here is how we cultivate and respect your privacy.
        </p>

        <div style={styles.section}>
          <label style={styles.label}>DATA COLLECTION</label>
          <p style={styles.text}>
            This website respects your digital footprint. We do not collect personal 
            information unless you voluntarily provide it through direct correspondence. 
            Your data is never harvested for undisclosed purposes.
          </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>COOKIES & ANALYTICS</label>
          <p style={styles.text}>
            We utilize cookies to enhance your experience and display relevant content. 
            This includes integration with services like Google AdSense to provide 
            advertisements that align with your interests.
          </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>THIRD-PARTY VENDORS</label>
          <p style={styles.text}>
            Third-party vendors, including Google, use cookies to serve ads based on 
            your prior visits. These interactions are managed by the vendors to ensure 
            content remains helpful and contextual across the web.
          </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>USER CONSENT</label>
          <p style={styles.text}>
            By utilizing our tools, you consent to our privacy policy and agree 
            to its terms. We encourage you to review this page periodically as we 
            continue to evolve our services.
          </p>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Questions regarding your data? Reach out via our{" "}
            <a href="/contact" className="contact-link">Contact page</a>.
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
    color: "#434b3e", // Deep Moss Charcoal
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
    fontSize: "11px",
    fontWeight: "700",
    color: "#7a8a6d", // Moss Green
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
  },
};