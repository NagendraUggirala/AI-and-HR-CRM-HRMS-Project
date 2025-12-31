import React, { useState, useEffect } from "react";
import { contactsAPI } from "../../utils/api";
import { BASE_URL } from "../../config/api.config";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    // Basic Information
    name: '',
    lastName: '',
    role: '',
    phone: '',
    phone2: '',
    fax: '',
    email: '',
    company: '',
    dateOfBirth: '',
    rating: '0',
    owner: '',
    deals: '',
    industry: '',
    currency: 'Dollar',
    language: 'English',
    source: '',
    tags: [],
    img: '/assets/img/users/user-49.jpg',
    // Address Information
    location: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    // Social Profiles
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    skype: '',
    website: '',
    // Access Information
    accessLevel: '',
    department: '',
    allowEmailAccess: false,
    allowPhoneAccess: false,
    allowDataExport: false
  });

  const resetForm = () => {
    setFormData({
      // Basic Information
      name: '',
      lastName: '',
      role: '',
      phone: '',
      phone2: '',
      fax: '',
      email: '',
      company: '',
      dateOfBirth: '',
      rating: '0',
      owner: '',
      deals: '',
      industry: '',
      currency: 'Dollar',
      language: 'English',
      source: '',
      tags: [],
      img: '/assets/images/users/user1.png',
      // Address Information
      location: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      // Social Profiles
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      skype: '',
      website: '',
      // Access Information
      accessLevel: '',
      department: '',
      allowEmailAccess: false,
      allowPhoneAccess: false,
      allowDataExport: false
    });
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddContact = () => {
    setModalType('add');
    resetForm();
    setSelectedContact(null);
    setSelectedFile(null);
    setImagePreview(null);
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    setModalType('edit');
    setSelectedContact(contact);
    setSelectedFile(null);
    // Set image preview from existing profile photo
    const profilePhotoUrl = contact.profile_photo 
      ? (contact.profile_photo.startsWith('http') ? contact.profile_photo : `${BASE_URL}${contact.profile_photo}`)
      : '/assets/images/users/user1.png';
    setImagePreview(profilePhotoUrl);
    // Map API response (backend field names) to form data format (frontend field names)
    setFormData({
      // Basic Information
      name: contact.name || '',
      lastName: contact.last_name || '',
      role: contact.job_title || '',
      phone: contact.phone_number || '',
      phone2: contact.phone_number2 || '',
      fax: contact.fax || '',
      email: contact.email || '',
      company: contact.company_name || '',
      dateOfBirth: contact.dob ? (typeof contact.dob === 'string' ? contact.dob.split('T')[0] : contact.dob) : '',
      rating: contact.ratings?.toString() || '0',
      owner: contact.owner || '',
      deals: contact.deals || '',
      industry: contact.industry || '',
      currency: contact.currency || 'Dollar',
      language: contact.language || 'English',
      source: contact.source || '',
      tags: Array.isArray(contact.tags) ? contact.tags : (contact.tags ? contact.tags.split(',') : []),
      img: contact.profile_photo || '/assets/images/users/user1.png',
      // Address Information
      location: contact.location || '',
      city: contact.city || '',
      state: contact.state || '',
      country: contact.country || '',
      postalCode: contact.postal_code || '',
      // Social Profiles
      facebook: contact.facebook || '',
      twitter: contact.twitter || '',
      linkedin: contact.linkedin || '',
      instagram: contact.instagram || '',
      skype: contact.skype || '',
      website: contact.website || '',
      // Access Information
      accessLevel: contact.access_level || '',
      department: contact.department || '',
      allowEmailAccess: contact.allow_email_access || false,
      allowPhoneAccess: contact.allow_phone_access || false,
      allowDataExport: contact.allow_data_export || false
    });
    setActiveTab('basic');
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setActiveTab('basic'); // Reset to first tab when closing
    resetForm();
    setSelectedContact(null);
    setSelectedFile(null);
    setImagePreview(null);
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
        const errorMessage = err.message || err.detail || "Failed to delete contact. Please try again.";
        setError(errorMessage);
      }
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setError(null);
      
      // Handle profile photo path - preserve existing photo if no new file selected
      let profilePhotoPath = null;
      if (modalType === 'edit' && selectedContact) {
        // For edit mode, preserve existing photo path if no new file is selected
        if (selectedFile) {
          // Upload new photo if a file is selected
          try {
            const uploadResult = await contactsAPI.uploadProfilePhoto(selectedContact.id, selectedFile);
            profilePhotoPath = uploadResult.profile_photo;
          } catch (uploadErr) {
            console.error("Error uploading profile photo:", uploadErr);
            setError("Failed to upload profile photo. Please try again.");
            return;
          }
        } else {
          // No new file selected, preserve existing photo path
          profilePhotoPath = selectedContact.profile_photo || null;
        }
      } else {
        // For add mode, use formData.img or null
        profilePhotoPath = formData.img || null;
      }
      
      // Prepare contact data for API - map frontend fields to backend schema
      const contactData = {
        // Basic Information
        name: formData.name || '',
        last_name: formData.lastName || null,
        job_title: formData.role || '',
        phone_number: formData.phone || '',
        phone_number2: formData.phone2 || null,
        fax: formData.fax || null,
        email: formData.email || null,
        company_name: formData.company || '',
        dob: formData.dateOfBirth || null,
        ratings: formData.rating || null,
        owner: formData.owner || null,
        deals: formData.deals || null,
        industry: formData.industry || null,
        currency: formData.currency || null,
        language: formData.language || null,
        source: formData.source || null,
        tags: Array.isArray(formData.tags) ? formData.tags : (formData.tags ? [formData.tags] : []),
        profile_photo: profilePhotoPath,
        // Address Information
        location: formData.location || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        postal_code: formData.postalCode || null,
        // Social Profiles
        facebook: formData.facebook || null,
        twitter: formData.twitter || null,
        linkedin: formData.linkedin || null,
        instagram: formData.instagram || null,
        skype: formData.skype || null,
        website: formData.website || null,
        // Access Information
        access_level: formData.accessLevel || null,
        department: formData.department || null,
        allow_email_access: formData.allowEmailAccess || false,
        allow_phone_access: formData.allowPhoneAccess || false,
        allow_data_export: formData.allowDataExport || false
      };

      let createdContactId = null;
      if (modalType === 'add') {
        const createdContact = await contactsAPI.create(contactData);
        createdContactId = createdContact.id;
        // Upload profile photo for newly created contact
        if (selectedFile && createdContactId) {
          try {
            await contactsAPI.uploadProfilePhoto(createdContactId, selectedFile);
          } catch (uploadErr) {
            console.error("Error uploading profile photo:", uploadErr);
            // Don't fail the whole operation, just log the error
          }
        }
      } else if (selectedContact) {
        await contactsAPI.update(selectedContact.id, contactData);
      }
      
      await loadContacts();
      setShowModal(false);
      resetForm();
      setSelectedContact(null);
      setSelectedFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error saving contact:", err);
      const errorMessage = err.message || err.detail || "Failed to save contact. Please try again.";
      setError(errorMessage);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    resetForm();
    setSelectedContact(null);
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      // Validate file size (4MB)
      if (file.size > 4 * 1024 * 1024) {
        setError('Image size should be below 4MB');
        return;
      }
      setSelectedFile(file);
      setError(null);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      img: '/assets/img/users/user-49.jpg'
    }));
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
      {/* Contact Table Header */}
      <div className="card w-100">
        <div className="card-body p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h5>Contact Table</h5>
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

      {/* Contacts Table */}
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
      
      {!loading && contacts.length > 0 && (
        <div className="card w-100">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Industry</th>
                    <th>Rating</th>
                    <th style={{ width: '180px', minWidth: '180px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-sm avatar-rounded me-2">
                            <img 
                              src={
                                c.profile_photo 
                                  ? (c.profile_photo.startsWith('http') ? c.profile_photo : `${BASE_URL}${c.profile_photo}`)
                                  : '/assets/images/users/user1.png'
                              } 
                              alt="user" 
                              className="img-fluid" 
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                              onError={(e) => {
                                e.target.src = '/assets/images/users/user1.png';
                              }}
                            />
                          </div>
                          <div>
                            <div className="fw-medium">
                              {c.name} {c.last_name || ''}
                            </div>
                            {c.owner && (
                              <small className="text-muted">
                                <i className="ti ti-user me-1"></i>{c.owner}
                              </small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        {c.email ? (
                          <div className="d-flex align-items-center">
                            <i className="ti ti-mail text-gray-5 me-2"></i>
                            <span>{c.email}</span>
                          </div>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          {c.phone_number && (
                            <div className="d-flex align-items-center mb-1">
                              <i className="ti ti-phone text-gray-5 me-2"></i>
                              <span>{c.phone_number}</span>
                            </div>
                          )}
                          {c.phone_number2 && (
                            <div className="d-flex align-items-center">
                              <i className="ti ti-phone text-gray-5 me-2"></i>
                              <span className="text-muted small">{c.phone_number2}</span>
                            </div>
                          )}
                          {!c.phone_number && <span className="text-muted">N/A</span>}
                        </div>
                      </td>
                      <td>
                        {c.company_name ? (
                          <div className="d-flex align-items-center">
                            <i className="ti ti-building text-gray-5 me-2"></i>
                            <span>{c.company_name}</span>
                          </div>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {c.job_title ? (
                          <span className="badge bg-pink-transparent fs-10 fw-medium">
                            {c.job_title}
                          </span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {c.location || c.city || c.state || c.country ? (
                          <div className="d-flex align-items-center">
                            <i className="ti ti-map-pin text-gray-5 me-2"></i>
                            <span>
                              {[c.location, c.city, c.state, c.country].filter(Boolean).join(', ') || 'N/A'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {c.industry ? (
                          <div className="d-flex align-items-center">
                            <i className="ti ti-briefcase text-gray-5 me-2"></i>
                            <span>{c.industry}</span>
                          </div>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {c.ratings ? (
                          <div className="d-flex align-items-center">
                            <i className="ti ti-star-filled text-warning me-1"></i>
                            <span>{c.ratings}</span>
                          </div>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td style={{ whiteSpace: 'nowrap', width: '180px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEditContact(c)}
                            title="Edit Contact"
                            type="button"
                            style={{ fontSize: '13px', padding: '6px 12px', minWidth: '70px' }}
                          >
                            <i className="ti ti-edit me-1"></i>Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteContact(c)}
                            title="Delete Contact"
                            type="button"
                            style={{ fontSize: '13px', padding: '6px 12px', minWidth: '70px' }}
                          >
                            <i className="ti ti-trash me-1"></i>Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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
                  <form onSubmit={handleSave}>
                   
                    <div className="col-md-12">
                            <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                              <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames" style={{ position: 'relative', overflow: 'hidden' }}>
                                {imagePreview ? (
                                  <img 
                                    src={imagePreview} 
                                    alt="Profile preview" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                      e.target.src = '/assets/images/users/user1.png';
                                    }}
                                  />
                                ) : (
                                  <i className="ti ti-photo text-gray-2 fs-16"></i>
                                )}
                              </div>
                              <div className="profile-upload">
                                <div className="mb-2">
                                  <h6 className="mb-1">Upload Profile Image</h6>
                                  <p className="fs-12">Image should be below 4 mb</p>
                                </div>
                                <div className="profile-uploader d-flex align-items-center">
                                  <label className="drag-upload-btn btn btn-sm btn-primary me-2" style={{ cursor: 'pointer', position: 'relative' }}>
                                    Upload
                                    <input 
                                      type="file" 
                                      className="form-control image-sign" 
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                                    />
                                  </label>
                                  {(selectedFile || imagePreview) && (
                                    <button 
                                      type="button"
                                      onClick={handleRemoveImage}
                                      className="btn btn-light btn-sm"
                                    >
                                      Remove
                                    </button>
                                  )}
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
                          <label className="form-label">Phone Number 2</label>
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
                          <input
                            type="text"
                            className="form-control"
                            name="fax"
                            value={formData.fax}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Deals</label>
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
                          <label className="form-label">Date of Birth</label>
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
                          <label className="form-label">Ratings</label>
                          <select
                            className="form-select"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                          >
                            <option value="0">No Rating</option>
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
                          <label className="form-label">Owner</label>
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
                          <label className="form-label">Industry</label>
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
                          <label className="form-label">Currency</label>
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
                          <label className="form-label">Language</label>
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
                          <label className="form-label">Tags</label>
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
                          <label className="form-label">Source</label>
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
                  </form>
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
                            placeholder="Street address"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="State/Province"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Postal Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Postal/ZIP code"
                          />
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
                          <input
                            type="url"
                            className="form-control"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Twitter</label>
                          <input
                            type="url"
                            className="form-control"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">LinkedIn</label>
                          <input
                            type="url"
                            className="form-control"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Instagram</label>
                          <input
                            type="url"
                            className="form-control"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Skype</label>
                          <input
                            type="text"
                            className="form-control"
                            name="skype"
                            value={formData.skype}
                            onChange={handleInputChange}
                            placeholder="skype:username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Website</label>
                          <input
                            type="url"
                            className="form-control"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://website.com"
                          />
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
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Access Level</label>
                            <select
                              className="form-select"
                              name="accessLevel"
                              value={formData.accessLevel}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Access Level</option>
                              <option value="Public">Public</option>
                              <option value="Private">Private</option>
                              <option value="Restricted">Restricted</option>
                              <option value="Internal">Internal</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Department</label>
                            <input
                              type="text"
                              className="form-control"
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              placeholder="Department"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <h6 className="fs-14 fw-medium mb-3">Permissions</h6>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="allowEmailAccess"
                                id="allowEmailAccess"
                                checked={formData.allowEmailAccess}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="allowEmailAccess">
                                Allow Email Access
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="allowPhoneAccess"
                                id="allowPhoneAccess"
                                checked={formData.allowPhoneAccess}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="allowPhoneAccess">
                                Allow Phone Access
                              </label>
                            </div>
                            <div className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="allowDataExport"
                                id="allowDataExport"
                                checked={formData.allowDataExport}
                                onChange={handleInputChange}
                              />
                              <label className="form-check-label" htmlFor="allowDataExport">
                                Allow Data Export
                              </label>
                            </div>
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
      
    </div>

  );
};

export default Contacts;