import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { Icon } from '@iconify/react';

// Initial/static sample forms
const initialForms = [
  {
    id: 1860,
    candidate: "Bantapalli Pradeep",
    created: "29-Sep-2025",
    email: "pradeepchowdary977@gmail.com",
    mobile: "9618181126",
    info: "View Form",
    status: "Approved",
  },
  {
    id: 1858,
    candidate: "Dasireddy Harsha Vardan Naidu",
    created: "29-Sep-2025",
    email: "harshavardhannaidu23@gmail.com",
    mobile: "8328426817",
    info: "View Form",
    status: "Approved",
  },
  {
    id: 1832,
    candidate: "Chandu Thota",
    created: "11-Sep-2025",
    email: "chandupatelthota@gmail.com",
    mobile: "9494231434",
    info: "View Form",
    status: "Approved",
  },
];

export default function OnboardingFormsTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [forms, setForms] = useState(initialForms);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const { formId } = useParams();
  const candidate = location.state?.candidate;
  const processedFormsRef = useRef(new Set()); // Track processed form IDs

  // Add new form from navigation state (FinalizeAndSendForm)
  useEffect(() => {
    if (location.state?.newForm) {
      const newForm = location.state.newForm;
      const formId = newForm.id;
      
      // Check if form already exists or has been processed
      if (!processedFormsRef.current.has(formId)) {
        setForms((prev) => {
          // Double-check if form already exists in the list
          const formExists = prev.some(f => f.id === formId);
          if (!formExists) {
            processedFormsRef.current.add(formId);
            return [newForm, ...prev];
          }
          return prev;
        });
        
        // Clear the location state to prevent re-adding on re-renders
        // Use setTimeout to avoid navigation during render
        setTimeout(() => {
          navigate(location.pathname, { replace: true, state: {} });
        }, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.newForm?.id]);

  // Handle form updates from edit mode
  useEffect(() => {
    if (location.state?.updatedForm && location.state?.formId) {
      const updatedForm = location.state.updatedForm;
      const formId = location.state.formId;
      
      setForms((prev) => {
        const formIndex = prev.findIndex(f => f.id === formId);
        if (formIndex !== -1) {
          // Update existing form
          const updatedForms = [...prev];
          updatedForms[formIndex] = updatedForm;
          return updatedForms;
        }
        return prev;
      });
      
      // Clear the location state
      setTimeout(() => {
        navigate(location.pathname, { replace: true, state: {} });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.updatedForm, location.state?.formId]);

  // Filter + search logic
  const filteredForms = forms.filter((f) => {
    const matchesStatus = filterStatus === "All" || f.status === filterStatus;
    const matchesSearch =
      f.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.mobile.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });
  const handleEdit = (formId) => {
    const form = forms.find(f => f.id === formId);
    if (form) {
      // Navigate to edit form or show edit modal
      // For now, navigate to the new form page with existing data
      navigate("/onboarding/form/new", {
        state: {
          editMode: true,
          formId: formId,
          formData: form
        }
      });
    }
  }
  
  const handleViewForm = (formId) => {
    const form = forms.find(f => f.id === formId);
    navigate("/newhire", { 
      state: { 
        formId,
        candidateName: form?.candidate || "Chandu Thota"
      } 
    });
  };

  const handleApprove = (formId) => {
    const form = forms.find(f => f.id === formId);
    if (!form) return;
    
    // Check the current status of the form
    if (form.status === "Pending" || form.status === "Sent") {
      // Update status to Approved
      setForms(forms.map(f => 
        f.id === formId 
          ? { ...f, status: "Approved" }
          : f
      ));
      alert(`Form for ${form.candidate} has been approved successfully!`);
    } else if (form.status === "Approved") {
      alert(`Form for ${form.candidate} is already approved.`);
    } else {
      // For other statuses, navigate to approval page
      navigate(`/onboarding/form/${formId}/approve`);
    }
  }
  
  const handleDelete = (formId) => {
    const form = forms.find(f => f.id === formId);
    if (!form) return;
    
    if (window.confirm(`Are you sure you want to delete the form for ${form.candidate}?`)) {
      setForms(forms.filter(f => f.id !== formId));
      alert(`Form for ${form.candidate} has been deleted successfully!`);
    }
  }

  return (
    <div className="page-content" style={{ padding: "30px 0" }}>
      <div className="container-fluid">
        {/* Breadcrumb */}
       

        {/* Header + Actions */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8, color: "#1F2937" }}>Forms</h2>
            <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 0 }}>
              Create onboarding forms for new hires. Approve or reject submitted forms.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/onboarding/form/new")}
              style={{ 
                borderRadius: 8,
                padding: "10px 20px",
                fontWeight: 500
              }}
            >
              <Icon icon="heroicons:plus" className="me-2" style={{ fontSize: 18 }} />
              Add New
            </button>
            <button 
              className="btn btn-warning"
              style={{ 
                borderRadius: 8,
                padding: "10px 20px",
                fontWeight: 500,
                color: "#fff"
              }}
            >
              Help
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-4" style={{ width: "100%", borderRadius: 12, border: "1px solid #E5E7EB" }}>
          <div
            className="card-body d-flex align-items-end flex-wrap gap-3"
            style={{ padding: "20px" }}
          >
            <div style={{ flex: "0 0 auto" }}>
              <label style={{ fontSize: 14, color: "#374151", fontWeight: 500, marginBottom: 6, display: "block" }}>
                Form Status
              </label>
              <select
                className="form-select"
                style={{ 
                  minWidth: 150,
                  borderRadius: 8,
                  border: "1px solid #D1D5DB",
                  padding: "8px 12px",
                  fontSize: 14
                }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All</option>
                <option>Sent</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
            </div>

            <div style={{ flex: "1 1 auto", minWidth: 280 }}>
              <label style={{ fontSize: 14, color: "#374151", fontWeight: 500, marginBottom: 6, display: "block" }}>
                Search
              </label>
              <input
                type="text"
                className="form-control"
                style={{ 
                  borderRadius: 8,
                  border: "1px solid #D1D5DB",
                  padding: "8px 12px",
                  fontSize: 14
                }}
                placeholder="Candidate name, mobile or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ 
                borderRadius: 8,
                padding: "8px 20px",
                fontWeight: 500,
                height:40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

              }}
              onClick={() => { }}
            >
              <Icon icon="heroicons:arrow-path" className="me-2" style={{ fontSize: 12 }} />
              Load
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ width: "100%", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
          <div className="card-body p-0">
            <div style={{ overflowX: "auto" }}>
              <table
                className="table table-hover mb-0"
                style={{ marginBottom: 0 }}
              >
                <thead style={{ background: "#FAFBFC", fontWeight: 600 }}>
                  <tr>
                    <th style={{ 
                      padding: "16px 20px", 
                      fontSize: 13, 
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "2px solid #E5E7EB"
                    }}>
                      ID
                    </th>
                    <th style={{ 
                      padding: "16px 20px", 
                      fontSize: 13, 
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "2px solid #E5E7EB"
                    }}>
                      CANDIDATE
                    </th>
                    <th style={{ 
                      padding: "16px 20px", 
                      fontSize: 13, 
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "2px solid #E5E7EB"
                    }}>
                      CONTACT DETAILS
                    </th>
                    <th style={{ 
                      padding: "16px 20px", 
                      fontSize: 13, 
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "2px solid #E5E7EB"
                    }}>
                      INFO
                    </th>
                    <th style={{ 
                      padding: "16px 20px", 
                      fontSize: 13, 
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "2px solid #E5E7EB"
                    }}>
                      STATUS
                    </th>
                    <th style={{ 
                      padding: "16px 20px", 
                      fontSize: 13, 
                      color: "#6B7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "2px solid #E5E7EB",
                      textAlign: "center"
                    }}>
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForms.map((row, idx) => (
                    <tr 
                      key={row.id} 
                      style={{ 
                        background: idx % 2 === 1 ? "#FAFBFC" : "#FFF",
                        borderBottom: "1px solid #E5E7EB"
                      }}
                    >
                      <td style={{ 
                        color: "#9CA3AF", 
                        fontWeight: 500,
                        padding: "20px",
                        fontSize: 14,
                        verticalAlign: "middle"
                      }}>
                        {row.id}
                      </td>
                      <td style={{ padding: "20px", verticalAlign: "middle" }}>
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#1F2937", marginBottom: 4 }}>
                          {row.candidate}
                        </div>
                        <div style={{ color: "#6B7280", fontSize: 13 }}>
                          Created: {row.created}
                        </div>
                      </td>
                      <td style={{ padding: "20px", verticalAlign: "middle" }}>
                        <div style={{ color: "#1F2937", fontSize: 14, marginBottom: 4 }}>
                          {row.email}
                        </div>
                        <div style={{ color: "#6B7280", fontSize: 13 }}>
                          {row.mobile}
                        </div>
                      </td>
                      <td style={{ padding: "20px", verticalAlign: "middle" }}>
                        <span
                          onClick={() => handleViewForm(row.id)}
                          className="d-inline-flex align-items-center"
                          style={{
                            color: "#3B82F6",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                            textDecoration: "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = "underline";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = "none";
                          }}
                        >
                          {row.info}
                          <Icon 
                            icon="heroicons:arrow-top-right-on-square" 
                            className="ms-1" 
                            style={{ fontSize: 14 }} 
                          />
                        </span>
                      </td>
                      <td style={{ padding: "20px", verticalAlign: "middle" }}>
                        <span
                          className="badge"
                          style={{
                            background: row.status === "Approved" ? "#10B981" :
                              row.status === "Rejected" ? "#EF4444" :
                                row.status === "Pending" ? "#F59E0B" : "#3B82F6",
                            color: "#FFF",
                            fontWeight: 500,
                            borderRadius: "20px",
                            padding: "6px 14px",
                            fontSize: 12,
                            display: "inline-block"
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td style={{ 
                        padding: "20px", 
                        verticalAlign: "middle",
                        textAlign: "center",
                        minWidth: 140
                      }}>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <button
                            className="btn text-center d-flex align-items-center justify-content-center"
                            onClick={() => handleEdit(row.id)}
                            style={{
                              background: "#3B82F6",
                              borderRadius: "50%",
                              color: "#FFF",
                              width: 36,
                              height: 36,
                              padding: 0,
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#2563EB";
                              e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#3B82F6";
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                            title="Edit"
                          >
                            <Icon icon="heroicons:pencil" style={{ fontSize: 16 }} />
                          </button>
                          <button
                            className="btn text-center d-flex align-items-center justify-content-center"
                            onClick={() => handleApprove(row.id)}
                            style={{
                              background: "#F59E0B",
                              borderRadius: "50%",
                              color: "#FFF",
                              width: 36,
                              height: 36,
                              padding: 0,
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#D97706";
                              e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#F59E0B";
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                            title="Reassign"
                          >
                            <Icon icon="heroicons:bolt" style={{ fontSize: 16 }} />
                          </button>
                          <button
                            className="btn text-center d-flex align-items-center justify-content-center"
                            onClick={() => handleDelete(row.id)}
                            style={{
                              background: "#EF4444",
                              borderRadius: "50%",
                              color: "#FFF",
                              width: 36,
                              height: 36,
                              padding: 0,
                              border: "none",
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#DC2626";
                              e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#EF4444";
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                            title="Delete"
                          >
                            <Icon icon="heroicons:trash" style={{ fontSize: 16 }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer / Pagination */}
        <div
          className="d-flex align-items-center justify-content-between mt-4"
          style={{ fontSize: 14 }}
        >
          <div style={{ color: "#10B981", fontWeight: 500 }}>
            {filteredForms.length} results found
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light"
              disabled
              style={{ 
                minWidth: 90,
                borderRadius: 8,
                padding: "8px 16px",
                border: "1px solid #D1D5DB",
                color: "#9CA3AF",
                cursor: "not-allowed"
              }}
            >
              Previous
            </button>
            <button 
              className="btn btn-light" 
              disabled 
              style={{ 
                minWidth: 70,
                borderRadius: 8,
                padding: "8px 16px",
                border: "1px solid #D1D5DB",
                color: "#9CA3AF",
                cursor: "not-allowed"
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
