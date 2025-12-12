import React, { useState } from "react";
import { Modal, Button, Form, Card, Badge } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

// React Icons Import
import { 
  FiFileText, 
  FiFile, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiX,
  FiCheck,
  FiCalendar,
  FiDollarSign,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiTrendingUp,
  FiGrid,
  FiFilter,
  FiDownload,
  FiCircle,
  FiAlertCircle,
  FiTag,
  FiBriefcase,
  FiGlobe,
  FiTarget,
  FiClock
} from "react-icons/fi";

// Dummy avatar image paths
const dummyImages = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop&crop=face",
];

const defaultAvatar = dummyImages[0];

export default function Deals() {
    const initialDealsData = [
        {
            stage: "New",
            color: "primary",
            icon: <FiCircle />,
            leads: 3,
            amount: "16,90,000/-",
            deals: [
                {
                    initials: "WR",
                    title: "Website Redesign",
                    amount: "4,30,000/-",
                    email: "scalantv@gmail.com",
                    phone: "9556987534",
                    location: "India",
                    owner: "Sushanth",
                    ownerImg: dummyImages[0],
                    progress: "85%",
                    date: "10 Jan 2024",
                },
                {
                    initials: "CB",
                    title: "Cloud Backup",
                    amount: "5,00,000/-",
                    email: "raghav234@gmal.com",
                    phone: "9876543210",
                    location: "India",
                    owner: "Raghav",
                    ownerImg: dummyImages[1],
                    progress: "15%",
                    date: "12 Jan 2024",
                },
                {
                    initials: "EM",
                    title: "Email Marketing",
                    amount: "7,40,000/-",
                    email: "Siddhu543@gmail.com",
                    phone: "9993489516",
                    location: "India",
                    owner: "Siddhartha",
                    ownerImg: dummyImages[2],
                    progress: "95%",
                    date: "10 Jan 2024",
                },
            ],
        },
        {
            stage: "Prospect",
            color: "info",
            icon: <FiUser />,
            leads: 30,
            amount: "19,94,938/-",
            deals: [
                {
                    initials: "AP",
                    title: "App Development",
                    amount: "3,15,000/-",
                    email: "jswz200@gmail.com",
                    phone: "9688776655",
                    location: "India",
                    owner: "Jahnavi",
                    ownerImg: dummyImages[3],
                    progress: "95%",
                    date: "10 Jan 2024",
                },
                {
                    initials: "SL",
                    title: "SaaS Licensing",
                    amount: "6,20,000/-",
                    email: "praveena001@gmail.com",
                    phone: "9997770001",
                    location: "India",
                    owner: "Praveena",
                    ownerImg: dummyImages[4],
                    progress: "15%",
                    date: "12 Jan 2024",
                },
                {
                    initials: "MA",
                    title: "Mobile App Design",
                    amount: "5,50,000/-",
                    email: "aravindaravind@gmail.com",
                    phone: "9823456019",
                    location: "India",
                    owner: "Aravind",
                    ownerImg: dummyImages[5],
                    progress: "65%",
                    date: "10 Jan 2024",
                },
            ],
        },
        {
            stage: "Proposal",
            color: "warning",
            icon: <FiFileText />,
            leads: 30,
            amount: "19,94,938/-",
            deals: [
                {
                    initials: "SS",
                    title: "SEO Services",
                    amount: "8,40,000/-",
                    email: "surya999@gmail.com",
                    phone: "9506348965",
                    location: "India",
                    owner: "Surya Prakash",
                    ownerImg: dummyImages[6],
                    progress: "60%",
                    date: "10 Jan 2024",
                },
                {
                    initials: "UI",
                    title: "UX/UI Design",
                    amount: "4,50,000/-",
                    email: "ankitha890@gmail.com",
                    phone: "9848621906",
                    location: "India",
                    owner: "Ankitha",
                    ownerImg: dummyImages[7],
                    progress: "15%",
                    date: "12 Jan 2024",
                },
            ],
        },
        {
            stage: "Won",
            color: "success",
            icon: <FiCheck />,
            leads: 30,
            amount: "19,94,938/-",
            deals: [
                {
                    initials: "CM",
                    title: "Cloud Migration",
                    amount: "1,80,000/-",
                    email: "kearthilurtech@gmail.com",
                    phone: "9802459355",
                    location: "India",
                    owner: "Kearthi Sunsh",
                    ownerImg: dummyImages[8],
                    progress: "85%",
                    date: "10 Jan 2024",
                },
            ],
        },
    ];

    // states
    const [dealsState, setDealsState] = useState(initialDealsData);
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedStageIndex, setSelectedStageIndex] = useState(null);
    const [selectedDealIndex, setSelectedDealIndex] = useState(null);
    const [sortBy, setSortBy] = useState("Last 7 Days");

    const initialForm = {
        dealName: "",
        dealValue: "",
        contact: "",
        phone: "",
        location: "India",
        assignee: "",
        progress: "",
        date: "",
        stage: "New",
        pipeline: "Sales",
        status: "Open",
        project: "Office Management App",
        source: "Phone Calls",
        priority: "Medium",
    };
    const [formData, setFormData] = useState(initialForm);

    const makeInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    // Open Add Modal
    const openAddModal = (stageIndex = 0) => {
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(null);
        setIsEditing(false);
        setFormData({
            ...initialForm,
            stage: dealsState[stageIndex]?.stage || "New"
        });
        setShowAddEditModal(true);
    };

    // Open Edit Modal
    const openEditModal = (stageIndex, dealIndex) => {
        const deal = dealsState[stageIndex].deals[dealIndex];
        if (!deal) return;

        setFormData({
            ...initialForm,
            dealName: deal.title || "",
            dealValue: deal.amount || "",
            contact: deal.email || "",
            phone: deal.phone || "",
            location: deal.location || "",
            assignee: deal.owner || "",
            progress: deal.progress || "",
            date: deal.date || "",
            stage: dealsState[stageIndex]?.stage || "New"
        });
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(dealIndex);
        setIsEditing(true);
        setShowAddEditModal(true);
    };

    const handleExport = (type) => {
        if (type === "Excel") {
            const allDeals = dealsState.flatMap((stage) =>
                stage.deals.map((deal) => ({
                    Stage: stage.stage,
                    "Deal Name": deal.title,
                    Amount: deal.amount,
                    Email: deal.email,
                    Phone: deal.phone,
                    Location: deal.location,
                    Owner: deal.owner,
                    Progress: deal.progress,
                    Date: deal.date,
                }))
            );

            const worksheet = XLSX.utils.json_to_sheet(allDeals);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Deals");
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(blob, "deals-report.xlsx");
        } else if (type === "PDF") {
            const doc = new jsPDF();
            
            doc.setFontSize(16);
            doc.setTextColor(66, 139, 202);
            doc.text("Deals Report", 20, 20);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            const today = new Date().toLocaleDateString();
            doc.text(`Generated: ${today}`, 20, 30);
            
            let y = 40;
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text("Summary", 20, y);
            
            y += 8;
            doc.setFontSize(10);
            dealsState.forEach((stage) => {
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(`${stage.stage}: ${stage.deals.length} deals, ${stage.amount}`, 
                    25, y);
                y += 7;
            });
            
            doc.save("deals-report.pdf");
        }
    };

    // Save (Add or Edit)
    const handleSave = (e) => {
        e.preventDefault();

        const stageIndex = dealsState.findIndex(stage => stage.stage === formData.stage);
        const randomAvatar = dummyImages[Math.floor(Math.random() * dummyImages.length)];
        
        const cardDeal = {
            initials: makeInitials(formData.assignee || formData.dealName || ""),
            title: formData.dealName || "Untitled Deal",
            amount: formData.dealValue || "",
            email: formData.contact || "",
            phone: formData.phone || "",
            location: formData.location || "India",
            owner: formData.assignee || "",
            ownerImg: randomAvatar,
            progress: formData.progress || "0%",
            date: formData.date || new Date().toLocaleDateString('en-GB'),
        };

        setDealsState((prev) => {
            const copy = prev.map((s) => ({ ...s, deals: [...s.deals] }));
            
            if (isEditing && selectedStageIndex !== null && selectedDealIndex !== null) {
                if (stageIndex !== selectedStageIndex) {
                    copy[selectedStageIndex].deals.splice(selectedDealIndex, 1);
                    copy[stageIndex].deals.push(cardDeal);
                } else {
                    copy[stageIndex].deals[selectedDealIndex] = { ...cardDeal };
                }
            } else {
                if (stageIndex !== -1) {
                    copy[stageIndex].deals.push(cardDeal);
                } else {
                    copy[0].deals.push(cardDeal);
                }
            }
            return copy;
        });

        setShowAddEditModal(false);
        setIsEditing(false);
        setSelectedDealIndex(null);
        setSelectedStageIndex(null);
        setFormData(initialForm);
    };

    // Prepare delete modal
    const openDeleteModal = (stageIndex, dealIndex) => {
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(dealIndex);
        setShowDeleteModal(true);
    };

    // Perform deletion
    const handleDelete = () => {
        if (selectedStageIndex === null || selectedDealIndex === null) {
            setShowDeleteModal(false);
            return;
        }
        setDealsState((prev) => {
            const copy = prev.map((s) => ({ ...s, deals: [...s.deals] }));
            copy[selectedStageIndex].deals.splice(selectedDealIndex, 1);
            return copy;
        });
        setShowDeleteModal(false);
        setSelectedStageIndex(null);
        setSelectedDealIndex(null);
    };

    // input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Get progress color based on percentage
    const getProgressColor = (progress) => {
        const percentage = parseInt(progress) || 0;
        if (percentage >= 80) return "success";
        if (percentage >= 50) return "warning";
        return "danger";
    };

    return (
        <div className="deals-container">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1 className="mb-0 fs-6 fw-bold">
                        <FiTrendingUp className="me-2 text-primary" size={16} />
                        Deals
                    </h1>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <div className="dropdown">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="dropdown-toggle d-flex align-items-center"
                            data-bs-toggle="dropdown"
                        >
                            <FiDownload className="me-1" size={14} />
                            Export
                        </Button>
                        <ul className="dropdown-menu dropdown-menu-end shadow">
                            <li>
                                <button
                                    className="dropdown-item d-flex align-items-center"
                                    onClick={() => handleExport("PDF")}
                                >
                                    <FiFile className="me-2" size={14} />
                                    Export as PDF
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item d-flex align-items-center"
                                    onClick={() => handleExport("Excel")}
                                >
                                    <FiFileText className="me-2" size={14} />
                                    Export as Excel
                                </button>
                            </li>
                        </ul>
                    </div>

                    <Button
                        variant="primary"
                        size="sm"
                        className="d-flex align-items-center"
                        onClick={() => openAddModal()}
                    >
                        <FiPlus className="me-1" size={14} />
                        Add Deal
                    </Button>
                </div>
            </div>

            {/* Deals Grid Section with Sort By on Right */}
            <Card className="mb-3 shadow-sm border-light">
                <Card.Body className="p-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-0 fw-semibold" style={{ fontSize: "0.85rem" }}>
                                Deals Grid
                            </h5>
                        </div>
                        <div className="dropdown">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                className="dropdown-toggle d-flex align-items-center"
                                data-bs-toggle="dropdown"
                            >
                                <FiFilter className="me-1" size={12} />
                                Sort By: {sortBy}
                            </Button>
                            <ul className="dropdown-menu dropdown-menu-end shadow">
                                {["Last 7 Days", "Weekly", "Monthly", "Yearly"].map((option) => (
                                    <li key={option}>
                                        <button
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={() => setSortBy(option)}
                                        >
                                            <FiCalendar className="me-2" size={12} />
                                            {option}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            {/* Deals Grid - Compact Layout */}
            <div className="row g-3 mb-4">
                {dealsState.map((stage, stageIndex) => (
                    <div key={stage.stage} className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <Card className="shadow-sm border-light h-100">
                            <Card.Body className="p-2">
                                {/* Stage Header - Compact */}
                                <div className={`p-2 mb-2 border-bottom`}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Badge bg={stage.color} className="mb-1 px-2 py-1" style={{ fontSize: "0.7rem" }}>
                                                {stage.stage}
                                            </Badge>
                                            <h6 className="mb-0 text-muted" style={{ fontSize: "0.75rem" }}>
                                                {stage.leads} Deals • {stage.amount}
                                            </h6>
                                        </div>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                                            style={{ width: "22px", height: "22px" }}
                                            onClick={() => openAddModal(stageIndex)}
                                            title="Add Deal"
                                        >
                                            <FiPlus size={10} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Stage Deals - Compact Cards */}
                                <div className="p-1">
                                    {stage.deals.map((deal, dealIndex) => (
                                        <div key={`${stageIndex}-${dealIndex}`} className="mb-2 p-2 border rounded">
                                            {/* Deal Header - Top */}
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h6 className="mb-0 fw-bold" style={{ fontSize: "0.8rem" }}>
                                                    {deal.title}
                                                </h6>
                                                <Badge bg={getProgressColor(deal.progress)} className="px-2 py-1" style={{ fontSize: "0.6rem" }}>
                                                    {deal.progress}
                                                </Badge>
                                            </div>

                                            {/* Deal Amount - Prominent */}
                                            <div className="mb-2">
                                                <div className="d-flex align-items-center">
                                                    <FiDollarSign className="text-success me-1" size={9} />
                                                    <span className="fw-bold" style={{ fontSize: "0.75rem" }}>{deal.amount}</span>
                                                </div>
                                            </div>

                                            {/* Contact Info - Compact */}
                                            <div className="mb-2">
                                                <div className="d-flex align-items-center mb-1">
                                                    <FiMail className="text-muted me-1" size={8} />
                                                    <span className="small" style={{ fontSize: "0.65rem" }}>{deal.email}</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <FiPhone className="text-muted me-1" size={8} />
                                                    <span className="small" style={{ fontSize: "0.65rem" }}>{deal.phone}</span>
                                                </div>
                                            </div>

                                            {/* Owner and Actions - Bottom */}
                                            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={deal.ownerImg || dummyImages[Math.floor(Math.random() * dummyImages.length)]}
                                                        alt={deal.owner}
                                                        className="avatar avatar-xs rounded-circle me-1"
                                                        style={{ width: "20px", height: "20px" }}
                                                        onError={(e) => {
                                                            e.target.src = dummyImages[Math.floor(Math.random() * dummyImages.length)]
                                                        }}
                                                    />
                                                    <span className="small text-muted" style={{ fontSize: "0.65rem" }}>{deal.owner}</span>
                                                </div>
                                                <div className="d-flex gap-1">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                                                        style={{ width: "20px", height: "20px" }}
                                                        onClick={() => openEditModal(stageIndex, dealIndex)}
                                                        title="Edit Deal"
                                                    >
                                                        <FiEdit size={9} />
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        className="rounded-circle p-0 d-flex align-items-center justify-content-center"
                                                        style={{ width: "20px", height: "20px" }}
                                                        onClick={() => openDeleteModal(stageIndex, dealIndex)}
                                                        title="Delete Deal"
                                                    >
                                                        <FiTrash2 size={9} />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Date - Small */}
                                            <div className="mt-1 text-end">
                                                <span className="text-muted" style={{ fontSize: "0.6rem" }}>
                                                    <FiCalendar className="me-1" size={6} />
                                                    {deal.date}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {stage.deals.length === 0 && (
                                        <div className="text-center py-3">
                                            <FiAlertCircle className="text-muted mb-1" size={16} />
                                            <p className="text-muted mb-2 small" style={{ fontSize: "0.65rem" }}>No deals in this stage</p>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => openAddModal(stageIndex)}
                                                className="d-flex align-items-center justify-content-center mx-auto"
                                                style={{ fontSize: "0.7rem", padding: "2px 8px" }}
                                            >
                                                <FiPlus className="me-1" size={10} />
                                                Add Deal
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Add / Edit Modal */}
            <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)} size="lg" centered>
                <Modal.Header closeButton className="border-bottom py-2">
                    <Modal.Title className="d-flex align-items-center fs-6">
                        {isEditing ? (
                            <>
                                <FiEdit className="text-warning me-2" size={15} />
                                Edit Deal
                            </>
                        ) : (
                            <>
                                <FiPlus className="text-primary me-2" size={15} />
                                Add New Deal
                            </>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body className="py-2">
                        <div className="row g-2">
                            {/* Deal Name */}
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiTag className="me-1" size={13} />
                                        Deal Name <span className="text-danger ms-1">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        size="sm"
                                        name="dealName"
                                        value={formData.dealName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter deal name"
                                    />
                                </Form.Group>
                            </div>

                            {/* Stage */}
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiGrid className="me-1" size={13} />
                                        Stage <span className="text-danger ms-1">*</span>
                                    </Form.Label>
                                    <Form.Select 
                                        size="sm"
                                        name="stage" 
                                        value={formData.stage} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        {dealsState.map((stage) => (
                                            <option key={stage.stage} value={stage.stage}>
                                                {stage.stage}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            {/* Pipeline & Status */}
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiTarget className="me-1" size={13} />
                                        Pipeline
                                    </Form.Label>
                                    <Form.Select 
                                        size="sm"
                                        name="pipeline" 
                                        value={formData.pipeline} 
                                        onChange={handleChange}
                                    >
                                        <option>Sales</option>
                                        <option>Marketing</option>
                                        <option>Calls</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiClock className="me-1" size={13} />
                                        Status
                                    </Form.Label>
                                    <Form.Select 
                                        size="sm"
                                        name="status" 
                                        value={formData.status} 
                                        onChange={handleChange}
                                    >
                                        <option>Open</option>
                                        <option>Won</option>
                                        <option>Lost</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            {/* Deal Value & Progress */}
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiDollarSign className="me-1" size={13} />
                                        Deal Value <span className="text-danger ms-1">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        size="sm"
                                        name="dealValue" 
                                        value={formData.dealValue} 
                                        onChange={handleChange} 
                                        required
                                        placeholder="0,00,000/-"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiTrendingUp className="me-1" size={13} />
                                        Progress <span className="text-danger ms-1">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        size="sm"
                                        name="progress" 
                                        value={formData.progress} 
                                        onChange={handleChange} 
                                        required
                                        placeholder="e.g., 75%"
                                    />
                                </Form.Group>
                            </div>

                            {/* Contact & Phone */}
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiMail className="me-1" size={13} />
                                        Contact <span className="text-danger ms-1">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        size="sm"
                                        name="contact" 
                                        value={formData.contact} 
                                        onChange={handleChange} 
                                        required
                                        type="email"
                                        placeholder="email@example.com"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiPhone className="me-1" size={13} />
                                        Phone <span className="text-danger ms-1">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        size="sm"
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        required
                                        placeholder="+91 9876543210"
                                    />
                                </Form.Group>
                            </div>

                            {/* Location & Project */}
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiMapPin className="me-1" size={13} />
                                        Location
                                    </Form.Label>
                                    <Form.Control 
                                        size="sm"
                                        name="location" 
                                        value={formData.location} 
                                        onChange={handleChange} 
                                        placeholder="City, Country"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiBriefcase className="me-1" size={13} />
                                        Project
                                    </Form.Label>
                                    <Form.Select 
                                        size="sm"
                                        name="project" 
                                        value={formData.project} 
                                        onChange={handleChange}
                                    >
                                        <option>Office Management App</option>
                                        <option>Clinic Management</option>
                                        <option>Educational Platform</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            {/* Assignee & Date */}
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiUser className="me-1" size={13} />
                                        Assignee <span className="text-danger ms-1">*</span>
                                    </Form.Label>
                                    <Form.Control 
                                        size="sm"
                                        name="assignee" 
                                        value={formData.assignee} 
                                        onChange={handleChange} 
                                        required
                                        placeholder="Enter assignee name"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiCalendar className="me-1" size={13} />
                                        Date
                                    </Form.Label>
                                    <Form.Control 
                                        size="sm"
                                        type="date" 
                                        name="date" 
                                        value={formData.date} 
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>

                            {/* Source & Priority */}
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiGlobe className="me-1" size={13} />
                                        Source
                                    </Form.Label>
                                    <Form.Select 
                                        size="sm"
                                        name="source" 
                                        value={formData.source} 
                                        onChange={handleChange}
                                    >
                                        <option>Phone Calls</option>
                                        <option>Social Media</option>
                                        <option>Referral Sites</option>
                                        <option>Web Analytics</option>
                                        <option>Previous Purchase</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="fw-medium d-flex align-items-center" style={{ fontSize: "0.85rem" }}>
                                        <FiTarget className="me-1" size={13} />
                                        Priority
                                    </Form.Label>
                                    <Form.Select 
                                        size="sm"
                                        name="priority" 
                                        value={formData.priority} 
                                        onChange={handleChange}
                                    >
                                        <option>High</option>
                                        <option>Medium</option>
                                        <option>Low</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="border-top py-2">
                        <Button 
                            variant="light" 
                            size="sm"
                            onClick={() => setShowAddEditModal(false)}
                            className="d-flex align-items-center"
                        >
                            <FiX className="me-1" size={14} />
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            size="sm"
                            variant={isEditing ? "warning" : "primary"}
                            className="d-flex align-items-center"
                        >
                            {isEditing ? (
                                <>
                                    <FiCheck className="me-1" size={14} />
                                    Save Changes
                                </>
                            ) : (
                                <>
                                    <FiPlus className="me-1" size={14} />
                                    Create Deal
                                </>
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered size="md">
                <Modal.Body className="text-center p-3">
                    <div className="avatar avatar-xl bg-danger bg-opacity-10 text-danger rounded-circle mb-2 d-flex align-items-center justify-content-center mx-auto">
                        <FiTrash2 size={24} />
                    </div>
                    <h5 className="mb-2 fw-bold fs-6">Confirm Delete</h5>
                    <p className="text-muted mb-3">
                        Are you sure you want to delete "
                        <span className="fw-bold text-danger">
                            {selectedStageIndex !== null && selectedDealIndex !== null
                                ? dealsState[selectedStageIndex]?.deals[selectedDealIndex]?.title
                                : "this deal"}
                        </span>
                        "? This action cannot be undone.
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                        <Button 
                            variant="light" 
                            size="sm"
                            onClick={() => setShowDeleteModal(false)}
                            className="d-flex align-items-center"
                        >
                            <FiX className="me-1" size={14} />
                            Cancel
                        </Button>
                        <Button 
                            variant="danger" 
                            size="sm"
                            onClick={handleDelete}
                            className="d-flex align-items-center"
                        >
                            <FiTrash2 className="me-1" size={14} />
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Add custom CSS for better alignment and spacing */}
            <style>{`
                .deals-container {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .avatar {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .avatar-xs {
                    width: 18px !important;
                    height: 18px !important;
                    font-size: 0.55rem !important;
                }
                
                .avatar-sm {
                    width: 22px !important;
                    height: 22px !important;
                    font-size: 0.65rem !important;
                }
                
                .avatar-title {
                    margin: 0;
                    line-height: 1;
                }
                
                /* Make cards more compact */
                .card {
                    font-size: 0.8rem !important;
                }
                
                .small {
                    font-size: 0.7rem !important;
                }
                
                /* Better spacing for compact layout */
                .border-bottom {
                    border-bottom: 1px solid #dee2e6 !important;
                }
                
                .border-top {
                    border-top: 1px solid #dee2e6 !important;
                }
                
                /* Ensure consistent spacing */
                .p-1 {
                    padding: 0.2rem !important;
                }
                
                .p-2 {
                    padding: 0.4rem !important;
                }
                
                .mb-1 {
                    margin-bottom: 0.2rem !important;
                }
                
                .mb-2 {
                    margin-bottom: 0.4rem !important;
                }
                
                .me-1 {
                    margin-right: 0.2rem !important;
                }
                
                .me-2 {
                    margin-right: 0.4rem !important;
                }
            `}</style>
        </div>
    );
}