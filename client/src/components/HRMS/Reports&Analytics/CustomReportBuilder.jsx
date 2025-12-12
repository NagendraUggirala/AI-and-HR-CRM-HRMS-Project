import React, { useState, useEffect } from "react";
import RecruiterDashboardLayout from "../../recruiterDashboard/RecruiterDashboardLayout";
import {
  Search,
  Download,
  Eye,
  Check,
  X,
  Plus,
  Filter,
  Users,
  Calendar,
  FileText,
  Settings,
  Share2,
  Database,
  Layout,
  BarChart3,
  Mail,
  Clock,
  Zap,
} from "lucide-react";

/* ---------------- Sidebar / User ---------------- */
const sidebarContent = (
  <nav className="space-y-1 p-3">
    <h6 className="text-uppercase text-muted mb-2 small">Report Builder</h6>
    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light active" href="#builder">Report Builder</a>
    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#templates">Saved Templates</a>
    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#scheduled">Scheduled Reports</a>
    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#shared">Shared Reports</a>

    <div className="mt-4 pt-3 border-top">
      <h6 className="text-uppercase text-muted mb-2 small">Data Sources</h6>
      <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#employee"><span className="me-2">👤</span> Employee</a>
      <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#attendance"><span className="me-2">📅</span> Attendance</a>
      <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#payroll"><span className="me-2">💰</span> Payroll</a>
      <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#leave"><span className="me-2">🏖️</span> Leave</a>
    </div>
  </nav>
);

const userInfo = {
  name: "Report Admin",
  role: "HR Analytics Manager",
  email: "report-admin@company.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ReportAdmin",
};

/* ---------------- Helpers ---------------- */
const statusBadge = (status) => {
  const map = {
    Draft: "bg-secondary-subtle text-secondary",
    Published: "bg-success-subtle text-success",
    "In Progress": "bg-info-subtle text-info",
    Scheduled: "bg-primary-subtle text-primary",
    Archived: "bg-dark-subtle text-dark",
    Error: "bg-danger-subtle text-danger",
  };
  return map[status] || "bg-light text-muted";
};

/* ---------------- Main Data ---------------- */
const reportBuilderFeaturesList = [
  { id: 1, name: "Drag-and-drop interface", category: "Builder", status: "Published", lastUpdated: "2025-11-25", icon: <Layout size={16} /> },
  { id: 2, name: "Select data sources", category: "Data", status: "Published", lastUpdated: "2025-11-24", icon: <Database size={16} /> },
  { id: 3, name: "Choose fields to include", category: "Data", status: "Published", lastUpdated: "2025-11-23", icon: <FileText size={16} /> },
  { id: 4, name: "Apply filters", category: "Filter", status: "Published", lastUpdated: "2025-11-22", icon: <Filter size={16} /> },
  { id: 5, name: "Group by dimensions", category: "Analysis", status: "In Progress", lastUpdated: "2025-11-21", icon: <BarChart3 size={16} /> },
  { id: 6, name: "Add calculations", category: "Analysis", status: "Published", lastUpdated: "2025-11-20", icon: <Zap size={16} /> },
  { id: 7, name: "Sort and order options", category: "Builder", status: "Published", lastUpdated: "2025-11-19", icon: <Settings size={16} /> },
  { id: 8, name: "Save report templates", category: "Template", status: "Published", lastUpdated: "2025-11-18", icon: <FileText size={16} /> },
  { id: 9, name: "Schedule automated generation", category: "Automation", status: "Scheduled", lastUpdated: "2025-11-17", icon: <Clock size={16} /> },
  { id: 10, name: "Email distribution list", category: "Sharing", status: "Published", lastUpdated: "2025-11-16", icon: <Mail size={16} /> },
  { id: 11, name: "Export formats", category: "Export", status: "Published", lastUpdated: "2025-11-15", icon: <Download size={16} /> },
];

const reportSharingList = [
  { id: 12, name: "Share with specific users/roles", category: "Sharing", status: "Published", lastUpdated: "2025-11-14", icon: <Users size={16} /> },
  { id: 13, name: "Public dashboard publication", category: "Sharing", status: "In Progress", lastUpdated: "2025-11-13", icon: <Share2 size={16} /> },
  { id: 14, name: "Report subscription service", category: "Subscription", status: "Published", lastUpdated: "2025-11-12", icon: <Calendar size={16} /> },
  { id: 15, name: "Embed reports in emails", category: "Sharing", status: "Draft", lastUpdated: "2025-11-11", icon: <Mail size={16} /> },
  { id: 16, name: "API access for report data", category: "API", status: "Published", lastUpdated: "2025-11-10", icon: <Database size={16} /> },
];

/* ---------------- Component ---------------- */
const CustomReportBuilder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [features, setFeatures] = useState(reportBuilderFeaturesList);
  const [sharing, setSharing] = useState(reportSharingList);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isBuilderView, setIsBuilderView] = useState(true);

  const [addReportModalOpen, setAddReportModalOpen] = useState(false);
  const [newReportData, setNewReportData] = useState({ name: "", category: "Builder", status: "Draft" });

  const perPage = 8;

  const dataSource = isBuilderView ? features : sharing;
  const getCategoryOptions = () => [...new Set(dataSource.map(item => item.category))];

  const filtered = dataSource.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(1); }, [filtered.length, totalPages]);

  const startIndex = (currentPage - 1) * perPage;
  const display = filtered.slice(startIndex, startIndex + perPage);

  const allData = [...features, ...sharing];
  const kpis = {
    total: allData.length,
    published: allData.filter((r) => r.status === "Published").length,
    inProgress: allData.filter((r) => r.status === "In Progress").length,
    scheduled: allData.filter((r) => r.status === "Scheduled").length,
  };

  const openModal = (feature) => { setSelectedFeature(feature); setModalOpen(true); };
  const handlePublish = (f) => { f.id <= 11 ? setFeatures(prev => prev.map(x => x.id === f.id ? { ...x, status: "Published" } : x)) : setSharing(prev => prev.map(x => x.id === f.id ? { ...x, status: "Published" } : x)); };
  const handleSchedule = (f) => { f.id <= 11 ? setFeatures(prev => prev.map(x => x.id === f.id ? { ...x, status: "Scheduled" } : x)) : setSharing(prev => prev.map(x => x.id === f.id ? { ...x, status: "Scheduled" } : x)); };
  const handleDelete = (f) => { f.id <= 11 ? setFeatures(prev => prev.filter(x => x.id !== f.id)) : setSharing(prev => prev.filter(x => x.id !== f.id)); setModalOpen(false); };

  const exportCSV = () => {
    const headers = ["Feature Name", "Category", "Status", "Last Updated"];
    const rows = filtered.map((r) => [r.name, r.category, r.status, r.lastUpdated]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "report_features.csv";
    link.click();
  };

  const handleAddNewReport = () => setAddReportModalOpen(true);
  const submitNewReport = () => {
    const newReport = {
      id: Date.now(),
      name: newReportData.name,
      category: newReportData.category,
      status: newReportData.status,
      lastUpdated: new Date().toISOString().split("T")[0],
      icon: <Plus size={16} />,
    };
    setFeatures([newReport, ...features]);
    setAddReportModalOpen(false);
    setNewReportData({ name: "", category: "Builder", status: "Draft" });
    setIsBuilderView(true);
    setCurrentPage(1);
  };

  const toggleView = (v) => { setIsBuilderView(v === "builder"); setCurrentPage(1); };
  useEffect(() => setCurrentPage(1), [searchTerm, statusFilter, categoryFilter, isBuilderView]);

  return (
    

      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h4 className="mb-0">Custom Report Builder</h4>
          <button className="btn btn-primary" onClick={handleAddNewReport}><Plus size={16} className="me-2" /> Add New Report</button>
        </div>

        {/* KPIs */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-sm-3"><div className="card p-3"><div>Total Features</div><h5>{kpis.total}</h5></div></div>
          <div className="col-6 col-sm-3"><div className="card p-3"><div>Published</div><h5 className="text-success">{kpis.published}</h5></div></div>
          <div className="col-6 col-sm-3"><div className="card p-3"><div>In Progress</div><h5 className="text-warning">{kpis.inProgress}</h5></div></div>
          <div className="col-6 col-sm-3"><div className="card p-3"><div>Scheduled</div><h5 className="text-primary">{kpis.scheduled}</h5></div></div>
        </div>

        {/* VIEW SWITCH */}
        <div className="card mb-3">
          <div className="card-body">
            <div className="btn-group">
              <button className={`btn ${isBuilderView ? "btn-primary" : "btn-outline-primary"}`} onClick={() => toggleView("builder")}>Report Builder Features</button>
              <button className={`btn ${!isBuilderView ? "btn-primary" : "btn-outline-primary"}`} onClick={() => toggleView("sharing")}>Report Sharing</button>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="card mb-3">
          <div className="card-body d-flex flex-wrap gap-2">
            <div className="input-group" style={{ maxWidth: 350 }}>
              <span className="input-group-text bg-white"><Search size={14} /></span>
              <input className="form-control" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <select className="form-select w-auto" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              {getCategoryOptions().map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Archived">Archived</option>
            </select>
            <button className="btn btn-dark ms-auto" onClick={exportCSV}><Download size={14} className="me-2" /> Export</button>
          </div>
        </div>

        {/* TABLE DESKTOP */}
        <div className="card desktop-table mb-3">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th></th>
                  <th>Feature Name</th>
                  <th>Category</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {display.map((item) => (
                  <tr key={item.id}>
                    <td>{item.icon}</td>
                    <td><strong>{item.name}</strong></td>
                    <td><span className="badge bg-light text-dark">{item.category}</span></td>
                    <td>{item.lastUpdated}</td>
                    <td><span className={`badge ${statusBadge(item.status)}`}>{item.status}</span></td>
                    <td className="text-center">
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" onClick={() => openModal(item)}><Eye size={14} /></button>
                        <button className="btn btn-outline-success" onClick={() => handlePublish(item)}><Check size={14} /></button>
                        <button className="btn btn-outline-warning" onClick={() => handleSchedule(item)}><Calendar size={14} /></button>
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(item)}><X size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {display.length === 0 && <tr><td colSpan="6" className="text-center text-muted py-5">No matching features.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="mobile-cards mb-3">
          <div className="row g-2">
            {filtered.map((item) => (
              <div key={item.id} className="col-12">
                <div className="card p-2 d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex gap-2 align-items-center">
                      <div>{item.icon}</div>
                      <div>
                        <div><strong>{item.name}</strong></div>
                        <small className="text-muted">{item.category} • {item.lastUpdated}</small>
                        <div><span className={`badge ${statusBadge(item.status)}`}>{item.status}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-1 flex-wrap">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => openModal(item)}><Eye size={14} /></button>
                    <button className="btn btn-sm btn-outline-success" onClick={() => handlePublish(item)}><Check size={14} /></button>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => handleSchedule(item)}><Calendar size={14} /></button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item)}><X size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="col-12 text-center text-muted py-3">No features found.</div>}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <small className="text-muted">
            Showing {filtered.length ? Math.min(startIndex + 1, filtered.length) : 0} – {filtered.length ? Math.min(startIndex + perPage, filtered.length) : 0} of {filtered.length}
          </small>
          <div className="btn-group">
            <button className="btn btn-outline-primary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
            <button className="btn btn-outline-primary" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>

        {/* FEATURE DETAILS MODAL */}
        {modalOpen && selectedFeature && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedFeature.name}</h5>
                  <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Category:</strong> {selectedFeature.category}</p>
                  <p><strong>Status:</strong> {selectedFeature.status}</p>
                  <p><strong>Last Updated:</strong> {selectedFeature.lastUpdated}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" onClick={() => handlePublish(selectedFeature)}>Publish</button>
                  <button className="btn btn-warning" onClick={() => handleSchedule(selectedFeature)}>Schedule</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(selectedFeature)}>Delete</button>
                  <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADD NEW REPORT MODAL */}
        {addReportModalOpen && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Report</h5>
                  <button type="button" className="btn-close" onClick={() => setAddReportModalOpen(false)}></button>
                </div>
                <div className="modal-body d-flex flex-column gap-3">
                  <input className="form-control" placeholder="Report Name" value={newReportData.name} onChange={(e) => setNewReportData({ ...newReportData, name: e.target.value })} />
                  <select className="form-select" value={newReportData.category} onChange={(e) => setNewReportData({ ...newReportData, category: e.target.value })}>
                    <option value="Builder">Builder</option>
                    <option value="Data">Data</option>
                    <option value="Filter">Filter</option>
                    <option value="Analysis">Analysis</option>
                    <option value="Template">Template</option>
                    <option value="Automation">Automation</option>
                    <option value="Sharing">Sharing</option>
                    <option value="Export">Export</option>
                  </select>
                  <select className="form-select" value={newReportData.status} onChange={(e) => setNewReportData({ ...newReportData, status: e.target.value })}>
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={submitNewReport}>Add Report</button>
                  <button className="btn btn-secondary" onClick={() => setAddReportModalOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    
  );
};

export default CustomReportBuilder;
