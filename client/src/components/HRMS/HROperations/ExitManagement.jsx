import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  Eye,
  MessageSquare,
  Share2,
  CreditCard,
  Send,
  ArrowUp,
  CheckCircle,
  Printer,
  AlertCircle,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  Clock,
  XCircle,
  CheckCircle2,
  FileCheck,
  Upload,
  Filter,
  File,
  FileText as FileTextIcon,
  Calculator,
  DollarSign,
  Receipt,
  Wallet,
  Percent,
  Shield
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalWrapper = ({ title, onClose, children, size = "modal-lg" }) => {
  return (
    <div
      className="modal fade show"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1055
      }}
    >
      <div className={`modal-dialog ${size}`} style={{ margin: 0, maxWidth: "900px", width: "100%" }}>
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            />
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            {children}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const ExitManagement = () => {
  const [selectedExits, setSelectedExits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    clearanceType: '',
    exitReason: ''
  });
  const [showClearanceModal, setShowClearanceModal] = useState(false);
  const [selectedExit, setSelectedExit] = useState(null);
  const [viewMode, setViewMode] = useState('exitCases');
  const [showFilters, setShowFilters] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('IT');
  const [showExitInterviewModal, setShowExitInterviewModal] = useState(false);
  const [showKnowledgeTransferModal, setShowKnowledgeTransferModal] = useState(false);
  const [showAlumniModal, setShowAlumniModal] = useState(false);
  const [showTrendsModal, setShowTrendsModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [exitInterviewData, setExitInterviewData] = useState({});
  const [knowledgeTransferData, setKnowledgeTransferData] = useState({});
  const [clearanceDetails, setClearanceDetails] = useState({});
  const [showEmployeeExitsReport, setShowEmployeeExitsReport] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Employee Exits Report Filters State
  const [employeeExitsFilters, setEmployeeExitsFilters] = useState({
    location: "",
    department: "",
    exitReason: "",
    fromDate: "",
    toDate: ""
  });

  // Settlement Detail State
  const [settlementDetail, setSettlementDetail] = useState({
    basicSalary: 0,
    leaveEncashment: 0,
    bonusIncentives: 0,
    otherEarnings: 0,
    loanDeductions: 0,
    advanceDeductions: 0,
    taxDeductions: 0,
    otherDeductions: 0,
    netPayable: 0,
    paymentMethod: 'Bank Transfer',
    paymentDate: '',
    bankDetails: {
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      accountHolder: ''
    },
    approvals: {
      finance: false,
      hr: false,
      department: false,
      ceo: false
    },
    status: 'Pending',
    notes: ''
  });

  // Employee Exits Report Data
  const [employeeExitsData, setEmployeeExitsData] = useState([
    {
      id: 1,
      name: "Bogala Chandramouli",
      code: "LEV096",
      location: "Hyderabad",
      department: "Technical Support",
      designation: "Associate Software Engineer",
      joining: "2023-01-15",
      exit: "2024-03-01",
      reason: "Resignation"
    },
    {
      id: 2,
      name: "Dorasala Nagendra",
      code: "LEV097",
      location: "Hyderabad",
      department: "Technical Support",
      designation: "Associate Software Engineer",
      joining: "2023-02-10",
      exit: "2024-02-15",
      reason: "Resignation"
    },
    {
      id: 3,
      name: "Abhilash Gurrampally",
      code: "LEV098",
      location: "Chennai",
      department: "HR Executive",
      designation: "HR Executive",
      joining: "2022-11-01",
      exit: "2024-01-20",
      reason: "Termination"
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      code: "LEV099",
      location: "Mumbai",
      department: "Product Development Team",
      designation: "Software Engineer",
      joining: "2022-08-15",
      exit: "2024-02-28",
      reason: "Retirement"
    },
    {
      id: 5,
      name: "Priya Sharma",
      code: "LEV100",
      location: "Hyderabad",
      department: "Technical Support",
      designation: "Senior Associate",
      joining: "2021-06-01",
      exit: "2024-03-05",
      reason: "Resignation"
    },
    {
      id: 6,
      name: "Amit Patel",
      code: "LEV101",
      location: "Chennai",
      department: "Product Development Team",
      designation: "Lead Developer",
      joining: "2020-03-10",
      exit: "2024-02-10",
      reason: "Resignation"
    },
    {
      id: 7,
      name: "Sneha Reddy",
      code: "LEV102",
      location: "Hyderabad",
      department: "HR Executive",
      designation: "HR Manager",
      joining: "2022-09-15",
      exit: "2024-03-12",
      reason: "Resignation"
    },
    {
      id: 8,
      name: "Vikram Singh",
      code: "LEV103",
      location: "Mumbai",
      department: "Technical Support",
      designation: "Team Lead",
      joining: "2021-12-01",
      exit: "2024-01-31",
      reason: "Termination"
    }
  ]);

  // Helper function to get default clearance structure
  const getDefaultClearanceStructure = () => ({
    IT: {
      status: 'Pending',
      items: {
        laptop: { status: 'Pending', assetId: 'LAP001', condition: '', remarks: '' },
        mobile: { status: 'Pending', assetId: 'MOB001', condition: '', remarks: '' },
        accessCards: { status: 'Pending', cardIds: [], remarks: '' },
        softwareLicenses: { status: 'Pending', licenses: [], remarks: '' }
      },
      clearedBy: '',
      clearedDate: '',
      remarks: ''
    },
    Admin: {
      status: 'Pending',
      items: {
        idCard: { status: 'Pending', cardNumber: '', remarks: '' },
        accessCard: { status: 'Pending', cardNumber: '', remarks: '' },
        parkingSticker: { status: 'Pending', stickerId: '', remarks: '' },
        lockerKeys: { status: 'Pending', lockerNumber: '', remarks: '' }
      },
      clearedBy: '',
      clearedDate: '',
      remarks: ''
    },
    Finance: {
      status: 'Pending',
      items: {
        advanceSettlement: { status: 'Pending', amount: 0, remarks: '' },
        expenseClaims: { status: 'Pending', claims: [], remarks: '' },
        loanOutstanding: { status: 'Pending', amount: 0, remarks: '' }
      },
      clearedBy: '',
      clearedDate: '',
      remarks: ''
    },
    HR: {
      status: 'Pending',
      items: {
        documentation: { status: 'Pending', documents: [], remarks: '' },
        exitInterview: { status: 'Pending', scheduledDate: '', remarks: '' },
        policyViolations: { status: 'Pending', violations: [], remarks: '' }
      },
      clearedBy: '',
      clearedDate: '',
      remarks: ''
    },
    Department: {
      status: 'Pending',
      items: {
        projectHandover: { status: 'Pending', projects: [], remarks: '' },
        knowledgeTransfer: { status: 'Pending', ktStatus: '', remarks: '' },
        filesDocuments: { status: 'Pending', files: [], remarks: '' }
      },
      clearedBy: '',
      clearedDate: '',
      remarks: ''
    }
  });

  // Sample data with enhanced clearance structure
  const [exitCasesData, setExitCasesData] = useState([
    { id: 1, employeeId: 'EMP001', employeeName: 'Rahul Sharma', department: 'Engineering', role: 'Senior Software Engineer', resignationDate: '2024-03-01', lastWorkingDay: '2024-04-15', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Better opportunity', clearanceProgress: 40, pendingClearances: ['IT', 'Finance', 'HR'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'In Progress', exitInterview: 'Scheduled', settlement: 'Pending', clearanceDetails: { ...getDefaultClearanceStructure(), IT: { ...getDefaultClearanceStructure().IT, status: 'Pending' }, Finance: { ...getDefaultClearanceStructure().Finance, status: 'Pending' }, HR: { ...getDefaultClearanceStructure().HR, status: 'Pending' }, Admin: { ...getDefaultClearanceStructure().Admin, status: 'Completed' }, Department: { ...getDefaultClearanceStructure().Department, status: 'Completed' } } },
    { id: 2, employeeId: 'EMP002', employeeName: 'Priya Patel', department: 'Marketing', role: 'Marketing Manager', resignationDate: '2024-02-15', lastWorkingDay: '2024-03-30', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Career growth', clearanceProgress: 75, pendingClearances: ['Admin'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'Completed', exitInterview: 'Completed', settlement: 'In Progress', clearanceDetails: { ...getDefaultClearanceStructure(), Admin: { ...getDefaultClearanceStructure().Admin, status: 'Pending' } } },
    { id: 3, employeeId: 'EMP003', employeeName: 'Amit Kumar', department: 'Sales', role: 'Sales Executive', resignationDate: '2024-01-20', lastWorkingDay: '2024-02-29', noticePeriod: '30 days', exitType: 'Termination', exitReason: 'Performance', clearanceProgress: 100, pendingClearances: [], status: 'Completed', escalationLevel: 0, knowledgeTransfer: 'Completed', exitInterview: 'Completed', settlement: 'Completed', clearanceDetails: getDefaultClearanceStructure() },
    { id: 4, employeeId: 'EMP004', employeeName: 'Sneha Reddy', department: 'HR', role: 'HR Executive', resignationDate: '2024-03-10', lastWorkingDay: '2024-04-25', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Higher studies', clearanceProgress: 25, pendingClearances: ['IT', 'Admin', 'Finance', 'HR', 'Department'], status: 'Pending', escalationLevel: 1, knowledgeTransfer: 'Pending', exitInterview: 'Pending', settlement: 'Pending', clearanceDetails: getDefaultClearanceStructure() },
    { id: 5, employeeId: 'EMP005', employeeName: 'Rajesh Verma', department: 'Finance', role: 'Finance Analyst', resignationDate: '2024-02-28', lastWorkingDay: '2024-04-12', noticePeriod: '45 days', exitType: 'Retirement', exitReason: 'Retirement', clearanceProgress: 90, pendingClearances: ['IT'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'In Progress', exitInterview: 'Scheduled', settlement: 'In Progress', clearanceDetails: { ...getDefaultClearanceStructure(), IT: { ...getDefaultClearanceStructure().IT, status: 'Pending' } } },
    { id: 6, employeeId: 'EMP006', employeeName: 'Meera Joshi', department: 'Engineering', role: 'Frontend Developer', resignationDate: '2024-03-05', lastWorkingDay: '2024-04-19', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Relocation', clearanceProgress: 60, pendingClearances: ['Finance', 'Admin'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'In Progress', exitInterview: 'Scheduled', settlement: 'Pending', clearanceDetails: { ...getDefaultClearanceStructure(), Finance: { ...getDefaultClearanceStructure().Finance, status: 'Pending' }, Admin: { ...getDefaultClearanceStructure().Admin, status: 'Pending' } } },
    { id: 7, employeeId: 'EMP007', employeeName: 'Vikram Singh', department: 'Operations', role: 'Operations Manager', resignationDate: '2024-01-15', lastWorkingDay: '2024-01-31', noticePeriod: 'Immediate', exitType: 'Termination', exitReason: 'Policy violation', clearanceProgress: 100, pendingClearances: [], status: 'Completed', escalationLevel: 2, knowledgeTransfer: 'Not Required', exitInterview: 'Not Conducted', settlement: 'Completed', clearanceDetails: getDefaultClearanceStructure() },
    { id: 8, employeeId: 'EMP008', employeeName: 'Anjali Gupta', department: 'Marketing', role: 'Content Writer', resignationDate: '2024-03-12', lastWorkingDay: '2024-04-26', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Better opportunity', clearanceProgress: 30, pendingClearances: ['IT', 'Admin', 'HR'], status: 'Pending', escalationLevel: 0, knowledgeTransfer: 'Pending', exitInterview: 'Pending', settlement: 'Pending', clearanceDetails: { ...getDefaultClearanceStructure(), IT: { ...getDefaultClearanceStructure().IT, status: 'Pending' }, Admin: { ...getDefaultClearanceStructure().Admin, status: 'Pending' }, HR: { ...getDefaultClearanceStructure().HR, status: 'Pending' } } }
  ]);

  const exitCases = exitCasesData;

  const alumniNetwork = [
    { id: 1, alumniId: 'ALM001', employeeId: 'EMP101', name: 'Rohit Verma', department: 'Engineering', lastRole: 'Tech Lead', exitDate: '2023-12-15', exitReason: 'Higher studies', rehireEligibility: 'Eligible', boomerangStatus: 'Interested', engagementLevel: 'High', totalReferrals: 3, successfulHires: 2 },
    { id: 2, alumniId: 'ALM002', employeeId: 'EMP102', name: 'Priya Sharma', department: 'Marketing', lastRole: 'Marketing Head', exitDate: '2023-10-20', exitReason: 'Startup venture', rehireEligibility: 'Eligible', boomerangStatus: 'Not Interested', engagementLevel: 'Medium', totalReferrals: 5, successfulHires: 3 },
    { id: 3, alumniId: 'ALM003', employeeId: 'EMP103', name: 'Arjun Singh', department: 'Sales', lastRole: 'Sales Director', exitDate: '2023-11-10', exitReason: 'Personal reasons', rehireEligibility: 'Eligible', boomerangStatus: 'Interested', engagementLevel: 'High', totalReferrals: 7, successfulHires: 4 },
    { id: 4, alumniId: 'ALM004', employeeId: 'EMP104', name: 'Neha Kapoor', department: 'HR', lastRole: 'HR Manager', exitDate: '2023-09-05', exitReason: 'Career break', rehireEligibility: 'Not Eligible', boomerangStatus: 'Not Interested', engagementLevel: 'Low', totalReferrals: 1, successfulHires: 0 }
  ];

  const settlements = [
    { id: 1, employeeId: 'EMP003', employeeName: 'Amit Kumar', department: 'Sales', netAmount: '₹1,25,000', paymentDate: '2024-03-15', status: 'Completed', approvalStatus: 'All Approved' },
    { id: 2, employeeId: 'EMP007', employeeName: 'Vikram Singh', department: 'Operations', netAmount: '₹85,000', paymentDate: '2024-02-10', status: 'Completed', approvalStatus: 'All Approved' },
    { id: 3, employeeId: 'EMP002', employeeName: 'Priya Patel', department: 'Marketing', netAmount: '₹1,50,000', paymentDate: '2024-04-05', status: 'In Progress', approvalStatus: '2/4 Approved' },
    { id: 4, employeeId: 'EMP005', employeeName: 'Rajesh Verma', department: 'Finance', netAmount: '₹2,00,000', paymentDate: '2024-04-20', status: 'Pending', approvalStatus: '0/4 Approved' }
  ];

  const insights = {
    totalExitCases: exitCases.length,
    pendingClearances: exitCases.filter(ec => ec.status !== 'Completed').length,
    escalatedCases: exitCases.filter(ec => ec.escalationLevel > 0).length,
    alumniCount: alumniNetwork.length,
    pendingInterviews: exitCases.filter(ec => ec.exitInterview === 'Scheduled' || ec.exitInterview === 'Pending').length,
    pendingSettlements: exitCases.filter(ec => ec.settlement === 'Pending' || ec.settlement === 'In Progress').length,
    rehireEligible: alumniNetwork.filter(a => a.rehireEligibility === 'Eligible').length,
    boomerangCandidates: alumniNetwork.filter(a => a.boomerangStatus === 'Interested').length
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentItems = viewMode === 'exitCases' ? filteredExits :
        viewMode === 'alumni' ? filteredAlumni :
          viewMode === 'settlements' ? filteredSettlements :
            filteredEmployeeExits;
      setSelectedExits(currentItems.map(item => item.id));
    } else {
      setSelectedExits([]);
    }
  };

  const handleSelectExit = (id) => {
    setSelectedExits(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': 'bg-secondary-subtle text-secondary',
      'In Progress': 'bg-primary-subtle text-primary',
      'Completed': 'bg-success-subtle text-success',
      'Escalated': 'bg-danger-subtle text-danger',
      'Scheduled': 'bg-warning-subtle text-warning'
    };
    return colors[status] || 'bg-secondary-subtle text-secondary';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  const getEscalationBadge = (level) => {
    if (level === 0) return null;
    const colors = {
      1: 'bg-warning-subtle text-warning',
      2: 'bg-danger-subtle text-danger',
      3: 'bg-dark-subtle text-dark'
    };
    return colors[level] || 'bg-secondary-subtle text-secondary';
  };

  // Filter data for different views
  const filteredExits = exitCases.filter(exit => {
    const matchesSearch = exit.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exit.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exit.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exit.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = !filters.department || exit.department.toLowerCase() === filters.department.toLowerCase();
    const matchesStatus = !filters.status || exit.status.toLowerCase() === filters.status.toLowerCase();
    const matchesClearanceType = !filters.clearanceType || exit.exitType.toLowerCase() === filters.clearanceType.toLowerCase();
    const matchesExitReason = !filters.exitReason || exit.exitReason.toLowerCase().includes(filters.exitReason.toLowerCase());

    return matchesSearch && matchesDepartment && matchesStatus && matchesClearanceType && matchesExitReason;
  });

  const filteredAlumni = alumniNetwork.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.alumniId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = !filters.department || alumni.department.toLowerCase() === filters.department.toLowerCase();
    const matchesStatus = !filters.status || alumni.rehireEligibility.toLowerCase() === filters.status.toLowerCase();

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const filteredSettlements = settlements.filter(settlement => {
    const matchesSearch = settlement.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = !filters.department || settlement.department.toLowerCase() === filters.department.toLowerCase();
    const matchesStatus = !filters.status || settlement.status.toLowerCase() === filters.status.toLowerCase();

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Employee Exits Report Functions
  const handleEmployeeExitsFilterChange = (e) => {
    const { name, value } = e.target;
    setEmployeeExitsFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredEmployeeExits = employeeExitsData.filter(emp => {
    const fromDate = employeeExitsFilters.fromDate ? new Date(employeeExitsFilters.fromDate) : null;
    const toDate = employeeExitsFilters.toDate ? new Date(employeeExitsFilters.toDate) : null;
    const exitDate = emp.exit ? new Date(emp.exit) : null;

    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesSearch &&
      (employeeExitsFilters.location === "" || emp.location === employeeExitsFilters.location) &&
      (employeeExitsFilters.department === "" || emp.department === employeeExitsFilters.department) &&
      (employeeExitsFilters.exitReason === "" || emp.reason === employeeExitsFilters.exitReason) &&
      (!fromDate || !exitDate || exitDate >= fromDate) &&
      (!toDate || !exitDate || exitDate <= toDate)
    );
  });

  // Get current items
  const getCurrentItems = () => {
    if (viewMode === 'exitCases') return filteredExits;
    if (viewMode === 'alumni') return filteredAlumni;
    if (viewMode === 'settlements') return filteredSettlements;
    if (viewMode === 'employeeExits') return filteredEmployeeExits;
    return [];
  };

  const currentItems = getCurrentItems();
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItemsPage = currentItems.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, viewMode, employeeExitsFilters]);

  // Function to get export data based on view mode
  const getExportData = () => {
    let headers = [];
    let data = [];
    let title = "";

    switch(viewMode) {
      case 'exitCases':
        title = "Exit Management Report - Exit Cases";
        headers = ["Employee ID", "Employee Name", "Department", "Role", "Resignation Date", "Last Working Day", "Exit Type", "Exit Reason", "Status", "Clearance Progress", "Pending Clearances"];
        data = filteredExits.map(exit => [
          exit.employeeId,
          exit.employeeName,
          exit.department,
          exit.role,
          exit.resignationDate,
          exit.lastWorkingDay,
          exit.exitType,
          exit.exitReason,
          exit.status,
          `${exit.clearanceProgress}%`,
          exit.pendingClearances.join(', ')
        ]);
        break;

      case 'alumni':
        title = "Exit Management Report - Alumni Network";
        headers = ["Alumni ID", "Employee ID", "Name", "Department", "Last Role", "Exit Date", "Exit Reason", "Rehire Eligibility", "Boomerang Status", "Engagement Level", "Total Referrals", "Successful Hires"];
        data = filteredAlumni.map(alumni => [
          alumni.alumniId,
          alumni.employeeId,
          alumni.name,
          alumni.department,
          alumni.lastRole,
          alumni.exitDate,
          alumni.exitReason,
          alumni.rehireEligibility,
          alumni.boomerangStatus,
          alumni.engagementLevel,
          alumni.totalReferrals,
          alumni.successfulHires
        ]);
        break;

      case 'settlements':
        title = "Exit Management Report - Settlements";
        headers = ["Employee ID", "Employee Name", "Department", "Net Amount", "Payment Date", "Status", "Approval Status"];
        data = filteredSettlements.map(settlement => [
          settlement.employeeId,
          settlement.employeeName,
          settlement.department,
          settlement.netAmount,
          settlement.paymentDate,
          settlement.status,
          settlement.approvalStatus
        ]);
        break;

      case 'employeeExits':
        title = "Employee Exits Report";
        headers = ["Name", "Code", "Location", "Department", "Designation", "Joining Date", "Exit Date", "Reason of Exit"];
        data = filteredEmployeeExits.map(emp => [
          emp.name,
          emp.code,
          emp.location,
          emp.department,
          emp.designation,
          emp.joining,
          emp.exit,
          emp.reason
        ]);
        break;

      default:
        return { headers: [], data: [], title: "" };
    }

    return { headers, data, title };
  };

  // Function to export as Excel (CSV)
  const handleExportExcel = () => {
    if (currentItems.length === 0) {
      alert("No data to export!");
      return;
    }

    const { headers, data, title } = getExportData();
    
    // Add title as first row
    const csvContent = [
      [title],
      [],
      headers,
      ...data
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    // Set filename based on view mode
    let filename = '';
    switch(viewMode) {
      case 'exitCases':
        filename = 'Exit_Management_Report_Exit_Cases.csv';
        break;
      case 'alumni':
        filename = 'Exit_Management_Report_Alumni_Network.csv';
        break;
      case 'settlements':
        filename = 'Exit_Management_Report_Settlements.csv';
        break;
      case 'employeeExits':
        filename = 'Employee_Exits_Report.csv';
        break;
      default:
        filename = 'Exit_Management_Report.csv';
    }
    
    link.download = filename;
    link.click();
    
    URL.revokeObjectURL(url);
    alert(`${filename} downloaded successfully!`);
  };

  // Function to export as PDF
  const handleExportPDF = () => {
    if (currentItems.length === 0) {
      alert("No data to export!");
      return;
    }

    const { headers, data, title } = getExportData();
    
    // Create PDF content using simple text format
    let pdfContent = `%PDF-1.4\n`;
    pdfContent += `1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n`;
    pdfContent += `2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n`;
    pdfContent += `3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n/Resources <<\n/Font <<\n/F1 5 0 R\n/F2 6 0 R\n>>\n>>\n>>\nendobj\n`;
    
    // Create content stream
    let stream = `BT\n/F2 16 Tf\n72 750 Td\n(${title}) Tj\nET\n`;
    stream += `BT\n/F1 10 Tf\n72 720 Td\n`;
    stream += `(Generated on: ${new Date().toLocaleDateString()}) Tj\nET\n`;
    stream += `BT\n/F1 12 Tf\n72 680 Td\n`;
    
    // Add headers
    stream += `(${headers.join(' | ')}) Tj\n`;
    stream += `72 660 Td\n`;
    
    // Add data rows
    data.forEach((row, index) => {
      if (index < 20) { // Limit to 20 rows per page
        stream += `(${row.join(' | ')}) Tj\n`;
        stream += `72 ${660 - (index + 1) * 20} Td\n`;
      }
    });
    
    stream += `ET`;
    
    // Calculate length
    const streamLength = stream.length;
    
    pdfContent += `4 0 obj\n<<\n/Length ${streamLength}\n>>\nstream\n${stream}\nendstream\nendobj\n`;
    pdfContent += `5 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n`;
    pdfContent += `6 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica-Bold\n>>\nendobj\n`;
    pdfContent += `xref\n0 7\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000178 00000 n \n0000000301 00000 n \n0000000456 00000 n \n0000000512 00000 n \ntrailer\n<<\n/Size 7\n/Root 1 0 R\n>>\nstartxref\n720\n%%EOF`;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    // Set filename based on view mode
    let filename = '';
    switch(viewMode) {
      case 'exitCases':
        filename = 'Exit_Management_Report_Exit_Cases.pdf';
        break;
      case 'alumni':
        filename = 'Exit_Management_Report_Alumni_Network.pdf';
        break;
      case 'settlements':
        filename = 'Exit_Management_Report_Settlements.pdf';
        break;
      case 'employeeExits':
        filename = 'Employee_Exits_Report.pdf';
        break;
      default:
        filename = 'Exit_Management_Report.pdf';
    }
    
    link.download = filename;
    link.click();
    
    URL.revokeObjectURL(url);
    alert(`${filename} downloaded successfully!`);
  };

  // Download individual settlement details
  const handleDownloadSettlement = (settlementId, format = 'excel') => {
    const settlement = settlements.find(s => s.id === settlementId);
    if (!settlement) {
      alert("Settlement not found!");
      return;
    }

    // Find the corresponding exit case for more details
    const exitCase = exitCases.find(e => e.employeeId === settlement.employeeId);
    
    // Create settlement details object
    const settlementDetails = {
      "Employee ID": settlement.employeeId,
      "Employee Name": settlement.employeeName,
      "Department": settlement.department,
      "Net Amount": settlement.netAmount,
      "Payment Date": settlement.paymentDate,
      "Status": settlement.status,
      "Approval Status": settlement.approvalStatus
    };

    if (exitCase) {
      // Add more details from exit case
      settlementDetails["Resignation Date"] = exitCase.resignationDate;
      settlementDetails["Last Working Day"] = exitCase.lastWorkingDay;
      settlementDetails["Exit Type"] = exitCase.exitType;
      settlementDetails["Exit Reason"] = exitCase.exitReason;
      settlementDetails["Clearance Progress"] = `${exitCase.clearanceProgress}%`;
    }

    if (format === 'excel') {
      // Create CSV content for Excel
      const headers = Object.keys(settlementDetails);
      const values = Object.values(settlementDetails);
      const csvContent = [headers.join(","), values.join(",")].join("\n");
      
      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Settlement_${settlement.employeeId}_${settlement.employeeName.replace(/\s+/g, '_')}.csv`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`Settlement details for ${settlement.employeeName} downloaded as Excel!`);
    } else {
      // Create PDF content
      let pdfContent = `%PDF-1.4\n`;
      pdfContent += `1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n`;
      pdfContent += `2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n`;
      pdfContent += `3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n/Resources <<\n/Font <<\n/F1 5 0 R\n/F2 6 0 R\n>>\n>>\n>>\nendobj\n`;
      
      // Create content stream
      let stream = `BT\n/F2 16 Tf\n72 750 Td\n(Settlement Details Report) Tj\nET\n`;
      stream += `BT\n/F1 10 Tf\n72 720 Td\n`;
      stream += `(Generated on: ${new Date().toLocaleDateString()}) Tj\nET\n`;
      stream += `BT\n/F1 12 Tf\n72 680 Td\n`;
      
      // Add details
      let yPos = 680;
      Object.entries(settlementDetails).forEach(([key, value]) => {
        stream += `(${key}: ${value}) Tj\n`;
        stream += `72 ${yPos - 20} Td\n`;
        yPos -= 20;
      });
      
      stream += `ET`;
      
      // Calculate length
      const streamLength = stream.length;
      
      pdfContent += `4 0 obj\n<<\n/Length ${streamLength}\n>>\nstream\n${stream}\nendstream\nendobj\n`;
      pdfContent += `5 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n`;
      pdfContent += `6 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica-Bold\n>>\nendobj\n`;
      pdfContent += `xref\n0 7\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000178 00000 n \n0000000301 00000 n \n0000000456 00000 n \n0000000512 00000 n \ntrailer\n<<\n/Size 7\n/Root 1 0 R\n>>\nstartxref\n720\n%%EOF`;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `Settlement_${settlement.employeeId}_${settlement.employeeName.replace(/\s+/g, '_')}.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
      alert(`Settlement details for ${settlement.employeeName} downloaded as PDF!`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleViewExit = (exitId) => {
    if (viewMode === 'exitCases') {
      const exit = exitCases.find(e => e.id === exitId);
      if (exit) {
        setSelectedExit(exit);
        if (exit.clearanceDetails) {
          setClearanceDetails(exit.clearanceDetails);
        } else {
          setClearanceDetails(getDefaultClearanceStructure());
        }
        setActiveModalTab('IT');
        setShowClearanceModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowClearanceModal(false);
    setShowExitInterviewModal(false);
    setShowKnowledgeTransferModal(false);
    setShowAlumniModal(false);
    setShowTrendsModal(false);
    setShowCertificateModal(false);
    setShowSettlementModal(false);
    setSelectedExit(null);
    setActiveModalTab('IT');
  };

  const handleOpenExitInterview = (exitId) => {
    const exit = exitCases.find(e => e.id === exitId);
    if (exit) {
      setSelectedExit(exit);
      setExitInterviewData(exit.exitInterviewData || {});
      setShowExitInterviewModal(true);
    }
  };

  const handleOpenKnowledgeTransfer = (exitId) => {
    const exit = exitCases.find(e => e.id === exitId);
    if (exit) {
      setSelectedExit(exit);
      setKnowledgeTransferData(exit.knowledgeTransferData || {});
      setShowKnowledgeTransferModal(true);
    }
  };

  const handleOpenSettlement = (exitId) => {
    const exit = exitCases.find(e => e.id === exitId);
    if (exit) {
      setSelectedExit(exit);
      // Calculate sample settlement values based on role and department
      const roleBasedSalary = exit.role.includes('Senior') || exit.role.includes('Lead') || exit.role.includes('Manager') ? 75000 : 45000;
      const leaveDays = 12;
      const leaveEncashmentVal = leaveDays * (roleBasedSalary / 30);
      const bonus = exit.role.includes('Senior') || exit.role.includes('Lead') || exit.role.includes('Manager') ? 25000 : 15000;
      const loanDeduction = exit.department === 'Finance' ? 15000 : 5000;
      const tax = roleBasedSalary * 0.1;
      const netPayable = roleBasedSalary + leaveEncashmentVal + bonus - loanDeduction - tax;

      setSettlementDetail({
        basicSalary: roleBasedSalary,
        leaveEncashment: leaveEncashmentVal,
        bonusIncentives: bonus,
        otherEarnings: 0,
        loanDeductions: loanDeduction,
        advanceDeductions: 0,
        taxDeductions: tax,
        otherDeductions: 0,
        netPayable: netPayable,
        paymentMethod: 'Bank Transfer',
        paymentDate: exit.lastWorkingDay,
        bankDetails: {
          accountNumber: 'XXXXXX7890',
          bankName: 'HDFC Bank',
          ifscCode: 'HDFC0001234',
          accountHolder: exit.employeeName
        },
        approvals: {
          finance: exit.department === 'Finance' ? true : false,
          hr: false,
          department: true,
          ceo: false
        },
        status: exit.settlement || 'Pending',
        notes: 'Settlement calculation based on company policy'
      });
      setShowSettlementModal(true);
    }
  };

  const handleGenerateCertificate = () => {
    if (selectedExit) {
      setShowCertificateModal(true);
    }
  };

  const handleSettlementChange = (e) => {
    const { name, value } = e.target;
    setSettlementDetail(prev => ({
      ...prev,
      [name]: name.includes('Deductions') || name.includes('Encashment') || name.includes('Salary') || name.includes('bonus') || name.includes('Earnings') ? parseFloat(value) || 0 : value
    }));
  };

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setSettlementDetail(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [name]: value
      }
    }));
  };

  const handleApprovalChange = (approvalType) => {
    setSettlementDetail(prev => ({
      ...prev,
      approvals: {
        ...prev.approvals,
        [approvalType]: !prev.approvals[approvalType]
      }
    }));
  };

  const calculateNetPayable = () => {
    const totalEarnings = settlementDetail.basicSalary + settlementDetail.leaveEncashment + settlementDetail.bonusIncentives + settlementDetail.otherEarnings;
    const totalDeductions = settlementDetail.loanDeductions + settlementDetail.advanceDeductions + settlementDetail.taxDeductions + settlementDetail.otherDeductions;
    return totalEarnings - totalDeductions;
  };

  // Update net payable when settlement details change
  useEffect(() => {
    const netPayable = calculateNetPayable();
    setSettlementDetail(prev => ({
      ...prev,
      netPayable: netPayable
    }));
  }, [
    settlementDetail.basicSalary,
    settlementDetail.leaveEncashment,
    settlementDetail.bonusIncentives,
    settlementDetail.otherEarnings,
    settlementDetail.loanDeductions,
    settlementDetail.advanceDeductions,
    settlementDetail.taxDeductions,
    settlementDetail.otherDeductions
  ]);

  // Responsive table rendering functions
  const renderExitCasesTable = () => (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: 40 }} className="text-center d-none d-md-table-cell">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedExits.length === currentItemsPage.length && currentItemsPage.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="text-start">EMPLOYEE</th>
            <th className="text-start d-none d-lg-table-cell">DEPT</th>
            <th className="text-start">LAST DAY</th>
            <th className="text-center d-none d-xl-table-cell">PROGRESS</th>
            <th className="text-center d-none d-lg-table-cell">PENDING</th>
            <th className="text-center">STATUS</th>
            <th className="text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItemsPage.map(exit => (
            <tr key={exit.id}>
              <td className="text-center d-none d-md-table-cell">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedExits.includes(exit.id)}
                  onChange={() => handleSelectExit(exit.id)}
                />
              </td>
              <td className="text-start">
                <div className="d-flex align-items-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style={{ width: '36px', height: '36px', fontSize: '12px' }}>
                    {exit.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="d-flex flex-column">
                    <div className="fw-medium small">{exit.employeeName}</div>
                    <small className="text-muted d-none d-sm-block">{exit.employeeId}</small>
                    <small className="text-muted d-sm-none">{exit.employeeId}</small>
                    <small className="text-muted d-block d-lg-none">{exit.department}</small>
                  </div>
                </div>
              </td>
              <td className="text-start d-none d-lg-table-cell">
                <span className="badge bg-light text-dark">
                  {exit.department}
                </span>
              </td>
              <td className="text-start">
                <div className="fw-medium small">{exit.lastWorkingDay}</div>
                <small className="text-muted d-none d-sm-block">
                  {Math.ceil((new Date(exit.lastWorkingDay) - new Date()) / (1000 * 60 * 60 * 24))} days left
                </small>
              </td>
              <td className="text-center d-none d-xl-table-cell">
                <div className="d-flex align-items-center gap-2">
                  <div className="flex-grow-1">
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className={`progress-bar ${getProgressColor(exit.clearanceProgress)}`}
                        style={{ width: `${exit.clearanceProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="fw-medium small">{exit.clearanceProgress}%</div>
                </div>
              </td>
              <td className="text-center d-none d-lg-table-cell">
                {exit.pendingClearances.length > 0 ? (
                  <div>
                    {exit.pendingClearances.slice(0, 1).map((dept, idx) => (
                      <span key={idx} className="badge bg-warning me-1 mb-1 small">
                        {dept}
                      </span>
                    ))}
                    {exit.pendingClearances.length > 1 && (
                      <span className="badge bg-light text-dark small">
                        +{exit.pendingClearances.length - 1}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="badge bg-success small">Cleared</span>
                )}
              </td>
              <td className="text-center">
                <div className="d-flex flex-column gap-1">
                  <span className={`badge ${getStatusBadge(exit.status)} small`}>
                    {exit.status}
                  </span>
                  {exit.escalationLevel > 0 && (
                    <span className={`badge ${getEscalationBadge(exit.escalationLevel)} small`}>
                      <AlertCircle size={10} className="me-1" />
                      L{exit.escalationLevel}
                    </span>
                  )}
                </div>
              </td>
              <td className="text-center">
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    type="button"
                    className="btn btn-icon btn-light p-1"
                    title="View"
                    onClick={() => handleViewExit(exit.id)}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-light p-1 d-none d-md-inline"
                    title="Interview"
                    onClick={() => handleOpenExitInterview(exit.id)}
                  >
                    <MessageSquare size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-light p-1 d-none d-md-inline"
                    title="Knowledge Transfer"
                    onClick={() => handleOpenKnowledgeTransfer(exit.id)}
                  >
                    <Share2 size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-light p-1 d-none d-md-inline"
                    title="Settlement"
                    onClick={() => handleOpenSettlement(exit.id)}
                  >
                    <CreditCard size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAlumniTable = () => (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: 40 }} className="text-center d-none d-md-table-cell">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedExits.length === currentItemsPage.length && currentItemsPage.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="text-start">ALUMNI</th>
            <th className="text-start d-none d-lg-table-cell">DEPT</th>
            <th className="text-start d-none d-xl-table-cell">EXIT DATE</th>
            <th className="text-center">REHIRE</th>
            <th className="text-center d-none d-lg-table-cell">BOOMERANG</th>
            <th className="text-center d-none d-xl-table-cell">ENGAGEMENT</th>
            <th className="text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItemsPage.map(alumni => (
            <tr key={alumni.id}>
              <td className="text-center d-none d-md-table-cell">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedExits.includes(alumni.id)}
                  onChange={() => handleSelectExit(alumni.id)}
                />
              </td>
              <td className="text-start">
                <div className="d-flex align-items-center">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style={{ width: '36px', height: '36px', fontSize: '12px' }}>
                    {alumni.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="d-flex flex-column">
                    <div className="fw-medium small">{alumni.name}</div>
                    <small className="text-muted d-none d-sm-block">{alumni.alumniId}</small>
                    <small className="text-muted d-block d-lg-none">{alumni.department}</small>
                  </div>
                </div>
              </td>
              <td className="text-start d-none d-lg-table-cell">
                <span className="badge bg-light text-dark">
                  {alumni.department}
                </span>
              </td>
              <td className="text-start d-none d-xl-table-cell">
                <div className="fw-medium small">{alumni.exitDate}</div>
              </td>
              <td className="text-center">
                <span className={`badge ${alumni.rehireEligibility === 'Eligible' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} small`}>
                  {alumni.rehireEligibility === 'Eligible' ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="text-center d-none d-lg-table-cell">
                <span className={`badge ${alumni.boomerangStatus === 'Interested' ? 'bg-warning-subtle text-warning' : 'bg-secondary-subtle text-secondary'} small`}>
                  {alumni.boomerangStatus === 'Interested' ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="text-center d-none d-xl-table-cell">
                <div className="progress" style={{ height: '6px' }}>
                  <div
                    className={`progress-bar ${alumni.engagementLevel === 'High' ? 'bg-success' : alumni.engagementLevel === 'Medium' ? 'bg-warning' : 'bg-danger'}`}
                    style={{ width: alumni.engagementLevel === 'High' ? '80%' : alumni.engagementLevel === 'Medium' ? '50%' : '30%' }}
                  ></div>
                </div>
                <small className="text-muted d-none d-xxl-block">{alumni.engagementLevel}</small>
              </td>
              <td className="text-center">
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    type="button"
                    className="btn btn-icon btn-light p-1"
                    title="View"
                    onClick={() => { setSelectedExit(alumni); setShowAlumniModal(true); }}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon btn-light p-1 d-none d-md-inline"
                    title="Message"
                    onClick={() => { setSelectedExit(alumni); setShowAlumniModal(true); }}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSettlementsTable = () => (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ width: 40 }} className="text-center d-none d-md-table-cell">
              <input
                type="checkbox"
                className="form-check-input"
                checked={selectedExits.length === currentItemsPage.length && currentItemsPage.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="text-start">EMPLOYEE</th>
            <th className="text-start d-none d-lg-table-cell">DEPT</th>
            <th className="text-center">AMOUNT</th>
            <th className="text-center d-none d-xl-table-cell">DATE</th>
            <th className="text-center">STATUS</th>
            <th className="text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentItemsPage.map(settlement => (
            <tr key={settlement.id}>
              <td className="text-center d-none d-md-table-cell">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedExits.includes(settlement.id)}
                  onChange={() => handleSelectExit(settlement.id)}
                />
              </td>
              <td className="text-start">
                <div className="d-flex align-items-center">
                  <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style={{ width: '36px', height: '36px', fontSize: '12px' }}>
                    {settlement.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="d-flex flex-column">
                    <div className="fw-medium small">{settlement.employeeName}</div>
                    <small className="text-muted d-none d-sm-block">{settlement.employeeId}</small>
                    <small className="text-muted d-block d-lg-none">{settlement.department}</small>
                  </div>
                </div>
              </td>
              <td className="text-start d-none d-lg-table-cell">
                <span className="badge bg-light text-dark">
                  {settlement.department}
                </span>
              </td>
              <td className="text-center">
                <div className="fw-bold text-success small">{settlement.netAmount}</div>
              </td>
              <td className="text-center d-none d-xl-table-cell">
                <div className="fw-medium small">{settlement.paymentDate}</div>
              </td>
              <td className="text-center">
                <span className={`badge ${getStatusBadge(settlement.status)} small`}>
                  {settlement.status}
                </span>
              </td>
              <td className="text-center">
                <div className="btn-group btn-group-sm" role="group">
                  <button type="button" className="btn btn-icon btn-light p-1" title="View" onClick={() => { setSelectedExit(settlement); handleOpenSettlement(settlement.id); }}>
                    <Eye size={14} />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-icon btn-light p-1 d-none d-md-inline" 
                    title="Download Excel"
                    onClick={() => handleDownloadSettlement(settlement.id, 'excel')}
                  >
                    <FileTextIcon size={14} />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-icon btn-light p-1 d-none d-md-inline" 
                    title="Download PDF"
                    onClick={() => handleDownloadSettlement(settlement.id, 'pdf')}
                  >
                    <File size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEmployeeExitsTable = () => (
    <div className="card border shadow-none">
      <div className="card-body">
        {/* Employee Exits Report Filters */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-3">
            <label className="form-label small">Location</label>
            <select
              className="form-select form-select-sm"
              name="location"
              value={employeeExitsFilters.location}
              onChange={handleEmployeeExitsFilterChange}
            >
              <option value="">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label small">Department</label>
            <select
              className="form-select form-select-sm"
              name="department"
              value={employeeExitsFilters.department}
              onChange={handleEmployeeExitsFilterChange}
            >
              <option value="">All Departments</option>
              <option value="Technical Support">Technical Support</option>
              <option value="HR Executive">HR Executive</option>
              <option value="Product Development Team">Product Development Team</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label small">Exit Reason</label>
            <select
              className="form-select form-select-sm"
              name="exitReason"
              value={employeeExitsFilters.exitReason}
              onChange={handleEmployeeExitsFilterChange}
            >
              <option value="">All Reasons</option>
              <option value="Resignation">Resignation</option>
              <option value="Termination">Termination</option>
              <option value="Retirement">Retirement</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label small">From</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="fromDate"
                  value={employeeExitsFilters.fromDate}
                  onChange={handleEmployeeExitsFilterChange}
                />
              </div>
              <div className="col-6">
                <label className="form-label small">To</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="toDate"
                  value={employeeExitsFilters.toDate}
                  onChange={handleEmployeeExitsFilterChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employee Exits Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-center">SN</th>
                <th className="text-start">EMPLOYEE</th>
                <th className="text-start">LOCATION</th>
                <th className="text-start">DEPARTMENT</th>
                <th className="text-start">DESIGNATION</th>
                <th className="text-start">JOINING</th>
                <th className="text-start">EXIT</th>
                <th className="text-start">REASON OF EXIT</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployeeExits.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    No employee data found. Try different filters.
                  </td>
                </tr>
              ) : (
                currentItemsPage.map((emp, index) => (
                  <tr key={emp.id}>
                    <td className="text-center">{startIndex + index + 1}</td>
                    <td className="text-start">
                      <div className="d-flex flex-column">
                        <div className="fw-medium small">{emp.name}</div>
                        <small className="text-muted">{emp.code}</small>
                      </div>
                    </td>
                    <td className="text-start">
                      <span className="badge bg-light text-dark small">{emp.location}</span>
                    </td>
                    <td className="text-start small">{emp.department}</td>
                    <td className="text-start small">{emp.designation}</td>
                    <td className="text-start small">{emp.joining}</td>
                    <td className="text-start">
                      <span className="badge bg-danger-subtle text-danger small">{emp.exit}</span>
                    </td>
                    <td className="text-start">
                      <span className={`badge ${emp.reason === 'Resignation' ? 'bg-warning-subtle text-warning' :
                        emp.reason === 'Termination' ? 'bg-danger-subtle text-danger' :
                          'bg-info-subtle text-info'
                        } small`}>
                        {emp.reason}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Export Buttons */}
        <div className="d-flex gap-2 mt-4">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={handleExportExcel}
            disabled={filteredEmployeeExits.length === 0}
          >
            <FileTextIcon size={14} className="me-1" />
            Download (Excel)
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleExportPDF}
            disabled={filteredEmployeeExits.length === 0}
          >
            <File size={14} className="me-1" />
            Download (PDF)
          </button>
        </div>
      </div>
    </div>
  );

  const styles = {
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px"
  },
  button: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    background: "#f9fafb"
  },
  secondaryButton: {
    background: "#e5e7eb"
  }
};

  return (
    <div className="container-fluid px-2 px-sm-3 px-md-4 py-3">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div className="mb-3 mb-md-0 flex-grow-1">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
            <h5 className="fw-bold mb-0">Exit Management & Clearance</h5>
            <span className="text-muted d-none d-md-block">|</span>
            <p className="text-muted mb-0 small d-none d-md-block">
              Manage employee exits, clearances, and alumni network
            </p>
          </div>
          <p className="text-muted mb-0 small d-md-none mt-1">
            Manage employee exits, clearances, and alumni network
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2 ms-auto">
          {/* Export Dropdown */}
          <div className="dropdown" style={{ position: 'relative' }}>
            <button
              className="btn btn-dark d-flex align-items-center gap-2 btn-sm dropdown-toggle"
              type="button"
              onClick={() => setShowExportDropdown(!showExportDropdown)}
            >
              <Download size={14} />
              <span className="d-none d-sm-inline">Export</span>
            </button>
            
            {showExportDropdown && (
              <div className="dropdown-menu show" style={{ 
                display: 'block', 
                position: 'absolute', 
                right: 0, 
                top: '100%',
                zIndex: 1000,
                minWidth: '200px'
              }}>
                <button 
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  onClick={() => {
                    handleExportExcel();
                    setShowExportDropdown(false);
                  }}
                >
                  <FileTextIcon size={14} />
                  <span>Export as Excel (CSV)</span>
                </button>
                <button 
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  onClick={() => {
                    handleExportPDF();
                    setShowExportDropdown(false);
                  }}
                >
                  <File size={14} />
                  <span>Export as PDF</span>
                </button>
              </div>
            )}
          </div>

          <button
            className="btn btn-dark d-flex align-items-center gap-2 btn-sm"
            onClick={handlePrint}
            title="Print"
          >
            <Printer size={14} />
            <span className="d-none d-sm-inline">Print</span>
          </button>

          {viewMode === 'exitCases' && (
            <button
              className="btn btn-primary d-flex align-items-center gap-2 btn-sm"
              onClick={() => alert('New Exit Case')}
            >
              <i className="bi bi-plus-circle"></i>
              <span className="d-none d-sm-inline">New Exit</span>
            </button>
          )}
        </div>
      </div>

      {/* View Mode Toggle - Mobile Responsive */}
      <div className="card border shadow-none mb-4">
        <div className="card-body p-2 p-sm-3">
          <div className="d-flex flex-wrap gap-2" role="group">
            <button
              className={`btn ${viewMode === 'exitCases' ? 'btn-primary' : 'btn-outline-primary'} btn-sm flex-grow-1 flex-md-grow-0`}
              onClick={() => setViewMode('exitCases')}
            >
              <i className="bi bi-box-arrow-right d-none d-sm-inline me-1"></i>
              <span>Exit Cases</span>
            </button>
            <button
              className={`btn ${viewMode === 'alumni' ? 'btn-primary' : 'btn-outline-primary'} btn-sm flex-grow-1 flex-md-grow-0`}
              onClick={() => setViewMode('alumni')}
            >
              <i className="bi bi-people d-none d-sm-inline me-1"></i>
              <span>Alumni</span>
            </button>
            <button
              className={`btn ${viewMode === 'settlements' ? 'btn-primary' : 'btn-outline-primary'} btn-sm flex-grow-1 flex-md-grow-0`}
              onClick={() => setViewMode('settlements')}
            >
              <i className="bi bi-cash d-none d-sm-inline me-1"></i>
              <span>Settlements</span>
            </button>
            <button
              className={`btn ${viewMode === 'employeeExits' ? 'btn-primary' : 'btn-outline-primary'} btn-sm flex-grow-1 flex-md-grow-0`}
              onClick={() => setViewMode('employeeExits')}
            >
              <i className="bi bi-file-earmark-text d-none d-sm-inline me-1"></i>
              <span>Employee Exits</span>
            </button>
            <button
              className="btn btn-outline-primary btn-sm d-none d-md-inline-flex flex-grow-1 flex-lg-grow-0"
              onClick={() => setShowTrendsModal(true)}
            >
              <i className="bi bi-graph-up me-1"></i>
              <span>Trends</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary - Responsive Grid */}
      <div className="row g-2 g-sm-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">Total Cases</div>
                  <div className="h5 mb-0 fw-bold text-primary">{insights.totalExitCases}</div>
                </div>
                <div className="bg-primary rounded-circle p-1 p-sm-2">
                  <i className="bi bi-box-arrow-right text-white fs-6"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">Pending</div>
                  <div className="h5 mb-0 fw-bold text-warning">{insights.pendingClearances}</div>
                </div>
                <div className="bg-warning rounded-circle p-1 p-sm-2">
                  <i className="bi bi-clock text-white fs-6"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">Escalated</div>
                  <div className="h5 mb-0 fw-bold text-danger">{insights.escalatedCases}</div>
                </div>
                <div className="bg-danger rounded-circle p-1 p-sm-2">
                  <i className="bi bi-exclamation-triangle text-white fs-6"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">Alumni</div>
                  <div className="h5 mb-0 fw-bold text-success">{insights.alumniCount}</div>
                </div>
                <div className="bg-success rounded-circle p-1 p-sm-2">
                  <i className="bi bi-people text-white fs-6"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters - Responsive - Hidden for Employee Exits */}
      {viewMode !== 'employeeExits' && (
        <div className="card border shadow-none mb-4">
          <div className="card-body p-2 p-sm-3">
            <div className="row g-2 g-sm-3 align-items-center">
              <div className="col-12 col-md-6">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-white">
                    <Search size={14} className="text-muted" />
                  </span>
                  <input
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-6 col-md-3 d-none d-md-block">
                <select
                  className="form-select form-select-sm"
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                >
                  <option value="">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              <div className="col-6 col-md-3 d-none d-md-block">
                <select
                  className="form-select form-select-sm"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="col-12 d-md-none">
                <button
                  className="btn btn-outline-secondary w-100 btn-sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <i className="bi bi-funnel me-1"></i>
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <div className="row g-2 mt-3">
                <div className="col-6">
                  <select
                    className="form-select form-select-sm"
                    value={filters.department}
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                  >
                    <option value="">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="hr">HR</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                <div className="col-6">
                  <select
                    className="form-select form-select-sm"
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {viewMode === 'exitCases' && (
                  <>
                    <div className="col-6">
                      <select
                        className="form-select form-select-sm"
                        value={filters.clearanceType}
                        onChange={(e) => setFilters(prev => ({ ...prev, clearanceType: e.target.value }))}
                      >
                        <option value="">Exit Type</option>
                        <option value="resignation">Resignation</option>
                        <option value="termination">Termination</option>
                        <option value="retirement">Retirement</option>
                      </select>
                    </div>

                    <div className="col-6">
                      <select
                        className="form-select form-select-sm"
                        value={filters.exitReason}
                        onChange={(e) => setFilters(prev => ({ ...prev, exitReason: e.target.value }))}
                      >
                        <option value="">Exit Reason</option>
                        <option value="better opportunity">Better Opportunity</option>
                        <option value="career growth">Career Growth</option>
                        <option value="higher studies">Higher Studies</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulk Actions Bar - Responsive - Hidden for Employee Exits */}
      {selectedExits.length > 0 && viewMode !== 'employeeExits' && (
        <div className="alert alert-info d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between mb-4 p-2 p-sm-3">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-2 mb-sm-0">
            <span className="fw-medium small">
              {selectedExits.length} selected
            </span>
            <div className="vr d-none d-sm-block"></div>
            <div className="d-flex flex-wrap gap-1">
              <button className="btn btn-danger btn-sm py-1">
                <i className="bi bi-trash"></i>
                <span className="d-none d-sm-inline ms-1">Delete</span>
              </button>
              <button className="btn btn-warning btn-sm py-1">
                <i className="bi bi-files"></i>
                <span className="d-none d-sm-inline ms-1">Duplicate</span>
              </button>
              {viewMode === 'exitCases' && (
                <button className="btn btn-success btn-sm py-1">
                  <i className="bi bi-file-earmark-check"></i>
                  <span className="d-none d-sm-inline ms-1">Certificates</span>
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setSelectedExits([])}
            className="btn btn-link p-0 text-decoration-none small align-self-end align-self-sm-center"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="mb-4">
        {viewMode === 'exitCases' && (
          <div className="card border shadow-none">
            <div className="card-body p-0">
              {renderExitCasesTable()}
            </div>
          </div>
        )}
        {viewMode === 'alumni' && (
          <div className="card border shadow-none">
            <div className="card-body p-0">
              {renderAlumniTable()}
            </div>
          </div>
        )}
        {viewMode === 'settlements' && (
          <div className="card border shadow-none">
            <div className="card-body p-0">
              {renderSettlementsTable()}
            </div>
          </div>
        )}
        {viewMode === 'employeeExits' && renderEmployeeExitsTable()}
      </div>
      
      {/* Pagination */}
      {viewMode !== 'employeeExits' && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body py-3">
            <div className="row align-items-center g-3">
              {/* Showing info */}
              <div className="col-12 col-md-4 text-center text-md-start">
                <small className="text-muted">
                  Showing <strong>{startIndex + 1}</strong> to{" "}
                  <strong>{Math.min(endIndex, currentItems.length)}</strong> of{" "}
                  <strong>{currentItems.length}</strong>
                </small>
              </div>

              {/* Pagination controls */}
              <div className="col-12 col-md-4 d-flex justify-content-center">
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {[...Array(Math.min(3, totalPages))].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`btn ${pageNum === currentPage
                            ? "btn-primary"
                            : "btn-outline-secondary"
                          }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 3 && (
                    <>
                      <button className="btn btn-outline-secondary" disabled>
                        …
                      </button>
                      <button
                        className={`btn ${totalPages === currentPage
                            ? "btn-primary"
                            : "btn-outline-secondary"
                          }`}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Page size */}
              <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
                <div className="d-flex align-items-center gap-2">
                  <small className="text-muted">Rows per page</small>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Exits Report Info */}
      {viewMode === 'employeeExits' && (
        <div className="alert alert-info mb-0">
          <div className="d-flex">
            <div className="me-3">
              <i className="bi bi-info-circle fs-4"></i>
            </div>
            <div>
              <h6 className="alert-heading">Employee Exits Report</h6>
              <p className="mb-0 small">
                View employees exiting during a given date range. Filter by location, department, exit reason, and date range.
                Export data to Excel (CSV) or PDF format.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Clearance Modal */}
      {showClearanceModal && selectedExit && (
        <ModalWrapper
          title={`Exit Clearance – ${selectedExit.employeeName}`}
          onClose={handleCloseModal}
        >
          <div className="container-fluid">
            {/* Employee Info */}
            <div className="row g-4 mb-4">
              <div className="col-12">
                <div className="card border shadow-sm">
                  <div className="card-body">
                    <h6 className="mb-3 fw-bold">Employee Information</h6>
                    <div className="row small">
                      <div className="col-6 mb-2">
                        <span className="text-muted">Employee ID</span>
                        <div className="fw-semibold">{selectedExit.employeeId}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Department</span>
                        <div className="fw-semibold">{selectedExit.department}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Role</span>
                        <div className="fw-semibold">{selectedExit.role}</div>
                      </div>
                      <div className="col-6 mb-2">
                        <span className="text-muted">Last Working Day</span>
                        <div className="fw-semibold">{selectedExit.lastWorkingDay}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="col-12">
                <div className="card border shadow-sm">
                  <div className="card-body">
                    <h6 className="mb-3 fw-bold">Clearance Progress</h6>
                    <div className="progress mb-2" style={{ height: 10 }}>
                      <div
                        className={`progress-bar ${getProgressColor(selectedExit.clearanceProgress)}`}
                        style={{ width: `${selectedExit.clearanceProgress}%` }}
                      />
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>{selectedExit.clearanceProgress}% Completed</span>
                      <span>{selectedExit.pendingClearances.length} Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              {["IT", "Admin", "Finance", "HR", "Department"].map(tab => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link ${activeModalTab === tab ? "active" : ""}`}
                    onClick={() => setActiveModalTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="card border">
              <div className="card-body">
                <h6>{activeModalTab} Clearance</h6>
                <p className="text-muted small mb-0">
                  Status: <strong>{clearanceDetails[activeModalTab]?.status}</strong>
                </p>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* Exit Interview Modal */}
      {showExitInterviewModal && selectedExit && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1051 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Exit Interview - {selectedExit.employeeName}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">Interview Date & Time</label>
                    <input type="datetime-local" className="form-control form-control-sm" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">Interviewer</label>
                    <input type="text" className="form-control form-control-sm" placeholder="Interviewer Name" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Exit Reason Category</label>
                    <select className="form-select form-select-sm">
                      <option>Better Opportunity</option>
                      <option>Career Growth</option>
                      <option>Higher Studies</option>
                      <option>Relocation</option>
                      <option>Personal Reasons</option>
                      <option>Health Issues</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Feedback on Manager</label>
                    <textarea className="form-control" rows="3" placeholder="Provide feedback on your manager..."></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Feedback on Team</label>
                    <textarea className="form-control" rows="3" placeholder="Provide feedback on your team..."></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Feedback on Company</label>
                    <textarea className="form-control" rows="3" placeholder="Provide feedback on the company..."></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Feedback on Role</label>
                    <textarea className="form-control" rows="3" placeholder="Provide feedback on your role..."></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Suggestions for Improvement</label>
                    <textarea className="form-control" rows="3" placeholder="Any suggestions to improve the organization..."></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Rehire Eligibility Assessment</label>
                    <div className="row g-2">
                      <div className="col-12 col-md-6">
                        <select className="form-select form-select-sm">
                          <option>Eligible</option>
                          <option>Not Eligible</option>
                          <option>Conditional</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6">
                        <textarea className="form-control form-control-sm" rows="2" placeholder="Assessment Notes"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Confidential Notes (Management Only)</label>
                    <textarea className="form-control" rows="3" placeholder="Confidential feedback for management..."></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary">Save Draft</button>
                <button type="button" className="btn btn-success">Complete Interview</button>
                <button type="button" className="btn btn-info">Generate Report</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Transfer Modal */}
      {showKnowledgeTransferModal && selectedExit && (
        <div
          className="modal fade show"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1055
          }}
        >
          <div className="modal-dialog modal-xl" style={{ margin: 0, width: "100%", maxWidth: "1000px" }}>
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">
                  Knowledge Transfer – {selectedExit.employeeName}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                />
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <h6 className="fw-bold mb-3">KT Checklist</h6>
                    <div className="card border">
                      <div className="card-body">
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="kt1" />
                          <label className="form-check-label" htmlFor="kt1">Ongoing work documentation completed</label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="kt2" />
                          <label className="form-check-label" htmlFor="kt2">Critical contacts and stakeholders list shared</label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="kt3" />
                          <label className="form-check-label" htmlFor="kt3">System access and password documentation provided</label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="kt4" />
                          <label className="form-check-label" htmlFor="kt4">Project status summary updated</label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="kt5" />
                          <label className="form-check-label" htmlFor="kt5">KT session scheduled and conducted</label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="kt6" />
                          <label className="form-check-label" htmlFor="kt6">Documentation uploaded to repository</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Ongoing Work Documentation</label>
                    <textarea className="form-control" rows="4" placeholder="Document all ongoing work, projects, and responsibilities..."></textarea>
                    <button className="btn btn-sm btn-outline-primary mt-2">
                      <Upload size={14} className="me-1" />
                      Upload Document
                    </button>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Critical Contacts & Stakeholders</label>
                    <textarea className="form-control" rows="4" placeholder="List all critical contacts and stakeholders with their roles..."></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">System Access & Passwords</label>
                    <textarea className="form-control" rows="4" placeholder="Document all system accesses, credentials (use secure format)..."></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Project Status Summary</label>
                    <textarea className="form-control" rows="4" placeholder="Summary of all projects, their status, and next steps..."></textarea>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">KT Session Date & Time</label>
                    <input type="datetime-local" className="form-control form-control-sm" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">KT Session Attendees</label>
                    <input type="text" className="form-control form-control-sm" placeholder="Attendee names (comma separated)" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">KT Completion Sign-off</label>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <input type="text" className="form-control form-control-sm" placeholder="Signed by" />
                      </div>
                      <div className="col-md-6">
                        <input type="date" className="form-control form-control-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Documentation Repository</label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Repository URL or path" />
                      <button className="btn btn-outline-primary">
                        <Upload size={14} className="me-1" />
                        Upload Files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button className="btn btn-primary">Save Progress</button>
                <button className="btn btn-success">Complete KT</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alumni Network Modal */}
      {showAlumniModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1051 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Alumni Network Management</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row g-3">
                  <div className="col-12">
                    <h6 className="fw-bold mb-3">Alumni Engagement</h6>
                    <div className="card border mb-3">
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-medium">Rehire Eligibility</label>
                            <select className="form-select form-select-sm">
                              <option>Eligible</option>
                              <option>Not Eligible</option>
                              <option>Conditional</option>
                            </select>
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-medium">Boomerang Status</label>
                            <select className="form-select form-select-sm">
                              <option>Interested</option>
                              <option>Not Interested</option>
                              <option>Open to Discussion</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <label className="form-label fw-medium">Engagement Level</label>
                            <select className="form-select form-select-sm">
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <label className="form-label fw-medium">Alumni Referral Program</label>
                            <div className="input-group input-group-sm">
                              <input type="number" className="form-control" placeholder="Total Referrals" />
                              <input type="number" className="form-control" placeholder="Successful Hires" />
                            </div>
                          </div>
                          <div className="col-12">
                            <label className="form-label fw-medium">Communication Notes</label>
                            <textarea className="form-control" rows="3" placeholder="Notes from alumni communication..."></textarea>
                          </div>
                          <div className="col-12">
                            <label className="form-label fw-medium">Alumni Events Participation</label>
                            <input type="text" className="form-control form-control-sm" placeholder="Events attended (comma separated)" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-info">Send Communication</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Settlement Modal */}
      {showSettlementModal && selectedExit && (
        <ModalWrapper
          title={`Final Settlement – ${selectedExit.employeeName}`}
          onClose={handleCloseModal}
          size="modal-lg"
        >
          <div className="container-fluid">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small">Basic Salary</label>
                <input
                  className="form-control form-control-sm"
                  value={settlementDetail.basicSalary}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Leave Encashment</label>
                <input
                  className="form-control form-control-sm"
                  value={settlementDetail.leaveEncashment}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Bonus / Incentives</label>
                <input
                  className="form-control form-control-sm"
                  value={settlementDetail.bonusIncentives}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Tax Deduction</label>
                <input
                  className="form-control form-control-sm"
                  value={settlementDetail.taxDeductions}
                  readOnly
                />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Net Payable</span>
              <span className="fw-bold text-success">
                ₹ {settlementDetail.netPayable.toFixed(2)}
              </span>
            </div>
          </div>
        </ModalWrapper>
      )}
      
      {/* Trends Modal */}
      {showTrendsModal && (
        <ModalWrapper
          title="Exit Trend Analysis"
          onClose={handleCloseModal}
          size="modal-xl"
        >
          <div className="container-fluid h-100">
            {/* Filters */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <label className="form-label fw-medium">Analysis Period</label>
                <select className="form-select form-select-sm">
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fw-medium">Filter By Department</label>
                <select className="form-select form-select-sm">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>
              </div>
            </div>

            {/* CENTERED TREND CARDS */}
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
              <div className="w-100" style={{ maxWidth: "700px" }}>
                <div className="row g-4">
                  <div className="col-12">
                    <div className="card border shadow-sm">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold mb-1">Exit Rate</h6>
                          <p className="text-muted small mb-0">Overall attrition trend</p>
                        </div>
                        <div className="display-6 text-danger">12.5%</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card border shadow-sm">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold mb-1">Avg Tenure</h6>
                          <p className="text-muted small mb-0">Employee stay duration</p>
                        </div>
                        <div className="display-6 text-primary">2.8 yrs</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card border shadow-sm">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold mb-1">Top Exit Reason</h6>
                          <p className="text-muted small mb-0">Most common reason</p>
                        </div>
                        <div className="fw-semibold fs-5">Better Opportunity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}

      {/* Clearance Certificate Modal */}
      {showCertificateModal && selectedExit && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1051 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Generate Clearance Certificate</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="card border mb-3">
                  <div className="card-body text-center py-5">
                    <FileCheck size={64} className="text-success mb-3" />
                    <h4>Clearance Certificate</h4>
                    <p className="text-muted mb-4">This certifies that all clearance formalities have been completed</p>
                    <div className="text-start">
                      <div className="mb-2"><strong>Employee:</strong> {selectedExit.employeeName}</div>
                      <div className="mb-2"><strong>Employee ID:</strong> {selectedExit.employeeId}</div>
                      <div className="mb-2"><strong>Department:</strong> {selectedExit.department}</div>
                      <div className="mb-2"><strong>Last Working Day:</strong> {selectedExit.lastWorkingDay}</div>
                      <div className="mb-2"><strong>Certificate Date:</strong> {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                <div className="alert alert-info">
                  <small>All departments have been cleared. The certificate is ready for generation.</small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="button" className="btn btn-primary">
                  <Printer size={14} className="me-1" />
                  Print
                </button>
                <button type="button" className="btn btn-success">
                  <Download size={14} className="me-1" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExitManagement;