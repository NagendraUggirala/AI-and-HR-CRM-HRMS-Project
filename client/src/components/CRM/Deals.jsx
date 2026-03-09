import React, { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { dealsAPI } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from '@iconify/react/dist/iconify.js';


const defaultAvatar =
    "/assets/img/users/user-09.jpg";

// Stage configuration
const stageConfig = [
    { stage: "New", color: "purple", apiStage: "New" },
    { stage: "Prospect", color: "info", apiStage: "Prospect" },
    { stage: "Proposal", color: "warning", apiStage: "Proposal" },
    { stage: "Won", color: "success", apiStage: "Won" },
];

// Helper function to format amount
const formatAmount = (value) => {
    if (!value || value === 0) return "0/-";
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(numValue)) return "0/-";
    return numValue.toLocaleString('en-IN') + "/-";
};

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    } catch (e) {
        return dateString;
    }
};

// Helper function to calculate progress percentage
const calculateProgress = (deal) => {
    // Simple progress calculation based on stage/status
    const stageProgress = {
        "New": 25,
        "Prospect": 50,
        "Proposal": 75,
        "Won": 100
    };
    // Backend sends 'status', but we also check 'stage' for compatibility
    const dealStage = deal.status || deal.stage || "";
    return stageProgress[dealStage] || 0;
};

const makeInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

// Transform API deals data to Kanban structure
const transformDealsToKanban = (dealsData) => {
    if (!Array.isArray(dealsData)) return stageConfig.map(s => ({ ...s, leads: 0, amount: "0/-", deals: [] }));

    const stages = stageConfig.map(stageConfigItem => {
        const stageDeals = dealsData
            .filter(deal => {
                // Backend sends 'status', but we also check 'stage' for compatibility
                const dealStage = deal.status || deal.stage || "";
                return dealStage.trim() === stageConfigItem.apiStage;
            })
            .map(deal => ({
                id: deal.id,
                initials: makeInitials(deal.deal_name || deal.name || deal.owner || ""), // Backend sends 'deal_name'
                title: deal.deal_name || deal.name || "Untitled Deal", // Backend sends 'deal_name'
                amount: formatAmount(deal.deal_value || deal.amount || deal.value || 0), // Backend sends 'deal_value'
                email: deal.contact || deal.email || "", // Backend sends 'contact'
                phone: deal.phone || "",
                location: deal.project || deal.location || "", // Backend sends 'project'
                owner: deal.assignee || deal.owner || "", // Backend sends 'assignee'
                ownerImg: deal.ownerImg || defaultAvatar,
                progress: `${calculateProgress(deal)}%`,
                date: formatDate(deal.expected_closing_date || deal.closingDate || deal.closed_date || deal.due_date || deal.created_at), // Backend sends 'expected_closing_date' and 'due_date'
                stage: deal.status || deal.stage || stageConfigItem.apiStage, // Backend sends 'status'
            }));

        const totalAmount = stageDeals.reduce((sum, deal) => {
            const amount = parseFloat((deal.amount || "0").replace(/,/g, '').replace("/-", "")) || 0;
            return sum + amount;
        }, 0);

        return {
            ...stageConfigItem,
            leads: stageDeals.length,
            amount: formatAmount(totalAmount),
            deals: stageDeals,
        };
    });

    return stages;
};

export default function Deals() {
    // states
    const [dealsState, setDealsState] = useState(
        stageConfig.map(s => ({ ...s, leads: 0, amount: "0/-", deals: [] }))
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingDealId, setEditingDealId] = useState(null);
    const [selectedStageIndex, setSelectedStageIndex] = useState(null);
    const [selectedDealIndex, setSelectedDealIndex] = useState(null);
    const [sortBy, setSortBy] = useState("Last 7 Days");

    const initialForm = {
        dealName: "",
        pipeline: "",
        stage: "",
        status: "",
        dealValue: "",
        currency: "",
        customCurrency: "",
        period: "",
        periodValue: "",
        contact: "",
        project: "",
        customProject:"",
        dueDate: "",
        closingDate: "",
        assignee: "",
        tags: "",
        followupDate: "",
        source: "",
        customSource:"",
        priority: "",
        description: "",
        initials: "",
        title: "",
        amount: "",
        email: "",
        phone: "",
        location: "",
        owner: "",
        ownerImg: "",
        progress: "",
        date: "",
    };
    const [formData, setFormData] = useState(initialForm);

    // Load deals from API
    const loadDeals = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await dealsAPI.list();
            // Handle case where API returns empty array or null
            if (Array.isArray(data)) {
                setDealsState(transformDealsToKanban(data));
            } else if (data === null || data === undefined) {
                // API returned null/undefined, treat as empty
                setDealsState(stageConfig.map(s => ({ ...s, leads: 0, amount: "0/-", deals: [] })));
            } else {
                console.warn("API returned non-array data:", data);
                setDealsState(stageConfig.map(s => ({ ...s, leads: 0, amount: "0/-", deals: [] })));
            }
        } catch (err) {
            console.error("Error loading deals:", err);
            // Check if it's a 404 (endpoint doesn't exist) or other error
            const status = err.status || (err.message && err.message.includes('404') ? 404 : null);
            let errorMessage = "Failed to load deals. ";

            if (status === 404 || err.message?.includes('404') || err.message?.includes('Not Found')) {
                errorMessage += "The deals API endpoint is not available. Please ensure the backend deals endpoint is implemented.";
            } else if (err.message) {
                errorMessage += err.message;
            } else {
                errorMessage += "Please check if the backend API is running.";
            }

            setError(errorMessage);
            // Set empty state so UI still renders
            setDealsState(stageConfig.map(s => ({ ...s, leads: 0, amount: "0/-", deals: [] })));
        } finally {
            setLoading(false);
        }
    }, []);

    // Load deals from API on component mount
    useEffect(() => {
        loadDeals();
    }, [loadDeals]);

    // Open Add Modal
    const openAddModal = (stageIndex) => {
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(null);
        setIsEditing(false);
        setEditingDealId(null);
        const selectedStage = dealsState[stageIndex]?.stage || "New";
        setFormData({ ...initialForm, stage: selectedStage });
        setShowAddEditModal(true);
    };

    // Open Edit Modal
    const openEditModal = async (stageIndex, dealIndex) => {
        const deal = dealsState[stageIndex].deals[dealIndex];
        const predefinedProjects = [
  "Office Management App",
  "Clinic Management",
  "Educational Platform"
];

const predefinedCurrencies = ["Rupee", "Dollar", "Euro"];

        if (!deal) return;
const predefinedSources = [
  "Phone Calls",
  "Social Media",
  "Referral Sites",
  "Web Analytics",
  "Previous Purchase"
];

        try {
            // Fetch full deal data from API if we have an ID
            let fullDealData = deal;
            if (deal.id) {
                try {
                    fullDealData = await dealsAPI.getById(deal.id);
                } catch (err) {
                    console.error("Error fetching deal details:", err);
                    // Use existing deal data if API call fails
                }
            }

            // Map backend field names to frontend form field names
            setFormData({
                ...initialForm,
                dealName: fullDealData.deal_name || fullDealData.name || deal.title || "", // Backend sends 'deal_name'
                dealValue: fullDealData.deal_value || fullDealData.amount || fullDealData.value || deal.amount || "", // Backend sends 'deal_value'
                contact: fullDealData.contact || fullDealData.email || deal.email || "",
                phone: fullDealData.phone || deal.phone || "",
               project: predefinedProjects.includes(fullDealData.project) ? fullDealData.project : "Others",
               customProject: predefinedProjects.includes(fullDealData.project) ? "" : fullDealData.project || "", // Backend sends 'project'
                assignee: fullDealData.assignee || fullDealData.owner || deal.owner || "",
                stage: fullDealData.status || fullDealData.stage || deal.stage || dealsState[stageIndex]?.stage || "New", // Backend sends 'status'
                pipeline: fullDealData.pipeline || "",
                status: fullDealData.status || fullDealData.stage || deal.stage || "", // Backend sends 'status', map to both stage and status
                currency: predefinedCurrencies.includes(fullDealData.currency) ? fullDealData.currency : fullDealData.currency ? "Other" : "",
                customCurrency: predefinedCurrencies.includes(fullDealData.currency) ? "" : fullDealData.currency || "",
                tags: fullDealData.tags || "",
                source: predefinedSources.includes(fullDealData.source) ? fullDealData.source : fullDealData.source ? "Other" : "",
                customSource: predefinedSources.includes(fullDealData.source) ? "" : fullDealData.source || "",
                priority: fullDealData.priority || "",
                description: fullDealData.description || "",
                dueDate: fullDealData.due_date ? (typeof fullDealData.due_date === 'string' ? fullDealData.due_date.split('T')[0] : fullDealData.due_date) : "", // Backend sends 'due_date'
                closingDate: fullDealData.expected_closing_date ? (typeof fullDealData.expected_closing_date === 'string' ? fullDealData.expected_closing_date.split('T')[0] : fullDealData.expected_closing_date) : "", // Backend sends 'expected_closing_date'
                followupDate: fullDealData.followup_date ? (typeof fullDealData.followup_date === 'string' ? fullDealData.followup_date.split('T')[0] : fullDealData.followup_date) : "", // Backend sends 'followup_date'
                ownerImg: deal.ownerImg || defaultAvatar,
                initials: deal.initials || makeInitials(fullDealData.assignee || fullDealData.owner || deal.owner || deal.title || ""),
            });
            setSelectedStageIndex(stageIndex);
            setSelectedDealIndex(dealIndex);
            setEditingDealId(deal.id);
            setIsEditing(true);
            setShowAddEditModal(true);
        } catch (err) {
            console.error("Error opening edit modal:", err);
            toast.error("Failed to load deal details.");
        }
    };

    const handleExport = (type) => {
        if (type === "Excel") {
            const worksheet = XLSX.utils.json_to_sheet(dealsState.flatMap(s => s.deals));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Deals");
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(blob, "deals.xlsx");   // 👈 file downloaded in user’s browser
        } else if (type === "PDF") {
            alert("PDF export not yet implemented!");
        }
    };

    const handleExports = (type) => {
        if (type === "PDF") {
            const doc = new jsPDF();
            doc.text("Deals Report", 10, 10);
            dealsState.forEach((stage, i) => {
                doc.text(`${stage.stage} (${stage.deals.length} deals)`, 10, 20 + i * 10);
            });
            doc.save("deals.pdf");   // 👈 file downloaded in user’s browser
        }
    };


    // Save (Add or Edit)
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            setError(null);

            // Determine stage from form data or selected stage index
            const selectedStage = formData.stage || dealsState[selectedStageIndex]?.stage || "New";

            // Prepare deal data for API - map frontend fields to backend schema
            const dealData = {
                deal_name: formData.dealName || "Untitled Deal", // Backend expects 'deal_name'
                pipeline: formData.pipeline || null,
                // Map stage to status: backend uses 'status' field to store stage value (New, Prospect, Proposal, Won)
                // Use stage value if available, otherwise use status, fallback to selectedStage or "New"
                status: formData.stage || formData.status || selectedStage || "New", // Backend expects 'status' (stores stage value)
                deal_value: formData.dealValue ? parseFloat(formData.dealValue) : null, // Backend expects 'deal_value'
                currency: formData.currency || null,
                period: formData.period || null,
                period_value: formData.periodValue ? parseInt(formData.periodValue) : null,
                contact: formData.contact || null, // Backend expects 'contact'
                project: formData.project === "Others" ? formData.customProject || null : formData.project || null, // Backend expects 'project'
                due_date: formData.dueDate || null, // Backend expects 'due_date'
                expected_closing_date: formData.closingDate || null, // Backend expects 'expected_closing_date'
                assignee: formData.assignee || null,
                tags: formData.tags || null,
                followup_date: formData.followupDate || null, // Backend expects 'followup_date'
                source: formData.source === "Other" ? formData.customSource || null : formData.source || null,
                priority: formData.priority || null,
                description: formData.description || null,
            };

            // Remove empty strings and convert to null
            // Also handle NaN values for numeric fields
            Object.keys(dealData).forEach(key => {
                if (dealData[key] === "" || dealData[key] === undefined) {
                    dealData[key] = null;
                }
                // Handle NaN for numeric fields
                if ((key === 'deal_value' || key === 'period_value') && (isNaN(dealData[key]) || dealData[key] === null)) {
                    dealData[key] = null;
                }
            });

            if (isEditing && editingDealId) {
                // Update existing deal
                await dealsAPI.update(editingDealId, dealData);
                toast.success("Deal updated successfully!");
            } else {
                // Create new deal
                await dealsAPI.create(dealData);
                toast.success("Deal created successfully!");
            }

            // Reload deals from API
            await loadDeals();

            // Close modal & reset
            setShowAddEditModal(false);
            setIsEditing(false);
            setEditingDealId(null);
            setSelectedDealIndex(null);
            setSelectedStageIndex(null);
            setFormData(initialForm);
        } catch (err) {
            console.error("Error saving deal:", err);
            const errorMessage = err.message || err.detail || "Failed to save deal. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    // Prepare delete modal
    const openDeleteModal = (stageIndex, dealIndex) => {
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(dealIndex);
        setShowDeleteModal(true);
    };

    // Perform deletion
    const handleDelete = async () => {
        if (selectedStageIndex === null || selectedDealIndex === null) {
            setShowDeleteModal(false);
            return;
        }

        const deal = dealsState[selectedStageIndex].deals[selectedDealIndex];
        if (!deal) {
            setShowDeleteModal(false);
            return;
        }

        try {
            if (deal.id) {
                await dealsAPI.delete(deal.id);
                toast.success("Deal deleted successfully!");
            }

            // Reload deals from API
            await loadDeals();

            setShowDeleteModal(false);
            setSelectedStageIndex(null);
            setSelectedDealIndex(null);
        } catch (err) {
            console.error("Error deleting deal:", err);
            const errorMessage = err.message || err.detail || "Failed to delete deal. Please try again.";
            toast.error(errorMessage);
        }
    };

    // input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />

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

            <div className="d-flex justify-content-between">

                <div className="gap-2">
                    <h5 className="text-3xl fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                        <span className="icon-circle ">
                            <Icon icon='heroicons:credit-card' className="primary" />
                        </span>
                        Deals
                    </h5>

                    <p className="text-muted mb-4">
                         Monitor pipeline performance and move deals smoothly from prospect to closure.
                    </p>
                </div>



        {/* Right side: buttons */}
<div className="d-flex gap-2 align-items-center">

  {/* Export Dropdown */}
  <div className="dropdown">
    <button
      type="button"
      className="create-job-btn dropdown-toggle"
      data-bs-toggle="dropdown"
    >
                            <i className="ti ti-file-export me-1" /> Export
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                                <button
                                    className="dropdown-item rounded-1"
                                    onClick={() => handleExports("PDF")}
                                >
                                    PDF
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item rounded-1"
                                    onClick={() => handleExport("Excel")}
                                >
                                    Excel
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-2 ">

                        <button className="add-employee gap-2"
                            onClick={() => {
                                openAddModal(0);
                            }}
                        >
                             <Icon icon="heroicons:plus-circle" width="18" />
                            Add Deal
                        </button>
                    </div>
                </div>
            </div>


            {/* Deals Grid Header */}
            <div className="card w-100 mb-3">
                <div className="card-body p-3 d-flex justify-content-between">
                    <h5 className="fs-6 text-dark"><b>Deals Grid</b></h5>
                    <div className="dropdown">
                        <button
                            className="close-btn"
                            data-bs-toggle="dropdown"
                        >
                            Sort By : {sortBy}
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setSortBy("Last 7 Days")}
                                >
                                    Last 7 Days
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setSortBy("Monthly")}
                                >
                                    Monthly
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setSortBy("Weekly")}
                                >
                                    Weekly
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setSortBy("Yearly")}
                                >
                                    Yearly
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="d-flex overflow-x-auto align-items-start mb-4">
                <div className="d-flex">
                    {dealsState.map((stage, stageIndex) => (
                        <div key={stage.stage} className="me-3" style={{ minWidth: 320 }}>
                            <div className="card w-100 mb-0">
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4 className="fw-medium d-flex align-items-center mb-1 fs-6">
                                            <i className={`ti ti-circle-filled fs-8 text-${stage.color} me-2`} />
                                            <b>{stage.stage}</b>
                                        </h4>
                                        <span className="fw-normal text-default">
                                            {stage.leads} Deals - {stage.amount}
                                        </span>
                                    </div>

                                    <div className="action-icon d-inline-flex">
                                        <button
                                            type="button"

                                            className="btn btn-sm btn-link p-0"
                                            onClick={() => openAddModal(stageIndex)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = '#0d6efd';
                                                e.currentTarget.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = '#6c757d';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                            style={{
                                                width: 'auto',
                                                height: 'auto',
                                                padding: '2px 4px',
                                                minWidth: 'auto',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                color: '#6c757d',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease'
                                            }}
                                            title="Add Deal"
                                        >
                                            <Icon icon="heroicons:ellipsis-vertical" width="18" />

                                        </button>
                                    </div>
                                </div>

                                <div className="kanban-drag-wrap pt-3">
                                    {stage.deals.map((deal, dealIndex) => (
                                        <div key={`${stageIndex}-${dealIndex}`} className="card w-100 kanban-card mb-3">
                                            <div className="card-body">
                                                <div className={`border-${stage.color}  mb-3`} />

                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                                                        <span className="avatar-title text-dark">{deal.initials}</span>
                                                    </div>
                                                    <h6 className="fw-medium"><b>{deal.title}</b></h6>
                                                </div>

                                                <div className="mb-3 d-flex flex-column">
                                                    <p>
                                                        <i className="ti ti-cash text-dark me-2" />
                                                        {deal.amount}
                                                    </p>
                                                    <p>
                                                        <i className="ti ti-mail text-dark me-2" />
                                                        {deal.email}
                                                    </p>
                                                    <p>
                                                        <i className="ti ti-phone text-dark me-2" />
                                                        {deal.phone}
                                                    </p>
                                                    <p>
                                                        <i className="ti ti-map-pin-2 text-dark me-2" />
                                                        {deal.location}
                                                    </p>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img src={deal.ownerImg || defaultAvatar} alt="owner" className="avatar avatar-md avatar-rounded me-2" />
                                                        <span>{deal.owner}</span>
                                                    </div>
                                                    <span className="badge badge-sm badge-info-transparent">
                                                        <i className="ti ti-progress me-1" />
                                                        {deal.progress}
                                                    </span>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                                                    <span>
                                                        <i className="ti ti-calendar-due text-gray-5" /> {deal.date}
                                                    </span>

                                                    <div className="d-flex gap-1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => openEditModal(stageIndex, dealIndex)}
                                                            title="Edit Deal"
                                                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '65px' }}
                                                        >
                                                            <i className="ti ti-edit me-1"></i>Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => openDeleteModal(stageIndex, dealIndex)}
                                                            title="Delete Deal"
                                                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                                                        >
                                                            <i className="ti ti-trash me-1"></i>Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {stage.deals.length === 0 && (
                                        <div className="text-center text-muted small p-3">No deals</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add / Edit Modal (react-bootstrap) */}
{showAddEditModal && (
  <div
    className="hrms-modal-overlay"
  >
    <div
      className="hrms-modal hrms-modal-offer-xl animate-scale-in d-flex flex-column"
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}
      <div className="hrms-modal-header">
        <h5 className="hrms-modal-title d-flex align-items-center">
          <Icon icon="heroicons:briefcase" className="me-2" />
          {isEditing ? "Edit Deal" : "Add New Deal"}
        </h5>

        <button
          className="btn-close"
          onClick={() => setShowAddEditModal(false)}
        >
         
        </button>
      </div>

      {/* BODY */}
      <div className="hrms-modal-body hrms-modal-body-scroll">

        <form onSubmit={handleSave}>
          <div className="row g-3">

            {/* Deal Name */}
            <div className="col-md-12">
              <label className="form-label">
                Deal Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="dealName"
                value={formData.dealName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pipeline */}
            <div className="col-md-6">
              <label className="form-label">
                Pipeline <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="pipeline"
                value={formData.pipeline}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Calls</option>
              </select>
            </div>

            {/* Stage */}
            <div className="col-md-6">
              <label className="form-label">
                Stage <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="stage"
                value={formData.stage}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value) {
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }));
                  }
                }}
                required
              >
                <option value="">Select</option>
                <option value="New">New</option>
                <option value="Prospect">Prospect</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
              </select>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label">
                Status <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="status"
                value={formData.status || formData.stage}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>New</option>
                <option>Prospect</option>
                <option>Proposal</option>
                <option>Won</option>
                <option>Open</option>
                <option>Lost</option>
              </select>
            </div>

            {/* Deal Value */}
            <div className="col-md-6">
              <label className="form-label">
                Deal Value <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name="dealValue"
                value={formData.dealValue}
                onChange={handleChange}
              />
            </div>

            {/* Currency */}
<div className="col-md-6">
  <label className="form-label">
    Currency <span className="text-danger">*</span>
  </label>

  {formData.currency === "Other" ? (
    <input
      type="text"
      className="form-control"
      placeholder="Enter Currency (e.g. INR, JPY)"
      value={formData.customCurrency || ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          customCurrency: e.target.value
        }))
      }
      onBlur={() => {
        if (formData.customCurrency?.trim()) {
          setFormData((prev) => ({
            ...prev,
            currency: formData.customCurrency.trim()
          }));
        }
      }}
    />
  ) : (
    <select
      className="form-select"
      name="currency"
      value={formData.currency}
      onChange={(e) => {
        const value = e.target.value;

        if (value === "Other") {
          setFormData((prev) => ({
            ...prev,
            currency: "Other",
            customCurrency: ""
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            currency: value,
            customCurrency: ""
          }));
        }
      }}
    >
      <option value="">Select</option>
      <option value="Rupee">Rupee</option>
      <option value="Dollar">Dollar</option>
      <option value="Euro">Euro</option>
      <option value="Other">Other</option>
    </select>
  )}
</div>

            {/* Period */}
            <div className="col-md-6">
              <label className="form-label">
                Period
              </label>
              <input
                className="form-control"
                name="period"
                value={formData.period}
                onChange={handleChange}
              />
            </div>

            {/* Period Value */}
            <div className="col-md-6">
              <label className="form-label">
                Period Value
              </label>
              <input
                className="form-control"
                name="periodValue"
                value={formData.periodValue}
                onChange={handleChange}
              />
            </div>

            {/* Contact */}
            <div className="col-md-12">
              <label className="form-label">
                Contact
              </label>
              <input
                className="form-control"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            {/* Project */}
<div className="col-md-12">
  <label className="form-label">Project</label>

  {formData.project === "Others" ? (
    <input
      type="text"
      className="form-control"
      placeholder="Enter Project Name"
      value={formData.customProject}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          customProject: e.target.value
        }))
      }
    />
  ) : (
    <select
      className="form-select"
      name="project"
      value={formData.project}
      onChange={(e) => {
        const value = e.target.value;

        if (value === "Others") {
          setFormData((prev) => ({
            ...prev,
            project: "Others"
          }));
        } else {
          handleChange(e);
        }
      }}
    >
      <option value="">Select</option>
      <option value="Office Management App">Office Management App</option>
      <option value="Clinic Management">Clinic Management</option>
      <option value="Educational Platform">Educational Platform</option>
      <option value="Others">Others</option>
    </select>
  )}
</div>

            {/* Dates */}
            <div className="col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Expected Closing Date</label>
              <input
                type="date"
                className="form-control"
                name="closingDate"
                value={formData.closingDate}
                onChange={handleChange}
              />
            </div>

            {/* Assignee */}
            <div className="col-md-12">
              <label className="form-label">Assignee</label>
              <input
                className="form-control"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
              />
            </div>

            {/* Tags */}
            <div className="col-md-6">
              <label className="form-label">Tags</label>
              <input
                className="form-control"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            {/* Followup */}
            <div className="col-md-6">
              <label className="form-label">Followup Date</label>
              <input
                type="date"
                className="form-control"
                name="followupDate"
                value={formData.followupDate}
                onChange={handleChange}
              />
            </div>

            {/* Source */}
{/* Source */}
<div className="col-md-6">
  <label className="form-label">Source</label>

  {formData.source === "Other" ? (
    <input
      type="text"
      className="form-control"
      placeholder="Enter Source"
      value={formData.customSource || ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          customSource: e.target.value
        }))
      }
      onBlur={() => {
        if (formData.customSource?.trim()) {
          setFormData((prev) => ({
            ...prev,
            source: formData.customSource.trim()
          }));
        }
      }}
    />
  ) : (
    <select
      className="form-select"
      name="source"
      value={formData.source}
      onChange={(e) => {
        const value = e.target.value;

        if (value === "Other") {
          setFormData((prev) => ({
            ...prev,
            source: "Other",
            customSource: ""
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            source: value,
            customSource: ""
          }));
        }
      }}
    >
      <option value="">Select</option>
      <option value="Phone Calls">Phone Calls</option>
      <option value="Social Media">Social Media</option>
      <option value="Referral Sites">Referral Sites</option>
      <option value="Web Analytics">Web Analytics</option>
      <option value="Previous Purchase">Previous Purchase</option>
      <option value="Other">Other</option>
    </select>
  )}
</div>

            {/* Priority */}
            <div className="col-md-6">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            {/* Description */}
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

          </div>
        </form>

      </div>

      {/* FOOTER */}
      <div className="hrms-modal-footer d-flex justify-content-end gap-2">

        <button
          className="cancel-btn"
          onClick={() => setShowAddEditModal(false)}
        >
          Cancel
        </button>

        <button
          className="create-job-btn gap-2"
          onClick={handleSave}
        >
          {isEditing ? "Save Deal" : "Add Deal"}
        </button>

      </div>

    </div>
  </div>
)}


            {/* Delete Modal */}
{showDeleteModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title d-flex align-items-center">
            Confirm Delete
          </h5>

          <button
            type="button"
            className="btn-close"
            onClick={() => setShowDeleteModal(false)}
          ></button>
        </div>

        {/* Body */}
        <div className="modal-body text-center">

          <h5 className="mb-2">Are you sure?</h5>

          <p className="text-muted">
            You want to delete{" "}
            <strong>
              {selectedStageIndex !== null && selectedDealIndex !== null
                ? dealsState[selectedStageIndex].deals[selectedDealIndex]?.title
                : ""}
            </strong>
            . This action cannot be undone.
          </p>

        </div>

        {/* Footer */}
        <div className="modal-footer">

          <button
            type="button"
            className="delete-btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  </div>
)}

        </div>
    );
}
