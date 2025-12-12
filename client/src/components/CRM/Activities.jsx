import React, { useState, useEffect } from "react";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState("calls");
    const [newActivityAdded, setNewActivityAdded] = useState(false);
    
    useEffect(() => {
        const mockData = [
            {
                id: 1,
                title: "We scheduled a meeting for next week",
                type: "Meeting",
                badgeClass: "badge-pink-transparent",
                icon: "bi bi-camera-video", // Bootstrap Icon
                dueDate: "16 Jan 2024",
                owner: "Durga prasad",
                createdDate: "14 Jan 2024",
                checked: false,
            },
            {
                id: 2,
                title: "Had conversation with Fred regarding task",
                type: "Calls",
                badgeClass: "badge-purple-transparent",
                icon: "bi bi-telephone", // Bootstrap Icon
                dueDate: "24 Jan 2024",
                owner: "Pavani",
                createdDate: "21 Jan 2024",
                checked: false,
            },
            {
                id: 3,
                title: "Analysing latest time estimation for new project",
                type: "Tasks",
                badgeClass: "badge-info-transparent",
                icon: "bi bi-list-task", // Bootstrap Icon
                dueDate: "23 Feb 2024",
                owner: "Hruthik",
                createdDate: "20 Feb 2024",
                checked: false,
            },
            {
                id: 4,
                title: "Store and manage contact data",
                type: "Email",
                badgeClass: "badge-warning-transparent",
                icon: "bi bi-envelope", // Bootstrap Icon
                dueDate: "18 Mar 2024",
                owner: "Swetha",
                createdDate: "15 Mar 2024",
                checked: false,
            },
            {
                id: 5,
                title: "Call John and discuss about project",
                type: "calls",
                badgeClass: "badge-purple-transparent",
                icon: "bi bi-telephone",
                dueDate: "12 feb 2024",
                owner: "Kranthi",
                createdDate: "17 feb 2024",
                checked: false,
            },
            {
                id: 6,
                title: "Will have a meeting before project start",
                type: "Meeting",
                badgeClass: "badge-pink-transparent",
                icon: "bi bi-camera-video",
                dueDate: "12 May 2025",
                owner: "Naveen",
                createdDate: "17 May 2025",
                checked: false,
            },
            {
                id: 7,
                title: "Built landing pages",
                type: "Email",
                badgeClass: "badge-warning-transparent",
                icon: "bi bi-envelope",
                dueDate: "07 june 2024",
                owner: "Sameer",
                createdDate: "20 june 2024",
                checked: false,
            },
            {
                id: 8,
                title: "Discussed budget proposal with Edwin",
                type: "Calls",
                badgeClass: "badge-purple-transparent",
                icon: "bi bi-telephone",
                dueDate: "24 Jan 2024",
                owner: "Afran",
                createdDate: "21 Jan 2024",
                checked: false,
            },
        ];

        setActivities(mockData);
    }, []);

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        setActivities((prev) =>
            prev.map((item) => ({ ...item, checked: checked }))
        );
    };

    const handleCheckboxChange = (id) => {
        const updatedActivities = activities.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        
        setActivities(updatedActivities);
        
        const allSelected = updatedActivities.every(item => item.checked);
        setSelectAll(allSelected);
    };

    const [formData, setFormData] = useState({
        title: "",
        activityType: "Calls",
        dueDate: "",
        time: "",
        remainder: "",
        remainderType: "Work",
        owner: "",
        guests: "",
        description: "",
        deal: "",
        contact: "",
        company: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newActivity = {
            id: activities.length + 1,
            title: formData.title || "New Activity",
            type: selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1),
            badgeClass: getBadgeClass(selectedActivity),
            icon: getActivityIcon(selectedActivity),
            dueDate: formData.dueDate || new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
            owner: formData.owner || "New Owner",
            createdDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
            checked: false,
        };

        setActivities([newActivity, ...activities]);
        
        setNewActivityAdded(true);
        
        setFormData({
            title: "",
            activityType: "Calls",
            dueDate: "",
            time: "",
            remainder: "",
            remainderType: "Work",
            owner: "",
            guests: "",
            description: "",
            deal: "",
            contact: "",
            company: "",
        });
        
        setSelectedActivity("calls");
        
        const modal = document.getElementById('add_activity');
        if (modal) {
            const modalInstance = window.bootstrap?.Modal?.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            } else {
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            }
        }
        
        setTimeout(() => {
            setNewActivityAdded(false);
        }, 3000);
    };

    const getBadgeClass = (type) => {
        switch(type) {
            case "calls": return "badge-purple-transparent";
            case "email": return "badge-warning-transparent";
            case "meeting": return "badge-pink-transparent";
            case "task": return "badge-info-transparent";
            default: return "badge-purple-transparent";
        }
    };

    const getActivityIcon = (type) => {
        switch(type) {
            case "calls": return "bi bi-telephone";
            case "email": return "bi bi-envelope";
            case "meeting": return "bi bi-camera-video";
            case "task": return "bi bi-list-task";
            default: return "bi bi-telephone";
        }
    };

    const handleDeleteClick = () => {
        const updatedActivities = activities.filter(activity => !activity.checked);
        setActivities(updatedActivities);
        setSelectAll(false);
    };

    return (
        <div className="activities-container">
            {/* Success Alert */}
            {newActivityAdded && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="bi bi-check-circle me-2"></i>
                    <strong>Success!</strong> New activity has been added successfully.
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setNewActivityAdded(false)}
                    ></button>
                </div>
            )}

            {/* Header */}
            <div className="header-section mb-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h4 className="page-title mb-1" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                            <strong>Activity</strong>
                        </h4>
                        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Manage your activities and tasks</p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-add-activity"
                        data-bs-toggle="modal"
                        data-bs-target="#add_activity"
                        style={{ padding: '0.375rem 1rem', fontSize: '0.875rem' }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Add Activity
                    </button>
                </div>
            </div>

            {/* Main Card */}
            <div className="card activity-card shadow-sm">
                <div className="card-header bg-white d-flex align-items-center justify-content-between py-3">
                    <h6 className="card-title mb-0" style={{ fontSize: '1rem', fontWeight: '600' }}>
                        <strong>Activity List</strong>
                    </h6>
                    <div className="d-flex align-items-center gap-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="selectAllCheckbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                            <label className="form-check-label text-muted" htmlFor="selectAllCheckbox" style={{ fontSize: '0.875rem' }}>
                                Select All
                            </label>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th width="60" className="ps-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="selectAllHeader"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </div>
                                    </th>
                                    <th className="fw-semibold" style={{ fontSize: '0.875rem' }}>Title</th>
                                    <th className="fw-semibold" style={{ fontSize: '0.875rem' }}>Activity Type</th>
                                    <th className="fw-semibold" style={{ fontSize: '0.875rem' }}>Due Date</th>
                                    <th className="fw-semibold" style={{ fontSize: '0.875rem' }}>Owner</th>
                                    <th className="fw-semibold" style={{ fontSize: '0.875rem' }}>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((activity) => (
                                    <tr key={activity.id} className={activity.checked ? "table-active" : ""}>
                                        <td className="ps-4 align-middle">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`checkbox-${activity.id}`}
                                                    checked={activity.checked || false}
                                                    onChange={() => handleCheckboxChange(activity.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                {/* Bootstrap Icon before title */}
                                                <div className="me-3 d-flex align-items-center justify-content-center" 
                                                     style={{ 
                                                         width: '32px', 
                                                         height: '32px',
                                                         borderRadius: '6px',
                                                         backgroundColor: 'rgba(0, 123, 255, 0.1)'
                                                     }}>
                                                    <i className={`${activity.icon} text-primary`} style={{ fontSize: '16px' }}></i>
                                                </div>
                                                <div>
                                                    <p className="mb-0 fw-medium" style={{ fontSize: '0.875rem' }}>{activity.title}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <span className={`badge ${activity.badgeClass} d-inline-flex align-items-center gap-1 py-1 px-2`} style={{ fontSize: '0.75rem' }}>
                                                <i className={`${activity.icon}`} style={{ fontSize: '12px' }}></i>
                                                {activity.type}
                                            </span>
                                        </td>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-calendar text-muted me-2" style={{ fontSize: '14px' }}></i>
                                                <span className="text-dark" style={{ fontSize: '0.875rem' }}>{activity.dueDate}</span>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar-circle-sm bg-primary text-white me-2" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                                                    {activity.owner.charAt(0)}
                                                </div>
                                                <span style={{ fontSize: '0.875rem' }}>{activity.owner}</span>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="text-muted" style={{ fontSize: '0.875rem' }}>{activity.createdDate}</div>
                                        </td>
                                    </tr>
                                ))}
                                {activities.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5">
                                            <div className="empty-state">
                                                <i className="bi bi-calendar-week fs-1 text-muted mb-3"></i>
                                                <p className="text-muted mb-0">No activities found</p>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mt-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add_activity"
                                                    style={{ padding: '0.375rem 1rem', fontSize: '0.875rem' }}
                                                >
                                                    <i className="bi bi-plus-circle me-2"></i>Add First Activity
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Activity Modal */}
            <div className="modal fade" id="add_activity" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold mb-0">Add New Activity</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setSelectedActivity("calls");
                                    setFormData({
                                        title: "",
                                        activityType: "Calls",
                                        dueDate: "",
                                        time: "",
                                        remainder: "",
                                        remainderType: "Work",
                                        owner: "",
                                        guests: "",
                                        description: "",
                                        deal: "",
                                        contact: "",
                                        company: "",
                                    });
                                }}
                            ></button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body p-4">
                                <div className="row g-3">
                                    {/* Title */}
                                    <div className="col-12">
                                        <label className="form-label fw-medium">
                                            Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter activity title"
                                        />
                                    </div>

                                    {/* Activity Type with Checkbox Selection */}
                                    <div className="col-12">
                                        <label className="form-label fw-medium mb-3">
                                            Activity Type <span className="text-danger">*</span>
                                        </label>
                                        <div className="activity-type-selector mb-4">
                                            <div className="row g-2">
                                                {[
                                                    { id: "calls", label: "Calls", icon: "bi bi-telephone" },
                                                    { id: "email", label: "Email", icon: "bi bi-envelope" },
                                                    { id: "meeting", label: "Meeting", icon: "bi bi-camera-video" },
                                                    { id: "task", label: "Task", icon: "bi bi-list-task" },
                                                ].map((type) => (
                                                    <div key={type.id} className="col-6 col-md-3">
                                                        <div 
                                                            className={`activity-type-card text-center p-3 rounded cursor-pointer position-relative ${
                                                                selectedActivity === type.id ? "active" : ""
                                                            }`}
                                                            onClick={() => setSelectedActivity(type.id)}
                                                        >
                                                            {selectedActivity === type.id && (
                                                                <div className="position-absolute top-0 end-0 m-2">
                                                                    <i className="bi bi-check-circle fs-5 text-primary"></i>
                                                                </div>
                                                            )}
                                                            <div className="activity-icon mb-2">
                                                                <i className={`${type.icon} fs-3`}></i>
                                                            </div>
                                                            <span className="fw-medium">{type.label}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedActivity === "calls" && (
                                            <div className="activity-details bg-light p-3 rounded mb-3">
                                                <h6 className="fw-medium mb-3">Call Details</h6>
                                                <div className="row g-2">
                                                    <div className="col-md-6">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Contact Name"
                                                            name="callContact"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Phone Number"
                                                            name="callPhone"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Date and Time */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium">
                                            Due Date <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-calendar"></i>
                                            </span>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="dueDate"
                                                value={formData.dueDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium">
                                            Time <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-clock"></i>
                                            </span>
                                            <input
                                                type="time"
                                                className="form-control"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Reminder */}
                                    <div className="col-md-8">
                                        <label className="form-label fw-medium">Reminder</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-bell"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="remainder"
                                                value={formData.remainder}
                                                onChange={handleChange}
                                                placeholder="Set reminder"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <label className="form-label fw-medium">Type</label>
                                        <select 
                                            className="form-select"
                                            name="remainderType"
                                            value={formData.remainderType}
                                            onChange={handleChange}
                                        >
                                            <option value="Work">Work</option>
                                            <option value="Personal">Personal</option>
                                            <option value="Urgent">Urgent</option>
                                        </select>
                                    </div>

                                    {/* Owner and Guests */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium">Owner</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="owner"
                                                value={formData.owner}
                                                onChange={handleChange}
                                                placeholder="Owner name"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium">Guests</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-people"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleChange}
                                                placeholder="Guest names"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="col-12">
                                        <label className="form-label fw-medium">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Add description..."
                                        ></textarea>
                                    </div>

                                    {/* Related Entities */}
                                    <div className="col-md-4">
                                        <label className="form-label fw-medium">Related Deals</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="deals"
                                                value={formData.deals}
                                                onChange={handleChange}
                                                placeholder="Deals"
                                            />
                                            <button
                                                className="btn btn-outline-primary"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_deals"
                                            >
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label fw-medium">Related Contacts</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="contacts"
                                                value={formData.contacts}
                                                onChange={handleChange}
                                                placeholder="Contacts"
                                            />
                                            <button
                                                className="btn btn-outline-primary"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_contact"
                                            >
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label fw-medium">Related Companies</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="companies"
                                                value={formData.companies}
                                                onChange={handleChange}
                                                placeholder="Companies"
                                            />
                                            <button
                                                className="btn btn-outline-primary"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#add_company"
                                            >
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer border-top">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        setSelectedActivity("calls");
                                        setFormData({
                                            title: "",
                                            activityType: "Calls",
                                            dueDate: "",
                                            time: "",
                                            remainder: "",
                                            remainderType: "Work",
                                            owner: "",
                                            guests: "",
                                            description: "",
                                            deal: "",
                                            contact: "",
                                            company: "",
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <i className="bi bi-plus me-2"></i>
                                    Add Activity
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="delete_modal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-body p-4 text-center">
                            <div className="mb-4">
                                <div className="delete-icon mb-3">
                                    <i className="bi bi-trash fs-1 text-danger"></i>
                                </div>
                                <h5 className="fw-bold mb-2">Confirm Delete</h5>
                                <p className="text-muted mb-0">
                                    Are you sure you want to delete this activity? This action cannot be undone.
                                </p>
                            </div>
                            <div className="d-flex gap-2 justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-light flex-fill"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger flex-fill"
                                    data-bs-dismiss="modal"
                                    onClick={handleDeleteClick}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Icons CSS Link (Add in your index.html or layout file) */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

            {/* CSS Styling */}
            <style jsx>{`
                .activities-container {
                    padding: 1.5rem;
                }
                
                .page-title {
                    color: #2c3e50;
                }
                
                .btn-add-activity {
                    font-weight: 500;
                }
                
                .activity-card {
                    border: 1px solid #e9ecef;
                    border-radius: 0.75rem;
                }
                
                .card-title {
                    color: #2c3e50;
                }
                
                .table thead th {
                    border-bottom: 2px solid #e9ecef;
                    padding: 0.75rem;
                    font-weight: 600;
                    color: #495057;
                }
                
                .table tbody td {
                    padding: 0.75rem;
                    vertical-align: middle;
                    border-color: #f1f3f4;
                }
                
                .table tbody tr:hover {
                    background-color: #f8f9fa;
                }
                
                .table-active {
                    background-color: rgba(0, 123, 255, 0.05) !important;
                }
                
                .avatar-circle-sm {
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                }
                
                .empty-state {
                    padding: 2rem 1rem;
                }
                
                .activity-type-card {
                    border: 2px solid #dee2e6;
                    transition: all 0.2s;
                    cursor: pointer;
                    position: relative;
                }
                
                .activity-type-card:hover {
                    border-color: #0d6efd;
                    background-color: #f8f9fa;
                }
                
                .activity-type-card.active {
                    border-color: #0d6efd;
                    background-color: rgba(13, 110, 253, 0.1);
                }
                
                .activity-type-card.active .activity-icon {
                    color: #0d6efd;
                }
                
                .badge-pink-transparent {
                    background-color: rgba(255, 107, 158, 0.1);
                    color: #ff6b9e;
                    border: 1px solid rgba(255, 107, 158, 0.2);
                }
                
                .badge-purple-transparent {
                    background-color: rgba(108, 92, 231, 0.1);
                    color: #6c5ce7;
                    border: 1px solid rgba(108, 92, 231, 0.2);
                }
                
                .badge-info-transparent {
                    background-color: rgba(0, 184, 217, 0.1);
                    color: #00b8d9;
                    border: 1px solid rgba(0, 184, 217, 0.2);
                }
                
                .badge-warning-transparent {
                    background-color: rgba(255, 171, 0, 0.1);
                    color: #ffab00;
                    border: 1px solid rgba(255, 171, 0, 0.2);
                }
                
                .delete-icon {
                    width: 60px;
                    height: 60px;
                    margin: 0 auto;
                    background: rgba(220, 53, 69, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .form-control:focus, .form-select:focus {
                    border-color: #86b7fe;
                    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
                }
                
                .input-group-text {
                    background-color: #f8f9fa;
                    border-color: #dee2e6;
                    color: #6c757d;
                }
                
                /* Custom checkbox styling */
                .form-check-input {
                    width: 1.1em;
                    height: 1.1em;
                    cursor: pointer;
                    border: 2px solid #adb5bd;
                }
                
                .form-check-input:checked {
                    background-color: #0d6efd;
                    border-color: #0d6efd;
                }
                
                .form-check-input:checked::after {
                    content: "✓";
                    position: absolute;
                    color: white;
                    font-size: 0.8em;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                
                .form-check-input:focus {
                    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
                }
                
                @media (max-width: 768px) {
                    .activities-container {
                        padding: 1rem;
                    }
                    
                    .btn-add-activity {
                        width: 100%;
                        margin-top: 0.5rem;
                    }
                    
                    .table-responsive {
                        border: 1px solid #dee2e6;
                        border-radius: 0.5rem;
                    }
                    
                    .activity-type-card {
                        padding: 0.75rem 0.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Activities;