import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';


const PromotionsCareer = () => {
  // ---------------- INITIAL DATA ----------------
  
  // Probation Employees Data
  const initialProbationEmployees = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Rajesh Kumar',
      designation: 'Software Engineer',
      department: 'Engineering',
      manager: 'Priya Sharma',
      skipLevelManager: 'Sanjay Verma',
      hrBusinessPartner: 'Anita Verma',
      buddy: 'Arun Mehta',
      buddyStatus: 'assigned',
      buddyRating: 4.5,
      joiningDate: '2024-01-15',
      probationEndDate: '2024-04-15',
      probationPeriod: '90',
      daysRemaining: 75,
      status: 'in_progress',
      riskLevel: 'low',
      progress: 66,
      review30: { completed: true, date: '2024-02-15', rating: 'Exceeds Expectations' },
      review60: { completed: true, date: '2024-03-15', rating: 'Meets Expectations' },
      review90: { completed: false, scheduled: '2024-04-01', rating: null },
      currentRating: 'Meets Expectations',
      nextReviewDate: '2024-04-01',
      extensionCount: 0,
      probationType: 'regular',
      noticePeriod: '60',
      workLocation: 'Bangalore',
      employmentType: 'Permanent',
      salary: '₹8,50,000',
      skills: ['React', 'Node.js', 'MongoDB'],
      trainingCompleted: ['Orientation', 'Code of Conduct', 'Security Training'],
      probationReviews: [
        {
          id: 1,
          type: '30_day',
          date: '2024-02-15',
          selfAssessment: 'I have adapted well to the team and completed all assigned tasks.',
          managerAssessment: 'Excellent performance, quick learner. Shows great potential.',
          skipLevelAssessment: 'Good progress, meeting expectations.',
          hrAssessment: 'Good cultural fit. Engages well with team.',
          rating: 'Exceeds Expectations',
          recommendations: 'Continue current trajectory',
          meetingScheduled: true,
          meetingDate: '2024-02-14',
          actionItems: ['Complete advanced React course', 'Take ownership of login module']
        }
      ]
    },
    // ... more probation employees
  ];

  // Confirmation Employees Data
  const initialConfirmationEmployees = [
    {
      id: 101,
      employeeId: 'EMP006',
      name: 'Arun Mehta',
      designation: 'DevOps Engineer',
      department: 'Engineering',
      manager: 'Sanjay Verma',
      hrBusinessPartner: 'Rohit Sharma',
      joiningDate: '2023-11-15',
      probationEndDate: '2024-02-15',
      confirmationDueDate: '2024-02-15',
      daysRemaining: -25,
      status: 'confirmed',
      confirmationStatus: 'confirmed',
      riskLevel: 'low',
      probationReviewCompleted: true,
      review30: { completed: true, date: '2023-12-15', rating: 'Exceeds Expectations' },
      review60: { completed: true, date: '2024-01-15', rating: 'Exceeds Expectations' },
      review90: { completed: true, date: '2024-02-10', rating: 'Exceeds Expectations' },
      currentRating: 'Exceeds Expectations',
      managerReviewDate: '2024-02-12',
      managerRecommendation: 'recommended',
      managerComments: 'Outstanding performance. Quick learner and team player.',
      hrReviewDate: '2024-02-14',
      hrRecommendation: 'approved',
      hrComments: 'All probation reviews completed successfully.',
      departmentHeadReviewDate: '2024-02-15',
      departmentHeadApproval: 'approved',
      confirmationAuthorityReviewDate: '2024-02-15',
      confirmationAuthorityApproval: 'approved',
      confirmationDate: '2024-02-15',
      confirmationEffectiveDate: '2024-02-15',
      confirmationLetterGenerated: true,
      confirmationLetterSent: true,
      autoTriggered: true,
      workLocation: 'Bangalore',
      employmentType: 'Permanent',
      salary: '₹9,50,000'
    },
    // ... more confirmation employees
  ];

  // Promotion Employees Data
  const initialPromotionEmployees = [
    {
      id: 201,
      employeeId: 'EMP020',
      name: 'Priya Sharma',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      manager: 'Sanjay Verma',
      hrBusinessPartner: 'Anita Verma',
      currentGrade: 'P3',
      proposedGrade: 'P4',
      currentDesignation: 'Senior Software Engineer',
      proposedDesignation: 'Tech Lead',
      currentSalary: '₹12,00,000',
      proposedSalary: '₹14,50,000',
      tenure: '3.5 years',
      lastPromotionDate: '2022-06-15',
      performanceRating: 'Exceeds Expectations',
      promotionCycle: 'Annual',
      nominationDate: '2024-03-01',
      nominationBy: 'Sanjay Verma',
      eligibilityStatus: 'eligible',
      promotionCommitteeReview: 'pending',
      approvalWorkflow: [
        { level: 'Manager', status: 'approved', date: '2024-03-05' },
        { level: 'Department Head', status: 'approved', date: '2024-03-10' },
        { level: 'HR', status: 'pending', date: null },
        { level: 'Promotion Committee', status: 'pending', date: null },
        { level: 'Leadership', status: 'pending', date: null }
      ],
      promotionStatus: 'under_review',
      promotionLetterGenerated: false,
      announcementDate: null,
      effectiveDate: null,
      skills: ['React', 'Node.js', 'Team Leadership', 'Architecture'],
      achievements: ['Led team of 5 developers', 'Reduced system latency by 40%'],
      workLocation: 'Bangalore'
    },
    // ... more promotion employees
  ];

  // Buddy Program Data
  const initialBuddies = [
    {
      id: 1,
      buddyId: 'BUD001',
      name: 'Arun Mehta',
      designation: 'DevOps Engineer',
      department: 'Engineering',
      experience: '3 years',
      newJoinerCount: 2,
      averageRating: 4.7,
      status: 'active',
      assignedNewJoiners: ['EMP001', 'EMP005'],
      responsibilities: [
        'Orientation guidance',
        'Technical onboarding',
        'Team introduction',
        'Process documentation'
      ],
      feedback: [
        { newJoinerId: 'EMP001', rating: 5, comments: 'Very helpful and supportive' }
      ]
    },
    // ... more buddies
  ];

  // ---------------- STATE VARIABLES ----------------
  const [activeTab, setActiveTab] = useState('promotions');
  const [probationEmployees, setProbationEmployees] = useState(initialProbationEmployees);
  const [confirmationEmployees, setConfirmationEmployees] = useState(initialConfirmationEmployees);
  const [promotionEmployees, setPromotionEmployees] = useState(initialPromotionEmployees);
  const [buddies, setBuddies] = useState(initialBuddies);

  // UI States
  const [showProbationReviewModal, setShowProbationReviewModal] = useState(false);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showEarlyConfirmationModal, setShowEarlyConfirmationModal] = useState(false);
  const [showTerminationModal, setShowTerminationModal] = useState(false);
  const [showBuddyAssignmentModal, setShowBuddyAssignmentModal] = useState(false);
  const [showConfirmationWorkflowModal, setShowConfirmationWorkflowModal] = useState(false);
  const [showPromotionNominationModal, setShowPromotionNominationModal] = useState(false);
  const [showPromotionReviewModal, setShowPromotionReviewModal] = useState(false);
  const [showPromotionCycleModal, setShowPromotionCycleModal] = useState(false);
  const [showPromotionLetterModal, setShowPromotionLetterModal] = useState(false);
  const [showPromotionAnnouncementModal, setShowPromotionAnnouncementModal] = useState(false);
  const [showIDPModal, setShowIDPModal] = useState(false);
  const [showSkillGapModal, setShowSkillGapModal] = useState(false);
  const [showCareerPathModal, setShowCareerPathModal] = useState(false);
  const [showSuccessionPlanningModal, setShowSuccessionPlanningModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Selected items
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  
  // Promotion cycle and forms
  const [promotionCycles, setPromotionCycles] = useState([
    { id: 1, name: 'Annual 2024', type: 'annual', startDate: '2024-01-01', endDate: '2024-12-31', status: 'active', nominations: 15, approved: 8 },
    { id: 2, name: 'Q1 2024', type: 'quarterly', startDate: '2024-01-01', endDate: '2024-03-31', status: 'completed', nominations: 5, approved: 4 },
    { id: 3, name: 'Bi-Annual 2024', type: 'bi_annual', startDate: '2024-07-01', endDate: '2024-12-31', status: 'upcoming', nominations: 0, approved: 0 }
  ]);
  
  const [promotionNominationForm, setPromotionNominationForm] = useState({
    employeeId: '',
    promotionCycle: '',
    currentGrade: '',
    proposedGrade: '',
    currentDesignation: '',
    proposedDesignation: '',
    currentSalary: '',
    proposedSalary: '',
    justification: '',
    eligibilityCheck: {
      tenure: false,
      performance: false,
      grade: false,
      skills: false,
      training: false
    }
  });
  
  const [idpData, setIdpData] = useState({
    employeeId: '',
    currentRole: '',
    targetRole: '',
    skills: [],
    skillGaps: [],
    trainingRecommendations: [],
    milestones: [],
    timeline: ''
  });
  
  const [careerPaths, setCareerPaths] = useState([
    {
      employeeId: 'EMP001',
      name: 'Rajesh Kumar',
      currentRole: 'Software Engineer',
      possiblePaths: [
        {
          path: 'Technical Track',
          roles: ['Senior Software Engineer', 'Tech Lead', 'Principal Engineer', 'Engineering Manager'],
          estimatedTime: '3-5 years',
          requiredSkills: ['Advanced Programming', 'System Design', 'Team Leadership']
        },
        {
          path: 'Management Track',
          roles: ['Senior Software Engineer', 'Engineering Manager', 'Senior Manager', 'Director'],
          estimatedTime: '4-6 years',
          requiredSkills: ['Team Management', 'Strategic Planning', 'Budget Management']
        }
      ]
    }
  ]);

  // ---------------- HELPER FUNCTIONS ----------------
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // ---------------- UI COMPONENTS ----------------
  const getStatusBadge = (status) => {
    const config = {
      in_progress: { label: 'In Progress', color: 'primary' },
      under_review: { label: 'Under Review', color: 'warning' },
      extended: { label: 'Extended', color: 'info' },
      at_risk: { label: 'At Risk', color: 'danger' },
      completed: { label: 'Completed', color: 'success' },
      terminated: { label: 'Terminated', color: 'secondary' },
      confirmed: { label: 'Confirmed', color: 'success' },
      pending_review: { label: 'Pending Review', color: 'warning' },
      pending_approval: { label: 'Pending Approval', color: 'primary' },
      overdue: { label: 'Overdue', color: 'danger' }
    };
    
    const { label, color } = config[status] || { label: status, color: 'secondary' };
    
    return (
      <span className={`badge bg-${color}-subtle text-${color}`}>
        {label}
      </span>
    );
  };

  const ReviewMilestones = ({ employee }) => {
    return (
      <div className="d-flex gap-1">
        <span 
          className={`badge ${employee.review30.completed ? 'bg-success' : 'bg-light text-muted'}`}
          title={`30 Day: ${employee.review30.completed ? formatDate(employee.review30.date) : 'Pending'}`}
        >
          30
        </span>
        <span 
          className={`badge ${employee.review60.completed ? 'bg-success' : 'bg-light text-muted'}`}
          title={`60 Day: ${employee.review60.completed ? formatDate(employee.review60.date) : 'Pending'}`}
        >
          60
        </span>
        <span 
          className={`badge ${employee.review90.completed ? 'bg-success' : 'bg-light text-muted'}`}
          title={`90 Day: ${employee.review90.completed ? formatDate(employee.review90.date) : 'Pending'}`}
        >
          90
        </span>
      </div>
    );
  };

  const ConfirmationWorkflow = ({ employee }) => {
    const steps = [
      { 
        key: 'probationReview', 
        label: 'P', 
        status: employee.probationReviewCompleted ? 'completed' : 'pending',
        tooltip: `Probation Review: ${employee.probationReviewCompleted ? 'Completed' : 'Pending'}`
      },
      { 
        key: 'managerReview', 
        label: 'M', 
        status: employee.managerRecommendation ? 'completed' : 'pending',
        tooltip: `Manager: ${employee.managerRecommendation || 'Pending'}`
      },
      { 
        key: 'hrReview', 
        label: 'H', 
        status: employee.hrRecommendation ? 'completed' : 'pending',
        tooltip: `HR: ${employee.hrRecommendation || 'Pending'}`
      },
      { 
        key: 'deptHead', 
        label: 'D', 
        status: employee.departmentHeadApproval ? 'completed' : 'pending',
        tooltip: `Dept Head: ${employee.departmentHeadApproval || 'Pending'}`
      },
      { 
        key: 'authority', 
        label: 'A', 
        status: employee.confirmationAuthorityApproval ? 'completed' : 'pending',
        tooltip: `Authority: ${employee.confirmationAuthorityApproval || 'Pending'}`
      }
    ];
    
    return (
      <div className="d-flex gap-1 align-items-center">
        {steps.map((step, index) => (
          <div key={step.key} className="d-flex align-items-center">
            <span 
              className={`badge ${
                step.status === 'completed' ? 'bg-success' : 'bg-light text-muted'
              }`}
              title={step.tooltip}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && <small className="mx-1 text-muted">→</small>}
          </div>
        ))}
      </div>
    );
  };

  const PromotionWorkflow = ({ employee }) => {
    return (
      <div className="d-flex gap-1 align-items-center">
        {employee.approvalWorkflow.map((step, index) => (
          <div key={step.level} className="d-flex align-items-center">
            <span 
              className={`badge ${
                step.status === 'approved' ? 'bg-success' : 
                step.status === 'rejected' ? 'bg-danger' : 
                'bg-light text-muted'
              }`}
              title={`${step.level}: ${step.status}`}
            >
              {step.level.charAt(0)}
            </span>
            {index < employee.approvalWorkflow.length - 1 && <small className="mx-1 text-muted">→</small>}
          </div>
        ))}
      </div>
    );
  };

  // ---------------- SIDEBAR MENU ----------------
  const menuItems = [
    {
      title: 'Dashboard',
      link: '/hr/dashboard',
      active: false
    },
    {
      title: 'Employee Master',
      link: '/hr/employees'
    },
    {
      title: 'HR Operations',
      link: '/hr/operations',
      active: true
    },
    {
      title: 'Attendance',
      link: '/hr/attendance'
    },
    {
      title: 'Leave Management',
      link: '/hr/leave'
    },
    {
      title: 'Payroll',
      link: '/hr/payroll'
    },
    {
      title: 'Performance',
      link: '/hr/performance'
    },
    {
      title: 'Reports',
      link: '/hr/reports'
    },
    {
      title: 'Settings',
      link: '/hr/settings'
    }
  ];

  const userInfo = {
    name: 'HR Manager',
    role: 'Human Resources',
    email: 'hr@company.com'
  };

  return (
    <>
      <div className="container-fluid p-4">
        
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
  <h5 className="mb-2 d-flex align-items-center">
    <Icon 
      icon="heroicons:arrow-trending-up" 
      className="me-2" 
      width={24} 
      height={24} 
    />
    Promotions & Career Progression
  </h5>
  <p className="text-muted">
    Manage probation, confirmation, promotions and buddy programs
  </p>
</div>

          
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowReportModal(true)}
            >
              Reports
            </button>
          </div>
        </div>

        {/* TABS */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'promotions' ? 'active' : ''}`}
              onClick={() => setActiveTab('promotions')}
            >
              <Icon icon="heroicons-solid:trophy" className="me-1" />
              Promotions
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'career' ? 'active' : ''}`}
              onClick={() => setActiveTab('career')}
            >
              <Icon icon="heroicons-solid:chart-bar" className="me-1" />
              Career Progression
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'probation' ? 'active' : ''}`}
              onClick={() => setActiveTab('probation')}
            >
              <Icon icon="heroicons-solid:document-search" className="me-1" />
              Probation
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'confirmation' ? 'active' : ''}`}
              onClick={() => setActiveTab('confirmation')}
            >
              <Icon icon="heroicons-solid:document-check" className="me-1" />
              Confirmation
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'buddy' ? 'active' : ''}`}
              onClick={() => setActiveTab('buddy')}
            >
              <Icon icon="heroicons-solid:user-group" className="me-1" />
              Buddy Program
            </button>
          </li>
        </ul>

        {/* PROBATION MANAGEMENT TAB */}
        {activeTab === 'probation' && (
          <>
            {/* STATISTICS */}
            <div className="row g-3 mb-4">
              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Total Probation</div>
                    <div className="fw-bold fs-5 text-primary">{probationEmployees.length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">In Progress</div>
                    <div className="fw-bold fs-5 text-info">{probationEmployees.filter(e => e.status === 'in_progress').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Under Review</div>
                    <div className="fw-bold fs-5 text-warning">{probationEmployees.filter(e => e.status === 'under_review').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">At Risk</div>
                    <div className="fw-bold fs-5 text-danger">{probationEmployees.filter(e => e.status === 'at_risk').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Extended</div>
                    <div className="fw-bold fs-5 text-secondary">{probationEmployees.filter(e => e.status === 'extended').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Ending Soon</div>
                    <div className="fw-bold fs-5 text-warning">{probationEmployees.filter(e => e.daysRemaining <= 30 && e.daysRemaining > 0).length}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Probation Quick Actions</strong>
                  <p className="text-muted mb-0 small">Common probation management tasks</p>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Auto-schedule reviews for all employees')}
                  >
                    Auto-Schedule Reviews
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Send milestone reminders')}
                  >
                    Send Reminders
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowBuddyAssignmentModal(true)}
                  >
                    Assign Buddies
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Generate probation reports')}
                  >
                    Generate Reports
                  </button>
                </div>
              </div>
            </div>

            {/* PROBATION TABLE */}
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ minWidth: '250px' }}>Employee Details</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Probation Status</th>
                      <th className="text-center" style={{ minWidth: '120px' }}>Review Milestones</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Time Remaining</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Buddy Status</th>
                      <th className="text-center" style={{ minWidth: '250px' }}>Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {probationEmployees.map((emp) => (
                      <tr key={emp.id}>
                        <td>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <strong className="d-block">{emp.name}</strong>
                              <small className="badge bg-secondary">{emp.employeeId}</small>
                            </div>
                            <small className="text-muted d-block">{emp.designation}</small>
                            <div className="d-flex gap-2">
                              <small className="text-muted">{emp.department}</small>
                              <small className="text-muted">•</small>
                              <small className="text-muted">{emp.workLocation}</small>
                            </div>
                          </div>
                        </td>
                        
                        <td className="text-center">
                          {getStatusBadge(emp.status)}
                        </td>
                        
                        <td className="text-center">
                          <ReviewMilestones employee={emp} />
                          <div className="small text-muted mt-1">
                            Next: {emp.nextReviewDate ? formatDate(emp.nextReviewDate) : 'N/A'}
                          </div>
                        </td>
                        
                        <td className="text-center">
                          <div className={`fw-bold ${
                            emp.daysRemaining <= 0 ? 'text-danger' :
                            emp.daysRemaining <= 7 ? 'text-danger' :
                            emp.daysRemaining <= 30 ? 'text-warning' : 'text-success'
                          }`}>
                            {emp.daysRemaining <= 0 ? Math.abs(emp.daysRemaining) + ' days overdue' : emp.daysRemaining + ' days'}
                          </div>
                          <div className="small text-muted">
                            Ends: {formatDate(emp.probationEndDate)}
                          </div>
                        </td>
                        
                        <td className="text-center">
                          {emp.buddy ? (
                            <div>
                              <small className="d-block">{emp.buddy}</small>
                              <span className="badge bg-success-subtle text-success">Assigned</span>
                            </div>
                          ) : (
                            <span className="badge bg-warning-subtle text-warning">Pending</span>
                          )}
                        </td>
                        
                        <td className="text-center">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowDetailModal(true);
                              }}
                              title="View Details"
                            >
                              View
                            </button>
                            
                            <button
                              className="btn btn-outline-info"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowProbationReviewModal(true);
                              }}
                              title="Conduct Review"
                            >
                              Review
                            </button>
                            
                            <button
                              className="btn btn-outline-warning"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowExtensionModal(true);
                              }}
                              title="Extend Probation"
                            >
                              Extend
                            </button>
                            
                            <button
                              className="btn btn-outline-success"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowEarlyConfirmationModal(true);
                              }}
                              title="Early Confirmation"
                            >
                              Early Confirm
                            </button>
                            
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowTerminationModal(true);
                              }}
                              title="Terminate Probation"
                            >
                              Terminate
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* EMPLOYEE CONFIRMATION TAB */}
        {activeTab === 'confirmation' && (
          <>
            {/* STATISTICS */}
            <div className="row g-3 mb-4">
              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Total for Confirmation</div>
                    <div className="fw-bold fs-5 text-primary">{confirmationEmployees.length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Pending Manager</div>
                    <div className="fw-bold fs-5 text-warning">{confirmationEmployees.filter(e => !e.managerRecommendation).length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Pending HR</div>
                    <div className="fw-bold fs-5 text-info">{confirmationEmployees.filter(e => e.managerRecommendation && !e.hrRecommendation).length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Pending Authority</div>
                    <div className="fw-bold fs-5 text-primary">{confirmationEmployees.filter(e => e.hrRecommendation && !e.confirmationAuthorityApproval).length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Confirmed</div>
                    <div className="fw-bold fs-5 text-success">{confirmationEmployees.filter(e => e.confirmationStatus === 'confirmed').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Overdue</div>
                    <div className="fw-bold fs-5 text-danger">{confirmationEmployees.filter(e => e.daysRemaining < 0 && e.confirmationStatus !== 'confirmed').length}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Confirmation Quick Actions</strong>
                  <p className="text-muted mb-0 small">Common confirmation workflow tasks</p>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Auto-trigger confirmation process')}
                  >
                    Auto-Trigger
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Send approval reminders')}
                  >
                    Send Reminders
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Bulk confirmation processing')}
                  >
                    Bulk Process
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Generate confirmation letters')}
                  >
                    Generate Letters
                  </button>
                </div>
              </div>
            </div>

            {/* CONFIRMATION TABLE */}
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ minWidth: '250px' }}>Employee Details</th>
                      <th className="text-center" style={{ minWidth: '120px' }}>Confirmation Status</th>
                      <th className="text-center" style={{ minWidth: '150px' }}>Workflow Progress</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Time Status</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Auto-Triggered</th>
                      <th className="text-center" style={{ minWidth: '250px' }}>Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {confirmationEmployees.map((emp) => (
                      <tr key={emp.id}>
                        <td>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <strong className="d-block">{emp.name}</strong>
                              <small className="badge bg-secondary">{emp.employeeId}</small>
                            </div>
                            <small className="text-muted d-block">{emp.designation}</small>
                            <div className="d-flex gap-2">
                              <small className="text-muted">{emp.department}</small>
                              <small className="text-muted">•</small>
                              <small className="text-muted">{emp.workLocation}</small>
                            </div>
                          </div>
                        </td>
                        
                        <td className="text-center">
                          {getStatusBadge(emp.confirmationStatus)}
                        </td>
                        
                        <td className="text-center">
                          <ConfirmationWorkflow employee={emp} />
                        </td>
                        
                        <td className="text-center">
                          <div className={`fw-bold ${
                            emp.daysRemaining <= 0 ? 'text-danger' :
                            emp.daysRemaining <= 7 ? 'text-danger' :
                            emp.daysRemaining <= 30 ? 'text-warning' : 'text-success'
                          }`}>
                            {emp.daysRemaining <= 0 ? Math.abs(emp.daysRemaining) + ' days overdue' : emp.daysRemaining + ' days'}
                          </div>
                          <div className="small text-muted">
                            Due: {formatDate(emp.confirmationDueDate)}
                          </div>
                        </td>
                        
                        <td className="text-center">
                          {emp.autoTriggered ? (
                            <span className="badge bg-success-subtle text-success">Yes</span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-secondary">No</span>
                          )}
                        </td>
                        
                        <td className="text-center">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowDetailModal(true);
                              }}
                              title="View Details"
                            >
                              View
                            </button>
                            
                            {!emp.managerRecommendation && (
                              <button
                                className="btn btn-outline-warning"
                                onClick={() => {
                                  setSelectedEmployee(emp);
                                  alert('Initiate manager review');
                                }}
                                title="Manager Review"
                              >
                                Manager
                              </button>
                            )}
                            
                            {emp.managerRecommendation && !emp.hrRecommendation && (
                              <button
                                className="btn btn-outline-info"
                                onClick={() => {
                                  setSelectedEmployee(emp);
                                  alert('Initiate HR review');
                                }}
                                title="HR Review"
                              >
                                HR
                              </button>
                            )}
                            
                            {emp.hrRecommendation && !emp.confirmationAuthorityApproval && (
                              <button
                                className="btn btn-outline-success"
                                onClick={() => {
                                  setSelectedEmployee(emp);
                                  setShowConfirmationWorkflowModal(true);
                                }}
                                title="Authority Approval"
                              >
                                Authority
                              </button>
                            )}
                            
                            {emp.confirmationStatus === 'confirmed' && !emp.confirmationLetterGenerated && (
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  setSelectedEmployee(emp);
                                  alert('Generate confirmation letter');
                                }}
                                title="Generate Letter"
                              >
                                Letter
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* CAREER PROGRESSION TAB */}
        {activeTab === 'career' && (
          <>
            {/* STATISTICS */}
            <div className="row g-3 mb-4">
              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Active IDPs</div>
                    <div className="fw-bold fs-5 text-primary">24</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Skill Gaps Identified</div>
                    <div className="fw-bold fs-5 text-warning">18</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Training Recommendations</div>
                    <div className="fw-bold fs-5 text-info">32</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Career Paths Mapped</div>
                    <div className="fw-bold fs-5 text-success">15</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Succession Plans</div>
                    <div className="fw-bold fs-5 text-secondary">8</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Ready for Promotion</div>
                    <div className="fw-bold fs-5 text-success">12</div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Career Progression Quick Actions</strong>
                  <p className="text-muted mb-0 small">Manage career development and progression</p>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowIDPModal(true)}
                  >
                    <Icon icon="heroicons-solid:document-text" className="me-1" />
                    Create IDP
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowSkillGapModal(true)}
                  >
                    <Icon icon="heroicons-solid:chart-bar" className="me-1" />
                    Skill Gap Analysis
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowCareerPathModal(true)}
                  >
                    <Icon icon="heroicons-solid:map" className="me-1" />
                    Career Paths
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowSuccessionPlanningModal(true)}
                  >
                    <Icon icon="heroicons-solid:user-group" className="me-1" />
                    Succession Planning
                  </button>
                </div>
              </div>
            </div>

            {/* CAREER PROGRESSION TABLE */}
            <div className="card">
              <div className="card-header bg-light">
                <strong>Employee Career Progression</strong>
              </div>
              <div className="card-body">
                <div className="alert alert-info">
                  Career progression tracking helps employees plan their growth path and organizations identify high-potential talent.
                  <br />
                  <strong>Features:</strong> Individual Development Plans (IDP), Skill Gap Analysis, Training Recommendations, Career Path Visualization, Succession Planning
                </div>
                
                <div className="row g-3 mt-3">
                  <div className="col-md-6">
                    <div className="card border h-100">
                      <div className="card-header bg-light">
                        <strong>IDP Tracking</strong>
                      </div>
                      <div className="card-body">
                        <p className="small text-muted">Track individual development plans for employees</p>
                        <button 
                          className="btn btn-sm btn-primary w-100"
                          onClick={() => setShowIDPModal(true)}
                        >
                          View/Manage IDPs
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card border h-100">
                      <div className="card-header bg-light">
                        <strong>Skill Gap Analysis</strong>
                      </div>
                      <div className="card-body">
                        <p className="small text-muted">Identify skill gaps and recommend training</p>
                        <button 
                          className="btn btn-sm btn-warning w-100"
                          onClick={() => setShowSkillGapModal(true)}
                        >
                          Analyze Skill Gaps
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card border h-100">
                      <div className="card-header bg-light">
                        <strong>Career Path Visualization</strong>
                      </div>
                      <div className="card-body">
                        <p className="small text-muted">Visualize career progression paths for employees</p>
                        <button 
                          className="btn btn-sm btn-info w-100"
                          onClick={() => setShowCareerPathModal(true)}
                        >
                          View Career Paths
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card border h-100">
                      <div className="card-header bg-light">
                        <strong>Succession Planning</strong>
                      </div>
                      <div className="card-body">
                        <p className="small text-muted">Plan for key role succession and talent pipeline</p>
                        <button 
                          className="btn btn-sm btn-success w-100"
                          onClick={() => setShowSuccessionPlanningModal(true)}
                        >
                          Succession Planning
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PROMOTIONS TAB */}
        {activeTab === 'promotions' && (
          <>
            {/* STATISTICS */}
            <div className="row g-3 mb-4">
              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Total Nominations</div>
                    <div className="fw-bold fs-5 text-primary">{promotionEmployees.length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Under Review</div>
                    <div className="fw-bold fs-5 text-warning">{promotionEmployees.filter(e => e.promotionStatus === 'under_review').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Approved</div>
                    <div className="fw-bold fs-5 text-success">{promotionEmployees.filter(e => e.promotionStatus === 'approved').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Rejected</div>
                    <div className="fw-bold fs-5 text-danger">{promotionEmployees.filter(e => e.promotionStatus === 'rejected').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Eligible</div>
                    <div className="fw-bold fs-5 text-info">{promotionEmployees.filter(e => e.eligibilityStatus === 'eligible').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Needs Review</div>
                    <div className="fw-bold fs-5 text-warning">{promotionEmployees.filter(e => e.promotionCommitteeReview === 'pending').length}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROMOTION CYCLES */}
            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Promotion Cycles</strong>
                  <p className="text-muted mb-0 small">Manage promotion cycles and timelines</p>
                </div>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowPromotionCycleModal(true)}
                >
                  <Icon icon="heroicons-solid:plus" className="me-1" />
                  Create Cycle
                </button>
              </div>
              <div className="row g-2">
                {promotionCycles.map(cycle => (
                  <div key={cycle.id} className="col-md-4">
                    <div className="card border h-100">
                      <div className="card-body p-2">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <strong className="d-block">{cycle.name}</strong>
                            <small className="text-muted text-capitalize">{cycle.type.replace('_', '-')}</small>
                          </div>
                          <span className={`badge ${
                            cycle.status === 'active' ? 'bg-success' :
                            cycle.status === 'completed' ? 'bg-secondary' :
                            'bg-warning'
                          }`}>
                            {cycle.status}
                          </span>
                        </div>
                        <div className="small text-muted mb-2">
                          {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                        </div>
                        <div className="d-flex justify-content-between small">
                          <span>Nominations: <strong>{cycle.nominations}</strong></span>
                          <span>Approved: <strong className="text-success">{cycle.approved}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Promotion Quick Actions</strong>
                  <p className="text-muted mb-0 small">Common promotion management tasks</p>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowPromotionNominationModal(true)}
                  >
                    <Icon icon="heroicons-solid:user-plus" className="me-1" />
                    New Nomination
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowPromotionCycleModal(true)}
                  >
                    <Icon icon="heroicons-solid:calendar" className="me-1" />
                    Manage Cycles
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Run eligibility check for all nominations')}
                  >
                    <Icon icon="heroicons-solid:check-circle" className="me-1" />
                    Check Eligibility
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Schedule committee review')}
                  >
                    <Icon icon="heroicons-solid:clock" className="me-1" />
                    Schedule Review
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowPromotionLetterModal(true)}
                  >
                    <Icon icon="heroicons-solid:document-text" className="me-1" />
                    Generate Letters
                  </button>
                </div>
              </div>
            </div>

            {/* PROMOTION TABLE */}
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ minWidth: '250px' }}>Employee Details</th>
                      <th className="text-center" style={{ minWidth: '120px' }}>Current → Proposed</th>
                      <th className="text-center" style={{ minWidth: '150px' }}>Approval Workflow</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Status</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Salary Impact</th>
                      <th className="text-center" style={{ minWidth: '250px' }}>Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {promotionEmployees.map((emp) => (
                      <tr key={emp.id}>
                        <td>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <strong className="d-block">{emp.name}</strong>
                              <small className="badge bg-secondary">{emp.employeeId}</small>
                            </div>
                            <small className="text-muted d-block">{emp.designation}</small>
                            <div className="d-flex gap-2">
                              <small className="text-muted">{emp.department}</small>
                              <small className="text-muted">•</small>
                              <small className="text-muted">{emp.workLocation}</small>
                            </div>
                          </div>
                        </td>
                        
                        <td className="text-center">
                          <div className="fw-bold">{emp.currentGrade} → {emp.proposedGrade}</div>
                          <div className="small text-muted">{emp.currentDesignation} → {emp.proposedDesignation}</div>
                        </td>
                        
                        <td className="text-center">
                          <PromotionWorkflow employee={emp} />
                        </td>
                        
                        <td className="text-center">
                          {getStatusBadge(emp.promotionStatus)}
                          <div className="small text-muted mt-1">
                            {emp.eligibilityStatus === 'eligible' ? 'Eligible' : 'Not Eligible'}
                          </div>
                        </td>
                        
                        <td className="text-center">
                          <div className="fw-bold text-success">+{Math.round((parseInt(emp.proposedSalary.replace(/[^0-9]/g, '')) - parseInt(emp.currentSalary.replace(/[^0-9]/g, ''))) / parseInt(emp.currentSalary.replace(/[^0-9]/g, '')) * 100)}%</div>
                          <div className="small text-muted">{emp.currentSalary} → {emp.proposedSalary}</div>
                        </td>
                        
                        <td className="text-center">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowDetailModal(true);
                              }}
                              title="View Details"
                            >
                              View
                            </button>
                            
                            <button
                              className="btn btn-outline-info"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowPromotionReviewModal(true);
                              }}
                              title="Review Nomination"
                            >
                              Review
                            </button>
                            
                            <button
                              className="btn btn-outline-success"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                alert('Approve promotion');
                              }}
                              title="Approve"
                              disabled={emp.promotionStatus === 'approved'}
                            >
                              Approve
                            </button>
                            
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                alert('Reject promotion');
                              }}
                              title="Reject"
                              disabled={emp.promotionStatus === 'rejected'}
                            >
                              Reject
                            </button>
                            
                            {emp.promotionStatus === 'approved' && !emp.promotionLetterGenerated && (
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  setSelectedEmployee(emp);
                                  setShowPromotionLetterModal(true);
                                }}
                                title="Generate Letter"
                              >
                                Letter
                              </button>
                            )}
                            
                            {emp.promotionStatus === 'approved' && emp.promotionLetterGenerated && !emp.announcementDate && (
                              <button
                                className="btn btn-outline-info"
                                onClick={() => {
                                  setSelectedEmployee(emp);
                                  setShowPromotionAnnouncementModal(true);
                                }}
                                title="Create Announcement"
                              >
                                Announce
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* BUDDY PROGRAM TAB */}
        {activeTab === 'buddy' && (
          <>
            {/* STATISTICS */}
            <div className="row g-3 mb-4">
              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Active Buddies</div>
                    <div className="fw-bold fs-5 text-primary">{buddies.filter(b => b.status === 'active').length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">New Joiners Assigned</div>
                    <div className="fw-bold fs-5 text-info">{probationEmployees.filter(e => e.buddy).length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Pending Assignment</div>
                    <div className="fw-bold fs-5 text-warning">{probationEmployees.filter(e => !e.buddy).length}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Avg Buddy Rating</div>
                    <div className="fw-bold fs-5 text-success">{buddies.reduce((acc, b) => acc + b.averageRating, 0) / buddies.length || 0}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Feedback Collected</div>
                    <div className="fw-bold fs-5 text-secondary">{buddies.reduce((acc, b) => acc + b.feedback.length, 0)}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <div className="card border shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="fw-bold text-secondary-light small">Program Analytics</div>
                    <button 
                      className="btn btn-sm btn-outline-primary mt-1"
                      onClick={() => alert('View detailed analytics')}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Buddy Program Quick Actions</strong>
                  <p className="text-muted mb-0 small">Manage buddy assignments and program</p>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowBuddyAssignmentModal(true)}
                  >
                    Assign Buddies
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Auto-assign based on rules')}
                  >
                    Auto-Assign
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Collect feedback')}
                  >
                    Collect Feedback
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Generate program report')}
                  >
                    Program Report
                  </button>
                </div>
              </div>
            </div>

            {/* BUDDIES TABLE */}
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th style={{ minWidth: '200px' }}>Buddy Details</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Status</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Assigned New Joiners</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Experience</th>
                      <th className="text-center" style={{ minWidth: '100px' }}>Rating</th>
                      <th className="text-center" style={{ minWidth: '150px' }}>Responsibilities</th>
                      <th className="text-center" style={{ minWidth: '200px' }}>Actions</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {buddies.map((buddy) => (
                      <tr key={buddy.id}>
                        <td>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <strong className="d-block">{buddy.name}</strong>
                              <small className="badge bg-secondary">{buddy.buddyId}</small>
                            </div>
                            <small className="text-muted d-block">{buddy.designation}</small>
                            <small className="text-muted">{buddy.department}</small>
                          </div>
                        </td>
                        
                        <td className="text-center">
                          {buddy.status === 'active' ? (
                            <span className="badge bg-success-subtle text-success">Active</span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-secondary">Inactive</span>
                          )}
                        </td>
                        
                        <td className="text-center">
                          <div className="fw-bold">{buddy.assignedNewJoiners.length}</div>
                          <div className="small text-muted">
                            {buddy.assignedNewJoiners.map(id => (
                              <span key={id} className="badge bg-info-subtle text-info me-1">{id}</span>
                            ))}
                          </div>
                        </td>
                        
                        <td className="text-center">
                          <div className="fw-bold">{buddy.experience}</div>
                        </td>
                        
                        <td className="text-center">
                          <div className="fw-bold">{buddy.averageRating}/5</div>
                          <div className="small text-muted">{buddy.feedback.length} feedbacks</div>
                        </td>
                        
                        <td className="text-center">
                          <div className="small">
                            {buddy.responsibilities.slice(0, 2).map((resp, idx) => (
                              <div key={idx}>{resp}</div>
                            ))}
                            {buddy.responsibilities.length > 2 && (
                              <span className="text-muted">+{buddy.responsibilities.length - 2} more</span>
                            )}
                          </div>
                        </td>
                        
                        <td className="text-center">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => {
                                setSelectedEmployee(buddy);
                                setShowDetailModal(true);
                              }}
                              title="View Details"
                            >
                              View
                            </button>
                            
                            <button
                              className="btn btn-outline-info"
                              onClick={() => {
                                setSelectedEmployee(buddy);
                                alert('Assign new joiner');
                              }}
                              title="Assign New Joiner"
                            >
                              Assign
                            </button>
                            
                            <button
                              className="btn btn-outline-success"
                              onClick={() => {
                                setSelectedEmployee(buddy);
                                alert('Collect feedback');
                              }}
                              title="Collect Feedback"
                            >
                              Feedback
                            </button>
                            
                            <button
                              className="btn btn-outline-warning"
                              onClick={() => {
                                setSelectedEmployee(buddy);
                                alert('Update responsibilities');
                              }}
                              title="Update Responsibilities"
                            >
                              Update
                            </button>
                            
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                setSelectedEmployee(buddy);
                                alert('Deactivate buddy');
                              }}
                              title="Deactivate Buddy"
                            >
                              Deactivate
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ----------------- MODALS ----------------- */}

        {/* PROBATION REVIEW MODAL */}
        {showProbationReviewModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Probation Review - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowProbationReviewModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Complete probation review for <strong>{selectedEmployee.name}</strong>
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Review Type</label>
                      <select className="form-select">
                        <option>30 Day Review</option>
                        <option>60 Day Review</option>
                        <option>90 Day Review</option>
                        <option>Final Review</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Review Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Self-Assessment (Employee)</label>
                      <textarea className="form-control" rows="3" placeholder="Employee self-assessment..." />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Manager Assessment</label>
                      <textarea className="form-control" rows="3" placeholder="Manager assessment and feedback..." />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Skip-Level Manager Review</label>
                      <textarea className="form-control" rows="2" placeholder="Skip-level manager review..." />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">HR Review & Recommendation</label>
                      <textarea className="form-control" rows="2" placeholder="HR review and recommendation..." />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Performance Rating</label>
                      <select className="form-select">
                        <option>Exceeds Expectations</option>
                        <option>Meets Expectations</option>
                        <option>Needs Improvement</option>
                        <option>Unsatisfactory</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Confirmation Decision</label>
                      <select className="form-select">
                        <option>Confirm Employee</option>
                        <option>Extend Probation</option>
                        <option>Terminate Probation</option>
                      </select>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Review Meeting Schedule</label>
                      <div className="input-group">
                        <input type="datetime-local" className="form-control" />
                        <button className="btn btn-outline-secondary" type="button">Schedule</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowProbationReviewModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Probation review submitted');
                      setShowProbationReviewModal(false);
                    }}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EXTENSION MODAL */}
        {showExtensionModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Extend Probation - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowExtensionModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-warning mb-3">
                    Extending probation period for <strong>{selectedEmployee.name}</strong>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Extension Duration (Days)</label>
                    <select className="form-select">
                      <option>15 Days</option>
                      <option>30 Days</option>
                      <option>60 Days</option>
                      <option>90 Days</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">New End Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Reason for Extension</label>
                    <textarea className="form-control" rows="3" placeholder="Provide detailed reason for extension..." />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Performance Improvement Plan</label>
                    <textarea className="form-control" rows="2" placeholder="Outline performance improvement plan..." />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowExtensionModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={() => {
                      alert('Probation extended');
                      setShowExtensionModal(false);
                    }}
                  >
                    Extend Probation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EARLY CONFIRMATION MODAL */}
        {showEarlyConfirmationModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Early Confirmation - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowEarlyConfirmationModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-success mb-3">
                    Early confirmation for <strong>{selectedEmployee.name}</strong>
                  </div>
                  
                  <div className="mb-3">
                    <p>This employee has demonstrated exceptional performance during probation period.</p>
                    <p>Current progress: <strong>{selectedEmployee.progress}%</strong></p>
                    <p>Current rating: <strong>{selectedEmployee.currentRating}</strong></p>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Confirmation Effective Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Manager Justification</label>
                    <textarea className="form-control" rows="3" placeholder="Manager justification for early confirmation..." />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">HR Recommendation</label>
                    <textarea className="form-control" rows="2" placeholder="HR recommendation..." />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowEarlyConfirmationModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => {
                      alert('Early confirmation initiated');
                      setShowEarlyConfirmationModal(false);
                    }}
                  >
                    Initiate Early Confirmation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TERMINATION MODAL */}
        {showTerminationModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Terminate Probation - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowTerminationModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-danger mb-3">
                    Terminating probation for <strong>{selectedEmployee.name}</strong>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Reason for Termination</label>
                    <textarea className="form-control" rows="3" placeholder="Provide detailed reason for termination..." />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Termination Effective Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Notice Period</label>
                    <select className="form-select">
                      <option>Serving Notice Period</option>
                      <option>Notice Period Waived</option>
                      <option>Payment in Lieu</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Exit Interview Required</label>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Schedule exit interview</label>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowTerminationModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => {
                      alert('Probation terminated');
                      setShowTerminationModal(false);
                    }}
                  >
                    Terminate Probation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BUDDY ASSIGNMENT MODAL */}
        {showBuddyAssignmentModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Assign Buddy to New Joiners</h5>
                  <button className="btn-close" onClick={() => setShowBuddyAssignmentModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Assign buddies to new joiners based on buddy assignment rules
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Assignment Rule</label>
                      <select className="form-select">
                        <option>Same Department</option>
                        <option>Similar Role</option>
                        <option>Same Location</option>
                        <option>Experience Match</option>
                        <option>Manual Assignment</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Available Buddies</label>
                      <select className="form-select">
                        <option>Arun Mehta (DevOps Engineer, Engineering)</option>
                        <option>Priya Sharma (Senior Software Engineer, Engineering)</option>
                        <option>Rahul Mehta (HR Executive, Human Resources)</option>
                        <option>Anita Desai (Sales Executive, Sales)</option>
                      </select>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">New Joiners Without Buddies</label>
                      <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {probationEmployees.filter(e => !e.buddy).map(emp => (
                          <div key={emp.id} className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            <label className="form-check-label">
                              {emp.name} ({emp.designation}, {emp.department})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Buddy Responsibilities Checklist</label>
                      <div className="border rounded p-2">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Orientation guidance</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Team introduction</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Process documentation</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Technical onboarding</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Regular check-ins</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Communication Facilitation</label>
                      <div className="input-group">
                        <span className="input-group-text">Send welcome message</span>
                        <input type="text" className="form-control" placeholder="Custom welcome message..." />
                        <button className="btn btn-outline-secondary" type="button">Preview</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowBuddyAssignmentModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Buddies assigned successfully');
                      setShowBuddyAssignmentModal(false);
                    }}
                  >
                    Assign Buddies
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRMATION WORKFLOW MODAL */}
        {showConfirmationWorkflowModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmation Workflow - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowConfirmationWorkflowModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Complete confirmation workflow for <strong>{selectedEmployee.name}</strong>
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header bg-light">Current Status</div>
                        <div className="card-body">
                          <ConfirmationWorkflow employee={selectedEmployee} />
                          <div className="mt-3">
                            <div className="d-flex justify-content-between">
                              <small>Auto-Triggered:</small>
                              <small><strong>{selectedEmployee.autoTriggered ? 'Yes' : 'No'}</strong></small>
                            </div>
                            <div className="d-flex justify-content-between">
                              <small>Probation Review:</small>
                              <small><strong>{selectedEmployee.probationReviewCompleted ? 'Completed' : 'Pending'}</strong></small>
                            </div>
                            <div className="d-flex justify-content-between">
                              <small>Manager Review:</small>
                              <small><strong>{selectedEmployee.managerRecommendation || 'Pending'}</strong></small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header bg-light">Next Action</div>
                        <div className="card-body">
                          <div className="mb-3">
                            <label className="form-label">Action Required</label>
                            <select className="form-select">
                              <option>HR Review & Verification</option>
                              <option>Department Head Approval</option>
                              <option>Authority Approval</option>
                              <option>Process Confirmation</option>
                            </select>
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Review Date</label>
                            <input type="date" className="form-control" />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Comments</label>
                            <textarea className="form-control" rows="2" />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label">Confirmation Effective Date</label>
                            <input type="date" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header bg-light">Bulk Processing Options</div>
                        <div className="card-body">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            <label className="form-check-label">
                              Generate confirmation letter automatically
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            <label className="form-check-label">
                              Notify employee upon confirmation
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            <label className="form-check-label">
                              Update payroll records
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" />
                            <label className="form-check-label">
                              Update employee master data
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmationWorkflowModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Confirmation workflow updated');
                      setShowConfirmationWorkflowModal(false);
                    }}
                  >
                    Update Workflow
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROMOTION CYCLE SETUP MODAL */}
        {showPromotionCycleModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Promotion Cycle Setup</h5>
                  <button className="btn-close" onClick={() => setShowPromotionCycleModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Create or manage promotion cycles for organizing nominations
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Cycle Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g., Annual 2024"
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Cycle Type *</label>
                      <select className="form-select" required>
                        <option value="">Select type...</option>
                        <option value="annual">Annual</option>
                        <option value="bi_annual">Bi-Annual</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="ad_hoc">Ad-hoc</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Start Date *</label>
                      <input type="date" className="form-control" required />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">End Date *</label>
                      <input type="date" className="form-control" required />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Nomination Deadline</label>
                      <input type="date" className="form-control" />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select">
                        <option value="upcoming">Upcoming</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea 
                        className="form-control" 
                        rows="3"
                        placeholder="Describe the promotion cycle objectives and criteria..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowPromotionCycleModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Promotion cycle created successfully');
                      setShowPromotionCycleModal(false);
                    }}
                  >
                    Create Cycle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROMOTION NOMINATION MODAL */}
        {showPromotionNominationModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Promotion Nomination</h5>
                  <button className="btn-close" onClick={() => setShowPromotionNominationModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Nominate employee for promotion with eligibility verification
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Promotion Cycle *</label>
                      <select 
                        className="form-select"
                        value={promotionNominationForm.promotionCycle}
                        onChange={(e) => setPromotionNominationForm({
                          ...promotionNominationForm,
                          promotionCycle: e.target.value
                        })}
                        required
                      >
                        <option value="">Select cycle...</option>
                        {promotionCycles.filter(c => c.status === 'active' || c.status === 'upcoming').map(cycle => (
                          <option key={cycle.id} value={cycle.id}>{cycle.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Nomination By *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Manager name"
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Select Employee *</label>
                      <select 
                        className="form-select"
                        value={promotionNominationForm.employeeId}
                        onChange={(e) => setPromotionNominationForm({
                          ...promotionNominationForm,
                          employeeId: e.target.value
                        })}
                        required
                      >
                        <option value="">Select employee...</option>
                        <option value="EMP001">Rajesh Kumar (Software Engineer)</option>
                        <option value="EMP002">Sneha Patel (HR Executive)</option>
                        <option value="EMP003">Amit Singh (Sales Executive)</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Nomination Date *</label>
                      <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} required />
                    </div>
                    
                    <div className="col-12">
                      <div className="card border">
                        <div className="card-header bg-light">
                          <strong>Eligibility Criteria Check</strong>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-check mb-2">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox"
                                  checked={promotionNominationForm.eligibilityCheck.tenure}
                                  onChange={(e) => setPromotionNominationForm({
                                    ...promotionNominationForm,
                                    eligibilityCheck: {
                                      ...promotionNominationForm.eligibilityCheck,
                                      tenure: e.target.checked
                                    }
                                  })}
                                />
                                <label className="form-check-label">
                                  <strong>Minimum Tenure:</strong> 1 year in current role
                                  <small className="d-block text-muted">Current tenure: 2.5 years ✓</small>
                                </label>
                              </div>
                              
                              <div className="form-check mb-2">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox"
                                  checked={promotionNominationForm.eligibilityCheck.performance}
                                  onChange={(e) => setPromotionNominationForm({
                                    ...promotionNominationForm,
                                    eligibilityCheck: {
                                      ...promotionNominationForm.eligibilityCheck,
                                      performance: e.target.checked
                                    }
                                  })}
                                />
                                <label className="form-check-label">
                                  <strong>Performance Rating:</strong> Exceeds Expectations
                                  <small className="d-block text-muted">Last rating: Exceeds Expectations ✓</small>
                                </label>
                              </div>
                              
                              <div className="form-check mb-2">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox"
                                  checked={promotionNominationForm.eligibilityCheck.grade}
                                  onChange={(e) => setPromotionNominationForm({
                                    ...promotionNominationForm,
                                    eligibilityCheck: {
                                      ...promotionNominationForm.eligibilityCheck,
                                      grade: e.target.checked
                                    }
                                  })}
                                />
                                <label className="form-check-label">
                                  <strong>Grade Eligibility:</strong> Grade progression valid
                                  <small className="d-block text-muted">P3 → P4 eligible ✓</small>
                                </label>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="form-check mb-2">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox"
                                  checked={promotionNominationForm.eligibilityCheck.skills}
                                  onChange={(e) => setPromotionNominationForm({
                                    ...promotionNominationForm,
                                    eligibilityCheck: {
                                      ...promotionNominationForm.eligibilityCheck,
                                      skills: e.target.checked
                                    }
                                  })}
                                />
                                <label className="form-check-label">
                                  <strong>Skills Assessment:</strong> Completed and passed
                                  <small className="d-block text-muted">Assessment status: Completed ✓</small>
                                </label>
                              </div>
                              
                              <div className="form-check mb-2">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox"
                                  checked={promotionNominationForm.eligibilityCheck.training}
                                  onChange={(e) => setPromotionNominationForm({
                                    ...promotionNominationForm,
                                    eligibilityCheck: {
                                      ...promotionNominationForm.eligibilityCheck,
                                      training: e.target.checked
                                    }
                                  })}
                                />
                                <label className="form-check-label">
                                  <strong>Training Requirements:</strong> All mandatory trainings completed
                                  <small className="d-block text-muted">Training status: Completed ✓</small>
                                </label>
                              </div>
                              
                              <div className="alert alert-success mt-3">
                                <strong>Eligibility Status:</strong> {
                                  Object.values(promotionNominationForm.eligibilityCheck).every(v => v) 
                                    ? 'All criteria met ✓' 
                                    : 'Some criteria pending'
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Current Grade & Designation</label>
                      <div className="border rounded p-2">
                        <div className="mb-2">
                          <small className="text-muted">Current Grade</small>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="P3"
                            value={promotionNominationForm.currentGrade}
                            onChange={(e) => setPromotionNominationForm({
                              ...promotionNominationForm,
                              currentGrade: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <small className="text-muted">Current Designation</small>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Senior Software Engineer"
                            value={promotionNominationForm.currentDesignation}
                            onChange={(e) => setPromotionNominationForm({
                              ...promotionNominationForm,
                              currentDesignation: e.target.value
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Proposed Grade & Designation *</label>
                      <div className="border rounded p-2">
                        <div className="mb-2">
                          <small className="text-muted">Proposed Grade *</small>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="P4"
                            value={promotionNominationForm.proposedGrade}
                            onChange={(e) => setPromotionNominationForm({
                              ...promotionNominationForm,
                              proposedGrade: e.target.value
                            })}
                            required
                          />
                        </div>
                        <div>
                          <small className="text-muted">Proposed Designation *</small>
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Tech Lead"
                            value={promotionNominationForm.proposedDesignation}
                            onChange={(e) => setPromotionNominationForm({
                              ...promotionNominationForm,
                              proposedDesignation: e.target.value
                            })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Salary Revision *</label>
                      <div className="row g-2">
                        <div className="col-md-6">
                          <label className="form-label small">Current Salary</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="₹12,00,000"
                            value={promotionNominationForm.currentSalary}
                            onChange={(e) => setPromotionNominationForm({
                              ...promotionNominationForm,
                              currentSalary: e.target.value
                            })}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small">Proposed Salary *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="₹14,50,000"
                            value={promotionNominationForm.proposedSalary}
                            onChange={(e) => setPromotionNominationForm({
                              ...promotionNominationForm,
                              proposedSalary: e.target.value
                            })}
                            required
                          />
                        </div>
                        {promotionNominationForm.currentSalary && promotionNominationForm.proposedSalary && (
                          <div className="col-12">
                            <div className="alert alert-info">
                              <strong>Salary Increase:</strong> {
                                Math.round((
                                  (parseInt(promotionNominationForm.proposedSalary.replace(/[^0-9]/g, '')) - 
                                   parseInt(promotionNominationForm.currentSalary.replace(/[^0-9]/g, ''))) / 
                                  parseInt(promotionNominationForm.currentSalary.replace(/[^0-9]/g, '')) * 100
                                ).toFixed(2))
                              }% | 
                              <strong> Annual Cost Impact:</strong> ₹{
                                (parseInt(promotionNominationForm.proposedSalary.replace(/[^0-9]/g, '')) - 
                                 parseInt(promotionNominationForm.currentSalary.replace(/[^0-9]/g, ''))).toLocaleString('en-IN')
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Justification for Promotion *</label>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Provide detailed justification including achievements, contributions, and readiness for the new role..."
                        value={promotionNominationForm.justification}
                        onChange={(e) => setPromotionNominationForm({
                          ...promotionNominationForm,
                          justification: e.target.value
                        })}
                        required
                      />
                    </div>
                    
                    <div className="col-12">
                      <div className="card border">
                        <div className="card-header bg-light">
                          <strong>Multi-Level Approval Workflow</strong>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                                <label className="form-check-label">
                                  <strong>Manager Approval</strong> - Direct Manager
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                                <label className="form-check-label">
                                  <strong>Department Head Approval</strong> - Department Head
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                                <label className="form-check-label">
                                  <strong>HR Approval</strong> - HR Business Partner
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                                <label className="form-check-label">
                                  <strong>Promotion Committee Review</strong> - Committee Review
                                </label>
                              </div>
                              <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">
                                  <strong>Leadership Approval</strong> - C-Suite/Leadership
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">
                                  <strong>Finance Approval</strong> - Budget Approval (if required)
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowPromotionNominationModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Promotion nomination created');
                      setShowPromotionNominationModal(false);
                    }}
                  >
                    Create Nomination
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROMOTION LETTER MODAL */}
        {showPromotionLetterModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Generate Promotion Letter - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowPromotionLetterModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-success mb-3">
                    Generating promotion letter for <strong>{selectedEmployee.name}</strong>
                  </div>
                  
                  <div className="card mb-3">
                    <div className="card-header bg-light">
                      <strong>Promotion Details</strong>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Current Role</label>
                          <input type="text" className="form-control" value={selectedEmployee.currentDesignation} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">New Role</label>
                          <input type="text" className="form-control" value={selectedEmployee.proposedDesignation} readOnly />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Current Grade</label>
                          <input type="text" className="form-control" value={selectedEmployee.currentGrade} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">New Grade</label>
                          <input type="text" className="form-control" value={selectedEmployee.proposedGrade} readOnly />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label">Current Salary</label>
                          <input type="text" className="form-control" value={selectedEmployee.currentSalary} readOnly />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">New Salary</label>
                          <input type="text" className="form-control" value={selectedEmployee.proposedSalary} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card mb-3">
                    <div className="card-header bg-light">
                      <strong>Letter Options</strong>
                    </div>
                    <div className="card-body">
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label">Include salary details</label>
                      </div>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label">Include effective date</label>
                      </div>
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label">Send via email to employee</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">CC Manager</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowPromotionLetterModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Promotion letter generated successfully');
                      setShowPromotionLetterModal(false);
                    }}
                  >
                    <Icon icon="heroicons-solid:document-download" className="me-1" />
                    Generate & Download Letter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROMOTION ANNOUNCEMENT MODAL */}
        {showPromotionAnnouncementModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Promotion Announcement - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowPromotionAnnouncementModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Create announcement for <strong>{selectedEmployee.name}</strong>'s promotion
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Announcement Date *</label>
                    <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} required />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Announcement Message *</label>
                    <textarea 
                      className="form-control" 
                      rows="5"
                      placeholder="We are pleased to announce the promotion of..."
                      defaultValue={`We are pleased to announce that ${selectedEmployee.name} has been promoted from ${selectedEmployee.currentDesignation} to ${selectedEmployee.proposedDesignation}, effective [date]. This promotion recognizes their outstanding contributions and continued commitment to excellence.`}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Distribution Channels</label>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Company-wide email</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Department notification</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Internal portal/newsletter</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Social media (internal)</label>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Include Photo</label>
                    <input type="file" className="form-control" accept="image/*" />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowPromotionAnnouncementModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Promotion announcement created and sent successfully');
                      setShowPromotionAnnouncementModal(false);
                    }}
                  >
                    Create & Send Announcement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IDP MODAL */}
        {showIDPModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Individual Development Plan (IDP)</h5>
                  <button className="btn-close" onClick={() => setShowIDPModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Create and track Individual Development Plans for employee career growth
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Employee *</label>
                      <select className="form-select" required>
                        <option value="">Select employee...</option>
                        <option>Rajesh Kumar</option>
                        <option>Sneha Patel</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Current Role</label>
                      <input type="text" className="form-control" placeholder="Software Engineer" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Target Role *</label>
                      <input type="text" className="form-control" placeholder="Senior Software Engineer" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Timeline</label>
                      <input type="text" className="form-control" placeholder="6-12 months" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Development Areas</label>
                      <textarea className="form-control" rows="3" placeholder="List key development areas..." />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Training Recommendations</label>
                      <textarea className="form-control" rows="2" placeholder="Recommended training programs..." />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Milestones</label>
                      <textarea className="form-control" rows="3" placeholder="Key milestones and timelines..." />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowIDPModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { alert('IDP created successfully'); setShowIDPModal(false); }}>Save IDP</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SKILL GAP ANALYSIS MODAL */}
        {showSkillGapModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Skill Gap Analysis</h5>
                  <button className="btn-close" onClick={() => setShowSkillGapModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-warning mb-3">
                    Analyze skill gaps and recommend training programs
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Employee *</label>
                      <select className="form-select" required>
                        <option value="">Select employee...</option>
                        <option>Rajesh Kumar</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Target Role</label>
                      <input type="text" className="form-control" placeholder="Senior Software Engineer" />
                    </div>
                    <div className="col-12">
                      <div className="card border">
                        <div className="card-header bg-light">
                          <strong>Current Skills vs Required Skills</strong>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <strong>Current Skills:</strong>
                              <ul>
                                <li>React ✓</li>
                                <li>Node.js ✓</li>
                                <li>MongoDB ✓</li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <strong>Required Skills:</strong>
                              <ul>
                                <li>React ✓</li>
                                <li>Node.js ✓</li>
                                <li>System Design ⚠️</li>
                                <li>Team Leadership ⚠️</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Training Recommendations</label>
                      <textarea className="form-control" rows="3" placeholder="Recommended training programs to bridge skill gaps..." />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowSkillGapModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { alert('Skill gap analysis saved'); setShowSkillGapModal(false); }}>Save Analysis</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CAREER PATH MODAL */}
        {showCareerPathModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Career Path Visualization</h5>
                  <button className="btn-close" onClick={() => setShowCareerPathModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Visualize career progression paths for employees
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Select Employee</label>
                    <select className="form-select">
                      <option>Rajesh Kumar (Software Engineer)</option>
                    </select>
                  </div>
                  
                  <div className="card border">
                    <div className="card-body">
                      <h6>Technical Track Path</h6>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <span className="badge bg-secondary">Software Engineer</span>
                        <Icon icon="heroicons-solid:arrow-right" />
                        <span className="badge bg-info">Senior Software Engineer</span>
                        <Icon icon="heroicons-solid:arrow-right" />
                        <span className="badge bg-primary">Tech Lead</span>
                        <Icon icon="heroicons-solid:arrow-right" />
                        <span className="badge bg-success">Principal Engineer</span>
                      </div>
                      
                      <h6>Management Track Path</h6>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-secondary">Software Engineer</span>
                        <Icon icon="heroicons-solid:arrow-right" />
                        <span className="badge bg-info">Senior Software Engineer</span>
                        <Icon icon="heroicons-solid:arrow-right" />
                        <span className="badge bg-primary">Engineering Manager</span>
                        <Icon icon="heroicons-solid:arrow-right" />
                        <span className="badge bg-success">Senior Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowCareerPathModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESSION PLANNING MODAL */}
        {showSuccessionPlanningModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Succession Planning</h5>
                  <button className="btn-close" onClick={() => setShowSuccessionPlanningModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Plan for key role succession and build talent pipeline
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Key Role *</label>
                      <select className="form-select" required>
                        <option value="">Select role...</option>
                        <option>Engineering Manager</option>
                        <option>Department Head</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Current Incumbent</label>
                      <input type="text" className="form-control" placeholder="Current employee name" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Potential Successors</label>
                      <div className="border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Rajesh Kumar - Ready in 6-12 months</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Priya Sharma - Ready in 12-18 months</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Development Plans</label>
                      <textarea className="form-control" rows="3" placeholder="Development plans for potential successors..." />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowSuccessionPlanningModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => { alert('Succession plan saved'); setShowSuccessionPlanningModal(false); }}>Save Plan</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROMOTION REVIEW MODAL */}
        {showPromotionReviewModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Promotion Review - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowPromotionReviewModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Promotion committee review for <strong>{selectedEmployee.name}</strong>
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header bg-light">Employee Details</div>
                        <div className="card-body">
                          <div className="mb-2">
                            <small className="text-muted d-block">Current</small>
                            <strong>{selectedEmployee.currentDesignation} ({selectedEmployee.currentGrade})</strong>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Proposed</small>
                            <strong>{selectedEmployee.proposedDesignation} ({selectedEmployee.proposedGrade})</strong>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Tenure</small>
                            <strong>{selectedEmployee.tenure}</strong>
                          </div>
                          <div>
                            <small className="text-muted d-block">Performance Rating</small>
                            <strong>{selectedEmployee.performanceRating}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-header bg-light">Salary Impact</div>
                        <div className="card-body">
                          <div className="mb-2">
                            <small className="text-muted d-block">Current Salary</small>
                            <strong>{selectedEmployee.currentSalary}</strong>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Proposed Salary</small>
                            <strong>{selectedEmployee.proposedSalary}</strong>
                          </div>
                          <div className="mb-2">
                            <small className="text-muted d-block">Increase Percentage</small>
                            <strong className="text-success">+{Math.round((parseInt(selectedEmployee.proposedSalary.replace(/[^0-9]/g, '')) - parseInt(selectedEmployee.currentSalary.replace(/[^0-9]/g, ''))) / parseInt(selectedEmployee.currentSalary.replace(/[^0-9]/g, '')) * 100)}%</strong>
                          </div>
                          <div>
                            <small className="text-muted d-block">Annual Cost Impact</small>
                            <strong>₹{(parseInt(selectedEmployee.proposedSalary.replace(/[^0-9]/g, '')) - parseInt(selectedEmployee.currentSalary.replace(/[^0-9]/g, ''))).toLocaleString('en-IN')}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                          <span>Committee Review</span>
                          <PromotionWorkflow employee={selectedEmployee} />
                        </div>
                        <div className="card-body">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label">Committee Decision</label>
                              <select className="form-select">
                                <option>Recommend for Promotion</option>
                                <option>Recommend with Conditions</option>
                                <option>Defer Decision</option>
                                <option>Reject Promotion</option>
                              </select>
                            </div>
                            
                            <div className="col-md-6">
                              <label className="form-label">Effective Date</label>
                              <input type="date" className="form-control" />
                            </div>
                            
                            <div className="col-12">
                              <label className="form-label">Committee Comments</label>
                              <textarea className="form-control" rows="3" placeholder="Committee review comments..." />
                            </div>
                            
                            <div className="col-12">
                              <label className="form-label">Promotion Announcement</label>
                              <div className="input-group">
                                <input type="text" className="form-control" placeholder="Announcement message..." />
                                <button className="btn btn-outline-secondary" type="button">Preview</button>
                              </div>
                            </div>
                            
                            <div className="col-12">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">
                                  Generate promotion letter automatically
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">
                                  Update employee records
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">
                                  Notify payroll department
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowPromotionReviewModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Promotion review completed');
                      setShowPromotionReviewModal(false);
                    }}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DETAILS MODAL */}
        {showDetailModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Details - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  {activeTab === 'probation' && (
                    <div>
                      <h4 className="mb-3">{selectedEmployee.name} - Probation Details</h4>
                      {/* Add probation details content */}
                    </div>
                  )}
                  
                  {activeTab === 'confirmation' && (
                    <div>
                      <h4 className="mb-3">{selectedEmployee.name} - Confirmation Details</h4>
                      {/* Add confirmation details content */}
                    </div>
                  )}
                  
                  {activeTab === 'promotions' && (
                    <div>
                      <h4 className="mb-3">{selectedEmployee.name} - Promotion Details</h4>
                      {/* Add promotion details content */}
                    </div>
                  )}
                  
                  {activeTab === 'buddy' && (
                    <div>
                      <h4 className="mb-3">{selectedEmployee.name} - Buddy Details</h4>
                      {/* Add buddy details content */}
                    </div>
                  )}
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowDetailModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORT MODAL */}
        {showReportModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">HR Operations Reports</h5>
                  <button className="btn-close" onClick={() => setShowReportModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Report Type</label>
                      <select className="form-select">
                        <option>Probation Analytics Report</option>
                        <option>Confirmation Workflow Report</option>
                        <option>Promotion Analytics Report</option>
                        <option>Buddy Program Report</option>
                        <option>Comprehensive HR Operations Report</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Export Format</label>
                      <select className="form-select">
                        <option>PDF Document</option>
                        <option>Excel Spreadsheet</option>
                        <option>CSV File</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Start Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">End Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header bg-light">
                          <strong>Report Preview</strong>
                        </div>
                        <div className="card-body">
                          <p>This report will include:</p>
                          <ul>
                            <li>Probation status and analytics</li>
                            <li>Confirmation workflow progress</li>
                            <li>Promotion nominations and status</li>
                            <li>Buddy program effectiveness</li>
                            <li>Key metrics and trends</li>
                            <li>Recommendations and insights</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowReportModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      alert('Report generated successfully');
                      setShowReportModal(false);
                    }}
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default PromotionsCareer;