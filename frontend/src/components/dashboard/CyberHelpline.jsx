import { useState } from "react";
import "../../styles/cyber-helpline.css";

function CyberHelpline() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="hero-btn helpline-btn"
        onClick={() => setOpen(true)}
      >
        🚨 Report Cyber Fraud
      </button>

      {open && (
        <div className="helpline-overlay">

          <div className="helpline-card">

            <button
              className="close-helpline"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h2>🚨 National Cyber Crime Portal</h2>

            <p className="helpline-text">
              If you have become a victim of online fraud,
              immediately report it using the official Government
              of India cyber crime portal.
            </p>

            <div className="info-box">

              <h3>📞 Toll Free Helpline</h3>

              <h1>1930</h1>

            </div>

            <div className="info-box">

              <h3>🌐 Official Website</h3>

              <p>https://cybercrime.gov.in</p>

            </div>

            <div className="button-group">

              <button
                className="website-btn"
                onClick={() =>
                  window.open(
                    "https://cybercrime.gov.in",
                    "_blank"
                  )
                }
              >
                Open Website
              </button>

              <button
                className="close-btn2"
                onClick={() => setOpen(false)}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default CyberHelpline;
