import React, { useState, useEffect } from "react";
import { contactsAPI } from "../../utils/api";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Load contacts from API
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactsAPI.list();
      setContacts(data);
    } catch (err) {
      console.error("Error loading contacts:", err);
      setError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      img: '/assets/img/users/user-49.jpg',
      visibility: 'private',
      status: 'Active'
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
    // Map API response (backend field names) to form data format (frontend field names)
    setFormData({
      name: contact.name || '',
      lastName: contact.last_name || '',
      role: contact.job_title || '', // Backend sends 'job_title', not 'role'
      phone: contact.phone_number || '', // Backend sends 'phone_number', not 'phone'
      phone2: contact.phone_number2 || '', // Backend sends 'phone_number2', not 'phone2'
      location: contact.location || 'India',
      rating: contact.ratings?.toString() || '0', // Backend sends 'ratings' (plural), not 'rating'
      email: contact.email || '',
      company: contact.company_name || '', // Backend sends 'company_name', not 'company'
      dateOfBirth: contact.dob || '', // Backend sends 'dob', not 'date_of_birth'
      industry: contact.industry || '',
      currency: contact.currency || 'Dollar',
      language: contact.language || 'English',
      owner: contact.owner || '',
      deals: contact.deals || '',
      source: contact.source || '',
      tags: Array.isArray(contact.tags) ? contact.tags : (contact.tags ? contact.tags.split(',') : []), // Handle both array and comma-separated string
      img: contact.profile_photo || '/assets/img/users/user-49.jpg', // Backend sends 'profile_photo', not 'img'
      visibility: contact.visibility || 'private',
      status: contact.status || 'Active'
    });
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

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        setError(null);
        await contactsAPI.delete(contactToDelete.id);
        await loadContacts();
        setShowDeleteModal(false);
        setContactToDelete(null);
      } catch (err) {
        console.error("Error deleting contact:", err);
        setError("Failed to delete contact. Please try again.");
      }
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setError(null);
      
      // Prepare contact data for API - map frontend fields to backend schema
      const contactData = {
        name: formData.name || '',
        last_name: formData.lastName || null,
        job_title: formData.role || '', // Backend expects 'job_title', not 'role'
        phone_number: formData.phone || '', // Backend expects 'phone_number', not 'phone'
        phone_number2: formData.phone2 || null, // Backend expects 'phone_number2', not 'phone2'
        email: formData.email || null,
        company_name: formData.company || '', // Backend expects 'company_name', not 'company'
        location: formData.location || null,
        ratings: formData.rating || null, // Backend expects 'ratings' (plural), not 'rating'
        dob: formData.dateOfBirth || null, // Backend expects 'dob', not 'date_of_birth'
        industry: formData.industry || null,
        currency: formData.currency || null,
        language: formData.language || null,
        owner: formData.owner || null,
        deals: formData.deals || null,
        source: formData.source || null,
        tags: formData.tags || [], // Backend expects array
        profile_photo: formData.img || null, // Backend expects 'profile_photo', not 'img'
        // Note: 'status' and 'visibility' are not in backend schema, so we don't send them
      };

      if (modalType === 'add') {
        await contactsAPI.create(contactData);
      } else if (selectedContact) {
        await contactsAPI.update(selectedContact.id, contactData);
      }
      
      await loadContacts();
      setShowModal(false);
      resetForm();
      setSelectedContact(null);
    } catch (err) {
      console.error("Error saving contact:", err);
      setError("Failed to save contact. Please try again.");
    }
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
      {loading && (
        <div className="text-center py-5">
          <p className="text-muted">Loading contacts...</p>
        </div>
      )}
      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && contacts.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No contacts found. Add your first contact!</p>
        </div>
      )}
      <div className="row">
        {!loading && contacts.map((c) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={c.id}>
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="form-check form-check-md">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                  <div>
                    <a className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
                      <img src={c.profile_photo || '/assets/img/users/user-49.jpg'} alt="user" className="img-fluid h-auto w-auto" />
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
                    <a href="">{c.name} {c.last_name || ''}</a>
                  </h6>
                  <span className="badge bg-pink-transparent fs-10 fw-medium">
                    {c.job_title || 'N/A'}
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <p className="text-dark d-inline-flex align-items-center mb-2">
                    <i className="ti ti-phone text-gray-5 me-2"></i>
                    {c.phone_number || 'N/A'}
                  </p>
                  <p className="text-dark d-inline-flex align-items-center">
                    <i className="ti ti-map-pin text-gray-5 me-2"></i>
                    {c.location || 'N/A'}
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
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
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
                        <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
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
                        <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
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
                        <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
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