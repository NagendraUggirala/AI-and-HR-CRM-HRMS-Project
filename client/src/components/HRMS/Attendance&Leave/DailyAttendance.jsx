import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Breadcrump from "../../Layout/Breadcrump";


const punchTypes = [
  { label: "Selfie", value: "selfie" },
  { label: "Remote", value: "remote" },
  { label: "Manual", value: "manual" },
];

const DailyAttendance = () => {
  const [filter, setFilter] = useState({
    businessUnit: "All Units",
    location: "All",
    costCenter: "All",
    department: "All",
    search: "",
  });
  const [selectedPunchFilter, setSelectedPunchFilter] = useState("all");
  const [date, setDate] = useState("08-Oct-2025");
  const [showPunchModal, setShowPunchModal] = useState(false);
  const [showAddPunchModal, setShowAddPunchModal] = useState(false);
  const [punchDate, setPunchDate] = useState("");
  const [punchTime, setPunchTime] = useState({ hh: "", mm: "", ss: "" });
  const [punchType, setPunchType] = useState("selfie");
  const [remarks, setRemarks] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Dummy Data
  const attendanceData = [
    {
      id: 209187,
      name: "Anusha Engilala",
      code: "LEV039",
      date: "08-Oct-2025",
      status: "Present",
      note: "Present marked as at least one time-punch was found",
      location: "Hyderabad",
      designation: "Associate Software Engineer",
      department: "Technical Support",
      punchIn: "09:17A",
      punchOut: "06:05P",
      punchType: "Selfie",
      timeline: { start: "03:00A", general: "09:00A - 06:00P", end: "12:00A" },
    },
  ];

  const businessUnit = ["All Units", "Development", "Support"];
  const locations = ["All", "Hyderabad", "Chennai"];
  const costCenters = ["All", "Cost-1", "Cost-2"];
  const departments = ["All", "Technical", "Support", "HR"];

  // Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleDateChange = (type) => {
    setDate(type === "next" ? "09-Oct-2025" : "07-Oct-2025");
  };

  const handleView = () => {
    toast.info("Filter applied successfully");
  };

  const handleFileUpload = () => {
    toast.success("File uploaded successfully");
  };

  const handleExport = () => {
    toast.success("Exported successfully");
  };

  return (
    <div className="page-content" style={{ padding: "25px 0" }}>
      <ToastContainer />
      
      <div className="container-fluid">
        {/* Header */}
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3 mt-3">
          <div>
            <h4 className="fw-bold mb-1">Daily Attendance</h4>
            <p className="text-muted mb-0">
              View or edit daily time punches for a single date.
            </p>
          </div>
          <div className="dropdown">
            <button
              className="btn btn-primary btn-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Options <i className="fe fe-chevron-down m-1"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <label className="dropdown-item" style={{ cursor: "pointer" }}>
                  <i className="fe fe-upload m-1"></i>Upload
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleExport}>
                  <i className="fe fe-download m-1"></i>Download
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-3">
          {[
            {
              name: "businessUnit",
              label: "Business Unit",
              options: businessUnit,
            },
            { name: "location", label: "Location", options: locations },
            { name: "costCenter", label: "Cost Center", options: costCenters },
            { name: "department", label: "Departments", options: departments },
          ].map((field, idx) => (
            <div className="col-md-3" key={idx}>
              <label>{field.label}</label>
              <select
                className="form-select"
                name={field.name}
                value={filter[field.name]}
                onChange={handleFilterChange}
              >
                {field.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Radio Filters */}
        <div className="mt-3">
          {[
            { label: "Show All", value: "all" },
            { label: "Late Coming Only", value: "late" },
            { label: "Absent Only", value: "absent" },
            { label: "No Punches", value: "nopunch" },
          ].map((f) => (
            <div key={f.value} className="form-check form-check-inline">
              <input
                type="radio"
                name="selectedPunchFilter"
                value={f.value}
                className="form-check-input"
                checked={selectedPunchFilter === f.value}
                onChange={(e) => setSelectedPunchFilter(e.target.value)}
              />
              <label className="form-check-label">{f.label}</label>
            </div>
          ))}
        </div>

        {/* Date Navigation + Search */}
        <div className="d-flex gap-3 mt-3">
          <div
            className="d-inline-flex border rounded overflow-hidden"
            style={{ height: "35px" }}
          >
            <button
              className="btn btn-primary"
              onClick={() => handleDateChange("prev")}
            >
              <i className="fe fe-arrow-left-circle"></i>
            </button>
            <div className="px-4 py-2 bg-light fw-semibold">{date}</div>
            <button
              className="btn btn-primary"
              onClick={() => handleDateChange("next")}
            >
              <i className="fe fe-arrow-right-circle"></i>
            </button>
          </div>

          <div className="input-group w-25">
            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="All Employees"
              value={filter.search}
              onChange={handleFilterChange}
            />
            <button className="btn btn-primary" onClick={handleView}>
              <i className="fe fe-search"></i> View
            </button>
          </div>
        </div>

        {/* Attendance Cards */}
        <div className="mt-4">
          {attendanceData.map((emp) => (
            <div
              key={emp.id}
              className="card mb-3 shadow-sm"
              style={{ width: "100%", borderRadius: 10 }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
                  <div className="text-dark">
                    <strong>{emp.name}</strong> ({emp.code})
                  </div>
                  <div className="text-dark d-flex flex-wrap">
                    <span className="me-3">
                      <i className="fe fe-map-pin text-danger me-1"></i>
                      {emp.location}
                    </span>
                    <span className="me-3">
                      <i className="fe fe-briefcase text-warning me-1"></i>
                      {emp.designation}
                    </span>
                    <span className="me-3">
                      <i className="fe fe-home text-primary me-1"></i>
                      {emp.department}
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-top mt-2 pt-2">
                  <div className="row align-items-center">
                    <div className="col-md-3 mb-2">
                      <span className="text-primary">{emp.date}</span>
                      <br />
                      <small>
                        <strong>{emp.status}</strong>
                        <br />
                        {emp.note}
                      </small>
                    </div>
                    <div className="col-md-6 mb-2">
                      <div className="text-center text-dark mb-1">
                        <small>General</small>
                      </div>
                      <div className="d-flex">
                        <div style={{ width: "15%" }}>
                          <div className="small">{emp.timeline.start}</div>
                          <div
                            className="bg-success"
                            style={{ height: 5 }}
                          ></div>
                          <div className="small text-primary mt-1">
                            {emp.punchIn}
                          </div>
                        </div>
                        <div style={{ width: "70%" }}>
                          <div className="d-flex justify-content-between">
                            <div className="small">09:00A</div>
                            <div className="small">06:00P</div>
                          </div>
                          <div
                            className="bg-primary"
                            style={{ height: 5 }}
                          ></div>
                        </div>
                        <div style={{ width: "15%" }}>
                          <div className="small text-end">
                            {emp.timeline.end}
                          </div>
                          <div
                            className="bg-warning"
                            style={{ height: 5 }}
                          ></div>
                          <div className="small text-end text-success mt-1">
                            {emp.punchOut} ({emp.punchType})
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 d-flex gap-3 justify-content-end">
                      <div className="text-start">
                        In-Time:{" "}
                        <strong className="text-primary">8 h 35 m</strong>
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-outline-success rounded-pill btn-sm me-2"
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setShowAddPunchModal(true);
                          }}
                        >
                          <i className="fe fe-plus"></i>
                        </button>
                        <button
                          className="btn btn-outline-info rounded-pill btn-sm"
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setShowPunchModal(true);
                          }}
                        >
                          <i className="fe fe-more-horizontal"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Punch Modal */}
        {showPunchModal && selectedEmployee && (
          <div
            className="modal fade show d-block"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    All Punches - {selectedEmployee.name} (
                    {selectedEmployee.code})
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPunchModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <ul className="list-group list-group-bordered mb-2">
                    <li className="list-group-item">
                      <div className="row w-100">
                        <div className="col-8">
                          <strong>08:40:16</strong>
                          <br />
                          <small>Remote Punch</small>
                        </div>
                        <div className="col-2 text-center">
                          <span className="badge bg-success">IN</span>
                        </div>
                        <div className="col-2 text-end">
                          <button className="btn btn-sm btn-danger">
                            <i className="fe fe-trash-2"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row w-100">
                        <div className="col-8">
                          <strong>18:00:12</strong>
                          <br />
                          <small>Remote Punch</small>
                        </div>
                        <div className="col-2 text-center">
                          <span className="badge bg-warning text-dark">
                            OUT
                          </span>
                        </div>
                        <div className="col-2 text-end">
                          <button className="btn btn-sm btn-danger">
                            <i className="fe fe-trash-2"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-3 small text-dark">
                    <i className="fe fe-info me-1"></i> All punches for selected
                    date are shown.
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowPunchModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Punch Modal */}
        {showAddPunchModal && selectedEmployee && (
          <div
            className="modal fade show d-block"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Time Punch </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddPunchModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label className="from-label fw-semibold">
                        Employee Name:
                      </label>
                    </div>
                    <div className="col-md-6 ">
                      <h5 className="fw-semibold"> {selectedEmployee.name}</h5>
                      <p>{selectedEmployee.id}</p>
                    </div>
                  </div>
                  <div className="row g-3 mb-2">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Punch Date <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="date"
                        className="form-control"
                        value={punchDate}
                        onChange={(e) => setPunchDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Punch Time <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-md-7">
                      <div className="d-flex align-items-center gap-2">
                        {["hh", "mm", "ss"].map((field) => (
                          <input
                            key={field}
                            type="number"
                            className="form-control"
                            placeholder={field.toUpperCase()}
                            value={punchTime[field]}
                            onChange={(e) =>
                              setPunchTime((prev) => ({
                                ...prev,
                                [field]: e.target.value,
                              }))
                            }
                            style={{ width: "80px" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Remarks <span className="text-danger">*</span>{" "}
                      </label>
                    </div>
                    <div className="col-md-7">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter remarks (optional)"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="row gap-5">
                    <div className="col-lg-3 text-start">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowAddPunchModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-lg-3 text-end">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          const finalTime = `${punchTime.hh.padStart(
                            2,
                            "0"
                          )}:${punchTime.mm.padStart(
                            2,
                            "0"
                          )}:${punchTime.ss.padStart(2, "0")}`;
                          toast.success(
                            `Punch Added: ${punchDate} ${finalTime} (${punchType})`
                          );
                          setShowAddPunchModal(false);
                        }}
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyAttendance;
