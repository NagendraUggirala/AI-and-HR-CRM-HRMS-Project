// EmployeeLifecycleManagement.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

/*
  - Kept all original data & sections from your file.
  - Modernized layout, consistent controls (search, filters, refresh, export).
  - Added handlers: approve/reject transfer, start/complete probation, generate/export CSV, modals.
  - Kept Bootstrap classes to fit your app's theme.
*/

const EmployeeLifecycle = () => {
  // ----- core UI state -----
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // search / filter / pagination shared state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // selected item for modals/details
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showResignationModal, setShowResignationModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [showJobPostingModal, setShowJobPostingModal] = useState(false);
  const [showExitInterviewModal, setShowExitInterviewModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // ----- original mock data (kept unchanged) -----
  const [employees, setEmployees] = useState([
    {
      id: 'EMP001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      stage: 'active',
      hireDate: '2022-03-15',
      probationEndDate: '2022-09-15',
      nextReviewDate: '2024-09-01',
      manager: 'Sarah Johnson'
    },
    {
      id: 'EMP002',
      name: 'Emma Wilson',
      email: 'emma.wilson@company.com',
      department: 'Marketing',
      position: 'Marketing Specialist',
      stage: 'probation',
      hireDate: '2024-01-10',
      probationEndDate: '2024-07-10',
      nextReviewDate: '2024-06-20',
      manager: 'Michael Brown'
    },
    {
      id: 'EMP003',
      name: 'David Chen',
      email: 'david.chen@company.com',
      department: 'Sales',
      position: 'Account Executive',
      stage: 'transfer-pending',
      hireDate: '2021-11-20',
      probationEndDate: '2022-05-20',
      nextReviewDate: '2024-08-15',
      manager: 'Robert Davis'
    },
    {
      id: 'EMP004',
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@company.com',
      department: 'HR',
      position: 'HR Business Partner',
      stage: 'exit-process',
      hireDate: '2020-08-05',
      probationEndDate: '2021-02-05',
      noticePeriodEnd: '2024-06-30',
      manager: 'Jennifer Lee'
    },
    {
      id: 'EMP005',
      name: 'Alex Turner',
      email: 'alex.turner@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      stage: 'contract-renewal',
      hireDate: '2022-06-15',
      contractEndDate: '2024-06-15',
      nextReviewDate: '2024-05-30',
      manager: 'Thomas Wilson'
    }
  ]);

  // Joining checklist
  const [onboardingChecklist, setOnboardingChecklist] = useState([
    { id: 1, task: 'Offer Letter Acceptance', status: 'completed', assignedTo: 'HR', dueDate: '2024-03-01' },
    { id: 2, task: 'Background Verification', status: 'pending', assignedTo: 'HR', dueDate: '2024-03-05' },
    { id: 3, task: 'IT Account Setup', status: 'in-progress', assignedTo: 'IT', dueDate: '2024-03-03' },
    { id: 4, task: 'Equipment Allocation', status: 'pending', assignedTo: 'Admin', dueDate: '2024-03-04' },
    { id: 5, task: 'First Day Orientation', status: 'pending', assignedTo: 'HR', dueDate: '2024-03-06' }
  ]);

  // Probation
  const [probationReviews, setProbationReviews] = useState([
    { id: 1, employeeId: 'EMP002', employeeName: 'Emma Wilson', reviewDate: '2024-04-10', status: 'pending', manager: 'Michael Brown' },
    { id: 2, employeeId: 'EMP006', employeeName: 'Ryan Cooper', reviewDate: '2024-03-25', status: 'completed', rating: 'Exceeds Expectations' },
    { id: 3, employeeId: 'EMP007', employeeName: 'Sophia Martinez', reviewDate: '2024-04-15', status: 'scheduled', manager: 'David Kim' }
  ]);

  // Transfers
  const [transferRequests, setTransferRequests] = useState([
    { id: 'TR001', employeeId: 'EMP003', employeeName: 'David Chen', fromDept: 'Sales', toDept: 'Business Development', type: 'Inter-department', status: 'pending', requestDate: '2024-03-01' },
    { id: 'TR002', employeeId: 'EMP008', employeeName: 'James Wilson', fromLocation: 'New York', toLocation: 'San Francisco', type: 'Inter-location', status: 'approved', requestDate: '2024-02-15', effectiveDate: '2024-04-01', relocationSupport: { housingAssistance: true, travelReimbursement: true, relocationAllowance: 5000, status: 'approved' } },
    { id: 'TR003', employeeId: 'EMP009', employeeName: 'Maria Garcia', fromDept: 'Marketing', toDept: 'Product', type: 'Internal Job Posting', status: 'in-review', requestDate: '2024-03-05' }
  ]);

  // Exit
  const [exitProcesses, setExitProcesses] = useState([
    { id: 'EX001', employeeId: 'EMP004', employeeName: 'Lisa Rodriguez', noticePeriodStart: '2024-04-01', lastWorkingDay: '2024-06-30', status: 'in-process', clearancePending: 2 },
    { id: 'EX002', employeeId: 'EMP010', employeeName: 'Brian Taylor', lastWorkingDay: '2024-03-20', status: 'completed', exitStatus: 'Processed' },
    { id: 'EX003', employeeId: 'EMP011', employeeName: 'Amanda Scott', noticePeriodStart: '2024-04-15', lastWorkingDay: '2024-07-15', status: 'initiated', clearancePending: 4 }
  ]);

  // Contracts
  const [contractRenewals, setContractRenewals] = useState([
    { id: 'CR001', employeeId: 'EMP005', employeeName: 'Alex Turner', contractType: 'Fixed Term', endDate: '2024-06-15', renewalStatus: 'pending', daysRemaining: 45 },
    { id: 'CR002', employeeId: 'EMP012', employeeName: 'Kevin Brown', contractType: 'Project Based', endDate: '2024-05-30', renewalStatus: 'in-progress', daysRemaining: 30 },
    { id: 'CR003', employeeId: 'EMP013', employeeName: 'Olivia Davis', contractType: 'Fixed Term', endDate: '2024-07-31', renewalStatus: 'pending', daysRemaining: 90 }
  ]);

  // Candidates for conversion
  const [candidates, setCandidates] = useState([
    { id: 'CAN001', name: 'Robert Kim', email: 'robert.kim@email.com', position: 'Software Engineer', offerStatus: 'accepted', offerDate: '2024-03-15', joiningDate: '2024-04-01' },
    { id: 'CAN002', name: 'Sarah Lee', email: 'sarah.lee@email.com', position: 'Product Manager', offerStatus: 'pending', offerDate: '2024-03-20', joiningDate: '2024-04-15' },
    { id: 'CAN003', name: 'Michael Park', email: 'michael.park@email.com', position: 'Data Analyst', offerStatus: 'accepted', offerDate: '2024-03-10', joiningDate: '2024-03-25' }
  ]);

  // Confirmation requests
  const [confirmationRequests, setConfirmationRequests] = useState([
    { id: 'CF001', employeeId: 'EMP002', employeeName: 'Emma Wilson', probationEndDate: '2024-07-10', eligibilityStatus: 'eligible', managerApproval: 'pending', hrApproval: 'pending', letterGenerated: false },
    { id: 'CF002', employeeId: 'EMP006', employeeName: 'Ryan Cooper', probationEndDate: '2024-03-25', eligibilityStatus: 'eligible', managerApproval: 'approved', hrApproval: 'approved', letterGenerated: true }
  ]);

  // Background verification
  const [backgroundVerifications, setBackgroundVerifications] = useState([
    { id: 'BV001', employeeId: 'EMP002', employeeName: 'Emma Wilson', status: 'in-progress', initiatedDate: '2024-01-15', completionDate: null, agency: 'Verification Corp' },
    { id: 'BV002', employeeId: 'EMP001', employeeName: 'John Smith', status: 'completed', initiatedDate: '2022-03-10', completionDate: '2022-03-25', agency: 'Verification Corp', result: 'Cleared' }
  ]);

  // Training and certifications
  const [trainings, setTrainings] = useState([
    { id: 'TR001', employeeId: 'EMP001', employeeName: 'John Smith', courseName: 'Advanced React', status: 'completed', completionDate: '2024-02-15', certification: 'Yes' },
    { id: 'TR002', employeeId: 'EMP002', employeeName: 'Emma Wilson', courseName: 'Project Management', status: 'in-progress', completionDate: null, certification: 'Pending' }
  ]);

  // Internal job postings
  const [internalJobPostings, setInternalJobPostings] = useState([
    { id: 'IJP001', title: 'Senior Product Manager', department: 'Product', location: 'San Francisco', postedDate: '2024-03-01', closingDate: '2024-04-01', applicants: 5, status: 'open' },
    { id: 'IJP002', title: 'Lead Software Engineer', department: 'Engineering', location: 'New York', postedDate: '2024-03-10', closingDate: '2024-04-10', applicants: 8, status: 'open' }
  ]);

  // Job applications
  const [jobApplications, setJobApplications] = useState([
    { id: 'APP001', jobId: 'IJP001', employeeId: 'EMP003', employeeName: 'David Chen', appliedDate: '2024-03-05', status: 'under-review' },
    { id: 'APP002', jobId: 'IJP002', employeeId: 'EMP001', employeeName: 'John Smith', appliedDate: '2024-03-12', status: 'shortlisted' }
  ]);

  // Milestones (anniversaries, birthdays)
  const [milestones, setMilestones] = useState([
    { id: 'MS001', employeeId: 'EMP001', employeeName: 'John Smith', type: 'work-anniversary', date: '2024-03-15', years: 2, status: 'upcoming' },
    { id: 'MS002', employeeId: 'EMP004', employeeName: 'Lisa Rodriguez', type: 'birthday', date: '2024-04-10', years: null, status: 'upcoming' }
  ]);

  // Annual verification campaigns
  const [verificationCampaigns, setVerificationCampaigns] = useState([
    { id: 'VC001', name: 'Q1 2024 Information Verification', startDate: '2024-01-01', endDate: '2024-03-31', status: 'active', employeesCount: 150, completedCount: 120 },
    { id: 'VC002', name: 'Q2 2024 Information Verification', startDate: '2024-04-01', endDate: '2024-06-30', status: 'scheduled', employeesCount: 150, completedCount: 0 }
  ]);

  // Resignation requests
  const [resignationRequests, setResignationRequests] = useState([
    { id: 'RES001', employeeId: 'EMP004', employeeName: 'Lisa Rodriguez', submittedDate: '2024-04-01', lastWorkingDay: '2024-06-30', noticePeriod: 90, reason: 'Better opportunity', status: 'accepted', buyoutRequested: false },
    { id: 'RES002', employeeId: 'EMP010', employeeName: 'Brian Taylor', submittedDate: '2024-03-15', lastWorkingDay: '2024-03-20', noticePeriod: 30, reason: 'Personal reasons', status: 'accepted', buyoutRequested: true, buyoutAmount: 5000 }
  ]);

  // Exit interviews
  const [exitInterviews, setExitInterviews] = useState([
    { id: 'EI001', employeeId: 'EMP004', employeeName: 'Lisa Rodriguez', scheduledDate: '2024-06-25', status: 'scheduled', interviewer: 'HR Manager', questionnaireCompleted: false },
    { id: 'EI002', employeeId: 'EMP010', employeeName: 'Brian Taylor', scheduledDate: '2024-03-18', status: 'completed', interviewer: 'HR Manager', questionnaireCompleted: true }
  ]);

  // Asset returns
  const [assetReturns, setAssetReturns] = useState([
    { id: 'AR001', employeeId: 'EMP004', employeeName: 'Lisa Rodriguez', assetType: 'Laptop', assetId: 'LAP-001', returnDate: null, status: 'pending' },
    { id: 'AR002', employeeId: 'EMP004', employeeName: 'Lisa Rodriguez', assetType: 'Access Card', assetId: 'CARD-001', returnDate: null, status: 'pending' }
  ]);

  // Final settlements
  const [finalSettlements, setFinalSettlements] = useState([
    { id: 'FS001', employeeId: 'EMP004', employeeName: 'Lisa Rodriguez', grossAmount: 50000, deductions: 5000, netAmount: 45000, status: 'pending-approval', approvedBy: null },
    { id: 'FS002', employeeId: 'EMP010', employeeName: 'Brian Taylor', grossAmount: 30000, deductions: 2000, netAmount: 28000, status: 'approved', approvedBy: 'Finance Manager' }
  ]);

  // Transfer history
  const [transferHistory, setTransferHistory] = useState([
    { id: 'TH001', employeeId: 'EMP003', employeeName: 'David Chen', fromDept: 'Sales', toDept: 'Business Development', fromLocation: null, toLocation: null, transferDate: '2024-04-01', type: 'Inter-department' }
  ]);

  // Sidebar menu (kept)
  const menuItems = [
    { title: 'Lifecycle Dashboard', icon: 'heroicons:home', id: 'dashboard' },
    { title: 'Joining Process', icon: 'heroicons:user-plus', id: 'joining' },
    { title: 'Active Employment', icon: 'heroicons:users', id: 'active' },
    { title: 'Transfers & Movements', icon: 'heroicons:arrow-right-circle', id: 'transfers' },
    { title: 'Exit Management', icon: 'heroicons:user-minus', id: 'exit' },
    { title: 'Reports & Analytics', icon: 'heroicons:chart-bar', id: 'reports' },
    { title: 'Settings', icon: 'heroicons:cog-6-tooth', id: 'settings' }
  ];

  const userInfo = {
    name: 'HR Manager',
    role: 'Human Resources',
    email: 'hr.manager@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HR'
  };

  // ----- helpers (status badges etc) -----
  const getStageBadge = (stage) => {
    const styles = {
      'active': 'bg-success-subtle text-success',
      'probation': 'bg-warning-subtle text-warning',
      'transfer-pending': 'bg-info-subtle text-info',
      'exit-process': 'bg-danger-subtle text-danger',
      'contract-renewal': 'bg-primary-subtle text-primary'
    };
    const labels = {
      'active': 'Active',
      'probation': 'Probation',
      'transfer-pending': 'Transfer Pending',
      'exit-process': 'Exit Process',
      'contract-renewal': 'Contract Renewal'
    };
    return <span className={`badge ${styles[stage] || 'bg-secondary-subtle text-secondary'}`}>{labels[stage] || stage}</span>;
  };

  const getStatusBadge = (status) => {
    const styles = {
      'completed': 'bg-success-subtle text-success',
      'pending': 'bg-warning-subtle text-warning',
      'in-progress': 'bg-info-subtle text-info',
      'approved': 'bg-success-subtle text-success',
      'rejected': 'bg-danger-subtle text-danger',
      'in-review': 'bg-primary-subtle text-primary',
      'in-process': 'bg-warning-subtle text-warning',
      'initiated': 'bg-info-subtle text-info',
      'scheduled': 'bg-primary-subtle text-primary'
    };
    return <span className={`badge ${styles[status] || 'bg-secondary-subtle text-secondary'}`}>{typeof status === 'string' ? status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ') : status}</span>;
  };

  // ----- computed KPIs (small) -----
  const kpis = useMemo(() => {
    return {
      pendingOnboarding: onboardingChecklist.filter(t => t.status === 'pending').length,
      pendingTransfers: transferRequests.filter(t => t.status === 'pending').length,
      activeExits: exitProcesses.filter(e => e.status === 'in-process').length,
    };
  }, [onboardingChecklist, transferRequests, exitProcesses]);

  // ----- initial load -----
  useEffect(() => {
    // simulate initial load
    setTimeout(() => setIsLoading(false), 250);
  }, []);

  // ----- generic utilities: filter + paginate -----
  const getFilteredList = (list, keyFields = []) => {
    const lower = searchTerm.trim().toLowerCase();
    let filtered = list.filter(item => {
      if (!lower) return true;
      // check fields provided or all string fields
      if (keyFields.length) {
        return keyFields.some(k => (String(item[k] || '')).toLowerCase().includes(lower));
      }
      // fallback: search in all string props
      return Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(lower));
    });

    if (filterStatus !== 'All') {
      filtered = filtered.filter(item => {
        // item.status or item.stage etc.
        return (item.status || item.stage || '').toLowerCase() === filterStatus.toLowerCase();
      });
    }
    return filtered;
  };

  const paginate = (list) => {
    const total = Math.ceil(list.length / itemsPerPage);
    const page = Math.max(1, Math.min(currentPage, total || 1));
    const start = (page - 1) * itemsPerPage;
    return {
      page,
      total,
      data: list.slice(start, start + itemsPerPage)
    };
  };

  // ----- actions (approve/reject etc) -----
  const approveTransfer = (id) => {
    setTransferRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved', effectiveDate: new Date().toISOString().split('T')[0] } : r));
    alert('Transfer approved');
  };

  const rejectTransfer = (id) => {
    setTransferRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    alert('Transfer rejected');
  };

  const startProbationReview = (reviewId) => {
    setProbationReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'in-progress' } : r));
    alert('Probation review started');
  };

  const completeProbationReview = (reviewId, rating) => {
    setProbationReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'completed', rating } : r));
    alert('Probation review completed');
  };

  const initiateExit = (employeeId) => {
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return;
    const newExit = {
      id: `EX${String(exitProcesses.length + 1).padStart(3,'0')}`,
      employeeId: emp.id,
      employeeName: emp.name,
      noticePeriodStart: new Date().toISOString().split('T')[0],
      lastWorkingDay: '',
      status: 'initiated',
      clearancePending: 3
    };
    setExitProcesses([newExit, ...exitProcesses]);
    alert('Exit initiated for ' + emp.name);
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSearchTerm('');
      setFilterStatus('All');
      setCurrentPage(1);
      alert('Data refreshed');
    }, 600);
  };

  const exportCsv = (name, list, headers, mapRow) => {
    const rows = [headers, ...list.map(mapRow)];
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Auto-trigger onboarding checklist when candidate is converted
  const autoTriggerOnboarding = (employeeId, employeeName) => {
    const defaultChecklist = [
      { id: Date.now() + 1, task: 'Offer Letter Acceptance', status: 'completed', assignedTo: 'HR', dueDate: new Date().toISOString().split('T')[0], employeeId },
      { id: Date.now() + 2, task: 'Background Verification', status: 'pending', assignedTo: 'HR', dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], employeeId },
      { id: Date.now() + 3, task: 'IT Account Setup', status: 'pending', assignedTo: 'IT', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], employeeId },
      { id: Date.now() + 4, task: 'Equipment Allocation', status: 'pending', assignedTo: 'Admin', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], employeeId },
      { id: Date.now() + 5, task: 'First Day Orientation', status: 'pending', assignedTo: 'HR', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], employeeId }
    ];
    setOnboardingChecklist(prev => [...defaultChecklist, ...prev]);
    showNotification(`Onboarding checklist auto-triggered for ${employeeName}`);
  };

  // Convert candidate to employee
  const convertCandidateToEmployee = (candidate) => {
    const newEmployee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name: candidate.name,
      email: candidate.email,
      department: 'TBD',
      position: candidate.position,
      stage: 'probation',
      hireDate: candidate.joiningDate,
      probationEndDate: new Date(new Date(candidate.joiningDate).getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextReviewDate: new Date(new Date(candidate.joiningDate).getTime() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      manager: 'TBD'
    };
    setEmployees([...employees, newEmployee]);
    setCandidates(candidates.filter(c => c.id !== candidate.id));
    autoTriggerOnboarding(newEmployee.id, newEmployee.name);
    setShowConversionModal(false);
    showNotification(`${candidate.name} converted to employee successfully`);
  };

  // Calculate notice period
  const calculateNoticePeriod = (resignationDate, noticePeriodDays) => {
    const start = new Date(resignationDate);
    const end = new Date(start.getTime() + noticePeriodDays * 24 * 60 * 60 * 1000);
    return end.toISOString().split('T')[0];
  };

  // Calculate notice period buyout
  const calculateBuyout = (noticePeriodDays, dailySalary) => {
    return noticePeriodDays * dailySalary;
  };

  // Generate confirmation letter
  const generateConfirmationLetter = (confirmationId) => {
    const confirmation = confirmationRequests.find(c => c.id === confirmationId);
    if (confirmation) {
      showNotification(`Confirmation letter generated for ${confirmation.employeeName}`);
      setConfirmationRequests(prev => prev.map(c => c.id === confirmationId ? { ...c, letterGenerated: true } : c));
    }
  };

  // Generate transfer letter
  const generateTransferLetter = (transferId) => {
    const transfer = transferRequests.find(t => t.id === transferId);
    if (transfer) {
      showNotification(`Transfer letter generated for ${transfer.employeeName}`);
    }
  };

  // Generate relieving letter
  const generateRelievingLetter = (exitId) => {
    const exit = exitProcesses.find(e => e.id === exitId);
    if (exit) {
      showNotification(`Relieving letter generated for ${exit.employeeName}`);
    }
  };

  // Generate experience certificate
  const generateExperienceCertificate = (exitId) => {
    const exit = exitProcesses.find(e => e.id === exitId);
    if (exit) {
      showNotification(`Experience certificate generated for ${exit.employeeName}`);
    }
  };

  // Check probation eligibility
  const checkProbationEligibility = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return false;
    const probationEnd = new Date(employee.probationEndDate);
    const today = new Date();
    return today >= probationEnd;
  };

  // Schedule exit interview
  const scheduleExitInterview = (exitId, interviewDate) => {
    const exit = exitProcesses.find(e => e.id === exitId);
    if (exit) {
      const newInterview = {
        id: `EI${String(exitInterviews.length + 1).padStart(3, '0')}`,
        employeeId: exit.employeeId,
        employeeName: exit.employeeName,
        scheduledDate: interviewDate,
        status: 'scheduled',
        interviewer: 'HR Manager',
        questionnaireCompleted: false
      };
      setExitInterviews([...exitInterviews, newInterview]);
      showNotification(`Exit interview scheduled for ${exit.employeeName}`);
    }
  };

  // Calculate final settlement
  const calculateFinalSettlement = (employeeId) => {
    // Mock calculation - in real app, this would fetch salary data
    const grossAmount = 50000;
    const deductions = 5000;
    const netAmount = grossAmount - deductions;
    
    const settlement = {
      id: `FS${String(finalSettlements.length + 1).padStart(3, '0')}`,
      employeeId,
      employeeName: employees.find(e => e.id === employeeId)?.name || 'Unknown',
      grossAmount,
      deductions,
      netAmount,
      status: 'pending-approval',
      approvedBy: null
    };
    setFinalSettlements([...finalSettlements, settlement]);
    return settlement;
  };

  // Approve final settlement
  const approveFinalSettlement = (settlementId, approver) => {
    setFinalSettlements(prev => prev.map(s => s.id === settlementId ? { ...s, status: 'approved', approvedBy: approver } : s));
    showNotification('Final settlement approved');
  };

  // ----- render helpers for each tab (kept content) -----

  const renderTopActions = () => (
    <div className="d-flex flex-wrap gap-3 align-items-center">
      <div className="flex-fill flex-md-grow-0" style={{ minWidth: 0, maxWidth: 720 }}>
        <div className="position-relative">
          <input
            type="text"
            className="form-control ps-3"
            placeholder="Search across current view..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{ paddingRight: '2.5rem' }}
          />
          <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y end-0 me-3 text-muted" />
        </div>
      </div>

      <select className="form-select w-auto" style={{ minWidth: 140 }} value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
        <option value="All">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <div className="d-flex gap-2 flex-wrap">
        <button className="btn btn-outline-primary btn-sm" onClick={refreshData}>
          <Icon icon="heroicons:arrow-path" className="me-2" /> Refresh
        </button>

        <button className="btn btn-primary btn-sm" onClick={() => {
          // example export behavior depending on activeTab
          if (activeTab === 'transfers') {
            exportCsv('transfer_requests', transferRequests, ['ID','Employee','From','To','Type','Status','Requested'], r => [r.id, r.employeeName, r.fromDept || r.fromLocation || '-', r.toDept || r.toLocation || '-', r.type, r.status, r.requestDate]);
          } else if (activeTab === 'joining') {
            exportCsv('onboarding_checklist', onboardingChecklist, ['Task','AssignedTo','DueDate','Status'], t => [t.task, t.assignedTo, t.dueDate, t.status]);
          } else if (activeTab === 'exit') {
            exportCsv('exit_processes', exitProcesses, ['ID','Employee','LastWorkingDay','Status','ClearancePending'], e => [e.id, e.employeeName, e.lastWorkingDay || '-', e.status, e.clearancePending || 0]);
          } else {
            alert('Export for this tab not configured — choose Transfers/Joining/Exit.');
          }
        }}>
          <Icon icon="heroicons:document-arrow-down" className="me-2" /> Export
        </button>
      </div>
    </div>
  );

  // --- Dashboard (kept but cleaned) ---
  const renderDashboard = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-1">Employee Lifecycle Management</h5>
              <p className="text-muted mb-0">Manage complete employee journey from joining to exit</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary" onClick={() => setActiveTab('joining')}>
                <Icon icon="heroicons:user-plus" className="me-2" /> Joining
              </button>
              <button className="btn btn-outline-primary" onClick={() => setActiveTab('transfers')}>
                <Icon icon="heroicons:arrow-right-circle" className="me-2" /> Transfers
              </button>
              <button className="btn btn-outline-primary" onClick={() => setActiveTab('exit')}>
                <Icon icon="heroicons:user-minus" className="me-2" /> Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* simple KPI cards */}
      <div className="col-md-3">
        <div className="card border h-100">
          <div className="card-body text-center">
            <div className="mb-2"><Icon icon="heroicons:user-plus" className="fs-3 text-primary" /></div>
            <p className="text-muted small mb-1">New Joinings</p>
            <h4 className="mb-0">12</h4>
            <p className="text-muted small">This month</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border h-100">
          <div className="card-body text-center">
            <div className="mb-2"><Icon icon="heroicons:clock" className="fs-3 text-warning" /></div>
            <p className="text-muted small mb-1">Pending Probation</p>
            <h4 className="mb-0">{probationReviews.filter(r => r.status === 'pending').length}</h4>
            <p className="text-muted small">Pending reviews</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border h-100">
          <div className="card-body text-center">
            <div className="mb-2"><Icon icon="heroicons:arrow-right-circle" className="fs-3 text-info" /></div>
            <p className="text-muted small mb-1">Transfer Requests</p>
            <h4 className="mb-0">{transferRequests.filter(t => t.status === 'pending').length}</h4>
            <p className="text-muted small">Awaiting approval</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border h-100">
          <div className="card-body text-center">
            <div className="mb-2"><Icon icon="heroicons:user-minus" className="fs-3 text-danger" /></div>
            <p className="text-muted small mb-1">Active Exits</p>
            <h4 className="mb-0">{exitProcesses.filter(e => e.status === 'in-process').length}</h4>
            <p className="text-muted small">In process</p>
          </div>
        </div>
      </div>

      {/* lifecycle stages small panel */}
      <div className="col-12">
        <div className="card border">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <div className="px-3 py-2 bg-light rounded">
                  <Icon icon="heroicons:user-plus" className="fs-4 text-primary" />
                </div>
                <div>
                  <h6 className="mb-0">Joining</h6>
                  <small className="text-muted">Onboarding & Probation - {onboardingChecklist.length} tasks</small>
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center">
                <div className="px-3 py-2 bg-light rounded">
                  <Icon icon="heroicons:users" className="fs-4 text-success" />
                </div>
                <div>
                  <h6 className="mb-0">Active</h6>
                  <small className="text-muted">Active employees - {employees.filter(e => e.stage === 'active').length}</small>
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center">
                <div className="px-3 py-2 bg-light rounded">
                  <Icon icon="heroicons:arrow-right-circle" className="fs-4 text-info" />
                </div>
                <div>
                  <h6 className="mb-0">Transfers</h6>
                  <small className="text-muted">Requests - {transferRequests.length}</small>
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center">
                <div className="px-3 py-2 bg-light rounded">
                  <Icon icon="heroicons:user-minus" className="fs-4 text-danger" />
                </div>
                <div>
                  <h6 className="mb-0">Exit</h6>
                  <small className="text-muted">Exit processes - {exitProcesses.length}</small>
                </div>
              </div>

              <div className="d-flex gap-2 align-items-center">
                <div className="px-3 py-2 bg-light rounded">
                  <Icon icon="heroicons:document-text" className="fs-4 text-primary" />
                </div>
                <div>
                  <h6 className="mb-0">Contracts</h6>
                  <small className="text-muted">Renewals - {contractRenewals.length}</small>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Joining tab (improved table / controls) ---
  const renderJoining = () => {
    const list = getFilteredList(onboardingChecklist, ['task', 'assignedTo', 'dueDate', 'status']);
    const { data, total, page } = paginate(list);
    const candidatesList = getFilteredList(candidates, ['name', 'email', 'position', 'offerStatus']);
    const { data: candidatesData } = paginate(candidatesList);
    
    return (
      <div className="row g-4">
        {/* Candidate to Employee Conversion */}
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Candidate to Employee Conversion</h6>
                <button className="btn btn-sm btn-primary" onClick={() => setShowConversionModal(true)}>
                  <Icon icon="heroicons:user-plus" className="me-1" /> Convert Candidate
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>Offer Status</th>
                      <th>Offer Date</th>
                      <th>Joining Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatesData.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div className="fw-semibold">{c.name}</div>
                          <div className="text-muted small">{c.email}</div>
                        </td>
                        <td>{c.position}</td>
                        <td>{getStatusBadge(c.offerStatus)}</td>
                        <td>{c.offerDate}</td>
                        <td>{c.joiningDate}</td>
                        <td>
                          {c.offerStatus === 'accepted' && (
                            <button className="btn btn-sm btn-success" onClick={() => convertCandidateToEmployee(c)}>
                              <Icon icon="heroicons:arrow-right" className="me-1" /> Convert to Employee
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Background Verification Status */}
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <h6 className="mb-0">Background Verification Status</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Status</th>
                      <th>Initiated Date</th>
                      <th>Completion Date</th>
                      <th>Agency</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backgroundVerifications.map(bv => (
                      <tr key={bv.id}>
                        <td>{bv.employeeName}</td>
                        <td>{getStatusBadge(bv.status)}</td>
                        <td>{bv.initiatedDate}</td>
                        <td>{bv.completionDate || '-'}</td>
                        <td>{bv.agency}</td>
                        <td>{bv.result || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card border">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="card-title mb-0">Onboarding Checklist</h6>
                {renderTopActions()}
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Assigned To</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th style={{ width: 140 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(t => (
                      <tr key={t.id}>
                        <td>{t.task}</td>
                        <td>{t.assignedTo}</td>
                        <td>{t.dueDate}</td>
                        <td>{getStatusBadge(t.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => { setSelectedItem(t); setShowDetailModal(true); }}>
                              <Icon icon="heroicons:eye" />
                            </button>
                            {t.status !== 'completed' && (
                              <button className="btn btn-sm btn-primary" onClick={() => {
                                setOnboardingChecklist(prev => prev.map(p => p.id === t.id ? { ...p, status: 'completed' } : p));
                                alert('Marked completed');
                              }}>
                                Complete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {total > 1 && (
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <small className="text-muted">Showing page {page} of {total}</small>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary" disabled={page === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>Prev</button>
                    <button className="btn btn-sm btn-outline-secondary" disabled={page * itemsPerPage >= list.length} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Requests */}
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <h6 className="mb-0">Confirmation Eligibility & Approval Workflow</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Probation End Date</th>
                      <th>Eligibility</th>
                      <th>Manager Approval</th>
                      <th>HR Approval</th>
                      <th>Letter Generated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmationRequests.map(cf => {
                      const eligible = checkProbationEligibility(cf.employeeId);
                      return (
                        <tr key={cf.id}>
                          <td>{cf.employeeName}</td>
                          <td>{cf.probationEndDate}</td>
                          <td>
                            {eligible ? (
                              <span className="badge bg-success">Eligible</span>
                            ) : (
                              <span className="badge bg-warning">Not Yet Eligible</span>
                            )}
                          </td>
                          <td>{getStatusBadge(cf.managerApproval)}</td>
                          <td>{getStatusBadge(cf.hrApproval)}</td>
                          <td>
                            {cf.letterGenerated ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {eligible && cf.managerApproval === 'pending' && (
                                <button className="btn btn-sm btn-primary" onClick={() => {
                                  setConfirmationRequests(prev => prev.map(c => c.id === cf.id ? { ...c, managerApproval: 'approved' } : c));
                                  showNotification('Manager approval granted');
                                }}>
                                  Approve (Manager)
                                </button>
                              )}
                              {cf.managerApproval === 'approved' && cf.hrApproval === 'pending' && (
                                <button className="btn btn-sm btn-success" onClick={() => {
                                  setConfirmationRequests(prev => prev.map(c => c.id === cf.id ? { ...c, hrApproval: 'approved' } : c));
                                  showNotification('HR approval granted');
                                }}>
                                  Approve (HR)
                                </button>
                              )}
                              {cf.managerApproval === 'approved' && cf.hrApproval === 'approved' && !cf.letterGenerated && (
                                <button className="btn btn-sm btn-info" onClick={() => generateConfirmationLetter(cf.id)}>
                                  <Icon icon="heroicons:document-text" className="me-1" /> Generate Letter
                                </button>
                              )}
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

        {/* Probation Review Reminders */}
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <h6 className="mb-0">Probation Review Reminders</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Review Date</th>
                      <th>Status</th>
                      <th>Manager</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {probationReviews.map(review => {
                      const reviewDate = new Date(review.reviewDate);
                      const today = new Date();
                      const daysUntil = Math.ceil((reviewDate - today) / (1000 * 60 * 60 * 24));
                      const isOverdue = daysUntil < 0;
                      const isUpcoming = daysUntil <= 7 && daysUntil >= 0;
                      
                      return (
                        <tr key={review.id} className={isOverdue ? 'table-danger' : isUpcoming ? 'table-warning' : ''}>
                          <td>{review.employeeName}</td>
                          <td>
                            {review.reviewDate}
                            {isOverdue && <span className="badge bg-danger ms-2">Overdue</span>}
                            {isUpcoming && <span className="badge bg-warning ms-2">Due Soon</span>}
                          </td>
                          <td>{getStatusBadge(review.status)}</td>
                          <td>{review.manager || '-'}</td>
                          <td>{review.rating || '-'}</td>
                          <td>
                            <div className="d-flex gap-2">
                              {review.status === 'pending' && (
                                <button className="btn btn-sm btn-primary" onClick={() => startProbationReview(review.id)}>
                                  Start Review
                                </button>
                              )}
                              {review.status === 'in-progress' && (
                                <button className="btn btn-sm btn-success" onClick={() => {
                                  const rating = prompt('Enter rating (e.g., Exceeds Expectations, Meets Expectations, Below Expectations):');
                                  if (rating) completeProbationReview(review.id, rating);
                                }}>
                                  Complete Review
                                </button>
                              )}
                              {review.status === 'scheduled' && (
                                <button className="btn btn-sm btn-info" onClick={() => showNotification(`Reminder sent to ${review.manager}`)}>
                                  <Icon icon="heroicons:bell" className="me-1" /> Send Reminder
                                </button>
                              )}
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
    );
  };

  // --- Transfers tab ---
  const renderTransfers = () => {
    const list = getFilteredList(transferRequests, ['employeeName', 'fromDept', 'toDept', 'fromLocation', 'toLocation', 'type', 'status']);
    const { data, total, page } = paginate(list);
    const jobPostingsList = getFilteredList(internalJobPostings, ['title', 'department', 'location', 'status']);
    const { data: jobPostingsData } = paginate(jobPostingsList);
    const applicationsList = getFilteredList(jobApplications, ['employeeName', 'status']);
    const { data: applicationsData } = paginate(applicationsList);

    return (
      <div className="row g-4">
        {/* Internal Job Postings */}
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Internal Job Postings</h6>
                <button className="btn btn-sm btn-primary" onClick={() => setShowJobPostingModal(true)}>
                  <Icon icon="heroicons:plus" className="me-1" /> Create Job Posting
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Department</th>
                      <th>Location</th>
                      <th>Posted Date</th>
                      <th>Closing Date</th>
                      <th>Applicants</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobPostingsData.map(job => (
                      <tr key={job.id}>
                        <td className="fw-semibold">{job.title}</td>
                        <td>{job.department}</td>
                        <td>{job.location}</td>
                        <td>{job.postedDate}</td>
                        <td>{job.closingDate}</td>
                        <td><span className="badge bg-info">{job.applicants}</span></td>
                        <td>{getStatusBadge(job.status)}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" onClick={() => { setSelectedItem(job); setShowDetailModal(true); }}>
                            View Applications
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Job Applications */}
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <h6 className="mb-0">Internal Job Applications</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Job Title</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationsData.map(app => (
                      <tr key={app.id}>
                        <td>{app.employeeName}</td>
                        <td>{internalJobPostings.find(j => j.id === app.jobId)?.title || '-'}</td>
                        <td>{app.appliedDate}</td>
                        <td>{getStatusBadge(app.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary">View</button>
                            {app.status === 'under-review' && (
                              <>
                                <button className="btn btn-sm btn-success">Shortlist</button>
                                <button className="btn btn-sm btn-danger">Reject</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card border">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Transfer Requests</h6>
                {renderTopActions()}
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Type</th>
                      <th>From / To</th>
                      <th>Request Date</th>
                      <th>Status</th>
                      <th style={{ width: 180 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(r => (
                      <tr key={r.id}>
                        <td>
                          <div className="fw-semibold">{r.employeeName}</div>
                          <div className="text-muted small">{r.employeeId}</div>
                        </td>
                        <td>{r.type}</td>
                        <td>
                          <div className="small text-muted">{r.fromDept || r.fromLocation}</div>
                          <div className="small text-muted"><Icon icon="heroicons:arrow-right" className="me-1" />{r.toDept || r.toLocation}</div>
                          {r.type === 'Inter-location' && r.relocationSupport && (
                            <div className="mt-1">
                              <span className="badge bg-info-subtle text-info small">
                                <Icon icon="heroicons:truck" className="me-1" />
                                Relocation Support
                              </span>
                            </div>
                          )}
                        </td>
                        <td>{r.requestDate}</td>
                        <td>{getStatusBadge(r.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            {r.status === 'pending' && (
                              <>
                                <button className="btn btn-sm btn-success" onClick={() => {
                                  approveTransfer(r.id);
                                  // Add to transfer history
                                  const transfer = transferRequests.find(t => t.id === r.id);
                                  if (transfer) {
                                    setTransferHistory([{
                                      id: `TH${String(transferHistory.length + 1).padStart(3, '0')}`,
                                      employeeId: transfer.employeeId,
                                      employeeName: transfer.employeeName,
                                      fromDept: transfer.fromDept,
                                      toDept: transfer.toDept,
                                      fromLocation: transfer.fromLocation,
                                      toLocation: transfer.toLocation,
                                      transferDate: new Date().toISOString().split('T')[0],
                                      type: transfer.type
                                    }, ...transferHistory]);
                                  }
                                }}>Approve</button>
                                <button className="btn btn-sm btn-danger" onClick={() => rejectTransfer(r.id)}>Reject</button>
                              </>
                            )}
                            {r.status === 'approved' && (
                              <button className="btn btn-sm btn-info" onClick={() => generateTransferLetter(r.id)}>
                                <Icon icon="heroicons:document-text" className="me-1" /> Generate Letter
                              </button>
                            )}
                            <button className="btn btn-sm btn-outline-primary" onClick={() => { setSelectedItem(r); setShowDetailModal(true); }}>View</button>
                            {r.type === 'Inter-location' && r.relocationSupport && (
                              <button className="btn btn-sm btn-outline-info" onClick={() => {
                                setSelectedItem({...r, showRelocation: true});
                                setShowDetailModal(true);
                              }}>
                                <Icon icon="heroicons:truck" className="me-1" /> Relocation
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {total > 1 && (
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <small className="text-muted">Showing page {page} of {total}</small>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary" disabled={page === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>Prev</button>
                    <button className="btn btn-sm btn-outline-secondary" disabled={page * itemsPerPage >= list.length} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Transfer workflow / stepper */}
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body">
              <h6 className="card-title mb-3">Transfer Approval Workflow</h6>
              <div className="stepper">
                <div className="stepper-item completed mb-3">
                  <div className="stepper-icon"><Icon icon="heroicons:document-text" /></div>
                  <div className="stepper-content">
                    <h6 className="mb-0">Request Submitted</h6>
                    <small className="text-muted">Employee submits transfer request</small>
                  </div>
                </div>
                <div className="stepper-item active mb-3">
                  <div className="stepper-icon"><Icon icon="heroicons:user" /></div>
                  <div className="stepper-content">
                    <h6 className="mb-0">Manager Approval</h6>
                    <small className="text-muted">Current manager reviews request</small>
                  </div>
                </div>
                <div className="stepper-item pending mb-3">
                  <div className="stepper-icon"><Icon icon="heroicons:users" /></div>
                  <div className="stepper-content">
                    <h6 className="mb-0">HR Review</h6>
                    <small className="text-muted">HR evaluates transfer feasibility</small>
                  </div>
                </div>
                <div className="stepper-item pending">
                  <div className="stepper-icon"><Icon icon="heroicons:check" /></div>
                  <div className="stepper-content">
                    <h6 className="mb-0">Final Approval</h6>
                    <small className="text-muted">HR Head gives final approval</small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Transfer History */}
        <div className="col-md-4">
          <div className="card border">
            <div className="card-header bg-light">
              <h6 className="mb-0">Transfer History</h6>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {transferHistory.map(th => (
                  <div key={th.id} className="list-group-item px-0">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="fw-semibold">{th.employeeName}</div>
                        <small className="text-muted">{th.transferDate}</small>
                      </div>
                    </div>
                    <div className="small">
                      <div>{th.fromDept || th.fromLocation} <Icon icon="heroicons:arrow-right" className="mx-1" /> {th.toDept || th.toLocation}</div>
                      <span className="badge bg-secondary-subtle text-secondary">{th.type}</span>
                    </div>
                  </div>
                ))}
                {transferHistory.length === 0 && (
                  <div className="text-center text-muted py-3">No transfer history</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Exit Management tab ---
  const renderExit = () => {
    const list = getFilteredList(exitProcesses, ['employeeName', 'employeeId', 'status']);
    const { data, total, page } = paginate(list);
    const resignationList = getFilteredList(resignationRequests, ['employeeName', 'status', 'reason']);
    const { data: resignationData } = paginate(resignationList);

    return (
      <div className="row g-4">
        {/* Resignation Submission & Acceptance */}
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Resignation Requests</h6>
                <button className="btn btn-sm btn-primary" onClick={() => setShowResignationModal(true)}>
                  <Icon icon="heroicons:plus" className="me-1" /> Submit Resignation
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Submitted Date</th>
                      <th>Last Working Day</th>
                      <th>Notice Period</th>
                      <th>Reason</th>
                      <th>Buyout Requested</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resignationData.map(res => (
                      <tr key={res.id}>
                        <td>{res.employeeName}</td>
                        <td>{res.submittedDate}</td>
                        <td>{res.lastWorkingDay}</td>
                        <td>{res.noticePeriod} days</td>
                        <td>{res.reason}</td>
                        <td>
                          {res.buyoutRequested ? (
                            <span className="badge bg-warning">Yes - ${res.buyoutAmount || 0}</span>
                          ) : (
                            <span className="badge bg-secondary">No</span>
                          )}
                        </td>
                        <td>{getStatusBadge(res.status)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            {res.status === 'pending' && (
                              <>
                                <button className="btn btn-sm btn-success" onClick={() => {
                                  setResignationRequests(prev => prev.map(r => r.id === res.id ? { ...r, status: 'accepted' } : r));
                                  // Create exit process
                                  const newExit = {
                                    id: `EX${String(exitProcesses.length + 1).padStart(3, '0')}`,
                                    employeeId: res.employeeId,
                                    employeeName: res.employeeName,
                                    noticePeriodStart: res.submittedDate,
                                    lastWorkingDay: res.lastWorkingDay,
                                    status: 'initiated',
                                    clearancePending: 4
                                  };
                                  setExitProcesses([newExit, ...exitProcesses]);
                                  showNotification('Resignation accepted and exit process initiated');
                                }}>
                                  Accept
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => {
                                  setResignationRequests(prev => prev.map(r => r.id === res.id ? { ...r, status: 'rejected' } : r));
                                  showNotification('Resignation rejected');
                                }}>
                                  Reject
                                </button>
                              </>
                            )}
                            {res.buyoutRequested && res.status === 'accepted' && (
                              <button className="btn btn-sm btn-info" onClick={() => {
                                showNotification(`Buyout amount: $${res.buyoutAmount || 0}. Notice period reduced.`);
                              }}>
                                Process Buyout
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
          </div>
        </div>

        <div className="col-md-8">
          <div className="card border">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Exit Process Tracking</h6>
                {renderTopActions()}
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Last Working Day</th>
                      <th>Notice Period</th>
                      <th>Clearance Pending</th>
                      <th>Status</th>
                      <th style={{ width: 160 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(e => (
                      <tr key={e.id}>
                        <td>
                          <div className="fw-semibold">{e.employeeName}</div>
                          <div className="text-muted small">{e.employeeId}</div>
                        </td>
                        <td>{e.lastWorkingDay || '-'}</td>
                        <td>{e.noticePeriodStart ? `${e.noticePeriodStart} → ${e.lastWorkingDay || '-'}` : 'Completed'}</td>
                        <td>{e.clearancePending ? <span className="badge bg-warning">{e.clearancePending} departments</span> : <span className="badge bg-success">Completed</span>}</td>
                        <td>{getStatusBadge(e.status)}</td>
                        <td>
                          <div className="d-flex gap-2 flex-wrap">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => { setSelectedItem(e); setShowDetailModal(true); }}>View Details</button>
                            {e.status === 'in-process' && (
                              <>
                                <button className="btn btn-sm btn-warning" onClick={() => alert('Tracking clearance (demo)')}>Track Clearance</button>
                                <button className="btn btn-sm btn-info" onClick={() => {
                                  const interviewDate = prompt('Enter exit interview date (YYYY-MM-DD):');
                                  if (interviewDate) scheduleExitInterview(e.id, interviewDate);
                                }}>
                                  <Icon icon="heroicons:calendar" className="me-1" /> Schedule Interview
                                </button>
                                <button className="btn btn-sm btn-success" onClick={() => {
                                  const settlement = calculateFinalSettlement(e.employeeId);
                                  setShowSettlementModal(true);
                                  setSelectedItem(settlement);
                                }}>
                                  Calculate Settlement
                                </button>
                              </>
                            )}
                            {e.status === 'in-process' && (
                              <>
                                <button className="btn btn-sm btn-primary" onClick={() => generateRelievingLetter(e.id)}>
                                  <Icon icon="heroicons:document-text" className="me-1" /> Relieving Letter
                                </button>
                                <button className="btn btn-sm btn-secondary" onClick={() => generateExperienceCertificate(e.id)}>
                                  <Icon icon="heroicons:academic-cap" className="me-1" /> Experience Cert
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {total > 1 && (
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <small className="text-muted">Showing page {page} of {total}</small>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary" disabled={page === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>Prev</button>
                    <button className="btn btn-sm btn-outline-secondary" disabled={page * itemsPerPage >= list.length} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body">
              <h6 className="mb-3">Clearance Checklist</h6>
              <div className="list-group list-group-flush mb-3">
                <div className="list-group-item px-0 py-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="it-clearance" defaultChecked />
                    <label className="form-check-label ms-2" htmlFor="it-clearance">IT Department</label>
                    <div className="text-muted small ms-4">Return laptop, deactivate accounts</div>
                  </div>
                </div>
                <div className="list-group-item px-0 py-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="admin-clearance" />
                    <label className="form-check-label ms-2" htmlFor="admin-clearance">Admin Department</label>
                    <div className="text-muted small ms-4">Return access cards, equipment</div>
                  </div>
                </div>
                <div className="list-group-item px-0 py-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="finance-clearance" />
                    <label className="form-check-label ms-2" htmlFor="finance-clearance">Finance Department</label>
                    <div className="text-muted small ms-4">Clear dues, final settlement</div>
                  </div>
                </div>
                <div className="list-group-item px-0 py-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="hr-clearance" />
                    <label className="form-check-label ms-2" htmlFor="hr-clearance">HR Department</label>
                    <div className="text-muted small ms-4">Exit interview, document collection</div>
                  </div>
                </div>
              </div>

              {/* Asset Return Tracking */}
              <h6 className="mb-3 mt-4">Asset Return Tracking</h6>
              <div className="list-group list-group-flush mb-3">
                {assetReturns.map(ar => (
                  <div key={ar.id} className="list-group-item px-0 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold small">{ar.assetType}</div>
                        <div className="text-muted small">{ar.assetId}</div>
                      </div>
                      <div>
                        {ar.status === 'pending' ? (
                          <span className="badge bg-warning">Pending</span>
                        ) : (
                          <span className="badge bg-success">Returned</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exit Interviews */}
              <h6 className="mb-3 mt-4">Exit Interviews</h6>
              <div className="list-group list-group-flush mb-3">
                {exitInterviews.map(ei => (
                  <div key={ei.id} className="list-group-item px-0 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold small">{ei.employeeName}</div>
                        <div className="text-muted small">Scheduled: {ei.scheduledDate}</div>
                      </div>
                      <div>
                        {ei.questionnaireCompleted ? (
                          <span className="badge bg-success">Completed</span>
                        ) : (
                          <button className="btn btn-sm btn-outline-primary" onClick={() => setShowExitInterviewModal(true)}>
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final Settlement */}
              <h6 className="mb-3 mt-4">Final Settlement</h6>
              <div className="list-group list-group-flush">
                {finalSettlements.slice(0, 3).map(fs => (
                  <div key={fs.id} className="list-group-item px-0 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold small">{fs.employeeName}</div>
                        <div className="text-muted small">Net: ${fs.netAmount.toLocaleString()}</div>
                      </div>
                      <div>
                        {fs.status === 'pending-approval' ? (
                          <button className="btn btn-sm btn-success" onClick={() => approveFinalSettlement(fs.id, 'Finance Manager')}>
                            Approve
                          </button>
                        ) : (
                          <span className="badge bg-success">Approved</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exit analytics kept */}
        <div className="col-12">
          <div className="card border">
            <div className="card-body">
              <h6 className="mb-3">Exit Analytics & Attrition Tracking</h6>
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="card border text-center p-3">
                    <h3 className="fw-bold text-danger mb-1">12%</h3>
                    <p className="text-muted mb-0">Attrition Rate</p>
                    <p className="text-danger small mb-0">↑ 2% from last quarter</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border text-center p-3">
                    <h3 className="fw-bold text-warning mb-1">8</h3>
                    <p className="text-muted mb-0">Voluntary Exits</p>
                    <p className="text-warning small mb-0">Better opportunities</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border text-center p-3">
                    <h3 className="fw-bold text-info mb-1">3</h3>
                    <p className="text-muted mb-0">Involuntary Exits</p>
                    <p className="text-info small mb-0">Performance related</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border text-center p-3">
                    <h3 className="fw-bold text-success mb-1">2.4</h3>
                    <p className="text-muted mb-0">Avg. Tenure (Years)</p>
                    <p className="text-success small mb-0">Industry avg: 2.1 years</p>
                  </div>
                </div>
              </div>

              {/* top exit reasons */}
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Top Exit Reasons</h6>
                  <button className="btn btn-sm btn-outline-primary">View Detailed Report</button>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1"><span>Better Opportunity</span><span>45%</span></div>
                      <div className="progress"><div className="progress-bar bg-primary" style={{ width: '45%' }}></div></div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1"><span>Career Growth</span><span>30%</span></div>
                      <div className="progress"><div className="progress-bar bg-info" style={{ width: '30%' }}></div></div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1"><span>Work-Life Balance</span><span>15%</span></div>
                      <div className="progress"><div className="progress-bar bg-warning" style={{ width: '15%' }}></div></div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1"><span>Compensation</span><span>10%</span></div>
                      <div className="progress"><div className="progress-bar bg-danger" style={{ width: '10%' }}></div></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  };

  // --- Reports tab (kept) ---
  const renderReports = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border">
          <div className="card-body">
            <h6 className="mb-3">Lifecycle Reports & Analytics</h6>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card border">
                  <div className="card-body d-flex align-items-center gap-3">
                    <Icon icon="heroicons:chart-bar" className="text-primary fs-3" />
                    <div>
                      <h6 className="mb-0">Joining Report</h6>
                      <small className="text-muted">Monthly onboarding summary</small>
                    </div>
                    <div className="ms-auto">
                      <button className="btn btn-primary" onClick={() => exportCsv('joining_report', onboardingChecklist, ['Task','AssignedTo','DueDate','Status'], t => [t.task, t.assignedTo, t.dueDate, t.status])}>Generate</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border">
                  <div className="card-body d-flex align-items-center gap-3">
                    <Icon icon="heroicons:arrow-trending-up" className="text-success fs-3" />
                    <div>
                      <h6 className="mb-0">Turnover Analysis</h6>
                      <small className="text-muted">Exit trends and patterns</small>
                    </div>
                    <div className="ms-auto">
                      <button className="btn btn-success" onClick={() => alert('Turnover report generated (demo)')}>Generate</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border">
                  <div className="card-body d-flex align-items-center gap-3">
                    <Icon icon="heroicons:user-group" className="text-info fs-3" />
                    <div>
                      <h6 className="mb-0">Headcount Report</h6>
                      <small className="text-muted">Department-wise employee count</small>
                    </div>
                    <div className="ms-auto">
                      <button className="btn btn-info" onClick={() => alert('Headcount report generated (demo)')}>Generate</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* recent generated reports table (kept content) */}
            <div className="mt-3 table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Generated Date</th>
                    <th>Type</th>
                    <th>Generated By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Q1 2024 Attrition Report</td>
                    <td>2024-03-30</td>
                    <td><span className="badge bg-danger">Exit Analysis</span></td>
                    <td>HR Manager</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">View</button>
                      <button className="btn btn-sm btn-outline-success">Download</button>
                    </td>
                  </tr>
                  <tr>
                    <td>March 2024 Joining Report</td>
                    <td>2024-03-31</td>
                    <td><span className="badge bg-primary">Joining</span></td>
                    <td>HR Manager</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">View</button>
                      <button className="btn btn-sm btn-outline-success">Download</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  // main switcher
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'joining': return renderJoining();
      case 'transfers': return renderTransfers();
      case 'exit': return renderExit();
      case 'reports': return renderReports();
      case 'active': 
        // Enhanced Active Employment section with milestones, verification, contracts, training
        const list = getFilteredList(employees, ['name','email','department','position','stage']);
        const { data, total, page } = paginate(list);
        return (
          <div className="row g-4">
            {/* Active Employees */}
            <div className="col-12">
              <div className="card border">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Active Employees</h6>
                    {renderTopActions()}
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Department</th>
                          <th>Position</th>
                          <th>Hire Date</th>
                          <th>Stage</th>
                          <th>Next Review</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map(emp => (
                          <tr key={emp.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="w-40-px h-40-px bg-light rounded-circle d-flex align-items-center justify-content-center me-3"><Icon icon="heroicons:user" className="text-muted" /></div>
                                <div>
                                  <div className="fw-semibold">{emp.name}</div>
                                  <small className="text-muted">{emp.email}</small>
                                </div>
                              </div>
                            </td>
                            <td>{emp.department}</td>
                            <td>{emp.position}</td>
                            <td>{emp.hireDate}</td>
                            <td>{getStageBadge(emp.stage)}</td>
                            <td>{emp.nextReviewDate || '-'}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => { setSelectedItem(emp); setShowDetailModal(true); }}>View</button>
                                <button className="btn btn-sm btn-outline-warning" onClick={() => alert('Update employee (demo)')}>Update</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {total > 1 && (
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <small className="text-muted">Showing page {page} of {total}</small>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-secondary" disabled={page === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>Prev</button>
                        <button className="btn btn-sm btn-outline-secondary" disabled={page * itemsPerPage >= list.length} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Milestone Tracking */}
            <div className="col-md-6">
              <div className="card border">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Milestone Tracking</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Type</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {milestones.map(ms => (
                          <tr key={ms.id}>
                            <td>{ms.employeeName}</td>
                            <td>
                              {ms.type === 'work-anniversary' ? (
                                <span className="badge bg-primary"><Icon icon="heroicons:cake" className="me-1" /> {ms.years} Year Anniversary</span>
                              ) : (
                                <span className="badge bg-info"><Icon icon="heroicons:gift" className="me-1" /> Birthday</span>
                              )}
                            </td>
                            <td>{ms.date}</td>
                            <td>{getStatusBadge(ms.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Renewal Tracking */}
            <div className="col-md-6">
              <div className="card border">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Contract Renewal Tracking</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Contract Type</th>
                          <th>End Date</th>
                          <th>Days Remaining</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contractRenewals.map(cr => (
                          <tr key={cr.id} className={cr.daysRemaining <= 30 ? 'table-warning' : ''}>
                            <td>{cr.employeeName}</td>
                            <td>{cr.contractType}</td>
                            <td>{cr.endDate}</td>
                            <td>
                              <span className={cr.daysRemaining <= 30 ? 'text-danger fw-bold' : ''}>
                                {cr.daysRemaining} days
                              </span>
                            </td>
                            <td>{getStatusBadge(cr.renewalStatus)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Information Verification Campaigns */}
            <div className="col-12">
              <div className="card border">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Annual Information Verification Campaigns</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Campaign Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Progress</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {verificationCampaigns.map(vc => {
                          const progress = (vc.completedCount / vc.employeesCount) * 100;
                          return (
                            <tr key={vc.id}>
                              <td>{vc.name}</td>
                              <td>{vc.startDate}</td>
                              <td>{vc.endDate}</td>
                              <td>{getStatusBadge(vc.status)}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <div className="progress flex-grow-1" style={{ height: '20px' }}>
                                    <div className="progress-bar" style={{ width: `${progress}%` }}>{progress.toFixed(0)}%</div>
                                  </div>
                                  <small>{vc.completedCount}/{vc.employeesCount}</small>
                                </div>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">View Details</button>
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

            {/* Training & Certification Tracking */}
            <div className="col-12">
              <div className="card border">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Training & Certification Tracking</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Course/Certification</th>
                          <th>Status</th>
                          <th>Completion Date</th>
                          <th>Certification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trainings.map(tr => (
                          <tr key={tr.id}>
                            <td>{tr.employeeName}</td>
                            <td>{tr.courseName}</td>
                            <td>{getStatusBadge(tr.status)}</td>
                            <td>{tr.completionDate || '-'}</td>
                            <td>
                              {tr.certification === 'Yes' ? (
                                <span className="badge bg-success"><Icon icon="heroicons:check-circle" className="me-1" /> Certified</span>
                              ) : (
                                <span className="badge bg-warning">Pending</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: return renderDashboard();
    }
  };

  

  return (
    <div className="container-fluid px-3 px-md-4 py-3">
      {/* Notification */}
      {notification && (
        <div className={`position-fixed top-0 end-0 m-3 z-50 alert alert-${notification.type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`} role="alert">
          {notification.message}
          <button type="button" className="btn-close" onClick={() => setNotification(null)}></button>
        </div>
      )}

      <div className="mb-4">
        <h5 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2"><Icon icon="heroicons:user-group" /> Employee Lifecycle Management</h5>
        <p className="text-muted">Manage complete employee journey from onboarding, active employment, transfers to exit</p>
      </div>

        {/* Tabs */}
        <div className="card border shadow-none mb-4">
          <div className="card-body p-3">
            <div className="d-flex flex-wrap gap-2">
              {menuItems.slice(0,6).map(item => (
                <button key={item.id} className={`btn ${activeTab === item.id ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => { setActiveTab(item.id); setSearchTerm(''); setFilterStatus('All'); setCurrentPage(1); }}>
                  <Icon icon={item.icon} className="me-2" /> {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="card border shadow-none">
          <div className="card-body">
            {renderContent()}
          </div>
        </div>

        {/* Quick Links footer (kept) */}
        <div className="card border shadow-none mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex gap-3">
                <a href="#" className="text-decoration-none d-flex align-items-center gap-2"><Icon icon="heroicons:document-arrow-down" /> <span>Export All Data</span></a>
                <a href="#" className="text-decoration-none d-flex align-items-center gap-2"><Icon icon="heroicons:bell-alert" /> <span>Set Notifications</span></a>
                <a href="#" className="text-decoration-none d-flex align-items-center gap-2"><Icon icon="heroicons:cog-6-tooth" /> <span>Workflow Settings</span></a>
              </div>
              <div className="text-muted small">Employee Lifecycle Management v2.0 • Based on HRMS 1.0 Specifications</div>
            </div>
          </div>
        </div>

        {/* Detail Modal - re-usable for Transfers / Exit / Checklist items / Employee */}
        {showDetailModal && selectedItem && (
          <div
            className="modal show d-block"
            role="dialog"
            aria-modal="true"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => { setShowDetailModal(false); setSelectedItem(null); }}
          >
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Details</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowDetailModal(false); setSelectedItem(null); }}></button>
                </div>
                <div className="modal-body">
                  {/* Generic details viewer - show available fields */}
                  <div className="row g-3">
                    {Object.entries(selectedItem).filter(([k, v]) => k !== 'showRelocation' && k !== 'relocationSupport' && typeof v !== 'object').map(([k, v]) => (
                      <div className="col-md-6" key={k}>
                        <label className="form-label small text-muted">{k}</label>
                        <div className="form-control-plaintext">{String(v)}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Relocation Support Details */}
                  {selectedItem.showRelocation && selectedItem.relocationSupport && (
                    <div className="mt-4 p-3 bg-light rounded">
                      <h6 className="mb-3">Relocation Support Details</h6>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Housing Assistance</label>
                          <div className="form-control-plaintext">
                            {selectedItem.relocationSupport.housingAssistance ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Travel Reimbursement</label>
                          <div className="form-control-plaintext">
                            {selectedItem.relocationSupport.travelReimbursement ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Relocation Allowance</label>
                          <div className="form-control-plaintext fw-bold">${selectedItem.relocationSupport.relocationAllowance?.toLocaleString() || 0}</div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Status</label>
                          <div className="form-control-plaintext">
                            {getStatusBadge(selectedItem.relocationSupport.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowDetailModal(false); setSelectedItem(null); }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidate Conversion Modal */}
        {showConversionModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Convert Candidate to Employee</h5>
                  <button type="button" className="btn-close" onClick={() => setShowConversionModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Select a candidate to convert to employee. This will auto-trigger the onboarding checklist.</p>
                  <select className="form-select" onChange={(e) => {
                    const candidate = candidates.find(c => c.id === e.target.value);
                    if (candidate) convertCandidateToEmployee(candidate);
                  }}>
                    <option value="">Select Candidate</option>
                    {candidates.filter(c => c.offerStatus === 'accepted').map(c => (
                      <option key={c.id} value={c.id}>{c.name} - {c.position}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowConversionModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resignation Submission Modal */}
        {showResignationModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Submit Resignation</h5>
                  <button type="button" className="btn-close" onClick={() => setShowResignationModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Employee</label>
                    <select className="form-select">
                      <option value="">Select Employee</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Resignation Date</label>
                    <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notice Period (days)</label>
                    <input type="number" className="form-control" defaultValue="30" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea className="form-control" rows="3" placeholder="Enter resignation reason"></textarea>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="buyout-request" />
                    <label className="form-check-label" htmlFor="buyout-request">Request Notice Period Buyout</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowResignationModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => {
                    showNotification('Resignation submitted successfully');
                    setShowResignationModal(false);
                  }}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Final Settlement Modal */}
        {showSettlementModal && selectedItem && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Final Settlement - {selectedItem.employeeName}</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowSettlementModal(false); setSelectedItem(null); }}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Gross Amount</label>
                      <div className="form-control-plaintext fw-bold">${selectedItem.grossAmount?.toLocaleString() || 0}</div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Deductions</label>
                      <div className="form-control-plaintext text-danger">-${selectedItem.deductions?.toLocaleString() || 0}</div>
                    </div>
                    <div className="col-12">
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label fw-bold">Net Amount</label>
                        <div className="h4 text-success mb-0">${selectedItem.netAmount?.toLocaleString() || 0}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowSettlementModal(false); setSelectedItem(null); }}>Close</button>
                  {selectedItem.status === 'pending-approval' && (
                    <button type="button" className="btn btn-success" onClick={() => {
                      approveFinalSettlement(selectedItem.id, 'Finance Manager');
                      setShowSettlementModal(false);
                      setSelectedItem(null);
                    }}>Approve Settlement</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exit Interview Modal */}
        {showExitInterviewModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Exit Interview Questionnaire</h5>
                  <button type="button" className="btn-close" onClick={() => setShowExitInterviewModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">1. What is your primary reason for leaving?</label>
                    <textarea className="form-control" rows="2"></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">2. How would you rate your overall experience?</label>
                    <select className="form-select">
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Poor</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">3. What could we have done better?</label>
                    <textarea className="form-control" rows="2"></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">4. Would you consider returning in the future?</label>
                    <select className="form-select">
                      <option>Yes</option>
                      <option>Maybe</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowExitInterviewModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => {
                    showNotification('Exit interview questionnaire completed');
                    setShowExitInterviewModal(false);
                  }}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Internal Job Posting Modal */}
        {showJobPostingModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Internal Job Posting</h5>
                  <button type="button" className="btn-close" onClick={() => setShowJobPostingModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Job Title</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Department</label>
                      <select className="form-select">
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Sales</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Closing Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Job Description</label>
                      <textarea className="form-control" rows="4"></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowJobPostingModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={() => {
                    showNotification('Internal job posting created');
                    setShowJobPostingModal(false);
                  }}>Create Posting</button>
                </div>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default EmployeeLifecycle;
