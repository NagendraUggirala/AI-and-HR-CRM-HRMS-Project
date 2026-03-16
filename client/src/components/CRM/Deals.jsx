import React, { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { dealsAPI } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from '@iconify/react';

// Default avatar - using a data URI for a fallback avatar
const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23e9ecef'/%3E%3Ctext x='20' y='25' font-size='18' text-anchor='middle' fill='%236c757d' font-family='Arial, sans-serif'%3E👤%3C/text%3E%3C/svg%3E";

// Stage configuration
const stageConfig = [
    { stage: "New", color: "primary", apiStage: "New" },
    { stage: "Prospect", color: "info", apiStage: "Prospect" },
    { stage: "Proposal", color: "warning", apiStage: "Proposal" },
    { stage: "Won", color: "success", apiStage: "Won" },
];

// Helper function to format amount in Indian Rupees
const formatAmount = (value) => {
    if (!value || value === 0) return "₹0/-";
    
    // Handle different input types
    let numValue;
    if (typeof value === 'string') {
        // Remove any existing formatting
        numValue = parseFloat(value.replace(/[₹,/-]/g, ''));
    } else {
        numValue = value;
    }
    
    if (isNaN(numValue) || numValue === 0) return "₹0/-";
    
    // Format in Indian numbering system (lakhs, crores)
    const formatter = new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });
    
    return `₹${formatter.format(numValue)}/-`;
};

// Helper function to format phone number with +91
const formatPhoneNumber = (phone) => {
    if (!phone) return "Not available";
    
    // Convert to string and clean
    const phoneStr = phone.toString().trim();
    if (!phoneStr) return "Not available";
    
    // If it's already formatted with +91, return as is
    if (phoneStr.includes('+91')) {
        return phoneStr;
    }
    
    // Remove all non-numeric characters
    const cleaned = phoneStr.replace(/\D/g, '');
    
    if (!cleaned) return "Not available";
    
    // Check if it's a 10-digit Indian mobile number
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    // Check if it's an 11-digit number (with leading 0)
    else if (cleaned.length === 11 && cleaned.startsWith('0')) {
        return `+91 ${cleaned.slice(1, 6)} ${cleaned.slice(6)}`;
    }
    // Check if it's a 12-digit number (with 91 country code)
    else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
    // For other lengths, try to format as international number
    else if (cleaned.length > 10) {
        // Try to format as international number
        const countryCode = cleaned.slice(0, cleaned.length - 10);
        const number = cleaned.slice(-10);
        return `+${countryCode} ${number.slice(0, 5)} ${number.slice(5)}`;
    }
    
    // Return cleaned number with +91 if it looks like Indian number
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    
    return cleaned;
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
    const stageProgress = {
        "New": 25,
        "Prospect": 50,
        "Proposal": 75,
        "Won": 100
    };
    const dealStage = deal.status || deal.stage || "";
    return stageProgress[dealStage] || 0;
};

const makeInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

// Get first letter of name
const getFirstLetter = (name) => {
    if (!name || name === "Unassigned") return "?";
    return name.charAt(0).toUpperCase();
};

// Comprehensive phone number extraction function
const extractPhoneNumber = (deal) => {
    // Array of all possible phone field names to check
    const possiblePhoneFields = [
        // Common field names
        'phone', 'mobile', 'Phone', 'Mobile',
        'contact_number', 'mobile_number', 'phone_number',
        'contactNo', 'mobileNo', 'phoneNo',
        'contact_phone', 'contact_mobile',
        'primary_phone', 'primary_mobile',
        'customer_phone', 'customer_mobile',
        'alternate_phone', 'alternate_mobile',
        'work_phone', 'work_mobile',
        'home_phone', 'home_mobile',
        'cell', 'cellphone', 'cell_phone',
        'telephone', 'tel', 'contact_tel',
        'phone1', 'phone2', 'mobile1', 'mobile2',
        'contact_phone_number', 'contact_mobile_number',
        'customer_phone_number', 'customer_mobile_number',
        'phone_no', 'mobile_no', 'contact_no',
        'whatsapp', 'whatsapp_number',
        
        // Field names with underscores
        'phone_1', 'phone_2', 'mobile_1', 'mobile_2',
        'primary_phone_number', 'secondary_phone',
        
        // Field names without underscores
        'phonenumber', 'mobilenumber', 'contactnumber',
        'primaryphone', 'secondaryphone',
        
        // Variations with 'num' instead of 'number'
        'phonenum', 'mobilenum', 'contactnum',
        
        // Common API response fields
        'contactPhone', 'contactMobile',
        'customerPhone', 'customerMobile',
        'assigneePhone', 'ownerPhone',
        'dealPhone', 'dealMobile',
        
        // Field names from your specific API
        'phoneNumber', 'mobileNumber', 'contactNumber',
        'phoneNum', 'mobileNum', 'contactNum',
        'contact_phone_num', 'contact_mobile_num',
        'customer_phone_num', 'customer_mobile_num',
        
        // Indian specific
        'mobile_no_india', 'phone_no_india',
        
        // Additional variations
        'phone_number_primary', 'phone_number_secondary',
        'mobile_number_primary', 'mobile_number_secondary',
        'contact_phone_primary', 'contact_phone_secondary',
        'contact_mobile_primary', 'contact_mobile_secondary'
    ];

    // Check direct fields first
    for (const field of possiblePhoneFields) {
        if (deal[field] && deal[field].toString().trim()) {
            return deal[field];
        }
    }

    // Check if phone is in a nested contact object
    if (deal.contact && typeof deal.contact === 'object') {
        for (const field of possiblePhoneFields) {
            if (deal.contact[field] && deal.contact[field].toString().trim()) {
                return deal.contact[field];
            }
        }
    }

    // Check if phone is in a nested customer object
    if (deal.customer && typeof deal.customer === 'object') {
        for (const field of possiblePhoneFields) {
            if (deal.customer[field] && deal.customer[field].toString().trim()) {
                return deal.customer[field];
            }
        }
    }

    // Check if phone is in a nested assignee object
    if (deal.assignee && typeof deal.assignee === 'object') {
        for (const field of possiblePhoneFields) {
            if (deal.assignee[field] && deal.assignee[field].toString().trim()) {
                return deal.assignee[field];
            }
        }
    }

    // Check if phone is in a nested owner object
    if (deal.owner && typeof deal.owner === 'object') {
        for (const field of possiblePhoneFields) {
            if (deal.owner[field] && deal.owner[field].toString().trim()) {
                return deal.owner[field];
            }
        }
    }

    // Check for phone in metadata or custom fields
    if (deal.metadata && typeof deal.metadata === 'object') {
        for (const field of possiblePhoneFields) {
            if (deal.metadata[field] && deal.metadata[field].toString().trim()) {
                return deal.metadata[field];
            }
        }
    }

    // Check for phone in customFields
    if (deal.customFields && typeof deal.customFields === 'object') {
        for (const field of possiblePhoneFields) {
            if (deal.customFields[field] && deal.customFields[field].toString().trim()) {
                return deal.customFields[field];
            }
        }
    }

    // If still not found, try to find any field that contains 'phone' or 'mobile' in its name
    for (const key in deal) {
        if (typeof deal[key] !== 'object' && 
            (key.toLowerCase().includes('phone') || 
             key.toLowerCase().includes('mobile') || 
             key.toLowerCase().includes('contact') || 
             key.toLowerCase().includes('cell'))) {
            if (deal[key] && deal[key].toString().trim()) {
                return deal[key];
            }
        }
    }

    return "";
};

// Transform API deals data to Kanban structure
const transformDealsToKanban = (dealsData) => {
    if (!Array.isArray(dealsData)) return stageConfig.map(s => ({ ...s, leads: 0, amount: "₹0/-", deals: [] }));

    const stages = stageConfig.map(stageConfigItem => {
        const stageDeals = dealsData
            .filter(deal => {
                const dealStage = deal.status || deal.stage || "";
                return dealStage.trim() === stageConfigItem.apiStage;
            })
            .map(deal => {
                // Extract phone number using comprehensive function
                const rawPhone = extractPhoneNumber(deal);
                
                return {
                    id: deal.id,
                    initials: makeInitials(deal.assignee || deal.owner || deal.deal_name || deal.name || ""),
                    title: deal.deal_name || deal.name || "Untitled Deal",
                    amount: formatAmount(deal.deal_value || deal.amount || 0),
                    email: deal.contact || deal.email || deal.contact_email || "",
                    phone: formatPhoneNumber(rawPhone),
                    rawPhoneForEdit: rawPhone, // Store raw phone for editing
                    location: deal.project || deal.location || "India",
                    owner: deal.assignee || deal.owner || "",
                    ownerName: deal.assignee || deal.owner || "Unassigned",
                    ownerImg: defaultAvatar,
                    progress: calculateProgress(deal),
                    date: formatDate(deal.expected_closing_date || deal.closingDate || deal.due_date || new Date()),
                    stage: deal.status || deal.stage || stageConfigItem.apiStage,
                };
            });

        const totalAmount = stageDeals.reduce((sum, deal) => {
            const amount = parseFloat((deal.amount || "₹0").replace(/[₹,/-]/g, '')) || 0;
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
        stageConfig.map(s => ({ ...s, leads: 0, amount: "₹0/-", deals: [] }))
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
    const [imageErrors, setImageErrors] = useState({}); // Track image load errors
    const [uploadedImages, setUploadedImages] = useState({}); // Store uploaded images

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
        customProject: "",
        dueDate: "",
        closingDate: "",
        assignee: "",
        tags: "",
        followupDate: "",
        source: "",
        customSource: "",
        priority: "",
        description: "",
        phone: "",
        profileImage: null,
    };
    const [formData, setFormData] = useState(initialForm);

    // Load deals from API only
    const loadDeals = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await dealsAPI.list();
            
            if (Array.isArray(data) && data.length > 0) {
                setDealsState(transformDealsToKanban(data));
            } else {
                // If no data from API, show empty state
                setDealsState(stageConfig.map(s => ({ ...s, leads: 0, amount: "₹0/-", deals: [] })));
                setError("No deals found");
            }
        } catch (err) {
            console.error("Error loading deals:", err);
            setError("Failed to load deals from API. Please try again later.");
            // Keep empty state on error
            setDealsState(stageConfig.map(s => ({ ...s, leads: 0, amount: "₹0/-", deals: [] })));
        } finally {
            setLoading(false);
        }
    }, []);

    // Load deals on component mount
    useEffect(() => {
        loadDeals();
    }, [loadDeals]);

    // Handle image error
    const handleImageError = (dealId) => {
        setImageErrors(prev => ({ ...prev, [dealId]: true }));
    };

    // Handle image upload
    const handleImageUpload = (e, dealId) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImages(prev => ({
                    ...prev,
                    [dealId]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Open Add Modal
    const openAddModal = (stageIndex) => {
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(null);
        setIsEditing(false);
        setEditingDealId(null);
        const selectedStage = dealsState[stageIndex]?.stage || "New";
        setFormData({ 
            ...initialForm, 
            stage: selectedStage,
            currency: "Rupee",
            priority: "Medium"
        });
        setShowAddEditModal(true);
    };

    // Open Edit Modal - Fixed phone number handling
    const openEditModal = (stageIndex, dealIndex) => {
        const deal = dealsState[stageIndex].deals[dealIndex];
        if (!deal) return;

        // Get raw phone number directly from the deal object
        let rawPhone = "";
        
        // Try to get the raw phone from the stored rawPhoneForEdit first
        if (deal.rawPhoneForEdit) {
            rawPhone = deal.rawPhoneForEdit.toString().replace(/\D/g, '');
        } 
        // If not available, extract from formatted phone
        else if (deal.phone && deal.phone !== "Not available") {
            // Remove formatting and extract numbers
            rawPhone = deal.phone.toString().replace(/[^\d]/g, '');
            // Remove +91 if present at the beginning
            if (rawPhone.startsWith('91') && rawPhone.length > 10) {
                rawPhone = rawPhone.substring(2);
            }
        }

        // Ensure we have a valid phone number (max 10 digits for editing)
        if (rawPhone && rawPhone.length > 10) {
            rawPhone = rawPhone.slice(-10); // Take last 10 digits
        }

        console.log("Editing deal - phone:", deal.phone, "raw:", rawPhone); // Debug log

        setFormData({
            ...initialForm,
            dealName: deal.title || "",
            stage: deal.stage || "",
            dealValue: deal.amount ? deal.amount.replace(/[₹,/-]/g, "").trim() : "",
            currency: "Rupee",
            contact: deal.email || "",
            phone: rawPhone, // Use cleaned phone number
            project: deal.location || "India",
            assignee: deal.owner || "",
            closingDate: deal.date ? new Date(deal.date).toISOString().split('T')[0] : "",
            priority: "Medium",
            profileImage: uploadedImages[deal.id] || null,
        });
        
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(dealIndex);
        setEditingDealId(deal.id);
        setIsEditing(true);
        setShowAddEditModal(true);
    };

    const handleExport = (type) => {
        if (type === "Excel") {
            const worksheet = XLSX.utils.json_to_sheet(dealsState.flatMap(s => s.deals));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Deals");
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(blob, "deals.xlsx");
            toast.success("Excel exported successfully!");
        } else if (type === "PDF") {
            const doc = new jsPDF();
            doc.text("Deals Report", 10, 10);
            dealsState.forEach((stage, i) => {
                doc.text(`${stage.stage} (${stage.deals.length} deals) - ${stage.amount}`, 10, 20 + i * 10);
            });
            doc.save("deals.pdf");
            toast.success("PDF exported successfully!");
        }
    };

    // Save (Add or Edit)
    const handleSave = async (e) => {
        e.preventDefault();
        
        try {
            setError(null);

            const selectedStage = formData.stage || "New";

            // Clean phone number - remove any spaces or special characters
            const cleanPhone = formData.phone ? formData.phone.toString().replace(/\D/g, '') : "";

            const dealData = {
                deal_name: formData.dealName || "Untitled Deal",
                deal_value: formData.dealValue ? parseFloat(formData.dealValue.toString().replace(/,/g, '')) : 0,
                status: selectedStage,
                contact: formData.contact || "",
                // Send phone in multiple formats to ensure it's saved
                phone: cleanPhone,
                mobile: cleanPhone,
                contact_number: cleanPhone,
                mobile_number: cleanPhone,
                contact_phone: cleanPhone,
                customer_phone: cleanPhone,
                phone_number: cleanPhone,
                project: formData.project || "India",
                assignee: formData.assignee || "",
                expected_closing_date: formData.closingDate || new Date().toISOString().split('T')[0],
                currency: formData.currency || "Rupee",
                priority: formData.priority || "Medium",
                pipeline: formData.pipeline || "Sales",
                profileImage: formData.profileImage,
            };

            console.log("Saving deal with phone:", cleanPhone); // Debug log

            if (isEditing && editingDealId) {
                await dealsAPI.update(editingDealId, dealData);
                toast.success("Deal updated successfully!");
            } else {
                await dealsAPI.create(dealData);
                toast.success("Deal created successfully!");
            }

            await loadDeals();
            setShowAddEditModal(false);
            setIsEditing(false);
            setEditingDealId(null);
            setSelectedDealIndex(null);
            setSelectedStageIndex(null);
            setFormData(initialForm);
            
        } catch (err) {
            console.error("Error saving deal:", err);
            toast.error("Failed to save deal. Please try again.");
        }
    };

    // Open delete modal
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
            await dealsAPI.delete(deal.id);
            toast.success("Deal deleted successfully!");
            await loadDeals();
            setShowDeleteModal(false);
            setSelectedStageIndex(null);
            setSelectedDealIndex(null);
        } catch (err) {
            console.error("Error deleting deal:", err);
            toast.error("Failed to delete deal. Please try again.");
        }
    };

    // Input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-fluid px-2 py-3" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
            <ToastContainer position="top-right" autoClose={3000} />

            {error && (
                <div className="alert alert-info alert-dismissible fade show mb-3" role="alert">
                    <Icon icon="heroicons:information-circle" className="me-2" />
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

            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h4 className="fw-bold h4 d-flex align-items-center gap-2 mb-1" style={{ fontSize: '1.5rem' }}>
                        <Icon icon="heroicons:queue-list" className="text-black" width={24} height={24} />
                        Deals
                    </h4>
                    <p className="text-muted d-flex align-items-center mb-0" style={{ fontSize: '0.85rem' }}>
                        Monitor pipeline performance and move deals smoothly from prospect to closure.
                    </p>
                </div>

                <div className="d-flex gap-2">
                    {/* Export Dropdown */}
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                            <Icon icon="heroicons:arrow-down-tray" className="me-1" width="16" />
                            Export
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-2">
                            <li>
                                <button className="dropdown-item rounded-1 d-flex align-items-center" onClick={() => handleExport("PDF")}>
                                    <Icon icon="heroicons:document-text" className="me-2 text-danger" width="16" />
                                    PDF
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item rounded-1 d-flex align-items-center" onClick={() => handleExport("Excel")}>
                                    <Icon icon="heroicons:table-cells" className="me-2 text-success" width="16" />
                                    Excel
                                </button>
                            </li>
                        </ul>
                    </div>

                    <button className="btn btn-primary btn-sm d-flex align-items-center" onClick={() => openAddModal(0)}>
                        <Icon icon="heroicons:plus-circle" className="me-1" width="16" />
                        Add Deal
                    </button>
                </div>
            </div>

            {/* Deals Grid Header */}
            <div className="card mb-3">
                <div className="card-body py-2 px-3 d-flex justify-content-between align-items-center">
                    <h6 className="fw-semibold d-flex align-items-center mb-0">            
                        Deals Grid
                    </h6>
                    <div className="dropdown">
                        <button className="btn btn-light btn-sm dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                            <Icon icon="heroicons:funnel" className="me-1" width="14" />
                            Sort By : {sortBy}
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item d-flex align-items-center" onClick={() => setSortBy("Last 7 Days")}>
                                <Icon icon="heroicons:calendar" className="me-2" width="14" />Last 7 Days
                            </button></li>
                            <li><button className="dropdown-item d-flex align-items-center" onClick={() => setSortBy("Monthly")}>
                                <Icon icon="heroicons:calendar-days" className="me-2" width="14" />Monthly
                            </button></li>
                            <li><button className="dropdown-item d-flex align-items-center" onClick={() => setSortBy("Weekly")}>
                                <Icon icon="heroicons:calendar" className="me-2" width="14" />Weekly
                            </button></li>
                            <li><button className="dropdown-item d-flex align-items-center" onClick={() => setSortBy("Yearly")}>
                                <Icon icon="heroicons:calendar" className="me-2" width="14" />Yearly
                            </button></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Kanban Board - 4 columns side by side */}
            <div className="row g-2">
                {dealsState.map((stage, stageIndex) => (
                    <div key={stage.stage} className="col-12 col-md-6 col-lg-3">
                        {/* Stage Header */}
                        <div className="card mb-2">
                            <div className="card-body py-2 px-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fw-semibold d-flex align-items-center mb-0" style={{ fontSize: '0.9rem' }}>
                                            <span className={`badge bg-${stage.color} p-1 me-1`} style={{ width: '6px', height: '6px', borderRadius: '50%' }} />
                                            <Icon icon={stage.stage === "Won" ? "heroicons:trophy" : 
                                                       stage.stage === "Proposal" ? "heroicons:document-text" :
                                                       stage.stage === "Prospect" ? "heroicons:user-group" :
                                                       "heroicons:star"} 
                                                   className={`me-1 text-${stage.color}`} width="14" />
                                            {stage.stage}
                                        </h6>
                                        <span className="text-muted d-flex align-items-center" style={{ fontSize: '0.75rem' }}>
                                            <Icon icon="heroicons:currency-rupee" className="me-1" width="12" />
                                            {stage.leads} Deals - {stage.amount}
                                        </span>
                                    </div>
                                    <button className="btn btn-link text-muted p-0" onClick={() => openAddModal(stageIndex)}>
                                        <Icon icon="heroicons:ellipsis-vertical" width="16" />
                                    </button>
                                </div>
                            </div>
                        </div>

                  {/* Deals Cards */}
<div className="d-flex flex-column gap-2">
    {stage.deals.map((deal, dealIndex) => (
        <div key={deal.id || dealIndex} className="card" style={{ minHeight: '300px' }}>
            <div className="card-body p-3 d-flex flex-column">
                {/* Colored top border */}
                <div className={`bg-${stage.color} mb-3`} style={{ height: '3px', width: '100%' }} />

           {/* Title with Deal Name Icon - Now on left side with single line */}
<div className="d-flex align-items-center mb-3" style={{ maxWidth: '100%' }}>
    <div 
        className="rounded-circle d-flex align-items-center justify-content-center bg-light me-2 flex-shrink-0"
        style={{ 
            width: '22px', 
            height: '22px',
            backgroundColor: '#e9ecef',
            border: '1px solid #dee2e6'
        }}
    >
        <span className="fw-bold" style={{ fontSize: '14px', color: '#495057' }}>
            {deal.title ? deal.title.charAt(0).toUpperCase() : 'D'}
        </span>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}> {/* This ensures the text container can shrink */}
        <h6 
            className="fw-semibold mb-0 text-truncate" 
            style={{ 
                fontSize: '1rem', 
                color: '#333',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}
            title={deal.title} // Shows full name on hover
        >
            {deal.title}
        </h6>
    </div>
</div>

                {/* Deal details - 4 lines */}
                <div className="mb-3" style={{ fontSize: '0.85rem' }}>
                    <div className="d-flex align-items-center mb-2">
                        <Icon icon="heroicons:currency-rupee" className="text-dark me-2" width="14" />
                        <span className="text-truncate">{deal.amount}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <Icon icon="heroicons:envelope" className="text-dark me-2" width="14" />
                        <span className="text-truncate">{deal.email || "No email"}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <Icon icon="heroicons:phone" className="text-dark me-2" width="14" />
                        <span className={`text-truncate ${deal.phone === "Not available" ? "text-muted" : ""}`}>
                            {deal.phone}
                        </span>
                    </div>
                    <div className="d-flex align-items-center">
                        <Icon icon="heroicons:map-pin" className="text-dark me-2" width="14" />
                        <span className="text-truncate">{deal.location}</span>
                    </div>
                </div>

                {/* Photo and Name with First Letter - Side by Side */}
                <div className="d-flex align-items-center mb-3" style={{ gap: '8px' }}>
                    {/* Photo with upload */}
                    <div className="position-relative" style={{ flexShrink: 0 }}>
                        <div 
                            className="rounded-circle d-flex align-items-center justify-content-center overflow-hidden" 
                            style={{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: '#e9ecef',
                                border: '2px solid #fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                cursor: 'pointer'
                            }}
                            onClick={() => document.getElementById(`file-input-${deal.id}`).click()}
                        >
                            {uploadedImages[deal.id] ? (
                                <img 
                                    src={uploadedImages[deal.id]} 
                                    alt={deal.ownerName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : imageErrors[deal.id] ? (
                                <span className="fw-bold" style={{ fontSize: '16px', color: '#495057' }}>
                                    {deal.ownerName === "Unassigned" ? "?" : getFirstLetter(deal.ownerName)}
                                </span>
                            ) : (
                                <img 
                                    src={deal.ownerImg} 
                                    alt={deal.ownerName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={() => handleImageError(deal.id)}
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            id={`file-input-${deal.id}`}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageUpload(e, deal.id)}
                        />
                        <div 
                            className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ 
                                width: '16px', 
                                height: '16px',
                                cursor: 'pointer',
                                border: '2px solid #fff'
                            }}
                            onClick={() => document.getElementById(`file-input-${deal.id}`).click()}
                        >
                            <Icon icon="heroicons:camera" width="10" color="white" />
                        </div>
                    </div>

                    {/* Name with First Letter Highlighted - Fixed for Unassigned */}
                    <div className="d-flex align-items-center" style={{ gap: '2px' }}>
                        {deal.ownerName === "Unassigned" ? (
                            <span className="fw-semibold" style={{ fontSize: '0.9rem', color: '#555' }}>
                                {deal.ownerName}
                            </span>
                        ) : (
                            <>
                                <span className="fw-bold text-primary" style={{ fontSize: '1rem' }}>
                                    {getFirstLetter(deal.ownerName)}
                                </span>
                                <span className="fw-semibold" style={{ fontSize: '0.9rem', color: '#555' }}>
                                    {deal.ownerName.substring(1)}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Progress Badge - aligned to right */}
                    <div className="ms-auto">
                        <span className="badge" style={{ backgroundColor: '#e6f3ff', color: '#0066cc', fontSize: '0.75rem', padding: '4px 8px' }}>
                            {deal.progress}%
                        </span>
                    </div>
                </div>

                {/* Footer with date and actions side by side */}
                <div className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderTopColor: '#dee2e6', marginTop: 'auto' }}>
                    <span className="text-muted" style={{ fontSize: '0.78rem' }}>
                        {deal.date}
                    </span>
                    <div className="d-flex align-items-center gap-2">
                        <button 
                            className="job-listings-btn d-inline-flex align-items-center"
                            style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                            onClick={() => openEditModal(stageIndex, dealIndex)}
                        >
                            <Icon icon="heroicons:pencil-square" width="14" height="14" />
                            <span>Edit</span>
                        </button>
                        <button 
                            className="delete-btn d-inline-flex align-items-center"
                            style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                            onClick={() => openDeleteModal(stageIndex, dealIndex)}
                        >
                            <Icon icon="heroicons:trash" width="14" height="14" className="me-1" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ))}
    {stage.deals.length === 0 && (
        <div className="text-center text-muted p-4 border rounded bg-light d-flex flex-column align-items-center" style={{ fontSize: '0.85rem', minHeight: '120px' }}>
            <Icon icon="heroicons:document" width="20" className="text-muted mb-2" />
            No deals
        </div>
    )}
</div>
                    </div>
                ))}
            </div>
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
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center">
                                    <Icon icon="heroicons:exclamation-triangle" className="me-2 text-warning" width="20" />
                                    Confirm Delete
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <Icon icon="heroicons:trash" className="text-danger mb-3" width="40" />
                                <p className="mb-0">Are you sure you want to delete this deal? This action cannot be undone.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary d-flex align-items-center" onClick={() => setShowDeleteModal(false)}>
                                    <Icon icon="heroicons:x-mark" className="me-1" width="16" />
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger d-flex align-items-center" onClick={handleDelete}>
                                    <Icon icon="heroicons:trash" className="me-1" width="16" />
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