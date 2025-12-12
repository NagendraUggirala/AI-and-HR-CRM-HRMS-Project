import React, { useState } from "react";

const Contacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Naveen",
      lastName: "",
      role: "Software Developer",
      phone: "9238756787",
      phone2: "",
      location: "India",

      email: "naveen@example.com",
      company: "BrightWave Innovations",
      dateOfBirth: "02-05-2024",
      industry: "Retail Industry",
      currency: "Rupees",
      language: "English",
      owner: "Hendry Milner",
      deals: "Collins",
      source: "Social Media",
      tags: ["Collab"],
      img: "/assets/img/users/user-49.jpg",
    },
    {
      id: 2,
      name: "Keerthi",
      lastName: "",
      role: "UI/UX Designer",
      phone: "9876543210",
      phone2: "",
      location: "India",

      email: "keerthi@example.com",
      company: "Design Studio",
      dateOfBirth: "15-03-2023",
      industry: "Design",
      currency: "Rupees",
      language: "English",
      owner: "John Doe",
      deals: "Premium",
      source: "Website",
      tags: ["Design"],
      img: "/assets/img/users/user-38.jpg",
    },
    {
      id: 3,
      name: "Hruthik",
      lastName: "",
      role: "QA Engineer",
      phone: "9123456789",
      phone2: "",
      location: "India",

      email: "hruthik@example.com",
      company: "Tech Solutions",
      dateOfBirth: "20-07-2024",
      industry: "Technology",
      currency: "Rupees",
      language: "English",
      owner: "Sarah Wilson",
      deals: "Basic",
      source: "Referral",
      tags: ["QA"],
      img: "/assets/img/users/user-13.jpg",
    },
    {
      id: 4,
      name: "Swetha",
      lastName: "",
      role: "HR Manager",
      phone: "9001234567",
      phone2: "",
      location: "India",

      email: "swetha@example.com",
      company: "HR Solutions",
      dateOfBirth: "10-01-2024",
      industry: "Human Resources",
      currency: "Rupees",
      language: "English",
      owner: "Mike Johnson",
      deals: "Enterprise",
      source: "LinkedIn",
      tags: ["HR"],
      img: "/assets/img/users/user-40.jpg",
    },
    {
      id: 5,
      name: "Afran",
      lastName: "",
      role: "Marketing Executive",
      phone: "9956781234",
      phone2: "",
      location: "India",

      email: "afran@example.com",
      company: "Marketing Pro",
      dateOfBirth: "05-09-2023",
      industry: "Marketing",
      currency: "Rupees",
      language: "English",
      owner: "Lisa Chen",
      deals: "Premium",
      source: "Email Campaign",
      tags: ["Marketing"],
      img: "/assets/img/users/user-09.jpg",
    },
    {
      id: 6,
      name: "Lalith",
      lastName: "",
      role: "Project Manager",
      phone: "9988776655",
      phone2: "",
      location: "India",

      email: "lalith@example.com",
      company: "Project Hub",
      dateOfBirth: "25-11-2023",
      industry: "Consulting",
      currency: "Rupees",
      language: "English",
      owner: "Tom Brown",
      deals: "Enterprise",
      source: "Conference",
      tags: ["PM"],
      img: "/assets/img/users/user-32.jpg",
    },
    {
      id: 7,
      name: "Sameer",
      lastName: "",
      role: "Frontend Developer",
      phone: "9123984567",
      phone2: "",
      location: "India",

      email: "sameer@example.com",
      company: "Web Solutions",
      dateOfBirth: "12-06-2024",
      industry: "Technology",
      currency: "Rupees",
      language: "English",
      owner: "Anna Davis",
      deals: "Basic",
      source: "GitHub",
      tags: ["Frontend"],
      img: "/assets/img/users/user-08.jpg",
    },
    {
      id: 8,
      name: "Pavani",
      lastName: "",
      role: "Business Analyst",
      phone: "9012345678",
      phone2: "",
      location: "India",

      email: "pavani@example.com",
      company: "Analytics Inc",
      dateOfBirth: "18-04-2024",
      industry: "Analytics",
      currency: "rupees",
      language: "English",
      owner: "Robert Lee",
      deals: "Premium",
      source: "Website",
      tags: ["Analytics"],
      img: "/assets/img/users/user-12.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    role: '',
    phone: '',
    phone2: '',
    location: 'India',
    rating: '0',
    email: '',
    company: '',
    dateOfBirth: '',
    industry: '',
    currency: 'Dollar',
    language: 'English',
    owner: '',
    deals: '',
    source: '',
    tags: [],
    img: '/assets/img/users/user-49.jpg'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      lastName: '',
      role: '',
      phone: '',
      phone2: '',
      location: 'India',
      rating: '0',
      email: '',
      company: '',
      dateOfBirth: '',
      industry: '',
      currency: 'Rupees',
      language: 'English',
      owner: '',
      deals: '',
      source: '',
      tags: [],
      img: '/assets/img/users/user-49.jpg'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddContact = () => {
    setModalType('add');
    resetForm();
    setSelectedContact(null);
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    setModalType('edit');
    setSelectedContact(contact);
    setFormData(contact);
    setActiveTab('basic');
    setShowModal(true);
  };
 const handleCloseModal = () => {
    setShowModal(false);
    setActiveTab('basic-info'); // Reset to first tab when closing
  };
  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      setContacts(prev => prev.filter(c => c.id !== contactToDelete.id));
      setShowDeleteModal(false);
      setContactToDelete(null);
    }
  };

  const handleSave = () => {
    if (modalType === 'add') {
      const newContact = {
        ...formData,
        id: Math.max(...contacts.map(c => c.id)) + 1
      };
      setContacts(prev => [...prev, newContact]);
    } else {
      setContacts(prev => prev.map(c =>
        c.id === selectedContact.id ? { ...formData, id: selectedContact.id } : c
      ));
    }
    setShowModal(false);
    resetForm();
  };

  const handleCancel = () => {
    setShowModal(false);
    resetForm();
    setSelectedContact(null);
  };

  const addTag = (tagName) => {
    if (tagName && !formData.tags.includes(tagName)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagName]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div>


      

      <div className="d-flex my-xl-auto justify-content-between flex-wrap">
        {/* Export Dropdown */}
        <div>
          <h3>Contacts</h3>
        </div>
        <div className="d-flex gap-2">
          <div className="dropdown">
            <a
              href="#"
              className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="ti ti-file-export me-1"></i>Export
            </a>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li>
                <a href="#" className="dropdown-item rounded-1">
                  <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item rounded-1">
                  <i className="ti ti-file-type-xls me-1"></i>Export as Excel
                </a>
              </li>
            </ul>
          </div>

          {/* Add Contact */}
          <div className="mb-2">
            <button
              onClick={handleAddContact}
              className="btn btn-secondary d-flex align-items-center"
            >
              <i className="ti ti-circle-plus me-2"></i>Add Contact
            </button>
          </div>
        </div>
      </div>
      {/* Contact Grid Header */}
      <div className="card w-100">
        <div className="card-body p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h5>Contact Grid</h5>
            <div className="dropdown">
              <a
                href="#"
                className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Sort By : Last 7 Days
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li><a href="#" className="dropdown-item rounded-1">Recently Added</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Ascending</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Descending</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Last Month</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Last 7 Days</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="row">
        {contacts.map((c) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={c.id}>
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                  <div>
                    <a className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
                      <img src={c.img} alt="user" className="img-fluid h-auto w-auto" />
                    </a>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-icon btn-sm rounded-circle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => handleEditContact(c)}
                        >
                          <i className="ti ti-edit me-1"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => handleDeleteContact(c)}
                        >
                          <i className="ti ti-trash me-1"></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-center mb-3">
                  <h6 className="mb-1">
                    <a href="">{c.name} {c.lastName}</a>
                  </h6>
                  <span className="badge bg-pink-transparent fs-10 fw-medium">
                    {c.role}
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <p className="text-dark d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-gray-5 me-2"></i>
                    {c.phone}
                  </p>
                  <p className="text-dark d-inline-flex align-items-center">
                    <i className="ti ti-map-pin text-gray-5 me-2"></i>
                    {c.location}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                  <div className="icons-social d-flex align-items-center">
                    <a href="#" className="avatar avatar-rounded avatar-sm me-1"><i className="ti ti-mail"></i></a>
                    <a href="#" className="avatar avatar-rounded avatar-sm me-1"><i className="ti ti-phone-call"></i></a>
                    <a href="#" className="avatar avatar-rounded avatar-sm"><i className="ti ti-brand-facebook"></i></a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Contact Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'add' ? 'Add Contact' : 'Edit Contact'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                {/* Tab Navigation */}
                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                      onClick={() => setActiveTab('basic')}
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                      onClick={() => setActiveTab('address')}
                    >
                      Address
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'social' ? 'active' : ''}`}
                      onClick={() => setActiveTab('social')}
                    >
                      Social Profiles
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
                      onClick={() => setActiveTab('access')}
                    >
                      Access
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                {activeTab === 'basic' && (
                  <div>
                   
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
                                    <input type="file" className="form-control image-sign" multiple="" />
                                  </div>
                                  <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                                </div>
                              </div>
                            </div>
                          </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Job Title <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Company Name <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Company</option>
                            <option value="BrightWave Innovations">BrightWave Innovations</option>
                            <option value="Design Studio">Design Studio</option>
                            <option value="Tech Solutions">Tech Solutions</option>
                            <option value="HR Solutions">HR Solutions</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Phone Number 2 <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone2"
                            value={formData.phone2}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Fax</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Deals <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="deals"
                            value={formData.deals}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Deal</option>
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="Collins">Collins</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                          <input
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Ratings <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                          >
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Owner <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="owner"
                            value={formData.owner}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Owner</option>
                            <option value="Hendry Milner">Hendry Milner</option>
                            <option value="John Doe">John Doe</option>
                            <option value="Sarah Wilson">Sarah Wilson</option>
                            <option value="Mike Johnson">Mike Johnson</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Industry <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Industry</option>
                            <option value="Retail Industry">Retail Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Design">Design</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Consulting">Consulting</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Currency <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                          >
                            <option value="Dollar">Dollar</option>
                            <option value="Euro">Euro</option>
                            <option value="Rupee">Rupee</option>
                            <option value="Pound">Pound</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Language <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                          >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tags <span className="text-danger">*</span></label>
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag, index) => (
                              <span key={index} className="badge bg-light text-dark">
                                {tag}
                                <button
                                  type="button"
                                  className="btn-close btn-close-sm ms-1"
                                  onClick={() => removeTag(tag)}
                                ></button>
                              </span>
                            ))}
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add new tag and press Enter"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTag(e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Source <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Source</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Website">Website</option>
                            <option value="Referral">Referral</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Email Campaign">Email Campaign</option>
                            <option value="Conference">Conference</option>
                            <option value="GitHub">GitHub</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light me-2"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                  </div>
                )}
 
                {activeTab === 'address' && (
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Postal Code</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light me-2"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                  </div>
                )}
                 

                {activeTab === 'social' && (

                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Facebook</label>
                          <input type="url" className="form-control" placeholder="https://facebook.com/username" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Twitter</label>
                          <input type="url" className="form-control" placeholder="https://twitter.com/username" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">LinkedIn</label>
                          <input type="url" className="form-control" placeholder="https://linkedin.com/in/username" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Instagram</label>
                          <input type="url" className="form-control" placeholder="https://instagram.com/username" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Skype</label>
                          <input type="text" className="form-control" placeholder="skype:username" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Website</label>
                          <input type="url" className="form-control" placeholder="https://website.com" />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light me-2"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                  </div>
                )}
                
                      

               
                 {activeTab === 'access' && (
                    <div className="tab-pane fade show active" id="access" role="tabpanel" aria-labelledby="access-tab" tabIndex="0">
                      <div className="modal-body pb-0">
                        <div className="mb-4">
                          <h6 className="fs-14 fw-medium mb-1">Visibility</h6>
                          <div className="d-flex align-items-center">
                            <div className="form-check me-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="visibility"
                                id="flexRadioDefault01"
                                value="public"
                                checked={formData.visibility === 'public'}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label text-dark" htmlFor="flexRadioDefault01">
                                Public
                              </label>
                            </div>
                            <div className="form-check me-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="visibility"
                                id="flexRadioDefault02"
                                value="private"
                                checked={formData.visibility === 'private'}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label text-dark" htmlFor="flexRadioDefault02">
                                Private
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="visibility"
                                id="flexRadioDefault03"
                                value="selectPeople"
                                checked={formData.visibility === 'selectPeople'}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label text-dark" htmlFor="flexRadioDefault03">
                                Select People
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-gray br-5 mb-4">
                          <div className="d-flex align-items-center mb-3">
                            <input className="form-check-input me-1" type="checkbox" value="" id="user-06" />
                            <div className="d-flex align-items-center file-name-icon">
                              <a href="#" className="avatar avatar-md border avatar-rounded">
                                <img src="/assets/img/users/user-37.jpg" className="img-fluid" alt="img" />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-normal"><a href="#">Michael Walker</a></h6>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <input className="form-check-input me-1" type="checkbox" value="" id="user-07" />
                            <div className="d-flex align-items-center file-name-icon">
                              <a href="#" className="avatar avatar-md border avatar-rounded">
                                <img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-normal"><a href="#">Sophie Headrick</a></h6>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <input className="form-check-input me-1" type="checkbox" value="" id="user-08" />
                            <div className="d-flex align-items-center file-name-icon">
                              <a href="#" className="avatar avatar-md border avatar-rounded">
                                <img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-normal"><a href="#">Cameron Drake</a></h6>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <input className="form-check-input me-1" type="checkbox" value="" id="user-09" />
                            <div className="d-flex align-items-center file-name-icon">
                              <a href="#" className="avatar avatar-md border avatar-rounded">
                                <img src="/assets/img/users/user-08.jpg" className="img-fluid" alt="img" />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-normal"><a href="#">Doris Crowley</a></h6>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <input className="form-check-input me-1" type="checkbox" value="" id="user-11" />
                            <div className="d-flex align-items-center file-name-icon">
                              <a href="#" className="avatar avatar-md border avatar-rounded">
                                <img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-normal"><a href="#">Thomas Bordelon</a></h6>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-center">
                            <a href="#" className="btn btn-primary">Confirm</a>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light me-2"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                    </div>
                  )}
              </div>
             
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <i className="ti ti-alert-triangle text-warning fs-1 mb-3"></i>
                  <h5>Are you sure?</h5>
                  <p className="text-muted">
                    Do you want to delete the contact "{contactToDelete?.name}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary m-2"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
        <p className="mb-0">2014 - 2025 &copy; DCM</p>
        <p>Designed &amp; Developed By <a href="javascript:void(0);" class="text-primary">Dreams</a></p>
      </div>
    </div>

  );
};

export default Contacts;