import React, { useState, useEffect } from 'react';

function Companies() {
  const initialCompanies = [
    {
      name: 'Brightwave Innovations',
      email: 'clara@example.com',
      phone: '(563) 245 3156',
      location: 'Germany',
      rating: 4.5,
      icon: 'bi-lightning-charge',
      iconColor: '#007bff',
      iconBg: '#E3F2FD',
      cardBg: '#FFFFFF',
    },
    {
      name: 'Stellar Dynamics',
      email: 'sharon@example.com',
      phone: '(148) 126 6495',
      location: 'USA',
      rating: 4.5,
      icon: 'bi-stars',
      iconColor: '#FF6B35',
      iconBg: '#FFF3E0',
      cardBg: '#FFFFFF',
    },
    {
      name: 'Quantum Nexus',
      email: 'rayuhan@example.com',
      phone: '(248) 136 6495',
      location: 'India',
      rating: 4.3,
      icon: 'bi-cpu',
      iconColor: '#28A745',
      iconBg: '#E8F5E9',
      cardBg: '#FFFFFF',
    },
    {
      name: 'EcoVision Enterprises',
      email: 'jessica@example.com',
      phone: '(563) 245 3156',
      location: 'Canada',
      rating: 4.5,
      icon: 'bi-tree',
      iconColor: '#20C997',
      iconBg: '#E6FCF5',
      cardBg: '#FFFFFF',
    },
    {
      name: 'Aurora Technologies',
      email: 'clara@example.com',
      phone: '(563) 245 3156',
      location: 'Germany',
      rating: 4.5,
      icon: 'bi-sun',
      iconColor: '#FFC107',
      iconBg: '#FFF9C4',
      cardBg: '#FFFFFF',
    },
    {
      name: 'BluSky Ventures',
      email: 'diana@example.com',
      phone: '(563) 245 3156',
      location: 'Japan',
      rating: 4.5,
      icon: 'bi-cloud',
      iconColor: '#17A2B8',
      iconBg: '#E3F2F9',
      cardBg: '#FFFFFF',
    },
    {
      name: 'TerraFusion Energy',
      email: 'rakesh@example.com',
      phone: '(563) 245 3156',
      location: 'Indonesia',
      rating: 4.5,
      icon: 'bi-lightbulb',
      iconColor: '#FD7E14',
      iconBg: '#FFE8D6',
      cardBg: '#FFFFFF',
    },
    {
      name: 'UrbanPulse Design',
      email: 'jonella@example.com',
      phone: '(563) 245 3156',
      location: 'USA',
      rating: 4.4,
      icon: 'bi-building',
      iconColor: '#6F42C1',
      iconBg: '#F3E8FF',
      cardBg: '#FFFFFF',
    },
    {
      name: 'Nimbus Networks',
      email: 'jonathan@example.com',
      phone: '(763) 2946 125',
      location: 'Israel',
      rating: 4.1,
      icon: 'bi-wifi',
      iconColor: '#DC3545',
      iconBg: '#FFE6E6',
      cardBg: '#FFFFFF',
    },
    {
      name: 'Epicurean Delights',
      email: 'patrick@example.com',
      phone: '(123) 345 9776',
      location: 'Colombia',
      rating: 4.2,
      icon: 'bi-egg-fried',
      iconColor: '#E83E8C',
      iconBg: '#FFEAF3',
      cardBg: '#FFFFFF',
    },
    {
      name: 'Hermann Groups',
      email: 'patrick@example.com',
      phone: '(123) 345 9776',
      location: 'Colombia',
      rating: 4.1,
      icon: 'bi-people',
      iconColor: '#3B7080',
      iconBg: '#E8F4FD',
      cardBg: '#FFFFFF',
    },
    {
      name: 'Beacon Softwares',
      email: 'gloria@example.com',
      phone: '(153) 789 6248',
      location: 'Brazil',
      rating: 4.6,
      icon: 'bi-broadcast',
      iconColor: '#6610F2',
      iconBg: '#EDE7F6',
      cardBg: '#FFFFFF',
    },
  ];

  const [displayedCompanies, setDisplayedCompanies] = useState(initialCompanies);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    fax: '',
    website: '',
    ratings: '4.0',
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
    status: 'Active'
  });

  // Available icons and colors for new companies
  const availableIcons = [
    { icon: 'bi-building', color: '#3B7080', bg: '#E8F4FD' },
    { icon: 'bi-briefcase', color: '#007bff', bg: '#E3F2FD' },
    { icon: 'bi-shop', color: '#28A745', bg: '#E8F5E9' },
    { icon: 'bi-gear', color: '#6F42C1', bg: '#F3E8FF' },
    { icon: 'bi-graph-up', color: '#20C997', bg: '#E6FCF5' },
    { icon: 'bi-cart', color: '#FD7E14', bg: '#FFE8D6' },
    { icon: 'bi-phone', color: '#17A2B8', bg: '#E3F2F9' },
    { icon: 'bi-laptop', color: '#FFC107', bg: '#FFF9C4' },
    { icon: 'bi-globe', color: '#DC3545', bg: '#FFE6E6' },
    { icon: 'bi-people', color: '#E83E8C', bg: '#FFEAF3' },
    { icon: 'bi-lightning-charge', color: '#007bff', bg: '#E3F2FD' },
    { icon: 'bi-stars', color: '#FF6B35', bg: '#FFF3E0' },
    { icon: 'bi-cpu', color: '#28A745', bg: '#E8F5E9' },
    { icon: 'bi-tree', color: '#20C997', bg: '#E6FCF5' },
    { icon: 'bi-sun', color: '#FFC107', bg: '#FFF9C4' },
    { icon: 'bi-cloud', color: '#17A2B8', bg: '#E3F2F9' },
    { icon: 'bi-lightbulb', color: '#FD7E14', bg: '#FFE8D6' },
    { icon: 'bi-wifi', color: '#DC3545', bg: '#FFE6E6' },
    { icon: 'bi-egg-fried', color: '#E83E8C', bg: '#FFEAF3' },
    { icon: 'bi-broadcast', color: '#6610F2', bg: '#EDE7F6' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate random icon for new company
    const randomIcon = availableIcons[Math.floor(Math.random() * availableIcons.length)];
    
    // Create new company object
    const newCompany = {
      name: formData.companyName,
      email: formData.email,
      phone: formData.phoneNumber,
      location: formData.country || 'Unknown',
      rating: parseFloat(formData.ratings) || 4.0,
      icon: randomIcon.icon,
      iconColor: randomIcon.color,
      iconBg: randomIcon.bg,
      cardBg: '#FFFFFF',
    };
    
    // Add new company to the list
    const updatedCompanies = [...displayedCompanies, newCompany];
    setDisplayedCompanies(updatedCompanies);
    
    console.log('New company added:', newCompany);
    
    // Reset form and close modal
    setFormData({
      companyName: '',
      email: '',
      phoneNumber: '',
      phoneNumber2: '',
      fax: '',
      website: '',
      ratings: '4.0',
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
      status: 'Active'
    });
    
    setShowModal(false);
    setActiveTab('basic-info');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveTab('basic-info');
    
    // Reset form data
    setFormData({
      companyName: '',
      email: '',
      phoneNumber: '',
      phoneNumber2: '',
      fax: '',
      website: '',
      ratings: '4.0',
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
      status: 'Active'
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Fixed PDF Export Function
  const handleExportPDF = () => {
    try {
      // Check if jsPDF is available globally
      if (typeof window.jspdf === 'undefined') {
        // If not available, load it dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
          generatePDF();
        };
        script.onerror = () => {
          alert('Failed to load PDF library. Please check your internet connection.');
        };
        document.head.appendChild(script);
      } else {
        generatePDF();
      }
    } catch (error) {
      console.error("Error initializing PDF export:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const generatePDF = () => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      // Title
      doc.setFontSize(20);
      doc.setTextColor(59, 112, 128);
      doc.text("Companies List", 20, 20);
      
      // Current date
      const currentDate = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${currentDate}`, 20, 30);
      
      // Simple table implementation
      let yPosition = 40;
      const lineHeight = 8;
      const columnWidths = [10, 50, 60, 35, 25, 15]; // Adjusted widths
      
      // Headers
      const headers = ["#", "Company Name", "Email", "Phone", "Location", "Rating"];
      
      // Header background
      doc.setFillColor(59, 112, 128);
      doc.rect(20, yPosition - 5, columnWidths.reduce((a, b) => a + b, 0), 8, 'F');
      
      // Header text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      
      let xPosition = 20;
      headers.forEach((header, index) => {
        doc.text(header, xPosition + 2, yPosition);
        xPosition += columnWidths[index];
      });
      
      yPosition += lineHeight + 2;
      
      // Data rows
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(9);
      
      displayedCompanies.forEach((company, index) => {
        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Alternate row background
        if (index % 2 === 0) {
          doc.setFillColor(240, 240, 240);
          doc.rect(20, yPosition - 5, columnWidths.reduce((a, b) => a + b, 0), 8, 'F');
        } else {
          doc.setFillColor(255, 255, 255);
          doc.rect(20, yPosition - 5, columnWidths.reduce((a, b) => a + b, 0), 8, 'F');
        }
        
        const rowData = [
          (index + 1).toString(),
          company.name || "N/A",
          company.email || "N/A",
          company.phone || "N/A",
          company.location || "N/A",
          company.rating?.toString() || "N/A"
        ];
        
        xPosition = 20;
        rowData.forEach((cell, cellIndex) => {
          // Truncate text if too long
          let displayText = cell;
          if (cellIndex === 1 && cell.length > 25) {
            displayText = cell.substring(0, 22) + '...';
          } else if (cellIndex === 2 && cell.length > 25) {
            displayText = cell.substring(0, 22) + '...';
          }
          
          doc.text(displayText, xPosition + 2, yPosition);
          xPosition += columnWidths[cellIndex];
        });
        
        yPosition += lineHeight;
      });
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Total Companies: ${displayedCompanies.length}`, 
        20, 
        yPosition + 10
      );
      
      // Save the PDF
      doc.save("companies-list.pdf");
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const handleExportEXCEL = () => {
    try {
      // Prepare CSV content
      const headers = [
        'Company Name',
        'Email',
        'Phone',
        'Location',
        'Rating'
      ];
      
      // Create CSV rows
      const csvRows = [
        headers.join(','),
        ...displayedCompanies.map(company => {
          return [
            `"${company.name || ''}"`,
            `"${company.email || ''}"`,
            `"${company.phone || ''}"`,
            `"${company.location || ''}"`,
            company.rating || ''
          ].join(',');
        })
      ];
      
      // Convert to CSV string
      const csvString = csvRows.join('\n');
      
      // Create Blob and download
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'companies.csv');
      link.style.display = 'none';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating Excel:', error);
      alert('Error generating Excel file. Please try again.');
    }
  };

  const handleSortChange = (e) => {
    const selectedLocation = e.target.value;

    if (selectedLocation === 'Sort by') {
      setDisplayedCompanies(initialCompanies);
    } else {
      const filtered = initialCompanies.filter(c => c.location === selectedLocation);
      setDisplayedCompanies(filtered);
    }
  };

  return (
    <div style={{ 
      padding: '25px',
      paddingTop: '15px',
      '@media (max-width: 768px)': {
        padding: '15px',
        paddingTop: '10px'
      }
    }}>
      
      {/* Main Header with Gap from Top */}
      <div className="d-flex justify-content-between align-items-center mb-4" style={{ 
        marginTop: '10px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
      <div>
  <h4>Companies</h4>
  <p style={{ marginTop: "4px", color: "#555" }}>
    View and manage all company records.
  </p>
</div>

        
        <div className="d-flex gap-2" style={{
          flexWrap: 'wrap'
        }}>
          <div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <div className="me-2 mb-2">
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      backgroundColor: '#007bff',
                      borderColor: '#007bff',
                      padding: '8px 16px',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <i className="bi bi-box-arrow-up me-2"></i>Export
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        onClick={handleExportPDF}
                        className="dropdown-item"
                        type="button"
                      >
                        <i className="bi bi-file-earmark-pdf me-2"></i>Export as PDF
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleExportEXCEL}
                        className="dropdown-item"
                        type="button"
                      >
                        <i className="bi bi-file-earmark-excel me-2"></i>Export as Excel
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#3B7080', 
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle me-1"></i> Add Company
          </button>
        </div>
      </div>

      {/* Filter Card */}
      <div className="card w-100 p-3 mb-4" style={{ 
        borderRadius: '10px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginTop: '10px'
      }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap" style={{ gap: '10px' }}>
          <h6 className="fs-6 mb-0" style={{
            color: '#0b0e0fff',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)'
          }}>
            <b><i className="bi bi-grid-3x3 me-2"></i>Companies Grid ({displayedCompanies.length})</b>
          </h6>
          <select 
            onChange={handleSortChange}
            style={{
              padding: '6px 12px',
              backgroundColor: '#007bff', 
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              minWidth: '120px'
            }}
          >
            <option style={{color: 'black'}}><i className="bi bi-filter me-1"></i>Sort by</option>
            {[...new Set(initialCompanies.map((crm) => crm.location))].map((location, index) => (
              <option key={index} value={location} style={{color: 'black'}}>
                <i className="bi bi-geo-alt me-1"></i>{location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Companies Grid */}
      <div style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f8',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '10px',
        '@media (max-width: 768px)': {
          padding: '15px'
        }
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
          },
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))',
            gap: '15px'
          }
        }}>
          {displayedCompanies.map((company, index) => (
            <div 
              key={index} 
              style={{
                backgroundColor: company.cardBg || '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '@media (max-width: 768px)': {
                  padding: '15px'
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ 
                fontSize: '14px', 
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{
                       width: '60px', 
                       height: '60px', 
                       flexShrink: 0,
                       backgroundColor: company.iconBg || '#E8F4FD',
                       color: company.iconColor || '#3B7080',
                       transition: 'transform 0.3s ease',
                       '@media (max-width: 768px)': {
                         width: '50px',
                         height: '50px'
                       }
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'scale(1.1)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'scale(1)';
                     }}>
                  <i className={`bi ${company.icon || 'bi-building'} fs-4`}></i>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h5 style={{
                    color: '#1E293B', 
                    marginBottom: '10px',
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                    wordBreak: 'break-word'
                  }}><b>{company.name}</b></h5>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gap: '8px',
                fontSize: '14px'
              }}>
                <p style={{
                  color: '#64748B', 
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <strong style={{ 
                    minWidth: '60px',
                    whiteSpace: 'nowrap'
                  }}>
                    <i className="bi bi-envelope me-1" style={{color: company.iconColor || '#3B7080'}}></i>Email:
                  </strong> 
                  <span style={{ 
                    wordBreak: 'break-word',
                    flex: 1
                  }}>{company.email}</span>
                </p>
                <p style={{
                  color: '#64748B', 
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <strong style={{ 
                    minWidth: '60px',
                    whiteSpace: 'nowrap'
                  }}>
                    <i className="bi bi-telephone me-1" style={{color: company.iconColor || '#3B7080'}}></i>Phone:
                  </strong> 
                  <span style={{ 
                    wordBreak: 'break-word',
                    flex: 1
                  }}>{company.phone}</span>
                </p>
                <p style={{
                  color: '#64748B', 
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <strong style={{ 
                    minWidth: '60px',
                    whiteSpace: 'nowrap'
                  }}>
                    <i className="bi bi-geo-alt me-1" style={{color: company.iconColor || '#3B7080'}}></i>Location:
                  </strong> 
                  <span style={{ 
                    wordBreak: 'break-word',
                    flex: 1
                  }}>{company.location}</span>
                </p>
                <p style={{
                  color: '#64748B', 
                  marginBottom: '0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <strong style={{ 
                    minWidth: '60px',
                    whiteSpace: 'nowrap'
                  }}>
                    <i className="bi bi-star me-1" style={{color: '#F59E0B'}}></i>Rating:
                  </strong> 
                  <span style={{
                    color: company.iconColor || '#3B7080', 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}> ⭐ {company.rating || 'N/A'}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="d-flex justify-content-center align-items-center" style={{ 
          height: "70px", 
          marginTop: '20px' 
        }}>
          <button 
            className="btn btn-sm" 
            style={{
              backgroundColor: '#007bff', 
              color: 'white',
              padding: '8px 20px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '14px'
            }}
            onClick={() => {
              setDisplayedCompanies(initialCompanies);
            }}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>Load More
          </button>
        </div>
      </div>

      {/* Add Company Modal */}
      {showModal && (
        <>
          <div 
            className="modal-backdrop fade show"
            style={{
              opacity: 0.5, 
              backgroundColor: '#000',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1040
            }}
            onClick={handleBackdropClick}
          ></div>
          
          <div
            className="modal fade show"
            id="addCompanyModal"
            tabIndex="-1"
            aria-labelledby="addCompanyModalLabel"
            aria-hidden="false"
            style={{ 
              display: 'block', 
              position: 'fixed', 
              top: '0', 
              left: '0', 
              zIndex: 1050,
              width: '100%',
              height: '100%',
              padding: '20px',
              overflowY: 'auto',
              '@media (max-width: 768px)': {
                padding: '10px'
              }
            }}
            onClick={handleBackdropClick}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg" style={{ 
              margin: '0 auto',
              maxWidth: '900px',
              width: '100%',
              '@media (max-width: 768px)': {
                maxWidth: '100%',
                margin: '0'
              }
            }}>
              <div className="modal-content" style={{ 
                maxHeight: '90vh',
                borderRadius: '10px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                marginTop: '20px',
                '@media (max-width: 768px)': {
                  maxHeight: '95vh',
                  marginTop: '10px',
                  borderRadius: '8px'
                }
              }}>
                <div className="modal-header" style={{
                  backgroundColor: '#3B7080', 
                  color: 'white',
                  padding: '15px 20px',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  '@media (max-width: 768px)': {
                    padding: '12px 15px'
                  }
                }}>
                  <h4 className="modal-title mb-0" style={{
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                  }}>Add New Company</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                    style={{
                      filter: 'invert(1)',
                      padding: '4px',
                      fontSize: '16px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      opacity: '0.8',
                      '@media (max-width: 768px)': {
                        fontSize: '14px',
                        padding: '3px'
                      }
                    }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="contact-grids-tab" style={{ 
                    padding: '0 20px',
                    '@media (max-width: 768px)': {
                      padding: '0 15px'
                    }
                  }}>
                    <ul className="nav nav-underline" id="myTab" role="tablist" style={{
                      padding: '10px 0',
                      fontSize: '14px',
                      flexWrap: 'wrap',
                      gap: '5px',
                      '@media (max-width: 768px)': {
                        fontSize: '12px',
                        padding: '8px 0'
                      }
                    }}>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
                          id="info-tab"
                          type="button"
                          role="tab"
                          onClick={() => setActiveTab('basic-info')}
                          style={{
                            padding: '8px 12px',
                            fontSize: '14px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            '@media (max-width: 768px)': {
                              padding: '6px 10px',
                              fontSize: '12px'
                            }
                          }}
                        >
                          <i className="bi bi-info-circle me-1"></i>Basic Info
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                          id="address-tab"
                          type="button"
                          role="tab"
                          onClick={() => setActiveTab('address')}
                          style={{
                            padding: '8px 12px',
                            fontSize: '14px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            '@media (max-width: 768px)': {
                              padding: '6px 10px',
                              fontSize: '12px'
                            }
                          }}
                        >
                          <i className="bi bi-geo-alt me-1"></i>Address
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'social-profile' ? 'active' : ''}`}
                          id="social-profile-tab"
                          type="button"
                          role="tab"
                          onClick={() => setActiveTab('social-profile')}
                          style={{
                            padding: '8px 12px',
                            fontSize: '14px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            '@media (max-width: 768px)': {
                              padding: '6px 10px',
                              fontSize: '12px'
                            }
                          }}
                        >
                          <i className="bi bi-share me-1"></i>Social
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
                          id="access-tab"
                          type="button"
                          role="tab"
                          onClick={() => setActiveTab('access')}
                          style={{
                            padding: '8px 12px',
                            fontSize: '14px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            '@media (max-width: 768px)': {
                              padding: '6px 10px',
                              fontSize: '12px'
                            }
                          }}
                        >
                          <i className="bi bi-shield me-1"></i>Access
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="myTabContent" style={{
                    padding: '15px 20px',
                    maxHeight: 'calc(90vh - 180px)',
                    overflowY: 'auto',
                    '@media (max-width: 768px)': {
                      padding: '12px 15px',
                      maxHeight: 'calc(95vh - 160px)'
                    }
                  }}>
                    {activeTab === 'basic-info' && (
                      <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                        <div className="modal-body pb-0" style={{padding: '0'}}>
                          <div className="row">
                            <div className="col-12 mb-3">
                              <div className="d-flex align-items-center flex-wrap bg-light w-100 rounded p-3" style={{
                                gap: '15px'
                              }}>
                                <div className="d-flex align-items-center justify-content-center avatar avatar-lg rounded-circle border border-dashed me-3 flex-shrink-0 text-dark frames" style={{
                                  minWidth: '60px',
                                  minHeight: '60px',
                                  '@media (max-width: 768px)': {
                                    minWidth: '50px',
                                    minHeight: '50px'
                                  }
                                }}>
                                  <i className="bi bi-image text-gray-2 fs-4"></i>
                                </div>
                                <div className="profile-upload flex-grow-1">
                                  <div className="mb-2">
                                    <h6 className="mb-1 fs-14" style={{
                                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                                    }}>Upload Company Logo</h6>
                                    <p className="fs-12 text-muted" style={{
                                      fontSize: '12px',
                                      '@media (max-width: 768px)': {
                                        fontSize: '11px'
                                      }
                                    }}>Max 4MB, 500x500px recommended</p>
                                  </div>
                                  <div className="profile-uploader d-flex align-items-center flex-wrap" style={{
                                    gap: '10px'
                                  }}>
                                    <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                      <i className="bi bi-upload me-1"></i>Browse
                                      <input type="file" className="form-control image-sign" multiple="" />
                                    </div>
                                    <button type="button" className="btn btn-sm btn-light">
                                      <i className="bi bi-trash me-1"></i>Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-building me-1"></i>Company Name <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="companyName"
                                  value={formData.companyName}
                                  onChange={handleInputChange}
                                  required
                                  placeholder="Enter company name"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-envelope me-1"></i>Email Address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="company@example.com"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-telephone me-1"></i>Primary Phone <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="phoneNumber"
                                  value={formData.phoneNumber}
                                  onChange={handleInputChange}
                                  required
                                  placeholder="(123) 456-7890"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-globe me-1"></i>Website URL
                                </label>
                                <input
                                  type="url"
                                  className="form-control"
                                  name="website"
                                  value={formData.website}
                                  onChange={handleInputChange}
                                  placeholder="https://example.com"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-briefcase me-1"></i>Industry <span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select"
                                  name="industry"
                                  value={formData.industry}
                                  onChange={handleInputChange}
                                  required
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="">Select Industry</option>
                                  <option value="Technology">Technology</option>
                                  <option value="Retail Industry">Retail Industry</option>
                                  <option value="Banking">Banking & Finance</option>
                                  <option value="Hotels">Hospitality</option>
                                  <option value="Healthcare">Healthcare</option>
                                  <option value="Manufacturing">Manufacturing</option>
                                  <option value="Education">Education</option>
                                  <option value="Real Estate">Real Estate</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-star me-1"></i>Rating
                                </label>
                                <select
                                  className="form-select"
                                  name="ratings"
                                  value={formData.ratings}
                                  onChange={handleInputChange}
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="5.0">★★★★★ (5.0)</option>
                                  <option value="4.5">★★★★☆ (4.5)</option>
                                  <option value="4.0">★★★★☆ (4.0)</option>
                                  <option value="3.5">★★★☆☆ (3.5)</option>
                                  <option value="3.0">★★★☆☆ (3.0)</option>
                                  <option value="2.5">★★☆☆☆ (2.5)</option>
                                  <option value="2.0">★★☆☆☆ (2.0)</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-geo me-1"></i>Country
                                </label>
                                <select
                                  className="form-select"
                                  name="country"
                                  value={formData.country}
                                  onChange={handleInputChange}
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="">Select Country</option>
                                  <option value="USA">USA</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Germany">Germany</option>
                                  <option value="India">India</option>
                                  <option value="UK">United Kingdom</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Brazil">Brazil</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>Lead Source</label>
                                <select
                                  className="form-select"
                                  name="source"
                                  value={formData.source}
                                  onChange={handleInputChange}
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="">Select Source</option>
                                  <option value="Phone Calls">Phone Calls</option>
                                  <option value="Social Media">Social Media</option>
                                  <option value="Referral">Referral</option>
                                  <option value="Website">Website</option>
                                  <option value="Email Campaign">Email Campaign</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="col-12">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-card-text me-1"></i>Company Description
                                </label>
                                <textarea
                                  className="form-control"
                                  name="about"
                                  value={formData.about}
                                  onChange={handleInputChange}
                                  rows="3"
                                  placeholder="Brief description about the company..."
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer" style={{ 
                          padding: '15px 0 0 0', 
                          borderTop: '1px solid #e0e0e0' 
                        }}>
                          <button
                            type="button"
                            className="btn btn-light btn-sm me-2"
                            onClick={handleCloseModal}
                            style={{
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-x-lg me-1"></i>Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#3B7080', 
                              color: 'white',
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-check-lg me-1"></i>Save Company
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'address' && (
                      <div className="tab-pane fade show active" id="address" role="tabpanel" aria-labelledby="address-tab" tabIndex="0">
                        <div className="modal-body pb-0" style={{padding: '0'}}>
                          <div className="row">
                            <div className="col-12">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-geo me-1"></i>Address
                                </label>
                                <textarea
                                  className="form-control"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleInputChange}
                                  rows="2"
                                  placeholder="Full street address"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                ></textarea>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>Country</label>
                                <select
                                  className="form-select"
                                  name="country"
                                  value={formData.country}
                                  onChange={handleInputChange}
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="">Select Country</option>
                                  <option value="USA">USA</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Germany">Germany</option>
                                  <option value="India">India</option>
                                  <option value="UK">United Kingdom</option>
                                  <option value="Japan">Japan</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>State</label>
                                <select
                                  className="form-select"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="">Select State</option>
                                  <option value="California">California</option>
                                  <option value="New York">New York</option>
                                  <option value="Texas">Texas</option>
                                  <option value="Florida">Florida</option>
                                  <option value="Illinois">Illinois</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>City</label>
                                <select
                                  className="form-select"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="">Select City</option>
                                  <option value="Los Angeles">Los Angeles</option>
                                  <option value="New York City">New York City</option>
                                  <option value="Chicago">Chicago</option>
                                  <option value="Houston">Houston</option>
                                  <option value="Phoenix">Phoenix</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>Zip Code</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="zipcode"
                                  value={formData.zipcode}
                                  onChange={handleInputChange}
                                  placeholder="e.g., 90210"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer" style={{ 
                          padding: '15px 0 0 0', 
                          borderTop: '1px solid #e0e0e0' 
                        }}>
                          <button
                            type="button"
                            className="btn btn-light btn-sm me-2"
                            onClick={handleCloseModal}
                            style={{
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-x-lg me-1"></i>Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#3B7080', 
                              color: 'white',
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-check-lg me-1"></i>Save Company
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'social-profile' && (
                      <div className="tab-pane fade show active" id="social-profile" role="tabpanel" aria-labelledby="social-profile-tab" tabIndex="0">
                        <div className="modal-body pb-0" style={{padding: '0'}}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-facebook me-1" style={{color: '#1877F2'}}></i>Facebook
                                </label>
                                <input
                                  type="url"
                                  className="form-control"
                                  name="facebook"
                                  value={formData.facebook}
                                  onChange={handleInputChange}
                                  placeholder="https://facebook.com/company"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-twitter me-1" style={{color: '#1DA1F2'}}></i>Twitter
                                </label>
                                <input
                                  type="url"
                                  className="form-control"
                                  name="twitter"
                                  value={formData.twitter}
                                  onChange={handleInputChange}
                                  placeholder="https://twitter.com/company"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-linkedin me-1" style={{color: '#0077B5'}}></i>LinkedIn
                                </label>
                                <input
                                  type="url"
                                  className="form-control"
                                  name="linkedin"
                                  value={formData.linkedin}
                                  onChange={handleInputChange}
                                  placeholder="https://linkedin.com/company"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>
                                  <i className="bi bi-instagram me-1" style={{color: '#E4405F'}}></i>Instagram
                                </label>
                                <input
                                  type="url"
                                  className="form-control"
                                  name="instagram"
                                  value={formData.instagram}
                                  onChange={handleInputChange}
                                  placeholder="https://instagram.com/company"
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer" style={{ 
                          padding: '15px 0 0 0', 
                          borderTop: '1px solid #e0e0e0' 
                        }}>
                          <button
                            type="button"
                            className="btn btn-light btn-sm me-2"
                            onClick={handleCloseModal}
                            style={{
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-x-lg me-1"></i>Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#3B7080', 
                              color: 'white',
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-check-lg me-1"></i>Save Company
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'access' && (
                      <div className="tab-pane fade show active" id="access" role="tabpanel" aria-labelledby="access-tab" tabIndex="0">
                        <div className="modal-body pb-0" style={{padding: '0'}}>
                          <div className="row">
                            <div className="col-12">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>Visibility</label>
                                <div className="d-flex flex-wrap gap-3">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="visibility"
                                      id="publicRadio"
                                      value="public"
                                      checked={formData.visibility === 'public'}
                                      onChange={handleInputChange}
                                      style={{
                                        width: '16px',
                                        height: '16px'
                                      }}
                                    />
                                    <label className="form-check-label fs-13" htmlFor="publicRadio" style={{
                                      fontSize: '14px',
                                      '@media (max-width: 768px)': {
                                        fontSize: '13px'
                                      }
                                    }}>
                                      <i className="bi bi-globe me-1"></i>Public
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="visibility"
                                      id="privateRadio"
                                      value="private"
                                      checked={formData.visibility === 'private'}
                                      onChange={handleInputChange}
                                      style={{
                                        width: '16px',
                                        height: '16px'
                                      }}
                                    />
                                    <label className="form-check-label fs-13" htmlFor="privateRadio" style={{
                                      fontSize: '14px',
                                      '@media (max-width: 768px)': {
                                        fontSize: '13px'
                                      }
                                    }}>
                                      <i className="bi bi-lock me-1"></i>Private
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-12">
                              <div className="mb-3">
                                <label className="form-label fs-13" style={{
                                  fontSize: '14px',
                                  '@media (max-width: 768px)': {
                                    fontSize: '13px'
                                  }
                                }}>Status</label>
                                <select
                                  className="form-select"
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  style={{
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    '@media (max-width: 768px)': {
                                      fontSize: '13px',
                                      padding: '6px 10px'
                                    }
                                  }}
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Suspended">Suspended</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer" style={{ 
                          padding: '15px 0 0 0', 
                          borderTop: '1px solid #e0e0e0' 
                        }}>
                          <button
                            type="button"
                            className="btn btn-light btn-sm me-2"
                            onClick={handleCloseModal}
                            style={{
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-x-lg me-1"></i>Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#3B7080', 
                              color: 'white',
                              padding: '6px 12px',
                              fontSize: '14px',
                              '@media (max-width: 768px)': {
                                padding: '5px 10px',
                                fontSize: '13px'
                              }
                            }}
                          >
                            <i className="bi bi-check-lg me-1"></i>Save Company
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Companies;