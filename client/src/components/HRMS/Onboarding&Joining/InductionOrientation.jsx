import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const InductionOrientation = () => {
  // ==================== MENU ITEMS ====================
  const menuItems = [
    { title: 'Dashboard', link: '/recruiter/dashboard', active: false },
    { title: 'Job Openings', link: '/recruiter/jobs', active: false },
    { title: 'Candidates', link: '/recruiter/candidates' },
    { title: 'Interviews', link: '/recruiter/interviews' },
    { title: 'Pre-Joining', link: '/recruiter/pre-joining' },
    { title: 'Onboarding', link: '/recruiter/onboarding', active: true },
    { title: 'Reports', link: '/recruiter/reports' }
  ];

  const userInfo = {
    name: 'Sarah Johnson',
    role: 'HR Head',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  };

  // ==================== INITIAL DATA ====================
  const initialPrograms = [
    {
      id: 1,
      name: 'Q1 2024 New Hire Orientation',
      description: 'Comprehensive onboarding for Q1 2024 hires',
      type: 'batch',
      status: 'upcoming',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      duration: '5 days',
      location: 'Main Auditorium',
      totalSessions: 12,
      completedSessions: 0,
      totalParticipants: 25,
      confirmedParticipants: 22,
      attendanceRate: 0,
      overallRating: 0,
      schedule: [],
      participants: [],
      trainers: [],
      materials: [],
      feedback: [],
      certificates: []
    },
    {
      id: 2,
      name: 'March 2024 Individual Onboarding',
      description: 'Individual onboarding for March hires',
      type: 'individual',
      status: 'ongoing',
      startDate: '2024-03-25',
      endDate: '2024-03-29',
      duration: '5 days',
      location: 'Virtual',
      totalSessions: 8,
      completedSessions: 3,
      totalParticipants: 1,
      confirmedParticipants: 1,
      attendanceRate: 100,
      overallRating: 4.8,
      schedule: [],
      participants: [],
      trainers: [],
      materials: [],
      feedback: [],
      certificates: []
    }
  ];

  const initialPolicies = [
    {
      id: 1,
      name: 'Employee Code of Conduct',
      category: 'general',
      description: 'Standards of behavior expected from all employees',
      version: '3.2',
      effectiveDate: '2024-01-01',
      readTime: '15 minutes',
      status: 'published',
      acknowledgments: 145,
      lastAcknowledged: '2024-03-20',
      required: true,
      content: '',
      quiz: [],
      passingScore: 0,
      documents: [],
      completionTracking: {
        totalEmployees: 150,
        completed: 145,
        pending: 5,
        averageScore: 0
      }
    },
    {
      id: 2,
      name: 'POSH Policy',
      category: 'compliance',
      description: 'Prevention of Sexual Harassment at Workplace',
      version: '2.1',
      effectiveDate: '2024-01-15',
      readTime: '20 minutes',
      status: 'mandatory',
      acknowledgments: 150,
      lastAcknowledged: '2024-03-22',
      required: true,
      content: '',
      quiz: [],
      passingScore: 0,
      documents: [],
      completionTracking: {
        totalEmployees: 150,
        completed: 150,
        pending: 0,
        averageScore: 0
      }
    }
  ];

  // ==================== STATE MANAGEMENT ====================
  const [inductionPrograms, setInductionPrograms] = useState(initialPrograms);
  const [policies, setPolicies] = useState(initialPolicies);
  const [loading, setLoading] = useState(false);
  const [showCreateProgram, setShowCreateProgram] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  
  // Enhanced states
  const [showTrainerAssignmentModal, setShowTrainerAssignmentModal] = useState(false);
  const [showBulkAttendanceModal, setShowBulkAttendanceModal] = useState(false);
  const [showPolicyUploadModal, setShowPolicyUploadModal] = useState(false);
  const [showMaterialDistributionModal, setShowMaterialDistributionModal] = useState(false);
  const [showVenueBookingModal, setShowVenueBookingModal] = useState(false);
  
  const [policyCompletionData, setPolicyCompletionData] = useState({});
  const [selectedSession, setSelectedSession] = useState(null);

  // Form states
  const [programForm, setProgramForm] = useState({
    name: '',
    description: '',
    type: 'batch',
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: 30
  });

  const [trainerAssignmentData, setTrainerAssignmentData] = useState({
    programId: null,
    sessionId: null,
    trainerName: ''
  });

  // ==================== HANDLERS ====================
  const handleCreateProgram = () => {
    const newProgram = {
      id: inductionPrograms.length + 1,
      ...programForm,
      status: 'draft',
      duration: '5 days',
      totalSessions: 0,
      completedSessions: 0,
      totalParticipants: 0,
      confirmedParticipants: 0,
      attendanceRate: 0,
      overallRating: 0,
      schedule: [],
      participants: [],
      trainers: [],
      materials: [],
      feedback: [],
      certificates: []
    };

    setInductionPrograms([...inductionPrograms, newProgram]);
    setShowCreateProgram(false);
    setProgramForm({
      name: '',
      description: '',
      type: 'batch',
      startDate: '',
      endDate: '',
      location: '',
      maxParticipants: 30
    });
    alert('Induction program created successfully!');
  };

  const handleAssignTrainer = () => {
    const { programId, sessionId, trainerName } = trainerAssignmentData;
    
    if (!programId || !sessionId || !trainerName) {
      alert('Please fill all required fields');
      return;
    }

    alert(`Trainer ${trainerName} assigned successfully!`);
    setShowTrainerAssignmentModal(false);
    setTrainerAssignmentData({
      programId: null,
      sessionId: null,
      trainerName: ''
    });
  };

  const handleCompletePolicy = (policyId) => {
    setPolicyCompletionData(prev => ({
      ...prev,
      [policyId]: {
        completed: true,
        completionDate: new Date().toISOString().split('T')[0]
      }
    }));

    setPolicies(prev => prev.map(p => 
      p.id === policyId 
        ? { 
            ...p, 
            acknowledgments: p.acknowledgments + 1,
            lastAcknowledged: new Date().toISOString().split('T')[0],
            completionTracking: {
              ...p.completionTracking,
              completed: p.completionTracking.completed + 1,
              pending: p.completionTracking.pending - 1
            }
          }
        : p
    ));

    alert('Policy completed successfully!');
  };

  // ==================== RESPONSIVE MODALS ====================

  // 1. Create Program Modal
  const CreateProgramModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Create New Induction Program</h5>
              <button className="btn-close" onClick={() => setShowCreateProgram(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Program Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={programForm.name}
                    onChange={(e) => setProgramForm({...programForm, name: e.target.value})}
                    required
                    placeholder="e.g., Q2 2024 Orientation"
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Program Type *</label>
                  <select
                    className="form-select"
                    value={programForm.type}
                    onChange={(e) => setProgramForm({...programForm, type: e.target.value})}
                  >
                    <option value="batch">Batch Program</option>
                    <option value="individual">Individual</option>
                    <option value="virtual">Virtual</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={programForm.description}
                  onChange={(e) => setProgramForm({...programForm, description: e.target.value})}
                  placeholder="Program description"
                />
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Start Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={programForm.startDate}
                    onChange={(e) => setProgramForm({...programForm, startDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">End Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={programForm.endDate}
                    onChange={(e) => setProgramForm({...programForm, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-8 mb-3">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={programForm.location}
                    onChange={(e) => setProgramForm({...programForm, location: e.target.value})}
                    required
                    placeholder="e.g., Main Auditorium"
                  />
                </div>
                
                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">Max Participants</label>
                  <input
                    type="number"
                    className="form-control"
                    value={programForm.maxParticipants}
                    onChange={(e) => setProgramForm({...programForm, maxParticipants: parseInt(e.target.value) || 0})}
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowCreateProgram(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleCreateProgram}
                disabled={!programForm.name || !programForm.startDate || !programForm.endDate || !programForm.location}
              >
                Create Program
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Trainer Assignment Modal
  const TrainerAssignmentModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Assign Trainer</h5>
              <button className="btn-close" onClick={() => setShowTrainerAssignmentModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label className="form-label">Select Program</label>
                <select 
                  className="form-select"
                  value={trainerAssignmentData.programId || ''}
                  onChange={(e) => setTrainerAssignmentData({
                    ...trainerAssignmentData, 
                    programId: parseInt(e.target.value)
                  })}
                >
                  <option value="">Choose program...</option>
                  {inductionPrograms.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Trainer Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={trainerAssignmentData.trainerName}
                  onChange={(e) => setTrainerAssignmentData({...trainerAssignmentData, trainerName: e.target.value})}
                  placeholder="Enter trainer name"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Trainer Role</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., HR Manager"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Trainer Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="trainer@company.com"
                />
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowTrainerAssignmentModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleAssignTrainer}
                disabled={!trainerAssignmentData.programId || !trainerAssignmentData.trainerName}
              >
                Assign Trainer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. Bulk Attendance Modal
  const BulkAttendanceModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Bulk Attendance</h5>
              <button className="btn-close" onClick={() => setShowBulkAttendanceModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="alert alert-info mb-3">
                <strong>Note:</strong> This feature allows you to mark attendance for multiple participants at once.
              </div>
              
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rahul Sharma</td>
                      <td>Engineering</td>
                      <td>
                        <select className="form-select form-select-sm">
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Priya Patel</td>
                      <td>Marketing</td>
                      <td>
                        <select className="form-select form-select-sm">
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowBulkAttendanceModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary">
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Policy Modal
  const PolicyModal = () => {
    const policy = policies[0];
    
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">{policy?.name}</h5>
              <button className="btn-close" onClick={() => setShowPolicyModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="alert alert-light mb-4">
                <div className="row">
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Version</small>
                    <div className="fw-bold">{policy?.version}</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Effective Date</small>
                    <div className="fw-bold">{policy?.effectiveDate}</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Read Time</small>
                    <div className="fw-bold">{policy?.readTime}</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Status</small>
                    <div>
                      {policy?.status === 'mandatory' ? (
                        <span className="badge bg-danger">Mandatory</span>
                      ) : (
                        <span className="badge bg-success">Published</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold">Policy Content</h6>
                <p>{policy?.description}</p>
              </div>
              
              <div className="card border">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Completion Statistics</h6>
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="fw-bold">{policy?.completionTracking.completed}</div>
                      <div className="text-muted small">Completed</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold">{policy?.completionTracking.pending}</div>
                      <div className="text-muted small">Pending</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold">{policy?.completionTracking.averageScore.toFixed(1)}</div>
                      <div className="text-muted small">Avg Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowPolicyModal(false)}>
                Close
              </button>
              <button 
                className="btn btn-success"
                onClick={() => handleCompletePolicy(policy?.id)}
              >
                Complete Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== HELPER FUNCTIONS ====================
  const filteredPrograms = inductionPrograms.filter(program => {
    if (activeTab === 'all') return true;
    return program.status === activeTab;
  }).filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ongoing': return <span className="badge bg-success">Ongoing</span>;
      case 'upcoming': return <span className="badge bg-warning">Upcoming</span>;
      case 'completed': return <span className="badge bg-secondary">Completed</span>;
      case 'draft': return <span className="badge bg-light text-dark">Draft</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  // ==================== RENDER ====================
  return (
    
      <div className="container-fluid px-2 px-md-3 px-lg-4 py-3">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">Induction & Orientation</h5>
            <p className="text-muted mb-0 d-none d-md-block">Complete onboarding management with policy acknowledgment</p>
            <p className="text-muted mb-0 d-md-none">Onboarding management system</p>
          </div>

          <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
            <button 
              className="btn btn-outline-primary d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowBulkAttendanceModal(true)}
            >
              <i className="bi bi-people d-none d-md-inline"></i>
              <span>Bulk Attendance</span>
            </button>
            
            <button 
              className="btn btn-outline-info d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowPolicyUploadModal(true)}
            >
              <i className="bi bi-upload d-none d-md-inline"></i>
              <span>Upload Policy</span>
            </button>
            
            <button 
              className="btn btn-primary d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowCreateProgram(true)}
            >
              <i className="bi bi-plus-circle d-none d-md-inline"></i>
              <span>Create Program</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Total Programs</h6>
                    <h4 className="fw-bold mb-0">{inductionPrograms.length}</h4>
                  </div>
                  <div className="bg-primary rounded-circle p-2">
                    <i className="bi bi-calendar-event text-white fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Total Participants</h6>
                    <h4 className="fw-bold mb-0">
                      {inductionPrograms.reduce((sum, program) => sum + program.totalParticipants, 0)}
                    </h4>
                  </div>
                  <div className="bg-success rounded-circle p-2">
                    <i className="bi bi-people text-white fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Policy Completion</h6>
                    <h4 className="fw-bold mb-0">
                      {policies.filter(p => p.required).reduce((sum, policy) => {
                        const rate = policy.completionTracking.completed / policy.completionTracking.totalEmployees;
                        return sum + rate;
                      }, 0) / policies.filter(p => p.required).length * 100 || 0}%
                    </h4>
                  </div>
                  <div className="bg-warning rounded-circle p-2">
                    <i className="bi bi-file-check text-white fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Avg. Rating</h6>
                    <h4 className="fw-bold mb-0">
                      {inductionPrograms.length > 0 
                        ? (inductionPrograms.reduce((sum, program) => sum + program.overallRating, 0) / inductionPrograms.length).toFixed(1)
                        : '0.0'}/5
                    </h4>
                  </div>
                  <div className="bg-info rounded-circle p-2">
                    <i className="bi bi-star text-white fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search - Responsive Layout */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-8">
            <div className="d-flex flex-wrap gap-2">
              <button 
                className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`btn ${activeTab === 'ongoing' ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                onClick={() => setActiveTab('ongoing')}
              >
                Ongoing
              </button>
              <button 
                className={`btn ${activeTab === 'upcoming' ? 'btn-warning' : 'btn-outline-warning'} btn-sm`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`btn ${activeTab === 'completed' ? 'btn-secondary' : 'btn-outline-secondary'} btn-sm`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="col-12 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Induction Programs Table - Responsive */}
        <div className="card border mb-4">
          <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <h6 className="mb-2 mb-md-0 fw-bold">Induction Programs</h6>
            <span className="badge bg-primary">{filteredPrograms.length} programs</span>
          </div>
          
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="d-none d-md-table-cell">Program Name</th>
                    <th className="d-table-cell d-md-none">Program</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th className="d-none d-md-table-cell">Schedule</th>
                    <th className="d-none d-md-table-cell">Participants</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map(program => (
                    <tr key={program.id}>
                      <td>
                        <div className="fw-bold">{program.name}</div>
                        <small className="text-muted d-none d-md-block">{program.description.substring(0, 50)}...</small>
                        <small className="text-muted d-block d-md-none">
                          {program.startDate} to {program.endDate}
                        </small>
                      </td>
                      <td>
                        <span className={`badge ${
                          program.type === 'batch' ? 'bg-primary' :
                          program.type === 'individual' ? 'bg-info' : 'bg-success'
                        }`}>
                          {program.type}
                        </span>
                      </td>
                      <td>{getStatusBadge(program.status)}</td>
                      <td className="d-none d-md-table-cell">
                        <div>{program.startDate} to {program.endDate}</div>
                        <small className="text-muted">{program.duration}</small>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <div>{program.confirmedParticipants}/{program.totalParticipants}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="fw-bold me-1">{program.overallRating}</span>
                          <div className="text-warning">
                            {'★'.repeat(Math.floor(program.overallRating))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => {
                              setSelectedProgram(program);
                              setShowPolicyModal(true);
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button 
                            className="btn btn-outline-success"
                            onClick={() => {
                              setSelectedProgram(program);
                              setShowBulkAttendanceModal(true);
                            }}
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="card-footer bg-light d-none d-md-block">
            <small className="text-muted">
              Showing {filteredPrograms.length} of {inductionPrograms.length} programs
            </small>
          </div>
        </div>

        {/* Policy Acknowledgment Section - Responsive */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="mb-2 mb-md-0 fw-bold">Policy Acknowledgment</h6>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowPolicyUploadModal(true)}
                >
                  <i className="bi bi-plus"></i> Add Policy
                </button>
              </div>
              
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Policy</th>
                        <th className="d-none d-md-table-cell">Category</th>
                        <th>Status</th>
                        <th className="d-none d-md-table-cell">Completion</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map(policy => {
                        const completion = policyCompletionData[policy.id] || {};
                        const progress = (policy.completionTracking.completed / policy.completionTracking.totalEmployees) * 100;
                        
                        return (
                          <tr key={policy.id}>
                            <td>
                              <div>
                                <div className="fw-bold">{policy.name}</div>
                                <small className="text-muted d-block d-md-none">{policy.category}</small>
                              </div>
                            </td>
                            <td className="d-none d-md-table-cell">
                              <span className={`badge ${
                                policy.category === 'compliance' ? 'bg-danger' :
                                policy.category === 'security' ? 'bg-warning' : 'bg-secondary'
                              }`}>
                                {policy.category}
                              </span>
                            </td>
                            <td>
                              {policy.status === 'mandatory' ? (
                                <span className="badge bg-danger">Mandatory</span>
                              ) : (
                                <span className="badge bg-success">Published</span>
                              )}
                            </td>
                            <td className="d-none d-md-table-cell">
                              <div>
                                <div className="d-flex justify-content-between mb-1">
                                  <small>{policy.completionTracking.completed}/{policy.completionTracking.totalEmployees}</small>
                                  <small>{progress.toFixed(1)}%</small>
                                </div>
                                <div className="progress" style={{ height: '6px' }}>
                                  <div 
                                    className="progress-bar" 
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => {
                                    setSelectedProgram(null);
                                    setShowPolicyModal(true);
                                  }}
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => handleCompletePolicy(policy.id)}
                                  disabled={completion.completed}
                                >
                                  <i className="bi bi-check-circle"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Responsive Grid */}
        <div className="row mt-4 g-3">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light">
                <h6 className="mb-0 fw-bold">Quick Actions</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowCreateProgram(true)}
                    >
                      <i className="bi bi-plus-circle fs-4 mb-2"></i>
                      <span className="small">Create Program</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-success w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowTrainerAssignmentModal(true)}
                    >
                      <i className="bi bi-person-plus fs-4 mb-2"></i>
                      <span className="small">Assign Trainer</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-info w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowMaterialDistributionModal(true)}
                    >
                      <i className="bi bi-folder-symlink fs-4 mb-2"></i>
                      <span className="small">Materials</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-warning w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowBulkAttendanceModal(true)}
                    >
                      <i className="bi bi-people fs-4 mb-2"></i>
                      <span className="small">Attendance</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-danger w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowPolicyUploadModal(true)}
                    >
                      <i className="bi bi-upload fs-4 mb-2"></i>
                      <span className="small">Upload Policy</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowVenueBookingModal(true)}
                    >
                      <i className="bi bi-calendar-check fs-4 mb-2"></i>
                      <span className="small">Book Venue</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Summary Cards */}
        <div className="row mt-4 d-md-none">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light">
                <h6 className="mb-0 fw-bold">Summary</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <small className="text-muted d-block">Active Programs</small>
                      <span className="fw-bold">
                        {inductionPrograms.filter(p => p.status === 'ongoing').length}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <small className="text-muted d-block">Pending Policies</small>
                      <span className="fw-bold">
                        {policies.reduce((sum, p) => sum + p.completionTracking.pending, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Modals */}
        {showCreateProgram && <CreateProgramModal />}
        {showTrainerAssignmentModal && <TrainerAssignmentModal />}
        {showBulkAttendanceModal && <BulkAttendanceModal />}
        {showPolicyModal && <PolicyModal />}
      </div>
    
  );
};

export default InductionOrientation;