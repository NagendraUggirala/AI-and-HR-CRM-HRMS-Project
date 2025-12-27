import React, { useState, useEffect } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { companiesAPI } from '../../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Companies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Crmcompanies, setCrmcompanies] = useState([]);
  const [displayedCompanies, setDisplayedCompanies] = useState([]);

  // Sample companies data for fallback/export
  const sampleCompanies = [
    {
      name: 'Brightwave Innovations',
      email: 'clara@example.com',
      phone: '(563) 245 3156',
      location: 'Germany',
      rating: 4.5,
      logo: '🌊',
    },
    {
      name: 'Stellar Dynamics',
      email: 'sharon@example.com',
      phone: '(148) 126 6495',
      location: 'USA',
      rating: 4.5,
      logo: '🌟',
    },
    {
      name: 'Quantum Nexus',
      email: 'rayuhan@example.com',
      phone: '(248) 136 6495',
      location: 'India',
      rating: 4.5,
      logo: '⚛️',
    },
    {
      name: 'EcoVision Enterprises',
      email: 'jessica@example.com',
      phone: '(563) 245 3156',
      location: 'Canada',
      rating: 4.5,
      logo: '🌱',
    },
    {
      name: 'Aurora Technologies',
      email: 'clara@example.com',
      phone: '(563) 245 3156',
      location: 'Germany',
      rating: 4.5,
      logo: '🌌',
    },
    {
      name: 'BluSky Ventures',
      email: 'diana@example.com',
      phone: '(563) 245 3156',
      location: 'Japan',
      rating: 4.5,
      logo: '☁️',
    },
    {
      name: 'TerraFusion Energy',
      email: 'rakesh@example.com',
      phone: '(563) 245 3156',
      location: 'Indonesia',
      rating: 4.5,
      logo: '🔥',
    },
    {
      name: 'UrbanPulse Design',
      email: 'jonella@example.com',
      phone: '(563) 245 3156',
      location: 'USA',
      rating: 4.5,
      logo: '🏙️',
    },

    {
      name: 'Nimbus Networks',
      email: 'jonathan@example.com',
      phone: '(763) 2946 125',
      location: 'Israel',
      rating: 4.1,
      logo: '☁️',

    },
    {
      name: 'Epicurean Delights',
      email: 'patrick@example.com',
      phone: '(123) 345 9776',
      location: 'Colombia',
      rating: 4.2,
      logo: '🍽️'

    },
    {
      name: 'Hermann Groups',
      email: 'patrick@example.com',
      phone: '(123) 345 9776',
      location: 'Colombia',
      rating: 4.1,
      logo: '🏢'

    },
    {
      name: 'Beacon Softwares',
      email: 'gloria@example.com',
      phone: '(153) 789 6248',
      location: 'Brazil',
      rating: 4.6,
      logo: '💻'

    },
  ];

  // Load companies from API on component mount
  useEffect(() => {
    loadCompanies();
  }, []);

  // Update displayed companies when Crmcompanies changes
  useEffect(() => {
    setDisplayedCompanies(Crmcompanies);
  }, [Crmcompanies]);

  // Load companies from API
  const loadCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await companiesAPI.list();
      if (Array.isArray(data)) {
        // Transform API data to match component structure
        // Backend sends 'company_name', 'phone_number', etc.
        const transformedCompanies = data.map(company => ({
          id: company.id,
          name: company.company_name || company.name || 'Untitled Company', // Backend sends 'company_name'
          email: company.email || '',
          phone: company.phone_number || company.phone || '', // Backend sends 'phone_number'
          phone2: company.phone_number2 || company.phone2 || '',
          location: company.location || company.country || '',
          rating: company.rating || 0,
          logo: company.logo || '🏢', // Use logo from backend if available
          ...company // Keep all original fields
        }));
        setCrmcompanies(transformedCompanies);
        setDisplayedCompanies(transformedCompanies);
      } else if (data === null || data === undefined) {
        setCrmcompanies([]);
        setDisplayedCompanies([]);
      } else {
        console.warn('API returned non-array data:', data);
        setCrmcompanies([]);
        setDisplayedCompanies([]);
      }
    } catch (err) {
      console.error('Error loading companies:', err);
      const status = err.status || (err.message && err.message.includes('404') ? 404 : null);
      let errorMessage = 'Failed to load companies. ';
      
      if (status === 404 || err.message?.includes('404') || err.message?.includes('Not Found')) {
        errorMessage += 'The companies API endpoint is not available. Please ensure the backend companies endpoint is implemented.';
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please check if the backend API is running.';
      }
      
      setError(errorMessage);
      // Fallback to sample data
      setCrmcompanies(sampleCompanies);
      setDisplayedCompanies(sampleCompanies);
    } finally {
      setLoading(false);
    }
  };


  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f6f8',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    actions: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      padding: '6px 12px',
      backgroundColor: '#3B7080',
      color: 'white',
      border: 'none',
      borderRadius: '6px',  // medium rounded corners
      cursor: 'pointer',
    },

    select: {
      padding: '6px 12px',
      backgroundColor: '#3B7080',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
    },
    logo: {
      fontSize: '14px',
      marginBottom: '10px',
    },
  };

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    fax: '',
    website: '',
    ratings: '',
    owner: '',
    tags: 'Collab',
    deals: '',
    industry: '',
    source: '',
    currency: '',
    language: '',
    about: '',
    contact: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    skype: '',
    whatsapp: '',
    instagram: '',
    visibility: 'private',
    status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError(null);
      setLoading(true);
      
      // Prepare company data for API - map frontend fields to backend schema
      const companyData = {
        company_name: formData.companyName || 'Untitled Company', // Backend expects 'company_name', not 'name'
        email: formData.email || null,
        phone_number: formData.phoneNumber || null, // Backend expects 'phone_number', not 'phone'
        phone_number2: formData.phoneNumber2 || null, // Backend expects 'phone_number2', not 'phone2'
        fax: formData.fax || null,
        website: formData.website || null,
        location: formData.location || formData.country || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        zipcode: formData.zipcode || null,
        address: formData.address || null,
        rating: formData.ratings ? parseFloat(formData.ratings) : null, // Backend expects float or null
        industry: formData.industry || null,
        source: formData.source || null,
        currency: formData.currency || null,
        language: formData.language || null,
        owner: formData.owner || null,
        contact: formData.contact || null,
        deals: formData.deals || null,
        tags: formData.tags || null, // Backend expects string, not array
        about: formData.about || null,
        facebook: formData.facebook || null,
        twitter: formData.twitter || null,
        linkedin: formData.linkedin || null,
        instagram: formData.instagram || null,
        skype: formData.skype || null,
        whatsapp: formData.whatsapp || null,
        visibility: formData.visibility || 'private',
        status: formData.status || null
      };

      // Remove empty strings
      Object.keys(companyData).forEach(key => {
        if (companyData[key] === '') {
          companyData[key] = null;
        }
      });

      await companiesAPI.create(companyData);
      toast.success('Company created successfully!');
      
      // Reload companies
      await loadCompanies();
      
      // Close modal and reset form
      setShowModal(false);
      setActiveTab('basic-info');
      setFormData({
        companyName: '',
        email: '',
        phoneNumber: '',
        phoneNumber2: '',
        fax: '',
        website: '',
        ratings: '',
        owner: '',
        tags: 'Collab',
        deals: '',
        industry: '',
        source: '',
        currency: '',
        language: '',
        about: '',
        contact: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        skype: '',
        whatsapp: '',
        instagram: '',
        visibility: 'private',
        status: ''
      });
    } catch (err) {
      console.error('Error creating company:', err);
      const errorMessage = err.message || err.detail || 'Failed to create company. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveTab('basic-info'); // Reset to first tab when closing
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // Handle escape key press
  React.useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleExportPDF = () => {
    const exportData = Crmcompanies.length > 0 ? Crmcompanies : sampleCompanies;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Companies List", 10, 10);

    // Table-like data
    let y = 20;
    exportData.forEach((c, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ${c.name} - ${c.email || 'N/A'} - ${c.phone || 'N/A'} - ${c.location || 'N/A'}`,
        10,
        y
      );
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`companies_${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('PDF exported successfully!');
  };

  const handleExportEXCEL = () => {
    const exportData = Crmcompanies.length > 0 ? Crmcompanies : sampleCompanies;
    
    // Create CSV content
    const headers = ['Name', 'Email', 'Phone', 'Location', 'Rating'];
    const csvContent = [
      headers.join(','),
      ...exportData.map(company => [
        `"${company.name || ''}"`,
        `"${company.email || ''}"`,
        `"${company.phone || ''}"`,
        `"${company.location || ''}"`,
        `"${company.rating || 0}"`
      ].join(','))
    ].join('\n');

    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `companies_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Excel file downloaded successfully!');
  };

 const handleSortChange = (e) => {
  const selectedLocation = e.target.value;

  if (selectedLocation === 'Sort by') {
    // Reset to full list
    setDisplayedCompanies(Crmcompanies);
  } else {
    const filtered = Crmcompanies.filter(c => 
      (c.location && c.location.toLowerCase().includes(selectedLocation.toLowerCase())) ||
      (c.country && c.country.toLowerCase().includes(selectedLocation.toLowerCase()))
    );
    setDisplayedCompanies(filtered);
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

      {loading && Crmcompanies.length === 0 && (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Companies</h3>
        </div>
        
        {/* Right side: buttons */}
        <div className="d-flex gap-2">
          <div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              {/* Export Dropdown */}
              <div className="me-2 mb-2">
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
                      <button
                        onClick={handleExportPDF}
                        className="dropdown-item rounded-1"
                      >
                        <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleExportEXCEL}
                        className="dropdown-item rounded-1"
                      >
                        <i className="ti ti-file-type-pdf me-1"></i>Export as Excel
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button
            style={styles.button}
            onClick={() => setShowModal(true)}
          >
            <i className='fe fe-plus-circle'></i>  Add Company
          </button>
        </div>
      </div>

      <div className="card w-100 p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fs-6"><b>Companies Grid</b></h6>
          <select style={styles.select} onChange={handleSortChange}>
            <option>Sort by</option>
            {[...new Set(Crmcompanies.map((crm) => crm.location || crm.country).filter(Boolean))].map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>


        </div>
      </div>

      <div style={styles.container}>

        <div style={styles.grid}>
          {displayedCompanies.map((company, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.logo}>{company.logo}</div>
              <h5><b>{company.name}</b></h5>
              <p><strong>Email:</strong> {company.email}</p>
              <p><strong>Phone:</strong> {company.phone}</p>
              <p><strong>Location:</strong> {company.location}</p>
              <p><strong>Rating:</strong> ⭐ {company.rating}</p>

            </div>
          ))}

        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70px" }}
        >
          <button className="btn btn-secondary btn-sm">Load More</button>
        </div>

      </div>


      {/* Add Company Modal */}
      {showModal && (
        <div
          className="modal fade show"
          id="addCompanyModal"
          tabIndex="-1"
          aria-labelledby="addCompanyModalLabel"
          aria-hidden="false"
          style={{ display: 'block' }}
          onClick={handleBackdropClick}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add New Company</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="contact-grids-tab">
                  <ul className="nav nav-underline" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
                        id="info-tab"
                        type="button"
                        role="tab"
                        onClick={() => setActiveTab('basic-info')}
                      >
                        Basic Information
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                        id="address-tab"
                        type="button"
                        role="tab"
                        onClick={() => setActiveTab('address')}
                      >
                        Address
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'social-profile' ? 'active' : ''}`}
                        id="social-profile-tab"
                        type="button"
                        role="tab"
                        onClick={() => setActiveTab('social-profile')}
                      >
                        Social Profiles
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
                        id="access-tab"
                        type="button"
                        role="tab"
                        onClick={() => setActiveTab('access')}
                      >
                        Access
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  {activeTab === 'basic-info' && (
                    <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                      <div className="modal-body pb-0">
                        <div className="row">
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
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Company Name <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
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
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Phone Number 2</label>
                              <input
                                type="text"
                                className="form-control"
                                name="phoneNumber2"
                                value={formData.phoneNumber2}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
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
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Website</label>
                              <input
                                type="url"
                                className="form-control"
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Ratings <span className="text-danger">*</span></label>
                              <div className="input-icon-end position-relative">
                                <input
                                  type="number"
                                  className="form-control"
                                  name="ratings"
                                  value={formData.ratings}
                                  onChange={handleInputChange}
                                  min="1"
                                  max="5"
                                  step="0.1"
                                  required
                                />
                                <span className="input-icon-addon">
                                  <i className="ti ti-star text-gray-6"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Owner <span className="text-danger">*</span></label>
                              <select
                                className="form-select"
                                name="owner"
                                value={formData.owner}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="Hendry Milner">Hendry Milner</option>
                                <option value="Guilory Berggren">Guilory Berggren</option>
                                <option value="Jami Carlile">Jami Carlile</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Tags <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="Add tags separated by commas"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="deals"
                                value={formData.deals}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="Collins">Collins</option>
                                <option value="Konopelski">Konopelski</option>
                                <option value="Adams">Adams</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Industry <span className="text-danger">*</span></label>
                              <select
                                className="form-select"
                                name="industry"
                                value={formData.industry}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="Retail Industry">Retail Industry</option>
                                <option value="Banking">Banking</option>
                                <option value="Hotels">Hotels</option>
                                <option value="Financial Services">Financial Services</option>
                                <option value="Insurance">Insurance</option>
                              </select>
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
                                required
                              >
                                <option value="">Select</option>
                                <option value="Phone Calls">Phone Calls</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Referral Sites">Referral Sites</option>
                                <option value="Web Analytics">Web Analytics</option>
                                <option value="Previous Purchase">Previous Purchase</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Currency <span className="text-danger">*</span></label>
                              <select
                                className="form-select"
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="USD">USD</option>
                                <option value="Euro">Euro</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Language <span className="text-danger">*</span></label>
                              <select
                                className="form-select"
                                name="language"
                                value={formData.language}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="English">English</option>
                                <option value="Arabic">Arabic</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">About <span className="text-danger">*</span></label>
                              <textarea
                                className="form-control"
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                                rows="4"
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="Darlee Robertson">Darlee Robertson</option>
                                <option value="Sharon Roy">Sharon Roy</option>
                                <option value="Vaughan">Vaughan</option>
                                <option value="Jessica">Jessica</option>
                                <option value="Carol Thomas">Carol Thomas</option>
                              </select>
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
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                    </div>
                  )}
                  {activeTab === 'address' && (
                    <div className="tab-pane fade show active" id="address" role="tabpanel" aria-labelledby="address-tab" tabIndex="0">
                      <div className="modal-body pb-0">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label">Address <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Country <span className="text-danger">*</span></label>
                              <select
                                className="form-select"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">State <span className="text-danger">*</span></label>
                              <select
                                className="form-select"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="California">California</option>
                                <option value="New York">New York</option>
                                <option value="Texas">Texas</option>
                                <option value="Florida">Florida</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">City <span className="text-danger">*</span></label>
                              <select
                                className="form-select"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="San Diego">San Diego</option>
                                <option value="Fresno">Fresno</option>
                                <option value="San Francisco">San Francisco</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Zipcode <span className="text-danger">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                required
                              />
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
                        <button type="submit" className="btn btn-primary">Save</button>
                      </div>
                    </div>
                  )}
                  {activeTab === 'social-profile' && (
                    <div className="tab-pane fade show active" id="social-profile" role="tabpanel" aria-labelledby="social-profile-tab" tabIndex="0">
                      <div className="modal-body pb-0">
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
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">LinkedIn</label>
                              <input
                                type="url"
                                className="form-control"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Skype</label>
                              <input
                                type="text"
                                className="form-control"
                                name="skype"
                                value={formData.skype}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">WhatsApp</label>
                              <input
                                type="text"
                                className="form-control"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
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
                              />
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
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
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
}

export default Companies;