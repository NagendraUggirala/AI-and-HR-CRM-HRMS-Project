import React, { useState, useEffect, useCallback } from "react";
import { activitiesAPI } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from '@iconify/react/dist/iconify.js';

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState("calls");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingActivityId, setEditingActivityId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const getActivityStyle = (type) => {
        const typeLower = type?.toLowerCase() || "";
        if (typeLower.includes("call")) {
            return { badgeClass: "badge-purple-transparent", icon: "ti ti-phone" };
        } else if (typeLower.includes("email")) {
            return { badgeClass: "badge-warning-transparent", icon: "ti ti-mail" };
        } else if (typeLower.includes("meeting")) {
            return { badgeClass: "badge-pink-transparent", icon: "ti ti-device-computer-camera" };
        } else if (typeLower.includes("task")) {
            return { badgeClass: "badge-info-transparent", icon: "ti ti-subtask" };
        }
        return { badgeClass: "badge-info-transparent", icon: "ti ti-list-check" };
    };
    
    const getActivityColor = (type) => {
  const activity = type.toLowerCase();

  if (activity === "calls") return "#198754";   // success green
  if (activity === "email") return "#0d6efd";   // primary blue
  if (activity === "meeting") return "#0dcaf0"; // info cyan
  if (activity === "task") return "#f59e0b";    // warning orange

  return "#374151";
};

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
            // Handle both string and date object
            const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
            if (isNaN(date.getTime())) return dateString;
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        } catch (e) {
            return dateString;
        }
    };

    // Format time for display (HH:MM:SS -> HH:MM)
    const formatTime = (timeString) => {
        if (!timeString) return "";
        try {
            // Handle time string in format "HH:MM:SS" or "HH:MM"
            if (typeof timeString === 'string') {
                return timeString.substring(0, 5); // Get HH:MM part
            }
            return timeString;
        } catch (e) {
            return timeString;
        }
    };


    // Load activities from API
    const loadActivities = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await activitiesAPI.list();

            // Handle case where API returns null or undefined
            if (!data || !Array.isArray(data)) {
                console.warn("Activities API returned invalid data:", data);
                setActivities([]);
                return;
            }

            // Transform API data to include UI properties
            // Map backend field names to frontend display names
            const transformedData = data.map(activity => {
                if (!activity) return null;
                // Get activity type from backend (activity_type field) - handle empty strings and null
                let activityType = (activity.activity_type || activity.type || "").toString().trim();
                if (!activityType || activityType === "null" || activityType === "undefined") {
                    activityType = "Calls"; // Default fallback
                }
                const styleInfo = getActivityStyle(activityType);
                return {
                    ...activity,
                    type: activityType, // Add 'type' for display compatibility
                    activity_type: activityType, // Ensure activity_type is also set
                    badgeClass: styleInfo.badgeClass,
                    icon: styleInfo.icon,
                    dueDate: activity.due_date ? formatDate(activity.due_date) : "",
                    activityTime: activity.activity_time ? formatTime(activity.activity_time) : "", // Format time for display
                    createdDate: activity.created_date ? formatDate(activity.created_date) : "",
                    checked: activity.checked || false
                };
            }).filter(activity => activity !== null); // Remove any null entries

            setActivities(transformedData);
        } catch (err) {
            console.error("Error loading activities:", err);
            setError(err.message || "Failed to load activities. Please try again.");
            setActivities([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        setActivities((prev) =>
            prev.map((item) => ({ ...item, checked: checked }))
        );
    };

    const handleCheckboxChange = (id) => {
        setActivities((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
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

    callContactName: "",
  callContactNumber: "",
  email: "",
  emailPassword: "",
  meetingId: "",
  meetingPassword: "",
  task: ""
    });

    // Form states for Edit Activity (pre-filled)
    const [editActivity, setEditActivity] = useState({
        title: "We scheduled a meeting for next week",
        type: "Calls",
        dueDate: "",
        time: "",
        reminder: "",
        reminderType: "Work",
        owner: "Hendry Milner",
        guests: "Sharon Roy",
        description: "",
        deals: "konopelski",
        contacts: "Guilory Berggren",
        companies: "Nimbus Networks",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setError(null);

        const dueDate = formData.dueDate
            ? new Date(formData.dueDate).toISOString().split("T")[0]
            : null;

        const activityData = {
            title: formData.title || null,
            activity_type:
                selectedActivity.charAt(0).toUpperCase() +
                selectedActivity.slice(1),
            due_date: dueDate,
            activity_time: formData.time || null,
            remainder: formData.remainder || null,
            remainder_type: formData.remainderType || null,
            owner: formData.owner || null,
            guests: formData.guests || null,
            description: formData.description || null,
            deals: formData.deal || null,
            contacts: formData.contact || null,
            companies: formData.company || null,
                // CALL DETAILS
    call_contact_name: formData.callContactName || null,
    call_contact_number: formData.callContactNumber || null,

    // EMAIL DETAILS
    email: formData.email || null,
    email_password: formData.emailPassword || null,

    // MEETING DETAILS
    meeting_id: formData.meetingId || null,
    meeting_password: formData.meetingPassword || null,

    // TASK DETAILS
    task: formData.task || null,
            created_date: new Date().toISOString().split("T")[0],
        };

        // Clean empty values
        Object.keys(activityData).forEach((key) => {
            if (activityData[key] === "" || activityData[key] === undefined) {
                activityData[key] = null;
            }
        });

        await activitiesAPI.create(activityData);

        toast.success("Activity created successfully!");

        // Reset form
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

        // ✅ Close Modal
        setShowModal(false);

        // Reload table
        await loadActivities();

    } catch (err) {
        console.error("Error creating activity:", err);

        const errorMessage =
            err.message ||
            err.detail ||
            "Failed to create activity. Please try again.";

        setError(errorMessage);
        toast.error(errorMessage);
    }
};

    const handleDeleteClick = (activity) => {
        setActivityToDelete(activity);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!activityToDelete || !activityToDelete.id) return;

        try {
            setError(null);
            setLoading(true);
            await activitiesAPI.delete(activityToDelete.id);
            toast.success("Activity deleted successfully!");
            setShowDeleteModal(false);
            setActivityToDelete(null);
            await loadActivities();
        } catch (err) {
            console.error("Error deleting activity:", err);
            const errorMessage = err.message || err.detail || "Failed to delete activity. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (activity) => {
        try {
            setLoading(true);
            // Fetch full activity data from API if we have an ID
            let fullActivityData = activity;
            if (activity.id) {
                try {
                    fullActivityData = await activitiesAPI.getById(activity.id);
                } catch (err) {
                    console.error("Error fetching activity details:", err);
                    // Use existing activity data if API call fails
                }
            }

            setEditingActivityId(fullActivityData.id);
            // Map backend field names to frontend form field names
            // Format date for date input (YYYY-MM-DD)
            let formattedDate = "";
            if (fullActivityData.due_date) {
                if (typeof fullActivityData.due_date === 'string') {
                    formattedDate = fullActivityData.due_date.split('T')[0];
                } else {
                    // Handle date object
                    const date = new Date(fullActivityData.due_date);
                    formattedDate = date.toISOString().split('T')[0];
                }
            }

            // Format time for time input (HH:MM)
            let formattedTime = "";
            if (fullActivityData.activity_time) {
                formattedTime = formatTime(fullActivityData.activity_time);
            }

            setEditActivity({
    title: fullActivityData.title || "",
    type: fullActivityData.activity_type || "",

    dueDate: formattedDate,
    time: formattedTime,

    reminder: fullActivityData.remainder || "",
    reminderType: fullActivityData.remainder_type || "Work",

    owner: fullActivityData.owner || "",
    guests: fullActivityData.guests || "",
    description: fullActivityData.description || "",

    deals: fullActivityData.deals || "",
    contacts: fullActivityData.contacts || "",
    companies: fullActivityData.companies || "",

    callContactName: fullActivityData.call_contact_name || "",
 callContactNumber: fullActivityData.call_contact_number || "",
 email: fullActivityData.email || "",
 emailPassword: fullActivityData.email_password || "",
 meetingId: fullActivityData.meeting_id || "",
 meetingPassword: fullActivityData.meeting_password || "",
 task: fullActivityData.task || ""
});
           setSelectedActivity(fullActivityData.activity_type?.toLowerCase() || "calls");
            setShowEditModal(true);
        } catch (err) {
            console.error("Error opening edit modal:", err);
            toast.error("Failed to load activity details.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!editingActivityId) return;

        try {
            setError(null);
            setLoading(true);
            const dueDate = editActivity.dueDate ? new Date(editActivity.dueDate).toISOString().split('T')[0] : null;

            // Map frontend field names to backend schema field names
            const activityData = {
  title: editActivity.title || "",

  activity_type:
    editActivity.type ||
    selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1),

  due_date: dueDate || null,
  activity_time: editActivity.time || null,

  remainder: editActivity.reminder || null,
  remainder_type: editActivity.reminderType || null,

  owner: editActivity.owner || null,
  guests: editActivity.guests || null,
  description: editActivity.description || null,

  deals: editActivity.deals || null,
  contacts: editActivity.contacts || null,
  companies: editActivity.companies || null,

  // CALL DETAILS
  call_contact_name: editActivity.callContactName || null,
  call_contact_number: editActivity.callContactNumber || null,

  // EMAIL DETAILS
  email: editActivity.email || null,
  email_password: editActivity.emailPassword || null,

  // MEETING DETAILS
  meeting_id: editActivity.meetingId || null,
  meeting_password: editActivity.meetingPassword || null,

  // TASK DETAILS
  task: editActivity.task || null
};

            // Remove empty strings and convert to null
            Object.keys(activityData).forEach(key => {
                if (activityData[key] === "" || activityData[key] === undefined) {
                    activityData[key] = null;
                }
            });

            await activitiesAPI.update(editingActivityId, activityData);
            toast.success("Activity updated successfully!");
            setShowEditModal(false);
            setEditingActivityId(null);
            await loadActivities();
        } catch (err) {
            console.error("Error updating activity:", err);
            const errorMessage = err.message || err.detail || "Failed to update activity. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {error && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Note:</strong> {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            {loading && activities.length === 0 && (
                <div className="text-center p-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <div>
                {/* Heading + Button in same line */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="fs-4 mb-0"><strong>Activity</strong></h2>
                    <button
  type="button"
  className="add-employee gap-2"
  onClick={() => setShowModal(true)}
>
  <Icon icon="heroicons:plus-circle" width="18" />Add Activity
</button>
                </div>
            </div>
            <div className="card w-100 shadow">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h5><b>Activity List</b></h5>

                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">



                    </div>
                </div>

                {/* Table */}
                <div className="card-body p-0 w-100">
                    <div className="custom-datatable-filter table-responsive">
                        <table className="table datatable">
                            <thead className="thead-light">
                                <tr>
                                    <th className="no-sort">
                                        <div className="form-check form-check-md">
                                            <label
                                                className="d-flex align-items-center"
                                                style={{ cursor: "pointer" }}
                                            >
                                                {/* Custom Checkbox */}
                                                <div
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "4px",
                                                        border: `2px solid ${selectAll ? "#3B82F6" : "#9CA3AF"}`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.3s ease",
                                                        background: selectAll ? "#3B82F6" : "transparent",
                                                    }}
                                                >
                                                    {selectAll && (
                                                        <span
                                                            style={{
                                                                color: "white",
                                                                fontSize: "12px",
                                                                fontWeight: "bold",
                                                                lineHeight: 1,
                                                            }}
                                                        >
                                                            ✓
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Hidden Native Checkbox */}
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    style={{ display: "none" }}
                                                />
                                            </label>
                                        </div>
                                    </th>
                                    <th>Title</th>
                                    <th>Activity Type</th>
                                    <th>Due Date</th>
                                    <th>Owner</th>
                                    <th>Created Date</th>
                                    <th style={{ width: '180px', minWidth: '180px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td>
                                            <div className="form-check form-check-md">
                                                <label
                                                    className="d-flex align-items-center"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {/* Custom Checkbox */}
                                                    <div
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            borderRadius: "4px",
                                                            border: `2px solid ${activity?.checked ? "#3B82F6" : "#9CA3AF"}`,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            transition: "all 0.3s ease",
                                                            background: activity?.checked ? "#3B82F6" : "transparent",
                                                        }}
                                                    >
                                                        {activity?.checked && (
                                                            <span
                                                                style={{
                                                                    color: "white",
                                                                    fontSize: "12px",
                                                                    fontWeight: "bold",
                                                                    lineHeight: 1,
                                                                }}
                                                            >
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Hidden Native Checkbox */}
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={activity?.checked || false}
                                                        onChange={() => handleCheckboxChange(activity.id)}
                                                        style={{ display: "none" }}
                                                    />
                                                </label>
                                            </div>
                                        </td>

                                        <td>
                                            <p className="fs-14 text-dark fw-medium">{activity.title}</p>
                                        </td>

<td>
  {(() => {
    const activityType = (activity.type || activity.activity_type || "Calls").trim();
    const badgeClass = activity.badgeClass || getActivityStyle(activityType).badgeClass;
    const icon = activity.icon || getActivityStyle(activityType).icon;

    return (
      <span
        className={`badge ${badgeClass}`}
        style={{ color: getActivityColor(activityType), fontWeight: 500 }}
      >
        <i className={`${icon} me-1`}></i>
        {activityType}
      </span>
    );
  })()}
</td>
                                        
                                        <td>{activity.dueDate}</td>
                                        <td>{activity.owner}</td>
                                        <td>{activity.createdDate}</td>
                                        <td style={{ whiteSpace: 'nowrap', width: '180px' }}>
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    className="create-job-btn"
                                                    onClick={() => handleEdit(activity)}
                                                    title="Edit Activity"
                                                    type="button"
                                                    style={{ fontSize: '12px', padding: '4px 10px', minWidth: '65px' }}
                                                >
                                                    <i className="ti ti-edit me-1"></i>Edit
                                                </button>
                                                <button
                                                    className="cancel-btn"
                                                    onClick={() => handleDeleteClick(activity)}
                                                    title="Delete Activity"
                                                    type="button"
                                                    style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                                                >
                                                    <i className="ti ti-trash me-1"></i>Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {loading && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-3">
                                            Loading activities...
                                        </td>
                                    </tr>
                                )}
                                {!loading && error && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-danger py-3">
                                            {error}
                                        </td>
                                    </tr>
                                )}
                                {!loading && !error && activities.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-3">
                                            No activities found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

{showModal && (
<div
  className="hrms-modal-overlay"
  id="add_activity"
  tabIndex="-1"
  aria-hidden="true"
  onClick={(e)=>{
    if(e.target === e.currentTarget) setShowModal(false)
  }}
>
                <div className="hrms-modal hrms-modal-offer-xl animate-scale-in d-flex flex-column">
                                      {/* HEADER */}
                         <div className="hrms-modal-header">
                            <h5 className="hrms-modal-title d-flex align-items-center">Add New Activity</h5>
                            <button
  type="button"
  className="btn-close"
  aria-label="Close"
  onClick={() => setShowModal(false)}
></button>
                        </div>

                        {/* Form */}
                       <div className="hrms-modal-body hrms-modal-body-scroll">

                        <form onSubmit={handleSubmit}>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <div className="row">
                                    {/* Title */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Title <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Activity Type */}
                                    <div className="col-md-12">
                                        <label className="form-label">
                                            Activity Type <span className="text-danger">*</span>
                                        </label>

                                        <div className="col-md-12">
                                            {/* Buttons - Updated with styled buttons */}
                                            <div className="activity-items d-flex align-items-center mb-3">
                                                <button
                                                    type="button"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                        selectedActivity === "calls" ? "btn-success" : "btn-outline-success"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("calls");
                                                    }}
                                                >
                                                    <i className="ti ti-phone me-1"></i>Calls
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                        selectedActivity === "email" ? "btn-primary" : "btn-outline-primary"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("email");
                                                    }}
                                                >
                                                    <i className="ti ti-mail me-1"></i>Email
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                        selectedActivity === "meeting" ? "btn-info" : "btn-outline-info"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("meeting");
                                                    }}
                                                >
                                                    <i className="ti ti-user-circle me-1"></i>Meeting
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                        selectedActivity === "task" ? "btn-warning" : "btn-outline-warning"
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("task");
                                                    }}
                                                >
                                                    <i className="ti ti-list-check me-1"></i>Task
                                                </button>
                                            </div>

                                            {/* Data sections */}
                                            <div className="activity-form mt-3">

  {/* CALLS */}
  {selectedActivity === "calls" && (
    <div>
      <h6>Call Details</h6>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter Contact Name"
        name="callContactName"
        value={formData.callContactName || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        className="form-control"
        placeholder="Enter Contact Number"
        name="callContactNumber"
        value={formData.callContactNumber || ""}
        onChange={handleChange}
      />
    </div>
  )}

  {/* EMAIL */}
  {selectedActivity === "email" && (
    <div>
      <h6>Email Details</h6>

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Enter Email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        className="form-control"
        placeholder="Enter Password"
        name="emailPassword"
        value={formData.emailPassword || ""}
        onChange={handleChange}
      />
    </div>
  )}

  {/* MEETING */}
  {selectedActivity === "meeting" && (
    <div>
      <h6>Meeting Details</h6>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter Meeting ID"
        name="meetingId"
        value={formData.meetingId || ""}
        onChange={handleChange}
      />

      <input
        type="text"
        className="form-control"
        placeholder="Enter Meeting Password"
        name="meetingPassword"
        value={formData.meetingPassword || ""}
        onChange={handleChange}
      />
    </div>
  )}

  {/* TASK */}
  {selectedActivity === "task" && (
    <div>
      <h6>Task Details</h6>

      <input
        type="text"
        className="form-control"
        placeholder="Enter Task"
        name="task"
        value={formData.task || ""}
        onChange={handleChange}
      />
    </div>
  )}

</div>
                                        </div>
                                    </div>

                                    {/* Due Date */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Due Date <span className="text-danger">*</span>
                                            </label>
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

                                    {/* Time */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Time <span className="text-danger">*</span>
                                            </label>
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

                                    {/* Remainder */}
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Remainder <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="remainder"
                                                value={formData.remainder}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="remainderType"
                                                value={formData.remainderType}
                                                onChange={handleChange}
                                                placeholder="Enter type"
                                            />
                                        </div>
                                    </div>


                                    {/* Owner */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Owner</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="owner"
                                                value={formData.owner}
                                                onChange={handleChange}
                                                placeholder="Enter owner name"
                                            />
                                        </div>
                                    </div>


                                    {/* Guests */}
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Guests</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleChange}
                                                placeholder="Enter guest name"
                                            />
                                        </div>
                                    </div>


                                    {/* Description */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Deals */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Deals</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="deal"
                                                value={formData.deal}
                                                onChange={handleChange}
                                                placeholder="Enter deal"
                                            />
                                        </div>
                                    </div>

                                    {/* Contacts */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Contacts</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="contact"
                                                value={formData.contact}
                                                onChange={handleChange}
                                                placeholder="Enter contact"
                                            />
                                        </div>
                                    </div>


                                    {/* Companies */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Companies</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Enter company"
                                            />
                                        </div>
                                    </div>

                                </div>

                        </form>
                 </div>

                 {/* Footer */}
             <div className="modal-footer bg-white border-top d-flex">
      <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowModal(false)}
      >
          Cancel
      </button>
                <button type="submit" className="create-job-btn" onClick={handleSubmit}>
                 Add Activity
                </button>
                            </div>

                </div>
            </div>
)}

            {/* Edit Activity Modal */}
            {showEditModal && (

                    <div className="hrms-modal-overlay">
                        <div className="hrms-modal hrms-modal-offer-xl animate-scale-in d-flex flex-column">

                                <div className="hrms-modal-header">
                                    <h5 className="hrms-modal-title d-flex align-items-center">Edit Activity</h5>
                                    <button
                                        type="button"
                                        className="btn-close custom-btn-close"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setEditingActivityId(null);
                                        }}
                                        aria-label="Close"
                                    >
                                        <i className="ti ti-x"></i>
                                    </button>
                                </div>

                                    <div className="hrms-modal-body hrms-modal-body-scroll">

                                <form onSubmit={handleUpdateSubmit}>
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Title <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editActivity.title}
                                                        onChange={(e) => setEditActivity({ ...editActivity, title: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <label className="form-label">
                                                    Activity Type <span className="text-danger">*</span>
                                                </label>

                                                {/* Buttons - Updated with styled buttons */}
                                                <div className="activity-items d-flex align-items-center mb-3">
                                                    <button
                                                        type="button"
                                                        className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                            selectedActivity === "calls" ? "btn-success" : "btn-outline-success"
                                                        }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedActivity("calls");
                                                        }}
                                                    >
                                                        <i className="ti ti-phone me-1"></i>Calls
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                            selectedActivity === "email" ? "btn-primary" : "btn-outline-primary"
                                                        }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedActivity("email");
                                                        }}
                                                    >
                                                        <i className="ti ti-mail me-1"></i>Email
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                            selectedActivity === "meeting" ? "btn-info" : "btn-outline-info"
                                                        }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedActivity("meeting");
                                                        }}
                                                    >
                                                        <i className="ti ti-user-circle me-1"></i>Meeting
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={`br-5 d-flex align-items-center justify-content-center me-2 btn ${
                                                            selectedActivity === "task" ? "btn-warning" : "btn-outline-warning"
                                                        }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedActivity("task");
                                                        }}
                                                    >
                                                        <i className="ti ti-list-check me-1"></i>Task
                                                    </button>
                                                </div>

                                                {/* Data sections */}
<div className="activity-form mt-3">

  {selectedActivity === "calls" && (
    <div>
      <h6>Call Details</h6>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter Contact Name"
        value={editActivity.callContactName || ""}
        onChange={(e) =>
          setEditActivity({
            ...editActivity,
            callContactName: e.target.value,
          })
        }
      />

      <input
        type="text"
        className="form-control"
        placeholder="Enter Contact Number"
        value={editActivity.callContactNumber || ""}
        onChange={(e) =>
          setEditActivity({
            ...editActivity,
            callContactNumber: e.target.value,
          })
        }
      />
    </div>
  )}

  {selectedActivity === "email" && (
    <div>
      <h6>Email Details</h6>

      <input
        type="email"
        className="form-control mb-2"
        placeholder="Enter Email"
        value={editActivity.email || ""}
        onChange={(e) =>
          setEditActivity({
            ...editActivity,
            email: e.target.value,
          })
        }
      />

      <input
        type="text"
        className="form-control"
        placeholder="Enter Password"
        value={editActivity.emailPassword || ""}
        onChange={(e) =>
          setEditActivity({
            ...editActivity,
            emailPassword: e.target.value,
          })
        }
      />
    </div>
  )}

  {selectedActivity === "meeting" && (
    <div>
      <h6>Meeting Details</h6>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter Meeting ID"
        value={editActivity.meetingId || ""}
        onChange={(e) =>
          setEditActivity({
            ...editActivity,
            meetingId: e.target.value,
          })
        }
      />

      <input
        type="text"
        className="form-control"
        placeholder="Enter Meeting Password"
        value={editActivity.meetingPassword || ""}
        onChange={(e) =>
          setEditActivity({
            ...editActivity,
            meetingPassword: e.target.value,
          })
        }
      />
    </div>
  )}

  {selectedActivity === "task" && (
    <div>
      <h6>Task Details</h6>

      <input
        type="text"
        className="form-control"
        placeholder="Enter Task"
        value={editActivity.task || ""}
        onChange={(e) =>
          setEditActivity({
            ...editActivity,
            task: e.target.value,
          })
        }
      />
    </div>
  )}

</div>
                                                
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Due Date <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={editActivity.dueDate}
                                                        onChange={(e) => setEditActivity({ ...editActivity, dueDate: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Time <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        value={editActivity.time}
                                                        onChange={(e) => setEditActivity({ ...editActivity, time: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Remainder <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editActivity.reminder}
                                                        onChange={(e) => setEditActivity({ ...editActivity, reminder: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Type</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editActivity.reminderType}
                                                        onChange={(e) => setEditActivity({ ...editActivity, reminderType: e.target.value })}
                                                        placeholder="Enter type"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Owner <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editActivity.owner}
                                                        onChange={(e) => setEditActivity({ ...editActivity, owner: e.target.value })}
                                                        placeholder="Enter owner name"
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Guests <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editActivity.guests}
                                                        onChange={(e) => setEditActivity({ ...editActivity, guests: e.target.value })}
                                                        placeholder="Enter guest names"
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Description <span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        value={editActivity.description}
                                                        onChange={(e) => setEditActivity({ ...editActivity, description: e.target.value })}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="input-block mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <label className="col-form-label">
                                                            Deals <span className="text-danger">*</span>
                                                        </label>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        value={editActivity.deals}
                                                        onChange={(e) => setEditActivity({ ...editActivity, deals: e.target.value })}
                                                        placeholder="Enter deal name"
                                                    />
                                                </div>
                                            </div>



                                            <div className="col-md-12">
                                                <div className="input-block mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <label className="col-form-label">
                                                            Contacts <span className="text-danger">*</span>
                                                        </label>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        value={editActivity.contacts}
                                                        onChange={(e) => setEditActivity({ ...editActivity, contacts: e.target.value })}
                                                        placeholder="Enter contact name"
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-md-12">
                                                <div className="input-block mb-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <label className="col-form-label">
                                                            Company Name<span className="text-danger">*</span>
                                                        </label>

                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control mt-2"
                                                        value={editActivity.companies}
                                                        onChange={(e) => setEditActivity({ ...editActivity, companies: e.target.value })}
                                                        placeholder="Enter company name"
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                </form>
                                                                    </div>

                                    <div className="modal-footer bg-white border-top d-flex">
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => {
                                                setShowEditModal(false);
                                                setEditingActivityId(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="create-job-btn"  onClick={handleUpdateSubmit}>
                                            Save Changes
                                        </button>
                                    </div>

                        </div>
                    </div>
            )}

            
            {/* Delete Confirmation Modal */}
{showDeleteModal && (
  <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title">Confirm Delete</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setShowDeleteModal(false);
              setActivityToDelete(null);
            }}
          ></button>
        </div>

        {/* Body */}
        <div className="modal-body text-center">
          <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
            <i className="ti ti-alert-triangle fs-36"></i>
          </span>

          <p className="mb-3">
            Are you sure you want to delete the activity "
            <strong>{activityToDelete?.title || "this activity"}</strong>"?
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer ">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setShowDeleteModal(false);
              setActivityToDelete(null);
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
          >
           Delete
          </button>
        </div>

      </div>
    </div>
  </div>
)}

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ top: '38px' }}
            />

        </div>

    );
};

export default Activities;