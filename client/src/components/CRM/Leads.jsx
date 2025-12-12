import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Leads = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [activeCompanyTab, setActiveCompanyTab] = useState('basic-info');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 7 Days'); // State for time range filter

  // Sample leads data for export
  const leadsData = [
    {
      name: 'Linda White',
      company: 'BrightWave Innovations',
      email: 'linda@gmail.com',
      phone: '(193) 7839 748',
      location: 'Austin, United States',
      value: '₹03,50,000',
      status: 'Contacted'
    },
    {
      name: 'Chris Johnson',
      company: 'Stellar Dynamics',
      email: 'chris@gmail.com',
      phone: '(162) 8920 713',
      location: 'Atlanta, United States',
      value: '₹3,50,000',
      status: 'Contacted'
    },
    {
      name: 'Emily Johnson',
      company: 'Quantum Nexus',
      email: 'emily@gmail.com',
      phone: '(179) 7382 829',
      location: 'Newyork, United States',
      value: '₹3,50,000',
      status: 'Not Contacted'
    },
    {
      name: 'Maria Garcia',
      company: 'EcoVision Enterprises',
      email: 'maria@gmail.com',
      phone: '(120) 3728 039',
      location: 'Denver, United States',
      value: '₹4,10,000',
      status: 'Not Contacted'
    },
    {
      name: 'John Smith',
      company: 'Aurora Technologies',
      email: 'john@gmail.com',
      phone: '(123) 4567 890',
      location: 'Chester, United Kingdom',
      value: '₹3,20,000',
      status: 'Closed'
    },
    {
      name: 'David Lee',
      company: 'BluSky Ventures',
      email: 'david@gmail.com',
      phone: '(183) 9302 890',
      location: 'Charlotte, United States',
      value: '₹3,10,000',
      status: 'Closed'
    },
    {
      name: 'Robert Martinez',
      company: 'TerraFusion Energy',
      email: 'robert@gmail.com',
      phone: '(163) 2459 315',
      location: 'Bristol, United Kingdom',
      value: '₹4,50,000',
      status: 'Closed'
    },
    {
      name: 'Michael Brown',
      company: 'UrbanPulse Design',
      email: 'micael@gmail.com',
      phone: '(184) 2719 738',
      location: 'London, United Kingdom',
      value: '₹4,10,000',
      status: 'Lost'
    },
    {
      name: 'Karen Davis',
      company: 'Nimbus Networks',
      email: 'darleeo@gmail.com',
      phone: '(163) 2459 315',
      location: 'Detroit, United States',
      value: '₹4,00,000',
      status: 'Lost'
    },
    {
      name: 'James Anderson',
      company: 'Epicurean Delights',
      email: 'james@gmail.com',
      phone: '(168) 8392 823',
      location: 'Manchester, United Kingdom',
      value: '₹3,40,000',
      status: 'Lost'
    }
  ];

  // Export to PDF function
  const exportToPDF = () => {
    if (isExporting) return;
    
    setIsExporting(true);
    
    try {
      const pdfContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Leads Export</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 20px; 
                color: #333;
              }
              h1 { 
                color: #0078d4; 
                text-align: center;
                margin-bottom: 20px;
              }
              .info {
                margin-bottom: 20px;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 5px;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 20px;
              }
              th, td { 
                border: 1px solid #ddd; 
                padding: 8px; 
                text-align: left; 
              }
              th { 
                background-color: #0078d4;
                color: white;
                font-weight: bold;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h1>Leads Report</h1>
            
            <div class="info">
              <p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Total Leads:</strong> ${leadsData.length}</p>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${leadsData.map(lead => `
                  <tr>
                    <td>${lead.name}</td>
                    <td>${lead.company}</td>
                    <td>${lead.email}</td>
                    <td>${lead.phone}</td>
                    <td>${lead.location}</td>
                    <td>${lead.value}</td>
                    <td>${lead.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const blob = new Blob([pdfContent], { type: 'text/html' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.html`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      setTimeout(() => {
        toast.success('PDF file downloaded successfully!', {
          icon: '📄',
          style: { background: '#d1e7dd', color: '#0f5132' }
        });
        setIsExporting(false);
      }, 500);
      
    } catch (error) {
      console.error('PDF Export Error:', error);
      setIsExporting(false);
    }
  };

  // Export to Excel function
  const exportToExcel = () => {
    if (isExporting) return;
    
    setIsExporting(true);
    
    try {
      const headers = ['Name', 'Company', 'Email', 'Phone', 'Location', 'Value', 'Status'];
      const csvContent = [
        headers.join(','),
        ...leadsData.map(lead => [
          `"${lead.name}"`,
          `"${lead.company}"`,
          `"${lead.email}"`,
          `"${lead.phone}"`,
          `"${lead.location}"`,
          `"${lead.value}"`,
          `"${lead.status}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      setTimeout(() => {
        toast.success('Excel file downloaded successfully!', {
          icon: '📊',
          style: { background: '#d1e7dd', color: '#0f5132' }
        });
        setIsExporting(false);
      }, 500);
      
    } catch (error) {
      console.error('Excel Export Error:', error);
      setIsExporting(false);
    }
  };

  // Handle time range selection
  const handleTimeRangeSelect = (range) => {
    setSelectedTimeRange(range);
    // Here you would typically filter your leads data based on the selected time range
    console.log(`Selected time range: ${range}`);
  };

  return (
    <div className="content" style={{ padding: '24px' }}>
      {/* Header Section */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-4">
        <div className="my-auto mb-2">
          <h2 className="mb-1 fs-4" style={{ color: '#1e293b', fontWeight: '700' }}>
            <i className="ti ti-users me-2" style={{ color: '#3b82f6' }}></i>
            <b>Leads</b>
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
            <i className="ti ti-layout-grid me-1" style={{ color: '#94a3b8' }}></i>
            Manage and track your sales leads
          </p>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div className="me-2 mb-2">
            <div className="dropdown">
              <button type="button" className="dropdown-toggle btn d-inline-flex align-items-center" 
                data-bs-toggle="dropdown" 
                style={{
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
                }}
              >
                <i className="ti ti-file-export me-2" style={{ fontSize: '1.1rem' }}></i>Export
                <i className="ti ti-chevron-down ms-2" style={{ fontSize: '0.9rem' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-2" style={{ 
                minWidth: '200px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                <li>
                  <button 
                    type="button"
                    className="dropdown-item rounded-2 border-0 bg-transparent w-100 text-start px-3 py-2 d-flex align-items-center" 
                    onClick={exportToPDF}
                    disabled={isExporting}
                    style={{ 
                      cursor: isExporting ? 'not-allowed' : 'pointer', 
                      opacity: isExporting ? 0.6 : 1,
                      transition: 'all 0.2s',
                      color: '#dc2626'
                    }}
                  >
                    <i className="ti ti-file-type-pdf me-2" style={{ color: '#dc2626', fontSize: '1.2rem' }}></i>
                    <div>
                      <div style={{ fontWeight: '500' }}>{isExporting ? 'Exporting...' : 'Export as PDF'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Download PDF document</div>
                    </div>
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider my-2" />
                </li>
                <li>
                  <button 
                    type="button"
                    className="dropdown-item rounded-2 border-0 bg-transparent w-100 text-start px-3 py-2 d-flex align-items-center" 
                    onClick={exportToExcel}
                    disabled={isExporting}
                    style={{ 
                      cursor: isExporting ? 'not-allowed' : 'pointer', 
                      opacity: isExporting ? 0.6 : 1,
                      transition: 'all 0.2s',
                      color: '#059669'
                    }}
                  >
                    <i className="ti ti-file-type-xls me-2" style={{ color: '#059669', fontSize: '1.2rem' }}></i>
                    <div>
                      <div style={{ fontWeight: '500' }}>{isExporting ? 'Exporting...' : 'Export as Excel'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Download Excel spreadsheet</div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-2">
            <button 
              type="button" 
              className="btn d-flex align-items-center" 
              onClick={() => setShowAddLeadModal(true)}
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
              }}
            >
              <i className="ti ti-circle-plus me-2" style={{ fontSize: '1.1rem' }}></i>Add Lead
            </button>
          </div>
        </div>
      </div>

      {/* Leads Grid Card */}
      <div className="card mb-4" style={{ 
        width: '100%', 
        border: '1px solid #e2e8f0',
        borderRadius: '12px'
      }}>
        <div className="card-body p-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="me-3" style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className="ti ti-layout-grid" style={{ color: '#3b82f6', fontSize: '1.2rem' }}></i>
              </div>
              <div>
                <h5 className='fs-5 mb-0' style={{ color: '#1e293b', fontWeight: '600' }}>
                  <b>Leads Overview</b>
                </h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                  <i className="ti ti-chart-bar me-1" style={{ color: '#94a3b8' }}></i>
                  Total {leadsData.length} leads across all categories
                </p>
              </div>
            </div>
            <div className="dropdown">
              <button type="button" className="dropdown-toggle btn d-inline-flex align-items-center" 
                data-bs-toggle="dropdown" 
                style={{ 
                  backgroundColor: '#f1f5f9', 
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontWeight: '500'
                }}
              >
                <i className="ti ti-calendar me-2" style={{ color: '#64748b' }}></i>
                {selectedTimeRange}
                <i className="ti ti-chevron-down ms-2" style={{ fontSize: '0.8rem' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-2" style={{ 
                minWidth: '180px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <li>
                  <button type="button" className="dropdown-item rounded-2 px-3 py-2 d-flex align-items-center" onClick={() => handleTimeRangeSelect('Recent')}>
                    <i className="ti ti-clock me-2" style={{ color: '#64748b' }}></i>Recent
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-2 px-3 py-2 d-flex align-items-center" onClick={() => handleTimeRangeSelect('Last Modified')}>
                    <i className="ti ti-edit me-2" style={{ color: '#64748b' }}></i>Last Modified
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-2 px-3 py-2 d-flex align-items-center" onClick={() => handleTimeRangeSelect('Last 7 Days')}>
                    <i className="ti ti-calendar-week me-2" style={{ color: '#3b82f6' }}></i>Last 7 Days
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-2 px-3 py-2 d-flex align-items-center" onClick={() => handleTimeRangeSelect('Last 30 Days')}>
                    <i className="ti ti-calendar-month me-2" style={{ color: '#64748b' }}></i>Last 30 Days
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-2 px-3 py-2 d-flex align-items-center" onClick={() => handleTimeRangeSelect('Last Month')}>
                    <i className="ti ti-calendar-stats me-2" style={{ color: '#64748b' }}></i>Last Month
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-2 px-3 py-2 d-flex align-items-center" onClick={() => handleTimeRangeSelect('Last Year')}>
                    <i className="ti ti-calendar-year me-2" style={{ color: '#64748b' }}></i>Last Year
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Kanban Board */}
      <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
        <div className="row g-3 mb-4" style={{ minWidth: '1300px' }}>
          {/* Contacted Column */}
          <div className="col-lg-3 col-md-6" style={{ minWidth: '320px' }}>
            <div className="card h-100" style={{ 
              border: '1px solid #e2e8f0',
              borderRadius: '12px'
            }}>
              <div className="card-header border-bottom py-3" style={{ borderRadius: '12px 12px 0 0' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {/* CHANGED: Reduced font size from '1rem' to '0.9rem' */}
                    <h4 className="fw-semibold d-flex align-items-center mb-1" style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#f59e0b',
                        marginRight: '8px'
                      }}></div>
                      <i className="ti ti-phone-call me-2" style={{ color: '#f59e0b', fontSize: '0.9rem' }}></i>Contacted
                    </h4>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-2" style={{ fontSize: '0.75rem', color: '#475569' }}>
                        <i className="ti ti-users me-1" style={{ fontSize: '0.7rem' }}></i>
                        02 Leads
                      </span>
                      <span className="fw-bold" style={{ fontSize: '0.75rem', color: '#10b981' }}>
                        <i className="ti ti-currency-rupee me-1" style={{ fontSize: '0.7rem' }}></i>
                        ₹7,50,000
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="action-icon d-inline-flex gap-1">
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center" 
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#fef3c7',
                          color: '#92400e',
                          border: 'none',
                          borderRadius: '6px'
                        }}>
                        <i className="ti ti-circle-plus" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Edit clicked')}>
                        <i className="ti ti-edit" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Delete clicked')}>
                        <i className="ti ti-trash" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                {/* Lead Card 1 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#fef3c7',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#92400e' }}>LW</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>Linda White</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              BrightWave Innovations
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#fef3c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#d97706', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#92400e' }}>₹03,50,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>linda@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(193) 7839 748</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Austin, United States</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#dbeafe'
                            }}>
                            <i className="ti ti-building-warehouse" style={{ color: '#3b82f6', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Last contacted: 2 days ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Call"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-phone-call" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Chat"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f0f9ff',
                              color: '#0369a1',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-brand-hipchat" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Lead Card 2 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#fef3c7',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#92400e' }}>CJ</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>Chris Johnson</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              Stellar Dynamics
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#fef3c7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#d97706', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#92400e' }}>₹3,50,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>chris@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(162) 8920 713</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Atlanta, United States</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#dcfce7'
                            }}>
                            <i className="ti ti-rocket" style={{ color: '#16a34a', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Last contacted: 1 day ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Call"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-phone-call" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Chat"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f0f9ff',
                              color: '#0369a1',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-brand-hipchat" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Not Contacted Column */}
          <div className="col-lg-3 col-md-6" style={{ minWidth: '320px' }}>
            <div className="card h-100" style={{ 
              border: '1px solid #e2e8f0',
              borderRadius: '12px'
            }}>
              <div className="card-header border-bottom py-3" style={{ borderRadius: '12px 12px 0 0' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {/* CHANGED: Reduced font size from '1rem' to '0.9rem' */}
                    <h4 className="fw-semibold d-flex align-items-center mb-1" style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#8b5cf6',
                        marginRight: '8px'
                      }}></div>
                      <i className="ti ti-clock me-2" style={{ color: '#8b5cf6', fontSize: '0.9rem' }}></i>Not Contacted
                    </h4>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-2" style={{ fontSize: '0.75rem', color: '#475569' }}>
                        <i className="ti ti-users me-1" style={{ fontSize: '0.7rem' }}></i>
                        02 Leads
                      </span>
                      <span className="fw-bold" style={{ fontSize: '0.75rem', color: '#10b981' }}>
                        <i className="ti ti-currency-rupee me-1" style={{ fontSize: '0.7rem' }}></i>
                        ₹7,60,000
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="action-icon d-inline-flex gap-1">
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center" 
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#f3e8ff',
                          color: '#6b21a8',
                          border: 'none',
                          borderRadius: '6px'
                        }}>
                        <i className="ti ti-circle-plus" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Edit clicked')}>
                        <i className="ti ti-edit" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Delete clicked')}>
                        <i className="ti ti-trash" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                {/* Lead Card 1 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#f3e8ff',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#6b21a8' }}>EJ</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>Emily Johnson</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              Quantum Nexus
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f3e8ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#7c3aed', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b21a8' }}>₹3,50,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>emily@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(179) 7382 829</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Newyork, United States</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#e0f2fe'
                            }}>
                            <i className="ti ti-atom" style={{ color: '#0284c7', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Added: 3 days ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Call"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-phone-call" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Chat"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f0f9ff',
                              color: '#0369a1',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-brand-hipchat" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Card 2 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#f3e8ff',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#6b21a8' }}>MG</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>Maria Garcia</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              EcoVision Enterprises
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f3e8ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#7c3aed', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6b21a8' }}>₹4,10,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>maria@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(120) 3728 039</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Denver, United States</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#dcfce7'
                            }}>
                            <i className="ti ti-leaf" style={{ color: '#16a34a', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Added: 1 week ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Call"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dcfce7',
                              color: '#166534',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-phone-call" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Chat"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f0f9ff',
                              color: '#0369a1',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-brand-hipchat" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closed Column */}
          <div className="col-lg-3 col-md-6" style={{ minWidth: '320px' }}>
            <div className="card h-100" style={{ 
              border: '1px solid #e2e8f0',
              borderRadius: '12px'
            }}>
              <div className="card-header border-bottom py-3" style={{ borderRadius: '12px 12px 0 0' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {/* CHANGED: Reduced font size from '1rem' to '0.9rem' */}
                    <h4 className="fw-semibold d-flex align-items-center mb-1" style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        marginRight: '8px'
                      }}></div>
                      <i className="ti ti-check me-2" style={{ color: '#10b981', fontSize: '0.9rem' }}></i>Closed
                    </h4>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-2" style={{ fontSize: '0.75rem', color: '#475569' }}>
                        <i className="ti ti-users me-1" style={{ fontSize: '0.7rem' }}></i>
                        03 Leads
                      </span>
                      <span className="fw-bold" style={{ fontSize: '0.75rem', color: '#10b981' }}>
                        <i className="ti ti-currency-rupee me-1" style={{ fontSize: '0.7rem' }}></i>
                        ₹10,80,000
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="action-icon d-inline-flex gap-1">
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center" 
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          border: 'none',
                          borderRadius: '6px'
                        }}>
                        <i className="ti ti-circle-plus" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Edit clicked')}>
                        <i className="ti ti-edit" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Delete clicked')}>
                        <i className="ti ti-trash" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                {/* Lead Card 1 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#dcfce7',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#166534' }}>JS</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>John Smith</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              Aurora Technologies
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#059669', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#166534' }}>₹3,20,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>john@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(123) 4567 890</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Chester, United Kingdom</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#fef3c7'
                            }}>
                            <i className="ti ti-sun" style={{ color: '#d97706', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Closed: 2 weeks ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="View"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-eye" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Reopen"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-refresh" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Card 2 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#dcfce7',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#166534' }}>DL</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>David Lee</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              BluSky Ventures
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#059669', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#166534' }}>₹3,10,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>david@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(183) 9302 890</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Charlotte, United States</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#e0f2fe'
                            }}>
                            <i className="ti ti-cloud" style={{ color: '#0284c7', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Closed: 1 week ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="View"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-eye" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Reopen"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-refresh" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Card 3 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#dcfce7',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#166534' }}>RM</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>Robert Martinez</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              TerraFusion Energy
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#059669', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#166534' }}>₹4,50,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>robert@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(163) 2459 315</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Bristol, United Kingdom</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#fef3c7'
                            }}>
                            <i className="ti ti-bolt" style={{ color: '#d97706', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Closed: 3 days ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="View"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-eye" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Reopen"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-refresh" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lost Column */}
          <div className="col-lg-3 col-md-6" style={{ minWidth: '320px' }}>
            <div className="card h-100" style={{ 
              border: '1px solid #e2e8f0',
              borderRadius: '12px'
            }}>
              <div className="card-header border-bottom py-3" style={{ borderRadius: '12px 12px 0 0' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {/* CHANGED: Reduced font size from '1rem' to '0.9rem' */}
                    <h4 className="fw-semibold d-flex align-items-center mb-1" style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#ef4444',
                        marginRight: '8px'
                      }}></div>
                      <i className="ti ti-x me-2" style={{ color: '#ef4444', fontSize: '0.9rem' }}></i>Lost
                    </h4>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-2" style={{ fontSize: '0.75rem', color: '#475569' }}>
                        <i className="ti ti-users me-1" style={{ fontSize: '0.7rem' }}></i>
                        03 Leads
                      </span>
                      <span className="fw-bold" style={{ fontSize: '0.75rem', color: '#10b981' }}>
                        <i className="ti ti-currency-rupee me-1" style={{ fontSize: '0.7rem' }}></i>
                        ₹11,50,000
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="action-icon d-inline-flex gap-1">
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center" 
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '6px'
                        }}>
                        <i className="ti ti-circle-plus" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Edit clicked')}>
                        <i className="ti ti-edit" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                      <button type="button" className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        onClick={() => console.log('Delete clicked')}>
                        <i className="ti ti-trash" style={{ fontSize: '0.9rem' }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                {/* Lead Card 1 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#fee2e2',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#991b1b' }}>MB</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>Michael Brown</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              UrbanPulse Design
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#fee2e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#dc2626', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#991b1b' }}>₹4,10,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>micael@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(184) 2719 738</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>London, United Kingdom</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#f3e8ff'
                            }}>
                            <i className="ti ti-palette" style={{ color: '#7c3aed', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Lost: 1 month ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="View"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-eye" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Reopen"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-refresh" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Card 2 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#fee2e2',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#991b1b' }}>KD</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>Karen Davis</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              Nimbus Networks
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#fee2e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#dc2626', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#991b1b' }}>₹4,00,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>darleeo@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(163) 2459 315</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Detroit, United States</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#e0f2fe'
                            }}>
                            <i className="ti ti-network" style={{ color: '#0284c7', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Lost: 2 weeks ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="View"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-eye" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Reopen"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-refresh" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Card 3 - REMOVED: borderLeft color */}
                <div className="w-100 mb-3">
                  <div className="card" style={{ 
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                      <div className="d-block">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar flex-shrink-0 me-2" style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px',
                            backgroundColor: '#fee2e2',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <span className="fw-medium" style={{ color: '#991b1b' }}>JA</span>
                          </div>
                          <div>
                            <h6 className="fw-medium mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
                              <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>James Anderson</a>
                            </h6>
                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                              <i className="ti ti-building me-1" style={{ fontSize: '0.7rem' }}></i>
                              Epicurean Delights
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#fee2e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-currency-rupee" style={{ color: '#dc2626', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#991b1b' }}>₹3,40,000</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-mail" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>james@gmail.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-phone" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>(168) 8392 823</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px'
                          }}>
                            <i className="ti ti-map-pin" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                          </div>
                          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Manchester, United Kingdom</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-top pt-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar flex-shrink-0 d-flex align-items-center justify-content-center me-2" 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '8px',
                              backgroundColor: '#fef3c7'
                            }}>
                            <i className="ti ti-chef-hat" style={{ color: '#d97706', fontSize: '1rem' }}></i>
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Lost: 1 week ago
                          </small>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="View"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-eye" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="Reopen"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              border: 'none',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-refresh" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" 
                            title="More"
                            style={{ 
                              padding: '4px 8px',
                              backgroundColor: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              borderRadius: '6px'
                            }}>
                            <i className="ti ti-dots-vertical" style={{ fontSize: '0.9rem' }}></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Lead Modal - FIXED VERSION */}
      {showAddLeadModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Lead</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddLeadModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Lead Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Type</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="leadType" id="person" />
                          <label className="form-check-label" htmlFor="person">Person</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="leadType" id="organization" defaultChecked />
                          <label className="form-check-label" htmlFor="organization">Organization</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Company<span className="text-danger">*</span></label>
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Enter company name" />
                        <button type="button" className="btn btn-outline-primary" onClick={() => {
                          setShowAddLeadModal(false);
                          setShowAddCompanyModal(true);
                        }}>
                          <i className="ti ti-plus me-1"></i>Add New
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Value<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Currency<span className="text-danger">*</span></label>
                      <select className="form-select">
                        <option value="">Select</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="INR">INR (₹)</option>
                      </select>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Phone Number<span className="text-danger">*</span></label>
                      <div className="input-group">
                        <input type="text" className="form-control" />
                        <select className="form-select" style={{maxWidth: '120px'}}>
                          <option value="Work">Work</option>
                          <option value="Home">Home</option>
                          <option value="Mobile">Mobile</option>
                        </select>
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="ti ti-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Email<span className="text-danger">*</span></label>
                      <div className="input-group">
                        <input type="email" className="form-control" />
                        <select className="form-select" style={{maxWidth: '120px'}}>
                          <option value="Work">Work</option>
                          <option value="Home">Home</option>
                          <option value="Personal">Personal</option>
                        </select>
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="ti ti-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Source<span className="text-danger">*</span></label>
                      <select className="form-select">
                        <option value="">Select</option>
                        <option value="Phone Calls">Phone Calls</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral Sites">Referral Sites</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Industry<span className="text-danger">*</span></label>
                      <select className="form-select">
                        <option value="">Select</option>
                        <option value="Retail Industry">Retail Industry</option>
                        <option value="Banking">Banking</option>
                        <option value="Hotels">Hotels</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Owner<span className="text-danger">*</span></label>
                      <select className="form-select">
                        <option value="">Select</option>
                        <option value="Darlee Robertson">Darlee Robertson</option>
                        <option value="Sharon Roy">Sharon Roy</option>
                        <option value="Vaughan Lewis">Vaughan Lewis</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tags</label>
                      <input type="text" className="form-control" placeholder="Add tags separated by comma" />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="4" placeholder="Enter description..."></textarea>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Visibility</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="visibility" id="public" />
                          <label className="form-check-label" htmlFor="public">Public</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="visibility" id="private" defaultChecked />
                          <label className="form-check-label" htmlFor="private">Private</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="visibility" id="selectPeople" />
                          <label className="form-check-label" htmlFor="selectPeople">Select People</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddLeadModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => setShowAddLeadModal(false)}>Add Lead</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Company Modal */}
      {showAddCompanyModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Company</h5>
                <button type="button" className="btn-close" onClick={() => {
                  setShowAddCompanyModal(false);
                  setShowAddLeadModal(true);
                }}></button>
              </div>
              <div className="modal-body">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className={`nav-link ${activeCompanyTab === 'basic-info' ? 'active' : ''}`} 
                      onClick={() => setActiveCompanyTab('basic-info')}>
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className={`nav-link ${activeCompanyTab === 'address' ? 'active' : ''}`}
                      onClick={() => setActiveCompanyTab('address')}>
                      Address
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className={`nav-link ${activeCompanyTab === 'social-profiles' ? 'active' : ''}`}
                      onClick={() => setActiveCompanyTab('social-profiles')}>
                      Social Profiles
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className={`nav-link ${activeCompanyTab === 'access' ? 'active' : ''}`}
                      onClick={() => setActiveCompanyTab('access')}>
                      Access
                    </button>
                  </li>
                </ul>
                
                <div className="tab-content pt-4">
                  {activeCompanyTab === 'basic-info' && (
                    <div className="tab-pane fade show active">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Company Name<span className="text-danger">*</span></label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Phone Number<span className="text-danger">*</span></label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Phone Number 2</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Fax</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Website</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeCompanyTab === 'address' && (
                    <div className="tab-pane fade">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Street Address</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">State</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Country</label>
                          <select className="form-select">
                            <option value="">Select</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="India">India</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Zip Code</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeCompanyTab === 'social-profiles' && (
                    <div className="tab-pane fade">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Facebook</label>
                          <input type="text" className="form-control" placeholder="https://www.facebook.com/" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Twitter</label>
                          <input type="text" className="form-control" placeholder="https://www.twitter.com/" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">LinkedIn</label>
                          <input type="text" className="form-control" placeholder="https://www.linkedin.com/" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Instagram</label>
                          <input type="text" className="form-control" placeholder="https://www.instagram.com/" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeCompanyTab === 'access' && (
                    <div className="tab-pane fade">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Visibility</label>
                          <div className="d-flex gap-3">
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="companyVisibility" id="company-public" />
                              <label className="form-check-label" htmlFor="company-public">Public</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="companyVisibility" id="company-private" defaultChecked />
                              <label className="form-check-label" htmlFor="company-private">Private</label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="radio" name="companyVisibility" id="company-select-people" />
                              <label className="form-check-label" htmlFor="company-select-people">Select People</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Status</label>
                          <select className="form-select">
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowAddCompanyModal(false);
                  setShowAddLeadModal(true);
                }}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  setShowAddCompanyModal(false);
                  setShowAddLeadModal(true);
                }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {(showAddLeadModal || showAddCompanyModal) && (
        <div className="modal-backdrop fade show"></div>
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
        style={{ top: '70px' }}
      />
    </div>
  );
};

export default Leads;