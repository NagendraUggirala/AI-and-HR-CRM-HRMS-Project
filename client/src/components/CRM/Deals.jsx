import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { dealsAPI } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const defaultAvatar =
    "/assets/img/users/user-09.jpg";

// Stage configuration
const stageConfig = [
    { stage: "New", color: "purple", apiStage: "New" },
    { stage: "Prospect", color: "info", apiStage: "Prospect" },
    { stage: "Proposal", color: "warning", apiStage: "Proposal" },
    { stage: "Won", color: "success", apiStage: "Won" },
];

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
    const [exportType, setExportType] = useState("");

    const initialForm = {
        dealName: "",
        pipeline: "",
        stage: "",
        status: "",
        dealValue: "",
        currency: "",
        period: "",
        periodValue: "",
        contact: "",
        project: "",
        dueDate: "",
        closingDate: "",
        assignee: "",
        tags: "",
        followupDate: "",
        source: "",
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

    // Load deals from API on component mount
    useEffect(() => {
        loadDeals();
    }, []);

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

    // Load deals from API
    const loadDeals = async () => {
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
    };


    const makeInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

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
        if (!deal) return;

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
                project: fullDealData.project || fullDealData.location || deal.location || "", // Backend sends 'project'
                assignee: fullDealData.assignee || fullDealData.owner || deal.owner || "",
                stage: fullDealData.status || fullDealData.stage || deal.stage || dealsState[stageIndex]?.stage || "New", // Backend sends 'status'
                pipeline: fullDealData.pipeline || "",
                status: fullDealData.status || "",
                currency: fullDealData.currency || "",
                tags: fullDealData.tags || "",
                source: fullDealData.source || "",
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
                deal_name: formData.dealName || "Untitled Deal", // Backend expects 'deal_name', not 'name'
                pipeline: formData.pipeline || null,
                status: formData.status || selectedStage || "Open", // Backend expects 'status', not 'stage'
                deal_value: formData.dealValue ? parseFloat(formData.dealValue) : null, // Backend expects 'deal_value', not 'value'
                currency: formData.currency || null,
                period: formData.period || null,
                period_value: formData.periodValue ? parseInt(formData.periodValue) : null,
                contact: formData.contact || null, // Backend expects 'contact', not 'email'
                project: formData.project || null, // Backend expects 'project', not 'location'
                due_date: formData.dueDate || null, // Backend expects 'due_date', not 'dueDate'
                expected_closing_date: formData.closingDate || null, // Backend expects 'expected_closing_date', not 'closingDate'
                assignee: formData.assignee || null,
                tags: formData.tags || null,
                followup_date: formData.followupDate || null, // Backend expects 'followup_date', not 'followupDate'
                source: formData.source || null,
                priority: formData.priority || null,
                description: formData.description || null,
            };

            // Remove empty strings and convert to null
            Object.keys(dealData).forEach(key => {
                if (dealData[key] === "") {
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
                <div>
                    <h1 className="mb-1 mt-2 fs-4"><b>Deals</b></h1>
                </div>

                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                    <div className="me-2 mb-2 dropdown">
                        <button
                            className="btn btn-white dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            <i className="ti ti-file-export me-1" /> Export
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleExports("PDF")}
                                >
                                    PDF
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => handleExport("Excel")}
                                >
                                    Excel
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-2">

                        <Button
                            variant="secondary"
                            onClick={() => {
                                openAddModal(0);
                            }}
                        >
                            <i className="ti ti-circle-plus me-2" />
                            Add Deal
                        </Button>
                    </div>
                </div>
            </div>


            {/* Deals Grid Header */}
            <div className="card w-100 mb-3">
                <div className="card-body p-3 d-flex justify-content-between">
                    <h5 className="fs-6"><b>Deals Grid</b></h5>
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-white dropdown-toggle"
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
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => openAddModal(stageIndex)}
                                        >
                                            <i className="ti ti-circle-plus" />
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

                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-link me-2"
                                                            onClick={() => openEditModal(stageIndex, dealIndex)}
                                                        >
                                                            <i className="ti ti-edit" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-link text-danger"
                                                            onClick={() => openDeleteModal(stageIndex, dealIndex)}
                                                        >
                                                            <i className="ti ti-trash" />
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
            <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)} size="lg" centered>
                <Form onSubmit={handleSave}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? "Edit Deal" : "Add New Deal"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">
                            {/* Deal Name */}
                            <div className="col-md-12 mb-3">
                                <Form.Label>Deal Name<span className="text-danger">*</span></Form.Label>
                                <Form.Control
                                    name="dealName"
                                    value={formData.dealName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Pipeline */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Pipeline
                                    <span className="text-danger">*</span></Form.Label>

                                <Form.Select name="pipeline" value={formData.pipeline} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option>Sales</option>
                                    <option>Marketing</option>
                                    <option>Calls</option>
                                </Form.Select>
                            </div>

                            {/* Stage */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Stage<span className="text-danger">*</span></Form.Label>
                                <Form.Select name="stage" value={formData.stage} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option value="New">New</option>
                                    <option value="Prospect">Prospect</option>
                                    <option value="Proposal">Proposal</option>
                                    <option value="Won">Won</option>
                                </Form.Select>
                            </div>

                            {/* Status */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Status<span className="text-danger">*</span></Form.Label>
                                <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                                    <option value="">Select</option>
                                    <option>Open</option>
                                    <option>Won</option>
                                    <option>Lost</option>
                                </Form.Select>
                            </div>

                            {/* Deal Value */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Deal Value<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="dealValue" value={formData.dealValue} onChange={handleChange} />
                            </div>

                            {/* Currency */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Currency<span className="text-danger">*</span></Form.Label>
                                <Form.Select name="currency" value={formData.currency} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option>Rupee</option>
                                    <option>Dollar</option>
                                    <option>Euro</option>
                                </Form.Select>
                            </div>

                            {/* Period */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Period<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="period" value={formData.period} onChange={handleChange} />
                            </div>

                            {/* Period Value */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Period Value<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="periodValue" value={formData.periodValue} onChange={handleChange} />
                            </div>

                            {/* Contact */}
                            <div className="col-md-12 mb-3">
                                <Form.Label>Contact<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="contact" value={formData.contact} onChange={handleChange} />
                            </div>

                            {/* Project */}
                            <div className="col-md-12 mb-3">
                                <Form.Label>Project<span className="text-danger">*</span></Form.Label>
                                <Form.Select name="project" value={formData.project} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option>Office Management App</option>
                                    <option>Clinic Management</option>
                                    <option>Educational Platform</option>
                                </Form.Select>
                            </div>

                            {/* Dates */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Due Date<span className="text-danger">*</span></Form.Label>
                                <Form.Control type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <Form.Label>Expected Closing Date<span className="text-danger">*</span></Form.Label>
                                <Form.Control type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} />
                            </div>

                            {/* Assignee */}
                            <div className="col-md-12 mb-3">
                                <Form.Label>Assignee<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="assignee" value={formData.assignee} onChange={handleChange} />
                            </div>

                            {/* Tags */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Tags<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="tags" value={formData.tags} onChange={handleChange} />
                            </div>

                            {/* Followup Date */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Followup Date<span className="text-danger">*</span></Form.Label>
                                <Form.Control type="date" name="followupDate" value={formData.followupDate} onChange={handleChange} />
                            </div>

                            {/* Source */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Source<span className="text-danger">*</span></Form.Label>
                                <Form.Select name="source" value={formData.source} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option>Phone Calls</option>
                                    <option>Social Media</option>
                                    <option>Referral Sites</option>
                                    <option>Web Analytics</option>
                                    <option>Previous Purchase</option>
                                </Form.Select>
                            </div>

                            {/* Priority */}
                            <div className="col-md-6 mb-3">
                                <Form.Label>Priority<span className="text-danger">*</span></Form.Label>
                                <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option>High</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                </Form.Select>
                            </div>

                            {/* Description */}
                            <div className="col-md-12 mb-3">
                                <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                                <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="light" onClick={() => setShowAddEditModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="secondary">
                            {isEditing ? "Save" : "Add Deal"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>


            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Body className="text-center">
                    <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                        <i className="ti ti-trash fs-36" />
                    </span>
                    <h4 className="mb-1">Confirm Delete</h4>
                    <p className="mb-3">
                        You want to delete{" "}
                        <b>
                            {selectedStageIndex !== null && selectedDealIndex !== null
                                ? dealsState[selectedStageIndex].deals[selectedDealIndex]?.title
                                : ""}
                        </b>{" "}
                        ? This can’t be undone.
                    </p>
                    <div className="d-flex justify-content-center">
                        <Button variant="light" className="me-3" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Yes, Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            
        </div>
    );
}
