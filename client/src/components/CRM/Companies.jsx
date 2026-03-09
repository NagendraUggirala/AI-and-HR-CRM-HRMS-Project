import React, { useState, useEffect, useCallback } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { companiesAPI } from '../../utils/api';
import { BASE_URL } from '../../config/api.config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react/dist/iconify.js';

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

function Companies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Crmcompanies, setCrmcompanies] = useState([]);
  const [displayedCompanies, setDisplayedCompanies] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load companies from API
  const loadCompanies = useCallback(async () => {
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
          logo: company.logo || null, // Use logo path from backend
          logoPath: company.logo
            ? (company.logo.startsWith('http') ? company.logo : `${BASE_URL}${company.logo}`)
            : null,
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
  }, []);

  // Load companies from API on component mount
  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  // Update displayed companies when Crmcompanies changes
  useEffect(() => {
    setDisplayedCompanies(Crmcompanies);
  }, [Crmcompanies]);


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
      position: 'relative',
    },
    logo: {
      fontSize: '14px',
      marginBottom: '10px',
    },
  };

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    fax: '',
    website: '',
    ratings: '',
    owner: "",
customOwner: "",
    tags: '',
    deals: '',
    industry: '',
customIndustry: '',
    source: '',
customSource: '',
    currency: "",
    customCurrency: "",
    language: "",
    customLanguage: "",
    about: '',
    contact: '',
customContact: '',
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
    status: '',
     selectedUsers: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        toast.error('Please select an image file');
        return;
      }
      // Validate file size (4MB)
      if (file.size > 4 * 1024 * 1024) {
        setError('Image size should be below 4MB');
        toast.error('Image size should be below 4MB');
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
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      email: '',
      phoneNumber: '',
      phoneNumber2: '',
      fax: '',
      website: '',
      ratings: '',
      owner: "",
customOwner: "",
      tags: '',
      deals: '',
      industry: '',
      source: '',
customSource: '',
    currency: "",
    customCurrency: "",
    language: "",
    customLanguage: "",
      about: '',
      contact: '',
customContact: '',
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
      status: '',
      selectedUsers: []
    });
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleAddCompany = () => {
    setModalType('add');
    resetForm();
    setSelectedCompany(null);
    setActiveTab('basic-info');
    setShowModal(true);
  };

  const handleEditCompany = (company) => {
const predefinedCurrencies = ["Dollar", "Euro", "Rupee", "Pound"];
const predefinedLanguages = ["English", "Spanish", "French", "German"];
const predefinedOwners = [
  "Hendry Milner",
  "Guilory Berggren",
  "Jami Carlile"
];

const predefinedIndustries = [
  "Retail Industry",
  "Banking",
  "Hotels",
  "Financial Services",
  "Insurance"
];

const predefinedSources = [
  "Phone Calls",
  "Social Media",
  "Referral Sites",
  "Web Analytics",
  "Previous Purchase"
];

const predefinedContacts = [
  "Darlee Robertson",
  "Sharon Roy",
  "Vaughan",
  "Jessica",
  "Carol Thomas"
];
    setModalType('edit');
    setSelectedCompany(company);
    setSelectedFile(null);
    // Set image preview from existing logo
    const logoUrl = company.logoPath || (company.logo ? `${BASE_URL}${company.logo}` : null);
    setImagePreview(logoUrl);
    // Map API response (backend field names) to form data format (frontend field names)
    setFormData({
      companyName: company.company_name || company.name || '',
      email: company.email || '',
      phoneNumber: company.phone_number || company.phone || '',
      phoneNumber2: company.phone_number2 || company.phone2 || '',
      fax: company.fax || '',
      website: company.website || '',
      location: company.location || company.address || '',
      city: company.city || '',
      state: company.state || '',
      country: company.country || '',
      zipcode: company.zipcode || '',
      address: company.address || '',
      ratings: company.rating ? company.rating.toString() : '',
      industry: predefinedIndustries.includes(company.industry)
  ? company.industry
  : "Others",

customIndustry: predefinedIndustries.includes(company.industry)
  ? ""
  : company.industry || "",
      source: predefinedSources.includes(company.source)
  ? company.source
  : company.source
    ? "Others"
    : "",

customSource: predefinedSources.includes(company.source)
  ? ""
  : company.source || "",
  currency: predefinedCurrencies.includes(company.currency)
    ? company.currency
    : company.currency
      ? "Other"
      : "",

  customCurrency: predefinedCurrencies.includes(company.currency)
    ? ""
    : company.currency || "",

  language: predefinedLanguages.includes(company.language)
    ? company.language
    : company.language
      ? "Other"
      : "",

  customLanguage: predefinedLanguages.includes(company.language)
    ? ""
    : company.language || "",
      owner: predefinedOwners.includes(company.owner)
  ? company.owner
  : "Others",

customOwner: predefinedOwners.includes(company.owner)
  ? ""
  : company.owner || "",
     contact: predefinedContacts.includes(company.contact)
  ? company.contact
  : company.contact
    ? "Others"
    : "",

customContact: predefinedContacts.includes(company.contact)
  ? ""
  : company.contact || "",
      deals: company.deals || '',
      tags: company.tags || 'Collab',
      about: company.about || '',
      facebook: company.facebook || '',
      twitter: company.twitter || '',
      linkedin: company.linkedin || '',
      instagram: company.instagram || '',
      skype: company.skype || '',
      whatsapp: company.whatsapp || '',
      visibility: company.visibility || 'private',
      status: company.status || '',
       //  Add if using custom user selection
    selectedUsers: company.selectedUsers ?? []
    });
    setActiveTab('basic-info');
    setShowModal(true);
  };

  const handleDeleteCompany = (company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (companyToDelete) {
      try {
        setError(null);
        await companiesAPI.delete(companyToDelete.id);
        await loadCompanies();
        setShowDeleteModal(false);
        setCompanyToDelete(null);
        toast.success('Company deleted successfully!');
      } catch (err) {
        console.error("Error deleting company:", err);
        const errorMessage = err.message || err.detail || "Failed to delete company. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
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
        location: formData.location || formData.address || formData.country || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        zipcode: formData.zipcode || null,
        address: formData.address || null,
        rating: formData.ratings ? parseFloat(formData.ratings) : null, // Backend expects float or null
        industry: formData.industry === "Others"
    ? formData.customIndustry || null
    : formData.industry || null,
    
        source:formData.source === "Others"
    ? formData.customSource || null
    : formData.source || null,
        currency: formData.currency === "Other"
    ? formData.customCurrency || null
    : formData.currency || null,
        language: formData.language === "Other"
    ? formData.customLanguage || null
    : formData.language || null,
        owner: formData.owner === "Others"
    ? formData.customOwner || null
    : formData.owner || null,
        contact: formData.contact === "Others"
    ? formData.customContact || null
    : formData.contact || null,
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
        status: formData.status || null,
         //  Add if using custom user selection
    selectedUsers: formData.selectedUsers ?? []
      };

      // Remove empty strings
      Object.keys(companyData).forEach(key => {
        if (companyData[key] === '') {
          companyData[key] = null;
        }
      });

      if (modalType === 'add') {
        await companiesAPI.create(companyData, selectedFile);
        toast.success('Company created successfully!');
      } else if (selectedCompany) {
        await companiesAPI.update(selectedCompany.id, companyData, selectedFile);
        toast.success('Company updated successfully!');
      }

      // Reload companies
      await loadCompanies();

      // Close modal and reset form
      setShowModal(false);
      setActiveTab('basic-info');
      resetForm();
      setSelectedCompany(null);
    } catch (err) {
      console.error('Error saving company:', err);
      const errorMessage = err.message || err.detail || 'Failed to save company. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveTab('basic-info'); // Reset to first tab when closing
    resetForm();
    setSelectedCompany(null);
  };



  const handleUserSelect = (e) => {
  const value = e.target.value;

  setFormData((prev) => {
    const selected = prev.selectedUsers || [];

    if (selected.includes(value)) {
      return {
        ...prev,
        selectedUsers: selected.filter((id) => id !== value),
      };
    } else {
      return {
        ...prev,
        selectedUsers: [...selected, value],
      };
    }
  });
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
          <h5 className="text-3xl fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <span className="icon-circle text-primary">
              <Icon icon="heroicons:link-20-solid" />
            </span>
            Companies
          </h5>
          <p className="text-muted mb-0">
            Manage contacts, associated companies, and communication details from a single platform.
          </p>
        </div>

        {/* Right side: buttons */}
<div className="d-flex gap-2 align-items-center">

  {/* Export Dropdown */}
  <div className="dropdown">
    <button
      type="button"
      className="create-job-btn dropdown-toggle gap-2"
      data-bs-toggle="dropdown"
    >
      <i className="ti ti-file-export"></i>
      Export
    </button>

    <ul className="dropdown-menu dropdown-menu-end p-2">
      <li>
        <button
          onClick={handleExportPDF}
          className="dropdown-item rounded-1"
        >
          <i className="ti ti-file-type-pdf me-1"></i>
          Export as PDF
        </button>
      </li>

      <li>
        <button
          onClick={handleExportEXCEL}
          className="dropdown-item rounded-1"
        >
          <i className="ti ti-file-type-xls me-1"></i>
          Export as Excel
        </button>
      </li>
    </ul>
  </div>

  {/* Add Company Button */}
  <button
    className="add-employee gap-2"
    onClick={handleAddCompany}
  >
    <Icon icon="heroicons:plus-circle" width="18" />

    Add Company
  </button>

</div>
      </div>

      <div className="card w-100 p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fs-6"><b>Companies Grid</b></h6>
<select className='close-btn' onChange={handleSortChange}>
  <option value="" className='text-dark'>Sort by Location</option>

  {[...new Set(
    Crmcompanies
      .map((crm) => crm.location?.trim() || crm.country?.trim())
      .filter(Boolean)
  )].map((location, index) => (
    <option key={index} value={location} className='text-dark'>
      {location}
    </option>
  ))}

</select>


        </div>
      </div>

      <div style={styles.container}>

        <div style={styles.grid}>
          {displayedCompanies.map((company, index) => (
            <div
              key={company.id || index}
              style={{
                ...styles.card,
                backgroundColor: "#f8fafc", // soft background
                borderRadius: "14px",
                padding: "18px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                height: "100%"
              }}
            >
              {/* Top: Logo */}
              <div className="d-flex justify-content-start mb-3">
                <div
                  style={{
                    ...styles.logo,
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    backgroundColor: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                    
                  }}
                >
                  {company.logoPath ? (
                    <img
                      src={company.logoPath}
                      alt={company.name}
                      style={{
                        width: "56px",
                        height: "56px",
                        objectFit: "contain",
                        borderRadius: "8px"
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

                  {/* React Icon instead of 🏢 */}
                  <span
                    style={{
                      display: company.logoPath ? "none" : "flex",
                      fontSize: "28px",
                      color: "#334155"
                    }}
                  >
                    <Icon icon="heroicons:building-office-2" />
                  </span>
                </div>
              </div>

              {/* Company Name */}
              <h5
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  marginBottom: "12px",
                  lineHeight: "1.3"
                }}
              >
                {company.name}
              </h5>

              {/* Details */}
              <div
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  lineHeight: "1.8",
                  flexGrow: 1
                }}
              >
                <div>
                  <strong style={{ color: "#000" }}>Email:</strong>{" "}
                  {company.email || "N/A"}
                </div>
                <div>
                  <strong style={{ color: "#000" }}>Phone:</strong>{" "}
                  {company.phone || "N/A"}
                </div>
                <div>
                  <strong style={{ color: "#000" }}>Location:</strong>{" "}
                  {company.location || "N/A"}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <strong style={{ color: "#000" }}>Rating:</strong>
                  <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                    ⭐ {company.rating || 0}
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="d-flex justify-content-around gap-2 mt-3">
                <button
                  className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
                  onClick={() => handleEditCompany(company)}
                  title="Edit Company"
                  type="button"
                  style={{ fontSize: "12px", padding: "6px 14px", minWidth: "70px" }}
                >
                  <Icon icon="heroicons:pencil-square" className="me-1" width="16" />
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                  onClick={() => handleDeleteCompany(company)}
                  title="Delete Company"
                  type="button"
                  style={{ fontSize: "12px", padding: "6px 14px", minWidth: "80px" }}
                >
                  <Icon icon="heroicons:trash" className="me-1" width="16" />
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
                <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70px" }}
        >
          <button className="close-btn">Load More</button>
        </div>
      </div>


      {/* Add Company Modal */}
      {showModal && (
<div className="hrms-modal-overlay">
  <div className="hrms-modal hrms-modal-offer-xl animate-scale-in d-flex flex-column">

    {/* ================= HEADER ================= */}
    <div className="hrms-modal-header">
      <h5 className="hrms-modal-title">
        {modalType === "add" ? "Add New Company" : "Edit Company"}
      </h5>
      <button
        type="button"
        className="btn-close"
        onClick={handleCloseModal}
      ></button>
    </div>

    {/* ================= BODY ================= */}
    <div className="hrms-modal-body flex-grow-1 hrms-modal-body-scroll">

      {/* ================= TABS ================= */}
      <ul className="nav nav-tabs mb-3 px-3 pt-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "basic-info" ? "active" : ""}`}
            onClick={() => setActiveTab("basic-info")}
          >
            Basic Information
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "address" ? "active" : ""}`}
            onClick={() => setActiveTab("address")}
          >
            Address
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "social-profile" ? "active" : ""}`}
            onClick={() => setActiveTab("social-profile")}
          >
            Social Profiles
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "access" ? "active" : ""}`}
            onClick={() => setActiveTab("access")}
          >
            Access
          </button>
        </li>
      </ul>

      {/* ================= FORM ================= */}
      <form id="companyForm" onSubmit={handleSubmit} className="px-3 pb-4">

                  {activeTab === 'basic-info' && (
                    <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                      <div className="modal-body pb-0">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                              <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames" style={{ position: 'relative', overflow: 'hidden' }}>
                                {imagePreview ? (
                                  <img
                                    src={imagePreview}
                                    alt="Logo preview"
                                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <Icon icon="heroicons:user-circle" className="text-secondary" width="48" height="48" />
                                )}
                              </div>
                              <div className="profile-upload">
                                <div className="mb-2">
                                  <h6 className="mb-1">Upload Company Logo</h6>
                                  <p className="fs-12">Image should be below 4 mb</p>
                                </div>
                                <div className="profile-uploader d-flex align-items-center gap-2">
                                  <label className="drag-upload-btn btn btn-sm btn-primary me-2" style={{ cursor: 'pointer', position: 'relative' }}>
                                    Upload
                                    <input
                                      type="file"
                                      className="create-job-btn"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                                    />
                                  </label>
                                  {(selectedFile || imagePreview) && (
                                    <button
                                      type="button"
                                      onClick={handleRemoveImage}
                                      className="cancel-btn"
                                    >
                                      Remove
                                    </button>
                                  )}
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
    <label className="form-label">
      Owner <span className="text-danger">*</span>
    </label>

    {formData.owner === "Others" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Owner"
        value={formData.customOwner}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customOwner: e.target.value
          }))
        }
        required
      />
    ) : (
      <select
        className="form-select"
        name="owner"
        value={formData.owner}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Others") {
            setFormData((prev) => ({
              ...prev,
              owner: "Others"
            }));
          } else {
            handleInputChange(e);
          }
        }}
        required
      >
        <option value="">Select</option>
        <option value="Hendry Milner">Hendry Milner</option>
        <option value="Guilory Berggren">Guilory Berggren</option>
        <option value="Jami Carlile">Jami Carlile</option>
        <option value="Others">Others</option>
      </select>
    )}
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
                                    <label className="form-label">
                                        Deals <span className="text-danger">*</span></label>
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
    <label className="form-label">
      Industry <span className="text-danger">*</span>
    </label>

    {formData.industry === "Others" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Industry"
        value={formData.customIndustry}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customIndustry: e.target.value
          }))
        }
        required
      />
    ) : (
      <select
        className="form-select"
        name="industry"
        value={formData.industry}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Others") {
            setFormData((prev) => ({
              ...prev,
              industry: "Others"
            }));
          } else {
            handleInputChange(e);
          }
        }}
        required
      >
        <option value="">Select</option>
        <option value="Retail Industry">Retail Industry</option>
        <option value="Banking">Banking</option>
        <option value="Hotels">Hotels</option>
        <option value="Financial Services">Financial Services</option>
        <option value="Insurance">Insurance</option>
        <option value="Others">Others</option>
      </select>
    )}
  </div>
</div>

<div className="col-md-6">
  <div className="mb-3">
    <label className="form-label">
      Source <span className="text-danger">*</span>
    </label>

    {formData.source === "Others" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Source"
        value={formData.customSource}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customSource: e.target.value
          }))
        }
        required
      />
    ) : (
      <select
        className="form-select"
        name="source"
        value={formData.source}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Others") {
            setFormData((prev) => ({
              ...prev,
              source: "Others"
            }));
          } else {
            handleInputChange(e);
          }
        }}
        required
      >
        <option value="">Select</option>
        <option value="Phone Calls">Phone Calls</option>
        <option value="Social Media">Social Media</option>
        <option value="Referral Sites">Referral Sites</option>
        <option value="Web Analytics">Web Analytics</option>
        <option value="Previous Purchase">Previous Purchase</option>
        <option value="Others">Others</option>
      </select>
    )}
  </div>
</div>

<div className="col-md-6">
  <div className="mb-3">
    <label className="form-label">Currency</label>

    {formData.currency === "Other" ? (
      //  Show Input when "Other" selected
      <input
        type="text"
        className="form-control"
        placeholder="Enter Currency (e.g. INR, JPY, CNY)"
        value={formData.customCurrency}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customCurrency: e.target.value
          }))
        }
      />
    ) : (
      //  Normal Dropdown
      <select
        className="form-select"
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
        <option value="Dollar">Dollar</option>
        <option value="Euro">Euro</option>
        <option value="Rupee">Rupee</option>
        <option value="Pound">Pound</option>
        <option value="Other">Other</option>
      </select>
    )}
  </div>
</div>
<div className="col-md-6">
  <div className="mb-3">
    <label className="form-label">Language</label>

    {formData.language === "Other" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Language"
        value={formData.customLanguage}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customLanguage: e.target.value,
          }))
        }

      />
    ) : (
      <select
        className="form-select"
        value={formData.language}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Other") {
            setFormData((prev) => ({
              ...prev,
              language: "Other",
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              language: value,
              customLanguage: "",
            }));
          }
        }}
      >
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Other">Other</option>
      </select>
    )}
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

    {formData.contact === "Others" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Contact Name"
        value={formData.customContact}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customContact: e.target.value
          }))
        }
        required
      />
    ) : (
      <select
        className="form-select"
        name="contact"
        value={formData.contact}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Others") {
            setFormData((prev) => ({
              ...prev,
              contact: "Others"
            }));
          } else {
            handleInputChange(e);
          }
        }}
        required
      >
        <option value="">Select</option>
        <option value="Darlee Robertson">Darlee Robertson</option>
        <option value="Sharon Roy">Sharon Roy</option>
        <option value="Vaughan">Vaughan</option>
        <option value="Jessica">Jessica</option>
        <option value="Carol Thomas">Carol Thomas</option>
        <option value="Others">Others</option>
      </select>
    )}

  </div>
</div>

                        </div>
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
    <label className="form-label">
      Country <span className="text-danger">*</span>
    </label>
    <input
      type="text"
      className="form-control"
      name="country"
      value={formData.country}
      onChange={handleInputChange}
      placeholder="Enter Country"
      required
    />
  </div>
</div>

<div className="col-md-6">
  <div className="mb-3">
    <label className="form-label">
      State <span className="text-danger">*</span>
    </label>
    <input
      type="text"
      className="form-control"
      name="state"
      value={formData.state}
      onChange={handleInputChange}
      placeholder="Enter State"
      required
    />
  </div>
</div>

<div className="col-md-6">
  <div className="mb-3">
    <label className="form-label">
      City <span className="text-danger">*</span>
    </label>
    <input
      type="text"
      className="form-control"
      name="city"
      value={formData.city}
      onChange={handleInputChange}
      placeholder="Enter City"
      required
    />
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

                    </div>
                  )}
                  {activeTab === 'access' && (
                    <div className="tab-pane fade show active" id="access" role="tabpanel" aria-labelledby="access-tab" tabIndex="0">
                      <div className="modal-body pb-0">
                        <div className="mb-4">
                          <h6 className="fs-14 fw-medium mb-1">Visibility</h6>
<div className="d-flex align-items-center gap-4">

  {[
    { id: "public", label: "Public" },
    { id: "private", label: "Private" },
    { id: "selectPeople", label: "Select People" },
  ].map((option) => {
    const isChecked = formData.visibility === option.id;

    return (
      <label
        key={option.id}
        htmlFor={option.id}
        className="d-flex align-items-center"
        style={{ cursor: "pointer" }}
      >
        {/* Custom Radio Circle */}
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: `2px solid ${isChecked ? "#3B82F6" : "#9CA3AF"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "8px",
            transition: "all 0.3s ease",
          }}
        >
          {isChecked && (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#3B82F6",
              }}
            />
          )}
        </div>

        {/* Hidden Native Radio */}
        <input
          type="radio"
          name="visibility"
          id={option.id}
          value={option.id}
          checked={isChecked}
          onChange={handleInputChange}
          style={{ display: "none" }}
        />

        {/* Label Text */}
        <span className="text-dark fw-semibold">{option.label}</span>
      </label>
    );
  })}

</div>
                        </div>
<div className="p-3 bg-gray br-5 mb-4">

  {[
    { id: "user-06", name: "Michael Walker", img: "user-37.jpg" },
    { id: "user-07", name: "Sophie Headrick", img: "user-09.jpg" },
    { id: "user-08", name: "Cameron Drake", img: "user-01.jpg" },
    { id: "user-09", name: "Doris Crowley", img: "user-08.jpg" },
    { id: "user-11", name: "Thomas Bordelon", img: "user-32.jpg" },
  ].map((user) => (
    <label
      key={user.id}
      className={`custom-checkbox mb-3 ${
        formData.selectedUsers?.includes(user.id) ? "checked" : ""
      }`}
    >
      <input
        type="checkbox"
        value={user.id}
        checked={formData.selectedUsers?.includes(user.id)}
        onChange={handleUserSelect}
        hidden
      />

      <div className="checkbox-box">
        {formData.selectedUsers?.includes(user.id) && (
          <span className="checkmark">✓</span>
        )}
      </div>

      <div className="d-flex align-items-center file-name-icon">
        <span className="avatar avatar-md border avatar-rounded">
          <img
            src={`/assets/img/users/${user.img}`}
            className="img-fluid"
            alt="img"
          />
        </span>
        <div className="ms-2">
          <h6 className="fw-normal mb-0">{user.name}</h6>
        </div>
      </div>
    </label>
  ))}

  <div className="d-flex align-items-center justify-content-center mt-3">
    <button type="button" className="btn btn-primary">
      Confirm
    </button>
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

                    </div>
                  )}

      </form>
    </div>

    {/* ================= SINGLE FOOTER ================= */}
    <div className="modal-footer border-top">
      <button
        type="button"
        className="cancel-btn"
        onClick={handleCloseModal}
      >
        Cancel
      </button>

      <button
        type="submit"
        form="companyForm"
        className="create-job-btn"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
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
                    Do you want to delete the company "{companyToDelete?.company_name || companyToDelete?.name}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={confirmDelete}
                >
                  Delete Company
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
}

export default Companies;