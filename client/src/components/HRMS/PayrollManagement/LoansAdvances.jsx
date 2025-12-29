import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const LoansAdvances = () => {
  const [activeTab, setActiveTab] = useState('loans');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showEMIScheduleModal, setShowEMIScheduleModal] = useState(false);
  const [showPrepaymentModal, setShowPrepaymentModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  
  // Mock employee data for eligibility check
  const [employees] = useState([
    { employeeId: 'EMP001', employeeName: 'Sarah Johnson', dateOfJoining: '2020-01-15', currentCTC: 500000, department: 'IT' },
    { employeeId: 'EMP002', employeeName: 'Mike Chen', dateOfJoining: '2019-03-20', currentCTC: 450000, department: 'Technology' },
    { employeeId: 'EMP003', employeeName: 'Alex Rivera', dateOfJoining: '2021-06-10', currentCTC: 400000, department: 'Finance' },
    { employeeId: 'EMP004', employeeName: 'Emily Davis', dateOfJoining: '2022-01-15', currentCTC: 350000, department: 'Sales' },
    { employeeId: 'EMP005', employeeName: 'David Wilson', dateOfJoining: '2020-08-01', currentCTC: 420000, department: 'HR' },
    { employeeId: 'EMP006', employeeName: 'Lisa Anderson', dateOfJoining: '2023-02-01', currentCTC: 300000, department: 'Marketing' },
    { employeeId: 'EMP007', employeeName: 'Robert Brown', dateOfJoining: '2018-05-20', currentCTC: 550000, department: 'Operations' },
    { employeeId: 'EMP008', employeeName: 'Jennifer Lee', dateOfJoining: '2021-02-10', currentCTC: 380000, department: 'Finance' }
  ]);

  // Loan applications (pending approval)
  const [loanApplications, setLoanApplications] = useState([
    {
      id: 1,
      applicationId: 'LA001',
      employeeId: 'EMP009',
      employeeName: 'John Smith',
      loanType: 'Personal loan',
      requestedAmount: 20000,
      purpose: 'Home renovation',
      dateOfApplication: '2024-11-01',
      status: 'Pending Approval',
      managerApproval: { status: 'Pending', date: null, approver: null },
      hrApproval: { status: 'Pending', date: null, approver: null },
      financeApproval: { status: 'Pending', date: null, approver: null },
      eligibilityStatus: 'Eligible',
      eligibilityMessage: 'Employee meets all eligibility criteria',
      serviceTenure: 24, // months
      currentSalary: 400000
    }
  ]);

  const [loans, setLoans] = useState([
    {
      id: 1,
      loanId: 'LN001',
      employeeId: 'EMP001',
      employeeName: 'Sarah Johnson',
      loanType: 'Personal loan',
      amount: 15000,
      interestRate: 8.5,
      tenureMonths: 24,
      startDate: '2024-01-15',
      endDate: '2026-01-15',
      monthlyEMI: 678.45,
      amountPaid: 6784.50,
      amountPending: 8215.50,
      status: 'Active',
      nextDueDate: '2024-11-15',
      applicationId: 'LA001',
      approvalWorkflow: {
        managerApproval: { status: 'Approved', date: '2024-01-10', approver: 'Manager A' },
        hrApproval: { status: 'Approved', date: '2024-01-12', approver: 'HR Manager' },
        financeApproval: { status: 'Approved', date: '2024-01-14', approver: 'Finance Head' }
      },
      disbursementDate: '2024-01-15',
      disbursementStatus: 'Disbursed',
      autoDeduction: true,
      agreementGenerated: true,
      agreementDate: '2024-01-14',
      prepayments: [],
      foreclosureAmount: 0,
      emiSchedule: []
    },
    {
      id: 2,
      loanId: 'LN002',
      employeeId: 'EMP002',
      employeeName: 'Mike Chen',
      loanType: 'Vehicle loan',
      amount: 25000,
      interestRate: 7.2,
      tenureMonths: 36,
      startDate: '2023-11-10',
      endDate: '2026-11-10',
      monthlyEMI: 773.88,
      amountPaid: 8512.68,
      amountPending: 16487.32,
      status: 'Active',
      nextDueDate: '2024-11-10',
      applicationId: 'LA002',
      approvalWorkflow: {
        managerApproval: { status: 'Approved', date: '2023-11-05', approver: 'Manager B' },
        hrApproval: { status: 'Approved', date: '2023-11-07', approver: 'HR Manager' },
        financeApproval: { status: 'Approved', date: '2023-11-09', approver: 'Finance Head' }
      },
      disbursementDate: '2023-11-10',
      disbursementStatus: 'Disbursed',
      autoDeduction: true,
      agreementGenerated: true,
      agreementDate: '2023-11-09',
      prepayments: [{ date: '2024-06-10', amount: 5000, type: 'Partial' }],
      foreclosureAmount: 0,
      emiSchedule: []
    },
    {
      id: 3,
      loanId: 'LN003',
      employeeId: 'EMP003',
      employeeName: 'Alex Rivera',
      loanType: 'Educational loan',
      amount: 12000,
      interestRate: 6.5,
      tenureMonths: 18,
      startDate: '2024-03-01',
      endDate: '2025-09-01',
      monthlyEMI: 699.27,
      amountPaid: 4195.62,
      amountPending: 7804.38,
      status: 'Active',
      nextDueDate: '2024-11-01'
    },
    {
      id: 4,
      loanId: 'LN004',
      employeeId: 'EMP004',
      employeeName: 'Emily Davis',
      loanType: 'Festival advance',
      amount: 5000,
      interestRate: 0,
      tenureMonths: 12,
      startDate: '2024-09-01',
      endDate: '2025-09-01',
      monthlyEMI: 416.67,
      amountPaid: 833.34,
      amountPending: 4166.66,
      status: 'Active',
      nextDueDate: '2024-11-01'
    },
    {
      id: 5,
      loanId: 'LN005',
      employeeId: 'EMP005',
      employeeName: 'David Wilson',
      loanType: 'Emergency loan',
      amount: 8000,
      interestRate: 5.0,
      tenureMonths: 12,
      startDate: '2024-06-15',
      endDate: '2025-06-15',
      monthlyEMI: 684.47,
      amountPaid: 2737.88,
      amountPending: 5262.12,
      status: 'Active',
      nextDueDate: '2024-11-15'
    },
    {
      id: 6,
      loanId: 'LN006',
      employeeId: 'EMP006',
      employeeName: 'Lisa Anderson',
      loanType: 'Salary advance',
      amount: 3000,
      interestRate: 0,
      tenureMonths: 3,
      startDate: '2024-10-01',
      endDate: '2025-01-01',
      monthlyEMI: 1000.00,
      amountPaid: 1000.00,
      amountPending: 2000.00,
      status: 'Active',
      nextDueDate: '2024-11-01'
    },
    {
      id: 7,
      loanId: 'LN007',
      employeeId: 'EMP007',
      employeeName: 'Robert Brown',
      loanType: 'Personal loan',
      amount: 20000,
      interestRate: 9.0,
      tenureMonths: 24,
      startDate: '2023-05-20',
      endDate: '2025-05-20',
      monthlyEMI: 913.70,
      amountPaid: 16446.60,
      amountPending: 3553.40,
      status: 'Active',
      nextDueDate: '2024-11-20'
    },
    {
      id: 8,
      loanId: 'LN008',
      employeeId: 'EMP008',
      employeeName: 'Jennifer Lee',
      loanType: 'Vehicle loan',
      amount: 18000,
      interestRate: 7.5,
      tenureMonths: 30,
      startDate: '2024-02-10',
      endDate: '2026-08-10',
      monthlyEMI: 627.63,
      amountPaid: 5648.67,
      amountPending: 12351.33,
      status: 'Completed',
      nextDueDate: 'N/A'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [loanTypeFilter, setLoanTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'employeeName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLoan, setNewLoan] = useState({
    employeeName: '',
    employeeId: '',
    loanType: 'Personal loan',
    amount: '',
    interestRate: '8.5',
    tenureMonths: '12',
    startDate: new Date().toISOString().split('T')[0]
  });

  const [newApplication, setNewApplication] = useState({
    employeeId: '',
    loanType: 'Personal loan',
    requestedAmount: '',
    purpose: '',
    tenureMonths: '12'
  });

  const [eligibilityCriteria, setEligibilityCriteria] = useState({
    minServiceTenure: 12, // months
    minSalary: 300000,
    maxLoanAmount: { 'Personal loan': 500000, 'Vehicle loan': 1000000, 'Educational loan': 300000, 'Festival advance': 50000, 'Emergency loan': 200000, 'Salary advance': 50000 },
    maxLoanToSalaryRatio: 10, // 10x salary
    activeLoansLimit: 3
  });

  const itemsPerPage = 6;

  // Loan types from your specification
  const loanTypes = [
    'Personal loan',
    'Vehicle loan', 
    'Educational loan',
    'Festival advance',
    'Emergency loan',
    'Salary advance'
  ];

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalLoans = loans.length;
    const activeLoans = loans.filter(loan => loan.status === 'Active').length;
    const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalPending = loans.reduce((sum, loan) => sum + loan.amountPending, 0);
    const avgInterest = loans.reduce((sum, loan) => sum + loan.interestRate, 0) / totalLoans;
    const completedLoans = loans.filter(loan => loan.status === 'Completed').length;

    return {
      totalLoans: totalLoans,
      activeLoans: activeLoans,
      totalAmount: totalAmount,
      totalPending: totalPending,
      avgInterest: avgInterest,
      completedLoans: completedLoans
    };
  }, [loans]);

  // Filter and search
  const filteredData = useMemo(() => {
    return loans.filter(loan => {
      const matchesSearch = loan.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.loanId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLoanType = loanTypeFilter === 'All' || loan.loanType === loanTypeFilter;
      const matchesStatus = statusFilter === 'All' || loan.status === statusFilter;
      return matchesSearch && matchesLoanType && matchesStatus;
    });
  }, [loans, searchTerm, loanTypeFilter, statusFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'amount' || sortConfig.key === 'interestRate' || 
          sortConfig.key === 'amountPending' || sortConfig.key === 'monthlyEMI') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      } else if (sortConfig.key === 'startDate' || sortConfig.key === 'endDate' || sortConfig.key === 'nextDueDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statuses = ['All', 'Active', 'Completed', 'Pending'];

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-success-subtle text-success',
      'Completed': 'bg-info-subtle text-info',
      'Pending': 'bg-warning-subtle text-warning',
      'Defaulted': 'bg-danger-subtle text-danger'
    };

    const icons = {
      'Active': 'heroicons:check-circle',
      'Completed': 'heroicons:check-badge',
      'Pending': 'heroicons:clock',
      'Defaulted': 'heroicons:x-circle'
    };

    return (
      <span className={`badge d-flex align-items-center ${styles[status] || styles['Active']}`}>
        <Icon icon={icons[status] || icons['Active']} className="me-1" />
        {status}
      </span>
    );
  };

  const getLoanTypeBadge = (type) => {
    const styles = {
      'Personal loan': 'bg-primary-subtle text-primary',
      'Vehicle loan': 'bg-info-subtle text-info',
      'Educational loan': 'bg-success-subtle text-success',
      'Festival advance': 'bg-warning-subtle text-warning',
      'Emergency loan': 'bg-danger-subtle text-danger',
      'Salary advance': 'bg-secondary-subtle text-secondary'
    };

    return (
      <span className={`badge ${styles[type] || 'bg-light text-dark'}`}>
        {type}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateEMI = (principal, rate, months) => {
    if (rate === 0) return principal / months;
    
    const monthlyRate = rate / 12 / 100;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return parseFloat(emi.toFixed(2));
  };

  const generateEMISchedule = (loan) => {
    const schedule = [];
    const startDate = new Date(loan.startDate);
    let remainingPrincipal = loan.amount;
    const monthlyRate = loan.interestRate / 12 / 100;
    const emi = loan.monthlyEMI;

    for (let i = 0; i < loan.tenureMonths; i++) {
      const interest = remainingPrincipal * monthlyRate;
      const principal = emi - interest;
      remainingPrincipal -= principal;

      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i + 1);

      schedule.push({
        installment: i + 1,
        dueDate: dueDate.toISOString().split('T')[0],
        emi: emi,
        principal: parseFloat(principal.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        balance: parseFloat(Math.max(0, remainingPrincipal).toFixed(2)),
        status: i < Math.floor(loan.amountPaid / emi) ? 'Paid' : i === Math.floor(loan.amountPaid / emi) ? 'Due' : 'Pending'
      });
    }

    return schedule;
  };

  const checkEligibility = (employeeId, loanType, requestedAmount) => {
    const employee = employees.find(emp => emp.employeeId === employeeId);
    if (!employee) {
      return { eligible: false, message: 'Employee not found' };
    }

    // Calculate service tenure
    const doj = new Date(employee.dateOfJoining);
    const today = new Date();
    const serviceTenure = (today.getFullYear() - doj.getFullYear()) * 12 + (today.getMonth() - doj.getMonth());

    // Check service tenure
    if (serviceTenure < eligibilityCriteria.minServiceTenure) {
      return { 
        eligible: false, 
        message: `Minimum service tenure of ${eligibilityCriteria.minServiceTenure} months required. Current: ${serviceTenure} months` 
      };
    }

    // Check salary level
    if (employee.currentCTC < eligibilityCriteria.minSalary) {
      return { 
        eligible: false, 
        message: `Minimum salary of ₹${eligibilityCriteria.minSalary.toLocaleString()} required. Current: ₹${employee.currentCTC.toLocaleString()}` 
      };
    }

    // Check loan amount limit
    const maxAmount = eligibilityCriteria.maxLoanAmount[loanType] || 100000;
    if (requestedAmount > maxAmount) {
      return { 
        eligible: false, 
        message: `Maximum loan amount for ${loanType} is ₹${maxAmount.toLocaleString()}` 
      };
    }

    // Check loan to salary ratio
    const maxLoanBySalary = employee.currentCTC * eligibilityCriteria.maxLoanToSalaryRatio;
    if (requestedAmount > maxLoanBySalary) {
      return { 
        eligible: false, 
        message: `Loan amount cannot exceed ${eligibilityCriteria.maxLoanToSalaryRatio}x of salary (₹${maxLoanBySalary.toLocaleString()})` 
      };
    }

    // Check active loans limit
    const activeLoans = loans.filter(l => l.employeeId === employeeId && l.status === 'Active').length;
    if (activeLoans >= eligibilityCriteria.activeLoansLimit) {
      return { 
        eligible: false, 
        message: `Maximum ${eligibilityCriteria.activeLoansLimit} active loans allowed. Current active loans: ${activeLoans}` 
      };
    }

    return { 
      eligible: true, 
      message: 'Employee is eligible for the loan',
      serviceTenure: serviceTenure,
      currentSalary: employee.currentCTC
    };
  };

  const handleLoanApplication = () => {
    if (!newApplication.employeeId || !newApplication.loanType || !newApplication.requestedAmount) {
      alert('Please fill all required fields');
      return;
    }

    const amount = parseFloat(newApplication.requestedAmount);
    const eligibility = checkEligibility(newApplication.employeeId, newApplication.loanType, amount);

    const employee = employees.find(emp => emp.employeeId === newApplication.employeeId);

    const application = {
      id: loanApplications.length + 1,
      applicationId: `LA${String(loanApplications.length + 1).padStart(3, '0')}`,
      employeeId: newApplication.employeeId,
      employeeName: employee?.employeeName || 'Unknown',
      loanType: newApplication.loanType,
      requestedAmount: amount,
      purpose: newApplication.purpose || 'Not specified',
      dateOfApplication: new Date().toISOString().split('T')[0],
      status: eligibility.eligible ? 'Pending Approval' : 'Rejected',
      managerApproval: { status: 'Pending', date: null, approver: null },
      hrApproval: { status: 'Pending', date: null, approver: null },
      financeApproval: { status: 'Pending', date: null, approver: null },
      eligibilityStatus: eligibility.eligible ? 'Eligible' : 'Not Eligible',
      eligibilityMessage: eligibility.message,
      serviceTenure: eligibility.serviceTenure || 0,
      currentSalary: eligibility.currentSalary || 0
    };

    setLoanApplications([...loanApplications, application]);
    setShowApplicationModal(false);
    setNewApplication({ employeeId: '', loanType: 'Personal loan', requestedAmount: '', purpose: '', tenureMonths: '12' });
    alert(eligibility.eligible ? 'Loan application submitted successfully!' : `Application rejected: ${eligibility.message}`);
  };

  const handleApproveApplication = (applicationId, level) => {
    const application = loanApplications.find(app => app.applicationId === applicationId);
    if (!application) return;

    const updatedApplication = { ...application };
    const today = new Date().toISOString().split('T')[0];

    if (level === 'manager') {
      updatedApplication.managerApproval = { status: 'Approved', date: today, approver: 'Manager Name' };
    } else if (level === 'hr') {
      updatedApplication.hrApproval = { status: 'Approved', date: today, approver: 'HR Manager' };
    } else if (level === 'finance') {
      updatedApplication.financeApproval = { status: 'Approved', date: today, approver: 'Finance Head' };
      updatedApplication.status = 'Approved';
      
      // Auto-create loan from approved application
      const interestRate = application.loanType === 'Festival advance' || application.loanType === 'Salary advance' ? 0 : 8.5;
      const monthlyEMI = calculateEMI(application.requestedAmount, interestRate, parseInt(application.tenureMonths));
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + parseInt(application.tenureMonths));

      const newLoanRecord = {
        id: loans.length + 1,
        loanId: `LN${String(loans.length + 1).padStart(3, '0')}`,
        employeeId: application.employeeId,
        employeeName: application.employeeName,
        loanType: application.loanType,
        amount: application.requestedAmount,
        interestRate: interestRate,
        tenureMonths: parseInt(application.tenureMonths),
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        monthlyEMI: monthlyEMI,
        amountPaid: 0,
        amountPending: application.requestedAmount,
        status: 'Active',
        nextDueDate: new Date(startDate.setMonth(startDate.getMonth() + 1)).toISOString().split('T')[0],
        applicationId: application.applicationId,
        approvalWorkflow: {
          managerApproval: application.managerApproval,
          hrApproval: application.hrApproval,
          financeApproval: updatedApplication.financeApproval
        },
        disbursementDate: null,
        disbursementStatus: 'Pending',
        autoDeduction: true,
        agreementGenerated: false,
        agreementDate: null,
        prepayments: [],
        foreclosureAmount: 0,
        emiSchedule: []
      };

      setLoans([...loans, newLoanRecord]);
    }

    setLoanApplications(loanApplications.map(app => 
      app.applicationId === applicationId ? updatedApplication : app
    ));
  };

  const handleRejectApplication = (applicationId, level) => {
    const application = loanApplications.find(app => app.applicationId === applicationId);
    if (!application) return;

    const updatedApplication = { ...application };
    const today = new Date().toISOString().split('T')[0];

    if (level === 'manager') {
      updatedApplication.managerApproval = { status: 'Rejected', date: today, approver: 'Manager Name' };
      updatedApplication.status = 'Rejected';
    } else if (level === 'hr') {
      updatedApplication.hrApproval = { status: 'Rejected', date: today, approver: 'HR Manager' };
      updatedApplication.status = 'Rejected';
    } else if (level === 'finance') {
      updatedApplication.financeApproval = { status: 'Rejected', date: today, approver: 'Finance Head' };
      updatedApplication.status = 'Rejected';
    }

    setLoanApplications(loanApplications.map(app => 
      app.applicationId === applicationId ? updatedApplication : app
    ));
  };

  const handleGenerateAgreement = (loanId) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    setLoans(loans.map(l => 
      l.id === loanId ? { ...l, agreementGenerated: true, agreementDate: new Date().toISOString().split('T')[0] } : l
    ));

    setSelectedLoan(loan);
    setShowAgreementModal(true);
    alert('Loan agreement generated successfully!');
  };

  const handleDisburseLoan = (loanId) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    if (!loan.agreementGenerated) {
      alert('Please generate loan agreement first');
      return;
    }

    setLoans(loans.map(l => 
      l.id === loanId ? { 
        ...l, 
        disbursementStatus: 'Disbursed', 
        disbursementDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      } : l
    ));

    alert('Loan disbursed successfully!');
  };

  const handlePrepayment = (loanId, prepaymentAmount, prepaymentType) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    if (prepaymentAmount > loan.amountPending) {
      alert('Prepayment amount cannot exceed pending amount');
      return;
    }

    const prepayment = {
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(prepaymentAmount),
      type: prepaymentType
    };

    const updatedLoan = {
      ...loan,
      amountPaid: loan.amountPaid + parseFloat(prepaymentAmount),
      amountPending: loan.amountPending - parseFloat(prepaymentAmount),
      prepayments: [...(loan.prepayments || []), prepayment]
    };

    if (updatedLoan.amountPending <= 0) {
      updatedLoan.status = 'Completed';
      updatedLoan.amountPending = 0;
    }

    setLoans(loans.map(l => l.id === loanId ? updatedLoan : l));
    setShowPrepaymentModal(false);
    alert('Prepayment processed successfully!');
  };

  const handleForeclosure = (loanId, foreclosureAmount) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    if (foreclosureAmount < loan.amountPending) {
      alert('Foreclosure amount must cover the entire pending amount');
      return;
    }

    const updatedLoan = {
      ...loan,
      amountPaid: loan.amountPaid + loan.amountPending,
      amountPending: 0,
      status: 'Completed',
      foreclosureAmount: parseFloat(foreclosureAmount),
      foreclosureDate: new Date().toISOString().split('T')[0]
    };

    setLoans(loans.map(l => l.id === loanId ? updatedLoan : l));
    setShowPrepaymentModal(false);
    alert('Loan foreclosed successfully!');
  };

  const handleGenerateCertificate = (loanId) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan || loan.status !== 'Completed') {
      alert('Certificate can only be generated for completed loans');
      return;
    }

    setSelectedLoan(loan);
    setShowCertificateModal(true);
  };

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const handleDeleteLoan = (id) => {
    if (window.confirm('Are you sure you want to delete this loan record?')) {
      setLoans(loans.filter(loan => loan.id !== id));
      if (selectedLoan?.id === id) {
        setShowModal(false);
      }
    }
  };

  const handleAddLoan = () => {
    const newId = loans.length + 1;
    const monthlyEMI = calculateEMI(
      parseFloat(newLoan.amount),
      parseFloat(newLoan.interestRate),
      parseInt(newLoan.tenureMonths)
    );
    
    const startDate = new Date(newLoan.startDate);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(newLoan.tenureMonths));

    const newLoanRecord = {
      id: newId,
      loanId: `LN${String(newId).padStart(3, '0')}`,
      employeeId: newLoan.employeeId,
      employeeName: newLoan.employeeName,
      loanType: newLoan.loanType,
      amount: parseFloat(newLoan.amount),
      interestRate: parseFloat(newLoan.interestRate),
      tenureMonths: parseInt(newLoan.tenureMonths),
      startDate: newLoan.startDate,
      endDate: endDate.toISOString().split('T')[0],
      monthlyEMI: monthlyEMI,
      amountPaid: 0,
      amountPending: parseFloat(newLoan.amount),
      status: 'Active',
      nextDueDate: new Date(startDate.setMonth(startDate.getMonth() + 1)).toISOString().split('T')[0]
    };
    
    setLoans([...loans, newLoanRecord]);
    setShowAddModal(false);
    setNewLoan({
      employeeName: '',
      employeeId: '',
      loanType: 'Personal loan',
      amount: '',
      interestRate: '8.5',
      tenureMonths: '12',
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  const exportToCSV = () => {
    const headers = ['Loan ID', 'Employee ID', 'Employee Name', 'Loan Type', 'Amount', 'Interest Rate', 'Tenure (Months)', 'Start Date', 'End Date', 'Monthly EMI', 'Amount Paid', 'Amount Pending', 'Status', 'Next Due Date'];
    const csvData = [headers];
    
    sortedData.forEach(record => {
      csvData.push([
        record.loanId,
        record.employeeId,
        record.employeeName,
        record.loanType,
        formatCurrency(record.amount),
        `${record.interestRate}%`,
        record.tenureMonths,
        formatDate(record.startDate),
        formatDate(record.endDate),
        formatCurrency(record.monthlyEMI),
        formatCurrency(record.amountPaid),
        formatCurrency(record.amountPending),
        record.status,
        formatDate(record.nextDueDate)
      ]);
    });

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan_management_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const refreshData = () => {
    setCurrentPage(1);
    setSearchTerm('');
    setLoanTypeFilter('All');
    setStatusFilter('All');
    setSortConfig({ key: 'employeeName', direction: 'asc' });
    alert('Loan data refreshed successfully!');
  };

  // Sidebar content for Loan Management
  const sidebarContent = (
    <nav className="space-y-1 p-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Loan Management
      </div>
      
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:banknotes" className="mr-3 h-5 w-5" />
        All Loans
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:document-plus" className="mr-3 h-5 w-5" />
        New Loan Application
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:clipboard-document-check" className="mr-3 h-5 w-5" />
        Approvals
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:chart-bar" className="mr-3 h-5 w-5" />
        Reports
      </button>
      
      <div className="pt-4 border-t border-gray-200 mt-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Stats
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Loans:</span>
            <span className="font-semibold">{kpis.activeLoans}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Amount:</span>
            <span className="font-semibold text-primary">{formatCurrency(kpis.totalAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Amount:</span>
            <span className="font-semibold text-warning">{formatCurrency(kpis.totalPending)}</span>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
            <Icon icon="heroicons:banknotes" />
            Advances & Loan Management
          </h5>
          <p className="text-muted">
            Manage employee loans, advances, EMI schedules, and repayment tracking.
          </p>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'loans' ? 'active' : ''}`}
              onClick={() => setActiveTab('loans')}
            >
              <Icon icon="heroicons:banknotes" className="me-2" />
              Loans
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              <Icon icon="heroicons:document-text" className="me-2" />
              Applications ({loanApplications.filter(app => app.status === 'Pending Approval').length})
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'eligibility' ? 'active' : ''}`}
              onClick={() => setActiveTab('eligibility')}
            >
              <Icon icon="heroicons:check-circle" className="me-2" />
              Eligibility Criteria
            </button>
          </li>
        </ul>

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <div className="card border shadow-none mb-4">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Loan Applications</h5>
              <button className="btn btn-primary" onClick={() => setShowApplicationModal(true)}>
                <Icon icon="heroicons:plus-circle" className="me-2" />
                New Application
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Application ID</th>
                      <th>Employee</th>
                      <th>Loan Type</th>
                      <th>Amount</th>
                      <th>Purpose</th>
                      <th>Eligibility</th>
                      <th>Approval Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanApplications.map(app => (
                      <tr key={app.id}>
                        <td>{app.applicationId}</td>
                        <td>
                          <div className="fw-semibold">{app.employeeName}</div>
                          <small className="text-muted">{app.employeeId}</small>
                        </td>
                        <td>{app.loanType}</td>
                        <td className="fw-bold">₹{app.requestedAmount.toLocaleString()}</td>
                        <td>{app.purpose}</td>
                        <td>
                          <span className={`badge ${app.eligibilityStatus === 'Eligible' ? 'bg-success' : 'bg-danger'}`}>
                            {app.eligibilityStatus}
                          </span>
                        </td>
                        <td>
                          <div className="small">
                            <div>Manager: <span className={`badge ${app.managerApproval.status === 'Approved' ? 'bg-success' : app.managerApproval.status === 'Rejected' ? 'bg-danger' : 'bg-secondary'}`}>{app.managerApproval.status}</span></div>
                            <div>HR: <span className={`badge ${app.hrApproval.status === 'Approved' ? 'bg-success' : app.hrApproval.status === 'Rejected' ? 'bg-danger' : 'bg-secondary'}`}>{app.hrApproval.status}</span></div>
                            <div>Finance: <span className={`badge ${app.financeApproval.status === 'Approved' ? 'bg-success' : app.financeApproval.status === 'Rejected' ? 'bg-danger' : 'bg-secondary'}`}>{app.financeApproval.status}</span></div>
                          </div>
                        </td>
                        <td>
                          {app.eligibilityStatus === 'Eligible' && app.status === 'Pending Approval' && (
                            <div className="d-flex gap-1">
                              {app.managerApproval.status === 'Pending' && (
                                <>
                                  <button className="btn btn-sm btn-success" onClick={() => handleApproveApplication(app.applicationId, 'manager')}>
                                    Approve (M)
                                  </button>
                                  <button className="btn btn-sm btn-danger" onClick={() => handleRejectApplication(app.applicationId, 'manager')}>
                                    Reject
                                  </button>
                                </>
                              )}
                              {app.managerApproval.status === 'Approved' && app.hrApproval.status === 'Pending' && (
                                <>
                                  <button className="btn btn-sm btn-success" onClick={() => handleApproveApplication(app.applicationId, 'hr')}>
                                    Approve (HR)
                                  </button>
                                  <button className="btn btn-sm btn-danger" onClick={() => handleRejectApplication(app.applicationId, 'hr')}>
                                    Reject
                                  </button>
                                </>
                              )}
                              {app.hrApproval.status === 'Approved' && app.financeApproval.status === 'Pending' && (
                                <>
                                  <button className="btn btn-sm btn-success" onClick={() => handleApproveApplication(app.applicationId, 'finance')}>
                                    Approve (F)
                                  </button>
                                  <button className="btn btn-sm btn-danger" onClick={() => handleRejectApplication(app.applicationId, 'finance')}>
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ELIGIBILITY CRITERIA TAB */}
        {activeTab === 'eligibility' && (
          <div className="card border shadow-none mb-4">
            <div className="card-header bg-transparent border-0">
              <h5 className="mb-0">Loan Eligibility Criteria</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Minimum Service Tenure (months)</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={eligibilityCriteria.minServiceTenure}
                    onChange={(e) => setEligibilityCriteria({...eligibilityCriteria, minServiceTenure: parseInt(e.target.value)})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Minimum Salary (₹)</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={eligibilityCriteria.minSalary}
                    onChange={(e) => setEligibilityCriteria({...eligibilityCriteria, minSalary: parseInt(e.target.value)})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Maximum Loan to Salary Ratio</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={eligibilityCriteria.maxLoanToSalaryRatio}
                    onChange={(e) => setEligibilityCriteria({...eligibilityCriteria, maxLoanToSalaryRatio: parseInt(e.target.value)})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Maximum Active Loans</label>
                  <input 
                    type="number" 
                    className="form-control"
                    value={eligibilityCriteria.activeLoansLimit}
                    onChange={(e) => setEligibilityCriteria({...eligibilityCriteria, activeLoansLimit: parseInt(e.target.value)})}
                  />
                </div>
                <div className="col-12">
                  <h6 className="mt-3 mb-3">Maximum Loan Amount by Type</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Loan Type</th>
                          <th>Maximum Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(eligibilityCriteria.maxLoanAmount).map(([type, amount]) => (
                          <tr key={type}>
                            <td>{type}</td>
                            <td>
                              <input 
                                type="number" 
                                className="form-control form-control-sm"
                                value={amount}
                                onChange={(e) => setEligibilityCriteria({
                                  ...eligibilityCriteria, 
                                  maxLoanAmount: {...eligibilityCriteria.maxLoanAmount, [type]: parseInt(e.target.value)}
                                })}
                              />
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
        )}

        {/* LOANS TAB - Existing content */}
        {activeTab === 'loans' && (
          <>

        {/* KPI Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:banknotes" className="text-primary text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-bold mb-1">Total Loans</h6>
                  <div className="text-muted fs-4">{kpis.totalLoans}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-success-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:check-circle" className="text-success text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-bold mb-1">Active Loans</h6>
                  <div className="text-muted fs-4">{kpis.activeLoans}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-info-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:currency-dollar" className="text-info text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-bold mb-1">Total Amount</h6>
                  <div className="text-muted fs-4">{formatCurrency(kpis.totalAmount)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:clock" className="text-warning text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-bold mb-1">Pending Amount</h6>
                  <div className="text-muted fs-4">{formatCurrency(kpis.totalPending)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card border shadow-none mb-4">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-3 align-items-center">
              {/* Search */}
              <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
                <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                <input
                  type="text"
                  placeholder="Search by employee name, ID, or loan ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control ps-5"
                />
              </div>

              {/* Loan Type Filter */}
              <div style={{ minWidth: '150px' }}>
                <select
                  value={loanTypeFilter}
                  onChange={(e) => setLoanTypeFilter(e.target.value)}
                  className="form-select"
                >
                  <option value="All">All Loan Types</option>
                  {loanTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div style={{ minWidth: '150px' }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-success d-flex align-items-center"
                >
                  <Icon icon="heroicons:plus-circle" className="me-2" />
                  New Loan
                </button>
                <button
                  onClick={exportToCSV}
                  className="btn btn-primary d-flex align-items-center"
                >
                  <Icon icon="heroicons:document-arrow-down" className="me-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loans Table */}
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Loan Records</h5>
              <div className="d-flex gap-2">
                <button 
                  onClick={refreshData}
                  className="btn btn-outline-primary"
                >
                  <Icon icon="heroicons:arrow-path" className="me-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th 
                      className="border-0 px-4 py-3 text-uppercase fw-bold text-dark cursor-pointer"
                      onClick={() => handleSort('employeeName')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        Employee & Loan
                        <Icon 
                          icon={`heroicons:chevron-${sortConfig.key === 'employeeName' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                          className="small" 
                        />
                      </div>
                    </th>
                    <th 
                      className="border-0 px-3 py-3 text-uppercase fw-bold text-dark cursor-pointer"
                      onClick={() => handleSort('loanType')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        Loan Type
                        <Icon 
                          icon={`heroicons:chevron-${sortConfig.key === 'loanType' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                          className="small" 
                        />
                      </div>
                    </th>
                    <th 
                      className="border-0 px-3 py-3 text-uppercase fw-bold text-dark cursor-pointer"
                      onClick={() => handleSort('amount')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        Amount Details
                        <Icon 
                          icon={`heroicons:chevron-${sortConfig.key === 'amount' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                          className="small" 
                        />
                      </div>
                    </th>
                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">EMI & Tenure</th>
                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((loan) => (
                    <tr key={loan.id} className="border-bottom">
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="w-40-px h-40-px bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                            <Icon icon="heroicons:user" className="text-muted" />
                          </div>
                          <div>
                            <div className="fw-medium text-dark">{loan.employeeName}</div>
                            <div className="small text-muted">
                              {loan.employeeId} • Loan ID: {loan.loanId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="mb-1">{getLoanTypeBadge(loan.loanType)}</div>
                        <div className="small text-muted">
                          {loan.interestRate}% interest
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="fw-semibold text-dark">{formatCurrency(loan.amount)}</div>
                        <div className="small text-muted">
                          Paid: {formatCurrency(loan.amountPaid)} • Pending: {formatCurrency(loan.amountPending)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="fw-semibold text-dark">{formatCurrency(loan.monthlyEMI)}/month</div>
                        <div className="small text-muted">
                          {loan.tenureMonths} months • Next due: {formatDate(loan.nextDueDate)}
                        </div>
                      </td>
                      <td className="px-4 py-3" style={{width:"120px"}}>
                        {getStatusBadge(loan.status)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="d-flex gap-1 flex-wrap">
                          <button
                            onClick={() => handleViewDetails(loan)}
                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                            title="View Details"
                          >
                            <Icon icon="heroicons:eye" />
                            View
                          </button>
                          {loan.status === 'Active' && (
                            <>
                              <button
                                onClick={() => { setSelectedLoan(loan); setShowEMIScheduleModal(true); }}
                                className="btn btn-sm btn-outline-info d-flex align-items-center gap-1"
                                title="EMI Schedule"
                              >
                                <Icon icon="heroicons:calendar" />
                              </button>
                              <button
                                onClick={() => { setSelectedLoan(loan); setShowPrepaymentModal(true); }}
                                className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                                title="Prepayment/Foreclosure"
                              >
                                <Icon icon="heroicons:currency-dollar" />
                              </button>
                            </>
                          )}
                          {loan.status === 'Completed' && (
                            <button
                              onClick={() => handleGenerateCertificate(loan.id)}
                              className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1"
                              title="Generate Certificate"
                            >
                              <Icon icon="heroicons:document-check" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteLoan(loan.id)}
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                            title="Delete"
                          >
                            <Icon icon="heroicons:trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {paginatedData.length === 0 && (
              <div className="text-center py-5 text-muted">
                <Icon icon="heroicons:banknotes" className="text-4xl mb-3" />
                <h5>No loan records found</h5>
                <p>No records found matching your search criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
                <div className="small text-muted">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} loans
                </div>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`btn btn-sm ${
                        currentPage === i + 1
                          ? 'btn-primary'
                          : 'btn-outline-secondary'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loan Details Modal */}
        {showModal && selectedLoan && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:document-text" />
                    Loan Details - {selectedLoan.loanId}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <h6 className="fw-semibold mb-3">Loan Information</h6>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Loan ID</label>
                        <p className="form-control-plaintext">{selectedLoan.loanId}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Loan Type</label>
                        <p className="form-control-plaintext">{getLoanTypeBadge(selectedLoan.loanType)}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Total Amount</label>
                        <p className="form-control-plaintext text-primary fw-bold">{formatCurrency(selectedLoan.amount)}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Interest Rate</label>
                        <p className="form-control-plaintext">{selectedLoan.interestRate}%</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-semibold mb-3">Employee Information</h6>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Employee Name</label>
                        <p className="form-control-plaintext">{selectedLoan.employeeName}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Employee ID</label>
                        <p className="form-control-plaintext">{selectedLoan.employeeId}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Status</label>
                        <p className="form-control-plaintext">{getStatusBadge(selectedLoan.status)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-3 mt-3">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Start Date</label>
                      <p className="form-control-plaintext">{formatDate(selectedLoan.startDate)}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">End Date</label>
                      <p className="form-control-plaintext">{formatDate(selectedLoan.endDate)}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Tenure</label>
                      <p className="form-control-plaintext">{selectedLoan.tenureMonths} months</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Monthly EMI</label>
                      <p className="form-control-plaintext text-success fw-bold">{formatCurrency(selectedLoan.monthlyEMI)}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Amount Paid</label>
                      <p className="form-control-plaintext text-info fw-bold">{formatCurrency(selectedLoan.amountPaid)}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Amount Pending</label>
                      <p className="form-control-plaintext text-warning fw-bold">{formatCurrency(selectedLoan.amountPending)}</p>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Next Due Date</label>
                      <p className="form-control-plaintext">{formatDate(selectedLoan.nextDueDate)}</p>
                    </div>
                  </div>
                  
                  {/* Approval Workflow */}
                  {selectedLoan.approvalWorkflow && (
                    <div className="row g-3 mt-3">
                      <div className="col-12">
                        <h6 className="fw-semibold mb-3">Approval Workflow</h6>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="card border">
                              <div className="card-body">
                                <h6 className="small">Manager Approval</h6>
                                <div className={`badge ${selectedLoan.approvalWorkflow.managerApproval.status === 'Approved' ? 'bg-success' : 'bg-secondary'}`}>
                                  {selectedLoan.approvalWorkflow.managerApproval.status}
                                </div>
                                {selectedLoan.approvalWorkflow.managerApproval.date && (
                                  <div className="small text-muted mt-1">
                                    {selectedLoan.approvalWorkflow.managerApproval.date}<br/>
                                    {selectedLoan.approvalWorkflow.managerApproval.approver}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card border">
                              <div className="card-body">
                                <h6 className="small">HR Approval</h6>
                                <div className={`badge ${selectedLoan.approvalWorkflow.hrApproval?.status === 'Approved' ? 'bg-success' : 'bg-secondary'}`}>
                                  {selectedLoan.approvalWorkflow.hrApproval?.status || 'Pending'}
                                </div>
                                {selectedLoan.approvalWorkflow.hrApproval?.date && (
                                  <div className="small text-muted mt-1">
                                    {selectedLoan.approvalWorkflow.hrApproval.date}<br/>
                                    {selectedLoan.approvalWorkflow.hrApproval.approver}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card border">
                              <div className="card-body">
                                <h6 className="small">Finance Approval</h6>
                                <div className={`badge ${selectedLoan.approvalWorkflow.financeApproval?.status === 'Approved' ? 'bg-success' : 'bg-secondary'}`}>
                                  {selectedLoan.approvalWorkflow.financeApproval?.status || 'Pending'}
                                </div>
                                {selectedLoan.approvalWorkflow.financeApproval?.date && (
                                  <div className="small text-muted mt-1">
                                    {selectedLoan.approvalWorkflow.financeApproval.date}<br/>
                                    {selectedLoan.approvalWorkflow.financeApproval.approver}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Disbursement & Agreement */}
                  <div className="row g-3 mt-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Disbursement Status</label>
                      <p className="form-control-plaintext">
                        <span className={`badge ${selectedLoan.disbursementStatus === 'Disbursed' ? 'bg-success' : 'bg-warning'}`}>
                          {selectedLoan.disbursementStatus || 'Pending'}
                        </span>
                        {selectedLoan.disbursementDate && (
                          <span className="ms-2 text-muted">({selectedLoan.disbursementDate})</span>
                        )}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Auto-Deduction</label>
                      <p className="form-control-plaintext">
                        <span className={`badge ${selectedLoan.autoDeduction ? 'bg-success' : 'bg-secondary'}`}>
                          {selectedLoan.autoDeduction ? 'Enabled' : 'Disabled'}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Agreement Generated</label>
                      <p className="form-control-plaintext">
                        {selectedLoan.agreementGenerated ? (
                          <span className="badge bg-success">Yes ({selectedLoan.agreementDate})</span>
                        ) : (
                          <span className="badge bg-warning">No</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {!selectedLoan.agreementGenerated && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleGenerateAgreement(selectedLoan.id)}
                    >
                      <Icon icon="heroicons:document-text" className="me-2" />
                      Generate Agreement
                    </button>
                  )}
                  {selectedLoan.agreementGenerated && selectedLoan.disbursementStatus !== 'Disbursed' && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleDisburseLoan(selectedLoan.id)}
                    >
                      <Icon icon="heroicons:banknotes" className="me-2" />
                      Disburse Loan
                    </button>
                  )}
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => handleDeleteLoan(selectedLoan.id)}
                  >
                    <Icon icon="heroicons:trash" className="me-2" />
                    Delete Loan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Loan Modal */}
        {showAddModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:plus-circle" />
                    Add New Loan
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Employee Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newLoan.employeeName}
                        onChange={(e) => setNewLoan({...newLoan, employeeName: e.target.value})}
                        placeholder="Enter employee name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Employee ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newLoan.employeeId}
                        onChange={(e) => setNewLoan({...newLoan, employeeId: e.target.value})}
                        placeholder="Enter employee ID"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Loan Type</label>
                      <select
                        className="form-select"
                        value={newLoan.loanType}
                        onChange={(e) => setNewLoan({...newLoan, loanType: e.target.value})}
                      >
                        {loanTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Loan Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={newLoan.amount}
                          onChange={(e) => setNewLoan({...newLoan, amount: e.target.value})}
                          placeholder="Enter loan amount"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Interest Rate (%)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step="0.1"
                          className="form-control"
                          value={newLoan.interestRate}
                          onChange={(e) => setNewLoan({...newLoan, interestRate: e.target.value})}
                          placeholder="Enter interest rate"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Tenure (Months)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newLoan.tenureMonths}
                        onChange={(e) => setNewLoan({...newLoan, tenureMonths: e.target.value})}
                        placeholder="Enter tenure in months"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newLoan.startDate}
                        onChange={(e) => setNewLoan({...newLoan, startDate: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Calculated Monthly EMI</label>
                      <div className="form-control bg-light">
                        {newLoan.amount && newLoan.interestRate && newLoan.tenureMonths 
                          ? formatCurrency(calculateEMI(
                              parseFloat(newLoan.amount),
                              parseFloat(newLoan.interestRate),
                              parseInt(newLoan.tenureMonths)
                            ))
                          : '--'
                        }
                      </div>
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
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={handleAddLoan}
                    disabled={!newLoan.employeeName || !newLoan.employeeId || !newLoan.amount || !newLoan.tenureMonths}
                  >
                    <Icon icon="heroicons:check-circle" className="me-2" />
                    Create Loan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          </>
        )}

        {/* LOAN APPLICATION MODAL */}
        {showApplicationModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">New Loan Application</h5>
                  <button type="button" className="btn-close" onClick={() => setShowApplicationModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Employee</label>
                      <select 
                        className="form-select"
                        value={newApplication.employeeId}
                        onChange={(e) => {
                          const emp = employees.find(emp => emp.employeeId === e.target.value);
                          setNewApplication({...newApplication, employeeId: e.target.value});
                          if (emp) {
                            const eligibility = checkEligibility(emp.employeeId, newApplication.loanType, parseFloat(newApplication.requestedAmount || 0));
                            alert(eligibility.message);
                          }
                        }}
                      >
                        <option value="">Select Employee</option>
                        {employees.map(emp => (
                          <option key={emp.employeeId} value={emp.employeeId}>
                            {emp.employeeName} ({emp.employeeId})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Loan Type</label>
                      <select 
                        className="form-select"
                        value={newApplication.loanType}
                        onChange={(e) => setNewApplication({...newApplication, loanType: e.target.value})}
                      >
                        {loanTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Requested Amount (₹)</label>
                      <input 
                        type="number" 
                        className="form-control"
                        value={newApplication.requestedAmount}
                        onChange={(e) => {
                          setNewApplication({...newApplication, requestedAmount: e.target.value});
                          if (newApplication.employeeId) {
                            const eligibility = checkEligibility(newApplication.employeeId, newApplication.loanType, parseFloat(e.target.value || 0));
                            // Show eligibility in real-time
                          }
                        }}
                        placeholder="Enter amount"
                      />
                      <small className="text-muted">
                        Max: ₹{eligibilityCriteria.maxLoanAmount[newApplication.loanType]?.toLocaleString() || 'N/A'}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Tenure (Months)</label>
                      <input 
                        type="number" 
                        className="form-control"
                        value={newApplication.tenureMonths}
                        onChange={(e) => setNewApplication({...newApplication, tenureMonths: e.target.value})}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Purpose</label>
                      <textarea 
                        className="form-control"
                        rows="3"
                        value={newApplication.purpose}
                        onChange={(e) => setNewApplication({...newApplication, purpose: e.target.value})}
                        placeholder="Describe the purpose of the loan"
                      />
                    </div>
                    {newApplication.employeeId && (
                      <div className="col-12">
                        <div className="alert alert-info">
                          <strong>Eligibility Check:</strong>
                          {(() => {
                            const emp = employees.find(e => e.employeeId === newApplication.employeeId);
                            if (!emp) return 'Select an employee';
                            const eligibility = checkEligibility(newApplication.employeeId, newApplication.loanType, parseFloat(newApplication.requestedAmount || 0));
                            return (
                              <div>
                                <div className={eligibility.eligible ? 'text-success' : 'text-danger'}>
                                  {eligibility.message}
                                </div>
                                {eligibility.eligible && (
                                  <div className="mt-2 small">
                                    Service Tenure: {eligibility.serviceTenure} months<br/>
                                    Current Salary: ₹{eligibility.currentSalary.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowApplicationModal(false)}>Cancel</button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleLoanApplication}
                    disabled={!newApplication.employeeId || !newApplication.requestedAmount}
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMI SCHEDULE MODAL */}
        {showEMIScheduleModal && selectedLoan && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">EMI Schedule - {selectedLoan.loanId}</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowEMIScheduleModal(false); setSelectedLoan(null); }}></button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Installment</th>
                          <th>Due Date</th>
                          <th>EMI Amount</th>
                          <th>Principal</th>
                          <th>Interest</th>
                          <th>Outstanding Balance</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateEMISchedule(selectedLoan).map((emi, index) => (
                          <tr key={index}>
                            <td>{emi.installment}</td>
                            <td>{formatDate(emi.dueDate)}</td>
                            <td className="fw-bold">₹{emi.emi.toLocaleString()}</td>
                            <td>₹{emi.principal.toLocaleString()}</td>
                            <td>₹{emi.interest.toLocaleString()}</td>
                            <td>₹{emi.balance.toLocaleString()}</td>
                            <td>
                              <span className={`badge ${
                                emi.status === 'Paid' ? 'bg-success' :
                                emi.status === 'Due' ? 'bg-warning' :
                                'bg-secondary'
                              }`}>
                                {emi.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowEMIScheduleModal(false); setSelectedLoan(null); }}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => alert('EMI Schedule exported!')}>
                    <Icon icon="heroicons:document-arrow-down" className="me-2" />
                    Export Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PREPAYMENT/FORECLOSURE MODAL */}
        {showPrepaymentModal && selectedLoan && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Prepayment / Foreclosure - {selectedLoan.loanId}</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowPrepaymentModal(false); setSelectedLoan(null); }}></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-info mb-3">
                    <strong>Outstanding Balance:</strong> ₹{selectedLoan.amountPending.toLocaleString()}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Transaction Type</label>
                    <select className="form-select" id="prepaymentType">
                      <option value="Partial">Partial Prepayment</option>
                      <option value="Full">Full Foreclosure</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount (₹)</label>
                    <input 
                      type="number" 
                      className="form-control"
                      id="prepaymentAmount"
                      placeholder="Enter amount"
                      max={selectedLoan.amountPending}
                    />
                  </div>
                  {selectedLoan.prepayments && selectedLoan.prepayments.length > 0 && (
                    <div className="mb-3">
                      <h6>Previous Prepayments</h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLoan.prepayments.map((prepay, idx) => (
                              <tr key={idx}>
                                <td>{prepay.date}</td>
                                <td>₹{prepay.amount.toLocaleString()}</td>
                                <td>{prepay.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowPrepaymentModal(false); setSelectedLoan(null); }}>Cancel</button>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => {
                      const amount = parseFloat(document.getElementById('prepaymentAmount').value);
                      const type = document.getElementById('prepaymentType').value;
                      if (type === 'Full') {
                        handleForeclosure(selectedLoan.id, amount);
                      } else {
                        handlePrepayment(selectedLoan.id, amount, type);
                      }
                    }}
                  >
                    Process
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOAN AGREEMENT MODAL */}
        {showAgreementModal && selectedLoan && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Loan Agreement - {selectedLoan.loanId}</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowAgreementModal(false); setSelectedLoan(null); }}></button>
                </div>
                <div className="modal-body">
                  <div className="border p-4" style={{ minHeight: '400px' }}>
                    <div className="text-center mb-4">
                      <h4>LOAN AGREEMENT</h4>
                      <p className="text-muted">Loan ID: {selectedLoan.loanId}</p>
                    </div>
                    <div className="mb-3">
                      <p><strong>This Loan Agreement</strong> is entered into on {formatDate(selectedLoan.agreementDate || selectedLoan.startDate)} between:</p>
                      <p><strong>Lender:</strong> Company Name<br/>
                      <strong>Borrower:</strong> {selectedLoan.employeeName} (ID: {selectedLoan.employeeId})</p>
                    </div>
                    <div className="mb-3">
                      <h6>Loan Details:</h6>
                      <ul>
                        <li>Loan Type: {selectedLoan.loanType}</li>
                        <li>Principal Amount: ₹{selectedLoan.amount.toLocaleString()}</li>
                        <li>Interest Rate: {selectedLoan.interestRate}% per annum</li>
                        <li>Tenure: {selectedLoan.tenureMonths} months</li>
                        <li>Monthly EMI: ₹{selectedLoan.monthlyEMI.toLocaleString()}</li>
                        <li>Start Date: {formatDate(selectedLoan.startDate)}</li>
                        <li>End Date: {formatDate(selectedLoan.endDate)}</li>
                      </ul>
                    </div>
                    <div className="mb-3">
                      <h6>Terms and Conditions:</h6>
                      <ol>
                        <li>The borrower agrees to repay the loan in {selectedLoan.tenureMonths} equal monthly installments.</li>
                        <li>EMI will be automatically deducted from salary each month.</li>
                        <li>Prepayment and foreclosure options are available as per company policy.</li>
                        <li>Default in payment may result in additional charges and legal action.</li>
                      </ol>
                    </div>
                    <div className="mt-4">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="border-top pt-3">
                            <strong>Borrower Signature</strong><br/>
                            <div className="mt-3">_________________</div>
                            <div>{selectedLoan.employeeName}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="border-top pt-3">
                            <strong>Authorized Signatory</strong><br/>
                            <div className="mt-3">_________________</div>
                            <div>Finance Department</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowAgreementModal(false); setSelectedLoan(null); }}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => alert('Agreement downloaded!')}>
                    <Icon icon="heroicons:document-arrow-down" className="me-2" />
                    Download PDF
                  </button>
                  <button type="button" className="btn btn-success" onClick={() => alert('Agreement printed!')}>
                    <Icon icon="heroicons:printer" className="me-2" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOAN COMPLETION CERTIFICATE MODAL */}
        {showCertificateModal && selectedLoan && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Loan Repayment Completion Certificate</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowCertificateModal(false); setSelectedLoan(null); }}></button>
                </div>
                <div className="modal-body">
                  <div className="border p-4" style={{ minHeight: '400px' }}>
                    <div className="text-center mb-4">
                      <h4>LOAN REPAYMENT COMPLETION CERTIFICATE</h4>
                      <p className="text-muted">Certificate No: CERT-{selectedLoan.loanId}</p>
                    </div>
                    <div className="mb-3">
                      <p>This is to certify that <strong>{selectedLoan.employeeName}</strong> (Employee ID: {selectedLoan.employeeId}) has successfully completed the repayment of the loan with the following details:</p>
                    </div>
                    <div className="mb-3">
                      <h6>Loan Details:</h6>
                      <ul>
                        <li>Loan ID: {selectedLoan.loanId}</li>
                        <li>Loan Type: {selectedLoan.loanType}</li>
                        <li>Principal Amount: ₹{selectedLoan.amount.toLocaleString()}</li>
                        <li>Total Amount Paid: ₹{selectedLoan.amountPaid.toLocaleString()}</li>
                        <li>Start Date: {formatDate(selectedLoan.startDate)}</li>
                        <li>Completion Date: {new Date().toLocaleDateString()}</li>
                        <li>Status: {selectedLoan.status}</li>
                      </ul>
                    </div>
                    <div className="mb-3">
                      <p className="text-success"><strong>All loan obligations have been fulfilled and the account is now closed.</strong></p>
                    </div>
                    <div className="mt-4">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="border-top pt-3">
                            <strong>Issued By</strong><br/>
                            <div className="mt-3">_________________</div>
                            <div>Finance Department</div>
                            <div className="small text-muted">{new Date().toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="border-top pt-3">
                            <strong>Authorized Signatory</strong><br/>
                            <div className="mt-3">_________________</div>
                            <div>Finance Head</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowCertificateModal(false); setSelectedLoan(null); }}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => alert('Certificate downloaded!')}>
                    <Icon icon="heroicons:document-arrow-down" className="me-2" />
                    Download PDF
                  </button>
                  <button type="button" className="btn btn-success" onClick={() => alert('Certificate printed!')}>
                    <Icon icon="heroicons:printer" className="me-2" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  
  );
};

export default LoansAdvances;