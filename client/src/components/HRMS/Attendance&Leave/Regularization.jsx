import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Card style definition
const cardStyle = {
  padding: 20,
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #e9ecef",
  minHeight: "600px", // Add minimum height for consistency
};

// Reusable Card Component
const RegularizationCard = ({ children, title, style = {} }) => (
  <div style={{ ...cardStyle, ...style }}>
    {title && (
      <div className="mb-3">
        <h6 className="fw-bold mb-0" style={{ color: "#2d3e50", fontSize: "16px" }}>
          {title}
        </h6>
      </div>
    )}
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  </div>
);

// Reusable Form Field Component
const FormField = ({ label, type = "text", value, onChange, placeholder, required = false, options, ...props }) => (
  <div className="mb-3">
    {label && (
      <label className="form-label" style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
    )}
    {type === "select" ? (
      <select
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
        style={{ fontSize: "14px", padding: "8px 12px" }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={3}
        style={{ fontSize: "14px", padding: "8px 12px" }}
        {...props}
      />
    ) : type === "file" ? (
      <div>
        <input
          type="file"
          className="form-control"
          onChange={onChange}
          style={{ fontSize: "14px", padding: "6px 12px" }}
          {...props}
        />
      </div>
    ) : (
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{ fontSize: "14px", padding: "8px 12px" }}
        {...props}
      />
    )}
  </div>
);

// Button Styles
const buttonStyles = {
  primary: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "100%",
    textAlign: "center",
    display: "block",
    textDecoration: "none",
  },
  secondary: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "100%",
    textAlign: "center",
    display: "block",
    textDecoration: "none",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#007bff",
    border: "1px solid #007bff",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "100%",
    textAlign: "center",
    display: "block",
    textDecoration: "none",
  }
};

// Button Container Style
const buttonContainerStyle = {
  marginTop: "auto",
  paddingTop: "20px",
  borderTop: "1px solid #e9ecef",
};

export default function Regularization() {
  const [activeSection, setActiveSection] = useState("Employee Requests");

  // Form States
  const [missingPunch, setMissingPunch] = useState({
    dateTime: "",
    reason: "",
    remarks: "",
  });

  const [incorrectTime, setIncorrectTime] = useState({
    originalTime: "",
    correctedTime: "",
    reason: "",
    remarks: "",
  });

  const [forgotPunch, setForgotPunch] = useState({
    date: "",
    punchType: "IN",
    approxTime: "",
    reason: "",
    remarks: "",
    attachment: null,
    submitting: false,
  });

  const [wfhRegularization, setWfhRegularization] = useState({
    date: "",
    location: "",
    reason: "",
    summary: "",
    attachment: null,
  });

  // Duty & Remarks States
  const [onDuty, setOnDuty] = useState({
    date: "",
    fromTime: "",
    toTime: "",
    dutyType: "",
    purpose: "",
    remarks: "",
    attachment: null,
  });

  const [remarksEntry, setRemarksEntry] = useState({
    title: "",
    remarks: "",
    attachment: null,
  });

  // Attachments & Workflow States
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [approvalAction, setApprovalAction] = useState("");
  const [approvalRemarks, setApprovalRemarks] = useState("");
  const fileInputRef = useRef(null);

  // Reports & Settings States
  const [autoRejectDays, setAutoRejectDays] = useState("");
  const [autoRejectType, setAutoRejectType] = useState("");
  const [bulkFromDate, setBulkFromDate] = useState("");
  const [bulkToDate, setBulkToDate] = useState("");
  const [bulkIssueType, setBulkIssueType] = useState("");
  const [reportFromDate, setReportFromDate] = useState("");
  const [reportToDate, setReportToDate] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");

  // Container style
  const containerStyle = {
    background: "#fff",
    padding: 24,
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    marginBottom: 24,
    border: "1px solid #e9ecef",
  };

  // Navigation Sections
  const sections = [
    { id: "Employee Requests" },
    { id: "Duty & Remarks" },
    { id: "Attachments & Workflow" },
    { id: "Reports & Settings" },
  ];

  // Handlers
  const handleMissingPunchSubmit = (e) => {
    e.preventDefault();
    if (!missingPunch.dateTime || !missingPunch.reason || !missingPunch.remarks) {
      alert("Please fill all required fields");
      return;
    }
    alert("Missing punch request submitted");
    setMissingPunch({ dateTime: "", reason: "", remarks: "" });
  };

  const handleIncorrectTimeSubmit = (e) => {
    e.preventDefault();
    if (!incorrectTime.originalTime || !incorrectTime.correctedTime || !incorrectTime.reason || !incorrectTime.remarks) {
      alert("Please fill all required fields");
      return;
    }
    alert("Incorrect time request submitted");
    setIncorrectTime({ originalTime: "", correctedTime: "", reason: "", remarks: "" });
  };

  const handleForgotPunchSubmit = (e) => {
    e.preventDefault();
    if (!forgotPunch.date || !forgotPunch.approxTime || !forgotPunch.reason || !forgotPunch.remarks) {
      alert("Please fill all required fields");
      return;
    }
    
    setForgotPunch(prev => ({ ...prev, submitting: true }));
    
    setTimeout(() => {
      alert("Forgot punch request submitted successfully");
      setForgotPunch({
        date: "",
        punchType: "IN",
        approxTime: "",
        reason: "",
        remarks: "",
        attachment: null,
        submitting: false,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 800);
  };

  const handleWfhSubmit = (e) => {
    e.preventDefault();
    if (!wfhRegularization.date || !wfhRegularization.location || !wfhRegularization.reason || !wfhRegularization.summary) {
      alert("Please fill all required fields");
      return;
    }
    alert("WFH Regularization request submitted");
    setWfhRegularization({
      date: "",
      location: "",
      reason: "",
      summary: "",
      attachment: null,
    });
  };

  const handleOnDutySubmit = (e) => {
    e.preventDefault();
    if (!onDuty.date || !onDuty.fromTime || !onDuty.toTime || !onDuty.dutyType || !onDuty.purpose || !onDuty.remarks) {
      alert("Please fill all required fields");
      return;
    }
    alert("On-Duty request submitted");
    setOnDuty({
      date: "",
      fromTime: "",
      toTime: "",
      dutyType: "",
      purpose: "",
      remarks: "",
      attachment: null,
    });
  };

  const handleRemarksSubmit = (e) => {
    e.preventDefault();
    if (!remarksEntry.title || !remarksEntry.remarks) {
      alert("Please fill all required fields");
      return;
    }
    alert("Remarks saved successfully");
    setRemarksEntry({
      title: "",
      remarks: "",
      attachment: null,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const handleApprovalSubmit = (e) => {
    e.preventDefault();
    if (!approvalAction) {
      alert("Please select an action");
      return;
    }
    alert(`Request ${approvalAction} submitted with remarks: ${approvalRemarks}`);
    setApprovalAction("");
    setApprovalRemarks("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Inter', 'Segoe UI', sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: "#2d3e50" }}>
          Regularization Dashboard
        </h4>
        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
          Manage attendance regularization requests and approvals
        </p>
      </div>

      {/* Navigation Tabs with consistent styling */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className="btn"
            style={{
              whiteSpace: "nowrap",
              padding: "8px 20px",
              borderRadius: "4px",
              background: activeSection === section.id ? "#007bff" : "#fff",
              color: activeSection === section.id ? "#fff" : "#495057",
              fontWeight: "500",
              border: `1px solid ${activeSection === section.id ? "#007bff" : "#ced4da"}`,
              transition: "all 0.2s ease",
              fontSize: "14px",
            }}
            onMouseEnter={(e) => {
              if (activeSection !== section.id) {
                e.currentTarget.style.backgroundColor = "#e7f1ff";
                e.currentTarget.style.borderColor = "#007bff";
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== section.id) {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.borderColor = "#ced4da";
              }
            }}
          >
            {section.id}
          </button>
        ))}
      </div>

      {/* Employee Requests Section - 2x2 Layout */}
      {activeSection === "Employee Requests" && (
        <div style={containerStyle}>
          <h5 className="fw-bold mb-4" style={{ color: "#2d3e50", fontSize: "18px" }}>
            Employee Requests
          </h5>
          
          <div className="row g-4">
            {/* Row 1 - 2 cards */}
            <div className="col-12 col-lg-6">
              <RegularizationCard title="Missing Punch">
                <form onSubmit={handleMissingPunchSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="Date & Time"
                      type="datetime-local"
                      value={missingPunch.dateTime}
                      onChange={(e) => setMissingPunch(prev => ({ ...prev, dateTime: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Reason"
                      type="text"
                      value={missingPunch.reason}
                      onChange={(e) => setMissingPunch(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Enter reason"
                      required
                    />
                    <FormField
                      label="Remarks"
                      type="textarea"
                      value={missingPunch.remarks}
                      onChange={(e) => setMissingPunch(prev => ({ ...prev, remarks: e.target.value }))}
                      placeholder="Enter remarks"
                      required
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="submit" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </RegularizationCard>
            </div>

            <div className="col-12 col-lg-6">
              <RegularizationCard title="Incorrect Time">
                <form onSubmit={handleIncorrectTimeSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="Original Time"
                      type="datetime-local"
                      value={incorrectTime.originalTime}
                      onChange={(e) => setIncorrectTime(prev => ({ ...prev, originalTime: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Corrected Time"
                      type="datetime-local"
                      value={incorrectTime.correctedTime}
                      onChange={(e) => setIncorrectTime(prev => ({ ...prev, correctedTime: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Reason"
                      type="text"
                      value={incorrectTime.reason}
                      onChange={(e) => setIncorrectTime(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Enter reason"
                      required
                    />
                    <FormField
                      label="Remarks"
                      type="textarea"
                      value={incorrectTime.remarks}
                      onChange={(e) => setIncorrectTime(prev => ({ ...prev, remarks: e.target.value }))}
                      placeholder="Enter remarks"
                      required
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="submit" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Update Time
                    </button>
                  </div>
                </form>
              </RegularizationCard>
            </div>

            {/* Row 2 - 2 cards */}
            <div className="col-12 col-lg-6">
              <RegularizationCard title="Forgot Punch">
                <form onSubmit={handleForgotPunchSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="Date"
                      type="date"
                      value={forgotPunch.date}
                      onChange={(e) => setForgotPunch(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Punch Type"
                      type="select"
                      value={forgotPunch.punchType}
                      onChange={(e) => setForgotPunch(prev => ({ ...prev, punchType: e.target.value }))}
                      options={[
                        { value: "IN", label: "IN" },
                        { value: "OUT", label: "OUT" },
                      ]}
                    />
                    <FormField
                      label="Approx Time"
                      type="time"
                      value={forgotPunch.approxTime}
                      onChange={(e) => setForgotPunch(prev => ({ ...prev, approxTime: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Reason"
                      type="text"
                      value={forgotPunch.reason}
                      onChange={(e) => setForgotPunch(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Enter reason"
                      required
                    />
                    <FormField
                      label="Remarks"
                      type="textarea"
                      value={forgotPunch.remarks}
                      onChange={(e) => setForgotPunch(prev => ({ ...prev, remarks: e.target.value }))}
                      placeholder="Enter remarks"
                      required
                    />
                    <FormField
                      label="Attachment"
                      type="file"
                      onChange={(e) => setForgotPunch(prev => ({ ...prev, attachment: e.target.files[0] }))}
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button
                      type="submit"
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                        opacity: forgotPunch.submitting ? 0.7 : 1,
                      }}
                      disabled={forgotPunch.submitting}
                      onMouseEnter={(e) => {
                        if (!forgotPunch.submitting) {
                          e.currentTarget.style.backgroundColor = "#0056b3";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!forgotPunch.submitting) {
                          e.currentTarget.style.backgroundColor = "#007bff";
                        }
                      }}
                    >
                      {forgotPunch.submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </form>
              </RegularizationCard>
            </div>

            <div className="col-12 col-lg-6">
              <RegularizationCard title="WFH Regularization">
                <form onSubmit={handleWfhSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="Date"
                      type="date"
                      value={wfhRegularization.date}
                      onChange={(e) => setWfhRegularization(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                    <FormField
                      label="Location"
                      type="text"
                      value={wfhRegularization.location}
                      onChange={(e) => setWfhRegularization(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location"
                      required
                    />
                    <FormField
                      label="Reason"
                      type="select"
                      value={wfhRegularization.reason}
                      onChange={(e) => setWfhRegularization(prev => ({ ...prev, reason: e.target.value }))}
                      options={[
                        { value: "", label: "Select Reason" },
                        { value: "Health Issue", label: "Health Issue" },
                        { value: "Personal Work", label: "Personal Work" },
                        { value: "Family Emergency", label: "Family Emergency" },
                        { value: "Other", label: "Other" },
                      ]}
                      required
                    />
                    <FormField
                      label="Work Summary"
                      type="textarea"
                      value={wfhRegularization.summary}
                      onChange={(e) => setWfhRegularization(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Enter work summary"
                      required
                    />
                    <FormField
                      label="Attachment"
                      type="file"
                      onChange={(e) => setWfhRegularization(prev => ({ ...prev, attachment: e.target.files[0] }))}
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="submit" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </RegularizationCard>
            </div>
          </div>
        </div>
      )}

      {/* Duty & Remarks Section */}
      {activeSection === "Duty & Remarks" && (
        <div style={containerStyle}>
          <h5 className="fw-bold mb-4" style={{ color: "#2d3e50", fontSize: "18px" }}>
            Duty & Remarks
          </h5>
          
          <div className="row g-4">
            {/* On-Duty Request */}
            <div className="col-12 col-md-6">
              <RegularizationCard title="On-Duty Request">
                <form onSubmit={handleOnDutySubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="Date"
                      type="date"
                      value={onDuty.date}
                      onChange={(e) => setOnDuty(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                    
                    <div className="row g-2">
                      <div className="col-6">
                        <FormField
                          label="From Time"
                          type="time"
                          value={onDuty.fromTime}
                          onChange={(e) => setOnDuty(prev => ({ ...prev, fromTime: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <FormField
                          label="To Time"
                          type="time"
                          value={onDuty.toTime}
                          onChange={(e) => setOnDuty(prev => ({ ...prev, toTime: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <FormField
                      label="Duty Type"
                      type="select"
                      value={onDuty.dutyType}
                      onChange={(e) => setOnDuty(prev => ({ ...prev, dutyType: e.target.value }))}
                      options={[
                        { value: "", label: "Select Duty Type" },
                        { value: "client_visit", label: "Client Visit" },
                        { value: "training", label: "Training" },
                        { value: "business_travel", label: "Business Travel" },
                        { value: "other", label: "Other" },
                      ]}
                      required
                    />
                    
                    <FormField
                      label="Purpose/Location"
                      type="text"
                      value={onDuty.purpose}
                      onChange={(e) => setOnDuty(prev => ({ ...prev, purpose: e.target.value }))}
                      placeholder="Enter purpose/location"
                      required
                    />
                    
                    <FormField
                      label="Remarks"
                      type="textarea"
                      value={onDuty.remarks}
                      onChange={(e) => setOnDuty(prev => ({ ...prev, remarks: e.target.value }))}
                      placeholder="Enter remarks"
                      required
                    />
                    
                    <FormField
                      label="Attachment"
                      type="file"
                      onChange={(e) => setOnDuty(prev => ({ ...prev, attachment: e.target.files[0] }))}
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="submit" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </RegularizationCard>
            </div>

            {/* Remarks Entry */}
            <div className="col-12 col-md-6">
              <RegularizationCard title="Remarks Entry">
                <form onSubmit={handleRemarksSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="Remarks Title"
                      type="text"
                      value={remarksEntry.title}
                      onChange={(e) => setRemarksEntry(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter title"
                      required
                    />
                    
                    <FormField
                      label="Remarks"
                      type="textarea"
                      value={remarksEntry.remarks}
                      onChange={(e) => setRemarksEntry(prev => ({ ...prev, remarks: e.target.value }))}
                      placeholder="Enter remarks"
                      rows={4}
                      required
                    />
                    
                    <FormField
                      label="Attachment"
                      type="file"
                      onChange={(e) => setRemarksEntry(prev => ({ ...prev, attachment: e.target.files[0] }))}
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="submit" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Save Remarks
                    </button>
                  </div>
                </form>
              </RegularizationCard>
            </div>
          </div>
        </div>
      )}

      {/* Attachments & Workflow Section */}
      {activeSection === "Attachments & Workflow" && (
        <div style={containerStyle}>
          <h5 className="fw-bold mb-4" style={{ color: "#2d3e50", fontSize: "18px" }}>
            Attachments & Workflow
          </h5>
          
          <div className="row g-4">
            {/* Document Upload */}
            <div className="col-12 col-md-6">
              <RegularizationCard title="Document Upload">
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
                        Upload Supporting Documents
                      </label>
                      <div className="input-group">
                        <input
                          type="file"
                          className="form-control"
                          multiple
                          onChange={handleFileUpload}
                          style={{ fontSize: "14px", padding: "8px 12px" }}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <button
                          className="btn"
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            ...buttonStyles.outline,
                            width: "auto",
                            padding: "8px 16px",
                            borderColor: "#ced4da",
                            color: "#495057",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#e7f1ff";
                            e.currentTarget.style.borderColor = "#007bff";
                            e.currentTarget.style.color = "#007bff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderColor = "#ced4da";
                            e.currentTarget.style.color = "#495057";
                          }}
                        >
                          Browse
                        </button>
                      </div>
                      <small className="text-muted" style={{ fontSize: "12px" }}>
                        Supported formats: PDF, DOC, DOCX, JPG, PNG (Max: 10MB each)
                      </small>
                    </div>

                    <FormField
                      label="Document Type"
                      type="select"
                      options={[
                        { value: "", label: "Select Document Type" },
                        { value: "medical", label: "Medical Certificate" },
                        { value: "travel", label: "Travel Document" },
                        { value: "client", label: "Client Communication" },
                        { value: "other", label: "Other" },
                      ]}
                    />

                    <FormField
                      label="Description"
                      type="textarea"
                      placeholder="Enter document description"
                      rows={2}
                    />

                    {attachedFiles.length > 0 && (
                      <div className="mt-3">
                        <label className="form-label" style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
                          Uploaded Files ({attachedFiles.length})
                        </label>
                        <div style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #e9ecef", borderRadius: "4px", padding: "10px" }}>
                          {attachedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between align-items-center p-1 mb-1"
                              style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "4px",
                              }}
                            >
                              <span style={{ fontSize: "13px", wordBreak: "break-all" }}>{file.name}</span>
                              <button
                                type="button"
                                className="btn btn-sm"
                                onClick={() => {
                                  setAttachedFiles(prev => prev.filter((_, i) => i !== index));
                                }}
                                style={{
                                  ...buttonStyles.outline,
                                  width: "auto",
                                  padding: "2px 8px",
                                  fontSize: "12px",
                                  borderColor: "#dc3545",
                                  color: "#dc3545",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#dc3545";
                                  e.currentTarget.style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                  e.currentTarget.style.color = "#dc3545";
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button
                      type="button"
                      className="btn w-100"
                      disabled={attachedFiles.length === 0}
                      onClick={() => {
                        alert(`${attachedFiles.length} file(s) uploaded successfully!`);
                        setAttachedFiles([]);
                      }}
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                        opacity: attachedFiles.length === 0 ? 0.6 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (attachedFiles.length > 0) {
                          e.currentTarget.style.backgroundColor = "#0056b3";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (attachedFiles.length > 0) {
                          e.currentTarget.style.backgroundColor = "#007bff";
                        }
                      }}
                    >
                      {attachedFiles.length > 0 ? `Upload ${attachedFiles.length} File(s)` : "No Files Selected"}
                    </button>
                  </div>
                </div>
              </RegularizationCard>
            </div>

            {/* Approval Workflow */}
            <div className="col-12 col-md-6">
              <RegularizationCard title="Approval Workflow">
                <form onSubmit={handleApprovalSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: "14px", fontWeight: "500", color: "#495057" }}>
                        Current Status
                      </label>
                      <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "6px", border: "1px solid #e9ecef" }}>
                        <div className="mb-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <span style={{ fontSize: "14px", fontWeight: "500" }}>Employee Submission</span>
                            <span className="badge" style={{ fontSize: "12px", backgroundColor: "#28a745", color: "#fff" }}>Completed</span>
                          </div>
                          <small className="text-muted" style={{ fontSize: "12px" }}>Request & documents submitted</small>
                        </div>
                        
                        <div className="mb-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <span style={{ fontSize: "14px", fontWeight: "500" }}>Manager Validation</span>
                            <span className="badge" style={{ fontSize: "12px", backgroundColor: "#ffc107", color: "#212529" }}>Pending</span>
                          </div>
                          <small className="text-muted" style={{ fontSize: "12px" }}>Awaiting manager review</small>
                        </div>
                        
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span style={{ fontSize: "14px", fontWeight: "500" }}>HR Final Approval</span>
                            <span className="badge" style={{ fontSize: "12px", backgroundColor: "#6c757d", color: "#fff" }}>Not Started</span>
                          </div>
                          <small className="text-muted" style={{ fontSize: "12px" }}>Pending manager approval</small>
                        </div>
                      </div>
                    </div>

                    <FormField
                      label="Action"
                      type="select"
                      value={approvalAction}
                      onChange={(e) => setApprovalAction(e.target.value)}
                      options={[
                        { value: "", label: "Select Action" },
                        { value: "approve", label: "Approve" },
                        { value: "reject", label: "Reject" },
                        { value: "request_changes", label: "Request Changes" },
                      ]}
                    />
                    
                    <FormField
                      label="Remarks"
                      type="textarea"
                      value={approvalRemarks}
                      onChange={(e) => setApprovalRemarks(e.target.value)}
                      placeholder="Enter approval remarks"
                      rows={2}
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="submit" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Submit Approval
                    </button>
                  </div>
                </form>
              </RegularizationCard>
            </div>
          </div>
        </div>
      )}

      {/* Reports & Settings Section */}
      {activeSection === "Reports & Settings" && (
        <div style={containerStyle}>
          <h5 className="fw-bold mb-4" style={{ color: "#2d3e50", fontSize: "18px" }}>
            Reports & Settings
          </h5>
          
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <RegularizationCard title="Auto-Reject Rule">
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="Number of Days"
                      type="number"
                      value={autoRejectDays}
                      onChange={(e) => setAutoRejectDays(e.target.value)}
                      placeholder="Enter days"
                      min="1"
                      max="30"
                    />
                    <FormField
                      label="Request Type"
                      type="select"
                      value={autoRejectType}
                      onChange={(e) => setAutoRejectType(e.target.value)}
                      options={[
                        { value: "", label: "Select Type" },
                        { value: "missing", label: "Missing Punch" },
                        { value: "incorrect", label: "Incorrect Time" },
                        { value: "forgot", label: "Forgot Punch" },
                        { value: "wfh", label: "WFH Regularization" },
                        { value: "on_duty", label: "On-Duty" },
                      ]}
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="button" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onClick={() => {
                        if (autoRejectDays && autoRejectType) {
                          alert(`Auto-reject rule set: ${autoRejectDays} days for ${autoRejectType}`);
                          setAutoRejectDays("");
                          setAutoRejectType("");
                        } else {
                          alert("Please fill all fields");
                        }
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Set Rule
                    </button>
                  </div>
                </div>
              </RegularizationCard>
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
              <RegularizationCard title="Bulk Regularization">
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="From Date"
                      type="date"
                      value={bulkFromDate}
                      onChange={(e) => setBulkFromDate(e.target.value)}
                    />
                    <FormField
                      label="To Date"
                      type="date"
                      value={bulkToDate}
                      onChange={(e) => setBulkToDate(e.target.value)}
                    />
                    <FormField
                      label="Issue Type"
                      type="select"
                      value={bulkIssueType}
                      onChange={(e) => setBulkIssueType(e.target.value)}
                      options={[
                        { value: "", label: "Select Issue" },
                        { value: "system", label: "System Failure" },
                        { value: "device", label: "Device Malfunction" },
                        { value: "sync", label: "Sync Error" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                    <FormField
                      label="Upload File"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="button" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Process Bulk
                    </button>
                  </div>
                </div>
              </RegularizationCard>
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
              <RegularizationCard title="Request Reports">
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ flex: 1 }}>
                    <FormField
                      label="From Date"
                      type="date"
                      value={reportFromDate}
                      onChange={(e) => setReportFromDate(e.target.value)}
                    />
                    <FormField
                      label="To Date"
                      type="date"
                      value={reportToDate}
                      onChange={(e) => setReportToDate(e.target.value)}
                    />
                    <FormField
                      label="Request Type"
                      type="select"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      options={[
                        { value: "", label: "All Types" },
                        { value: "missing", label: "Missing Punch" },
                        { value: "incorrect", label: "Incorrect Time" },
                        { value: "forgot", label: "Forgot Punch" },
                        { value: "wfh", label: "WFH" },
                        { value: "on_duty", label: "On-Duty" },
                      ]}
                    />
                    <FormField
                      label="Format"
                      type="select"
                      value={reportFormat}
                      onChange={(e) => setReportFormat(e.target.value)}
                      options={[
                        { value: "pdf", label: "PDF" },
                        { value: "excel", label: "Excel" },
                        { value: "csv", label: "CSV" },
                      ]}
                    />
                  </div>
                  
                  <div style={buttonContainerStyle}>
                    <button 
                      type="button" 
                      className="btn w-100"
                      style={{
                        ...buttonStyles.primary,
                        padding: "10px 16px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              </RegularizationCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}