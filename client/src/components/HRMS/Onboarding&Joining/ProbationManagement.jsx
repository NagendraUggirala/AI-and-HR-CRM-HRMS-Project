import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';
const ProbationManagement = () => {
  // ---------------- INITIAL DATA ----------------
  const initialProbationEmployees = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Rajesh Kumar',
      designation: 'Software Engineer',
      department: 'Engineering',
      manager: 'Priya Sharma',
      hrBusinessPartner: 'Anita Verma',
      joiningDate: '2024-01-15',
      probationEndDate: '2024-04-15',
      probationPeriod: '90',
      daysRemaining: 75,
      status: 'in_progress',
      riskLevel: 'low',
      progress: 66,
      review30: { completed: true, date: '2024-02-15', rating: 'Exceeds Expectations' },
      review60: { completed: true, date: '2024-03-15', rating: 'Meets Expectations' },
      review90: { completed: false, date: '2024-04-01', rating: null },
      currentRating: 'Meets Expectations',
      nextReviewDate: '2024-04-01',
      contactEmail: 'rajesh@company.com',
      contactPhone: '+91-9876543210',
      lastReviewDate: '2024-03-15',
      extensionCount: 0,
      probationType: 'regular',
      noticePeriod: '60',
      workLocation: 'Bangalore',
      employmentType: 'Permanent',
      salary: '₹8,50,000',
      skills: ['React', 'Node.js', 'MongoDB'],
      trainingCompleted: ['Orientation', 'Code of Conduct', 'Security Training']
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Sneha Patel',
      designation: 'HR Executive',
      department: 'Human Resources',
      manager: 'Rahul Mehta',
      hrBusinessPartner: 'Anita Verma',
      joiningDate: '2024-02-01',
      probationEndDate: '2024-05-01',
      probationPeriod: '90',
      daysRemaining: 90,
      status: 'under_review',
      riskLevel: 'low',
      progress: 33,
      review30: { completed: true, date: '2024-03-03', rating: 'Exceeds Expectations' },
      review60: { completed: false, date: '2024-04-01', rating: null },
      review90: { completed: false, date: '2024-05-01', rating: null },
      currentRating: 'Exceeds Expectations',
      nextReviewDate: '2024-04-01',
      contactEmail: 'sneha@company.com',
      contactPhone: '+91-9876543211',
      lastReviewDate: '2024-03-03',
      extensionCount: 0,
      probationType: 'regular',
      noticePeriod: '60',
      workLocation: 'Mumbai',
      employmentType: 'Permanent',
      salary: '₹6,00,000',
      skills: ['Recruitment', 'Employee Relations', 'HR Policies'],
      trainingCompleted: ['Orientation', 'POSH Training']
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Amit Singh',
      designation: 'Sales Executive',
      department: 'Sales',
      manager: 'Anita Desai',
      hrBusinessPartner: 'Rohit Sharma',
      joiningDate: '2023-12-01',
      probationEndDate: '2024-03-01',
      probationPeriod: '90',
      daysRemaining: 15,
      status: 'extended',
      riskLevel: 'high',
      progress: 100,
      review30: { completed: true, date: '2023-12-31', rating: 'Meets Expectations' },
      review60: { completed: true, date: '2024-01-30', rating: 'Needs Improvement' },
      review90: { completed: true, date: '2024-02-29', rating: 'Needs Improvement' },
      currentRating: 'Needs Improvement',
      nextReviewDate: '2024-03-25',
      contactEmail: 'amit@company.com',
      contactPhone: '+91-9876543212',
      lastReviewDate: '2024-02-29',
      extensionCount: 1,
      extendedTo: '2024-04-01',
      probationType: 'extended',
      noticePeriod: '60',
      workLocation: 'Delhi',
      employmentType: 'Permanent',
      salary: '₹7,00,000',
      skills: ['Sales', 'Negotiation', 'CRM'],
      trainingCompleted: ['Orientation', 'Sales Training']
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Priya Nair',
      designation: 'Marketing Manager',
      department: 'Marketing',
      manager: 'Vikram Joshi',
      hrBusinessPartner: 'Rohit Sharma',
      joiningDate: '2024-01-01',
      probationEndDate: '2024-04-01',
      probationPeriod: '90',
      daysRemaining: 30,
      status: 'at_risk',
      riskLevel: 'high',
      progress: 80,
      review30: { completed: false, date: null, rating: null },
      review60: { completed: true, date: '2024-02-20', rating: 'Unsatisfactory' },
      review90: { completed: false, date: null, rating: null },
      currentRating: 'Unsatisfactory',
      nextReviewDate: '2024-03-20',
      contactEmail: 'priya@company.com',
      contactPhone: '+91-9876543213',
      lastReviewDate: '2024-02-20',
      extensionCount: 0,
      probationType: 'regular',
      noticePeriod: '60',
      workLocation: 'Chennai',
      employmentType: 'Permanent',
      salary: '₹9,00,000',
      skills: ['Digital Marketing', 'Brand Management', 'SEO'],
      trainingCompleted: ['Orientation', 'Marketing Fundamentals']
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'Suresh Reddy',
      designation: 'QA Engineer',
      department: 'Quality Assurance',
      manager: 'Neha Gupta',
      hrBusinessPartner: 'Anita Verma',
      joiningDate: '2024-02-15',
      probationEndDate: '2024-05-15',
      probationPeriod: '90',
      daysRemaining: 105,
      status: 'in_progress',
      riskLevel: 'medium',
      progress: 25,
      review30: { completed: true, date: '2024-03-15', rating: 'Meets Expectations' },
      review60: { completed: false, date: null, rating: null },
      review90: { completed: false, date: null, rating: null },
      currentRating: 'Meets Expectations',
      nextReviewDate: '2024-03-30',
      contactEmail: 'suresh@company.com',
      contactPhone: '+91-9876543214',
      lastReviewDate: '2024-03-15',
      extensionCount: 0,
      probationType: 'regular',
      noticePeriod: '60',
      workLocation: 'Hyderabad',
      employmentType: 'Permanent',
      salary: '₹7,50,000',
      skills: ['Manual Testing', 'Automation', 'Selenium'],
      trainingCompleted: ['Orientation', 'QA Process']
    }
  ];

  const initialReviewHistory = [
    {
      id: 1,
      employeeId: 'EMP001',
      reviewType: '30 DAY REVIEW',
      reviewDate: '2024-02-15',
      reviewer: 'Priya Sharma',
      rating: 'Exceeds Expectations',
      managerComments: 'Excellent performance, quick learner. Shows great potential.',
      hrComments: 'Good cultural fit. Engages well with team.',
      selfAssessment: 'I have adapted well to the team and completed all assigned tasks.',
      recommendations: 'Continue current trajectory',
      status: 'completed',
      attachments: ['review_report_1.pdf'],
      actionItems: ['Complete advanced React course', 'Take ownership of login module']
    },
    {
      id: 2,
      employeeId: 'EMP001',
      reviewType: '60 DAY REVIEW',
      reviewDate: '2024-03-15',
      reviewer: 'Priya Sharma',
      rating: 'Meets Expectations',
      managerComments: 'Good progress overall. Needs improvement in documentation.',
      hrComments: 'Performance is satisfactory. Should work on time management.',
      selfAssessment: 'I have improved my coding skills but need to work on documentation.',
      recommendations: 'Focus on documentation skills',
      status: 'completed',
      attachments: ['review_report_2.pdf'],
      actionItems: ['Improve code documentation', 'Mentor new junior developer']
    }
  ];

  // ---------------- STATE VARIABLES ----------------
  const [probationEmployees, setProbationEmployees] = useState(initialProbationEmployees);
  const [reviewHistory, setReviewHistory] = useState(initialReviewHistory);

  // UI States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [showSendReminderModal, setShowSendReminderModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Selected items
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Form States
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    employeeId: '',
    designation: '',
    department: 'Engineering',
    manager: '',
    joiningDate: '',
    probationPeriod: '90',
    probationType: 'regular',
    noticePeriod: '60',
    workLocation: 'Bangalore',
    employmentType: 'Permanent'
  });

  const [reviewForm, setReviewForm] = useState({
    reviewType: '30_day',
    reviewDate: new Date().toISOString().split('T')[0],
    rating: 'meets_expectations',
    managerComments: '',
    hrComments: '',
    selfAssessment: '',
    recommendations: '',
    actionItems: [],
    attachments: [],
    sendToEmployee: false,
    notifyManager: true,
    scheduleFollowup: false,
    followupDate: ''
  });

  const [extensionForm, setExtensionForm] = useState({
    extensionDays: 30,
    reason: '',
    newEndDate: '',
    notifyEmployee: true,
    notifyManager: true,
    updateProbationPeriod: true
  });

  const [terminationForm, setTerminationForm] = useState({
    reason: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    noticePeriodWaived: false,
    severancePackage: false,
    comments: ''
  });

  const [bulkAction, setBulkAction] = useState({
    action: 'schedule_review',
    date: new Date().toISOString().split('T')[0],
    templateId: '',
    notifyEmployees: true,
    notifyManagers: true,
    message: ''
  });

  const [reportFilters, setReportFilters] = useState({
    startDate: '2024-01-01',
    endDate: new Date().toISOString().split('T')[0],
    department: 'all',
    status: 'all',
    exportFormat: 'pdf'
  });

  // Filter and Sort States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ---------------- STATISTICS ----------------
  const stats = {
    total: probationEmployees.length,
    inProgress: probationEmployees.filter(e => e.status === 'in_progress').length,
    underReview: probationEmployees.filter(e => e.status === 'under_review').length,
    extended: probationEmployees.filter(e => e.status === 'extended').length,
    atRisk: probationEmployees.filter(e => e.status === 'at_risk').length,
    completed: probationEmployees.filter(e => e.status === 'completed').length,
    terminated: probationEmployees.filter(e => e.status === 'terminated').length,
    endingThisWeek: probationEmployees.filter(e => e.daysRemaining <= 7 && e.daysRemaining > 0).length,
    overdue: probationEmployees.filter(e => e.daysRemaining < 0).length,
    highRisk: probationEmployees.filter(e => e.riskLevel === 'high').length,
    totalExtensions: probationEmployees.reduce((sum, e) => sum + (e.extensionCount || 0), 0)
  };

  // ---------------- HELPER FUNCTIONS ----------------
  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // ---------------- FILTER + SORT ----------------
  const filteredEmployees = probationEmployees
    .filter(emp => {
      const searchMatch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = filterStatus === 'all' || emp.status === filterStatus;
      const deptMatch = filterDepartment === 'all' || emp.department === filterDepartment;
      const riskMatch = filterRisk === 'all' || emp.riskLevel === filterRisk;

      return searchMatch && statusMatch && deptMatch && riskMatch;
    })
    .sort((a, b) => {
      let A = a[sortBy], B = b[sortBy];

      if (sortBy === 'name' || sortBy === 'designation' || sortBy === 'department') {
        A = A.toLowerCase();
        B = B.toLowerCase();
      }

      if (sortBy === 'daysRemaining') {
        A = a.daysRemaining;
        B = b.daysRemaining;
      }

      if (sortBy === 'progress') {
        A = a.progress;
        B = b.progress;
      }

      if (sortBy === 'joiningDate' || sortBy === 'probationEndDate') {
        A = new Date(a[sortBy]);
        B = new Date(b[sortBy]);
      }

      return sortOrder === 'asc' ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
    });

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ---------------- EVENT HANDLERS ----------------
  
  // Add Employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    
    const newEmp = {
      ...newEmployee,
      id: probationEmployees.length + 1,
      status: 'in_progress',
      riskLevel: 'low',
      progress: 0,
      review30: { completed: false, date: null, rating: null },
      review60: { completed: false, date: null, rating: null },
      review90: { completed: false, date: null, rating: null },
      currentRating: 'Not Rated',
      nextReviewDate: calculateNextReviewDate(newEmployee.joiningDate, 30),
      daysRemaining: calculateDaysRemaining(newEmployee.joiningDate + parseInt(newEmployee.probationPeriod)),
      extensionCount: 0,
      skills: [],
      trainingCompleted: ['Orientation']
    };
    
    setProbationEmployees([...probationEmployees, newEmp]);
    setShowAddModal(false);
    setNewEmployee({
      name: '',
      employeeId: '',
      designation: '',
      department: 'Engineering',
      manager: '',
      joiningDate: '',
      probationPeriod: '90',
      probationType: 'regular',
      noticePeriod: '60',
      workLocation: 'Bangalore',
      employmentType: 'Permanent'
    });
    
    alert(`Employee ${newEmp.name} added to probation tracking`);
  };

  const calculateNextReviewDate = (baseDate, daysToAdd) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  // Start Review
  const handleStartReview = (employee, reviewType = null) => {
    setSelectedEmployee(employee);
    
    let nextReviewType = '30_day';
    if (reviewType) {
      nextReviewType = reviewType;
    } else if (!employee.review30.completed) {
      nextReviewType = '30_day';
    } else if (!employee.review60.completed) {
      nextReviewType = '60_day';
    } else if (!employee.review90.completed) {
      nextReviewType = '90_day';
    } else {
      nextReviewType = 'final';
    }
    
    setReviewForm({
      reviewType: nextReviewType,
      reviewDate: new Date().toISOString().split('T')[0],
      rating: 'meets_expectations',
      managerComments: '',
      hrComments: '',
      selfAssessment: '',
      recommendations: '',
      actionItems: [],
      attachments: [],
      sendToEmployee: false,
      notifyManager: true,
      scheduleFollowup: false,
      followupDate: ''
    });
    
    setShowReviewModal(true);
  };

  // Submit Review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    const updatedEmployees = probationEmployees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        const updatedEmp = { ...emp };
        
        // Update review milestones
        const reviewKey = `review${reviewForm.reviewType === '30_day' ? '30' : reviewForm.reviewType === '60_day' ? '60' : '90'}`;
        if (reviewForm.reviewType !== 'final') {
          updatedEmp[reviewKey] = {
            completed: true,
            date: reviewForm.reviewDate,
            rating: reviewForm.rating.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
          };
        }
        
        // Update rating and progress
        updatedEmp.currentRating = reviewForm.rating.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        updatedEmp.progress = Math.min(100, updatedEmp.progress + 25);
        
        // Update status
        if (reviewForm.reviewType === 'final') {
          if (reviewForm.recommendation === 'confirm') {
            updatedEmp.status = 'completed';
            updatedEmp.progress = 100;
          } else if (reviewForm.recommendation === 'extend') {
            updatedEmp.status = 'extended';
            updatedEmp.riskLevel = 'high';
          }
        } else if (reviewForm.recommendation === 'extend' || reviewForm.rating === 'needs_improvement' || reviewForm.rating === 'unsatisfactory') {
          updatedEmp.status = 'at_risk';
          updatedEmp.riskLevel = 'high';
        }
        
        // Update dates
        updatedEmp.lastReviewDate = reviewForm.reviewDate;
        if (reviewForm.reviewType === '30_day') {
          updatedEmp.nextReviewDate = calculateNextReviewDate(reviewForm.reviewDate, 30);
        } else if (reviewForm.reviewType === '60_day') {
          updatedEmp.nextReviewDate = calculateNextReviewDate(reviewForm.reviewDate, 30);
        } else if (reviewForm.reviewType === '90_day') {
          updatedEmp.nextReviewDate = calculateNextReviewDate(reviewForm.reviewDate, 0);
        }
        
        return updatedEmp;
      }
      return emp;
    });
    
    setProbationEmployees(updatedEmployees);
    
    // Add to review history
    const newReview = {
      id: reviewHistory.length + 1,
      employeeId: selectedEmployee.employeeId,
      reviewType: reviewForm.reviewType.replace('_', ' ').toUpperCase(),
      reviewDate: reviewForm.reviewDate,
      reviewer: 'HR Manager',
      rating: reviewForm.rating.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      managerComments: reviewForm.managerComments,
      hrComments: reviewForm.hrComments,
      selfAssessment: reviewForm.selfAssessment,
      recommendations: reviewForm.recommendations,
      status: 'completed',
      attachments: reviewForm.attachments.map(f => f.name),
      actionItems: reviewForm.actionItems
    };
    
    setReviewHistory([newReview, ...reviewHistory]);
    setShowReviewModal(false);
    
    alert(`Review submitted successfully for ${selectedEmployee.name}`);
  };

  // Extend Probation
  const handleExtendProbation = (employee) => {
    setSelectedEmployee(employee);
    const newEndDate = new Date(employee.probationEndDate);
    newEndDate.setDate(newEndDate.getDate() + 30);
    
    setExtensionForm({
      extensionDays: 30,
      reason: '',
      newEndDate: newEndDate.toISOString().split('T')[0],
      notifyEmployee: true,
      notifyManager: true,
      updateProbationPeriod: true
    });
    setShowExtendModal(true);
  };

  const handleSubmitExtension = (e) => {
    e.preventDefault();
    
    const updatedEmployees = probationEmployees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        const newEndDate = new Date(extensionForm.newEndDate);
        const daysRemaining = calculateDaysRemaining(newEndDate);
        
        return {
          ...emp,
          status: 'extended',
          probationEndDate: extensionForm.newEndDate,
          extensionCount: (emp.extensionCount || 0) + 1,
          extendedTo: extensionForm.newEndDate,
          daysRemaining: daysRemaining,
          probationType: 'extended',
          riskLevel: 'high',
          progress: Math.min(100, emp.progress + 10)
        };
      }
      return emp;
    });
    
    setProbationEmployees(updatedEmployees);
    setShowExtendModal(false);
    alert(`Probation extended for ${selectedEmployee.name} until ${formatDate(extensionForm.newEndDate)}`);
  };

  // Confirm Employee
  const handleConfirmEmployee = () => {
    const updatedEmployees = probationEmployees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        return {
          ...emp,
          status: 'completed',
          progress: 100,
          currentRating: 'Meets Expectations',
          confirmationDate: new Date().toISOString().split('T')[0]
        };
      }
      return emp;
    });
    
    setProbationEmployees(updatedEmployees);
    setShowConfirmModal(false);
    alert(`${selectedEmployee.name} has been confirmed as a permanent employee`);
  };

  // Terminate Probation
  const handleTerminateProbation = (employee) => {
    setSelectedEmployee(employee);
    setTerminationForm({
      reason: '',
      effectiveDate: new Date().toISOString().split('T')[0],
      noticePeriodWaived: false,
      severancePackage: false,
      comments: ''
    });
    setShowTerminateModal(true);
  };

  const handleSubmitTermination = (e) => {
    e.preventDefault();
    
    const updatedEmployees = probationEmployees.map(emp => {
      if (emp.id === selectedEmployee.id) {
        return {
          ...emp,
          status: 'terminated',
          terminationDate: terminationForm.effectiveDate,
          terminationReason: terminationForm.reason,
          terminationComments: terminationForm.comments,
          progress: 0
        };
      }
      return emp;
    });
    
    setProbationEmployees(updatedEmployees);
    setShowTerminateModal(false);
    alert(`Probation terminated for ${selectedEmployee.name}`);
  };

  // Bulk Actions
  const handleSelectEmployee = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter(empId => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === paginatedEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(paginatedEmployees.map(emp => emp.id));
    }
  };

  const handleBulkActionSubmit = (e) => {
    e.preventDefault();
    
    switch(bulkAction.action) {
      case 'schedule_review':
        const updatedEmployees = probationEmployees.map(emp => {
          if (selectedEmployees.includes(emp.id)) {
            return {
              ...emp,
              nextReviewDate: bulkAction.date
            };
          }
          return emp;
        });
        setProbationEmployees(updatedEmployees);
        alert(`Reviews scheduled for ${selectedEmployees.length} employees`);
        break;
        
      case 'send_reminder':
        alert(`Reminders sent to ${selectedEmployees.length} employees and their managers`);
        break;
        
      case 'extend_probation':
        const extendedEmployees = probationEmployees.map(emp => {
          if (selectedEmployees.includes(emp.id)) {
            const newEndDate = new Date(emp.probationEndDate);
            newEndDate.setDate(newEndDate.getDate() + parseInt(bulkAction.extensionDays || 30));
            return {
              ...emp,
              status: 'extended',
              probationEndDate: newEndDate.toISOString().split('T')[0],
              extensionCount: (emp.extensionCount || 0) + 1,
              riskLevel: 'high'
            };
          }
          return emp;
        });
        setProbationEmployees(extendedEmployees);
        alert(`Probation extended for ${selectedEmployees.length} employees`);
        break;
        
      case 'confirm_employees':
        const confirmedEmployees = probationEmployees.map(emp => {
          if (selectedEmployees.includes(emp.id)) {
            return {
              ...emp,
              status: 'completed',
              progress: 100
            };
          }
          return emp;
        });
        setProbationEmployees(confirmedEmployees);
        alert(`${selectedEmployees.length} employees confirmed`);
        break;
        
      case 'export_data':
        alert(`Exporting data for ${selectedEmployees.length} employees in Excel format`);
        break;
    }
    
    setShowBulkActionModal(false);
    setSelectedEmployees([]);
  };

  // Quick Actions
  const handleSendReminders = () => {
    const employeesNeedingReminder = probationEmployees.filter(
      emp => emp.daysRemaining <= 14 && emp.status !== 'completed' && emp.status !== 'terminated'
    );
    
    if (employeesNeedingReminder.length === 0) {
      alert('No employees need reminders at this time');
      return;
    }
    
    setShowSendReminderModal(true);
  };

  const handleSubmitReminders = () => {
    alert(`Reminders sent to ${probationEmployees.length} employees and their managers`);
    setShowSendReminderModal(false);
  };

  const handleNotifyManagers = () => {
    const managers = [...new Set(probationEmployees.map(emp => emp.manager))];
    alert(`Notifications sent to ${managers.length} managers about probation reviews`);
  };

  const handleScheduleReviews = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    const employeesToSchedule = probationEmployees.filter(
      emp => !emp.nextReviewDate || new Date(emp.nextReviewDate) < today
    );
    
    if (employeesToSchedule.length === 0) {
      alert('All employees have scheduled reviews');
      return;
    }
    
    const updatedEmployees = probationEmployees.map(emp => {
      if (!emp.nextReviewDate || new Date(emp.nextReviewDate) < today) {
        return {
          ...emp,
          nextReviewDate: nextWeek.toISOString().split('T')[0]
        };
      }
      return emp;
    });
    
    setProbationEmployees(updatedEmployees);
    alert(`Reviews scheduled for ${employeesToSchedule.length} employees`);
  };

  const handleExportData = () => {
    setShowExportModal(true);
  };

  const handleSubmitExport = () => {
    const format = reportFilters.exportFormat;
    const count = filteredEmployees.length;
    alert(`Exporting ${count} records in ${format.toUpperCase()} format...`);
    setShowExportModal(false);
  };

  const handleGenerateReport = () => {
    const reportData = {
      filters: reportFilters,
      stats: stats,
      employees: filteredEmployees,
      generatedAt: new Date().toISOString()
    };
    
    alert(`Report generated for period ${formatDate(reportFilters.startDate)} to ${formatDate(reportFilters.endDate)}\nTotal employees: ${filteredEmployees.length}`);
    setShowReportModal(false);
  };

  // View Details
  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  // ---------------- UI COMPONENTS ----------------
  const getStatusBadge = (status) => {
    const config = {
      in_progress: { label: 'In Progress', color: 'primary' },
      under_review: { label: 'Under Review', color: 'warning' },
      extended: { label: 'Extended', color: 'info' },
      at_risk: { label: 'At Risk', color: 'danger' },
      completed: { label: 'Completed', color: 'success' },
      terminated: { label: 'Terminated', color: 'secondary' }
    };
    
    const { label, color } = config[status] || { label: status, color: 'secondary' };
    
    return (
      <span className={`badge bg-${color}-subtle text-${color}`}>
        {label}
      </span>
    );
  };

  const getRiskBadge = (risk) => {
    const config = {
      low: { label: 'Low Risk', color: 'success' },
      medium: { label: 'Medium Risk', color: 'warning' },
      high: { label: 'High Risk', color: 'danger' }
    };
    
    const { label, color } = config[risk] || { label: risk, color: 'secondary' };
    
    return (
      <span className={`badge bg-${color}-subtle text-${color}`}>
        {label}
      </span>
    );
  };

  const getRatingBadge = (rating) => {
    const config = {
      'Exceeds Expectations': { color: 'success' },
      'Meets Expectations': { color: 'primary' },
      'Needs Improvement': { color: 'warning' },
      'Unsatisfactory': { color: 'danger' },
      'Not Rated': { color: 'secondary' }
    };
    
    const { color } = config[rating] || { color: 'secondary' };
    
    return (
      <span className={`badge bg-${color}-subtle text-${color}`}>
        {rating}
      </span>
    );
  };

  const ProgressBar = ({ percentage, showLabel = true }) => {
    const colorClass = 
      percentage >= 90 ? 'success' :
      percentage >= 70 ? 'primary' :
      percentage >= 50 ? 'warning' : 'danger';
    
    return (
      <div className="d-flex align-items-center gap-2">
        <div className="progress flex-grow-1" style={{ height: '8px' }}>
          <div 
            className={`progress-bar bg-${colorClass}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        {showLabel && <small className="text-muted">{percentage}%</small>}
      </div>
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
        <span 
          className={`badge ${employee.status === 'completed' ? 'bg-success' : 'bg-light text-muted'}`}
          title="Final Review"
        >
          F
        </span>
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
      title: 'Probation Management',
      link: '/hr/probation',
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
    
      <div className="container-fluid p-4">
        
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
          <h5 className="mb-2 d-flex align-items-center">
            <Icon icon="heroicons-solid:document-text" className="me-2" width={24} height={24} />

            Probation Management
            </h5>
            <p className="text-muted">Track, review, and manage employee probation periods</p>
          </div>
          
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowReportModal(true)}
            >
              Reports
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowBulkActionModal(true)}
              disabled={selectedEmployees.length === 0}
            >
              Bulk Actions ({selectedEmployees.length})
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              Add Employee
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="row g-3 mb-4">
          <div className="col-md-2 col-6">
            <div className="card border shadow-sm h-100">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary-light small">Total Employees</div>
                <div className="fw-bold fs-5 text-primary">{stats.total}</div>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="card border shadow-sm h-100">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary-light small">In Progress</div>
                <div className="fw-bold fs-5 text-info">{stats.inProgress}</div>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="card border shadow-sm h-100">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary-light small">At Risk</div>
                <div className="fw-bold fs-5 text-danger">{stats.atRisk}</div>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="card border shadow-sm h-100">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary-light small">Ending This Week</div>
                <div className="fw-bold fs-5 text-warning">{stats.endingThisWeek}</div>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="card border shadow-sm h-100">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary-light small">Completed</div>
                <div className="fw-bold fs-5 text-success">{stats.completed}</div>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <div className="card border shadow-sm h-100">
              <div className="card-body text-center">
                <div className="fw-bold text-secondary-light small">High Risk</div>
                <div className="fw-bold fs-5 text-danger">{stats.highRisk}</div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="card p-3 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Quick Actions</strong>
              <p className="text-muted mb-0 small">Common probation management tasks</p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={handleSendReminders}
              >
                Send Reminders
              </button>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={handleNotifyManagers}
              >
                Notify Managers
              </button>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={handleScheduleReviews}
              >
                Schedule Reviews
              </button>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={handleExportData}
              >
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="card p-3 mb-4">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search employees..."
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="col-md-2">
              <select 
                className="form-select" 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in_progress">In Progress</option>
                <option value="under_review">Under Review</option>
                <option value="extended">Extended</option>
                <option value="at_risk">At Risk</option>
                <option value="completed">Completed</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <select 
                className="form-select" 
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">HR</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <select 
                className="form-select" 
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="col-md-3 d-flex gap-2">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="daysRemaining">Sort by Days Remaining</option>
                <option value="progress">Sort by Progress</option>
                <option value="joiningDate">Sort by Joining Date</option>
              </select>
              
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* SELECTION INFO */}
        {selectedEmployees.length > 0 && (
          <div className="alert alert-info d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong>{selectedEmployees.length} employees</strong> selected for bulk actions
            </div>
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => setSelectedEmployees([])}
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* MAIN TABLE */}
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '50px' }}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th style={{ minWidth: '250px' }}>Employee Details</th>
                  <th className="text-center" style={{ minWidth: '100px' }}>Probation Status</th>
                  <th className="text-center" style={{ minWidth: '120px' }}>Progress</th>
                  <th className="text-center" style={{ minWidth: '100px' }}>Risk Level</th>
                  <th className="text-center" style={{ minWidth: '120px' }}>Review Milestones</th>
                  <th className="text-center" style={{ minWidth: '100px' }}>Time Remaining</th>
                  <th className="text-center" style={{ minWidth: '100px' }}>Current Rating</th>
                  <th className="text-center" style={{ minWidth: '200px' }}>Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {paginatedEmployees.map((emp) => (
                  <tr key={emp.id} className={selectedEmployees.includes(emp.id) ? 'table-active' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedEmployees.includes(emp.id)}
                        onChange={() => handleSelectEmployee(emp.id)}
                      />
                    </td>
                    
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
                      {emp.extensionCount > 0 && (
                        <div className="small text-muted mt-1">
                          Extended {emp.extensionCount} time{emp.extensionCount > 1 ? 's' : ''}
                        </div>
                      )}
                    </td>
                    
                    <td className="text-center">
                      <ProgressBar percentage={emp.progress} showLabel={false} />
                      <div className="small text-muted mt-1">{emp.progress}% complete</div>
                    </td>
                    
                    <td className="text-center">
                      {getRiskBadge(emp.riskLevel)}
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
                      {getRatingBadge(emp.currentRating)}
                    </td>
                    
                    <td className="text-center">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleViewDetails(emp)}
                          title="View Details"
                        >
                          View
                        </button>
                        
                        <div className="dropdown">
                          <button
                            className="btn btn-outline-success dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            title="Conduct Review"
                          >
                            Review
                          </button>
                          <ul className="dropdown-menu">
                            {!emp.review30.completed && (
                              <li>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => handleStartReview(emp, '30_day')}
                                >
                                  30 Day Review
                                </button>
                              </li>
                            )}
                            {emp.review30.completed && !emp.review60.completed && (
                              <li>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => handleStartReview(emp, '60_day')}
                                >
                                  60 Day Review
                                </button>
                              </li>
                            )}
                            {emp.review60.completed && !emp.review90.completed && (
                              <li>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => handleStartReview(emp, '90_day')}
                                >
                                  90 Day Review
                                </button>
                              </li>
                            )}
                            {emp.review90.completed && emp.status !== 'completed' && (
                              <li>
                                <button 
                                  className="dropdown-item"
                                  onClick={() => handleStartReview(emp, 'final')}
                                >
                                  Final Review
                                </button>
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        {emp.status !== 'completed' && emp.status !== 'terminated' && (
                          <>
                            <button
                              className="btn btn-outline-warning"
                              onClick={() => handleExtendProbation(emp)}
                              title="Extend Probation"
                            >
                              Extend
                            </button>
                            
                            <button
                              className="btn btn-outline-info"
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setShowConfirmModal(true);
                              }}
                              title="Confirm Employee"
                              disabled={emp.progress < 80}
                            >
                              Confirm
                            </button>
                            
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleTerminateProbation(emp)}
                              title="Terminate Probation"
                            >
                              Terminate
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                
                {paginatedEmployees.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
                      <h5 className="mb-2">No probation employees found</h5>
                      <p className="mb-0">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
              </div>
              
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                      <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </li>
                    </>
                  )}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* ----------------- MODALS ----------------- */}

        {/* ADD EMPLOYEE MODAL */}
        {showAddModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Employee to Probation Tracking</h5>
                  <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                
                <form onSubmit={handleAddEmployee}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Employee ID *</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newEmployee.employeeId}
                          onChange={(e) => setNewEmployee({...newEmployee, employeeId: e.target.value})}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Designation *</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newEmployee.designation}
                          onChange={(e) => setNewEmployee({...newEmployee, designation: e.target.value})}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Department *</label>
                        <select
                          className="form-select"
                          required
                          value={newEmployee.department}
                          onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Human Resources">Human Resources</option>
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Reporting Manager *</label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={newEmployee.manager}
                          onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Joining Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          required
                          value={newEmployee.joiningDate}
                          onChange={(e) => setNewEmployee({...newEmployee, joiningDate: e.target.value})}
                        />
                      </div>
                      
                      <div className="col-md-4">
                        <label className="form-label">Probation Period (Days) *</label>
                        <select
                          className="form-select"
                          required
                          value={newEmployee.probationPeriod}
                          onChange={(e) => setNewEmployee({...newEmployee, probationPeriod: e.target.value})}
                        >
                          <option value="30">30 Days</option>
                          <option value="60">60 Days</option>
                          <option value="90">90 Days</option>
                          <option value="180">180 Days</option>
                        </select>
                      </div>
                      
                      <div className="col-md-4">
                        <label className="form-label">Work Location</label>
                        <select
                          className="form-select"
                          value={newEmployee.workLocation}
                          onChange={(e) => setNewEmployee({...newEmployee, workLocation: e.target.value})}
                        >
                          <option value="Bangalore">Bangalore</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Hyderabad">Hyderabad</option>
                        </select>
                      </div>
                      
                      <div className="col-md-4">
                        <label className="form-label">Employment Type</label>
                        <select
                          className="form-select"
                          value={newEmployee.employmentType}
                          onChange={(e) => setNewEmployee({...newEmployee, employmentType: e.target.value})}
                        >
                          <option value="Permanent">Permanent</option>
                          <option value="Contract">Contract</option>
                          <option value="Intern">Intern</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Employee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW MODAL */}
        {showReviewModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {reviewForm.reviewType.replace('_', ' ').toUpperCase()} Review - {selectedEmployee.name}
                  </h5>
                  <button className="btn-close" onClick={() => setShowReviewModal(false)}></button>
                </div>
                
                <form onSubmit={handleSubmitReview}>
                  <div className="modal-body">
                    <div className="alert alert-info mb-3">
                      Reviewing <strong>{selectedEmployee.name}</strong> ({selectedEmployee.employeeId}) - {selectedEmployee.designation}
                    </div>
                    
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Review Type</label>
                        <select
                          className="form-select"
                          value={reviewForm.reviewType}
                          onChange={(e) => setReviewForm({...reviewForm, reviewType: e.target.value})}
                        >
                          <option value="30_day">30 Day Review</option>
                          <option value="60_day">60 Day Review</option>
                          <option value="90_day">90 Day Review</option>
                          <option value="final">Final Review</option>
                        </select>
                      </div>
                      
                      <div className="col-md-4">
                        <label className="form-label">Review Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={reviewForm.reviewDate}
                          onChange={(e) => setReviewForm({...reviewForm, reviewDate: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="col-md-4">
                        <label className="form-label">Performance Rating *</label>
                        <select
                          className="form-select"
                          value={reviewForm.rating}
                          onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
                          required
                        >
                          <option value="exceeds_expectations">Exceeds Expectations</option>
                          <option value="meets_expectations">Meets Expectations</option>
                          <option value="needs_improvement">Needs Improvement</option>
                          <option value="unsatisfactory">Unsatisfactory</option>
                        </select>
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label">Manager Assessment *</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter detailed feedback from manager..."
                          value={reviewForm.managerComments}
                          onChange={(e) => setReviewForm({...reviewForm, managerComments: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label">HR Assessment *</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter HR's observations and feedback..."
                          value={reviewForm.hrComments}
                          onChange={(e) => setReviewForm({...reviewForm, hrComments: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Recommendation *</label>
                        <select
                          className="form-select"
                          value={reviewForm.recommendation}
                          onChange={(e) => setReviewForm({...reviewForm, recommendation: e.target.value})}
                          required
                        >
                          <option value="continue">Continue Probation</option>
                          <option value="confirm">Confirm Employment</option>
                          <option value="extend">Extend Probation</option>
                          <option value="terminate">Terminate Probation</option>
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Attachments (Optional)</label>
                        <input
                          type="file"
                          className="form-control"
                          multiple
                          onChange={(e) => setReviewForm({...reviewForm, attachments: Array.from(e.target.files)})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowReviewModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* EXTENSION MODAL */}
        {showExtendModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Extend Probation Period</h5>
                  <button className="btn-close" onClick={() => setShowExtendModal(false)}></button>
                </div>
                
                <form onSubmit={handleSubmitExtension}>
                  <div className="modal-body">
                    <div className="alert alert-warning mb-3">
                      Extending probation for <strong>{selectedEmployee.name}</strong>
                    </div>
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Current End Date</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formatDate(selectedEmployee.probationEndDate)}
                          disabled
                        />
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">Extension Duration *</label>
                        <select
                          className="form-select"
                          value={extensionForm.extensionDays}
                          onChange={(e) => {
                            const days = parseInt(e.target.value);
                            const newDate = new Date(selectedEmployee.probationEndDate);
                            newDate.setDate(newDate.getDate() + days);
                            setExtensionForm({
                              ...extensionForm,
                              extensionDays: days,
                              newEndDate: newDate.toISOString().split('T')[0]
                            });
                          }}
                          required
                        >
                          <option value="15">15 Days</option>
                          <option value="30">30 Days</option>
                          <option value="60">60 Days</option>
                          <option value="90">90 Days</option>
                        </select>
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label">New End Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={extensionForm.newEndDate}
                          onChange={(e) => setExtensionForm({...extensionForm, newEndDate: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label">Reason for Extension *</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Provide detailed reason for probation extension..."
                          value={extensionForm.reason}
                          onChange={(e) => setExtensionForm({...extensionForm, reason: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowExtendModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning">
                      Extend Probation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRM EMPLOYEE MODAL */}
        {showConfirmModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Employee</h5>
                  <button className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                </div>
                
                <div className="modal-body text-center">
                  <div className="mb-4">
                    <div className="rounded-circle bg-success d-inline-flex p-3 mb-3">
                      ✓
                    </div>
                    <h4>Confirm Employment</h4>
                    <p className="text-muted">
                      Confirm <strong>{selectedEmployee.name}</strong> as a permanent employee?
                    </p>
                  </div>
                  
                  <div className="alert alert-success text-start">
                    <strong>Success:</strong> This employee has completed probation successfully.
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={handleConfirmEmployee}
                  >
                    Confirm Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TERMINATE MODAL */}
        {showTerminateModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Terminate Probation</h5>
                  <button className="btn-close" onClick={() => setShowTerminateModal(false)}></button>
                </div>
                
                <form onSubmit={handleSubmitTermination}>
                  <div className="modal-body">
                    <div className="alert alert-danger mb-3">
                      Terminating probation for <strong>{selectedEmployee.name}</strong> ({selectedEmployee.employeeId})
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Reason for Termination *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Provide detailed reason for probation termination..."
                        value={terminationForm.reason}
                        onChange={(e) => setTerminationForm({...terminationForm, reason: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Effective Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={terminationForm.effectiveDate}
                        onChange={(e) => setTerminationForm({...terminationForm, effectiveDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowTerminateModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-danger">
                      Terminate Probation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* BULK ACTION MODAL */}
        {showBulkActionModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Bulk Actions ({selectedEmployees.length} employees)</h5>
                  <button className="btn-close" onClick={() => setShowBulkActionModal(false)}></button>
                </div>
                
                <form onSubmit={handleBulkActionSubmit}>
                  <div className="modal-body">
                    <div className="alert alert-info mb-3">
                      Apply action to all selected employees
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Select Action *</label>
                      <select
                        className="form-select"
                        value={bulkAction.action}
                        onChange={(e) => setBulkAction({...bulkAction, action: e.target.value})}
                        required
                      >
                        <option value="schedule_review">Schedule Review</option>
                        <option value="send_reminder">Send Reminder</option>
                        <option value="extend_probation">Extend Probation</option>
                        <option value="confirm_employees">Confirm Employees</option>
                        <option value="export_data">Export Data</option>
                      </select>
                    </div>
                    
                    {bulkAction.action === 'schedule_review' && (
                      <div className="mb-3">
                        <label className="form-label">Review Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={bulkAction.date}
                          onChange={(e) => setBulkAction({...bulkAction, date: e.target.value})}
                          required
                        />
                      </div>
                    )}
                    
                    {bulkAction.action === 'extend_probation' && (
                      <div className="mb-3">
                        <label className="form-label">Extension Days *</label>
                        <select
                          className="form-select"
                          value={bulkAction.extensionDays}
                          onChange={(e) => setBulkAction({...bulkAction, extensionDays: e.target.value})}
                          required
                        >
                          <option value="15">15 Days</option>
                          <option value="30">30 Days</option>
                          <option value="60">60 Days</option>
                          <option value="90">90 Days</option>
                        </select>
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <label className="form-label">Message (Optional)</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Add a message for the action..."
                        value={bulkAction.message}
                        onChange={(e) => setBulkAction({...bulkAction, message: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowBulkActionModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Apply Action
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* SEND REMINDER MODAL */}
        {showSendReminderModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Send Reminders</h5>
                  <button className="btn-close" onClick={() => setShowSendReminderModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Sending reminders to employees and managers about upcoming probation reviews
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Reminder Type</label>
                    <select className="form-select">
                      <option>Upcoming Review Reminder</option>
                      <option>Probation End Reminder</option>
                      <option>Review Completion Reminder</option>
                      <option>Extension Decision Reminder</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      defaultValue="This is a reminder about your upcoming probation review. Please ensure all necessary documents and self-assessments are completed before the review date."
                    />
                  </div>
                  
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">
                      Send to employees
                    </label>
                  </div>
                  
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">
                      Send to managers
                    </label>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowSendReminderModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSubmitReminders}
                  >
                    Send Reminders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EXPORT MODAL */}
        {showExportModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Export Data</h5>
                  <button className="btn-close" onClick={() => setShowExportModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    Export probation data for reporting and analysis
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Export Format *</label>
                    <select
                      className="form-select"
                      value={reportFilters.exportFormat}
                      onChange={(e) => setReportFilters({...reportFilters, exportFormat: e.target.value})}
                    >
                      <option value="excel">Excel (.xlsx)</option>
                      <option value="pdf">PDF Document</option>
                      <option value="csv">CSV File</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Date Range</label>
                    <div className="row g-2">
                      <div className="col-6">
                        <input
                          type="date"
                          className="form-control"
                          value={reportFilters.startDate}
                          onChange={(e) => setReportFilters({...reportFilters, startDate: e.target.value})}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="date"
                          className="form-control"
                          value={reportFilters.endDate}
                          onChange={(e) => setReportFilters({...reportFilters, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowExportModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSubmitExport}
                  >
                    Export Data
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
                  <h5 className="modal-title">Generate Reports</h5>
                  <button className="btn-close" onClick={() => setShowReportModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={reportFilters.startDate}
                        onChange={(e) => setReportFilters({...reportFilters, startDate: e.target.value})}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={reportFilters.endDate}
                        onChange={(e) => setReportFilters({...reportFilters, endDate: e.target.value})}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Department</label>
                      <select
                        className="form-select"
                        value={reportFilters.department}
                        onChange={(e) => setReportFilters({...reportFilters, department: e.target.value})}
                      >
                        <option value="all">All Departments</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={reportFilters.status}
                        onChange={(e) => setReportFilters({...reportFilters, status: e.target.value})}
                      >
                        <option value="all">All Status</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="extended">Extended</option>
                      </select>
                    </div>
                    
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header bg-light">
                          <strong>Report Preview</strong>
                        </div>
                        <div className="card-body">
                          <p>This report will include:</p>
                          <ul>
                            <li>Probation statistics and analytics</li>
                            <li>Employee-wise probation status</li>
                            <li>Review completion rates</li>
                            <li>Extension analysis</li>
                            <li>Department-wise performance</li>
                          </ul>
                          <p className="mb-0">
                            Total records: <strong>{filteredEmployees.length}</strong> employees
                          </p>
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
                    onClick={handleGenerateReport}
                  >
                    Generate Report
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
                  <h5 className="modal-title">Employee Details - {selectedEmployee.name}</h5>
                  <button className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-8">
                      <div>
                        <h4 className="mb-1">{selectedEmployee.name}</h4>
                        <p className="text-muted mb-1">{selectedEmployee.designation} • {selectedEmployee.department}</p>
                        <div className="d-flex gap-2">
                          <span className="badge bg-secondary">{selectedEmployee.employeeId}</span>
                          {getStatusBadge(selectedEmployee.status)}
                          {getRiskBadge(selectedEmployee.riskLevel)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-primary"
                          onClick={() => {
                            setShowDetailModal(false);
                            handleStartReview(selectedEmployee);
                          }}
                        >
                          Conduct Review
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-header bg-light">
                          <strong>Probation Information</strong>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted d-block">Joining Date</small>
                              <strong>{formatDate(selectedEmployee.joiningDate)}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Probation Ends</small>
                              <strong>{formatDate(selectedEmployee.probationEndDate)}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Days Remaining</small>
                              <strong className={
                                selectedEmployee.daysRemaining <= 0 ? 'text-danger' :
                                selectedEmployee.daysRemaining <= 7 ? 'text-danger' :
                                selectedEmployee.daysRemaining <= 30 ? 'text-warning' : 'text-success'
                              }>
                                {selectedEmployee.daysRemaining} days
                              </strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Progress</small>
                              <ProgressBar percentage={selectedEmployee.progress} showLabel={false} />
                              <div className="small text-muted">{selectedEmployee.progress}% complete</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-header bg-light">
                          <strong>Contact Information</strong>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted d-block">Manager</small>
                              <strong>{selectedEmployee.manager}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Email</small>
                              <strong>{selectedEmployee.contactEmail}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Phone</small>
                              <strong>{selectedEmployee.contactPhone}</strong>
                            </div>
                            <div className="col-6">
                              <small className="text-muted d-block">Location</small>
                              <strong>{selectedEmployee.workLocation}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                      <strong>Review History</strong>
                      <ReviewMilestones employee={selectedEmployee} />
                    </div>
                    <div className="card-body">
                      {reviewHistory.filter(r => r.employeeId === selectedEmployee.employeeId).length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Review</th>
                                <th>Date</th>
                                <th>Rating</th>
                                <th>Reviewer</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reviewHistory
                                .filter(r => r.employeeId === selectedEmployee.employeeId)
                                .map(review => (
                                  <tr key={review.id}>
                                    <td>{review.reviewType}</td>
                                    <td>{formatDate(review.reviewDate)}</td>
                                    <td>{getRatingBadge(review.rating)}</td>
                                    <td>{review.reviewer}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted text-center mb-0">No review history available</p>
                      )}
                    </div>
                  </div>
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
        
      </div>
  
  );
};

export default ProbationManagement;