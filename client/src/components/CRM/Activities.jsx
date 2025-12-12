import React, { useState, useEffect } from "react";


const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState("calls");
    
    useEffect(() => {
        const mockData = [
            {
                id: 1,
                title: "We scheduled a meeting for next week",
                type: "Meeting",
                badgeClass: "badge-pink-transparent",
                icon: "ti ti-device-computer-camera",
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
                icon: "ti ti-phone",
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
                icon: "ti ti-subtask",
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
                icon: "ti ti-mail",
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
                icon: "ti ti-phone",
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
                icon: "ti ti-device-computer-camera",
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
                icon: "ti ti-mail",
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
                icon: "ti ti-phone",
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
    });
    const [activity, setActivity] = useState({
        title: "",
        type: "Calls",
        dueDate: "",
        time: "",
        reminder: "",
        reminderType: "Work",
        owner: "",
        guests: "",
        description: "",
        deals: "",
        contacts: "",
        companies: "",
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

    const handleActivityType = (type) => {
        setFormData((prev) => ({ ...prev, activityType: type }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Activity:", formData);

    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        if (isCollapsed) {
            document.body.classList.add("activity-collapsed");
        } else {
            document.body.classList.remove("activity-collapsed");
        }
    }, [isCollapsed]);
    return (
        <div>
            <div>
            

                {/* Heading + Button in same line */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="fs-4 mb-0"><strong>Activity</strong></h2>
                    <button
                        type="button"
                        className="btn btn-secondary d-flex align-items-center btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#add_activity"
                    >
                        <i className="ti ti-circle-plus me-2"></i>Add Activity
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
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </div>
                                    </th>
                                    <th>Title</th>
                                    <th>Activity Type</th>
                                    <th>Due Date</th>
                                    <th>Owner</th>
                                    <th>Created Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td>
                                            <div className="form-check form-check-md">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={activity.checked || false}
                                                    onChange={() => handleCheckboxChange(activity.id)}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <p className="fs-14 text-dark fw-medium">{activity.title}</p>
                                        </td>
                                        <td>
                                            <span className={`badge ${activity.badgeClass}`}>
                                                <i className={`${activity.icon} me-1`}></i>
                                                {activity.type}
                                            </span>
                                        </td>
                                        <td>{activity.dueDate}</td>
                                        <td>{activity.owner}</td>
                                        <td>{activity.createdDate}</td>
                                        <td>
                                            <div className="action-icon d-inline-flex">
                                                <a
                                                    href="#!"
                                                    className="me-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit_activity"
                                                >
                                                    <i className="ti ti-edit"></i>
                                                </a>
                                                <a
                                                    href="#!"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete_modal"
                                                >
                                                    <i className="ti ti-trash"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {activities.length === 0 && (
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

            <div
                className="modal fade"
                id="add_activity"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Activity</h4>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body pb-0">
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


                                            {/* Buttons */}
                                            <div className="activity-items d-flex align-items-center mb-3">
                                                <a
                                                    href="#"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "calls" ? "active" : ""
                                                        }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("calls");
                                                    }}
                                                >
                                                    <i className="ti ti-phone me-1"></i>Calls
                                                </a>

                                                <a
                                                    href="#"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "email" ? "active" : ""
                                                        }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("email");
                                                    }}
                                                >
                                                    <i className="ti ti-mail me-1"></i>Email
                                                </a>

                                                <a
                                                    href="#"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "meeting" ? "active" : ""
                                                        }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("meeting");
                                                    }}
                                                >
                                                    <i className="ti ti-user-circle me-1"></i>Meeting
                                                </a>

                                                <a
                                                    href="#"
                                                    className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "task" ? "active" : ""
                                                        }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedActivity("task");
                                                    }}
                                                >
                                                    <i className="ti ti-list-check me-1"></i>Task
                                                </a>
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
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Contact Number"
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
                                                        />
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Enter Password"
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
                                                        />
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Enter Meeting Password"
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
                                                name="deals"
                                                value={formData.deals}
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
                                                name="contacts"
                                                value={formData.contacts}
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
                                                name="companies"
                                                value={formData.companies}
                                                onChange={handleChange}
                                                placeholder="Enter company"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-light text-primary me-2"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-secondary">
                                    Add Activity    
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="edit_activity">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Activity</h4>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action="">
                            <div className="modal-body pb-0">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Title <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="We scheduled a meeting for next week"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label">
                                            Activity Type <span className="text-danger">*</span>
                                        </label>

                                        {/* Buttons */}
                                        <div className="activity-items d-flex align-items-center mb-3">
                                            <a
                                                href="#"
                                                className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "calls" ? "active" : ""
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedActivity("calls");
                                                }}
                                            >
                                                <i className="ti ti-phone me-1"></i>Calls
                                            </a>

                                            <a
                                                href="#"
                                                className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "email" ? "active" : ""
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedActivity("email");
                                                }}
                                            >
                                                <i className="ti ti-mail me-1"></i>Email
                                            </a>

                                            <a
                                                href="#"
                                                className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "meeting" ? "active" : ""
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedActivity("meeting");
                                                }}
                                            >
                                                <i className="ti ti-user-circle me-1"></i>Meeting
                                            </a>

                                            <a
                                                href="#"
                                                className={`br-5 d-flex align-items-center justify-content-center me-2 ${selectedActivity === "task" ? "active" : ""
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedActivity("task");
                                                }}
                                            >
                                                <i className="ti ti-list-check me-1"></i>Task
                                            </a>
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
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Contact Number"
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
                                                    />
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Enter Password"
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
                                                    />
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Enter Meeting Password"
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
                                            <div className="input-icon-end position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control datetimepicker"
                                                    placeholder="dd/mm/yyyy"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="ti ti-calendar text-gray-7"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Time <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-icon-end position-relative">
                                                <input type="text" className="form-control timepicker" />
                                                <span className="input-icon-addon">
                                                    <i className="ti ti-clock-hour-10 text-gray-7"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 lead-phno-col del-phno-col">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <div className="input-block mb-3">
                                                    <label className="form-label">
                                                        Remainder <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-icon-start position-relative">
                                                        <input type="text" className="form-control" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-bell text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>


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
                                                name="owner"
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
                                                name="guests"
                                                placeholder="Enter guest names"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Description <span className="text-danger">*</span>
                                            </label>
                                            <div className="summernote"></div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="input-block mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <label className="col-form-label">
                                                    Deals <span className="text-danger">*</span>
                                                </label>
                                                <a
                                                    href="#"
                                                    className="add-new text-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add_deals"
                                                >
                                                    <i className="ti ti-plus text-primary me-1"></i>Add New
                                                </a>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="deals"
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
                                                <a
                                                    href="#"
                                                    className="add-new text-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add_contact"
                                                >
                                                    <i className="ti ti-plus text-primary me-1"></i>Add New
                                                </a>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="contact"
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
                                                <a
                                                    href="#"
                                                    className="add-new text-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add_company"
                                                >
                                                    <i className="ti ti-plus text-primary me-1"></i>Add New
                                                </a>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="company "
                                                placeholder="Enter company name"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-light text-primary btn-sm me-2" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-secondary btn-sm">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="add_deals">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Deals</h4>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action="">
                            <div className="modal-body pb-0">
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Deal Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="dealName"
                                                placeholder="Enter deal name"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="input-block mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <label className="form-label">
                                                    Pipeline <span className="text-danger">*</span>
                                                </label>
                                                <a
                                                    href="#"
                                                    className="add-new text-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add_pipeline"
                                                >
                                                    <i className="ti ti-plus text-primary me-1"></i>Add New
                                                </a>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                name="pipeline"
                                                placeholder="Enter pipeline"
                                            />
                                        </div>
                                    </div>


                                    <div className="col-md-6 w-25">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Status <span className="text-danger">*</span>
                                            </label>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>Open</option>
                                                <option>Won</option>
                                                <option>Lost</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Deal Value <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Currency <span className="text-danger">*</span>
                                            </label>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>Dollar</option>
                                                <option>Euro</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Period <span className="text-danger">*</span>
                                            </label>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>Days</option>
                                                <option>Months</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Period Value <span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Contact <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="input-tags form-control"
                                                placeholder="Add new"
                                                type="text"
                                                data-role="tagsinput"
                                                name="Label"

                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Project <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="input-tags form-control"
                                                placeholder="Add new"
                                                type="text"
                                                data-role="tagsinput"
                                                name="Label"

                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Due Date <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-icon-end position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control datetimepicker"
                                                    placeholder="dd/mm/yyyy"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="ti ti-calendar text-gray-7"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Expected Closing Date <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-icon-end position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control datetimepicker"
                                                    placeholder="dd/mm/yyyy"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="ti ti-calendar text-gray-7"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Assignee <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="input-tags form-control"
                                                placeholder="Add new"
                                                type="text"
                                                data-role="tagsinput"
                                                name="Label"

                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Tags <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="input-tags form-control"
                                                placeholder="Add new"
                                                type="text"
                                                data-role="tagsinput"
                                                name="Label"

                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Followup Date <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-icon-end position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control datetimepicker"
                                                    placeholder="dd/mm/yyyy"
                                                />
                                                <span className="input-icon-addon">
                                                    <i className="ti ti-calendar text-gray-7"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Source <span className="text-danger">*</span>
                                            </label>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>Phone Calls</option>
                                                <option>Social Media</option>
                                                <option>Refferal Sites</option>
                                                <option>Web Analytics</option>
                                                <option>Previous Purchase</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Priority <span className="text-danger">*</span>
                                            </label>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>High</option>
                                                <option>Low</option>
                                                <option>Medium</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Description <span className="text-danger">*</span>
                                            </label>
                                            <textarea className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-light text-primary btn-sm me-2" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-secondary btn-sm">
                                    Add Deal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="add_contact">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Contact</h4>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action="">
                            <div className="contact-grids-tab">
                                <ul className="nav nav-underline" id="myTab1" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="info-tab1"
                                            data-bs-toggle="tab"
                                            data-bs-target="#basic-info1"
                                            type="button"
                                            role="tab"
                                            aria-selected="true"
                                        >
                                            Basic Information
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="address-tab1"
                                            data-bs-toggle="tab"
                                            data-bs-target="#address1"
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Address
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="social-profile-tab1"
                                            data-bs-toggle="tab"
                                            data-bs-target="#social-profile1"
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Social Profiles
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="access-tab1"
                                            data-bs-toggle="tab"
                                            data-bs-target="#access1"
                                            type="button"
                                            role="tab"
                                            aria-selected="false"
                                        >
                                            Access
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content" id="myTabContent1">
                                {/* Basic Info Tab */}
                                <div
                                    className="tab-pane fade show active"
                                    id="basic-info1"
                                    role="tabpanel"
                                    aria-labelledby="info-tab1"
                                    tabIndex="0"
                                >
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            {/* Profile Upload */}
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                                                    <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                        <i className="ti ti-photo text-gray-2 fs-16"></i>
                                                    </div>
                                                    <div className="profile-upload">
                                                        <div className="mb-2">
                                                            <h6 className="mb-1">Upload Profile Image</h6>
                                                            <p className="fs-12">Image should be below 4 mb</p>
                                                        </div>
                                                        <div className="profile-uploader d-flex align-items-center">
                                                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                                                Upload
                                                                <input type="file" className="form-control image-sign" multiple />
                                                            </div>
                                                            <a href="#" className="btn btn-light  text-primary btn-sm">
                                                                Cancel
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Basic Info Fields */}
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        First Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Job Title <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Company Name <span className="text-danger">*</span>
                                                    </label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>BrightWave Innovations</option>
                                                        <option>Stellar Dynamics</option>
                                                        <option>Quantum Nexus</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Phone Number <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Phone Number 2 <span className="text-danger">*</span>
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Fax</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            {/* Deals */}
                                            <div className="col-md-4">
                                                <div className="input-block mb-3">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <label className="col-form-label p-0">
                                                            Deals <span className="text-danger">*</span>
                                                        </label>
                                                        <a
                                                            href="#"
                                                            className="add-new text-primary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#add_deals"
                                                        >
                                                            <i className="ti ti-plus text-primary me-1"></i>Add New
                                                        </a>
                                                    </div>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Collins</option>
                                                        <option>Konopelski</option>
                                                        <option>Adams</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* More fields (Date of Birth, Ratings, Owner, Industry, etc.) */}
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Date of Birth <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Ratings <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" className="form-control" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-star text-gray-6"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Owner <span className="text-danger">*</span>
                                                    </label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Hendry Milner</option>
                                                        <option>Guilory Berggren</option>
                                                        <option>Jami Carlile</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Industry, Currency, Language, Tags, Source */}
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Industry <span className="text-danger">*</span>
                                                    </label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Retail Industry</option>
                                                        <option>Banking</option>
                                                        <option>Hotels</option>
                                                        <option>Financial Services</option>
                                                        <option>Insurance</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Currency <span className="text-danger">*</span>
                                                    </label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>USD</option>
                                                        <option>Euro</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Language <span className="text-danger">*</span>
                                                    </label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>English</option>
                                                        <option>Arabic</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Tags <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="input-tags form-control"
                                                        placeholder="Add new"
                                                        type="text"
                                                        data-role="tagsinput"
                                                        name="Label"
                                                        defaultValue="Collab,Promotion,Rated,Davis"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Source <span className="text-danger">*</span>
                                                    </label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Phone Calls</option>
                                                        <option>Social Media</option>
                                                        <option>Refferal Sites</option>
                                                        <option>Web Analytics</option>
                                                        <option>Previous Purchase</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>

                                {/* Address Tab */}
                                <div className="tab-pane fade" id="address1" role="tabpanel" aria-labelledby="address-tab1" tabIndex="0">
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Address <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Country <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>USA</option>
                                                        <option>Canada</option>
                                                        <option>Germany</option>
                                                        <option>France</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">State <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>California</option>
                                                        <option>New York</option>
                                                        <option>Texas</option>
                                                        <option>Florida</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">City <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Los Angeles</option>
                                                        <option>San Diego</option>
                                                        <option>Fresno</option>
                                                        <option>San Francisco</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Zipcode <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>

                                {/* Social Profile Tab */}
                                <div className="tab-pane fade" id="social-profile1" role="tabpanel" aria-labelledby="social-profile-tab1" tabIndex="0">
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Facebook</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Twitter</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">LinkedIn</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Skype</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Whatsapp</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Instagram</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>

                                {/* Access Tab */}
                                <div className="tab-pane fade" id="access1" role="tabpanel" aria-labelledby="access-tab1" tabIndex="0">
                                    <div className="modal-body pb-0">
                                        <div className="mb-4">
                                            <h6 className="fs-14 fw-medium mb-1">Visibility</h6>
                                            <div className="d-flex align-items-center">
                                                <div className="form-check me-3">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                    <label className="form-check-label text-dark" htmlFor="flexRadioDefault1">
                                                        Public
                                                    </label>
                                                </div>
                                                <div className="form-check me-3">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                                    <label className="form-check-label text-dark" htmlFor="flexRadioDefault2">
                                                        Private
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" defaultChecked />
                                                    <label className="form-check-label text-dark" htmlFor="flexRadioDefault3">
                                                        Select People
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gray br-5 mb-4">
                                            {/* Users Checkboxes */}
                                            {[6, 7, 8, 9, 10].map((user) => (
                                                <div className="d-flex align-items-center mb-3" key={user}>
                                                    <input className="form-check-input me-1" type="checkbox" id={`user-${user}`} />
                                                    <div className="d-flex align-items-center file-name-icon">
                                                        <a href="#" className="avatar avatar-md border avatar-rounded">
                                                            <img
                                                                src={``}
                                                                className="img-fluid"
                                                                alt="img"
                                                            />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-normal">
                                                                <a href="#">User {user}</a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="d-flex align-items-center justify-content-center">
                                                <a href="#" className="btn btn-primary">
                                                    Confirm
                                                </a>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select className="select">
                                                <option>Select</option>
                                                <option>Active</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">
                                            Cancel
                                        </button>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#success_compay">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="add_company">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Company</h4>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action="">
                            <div className="contact-grids-tab">
                                <ul className="nav nav-underline" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="info-tab" data-bs-toggle="tab" data-bs-target="#basic-info" type="button" role="tab" aria-selected="true">
                                            Basic Information
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="address-tab" data-bs-toggle="tab" data-bs-target="#address" type="button" role="tab" aria-selected="false">
                                            Address
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="social-profile-tab" data-bs-toggle="tab" data-bs-target="#social-profile" type="button" role="tab" aria-selected="false">
                                            Social Profiles
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="access-tab" data-bs-toggle="tab" data-bs-target="#access" type="button" role="tab" aria-selected="false">
                                            Access
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content" id="myTabContent">
                                {/* Basic Info */}
                                <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            {/* Profile Image Upload */}
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                                                    <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                        <i className="ti ti-photo text-gray-2 fs-16"></i>
                                                    </div>
                                                    <div className="profile-upload">
                                                        <div className="mb-2">
                                                            <h6 className="mb-1">Upload Profile Image</h6>
                                                            <p className="fs-12">Image should be below 4 mb</p>
                                                        </div>
                                                        <div className="profile-uploader d-flex align-items-center">
                                                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                                                Upload
                                                                <input type="file" className="form-control image-sign" multiple />
                                                            </div>
                                                            <a href="#" className="btn btn-light text-primary btn-sm">Cancel</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Company Info Fields */}
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Company Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Phone Number 2</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Fax</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Website</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Ratings <span className="text-danger">*</span></label>
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" className="form-control" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-star text-gray-6"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Owner <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Hendry Milner</option>
                                                        <option>Guilory Berggren</option>
                                                        <option>Jami Carlile</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Tags <span className="text-danger">*</span></label>
                                                    <input className="input-tags form-control" placeholder="Add new" type="text" defaultValue="Collab" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <label className="col-form-label p-0">Deals <span className="text-danger">*</span></label>
                                                        <a href="#" className="add-new text-primary" data-bs-target="#add_deals" data-bs-toggle="modal">
                                                            <i className="ti ti-plus text-primary me-1"></i>Add New
                                                        </a>
                                                    </div>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Collins</option>
                                                        <option>Konopelski</option>
                                                        <option>Adams</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Industry <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Retail Industry</option>
                                                        <option>Banking</option>
                                                        <option>Hotels</option>
                                                        <option>Financial Services</option>
                                                        <option>Insurance</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Source <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Phone Calls</option>
                                                        <option>Social Media</option>
                                                        <option>Referral Sites</option>
                                                        <option>Web Analytics</option>
                                                        <option>Previous Purchase</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Currency <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>USD</option>
                                                        <option>Euro</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Language <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>English</option>
                                                        <option>Arabic</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">About <span className="text-danger">*</span></label>
                                                    <textarea className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                                        <label className="col-form-label p-0">Contact <span className="text-danger">*</span></label>
                                                        <a href="#" className="add-new text-primary" data-bs-target="#add_contact" data-bs-toggle="modal">
                                                            <i className="ti ti-plus text-primary me-1"></i>Add New
                                                        </a>
                                                    </div>
                                                    <select className="select2" multiple>
                                                        <option>Darlee Robertson</option>
                                                        <option defaultValue>Sharon Roy</option>
                                                        <option>Vaughan</option>
                                                        <option>Jessica</option>
                                                        <option>Carol Thomas</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>

                                {/* Address Tab */}
                                <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab" tabIndex="0">
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Address <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Country <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>USA</option>
                                                        <option>Canada</option>
                                                        <option>Germany</option>
                                                        <option>France</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">State <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>California</option>
                                                        <option>New York</option>
                                                        <option>Texas</option>
                                                        <option>Florida</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">City <span className="text-danger">*</span></label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Los Angeles</option>
                                                        <option>San Diego</option>
                                                        <option>Fresno</option>
                                                        <option>San Francisco</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Zipcode <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>

                                {/* Social Profile & Access tabs can be similarly converted with same rules */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="add_pipeline">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Pipeline</h4>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action="">
                            <div className="modal-body pb-0">
                                <div className="row">
                                    {/* Pipeline Name */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Pipeline Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>

                                    {/* Pipeline Stages */}
                                    <div className="col-md-12">
                                        <div className="input-block mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <label className="form-label">Pipeline Stages <span className="text-danger">*</span></label>
                                                <a href="#" className="add-new text-primary" data-bs-toggle="modal" data-bs-target="#add_stage">
                                                    <i className="ti ti-plus text-primary me-1"></i>Add New
                                                </a>
                                            </div>

                                            {/* Stage List */}
                                            {["Inpipeline", "Follow Up", "Schedule Service"].map((stage, index) => (
                                                <div key={index} className="p-3 border border-gray br-5 mb-2">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-2"><i className="ti ti-grip-vertical"></i></span>
                                                            <h6 className="fs-14 fw-normal">{stage}</h6>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <a href="#" className="text-default" data-bs-toggle="modal" data-bs-target="#edit_stage">

                                                            </a>
                                                            <a href="#" className="text-default" data-bs-toggle="modal" data-bs-target="#delete_modal">
                                                                <span><i className="ti ti-trash"></i></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Access */}
                                    <div className="col-md-12">
                                        <div className="mb-3">


                                            <div className="tab-content">
                                                <div className="tab-pane fade" id="select-person">
                                                    <div className="access-wrapper">
                                                        {[20, 21].map((id) => (
                                                            <div key={id} className="p-3 border border-gray br-5 mb-2">
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center file-name-icon">
                                                                        <a href="#" className="avatar avatar-md border avatar-rounded">
                                                                            <img
                                                                                src={``}
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </a>
                                                                        <div className="ms-2">
                                                                            <h6 className="fw-medium"><a href="#">Sharon Roy</a></h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <a href="#" className="text-danger">Remove</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-light text-primary btn-sm me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-secondary btn-sm">Add Pipeline</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="edit_pipeline">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Pipeline</h4>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action="">
                            <div className="modal-body pb-0">
                                <div className="row">
                                    {/* Pipeline Name */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Pipeline Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue="Marketing" />
                                        </div>
                                    </div>

                                    {/* Pipeline Stages */}
                                    <div className="col-md-12">
                                        <div className="input-block mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <label className="form-label">Pipeline Stages <span className="text-danger">*</span></label>
                                                <a href="#" className="add-new text-primary" data-bs-toggle="modal" data-bs-target="#add_stage">
                                                    <i className="ti ti-plus text-primary me-1"></i>Add New
                                                </a>
                                            </div>

                                            {["Inpipeline", "Follow Up", "Schedule Service"].map((stage, index) => (
                                                <div key={index} className="p-3 border border-gray br-5 mb-2">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-2"><i className="ti ti-grip-vertical"></i></span>
                                                            <h6 className="fs-14 fw-normal">{stage}</h6>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <a href="#" className="text-default">
                                                                <span className="me-2"><i className="ti ti-edit"></i></span>
                                                            </a>
                                                            <a href="#" className="text-default">
                                                                <span><i className="ti ti-trash"></i></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Access */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Access</label>
                                            <div className="d-flex access-item nav">
                                                <div className="d-flex align-items-center">
                                                    <div className="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#all2">
                                                        <input type="radio" className="status-radio me-2" id="all2" name="status" defaultChecked />
                                                        <label htmlFor="all2">All</label>
                                                    </div>
                                                    <div className="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#select-person2">
                                                        <input type="radio" className="status-radio me-2" id="select2" name="status" />
                                                        <label htmlFor="select2">Select Person</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-content">
                                                <div className="tab-pane fade" id="select-person2">
                                                    <div className="access-wrapper">
                                                        {[20, 21].map((id) => (
                                                            <div key={id} className="p-3 border border-gray br-5 mb-2">
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center file-name-icon">
                                                                        <a href="#" className="avatar avatar-md border avatar-rounded">
                                                                            <img
                                                                                src={``}
                                                                                className="img-fluid"
                                                                                alt="img"
                                                                            />
                                                                        </a>
                                                                        <div className="ms-2">
                                                                            <h6 className="fw-medium"><a href="#">Sharon Roy</a></h6>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <a href="#" className="text-danger">Remove</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Pipeline</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="pipeline-access">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Pipeline Access</h4>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action="">
                            <div className="modal-body pb-0">
                                <div className="row">
                                    {/* Search */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <div className="input-icon-end position-relative">
                                                <input type="text" className="form-control" placeholder="Search" />
                                                <span className="input-icon-addon">
                                                    <i className="ti ti-search text-gray-7"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Access Users */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <div className="p-2 border br-5">
                                                <div className="pipeline-access-items">
                                                    {[
                                                        { id: 19, name: "Darlee Robertson", role: "Darlee Robertson" },
                                                        { id: 20, name: "Sharon Roy", role: "Installer" },
                                                        { id: 21, name: "Vaughan Lewis", role: "Senior Manager" },
                                                        { id: 33, name: "Jessica Louise", role: "Test Engineer" },
                                                        { id: 34, name: "Test Engineer", role: "UI /UX Designer" }
                                                    ].map((user, index) => (
                                                        <div key={index} className="d-flex align-items-center p-2">
                                                            <div className="form-check form-check-md me-2">
                                                                <input className="form-check-input" type="checkbox" />
                                                            </div>
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="#" className="avatar avatar-md border avatar-rounded">
                                                                    <img
                                                                        src={``}
                                                                        className="img-fluid"
                                                                        alt="img"
                                                                    />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium fs-12">
                                                                        <a href="#">{user.name}</a>
                                                                    </h6>
                                                                    <span className="fs-10 fw-normal">{user.role}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="add_stage">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Stage</h4>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <form action=" ">
                            <div className="modal-body pb-0">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Stage Name <span className="text-danger"> *</span></label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer"><div className="modal fade" id="edit_stage">
                                <div className="modal-dialog modal-dialog-centered modal-md">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title">Edit Stage</h4>
                                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                <i className="ti ti-x"></i>
                                            </button>
                                        </div>

                                        <form action=" ">
                                            <div className="modal-body pb-0">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Edit Name <span className="text-danger"> *</span></label>
                                                            <input type="text" className="form-control" defaultValue="Inpipeline" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-light text-primary me-2" data-bs-dismiss="modal">Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                                <button type="button" className="btn btn-light text-primary btn-sm me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-secondary btn-sm">Add Stage</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="delete_modal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                                <i className="ti ti-trash-x fs-36"></i>
                            </span>
                            <h4 className="mb-1">Confirm Delete</h4>
                            <p className="mb-3">
                                You want to delete all the marked items, this can't be undone once you delete.
                            </p>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-light text-primary me-3" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <a
                                    href=""
                                    className="btn btn-danger"
                                >
                                    Yes, Delete
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>

    );
};

export default Activities;
