import React, { useState } from "react";
import RecruiterDashboardLayout from "../../recruiterDashboard/RecruiterDashboardLayout";
import { Search, Download, Eye, Check, X, AlertTriangle } from "lucide-react";

const sidebarContent = (
  <nav className="space-y-1 p-3">
    <h6 className="text-uppercase text-muted mb-2 small">Compliance Reports</h6>
    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#statutory">Statutory Compliance</a>
    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#document">Document Compliance</a>
    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#policy">Policy Compliance</a>
  </nav>
);

const userInfo = {
  name: "Compliance Admin",
  role: "HR Compliance Manager",
  email: "compliance-admin@company.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ComplianceAdmin",
};

const statusBadge = (status) => {
  const map = {
    Pending: "bg-warning-subtle text-warning",
    Compliant: "bg-success-subtle text-success",
    "Non-Compliant": "bg-danger-subtle text-danger",
    Missing: "bg-secondary-subtle text-secondary",
    Expired: "bg-dark-subtle text-dark",
    Alert: "bg-danger-subtle text-danger-emphasis",
    "In Progress": "bg-info-subtle text-info",
  };
  return map[status] || "bg-light text-muted";
};

const complianceDataList = [
  { id: 1, name: "PF compliance dashboard", category: "Statutory", lastUpdated: "2025-10-10", status: "Compliant" },
  { id: 2, name: "ESI compliance dashboard", category: "Statutory", lastUpdated: "2025-09-05", status: "Pending" },
  { id: 3, name: "PT compliance tracker", category: "Statutory", lastUpdated: "2025-11-01", status: "Alert" },
  { id: 4, name: "TDS compliance status", category: "Statutory", lastUpdated: "2025-08-25", status: "Compliant" },
  { id: 5, name: "Gratuity liability report", category: "Statutory", lastUpdated: "2025-07-18", status: "In Progress" },
  { id: 6, name: "Bonus Act compliance", category: "Statutory", lastUpdated: "2025-09-01", status: "Non-Compliant" },
  { id: 7, name: "Labour law compliance checklist", category: "Statutory", lastUpdated: "2025-11-20", status: "Compliant" },
  { id: 8, name: "Missing document report", category: "Document", lastUpdated: "2025-11-22", status: "Missing" },
  { id: 9, name: "Document expiry alerts", category: "Document", lastUpdated: "2025-10-14", status: "Expired" },
  { id: 10, name: "Pending document approvals", category: "Document", lastUpdated: "2025-11-18", status: "Pending" },
  { id: 11, name: "KYC completion status", category: "Document", lastUpdated: "2025-11-10", status: "Compliant" },
  { id: 12, name: "Policy acknowledgment status", category: "Policy", lastUpdated: "2025-11-02", status: "Non-Compliant" },
  { id: 13, name: "Training completion status", category: "Policy", lastUpdated: "2025-09-28", status: "In Progress" },
  { id: 14, name: "Code of conduct acceptance", category: "Policy", lastUpdated: "2025-10-15", status: "Compliant" },
  { id: 15, name: "POSH training completion", category: "Policy", lastUpdated: "2025-09-09", status: "Pending" },
];

const ComplianceReports = () => {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [complianceData, setComplianceData] = useState(complianceDataList);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const perPage = 10;

  // Filtering
  const filtered = complianceData.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = !statusFilter || r.status === statusFilter;
    const matchesCategory = !categoryFilter || r.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const display = filtered.slice(startIndex, startIndex + perPage);

  // KPI stats
  const kpis = {
    total: complianceData.length,
    compliant: complianceData.filter((r) => r.status === "Compliant").length,
    pending: complianceData.filter((r) => r.status === "Pending").length,
    alerts: complianceData.filter((r) => r.status === "Alert").length,
  };

  // Open Modal
  const openModal = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  // Approve
  const handleApprove = () => {
    setComplianceData((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id ? { ...r, status: "Compliant" } : r
      )
    );
    setSelectedReport((prev) => ({ ...prev, status: "Compliant" }));
  };

  // Reject
  const handleReject = () => {
    setComplianceData((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id ? { ...r, status: "Non-Compliant" } : r
      )
    );
    setSelectedReport((prev) => ({ ...prev, status: "Non-Compliant" }));
  };

  const exportCSV = () => {
    const headers = ["Report Name", "Category", "Last Updated", "Status"];
    const rows = filtered.map((r) => [r.name, r.category, r.lastUpdated, r.status]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "compliance_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      sidebarContent={sidebarContent}
      userInfo={userInfo}
      appName="Compliance Reports"
    >
      <div className="container-fluid p-4">
        <h4 className="mb-3">Compliance Reports</h4>

        {/* KPI CARDS */}
        <div className="row g-3 mb-4">
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Total Reports</div><div className="h5">{kpis.total}</div></div></div>
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Compliant</div><div className="h5 text-success">{kpis.compliant}</div></div></div>
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Pending</div><div className="h5 text-warning">{kpis.pending}</div></div></div>
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Alerts</div><div className="h5 text-danger">{kpis.alerts}</div></div></div>
        </div>

        {/* FILTERS */}
        <div className="card mb-3">
          <div className="card-body d-flex flex-wrap gap-2">
            <div className="input-group" style={{ maxWidth: 350 }}>
              <span className="input-group-text bg-white border-end-0"><Search size={14} /></span>
              <input type="text" className="form-control" placeholder="Search report..." value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }} />
            </div>

            <select className="form-select w-auto" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Statutory">Statutory</option>
              <option value="Document">Document</option>
              <option value="Policy">Policy</option>
            </select>

            <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="Expired">Expired</option>
              <option value="Missing">Missing</option>
              <option value="Alert">Alert</option>
              <option value="In Progress">In Progress</option>
            </select>

            <div className="ms-auto">
              <button className="btn btn-dark btn-sm me-2" onClick={exportCSV}>
                <Download size={14} className="me-1" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Report Name</th>
                  <th>Category</th>
                  <th>Last Updated</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {display.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.name}</strong></td>
                    <td>{r.category}</td>
                    <td>{r.lastUpdated}</td>
                    <td className="text-center">
                      <span className={`badge ${statusBadge(r.status)}`}>{r.status}</span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-light me-2" onClick={() => openModal(r)}>
                        <Eye size={14} />
                      </button>
                      <button className="btn btn-sm btn-success me-2" onClick={() => { openModal(r); }}>
                        <Check size={14} />
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => { openModal(r); }}>
                        <X size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {display.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No compliance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="d-flex justify-content-between my-4">
          <small className="text-muted">
            Showing <strong>{startIndex + 1}</strong> – <strong>{Math.min(startIndex + perPage, filtered.length)}</strong> of <strong>{filtered.length}</strong>
          </small>

          <div className="btn-group">
            <button className="btn btn-outline-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button key={idx} className={currentPage === idx + 1 ? "btn btn-primary" : "btn btn-outline-secondary"} onClick={() => setCurrentPage(idx + 1)}>
                {idx + 1}
              </button>
            ))}

            <button className="btn btn-outline-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && selectedReport && (
        <div className="modal-backdrop" style={backdropStyle} onClick={() => setModalOpen(false)}>
          <div className="modal-content-custom" style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h5 className="mb-3">Report Details</h5>
            <p><strong>Name:</strong> {selectedReport.name}</p>
            <p><strong>Category:</strong> {selectedReport.category}</p>
            <p><strong>Last Updated:</strong> {selectedReport.lastUpdated}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${statusBadge(selectedReport.status)}`}>
                {selectedReport.status}
              </span>
            </p>

            <div className="d-flex justify-content-end mt-4 gap-2">
              <button className="btn btn-success" onClick={handleApprove}>
                Mark Compliant
              </button>
              <button className="btn btn-danger" onClick={handleReject}>
                Mark Non-Compliant
              </button>
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/************ MODAL STYLES **************/
const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  width: "420px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

export default ComplianceReports;
