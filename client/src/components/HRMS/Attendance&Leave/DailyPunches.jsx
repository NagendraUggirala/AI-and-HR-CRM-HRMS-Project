import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrump from "../../Layout/Breadcrump";

function DailyPunches() {
  const businessUnit = ["All Units", "Default Business Units"];
  const locations = [
    "All Locations",
    "Hyderabad",
    "Chennai",
    "Mumbai",
    "Kerala",
  ];
  const costCenters = [
    "All Cost Centers",
    "Associate Software Engineer",
    "Hr Executive",
  ];
  const departments = [
    "All Departments",
    "OD Team",
    "Product Development Team",
    "Technical Support",
  ];
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [punchesData, setPunchesData] = useState([
    {
      id: 1,
      name: "Burri Gowtham",
      code: "LEV092",
      designation: "Associate Software Engineer",
      start: "09:01:49AM",
      end: "06:01:49PM",
      duration: "0:00",
      attendance: "P",
      attendanceColor: "primary",
      registeredFace: "/assets/img/users/user-11.jpg",
      punchImage: "/assets/img/users/user-11.jpg",
      locationUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2667144226825!2d78.38363737377158!3d17.446943901089455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910d8d1c4f8b%3A0x6ef1b184af90fa3f!2sCapital%20Park!5e0!3m2!1sen!2sin!4v1756977794236!5m2!1sen!2sin",
    },
    {
      id: 2,
      name: "Chodisetti Sri Rama Sai",
      code: "LEV081",
      designation: "Associate Software Engineer",
      start: "09:12:46",
      end: "",
      duration: "0:00",
      attendance: "P",
      attendanceColor: "info",
      registeredFace: "/assets/img/users/user-01.jpg",
      punchImage: "/assets/img/users/user-01.jpg",
      locationUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2667144226825!2d78.38363737377158!3d17.446943901089455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910d8d1c4f8b%3A0x6ef1b184af90fa3f!2sCapital%20Park!5e0!3m2!1sen!2sin!4v1756977794236!5m2!1sen!2sin",
    },
    {
      id: 3,
      name: "Dheeraj Krishna Jakkula",
      code: "LEV079",
      designation: "Associate Software Engineer",
      start: "08:55:28",
      end: "",
      duration: "0:00",
      attendance: "P",
      attendanceColor: "info",
      registeredFace: "/assets/img/users/user-37.jpg",
      punchImage: "/assets/img/users/user-37.jpg",
      locationUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2667144226825!2d78.38363737377158!3d17.446943901089455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910d8d1c4f8b%3A0x6ef1b184af90fa3f!2sCapital%20Park!5e0!3m2!1sen!2sin!4v1756977794236!5m2!1sen!2sin",
    },
    {
      id: 4,
      name: "Dubbaka Bharath",
      code: "LEV085",
      designation: "Associate Software Engineer",
      start: "09:02:58",
      end: "",
      duration: "0:00",
      attendance: "P",
      attendanceColor: "info",
      registeredFace: "/assets/img/users/.jpg",
      punchImage: "/assets/img/users/.jpg",
      locationUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2667144226825!2d78.38363737377158!3d17.446943901089455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb910d8d1c4f8b%3A0x6ef1b184af90fa3f!2sCapital%20Park!5e0!3m2!1sen!2sin!4v1756977794236!5m2!1sen!2sin",
    },
  ]);
  const [filter, setFilter] = useState({
    businessUnit: "All Business Units",
    location: "All Locations",
    costCenter: "All Cost Centers",
    department: "All Departments",
  });
  const [selectedPunchFilter, setSelectedPunchFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("dd-mm-yyyy");
  const [selectedPunch, setSelectedPunch] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const onPunchFilterChange = (e) => setSelectedPunchFilter(e.target.value);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const handleView = () => {
    toast.info(`👀 Viewing punches for ${selectedDate}`);
    console.log("View:", selectedDate, selectedPunchFilter);
  };

  const filteredPunches = punchesData.filter((p) => {
    const searchLower = (filter.search || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    const code = (p.code || "").toLowerCase();

    return name.includes(searchLower) || code.includes(searchLower);
  });
  const punchData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    code: `EMP${i + 1}`,
  }));

  // State

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = 5; // show max 5 pages

  // Handle search input
  const handleSearchChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
    setCurrentPage(1); // reset to page 1 on search
  };

  // Paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredPunches.slice(startIndex, endIndex);
  const [jumpPage, setJumpPage] = useState("");

  // Page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // IMPORT CSV FUNCTION (NO LIBS)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split("\n").filter((line) => line.trim() !== "");

      const headers = lines[0].split(",").map((h) => h.trim());
      const rows = lines.slice(1);

      const importedData = rows.map((line, idx) => {
        const values = line.split(",").map((v) => v.trim());
        const punch = {};

        headers.forEach((header, i) => {
          punch[header] = values[i] || "";
        });

        return {
          id: punchesData.length + idx + 1,
          name: punch.name,
          code: punch.code,
          designation: punch.designation || "",
          start: punch.start || "",
          end: punch.end || "",
          duration: punch.duration || "",
          attendance: punch.attendance || "P",
          attendanceColor: "info",
          registeredFace: "/assets/img/users/user-01.jpg",
          punchImage: "/assets/img/users/user-01.jpg",
          locationUrl: punch.locationUrl || "",
        };
      });

      setPunchesData((prev) => [...prev, ...importedData]);
      toast.success("CSV imported successfully!");
    };

    reader.readAsText(file);
  };

  // EXPORT CSV FUNCTION (NO LIBS)
  const handleExport = () => {
    if (!punchesData.length) return toast.error("No data to export!");

    const headers = Object.keys(punchesData[0]);
    const csvRows = [headers.join(",")];

    punchesData.forEach((row) => {
      const values = headers.map((header) => {
        const val = row[header] ? row[header].toString() : "";
        return `"${val.replace(/"/g, '""')}"`; // Escape quotes
      });
      csvRows.push(values.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "daily_punches_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported successfully!");
  };

  // Format to "DD/MM/YYYY" (e.g., "07/1/2026")
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const month = formatDate(currentMonthDate);

  // Modify handleMonthChange to move by one day instead of one month
  const handleMonthChange = (direction) => {
    setCurrentMonthDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === "prev") {
        newDate.setDate(newDate.getDate() - 1); // Go to previous day
      } else if (direction === "next") {
        newDate.setDate(newDate.getDate() + 1); // Go to next day
      }

      // Update selectedDate (format as "dd-mm-yyyy")
      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();
      setSelectedDate(`${day}-${month}-${year}`);

      return newDate;
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate(); // last day of the month
  };

  return (
    <div>
      <div className="d-flex align-items-center text-muted">
    
      </div>

      <div className="d-md-flex d-block align-items-center justify-content-between mb-3 mt-3">
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Daily Punches</div>
          <div style={{ color: "#6B7280", fontSize:"0.85rem" }}>
            View or edit daily time punches for a single date.
          </div>
        </div>
        <div>
          <div className="dropdown">
            <button
              className="btn btn-primary  btn-sm"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Options<i className="fe fe-chevron-down m-1"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
      </div>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-2">
          <label>Business Unit</label>
          <select
            className="form-select"
            name="businessUnit"
            value={filter.businessUnit}
            onChange={handleFilterChange}
          >
            {businessUnit.map((b, i) => (
              <option key={i}>{b}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label>Location</label>
          <select
            className="form-select"
            name="location"
            value={filter.location}
            onChange={handleFilterChange}
          >
            {locations.map((loc, i) => (
              <option key={i}>{loc}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label>Cost Center</label>
          <select
            className="form-select"
            name="costCenter"
            value={filter.costCenter}
            onChange={handleFilterChange}
          >
            {costCenters.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label>Departments</label>
          <select
            className="form-select"
            name="department"
            value={filter.department}
            onChange={handleFilterChange}
          >
            {departments.map((d, i) => (
              <option key={i}>{d}</option>
            ))}
          </select>
        </div>
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
              onChange={onPunchFilterChange}
            />
            <label className="form-check-label">{f.label}</label>
          </div>
        ))}
      </div>
      <div className="d-flex gap-2 mt-2">
        <div
          className="d-inline-flex border rounded overflow-hidden"
          style={{ height: "35px" }}
        >
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={() => handleMonthChange("prev")}
            style={{ borderRadius: 0, border: "none" }}
          >
            <i className="fe fe-arrow-left"></i>
          </button>

          <div className="px-4 py-2 bg-light fw-semibold text-center d-flex align-items-center justify-content-center">
            {month}
          </div>

          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={() => handleMonthChange("next")}
            style={{ borderRadius: 0, border: "none" }}
          >
            <i className="fe fe-arrow-right"></i>
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
            style={{ height: "35px" }}
          />
          <button
            className="btn btn-primary"
            style={{ height: "35px" }}
            onClick={handleView}
          >
            <i className="fe fe-search me-1"></i> View
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card mt-3" style={{width: "100%"}}>
         <table className="table table-responsive table-hover mt-3">
        <thead>
          <tr>
            <th>SN</th>
            <th className="col-md-2">Employee</th>
            <th className="col-md-2">Designation</th>
            <th className="col-md-2 text-center">Start</th>
            <th className="col-md-1">End</th>
            <th className="col-md-1 text-center">Duration</th>
            <th className="col-md-2 text-center">Attendance</th>
            <th className="col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((p, i) => (
              <tr key={p.id}>
                <td>{startIndex + i + 1}</td>

                <td>
                  <strong className="align-middle" style={{fontWeight: "600", color: "#000"}}>{p.name}</strong> <br /> <small>{p.code}</small>
                </td>
                <td>
                  {" "}
                  <b style={{ fontWeight: "500" }}> {p.designation}</b>{" "}
                </td>
                <td className="text-center">
                  {/* Icon before based on employee ID */}
                  <i
                    className="fe fe-camera text-primary m-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModal(true)}
                  ></i>

                  {/* Start time */}
                  <span>{p.start}</span>
                  <i
                    className="fe fe-map-pin text-success m-1"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={`#afterModal${p.id}`}
                  ></i>

                  {/* After Icon Modal */}
                  <div
                    className="modal fade"
                    id={`afterModal${p.id}`}
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            <i className="fe fe-map-pin"></i> Punch Location
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="ratio ratio-16x9">
                            <iframe
                              src={p.locationUrl}
                              width="600"
                              height="450"
                              style={{ border: 0 }}
                              allowFullScreen=""
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <i
                    className="fe fe-camera text-primary m-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModal(true)}
                  ></i>
                  {p.end}{" "}
                  <i
                    className="fe fe-map-pin text-success m-1"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target={`#afterModal${p.id}`}
                  ></i>
                </td>
                <td className="text-center">{p.duration}</td>
                <td className="text-center">
                  <div
                    className="d-inline-block p-1 small"
                    style={{
                      width: "40px",
                      height: "25px",
                      backgroundColor: "#7ADCE7",
                      color: "#000"
                    }}
                  >
                    {p.attendance}
                  </div>
                  <span className={`badge bg-${p.attendanceColor}`}></span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <div>
                      <button
                        className="btn btn-sm btn-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                        data-bs-toggle="modal"
                        data-bs-target={`#addTimePunchModal${p.id}`}
                        onClick={() => setSelectedPunch(p)}
                        title="Add Punch"
                      >
                        <i className="fe fe-plus" style={{ fontSize: "14px" }}></i>
                      </button>

                      {/* Add Time Punch Modal */}
                      <div
                        className="modal fade"
                        id={`addTimePunchModal${p.id}`}
                        tabIndex="-1"
                        aria-labelledby="addTimePunchLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title fw-bold">
                                Add Time Punch
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="row mb-3">
                                  <label className="col-sm-4 col-form-label">
                                    Employee Name
                                  </label>
                                  <div className="col-sm-8 d-flex align-items-center fw-semibold">
                                    {p.name}
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-4 col-form-label">
                                    Punch Date{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-8">
                                    <input
                                      type="date"
                                      className="form-control"
                                      defaultValue={selectedDate}
                                    />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-4 col-form-label">
                                    Punch Time{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-sm-8 d-flex gap-2">
                                    <select
                                      className="form-select"
                                      style={{
                                        width: "60px",
                                        height: "35px",
                                        padding: "0.25rem 0.5rem",
                                        fontSize: "0.875rem",
                                        minWidth: "60px",
                                      }}
                                    >
                                      {[...Array(24).keys()].map((h) => (
                                        <option key={h}>
                                          {h.toString().padStart(2, "0")}
                                        </option>
                                      ))}
                                    </select>

                                    <select
                                      className="form-select"
                                      style={{
                                        width: "60px",
                                        height: "35px",
                                        padding: "0.25rem 0.5rem",
                                        fontSize: "0.875rem",
                                        minWidth: "60px",
                                      }}
                                    >
                                      {[...Array(60).keys()].map((m) => (
                                        <option key={m}>
                                          {m.toString().padStart(2, "0")}
                                        </option>
                                      ))}
                                    </select>

                                    <select
                                      className="form-select"
                                      style={{
                                        width: "60px",
                                        height: "35px",
                                        padding: "0.25rem 0.5rem",
                                        fontSize: "0.875rem",
                                        minWidth: "60px",
                                      }}
                                    >
                                      {[...Array(60).keys()].map((s) => (
                                        <option key={s}>
                                          {s.toString().padStart(2, "0")}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <small className="text-muted text-center ms-4">
                                    (24-Hour format)
                                  </small>
                                </div>
                                <div className="row mb-3">
                                  <label className="col-sm-4 col-form-label">
                                    Remarks
                                  </label>
                                  <div className="col-sm-8">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button type="button" className="btn btn-primary">
                                Insert
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Inline Dropdown */}
                    <div className="d-flex gap-2">
                      <div>
                        <button
                          className="btn btn-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "32px", height: "32px" }}
                          data-bs-toggle="modal"
                          data-bs-target={`#allPunchesModal${p.id}`}
                          onClick={() => setSelectedPunch(p)}
                          title="View All Punches"
                        >
                          <i className="fe fe-more-horizontal" style={{ fontSize: "14px" }}></i>
                        </button>
                      </div>

                      {/* All Punches Modal */}

                      <div
                        className="modal fade"
                        id={`allPunchesModal${p.id}`}
                        tabIndex="-1"
                        aria-labelledby="punchModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">All Punches</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <h6>
                                {p.name}{" "}
                                <small className="text-muted">({p.code})</small>
                              </h6>
                              <p className="text-muted">{selectedDate}</p>
                              <div className="card border w-100 mb-2">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                  <div>
                                    <h6 className="mb-1">
                                      <i className="fe fe-camera text-danger"></i>{" "}
                                      <strong>{p.start}</strong>
                                    </h6>
                                    <small className="text-muted">
                                      Selfie Punch - Face detected with{" "}
                                      <b>100%</b> confidence
                                    </small>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <span className="badge bg-success">IN</span>
                                    <button className="btn btn-sm btn-outline-danger">
                                      <i className="fe fe-trash-2"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <small className="text-muted">
                                <i className="fe fe-info"></i> All punches for
                                selected date are shown (no allocation by shift)
                              </small>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-link text-primary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
     

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
      />

      <nav className="mt-3">
        <ul className="pagination justify-content-center gap-1 mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fe fe-chevron-left"></i>
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button 
                className="page-link" 
                onClick={() => goToPage(i + 1)}
                style={{ minWidth: "40px", textAlign: "center" }}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fe fe-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-3 mb-1 small text-dark">Punch Legend:</div>
      <div
        className="d-flex bg-info-subtle flex-wrap align-items-center px-1 py-1 rounded"
        style={{ fontSize: "12px" }}
      >
        <div className="me-1 mb-1 mt-1 small badge rounded-pill text-dark bg-white">
          <i className="fe fe-send text-info me-1"></i> Remote
        </div>
        <div className="me-1 mb-1 mt-1 small badge rounded-pill text-dark bg-white">
          <i className="fe fe-camera text-danger me-1"></i> Selfie
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-globe text-success me-1"></i> Web/Chat
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-grid text-dark me-1"></i> QR Scan
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-fingerprint text-dark me-1"></i> Biometric Fetch
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-refresh-cw text-warning me-1"></i> Biometric Sync
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-edit text-muted me-1"></i> Manual
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-file-text text-success me-1"></i> Excel Import
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-clock text-danger me-1"></i> Missed
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-clock text-warning me-1"></i> Time Relax
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-truck text-primary me-1"></i> Travel
        </div>
        <div className="me-1 mb-1 mt-1 small badge px-2 rounded-pill text-dark bg-white">
          <i className="fe fe-power text-success me-1"></i> API
        </div>
      </div>
      <div
        className="d-inline-block bg-info-subtle px-2 py-1 rounded mt-2 mb-2"
        style={{ fontSize: "13px" }}
      >
        <span className="mb-1 mt-1 badge bg-white rounded-pill text-success me-2">
          XX - Processed
        </span>
        <span className="mb-1 mt-1 badge bg-white rounded-pill text-danger me-2">
          XX - Pending
        </span>
      </div>

       {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <h5 className="modal-title">Selfie Punch Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body d-flex justify-content-center gap-3">
                <div className="mt-2 text-center">
                     <img
                  src="https://placehold.co/150x150.png?text=?"
                  alt="Dummy 1"
                  className="rounded shadow"
                />
                  <p className="mt-1">Registered Face</p>
                </div>
             
              <div className="mt-2 text-center">
                    <img
                  src="https://placehold.co/150x150.png?text=?"
                  alt="Dummy 2"
                  className="rounded shadow"
                />
                <p className="mt-1">Punch Image</p>
              </div>
              
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyPunches;
