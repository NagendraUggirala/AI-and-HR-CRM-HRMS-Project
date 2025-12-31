import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { leadsAPI } from '../../utils/api';


const Leads = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leadsData, setLeadsData] = useState([]);
  const [leadsKanban, setLeadsKanban] = useState({
    Contacted: { leads: [], count: 0, amount: '₹0' },
    'Not Contacted': { leads: [], count: 0, amount: '₹0' },
    Closed: { leads: [], count: 0, amount: '₹0' },
    Lost: { leads: [], count: 0, amount: '₹0' }
  });

  // Form state for Add Lead Modal
  const [formData, setFormData] = useState({
    leadName: '',
    company: '',
    value: '',
    currency: 'USD',
    phone: '',
    email: '',
    source: '',
    industry: '',
    owner: '',
    tags: '',
    description: '',
    visibility: 'private',
    status: 'Not Contacted'
  });

  // Stage configuration for Kanban board
  const statusConfig = [
    { status: 'Contacted', color: 'warning', displayName: 'Contacted' },
    { status: 'Not Contacted', color: 'purple', displayName: 'Not Contacted' },
    { status: 'Closed', color: 'success', displayName: 'Closed' },
    { status: 'Lost', color: 'danger', displayName: 'Lost' }
  ];

  // Load leads from API on component mount
  useEffect(() => {
    loadLeads();
  }, []);

  // Helper function to format amount
  const formatAmount = (value) => {
    if (!value || value === 0) return '₹0';
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[₹,]/g, '')) : value;
    if (isNaN(numValue)) return '₹0';
    return '₹' + numValue.toLocaleString('en-IN');
  };

  // Helper function to make initials
  const makeInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Transform API leads data to Kanban structure
  const transformLeadsToKanban = (leads) => {
    if (!Array.isArray(leads)) return leadsKanban;

    const kanban = {
      Contacted: { leads: [], count: 0, amount: 0 },
      'Not Contacted': { leads: [], count: 0, amount: 0 },
      Closed: { leads: [], count: 0, amount: 0 },
      Lost: { leads: [], count: 0, amount: 0 }
    };

    leads.forEach(lead => {
      const status = lead.status || 'Not Contacted';
      const leadCard = {
        id: lead.id,
        initials: makeInitials(lead.name || ''),
        name: lead.name || 'Untitled Lead',
        company: lead.company || '',
        email: lead.email || '',
        phone: lead.phone || '',
        location: lead.location || '',
        value: formatAmount(lead.value || 0),
        status: status
      };

      if (kanban[status]) {
        kanban[status].leads.push(leadCard);
        const amount = parseFloat((lead.value || '0').toString().replace(/[₹,]/g, '')) || 0;
        kanban[status].amount += amount;
        kanban[status].count++;
      }
    });

    // Format amounts
    Object.keys(kanban).forEach(status => {
      kanban[status].amount = formatAmount(kanban[status].amount);
    });

    return kanban;
  };

  // Load leads from API
  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await leadsAPI.list();
      if (Array.isArray(data)) {
        setLeadsData(data);
        setLeadsKanban(transformLeadsToKanban(data));
      } else if (data === null || data === undefined) {
        setLeadsData([]);
        setLeadsKanban({
          Contacted: { leads: [], count: 0, amount: '₹0' },
          'Not Contacted': { leads: [], count: 0, amount: '₹0' },
          Closed: { leads: [], count: 0, amount: '₹0' },
          Lost: { leads: [], count: 0, amount: '₹0' }
        });
      } else {
        console.warn('API returned non-array data:', data);
        setLeadsData([]);
      }
    } catch (err) {
      console.error('Error loading leads:', err);
      const status = err.status || (err.message && err.message.includes('404') ? 404 : null);
      let errorMessage = 'Failed to load leads. ';
      
      if (status === 404 || err.message?.includes('404') || err.message?.includes('Not Found')) {
        errorMessage += 'The leads API endpoint is not available. Please ensure the backend leads endpoint is implemented.';
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please check if the backend API is running.';
      }
      
      setError(errorMessage);
      setLeadsData([]);
    } finally {
      setLoading(false);
    }
  };

  // Sample leads data for export (fallback)
  const sampleLeadsData = [
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

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      leadName: '',
      company: '',
      value: '',
      currency: 'USD',
      phone: '',
      email: '',
      source: '',
      industry: '',
      owner: '',
      tags: '',
      description: '',
      visibility: 'private',
      status: 'Not Contacted'
    });
  };

  // Open Add Lead Modal
  const handleAddLeadClick = () => {
    setModalType('add');
    setSelectedLead(null);
    resetForm();
    setShowAddLeadModal(true);
  };

  // Open Edit Lead Modal
  const handleEditLead = async (lead) => {
    try {
      setModalType('edit');
      setSelectedLead(lead);
      
      // Fetch full lead data from API if we have an ID
      let fullLeadData = lead;
      if (lead.id) {
        try {
          fullLeadData = await leadsAPI.getById(lead.id);
        } catch (err) {
          console.error('Error fetching lead details:', err);
          // Use existing lead data if API call fails
        }
      }

      // Map backend field names to frontend form field names
      setFormData({
        leadName: fullLeadData.name || lead.name || '',
        company: fullLeadData.company || '',
        value: fullLeadData.value || '',
        currency: fullLeadData.currency || 'USD',
        phone: fullLeadData.phone || '',
        email: fullLeadData.email || '',
        source: fullLeadData.source || '',
        industry: fullLeadData.industry || '',
        owner: fullLeadData.owner || '',
        tags: fullLeadData.tags || '',
        description: fullLeadData.description || '',
        visibility: fullLeadData.visibility || 'private',
        status: fullLeadData.status || 'Not Contacted'
      });
      
      setShowAddLeadModal(true);
    } catch (err) {
      console.error('Error opening edit modal:', err);
      toast.error('Failed to load lead details.');
    }
  };

  // Handle Delete Lead
  const handleDeleteLead = (lead) => {
    setLeadToDelete(lead);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (leadToDelete && leadToDelete.id) {
      try {
        setError(null);
        await leadsAPI.delete(leadToDelete.id);
        await loadLeads();
        setShowDeleteModal(false);
        setLeadToDelete(null);
        toast.success('Lead deleted successfully!');
      } catch (err) {
        console.error('Error deleting lead:', err);
        const errorMessage = err.message || err.detail || 'Failed to delete lead. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  // Handle add/edit lead form submission
  const handleAddLead = async (e) => {
    e.preventDefault();
    
    try {
      setError(null);
      setLoading(true);
      
      // Prepare lead data for API - map frontend fields to backend schema
      const leadData = {
        name: formData.leadName || 'Untitled Lead', // Backend expects 'name', not 'leadName'
        company: formData.company || null,
        value: formData.value ? String(formData.value) : null, // Backend expects string
        currency: formData.currency || null,
        phone: formData.phone || null,
        email: formData.email || null,
        source: formData.source || null,
        industry: formData.industry || null,
        owner: formData.owner || null,
        tags: formData.tags || null, // Backend expects string
        description: formData.description || null,
        visibility: formData.visibility || 'private',
        status: formData.status || 'Not Contacted'
      };

      // Remove empty strings and convert to null
      Object.keys(leadData).forEach(key => {
        if (leadData[key] === '' || leadData[key] === undefined) {
          leadData[key] = null;
        }
      });

      if (modalType === 'add') {
        await leadsAPI.create(leadData);
        toast.success('Lead created successfully!');
      } else if (selectedLead && selectedLead.id) {
        await leadsAPI.update(selectedLead.id, leadData);
        toast.success('Lead updated successfully!');
      }
      
      // Reload leads
      await loadLeads();
      
      // Close modal and reset form
      setShowAddLeadModal(false);
      resetForm();
      setSelectedLead(null);
    } catch (err) {
      console.error('Error saving lead:', err);
      const errorMessage = err.message || err.detail || 'Failed to save lead. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Export to PDF function
  const exportToPDF = () => {
    if (isExporting) return; // Prevent multiple calls
    
    setIsExporting(true);
    
    try {
      const exportData = leadsData.length > 0 ? leadsData : sampleLeadsData;
      
      // Create simple PDF content
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
              <p><strong>Total Leads:</strong> ${exportData.length}</p>
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
                ${exportData.map(lead => `
                  <tr>
                    <td>${lead.name || ''}</td>
                    <td>${lead.company || ''}</td>
                    <td>${lead.email || ''}</td>
                    <td>${lead.phone || ''}</td>
                    <td>${lead.location || ''}</td>
                    <td>${lead.value || formatAmount(lead.value || 0)}</td>
                    <td>${lead.status || ''}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Create blob and download directly
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.html`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
      // Show success toast and reset exporting state
      setTimeout(() => {
        toast.success('PDF file downloaded successfully!');
        setIsExporting(false);
      }, 500);
      
    } catch (error) {
      console.error('PDF Export Error:', error);
      setIsExporting(false);
    }
  };

  // Export to Excel function
  const exportToExcel = () => {
    if (isExporting) return; // Prevent multiple calls
    
    setIsExporting(true);
    
    try {
      const exportData = leadsData.length > 0 ? leadsData : sampleLeadsData;
      
      // Create CSV content
      const headers = ['Name', 'Company', 'Email', 'Phone', 'Location', 'Value', 'Status'];
      const csvContent = [
        headers.join(','),
        ...exportData.map(lead => [
          `"${lead.name || ''}"`,
          `"${lead.company || ''}"`,
          `"${lead.email || ''}"`,
          `"${lead.phone || ''}"`,
          `"${lead.location || ''}"`,
          `"${lead.value || formatAmount(lead.value || 0)}"`,
          `"${lead.status || ''}"`
        ].join(','))
      ].join('\n');

      // Create and download Excel file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
      // Show success toast and reset exporting state
      setTimeout(() => {
        toast.success('Excel file downloaded successfully!');
        setIsExporting(false);
      }, 500);
      
    } catch (error) {
      console.error('Excel Export Error:', error);
      setIsExporting(false);
    }
  };

  return (
    <div className="content">
      {error && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Note:</strong> {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {loading && (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}



      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div className="my-auto mb-2">
          <h2 className="mb-1 fs-4"><b>Leads</b></h2>

        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div className="me-2 mb-2">
            
          </div>
          <div className="me-2 mb-2">
            <div className="dropdown">
              <button type="button" className="dropdown-toggle btn d-inline-flex align-items-center" data-bs-toggle="dropdown" style={{backgroundColor: '#0078d4', color: 'white', border: 'none'}}>
                <i className="ti ti-file-export me-1"></i>Export
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button 
                    type="button"
                    className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start" 
                    onClick={exportToPDF}
                    disabled={isExporting}
                    style={{ cursor: isExporting ? 'not-allowed' : 'pointer', opacity: isExporting ? 0.6 : 1 }}
                  >
                    <i className="ti ti-file-type-pdf me-1"></i>
                    {isExporting ? 'Exporting...' : 'Export as PDF'}
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start" 
                    onClick={exportToExcel}
                    disabled={isExporting}
                    style={{ cursor: isExporting ? 'not-allowed' : 'pointer', opacity: isExporting ? 0.6 : 1 }}
                  >
                    <i className="ti ti-file-type-xls me-1"></i>
                    {isExporting ? 'Exporting...' : 'Export as Excel'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-2">
            <button type="button" className="btn btn-primary d-flex align-items-center" onClick={handleAddLeadClick}>
              <i className="ti ti-circle-plus me-2"></i>Add Lead
            </button>
          </div>
          
        </div>
      </div>
      {/* /Breadcrumb */}

      {/* Leads Grid */}
      <div className="card" style={{ width: '100%' }}>
        <div className="card-body p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className='fs-6'><b>Leads Grid</b></h5>
            <div className="dropdown">
              <button type="button" className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button type="button" className="dropdown-item rounded-1">
                    Recent
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-1">
                    Last Modified
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-1">
                    Last 7 Days
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-1">
                    Last 30 Days
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-1">
                    Last Month
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item rounded-1">
                    Last Year
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Kanban */}
      {!loading && (
      <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
        <div className="row g-4 mb-4" style={{ minWidth: '1400px' }}>
        {statusConfig.map((statusItem) => {
          const statusData = leadsKanban[statusItem.status] || { leads: [], count: 0, amount: '₹0' };
          const colorMap = {
            'warning': 'warning',
            'purple': 'purple',
            'success': 'success',
            'danger': 'danger'
          };
          const borderColor = colorMap[statusItem.color] || 'warning';
          
          return (
            <div key={statusItem.status} className="col-lg-3 col-md-6" style={{ minWidth: '320px', width: 'fit-content' }}>
              <div className="card" style={{borderTopWidth: '0px', borderRightWidth: '0px', paddingLeft: '0px', borderLeftWidth: '0px', paddingRight: '0px', paddingBottom: '0px', paddingTop: '0px', width: 'fit-content', minWidth: '300px', height: 'fit-content'}}>
                <div className="card-header bg-white border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="fw-semibold d-flex align-items-center mb-1" style={{ fontSize: '1rem' }}>
                        <i className={`ti ti-circle-filled fs-6 text-${statusItem.color} me-2`}></i>
                        {statusItem.displayName}
                      </h4>
                      <span className="fw-bold" style={{ fontSize: '0.75rem', color: '#a0a0a0' }}>
                        {statusData.count} Leads - {statusData.amount}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="action-icon d-inline-flex">
                        <button type="button" className="btn btn-sm" onClick={handleAddLeadClick}>
                          <i className="ti ti-circle-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  {statusData.leads.length === 0 ? (
                    <div className="text-center text-muted small p-3">No leads</div>
                  ) : (
                    statusData.leads.map((lead) => (
                      <div key={lead.id || lead.name} className="w-100 mb-3">
                        <div className="card border-0 shadow-sm" style={{ width: 'fit-content', minWidth: '280px' }}>
                          <div className="card-body p-3" style={{ fontSize: '0.95rem' }}>
                            <div className="d-block">
                              <div className={`border-${borderColor} mb-2`}></div>
                              <div className="d-flex align-items-center mb-2">
                                <div className="avatar avatar-lg bg-gray flex-shrink-0 me-2">
                                  <span className="avatar-title text-dark">{lead.initials}</span>
                                </div>
                                <h6 className="fw-medium mb-0" style={{ fontSize: '1rem' }}>
                                  <a href="#" className="text-decoration-none">{lead.name}</a>
                                </h6>
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="d-flex align-items-center mb-1">
                                <i className={`ti ti-report-money text-${statusItem.color} me-2`}></i>
                                <span className="text-muted" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{lead.value}</span>
                              </div>
                              {lead.email && (
                                <div className="d-flex align-items-center mb-1">
                                  <i className="ti ti-mail text-muted me-2"></i>
                                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>{lead.email}</span>
                                </div>
                              )}
                              {lead.phone && (
                                <div className="d-flex align-items-center mb-1">
                                  <i className="ti ti-phone text-muted me-2"></i>
                                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>{lead.phone}</span>
                                </div>
                              )}
                              {lead.location && (
                                <div className="d-flex align-items-center">
                                  <i className="ti ti-map-pin-pin text-muted me-2"></i>
                                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>{lead.location}</span>
                                </div>
                              )}
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-2">
                              <button type="button" className="avatar avatar-sm avatar-rounded flex-shrink-0 bg-light d-flex align-items-center justify-content-center">
                                <i className="ti ti-building-warehouse fs-6 text-primary"></i>
                              </button>
                              <div className="d-flex align-items-center gap-1">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleEditLead(lead)}
                                  title="Edit Lead"
                                  style={{ fontSize: '12px', padding: '4px 10px', minWidth: '65px' }}
                                >
                                  <i className="ti ti-edit me-1"></i>Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeleteLead(lead)}
                                  title="Delete Lead"
                                  style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                                >
                                  <i className="ti ti-trash me-1"></i>Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      )}
      
      {/* /Leads Kanban */}

      {/* Add New Lead Modal */}
      {showAddLeadModal && (
        <div className="modal fade show" style={{display: 'block'}} tabIndex="-1" aria-labelledby="add_leads" aria-hidden="false" onClick={(e) => {
          if (e.target === e.currentTarget && !showAddCompanyModal) {
            setShowAddLeadModal(false);
          }
        }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{maxWidth: '800px'}}>
            <div className="modal-header">
              <h4 className="modal-title">{modalType === 'add' ? 'Add New Lead' : 'Edit Lead'}</h4>
              <button type="button" className="btn-close custom-btn-close" onClick={(e) => {
                e.stopPropagation();
                setShowAddLeadModal(false);
                resetForm();
                setSelectedLead(null);
              }} aria-label="Close">
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={handleAddLead}>
              <div className="modal-body pb-0" style={{padding: '1.5rem'}}>
                <style>
                  {`
                    #add_leads .form-label {
                      font-weight: 500;
                      margin-bottom: 0.5rem;
                      min-width: auto;
                      max-width: 120px;
                      white-space: nowrap;
                    }
                    #add_leads .col-form-label {
                      font-weight: 500;
                      margin-bottom: 0.5rem;
                      min-width: auto;
                      max-width: 120px;
                      white-space: nowrap;
                    }
                    #add_leads .form-control {
                      font-size: 0.875rem;
                    }
                    #add_leads .select {
                      font-size: 0.875rem;
                    }
                    #add_leads .mb-3 {
                      margin-bottom: 1rem !important;
                    }
                  `}
                </style>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3 d-flex align-items-center">
                      <label className="form-label me-3" style={{minWidth: '100px', whiteSpace: 'nowrap'}}>
                        Lead Name<span className="text-danger">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="form-control flex-grow-1" 
                        name="leadName"
                        value={formData.leadName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>									
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="d-flex align-items-center ">
                        <div className="form-check me-3">
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Person
                          </label>
                        </div>
                         <div className="form-check">
                          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                          <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Organization	
                          </label>
                        </div>
                      </div>
                    </div>		
                  </div>
                  <div className="col-md-12">
                    <div className="input-block mb-3 d-flex align-items-center">
                      <label className="col-form-label me-3" style={{minWidth: '100px', whiteSpace: 'nowrap'}}>
                        Company<span className="text-danger">*</span>
                      </label>
                      <div className="d-flex align-items-center flex-grow-1">
                        <input 
                          type="text" 
                          className="form-control flex-grow-1 me-2" 
                          style={{height: '40px'}} 
                          placeholder="Enter company name"
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          required
                        />
                        <button type="button" className="btn btn-link text-primary text-nowrap p-0" style={{fontSize: '14px', textDecoration: 'none'}} onClick={(e) => {
                          e.stopPropagation();
                          setShowAddCompanyModal(true);
                        }}>
                          <i className="ti ti-plus text-primary me-1"></i>Add New
                        </button>
                      </div>
                    </div>									
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label className="form-label me-3" style={{minWidth: '60px', whiteSpace: 'nowrap'}}>
                        Value<span className="text-danger">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="form-control flex-grow-1" 
                        style={{height: '40px'}}
                        name="value"
                        value={formData.value}
                        onChange={handleFormChange}
                        required
                      />
                    </div>									
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label className="form-label me-3" style={{minWidth: '80px', whiteSpace: 'nowrap'}}>
                        Currency<span className="text-danger">*</span>
                      </label>
                      <select 
                        className="select flex-grow-1" 
                        style={{height: '40px'}}
                        name="currency"
                        value={formData.currency}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="USD">USD</option>
                        <option value="Euro">Euro</option>
                      </select>
                    </div>									
                  </div>
                  <div className="col-md-12 ">
                    <div className="lead-phno-col">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="input-block mb-3">
                            <label className="form-label">Phone Number<span className="text-danger">*</span></label>
                            <input 
                              className="form-control" 
                              type="text" 
                              style={{height: '40px'}}
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>	
                        <div className="col-lg-4 d-flex align-items-end">
                          <div className="input-block w-100 mb-3 d-flex align-items-center">
                            <div className="w-100">
                              <select className="select w-100">
                                <option defaultValue>Work</option>
                                <option>Home</option>
                              </select>
                            </div>
                            <a href="#" className="add-modal-row text-primary add-lead-phno ms-2"><i className="ti ti-circle-plus"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="lead-email-col">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="input-block mb-3">
                            <label className="form-label">Email<span className="text-danger">*</span></label>
                            <input 
                              className="form-control" 
                              type="email" 
                              style={{height: '40px'}}
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              required
                            />
                          </div>
                        </div>	
                        <div className="col-lg-4 d-flex align-items-end">
                          <div className="input-block w-100 mb-3 d-flex align-items-center">
                            <div className="w-100">
                              <select className="select w-100">
                                <option defaultValue>Work</option>
                                <option>Home</option>
                              </select>
                            </div>
                            <a href="#" className="add-email-row text-primary add-lead-phno ms-2"><i className="ti ti-circle-plus"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Source<span className="text-danger">*</span></label>
                      <select 
                        className="select" 
                        style={{height: '40px'}}
                        name="source"
                        value={formData.source}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Phone Calls">Phone Calls</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral Sites">Referral Sites</option>
                      </select>
                    </div>									
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Industry<span className="text-danger">*</span></label>
                      <select 
                        className="select" 
                        style={{height: '40px'}}
                        name="industry"
                        value={formData.industry}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Rentail Industry">Rentail Industry</option>
                        <option value="Banking">Banking</option>
                        <option value="Hotels">Hotels</option>
                      </select>
                    </div>									
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Owner<span className="text-danger">*</span></label>
                      <select 
                        className="select" 
                        style={{height: '40px'}}
                        name="owner"
                        value={formData.owner}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Darlee Robertson">Darlee Robertson</option>
                        <option value="Sharon Roy">Sharon Roy</option>
                        <option value="Vaughan Lewis">Vaughan Lewis</option>
                      </select>
                    </div>									
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Tags<span className="text-danger">*</span></label>
                      <div className="bootstrap-tagsinput">
                        <span className="tag label label-info">Collab<span data-role="remove"></span></span> 
                        <input type="text" placeholder="Add new" />
                      </div>
                      <input 
                        className="form-control" 
                        placeholder="Add tags (comma separated)" 
                        type="text" 
                        name="tags"
                        value={formData.tags}
                        onChange={handleFormChange}
                      />
                    </div>									
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3 ">
                      <label className="form-label">Description<span className="text-danger">*</span></label>
                      <div className="summernote" style={{display: 'none'}}></div>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Enter description..."
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <div className="mb-3">
                      <label className="form-label">Visibility</label>
                      <div className="d-flex align-items-center">
                        <div className="form-check me-3">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="visibility" 
                            id="public-id" 
                            value="public"
                            checked={formData.visibility === 'public'}
                            onChange={handleFormChange}
                          />
                          <label className="form-check-label" htmlFor="public-id">
                            Public
                          </label>
                        </div>
                         <div className="form-check me-3">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="visibility" 
                            id="private-id" 
                            value="private"
                            checked={formData.visibility === 'private'}
                            onChange={handleFormChange}
                          />
                          <label className="form-check-label" htmlFor="private-id">
                            Private	
                          </label>
                        </div>
                         <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="visibility" 
                            id="people-id" 
                            value="select_people"
                            checked={formData.visibility === 'select_people'}
                            onChange={handleFormChange}
                          />
                          <label className="form-check-label" htmlFor="people-id">
                            Select People	
                          </label>
                        </div>
                      </div>
                    </div>		
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">Status</label>
                      <select 
                        className="select"
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Not Contacted">Not Contacted</option>
                        <option value="Closed">Closed</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light me-2" onClick={(e) => {
                  e.stopPropagation();
                  setShowAddLeadModal(false);
                  resetForm();
                  setSelectedLead(null);
                }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{modalType === 'add' ? 'Add Lead' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* Modal Backdrop for Add Lead */}
      {showAddLeadModal && (
        <div className="modal-backdrop fade show" style={{zIndex: 1050}}></div>
      )}

      {/* Add New Company Modal */}
      {showAddCompanyModal && (
        <>
          <div className="modal-backdrop fade show" style={{zIndex: 1055}} onClick={(e) => {
            e.stopPropagation();
            setShowAddCompanyModal(false);
          }}></div>
          <div className="modal fade show" style={{display: 'block', zIndex: 1060}} tabIndex="-1" aria-labelledby="add_company" aria-hidden="false" onClick={(e) => {
            if (e.target === e.currentTarget) {
              e.stopPropagation();
              setShowAddCompanyModal(false);
            }
          }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add New Company</h4>
                  <button type="button" className="btn-close custom-btn-close" onClick={(e) => {
                    e.stopPropagation();
                    setShowAddCompanyModal(false);
                  }} aria-label="Close">
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="basic-tab" data-bs-toggle="tab" data-bs-target="#basic-info" type="button" role="tab" aria-controls="basic-info" aria-selected="true">
                        Basic Information
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="address-tab" data-bs-toggle="tab" data-bs-target="#address" type="button" role="tab" aria-controls="address" aria-selected="false">
                        Address
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="social-tab" data-bs-toggle="tab" data-bs-target="#social-profiles" type="button" role="tab" aria-controls="social-profiles" aria-selected="false">
                        Social Profiles
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="access-tab" data-bs-toggle="tab" data-bs-target="#access" type="button" role="tab" aria-controls="access" aria-selected="false">
                        Access
                      </button>
                    </li>
                  </ul>
                  
                  <div className="tab-content pt-4">
                    {/* Basic Information Tab */}
                    <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="basic-tab">
                      <div className="mb-4 text-center">
                        <div className="profile-upload mb-3">
                          <div className="profile-upload-img mb-2" style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto',
                            borderRadius: '50%',
                            border: '2px dashed #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f8f9fa'
                          }}>
                            <span><i className="ti ti-photo" style={{fontSize: '32px', color: '#adb5bd'}}></i></span>
                          </div>
                          <h6 className="mb-1">Upload Profile Image</h6>
                          <p className="text-muted mb-3" style={{fontSize: '13px'}}>Image should be below 4 mb</p>
                          <div className="d-flex justify-content-center gap-2">
                            <button type="button" className="btn btn-primary btn-sm px-3">Upload</button>
                            <button type="button" className="btn btn-light btn-sm px-3">Cancel</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Company Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <label className="form-label mb-0">Email</label>
                              <div className="form-check form-switch">
                                <label className="form-check-label me-2" style={{fontSize: '12px'}}>Option</label>
                                <input className="form-check-input" type="checkbox" role="switch" />
                              </div>
                            </div>
                            <input type="email" className="form-control" />
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
                            <div className="d-flex align-items-center gap-1">
                              <i className="ti ti-star" style={{cursor: 'pointer', fontSize: '20px', color: '#ddd'}}></i>
                              <i className="ti ti-star" style={{cursor: 'pointer', fontSize: '20px', color: '#ddd'}}></i>
                              <i className="ti ti-star" style={{cursor: 'pointer', fontSize: '20px', color: '#ddd'}}></i>
                              <i className="ti ti-star" style={{cursor: 'pointer', fontSize: '20px', color: '#ddd'}}></i>
                              <i className="ti ti-star" style={{cursor: 'pointer', fontSize: '20px', color: '#ddd'}}></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Owner <span className="text-danger">*</span></label>
                            <div className="d-flex align-items-center gap-2">
                              <select className="form-select">
                                <option>Select</option>
                                <option>Darlee Robertson</option>
                                <option>Sharon Roy</option>
                                <option>Vaughan Lewis</option>
                              </select>
                              <button type="button" className="btn btn-light btn-icon"><i className="ti ti-user-plus"></i></button>
                              <button type="button" className="btn btn-light btn-icon"><i className="ti ti-phone"></i></button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Tags <span className="text-danger">*</span></label>
                            <div className="bootstrap-tagsinput">
                              <span className="tag label label-info">Collab<span data-role="remove"></span></span> 
                              <input type="text" placeholder="Add new" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Deals <span className="text-danger">*</span></label>
                            <div className="d-flex justify-content-between align-items-center">
                              <select className="form-select">
                                <option>Select</option>
                                <option>Deal 1</option>
                                <option>Deal 2</option>
                              </select>
                              <a href="#" className="text-primary ms-2 text-nowrap" style={{fontSize: '14px'}}><i className="ti ti-plus me-1"></i>Add New</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Address Tab */}
                    <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">Street Address</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Country</label>
                            <select className="form-select">
                              <option>Select</option>
                              <option>United States</option>
                              <option>United Kingdom</option>
                              <option>India</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Zip Code</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Profiles Tab */}
                    <div className="tab-pane fade" id="social-profiles" role="tabpanel" aria-labelledby="social-tab">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Facebook</label>
                            <input type="text" className="form-control" placeholder="https://www.facebook.com/" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Twitter</label>
                            <input type="text" className="form-control" placeholder="https://www.twitter.com/" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">LinkedIn</label>
                            <input type="text" className="form-control" placeholder="https://www.linkedin.com/" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Instagram</label>
                            <input type="text" className="form-control" placeholder="https://www.instagram.com/" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Access Tab */}
                    <div className="tab-pane fade" id="access" role="tabpanel" aria-labelledby="access-tab">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">Visibility</label>
                            <div className="d-flex align-items-center gap-3">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="companyVisibility" id="company-public" />
                                <label className="form-check-label" htmlFor="company-public">
                                  Public
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="companyVisibility" id="company-private" defaultChecked />
                                <label className="form-check-label" htmlFor="company-private">
                                  Private
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="companyVisibility" id="company-select-people" />
                                <label className="form-check-label" htmlFor="company-select-people">
                                  Select People
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select className="form-select">
                              <option>Select</option>
                              <option>Active</option>
                              <option>Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light me-2" onClick={(e) => {
                    e.stopPropagation();
                    setShowAddCompanyModal(false);
                  }}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={(e) => {
                    e.stopPropagation();
                    setShowAddCompanyModal(false);
                  }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
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
                    Do you want to delete the lead "{leadToDelete?.name || 'this lead'}"? This action cannot be undone.
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
                  Delete Lead
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

      {/* Footer */}
      <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-2 mt-3" style={{marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px'}}>
        <p className="mb-0" style={{fontSize: '14px', paddingLeft: '24px'}}>2014 - 2025 © DCM.</p>
        <p className="mb-0" style={{fontSize: '14px', paddingRight: '24px'}}>
          Designed & Developed By{" "}
          <a href="javascript:void(0);" className="text-primary" style={{textDecoration: 'none'}}>
            DCM
          </a>
        </p>
      </div>
    </div>
  );
};

export default Leads;
