import React, { useState, useEffect } from "react";
import {
  Plus, Edit2, Trash2, CheckCircle, XCircle,
  FileText, Layers, Users, Calendar, Download, Filter, Search, BarChart3, TrendingUp, DollarSign, AlertCircle
} from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Reimbursements = () => {

  const [activeTab, setActiveTab] = useState("master");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [editingReimbursement, setEditingReimbursement] = useState(null);

  const [reimbursements, setReimbursements] = useState([
    { id: 1, name: "Medical Reimbursement", limit: 20000, taxable: false, frequency: "Yearly", description: "Medical expenses reimbursement", category: "Health" },
    { id: 2, name: "Telephone / Mobile Reimbursement", limit: 10000, taxable: true, frequency: "Monthly", description: "Phone and mobile bill reimbursement", category: "Communication" },
    { id: 3, name: "Fuel and Conveyance Reimbursement", limit: 15000, taxable: true, frequency: "Monthly", description: "Fuel and travel expenses", category: "Travel" },
    { id: 4, name: "Travel Expense Reimbursement", limit: 30000, taxable: false, frequency: "Ad-hoc", description: "Business travel expenses", category: "Travel" },
    { id: 5, name: "LTA - Leave Travel Allowance", limit: 50000, taxable: false, frequency: "Yearly", description: "Leave travel allowance", category: "Travel" },
    { id: 6, name: "Books and Periodicals", limit: 5000, taxable: false, frequency: "Monthly", description: "Educational books and periodicals", category: "Education" },
    { id: 7, name: "Uniform and Laundry", limit: 10000, taxable: false, frequency: "Quarterly", description: "Uniform and laundry expenses", category: "Other" },
    { id: 8, name: "Other Miscellaneous", limit: 15000, taxable: true, frequency: "Ad-hoc", description: "Other miscellaneous expenses", category: "Other" }
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
      frequency: "Yearly",
      managerApproval: { status: "Approved", date: "2024-03-16", approver: "Manager A" },
      financeApproval: { status: "Approved", date: "2024-03-17", approver: "Finance B" },
      payrollProcessed: true,
      payrollDate: "2024-03-20",
      taxAmount: 0,
      netAmount: 8000,
      balanceUsed: 8000,
      balanceRemaining: 12000,
      description: "Medical expenses for family",
      receiptFile: "medical_receipt_001.pdf"
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
      frequency: "Monthly",
      managerApproval: { status: "Approved", date: "2024-04-02", approver: "Manager C" },
      financeApproval: { status: "Pending", date: null, approver: null },
      payrollProcessed: false,
      payrollDate: null,
      taxAmount: 750,
      netAmount: 1750,
      balanceUsed: 2500,
      balanceRemaining: 12500,
      description: "Monthly fuel expenses",
      receiptFile: "fuel_receipt_002.pdf"
    },
    {
      id: 3,
      employee: "Priya",
      employeeId: "EMP003",
      type: "Travel Expense Reimbursement",
      amount: 15000,
      date: "2024-04-05",
      status: "Pending",
      file: true,
      frequency: "Ad-hoc",
      managerApproval: { status: "Pending", date: null, approver: null },
      financeApproval: { status: "Pending", date: null, approver: null },
      payrollProcessed: false,
      payrollDate: null,
      taxAmount: 0,
      netAmount: 15000,
      balanceUsed: 15000,
      balanceRemaining: 15000,
      description: "Business travel to Mumbai",
      receiptFile: "travel_receipt_003.pdf"
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

  // Employee balances tracking
  const [employeeBalances, setEmployeeBalances] = useState([
    { employeeId: "EMP001", employee: "Swetha", balances: {
      "Medical Reimbursement": { used: 8000, remaining: 12000, limit: 20000, period: "2024" },
      "Telephone / Mobile Reimbursement": { used: 3000, remaining: 7000, limit: 10000, period: "2024-04" },
      "Fuel and Conveyance Reimbursement": { used: 5000, remaining: 10000, limit: 15000, period: "2024-04" }
    }},
    { employeeId: "EMP002", employee: "Ravi", balances: {
      "Medical Reimbursement": { used: 0, remaining: 20000, limit: 20000, period: "2024" },
      "Telephone / Mobile Reimbursement": { used: 2500, remaining: 7500, limit: 10000, period: "2024-04" },
      "Fuel and Conveyance Reimbursement": { used: 2500, remaining: 12500, limit: 15000, period: "2024-04" }
    }},
    { employeeId: "EMP003", employee: "Priya", balances: {
      "Medical Reimbursement": { used: 5000, remaining: 15000, limit: 20000, period: "2024" },
      "Travel Expense Reimbursement": { used: 15000, remaining: 15000, limit: 30000, period: "2024" }
    }}
  ]);

  const updateClaim = (e) => {
    const { name, value, files } = e.target;
    setNewClaim({ ...newClaim, [name]: files ? files[0] : value });
    
    // Auto-set frequency based on reimbursement type
    if (name === "type" && value) {
      const selectedReimbursement = reimbursements.find(r => r.name === value);
      if (selectedReimbursement) {
        setNewClaim(prev => ({ ...prev, frequency: selectedReimbursement.frequency }));
      }
    }
  };

  const validateClaimLimit = (employeeId, type, amount) => {
    const employeeBalance = employeeBalances.find(eb => eb.employeeId === employeeId);
    if (!employeeBalance) return { valid: true, message: "" };
    
    const balance = employeeBalance.balances[type];
    if (!balance) return { valid: true, message: "" };
    
    if (balance.remaining < amount) {
      return { 
        valid: false, 
        message: `Claim amount exceeds remaining balance. Remaining: ₹${balance.remaining}, Claimed: ₹${amount}` 
      };
    }
    
    return { valid: true, message: `Remaining balance: ₹${balance.remaining - amount}` };
  };

  const calculateTax = (amount, isTaxable) => {
    if (!isTaxable) return 0;
    // Assuming 30% tax rate for taxable reimbursements
    return amount * 0.30;
  };

  const submitClaim = (e) => {
    e.preventDefault();

    if (!newClaim.employee || !newClaim.type || !newClaim.amount || !newClaim.receipt) {
      alert("All fields and bills/receipt required!");
      return;
    }

    const amount = parseFloat(newClaim.amount);
    const selectedReimbursement = reimbursements.find(r => r.name === newClaim.type);
    
    // Validate claim limit
    if (amount > selectedReimbursement.limit) {
      alert(`Claim amount exceeds the limit of ₹${selectedReimbursement.limit} for ${newClaim.type}`);
      return;
    }

    // Validate employee balance
    const validation = validateClaimLimit(newClaim.employeeId, newClaim.type, amount);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    const taxAmount = calculateTax(amount, selectedReimbursement.taxable);
    const netAmount = amount - taxAmount;

    const newEntry = {
      id: claims.length + 1,
      employee: newClaim.employee,
      employeeId: newClaim.employeeId,
      type: newClaim.type,
      amount: amount,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      file: true,
      frequency: newClaim.frequency,
      managerApproval: { status: "Pending", date: null, approver: null },
      financeApproval: { status: "Pending", date: null, approver: null },
      payrollProcessed: false,
      payrollDate: null,
      taxAmount: taxAmount,
      netAmount: netAmount,
      balanceUsed: amount,
      balanceRemaining: validation.valid ? (selectedReimbursement.limit - amount) : 0,
      description: newClaim.description || "",
      receiptFile: newClaim.receipt?.name || "receipt.pdf"
    };

    setClaims([...claims, newEntry]);
    setShowModal(false);
    setNewClaim({ employee: "", employeeId: "", type: "", amount: "", frequency: "Monthly", receipt: null, description: "" });
    alert("Claim submitted successfully! Awaiting manager approval.");
  };

  const handleManagerApproval = (id, action) => {
    const claim = claims.find(c => c.id === id);
    if (!claim) return;

    const updatedClaim = {
      ...claim,
      managerApproval: {
        status: action,
        date: new Date().toISOString().split("T")[0],
        approver: "Manager Name"
      },
      status: action === "Approved" ? "Finance Review" : "Rejected"
    };

    setClaims(claims.map(c => c.id === id ? updatedClaim : c));
    alert(`Claim ${action.toLowerCase()} by manager. ${action === "Approved" ? "Sent to finance for review." : ""}`);
  };

  const handleFinanceApproval = (id, action) => {
    const claim = claims.find(c => c.id === id);
    if (!claim) return;

    const updatedClaim = {
      ...claim,
      financeApproval: {
        status: action,
        date: new Date().toISOString().split("T")[0],
        approver: "Finance Name"
      },
      status: action === "Approved" ? "Approved" : "Rejected",
      payrollProcessed: action === "Approved" ? true : false,
      payrollDate: action === "Approved" ? new Date().toISOString().split("T")[0] : null
    };

    setClaims(claims.map(c => c.id === id ? updatedClaim : c));
    alert(`Claim ${action.toLowerCase()} by finance. ${action === "Approved" ? "Ready for payroll processing." : ""}`);
  };

  const handleAction = (id, action) => {
    const claim = claims.find(c => c.id === id);
    if (!claim) return;

    // Determine which approval to handle
    if (claim.managerApproval.status === "Pending") {
      handleManagerApproval(id, action);
    } else if (claim.financeApproval.status === "Pending") {
      handleFinanceApproval(id, action);
    }
  };

  const totalClaims = claims.length;
  const approvedClaims = claims.filter(c => c.status === "Approved").length;
  const pendingClaims = claims.filter(c => c.status === "Pending" || c.status === "Finance Review").length;
  const rejectedClaims = claims.filter(c => c.status === "Rejected").length;
  const totalAmount = claims.reduce((sum, c) => sum + c.amount, 0);
  const approvedAmount = claims.filter(c => c.status === "Approved").reduce((sum, c) => sum + c.amount, 0);
  const pendingAmount = claims.filter(c => c.status === "Pending" || c.status === "Finance Review").reduce((sum, c) => sum + c.amount, 0);
  const totalTaxAmount = claims.reduce((sum, c) => sum + (c.taxAmount || 0), 0);

  // Filtered claims
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || claim.status === filterStatus;
    const matchesType = filterType === "all" || claim.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      <div className="container-fluid p-4">

        {/* HEADER */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h4>
              <Icon icon="mdi:cash-refund" className="me-2" />
              Reimbursement Management
            </h4>
            <p className="text-muted">Employee reimbursement workflow and tracking</p>
          </div>

          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} className="me-2" />
            New Claim
          </button>
        </div>

        {/* STATS */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-info-subtle p-3">
              <h6>Total Claims</h6>
              <h3>{totalClaims}</h3>
              <small className="text-muted">₹{totalAmount.toLocaleString()}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success-subtle p-3">
              <h6>Approved</h6>
              <h3>{approvedClaims}</h3>
              <small className="text-muted">₹{approvedAmount.toLocaleString()}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning-subtle p-3">
              <h6>Pending</h6>
              <h3>{pendingClaims}</h3>
              <small className="text-muted">₹{pendingAmount.toLocaleString()}</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger-subtle p-3">
              <h6>Tax Amount</h6>
              <h3>₹{totalTaxAmount.toLocaleString()}</h3>
              <small className="text-muted">Total taxable</small>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="d-flex border-bottom mb-3">
          <button
            className={`btn btn-link ${activeTab === "master" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("master")}>
            <Layers size={16} /> Master
          </button>

          <button
            className={`btn btn-link ${activeTab === "claims" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("claims")}>
            <Users size={16} /> Claims
          </button>

          <button
            className={`btn btn-link ${activeTab === "balances" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("balances")}>
            <DollarSign size={16} /> Balances
          </button>

          <button
            className={`btn btn-link ${activeTab === "reports" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("reports")}>
            <BarChart3 size={16} /> Reports
          </button>
        </div>

        {/* MASTER TAB */}
        {activeTab === "master" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Reimbursement Types Master</h5>
              <button className="btn btn-sm btn-primary" onClick={() => { setEditingReimbursement(null); setShowEditModal(true); }}>
                <Plus size={16} className="me-2" />
                Add Type
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Component</th>
                    <th>Category</th>
                    <th>Limit (₹)</th>
                    <th>Frequency</th>
                    <th>Taxable</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reimbursements.map(item => (
                    <tr key={item.id}>
                      <td className="fw-semibold">{item.name}</td>
                      <td><span className="badge bg-secondary">{item.category}</span></td>
                      <td>₹{item.limit.toLocaleString()}</td>
                      <td>{item.frequency}</td>
                      <td>
                        <span className={`badge ${item.taxable ? "bg-danger" : "bg-success"}`}>
                          {item.taxable ? "Taxable" : "Non-Taxable"}
                        </span>
                      </td>
                      <td><small className="text-muted">{item.description}</small></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditingReimbursement(item); setShowEditModal(true); }}>
                          <Edit2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CLAIMS TAB */}
        {activeTab === "claims" && (
          <div>
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text"><Search size={16} /></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by employee, type, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Finance Review">Finance Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="col-md-3">
                <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="all">All Types</option>
                  {reimbursements.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <button className="btn btn-outline-primary w-100" onClick={() => setShowReportsModal(true)}>
                  <BarChart3 size={16} className="me-2" />
                  Analytics
                </button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Tax</th>
                    <th>Net Amount</th>
                    <th>Date</th>
                    <th>Bill</th>
                    <th>Status</th>
                    <th>Approval Stage</th>
                    <th>Payroll</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center py-4">
                        <p className="text-muted mb-0">No claims found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredClaims.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div className="fw-semibold">{c.employee}</div>
                          <small className="text-muted">{c.employeeId}</small>
                        </td>
                        <td>{c.type}</td>
                        <td className="fw-bold">₹{c.amount.toLocaleString()}</td>
                        <td className="text-danger">₹{c.taxAmount?.toLocaleString() || 0}</td>
                        <td className="text-success fw-bold">₹{c.netAmount?.toLocaleString() || c.amount.toLocaleString()}</td>
                        <td>{c.date}</td>
                        <td>
                          {c.file ? (
                            <span className="badge bg-success">Uploaded ✅</span>
                          ) : (
                            <span className="badge bg-danger">Missing ❌</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${
                            c.status === "Approved" ? "bg-success" :
                            c.status === "Rejected" ? "bg-danger" :
                            c.status === "Finance Review" ? "bg-warning" :
                            "bg-secondary"
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td>
                          <div className="small">
                            <div>Manager: <span className={`badge ${c.managerApproval?.status === "Approved" ? "bg-success" : c.managerApproval?.status === "Rejected" ? "bg-danger" : "bg-secondary"}`}>{c.managerApproval?.status || "Pending"}</span></div>
                            <div>Finance: <span className={`badge ${c.financeApproval?.status === "Approved" ? "bg-success" : c.financeApproval?.status === "Rejected" ? "bg-danger" : "bg-secondary"}`}>{c.financeApproval?.status || "Pending"}</span></div>
                          </div>
                        </td>
                        <td>
                          {c.payrollProcessed ? (
                            <span className="badge bg-success">Processed</span>
                          ) : (
                            <span className="badge bg-secondary">Pending</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-outline-info"
                              onClick={() => { setSelectedClaim(c); setShowDetailsModal(true); }}
                              title="View Details"
                            >
                              <FileText size={14} />
                            </button>
                            {(c.status === "Pending" || c.status === "Finance Review") && (
                              <>
                                {c.managerApproval?.status === "Pending" && (
                                  <>
                                    <button
                                      onClick={() => handleManagerApproval(c.id, "Approved")}
                                      className="btn btn-sm btn-success"
                                      title="Approve (Manager)"
                                    >
                                      <CheckCircle size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleManagerApproval(c.id, "Rejected")}
                                      className="btn btn-sm btn-danger"
                                      title="Reject (Manager)"
                                    >
                                      <XCircle size={14} />
                                    </button>
                                  </>
                                )}
                                {c.managerApproval?.status === "Approved" && c.financeApproval?.status === "Pending" && (
                                  <>
                                    <button
                                      onClick={() => handleFinanceApproval(c.id, "Approved")}
                                      className="btn btn-sm btn-success"
                                      title="Approve (Finance)"
                                    >
                                      <CheckCircle size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleFinanceApproval(c.id, "Rejected")}
                                      className="btn btn-sm btn-danger"
                                      title="Reject (Finance)"
                                    >
                                      <XCircle size={14} />
                                    </button>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BALANCES TAB */}
        {activeTab === "balances" && (
          <div>
            <h5 className="mb-3">Employee Reimbursement Balances</h5>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Employee</th>
                    <th>Reimbursement Type</th>
                    <th>Limit</th>
                    <th>Used</th>
                    <th>Remaining</th>
                    <th>Period</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeBalances.map(emp => (
                    Object.entries(emp.balances).map(([type, balance]) => (
                      <tr key={`${emp.employeeId}-${type}`}>
                        <td>
                          <div className="fw-semibold">{emp.employee}</div>
                          <small className="text-muted">{emp.employeeId}</small>
                        </td>
                        <td>{type}</td>
                        <td>₹{balance.limit.toLocaleString()}</td>
                        <td className="text-danger">₹{balance.used.toLocaleString()}</td>
                        <td className="text-success fw-bold">₹{balance.remaining.toLocaleString()}</td>
                        <td>{balance.period}</td>
                        <td>
                          <div className="progress" style={{ height: '20px' }}>
                            <div
                              className={`progress-bar ${balance.remaining < balance.limit * 0.2 ? 'bg-danger' : balance.remaining < balance.limit * 0.5 ? 'bg-warning' : 'bg-success'}`}
                              role="progressbar"
                              style={{ width: `${(balance.remaining / balance.limit) * 100}%` }}
                            >
                              {((balance.remaining / balance.limit) * 100).toFixed(0)}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          <div>
            <h5 className="mb-3">Reimbursement Reports & Analytics</h5>
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">Claims by Type</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Count</th>
                            <th>Total Amount</th>
                            <th>Avg Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reimbursements.map(r => {
                            const typeClaims = claims.filter(c => c.type === r.name);
                            const total = typeClaims.reduce((sum, c) => sum + c.amount, 0);
                            const avg = typeClaims.length > 0 ? total / typeClaims.length : 0;
                            return (
                              <tr key={r.id}>
                                <td>{r.name}</td>
                                <td>{typeClaims.length}</td>
                                <td>₹{total.toLocaleString()}</td>
                                <td>₹{avg.toFixed(0)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <h6 className="mb-0">Tax Analysis</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Total Taxable Amount:</span>
                        <strong>₹{claims.filter(c => {
                          const r = reimbursements.find(re => re.name === c.type);
                          return r && r.taxable;
                        }).reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Total Tax Amount:</span>
                        <strong className="text-danger">₹{totalTaxAmount.toLocaleString()}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Total Non-Taxable:</span>
                        <strong className="text-success">₹{(totalAmount - claims.filter(c => {
                          const r = reimbursements.find(re => re.name === c.type);
                          return r && r.taxable;
                        }).reduce((sum, c) => sum + c.amount, 0)).toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-info text-white">
                    <h6 className="mb-0">Monthly Trend</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Claims</th>
                            <th>Total Amount</th>
                            <th>Approved</th>
                            <th>Pending</th>
                          </tr>
                        </thead>
                        <tbody>
                          {["January", "February", "March", "April"].map(month => {
                            const monthClaims = claims.filter(c => {
                              const claimDate = new Date(c.date);
                              return claimDate.toLocaleString('default', { month: 'long' }) === month;
                            });
                            return (
                              <tr key={month}>
                                <td>{month} 2024</td>
                                <td>{monthClaims.length}</td>
                                <td>₹{monthClaims.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</td>
                                <td>{monthClaims.filter(c => c.status === "Approved").length}</td>
                                <td>{monthClaims.filter(c => c.status === "Pending" || c.status === "Finance Review").length}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL */}
        {showModal && (
          <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Submit Reimbursement Claim</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)} />
                </div>

                <form onSubmit={submitClaim}>
                  <div className="modal-body">

                    <input
                      className="form-control mb-3"
                      name="employee"
                      placeholder="Employee Name"
                      value={newClaim.employee}
                      onChange={updateClaim}
                    />

                    <select
                      className="form-control mb-3"
                      name="type"
                      value={newClaim.type}
                      onChange={updateClaim}
                    >
                      <option value="">Select Type</option>
                      {reimbursements.map(r => (
                        <option key={r.id}>{r.name}</option>
                      ))}
                    </select>

                    <input
                      className="form-control mb-3"
                      type="text"
                      placeholder="Employee ID"
                      name="employeeId"
                      value={newClaim.employeeId}
                      onChange={updateClaim}
                    />

                    <input
                      className="form-control mb-3"
                      type="number"
                      placeholder="Amount"
                      name="amount"
                      value={newClaim.amount}
                      onChange={updateClaim}
                    />

                    <textarea
                      className="form-control mb-3"
                      placeholder="Description / Purpose"
                      name="description"
                      value={newClaim.description}
                      onChange={updateClaim}
                      rows="3"
                    />

                    <select
                      className="form-control mb-3"
                      name="frequency"
                      onChange={updateClaim}
                    >
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                      <option>Ad-hoc</option>
                    </select>

                    <label className="form-label">Upload Bill/Receipt (Required)</label>
                    <input
                      className="form-control mb-3"
                      type="file"
                      name="receipt"
                      onChange={updateClaim}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {newClaim.type && (
                      <div className="alert alert-info">
                        <AlertCircle size={16} className="me-2" />
                        <strong>Limit:</strong> ₹{reimbursements.find(r => r.name === newClaim.type)?.limit.toLocaleString() || 0}
                        {newClaim.amount && (
                          <>
                            <br />
                            <strong>Remaining Balance:</strong> ₹{(() => {
                              const empBalance = employeeBalances.find(eb => eb.employeeId === newClaim.employeeId);
                              if (!empBalance) return "N/A";
                              const balance = empBalance.balances[newClaim.type];
                              if (!balance) return "N/A";
                              return (balance.remaining - parseFloat(newClaim.amount || 0)).toLocaleString();
                            })()}
                          </>
                        )}
                      </div>
                    )}

                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="btn btn-primary" type="submit">Submit Claim</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        )}

        {/* CLAIM DETAILS MODAL */}
        {showDetailsModal && selectedClaim && (
          <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Claim Details - {selectedClaim.employee}</h5>
                  <button className="btn-close" onClick={() => { setShowDetailsModal(false); setSelectedClaim(null); }} />
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Employee:</strong> {selectedClaim.employee} ({selectedClaim.employeeId})
                    </div>
                    <div className="col-md-6">
                      <strong>Type:</strong> {selectedClaim.type}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Amount:</strong> ₹{selectedClaim.amount.toLocaleString()}
                    </div>
                    <div className="col-md-6">
                      <strong>Tax Amount:</strong> ₹{selectedClaim.taxAmount?.toLocaleString() || 0}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Net Amount:</strong> ₹{selectedClaim.netAmount?.toLocaleString() || selectedClaim.amount.toLocaleString()}
                    </div>
                    <div className="col-md-6">
                      <strong>Date:</strong> {selectedClaim.date}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <strong>Description:</strong> {selectedClaim.description || "N/A"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Manager Approval:</strong>
                      <div className="ms-3">
                        <div>Status: <span className={`badge ${selectedClaim.managerApproval?.status === "Approved" ? "bg-success" : selectedClaim.managerApproval?.status === "Rejected" ? "bg-danger" : "bg-secondary"}`}>{selectedClaim.managerApproval?.status || "Pending"}</span></div>
                        {selectedClaim.managerApproval?.date && <div>Date: {selectedClaim.managerApproval.date}</div>}
                        {selectedClaim.managerApproval?.approver && <div>Approver: {selectedClaim.managerApproval.approver}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <strong>Finance Approval:</strong>
                      <div className="ms-3">
                        <div>Status: <span className={`badge ${selectedClaim.financeApproval?.status === "Approved" ? "bg-success" : selectedClaim.financeApproval?.status === "Rejected" ? "bg-danger" : "bg-secondary"}`}>{selectedClaim.financeApproval?.status || "Pending"}</span></div>
                        {selectedClaim.financeApproval?.date && <div>Date: {selectedClaim.financeApproval.date}</div>}
                        {selectedClaim.financeApproval?.approver && <div>Approver: {selectedClaim.financeApproval.approver}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Payroll Status:</strong> {selectedClaim.payrollProcessed ? <span className="badge bg-success">Processed</span> : <span className="badge bg-secondary">Pending</span>}
                    </div>
                    {selectedClaim.payrollDate && (
                      <div className="col-md-6">
                        <strong>Payroll Date:</strong> {selectedClaim.payrollDate}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <strong>Receipt:</strong> {selectedClaim.receiptFile || "N/A"}
                      {selectedClaim.file && (
                        <button className="btn btn-sm btn-outline-primary ms-2">
                          <Download size={14} className="me-1" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => { setShowDetailsModal(false); setSelectedClaim(null); }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT REIMBURSEMENT MODAL */}
        {showEditModal && (
          <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{editingReimbursement ? "Edit" : "Add"} Reimbursement Type</h5>
                  <button className="btn-close" onClick={() => { setShowEditModal(false); setEditingReimbursement(null); }} />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" defaultValue={editingReimbursement?.name || ""} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" defaultValue={editingReimbursement?.category || ""}>
                      <option>Health</option>
                      <option>Travel</option>
                      <option>Communication</option>
                      <option>Education</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Limit (₹)</label>
                    <input type="number" className="form-control" defaultValue={editingReimbursement?.limit || ""} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Frequency</label>
                    <select className="form-select" defaultValue={editingReimbursement?.frequency || ""}>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                      <option>Ad-hoc</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Taxable</label>
                    <select className="form-select" defaultValue={editingReimbursement?.taxable ? "true" : "false"}>
                      <option value="false">Non-Taxable</option>
                      <option value="true">Taxable</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" defaultValue={editingReimbursement?.description || ""} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => { setShowEditModal(false); setEditingReimbursement(null); }}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { alert("Reimbursement type saved!"); setShowEditModal(false); setEditingReimbursement(null); }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORTS MODAL */}
        {showReportsModal && (
          <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Reimbursement Analytics & Reports</h5>
                  <button className="btn-close" onClick={() => setShowReportsModal(false)} />
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-primary text-white">
                        <div className="card-body">
                          <h6>Total Claims</h6>
                          <h3>{totalClaims}</h3>
                          <small>₹{totalAmount.toLocaleString()}</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-success text-white">
                        <div className="card-body">
                          <h6>Approved Claims</h6>
                          <h3>{approvedClaims}</h3>
                          <small>₹{approvedAmount.toLocaleString()}</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-warning text-white">
                        <div className="card-body">
                          <h6>Pending Claims</h6>
                          <h3>{pendingClaims}</h3>
                          <small>₹{pendingAmount.toLocaleString()}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Claims by Status</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Status</th>
                              <th>Count</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Approved</td>
                              <td>{approvedClaims}</td>
                              <td>₹{approvedAmount.toLocaleString()}</td>
                            </tr>
                            <tr>
                              <td>Pending</td>
                              <td>{pendingClaims}</td>
                              <td>₹{pendingAmount.toLocaleString()}</td>
                            </tr>
                            <tr>
                              <td>Rejected</td>
                              <td>{rejectedClaims}</td>
                              <td>₹{claims.filter(c => c.status === "Rejected").reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6>Top Employees by Claims</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Employee</th>
                              <th>Claims</th>
                              <th>Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(
                              claims.reduce((acc, claim) => {
                                if (!acc[claim.employee]) {
                                  acc[claim.employee] = { count: 0, total: 0 };
                                }
                                acc[claim.employee].count++;
                                acc[claim.employee].total += claim.amount;
                                return acc;
                              }, {})
                            )
                              .sort((a, b) => b[1].total - a[1].total)
                              .slice(0, 5)
                              .map(([employee, data]) => (
                                <tr key={employee}>
                                  <td>{employee}</td>
                                  <td>{data.count}</td>
                                  <td>₹{data.total.toLocaleString()}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={() => alert("Report exported!")}>
                    <Download size={16} className="me-2" />
                    Export Report
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowReportsModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Reimbursements;
