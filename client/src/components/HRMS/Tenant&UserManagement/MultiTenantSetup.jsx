import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const MultiTenantSetup = () => {
  // ---------------- TENANTS DATA ----------------
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      domain: 'techcorp.hrms.com',
      companySize: 'Large',
      employeeCount: 1250,
      subscriptionPlan: 'Enterprise',
      status: 'active',
      primaryColor: '#1890ff',
      logoUrl: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80',
      contactEmail: 'admin@techcorp.com',
      contactPhone: '+91 9876543210',
      createdAt: '2024-01-15',
      trialEndsAt: '2024-12-31',
      dataUsage: '85%',
      lastActive: '2024-12-01 14:30:00'
    },
    {
      id: 2,
      name: 'Startup Innovations',
      domain: 'startup.hrms.com',
      companySize: 'Small',
      employeeCount: 45,
      subscriptionPlan: 'Professional',
      status: 'active',
      primaryColor: '#52c41a',
      logoUrl: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80',
      contactEmail: 'hr@startup.com',
      contactPhone: '+91 9876543211',
      createdAt: '2024-02-20',
      trialEndsAt: '2024-11-30',
      dataUsage: '45%',
      lastActive: '2024-12-01 09:15:00'
    },
    {
      id: 3,
      name: 'Global Enterprises',
      domain: 'global.hrms.com',
      companySize: 'Enterprise',
      employeeCount: 5000,
      subscriptionPlan: 'Enterprise Plus',
      status: 'suspended',
      primaryColor: '#fa8c16',
      logoUrl: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80',
      contactEmail: 'admin@global.com',
      contactPhone: '+91 9876543212',
      createdAt: '2024-03-10',
      trialEndsAt: '2024-12-15',
      dataUsage: '95%',
      lastActive: '2024-11-28 16:45:00'
    },
    {
      id: 4,
      name: 'Retail Chain Pvt Ltd',
      domain: 'retail.hrms.com',
      companySize: 'Medium',
      employeeCount: 300,
      subscriptionPlan: 'Business',
      status: 'active',
      primaryColor: '#722ed1',
      logoUrl: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80',
      contactEmail: 'support@retail.com',
      contactPhone: '+91 9876543213',
      createdAt: '2024-04-05',
      trialEndsAt: '2025-01-15',
      dataUsage: '60%',
      lastActive: '2024-12-01 11:20:00'
    },
    {
      id: 5,
      name: 'Healthcare Systems',
      domain: 'healthcare.hrms.com',
      companySize: 'Large',
      employeeCount: 800,
      subscriptionPlan: 'Enterprise',
      status: 'pending',
      primaryColor: '#13c2c2',
      logoUrl: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80',
      contactEmail: 'info@healthcare.com',
      contactPhone: '+91 9876543214',
      createdAt: '2024-05-12',
      trialEndsAt: '2025-02-28',
      dataUsage: '25%',
      lastActive: '2024-11-30 10:00:00'
    },
    {
      id: 6,
      name: 'Education Hub',
      domain: 'edu.hrms.com',
      companySize: 'Small',
      employeeCount: 25,
      subscriptionPlan: 'Starter',
      status: 'inactive',
      primaryColor: '#f5222d',
      logoUrl: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80',
      contactEmail: 'contact@eduhub.com',
      contactPhone: '+91 9876543215',
      createdAt: '2024-06-18',
      trialEndsAt: '2024-10-30',
      dataUsage: '15%',
      lastActive: '2024-10-15 14:00:00'
    }
  ]);

  // ---------------- UI STATES ----------------
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedTenant, setSelectedTenant] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ---------------- ADD TENANT STATE ----------------
  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    companySize: 'Small',
    subscriptionPlan: 'Starter',
    contactEmail: '',
    contactPhone: '',
    primaryColor: '#1890ff'
  });

  // ---------------- STATISTICS ----------------
  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === 'active').length,
    pending: tenants.filter(t => t.status === 'pending').length,
    suspended: tenants.filter(t => t.status === 'suspended').length,
    inactive: tenants.filter(t => t.status === 'inactive').length,
    totalEmployees: tenants.reduce((sum, t) => sum + t.employeeCount, 0)
  };

  // ---------------- SEARCH + FILTER + SORT ----------------
  const filteredTenants = tenants
    .filter(t => {
      const searchMatch =
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.domain.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = filterStatus === 'all' || t.status === filterStatus;
      const planMatch = filterPlan === 'all' || t.subscriptionPlan === filterPlan;
      const sizeMatch = filterSize === 'all' || t.companySize === filterSize;

      return searchMatch && statusMatch && planMatch && sizeMatch;
    })
    .sort((a, b) => {
      let A = a[sortBy], B = b[sortBy];

      if (sortBy === 'name') {
        A = A.toLowerCase();
        B = B.toLowerCase();
      }

      if (sortBy === 'employeeCount') {
        A = a.employeeCount;
        B = b.employeeCount;
      }

      if (sortBy === 'createdAt') {
        A = new Date(a.createdAt);
        B = new Date(b.createdAt);
      }

      if (sortOrder === 'asc') return A > B ? 1 : -1;
      else return A < B ? 1 : -1;
    });

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ---------------- CRUD HANDLERS ----------------
  const handleAddTenant = (e) => {
    e.preventDefault();

    const newEntry = {
      ...newTenant,
      id: tenants.length + 1,
      employeeCount: 0,
      status: "pending",
      dataUsage: "0%",
      createdAt: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString(),
      trialEndsAt: "2025-03-31",
      logoUrl: "https://via.placeholder.com/40",
    };

    setTenants([...tenants, newEntry]);
    setShowAddModal(false);

    setNewTenant({
      name: "",
      domain: "",
      companySize: "Small",
      subscriptionPlan: "Starter",
      contactEmail: "",
      contactPhone: "",
      primaryColor: "#1890ff",
    });
  };

  const handleUpdateTenant = (e) => {
    e.preventDefault();

    setTenants(
      tenants.map((t) =>
        t.id === selectedTenant.id ? selectedTenant : t
      )
    );

    setShowEditModal(false);
  };

  const handleDeleteTenant = () => {
    setTenants(tenants.filter((t) => t.id !== selectedTenant.id));
    setShowDeleteModal(false);
  };

  // ---------------- BADGES ----------------
  const getStatusBadge = (status) => {
    const colors = {
      active: "success",
      pending: "warning",
      suspended: "secondary",
      inactive: "danger",
    };

    return (
      <span className={`badge bg-${colors[status]}-subtle text-${colors[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getPlanBadge = (plan) => {
    const color = {
      Starter: "info",
      Professional: "primary",
      Business: "warning",
      Enterprise: "success",
      "Enterprise Plus": "dark",
    }[plan] || "secondary";

    return <span className={`badge bg-${color}-subtle text-${color}`}>{plan}</span>;
  };

  const getSizeBadge = (size) => {
    const color = {
      Small: "info",
      Medium: "primary",
      Large: "warning",
      Enterprise: "danger",
    }[size] || "secondary";

    return <span className={`badge bg-${color}-subtle text-${color}`}>{size}</span>;
  };

  // ---------------- FORMATTERS ----------------
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatDateTime = (date) => new Date(date).toLocaleString();

  // ---------------- SIDEBAR MENU ITEMS ----------------
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'heroicons:home',
      link: '/admin/dashboard',
      active: false
    },
    {
      title: 'Tenant Management',
      icon: 'heroicons:building-office',
      link: '/admin/tenants',
      active: true
    },
    {
      title: 'User Management',
      icon: 'heroicons:users',
      link: '/admin/users'
    },
    {
      title: 'Billing',
      icon: 'heroicons:credit-card',
      link: '/admin/billing'
    },
    {
      title: 'Reports',
      icon: 'heroicons:chart-bar',
      link: '/admin/reports'
    },
    {
      title: 'Settings',
      icon: 'heroicons:cog-6-tooth',
      link: '/admin/settings'
    }
  ];

  // ---------------- USER INFO ----------------
  const userInfo = {
    name: 'Admin User',
    role: 'Super Administrator',
    email: 'admin@hrms.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  };

  return (
    
      <div className="container-fluid p-4">

        {/* ---------------- HEADER ---------------- */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-2">
  <i className="ri-team-line m-2"></i> Multi-Tenant Management
</h5>

            <p className="text-muted">Manage all companies using your HRMS</p>
          </div>

          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setShowAddModal(true)}
          >
            <Icon icon="heroicons:plus" className="me-2" /> Add Tenant
          </button>
        </div>

    <div className="row mb-4" style={{ display: "flex", justifyContent: "space-between" }}>

  <div className="col-12 col-md-2">
    <div className="card text-center p-3 shadow-sm" style={{ minHeight: "110px" }}>
      
         <div className="fw-bold text-secondary-light small">Total Tenants</div>
      <h5 style={{ fontSize: "18px", fontWeight: "600" }}>{stats.total}</h5>
    </div>
  </div>

  <div className="col-12 col-md-2">
    <div className="card text-center p-3 shadow-sm" style={{ minHeight: "110px" }}>

      
         <div className="fw-bold text-secondary-light small">Active</div>
      <h5 style={{ fontSize: "18px", fontWeight: "600" }} className="text-success">{stats.active}</h5>
    </div>
  </div>

  <div className="col-12 col-md-2">
    <div className="card text-center p-3 shadow-sm" style={{ minHeight: "110px" }}>
   
      
         <div className="fw-bold text-secondary-light small">Pending</div>
      <h5 style={{ fontSize: "18px", fontWeight: "600" }} className="text-warning">{stats.pending}</h5>
    </div>
  </div>

  <div className="col-12 col-md-2">
    <div className="card text-center p-3 shadow-sm" style={{ minHeight: "110px" }}>
     
      
         <div className="fw-bold text-secondary-light small">Suspended</div>
      <h5 style={{ fontSize: "18px", fontWeight: "600" }} className="text-secondary">{stats.suspended}</h5>
    </div>
  </div>

  <div className="col-12 col-md-2">
    <div className="card text-center p-3 shadow-sm" style={{ minHeight: "110px" }}>

      
         <div className="fw-bold text-secondary-light small">Total Tenants</div>
      <h5 style={{ fontSize: "18px", fontWeight: "600" }}>{stats.totalEmployees}</h5>
    </div>
  </div>

  <div className="col-12 col-md-2">
    <div className="card text-center p-3 shadow-sm" style={{ minHeight: "110px" }}>

      
         <div className="fw-bold text-secondary-light small">Avg Data Usage</div>
      <h5 style={{ fontSize: "18px", fontWeight: "600" }}>
        {(tenants.reduce((a, t) => a + parseInt(t.dataUsage), 0) / tenants.length).toFixed(1)}%
      </h5>
    </div>
  </div>

</div>


        {/* ---------------- FILTER BAR ---------------- */}
        <div className="card p-3 mb-4">
          <div className="row g-2">

            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search by name or domain..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-2">
              <select className="form-select" value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)}>
                <option value="all">All Plans</option>
                <option value="Starter">Starter</option>
                <option value="Professional">Professional</option>
                <option value="Business">Business</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div className="col-md-2">
              <select className="form-select" value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
                <option value="all">All Sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div className="col-md-2 d-flex gap-2">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="employeeCount">Sort by Employees</option>
                <option value="createdAt">Sort by Created</option>
              </select>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <Icon icon={sortOrder === "asc" ? "heroicons:arrow-up" : "heroicons:arrow-down"} />
              </button>
            </div>

          </div>
        </div>
<div className="card">
  <div className="table-responsive">
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th className="text-center" style={{ minWidth: '200px' }}>Tenant</th>
          <th className="text-center" style={{ minWidth: '100px' }}>Status</th>
          <th className="text-center" style={{ minWidth: '120px' }}>Plan</th>
          <th className="text-center" style={{ minWidth: '100px' }}>Size</th>
          <th className="text-center" style={{ minWidth: '100px' }}>Employees</th>
          <th className="text-center" style={{ minWidth: '80px' }}>Data</th>
          <th className="text-center" style={{ minWidth: '150px' }}>Last Active</th>
          <th className="text-center" style={{ minWidth: '140px' }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {paginatedTenants.map((t) => (
          <tr key={t.id}>
            {/* Tenant */}
            <td>
              <div className="d-flex align-items-center gap-3">
                <img 
                  src={t.logoUrl} 
                  alt={t.name} 
                  className="rounded-circle border" 
                  width="40" 
                  height="40" 
                  style={{ objectFit: 'cover' }}
                />
                <div>
                  <strong className="d-block">{t.name}</strong>
                  <small className="text-muted">{t.domain}</small>
                </div>
              </div>
            </td>

            {/* Status */}
            <td className="text-center">{getStatusBadge(t.status)}</td>

            {/* Subscription Plan */}
            <td className="text-center">{getPlanBadge(t.subscriptionPlan)}</td>

            {/* Size */}
            <td className="text-center">{getSizeBadge(t.companySize)}</td>

            {/* Employees */}
            <td className="text-center">
              <span className="fw-semibold">{t.employeeCount.toLocaleString()}</span>
            </td>

            {/* Data Usage */}
            <td>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <div className="progress flex-grow-1" style={{ height: '6px', width: '60px' }}>
                  <div 
                    className="progress-bar bg-info" 
                    role="progressbar" 
                    style={{ width: t.dataUsage }}
                    aria-valuenow={parseInt(t.dataUsage)} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="small">{t.dataUsage}</span>
              </div>
            </td>

            {/* Last Active */}
            <td className="text-center">
              <small>{formatDateTime(t.lastActive)}</small>
            </td>

            {/* Actions */}
            <td className="text-center">
              <div className="btn-group btn-group-sm">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setSelectedTenant(t);
                    setShowViewModal(true);
                  }}
                  title="View"
                >
                  <Icon icon="heroicons:eye" width="16" />
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setSelectedTenant({ ...t });
                    setShowEditModal(true);
                  }}
                  title="Edit"
                >
                  <Icon icon="heroicons:pencil-square" width="16" />
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setSelectedTenant(t);
                    setShowDeleteModal(true);
                  }}
                  title="Delete"
                >
                  <Icon icon="heroicons:trash" width="16" />
                </button>
              </div>
            </td>
          </tr>
        ))}

        {paginatedTenants.length === 0 && (
          <tr>
            <td colSpan="8" className="text-center py-5 text-muted">
              <Icon icon="heroicons:magnifying-glass" width="24" className="mb-2" />
              <p className="mb-0">No tenants found matching your criteria</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* ---------------- PAGINATION ---------------- */}
  {totalPages > 1 && (
    <div className="card-footer d-flex justify-content-between align-items-center">
      <div className="text-muted small">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTenants.length)} of {filteredTenants.length} tenants
      </div>
      
      <nav>
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button 
              className="page-link" 
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              <Icon icon="heroicons:chevron-left" width="14" />
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => {
            // Show limited page numbers
            if (
              i === 0 || 
              i === totalPages - 1 || 
              (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
              return (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button 
                    className="page-link" 
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            }
            
            // Show ellipsis
            if (i === 1 || i === totalPages - 2) {
              return (
                <li key={i} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              );
            }
            
            return null;
          })}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button 
              className="page-link" 
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              <Icon icon="heroicons:chevron-right" width="14" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )}
</div>

        {/* ---------------------------------------------------------- */}
        {/* ------------------------- MODALS -------------------------- */}
        {/* ---------------------------------------------------------- */}

        {/* ---------------- ADD MODAL ---------------- */}
        {showAddModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Add New Tenant</h5>
                  <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>

                <form onSubmit={handleAddTenant}>
                  <div className="modal-body">

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newTenant.name}
                          onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Domain</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newTenant.domain}
                          onChange={(e) => setNewTenant({ ...newTenant, domain: e.target.value })}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Company Size</label>
                        <select
                          className="form-select"
                          value={newTenant.companySize}
                          onChange={(e) =>
                            setNewTenant({ ...newTenant, companySize: e.target.value })
                          }
                        >
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                          <option>Enterprise</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Subscription Plan</label>
                        <select
                          className="form-select"
                          value={newTenant.subscriptionPlan}
                          onChange={(e) =>
                            setNewTenant({ ...newTenant, subscriptionPlan: e.target.value })
                          }
                        >
                          <option>Starter</option>
                          <option>Professional</option>
                          <option>Business</option>
                          <option>Enterprise</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Brand Color</label>
                        <input
                          type="color"
                          className="form-control form-control-color"
                          value={newTenant.primaryColor}
                          onChange={(e) =>
                            setNewTenant({ ...newTenant, primaryColor: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Contact Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={newTenant.contactEmail}
                          onChange={(e) =>
                            setNewTenant({ ...newTenant, contactEmail: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Contact Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newTenant.contactPhone}
                          onChange={(e) =>
                            setNewTenant({ ...newTenant, contactPhone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Add Tenant
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        )}

        {/* ---------------- EDIT MODAL ---------------- */}
        {showEditModal && selectedTenant && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>Edit Tenant</h5>
                  <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>

                <form onSubmit={handleUpdateTenant}>
                  <div className="modal-body">

                    <div className="row g-3">

                      <div className="col-md-6">
                        <label className="form-label">Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTenant.name}
                          onChange={(e) =>
                            setSelectedTenant({ ...selectedTenant, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Domain</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTenant.domain}
                          onChange={(e) =>
                            setSelectedTenant({ ...selectedTenant, domain: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Company Size</label>
                        <select
                          className="form-select"
                          value={selectedTenant.companySize}
                          onChange={(e) =>
                            setSelectedTenant({
                              ...selectedTenant,
                              companySize: e.target.value,
                            })
                          }
                        >
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                          <option>Enterprise</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Plan</label>
                        <select
                          className="form-select"
                          value={selectedTenant.subscriptionPlan}
                          onChange={(e) =>
                            setSelectedTenant({
                              ...selectedTenant,
                              subscriptionPlan: e.target.value,
                            })
                          }
                        >
                          <option>Starter</option>
                          <option>Professional</option>
                          <option>Business</option>
                          <option>Enterprise</option>
                          <option>Enterprise Plus</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Brand Color</label>
                        <input
                          type="color"
                          className="form-control form-control-color"
                          value={selectedTenant.primaryColor}
                          onChange={(e) =>
                            setSelectedTenant({
                              ...selectedTenant,
                              primaryColor: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={selectedTenant.contactEmail}
                          onChange={(e) =>
                            setSelectedTenant({
                              ...selectedTenant,
                              contactEmail: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedTenant.contactPhone}
                          onChange={(e) =>
                            setSelectedTenant({
                              ...selectedTenant,
                              contactPhone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Save Changes
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        )}

        {/* ---------------- VIEW MODAL ---------------- */}
        {showViewModal && selectedTenant && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-md">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>Tenant Details</h5>
                  <button className="btn-close" onClick={() => setShowViewModal(false)}></button>
                </div>

                <div className="modal-body">

                  <div className="text-center mb-3">
                    <img
                      src={selectedTenant.logoUrl}
                      alt=""
                      width={60}
                      className="rounded-circle border"
                    />
                    <h4 className="mt-2">{selectedTenant.name}</h4>
                    <small className="text-muted">{selectedTenant.domain}</small>
                  </div>

                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Status:</strong> {getStatusBadge(selectedTenant.status)}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Employees:</strong> {selectedTenant.employeeCount}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Created:</strong> {formatDate(selectedTenant.createdAt)}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Last Active:</strong> {formatDateTime(selectedTenant.lastActive)}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Data Usage:</strong> {selectedTenant.dataUsage}
                    </li>
                  </ul>

                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ---------------- DELETE MODAL ---------------- */}
        {showDeleteModal && selectedTenant && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">

                <div className="modal-header">
                  <h5>Delete Tenant</h5>
                  <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>

                <div className="modal-body text-center">
                  <p>Are you sure you want to delete</p>
                  <h5 className="text-danger fw-bold">{selectedTenant.name}</h5>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={handleDeleteTenant}>
                    Delete
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

  );
};

export default MultiTenantSetup;