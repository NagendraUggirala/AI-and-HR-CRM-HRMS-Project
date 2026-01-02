import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


const Newhire = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get candidate data from navigation state or use default
  const formId = location.state?.formId;
  const candidateName = location.state?.candidateName || "Chandu Thota";
  const companyName = "Levitica Technologies Private Limited";

  const handleContinue = () => {
    toast.success("Redirecting to Basic Details...");
    setTimeout(() => navigate("/basicdetails"), 800);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    toast.info(`Switched to ${darkMode ? "Light" : "Dark"} Mode`);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#F5F7FA", 
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        maxWidth: "900px", 
        margin: "0 auto",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        {/* Header */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start",
          marginBottom: "40px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img
              src="/assets/img/icons/logo-1.png"
              alt="Levitica Logo"
              style={{ height: "50px", width: "50px", objectFit: "contain" }}
            />
            <div>
              <h4 style={{ 
                margin: 0, 
                fontSize: "20px", 
                fontWeight: "700", 
                color: "#1F2937",
                lineHeight: "1.2"
              }}>
                {companyName}
              </h4>
              <p style={{ 
                margin: "4px 0 0 0", 
                fontSize: "14px", 
                color: "#6B7280",
                fontWeight: "500"
              }}>
                New Hire Onboarding
              </p>
            </div>
          </div>
          <div 
            style={{ 
              cursor: "pointer", 
              fontSize: "24px",
              padding: "8px"
            }} 
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </div>
        </div>

        {/* Greeting Section */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ 
            color: "#2563EB", 
            fontSize: "28px", 
            fontWeight: "600", 
            marginBottom: "12px"
          }}>
            Hello {candidateName}
          </h2>
          <p style={{ 
            fontSize: "16px", 
            color: "#1F2937",
            marginBottom: "8px",
            lineHeight: "1.6"
          }}>
            <strong>{companyName}</strong> welcomes you onboard!
          </p>
          <p style={{ 
            fontSize: "15px", 
            color: "#4B5563",
            lineHeight: "1.6",
            marginBottom: "30px"
          }}>
            Grab your personal details and keep your documents handy. When ready, click the Continue button to start your onboarding.
          </p>
        </div>

        {/* Continue Button */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <button 
            onClick={handleContinue}
            style={{
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              padding: "12px 32px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1D4ED8";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#2563EB";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Continue →
          </button>
        </div>

        {/* Notes Section */}
        <div style={{ 
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#F9FAFB",
          borderRadius: "8px"
        }}>
          <p style={{ 
            fontWeight: "600", 
            fontSize: "15px",
            color: "#1F2937",
            marginBottom: "12px"
          }}>
            Notes:
          </p>
          <ul style={{ 
            margin: 0, 
            paddingLeft: "20px",
            listStyle: "disc",
            color: "#4B5563",
            fontSize: "14px",
            lineHeight: "1.8"
          }}>
            <li style={{ marginBottom: "8px" }}>
              There are total 11 sections in this onboarding form.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Your progress will be saved at every step.
            </li>
            <li>
              You can return to this form anytime by using the link provided in your email.
            </li>
          </ul>
        </div>

        {/* Footer */}
        <hr style={{ 
          margin: "40px 0 20px 0", 
          border: "none",
          borderTop: "1px solid #E5E7EB"
        }} />
        
        <div style={{ 
          textAlign: "center", 
          fontSize: "14px",
          color: "#6B7280"
        }}>
          <p style={{ 
            marginBottom: "12px",
            fontWeight: "500"
          }}>
            Powered by
          </p>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            gap: "8px",
            marginBottom: "8px"
          }}>
            <img
              src="/assets/img/icons/logo-1.png"
              alt="Runtime HRMS"
              style={{ height: "24px", width: "24px", objectFit: "contain" }}
            /> 
            <span style={{ fontWeight: "600", color: "#1F2937" }}>Runtime HRMS</span>
          </div>
          <a 
            href="https://www.runtimehrms.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#2563EB",
              textDecoration: "none",
              fontSize: "13px"
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
            onMouseLeave={(e) => e.target.style.textDecoration = "none"}
          >
            Visit us: www.runtimehrms.com
          </a>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Newhire;
