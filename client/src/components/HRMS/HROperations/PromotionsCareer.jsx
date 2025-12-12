import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

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
  const [activeTab, setActiveTab] = useState('probation');
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Selected items
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

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
    <div
      menuItems={menuItems} 
      userInfo={userInfo}
      appName="HRMS - HR Operations"
    >
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
              className={`nav-link ${activeTab === 'probation' ? 'active' : ''}`}
              onClick={() => setActiveTab('probation')}
            >
              <Icon icon="heroicons-solid:document-search" className="me-1" />
              Probation Management
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'confirmation' ? 'active' : ''}`}
              onClick={() => setActiveTab('confirmation')}
            >
              <Icon icon="heroicons-solid:document-check" className="me-1" />
              Employee Confirmation
            </button>
          </li>
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
                    New Nomination
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Run eligibility check')}
                  >
                    Check Eligibility
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Schedule committee review')}
                  >
                    Schedule Review
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert('Generate promotion letters')}
                  >
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
                                  alert('Generate promotion letter');
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

        {/* PROMOTION NOMINATION MODAL */}
        {showPromotionNominationModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Promotion Nomination</h5>
                  <button className="btn-close" onClick={() => setShowPromotionNominationModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Create new promotion nomination
                  </div>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Promotion Cycle</label>
                      <select className="form-select">
                        <option>Annual</option>
                        <option>Bi-Annual</option>
                        <option>Quarterly</option>
                        <option>Ad-hoc</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Nomination By</label>
                      <input type="text" className="form-control" placeholder="Manager name" />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Select Employee</label>
                      <select className="form-select">
                        <option>Select employee...</option>
                        <option>Rajesh Kumar (Software Engineer)</option>
                        <option>Sneha Patel (HR Executive)</option>
                        <option>Amit Singh (Sales Executive)</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Nomination Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Eligibility Criteria Check</label>
                      <div className="border rounded p-2">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Minimum tenure: 1 year</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label">Performance rating: Exceeds Expectations</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Skills assessment completed</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">Training requirements met</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Proposed Changes</label>
                      <div className="border rounded p-2">
                        <div className="mb-2">
                          <small className="text-muted">Current Grade</small>
                          <input type="text" className="form-control form-control-sm" placeholder="P3" />
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Proposed Grade</small>
                          <input type="text" className="form-control form-control-sm" placeholder="P4" />
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">Current Designation</small>
                          <input type="text" className="form-control form-control-sm" placeholder="Senior Software Engineer" />
                        </div>
                        <div>
                          <small className="text-muted">Proposed Designation</small>
                          <input type="text" className="form-control form-control-sm" placeholder="Tech Lead" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Salary Revision</label>
                      <div className="row g-2">
                        <div className="col-md-6">
                          <input type="text" className="form-control" placeholder="Current Salary" />
                        </div>
                        <div className="col-md-6">
                          <input type="text" className="form-control" placeholder="Proposed Salary" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Justification for Promotion</label>
                      <textarea className="form-control" rows="3" placeholder="Provide detailed justification..." />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label">Approval Workflow Setup</label>
                      <select className="form-select" multiple>
                        <option>Manager Approval</option>
                        <option>Department Head Approval</option>
                        <option>HR Approval</option>
                        <option>Promotion Committee Review</option>
                        <option>Leadership Approval</option>
                      </select>
                      <small className="text-muted">Hold Ctrl/Cmd to select multiple</small>
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
    </div>
  );
};

export default PromotionsCareer;