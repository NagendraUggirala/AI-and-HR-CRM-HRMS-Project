import React, { useState, useEffect } from "react";
import RecruiterDashboardLayout from "../../recruiterDashboard/RecruiterDashboardLayout";
import { 
  Search, Download, Printer, Eye, Check, X, Trash2, 
  Calendar, TrendingUp, TrendingDown, AlertTriangle, Users, 
  BarChart3, PieChart, Clock, FileText, DollarSign, Filter,
  ChevronDown, ChevronUp, Clock as ClockIcon
} from "lucide-react";

/* -----------------------------------------------
   SIDEBAR CONTENT
------------------------------------------------ */
const sidebarContent = (
  <nav className="space-y-1 p-3">
    <h6 className="text-uppercase text-muted mb-2 small">Leave Reports</h6>

    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#balance">
      <i className="ri-dashboard-line me-2"></i> Leave Balance Reports
    </a>

    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#utilization">
      <i className="ri-bar-chart-line me-2"></i> Leave Utilization Reports
    </a>

    <a className="nav-link d-block py-2 px-3 rounded hover-bg-light" href="#approvals">
      <i className="ri-file-chart-line me-2"></i> Leave Approval Reports
    </a>
  </nav>
);

/* -----------------------------------------------
   USER INFO
------------------------------------------------ */
const userInfo = {
  name: "Leave Admin",
  role: "HR Leave Manager",
  email: "leave-admin@company.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeaveAdmin",
};

/* -----------------------------------------------
   SAMPLE DATA
------------------------------------------------ */
const initialLeaves = [
  {
    id: 1,
    employee: "Priya Sharma",
    department: "Engineering",
    leaveType: "Casual Leave",
    fromDate: "2025-11-20",
    toDate: "2025-11-22",
    appliedOn: "2025-11-15",
    status: "Pending",
    reason: "Family function",
  },
  {
    id: 2,
    employee: "Vikas Rao",
    department: "QA",
    leaveType: "Sick Leave",
    fromDate: "2025-10-05",
    toDate: "2025-10-06",
    appliedOn: "2025-10-01",
    status: "Approved",
    reason: "Fever",
  },
  {
    id: 3,
    employee: "Sneha Reddy",
    department: "Design",
    leaveType: "Casual Leave",
    fromDate: "2025-09-12",
    toDate: "2025-09-12",
    appliedOn: "2025-09-10",
    status: "Rejected",
    reason: "Short notice",
  },
  {
    id: 4,
    employee: "Arjun Singh",
    department: "Engineering",
    leaveType: "Sick Leave",
    fromDate: "2025-08-01",
    toDate: "2025-08-03",
    appliedOn: "2025-07-28",
    status: "Approved",
    reason: "Viral fever",
  },
  {
    id: 5,
    employee: "Neha Gupta",
    department: "HR",
    leaveType: "Casual Leave",
    fromDate: "2025-11-18",
    toDate: "2025-11-18",
    appliedOn: "2025-11-16",
    status: "Pending",
    reason: "Personal work",
  },
  {
    id: 6,
    employee: "Karthik Kumar",
    department: "Support",
    leaveType: "Earned Leave",
    fromDate: "2025-07-10",
    toDate: "2025-07-15",
    appliedOn: "2025-07-01",
    status: "Approved",
    reason: "Vacation trip",
  },
  {
    id: 7,
    employee: "Meera Joshi",
    department: "Finance",
    leaveType: "Sick Leave",
    fromDate: "2025-09-20",
    toDate: "2025-09-21",
    appliedOn: "2025-09-19",
    status: "Pending",
    reason: "Migraine",
  },
  {
    id: 8,
    employee: "Rohit Verma",
    department: "Engineering",
    leaveType: "Casual Leave",
    fromDate: "2025-06-05",
    toDate: "2025-06-06",
    appliedOn: "2025-06-01",
    status: "Approved",
    reason: "Travel",
  },
  {
    id: 9,
    employee: "Ananya Patel",
    department: "Design",
    leaveType: "Earned Leave",
    fromDate: "2025-12-20",
    toDate: "2025-12-25",
    appliedOn: "2025-12-01",
    status: "Pending",
    reason: "Holiday vacation",
  },
  {
    id: 10,
    employee: "Suresh Babu",
    department: "Support",
    leaveType: "Paternity Leave",
    fromDate: "2025-10-10",
    toDate: "2025-10-20",
    appliedOn: "2025-10-01",
    status: "Approved",
    reason: "New baby arrival",
  },
  {
    id: 11,
    employee: "Divya Sharma",
    department: "HR",
    leaveType: "Maternity Leave",
    fromDate: "2025-05-01",
    toDate: "2025-08-01",
    appliedOn: "2025-04-01",
    status: "Approved",
    reason: "Maternity",
  },
  {
    id: 12,
    employee: "Harsha Nair",
    department: "QA",
    leaveType: "Casual Leave",
    fromDate: "2025-09-14",
    toDate: "2025-09-14",
    appliedOn: "2025-09-13",
    status: "Rejected",
    reason: "Urgency not justified",
  },
  {
    id: 13,
    employee: "Vinay Kumar",
    department: "Engineering",
    leaveType: "Sick Leave",
    fromDate: "2025-04-10",
    toDate: "2025-04-12",
    appliedOn: "2025-04-08",
    status: "Approved",
    reason: "Cold & fever",
  },
  {
    id: 14,
    employee: "Ayesha Khan",
    department: "Finance",
    leaveType: "Casual Leave",
    fromDate: "2025-07-02",
    toDate: "2025-07-02",
    appliedOn: "2025-06-30",
    status: "Pending",
    reason: "Bank work",
  },
  {
    id: 15,
    employee: "Nikhil Sharma",
    department: "Support",
    leaveType: "Earned Leave",
    fromDate: "2025-03-15",
    toDate: "2025-03-20",
    appliedOn: "2025-03-01",
    status: "Approved",
    reason: "Family function",
  },
];

/* -----------------------------------------------
   UTILITY FUNCTIONS
------------------------------------------------ */
const parseDate = (s) => (s ? new Date(s) : null);

const diffDays = (from, to) => {
  const f = parseDate(from);
  const t = parseDate(to);
  if (!f || !t) return 0;
  return Math.round((t - f) / (1000 * 60 * 60 * 24)) + 1;
};

const statusBadge = (status) => {
  const map = {
    Pending: "bg-warning-subtle text-warning",
    Approved: "bg-success-subtle text-success",
    Rejected: "bg-danger-subtle text-danger",
  };
  return map[status] || "bg-secondary-subtle text-secondary";
};

/* -----------------------------------------------
   MAIN COMPONENT
------------------------------------------------ */
const LeaveReports = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [activeTab, setActiveTab] = useState("balance"); // balance, utilization, approvals, list

  const [selected, setSelected] = useState([]);
  const [modalLeave, setModalLeave] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Leave Balance Data
  const leaveBalanceData = [
    { employee: "Priya Sharma", employeeId: "EMP001", department: "Engineering", casualLeave: { allocated: 12, used: 8, balance: 4, carryForward: 2 }, sickLeave: { allocated: 10, used: 3, balance: 7, carryForward: 0 }, earnedLeave: { allocated: 15, used: 5, balance: 10, carryForward: 5 }, totalBalance: 21 },
    { employee: "Vikas Rao", employeeId: "EMP002", department: "QA", casualLeave: { allocated: 12, used: 10, balance: 2, carryForward: 0 }, sickLeave: { allocated: 10, used: 7, balance: 3, carryForward: 0 }, earnedLeave: { allocated: 15, used: 12, balance: 3, carryForward: 2 }, totalBalance: 8 },
    { employee: "Arjun Singh", employeeId: "EMP003", department: "Engineering", casualLeave: { allocated: 12, used: 6, balance: 6, carryForward: 0 }, sickLeave: { allocated: 10, used: 4, balance: 6, carryForward: 0 }, earnedLeave: { allocated: 15, used: 8, balance: 7, carryForward: 3 }, totalBalance: 19 },
    { employee: "Neha Gupta", employeeId: "EMP004", department: "HR", casualLeave: { allocated: 12, used: 9, balance: 3, carryForward: 1 }, sickLeave: { allocated: 10, used: 2, balance: 8, carryForward: 0 }, earnedLeave: { allocated: 15, used: 10, balance: 5, carryForward: 4 }, totalBalance: 16 },
  ];

  // Department-wise Leave Liability
  const deptLeaveLiability = [
    { department: "Engineering", totalEmployees: 150, totalBalance: 2450, casualLeave: 680, sickLeave: 950, earnedLeave: 820, encashmentLiability: 245000 },
    { department: "QA", totalEmployees: 45, totalBalance: 680, casualLeave: 180, sickLeave: 220, earnedLeave: 280, encashmentLiability: 68000 },
    { department: "Design", totalEmployees: 25, totalBalance: 420, casualLeave: 120, sickLeave: 150, earnedLeave: 150, encashmentLiability: 42000 },
    { department: "HR", totalEmployees: 30, totalBalance: 520, casualLeave: 140, sickLeave: 180, earnedLeave: 200, encashmentLiability: 52000 },
    { department: "Finance", totalEmployees: 35, totalBalance: 580, casualLeave: 160, sickLeave: 200, earnedLeave: 220, encashmentLiability: 58000 },
    { department: "Support", totalEmployees: 40, totalBalance: 680, casualLeave: 180, sickLeave: 240, earnedLeave: 260, encashmentLiability: 68000 },
  ];

  // Leave Accrual Register
  const leaveAccrualData = [
    { employee: "Priya Sharma", employeeId: "EMP001", department: "Engineering", accrualDate: "2024-01-01", leaveType: "Earned Leave", daysAccrued: 1.25, balanceBefore: 13.75, balanceAfter: 15.00 },
    { employee: "Vikas Rao", employeeId: "EMP002", department: "QA", accrualDate: "2024-01-01", leaveType: "Earned Leave", daysAccrued: 1.25, balanceBefore: 10.75, balanceAfter: 12.00 },
    { employee: "Arjun Singh", employeeId: "EMP003", department: "Engineering", accrualDate: "2024-01-01", leaveType: "Earned Leave", daysAccrued: 1.25, balanceBefore: 5.75, balanceAfter: 7.00 },
  ];

  // Carry-forward Leave Tracking
  const carryForwardData = [
    { employee: "Priya Sharma", employeeId: "EMP001", department: "Engineering", leaveType: "Casual Leave", previousYearBalance: 2, carriedForward: 2, currentYearAllocated: 12, totalAvailable: 14 },
    { employee: "Priya Sharma", employeeId: "EMP001", department: "Engineering", leaveType: "Earned Leave", previousYearBalance: 5, carriedForward: 5, currentYearAllocated: 15, totalAvailable: 20 },
    { employee: "Neha Gupta", employeeId: "EMP004", department: "HR", leaveType: "Casual Leave", previousYearBalance: 1, carriedForward: 1, currentYearAllocated: 12, totalAvailable: 13 },
    { employee: "Neha Gupta", employeeId: "EMP004", department: "HR", leaveType: "Earned Leave", previousYearBalance: 4, carriedForward: 4, currentYearAllocated: 15, totalAvailable: 19 },
  ];

  // Leave Utilization Data
  const monthlyLeaveSummary = [
    { month: "January 2024", totalLeaves: 125, casualLeave: 45, sickLeave: 35, earnedLeave: 40, other: 5, avgDaysPerEmployee: 2.1 },
    { month: "February 2024", totalLeaves: 98, casualLeave: 32, sickLeave: 28, earnedLeave: 35, other: 3, avgDaysPerEmployee: 1.8 },
    { month: "March 2024", totalLeaves: 142, casualLeave: 52, sickLeave: 38, earnedLeave: 48, other: 4, avgDaysPerEmployee: 2.5 },
    { month: "April 2024", totalLeaves: 115, casualLeave: 40, sickLeave: 32, earnedLeave: 40, other: 3, avgDaysPerEmployee: 2.0 },
    { month: "May 2024", totalLeaves: 108, casualLeave: 38, sickLeave: 30, earnedLeave: 37, other: 3, avgDaysPerEmployee: 1.9 },
    { month: "June 2024", totalLeaves: 135, casualLeave: 48, sickLeave: 35, earnedLeave: 49, other: 3, avgDaysPerEmployee: 2.3 },
  ];

  // Leave Type Popularity
  const leaveTypePopularity = [
    { leaveType: "Casual Leave", count: 255, percentage: 38.5, avgDays: 1.5 },
    { leaveType: "Sick Leave", count: 198, percentage: 29.9, avgDays: 2.0 },
    { leaveType: "Earned Leave", count: 249, percentage: 37.6, avgDays: 3.2 },
    { leaveType: "Maternity Leave", count: 8, percentage: 1.2, avgDays: 90.0 },
    { leaveType: "Paternity Leave", count: 12, percentage: 1.8, avgDays: 15.0 },
  ];

  // Seasonal Leave Patterns
  const seasonalPatterns = [
    { quarter: "Q1 (Jan-Mar)", totalLeaves: 365, peakMonth: "March", reason: "Holiday season" },
    { quarter: "Q2 (Apr-Jun)", totalLeaves: 358, peakMonth: "June", reason: "Summer vacation" },
    { quarter: "Q3 (Jul-Sep)", totalLeaves: 342, peakMonth: "September", reason: "Festival season" },
    { quarter: "Q4 (Oct-Dec)", totalLeaves: 385, peakMonth: "December", reason: "Year-end holidays" },
  ];

  // Department-wise Leave Utilization
  const deptUtilization = [
    { department: "Engineering", totalEmployees: 150, avgLeaveDays: 18.5, utilizationRate: 75.2, casualLeave: 680, sickLeave: 450, earnedLeave: 620 },
    { department: "QA", totalEmployees: 45, avgLeaveDays: 16.2, utilizationRate: 68.5, casualLeave: 180, sickLeave: 150, earnedLeave: 220 },
    { department: "Design", totalEmployees: 25, avgLeaveDays: 20.1, utilizationRate: 81.2, casualLeave: 120, sickLeave: 80, earnedLeave: 150 },
    { department: "HR", totalEmployees: 30, avgLeaveDays: 17.8, utilizationRate: 72.1, casualLeave: 140, sickLeave: 120, earnedLeave: 180 },
    { department: "Finance", totalEmployees: 35, avgLeaveDays: 16.5, utilizationRate: 66.8, casualLeave: 160, sickLeave: 140, earnedLeave: 200 },
    { department: "Support", totalEmployees: 40, avgLeaveDays: 17.0, utilizationRate: 69.0, casualLeave: 180, sickLeave: 160, earnedLeave: 240 },
  ];

  // Unutilized Leave Alerts
  const unutilizedLeaveAlerts = [
    { employee: "Priya Sharma", employeeId: "EMP001", department: "Engineering", leaveType: "Earned Leave", balance: 15, threshold: 10, riskLevel: "High" },
    { employee: "Arjun Singh", employeeId: "EMP003", department: "Engineering", leaveType: "Earned Leave", balance: 12, threshold: 10, riskLevel: "High" },
    { employee: "Neha Gupta", employeeId: "EMP004", department: "HR", leaveType: "Sick Leave", balance: 8, threshold: 5, riskLevel: "Medium" },
    { employee: "Karthik Kumar", employeeId: "EMP006", department: "Support", leaveType: "Earned Leave", balance: 11, threshold: 10, riskLevel: "High" },
  ];

  // Leave Clustering
  const leaveClustering = [
    { date: "2024-01-15", totalEmployees: 12, departments: ["Engineering", "QA", "Design"], impact: "High", casualLeave: 8, sickLeave: 2, earnedLeave: 2 },
    { date: "2024-03-20", totalEmployees: 18, departments: ["Engineering", "HR", "Finance"], impact: "Very High", casualLeave: 12, sickLeave: 3, earnedLeave: 3 },
    { date: "2024-06-10", totalEmployees: 15, departments: ["Support", "QA", "Design"], impact: "High", casualLeave: 10, sickLeave: 2, earnedLeave: 3 },
    { date: "2024-12-25", totalEmployees: 25, departments: ["All"], impact: "Critical", casualLeave: 18, sickLeave: 2, earnedLeave: 5 },
  ];

  // Leave Approval Data
  const leaveApprovalData = [
    { id: 1, employee: "Priya Sharma", department: "Engineering", leaveType: "Casual Leave", fromDate: "2024-11-20", toDate: "2024-11-22", appliedOn: "2024-11-15", approvedOn: null, approvalTime: null, status: "Pending", approver: "John Manager" },
    { id: 2, employee: "Vikas Rao", department: "QA", leaveType: "Sick Leave", fromDate: "2024-10-05", toDate: "2024-10-06", appliedOn: "2024-10-01", approvedOn: "2024-10-02", approvalTime: "1 day", status: "Approved", approver: "Sarah Manager" },
    { id: 3, employee: "Neha Gupta", department: "HR", leaveType: "Casual Leave", fromDate: "2024-11-18", toDate: "2024-11-18", appliedOn: "2024-11-16", approvedOn: null, approvalTime: null, status: "Pending", approver: "Mike Manager" },
    { id: 4, employee: "Meera Joshi", department: "Finance", leaveType: "Sick Leave", fromDate: "2024-09-20", toDate: "2024-09-21", appliedOn: "2024-09-19", approvedOn: "2024-09-19", approvalTime: "Same day", status: "Approved", approver: "Lisa Manager" },
  ];

  // Leave Rejection Analysis
  const leaveRejectionData = [
    { employee: "Sneha Reddy", department: "Design", leaveType: "Casual Leave", reason: "Short notice period", rejectionRate: "5.2%", pattern: "Frequent short notice" },
    { employee: "Harsha Nair", department: "QA", leaveType: "Casual Leave", reason: "Urgency not justified", rejectionRate: "3.8%", pattern: "Low justification" },
    { employee: "Rajesh Kumar", department: "Engineering", leaveType: "Earned Leave", reason: "Insufficient team coverage", rejectionRate: "4.1%", pattern: "Resource constraints" },
  ];

  // Leave Cancellation Reports
  const leaveCancellationData = [
    { employee: "Priya Sharma", employeeId: "EMP001", department: "Engineering", leaveType: "Casual Leave", originalFrom: "2024-10-15", originalTo: "2024-10-17", cancelledOn: "2024-10-12", reason: "Work emergency", cancelledBy: "Self" },
    { employee: "Arjun Singh", employeeId: "EMP003", department: "Engineering", leaveType: "Earned Leave", originalFrom: "2024-09-05", originalTo: "2024-09-10", cancelledOn: "2024-09-03", reason: "Project deadline", cancelledBy: "Manager" },
  ];

  /* -------- FILTERING -------- */
  const filtered = leaves.filter((l) => {
    const matchesSearch =
      l.employee.toLowerCase().includes(filter.toLowerCase()) ||
      l.department.toLowerCase().includes(filter.toLowerCase()) ||
      l.leaveType.toLowerCase().includes(filter.toLowerCase());

    const matchesType = !typeFilter || l.leaveType === typeFilter;
    const matchesStatus = !statusFilter || l.status === statusFilter;
    const matchesDept = !deptFilter || l.department === deptFilter;

    return matchesSearch && matchesType && matchesStatus && matchesDept;
  });

  /* -------- PAGINATION -------- */
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const display = filtered.slice(start, start + perPage);

  /* -------- KPIs -------- */
  const kpis = {
    total: leaves.length,
    pending: leaves.filter((l) => l.status === "Pending").length,
    approved: leaves.filter((l) => l.status === "Approved").length,
    rejected: leaves.filter((l) => l.status === "Rejected").length,
  };

  // Helper function to render distribution chart
  const renderDistributionChart = (data, labelKey, valueKey, color = '#3b82f6') => {
    const maxValue = Math.max(...data.map(d => d[valueKey]));
    return (
      <div className="mt-3">
        {data.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="small fw-medium">{item[labelKey]}</span>
              <span className="small text-muted">{item[valueKey]}{item.percentage && ` (${item.percentage}%)`}</span>
            </div>
            <div className="progress" style={{ height: '20px' }}>
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ 
                  width: `${(item[valueKey] / maxValue) * 100}%`, 
                  backgroundColor: color 
                }}
              >
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* -----------------------------------------
     ACTIONS: APPROVE / REJECT / DELETE
  ----------------------------------------- */
  const updateStatus = (id, newStatus) => {
    setLeaves((prev) =>
      prev.map((lv) =>
        lv.id === id ? { ...lv, status: newStatus } : lv
      )
    );
    setModalLeave(null);
  };

  const bulkAction = (action) => {
    setLeaves((prev) =>
      prev.map((lv) =>
        selected.includes(lv.id) ? { ...lv, status: action } : lv
      )
    );
    setSelected([]);
  };

  const bulkDelete = () => {
    setLeaves((prev) => prev.filter((l) => !selected.includes(l.id)));
    setSelected([]);
  };

  /* -------- EXPORT CSV -------- */
  const exportCSV = () => {
    const rows = [
      ["Employee", "Department", "Leave Type", "From", "To", "Status"],
      ...filtered.map((l) => [
        l.employee,
        l.department,
        l.leaveType,
        l.fromDate,
        l.toDate,
        l.status,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leave-reports.csv";
    a.click();
  };

  return (
    
      <div className="container-fluid p-4">

        {/* ----------------- TITLE ----------------- */}
        <div className="mb-4">
          <h4 className="mb-2">Leave Reports & Analytics</h4>
          <p className="text-muted">Comprehensive leave management reports and analytics dashboard</p>
        </div>

        {/* ----------------- TAB NAVIGATION ----------------- */}
        <div className="card mb-4">
          <div className="card-body">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'balance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('balance')}
                >
                  <Calendar className="me-2" size={16} />
                  Leave Balance Reports
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'utilization' ? 'active' : ''}`}
                  onClick={() => setActiveTab('utilization')}
                >
                  <BarChart3 className="me-2" size={16} />
                  Leave Utilization Reports
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'approvals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('approvals')}
                >
                  <FileText className="me-2" size={16} />
                  Leave Approval Reports
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ----------------- KPIs ----------------- */}
        <div className="row g-3 mb-4">
          <div className="col-sm-3">
            <div className="card p-3">
              <div className="small text-muted">Total Leaves</div>
              <div className="h5">{kpis.total}</div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card p-3">
              <div className="small text-muted">Pending</div>
              <div className="h5 text-warning">{kpis.pending}</div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card p-3">
              <div className="small text-muted">Approved</div>
              <div className="h5 text-success">{kpis.approved}</div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card p-3">
              <div className="small text-muted">Rejected</div>
              <div className="h5 text-danger">{kpis.rejected}</div>
            </div>
          </div>
        </div>

        {/* ----------------- LEAVE BALANCE REPORTS ----------------- */}
        {activeTab === 'balance' && (
          <div>
            {/* Employee-wise Leave Balance */}
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Employee-wise Leave Balance</h5>
                <button className="btn btn-sm btn-outline-dark" onClick={() => {
                  const csv = [
                    ['Employee', 'Employee ID', 'Department', 'Casual Leave (Balance)', 'Sick Leave (Balance)', 'Earned Leave (Balance)', 'Total Balance'],
                    ...leaveBalanceData.map(l => [
                      l.employee, l.employeeId, l.department, 
                      l.casualLeave.balance, l.sickLeave.balance, l.earnedLeave.balance, l.totalBalance
                    ])
                  ].map(r => r.join(',')).join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'employee-leave-balance.csv';
                  a.click();
                }}>
                  <Download size={14} className="me-1" /> Export
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Casual Leave</th>
                        <th>Sick Leave</th>
                        <th>Earned Leave</th>
                        <th>Total Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveBalanceData.map((emp, idx) => (
                        <tr key={idx}>
                          <td><strong>{emp.employee}</strong><br /><small className="text-muted">{emp.employeeId}</small></td>
                          <td>{emp.department}</td>
                          <td>
                            <small>Used: {emp.casualLeave.used}/{emp.casualLeave.allocated}</small><br />
                            <strong>Balance: {emp.casualLeave.balance}</strong>
                            {emp.casualLeave.carryForward > 0 && <small className="text-info"> (CF: {emp.casualLeave.carryForward})</small>}
                          </td>
                          <td>
                            <small>Used: {emp.sickLeave.used}/{emp.sickLeave.allocated}</small><br />
                            <strong>Balance: {emp.sickLeave.balance}</strong>
                            {emp.sickLeave.carryForward > 0 && <small className="text-info"> (CF: {emp.sickLeave.carryForward})</small>}
                          </td>
                          <td>
                            <small>Used: {emp.earnedLeave.used}/{emp.earnedLeave.allocated}</small><br />
                            <strong>Balance: {emp.earnedLeave.balance}</strong>
                            {emp.earnedLeave.carryForward > 0 && <small className="text-info"> (CF: {emp.earnedLeave.carryForward})</small>}
                          </td>
                          <td><strong className="text-primary">{emp.totalBalance}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Department-wise Leave Liability */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Department-wise Leave Liability</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Total Balance</th>
                            <th>Encashment Liability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deptLeaveLiability.map((dept, idx) => (
                            <tr key={idx}>
                              <td><strong>{dept.department}</strong></td>
                              <td>{dept.totalEmployees}</td>
                              <td>{dept.totalBalance} days</td>
                              <td>₹{dept.encashmentLiability.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Leave Type Utilization</h6>
                  </div>
                  <div className="card-body">
                    {renderDistributionChart(
                      deptLeaveLiability.map(d => ({ department: d.department, value: d.totalBalance })),
                      'department',
                      'value',
                      '#3b82f6'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Accrual Register */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Leave Accrual Register</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Accrual Date</th>
                        <th>Leave Type</th>
                        <th>Days Accrued</th>
                        <th>Balance Before</th>
                        <th>Balance After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveAccrualData.map((accrual, idx) => (
                        <tr key={idx}>
                          <td><strong>{accrual.employee}</strong><br /><small className="text-muted">{accrual.employeeId}</small></td>
                          <td>{accrual.department}</td>
                          <td>{accrual.accrualDate}</td>
                          <td>{accrual.leaveType}</td>
                          <td><strong className="text-success">+{accrual.daysAccrued}</strong></td>
                          <td>{accrual.balanceBefore}</td>
                          <td><strong>{accrual.balanceAfter}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Carry-forward Leave Tracking */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Carry-forward Leave Tracking</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>Previous Year Balance</th>
                        <th>Carried Forward</th>
                        <th>Current Year Allocated</th>
                        <th>Total Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carryForwardData.map((cf, idx) => (
                        <tr key={idx}>
                          <td><strong>{cf.employee}</strong><br /><small className="text-muted">{cf.employeeId}</small></td>
                          <td>{cf.department}</td>
                          <td>{cf.leaveType}</td>
                          <td>{cf.previousYearBalance}</td>
                          <td><strong className="text-info">{cf.carriedForward}</strong></td>
                          <td>{cf.currentYearAllocated}</td>
                          <td><strong className="text-primary">{cf.totalAvailable}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Leave Encashment Liability */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Leave Encashment Liability by Department</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {deptLeaveLiability.map((dept, idx) => (
                    <div key={idx} className="col-md-4 mb-3">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="card-title">{dept.department}</h6>
                          <div className="mb-2">
                            <small className="text-muted">Total Balance: {dept.totalBalance} days</small>
                          </div>
                          <div className="h4 text-primary mb-0">₹{dept.encashmentLiability.toLocaleString()}</div>
                          <small className="text-muted">Encashment Liability</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- LEAVE UTILIZATION REPORTS ----------------- */}
        {activeTab === 'utilization' && (
          <div>
            {/* Monthly Leave Taken Summary */}
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Monthly Leave Taken Summary</h5>
                <button className="btn btn-sm btn-outline-dark">
                  <Download size={14} className="me-1" /> Export
                </button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Total Leaves</th>
                        <th>Casual Leave</th>
                        <th>Sick Leave</th>
                        <th>Earned Leave</th>
                        <th>Other</th>
                        <th>Avg Days/Employee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyLeaveSummary.map((month, idx) => (
                        <tr key={idx}>
                          <td><strong>{month.month}</strong></td>
                          <td>{month.totalLeaves}</td>
                          <td>{month.casualLeave}</td>
                          <td>{month.sickLeave}</td>
                          <td>{month.earnedLeave}</td>
                          <td>{month.other}</td>
                          <td><strong>{month.avgDaysPerEmployee}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Leave Type Popularity Analysis */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Leave Type Popularity Analysis</h6>
                  </div>
                  <div className="card-body">
                    {renderDistributionChart(
                      leaveTypePopularity,
                      'leaveType',
                      'count',
                      '#10b981'
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Average Days per Leave Type</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Leave Type</th>
                            <th>Count</th>
                            <th>Avg Days</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveTypePopularity.map((type, idx) => (
                            <tr key={idx}>
                              <td>{type.leaveType}</td>
                              <td>{type.count}</td>
                              <td><strong>{type.avgDays}</strong></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Leave Patterns */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Seasonal Leave Patterns</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {seasonalPatterns.map((pattern, idx) => (
                    <div key={idx} className="col-md-3 mb-3">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="card-title">{pattern.quarter}</h6>
                          <div className="h4 text-primary mb-2">{pattern.totalLeaves}</div>
                          <small className="text-muted d-block">Total Leaves</small>
                          <small className="text-info d-block mt-2">Peak: {pattern.peakMonth}</small>
                          <small className="text-secondary">{pattern.reason}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Department-wise Leave Utilization */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Department-wise Leave Utilization</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Total Employees</th>
                        <th>Avg Leave Days</th>
                        <th>Utilization Rate</th>
                        <th>Casual Leave</th>
                        <th>Sick Leave</th>
                        <th>Earned Leave</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deptUtilization.map((dept, idx) => (
                        <tr key={idx}>
                          <td><strong>{dept.department}</strong></td>
                          <td>{dept.totalEmployees}</td>
                          <td>{dept.avgLeaveDays}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress me-2" style={{ width: '100px', height: '20px' }}>
                                <div 
                                  className={`progress-bar ${dept.utilizationRate > 80 ? 'bg-danger' : dept.utilizationRate > 60 ? 'bg-warning' : 'bg-success'}`}
                                  style={{ width: `${dept.utilizationRate}%` }}
                                >
                                </div>
                              </div>
                              <span>{dept.utilizationRate}%</span>
                            </div>
                          </td>
                          <td>{dept.casualLeave}</td>
                          <td>{dept.sickLeave}</td>
                          <td>{dept.earnedLeave}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Unutilized Leave Alerts */}
            <div className="card mb-4 border-warning">
              <div className="card-header bg-warning-subtle">
                <h6 className="mb-0 d-flex align-items-center">
                  <AlertTriangle className="me-2" size={18} />
                  Unutilized Leave Alerts
                </h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>Balance</th>
                        <th>Threshold</th>
                        <th>Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unutilizedLeaveAlerts.map((alert, idx) => (
                        <tr key={idx}>
                          <td><strong>{alert.employee}</strong><br /><small className="text-muted">{alert.employeeId}</small></td>
                          <td>{alert.department}</td>
                          <td>{alert.leaveType}</td>
                          <td><strong>{alert.balance}</strong></td>
                          <td>{alert.threshold}</td>
                          <td>
                            <span className={`badge bg-${alert.riskLevel === 'High' ? 'danger' : 'warning'}`}>
                              {alert.riskLevel}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Leave Clustering */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Leave Clustering (Multiple Employees on Leave)</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Total Employees</th>
                        <th>Departments Affected</th>
                        <th>Impact</th>
                        <th>Casual Leave</th>
                        <th>Sick Leave</th>
                        <th>Earned Leave</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveClustering.map((cluster, idx) => (
                        <tr key={idx}>
                          <td><strong>{cluster.date}</strong></td>
                          <td><strong className="text-danger">{cluster.totalEmployees}</strong></td>
                          <td>{cluster.departments.join(', ')}</td>
                          <td>
                            <span className={`badge bg-${
                              cluster.impact === 'Critical' ? 'danger' :
                              cluster.impact === 'Very High' ? 'warning' : 'info'
                            }`}>
                              {cluster.impact}
                            </span>
                          </td>
                          <td>{cluster.casualLeave}</td>
                          <td>{cluster.sickLeave}</td>
                          <td>{cluster.earnedLeave}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- LEAVE APPROVAL REPORTS ----------------- */}
        {activeTab === 'approvals' && (
          <div>
            {/* Pending Leave Approvals */}
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Pending Leave Approvals</h5>
                <span className="badge bg-warning">{leaveApprovalData.filter(l => l.status === 'Pending').length} Pending</span>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>From - To</th>
                        <th>Applied On</th>
                        <th>Approver</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveApprovalData.filter(l => l.status === 'Pending').map((leave) => (
                        <tr key={leave.id}>
                          <td><strong>{leave.employee}</strong></td>
                          <td>{leave.department}</td>
                          <td>{leave.leaveType}</td>
                          <td>{leave.fromDate} - {leave.toDate}</td>
                          <td>{leave.appliedOn}</td>
                          <td>{leave.approver}</td>
                          <td><span className="badge bg-warning">{leave.status}</span></td>
                          <td>
                            <button className="btn btn-sm btn-success me-1" onClick={() => updateStatus(leave.id, "Approved")}>
                              <Check size={14} />
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => updateStatus(leave.id, "Rejected")}>
                              <X size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Average Leave Approval Time */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Average Leave Approval Time</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <div className="card border text-center">
                      <div className="card-body">
                        <ClockIcon className="text-primary mb-2" size={32} />
                        <div className="h4 text-primary">1.2</div>
                        <small className="text-muted">Average Days</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border text-center">
                      <div className="card-body">
                        <ClockIcon className="text-success mb-2" size={32} />
                        <div className="h4 text-success">4 hrs</div>
                        <small className="text-muted">Fastest Approval</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border text-center">
                      <div className="card-body">
                        <ClockIcon className="text-warning mb-2" size={32} />
                        <div className="h4 text-warning">3.5 days</div>
                        <small className="text-muted">Slowest Approval</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card border text-center">
                      <div className="card-body">
                        <TrendingDown className="text-info mb-2" size={32} />
                        <div className="h4 text-info">-15%</div>
                        <small className="text-muted">vs Last Month</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="mb-3">Approval Time by Department</h6>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Department</th>
                          <th>Avg Approval Time</th>
                          <th>Total Approvals</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Engineering</td><td>1.0 day</td><td>45</td></tr>
                        <tr><td>QA</td><td>1.5 days</td><td>28</td></tr>
                        <tr><td>HR</td><td>0.8 days</td><td>32</td></tr>
                        <tr><td>Finance</td><td>1.3 days</td><td>18</td></tr>
                        <tr><td>Support</td><td>1.2 days</td><td>25</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Rejection Analysis */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Leave Rejection Analysis</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>Rejection Reason</th>
                        <th>Rejection Rate</th>
                        <th>Pattern</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveRejectionData.map((rejection, idx) => (
                        <tr key={idx}>
                          <td><strong>{rejection.employee}</strong></td>
                          <td>{rejection.department}</td>
                          <td>{rejection.leaveType}</td>
                          <td>{rejection.reason}</td>
                          <td><span className="badge bg-danger">{rejection.rejectionRate}</span></td>
                          <td><small className="text-muted">{rejection.pattern}</small></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <h6 className="mb-3">Overall Rejection Statistics</h6>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card border text-center">
                        <div className="card-body">
                          <div className="h4 text-danger">8.5%</div>
                          <small className="text-muted">Overall Rejection Rate</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border text-center">
                        <div className="card-body">
                          <div className="h4 text-warning">"Short notice"</div>
                          <small className="text-muted">Most Common Reason</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border text-center">
                        <div className="card-body">
                          <div className="h4 text-info">Design</div>
                          <small className="text-muted">Highest Rejection Rate Dept</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Cancellation Reports */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Leave Cancellation Reports</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>Original Period</th>
                        <th>Cancelled On</th>
                        <th>Reason</th>
                        <th>Cancelled By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveCancellationData.map((cancel, idx) => (
                        <tr key={idx}>
                          <td><strong>{cancel.employee}</strong><br /><small className="text-muted">{cancel.employeeId}</small></td>
                          <td>{cancel.department}</td>
                          <td>{cancel.leaveType}</td>
                          <td>{cancel.originalFrom} - {cancel.originalTo}</td>
                          <td>{cancel.cancelledOn}</td>
                          <td>{cancel.reason}</td>
                          <td><span className="badge bg-info">{cancel.cancelledBy}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- FILTER BAR (For general leave list - can be shown separately if needed) ----------------- */}
        {activeTab === 'list' && (
          <>
            <div className="card mb-3">
              <div className="card-body d-flex flex-wrap gap-2 align-items-center">
                {/* Search */}
            <div className="input-group" style={{ maxWidth: 350 }}>
              <span className="input-group-text bg-white border-end-0"><Search size={14} /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search employee or leave type..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            {/* Filters */}
            <select className="form-select w-auto" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Leave Types</option>
              {["Casual Leave", "Sick Leave", "Earned Leave", "Paternity Leave", "Maternity Leave"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select className="form-select w-auto" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="">All Departments</option>
              {[...new Set(leaves.map((l) => l.department))].map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

                {/* Export + Print */}
                <div className="ms-auto d-flex gap-2">
                  <button className="btn btn-dark btn-sm" onClick={exportCSV}><Download size={14} className="me-1" />Export</button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}><Printer size={14} /></button>
                </div>
              </div>
            </div>

              {/* ----------------- BULK ACTIONS ----------------- */}
            {selected.length > 0 && (
              <div className="alert alert-info d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <span><strong>{selected.length}</strong> selected</span>

              <button className="btn btn-success btn-sm" onClick={() => bulkAction("Approved")}>
                <Check size={14} className="me-1" /> Approve
              </button>

              <button className="btn btn-warning btn-sm" onClick={() => bulkAction("Rejected")}>
                <X size={14} className="me-1" /> Reject
              </button>

              <button className="btn btn-danger btn-sm" onClick={bulkDelete}>
                <Trash2 size={14} className="me-1" /> Delete
              </button>
            </div>

                <button className="btn btn-link p-0" onClick={() => setSelected([])}>Clear</button>
              </div>
            )}

            {/* ----------------- TABLE ----------------- */}
            <div className="card mb-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th><input type="checkbox"
                    checked={selected.length === display.length && display.length > 0}
                    onChange={(e) =>
                      setSelected(e.target.checked ? display.map((d) => d.id) : [])
                    }
                  /></th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Leave Type</th>
                  <th className="text-center">From — To</th>
                  <th className="text-center">Days</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {display.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(l.id)}
                        onChange={() =>
                          setSelected((prev) =>
                            prev.includes(l.id)
                              ? prev.filter((id) => id !== l.id)
                              : [...prev, l.id]
                          )
                        }
                      />
                    </td>

                    <td><strong>{l.employee}</strong></td>
                    <td>{l.department}</td>
                    <td>{l.leaveType}</td>

                    <td className="text-center">
                      {l.fromDate} → {l.toDate}
                    </td>

                    <td className="text-center">{diffDays(l.fromDate, l.toDate)}</td>

                    <td className="text-center">
                      <span className={`badge ${statusBadge(l.status)}`}>{l.status}</span>
                    </td>

                    <td className="text-center">
                      <button className="btn btn-sm btn-light" onClick={() => setModalLeave(l)}>
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {display.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No leave records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
              </div>
            </div>

            {/* ----------------- PAGINATION ----------------- */}
            <div className="d-flex justify-content-between align-items-center mb-5">
          <small className="text-muted">
            Showing <strong>{start + 1}</strong> – <strong>{Math.min(start + perPage, filtered.length)}</strong> of <strong>{filtered.length}</strong>
          </small>

          <div className="btn-group">
            <button className="btn btn-outline-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "btn btn-primary" : "btn btn-outline-secondary"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

              <button className="btn btn-outline-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
            </div>
          </div>
          </>
        )}

        {/* ----------------- MODAL (FULL DETAILS) ----------------- */}
        {modalLeave && (
          <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Leave Details</h5>
                  <button type="button" className="btn-close" onClick={() => setModalLeave(null)}></button>
                </div>

                <div className="modal-body">
                  <p><strong>Employee:</strong> {modalLeave.employee}</p>
                  <p><strong>Department:</strong> {modalLeave.department}</p>
                  <p><strong>Leave Type:</strong> {modalLeave.leaveType}</p>
                  <p><strong>Applied On:</strong> {modalLeave.appliedOn}</p>

                  <p><strong>Period:</strong>  
                    <br />{modalLeave.fromDate} → {modalLeave.toDate}
                    <br /><strong>Days:</strong> {diffDays(modalLeave.fromDate, modalLeave.toDate)}
                  </p>

                  <p><strong>Reason:</strong> {modalLeave.reason}</p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${statusBadge(modalLeave.status)}`}>
                      {modalLeave.status}
                    </span>
                  </p>
                </div>

                <div className="modal-footer d-flex justify-content-between">

                  {/* Status Update Buttons */}
                  <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={() => updateStatus(modalLeave.id, "Approved")}>
                      <Check size={16} className="me-1" /> Approve
                    </button>

                    <button className="btn btn-warning" onClick={() => updateStatus(modalLeave.id, "Rejected")}>
                      <X size={16} className="me-1" /> Reject
                    </button>
                  </div>

                  <button className="btn btn-secondary" onClick={() => setModalLeave(null)}>
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

export default LeaveReports;
