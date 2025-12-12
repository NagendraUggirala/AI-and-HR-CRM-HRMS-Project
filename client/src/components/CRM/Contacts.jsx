import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const Contacts = () => {
  const initialContacts = [
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
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
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [sortBy, setSortBy] = useState('last7Days');

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

  // Sort contacts whenever sortBy changes
  useEffect(() => {
    const sortedContacts = [...initialContacts];
    
    switch(sortBy) {
      case 'recentlyAdded':
        // Sort by ID descending (newest first)
        sortedContacts.sort((a, b) => b.id - a.id);
        break;
      case 'ascending':
        // Sort by name ascending
        sortedContacts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'descending':
        // Sort by name descending
        sortedContacts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'lastMonth':
        // For demo, sort by date descending
        sortedContacts.sort((a, b) => {
          const dateA = new Date(a.dateOfBirth.split('-').reverse().join('-'));
          const dateB = new Date(b.dateOfBirth.split('-').reverse().join('-'));
          return dateB - dateA;
        });
        break;
      case 'last7Days':
        // For demo, sort by ID descending (newest first)
        sortedContacts.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    
    setContacts(sortedContacts);
  }, [sortBy]);

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Contacts List", 14, 22);
    
    // Add current date
    doc.setFontSize(10);
    const date = new Date().toLocaleDateString();
    doc.text(`Generated on: ${date}`, 14, 30);
    
    // Prepare table data
    const tableColumn = ["ID", "Name", "Role", "Phone", "Email", "Company", "Location"];
    const tableRows = [];
    
    contacts.forEach(contact => {
      const contactData = [
        contact.id,
        `${contact.name} ${contact.lastName}`,
        contact.role,
        contact.phone,
        contact.email,
        contact.company,
        contact.location
      ];
      tableRows.push(contactData);
    });
    
    // Add table to PDF using autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    // Save the PDF
    doc.save(`contacts_${new Date().getTime()}.pdf`);
  };

  // Export to Excel function
  const exportToExcel = () => {
    // Prepare data for Excel
    const worksheetData = contacts.map(contact => ({
      ID: contact.id,
      Name: `${contact.name} ${contact.lastName}`,
      "Job Title": contact.role,
      Phone: contact.phone,
      "Phone 2": contact.phone2,
      Email: contact.email,
      Company: contact.company,
      Location: contact.location,
      Industry: contact.industry,
      Currency: contact.currency,
      Language: contact.language,
      Owner: contact.owner,
      Deals: contact.deals,
      Source: contact.source,
      Tags: contact.tags.join(", "),
      "Date of Birth": contact.dateOfBirth
    }));
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `contacts_${new Date().getTime()}.xlsx`);
  };

  // Handle sort change
  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

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
    setActiveTab('basic');
  };

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      // Remove from both contacts and initialContacts
      const updatedContacts = contacts.filter(c => c.id !== contactToDelete.id);
      const updatedInitialContacts = initialContacts.filter(c => c.id !== contactToDelete.id);
      
      setContacts(updatedContacts);
      // Update the initialContacts array (in real app, this would be in state)
      Object.assign(initialContacts, updatedInitialContacts);
      
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
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      initialContacts.push(newContact); // Add to initial contacts
    } else {
      const updatedContacts = contacts.map(c =>
        c.id === selectedContact.id ? { ...formData, id: selectedContact.id } : c
      );
      setContacts(updatedContacts);
      
      // Update in initialContacts as well
      const index = initialContacts.findIndex(c => c.id === selectedContact.id);
      if (index !== -1) {
        initialContacts[index] = { ...formData, id: selectedContact.id };
      }
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

  // Get current sort text
  const getSortText = () => {
    switch(sortBy) {
      case 'recentlyAdded': return 'Recently Added';
      case 'ascending': return 'Ascending';
      case 'descending': return 'Descending';
      case 'lastMonth': return 'Last Month';
      case 'last7Days': return 'Last 7 Days';
      default: return 'Last 7 Days';
    }
  };

  return (
    <div className="container-fluid" style={{ padding: '20px' }}>
      {/* Add this style tag */}
      <style>
        {`
          .form-check-input:checked {
            background-color: transparent;  /* Remove blue background */
            border-color: #007bff;          /* Optional: border color */
          }

          .form-check-input:checked::after {
            content: '✔';
            color: #007bff;
            font-size: 14px;
          }
          /* Custom checkbox style */
          .custom-checkbox input[type="checkbox"] {
            width: 18px;
            height: 18px;
            -webkit-appearance: none; /* Remove default style */
            -moz-appearance: none;
            appearance: none;
            border: 1px solid #999;
            border-radius: 3px;
            outline: none;
            cursor: pointer;
            position: relative;
          }

          .custom-checkbox input[type="checkbox"]:checked::after {
            content: '✔';        /* Tick mark */
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            color: #007bff;      /* Tick color */
          }

          /* Responsive styles for buttons */
          @media (max-width: 768px) {
            .btn-responsive {
              padding: 8px 16px;
              font-size: 14px;
              min-width: 120px;
            }
            .header-container {
              flex-direction: column;
              align-items: flex-start;
              gap: 15px;
            }
            .header-title {
              width: 100%;
            }
            .header-buttons-container {
              width: 100%;
              margin-top: 10px;
            }
            .header-buttons {
              width: 100%;
              flex-direction: column;
              gap: 10px;
            }
            .header-buttons > div {
              width: 100%;
            }
            .header-buttons .dropdown {
              width: 100%;
            }
            .header-buttons .dropdown > button {
              width: 100%;
              text-align: center;
              justify-content: center;
            }
            .add-contact-btn {
              width: 100%;
            }
            .sort-dropdown {
              width: 100%;
              margin-top: 10px;
            }
            .sort-dropdown > button {
              width: 100%;
            }
          }
          
          @media (min-width: 769px) {
            .header-container {
              flex-direction: row;
              align-items: center;
            }
            .header-title {
              flex: 1;
            }
            .header-buttons-container {
              flex-shrink: 0;
            }
            .header-buttons {
              flex-direction: row;
              gap: 12px;
            }
            .header-buttons > div {
              width: auto;
            }
          }
          
          @media (min-width: 769px) and (max-width: 992px) {
            .header-buttons {
              gap: 10px;
            }
            .btn-responsive {
              padding: 8px 16px;
              font-size: 14px;
            }
          }
          
          @media (max-width: 576px) {
            .modal-dialog {
              margin: 10px;
              max-width: calc(100% - 20px);
            }
            .modal-content {
              padding: 10px;
            }
            .row {
              margin-left: -8px;
              margin-right: -8px;
            }
            .col-md-4, .col-md-6, .col-md-12 {
              padding-left: 8px;
              padding-right: 8px;
            }
            .btn-responsive {
              font-size: 13px;
              padding: 8px 12px;
            }
          }
        `}
      </style>
      
      {/* Header with Title and Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <div className="header-container" style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Title on left side */}
          <div className="header-title">
            <h4>Contacts</h4>
             <p style={{ marginTop: "4px", color: "#555" }}>
    Manage all your contact information here.
  </p>
          </div>
          
          {/* Export and Add Contact Buttons - On RIGHT side for desktop, below for mobile */}
          <div className="header-buttons-container">
            <div className="header-buttons" style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {/* Export Dropdown */}
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center justify-content-center dropdown-toggle btn-responsive"
                  data-bs-toggle="dropdown"
                  style={{
                    padding: '8px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0056b3';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#007bff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-box-arrow-up me-2"></i>Export
                </button>

                <ul className="dropdown-menu dropdown-menu-end p-3" style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  border: '1px solid #e0e0e0',
                  minWidth: '200px'
                }}>
                  <li>
                    <a 
                      href="#" 
                      className="dropdown-item rounded-1 d-flex align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        exportToPDF();
                      }}
                      style={{
                        padding: '10px 15px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <i className="ti ti-file-type-pdf me-2" style={{ color: '#dc3545' }}></i>
                      Export as PDF
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="dropdown-item rounded-1 d-flex align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        exportToExcel();
                      }}
                      style={{
                        padding: '10px 15px',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <i className="ti ti-file-type-xls me-2" style={{ color: '#28a745' }}></i>
                      Export as Excel
                    </a>
                  </li>
                </ul>
              </div>

              {/* Add Contact Button */}
              <div>
                <button
                  onClick={handleAddContact}
                  className="btn btn-primary d-flex align-items-center justify-content-center add-contact-btn btn-responsive"
                  style={{
                    padding: '8px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#3B7080',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2c5a68';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3B7080';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-plus-circle me-1"></i> Add Company
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Grid Header Card */}
      <div className="card w-100 mb-4" style={{
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0'
      }}>
        <div className="card-body p-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap" style={{ gap: '15px' }}>
            <h6 style={{
              margin: 0,
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: '#0b0e0f',
              fontWeight: '600'
            }}>
              <i className="ti ti-grid me-2"></i>Contact Grid ({contacts.length})
            </h6>
            <div className="dropdown sort-dropdown">
              <button
                className="btn btn-sm btn-white d-flex align-items-center dropdown-toggle"
                data-bs-toggle="dropdown"
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  minWidth: '180px',
                  border: '1px solid #007bff',
                  color: '#007bff',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#007bff';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#007bff';
                }}
              >
                <i className="ti ti-filter me-2"></i>Sort By: {getSortText()}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3" style={{
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: '1px solid #e0e0e0',
                minWidth: '200px'
              }}>
                <li>
                  <button
                    className="dropdown-item rounded-1 d-flex align-items-center"
                    onClick={() => handleSortChange('recentlyAdded')}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                  >
                    <i className="ti ti-calendar-time me-2"></i>Recently Added
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1 d-flex align-items-center"
                    onClick={() => handleSortChange('ascending')}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                  >
                    <i className="ti ti-sort-ascending me-2"></i>Ascending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1 d-flex align-items-center"
                    onClick={() => handleSortChange('descending')}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                  >
                    <i className="ti ti-sort-descending me-2"></i>Descending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1 d-flex align-items-center"
                    onClick={() => handleSortChange('lastMonth')}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                  >
                    <i className="ti ti-calendar-month me-2"></i>Last Month
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1 d-flex align-items-center"
                    onClick={() => handleSortChange('last7Days')}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                  >
                    <i className="ti ti-calendar-week me-2"></i>Last 7 Days
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    {/* Contacts Grid */}
<div className="row" style={{ margin: '0 -10px' }}>
  {contacts.map((c) => (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={c.id} style={{ padding: '0 10px' }}>
      <div className="card w-100 h-100" style={{
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid #e2e8f0'
      }}>
      <div className="card-body" style={{ padding: '20px' }}>
  {/* Avatar section center lo */}
  <div className="d-flex justify-content-center mb-3">
    <a className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
      <img src={c.img} alt="user" className="img-fluid h-auto w-auto" 
        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
      />
    </a>
  </div>
  
  {/* Checkbox section top-left lo unchuko or remove chey */}
  <div className="position-absolute" style={{ top: '15px', left: '15px' }}>
    <div className="custom-checkbox">
      <input
        type="checkbox"
        checked={selectedContacts.includes(c.id)}
        onChange={() => {
          if (selectedContacts.includes(c.id)) {
            setSelectedContacts(prev => prev.filter(id => id !== c.id));
          } else {
            setSelectedContacts(prev => [...prev, c.id]);
          }
        }}
      />
    </div>
  </div>
  
  {/* Name and Role */}
  <div className="text-center mb-3">
    <h6 className="mb-1" style={{ fontSize: '16px', fontWeight: '600', color: '#1E293B' }}>
      <a href="" style={{ color: '#1E293B', textDecoration: 'none' }}>{c.name} {c.lastName}</a>
    </h6>
    <span className="badge bg-pink-transparent fs-10 fw-medium" style={{ 
      padding: '4px 8px',
      fontSize: '12px',
      backgroundColor: '#fce7f3',
      color: '#be185d'
    }}>
      {c.role}
    </span>
  </div>
  
  {/* Phone and Location */}
  <div className="d-flex flex-column" style={{ gap: '8px' }}>
    <p className="text-dark d-flex align-items-center mb-2" style={{ marginBottom: '8px' }}>
      <i className="ti ti-phone text-gray-5 me-2"></i>
      {c.phone}
    </p>
    <p className="text-dark d-flex align-items-center" style={{ marginBottom: '0' }}>
      <i className="ti ti-map-pin text-gray-5 me-2"></i>
      {c.location}
    </p>
  </div>
  
  {/* Edit and Delete Buttons */}
  <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
    <button 
      className="btn btn-sm btn-light d-flex align-items-center"
      onClick={() => handleEditContact(c)}
      style={{
        padding: '6px 12px',
        fontSize: '13px',
        borderRadius: '4px',
        border: '1px solid #dee2e6',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
        e.currentTarget.style.borderColor = '#007bff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.style.borderColor = '#dee2e6';
      }}
    >
      <i className="ti ti-edit me-1" style={{ fontSize: '14px' }}></i>
      Edit
    </button>
    
    <button 
      className="btn btn-sm btn-outline-danger d-flex align-items-center"
      onClick={() => handleDeleteContact(c)}
      style={{
        padding: '6px 12px',
        fontSize: '13px',
        borderRadius: '4px',
        border: '1px solid #dc3545',
        color: '#dc3545',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#dc3545';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = '#dc3545';
      }}
    >
      <i className="ti ti-trash me-1" style={{ fontSize: '14px' }}></i>
      Delete
    </button>
  </div>
</div>
      </div>
    </div>
  ))}
</div>

      {/* Add/Edit Contact Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1050,
          overflowY: 'auto'
        }}>
          <div className="modal-dialog modal-lg" style={{ 
            maxWidth: '900px',
            margin: '20px auto',
            '@media (max-width: 768px)': {
              margin: '10px'
            }
          }}>
            <div className="modal-content" style={{ 
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <div className="modal-header" style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #dee2e6',
                padding: '20px'
              }}>
                <h5 className="modal-title" style={{ margin: 0 }}>
                  {modalType === 'add' ? 'Add Contact' : 'Edit Contact'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body" style={{ 
                padding: '20px',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}>
                {/* Tab Navigation */}
                <ul className="nav nav-tabs mb-4" style={{
                  borderBottom: '1px solid #dee2e6',
                  flexWrap: 'wrap'
                }}>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                      onClick={() => setActiveTab('basic')}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        '@media (max-width: 768px)': {
                          padding: '8px 12px',
                          fontSize: '13px'
                        }
                      }}
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                      onClick={() => setActiveTab('address')}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        '@media (max-width: 768px)': {
                          padding: '8px 12px',
                          fontSize: '13px'
                        }
                      }}
                    >
                      Address
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'social' ? 'active' : ''}`}
                      onClick={() => setActiveTab('social')}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        '@media (max-width: 768px)': {
                          padding: '8px 12px',
                          fontSize: '13px'
                        }
                      }}
                    >
                      Social Profiles
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
                      onClick={() => setActiveTab('access')}
                      style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        '@media (max-width: 768px)': {
                          padding: '8px 12px',
                          fontSize: '13px'
                        }
                      }}
                    >
                      Access
                    </button>
                  </li>
                </ul>

                {/* Tab Content - Same as before, unchanged */}
                {activeTab === 'basic' && (
                  <div>
                    <div className="col-md-12">
                      <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4" style={{ gap: '15px' }}>
                        <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames" style={{
                          minWidth: '80px',
                          minHeight: '80px'
                        }}>
                          <i className="ti ti-photo text-gray-2 fs-16"></i>
                        </div>
                        <div className="profile-upload" style={{ flex: 1 }}>
                          <div className="mb-2">
                            <h6 className="mb-1" style={{ fontSize: '16px' }}>Upload Profile Image</h6>
                            <p className="fs-12 text-muted" style={{ fontSize: '12px' }}>Image should be below 4 mb</p>
                          </div>
                          <div className="profile-uploader d-flex align-items-center flex-wrap" style={{ gap: '10px' }}>
                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                              Upload
                              <input type="file" className="form-control image-sign" multiple="" />
                            </div>
                            <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Job Title <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Company Name <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          >
                            <option value="">Select Company</option>
                            <option value="BrightWave Innovations">BrightWave Innovations</option>
                            <option value="Design Studio">Design Studio</option>
                            <option value="Tech Solutions">Tech Solutions</option>
                            <option value="HR Solutions">HR Solutions</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Phone Number 2 <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone2"
                            value={formData.phone2}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Fax</label>
                          <input type="text" className="form-control" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Deals <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="deals"
                            value={formData.deals}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
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

                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                          <input
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Ratings <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          >
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Owner <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="owner"
                            value={formData.owner}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
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

                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Industry <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
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
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Currency <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          >
                            <option value="Dollar">Dollar</option>
                            <option value="Euro">Euro</option>
                            <option value="Rupee">Rupee</option>
                            <option value="Pound">Pound</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Language <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-6 mb-3">
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
                                  style={{ padding: '4px' }}
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
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Source <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
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
                    <div className="modal-footer" style={{ 
                      borderTop: '1px solid #dee2e6',
                      paddingTop: '20px',
                      marginTop: '20px'
                    }}>
                      <button
                        type="button"
                        className="btn btn-light me-2"
                        onClick={handleCloseModal}
                        style={{ padding: '8px 20px' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleSave}
                        style={{ padding: '8px 20px' }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'address' && (
                  <div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            style={{ padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input type="text" className="form-control" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <input type="text" className="form-control" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-12 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Postal Code</label>
                          <input type="text" className="form-control" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer" style={{ 
                      borderTop: '1px solid #dee2e6',
                      paddingTop: '20px',
                      marginTop: '20px'
                    }}>
                      <button
                        type="button"
                        className="btn btn-light me-2"
                        onClick={handleCloseModal}
                        style={{ padding: '8px 20px' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleSave}
                        style={{ padding: '8px 20px' }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Facebook</label>
                          <input type="url" className="form-control" placeholder="https://facebook.com/username" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Twitter</label>
                          <input type="url" className="form-control" placeholder="https://twitter.com/username" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">LinkedIn</label>
                          <input type="url" className="form-control" placeholder="https://linkedin.com/in/username" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Instagram</label>
                          <input type="url" className="form-control" placeholder="https://instagram.com/username" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Skype</label>
                          <input type="text" className="form-control" placeholder="skype:username" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Website</label>
                          <input type="url" className="form-control" placeholder="https://website.com" style={{ padding: '8px 12px' }} />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer" style={{ 
                      borderTop: '1px solid #dee2e6',
                      paddingTop: '20px',
                      marginTop: '20px'
                    }}>
                      <button
                        type="button"
                        className="btn btn-light me-2"
                        onClick={handleCloseModal}
                        style={{ padding: '8px 20px' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleSave}
                        style={{ padding: '8px 20px' }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'access' && (
                  <div className="tab-pane fade show active" id="access" role="tabpanel" aria-labelledby="access-tab" tabIndex="0">
                    <div className="modal-body pb-0">
                      <div className="mb-4">
                        <h6 className="fs-14 fw-medium mb-1">Visibility</h6>
                        <div className="d-flex align-items-center flex-wrap" style={{ gap: '15px' }}>
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
                          <input className="form-check-input me-2" type="checkbox" value="" id="user-06" />
                          <div className="d-flex align-items-center file-name-icon">
                            <a href="#" className="avatar avatar-md border avatar-rounded">
                              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="img-fluid" alt="img" />
                            </a>
                            <div className="ms-2">
                              <h6 className="fw-normal"><a href="#">Michael Walker</a></h6>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <input className="form-check-input me-2" type="checkbox" value="" id="user-07" />
                          <div className="d-flex align-items-center file-name-icon">
                            <a href="#" className="avatar avatar-md border avatar-rounded">
                              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="img-fluid" alt="img" />
                            </a>
                            <div className="ms-2">
                              <h6 className="fw-normal"><a href="#">Sophie Headrick</a></h6>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <input className="form-check-input me-2" type="checkbox" value="" id="user-08" />
                          <div className="d-flex align-items-center file-name-icon">
                            <a href="#" className="avatar avatar-md border avatar-rounded">
                              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="img-fluid" alt="img" />
                            </a>
                            <div className="ms-2">
                              <h6 className="fw-normal"><a href="#">Cameron Drake</a></h6>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <input className="form-check-input me-2" type="checkbox" value="" id="user-09" />
                          <div className="d-flex align-items-center file-name-icon">
                            <a href="#" className="avatar avatar-md border avatar-rounded">
                              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="img-fluid" alt="img" />
                            </a>
                            <div className="ms-2">
                              <h6 className="fw-normal"><a href="#">Doris Crowley</a></h6>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <input className="form-check-input me-2" type="checkbox" value="" id="user-11" />
                          <div className="d-flex align-items-center file-name-icon">
                            <a href="#" className="avatar avatar-md border avatar-rounded">
                              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="img-fluid" alt="img" />
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
                          style={{ padding: '8px 12px' }}
                        >
                          <option value="">Select</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer" style={{ 
                      borderTop: '1px solid #dee2e6',
                      paddingTop: '20px',
                      marginTop: '20px'
                    }}>
                      <button
                        type="button"
                        className="btn btn-light me-2"
                        onClick={handleCloseModal}
                        style={{ padding: '8px 20px' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleSave}
                        style={{ padding: '8px 20px' }}
                      >
                        Save
                      </button>
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
        <div className="modal show d-block" style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1050
        }}>
          <div className="modal-dialog modal-sm" style={{ 
            margin: 'auto',
            maxWidth: '400px'
          }}>
            <div className="modal-content" style={{ 
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <div className="modal-header" style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #dee2e6',
                padding: '20px'
              }}>
                <h5 className="modal-title" style={{ margin: 0 }}>Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ padding: '20px' }}>
                <div className="text-center">
                  <i className="ti ti-alert-triangle text-warning fs-1 mb-3"></i>
                  <h5>Are you sure?</h5>
                  <p className="text-muted">
                    Do you want to delete the contact "{contactToDelete?.name}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="modal-footer" style={{ 
                borderTop: '1px solid #dee2e6',
                padding: '20px'
              }}>
                <button
                  type="button"
                  className="btn btn-secondary m-2"
                  onClick={() => setShowDeleteModal(false)}
                  style={{ padding: '8px 20px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  style={{ padding: '8px 20px' }}
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