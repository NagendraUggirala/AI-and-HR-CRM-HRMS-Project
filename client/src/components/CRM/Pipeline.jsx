import React, { useState, useEffect, useCallback } from "react";
import {
  
  FaFilePdf,
  FaFileExcel,
 
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { crmPipelinesAPI } from "../../utils/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Icon } from '@iconify/react/dist/iconify.js';


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

  // Stage color mapping
  const stageColorMap = {
    "Won": "success",
    "In Pipeline": "primary",
    "Conversation": "info",
    "Follow Up": "warning",
    "Lost": "danger",
    "Schedule Service": "secondary"
  };

  // Load pipelines from API
  const loadPipelines = useCallback(async () => {
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
  }, [selectedStatus, selectedPlan]);

  useEffect(() => {
    loadPipelines();
  }, [loadPipelines]);

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

  // Transform API data to component format - map backend field names to frontend
  const transformPipeline = (pipeline) => {
    // Convert status from "active"/"inactive" (lowercase) to "Active"/"Inactive" (capitalized) for display
    const statusDisplay = pipeline.status === "active" ? "Active" : 
                         pipeline.status === "inactive" ? "Inactive" : 
                         pipeline.status?.charAt(0).toUpperCase() + pipeline.status?.slice(1).toLowerCase() || "Active";
    
    // Get stage with fallback
    const stage = pipeline.stages || pipeline.stage || "In Pipeline";
    
    return {
      id: pipeline.id,
      name: pipeline.pipeline_Name || pipeline.name || "Untitled Pipeline",
      value: formatValue(pipeline.total_deal_value || pipeline.value),
      valueRaw: pipeline.total_deal_value || pipeline.value,
      deals: pipeline.deals || 0,
      stage: stage,
      stageColor: stageColorMap[stage] || "primary", // automatic color
      date: formatDate(pipeline.created_date || pipeline.created_at),
      status: statusDisplay // Convert to capitalized for display
    };
  };

  const transformedPipelines = pipelines.map(transformPipeline);

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

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      value: "",
      deals: "",
      stage: "In Pipeline",
      stage_color: "primary",
      created_date: "",
      status: "Active"
    });
  };

  // Handle add pipeline
  const handleAddPipeline = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      
      // Map frontend fields to backend schema
      // Convert status from "Active"/"Inactive" to "active"/"inactive" (lowercase)
      const statusValue = formData.status === "Active" ? "active" : 
                         formData.status === "Inactive" ? "inactive" : 
                         formData.status?.toLowerCase() || "active";
      
      const pipelineData = {
        pipeline_Name: formData.name || "Untitled Pipeline", // Backend expects 'pipeline_Name'
        total_deal_value: formData.value ? parseFloat(formData.value) : 0, // Backend expects 'total_deal_value'
        deals: formData.deals ? parseInt(formData.deals) : 0,
        stages: formData.stage || "In Pipeline", // Backend expects 'stages'
        stage_color: formData.stage_color,
        created_date: formData.created_date || new Date().toISOString().split('T')[0], // Backend expects date string (YYYY-MM-DD)
        status: statusValue // Backend expects lowercase enum: "active" or "inactive"
      };

      await crmPipelinesAPI.create(pipelineData);
      toast.success("Pipeline added successfully!");
      setShowAddModal(false);
      resetForm();
      await loadPipelines();
    } catch (err) {
      console.error("Error adding pipeline:", err);
      const errorMessage = err.message || err.detail || "Failed to add pipeline. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit pipeline
  const handleEditPipeline = async (e) => {
    e.preventDefault();
    if (!editingPipeline) return;
    
    try {
      setError(null);
      setLoading(true);
      
      // Map frontend fields to backend schema
      // Convert status from "Active"/"Inactive" to "active"/"inactive" (lowercase)
      const statusValue = formData.status === "Active" ? "active" : 
                         formData.status === "Inactive" ? "inactive" : 
                         formData.status?.toLowerCase() || "active";
      
      const pipelineData = {
        pipeline_Name: formData.name || "Untitled Pipeline", // Backend expects 'pipeline_Name'
        total_deal_value: formData.value ? parseFloat(formData.value) : 0, // Backend expects 'total_deal_value'
        deals: formData.deals ? parseInt(formData.deals) : 0,
        stages: formData.stage || "In Pipeline", // Backend expects 'stages'
        stage_color: formData.stage_color,
        created_date: formData.created_date || new Date().toISOString().split('T')[0], // Backend expects date string (YYYY-MM-DD)
        status: statusValue // Backend expects lowercase enum: "active" or "inactive"
      };

      await crmPipelinesAPI.update(editingPipeline.id, pipelineData);
      toast.success("Pipeline updated successfully!");
      setShowEditModal(false);
      setEditingPipeline(null);
      resetForm();
      await loadPipelines();
    } catch (err) {
      console.error("Error updating pipeline:", err);
      const errorMessage = err.message || err.detail || "Failed to update pipeline. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete pipeline
  const handleDeletePipeline = async () => {
    if (!deletingPipelineId) return;
    
    try {
      setError(null);
      setLoading(true);
      await crmPipelinesAPI.delete(deletingPipelineId);
      toast.success("Pipeline deleted successfully!");
      setShowDeleteModal(false);
      setDeletingPipelineId(null);
      await loadPipelines();
    } catch (err) {
      console.error("Error deleting pipeline:", err);
      const errorMessage = err.message || err.detail || "Failed to delete pipeline. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = async (pipelineId) => {
    try {
      setLoading(true);
      const pipeline = await crmPipelinesAPI.getById(pipelineId);
      if (pipeline) {
        setEditingPipeline(pipeline);
        // Map backend field names to frontend form field names
        // Convert status from "active"/"inactive" (lowercase) to "Active"/"Inactive" (capitalized)
        const statusDisplay = pipeline.status === "active" ? "Active" : 
                             pipeline.status === "inactive" ? "Inactive" : 
                             pipeline.status?.charAt(0).toUpperCase() + pipeline.status?.slice(1).toLowerCase() || "Active";
        
        setFormData({
          name: pipeline.pipeline_Name || pipeline.name || "", // Backend sends 'pipeline_Name'
          value: pipeline.total_deal_value || pipeline.value || "", // Backend sends 'total_deal_value'
          deals: pipeline.deals || "",
          stage: pipeline.stages || pipeline.stage || "In Pipeline", // Backend sends 'stages'
          stage_color: pipeline.stage_color || "primary",
          created_date: pipeline.created_date ? (typeof pipeline.created_date === 'string' ? pipeline.created_date.split('T')[0] : dayjs(pipeline.created_date).format("YYYY-MM-DD")) : "",
          status: statusDisplay // Convert to capitalized for display
        });
        setShowEditModal(true);
      }
    } catch (err) {
      console.error("Error fetching pipeline:", err);
      toast.error("Failed to load pipeline for editing.");
    } finally {
      setLoading(false);
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
          <div className="d-flex align-items-center gap-2">
            {/* Export Dropdown */}
            <div className="me-2 mb-2">
              <div className="dropdown">
                <button
                  type="button"
                 className="create-job-btn dropdown-toggle gap-2"
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
                <ul className="dropdown-menu dropdown-menu-end shadow-sm">

                  <li>
                    <button
                      onClick={handleExportPDF}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <FaFilePdf className="me-1" /> Export as PDF
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleExportExcel}
                      className="dropdown-item d-flex align-items-center"
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
                  className="add-employee gap-2"
                  onClick={() => {
                    resetForm();
                    setShowAddModal(true);
                  }}
                >
                  <Icon icon="heroicons:plus-circle" width="18" />
                  <small>Add Pipeline</small>
                </button>
            </div>
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
                  className="close-btn dropdown-toggle gap-2"
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
                  className="close-btn dropdown-toggle gap-2"
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
                    <button className="dropdown-item" onClick={() => setSelectedPlan("Won")}>Won</button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setSelectedPlan("In Pipeline")}>In Pipeline</button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setSelectedPlan("Conversation")}>Conversation</button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setSelectedPlan("Follow Up")}>Follow Up</button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setSelectedPlan("")}>All</button>
                  </li>
                </ul>
              </div>

              {/* Plan Type */}
              <div className="dropdown me-2">
                <button
                  className="close-btn dropdown-toggle gap-2"
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
                  className="close-btn dropdown-toggle gap-2"
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
                  className="close-btn dropdown-toggle gap-2"
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
                  <th style={{ width: '180px', minWidth: '180px' }}>Actions</th>
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
                          (pipe.status === "Active" || pipe.status === "active") ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {pipe.status === "active" ? "Active" : pipe.status === "inactive" ? "Inactive" : pipe.status}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', width: '180px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => openEditModal(pipe.id)}
                          title="Edit Pipeline"
                          type="button"
                          style={{ fontSize: '12px', padding: '4px 10px', minWidth: '65px' }}
                        >
                          <i className="ti ti-edit me-1"></i>Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => openDeleteModal(pipe.id)}
                          title="Delete Pipeline"
                          type="button"
                          style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                        >
                          <i className="ti ti-trash me-1"></i>Delete
                        </button>
                      </div>
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
        <div  className="hrms-modal-overlay">
          <div className="hrms-modal hrms-modal-offer-xl animate-scale-in d-flex flex-column">

                <div  className="hrms-modal-header">
                  <h5 className="hrms-modal-title d-flex align-items-center">Add Pipeline</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                    aria-label="Close"
                  >
                  </button>
                </div>
                  <div className="hrms-modal-body hrms-modal-body-scroll">

                <form id="add-pipeline-form" onSubmit={handleAddPipeline}>
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

                </form>
             </div>

                   <div className="modal-footer bg-white border-top d-flex ">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setShowAddModal(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" form="add-pipeline-form" className="btn btn-primary">
                      Add Pipeline
                    </button>
                  </div>
                

          </div>
        </div>
      )}

      {/* Edit Pipeline Modal */}
      {showEditModal && editingPipeline && (
        <div  className="hrms-modal-overlay">
          <div className="hrms-modal hrms-modal-offer-xl animate-scale-in d-flex flex-column">


                 {/* HEADER */}
              <div className="hrms-modal-header">
                <h5 className="hrms-modal-title d-flex align-items-center">Edit Pipeline</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingPipeline(null);
                    }}
                  >
                  </button>
                </div>
                
              {/* BODY */}
              <div className="hrms-modal-body hrms-modal-body-scroll">
                <form id="edit-pipeline-form" onSubmit={handleEditPipeline}>
                 
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

                </form>
                                  </div>
                  <div className="modal-footer bg-white border-top d-flex">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingPipeline(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" form="edit-pipeline-form" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>

          </div>
        </div>
      )}

      {/* Delete Modal */}
{showDeleteModal && (
  <div
    className="modal show d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-sm modal-dialog-centered">
      <div className="modal-content">

        {/* Modal Header */}
        <div className="modal-header">
          <h5 className="modal-title">Confirm Delete</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setShowDeleteModal(false);
              setDeletingPipelineId(null);
            }}
          ></button>
        </div>

        {/* Modal Body */}
        <div className="modal-body text-center">
          <i className="ti ti-alert-triangle text-warning fs-1 mb-3"></i>

          <h5>Are you sure?</h5>

          <p className="text-muted">
            Do you want to delete this pipeline?  
            <br />
            This action cannot be undone.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setShowDeleteModal(false);
              setDeletingPipelineId(null);
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={handleDeletePipeline}
          >
            Delete Pipeline
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Pipeline;