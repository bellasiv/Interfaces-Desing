import { useState } from "react";
import "./termsConditions.css"; 

function TermsAndConditions({ termsAccepted, setTermsAccepted }) {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="terms-container">
      <div className="terms-checkbox-container">
        <input
          type="checkbox"
          id="terms"
          className="terms-checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label htmlFor="terms" className="terms-label">
          Accept terms and Conditions
        </label>
      </div>

      <span className="read-more-link" onClick={() => setShowTerms(true)}>
        Read More...
      </span>

      {showTerms && (
        <div className="modal-overlay">
          <div className="terms-modal">
            <div className="terms-modal-header">
              <h3>Terms and Conditions</h3>
            </div>
            
            <div className="terms-modal-body">
              <p>Welcome to PawPals! These Terms and Conditions govern your use of our platform and services.</p>
              
              <h4>1. Account Registration</h4>
              <p>By creating an account, you agree to provide accurate and complete information.</p>
              
              <h4>2. Privacy</h4>
              <p>Your privacy is important to us. Please review our Privacy Policy.</p>
              
              <h4>3. User Conduct</h4>
              <p>You agree to use our platform responsibly and in compliance with laws.</p>
            </div>

            <div className="modal-actions">
              <button
                className="accept-button"
                onClick={() => {
                  setTermsAccepted(true);
                  setShowTerms(false);
                }}
              >
                Accept Terms
              </button>
              <button className="cancel-button" onClick={() => setShowTerms(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TermsAndConditions;
