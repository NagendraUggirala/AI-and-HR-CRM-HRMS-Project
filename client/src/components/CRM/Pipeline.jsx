import { React, useState } from "react";
import {
  FaHome,
  FaBox,
  FaHeartbeat,
  FaPauseCircle,
  FaMask,
  FaList,
  FaTh,
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
  FaChevronUp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pipeline = () => {
  const [pipelines] = useState([
    {
      name: "Sales",
      value: "$4,50,000",
      deals: 315,
      stage: "Won",
      stageColor: "success",
      date: "14 Jan 2024",
      status: "Active",
    },
    {
      name: "Marketing",
      value: "$3,15,000",
      deals: 447,
      stage: "In Pipeline",
      stageColor: "primary",
      date: "21 Jan 2024",
      status: "Active",
    },
    {
      name: "Email",
      value: "$6,10,000",
      deals: 545,
      stage: "Conversation",
      stageColor: "info",
      date: "15 Mar 2024",
      status: "Active",
    },
    {
      name: "Operational",
      value: "$5,50,000",
      deals: 787,
      stage: "Follow Up",
      stageColor: "warning",
      date: "20 Apr 2024",
      status: "Active",
    },
    {
      name: "Identify",
      value: "$7,40,000",
      deals: 128,
      stage: "Lost",
      stageColor: "danger",
      date: "10 Dec 2024",
      status: "Active",
    },

    // 🔽 Extra Pipelines
    {
      name: "Collaborative",
      value: "$5,00,000",
      deals: 315,
      stage: "Won",
      stageColor: "success",
      date: "06 Jul 2024",
      status: "Inactive",
    },
    {
      name: "Calls",
      value: "$8,40,000",
      deals: 654,
      stage: "Won",
      stageColor: "success",
      date: "20 Feb 2024",
      status: "Active",
    },
    {
      name: "Interact",
      value: "$6,20,000",
      deals: 664,
      stage: "Won",
      stageColor: "success",
      date: "15 Nov 2024",
      status: "Active",
    },
    {
      name: "Chats",
      value: "$4,70,000",
      deals: 787,
      stage: "Won",
      stageColor: "success",
      date: "12 Apr 2024",
      status: "Active",
    },
    {
      name: "Differentiate",
      value: "$4,50,000",
      deals: 478,
      stage: "Schedule Service",
      stageColor: "secondary",
      date: "02 Sep 2024",
      status: "Active",
    },
  ]);

  // filters + pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [plansPerPage, setPlansPerPage] = useState(5);

  // date filter
  const [dateFilter, setDateFilter] = useState(
    `${dayjs().format("MM/DD/YYYY")} - ${dayjs().format("MM/DD/YYYY")}`
  );

  const handleDateSelect = (option) => {
    const today = dayjs();
    let start, end;

    switch (option) {
      case "Today":
        start = today;
        end = today;
        break;
      case "Yesterday":
        start = today.subtract(1, "day");
        end = today.subtract(1, "day");
        break;
      case "Last 7 Days":
        start = today.subtract(6, "day");
        end = today;
        break;
      case "Last 30 Days":
        start = today.subtract(29, "day");
        end = today;
        break;
      case "This Year":
        start = today.startOf("year");
        end = today;
        break;
      case "Next Year":
        start = today.add(1, "year").startOf("year");
        end = today.add(1, "year").endOf("year");
        break;
      default:
        start = today;
        end = today;
        break;
    }
    setDateFilter(
      `${start.format("MM/DD/YYYY")} - ${end.format("MM/DD/YYYY")}`
    );
  };

  // filter plans
  const filteredPipelines = pipelines.filter((pipe) =>
    pipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort plans
  if (sortOption === "asc") {
    filteredPipelines.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "desc") {
    filteredPipelines.sort((a, b) => b.name.localeCompare(a.name));
  }

  // pagination logic
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPipelines.slice(
    indexOfFirstPlan,
    indexOfLastPlan
  );
  const totalPages = Math.ceil(filteredPipelines.length / plansPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // 🔹 Toast handlers
  const handleAddPlan = () => toast.success("New pipeline added!");
  const handleEditPlan = (name) => toast.info(`Editing ${name} pipeline...`);
  const handleDeletePlan = (name) => toast.error(`${name} pipeline deleted!`);
  const handleExport = (format) => toast.success(`Exported as ${format}`);

  return (
    <div className=" ">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      <div>
      
                  
      
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div>
            <h3>
              Pipeline
            </h3>
          </div>
          <div>

          {/* Right Actions */}
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            {/* Export Dropdown */}
            <div className="me-2 mb-2">
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center fs-7"
                  data-bs-toggle="dropdown"
                >
                  <i className="me-1">
                    <FaFilePdf />
                  </i>
                  Export{" "}
                  <i
                    className="fe fe-chevron-down"
                    data-bs-toggle="tooltip"
                    aria-label="fe fe-chevron-down"
                    data-bs-original-title="fe fe-chevron-down"
                  ></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <button
                      onClick={() => handleExport("PDF")}
                      className="dropdown-item rounded-1"
                    >
                      <FaFilePdf className="me-1" /> Export as PDF
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleExport("Excel")}
                      className="dropdown-item rounded-1"
                    >
                      <FaFileExcel className="me-1" /> Export as Excel
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Add New Pipeline */}
            <div className="mb-2">
              <button
                className="btn btn-primary d-flex align-items-center fs-7"
                data-bs-toggle="modal"
                data-bs-target="#add_pipeline"
                onClick={handleAddPlan}
              >
                <FaPlusCircle className="me-2" />
                <small>Add Pipeline</small>
              </button>
            </div>
            </div>

            {/* Collapse */}
            <div className="ms-2 head-icons">
              <a
                href="#!"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Collapse"
              >
                <FaChevronUp />
              </a>
            </div>
          </div>
        </div>

        {/* 🔹 Filters Section */}
        <div className="card my-4 w-100">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <h5>
              <strong>Pipeline List</strong>
            </h5>
            <div className="d-flex flex-wrap row-gap-2">
              {/* Date Range */}
              <div className="dropdown me-2">
                <button
                  className="dropdown-toggle btn btn-white"
                  data-bs-toggle="dropdown"
                >
                  {dateFilter}
                  <i class="fe fe-chevron-down"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-2">
                  {[
                    "Today",
                    "Yesterday",
                    "Last 7 Days",
                    "Last 30 Days",
                    "This Year",
                    "Next Year",
                  ].map((opt) => (
                    <li key={opt}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleDateSelect(opt)}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan Type */}
              <div className="dropdown me-2">
                <button
                  className="dropdown-toggle  btn btn-white"
                  data-bs-toggle="dropdown"
                >
                  {selectedPlan || "Stage"}
                  <i
                    class="fe fe-chevron-down"
                    data-bs-toggle="tooltip"
                    aria-label="fe fe-chevron-down"
                    data-bs-original-title="fe fe-chevron-down"
                  ></i>
                </button>
                <ul className="dropdown-menu p-2">
                  <li>
                    <button className="dropdown-item">Won</button>
                  </li>
                  <li>
                    <button className="dropdown-item">In Pipeline</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Conversation</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Follow up</button>
                  </li>
                </ul>
              </div>

              {/* Plan Type */}
              <div className="dropdown me-2">
                <button
                  className="dropdown-toggle  btn btn-white"
                  data-bs-toggle="dropdown"
                >
                  {selectedPlan || "$0.0-$0.0"}
                  <i
                    class="fe fe-chevron-down"
                    data-bs-toggle="tooltip"
                    aria-label="fe fe-chevron-down"
                    data-bs-original-title="fe fe-chevron-down"
                  ></i>
                </button>
                <ul className="dropdown-menu p-2">
                  <li>
                    <button className="dropdown-item">$10-$20</button>
                  </li>
                  <li>
                    <button className="dropdown-item">$20-$30</button>
                  </li>
                  <li>
                    <button className="dropdown-item">$30-$40</button>
                  </li>
                </ul>
              </div>

              {/* Status */}
              <div className="dropdown me-2">
                <button
                  className="dropdown-toggle btn btn-white"
                  data-bs-toggle="dropdown"
                >
                  {selectedStatus || "Select Status"}
                  <i
                    class="fe fe-chevron-down"
                    data-bs-toggle="tooltip"
                    aria-label="fe fe-chevron-down"
                    data-bs-original-title="fe fe-chevron-down"
                  ></i>
                </button>
                <ul className="dropdown-menu p-2">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedStatus("Active")}
                    >
                      Active
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedStatus("Inactive")}
                    >
                      Inactive
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedStatus("")}
                    >
                      All
                    </button>
                  </li>
                </ul>
              </div>

              {/* Sort */}
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn btn-white"
                  data-bs-toggle="dropdown"
                >
                  {sortOption === "asc"
                    ? "Ascending"
                    : sortOption === "desc"
                    ? "Descending"
                    : "Sort By : Last 7 Days"}
                  <i
                    class="fe fe-chevron-down"
                    data-bs-toggle="tooltip"
                    aria-label="fe fe-chevron-down"
                    data-bs-original-title="fe fe-chevron-down"
                  ></i>
                </button>
                <ul className="dropdown-menu p-2">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSortOption("asc")}
                    >
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSortOption("desc")}
                    >
                      Descending
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setSortOption("")}
                    >
                      Default
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 🔹 Search */}
          <div className="px-3 pb-3">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: "300px" }}
              placeholder="Search plan..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* 🔹 Table */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-center">
                    <input type="checkbox" />
                  </th>
                  <th>Pipeline Name</th>
                  <th>Total Deal Value</th>
                  <th>No of Deals</th>
                  <th style={{ width: "250px;" }}>Stages</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((pipe, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>
                      <b>{pipe.name}</b>
                    </td>
                    <td>{pipe.value}</td>
                    <td>{pipe.deals}</td>
                    <td>
                      {/* Stage with fixed-size progress bar + text side by side */}
                      <div className="d-flex align-items-center">
                        <div
                          className="progress"
                          style={{ width: "80px", height: "6px" }}
                        >
                          <div
                            className={`progress-bar bg-${pipe.stageColor}`}
                            role="progressbar"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <span
                          className="ms-2 small text-nowrap"
                          style={{
                            width: "80px",
                            display: "inline-block",
                            fontSize: "14px",
                          }}
                        >
                          {pipe.stage}
                        </span>
                      </div>
                    </td>
                    <td>{pipe.date}</td>
                    <td>
                      <span
                        className={`badge ${
                          pipe.status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {pipe.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_pipeline"
                        onClick={() => handleEditPlan(pipe.name)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm "
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                        onClick={() => handleDeletePlan(pipe.name)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔹 Pagination + Rows per page */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 border-top">
            {/* Rows per page */}
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <label className="me-2">Rows per page:</label>
              <select
                className="form-select form-select-sm"
                style={{ width: "80px" }}
                value={plansPerPage}
                onChange={(e) => {
                  setPlansPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Showing info */}
            <div className="mb-2 mb-md-0">
              Showing {indexOfFirstPlan + 1} –{" "}
              {Math.min(indexOfLastPlan, filteredPipelines.length)} of{" "}
              {filteredPipelines.length}
            </div>

            {/* Pagination controls */}
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages).keys()].map((num) => (
                  <li
                    key={num + 1}
                    className={`page-item ${
                      currentPage === num + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(num + 1)}
                    >
                      {num + 1}
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
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Footer */}
          <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
            <p className="mb-0">2014 - 2025 &copy; SmartHR.</p>
            <p>
              Designed &amp; Developed By{" "}
              <a href="#!" className="text-primary">
                Dreams
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* <!-- Add Pipeline --> */}
       <div className="modal fade" id="add_pipeline">
  <div className="modal-dialog modal-dialog-centered modal-md">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Add Pipeline</h4>
        <button
          type="button"
          className="btn-close custom-btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="ti ti-x"></i>
        </button>
      </div>
      <form>
        <div className="modal-body pb-0">
          <div className="mb-3">
            <label className="form-label">
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Deal Value</label>
            <input type="number" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">No of Deals</label>
            <input type="number" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Stages</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Created Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-control">
              <option>Active</option>
              <option>Inactive</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Actions</label>
            <input type="text" className="form-control" placeholder="Actions or notes" />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light me-2"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Pipeline
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
      {/* <!-- /Add Pipeline --> */}

      {/* <!-- Edit Pipeline --> */}
        <div className="modal fade" id="edit_pipeline">
  <div className="modal-dialog modal-dialog-centered modal-md">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Edit Pipeline</h4>
        <button
          type="button"
          className="btn-close custom-btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="ti ti-x"></i>
        </button>
      </div>
      <form>
        <div className="modal-body pb-0">
          <div className="mb-3">
            <label className="form-label">
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Deal Value</label>
            <input type="number" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">No of Deals</label>
            <input type="number" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Stages</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Created Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-control">
              <option>Active</option>
              <option>Inactive</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Actions</label>
            <input type="text" className="form-control" placeholder="Actions or notes" />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light me-2"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Pipeline
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
      {/* <!-- /Edit Pipeline --> */}

      {/* <!-- Pipeline Access --> */}
      {/* <div className="modal fade" id="pipeline-access">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Pipeline Access</h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form action="https://smarthr.co.in/demo/html/template/pipeline.html">
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="input-icon-end position-relative">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                        <span className="input-icon-addon">
                          <i className="ti ti-search text-gray-7"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="p-2 border br-5">
                        <div className="pipeline-access-items">
                          <div className="d-flex  align-items-center p-2">
                            <div className="form-check  form-check-md me-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                            <div className="d-flex align-items-center file-name-icon">
                              <a
                                href="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <img
                                  src="https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-19.jpg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-12">
                                  <a href="#">Darlee Robertson</a>
                                </h6>
                                <span className="fs-10 fw-normal">
                                  Darlee Robertson
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center p-2">
                            <div className="form-check form-check-md me-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                            <div className="d-flex align-items-center file-name-icon">
                              <a
                                href="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <img
                                  src="https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-20.jpg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-12">
                                  <a href="#">Sharon Roy</a>
                                </h6>
                                <span className="fs-10 fw-normal">
                                  Installer
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center p-2">
                            <div className="form-check form-check-md me-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                            <div className="d-flex align-items-center file-name-icon">
                              <a
                                href="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <img
                                  src="https://smarthr.co.in/demo/html/template/assets/img/profiles/avatar-21.jpg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-12">
                                  <a href="#">Vaughan Lewis</a>
                                </h6>
                                <span className="fs-10 fw-normal">
                                  Senior Manager
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center p-2">
                            <div className="form-check form-check-md me-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                            <div className="d-flex align-items-center file-name-icon">
                              <a
                                href="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <img
                                  src="https://smarthr.co.in/demo/html/template/assets/img/users/user-33.jpg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-12">
                                  <a href="#">Jessica Louise</a>
                                </h6>
                                <span className="fs-10 fw-normal">
                                  Test Engineer
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center p-2">
                            <div className="form-check form-check-md me-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                            </div>
                            <div className="d-flex align-items-center file-name-icon">
                              <a
                                href="#"
                                className="avatar avatar-md border avatar-rounded"
                              >
                                <img
                                  src="https://smarthr.co.in/demo/html/template/assets/img/users/user-34.jpg"
                                  className="img-fluid"
                                  alt="img"
                                />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-medium fs-12">
                                  <a href="#">Test Engineer</a>
                                </h6>
                                <span className="fs-10 fw-normal">
                                  UI /UX Designer
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      {/* <!-- /Pipeline Access --> */}

      {/* <!-- Add New Stage --> */}
    <div className="modal fade" id="add_pipeline">
  <div className="modal-dialog modal-dialog-centered modal-md">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Add Pipeline</h4>
        <button
          type="button"
          className="btn-close custom-btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="ti ti-x"></i>
        </button>
      </div>
      <form>
        <div className="modal-body pb-0">
          <div className="mb-3">
            <label className="form-label">
              Pipeline Name <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Total Deal Value</label>
            <input type="number" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">No of Deals</label>
            <input type="number" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Stages</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Created Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-control">
              <option>Active</option>
              <option>Inactive</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Actions</label>
            <input type="text" className="form-control" placeholder="Actions or notes" />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light me-2"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Pipeline
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

      {/* <!-- /Add New Stage --> */}

      {/* <!-- Edit Stage --> */}
      <div className="modal fade" id="edit_stage">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Stage</h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form action="https://smarthr.co.in/demo/html/template/pipeline.html">
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Edit Name <span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value="Inpipeline"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- /Edit Stage --> */}

      {/* <!-- Delete Modal --> */}
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                <i className="ti ti-trash-x fs-36"></i>
              </span>
              <h4 className="mb-1">Confirm Delete</h4>
              <p className="mb-3">
                You want to delete all the marked items, this cant be undone
                once you delete.
              </p>
              <div className="d-flex justify-content-center">
                <a
                  href="javascript:void(0);"
                  className="btn btn-light me-3"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </a>
                <a
                  href="https://smarthr.co.in/demo/html/template/pipeline.html"
                  className="btn btn-danger"
                >
                  Yes, Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Delete Modal --> */}
    </div>
  );
};

export default Pipeline;
