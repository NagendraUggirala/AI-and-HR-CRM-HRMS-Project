// src\components\HRMS\PayrollManagement\PayrollReports.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PayrollReports = () => {
  // UI & navigation state
  const [activeSection, setActiveSection] = useState('standard'); // standard | compliance | analytics | generated | scheduled | configure | builder
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterGrade, setFilterGrade] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Enhanced state based on HRMS specification
  const [employeeData, setEmployeeData] = useState([]);
  const [payrollTransactions, setPayrollTransactions] = useState([]);
  const [statutoryData, setStatutoryData] = useState([]);
  const [complianceDeadlines, setComplianceDeadlines] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);

  // Add/Edit modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [reportForm, setReportForm] = useState({
    id: '',
    name: '',
    category: 'standard',
    description: '',
    frequency: 'Monthly',
    format: ['pdf'],
    department: 'All',
    scheduleType: 'manual',
    recipients: [],
    parameters: {}
  });

  // Report builder state
  const [reportBuilder, setReportBuilder] = useState({
    step: 1,
    name: '',
    description: '',
    category: 'Payroll',
    dataSource: 'payroll',
    selectedColumns: [],
    selectedFilters: [],
    grouping: [],
    calculations: [],
    format: ['pdf', 'excel'],
    schedule: 'none',
    recipients: [],
    dashboardWidget: false
  });

  // Chart configurations
  const [chartConfig, setChartConfig] = useState({
    chartType: 'bar',
    colorScheme: 'corporate',
    showTrendLines: true,
    showDataLabels: true,
    comparePeriod: true,
    drillDownEnabled: true
  });

  // Constants from HRMS specification
  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Product', 'Customer Support'];
  const locations = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
  const grades = ['All', 'A', 'B', 'C', 'D', 'E', 'Executive', 'Management'];
  const periods = ['All', 'Current Month', 'Last Month', 'Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4', 'Year to Date', 'Last Year'];
  const salaryComponents = ['Basic', 'HRA', 'Conveyance', 'Special Allowance', 'Performance Bonus', 'PF', 'ESI', 'PT', 'TDS', 'Loan EMI', 'Advance Recovery'];
  
  const itemsPerPage = 8;

  // Data lists
  const [standardReports, setStandardReports] = useState([]);
  const [complianceReports, setComplianceReports] = useState([]);
  const [analyticsDashboards, setAnalyticsDashboards] = useState([]);
  const [generatedReports, setGeneratedReports] = useState([]);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [reportTemplates, setReportTemplates] = useState([]);
  const [customReports, setCustomReports] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [builderStep, setBuilderStep] = useState(1);

  // Sidebar navigation based on HRMS specification
  const sidebarContent = [
    { icon: "heroicons:home", label: "Dashboard", path: "/dashboard" },
    { icon: "heroicons:document-report", label: "Reports", path: "/payroll-reports" },
    { icon: "heroicons:users", label: "Employee Reports", path: "/reports/employee" },
    { icon: "heroicons:clock", label: "Attendance Reports", path: "/reports/attendance" },
    { icon: "heroicons:calendar", label: "Leave Reports", path: "/reports/leave" },
    { icon: "heroicons:banknotes", label: "Payroll Reports", path: "/payroll-reports", active: true },
    { icon: "heroicons:shield-check", label: "Compliance", path: "/compliance" },
    { icon: "heroicons:chart-bar", label: "Analytics", path: "/analytics" },
    { icon: "heroicons:cog", label: "Configuration", path: "/settings" }
  ];

  const userInfo = {
    name: "Priya Sharma",
    role: "Payroll Administrator",
    avatar: "/assets/img/user.png",
    permissions: ['view_all', 'generate_reports', 'schedule_reports', 'configure_templates']
  };

  // Helper functions
  const formatCurrency = (value) => {
    if (value == null) return '-';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      'generated': 'bg-success-subtle text-success',
      'pending': 'bg-warning-subtle text-warning',
      'submitted': 'bg-info-subtle text-info',
      'in-progress': 'bg-primary-subtle text-primary',
      'approved': 'bg-success',
      'rejected': 'bg-danger',
      'overdue': 'bg-danger-subtle text-danger',
      'active': 'bg-success-subtle text-success',
      'paused': 'bg-secondary-subtle text-secondary'
    };
    return <span className={`badge ${badges[status] || 'bg-light text-dark'}`}>{status}</span>;
  };

  // KPI calculations from actual data
  const kpis = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthData = payrollTransactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const totalPayrollCost = currentMonthData.reduce((sum, t) => sum + (t.grossSalary || 0), 0);
    const statutoryDeductions = currentMonthData.reduce((sum, t) => 
      sum + (t.pf || 0) + (t.esi || 0) + (t.pt || 0) + (t.tds || 0), 0);
    const netPayroll = totalPayrollCost - statutoryDeductions;
    const avgSalary = currentMonthData.length > 0 ? totalPayrollCost / currentMonthData.length : 0;
    
    const departmentBreakdown = employeeData.reduce((acc, emp) => {
      const dept = emp.department || 'Unknown';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    return {
      totalReports: standardReports.length + complianceReports.length + analyticsDashboards.length + customReports.length,
      generatedCount: generatedReports.length,
      scheduledCount: scheduledReports.length,
      overdueCompliance: complianceDeadlines.filter(d => new Date(d.dueDate) < new Date() && d.status !== 'submitted').length,
      totalPayrollCost,
      avgSalary,
      statutoryDeductions,
      netPayroll,
      employeeCount: employeeData.length,
      departmentBreakdown
    };
  }, [employeeData, payrollTransactions, standardReports, complianceReports, analyticsDashboards, customReports, generatedReports, scheduledReports, complianceDeadlines]);

  // Enhanced filtering logic
  const getFilteredData = () => {
    let data = [];
    const term = searchTerm.trim().toLowerCase();

    switch (activeSection) {
      case 'standard':
        data = standardReports.filter(r =>
          r.name.toLowerCase().includes(term) || 
          r.description.toLowerCase().includes(term) ||
          (r.category || '').toLowerCase().includes(term)
        );
        break;
      case 'compliance':
        data = complianceReports.filter(r =>
          r.name.toLowerCase().includes(term) || 
          r.type.toLowerCase().includes(term) ||
          (r.formType || '').toLowerCase().includes(term)
        );
        break;
      case 'analytics':
        data = analyticsDashboards.filter(r =>
          r.name.toLowerCase().includes(term) || 
          r.description.toLowerCase().includes(term)
        );
        break;
      case 'generated':
        data = generatedReports.filter(r =>
          r.reportName.toLowerCase().includes(term) || 
          r.period.toLowerCase().includes(term) ||
          (r.generatedBy || '').toLowerCase().includes(term)
        );
        break;
      case 'scheduled':
        data = scheduledReports.filter(r =>
          r.reportName.toLowerCase().includes(term) || 
          r.schedule.toLowerCase().includes(term)
        );
        break;
      case 'configure':
        data = [...reportTemplates, ...customReports].filter(r =>
          r.name.toLowerCase().includes(term) || 
          r.category.toLowerCase().includes(term)
        );
        break;
      default:
        data = [];
    }

    // Apply additional filters
    if (filterPeriod !== 'All' && activeSection === 'generated') {
      data = data.filter(item => item.period === filterPeriod);
    }
    if (filterDepartment !== 'All' && activeSection === 'standard') {
      data = data.filter(item => item.department === filterDepartment || item.department === 'All');
    }
    if (dateRange.start && dateRange.end && activeSection === 'generated') {
      data = data.filter(item => {
        const genDate = new Date(item.generatedDate);
        return genDate >= new Date(dateRange.start) && genDate <= new Date(dateRange.end);
      });
    }

    return data;
  };

  // Action Handlers
  const handleExportData = (format = 'excel') => {
    const data = getFilteredData();
    
    if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report Data');
      XLSX.writeFile(wb, `Payroll_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      doc.text(`Payroll Report - ${new Date().toLocaleDateString()}`, 10, 10);
      
      const headers = Object.keys(data[0] || {}).map(key => ({
        title: key.toUpperCase(),
        dataKey: key
      }));
      
      doc.autoTable({
        head: [headers.map(h => h.title)],
        body: data.map(row => headers.map(h => row[h.dataKey])),
        startY: 20
      });
      
      doc.save(`Payroll_Report_${new Date().toISOString().slice(0,10)}.pdf`);
    }
  };

  const handleGenerateReport = (report) => {
    setIsLoading(true);
    
    // Simulate report generation
    setTimeout(() => {
      const newGenerated = {
        id: `GR_${Date.now()}`,
        reportName: report.name || report.reportName,
        period: 'Current Month',
        generatedDate: new Date().toISOString(),
        generatedBy: userInfo.name,
        format: Array.isArray(report.format) ? report.format[0] : report.format,
        size: `${Math.random() * 2 + 0.5} MB`,
        status: 'completed',
        downloadCount: 0,
        parameters: {
          department: filterDepartment,
          period: filterPeriod,
          ...dateRange
        }
      };
      
      setGeneratedReports(prev => [newGenerated, ...prev]);
      setIsLoading(false);
      
      // Show notification
      alert(`Report "${report.name}" generated successfully and available for download.`);
    }, 1500);
  };

  const handleScheduleReport = (report) => {
    const scheduleEntry = {
      id: `SRC_${Date.now()}`,
      reportName: report.reportName || report.name,
      schedule: '1st of every month',
      nextRun: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      format: Array.isArray(report.format) ? report.format.join(' & ') : report.format,
      recipients: ['hr@company.com', 'finance@company.com'],
      status: 'active',
      lastRun: null,
      frequency: 'Monthly'
    };
    
    setScheduledReports(prev => [scheduleEntry, ...prev]);
    alert(`Report "${report.name}" scheduled successfully.`);
  };

  const handleAddReport = () => {
    setIsEditMode(false);
    setReportForm({
      id: 'NEW-' + Date.now(),
      name: '',
      category: 'standard',
      description: '',
      frequency: 'Monthly',
      format: ['pdf'],
      department: 'All',
      scheduleType: 'manual',
      recipients: [],
      parameters: {}
    });
    setShowReportModal(true);
  };

  const handleEditReport = (report, category) => {
    setIsEditMode(true);
    setReportForm({
      ...report,
      category: category || report.category
    });
    setShowReportModal(true);
  };

  const handleDeleteReport = (reportId, category) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    
    const setters = {
      'standard': setStandardReports,
      'compliance': setComplianceReports,
      'analytics': setAnalyticsDashboards
    };
    
    const setter = setters[category];
    if (setter) {
      setter(prev => prev.filter(r => r.id !== reportId));
    }
    
    alert('Report deleted successfully.');
  };

  const handleSaveReport = () => {
    if (!reportForm.name.trim()) {
      alert('Report name is required');
      return;
    }

    const payload = { 
      ...reportForm, 
      lastModified: new Date().toISOString(),
      modifiedBy: userInfo.name
    };

    // Update appropriate state based on category
    switch (payload.category) {
      case 'standard':
        setStandardReports(prev => {
          const exists = prev.find(r => r.id === payload.id);
          return exists ? prev.map(r => r.id === payload.id ? payload : r) : [...prev, payload];
        });
        break;
      case 'compliance':
        setComplianceReports(prev => {
          const exists = prev.find(r => r.id === payload.id);
          return exists ? prev.map(r => r.id === payload.id ? payload : r) : [...prev, payload];
        });
        break;
      case 'analytics':
        setAnalyticsDashboards(prev => {
          const exists = prev.find(r => r.id === payload.id);
          return exists ? prev.map(r => r.id === payload.id ? payload : r) : [...prev, payload];
        });
        break;
    }

    setShowReportModal(false);
    alert(isEditMode ? 'Report updated successfully.' : 'Report added successfully.');
    
    // Navigate to the relevant section
    setActiveSection(payload.category);
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Initialize with comprehensive data from HRMS specification
  const loadInitialData = () => {
    // Load employee data
    const employees = Array.from({ length: 150 }, (_, i) => ({
      id: `EMP${String(i+1).padStart(4, '0')}`,
      name: `Employee ${i+1}`,
      department: departments[Math.floor(Math.random() * (departments.length - 1)) + 1],
      location: locations[Math.floor(Math.random() * (locations.length - 1)) + 1],
      grade: grades[Math.floor(Math.random() * (grades.length - 1)) + 1],
      basicSalary: Math.floor(Math.random() * 50000) + 30000,
      grossSalary: Math.floor(Math.random() * 80000) + 40000,
      netSalary: Math.floor(Math.random() * 70000) + 35000,
      pf: Math.floor(Math.random() * 6000),
      esi: Math.floor(Math.random() * 2000),
      pt: Math.floor(Math.random() * 200),
      tds: Math.floor(Math.random() * 8000),
      status: ['active', 'inactive', 'notice_period'][Math.floor(Math.random() * 3)]
    }));
    setEmployeeData(employees);

    // Standard Reports (from HRMS spec section 4.9)
    setStandardReports([
      { id: 'SR001', name: 'Monthly Payroll Register', category: 'standard', description: 'Detailed monthly payroll register with employee-wise breakdown', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '2.4 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR002', name: 'Department-wise Payroll Summary', category: 'standard', description: 'Summary of payroll costs by department', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.8 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR003', name: 'Location-wise Payroll Summary', category: 'standard', description: 'Payroll summary grouped by location', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.4 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR004', name: 'Grade-wise Salary Analysis', category: 'standard', description: 'Salary distribution across grades', frequency: 'Quarterly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.2 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR005', name: 'Bank Transfer Summary', category: 'standard', description: 'Summary of bank transfers for salary payments', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'pending', format: ['pdf', 'excel'], size: '0.9 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR006', name: 'Statutory Reports (PF, ESI, PT, TDS)', category: 'standard', description: 'All statutory deduction summaries', frequency: 'Monthly/Quarterly', department: 'Finance', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '3.0 MB', statutory: true, scheduleEnabled: true },
      { id: 'SR007', name: 'Cost Center Wise Payroll', category: 'standard', description: 'Payroll cost allocation by cost center', frequency: 'Monthly', department: 'Finance', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.5 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR008', name: 'Arrear Register', category: 'standard', description: 'Register of arrears and recoveries', frequency: 'Monthly', department: 'Finance', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf'], size: '0.8 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR009', name: 'Payroll Variance Report (Month-over-Month)', category: 'standard', description: 'Month-over-month payroll variance analysis', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.7 MB', statutory: false, scheduleEnabled: true },
      { id: 'SR010', name: 'Headcount and Payroll Cost Trends', category: 'standard', description: 'Historical trends of headcount and payroll costs', frequency: 'Monthly', department: 'HR', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '2.1 MB', statutory: false, scheduleEnabled: true }
    ]);

    // Compliance Reports (from HRMS spec section 4.9)
    setComplianceReports([
      { id: 'CR001', name: 'Form 24Q (TDS quarterly return)', type: 'TDS', category: 'compliance', description: 'Quarterly TDS return for salaried employees (Form 24Q)', frequency: 'Quarterly', dueDate: '2024-04-30', status: 'pending', formType: 'TDS', year: '2023-24', quarter: 'Q4', statutory: true, autoGenerated: true },
      { id: 'CR002', name: 'ECR (PF monthly return)', type: 'PF', category: 'compliance', description: 'ECR file for monthly PF contributions', frequency: 'Monthly', dueDate: '2024-04-15', status: 'submitted', formType: 'PF', month: 'March 2024', statutory: true, autoGenerated: true },
      { id: 'CR003', name: 'ESI Monthly Return', type: 'ESI', category: 'compliance', description: 'Monthly ESI contribution return', frequency: 'Monthly', dueDate: '2024-04-15', status: 'submitted', formType: 'ESI', month: 'March 2024', statutory: true, autoGenerated: true },
      { id: 'CR004', name: 'PT Challan Reports', type: 'Professional Tax', category: 'compliance', description: 'Professional Tax challan and payment reports', frequency: 'Monthly', dueDate: '2024-04-21', status: 'generated', formType: 'PT', month: 'March 2024', statutory: true, autoGenerated: true },
      { id: 'CR005', name: 'Form 16 (Annual TDS certificate)', type: 'TDS Certificate', category: 'compliance', description: 'Form 16 annual TDS certificate for employees', frequency: 'Annual', dueDate: '2024-06-15', status: 'in-progress', formType: 'TDS', year: '2023-24', statutory: true, autoGenerated: true },
      { id: 'CR006', name: 'Salary Certificate', type: 'Certificate', category: 'compliance', description: 'Employee salary certificate for various purposes', frequency: 'On Demand', dueDate: 'N/A', status: 'available', formType: 'Certificate', statutory: false, autoGenerated: false },
      { id: 'CR007', name: 'PF Annual Return (Form 3A, 6A)', type: 'PF', category: 'compliance', description: 'Annual PF return (Form 3A, 6A)', frequency: 'Annual', dueDate: '2024-05-30', status: 'pending', formType: 'PF', year: '2023-24', statutory: true, autoGenerated: true }
    ]);

    // Analytics Dashboards (from HRMS spec section 4.9)
    setAnalyticsDashboards([
      { id: 'AD001', name: 'Total Payroll Cost Visualization', description: 'Interactive visualization of total payroll costs', category: 'analytics', metrics: ['Total Cost', 'Cost per Employee', 'Department Breakdown'], refreshRate: 'Real-time', accessLevel: 'Manager+', lastUpdated: '2024-03-31', chartType: 'bar', drillDown: true },
      { id: 'AD002', name: 'Average Salary by Department/Grade', description: 'Average salary analysis across departments and grades', category: 'analytics', metrics: ['Average Salary', 'Median Salary', 'Salary Range'], refreshRate: 'Daily', accessLevel: 'HR+', lastUpdated: '2024-03-31', chartType: 'combo', drillDown: true },
      { id: 'AD003', name: 'Salary Distribution Analysis', description: 'Analysis of salary distribution across organization', category: 'analytics', metrics: ['Distribution Curve', 'Percentiles', 'Outliers'], refreshRate: 'Monthly', accessLevel: 'HR+', lastUpdated: '2024-03-31', chartType: 'histogram', drillDown: true },
      { id: 'AD004', name: 'Statutory Contribution Trends', description: 'Trend analysis of statutory contributions (PF, ESI, PT)', category: 'analytics', metrics: ['PF Trends', 'ESI Trends', 'PT Trends'], refreshRate: 'Monthly', accessLevel: 'Finance+', lastUpdated: '2024-03-31', chartType: 'line', drillDown: false },
      { id: 'AD005', name: 'Payroll Cost Forecasting', description: 'Forecast future payroll costs based on trends', category: 'analytics', metrics: ['3-Month Forecast', '6-Month Forecast', 'Variance Analysis'], refreshRate: 'Monthly', accessLevel: 'Executive', lastUpdated: '2024-03-31', chartType: 'line', drillDown: true },
      { id: 'AD006', name: 'Budget vs Actual Payroll Comparison', description: 'Comparison of budgeted vs actual payroll costs', category: 'analytics', metrics: ['Variance %', 'Budget Utilization', 'Department Performance'], refreshRate: 'Monthly', accessLevel: 'Manager+', lastUpdated: '2024-03-31', chartType: 'combo', drillDown: true },
      { id: 'AD007', name: 'Attrition Impact on Payroll Costs', description: 'Analysis of attrition impact on payroll', category: 'analytics', metrics: ['Cost of Attrition', 'Replacement Cost', 'Productivity Loss'], refreshRate: 'Quarterly', accessLevel: 'HR+', lastUpdated: '2024-03-31', chartType: 'bar', drillDown: true }
    ]);

    // Generated reports history
    setGeneratedReports([
      { id: 'GR001', reportName: 'Monthly Payroll Register', period: 'March 2024', generatedDate: '2024-04-01', generatedBy: 'System', format: 'PDF', size: '2.4 MB', status: 'completed', downloadCount: 15, parameters: { department: 'All', location: 'All' } },
      { id: 'GR002', reportName: 'Department-wise Summary', period: 'March 2024', generatedDate: '2024-04-01', generatedBy: 'HR Manager', format: 'Excel', size: '1.8 MB', status: 'completed', downloadCount: 8, parameters: { department: 'Engineering', location: 'Bangalore' } },
      { id: 'GR003', reportName: 'Form 24Q', period: 'Q4 FY 2023-24', generatedDate: '2024-04-10', generatedBy: 'Finance', format: 'Excel', size: '3.2 MB', status: 'completed', downloadCount: 3, parameters: { year: '2023-24', quarter: 'Q4' } }
    ]);

    // Scheduled reports
    setScheduledReports([
      { id: 'SRC001', reportName: 'Monthly Payroll Register', schedule: '1st of every month', nextRun: '2024-05-01', format: 'PDF & Excel', recipients: ['hr@company.com', 'finance@company.com'], status: 'active', frequency: 'Monthly', lastRun: '2024-04-01', errorCount: 0 },
      { id: 'SRC002', reportName: 'Bank Transfer Summary', schedule: '28th of every month', nextRun: '2024-04-28', format: 'Excel', recipients: ['finance@company.com'], status: 'active', frequency: 'Monthly', lastRun: '2024-03-28', errorCount: 0 }
    ]);

    // AI Insights based on HRMS spec section 8.8
    setAiInsights([
      { id: 'AI001', type: 'anomaly', title: 'Unusual Overtime Pattern', description: 'Sales department showing 300% overtime increase', severity: 'high', recommendedAction: 'Review overtime approvals' },
      { id: 'AI002', type: 'prediction', title: 'Attrition Risk Alert', description: '5 employees in Engineering show high flight risk', severity: 'medium', recommendedAction: 'Schedule retention meetings' },
      { id: 'AI003', type: 'recommendation', title: 'Salary Benchmarking', description: 'Market parity suggests 8-12% salary adjustment for Grade B', severity: 'low', recommendedAction: 'Consider in next cycle' }
    ]);

    // Report templates
    setReportTemplates([
      { id: 'template001', name: 'Basic Payroll Summary', category: 'Payroll', description: 'Basic payroll summary with essential columns', columns: ['Employee ID', 'Name', 'Basic Salary', 'Gross Salary', 'Net Salary'], filters: ['department', 'date_range'], format: ['pdf', 'excel'], isCustom: false, usageCount: 45 },
      { id: 'template002', name: 'Detailed Salary Breakup', category: 'Salary', description: 'Detailed salary breakup with all components', columns: ['Employee ID', 'Name', 'Basic', 'HRA', 'Allowances', 'Deductions', 'Net'], filters: ['department', 'grade', 'date_range'], format: ['excel'], isCustom: false, usageCount: 32 },
      { id: 'template003', name: 'Statutory Compliance Report', category: 'Compliance', description: 'All statutory deductions in one report', columns: ['Employee ID', 'Name', 'PF', 'ESI', 'PT', 'TDS', 'Total'], filters: ['date_range', 'location'], format: ['pdf', 'excel'], isCustom: false, usageCount: 28 }
    ]);

    // Available columns for report builder
    setAvailableColumns([
      { id: 'emp_id', name: 'Employee ID', category: 'Basic', type: 'text', description: 'Unique employee identifier' },
      { id: 'name', name: 'Name', category: 'Basic', type: 'text', description: 'Employee full name' },
      { id: 'department', name: 'Department', category: 'Basic', type: 'text', description: 'Department assignment' },
      { id: 'designation', name: 'Designation', category: 'Basic', type: 'text', description: 'Job title/position' },
      { id: 'location', name: 'Location', category: 'Basic', type: 'text', description: 'Work location' },
      { id: 'grade', name: 'Grade', category: 'Basic', type: 'text', description: 'Employee grade/level' },
      { id: 'basic_salary', name: 'Basic Salary', category: 'Salary', type: 'currency', description: 'Basic salary component' },
      { id: 'gross_salary', name: 'Gross Salary', category: 'Salary', type: 'currency', description: 'Total earnings before deductions' },
      { id: 'net_salary', name: 'Net Salary', category: 'Salary', type: 'currency', description: 'Take-home salary' },
      { id: 'pf_employee', name: 'PF (Employee)', category: 'Deductions', type: 'currency', description: 'Employee PF contribution' },
      { id: 'pf_employer', name: 'PF (Employer)', category: 'Deductions', type: 'currency', description: 'Employer PF contribution' },
      { id: 'esi_employee', name: 'ESI (Employee)', category: 'Deductions', type: 'currency', description: 'Employee ESI contribution' },
      { id: 'esi_employer', name: 'ESI (Employer)', category: 'Deductions', type: 'currency', description: 'Employer ESI contribution' },
      { id: 'tds', name: 'TDS', category: 'Deductions', type: 'currency', description: 'Tax deducted at source' },
      { id: 'pt', name: 'Professional Tax', category: 'Deductions', type: 'currency', description: 'State professional tax' },
      { id: 'leave_balance', name: 'Leave Balance', category: 'Attendance', type: 'number', description: 'Available leave balance' },
      { id: 'attendance_days', name: 'Attendance Days', category: 'Attendance', type: 'number', description: 'Number of days present' },
      { id: 'overtime_hours', name: 'Overtime Hours', category: 'Attendance', type: 'number', description: 'Total overtime worked' }
    ]);

    // Available filters
    setAvailableFilters([
      { id: 'department', name: 'Department', type: 'multi-select', options: departments.slice(1), description: 'Filter by department' },
      { id: 'location', name: 'Location', type: 'multi-select', options: locations.slice(1), description: 'Filter by work location' },
      { id: 'grade', name: 'Grade', type: 'multi-select', options: grades.slice(1), description: 'Filter by employee grade' },
      { id: 'date_range', name: 'Date Range', type: 'date-range', description: 'Filter by date range' },
      { id: 'salary_range', name: 'Salary Range', type: 'range', min: 0, max: 500000, description: 'Filter by salary range' },
      { id: 'employment_type', name: 'Employment Type', type: 'multi-select', options: ['Permanent', 'Contract', 'Intern', 'Consultant'], description: 'Filter by employment type' },
      { id: 'status', name: 'Employment Status', type: 'multi-select', options: ['Active', 'Inactive', 'Notice Period', 'Suspended'], description: 'Filter by employment status' }
    ]);

    setIsLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Render components
  const renderKPICards = () => (
    <div className="row g-3 mb-4">
      <div className="col-md-3">
        <div className="card border-primary border-2">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Total Payroll Cost</h6>
                <h4 className="fw-bold">{formatCurrency(kpis.totalPayrollCost)}</h4>
                <div className="small text-success">↓ 2.3% from last month</div>
              </div>
              <div className="bg-primary-subtle p-3 rounded">
                <Icon icon="heroicons:banknotes" className="text-primary" width="24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border-success border-2">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Statutory Deductions</h6>
                <h4 className="fw-bold">{formatCurrency(kpis.statutoryDeductions)}</h4>
                <div className="small text-muted">{((kpis.statutoryDeductions / kpis.totalPayrollCost) * 100).toFixed(1)}% of total</div>
              </div>
              <div className="bg-success-subtle p-3 rounded">
                <Icon icon="heroicons:shield-check" className="text-success" width="24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border-warning border-2">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Average Salary</h6>
                <h4 className="fw-bold">{formatCurrency(kpis.avgSalary)}</h4>
                <div className="small text-warning">+5.2% year-on-year</div>
              </div>
              <div className="bg-warning-subtle p-3 rounded">
                <Icon icon="heroicons:chart-bar" className="text-warning" width="24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border-info border-2">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted mb-1">Compliance Status</h6>
                <h4 className="fw-bold">{kpis.overdueCompliance === 0 ? '100%' : `${((complianceReports.length - kpis.overdueCompliance) / complianceReports.length * 100).toFixed(0)}%`}</h4>
                <div className="small text-danger">{kpis.overdueCompliance > 0 ? `${kpis.overdueCompliance} overdue` : 'All compliant'}</div>
              </div>
              <div className="bg-info-subtle p-3 rounded">
                <Icon icon="heroicons:document-check" className="text-info" width="24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
        <h6 className="mb-0">AI-Driven Insights</h6>
        <span className="badge bg-primary">Beta</span>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {aiInsights.map(insight => (
            <div key={insight.id} className="col-md-4">
              <div className={`card border-${insight.severity === 'high' ? 'danger' : insight.severity === 'medium' ? 'warning' : 'info'}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0">{insight.title}</h6>
                    <Icon icon="heroicons:light-bulb" className="text-warning" />
                  </div>
                  <p className="small text-muted mb-2">{insight.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge bg-${insight.severity === 'high' ? 'danger' : insight.severity === 'medium' ? 'warning' : 'info'}-subtle text-${insight.severity === 'high' ? 'danger' : insight.severity === 'medium' ? 'warning' : 'info'}`}>
                      {insight.severity}
                    </span>
                    <button className="btn btn-sm btn-outline-primary">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStandardReportsSection = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Standard Payroll Reports</h5>
              <div className="small text-muted">Core payroll & operational reports as per HRMS spec 4.9</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={() => setIsLoading(true)}>
                <Icon icon="heroicons:arrow-path" className={`me-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="btn btn-primary" onClick={handleAddReport}>
                <Icon icon="heroicons:plus" className="me-2" />
                Add Report
              </button>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="p-4 border-bottom">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <Icon icon="heroicons:magnifying-glass" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="Search reports..." 
                      value={searchTerm} 
                      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
                      className="form-control" 
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="form-select">
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)} className="form-select">
                    {periods.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-outline-primary w-100" onClick={handleExportData}>
                    <Icon icon="heroicons:arrow-down-tray" className="me-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="row g-3">
                {standardReports.map(report => (
                  <div key={report.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 hover-shadow">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{report.name}</h6>
                            <p className="text-muted small mb-2">{report.description}</p>
                            <div className="small text-muted">
                              <Icon icon="heroicons:calendar" className="me-1" />
                              Frequency: {report.frequency}
                            </div>
                            <div className="small text-muted">
                              <Icon icon="heroicons:building-office" className="me-1" />
                              Department: {report.department}
                            </div>
                          </div>
                          <div>
                            <div className="small text-muted">Last: {formatDate(report.lastGenerated)}</div>
                            <div className="mt-2">{getStatusBadge(report.status)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent border-top d-flex justify-content-between">
                        <div className="small text-muted">
                          Formats: {Array.isArray(report.format) ? report.format.join(', ') : report.format}
                        </div>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleGenerateReport(report)}>
                            <Icon icon="heroicons:play" />
                          </button>
                          <button className="btn btn-sm btn-outline-success" onClick={() => handleScheduleReport(report)}>
                            <Icon icon="heroicons:clock" />
                          </button>
                          <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditReport(report, 'standard')}>
                            <Icon icon="heroicons:pencil-square" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReport(report.id, 'standard')}>
                            <Icon icon="heroicons:trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {standardReports.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <Icon icon="heroicons:document-text" className="display-6 mb-3" />
                  <h5>No reports found</h5>
                  <p>No standard reports match your search criteria.</p>
                  <button className="btn btn-primary mt-2" onClick={handleAddReport}>
                    <Icon icon="heroicons:plus" className="me-2" />
                    Create Your First Report
                  </button>
                </div>
              )}
            </div>

            {standardReports.length > itemsPerPage && (
              <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
                <div className="small text-muted">
                  Showing {Math.min(standardReports.length, itemsPerPage)} of {standardReports.length} reports
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary" disabled={currentPage === 1}>
                    Previous
                  </button>
                  <button className="btn btn-sm btn-primary">{currentPage}</button>
                  <button className="btn btn-sm btn-outline-secondary">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplianceReportsSection = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Statutory Compliance Reports</h5>
              <div className="small text-muted">PF, ESI, PT, TDS filings and certificates</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger">
                <Icon icon="heroicons:exclamation-triangle" className="me-2" />
                {kpis.overdueCompliance} Overdue
              </button>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Report Name</th>
                    <th>Type</th>
                    <th>Frequency</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Period</th>
                    <th>Auto-Generated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceReports.map(report => {
                    const isOverdue = report.dueDate !== 'N/A' && new Date(report.dueDate) < new Date() && report.status !== 'submitted';
                    return (
                      <tr key={report.id} className={isOverdue ? 'table-danger' : ''}>
                        <td>
                          <div className="fw-bold">{report.name}</div>
                          <div className="small text-muted">{report.description}</div>
                        </td>
                        <td><span className="badge bg-info-subtle text-info">{report.formType || report.type}</span></td>
                        <td>{report.frequency}</td>
                        <td>
                          <div className={`fw-semibold ${isOverdue ? 'text-danger' : ''}`}>
                            {formatDate(report.dueDate)}
                          </div>
                          {isOverdue && (
                            <div className="small text-danger">
                              <Icon icon="heroicons:exclamation-circle" className="me-1" />
                              Overdue!
                            </div>
                          )}
                        </td>
                        <td>{getStatusBadge(report.status)}</td>
                        <td>{report.month || report.year || report.quarter || 'N/A'}</td>
                        <td>
                          {report.autoGenerated ? (
                            <Icon icon="heroicons:check-circle" className="text-success" />
                          ) : (
                            <Icon icon="heroicons:x-circle" className="text-muted" />
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleGenerateReport(report)}>
                              Generate
                            </button>
                            <button className="btn btn-sm btn-outline-success" 
                              disabled={!(report.status === 'generated' || report.status === 'submitted')}>
                              Download
                            </button>
                            <button className="btn btn-sm btn-outline-warning" 
                              onClick={() => handleEditReport(report, 'compliance')}>
                              Edit
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
  );

  const renderAnalyticsSection = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Payroll Analytics Dashboards</h5>
              <div className="small text-muted">Interactive dashboards and forecasts</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary">
                <Icon icon="heroicons:arrow-path" className="me-2" />
                Refresh All
              </button>
            </div>
          </div>

          <div className="card-body">
            <div className="row g-4">
              {analyticsDashboards.map(dashboard => (
                <div key={dashboard.id} className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h6 className="mb-1">{dashboard.name}</h6>
                          <p className="small text-muted mb-2">{dashboard.description}</p>
                        </div>
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                            <Icon icon="heroicons:ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => handleEditReport(dashboard, 'analytics')}>Edit Dashboard</button></li>
                            <li><button className="dropdown-item" onClick={() => handleScheduleReport(dashboard)}>Schedule</button></li>
                            <li><button className="dropdown-item" onClick={() => handleDeleteReport(dashboard.id, 'analytics')}>Delete</button></li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex gap-3">
                          <div className="small">
                            <Icon icon="heroicons:chart-bar" className="me-1" />
                            {dashboard.chartType}
                          </div>
                          <div className="small">
                            <Icon icon="heroicons:arrow-path" className="me-1" />
                            {dashboard.refreshRate}
                          </div>
                          <div className="small">
                            <Icon icon="heroicons:lock-closed" className="me-1" />
                            {dashboard.accessLevel}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="small text-muted">
                          Metrics: {(dashboard.metrics || []).slice(0, 3).join(', ')}
                          {(dashboard.metrics || []).length > 3 && '...'}
                        </div>
                        <button className="btn btn-sm btn-primary">
                          <Icon icon="heroicons:eye" className="me-1" />
                          View Dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportBuilder = () => (
    <div className="card mt-3">
      <div className="card-body">
        <h4 className="fw-bold mb-3">Custom Report Builder</h4>
        
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <button className={`list-group-item list-group-item-action ${builderStep === 1 ? 'active' : ''}`}
                onClick={() => setBuilderStep(1)}>
                <div className="d-flex align-items-center">
                  <div className="bg-primary-subtle p-2 rounded me-3">
                    <Icon icon="heroicons:document-text" className="text-primary" />
                  </div>
                  <div>
                    <div className="fw-semibold">Report Details</div>
                    <div className="small text-muted">Name, category, description</div>
                  </div>
                </div>
              </button>
              
              <button className={`list-group-item list-group-item-action ${builderStep === 2 ? 'active' : ''}`}
                onClick={() => setBuilderStep(2)}>
                <div className="d-flex align-items-center">
                  <div className="bg-primary-subtle p-2 rounded me-3">
                    <Icon icon="heroicons:table-cells" className="text-primary" />
                  </div>
                  <div>
                    <div className="fw-semibold">Columns & Data</div>
                    <div className="small text-muted">Select data fields</div>
                  </div>
                </div>
              </button>
              
              <button className={`list-group-item list-group-item-action ${builderStep === 3 ? 'active' : ''}`}
                onClick={() => setBuilderStep(3)}>
                <div className="d-flex align-items-center">
                  <div className="bg-primary-subtle p-2 rounded me-3">
                    <Icon icon="heroicons:funnel" className="text-primary" />
                  </div>
                  <div>
                    <div className="fw-semibold">Filters & Sorting</div>
                    <div className="small text-muted">Apply filters and sorting</div>
                  </div>
                </div>
              </button>
              
              <button className={`list-group-item list-group-item-action ${builderStep === 4 ? 'active' : ''}`}
                onClick={() => setBuilderStep(4)}>
                <div className="d-flex align-items-center">
                  <div className="bg-primary-subtle p-2 rounded me-3">
                    <Icon icon="heroicons:cog" className="text-primary" />
                  </div>
                  <div>
                    <div className="fw-semibold">Format & Schedule</div>
                    <div className="small text-muted">Export and scheduling options</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="col-md-9">
            {builderStep === 1 && (
              <div>
                <h6 className="mb-3">Report Details</h6>
                <div className="mb-3">
                  <label className="form-label">Report Name</label>
                  <input type="text" className="form-control" placeholder="Enter report name" 
                    value={reportBuilder.name} onChange={(e) => setReportBuilder({...reportBuilder, name: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" placeholder="Describe this report"
                    value={reportBuilder.description} onChange={(e) => setReportBuilder({...reportBuilder, description: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={reportBuilder.category}
                    onChange={(e) => setReportBuilder({...reportBuilder, category: e.target.value})}>
                    <option value="Payroll">Payroll</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>
            )}

            {builderStep === 2 && (
              <div>
                <h6 className="mb-3">Select Data Columns</h6>
                <div className="row">
                  {availableColumns.map(column => (
                    <div key={column.id} className="col-md-6 mb-2">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" 
                          checked={selectedColumns.includes(column.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColumns([...selectedColumns, column.id]);
                            } else {
                              setSelectedColumns(selectedColumns.filter(id => id !== column.id));
                            }
                          }} />
                        <label className="form-check-label">
                          <div className="fw-semibold">{column.name}</div>
                          <div className="small text-muted">{column.description}</div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {builderStep === 3 && (
              <div>
                <h6 className="mb-3">Apply Filters</h6>
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select className="form-select" multiple>
                    {departments.slice(1).map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Date Range</label>
                  <div className="row g-2">
                    <div className="col">
                      <input type="date" className="form-control" placeholder="Start date" />
                    </div>
                    <div className="col">
                      <input type="date" className="form-control" placeholder="End date" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {builderStep === 4 && (
              <div>
                <h6 className="mb-3">Format & Schedule</h6>
                <div className="mb-3">
                  <label className="form-label">Export Format</label>
                  <div className="d-flex gap-3">
                    {['pdf', 'excel', 'csv'].map(format => (
                      <div key={format} className="form-check">
                        <input className="form-check-input" type="checkbox" 
                          checked={reportBuilder.format.includes(format)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setReportBuilder({...reportBuilder, format: [...reportBuilder.format, format]});
                            } else {
                              setReportBuilder({...reportBuilder, format: reportBuilder.format.filter(f => f !== format)});
                            }
                          }} />
                        <label className="form-check-label text-uppercase">{format}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Schedule Frequency</label>
                  <select className="form-select" value={reportBuilder.schedule}
                    onChange={(e) => setReportBuilder({...reportBuilder, schedule: e.target.value})}>
                    <option value="none">Don't schedule</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-secondary" 
                onClick={() => setBuilderStep(prev => Math.max(1, prev - 1))}
                disabled={builderStep === 1}>
                <Icon icon="heroicons:arrow-left" className="me-2" />
                Previous
              </button>
              
              <div>
                {builderStep < 4 && (
                  <button className="btn btn-primary" 
                    onClick={() => setBuilderStep(prev => Math.min(4, prev + 1))}>
                    Next
                    <Icon icon="heroicons:arrow-right" className="ms-2" />
                  </button>
                )}
                {builderStep === 4 && (
                  <button className="btn btn-success" onClick={() => {
                    setCustomReports([...customReports, {
                      id: `CUSTOM_${Date.now()}`,
                      name: reportBuilder.name || 'New Custom Report',
                      description: reportBuilder.description,
                      columns: selectedColumns,
                      filters: selectedFilters,
                      format: reportBuilder.format,
                      schedule: reportBuilder.schedule,
                      createdDate: new Date().toISOString(),
                      isCustom: true
                    }]);
                    setActiveSection('configure');
                    alert('Custom report created successfully!');
                  }}>
                    <Icon icon="heroicons:check" className="me-2" />
                    Create Report
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="mb-4">
      <div className="d-flex flex-wrap gap-2 mb-3">
        <button className={`btn ${activeSection === 'standard' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveSection('standard')}>
          <Icon icon="heroicons:document-text" className="me-2" />
          Standard Reports
        </button>
        <button className={`btn ${activeSection === 'compliance' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveSection('compliance')}>
          <Icon icon="heroicons:shield-check" className="me-2" />
          Compliance
        </button>
        <button className={`btn ${activeSection === 'analytics' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveSection('analytics')}>
          <Icon icon="heroicons:chart-bar" className="me-2" />
          Analytics
        </button>
        <button className={`btn ${activeSection === 'generated' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveSection('generated')}>
          <Icon icon="heroicons:archive-box" className="me-2" />
          Generated
        </button>
        <button className={`btn ${activeSection === 'scheduled' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveSection('scheduled')}>
          <Icon icon="heroicons:clock" className="me-2" />
          Scheduled
        </button>
        <button className={`btn ${activeSection === 'configure' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveSection('configure')}>
          <Icon icon="heroicons:cog" className="me-2" />
          Configuration
        </button>
        <button className={`btn ${activeSection === 'builder' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveSection('builder')}>
          <Icon icon="heroicons:wrench-screwdriver" className="me-2" />
          Report Builder
        </button>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="text-3xl fw-bold text-dark mb-2">
              <Icon icon="heroicons:chart-bar" className="me-2" />
              Payroll Reports & Analytics
            </h5>
            <p className="text-muted">Comprehensive payroll reporting system with AI-driven insights</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleAddReport}>
              <Icon icon="heroicons:plus" className="me-2" />
              Add Report
            </button>
            <button className="btn btn-outline-primary" onClick={() => handleExportData('excel')}>
              <Icon icon="heroicons:document-arrow-down" className="me-2" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      {renderKPICards()}

      {/* AI Insights */}
      {renderAIInsights()}

      {/* Navigation */}
      {renderNavigation()}

      {/* Main Content Area */}
      <div className="row">
        <div className="col-12">
          {activeSection === 'standard' && renderStandardReportsSection()}
          {activeSection === 'compliance' && renderComplianceReportsSection()}
          {activeSection === 'analytics' && renderAnalyticsSection()}
          {activeSection === 'builder' && renderReportBuilder()}
          
          {activeSection === 'generated' && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Generated Reports</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Report Name</th>
                        <th>Period</th>
                        <th>Generated Date</th>
                        <th>Generated By</th>
                        <th>Format</th>
                        <th>Size</th>
                        <th>Downloads</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedReports.map(report => (
                        <tr key={report.id}>
                          <td className="fw-semibold">{report.reportName}</td>
                          <td>{report.period}</td>
                          <td>{formatDate(report.generatedDate)}</td>
                          <td>{report.generatedBy}</td>
                          <td>{report.format}</td>
                          <td>{report.size}</td>
                          <td>{report.downloadCount}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">
                              <Icon icon="heroicons:arrow-down-tray" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'scheduled' && (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Scheduled Reports</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Report Name</th>
                        <th>Schedule</th>
                        <th>Next Run</th>
                        <th>Recipients</th>
                        <th>Format</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledReports.map(report => (
                        <tr key={report.id}>
                          <td className="fw-semibold">{report.reportName}</td>
                          <td>{report.schedule}</td>
                          <td>{formatDate(report.nextRun)}</td>
                          <td>
                            <div className="small">
                              {report.recipients.map((r, i) => (
                                <div key={i}>{r}</div>
                              ))}
                            </div>
                          </td>
                          <td>{report.format}</td>
                          <td>{getStatusBadge(report.status)}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">
                              Edit
                            </button>
                            <button className="btn btn-sm btn-outline-warning">
                              {report.status === 'active' ? 'Pause' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'configure' && (
            <div className="row">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header">
                    <h6 className="mb-0">Report Configuration</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Default Report Format</label>
                      <select className="form-select">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Retention Period (months)</label>
                      <select className="form-select">
                        <option>3</option>
                        <option>6</option>
                        <option>12</option>
                        <option>24</option>
                        <option>36</option>
                      </select>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="autoGenerate" />
                      <label className="form-check-label" htmlFor="autoGenerate">
                        Auto-generate scheduled reports
                      </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" id="emailNotification" />
                      <label className="form-check-label" htmlFor="emailNotification">
                        Email notifications for completed reports
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Quick Actions</h6>
                  </div>
                  <div className="card-body">
                    <button className="btn btn-primary w-100 mb-2" onClick={() => setActiveSection('builder')}>
                      <Icon icon="heroicons:plus" className="me-2" />
                      Create New Report
                    </button>
                    <button className="btn btn-outline-primary w-100 mb-2" onClick={handleExportData}>
                      <Icon icon="heroicons:document-arrow-down" className="me-2" />
                      Export Configuration
                    </button>
                    <button className="btn btn-outline-secondary w-100 mb-2">
                      <Icon icon="heroicons:arrow-path" className="me-2" />
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Report Modal */}
      {showReportModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit Report' : 'Add New Report'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowReportModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label">Report Name *</label>
                    <input type="text" className="form-control" 
                      value={reportForm.name} 
                      onChange={(e) => setReportForm({...reportForm, name: e.target.value})} />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select className="form-select" 
                      value={reportForm.category}
                      onChange={(e) => setReportForm({...reportForm, category: e.target.value})}>
                      <option value="standard">Standard Report</option>
                      <option value="compliance">Compliance Report</option>
                      <option value="analytics">Analytics Dashboard</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Frequency</label>
                    <select className="form-select" 
                      value={reportForm.frequency}
                      onChange={(e) => setReportForm({...reportForm, frequency: e.target.value})}>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Yearly</option>
                      <option>On Demand</option>
                    </select>
                  </div>
                  
                  <div className="col-md-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3"
                      value={reportForm.description}
                      onChange={(e) => setReportForm({...reportForm, description: e.target.value})} />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Default Format</label>
                    <select className="form-select" 
                      value={Array.isArray(reportForm.format) ? reportForm.format[0] : reportForm.format}
                      onChange={(e) => setReportForm({...reportForm, format: [e.target.value]})}>
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Target Department</label>
                    <select className="form-select" 
                      value={reportForm.department}
                      onChange={(e) => setReportForm({...reportForm, department: e.target.value})}>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>
                  
                  <div className="col-md-12">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" 
                        checked={reportForm.scheduleType === 'auto'}
                        onChange={(e) => setReportForm({...reportForm, scheduleType: e.target.checked ? 'auto' : 'manual'})} />
                      <label className="form-check-label">Enable Auto-Scheduling</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveReport}>
                  {isEditMode ? 'Update Report' : 'Save Report'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 9999 }}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>Processing report...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollReports;