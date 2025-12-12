import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Icon as Iconify } from "@iconify/react/dist/iconify.js";

const Reimbursements = () => {
  const [activeTab, setActiveTab] = useState("master");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [reimbursements, setReimbursements] = useState([
    { id: 1, name: "Medical Reimbursement", limit: 20000, taxable: false, frequency: "Yearly" },
    { id: 2, name: "Telephone / Mobile Reimbursement", limit: 10000, taxable: true, frequency: "Monthly" },
    { id: 3, name: "Fuel and Conveyance Reimbursement", limit: 15000, taxable: true, frequency: "Monthly" },
    { id: 4, name: "Travel Expense Reimbursement", limit: 30000, taxable: false, frequency: "Ad-hoc" },
    { id: 5, name: "LTA - Leave Travel Allowance", limit: 50000, taxable: false, frequency: "Yearly" },
    { id: 6, name: "Books and Periodicals", limit: 5000, taxable: false, frequency: "Monthly" },
    { id: 7, name: "Uniform and Laundry", limit: 10000, taxable: false, frequency: "Quarterly" },
    { id: 8, name: "Other Miscellaneous", limit: 15000, taxable: true, frequency: "Ad-hoc" }
  ]);

  const [claims, setClaims] = useState([
    {
      id: 1,
      employee: "Swetha",
      employeeId: "EMP001",
      type: "Medical Reimbursement",
      amount: 8000,
      date: "2024-03-15",
      status: "Approved",
      file: true,
      description: "Hospital bill for medical treatment"
    },
    {
      id: 2,
      employee: "Ravi",
      employeeId: "EMP002",
      type: "Fuel and Conveyance Reimbursement",
      amount: 2500,
      date: "2024-04-01",
      status: "Pending",
      file: true,
      description: "Fuel expenses for client visit"
    },
    {
      id: 3,
      employee: "Priya Sharma",
      employeeId: "EMP003",
      type: "Travel Expense Reimbursement",
      amount: 12500,
      date: "2024-04-10",
      status: "Approved",
      file: true,
      description: "Flight tickets for conference"
    },
    {
      id: 4,
      employee: "Amit Kumar",
      employeeId: "EMP004",
      type: "Telephone / Mobile Reimbursement",
      amount: 1800,
      date: "2024-04-12",
      status: "Rejected",
      file: false,
      description: "Monthly mobile bill"
    },
    {
      id: 5,
      employee: "Neha Gupta",
      employeeId: "EMP005",
      type: "Books and Periodicals",
      amount: 3500,
      date: "2024-04-05",
      status: "Pending",
      file: true,
      description: "Technical books purchase"
    },
    {
      id: 6,
      employee: "Raj Patel",
      employeeId: "EMP006",
      type: "Fuel and Conveyance Reimbursement",
      amount: 3200,
      date: "2024-04-08",
      status: "Approved",
      file: true,
      description: "Conveyance for field work"
    }
  ]);

  const [newClaim, setNewClaim] = useState({
    employee: "",
    employeeId: "",
    type: "",
    amount: "",
    frequency: "Monthly",
    receipt: null,
    description: ""
  });

  const filteredClaims = claims.filter(claim =>
    claim.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateClaim = (e) => {
    const { name, value, files } = e.target;
    setNewClaim({ ...newClaim, [name]: files ? files[0] : value });
  };

  const submitClaim = (e) => {
    e.preventDefault();
    if (!newClaim.employee || !newClaim.type || !newClaim.amount || !newClaim.receipt || !newClaim.employeeId) {
      alert("All fields and bills/receipt required!");
      return;
    }

    const newEntry = {
      id: claims.length + 1,
      employee: newClaim.employee,
      employeeId: newClaim.employeeId,
      type: newClaim.type,
      amount: parseFloat(newClaim.amount),
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      file: true,
      frequency: newClaim.frequency,
      description: newClaim.description
    };

    setClaims([...claims, newEntry]);
    setShowModal(false);
    setNewClaim({ employee: "", employeeId: "", type: "", amount: "", frequency: "Monthly", receipt: null, description: "" });

    alert("Claim submitted successfully!");
  };

  const handleAction = (id, action) => {
    setClaims(claims.map(c =>
      c.id === id ? { ...c, status: action } : c
    ));
  };

  const deleteClaim = (id) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      setClaims(claims.filter(c => c.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Approved': 'bg-success-subtle text-success',
      'Pending': 'bg-warning-subtle text-warning',
      'Rejected': 'bg-danger-subtle text-danger'
    };
    const icons = {
      'Approved': 'heroicons:check-circle',
      'Pending': 'heroicons:clock',
      'Rejected': 'heroicons:x-circle'
    };
    return (
      <span className={`badge d-flex align-items-center ${styles[status]}`}>
        <Iconify icon={icons[status]} className="me-1" />
        {status}
      </span>
    );
  };

  const getTaxableBadge = (taxable) => (
    <span className={`badge ${taxable ? 'bg-danger' : 'bg-success'}`}>
      {taxable ? "Taxable" : "Non-Taxable"}
    </span>
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

  const totalClaims = claims.length;
  const approvedClaims = claims.filter(c => c.status === "Approved").length;
  const pendingClaims = claims.filter(c => c.status === "Pending").length;
  const rejectedClaims = claims.filter(c => c.status === "Rejected").length;
  const totalAmount = claims.reduce((sum, c) => sum + c.amount, 0);
  const pendingAmount = claims.filter(c => c.status === "Pending").reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="container-fluid p-3 p-md-4">

      {/* HEADER */}
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
          <div>
            <h5 className="fw-bold text-dark mb-1 d-flex align-items-center">
              <Iconify icon="mdi:cash-refund" className="me-2 text-primary" />
              Reimbursement Management
            </h5>
            <p className="text-muted mb-0">
              Employee reimbursement workflow and tracking
            </p>
          </div>
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={() => setShowModal(true)}
            style={{ minWidth: '140px' }}
          >
            <Plus size={16} className="me-2" />
            <span className="d-none d-md-inline">New Claim</span>
            <span className="d-inline d-md-none">New</span>
          </button>
        </div>

        {/* Search */}
        {activeTab === "claims" && (
          <div className="mb-3">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Iconify icon="heroicons:magnifying-glass" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by employee, ID, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSearchTerm("")}
                >
                  <Iconify icon="heroicons:x-mark" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* STATS CARDS */}
      <div className="row g-3 mb-4">
        {[
          { title: 'Total Claims', value: totalClaims, icon: 'mdi:cash-multiple', color: 'primary', sub: formatCurrency(totalAmount) },
          { title: 'Approved', value: approvedClaims, icon: 'heroicons:check-circle', color: 'success', sub: ((approvedClaims / totalClaims) * 100 || 0).toFixed(0) + '%' },
          { title: 'Pending', value: pendingClaims, icon: 'heroicons:clock', color: 'warning', sub: formatCurrency(pendingAmount) },
          { title: 'Rejected', value: rejectedClaims, icon: 'heroicons:x-circle', color: 'danger', sub: ((rejectedClaims / totalClaims) * 100 || 0).toFixed(0) + '%' }
        ].map((card, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className={`card border-0 bg-${card.color}-subtle h-100`}>
              <div className="card-body p-3 d-flex flex-column flex-sm-row align-items-center gap-3">
                <div className={`w-48-px h-48-px bg-${card.color} rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}>
                  <Iconify icon={card.icon} className="text-white" />
                </div>
                <div>
                  <h6 className="text-muted small mb-1">{card.title}</h6>
                  <h4 className="fw-bold mb-0">{card.value}</h4>
                  <div className="small text-muted">{card.sub}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="card border shadow-none mb-4">
        <div className="card-header bg-transparent border-0 p-0">
          <div className="d-flex overflow-auto" style={{ borderBottom: '2px solid #dee2e6' }}>
            <button
              className={`btn btn-link text-decoration-none px-4 py-3 ${activeTab === "master" ? "fw-bold text-primary border-bottom border-primary border-2" : "text-secondary"}`}
              onClick={() => setActiveTab("master")}
              style={{ whiteSpace: 'nowrap', marginBottom: '-2px' }}
            >
              <Iconify icon="heroicons:squares-2x2" className="me-2" />
              <span className="d-none d-md-inline">Reimbursement Types</span>
              <span className="d-inline d-md-none">Types</span>
            </button>

            <button
              className={`btn btn-link text-decoration-none px-4 py-3 ${activeTab === "claims" ? "fw-bold text-primary border-bottom border-primary border-2" : "text-secondary"}`}
              onClick={() => setActiveTab("claims")}
              style={{ whiteSpace: 'nowrap', marginBottom: '-2px' }}
            >
              <Iconify icon="heroicons:users" className="me-2" />
              <span className="d-none d-md-inline">Employee Claims</span>
              <span className="d-inline d-md-none">Claims</span>
              <span className="badge bg-danger ms-2">{totalClaims}</span>
            </button>
          </div>
        </div>

        <div className="card-body p-0">
          {/* MASTER TAB */}
          {activeTab === "master" && (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Component</th>
                    <th className="d-none d-md-table-cell">Frequency</th>
                    <th>Limit</th>
                    <th>Taxable</th>
                  </tr>
                </thead>
                <tbody>
                  {reimbursements.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="fw-medium text-dark">{item.name}</div>
                        <div className="small text-muted d-md-none">{item.frequency}</div>
                      </td>
                      <td className="d-none d-md-table-cell">{item.frequency}</td>
                      <td>{formatCurrency(item.limit)}</td>
                      <td>{getTaxableBadge(item.taxable)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CLAIMS TAB */}
          {activeTab === "claims" && (
            <>
              {filteredClaims.length === 0 ? (
                <div className="text-center py-5">
                  <Iconify icon="mdi:file-search-outline" className="text-4xl text-muted mb-3" />
                  <h5 className="text-muted">No claims found</h5>
                  <p className="text-muted">{searchTerm ? 'Try a different search term' : 'No claims submitted yet'}</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Employee</th>
                        <th className="d-none d-md-table-cell">Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClaims.map(c => (
                        <tr key={c.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="w-40-px h-40-px bg-light rounded-circle d-none d-md-flex align-items-center justify-content-center me-3">
                                <Iconify icon="heroicons:user" className="text-muted" />
                              </div>
                              <div>
                                <div className="fw-medium text-dark">{c.employee}</div>
                                <div className="small text-muted">{c.employeeId}</div>
                                <div className="d-md-none small mt-1">
                                  <span className="text-muted">{c.type}</span><br />
                                  <span className="text-muted">{c.date}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <div className="fw-medium text-dark">{c.type}</div>
                            <div className="small text-muted">{c.date}</div>
                          </td>
                          <td>{formatCurrency(c.amount)}</td>
                          <td>{getStatusBadge(c.status)}</td>
                          <td>
                            <div className="d-flex flex-column flex-md-row gap-1">
                              {c.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() => handleAction(c.id, "Approved")}
                                    className="btn btn-sm btn-success d-flex align-items-center"
                                  >
                                    <Iconify icon="heroicons:check" className="me-1" />
                                    <span className="d-none d-md-inline">Approve</span>
                                  </button>

                                  <button
                                    onClick={() => handleAction(c.id, "Rejected")}
                                    className="btn btn-sm btn-danger d-flex align-items-center"
                                  >
                                    <Iconify icon="heroicons:x-mark" className="me-1" />
                                    <span className="d-none d-md-inline">Reject</span>
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => deleteClaim(c.id)}
                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                              >
                                <Iconify icon="heroicons:trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
              <div className="modal-header">
                <h5 className="modal-title">New Reimbursement Claim</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={submitClaim}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Employee Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="employee"
                      value={newClaim.employee}
                      onChange={updateClaim}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Employee ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      value={newClaim.employeeId}
                      onChange={updateClaim}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Reimbursement Type</label>
                    <select
                      className="form-select"
                      name="type"
                      value={newClaim.type}
                      onChange={updateClaim}
                    >
                      <option value="">Select Type</option>
                      {reimbursements.map(r => (
                        <option key={r.id} value={r.name}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={newClaim.amount}
                      onChange={updateClaim}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Frequency</label>
                    <select
                      className="form-select"
                      name="frequency"
                      value={newClaim.frequency}
                      onChange={updateClaim}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Yearly">Yearly</option>
                      <option value="Ad-hoc">Ad-hoc</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Upload Bill / Receipt</label>
                    <input
                      type="file"
                      className="form-control"
                      name="receipt"
                      onChange={updateClaim}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={newClaim.description}
                      onChange={updateClaim}
                      rows="3"
                    />
                  </div>
                </div>
                <div className="modal-footer sticky-bottom bg-white">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Submit Claim</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reimbursements;
