import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";




const defaultAvatar =
    "/assets/img/users/user-09.jpg";

export default function Deals() {
    const initialDealsData = [
        {
            stage: "New",
            color: "purple",
            leads: 3,
            amount: "16,90,000/-",
            deals: [
                {
                    initials: "WR",
                    title: "Website Redesign",
                    amount: "4,50,000/-",
                    email: "sushanth@gmail.com",
                    phone: "9550987534",
                    location: "India",
                    owner: "Sushanth",
                    ownerImg: "/assets/img/users/user-09.jpg",
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
                    ownerImg: "/assets/img/users/user-13.jpg",
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
                    ownerImg: "/assets/img/users/user-32.jpg",
                    progress: "95%",
                    date: "10 Jan 2024",
                },
            ],
        },
        {
            stage: "Prospect",
            color: "info",
            leads: 30,
            amount: "19,94,938/-",
            deals: [
                {
                    initials: "AP",
                    title: "App Development",
                    amount: "3,15,000/-",
                    email: "janu200@gmail.com",
                    phone: "9988776655",
                    location: "India",
                    owner: "Jahnavi",
                    ownerImg: "/assets/img/users/user-22.jpg",
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
                    ownerImg: "/assets/img/users/user-12.jpg",
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
                    ownerImg: "/assets/img/users/user-08.jpg",
                    progress: "65%",
                    date: "10 Jan 2024",
                },
            ],
        },
        {
            stage: "Proposal",
            color: "warning",
            leads: 30,
            amount: "19,94,938/-",
            deals: [
                {
                    initials: "SS",
                    title: "SEO Services",
                    amount: "8,40,000/-",
                    email: "surya999@gmail.com",
                    phone: "9506348195",
                    location: "India",
                    owner: "Surya Prakash",
                    ownerImg: "/assets/img/users/user-49.jpg",
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
                    ownerImg: "/assets/img/users/user-38.jpg",
                    progress: "15%",
                    date: "12 Jan 2024",
                },
            ],
        },
        {
            stage: "Won",
            color: "success",
            leads: 30,
            amount: "19,94,938/-",
            deals: [
                {
                    initials: "CM",
                    title: "Cloud Migration",
                    amount: "1,80,000/-",
                    email: "keerthisuresh@gmail.com",
                    phone: "9802459315",
                    location: "India",
                    owner: "keerthi Suresh",
                    ownerImg: "/assets/img/users/user-40.jpg",
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
    const [exportType, setExportType] = useState("");

    const initialForm = {
        dealName: "",
        pipeline: "",
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
        setFormData(initialForm);
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
            project: deal.location || "",
            assignee: deal.owner || "",
            ownerImg: deal.ownerImg || defaultAvatar,
            initials: deal.initials || makeInitials(deal.owner || deal.title || ""),
            title: deal.title || "",
            amount: deal.amount || "",
            email: deal.email || "",
            location: deal.location || "",
            owner: deal.owner || "",
            progress: deal.progress || "",
            date: deal.date || "",
        });
        setSelectedStageIndex(stageIndex);
        setSelectedDealIndex(dealIndex);
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
    const handleSave = (e) => {
        e.preventDefault();


        const cardDeal = {
            initials:
                formData.initials || makeInitials(formData.assignee || formData.dealName || ""),
            title: formData.dealName || formData.title || "Untitled Deal",
            amount: formData.dealValue || formData.amount || "",
            email: formData.contact || formData.email || "",
            phone: formData.phone || "",
            location: formData.project || formData.location || "",
            owner: formData.assignee || formData.owner || "",
            ownerImg: formData.ownerImg || defaultAvatar,
            progress: formData.progress || "",
            date: formData.dueDate || formData.closingDate || formData.date || "",

            meta: {
                pipeline: formData.pipeline,
                status: formData.status,
                currency: formData.currency,
                period: formData.period,
                periodValue: formData.periodValue,
                tags: formData.tags,
                followupDate: formData.followupDate,
                source: formData.source,
                priority: formData.priority,
                description: formData.description,
            },
        };

        setDealsState((prev) => {
            const copy = prev.map((s) => ({ ...s, deals: [...s.deals] }));
            if (isEditing && selectedStageIndex !== null && selectedDealIndex !== null) {
                // Replace existing deal
                copy[selectedStageIndex].deals[selectedDealIndex] = { ...cardDeal };
            } else if (selectedStageIndex !== null) {
                // Add new deal to stage
                copy[selectedStageIndex].deals.push(cardDeal);
            }
            return copy;
        });

        // close modal & reset
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

    return (
        <div>

           
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
