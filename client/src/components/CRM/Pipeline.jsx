import React, { useState, useEffect } from "react";
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
import { crmPipelinesAPI } from "../../utils/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Pipeline = () => {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPipeline, setEditingPipeline] = useState(null);
  const [deletingPipelineId, setDeletingPipelineId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    deals: "",
    stage: "In Pipeline",
    stage_color: "primary",
    created_date: "",
    status: "Active"
  });

  // Load pipelines from API
  useEffect(() => {
    loadPipelines();
  }, []);

  const loadPipelines = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = {};
      if (selectedStatus) filters.status = selectedStatus;
      if (selectedPlan) filters.stage = selectedPlan;
      
      const data = await crmPipelinesAPI.list(filters);
      if (Array.isArray(data)) {
        setPipelines(data);
      } else {
        setPipelines([]);
      }
    } catch (err) {
      console.error("Error loading pipelines:", err);
      const errorMessage = err.message || err.detail || "Failed to load pipelines. Please ensure the backend API is running.";
      setError(errorMessage);
      setPipelines([]);
    } finally {
      setLoading(false);
    }
  };

  // Format value for display
  const formatValue = (value) => {
    if (!value) return "$0";
    return `$${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return dayjs().format("DD MMM YYYY");
    try {
      return dayjs(dateString).format("DD MMM YYYY");
    } catch {
      return dateString;
    }
  };

  // Transform API data to component format
  const transformPipeline = (pipeline) => ({
    id: pipeline.id,
    name: pipeline.name,
    value: formatValue(pipeline.value),
    valueRaw: pipeline.value,
    deals: pipeline.deals || 0,
    stage: pipeline.stage || "In Pipeline",
    stageColor: pipeline.stage_color || "primary",
    date: formatDate(pipeline.created_date || pipeline.created_at),
    status: pipeline.status || "Active"
  });

  const transformedPipelines = pipelines.map(transformPipeline);

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
  const filteredPipelines = transformedPipelines.filter((pipe) =>
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

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add pipeline
  const handleAddPipeline = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const pipelineData = {
        name: formData.name,
        value: parseFloat(formData.value) || 0,
        deals: parseInt(formData.deals) || 0,
        stage: formData.stage,
        stage_color: formData.stage_color,
        created_date: formData.created_date || null,
        status: formData.status
      };

      await crmPipelinesAPI.create(pipelineData);
      toast.success("Pipeline added successfully!");
      setShowAddModal(false);
      setFormData({
        name: "",
        value: "",
        deals: "",
        stage: "In Pipeline",
        stage_color: "primary",
        created_date: "",
        status: "Active"
      });
      loadPipelines();
    } catch (err) {
      console.error("Error adding pipeline:", err);
      const errorMessage = err.message || err.detail || "Failed to add pipeline. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Handle edit pipeline
  const handleEditPipeline = async (e) => {
    e.preventDefault();
    if (!editingPipeline) return;
    
    try {
      setError(null);
      const pipelineData = {
        name: formData.name,
        value: parseFloat(formData.value) || 0,
        deals: parseInt(formData.deals) || 0,
        stage: formData.stage,
        stage_color: formData.stage_color,
        created_date: formData.created_date || null,
        status: formData.status
      };

      await crmPipelinesAPI.update(editingPipeline.id, pipelineData);
      toast.success("Pipeline updated successfully!");
      setShowEditModal(false);
      setEditingPipeline(null);
      setFormData({
        name: "",
        value: "",
        deals: "",
        stage: "In Pipeline",
        stage_color: "primary",
        created_date: "",
        status: "Active"
      });
      loadPipelines();
    } catch (err) {
      console.error("Error updating pipeline:", err);
      const errorMessage = err.message || err.detail || "Failed to update pipeline. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Handle delete pipeline
  const handleDeletePipeline = async () => {
    if (!deletingPipelineId) return;
    
    try {
      setError(null);
      await crmPipelinesAPI.delete(deletingPipelineId);
      toast.success("Pipeline deleted successfully!");
      setShowDeleteModal(false);
      setDeletingPipelineId(null);
      loadPipelines();
    } catch (err) {
      console.error("Error deleting pipeline:", err);
      const errorMessage = err.message || err.detail || "Failed to delete pipeline. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Open edit modal
  const openEditModal = async (pipelineId) => {
    try {
      const pipeline = await crmPipelinesAPI.getById(pipelineId);
      if (pipeline) {
        setEditingPipeline(pipeline);
        setFormData({
          name: pipeline.name || "",
          value: pipeline.value || "",
          deals: pipeline.deals || "",
          stage: pipeline.stage || "In Pipeline",
          stage_color: pipeline.stage_color || "primary",
          created_date: pipeline.created_date ? dayjs(pipeline.created_date).format("YYYY-MM-DD") : "",
          status: pipeline.status || "Active"
        });
        setShowEditModal(true);
      }
    } catch (err) {
      console.error("Error fetching pipeline:", err);
      toast.error("Failed to load pipeline for editing.");
    }
  };

  // Open delete modal
  const openDeleteModal = (pipelineId) => {
    setDeletingPipelineId(pipelineId);
    setShowDeleteModal(true);
  };

  // Export handlers
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Pipelines List", 10, 10);

      const tableColumn = ["Name", "Total Deal Value", "No of Deals", "Stage", "Created Date", "Status"];
      const tableRows = [];

      filteredPipelines.forEach(pipeline => {
        const pipelineData = [
          pipeline.name,
          pipeline.value,
          pipeline.deals,
          pipeline.stage,
          pipeline.date,
          pipeline.status,
        ];
        tableRows.push(pipelineData);
      });

      doc.autoTable(tableColumn, tableRows, { startY: 20 });
      doc.save("pipelines.pdf");
      toast.success("Pipelines exported to PDF successfully!");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Failed to export PDF. Please try again.");
    }
  };

  const handleExportExcel = () => {
    try {
      const headers = ["Name", "Total Deal Value", "No of Deals", "Stage", "Created Date", "Status"];
      const csvContent = [
        headers.join(','),
        ...filteredPipelines.map(pipeline => [
          `"${pipeline.name}"`,
          `"${pipeline.value}"`,
          pipeline.deals,
          `"${pipeline.stage}"`,
          `"${pipeline.date}"`,
          `"${pipeline.status}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `pipelines_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Pipelines exported to Excel successfully!");
    } catch (error) {
      console.error("Excel Export Error:", error);
      toast.error("Failed to export Excel. Please try again.");
    }
  };

  // Update filters when they change
  useEffect(() => {
    loadPipelines();
  }, [selectedStatus, selectedPlan]);

  return (
    <div className=" ">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {error && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Note:</strong> {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {loading && (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

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
                      onClick={handleExportPDF}
                      className="dropdown-item rounded-1"
                    >
                      <FaFilePdf className="me-1" /> Export as PDF
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleExportExcel}
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
                onClick={() => {
                  setFormData({
                    name: "",
                    value: "",
                    deals: "",
                    stage: "In Pipeline",
                    stage_color: "primary",
                    created_date: "",
                    status: "Active"
                  });
                  setShowAddModal(true);
                }}
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
                        onClick={() => openEditModal(pipe.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm "
                        onClick={() => openDeleteModal(pipe.id)}
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

      {/* Add Pipeline Modal */}
      {showAddModal && (
        <>
          <div className="modal-backdrop fade show" style={{zIndex: 1040}}></div>
          <div className="modal fade show d-block" tabIndex="-1" style={{zIndex: 1050}}>
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add Pipeline</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowAddModal(false)}
                    aria-label="Close"
                  >
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <form onSubmit={handleAddPipeline}>
                  <div className="modal-body pb-0">
                    <div className="mb-3">
                      <label className="form-label">
                        Pipeline Name <span className="text-danger">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Total Deal Value</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        step="0.01"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No of Deals</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="deals"
                        value={formData.deals}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Stage</label>
                      <select 
                        className="form-control"
                        name="stage"
                        value={formData.stage}
                        onChange={handleInputChange}
                      >
                        <option value="Won">Won</option>
                        <option value="In Pipeline">In Pipeline</option>
                        <option value="Conversation">Conversation</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Lost">Lost</option>
                        <option value="Schedule Service">Schedule Service</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Stage Color</label>
                      <select 
                        className="form-control"
                        name="stage_color"
                        value={formData.stage_color}
                        onChange={handleInputChange}
                      >
                        <option value="success">Success (Green)</option>
                        <option value="primary">Primary (Blue)</option>
                        <option value="info">Info (Cyan)</option>
                        <option value="warning">Warning (Yellow)</option>
                        <option value="danger">Danger (Red)</option>
                        <option value="secondary">Secondary (Gray)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Created Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="created_date"
                        value={formData.created_date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select 
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowAddModal(false)}
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
        </>
      )}

      {/* Edit Pipeline Modal */}
      {showEditModal && editingPipeline && (
        <>
          <div className="modal-backdrop fade show" style={{zIndex: 1040}}></div>
          <div className="modal fade show d-block" tabIndex="-1" style={{zIndex: 1050}}>
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Pipeline</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingPipeline(null);
                    }}
                    aria-label="Close"
                  >
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <form onSubmit={handleEditPipeline}>
                  <div className="modal-body pb-0">
                    <div className="mb-3">
                      <label className="form-label">
                        Pipeline Name <span className="text-danger">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Total Deal Value</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        step="0.01"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">No of Deals</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="deals"
                        value={formData.deals}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Stage</label>
                      <select 
                        className="form-control"
                        name="stage"
                        value={formData.stage}
                        onChange={handleInputChange}
                      >
                        <option value="Won">Won</option>
                        <option value="In Pipeline">In Pipeline</option>
                        <option value="Conversation">Conversation</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Lost">Lost</option>
                        <option value="Schedule Service">Schedule Service</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Stage Color</label>
                      <select 
                        className="form-control"
                        name="stage_color"
                        value={formData.stage_color}
                        onChange={handleInputChange}
                      >
                        <option value="success">Success (Green)</option>
                        <option value="primary">Primary (Blue)</option>
                        <option value="info">Info (Cyan)</option>
                        <option value="warning">Warning (Yellow)</option>
                        <option value="danger">Danger (Red)</option>
                        <option value="secondary">Secondary (Gray)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Created Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="created_date"
                        value={formData.created_date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select 
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingPipeline(null);
                      }}
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
        </>
      )}

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

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="modal-backdrop fade show" style={{zIndex: 1040}}></div>
          <div className="modal fade show d-block" tabIndex="-1" style={{zIndex: 1050}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <i className="ti ti-trash-x fs-36"></i>
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">
                    Are you sure you want to delete this pipeline? This action cannot be undone.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-light me-3"
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeletingPipelineId(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleDeletePipeline}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pipeline;
