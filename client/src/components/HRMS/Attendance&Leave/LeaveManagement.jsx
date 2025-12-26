import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUsers,
  FaClipboardList,
  FaBusinessTime,
  FaUserClock,
  FaPlusCircle,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

export default function LeaveDashboard() {
  const [activeTab, setActiveTab] = useState("leaveTypes");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [newLeaveType, setNewLeaveType] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const employees = ["Rahul", "Akhil", "Rakesh", "Kiran", "Anil", "Ravi"];

  const [leaveTypes, setLeaveTypes] = useState([
    { id: 1, employee: "Rahul", name: "Casual Leave" },
    { id: 2, employee: "Akhil", name: "Sick Leave" },
    { id: 3, employee: "Kiran", name: "Earned Leave" },
  ]);

  const officeLeaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Earned Leave",
    "Comp Off",
    "Maternity Leave",
    "Paternity Leave",
    "Bereavement Leave",
    "Half Day Leave",
  ];

  const [compOffList] = useState([
    { id: 1, emp: "Rakesh", date: "2025-01-12", hours: 6 },
    { id: 2, emp: "Kiran", date: "2025-01-10", hours: 4 },
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, emp: "Akhil", from: "2025-01-15", to: "2025-01-17", type: "Casual", status: "Pending" },
    { id: 2, emp: "Ravi", from: "2025-01-20", to: "2025-01-21", type: "Sick", status: "Pending" },
  ]);

  const [leaveBalance] = useState([
    { id: 1, emp: "Rahul", casual: 6, sick: 3, earned: 12 },
    { id: 2, emp: "Anil", casual: 2, sick: 5, earned: 8 },
    { id: 3, emp: "Kiran", casual: 4, sick: 2, earned: 10 },
  ]);

  const addLeaveType = () => {
    if (!newLeaveType.trim() || !selectedEmployee) return;
    setLeaveTypes([
      ...leaveTypes,
      { id: Date.now(), employee: selectedEmployee, name: newLeaveType },
    ]);
    setNewLeaveType("");
    setSelectedEmployee("");
  };

  const deleteLeaveType = (id) => {
    setLeaveTypes(leaveTypes.filter((lt) => lt.id !== id));
  };

  const updateRequestStatus = (id, status) => {
    setLeaveRequests(
      leaveRequests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  const cardStyle = {
    minWidth: "180px",
    height: "100px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
  };

  return (
    <div className="container py-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold h4 h2-md">Leave Dashboard</h2>
        <input
          type="date"
          className="form-control"
          style={{ width: "220px", height: "40px", borderRadius: "8px" }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* TOGGLE BUTTONS */}
      <div className="d-flex justify-content-start mb-4" style={{ gap: "10px" }}>
        {[
          ["leaveTypes", "Leave Types"],
          ["compOff", "Comp Off"],
          ["userLeave", "User Leave"],
          ["leaveRequests", "Requests"],
          ["leaveBalance", "Balance"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`btn ${activeTab === key ? "btn-primary" : "btn-outline-primary"}`}
            style={{ padding: "8px 16px", fontSize: "14px" }}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="card shadow p-3" style={{ borderRadius: "12px" }}>

        {/* LEAVE TYPES */}
        {activeTab === "leaveTypes" && (
          <div>
            <div className="mb-3">
              <h4 className="fw-bold mb-0">Configure Employee Leave Types</h4>
              <p className="text-muted" style={{ fontSize: "14px" }}>Assign custom leave types to employees</p>
            </div>
            
            {/* Form */}
            <div className="p-3 rounded mb-4" style={{ background: "#f8f9fa", borderRadius: "10px" }}>
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: "14px" }}>Employee Name</label>
                  <select
                    className="form-control form-control-sm"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ fontSize: "14px" }}>Leave Type</label>
                  <select
                    className="form-control form-control-sm"
                    value={newLeaveType}
                    onChange={(e) => setNewLeaveType(e.target.value)}
                  >
                    <option value="">Select Leave Type</option>
                    {officeLeaveTypes.map((leave) => (
                      <option key={leave} value={leave}>{leave}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary btn-sm w-100" onClick={addLeaveType}>
                    <FaPlusCircle className="me-1" /> Add Type
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover table-bordered mb-0" style={{ fontSize: "14px" }}>
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "35%" }}>Employee</th>
                    <th style={{ width: "45%" }}>Leave Type</th>
                    <th style={{ width: "15%", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveTypes.map((lt, index) => (
                    <tr key={lt.id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="fw-semibold">{lt.employee}</td>
                      <td>{lt.name}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-link p-0"
                          onClick={() => deleteLeaveType(lt.id)}
                          title="Delete"
                        >
                          <FaTimesCircle style={{ color: "red", fontSize: "18px" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COMP-OFF */}
        {activeTab === "compOff" && (
          <div>
            <div className="mb-3">
              <h4 className="fw-bold mb-0">Comp-Off Summary</h4>
              <p className="text-muted" style={{ fontSize: "14px" }}>Compensatory off hours earned by employees</p>
            </div>

            {/* Summary Cards */}
            <div className="d-flex flex-wrap justify-content-start mb-4" style={{ gap: "15px" }}>
              {[ 
                { label: "Total Employees", value: compOffList.length, color: "#0d47a1", bg: "#e3f2fd" },
                { label: "Total Hours", value: `${compOffList.reduce((a, b) => a + b.hours, 0)} hrs`, color: "#20c997", bg: "#e6fff7" },
                { label: "Latest Entry", value: compOffList.length > 0 ? compOffList[compOffList.length - 1].date : "—", color: "#ff9800", bg: "#fff3e0" },
              ].map((card, i) => (
                <div key={i} style={{ ...cardStyle, background: card.bg }}>
                  <div style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>{card.label}</div>
                  <div style={{ fontWeight: "700", color: card.color, fontSize: "18px" }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ fontSize: "14px" }}>
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "30%" }}>Employee</th>
                    <th style={{ width: "30%" }}>Date</th>
                    <th style={{ width: "35%" }}>Hours Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {compOffList.map((c, i) => (
                    <tr key={c.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="fw-semibold">{c.emp}</td>
                      <td>{c.date}</td>
                      <td>
                        <span className="badge" style={{ 
                          background: "#e6ffe9", 
                          color: "#198754",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}>
                          {c.hours} hours
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USER LEAVE */}
        {activeTab === "userLeave" && (
          <div>
            <div className="mb-3">
              <h4 className="fw-bold mb-0">Employee Leave Breakdown</h4>
              <p className="text-muted" style={{ fontSize: "14px" }}>Detailed view of leaves available for each employee</p>
            </div>

            {/* Summary Cards */}
            <div className="d-flex flex-wrap justify-content-start mb-4" style={{ gap: "15px" }}>
              {[
                { label: "Total Employees", value: leaveBalance.length, color: "#0d47a1", bg: "#e3f2fd" },
                { label: "Casual Leaves", value: leaveBalance.reduce((a, b) => a + b.casual, 0), color: "#20c997", bg: "#e6fff7" },
                { label: "Sick Leaves", value: leaveBalance.reduce((a, b) => a + b.sick, 0), color: "#ff6b6b", bg: "#ffebee" },
                { label: "Earned Leaves", value: leaveBalance.reduce((a, b) => a + b.earned, 0), color: "#ffc107", bg: "#fff8e1" },
              ].map((card, i) => (
                <div key={i} style={{ ...cardStyle, background: card.bg }}>
                  <div style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>{card.label}</div>
                  <div style={{ fontWeight: "700", color: card.color, fontSize: "18px" }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ fontSize: "14px" }}>
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "25%" }}>Employee</th>
                    <th style={{ width: "20%", textAlign: "center" }}>Casual</th>
                    <th style={{ width: "20%", textAlign: "center" }}>Sick</th>
                    <th style={{ width: "20%", textAlign: "center" }}>Earned</th>
                    <th style={{ width: "10%", textAlign: "center" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveBalance.map((emp, i) => (
                    <tr key={emp.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="fw-semibold">{emp.emp}</td>
                      <td className="text-center">
                        <span className="badge" style={{ 
                          background: "#e8fff3", 
                          color: "#198754",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}>
                          {emp.casual}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge" style={{ 
                          background: "#ffecec", 
                          color: "#dc3545",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}>
                          {emp.sick}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="badge" style={{ 
                          background: "#fff7e6", 
                          color: "#ff9800",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}>
                          {emp.earned}
                        </span>
                      </td>
                      <td className="text-center fw-bold" style={{ color: "#0d47a1" }}>
                        {emp.casual + emp.sick + emp.earned}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEAVE REQUESTS */}
        {activeTab === "leaveRequests" && (
          <div>
            <div className="mb-3">
              <h4 className="fw-bold mb-0">Pending Leave Requests</h4>
              <p className="text-muted" style={{ fontSize: "14px" }}>Approve or reject leave requests</p>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-hover mb-0" style={{ fontSize: "14px" }}>
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "15%" }}>Employee</th>
                    <th style={{ width: "25%" }}>Leave Dates</th>
                    <th style={{ width: "15%" }}>Type</th>
                    <th style={{ width: "15%" }}>Status</th>
                    <th style={{ width: "25%", textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((req, i) => (
                    <tr key={req.id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="fw-semibold">{req.emp}</td>
                      <td>
                        <div style={{ fontSize: "13px" }}>
                          <div><strong>From:</strong> {req.from}</div>
                          <div><strong>To:</strong> {req.to}</div>
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{ 
                          background: "#e8f0ff", 
                          color: "#1e40af",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}>
                          {req.type}
                        </span>
                      </td>
                      <td>
                        <span className="badge" style={{ 
                          background: req.status === "Pending" ? "#ffe58f" : 
                                    req.status === "Approved" ? "#95f5a6" : "#ff9f9f",
                          color: req.status === "Pending" ? "#ad8b00" : 
                                req.status === "Approved" ? "#10793f" : "#a61d24",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}>
                          {req.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center" style={{ gap: "8px" }}>
                          <button
                            className="btn btn-success btn-sm"
                            style={{ padding: "6px 12px", borderRadius: "6px", fontSize: "13px" }}
                            onClick={() => updateRequestStatus(req.id, "Approved")}
                            title="Approve"
                          >
                            <FaCheckCircle className="me-1" /> Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ padding: "6px 12px", borderRadius: "6px", fontSize: "13px" }}
                            onClick={() => updateRequestStatus(req.id, "Rejected")}
                            title="Reject"
                          >
                            <FaTimesCircle className="me-1" /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEAVE BALANCE */}
        {activeTab === "leaveBalance" && (
          <div>
            <div className="mb-3">
              <h4 className="fw-bold mb-0">Leave Balance Summary</h4>
              <p className="text-muted" style={{ fontSize: "14px" }}>Available leave balance for each employee</p>
            </div>

            <div className="row g-3">
              {leaveBalance.map((emp) => (
                <div className="col-md-4" key={emp.id}>
                  <div
                    className="p-3"
                    style={{
                      borderRadius: "12px",
                      minHeight: "180px",
                      background: "linear-gradient(145deg, #ffffff, #e3f2fd)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Employee Name */}
                    <h6 style={{ fontWeight: "700", color: "#000", marginBottom: "12px" }}>
                      {emp.emp}
                    </h6>

                    {/* Leave Types */}
                    <div className="mb-2">
                      {["Casual", "Sick", "Earned"].map((type) => (
                        <div key={type} className="d-flex justify-content-between align-items-center mb-2">
                          <span style={{ fontSize: "13px", fontWeight: "500" }}>{type} Leave</span>
                          <span className="badge" style={{ 
                            background: type === "Casual" ? "#e0f7fa" : 
                                      type === "Sick" ? "#ffecec" : "#fff7e6",
                            color: type === "Casual" ? "#00796b" : 
                                  type === "Sick" ? "#d32f2f" : "#f57c00",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontSize: "12px"
                          }}>
                            {type === "Casual" ? emp.casual : type === "Sick" ? emp.sick : emp.earned}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total Section */}
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2" style={{ 
                      borderTop: "1px solid #dee2e6",
                      fontSize: "14px"
                    }}>
                      <span style={{ fontWeight: "600", color: "#0d47a1" }}>Total Balance</span>
                      <span style={{ fontWeight: "700", color: "#0d47a1", fontSize: "16px" }}>
                        {emp.casual + emp.sick + emp.earned}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}