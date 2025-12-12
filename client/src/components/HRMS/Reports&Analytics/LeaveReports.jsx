import React, { useState, useEffect } from "react";
import RecruiterDashboardLayout from "../../recruiterDashboard/RecruiterDashboardLayout";
import { Search, Download, Printer, Eye, Check, X, Trash2 } from "lucide-react";

/* -----------------------------------------------
   SIDEBAR CONTENT
------------------------------------------------ */
const sidebarContent = (
  <nav className="space-y-1 p-3">
    <h6 className="text-uppercase text-muted mb-2 small">Leave Reports</h6>

    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#balance">
      <i className="ri-dashboard-line me-2"></i> Leave Balance Reports
    </a>

    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#utilization">
      <i className="ri-bar-chart-line me-2"></i> Leave Utilization Reports
    </a>

    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#approvals">
      <i className="ri-file-chart-line me-2"></i> Leave Approval Reports
    </a>
  </nav>
);

/* -----------------------------------------------
   USER INFO
------------------------------------------------ */
const userInfo = {
  name: "Leave Admin",
  role: "HR Leave Manager",
  email: "leave-admin@company.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeaveAdmin",
};

/* -----------------------------------------------
   SAMPLE DATA
------------------------------------------------ */
const initialLeaves = [
  {
    id: 1,
    employee: "Priya Sharma",
    department: "Engineering",
    leaveType: "Casual Leave",
    fromDate: "2025-11-20",
    toDate: "2025-11-22",
    appliedOn: "2025-11-15",
    status: "Pending",
    reason: "Family function",
  },
  {
    id: 2,
    employee: "Vikas Rao",
    department: "QA",
    leaveType: "Sick Leave",
    fromDate: "2025-10-05",
    toDate: "2025-10-06",
    appliedOn: "2025-10-01",
    status: "Approved",
    reason: "Fever",
  },
  {
    id: 3,
    employee: "Sneha Reddy",
    department: "Design",
    leaveType: "Casual Leave",
    fromDate: "2025-09-12",
    toDate: "2025-09-12",
    appliedOn: "2025-09-10",
    status: "Rejected",
    reason: "Short notice",
  },
  {
    id: 4,
    employee: "Arjun Singh",
    department: "Engineering",
    leaveType: "Sick Leave",
    fromDate: "2025-08-01",
    toDate: "2025-08-03",
    appliedOn: "2025-07-28",
    status: "Approved",
    reason: "Viral fever",
  },
  {
    id: 5,
    employee: "Neha Gupta",
    department: "HR",
    leaveType: "Casual Leave",
    fromDate: "2025-11-18",
    toDate: "2025-11-18",
    appliedOn: "2025-11-16",
    status: "Pending",
    reason: "Personal work",
  },
  {
    id: 6,
    employee: "Karthik Kumar",
    department: "Support",
    leaveType: "Earned Leave",
    fromDate: "2025-07-10",
    toDate: "2025-07-15",
    appliedOn: "2025-07-01",
    status: "Approved",
    reason: "Vacation trip",
  },
  {
    id: 7,
    employee: "Meera Joshi",
    department: "Finance",
    leaveType: "Sick Leave",
    fromDate: "2025-09-20",
    toDate: "2025-09-21",
    appliedOn: "2025-09-19",
    status: "Pending",
    reason: "Migraine",
  },
  {
    id: 8,
    employee: "Rohit Verma",
    department: "Engineering",
    leaveType: "Casual Leave",
    fromDate: "2025-06-05",
    toDate: "2025-06-06",
    appliedOn: "2025-06-01",
    status: "Approved",
    reason: "Travel",
  },
  {
    id: 9,
    employee: "Ananya Patel",
    department: "Design",
    leaveType: "Earned Leave",
    fromDate: "2025-12-20",
    toDate: "2025-12-25",
    appliedOn: "2025-12-01",
    status: "Pending",
    reason: "Holiday vacation",
  },
  {
    id: 10,
    employee: "Suresh Babu",
    department: "Support",
    leaveType: "Paternity Leave",
    fromDate: "2025-10-10",
    toDate: "2025-10-20",
    appliedOn: "2025-10-01",
    status: "Approved",
    reason: "New baby arrival",
  },
  {
    id: 11,
    employee: "Divya Sharma",
    department: "HR",
    leaveType: "Maternity Leave",
    fromDate: "2025-05-01",
    toDate: "2025-08-01",
    appliedOn: "2025-04-01",
    status: "Approved",
    reason: "Maternity",
  },
  {
    id: 12,
    employee: "Harsha Nair",
    department: "QA",
    leaveType: "Casual Leave",
    fromDate: "2025-09-14",
    toDate: "2025-09-14",
    appliedOn: "2025-09-13",
    status: "Rejected",
    reason: "Urgency not justified",
  },
  {
    id: 13,
    employee: "Vinay Kumar",
    department: "Engineering",
    leaveType: "Sick Leave",
    fromDate: "2025-04-10",
    toDate: "2025-04-12",
    appliedOn: "2025-04-08",
    status: "Approved",
    reason: "Cold & fever",
  },
  {
    id: 14,
    employee: "Ayesha Khan",
    department: "Finance",
    leaveType: "Casual Leave",
    fromDate: "2025-07-02",
    toDate: "2025-07-02",
    appliedOn: "2025-06-30",
    status: "Pending",
    reason: "Bank work",
  },
  {
    id: 15,
    employee: "Nikhil Sharma",
    department: "Support",
    leaveType: "Earned Leave",
    fromDate: "2025-03-15",
    toDate: "2025-03-20",
    appliedOn: "2025-03-01",
    status: "Approved",
    reason: "Family function",
  },
];

/* -----------------------------------------------
   UTILITY FUNCTIONS
------------------------------------------------ */
const parseDate = (s) => (s ? new Date(s) : null);

const diffDays = (from, to) => {
  const f = parseDate(from);
  const t = parseDate(to);
  if (!f || !t) return 0;
  return Math.round((t - f) / (1000 * 60 * 60 * 24)) + 1;
};

const statusBadge = (status) => {
  const map = {
    Pending: "bg-warning-subtle text-warning",
    Approved: "bg-success-subtle text-success",
    Rejected: "bg-danger-subtle text-danger",
  };
  return map[status] || "bg-secondary-subtle text-secondary";
};

/* -----------------------------------------------
   MAIN COMPONENT
------------------------------------------------ */
const LeaveReports = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  const [selected, setSelected] = useState([]);
  const [modalLeave, setModalLeave] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  /* -------- FILTERING -------- */
  const filtered = leaves.filter((l) => {
    const matchesSearch =
      l.employee.toLowerCase().includes(filter.toLowerCase()) ||
      l.department.toLowerCase().includes(filter.toLowerCase()) ||
      l.leaveType.toLowerCase().includes(filter.toLowerCase());

    const matchesType = !typeFilter || l.leaveType === typeFilter;
    const matchesStatus = !statusFilter || l.status === statusFilter;
    const matchesDept = !deptFilter || l.department === deptFilter;

    return matchesSearch && matchesType && matchesStatus && matchesDept;
  });

  /* -------- PAGINATION -------- */
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const display = filtered.slice(start, start + perPage);

  /* -------- KPIs -------- */
  const kpis = {
    total: leaves.length,
    pending: leaves.filter((l) => l.status === "Pending").length,
    approved: leaves.filter((l) => l.status === "Approved").length,
    rejected: leaves.filter((l) => l.status === "Rejected").length,
  };

  /* -----------------------------------------
     ACTIONS: APPROVE / REJECT / DELETE
  ----------------------------------------- */
  const updateStatus = (id, newStatus) => {
    setLeaves((prev) =>
      prev.map((lv) =>
        lv.id === id ? { ...lv, status: newStatus } : lv
      )
    );
    setModalLeave(null);
  };

  const bulkAction = (action) => {
    setLeaves((prev) =>
      prev.map((lv) =>
        selected.includes(lv.id) ? { ...lv, status: action } : lv
      )
    );
    setSelected([]);
  };

  const bulkDelete = () => {
    setLeaves((prev) => prev.filter((l) => !selected.includes(l.id)));
    setSelected([]);
  };

  /* -------- EXPORT CSV -------- */
  const exportCSV = () => {
    const rows = [
      ["Employee", "Department", "Leave Type", "From", "To", "Status"],
      ...filtered.map((l) => [
        l.employee,
        l.department,
        l.leaveType,
        l.fromDate,
        l.toDate,
        l.status,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leave-reports.csv";
    a.click();
  };

  return (
    
      <div className="container-fluid p-4">

        {/* ----------------- TITLE ----------------- */}
        <h4 className="mb-3">Leave Reports</h4>

        {/* ----------------- KPIs ----------------- */}
        <div className="row g-3 mb-4">
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Total Leaves</div><div className="h5">{kpis.total}</div></div></div>
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Pending</div><div className="h5 text-warning">{kpis.pending}</div></div></div>
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Approved</div><div className="h5 text-success">{kpis.approved}</div></div></div>
          <div className="col-sm-3"><div className="card p-3"><div className="small text-muted">Rejected</div><div className="h5 text-danger">{kpis.rejected}</div></div></div>
        </div>

        {/* ----------------- FILTER BAR ----------------- */}
        <div className="card mb-3">
          <div className="card-body d-flex flex-wrap gap-2 align-items-center">

            {/* Search */}
            <div className="input-group" style={{ maxWidth: 350 }}>
              <span className="input-group-text bg-white border-end-0"><Search size={14} /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search employee or leave type..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            {/* Filters */}
            <select className="form-select w-auto" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Leave Types</option>
              {["Casual Leave", "Sick Leave", "Earned Leave", "Paternity Leave", "Maternity Leave"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select className="form-select w-auto" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="">All Departments</option>
              {[...new Set(leaves.map((l) => l.department))].map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Export + Print */}
            <div className="ms-auto d-flex gap-2">
              <button className="btn btn-dark btn-sm" onClick={exportCSV}><Download size={14} className="me-1" />Export</button>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}><Printer size={14} /></button>
            </div>
          </div>
        </div>

        {/* ----------------- BULK ACTIONS ----------------- */}
        {selected.length > 0 && (
          <div className="alert alert-info d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <span><strong>{selected.length}</strong> selected</span>

              <button className="btn btn-success btn-sm" onClick={() => bulkAction("Approved")}>
                <Check size={14} className="me-1" /> Approve
              </button>

              <button className="btn btn-warning btn-sm" onClick={() => bulkAction("Rejected")}>
                <X size={14} className="me-1" /> Reject
              </button>

              <button className="btn btn-danger btn-sm" onClick={bulkDelete}>
                <Trash2 size={14} className="me-1" /> Delete
              </button>
            </div>

            <button className="btn btn-link p-0" onClick={() => setSelected([])}>Clear</button>
          </div>
        )}

        {/* ----------------- TABLE ----------------- */}
        <div className="card mb-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th><input type="checkbox"
                    checked={selected.length === display.length && display.length > 0}
                    onChange={(e) =>
                      setSelected(e.target.checked ? display.map((d) => d.id) : [])
                    }
                  /></th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Leave Type</th>
                  <th className="text-center">From — To</th>
                  <th className="text-center">Days</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {display.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(l.id)}
                        onChange={() =>
                          setSelected((prev) =>
                            prev.includes(l.id)
                              ? prev.filter((id) => id !== l.id)
                              : [...prev, l.id]
                          )
                        }
                      />
                    </td>

                    <td><strong>{l.employee}</strong></td>
                    <td>{l.department}</td>
                    <td>{l.leaveType}</td>

                    <td className="text-center">
                      {l.fromDate} → {l.toDate}
                    </td>

                    <td className="text-center">{diffDays(l.fromDate, l.toDate)}</td>

                    <td className="text-center">
                      <span className={`badge ${statusBadge(l.status)}`}>{l.status}</span>
                    </td>

                    <td className="text-center">
                      <button className="btn btn-sm btn-light" onClick={() => setModalLeave(l)}>
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {display.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No leave records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ----------------- PAGINATION ----------------- */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <small className="text-muted">
            Showing <strong>{start + 1}</strong> – <strong>{Math.min(start + perPage, filtered.length)}</strong> of <strong>{filtered.length}</strong>
          </small>

          <div className="btn-group">
            <button className="btn btn-outline-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "btn btn-primary" : "btn btn-outline-secondary"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button className="btn btn-outline-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
          </div>
        </div>

        {/* ----------------- MODAL (FULL DETAILS) ----------------- */}
        {modalLeave && (
          <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Leave Details</h5>
                  <button type="button" className="btn-close" onClick={() => setModalLeave(null)}></button>
                </div>

                <div className="modal-body">
                  <p><strong>Employee:</strong> {modalLeave.employee}</p>
                  <p><strong>Department:</strong> {modalLeave.department}</p>
                  <p><strong>Leave Type:</strong> {modalLeave.leaveType}</p>
                  <p><strong>Applied On:</strong> {modalLeave.appliedOn}</p>

                  <p><strong>Period:</strong>  
                    <br />{modalLeave.fromDate} → {modalLeave.toDate}
                    <br /><strong>Days:</strong> {diffDays(modalLeave.fromDate, modalLeave.toDate)}
                  </p>

                  <p><strong>Reason:</strong> {modalLeave.reason}</p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${statusBadge(modalLeave.status)}`}>
                      {modalLeave.status}
                    </span>
                  </p>
                </div>

                <div className="modal-footer d-flex justify-content-between">

                  {/* Status Update Buttons */}
                  <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={() => updateStatus(modalLeave.id, "Approved")}>
                      <Check size={16} className="me-1" /> Approve
                    </button>

                    <button className="btn btn-warning" onClick={() => updateStatus(modalLeave.id, "Rejected")}>
                      <X size={16} className="me-1" /> Reject
                    </button>
                  </div>

                  <button className="btn btn-secondary" onClick={() => setModalLeave(null)}>
                    Close
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
  
  );
};

export default LeaveReports;
