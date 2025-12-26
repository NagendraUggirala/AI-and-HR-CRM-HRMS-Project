import React, { useState, useEffect } from "react";
import {
  Plus, Edit2, Trash2, CheckCircle, XCircle,
  FileText, Layers, Users, Calendar
} from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import RecruiterDashboardLayout from "../../recruiterDashboard/RecruiterDashboardLayout";

const Reimbursements = () => {

  const [activeTab, setActiveTab] = useState("master");
  const [showModal, setShowModal] = useState(false);

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
      type: "Medical Reimbursement",
      amount: 8000,
      date: "2024-03-15",
      status: "Approved",
      file: true
    },
    {
      id: 2,
      employee: "Ravi",
      type: "Fuel and Conveyance Reimbursement",
      amount: 2500,
      date: "2024-04-01",
      status: "Pending",
      file: true
    }
  ]);

  const [newClaim, setNewClaim] = useState({
    employee: "",
    type: "",
    amount: "",
    frequency: "Monthly",
    receipt: null
  });

  const updateClaim = (e) => {
    const { name, value, files } = e.target;
    setNewClaim({ ...newClaim, [name]: files ? files[0] : value });
  };

  const submitClaim = (e) => {
    e.preventDefault();

    if (!newClaim.employee || !newClaim.type || !newClaim.amount || !newClaim.receipt) {
      alert("All fields and bills/receipt required!");
      return;
    }

    const newEntry = {
      id: claims.length + 1,
      employee: newClaim.employee,
      type: newClaim.type,
      amount: parseFloat(newClaim.amount),
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      file: true,
      frequency: newClaim.frequency
    };

    setClaims([...claims, newEntry]);
    setShowModal(false);
    setNewClaim({ employee: "", type: "", amount: "", frequency: "Monthly", receipt: null });
    alert("Claim submitted successfully!");
  };

  const handleAction = (id, action) => {
    setClaims(claims.map(c =>
      c.id === id ? { ...c, status: action } : c
    ));
  };

  const totalClaims = claims.length;
  const approvedClaims = claims.filter(c => c.status === "Approved").length;
  const pendingClaims = claims.filter(c => c.status === "Pending").length;

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
          <div className="col-md-4">
            <div className="card bg-info-subtle p-3">
              <h6>Total Claims</h6>
              <h3>{totalClaims}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success-subtle p-3">
              <h6>Approved</h6>
              <h3>{approvedClaims}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning-subtle p-3">
              <h6>Pending</h6>
              <h3>{pendingClaims}</h3>
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
        </div>

        {/* MASTER TAB */}
        {activeTab === "master" && (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Component</th>
                <th>Limit (₹)</th>
                <th>Frequency</th>
                <th>Taxable</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.limit}</td>
                  <td>{item.frequency}</td>
                  <td>
                    <span className={`badge ${item.taxable ? "bg-danger" : "bg-success"}`}>
                      {item.taxable ? "Taxable" : "Non-Taxable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* CLAIMS TAB */}
        {activeTab === "claims" && (
          <table className="table table-striped">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Bill</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map(c => (
                <tr key={c.id}>
                  <td>{c.employee}</td>
                  <td>{c.type}</td>
                  <td>₹{c.amount}</td>
                  <td>{c.date}</td>
                  <td>{c.file ? "Uploaded ✅" : "Missing ❌"}</td>
                  <td>{c.status}</td>
                  <td>
                    {c.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(c.id, "Approved")}
                          className="btn btn-success btn-sm me-2">
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(c.id, "Rejected")}
                          className="btn btn-danger btn-sm">
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                      type="number"
                      placeholder="Amount"
                      name="amount"
                      onChange={updateClaim}
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

                    <input
                      className="form-control"
                      type="file"
                      name="receipt"
                      onChange={updateClaim}
                    />

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

      </div>
    </div>
  );
};

export default Reimbursements;
