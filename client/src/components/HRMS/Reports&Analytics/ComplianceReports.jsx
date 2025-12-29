import React, { useState } from "react";
import RecruiterDashboardLayout from "../../recruiterDashboard/RecruiterDashboardLayout";
import { 
  Search, Download, Eye, Check, X, AlertTriangle, 
  FileText, Shield, UserCheck, Calendar, TrendingUp, 
  TrendingDown, Clock, FileCheck, Users, BarChart3,
  ChevronRight, Filter, Printer
} from "lucide-react";

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
  // Statutory Compliance
  { 
    id: 1, 
    name: "PF Compliance Dashboard", 
    category: "Statutory", 
    lastUpdated: "2024-01-15", 
    status: "Compliant",
    description: "Comprehensive dashboard showing PF contribution compliance, remittance status, and pending actions.",
    dueDate: "2024-01-25",
    complianceRate: 98.5,
    totalEmployees: 2200,
    compliantEmployees: 2167,
    pendingActions: 5,
    details: {
      totalContribution: "₹45,68,000",
      employerShare: "₹22,84,000",
      employeeShare: "₹22,84,000",
      remittanceStatus: "Paid",
      lastPaymentDate: "2024-01-12",
      challanNumber: "CH123456"
    }
  },
  { 
    id: 2, 
    name: "ESI Compliance Dashboard", 
    category: "Statutory", 
    lastUpdated: "2024-01-14", 
    status: "Pending",
    description: "Employee State Insurance compliance tracking with contribution details and benefits eligibility.",
    dueDate: "2024-01-21",
    complianceRate: 85.2,
    totalEmployees: 1800,
    compliantEmployees: 1534,
    pendingActions: 12,
    details: {
      totalContribution: "₹12,34,000",
      employerShare: "₹4,11,333",
      employeeShare: "₹3,08,500",
      remittanceStatus: "Pending",
      lastPaymentDate: "2023-12-15",
      benefitsEligible: 1567
    }
  },
  { 
    id: 3, 
    name: "PT Compliance Tracker", 
    category: "Statutory", 
    lastUpdated: "2024-01-15", 
    status: "Alert",
    description: "Professional Tax deduction and payment compliance by state with slab-wise tracking.",
    dueDate: "2024-01-20",
    complianceRate: 72.5,
    totalEmployees: 2200,
    compliantEmployees: 1595,
    pendingActions: 28,
    details: {
      totalPTAmount: "₹2,45,000",
      statesCovered: 8,
      overduePayments: 2,
      lastPaymentDate: "2023-12-28",
      nextDueDate: "2024-01-20"
    }
  },
  { 
    id: 4, 
    name: "TDS Compliance Status", 
    category: "Statutory", 
    lastUpdated: "2024-01-10", 
    status: "Compliant",
    description: "Tax Deducted at Source compliance with quarterly return status and certificate issuance.",
    dueDate: "2024-01-31",
    complianceRate: 99.1,
    totalEmployees: 2200,
    compliantEmployees: 2180,
    pendingActions: 2,
    details: {
      totalTDS: "₹1,25,67,000",
      quarter: "Q4 FY2023-24",
      returnsFiled: "Yes",
      form16Issued: 2180,
      pendingCertificates: 20
    }
  },
  { 
    id: 5, 
    name: "Gratuity Liability Report", 
    category: "Statutory", 
    lastUpdated: "2024-01-05", 
    status: "In Progress",
    description: "Gratuity liability calculation and provisioning status for eligible employees.",
    dueDate: "2024-03-31",
    complianceRate: 65.8,
    totalEmployees: 2200,
    compliantEmployees: 1448,
    pendingActions: 15,
    details: {
      totalLiability: "₹8,45,67,000",
      eligibleEmployees: 1450,
      provisioningStatus: "75% Complete",
      lastCalculationDate: "2024-01-05",
      nextReviewDate: "2024-04-01"
    }
  },
  { 
    id: 6, 
    name: "Bonus Act Compliance", 
    category: "Statutory", 
    lastUpdated: "2024-01-08", 
    status: "Non-Compliant",
    description: "Payment of Bonus Act compliance with eligible employee identification and payment status.",
    dueDate: "2024-02-28",
    complianceRate: 45.2,
    totalEmployees: 1800,
    compliantEmployees: 814,
    pendingActions: 42,
    details: {
      eligibleEmployees: 1800,
      bonusPaid: "₹1,23,45,000",
      pendingPayments: 986,
      lastPaymentDate: "2023-12-15",
      complianceDeadline: "2024-02-28"
    }
  },
  { 
    id: 7, 
    name: "Labour Law Compliance Checklist", 
    category: "Statutory", 
    lastUpdated: "2024-01-12", 
    status: "Compliant",
    description: "Comprehensive checklist covering all applicable labour laws and statutory requirements.",
    dueDate: "Ongoing",
    complianceRate: 94.5,
    totalEmployees: 2200,
    compliantEmployees: 2079,
    pendingActions: 8,
    details: {
      totalRequirements: 45,
      compliantItems: 42,
      pendingItems: 3,
      lastAuditDate: "2024-01-10",
      nextAuditDate: "2024-04-01"
    }
  },
  // Document Compliance
  { 
    id: 8, 
    name: "Missing Document Report", 
    category: "Document", 
    lastUpdated: "2024-01-15", 
    status: "Missing",
    description: "Report of missing employee documents required for compliance and onboarding.",
    dueDate: "2024-01-31",
    complianceRate: 87.3,
    totalEmployees: 2200,
    compliantEmployees: 1921,
    pendingActions: 279,
    details: {
      missingDocuments: 312,
      criticalMissing: 45,
      commonDocuments: ["PAN", "Aadhaar", "Educational Certificates"],
      lastUpdateDate: "2024-01-15",
      remindersSent: 245
    }
  },
  { 
    id: 9, 
    name: "Document Expiry Alerts", 
    category: "Document", 
    lastUpdated: "2024-01-15", 
    status: "Expired",
    description: "Alerts for documents nearing expiry or already expired requiring renewal.",
    dueDate: "2024-02-15",
    complianceRate: 78.5,
    totalEmployees: 2200,
    compliantEmployees: 1727,
    pendingActions: 156,
    details: {
      expiredDocuments: 89,
      expiringSoon: 156,
      renewalPending: 67,
      lastCheckDate: "2024-01-15",
      criticalExpiries: 23
    }
  },
  { 
    id: 10, 
    name: "Pending Document Approvals", 
    category: "Document", 
    lastUpdated: "2024-01-14", 
    status: "Pending",
    description: "Documents submitted by employees awaiting HR approval and verification.",
    dueDate: "2024-01-25",
    complianceRate: 82.1,
    totalEmployees: 2200,
    compliantEmployees: 1806,
    pendingActions: 125,
    details: {
      pendingApprovals: 125,
      averageProcessingTime: "3.2 days",
      oldestPending: "2024-01-05",
      lastApprovalDate: "2024-01-14",
      approvalRate: "85.5%"
    }
  },
  { 
    id: 11, 
    name: "KYC Completion Status", 
    category: "Document", 
    lastUpdated: "2024-01-12", 
    status: "Compliant",
    description: "Know Your Customer documentation completion status for all employees.",
    dueDate: "2024-01-31",
    complianceRate: 96.8,
    totalEmployees: 2200,
    compliantEmployees: 2130,
    pendingActions: 70,
    details: {
      kycCompleted: 2130,
      kycPending: 70,
      verificationStatus: "95.2% Verified",
      lastUpdateDate: "2024-01-12",
      renewalDue: 45
    }
  },
  // Policy Compliance
  { 
    id: 12, 
    name: "Policy Acknowledgment Status", 
    category: "Policy", 
    lastUpdated: "2024-01-10", 
    status: "Non-Compliant",
    description: "Employee acknowledgment status for company policies including HR, IT, and security policies.",
    dueDate: "2024-01-31",
    complianceRate: 68.5,
    totalEmployees: 2200,
    compliantEmployees: 1507,
    pendingActions: 693,
    details: {
      policiesCount: 12,
      acknowledged: 1507,
      pending: 693,
      lastPolicyUpdate: "2024-01-01",
      acknowledgmentDeadline: "2024-01-31"
    }
  },
  { 
    id: 13, 
    name: "Training Completion Status", 
    category: "Policy", 
    lastUpdated: "2024-01-08", 
    status: "In Progress",
    description: "Mandatory training completion tracking including onboarding, compliance, and skill development.",
    dueDate: "2024-02-28",
    complianceRate: 75.2,
    totalEmployees: 2200,
    compliantEmployees: 1654,
    pendingActions: 546,
    details: {
      totalTrainings: 8,
      completed: 1654,
      inProgress: 456,
      notStarted: 90,
      averageCompletionTime: "12.5 days",
      nextDeadline: "2024-02-28"
    }
  },
  { 
    id: 14, 
    name: "Code of Conduct Acceptance", 
    category: "Policy", 
    lastUpdated: "2024-01-05", 
    status: "Compliant",
    description: "Employee acceptance and acknowledgment of company code of conduct and ethics policy.",
    dueDate: "2024-01-31",
    complianceRate: 98.2,
    totalEmployees: 2200,
    compliantEmployees: 2160,
    pendingActions: 40,
    details: {
      accepted: 2160,
      pending: 40,
      acceptanceRate: "98.2%",
      lastUpdateDate: "2024-01-05",
      annualRenewal: "2024-12-31"
    }
  },
  { 
    id: 15, 
    name: "POSH Training Completion", 
    category: "Policy", 
    lastUpdated: "2024-01-03", 
    status: "Pending",
    description: "Prevention of Sexual Harassment (POSH) training completion status for all employees.",
    dueDate: "2024-03-31",
    complianceRate: 62.5,
    totalEmployees: 2200,
    compliantEmployees: 1375,
    pendingActions: 825,
    details: {
      completed: 1375,
      pending: 825,
      mandatoryTraining: "Yes",
      lastTrainingDate: "2023-12-15",
      nextScheduled: "2024-02-01",
      complianceRequired: "100%"
    }
  },
];

const ComplianceReports = () => {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [complianceData, setComplianceData] = useState(complianceDataList);
  const [activeTab, setActiveTab] = useState("all"); // all, statutory, document, policy

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const perPage = 10;

  // Filtering
  const filtered = complianceData.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(filter.toLowerCase()) || 
                         (r.description && r.description.toLowerCase().includes(filter.toLowerCase()));
    const matchesStatus = !statusFilter || r.status === statusFilter;
    const matchesCategory = !categoryFilter || r.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesTab = activeTab === "all" || r.category.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const display = filtered.slice(startIndex, startIndex + perPage);

  // KPI stats
  const overallComplianceRate = complianceData.reduce((sum, r) => sum + (r.complianceRate || 0), 0) / complianceData.length;
  const kpis = {
    total: complianceData.length,
    compliant: complianceData.filter((r) => r.status === "Compliant").length,
    pending: complianceData.filter((r) => r.status === "Pending").length,
    alerts: complianceData.filter((r) => r.status === "Alert" || r.status === "Non-Compliant" || r.status === "Expired").length,
    complianceRate: overallComplianceRate.toFixed(1),
    totalEmployees: complianceData[0]?.totalEmployees || 0,
    pendingActions: complianceData.reduce((sum, r) => sum + (r.pendingActions || 0), 0)
  };

  // Open Modal
  const openModal = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  // Approve
  const handleApprove = (report = null) => {
    const reportToUpdate = report || selectedReport;
    if (!reportToUpdate) return;
    
    setComplianceData((prev) =>
      prev.map((r) =>
        r.id === reportToUpdate.id ? { ...r, status: "Compliant" } : r
      )
    );
    if (selectedReport && selectedReport.id === reportToUpdate.id) {
      setSelectedReport((prev) => ({ ...prev, status: "Compliant" }));
    }
  };

  // Reject
  const handleReject = () => {
    if (!selectedReport) return;
    setComplianceData((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id ? { ...r, status: "Non-Compliant" } : r
      )
    );
    setSelectedReport((prev) => ({ ...prev, status: "Non-Compliant" }));
  };

  const exportCSV = () => {
    const headers = ["Report Name", "Category", "Last Updated", "Status", "Compliance Rate", "Due Date", "Total Employees", "Compliant Employees", "Pending Actions"];
    const rows = filtered.map((r) => [
      r.name, 
      r.category, 
      r.lastUpdated, 
      r.status,
      r.complianceRate !== undefined ? `${r.complianceRate}%` : '-',
      r.dueDate || '-',
      r.totalEmployees || '-',
      r.compliantEmployees || '-',
      r.pendingActions || '-'
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `compliance_reports_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <div className="container-fluid p-4">
      {/* Page Header */}
      <div className="mb-4">
        <h4 className="mb-2">Compliance Reports & Dashboard</h4>
        <p className="text-muted mb-0">Comprehensive compliance monitoring and reporting dashboard</p>
      </div>

      {/* KPI CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <div className="card border shadow-none">
            <div className="card-body">
              <div className="small text-muted mb-1">Total Reports</div>
              <div className="h5 mb-0">{kpis.total}</div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border shadow-none">
            <div className="card-body">
              <div className="small text-muted mb-1">Compliant</div>
              <div className="h5 mb-0 text-success">{kpis.compliant}</div>
              <small className="text-muted">{((kpis.compliant/kpis.total)*100).toFixed(1)}%</small>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border shadow-none">
            <div className="card-body">
              <div className="small text-muted mb-1">Pending</div>
              <div className="h5 mb-0 text-warning">{kpis.pending}</div>
              <small className="text-muted">Actions: {kpis.pendingActions}</small>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border shadow-none">
            <div className="card-body">
              <div className="small text-muted mb-1">Alerts</div>
              <div className="h5 mb-0 text-danger">{kpis.alerts}</div>
              <small className="text-muted">Requires attention</small>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border shadow-none bg-primary bg-opacity-10">
            <div className="card-body">
              <div className="small text-muted mb-1">Compliance Rate</div>
              <div className="h5 mb-0 text-primary">{kpis.complianceRate}%</div>
              <small className="text-muted">Overall</small>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border shadow-none">
            <div className="card-body">
              <div className="small text-muted mb-1">Total Employees</div>
              <div className="h5 mb-0">{kpis.totalEmployees.toLocaleString()}</div>
              <small className="text-muted">In scope</small>
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="card mb-4 border shadow-none">
        <div className="card-body">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <BarChart3 className="me-2" size={16} />
                All Reports
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'statutory' ? 'active' : ''}`}
                onClick={() => setActiveTab('statutory')}
              >
                <Shield className="me-2" size={16} />
                Statutory Compliance
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'document' ? 'active' : ''}`}
                onClick={() => setActiveTab('document')}
              >
                <FileText className="me-2" size={16} />
                Document Compliance
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'policy' ? 'active' : ''}`}
                onClick={() => setActiveTab('policy')}
              >
                <UserCheck className="me-2" size={16} />
                Policy Compliance
              </button>
            </li>
          </ul>
        </div>
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

            <div className="ms-auto d-flex gap-2">
              <button className="btn btn-dark btn-sm" onClick={exportCSV}>
                <Download size={14} className="me-1" /> Export CSV
              </button>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}>
                <Printer size={14} className="me-1" /> Print
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card border shadow-none">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Report Name</th>
                  <th>Category</th>
                  <th>Last Updated</th>
                  <th className="text-center">Compliance Rate</th>
                  <th className="text-center">Due Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {display.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div><strong>{r.name}</strong></div>
                      {r.description && <small className="text-muted">{r.description.substring(0, 60)}...</small>}
                    </td>
                    <td>
                      <span className={`badge ${
                        r.category === 'Statutory' ? 'bg-warning-subtle text-warning' :
                        r.category === 'Document' ? 'bg-info-subtle text-info' :
                        'bg-success-subtle text-success'
                      }`}>
                        {r.category}
                      </span>
                    </td>
                    <td>{r.lastUpdated}</td>
                    <td className="text-center">
                      {r.complianceRate !== undefined ? (
                        <div>
                          <div className="fw-bold text-primary">{r.complianceRate}%</div>
                          <div className="progress" style={{height: '6px', width: '60px', margin: '0 auto'}}>
                            <div 
                              className={`progress-bar ${
                                r.complianceRate >= 90 ? 'bg-success' :
                                r.complianceRate >= 70 ? 'bg-warning' : 'bg-danger'
                              }`}
                              style={{width: `${r.complianceRate}%`}}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td className="text-center">
                      {r.dueDate ? (
                        <div>
                          <small>{r.dueDate}</small>
                          {new Date(r.dueDate) < new Date() && (
                            <div><small className="text-danger">Overdue</small></div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${statusBadge(r.status)}`}>{r.status}</span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <button 
                          className="btn btn-sm btn-light" 
                          onClick={() => openModal(r)}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="btn btn-sm btn-success" 
                          onClick={() => handleApprove(r)}
                          title="Mark Compliant"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {display.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
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
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} onClick={() => setModalOpen(false)}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Eye className="me-2" size={18} />
                  {selectedReport.name}
                </h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-muted small mb-1">Category</label>
                      <div>
                        <span className={`badge ${
                          selectedReport.category === 'Statutory' ? 'bg-warning-subtle text-warning' :
                          selectedReport.category === 'Document' ? 'bg-info-subtle text-info' :
                          'bg-success-subtle text-success'
                        }`}>
                          {selectedReport.category}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted small mb-1">Status</label>
                      <div>
                        <span className={`badge ${statusBadge(selectedReport.status)}`}>
                          {selectedReport.status}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted small mb-1">Last Updated</label>
                      <div className="fw-medium">{selectedReport.lastUpdated}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {selectedReport.dueDate && (
                      <div className="mb-3">
                        <label className="form-label text-muted small mb-1">Due Date</label>
                        <div className="fw-medium">
                          {selectedReport.dueDate}
                          {new Date(selectedReport.dueDate) < new Date() && (
                            <span className="badge bg-danger ms-2">Overdue</span>
                          )}
                        </div>
                      </div>
                    )}
                    {selectedReport.complianceRate !== undefined && (
                      <div className="mb-3">
                        <label className="form-label text-muted small mb-1">Compliance Rate</label>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="fw-bold text-primary fs-5">{selectedReport.complianceRate}%</div>
                            <div className="flex-grow-1">
                              <div className="progress" style={{height: '20px'}}>
                                <div 
                                  className={`progress-bar ${
                                    selectedReport.complianceRate >= 90 ? 'bg-success' :
                                    selectedReport.complianceRate >= 70 ? 'bg-warning' : 'bg-danger'
                                  }`}
                                  style={{width: `${selectedReport.complianceRate}%`}}
                                >
                                  {selectedReport.complianceRate}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedReport.totalEmployees && (
                      <div className="mb-3">
                        <label className="form-label text-muted small mb-1">Total Employees</label>
                        <div className="fw-medium">{selectedReport.totalEmployees.toLocaleString()}</div>
                      </div>
                    )}
                    {selectedReport.pendingActions !== undefined && (
                      <div className="mb-3">
                        <label className="form-label text-muted small mb-1">Pending Actions</label>
                        <div className="fw-medium text-warning">{selectedReport.pendingActions}</div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedReport.description && (
                  <div className="mb-4">
                    <label className="form-label text-muted small mb-2">Description</label>
                    <div className="border rounded p-3 bg-light">
                      {selectedReport.description}
                    </div>
                  </div>
                )}

                {selectedReport.details && (
                  <div className="mb-4">
                    <label className="form-label text-muted small mb-2">Details</label>
                    <div className="border rounded p-3">
                      <div className="row g-3">
                        {Object.entries(selectedReport.details).map(([key, value]) => (
                          <div key={key} className="col-md-6">
                            <div className="small text-muted">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                            <div className="fw-medium">{String(value)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedReport.compliantEmployees !== undefined && (
                  <div className="mb-4">
                    <label className="form-label text-muted small mb-2">Compliance Summary</label>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="card border">
                          <div className="card-body text-center">
                            <div className="h4 text-success mb-1">{selectedReport.compliantEmployees.toLocaleString()}</div>
                            <div className="small text-muted">Compliant</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border">
                          <div className="card-body text-center">
                            <div className="h4 text-warning mb-1">
                              {(selectedReport.totalEmployees - selectedReport.compliantEmployees).toLocaleString()}
                            </div>
                            <div className="small text-muted">Non-Compliant</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border">
                          <div className="card-body text-center">
                            <div className="h4 text-primary mb-1">{selectedReport.totalEmployees.toLocaleString()}</div>
                            <div className="small text-muted">Total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Close
                </button>
                <button className="btn btn-success" onClick={() => handleApprove()}>
                  <Check className="me-2" size={16} />
                  Mark Compliant
                </button>
                {selectedReport.status !== "Non-Compliant" && (
                  <button className="btn btn-danger" onClick={handleReject}>
                    <X className="me-2" size={16} />
                    Mark Non-Compliant
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
