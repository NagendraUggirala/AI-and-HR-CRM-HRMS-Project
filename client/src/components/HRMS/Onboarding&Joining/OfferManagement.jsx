import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const OfferManagement = () => {
  // State management
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    offerType: 'all'
  });
  const [activeTab, setActiveTab] = useState('all');

  // Offer status types
  const OFFER_STATUS = {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    SENT: 'sent',
    ACCEPTED: 'accepted',
    DECLINED: 'declined',
    EXPIRED: 'expired',
    WITHDRAWN: 'withdrawn'
  };

  // Departments
  const DEPARTMENTS = ['Engineering', 'Sales', 'Human Resources', 'Marketing', 'Finance', 'Operations', 'IT'];

  // Offer types
  const OFFER_TYPES = ['Full-time', 'Contract', 'Internship', 'Consultant'];

  // Templates
  const TEMPLATES = [
    { id: 'standard', name: 'Standard Offer Letter' },
    { id: 'executive', name: 'Executive Offer Letter' },
    { id: 'intern', name: 'Internship Offer Letter' },
    { id: 'custom', name: 'Custom Template' }
  ];

  // Approval workflows
  const APPROVAL_WORKFLOWS = [
    { id: 'direct', name: 'Direct Manager → HR' },
    { id: 'multi', name: 'Manager → HR Head → CEO' },
    { id: 'auto', name: 'Auto-approval (Below ₹10L)' }
  ];

  // Menu items and user info
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'heroicons:home',
      link: '/dashboard'
    },
    {
      title: 'Offer Management',
      icon: 'heroicons:document-text',
      link: '/offers',
      active: true
    },
    {
      title: 'Candidates',
      icon: 'heroicons:users',
      link: '/candidates'
    },
    {
      title: 'Analytics',
      icon: 'heroicons:chart-bar',
      link: '/analytics'
    },
    {
      title: 'Settings',
      icon: 'heroicons:cog-6-tooth',
      link: '/settings'
    }
  ];

  const userInfo = {
    name: 'HR Manager',
    role: 'Human Resources',
    email: 'hr@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HRManager'
  };

  // Form data
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    position: '',
    department: 'Engineering',
    grade: 'L2',
    experience: '',
    noticePeriod: '30 days',
    candidateSource: 'LinkedIn',
    ctc: '',
    ctcBreakup: {
      basic: '',
      hra: '',
      conveyance: '',
      specialAllowance: '',
      performanceBonus: ''
    },
    joiningDate: '',
    offerType: 'Full-time',
    template: 'standard',
    terms: `1. This offer is subject to background verification.
2. You will be on probation for 3 months.
3. Standard company policies apply.
4. Please acknowledge acceptance by the expiry date.`,
    approvalWorkflow: 'direct',
    expiryDate: '',
    notes: '',
    interviewSummary: '',
    salaryNegotiationHistory: '',
    enableBGV: true,
    requireDigitalSignature: false
  });

  // Initialize sample data
  useEffect(() => {
    const sampleOffers = [
      {
        id: 1,
        candidateName: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 9876543210',
        position: 'Software Engineer',
        department: 'Engineering',
        grade: 'L2',
        ctc: '12,00,000',
        joiningDate: '2024-06-01',
        offerStatus: OFFER_STATUS.DRAFT,
        createdDate: '2024-03-15',
        approvedBy: 'HR Manager',
        candidateSource: 'LinkedIn',
        experience: '3 years',
        noticePeriod: '30 days',
        bgvStatus: 'pending',
        offerType: 'Full-time',
        template: 'Standard',
        expiryDate: '2024-03-30',
        lastModified: '2024-03-15 14:30',
        notes: 'Strong backend skills in Node.js and Python',
        interviewSummary: 'Performed well in technical rounds',
        salaryNegotiation: 'Initial offer: ₹11,00,000 | Final: ₹12,00,000',
        referenceCheck: 'Completed - Positive feedback',
        attachments: ['resume.pdf', 'certificates.zip'],
        history: [
          { action: 'Offer Created', by: 'HR Admin', date: '2024-03-15 10:00', status: OFFER_STATUS.DRAFT },
          { action: 'Technical Approval', by: 'Tech Lead', date: '2024-03-15 11:30', status: OFFER_STATUS.PENDING_APPROVAL }
        ],
        ctcBreakup: {
          basic: '6,00,000',
          hra: '2,40,000',
          conveyance: '19,200',
          specialAllowance: '3,40,800'
        }
      },
      {
        id: 2,
        candidateName: 'Priya Singh',
        email: 'priya.singh@example.com',
        phone: '+91 9876543211',
        position: 'HR Executive',
        department: 'Human Resources',
        grade: 'L1',
        ctc: '6,50,000',
        joiningDate: '2024-05-15',
        offerStatus: OFFER_STATUS.SENT,
        createdDate: '2024-03-10',
        approvedBy: 'HR Head',
        candidateSource: 'Referral',
        experience: '2 years',
        noticePeriod: '60 days',
        bgvStatus: 'in_progress',
        offerType: 'Full-time',
        template: 'Executive',
        expiryDate: '2024-03-25',
        lastModified: '2024-03-12 11:20',
        notes: 'Internal referral from Manager',
        interviewSummary: 'Excellent communication skills',
        salaryNegotiation: 'No negotiation',
        referenceCheck: 'In progress',
        attachments: ['resume.pdf'],
        history: [
          { action: 'Offer Created', by: 'HR Admin', date: '2024-03-10 09:00', status: OFFER_STATUS.DRAFT },
          { action: 'HR Approval', by: 'HR Head', date: '2024-03-11 15:30', status: OFFER_STATUS.APPROVED },
          { action: 'Sent to Candidate', by: 'System', date: '2024-03-12 11:20', status: OFFER_STATUS.SENT }
        ],
        ctcBreakup: {
          basic: '3,25,000',
          hra: '1,30,000',
          conveyance: '19,200',
          specialAllowance: '1,75,800'
        }
      },
      {
        id: 3,
        candidateName: 'Amit Patel',
        email: 'amit.patel@example.com',
        phone: '+91 9876543212',
        position: 'Sales Manager',
        department: 'Sales',
        grade: 'L3',
        ctc: '18,00,000',
        joiningDate: '2024-07-01',
        offerStatus: OFFER_STATUS.ACCEPTED,
        createdDate: '2024-03-05',
        approvedBy: 'CEO',
        candidateSource: 'Naukri',
        experience: '8 years',
        noticePeriod: '90 days',
        bgvStatus: 'completed',
        offerType: 'Full-time',
        template: 'Executive',
        expiryDate: '2024-03-20',
        lastModified: '2024-03-18 16:45',
        notes: 'Accepted with revised CTC. Background verification passed.',
        interviewSummary: 'Strong sales track record',
        salaryNegotiation: 'Initial: ₹16,00,000 | Final: ₹18,00,000',
        referenceCheck: 'Completed - Excellent',
        attachments: ['resume.pdf', 'certificates.pdf', 'offer_acceptance.pdf'],
        history: [
          { action: 'Offer Created', by: 'HR Admin', date: '2024-03-05 11:00', status: OFFER_STATUS.DRAFT },
          { action: 'Revised Offer', by: 'HR Manager', date: '2024-03-08 14:00', status: OFFER_STATUS.PENDING_APPROVAL },
          { action: 'CEO Approval', by: 'CEO', date: '2024-03-10 10:00', status: OFFER_STATUS.APPROVED },
          { action: 'Sent to Candidate', by: 'System', date: '2024-03-10 11:00', status: OFFER_STATUS.SENT },
          { action: 'Accepted by Candidate', by: 'Candidate', date: '2024-03-15 09:30', status: OFFER_STATUS.ACCEPTED }
        ],
        ctcBreakup: {
          basic: '9,00,000',
          hra: '3,60,000',
          conveyance: '19,200',
          specialAllowance: '5,20,800',
          performanceBonus: '3,00,000'
        }
      },
      {
        id: 4,
        candidateName: 'Neha Gupta',
        email: 'neha.gupta@example.com',
        phone: '+91 9876543213',
        position: 'Marketing Intern',
        department: 'Marketing',
        grade: 'Intern',
        ctc: '3,00,000',
        joiningDate: '2024-04-01',
        offerStatus: OFFER_STATUS.DECLINED,
        createdDate: '2024-03-01',
        approvedBy: 'Marketing Head',
        candidateSource: 'Campus',
        experience: 'Fresher',
        noticePeriod: '15 days',
        bgvStatus: 'not_started',
        offerType: 'Internship',
        template: 'Intern',
        expiryDate: '2024-03-15',
        lastModified: '2024-03-10 14:00',
        notes: 'Candidate declined for better offer elsewhere',
        interviewSummary: 'Good academic record',
        salaryNegotiation: 'No negotiation',
        referenceCheck: 'Not required',
        attachments: ['resume.pdf'],
        history: [
          { action: 'Offer Created', by: 'HR Admin', date: '2024-03-01 09:00', status: OFFER_STATUS.DRAFT },
          { action: 'Department Approval', by: 'Marketing Head', date: '2024-03-03 16:00', status: OFFER_STATUS.APPROVED },
          { action: 'Sent to Candidate', by: 'System', date: '2024-03-04 10:00', status: OFFER_STATUS.SENT },
          { action: 'Declined by Candidate', by: 'Candidate', date: '2024-03-10 14:00', status: OFFER_STATUS.DECLINED }
        ],
        ctcBreakup: {
          stipend: '25,000'
        }
      }
    ];

    setTimeout(() => {
      setOffers(sampleOffers);
      setLoading(false);
    }, 500);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newOffer = {
      id: selectedOffer ? selectedOffer.id : offers.length + 1,
      ...formData,
      offerStatus: selectedOffer ? selectedOffer.offerStatus : OFFER_STATUS.DRAFT,
      createdDate: selectedOffer ? selectedOffer.createdDate : new Date().toISOString().split('T')[0],
      approvedBy: selectedOffer ? selectedOffer.approvedBy : 'HR Admin',
      lastModified: new Date().toISOString(),
      bgvStatus: 'pending',
      history: selectedOffer ? selectedOffer.history : [
        { 
          action: 'Offer Created', 
          by: 'HR Admin', 
          date: new Date().toISOString(), 
          status: OFFER_STATUS.DRAFT 
        }
      ]
    };

    if (selectedOffer) {
      // Update existing offer
      setOffers(offers.map(o => o.id === selectedOffer.id ? newOffer : o));
    } else {
      // Create new offer
      setOffers([newOffer, ...offers]);
    }
    
    setShowForm(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      candidateName: '',
      email: '',
      phone: '',
      position: '',
      department: 'Engineering',
      grade: 'L2',
      experience: '',
      noticePeriod: '30 days',
      candidateSource: 'LinkedIn',
      ctc: '',
      ctcBreakup: {
        basic: '',
        hra: '',
        conveyance: '',
        specialAllowance: '',
        performanceBonus: ''
      },
      joiningDate: '',
      offerType: 'Full-time',
      template: 'standard',
      terms: `1. This offer is subject to background verification.
2. You will be on probation for 3 months.
3. Standard company policies apply.
4. Please acknowledge acceptance by the expiry date.`,
      approvalWorkflow: 'direct',
      expiryDate: '',
      notes: '',
      interviewSummary: '',
      salaryNegotiationHistory: '',
      enableBGV: true,
      requireDigitalSignature: false
    });
    setSelectedOffer(null);
  };

  // CRUD Operations
  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setFormData({
      ...offer,
      ctcBreakup: offer.ctcBreakup || {
        basic: '',
        hra: '',
        conveyance: '',
        specialAllowance: '',
        performanceBonus: ''
      }
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== id));
    }
  };

  const handleSendOffer = (offer) => {
    const updatedOffers = offers.map(o =>
      o.id === offer.id ? { 
        ...o, 
        offerStatus: OFFER_STATUS.SENT,
        history: [...o.history, {
          action: 'Sent to Candidate',
          by: 'System',
          date: new Date().toISOString(),
          status: OFFER_STATUS.SENT
        }]
      } : o
    );
    setOffers(updatedOffers);
    alert(`Offer sent to ${offer.candidateName}`);
  };

  const handleAcceptOffer = (offer) => {
    const updatedOffers = offers.map(o =>
      o.id === offer.id ? { 
        ...o, 
        offerStatus: OFFER_STATUS.ACCEPTED,
        history: [...o.history, {
          action: 'Accepted by Candidate',
          by: 'Candidate',
          date: new Date().toISOString(),
          status: OFFER_STATUS.ACCEPTED
        }]
      } : o
    );
    setOffers(updatedOffers);
  };

  const handleWithdrawOffer = (offer) => {
    const updatedOffers = offers.map(o =>
      o.id === offer.id ? { 
        ...o, 
        offerStatus: OFFER_STATUS.WITHDRAWN,
        history: [...o.history, {
          action: 'Offer Withdrawn',
          by: 'HR Admin',
          date: new Date().toISOString(),
          status: OFFER_STATUS.WITHDRAWN
        }]
      } : o
    );
    setOffers(updatedOffers);
  };

  // Filter offers
  const filteredOffers = offers.filter(offer => {
    const matchesSearch = 
      offer.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || offer.offerStatus === filters.status;
    const matchesDepartment = filters.department === 'all' || offer.department === filters.department;
    const matchesOfferType = filters.offerType === 'all' || offer.offerType === filters.offerType;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesOfferType;
  });

  // Get offers by status for tabs
  const getOffersByStatus = (status) => {
    if (status === 'all') return filteredOffers;
    return filteredOffers.filter(offer => offer.offerStatus === status);
  };

  // Get status color and text
  const getStatusConfig = (status) => {
    switch(status) {
      case OFFER_STATUS.DRAFT:
        return { color: 'primary', text: 'Draft', icon: 'heroicons:document-text' };
      case OFFER_STATUS.PENDING_APPROVAL:
        return { color: 'warning', text: 'Pending Approval', icon: 'heroicons:clock' };
      case OFFER_STATUS.APPROVED:
        return { color: 'info', text: 'Approved', icon: 'heroicons:check-circle' };
      case OFFER_STATUS.SENT:
        return { color: 'secondary', text: 'Sent', icon: 'heroicons:paper-airplane' };
      case OFFER_STATUS.ACCEPTED:
        return { color: 'success', text: 'Accepted', icon: 'heroicons:check-badge' };
      case OFFER_STATUS.DECLINED:
        return { color: 'danger', text: 'Declined', icon: 'heroicons:x-circle' };
      case OFFER_STATUS.EXPIRED:
        return { color: 'dark', text: 'Expired', icon: 'heroicons:clock' };
      case OFFER_STATUS.WITHDRAWN:
        return { color: 'danger', text: 'Withdrawn', icon: 'heroicons:arrow-uturn-left' };
      default:
        return { color: 'secondary', text: 'Unknown', icon: 'heroicons:question-mark-circle' };
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    return {
      total: offers.length,
      draft: offers.filter(o => o.offerStatus === OFFER_STATUS.DRAFT).length,
      pending: offers.filter(o => o.offerStatus === OFFER_STATUS.PENDING_APPROVAL).length,
      sent: offers.filter(o => o.offerStatus === OFFER_STATUS.SENT).length,
      accepted: offers.filter(o => o.offerStatus === OFFER_STATUS.ACCEPTED).length,
      declined: offers.filter(o => o.offerStatus === OFFER_STATUS.DECLINED).length,
      expired: offers.filter(o => o.offerStatus === OFFER_STATUS.EXPIRED).length,
    };
  };

  // Calculate acceptance rate
  const calculateAcceptanceRate = () => {
    const stats = calculateStats();
    return stats.total > 0 ? ((stats.accepted / stats.total) * 100).toFixed(1) : '0.0';
  };

  // Render CTC breakup
  const renderCTCBreakup = (breakup) => {
    if (!breakup) return null;
    
    return (
      <div className="mt-2 small">
        {Object.entries(breakup).map(([key, value]) => (
          <div key={key} className="d-flex justify-content-between">
            <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
            <span className="fw-bold">₹{value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Render offer history
  const renderHistory = (history) => {
    if (!history || history.length === 0) return null;
    
    return (
      <div className="mt-2 small">
        {history.slice(-3).map((item, index) => (
          <div key={index} className="text-muted mb-1">
            <small>{item.action} by {item.by} at {new Date(item.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    );
  };

  // Calculate stats and acceptance rate for use in JSX
  const stats = calculateStats();
  const acceptanceRate = calculateAcceptanceRate();

  return (
    <div 
      menuItems={menuItems} 
      userInfo={userInfo}
      appName="Offer Management System"
    >
      <div className="container-fluid">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-2 d-flex align-items-center">
              <Icon icon="heroicons:document-text" className="me-2" width={24} height={24} />
              Offer Management
            </h5>
            <p className="text-muted">Manage candidate offers and onboarding process</p>
          </div>
          <button 
            className="btn btn-primary d-flex align-items-center"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Icon icon="heroicons:plus" className="me-2" />
            Create New Offer
          </button>
        </div>

        {/* Statistics Dashboard */}
        <div className="row g-3 mb-4">
          <div className="col-xl-2 col-md-4 col-sm-6">
            <div className="card border shadow-sm">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary small">Total Offers</div>
                <div className="fw-bold fs-4 text-primary">{stats.total}</div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-sm-6">
            <div className="card border shadow-sm">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary small">Draft</div>
                <div className="fw-bold fs-4 text-primary">{stats.draft}</div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-sm-6">
            <div className="card border shadow-sm">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary small">Pending Approval</div>
                <div className="fw-bold fs-4 text-warning">{stats.pending}</div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-sm-6">
            <div className="card border shadow-sm">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary small">Sent</div>
                <div className="fw-bold fs-4 text-secondary">{stats.sent}</div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-sm-6">
            <div className="card border shadow-sm">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary small">Accepted</div>
                <div className="fw-bold fs-4 text-success">{stats.accepted}</div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-sm-6">
            <div className="card border shadow-sm">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary small">Declined</div>
                <div className="fw-bold fs-4 text-danger">{stats.declined}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="card border shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 mb-3">
              {['all', ...Object.values(OFFER_STATUS)].map(status => {
                const statusConfig = status === 'all' ? 
                  { color: 'primary', text: 'All Offers', icon: 'heroicons:queue-list' } : 
                  getStatusConfig(status);
                
                return (
                  <button
                    key={status}
                    className={`btn btn-sm d-flex align-items-center ${
                      activeTab === status ? `btn-${statusConfig.color}` : 'btn-outline-secondary'
                    }`}
                    onClick={() => setActiveTab(status)}
                  >
                    <Icon icon={statusConfig.icon} className="me-1" />
                    {status === 'all' ? 'All Offers' : statusConfig.text}
                    {status !== 'all' && (
                      <span className="badge bg-light text-dark ms-1">
                        {offers.filter(o => o.offerStatus === status).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="row g-3">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text">
                    <Icon icon="heroicons:magnifying-glass" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search candidates, position, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="col-md-2">
                <select 
                  className="form-select"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Status</option>
                  {Object.entries(OFFER_STATUS).map(([key, value]) => (
                    <option key={value} value={value}>
                      {key.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={filters.offerType}
                  onChange={(e) => setFilters({...filters, offerType: e.target.value})}
                >
                  <option value="all">All Offer Types</option>
                  {OFFER_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Table */}
        <div className="card border shadow-sm mb-4">
          <div className="card-body">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading offers...</p>
              </div>
            ) : getOffersByStatus(activeTab).length === 0 ? (
              <div className="text-center py-4">
                <Icon icon="heroicons:document-magnifying-glass" className="text-muted fs-1 mb-3" />
                <p className="text-muted">No offers found</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Position & Department</th>
                      <th>Offer Details</th>
                      <th>Status & Timeline</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOffersByStatus(activeTab).map(offer => {
                      const statusConfig = getStatusConfig(offer.offerStatus);
                      
                      return (
                        <tr key={offer.id}>
                          <td>
                            <div className="d-flex align-items-start gap-2">
                              <div 
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  backgroundColor: '#e6f7ff',
                                  color: '#1890ff',
                                  fontWeight: 'bold'
                                }}
                              >
                                {offer.candidateName.charAt(0)}
                              </div>
                              <div>
                                <div className="fw-bold">{offer.candidateName}</div>
                                <div className="small text-muted">
                                  <div>📧 {offer.email}</div>
                                  <div>📱 {offer.phone}</div>
                                  <div className="mt-1">Source: {offer.candidateSource}</div>
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td>
                            <div>
                              <div className="fw-bold">{offer.position}</div>
                              <div className="text-muted">{offer.department}</div>
                              <div className="small">
                                Grade: {offer.grade} | Exp: {offer.experience}
                              </div>
                            </div>
                          </td>
                          
                          <td>
                            <div>
                              <div className="fw-bold text-success">₹{offer.ctc}</div>
                              <div className="small text-muted">
                                {offer.offerType} | Join: {offer.joiningDate}
                              </div>
                              {renderCTCBreakup(offer.ctcBreakup)}
                            </div>
                          </td>
                          
                          <td>
                            <div>
                              <span className={`badge bg-${statusConfig.color} d-inline-flex align-items-center gap-1`}>
                                <Icon icon={statusConfig.icon} />
                                {statusConfig.text}
                              </span>
                              {renderHistory(offer.history)}
                            </div>
                          </td>
                          
                          <td>
                            <div className="d-flex flex-column gap-1">
                              <button 
                                className="btn btn-sm btn-outline-info d-flex align-items-center justify-content-center"
                                onClick={() => {
                                  setSelectedOffer(offer);
                                  setShowPreview(true);
                                }}
                                title="View Details"
                              >
                                <Icon icon="heroicons:eye" />
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
                                onClick={() => handleEdit(offer)}
                                disabled={[OFFER_STATUS.ACCEPTED, OFFER_STATUS.DECLINED, OFFER_STATUS.WITHDRAWN].includes(offer.offerStatus)}
                                title="Edit Offer"
                              >
                                <Icon icon="heroicons:pencil-square" />
                              </button>
                              {offer.offerStatus === OFFER_STATUS.DRAFT || offer.offerStatus === OFFER_STATUS.APPROVED ? (
                                <button 
                                  className="btn btn-sm btn-secondary d-flex align-items-center justify-content-center"
                                  onClick={() => handleSendOffer(offer)}
                                  title="Send Offer"
                                >
                                  <Icon icon="heroicons:paper-airplane" />
                                </button>
                              ) : null}
                              {offer.offerStatus === OFFER_STATUS.SENT ? (
                                <button 
                                  className="btn btn-sm btn-success d-flex align-items-center justify-content-center"
                                  onClick={() => handleAcceptOffer(offer)}
                                  title="Mark as Accepted"
                                >
                                  <Icon icon="heroicons:check-badge" />
                                </button>
                              ) : null}
                              {![OFFER_STATUS.ACCEPTED, OFFER_STATUS.WITHDRAWN].includes(offer.offerStatus) && (
                                <button 
                                  className="btn btn-sm btn-warning d-flex align-items-center justify-content-center"
                                  onClick={() => handleWithdrawOffer(offer)}
                                  title="Withdraw Offer"
                                >
                                  <Icon icon="heroicons:arrow-uturn-left" />
                                </button>
                              )}
                              <button 
                                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                                onClick={() => handleDelete(offer.id)}
                                title="Delete Offer"
                                disabled={offer.offerStatus === OFFER_STATUS.ACCEPTED}
                              >
                                <Icon icon="heroicons:trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="card border shadow-sm">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Offer Analytics</h6>
            <div className="row g-3">
              <div className="col-md-3">
                <div className="card border">
                  <div className="card-body">
                    <div className="fw-bold text-secondary small">Acceptance Rate</div>
                    <div className="fw-bold fs-4 text-success">{acceptanceRate}%</div>
                    <div className="progress mt-2" style={{ height: '6px' }}>
                      <div 
                        className="progress-bar bg-success"
                        style={{ width: `${acceptanceRate}%` }}
                      ></div>
                    </div>
                    <small className="text-muted">
                      {stats.accepted} accepted out of {stats.total} offers
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card border">
                  <div className="card-body">
                    <div className="fw-bold text-secondary small">Average Time to Accept</div>
                    <div className="fw-bold fs-4 text-info">5.2 days</div>
                    <small className="text-muted">From offer sent to acceptance</small>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card border">
                  <div className="card-body">
                    <div className="fw-bold text-secondary small">Top Department</div>
                    <div className="fw-bold fs-4 text-primary">Engineering</div>
                    <small className="text-muted">Most offers extended</small>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card border">
                  <div className="card-body">
                    <div className="fw-bold text-secondary small">Monthly Trend</div>
                    <div className="fw-bold fs-4 text-success">+15%</div>
                    <small className="text-muted">vs previous month</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create/Edit Offer Modal - FIXED WIDTH */}
        {showForm && (
          <div 
            className="modal fade show d-block" 
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1050
            }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header bg-light">
                  <h5 className="modal-title d-flex align-items-center">
                    <Icon icon="heroicons:document-plus" className="me-2" />
                    {selectedOffer ? 'Edit Offer' : 'Create New Offer'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  ></button>
                </div>
                
                <div className="modal-body">
                  <form onSubmit={handleSubmit} id="offerForm">
                    {/* Step 1: Candidate Information */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 border-bottom pb-2 d-flex align-items-center">
                        <span className="badge bg-primary me-2">1</span>
                        <Icon icon="heroicons:user" className="me-2" />
                        Candidate Information
                      </h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Candidate Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="candidateName"
                            value={formData.candidateName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Email <span className="text-danger">*</span></label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Phone <span className="text-danger">*</span></label>
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Candidate Source</label>
                          <select
                            className="form-select"
                            name="candidateSource"
                            value={formData.candidateSource}
                            onChange={handleInputChange}
                          >
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referral">Referral</option>
                            <option value="Naukri">Naukri</option>
                            <option value="Campus">Campus</option>
                            <option value="AngelList">AngelList</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Position <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Department <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                          >
                            {DEPARTMENTS.map(dept => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Grade <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="Intern">Intern</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="L4">L4</option>
                          </select>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Experience</label>
                          <input
                            type="text"
                            className="form-control"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="e.g., 3 years"
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Notice Period</label>
                          <select
                            className="form-select"
                            name="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleInputChange}
                          >
                            <option value="15 days">15 days</option>
                            <option value="30 days">30 days</option>
                            <option value="60 days">60 days</option>
                            <option value="90 days">90 days</option>
                            <option value="Immediate">Immediate</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Step 2: Offer Details */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3 border-bottom pb-2 d-flex align-items-center">
                        <span className="badge bg-primary me-2">2</span>
                        <Icon icon="heroicons:currency-dollar" className="me-2" />
                        Offer Details
                      </h6>
                      <div className="row g-3 mb-4">
                        <div className="col-md-6">
                          <label className="form-label">CTC (₹) <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="ctc"
                            value={formData.ctc}
                            onChange={handleInputChange}
                            required
                            placeholder="12,00,000"
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Joining Date <span className="text-danger">*</span></label>
                          <input
                            type="date"
                            className="form-control"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Offer Type</label>
                          <select
                            className="form-select"
                            name="offerType"
                            value={formData.offerType}
                            onChange={handleInputChange}
                          >
                            {OFFER_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Template</label>
                          <select
                            className="form-select"
                            name="template"
                            value={formData.template}
                            onChange={handleInputChange}
                          >
                            {TEMPLATES.map(template => (
                              <option key={template.id} value={template.id}>{template.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Expiry Date <span className="text-danger">*</span></label>
                          <input
                            type="date"
                            className="form-control"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="col-md-6">
                          <label className="form-label">Approval Workflow</label>
                          <select
                            className="form-select"
                            name="approvalWorkflow"
                            value={formData.approvalWorkflow}
                            onChange={handleInputChange}
                          >
                            {APPROVAL_WORKFLOWS.map(workflow => (
                              <option key={workflow.id} value={workflow.id}>{workflow.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      {/* CTC Breakup */}
                      <div className="mb-4">
                        <h6 className="fw-bold mb-3">CTC Breakup</h6>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label">Basic Salary</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ctcBreakup.basic"
                              value={formData.ctcBreakup.basic}
                              onChange={handleInputChange}
                              placeholder="6,00,000"
                            />
                          </div>
                          
                          <div className="col-md-4">
                            <label className="form-label">HRA</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ctcBreakup.hra"
                              value={formData.ctcBreakup.hra}
                              onChange={handleInputChange}
                              placeholder="2,40,000"
                            />
                          </div>
                          
                          <div className="col-md-4">
                            <label className="form-label">Conveyance</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ctcBreakup.conveyance"
                              value={formData.ctcBreakup.conveyance}
                              onChange={handleInputChange}
                              placeholder="19,200"
                            />
                          </div>
                          
                          <div className="col-md-4">
                            <label className="form-label">Special Allowance</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ctcBreakup.specialAllowance"
                              value={formData.ctcBreakup.specialAllowance}
                              onChange={handleInputChange}
                              placeholder="3,40,800"
                            />
                          </div>
                          
                          <div className="col-md-4">
                            <label className="form-label">Performance Bonus</label>
                            <input
                              type="text"
                              className="form-control"
                              name="ctcBreakup.performanceBonus"
                              value={formData.ctcBreakup.performanceBonus}
                              onChange={handleInputChange}
                              placeholder="3,00,000"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional Information */}
                      <div className="mb-4">
                        <label className="form-label">Interview Summary</label>
                        <textarea
                          className="form-control"
                          name="interviewSummary"
                          value={formData.interviewSummary}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Candidate performance in interviews..."
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label">Salary Negotiation History</label>
                        <textarea
                          className="form-control"
                          name="salaryNegotiationHistory"
                          value={formData.salaryNegotiationHistory}
                          onChange={handleInputChange}
                          rows="2"
                          placeholder="Initial offer: ₹X | Final: ₹Y"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label">Notes</label>
                        <textarea
                          className="form-control"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Any special instructions or notes..."
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label">Terms & Conditions</label>
                        <textarea
                          className="form-control"
                          name="terms"
                          value={formData.terms}
                          onChange={handleInputChange}
                          rows="5"
                        />
                      </div>
                      
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="enableBGV"
                              checked={formData.enableBGV}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">
                              Enable Background Verification
                            </label>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="requireDigitalSignature"
                              checked={formData.requireDigitalSignature}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">
                              Require Digital Signature
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                
                <div className="modal-footer bg-light border-top">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    form="offerForm"
                  >
                    <Icon icon="heroicons:check" className="me-2" />
                    {selectedOffer ? 'Update Offer' : 'Create Offer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal - FIXED WIDTH */}
        {showPreview && selectedOffer && (
          <div 
            className="modal fade show d-block" 
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1050
            }}
          >
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header bg-light">
                  <h5 className="modal-title d-flex align-items-center">
                    <Icon icon="heroicons:eye" className="me-2" />
                    Offer Letter Preview
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowPreview(false)}
                  ></button>
                </div>
                
                <div className="modal-body">
                  {/* Offer Letter Template */}
                  <div className="border p-4 bg-white">
                    <div className="text-center mb-4">
                      <h2 className="fw-bold mb-2">TECHNOVATE SOLUTIONS PRIVATE LIMITED</h2>
                      <p className="mb-1">123 Tech Park, Sector 62, Noida, Uttar Pradesh - 201309</p>
                      <p className="mb-1">📧 hr@technovate.com | 📱 +91 120 4567890 | 🌐 www.technovate.com</p>
                      <hr className="my-3" />
                    </div>
                    
                    <div>
                      <h4 className="mb-3">LETTER OF EMPLOYMENT</h4>
                      
                      <p className="mb-3">
                        <strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      
                      <div className="mb-4">
                        <p className="mb-1"><strong>To,</strong></p>
                        <p className="mb-1 fw-bold">{selectedOffer.candidateName}</p>
                        <p className="mb-1">{selectedOffer.email}</p>
                        <p className="mb-0">{selectedOffer.phone}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="mb-3">
                          Dear <strong>{selectedOffer.candidateName}</strong>,
                        </p>
                        
                        <p className="mb-3">
                          We are delighted to offer you the position of{' '}
                          <strong>{selectedOffer.position}</strong> in our{' '}
                          <strong>{selectedOffer.department}</strong> department at Technovate Solutions Private Limited.
                        </p>
                        
                        <p className="mb-3">
                          Your employment is scheduled to commence on{' '}
                          <strong>{selectedOffer.joiningDate}</strong>. This offer is contingent upon satisfactory
                          completion of background verification and other pre-employment formalities.
                        </p>
                      </div>
                      
                      {/* Offer Details Table */}
                      <div className="bg-light p-4 rounded mb-4">
                        <h5 className="mb-3">OFFER DETAILS</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <p><strong>Position:</strong> {selectedOffer.position}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Department:</strong> {selectedOffer.department}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Grade:</strong> {selectedOffer.grade}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Employment Type:</strong> {selectedOffer.offerType}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Joining Date:</strong> {selectedOffer.joiningDate}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Notice Period:</strong> {selectedOffer.noticePeriod}</p>
                          </div>
                          <div className="col-12">
                            <p><strong>Annual CTC:</strong> <span className="text-success fw-bold">₹{selectedOffer.ctc}</span></p>
                          </div>
                        </div>
                        
                        {/* CTC Breakup */}
                        {selectedOffer.ctcBreakup && (
                          <div className="mt-3">
                            <h6 className="mb-2">CTC Breakup (Annual):</h6>
                            {Object.entries(selectedOffer.ctcBreakup).map(([key, value]) => (
                              <div key={key} className="d-flex justify-content-between">
                                <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="fw-bold">₹{value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Terms and Conditions */}
                      <div className="mb-4">
                        <h5 className="mb-3">TERMS AND CONDITIONS</h5>
                        <div className="small">
                          <p>1. This offer is subject to satisfactory background verification.</p>
                          <p>2. You will be on probation for a period of 3 (three) months from the date of joining.</p>
                          <p>3. Your employment will be governed by the company's policies and procedures.</p>
                          <p>4. This offer is valid until {selectedOffer.expiryDate}.</p>
                          <p>5. Please acknowledge acceptance of this offer by signing and returning a copy.</p>
                        </div>
                      </div>
                      
                      {/* Signatures */}
                      <div className="row mt-5">
                        <div className="col-md-6 text-center">
                          <p className="mb-4"><strong>For Technovate Solutions Private Limited</strong></p>
                          <div className="border-top mx-auto" style={{ width: '200px', marginBottom: '10px' }}></div>
                          <p className="mb-0">Authorized Signatory</p>
                          <p className="mb-0">Human Resources Department</p>
                        </div>
                        
                        <div className="col-md-6 text-center">
                          <p className="mb-4"><strong>Accepted By</strong></p>
                          <div className="border-top mx-auto" style={{ width: '200px', marginBottom: '10px' }}></div>
                          <p className="mb-0">{selectedOffer.candidateName}</p>
                          <p className="mb-0">Date: ___________________</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer bg-light border-top">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowPreview(false)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => alert('Downloading PDF...')}
                  >
                    <Icon icon="heroicons:arrow-down-tray" className="me-2" />
                    Download PDF
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => alert('Offer sent via email')}
                  >
                    <Icon icon="heroicons:envelope" className="me-2" />
                    Send via Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferManagement;