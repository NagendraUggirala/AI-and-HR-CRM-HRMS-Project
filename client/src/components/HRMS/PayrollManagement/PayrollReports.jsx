// PayrollReports.jsx (Part 1 of 3)
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

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

  const sidebarContent = [
  { icon: "heroicons:home", label: "Dashboard", path: "/dashboard" },
  { icon: "heroicons:document-report", label: "Reports", path: "/payroll-reports" },
  { icon: "heroicons:cog", label: "Settings", path: "/settings" }
];

const userInfo = {
  name: "HR Manager",
  role: "Payroll Administrator",
  avatar: "/assets/img/user.png"
};

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
    department: 'All'
  });

  // report/config state
  const [reportData, setReportData] = useState({});
  const [analyticsData, setAnalyticsData] = useState({});
  const [reportConfig, setReportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeSummary: true,
    emailNotification: false,
    autoGenerate: false,
    retentionPeriod: 36
  });

  // report builder (still present)
  const [reportBuilder, setReportBuilder] = useState({
    name: '',
    description: '',
    category: 'Payroll',
    selectedColumns: [],
    selectedFilters: [],
    format: ['pdf', 'excel'],
    schedule: 'none',
    recipients: []
  });

  // chart config (used by analytics)
  const [chartConfig, setChartConfig] = useState({
    chartType: 'bar',
    colorScheme: 'primary',
    showTrendLines: true,
    showDataLabels: false,
    comparePeriod: true
  });

  // constants
  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT'];
  const periods = ['All', 'Current Month', 'Last Month', 'Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4', 'Year to Date', 'Last Year'];
  const itemsPerPage = 8;

  // data lists
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
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewReport, setPreviewReport] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    reportId: '',
    frequency: 'monthly',
    day: 1,
    time: '09:00',
    recipients: [],
    format: 'pdf',
    autoGenerate: true
  });
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [locations, setLocations] = useState(['All', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune']);
  const [grades, setGrades] = useState(['All', 'A', 'B', 'C', 'D', 'E']);
  const [costCenters, setCostCenters] = useState(['All', 'CC001', 'CC002', 'CC003', 'CC004', 'CC005']);

  // --- Helper functions ---
  const formatCurrency = (value) => {
    if (value == null) return '-';
    try {
      return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
    } catch (e) {
      return `₹${value}`;
    }
  };

  const formatDate = (val) => {
    if (!val) return 'N/A';
    const d = new Date(val);
    if (isNaN(d)) return val;
    return d.toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'generated': return <span className="badge bg-success-subtle text-success">Generated</span>;
      case 'pending': return <span className="badge bg-warning-subtle text-warning">Pending</span>;
      case 'submitted': return <span className="badge bg-info-subtle text-info">Submitted</span>;
      case 'in-progress': return <span className="badge bg-primary-subtle text-primary">In Progress</span>;
      case 'available': return <span className="badge bg-success-subtle text-success">Available</span>;
      case 'paused': return <span className="badge bg-secondary-subtle text-secondary">Paused</span>;
      case 'completed': return <span className="badge bg-success">Completed</span>;
      default: return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  // KPI calculations
  const kpis = useMemo(() => {
    const totalReports = standardReports.length + complianceReports.length + analyticsDashboards.length;
    const generatedCount = generatedReports.length;
    const scheduledCount = scheduledReports.length;
    const overdueCount = generatedReports.filter(r => r.status === 'overdue').length;
    const totalPayrollCost = 7500000; // static placeholder
    const avgSalary = 55000;
    const statutoryDeductions = 1250000;
    const netPayroll = totalPayrollCost - statutoryDeductions;
    return {
      totalReports,
      generatedCount,
      scheduledCount,
      overdueCount,
      totalPayrollCost,
      avgSalary,
      statutoryDeductions,
      netPayroll
    };
  }, [standardReports, complianceReports, analyticsDashboards, generatedReports, scheduledReports]);

  // filter / search logic
  const getFilteredData = () => {
    let data = [];
    const term = searchTerm.trim().toLowerCase();

    switch (activeSection) {
      case 'standard':
        data = standardReports.filter(r =>
          r.name.toLowerCase().includes(term) || (r.category || '').toLowerCase().includes(term)
        );
        break;
      case 'compliance':
        data = complianceReports.filter(r =>
          r.name.toLowerCase().includes(term) || (r.type || '').toLowerCase().includes(term)
        );
        break;
      case 'analytics':
        data = analyticsDashboards.filter(r =>
          r.name.toLowerCase().includes(term) || (r.description || '').toLowerCase().includes(term)
        );
        break;
      case 'generated':
        data = generatedReports.filter(r =>
          (r.reportName || '').toLowerCase().includes(term) || (r.period || '').toLowerCase().includes(term)
        );
        break;
      case 'scheduled':
        data = scheduledReports.filter(r =>
          (r.reportName || '').toLowerCase().includes(term) || (r.schedule || '').toLowerCase().includes(term)
        );
        break;
      case 'configure':
        data = [...reportTemplates, ...customReports].filter(r =>
          (r.name || '').toLowerCase().includes(term) || (r.category || '').toLowerCase().includes(term)
        );
        break;
      default:
        data = [];
    }

    if (filterPeriod !== 'All' && activeSection === 'generated') {
      data = data.filter(item => item.period === filterPeriod || item.period?.includes(filterPeriod));
    }
    if (filterDepartment !== 'All' && (activeSection === 'standard' || activeSection === 'analytics')) {
      data = data.filter(item => item.department === filterDepartment || item.department === 'All' || !item.department);
    }

    return data;
  };

  const filteredData = getFilteredData();
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- action handlers (stubs, safe) ---
  const handleExportData = () => {
    const dataToExport = filteredData;
    console.log('Exporting data', dataToExport);
    alert(`Exported ${dataToExport.length} items (check console).`);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadInitialData();
      setIsLoading(false);
      alert('Data refreshed');
    }, 400);
  };

  const handleGenerateReport = (report) => {
    const name = report.name || report.reportName || 'Custom Report';
    
    // Show preview modal first
    setPreviewReport({
      ...report,
      previewData: generatePreviewData(report)
    });
    setShowPreviewModal(true);
  };

  const generatePreviewData = (report) => {
    // Generate sample preview data based on report type
    const sampleData = [];
    for (let i = 1; i <= 5; i++) {
      sampleData.push({
        employeeId: `EMP${String(i).padStart(3, '0')}`,
        name: `Employee ${i}`,
        department: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'][i - 1],
        grossSalary: 50000 + (i * 10000),
        deductions: 5000 + (i * 1000),
        netSalary: 45000 + (i * 9000)
      });
    }
    return sampleData;
  };

  const handleConfirmGenerate = () => {
    if (!previewReport) return;
    
    const name = previewReport.name || previewReport.reportName || 'Custom Report';
    const newGenerated = {
      id: `GR_${Date.now()}`,
      reportName: name,
      period: filterPeriod !== 'All' ? filterPeriod : 'Current Month',
      generatedDate: new Date().toISOString(),
      generatedBy: 'System',
      format: (previewReport.format && (Array.isArray(previewReport.format) ? previewReport.format[0] : previewReport.format)) || 'PDF',
      size: '1.1 MB',
      status: 'completed',
      downloadCount: 0,
      reportId: previewReport.id
    };
    setGeneratedReports(prev => [newGenerated, ...prev]);
    setShowPreviewModal(false);
    setPreviewReport(null);
    alert(`${name} generated successfully.`);
  };

  const handleDownloadReport = (report) => {
    console.log('Downloading report', report);
    alert(`Downloading: ${report.reportName || report.name || 'Report'}`);
  };

  const handleScheduleReport = (report) => {
    setScheduleForm({
      reportId: report.id,
      frequency: 'monthly',
      day: 1,
      time: '09:00',
      recipients: [],
      format: (report.format && (Array.isArray(report.format) ? report.format[0] : report.format)) || 'pdf',
      autoGenerate: true
    });
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = () => {
    if (!scheduleForm.reportId) {
      alert('Please select a report');
      return;
    }

    const report = [...standardReports, ...complianceReports, ...analyticsDashboards]
      .find(r => r.id === scheduleForm.reportId);

    if (!report) {
      alert('Report not found');
      return;
    }

    const scheduleText = scheduleForm.frequency === 'monthly' 
      ? `${scheduleForm.day}${getDaySuffix(scheduleForm.day)} of every month`
      : scheduleForm.frequency === 'weekly'
      ? `Every ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`
      : scheduleForm.frequency === 'daily'
      ? 'Every day'
      : 'Quarterly';

    const nextRun = calculateNextRun(scheduleForm.frequency, scheduleForm.day, scheduleForm.time);

    const scheduleEntry = {
      id: `SRC_${Date.now()}`,
      reportName: report.name || report.reportName,
      reportId: scheduleForm.reportId,
      schedule: scheduleText,
      frequency: scheduleForm.frequency,
      day: scheduleForm.day,
      time: scheduleForm.time,
      nextRun: nextRun,
      format: scheduleForm.format,
      recipients: scheduleForm.recipients.length > 0 ? scheduleForm.recipients : ['hr@company.com'],
      status: 'active',
      autoGenerate: scheduleForm.autoGenerate
    };
    
    setScheduledReports(prev => [scheduleEntry, ...prev]);
    setShowScheduleModal(false);
    alert('Report scheduled successfully.');
  };

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const calculateNextRun = (frequency, day, time) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    if (frequency === 'daily') {
      const next = new Date(now);
      next.setHours(hours, minutes, 0, 0);
      if (next <= now) {
        next.setDate(next.getDate() + 1);
      }
      return next.toISOString();
    } else if (frequency === 'weekly') {
      const next = new Date(now);
      next.setHours(hours, minutes, 0, 0);
      const daysUntilNext = (7 - next.getDay() + day) % 7 || 7;
      next.setDate(next.getDate() + daysUntilNext);
      return next.toISOString();
    } else if (frequency === 'monthly') {
      const next = new Date(now.getFullYear(), now.getMonth(), day, hours, minutes, 0, 0);
      if (next <= now) {
        next.setMonth(next.getMonth() + 1);
      }
      return next.toISOString();
    } else if (frequency === 'quarterly') {
      const next = new Date(now.getFullYear(), now.getMonth() - (now.getMonth() % 3) + 3, day, hours, minutes, 0, 0);
      if (next <= now) {
        next.setMonth(next.getMonth() + 3);
      }
      return next.toISOString();
    }
    return new Date().toISOString();
  };

  const handleEditCustomReport = (report) => {
    setReportBuilder({
      name: report.name || report.reportName,
      description: report.description || '',
      category: report.category || 'Payroll',
      selectedColumns: report.columns || [],
      selectedFilters: report.filters || [],
      format: report.format || ['pdf'],
      schedule: report.schedule || 'none',
      recipients: report.recipients || []
    });
    setSelectedColumns(report.columns || []);
    setSelectedFilters(report.filters || []);
    setActiveSection('builder');
  };

  // handleUseTemplate (used by templates list)
  const handleUseTemplate = (template) => {
    setReportBuilder({
      name: `${template.name} (Copy)`,
      description: template.description,
      category: template.category || 'Payroll',
      selectedColumns: template.columns || [],
      selectedFilters: template.filters || [],
      format: template.format || ['pdf'],
      schedule: 'none',
      recipients: []
    });
    setSelectedColumns(template.columns || []);
    setSelectedFilters(template.filters || []);
    setActiveSection('builder');
  };

  const handleDeleteTemplate = (templateId) => {
    if (!window.confirm('Delete this template?')) return;
    setReportTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const handleCreateCustomReport = (e) => {
    e?.preventDefault?.();
    const newId = `custom_${Date.now()}`;
    setCustomReports(prev => [
      ...prev,
      {
        id: newId,
        name: reportBuilder.name || `New Report ${newId}`,
        category: reportBuilder.category,
        description: reportBuilder.description,
        columns: reportBuilder.selectedColumns || [],
        filters: reportBuilder.selectedFilters || [],
        format: reportBuilder.format,
        schedule: reportBuilder.schedule,
        recipients: reportBuilder.recipients || [],
        createdDate: new Date().toISOString(),
        lastGenerated: null,
        usageCount: 0,
        isCustom: true
      }
    ]);
    alert('Custom report created');
    setReportBuilder({
      name: '',
      description: '',
      category: 'Payroll',
      selectedColumns: [],
      selectedFilters: [],
      format: ['pdf', 'excel'],
      schedule: 'none',
      recipients: []
    });
    setActiveSection('configure');
  };

  // --- Add / Edit / Delete handlers for reports (modal-driven) ---
  const handleAddReport = () => {
    setIsEditMode(false);
    setReportForm({
      id: 'NEW-' + Date.now(),
      name: '',
      category: 'standard',
      description: '',
      frequency: 'Monthly',
      format: ['pdf'],
      department: 'All'
    });
    setShowReportModal(true);
  };

  const handleEditReport = (report, categoryOverride) => {
    // categoryOverride is optional; if present, use it else infer
    const category = categoryOverride || (report.category ? report.category : (standardReports.find(r => r.id === report.id) ? 'standard' : 'compliance'));
    setIsEditMode(true);
    setReportForm({
      ...report,
      category
    });
    setShowReportModal(true);
  };

  const handleDeleteReport = (reportId, category) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    if (category === 'standard') {
      setStandardReports(prev => prev.filter(r => r.id !== reportId));
    } else if (category === 'compliance') {
      setComplianceReports(prev => prev.filter(r => r.id !== reportId));
    } else if (category === 'analytics') {
      setAnalyticsDashboards(prev => prev.filter(r => r.id !== reportId));
    } else {
      // try all
      setStandardReports(prev => prev.filter(r => r.id !== reportId));
      setComplianceReports(prev => prev.filter(r => r.id !== reportId));
      setAnalyticsDashboards(prev => prev.filter(r => r.id !== reportId));
    }
    alert('Report deleted.');
  };

  const handleSaveReport = () => {
    if (!reportForm.name) {
      alert('Report name is required');
      return;
    }
    const payload = { ...reportForm };
    // normalize format to array
    if (!Array.isArray(payload.format)) payload.format = [payload.format];

    if (payload.category === 'standard') {
      setStandardReports(prev => {
        const exists = prev.find(r => r.id === payload.id);
        if (exists) return prev.map(r => r.id === payload.id ? payload : r);
        return [...prev, payload];
      });
    } else if (payload.category === 'compliance') {
      setComplianceReports(prev => {
        const exists = prev.find(r => r.id === payload.id);
        if (exists) return prev.map(r => r.id === payload.id ? payload : r);
        return [...prev, payload];
      });
    } else if (payload.category === 'analytics') {
      setAnalyticsDashboards(prev => {
        const exists = prev.find(r => r.id === payload.id);
        if (exists) return prev.map(r => r.id === payload.id ? payload : r);
        return [...prev, payload];
      });
    }

    setShowReportModal(false);
    alert(isEditMode ? 'Report updated.' : 'Report added.');

    // Make the newly added/updated report visible immediately:
    // - switch to the report's category (standard/compliance/analytics)
    // - clear any search term that may hide it
    // - reset pagination to page 1
    try {
      if (payload && payload.category) setActiveSection(payload.category);
    } catch (e) {
      // ignore
    }
    setSearchTerm('');
    setCurrentPage(1);
  };

  // load initial data (fully replaced dataset per PDF)
  const loadInitialData = () => {
    // Standard Reports (match PDF list)
    setStandardReports([
      { id: 'SR001', name: 'Monthly Payroll Register', category: 'standard', description: 'Detailed monthly payroll register with employee-wise breakdown', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '2.4 MB' },
      { id: 'SR002', name: 'Department-wise Payroll Summary', category: 'standard', description: 'Summary of payroll costs by department', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.8 MB' },
      { id: 'SR003', name: 'Location-wise Payroll Summary', category: 'standard', description: 'Payroll summary grouped by location', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.4 MB' },
      { id: 'SR004', name: 'Grade-wise Salary Analysis', category: 'standard', description: 'Salary distribution across grades', frequency: 'Quarterly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.2 MB' },
      { id: 'SR005', name: 'Bank Transfer Summary', category: 'standard', description: 'Summary of bank transfers for salary payments', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'pending', format: ['pdf', 'excel'], size: '0.9 MB' },
      { id: 'SR006', name: 'Statutory Reports (PF, ESI, PT, TDS)', category: 'standard', description: 'All statutory deduction summaries', frequency: 'Monthly/Quarterly', department: 'Finance', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '3.0 MB' },
      { id: 'SR007', name: 'Cost Center Wise Payroll', category: 'standard', description: 'Payroll cost allocation by cost center', frequency: 'Monthly', department: 'Finance', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.5 MB' },
      { id: 'SR008', name: 'Arrear Register', category: 'standard', description: 'Register of arrears and recoveries', frequency: 'Monthly', department: 'Finance', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf'], size: '0.8 MB' },
      { id: 'SR009', name: 'Payroll Variance Report (Month-over-Month)', category: 'standard', description: 'Month-over-month payroll variance analysis', frequency: 'Monthly', department: 'All', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '1.7 MB' },
      { id: 'SR010', name: 'Headcount and Payroll Cost Trends', category: 'standard', description: 'Historical trends of headcount and payroll costs', frequency: 'Monthly', department: 'HR', lastGenerated: '2024-03-31', status: 'generated', format: ['pdf', 'excel'], size: '2.1 MB' }
    ]);

    // Compliance Reports (match PDF list)
    setComplianceReports([
      { id: 'CR001', name: 'Form 24Q (TDS quarterly return)', type: 'TDS', category: 'compliance', description: 'Quarterly TDS return for salaried employees (Form 24Q)', frequency: 'Quarterly', dueDate: '2024-04-30', status: 'pending', formType: 'TDS', year: '2023-24', quarter: 'Q4' },
      { id: 'CR002', name: 'ECR (PF monthly return)', type: 'PF', category: 'compliance', description: 'ECR file for monthly PF contributions', frequency: 'Monthly', dueDate: '2024-04-15', status: 'submitted', formType: 'PF', month: 'March 2024' },
      { id: 'CR003', name: 'ESI Monthly Return', type: 'ESI', category: 'compliance', description: 'Monthly ESI contribution return', frequency: 'Monthly', dueDate: '2024-04-15', status: 'submitted', formType: 'ESI', month: 'March 2024' },
      { id: 'CR004', name: 'PT Challan Reports', type: 'Professional Tax', category: 'compliance', description: 'Professional Tax challan and payment reports', frequency: 'Monthly', dueDate: '2024-04-21', status: 'generated', formType: 'PT', month: 'March 2024' },
      { id: 'CR005', name: 'Form 16 (Annual TDS certificate)', type: 'TDS Certificate', category: 'compliance', description: 'Form 16 annual TDS certificate for employees', frequency: 'Annual', dueDate: '2024-06-15', status: 'in-progress', formType: 'TDS', year: '2023-24' },
      { id: 'CR006', name: 'Salary Certificate', type: 'Certificate', category: 'compliance', description: 'Employee salary certificate for various purposes', frequency: 'On Demand', dueDate: 'N/A', status: 'available', formType: 'Certificate' },
      { id: 'CR007', name: 'PF Annual Return (Form 3A, 6A)', type: 'PF', category: 'compliance', description: 'Annual PF return (Form 3A, 6A)', frequency: 'Annual', dueDate: '2024-05-30', status: 'pending', formType: 'PF', year: '2023-24' }
    ]);

    // Analytics Dashboards (match PDF list)
    setAnalyticsDashboards([
      { id: 'AD001', name: 'Total Payroll Cost Visualization', description: 'Interactive visualization of total payroll costs', category: 'analytics', metrics: ['Total Cost', 'Cost per Employee', 'Department Breakdown'], refreshRate: 'Real-time', accessLevel: 'Manager+', lastUpdated: '2024-03-31' },
      { id: 'AD002', name: 'Average Salary by Department/Grade', description: 'Average salary analysis across departments and grades', category: 'analytics', metrics: ['Average Salary', 'Median Salary', 'Salary Range'], refreshRate: 'Daily', accessLevel: 'HR+', lastUpdated: '2024-03-31' },
      { id: 'AD003', name: 'Salary Distribution Analysis', description: 'Analysis of salary distribution across organization', category: 'analytics', metrics: ['Distribution Curve', 'Percentiles', 'Outliers'], refreshRate: 'Monthly', accessLevel: 'HR+', lastUpdated: '2024-03-31' },
      { id: 'AD004', name: 'Statutory Contribution Trends', description: 'Trend analysis of statutory contributions (PF, ESI, PT)', category: 'analytics', metrics: ['PF Trends', 'ESI Trends', 'PT Trends'], refreshRate: 'Monthly', accessLevel: 'Finance+', lastUpdated: '2024-03-31' },
      { id: 'AD005', name: 'Payroll Cost Forecasting', description: 'Forecast future payroll costs based on trends', category: 'analytics', metrics: ['3-Month Forecast', '6-Month Forecast', 'Variance Analysis'], refreshRate: 'Monthly', accessLevel: 'Executive', lastUpdated: '2024-03-31' },
      { id: 'AD006', name: 'Budget vs Actual Payroll Comparison', description: 'Comparison of budgeted vs actual payroll costs', category: 'analytics', metrics: ['Variance %', 'Budget Utilization', 'Department Performance'], refreshRate: 'Monthly', accessLevel: 'Manager+', lastUpdated: '2024-03-31' },
      { id: 'AD007', name: 'Attrition Impact on Payroll Costs', description: 'Analysis of attrition impact on payroll', category: 'analytics', metrics: ['Cost of Attrition', 'Replacement Cost', 'Productivity Loss'], refreshRate: 'Quarterly', accessLevel: 'HR+', lastUpdated: '2024-03-31' }
    ]);

    // Sample generated reports (history)
    setGeneratedReports([
      { id: 'GR001', reportName: 'Monthly Payroll Register', period: 'March 2024', generatedDate: '2024-04-01', generatedBy: 'System', format: 'PDF', size: '2.4 MB', status: 'completed', downloadCount: 15 },
      { id: 'GR002', reportName: 'Department-wise Summary', period: 'March 2024', generatedDate: '2024-04-01', generatedBy: 'HR Manager', format: 'Excel', size: '1.8 MB', status: 'completed', downloadCount: 8 },
      { id: 'GR003', reportName: 'Form 24Q', period: 'Q4 FY 2023-24', generatedDate: '2024-04-10', generatedBy: 'Finance', format: 'Excel', size: '3.2 MB', status: 'completed', downloadCount: 3 }
    ]);

    // scheduled reports sample
    setScheduledReports([
      { id: 'SRC001', reportName: 'Monthly Payroll Register', schedule: '1st of every month', nextRun: '2024-05-01', format: 'PDF & Excel', recipients: ['hr@company.com', 'finance@company.com'], status: 'active' },
      { id: 'SRC002', reportName: 'Bank Transfer Summary', schedule: '28th of every month', nextRun: '2024-04-28', format: 'Excel', recipients: ['finance@company.com'], status: 'active' }
    ]);

    // report templates
    setReportTemplates([
      { id: 'template001', name: 'Basic Payroll Summary', category: 'Payroll', description: 'Basic payroll summary with essential columns', columns: ['Employee ID', 'Name', 'Basic Salary', 'Gross Salary', 'Net Salary'], filters: ['department', 'date_range'], format: ['pdf', 'excel'], isCustom: false },
      { id: 'template002', name: 'Detailed Salary Breakup', category: 'Salary', description: 'Detailed salary breakup with all components', columns: ['Employee ID', 'Name', 'Basic', 'HRA', 'Allowances', 'Deductions', 'Net'], filters: ['department', 'grade', 'date_range'], format: ['excel'], isCustom: false },
      { id: 'template003', name: 'Statutory Compliance Report', category: 'Compliance', description: 'All statutory deductions in one report', columns: ['Employee ID', 'Name', 'PF', 'ESI', 'PT', 'TDS', 'Total'], filters: ['date_range', 'location'], format: ['pdf', 'excel'], isCustom: false }
    ]);

    // custom reports (empty initially)
    setCustomReports([]);

    // available columns & filters (sample)
    setAvailableColumns([
      { id: 'emp_id', name: 'Employee ID', category: 'Basic', type: 'text' },
      { id: 'name', name: 'Name', category: 'Basic', type: 'text' },
      { id: 'department', name: 'Department', category: 'Basic', type: 'text' },
      { id: 'designation', name: 'Designation', category: 'Basic', type: 'text' },
      { id: 'basic_salary', name: 'Basic Salary', category: 'Salary', type: 'currency' },
      { id: 'gross_salary', name: 'Gross Salary', category: 'Salary', type: 'currency' },
      { id: 'net_salary', name: 'Net Salary', category: 'Salary', type: 'currency' },
      { id: 'pf_employee', name: 'PF (Employee)', category: 'Deductions', type: 'currency' },
      { id: 'tds', name: 'TDS', category: 'Deductions', type: 'currency' },
      { id: 'leave_balance', name: 'Leave Balance', category: 'Attendance', type: 'number' }
    ]);

    setAvailableFilters([
      { id: 'department', name: 'Department', type: 'multi-select', options: departments.slice(1) },
      { id: 'date_range', name: 'Date Range', type: 'date-range' },
      { id: 'salary_range', name: 'Salary Range', type: 'range', min: 0, max: 500000 },
      { id: 'location', name: 'Location', type: 'multi-select', options: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'] },
      { id: 'grade', name: 'Grade', type: 'multi-select', options: ['A', 'B', 'C', 'D', 'E'] }
    ]);

    // sample analytics data
    setAnalyticsData({
      payrollTrends: { labels: ['Jan','Feb','Mar','Apr','May','Jun'], data: [6800000,7000000,7500000,7200000,7400000,7600000] },
      departmentBreakdown: { labels: ['Engineering','Sales','Marketing','HR','Finance','Operations'], data: [3200000,1500000,800000,400000,600000,1000000] }
    });
  };

  // Enhanced report builder
  const renderReportBuilder = () => {
    return (
      <div className="row g-4">
        <div className="col-12">
          <div className="card border shadow-none">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Custom Report Builder</h5>
                <div className="small text-muted">Design your custom payroll report step by step</div>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setActiveSection("configure")}
              >
                <Icon icon="heroicons:arrow-left" className="me-2" />
                Back to Configuration
              </button>
            </div>

            <div className="card-body">
              {/* Step Indicator */}
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <div className="d-flex flex-column align-items-center">
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center ${
                            builderStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'
                          }`}
                          style={{ width: '40px', height: '40px' }}
                        >
                          {builderStep > step ? (
                            <Icon icon="heroicons:check" />
                          ) : (
                            step
                          )}
                        </div>
                        <div className="small mt-2 text-muted">
                          {step === 1 ? 'Basic Info' : step === 2 ? 'Columns' : step === 3 ? 'Filters' : 'Schedule'}
                        </div>
                      </div>
                      {step < 4 && (
                        <div
                          className={`flex-fill border-top mx-2 ${
                            builderStep > step ? 'border-primary' : 'border-secondary'
                          }`}
                          style={{ height: '2px' }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {builderStep === 1 && (
                <div>
                  <h6 className="mb-3">Step 1: Basic Information</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Report Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={reportBuilder.name}
                        onChange={(e) => setReportBuilder(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter report name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={reportBuilder.category}
                        onChange={(e) => setReportBuilder(prev => ({ ...prev, category: e.target.value }))}
                      >
                        <option value="Payroll">Payroll</option>
                        <option value="Salary">Salary</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Deduction">Deduction</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={reportBuilder.description}
                        onChange={(e) => setReportBuilder(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what this report contains"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Output Format</label>
                      <div className="d-flex gap-3">
                        {['pdf', 'excel', 'csv'].map(format => (
                          <div key={format} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={reportBuilder.format.includes(format)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setReportBuilder(prev => ({
                                    ...prev,
                                    format: [...prev.format, format]
                                  }));
                                } else {
                                  setReportBuilder(prev => ({
                                    ...prev,
                                    format: prev.format.filter(f => f !== format)
                                  }));
                                }
                              }}
                            />
                            <label className="form-check-label text-capitalize">{format}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Columns */}
              {builderStep === 2 && (
                <div>
                  <h6 className="mb-3">Step 2: Select Columns</h6>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search columns..."
                      onChange={(e) => {
                        // Filter columns based on search
                      }}
                    />
                  </div>
                  <div className="row g-3">
                    {availableColumns.map(col => (
                      <div key={col.id} className="col-md-4">
                        <div className="card border">
                          <div className="card-body p-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedColumns.includes(col.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedColumns([...selectedColumns, col.id]);
                                  } else {
                                    setSelectedColumns(selectedColumns.filter(c => c !== col.id));
                                  }
                                }}
                              />
                              <label className="form-check-label">
                                <div className="fw-semibold">{col.name}</div>
                                <div className="small text-muted">{col.category} • {col.type}</div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <div className="alert alert-info">
                      <strong>Selected:</strong> {selectedColumns.length} column(s)
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Apply Filters */}
              {builderStep === 3 && (
                <div>
                  <h6 className="mb-3">Step 3: Apply Filters</h6>
                  <div className="row g-3">
                    {availableFilters.map(filter => (
                      <div key={filter.id} className="col-md-6">
                        <label className="form-label">{filter.name}</label>
                        {filter.type === 'multi-select' && (
                          <select
                            className="form-select"
                            multiple
                            onChange={(e) => {
                              const selected = Array.from(e.target.selectedOptions, option => option.value);
                              setSelectedFilters(prev => ({
                                ...prev,
                                [filter.id]: selected
                              }));
                            }}
                          >
                            {filter.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}
                        {filter.type === 'date-range' && (
                          <div className="d-flex gap-2">
                            <input
                              type="date"
                              className="form-control"
                              value={dateRange.start}
                              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            />
                            <input
                              type="date"
                              className="form-control"
                              value={dateRange.end}
                              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            />
                          </div>
                        )}
                        {filter.type === 'range' && (
                          <div className="d-flex gap-2">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Min"
                              min={filter.min}
                              max={filter.max}
                            />
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Max"
                              min={filter.min}
                              max={filter.max}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Schedule */}
              {builderStep === 4 && (
                <div>
                  <h6 className="mb-3">Step 4: Schedule (Optional)</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Schedule Frequency</label>
                      <select
                        className="form-select"
                        value={reportBuilder.schedule}
                        onChange={(e) => setReportBuilder(prev => ({ ...prev, schedule: e.target.value }))}
                      >
                        <option value="none">No Schedule</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                      </select>
                    </div>
                    {reportBuilder.schedule !== 'none' && (
                      <>
                        <div className="col-md-6">
                          <label className="form-label">Recipients (Email)</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="email1@company.com, email2@company.com"
                            onChange={(e) => {
                              setReportBuilder(prev => ({
                                ...prev,
                                recipients: e.target.value.split(',').map(e => e.trim())
                              }));
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    if (builderStep > 1) setBuilderStep(builderStep - 1);
                    else setActiveSection('configure');
                  }}
                >
                  <Icon icon="heroicons:arrow-left" className="me-2" />
                  {builderStep > 1 ? 'Previous' : 'Cancel'}
                </button>
                <div className="d-flex gap-2">
                  {builderStep < 4 && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (builderStep === 1 && !reportBuilder.name) {
                          alert('Please enter a report name');
                          return;
                        }
                        if (builderStep === 2 && selectedColumns.length === 0) {
                          alert('Please select at least one column');
                          return;
                        }
                        setBuilderStep(builderStep + 1);
                      }}
                    >
                      Next
                      <Icon icon="heroicons:arrow-right" className="ms-2" />
                    </button>
                  )}
                  {builderStep === 4 && (
                    <button
                      className="btn btn-success"
                      onClick={handleCreateCustomReport}
                    >
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
  };


  

  // init
  useEffect(() => {
    loadInitialData();
    setTimeout(() => setIsLoading(false), 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
// PayrollReports.jsx (Part 2 of 3)
  // Render functions for sections
  const renderStandardReports = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Standard Payroll Reports</h5>
              <div className="small text-muted">Core payroll & operational reports</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={handleRefreshData}><Icon icon="heroicons:arrow-path" className="me-2" /> Refresh</button>
              <button className="btn btn-primary" onClick={handleAddReport}><Icon icon="heroicons:plus" className="me-2" />  Add Report</button>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="p-4 border-bottom">
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
                  <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                  <input type="text" placeholder="Search reports." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="form-control ps-5" />
                </div>

                <div style={{ minWidth: '150px' }}>
                  <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} className="form-select">
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="row g-3">
                {paginatedData.map(report => (
                  <div key={report.id} className="col-md-6 col-lg-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="mb-1">{report.name}</h6>
                            <p className="text-muted small mb-2">{report.description}</p>
                            <div className="small text-muted">Frequency: {report.frequency}</div>
                          </div>
                          <div>
                            <div className="small text-muted">Last: {formatDate(report.lastGenerated)}</div>
                            <div className="mt-2">{getStatusBadge(report.status)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent border-top d-flex justify-content-between">
                        <div className="small text-muted">Formats: {Array.isArray(report.format) ? report.format.join(', ') : report.format}</div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => { handleGenerateReport(report); }}>
                            <Icon icon="heroicons:document-arrow-down" className="me-1" />
                            Generate
                          </button>
                          <button className="btn btn-sm btn-outline-info" onClick={() => handleScheduleReport(report)}>
                            <Icon icon="heroicons:clock" className="me-1" />
                            Schedule
                          </button>
                          <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditReport(report, 'standard')}>
                            <Icon icon="heroicons:pencil" />
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

              {paginatedData.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <Icon icon="heroicons:document-text" className="text-4xl mb-3" />
                  <h5>No reports found</h5>
                  <p>No reports match your search criteria.</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
                <div className="small text-muted">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} reports
                </div>
                <div className="d-flex gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn btn-sm btn-outline-secondary">Previous</button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-secondary'}`}>{i + 1}</button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn btn-sm btn-outline-secondary">Next</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplianceReports = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">Compliance Reports</h5>
              <div className="small text-muted">Statutory & compliance filings</div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={handleRefreshData}><Icon icon="heroicons:arrow-path" className="me-2" /> Refresh</button>
              <button className="btn btn-primary" onClick={handleAddReport}><Icon icon="heroicons:plus" className="me-2" /> + Add Report</button>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceReports.map(report => (
                    <tr key={report.id}>
                      <td>
                        <div className="fw-bold">{report.name}</div>
                        <div className="small text-muted">{report.description}</div>
                      </td>
                      <td><span className="badge bg-info-subtle text-info">{report.formType || report.type}</span></td>
                      <td>{report.frequency}</td>
                      <td>
                        <div className="fw-semibold">{formatDate(report.dueDate)}</div>
                        {report.dueDate !== 'N/A' && new Date(report.dueDate) < new Date() && (
                          <div className="small text-danger">Overdue!</div>
                        )}
                      </td>
                      <td>{getStatusBadge(report.status)}</td>
                      <td>{report.month || report.year || report.quarter || 'N/A'}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleGenerateReport(report)}>Generate</button>
                          <button className="btn btn-sm btn-outline-success" onClick={() => handleDownloadReport(report)} disabled={!(report.status === 'generated' || report.status === 'submitted')}>Download</button>
                          <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditReport(report, 'compliance')}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReport(report.id, 'compliance')}>Delete</button>
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
    </div>
  );

  const renderAnalyticsDashboards = () => {
    const renderChart = (data, labels, title, type = 'bar') => {
      const maxValue = Math.max(...data);
      return (
        <div className="mb-4">
          <h6 className="mb-3">{title}</h6>
          <div className="d-flex align-items-end gap-2" style={{ height: '200px' }}>
            {data.map((value, index) => (
              <div key={index} className="flex-fill d-flex flex-column align-items-center">
                <div
                  className="bg-primary rounded-top w-100 mb-2"
                  style={{
                    height: `${(value / maxValue) * 180}px`,
                    minHeight: '10px'
                  }}
                  title={`${labels[index]}: ${formatCurrency(value)}`}
                />
                <div className="small text-muted text-center" style={{ fontSize: '10px', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                  {labels[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="row g-4">
        <div className="col-12">
          <div className="card border shadow-none">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Analytics Dashboards</h5>
                <div className="small text-muted">Interactive dashboards and forecasts</div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={handleRefreshData}>
                  <Icon icon="heroicons:arrow-path" className="me-2" /> Refresh
                </button>
                <button className="btn btn-primary" onClick={handleAddReport}>
                  <Icon icon="heroicons:plus" className="me-2" /> + Add Dashboard
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-8">
                  <div className="card border">
                    <div className="card-header">
                      <h6 className="mb-0">Available Dashboards</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        {analyticsDashboards.map(d => (
                          <div key={d.id} className="col-md-6">
                            <div className="card h-100 border">
                              <div className="card-body">
                                <h6 className="mb-1">{d.name}</h6>
                                <p className="small text-muted mb-2">{d.description}</p>
                                <div className="small text-muted mb-2">
                                  <Icon icon="heroicons:clock" className="me-1" />
                                  Updated: {formatDate(d.lastUpdated)}
                                </div>
                                <div className="small text-muted mb-2">
                                  <Icon icon="heroicons:chart-bar" className="me-1" />
                                  Refresh: {d.refreshRate}
                                </div>
                                <div className="small">
                                  <span className="badge bg-info-subtle text-info">
                                    {d.accessLevel}
                                  </span>
                                </div>
                              </div>
                              <div className="card-footer bg-transparent border-top d-flex justify-content-between align-items-center">
                                <div className="small text-muted">
                                  Metrics: {d.metrics?.slice(0, 2).join(', ')}
                                  {d.metrics?.length > 2 && ` +${d.metrics.length - 2}`}
                                </div>
                                <div className="d-flex gap-2">
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => {
                                      setSelectedDashboard(d);
                                      setShowAnalyticsModal(true);
                                    }}
                                  >
                                    <Icon icon="heroicons:eye" />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-warning"
                                    onClick={() => handleEditReport(d, 'analytics')}
                                  >
                                    <Icon icon="heroicons:pencil" />
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDeleteReport(d.id, 'analytics')}
                                  >
                                    <Icon icon="heroicons:trash" />
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

                <div className="col-md-4">
                  <div className="card border h-100">
                    <div className="card-header">
                      <h6 className="mb-0">Quick Metrics</h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <div className="small text-muted">Total Payroll Cost</div>
                        <div className="fw-semibold fs-5">{formatCurrency(kpis.totalPayrollCost)}</div>
                      </div>
                      <div className="mb-3">
                        <div className="small text-muted">Average Salary</div>
                        <div className="fw-semibold fs-5">{formatCurrency(kpis.avgSalary)}</div>
                      </div>
                      <div className="mb-3">
                        <div className="small text-muted">Statutory Deductions</div>
                        <div className="fw-semibold fs-5">{formatCurrency(kpis.statutoryDeductions)}</div>
                      </div>
                      <div>
                        <div className="small text-muted">Net Payroll</div>
                        <div className="fw-semibold fs-5 text-success">{formatCurrency(kpis.netPayroll)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Chart Preview */}
                  <div className="card border mt-3">
                    <div className="card-header">
                      <h6 className="mb-0">Payroll Trend</h6>
                    </div>
                    <div className="card-body">
                      {renderChart(
                        analyticsData.payrollTrends?.data || [6800000, 7000000, 7500000, 7200000, 7400000, 7600000],
                        analyticsData.payrollTrends?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        'Last 6 Months'
                      )}
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

  const renderGeneratedReports = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <div><h5 className="mb-0">Generated Reports History</h5><div className="small text-muted">Recent exports & generated files</div></div>
            <div className="d-flex gap-2"><button onClick={handleExportData} className="btn btn-primary"><Icon icon="heroicons:document-arrow-down" className="me-2" /> Export History</button><button onClick={handleRefreshData} className="btn btn-outline-primary"><Icon icon="heroicons:arrow-path" className="me-2" /> Refresh</button></div>
          </div>

          <div className="card-body p-0">
            <div className="p-4 border-bottom">
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <div className="position-relative flex-fill" style={{ minWidth: '300px' }}><Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" /><input type="text" placeholder="Search generated reports." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control ps-5" /></div>
                <div style={{ minWidth: '150px' }}><select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)} className="form-select">{periods.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr><th>Report Name</th><th>Period</th><th>Generated Date</th><th>Generated By</th><th>Format</th><th>Size</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {generatedReports.map(gr => (
                    <tr key={gr.id}>
                      <td className="fw-bold">{gr.reportName}</td>
                      <td>{gr.period}</td>
                      <td>{formatDate(gr.generatedDate)}</td>
                      <td>{gr.generatedBy}</td>
                      <td>{gr.format}</td>
                      <td>{gr.size}</td>
                      <td>{getStatusBadge(gr.status)}</td>
                      <td><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-success" onClick={() => handleDownloadReport(gr)}>Download</button></div></td>
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

  const renderScheduledReports = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
            <div><h5 className="mb-0">Scheduled Reports</h5><div className="small text-muted">Automated scheduled reports</div></div>
            <div><button className="btn btn-primary"><Icon icon="heroicons:plus" className="me-2" /> Schedule New Report</button></div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr><th>Report Name</th><th>Schedule</th><th>Next Run</th><th>Format</th><th>Recipients</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {scheduledReports.map(sr => (
                    <tr key={sr.id}>
                      <td className="fw-bold">{sr.reportName}</td>
                      <td>{sr.schedule}</td>
                      <td><div className="fw-semibold">{formatDate(sr.nextRun)}</div><div className="small text-muted">{new Date(sr.nextRun) > new Date() ? `${Math.ceil((new Date(sr.nextRun) - new Date()) / (1000 * 60 * 60 * 24))} days remaining` : 'Due'}</div></td>
                      <td>{sr.format}</td>
                      <td><div className="small">{sr.recipients?.map((r, idx) => <div key={idx}>{r}</div>)}</div></td>
                      <td>{getStatusBadge(sr.status)}</td>
                      <td><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-primary">Edit</button><button className="btn btn-sm btn-outline-warning">{sr.status === 'active' ? 'Pause' : 'Activate'}</button></div></td>
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

  const renderReportConfiguration = () => (
    <div className="row g-4">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header"><h6 className="mb-0">Report Configuration</h6></div>
          <div className="card-body">
            <div className="mb-4">
              <label className="form-label">Default Report Format</label>
              <select className="form-select" value={reportConfig.format} onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value }))}>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Report Retention Period (months)</label>
              <select className="form-select" value={reportConfig.retentionPeriod} onChange={(e) => setReportConfig(prev => ({ ...prev, retentionPeriod: parseInt(e.target.value) }))}>
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
                <option value={36}>36 months</option>
              </select>
            </div>

            <div className="form-check form-switch mb-3">
              <input className="form-check-input" type="checkbox" id="autoGenerate" checked={reportConfig.autoGenerate} onChange={() => setReportConfig(prev => ({ ...prev, autoGenerate: !prev.autoGenerate }))} />
              <label className="form-check-label" htmlFor="autoGenerate">Auto-generate scheduled reports</label>
            </div>

          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border">
          <div className="card-header"><h6 className="mb-0">Templates & Custom Reports</h6></div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Available Templates</label>
              <div className="list-group">
                {reportTemplates.map(t => (
                  <button key={t.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onClick={() => handleUseTemplate(t)}>
                    <div>
                      <div className="fw-semibold">{t.name}</div>
                      <div className="small text-muted">{t.description}</div>
                    </div>
                    <div className="small text-muted">{t.format.join(', ')}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Custom Reports</label>
              {customReports.length === 0 ? <div className="text-muted small">No custom reports yet.</div> : (
                <ul className="list-group">
                  {customReports.map(c => (<li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{c.name}</div>
                      <div className="small text-muted">{formatDate(c.createdDate)}</div>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleGenerateReport(c)}>Generate</button>
                      <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditCustomReport(c)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => setCustomReports(prev => prev.filter(x => x.id !== c.id))}>Delete</button>
                    </div>
                  </li>))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
// PayrollReports.jsx — Part 3 of 3 (Cards + Table on same page, modal, final render)
// Paste this after Parts 1 & 2 exactly.

  // --- Table renderers (detailed lists) ---
  const renderStandardTable = () => (
    <div className="card mt-3">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="bg-light">
              <tr>
                <th>Report ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Frequency</th>
                <th>Department</th>
                <th>Last Generated</th>
                <th>Formats</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {standardReports.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td className="fw-semibold">{r.name}</td>
                  <td className="text-muted">{r.description}</td>
                  <td>{r.frequency}</td>
                  <td>{r.department || 'All'}</td>
                  <td>{formatDate(r.lastGenerated)}</td>
                  <td>{Array.isArray(r.format) ? r.format.join(', ') : r.format}</td>
                  <td>{r.size || '-'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleGenerateReport(r)}>Generate</button>
                      <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditReport(r, 'standard')}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReport(r.id, 'standard')}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {standardReports.length === 0 && (
                <tr><td colSpan={9} className="text-center text-muted">No standard reports available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderComplianceTable = () => (
    <div className="card mt-3">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Report Name</th>
                <th>Form/Type</th>
                <th>Frequency</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complianceReports.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td className="fw-semibold">{c.name}</td>
                  <td>{c.formType || c.type}</td>
                  <td>{c.frequency}</td>
                  <td>{formatDate(c.dueDate)}</td>
                  <td>{getStatusBadge(c.status)}</td>
                  <td>{c.month || c.quarter || c.year || 'N/A'}</td>
                  <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleGenerateReport(c)}>
                            <Icon icon="heroicons:document-arrow-down" className="me-1" />
                            Generate
                          </button>
                          <button className="btn btn-sm btn-outline-success" onClick={() => handleDownloadReport(c)} disabled={!(c.status === 'generated' || c.status === 'submitted')}>
                            <Icon icon="heroicons:download" className="me-1" />
                            Download
                          </button>
                          <button className="btn btn-sm btn-outline-info" onClick={() => handleScheduleReport(c)}>
                            <Icon icon="heroicons:clock" className="me-1" />
                            Schedule
                          </button>
                          <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditReport(c, 'compliance')}>
                            <Icon icon="heroicons:pencil" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReport(c.id, 'compliance')}>
                            <Icon icon="heroicons:trash" />
                          </button>
                        </div>
                  </td>
                </tr>
              ))}
              {complianceReports.length === 0 && (
                <tr><td colSpan={8} className="text-center text-muted">No compliance reports available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTable = () => (
    <div className="card mt-3">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Dashboard</th>
                <th>Description</th>
                <th>Metrics</th>
                <th>Refresh</th>
                <th>Access</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {analyticsDashboards.map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td className="fw-semibold">{a.name}</td>
                  <td className="text-muted">{a.description}</td>
                  <td>{(a.metrics || []).slice(0,4).join(', ')}</td>
                  <td>{a.refreshRate}</td>
                  <td>{a.accessLevel}</td>
                  <td>{formatDate(a.lastUpdated)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => alert('Open dashboard preview (stub)')}>Preview</button>
                      <button className="btn btn-sm btn-outline-warning" onClick={() => handleEditReport(a, 'analytics')}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteReport(a.id, 'analytics')}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {analyticsDashboards.length === 0 && (
                <tr><td colSpan={8} className="text-center text-muted">No dashboards available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Combined cards + table renderer for active section (Option 3: both visible)
  const renderCombinedSection = () => {
    switch (activeSection) {
      case 'standard':
        return (
          <>
            {renderStandardReports()}
            {renderStandardTable()}
          </>
        );
      case 'compliance':
        return (
          <>
            {renderComplianceReports()}
            {renderComplianceTable()}
          </>
        );
      case 'analytics':
        return (
          <>
            {renderAnalyticsDashboards()}
            {renderAnalyticsTable()}
          </>
        );
      case 'generated':
        return (
          <>
            {renderGeneratedReports()}
          </>
        );
      case 'scheduled':
        return (
          <>
            {renderScheduledReports()}
            {/* Table view for scheduled reports */}
            <div className="card mt-3">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="bg-light">
                      <tr><th>Report</th><th>Schedule</th><th>Next Run</th><th>Recipients</th><th>Format</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {scheduledReports.map(s => (
                        <tr key={s.id}>
                          <td className="fw-semibold">{s.reportName}</td>
                          <td>{s.schedule}</td>
                          <td>{formatDate(s.nextRun)}</td>
                          <td>{(s.recipients || []).join(', ')}</td>
                          <td>{s.format}</td>
                          <td>{getStatusBadge(s.status)}</td>
                          <td><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-primary">Edit</button><button className="btn btn-sm btn-outline-warning">{s.status === 'active' ? 'Pause' : 'Activate'}</button></div></td>
                        </tr>
                      ))}
                      {scheduledReports.length === 0 && <tr><td colSpan={7} className="text-center text-muted">No scheduled reports.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      case 'configure':
        return (
          <>
            {renderReportConfiguration()}
            {/* Table view for templates & custom reports */}
            <div className="card mt-3">
              <div className="card-body">
                <h6>All Templates & Custom Reports</h6>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="bg-light"><tr><th>ID</th><th>Name</th><th>Category</th><th>Columns</th><th>Format</th><th>Actions</th></tr></thead>
                    <tbody>
                      {reportTemplates.map(t => (
                        <tr key={t.id}>
                          <td>{t.id}</td>
                          <td className="fw-semibold">{t.name}</td>
                          <td>{t.category}</td>
                          <td>{(t.columns || []).slice(0,4).join(', ')}</td>
                          <td>{(t.format || []).join(', ')}</td>
                          <td><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-primary" onClick={() => handleUseTemplate(t)}>Use</button><button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTemplate(t.id)}>Delete</button></div></td>
                        </tr>
                      ))}
                      {customReports.map(c => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td className="fw-semibold">{c.name}</td>
                          <td>{c.category}</td>
                          <td>{(c.columns || []).slice(0,4).join(', ')}</td>
                          <td>{(c.format || []).join(', ')}</td>
                          <td><div className="d-flex gap-2"><button className="btn btn-sm btn-outline-primary" onClick={() => handleGenerateReport(c)}>Generate</button><button className="btn btn-sm btn-outline-warning" onClick={() => handleEditCustomReport(c)}>Edit</button><button className="btn btn-sm btn-outline-danger" onClick={() => setCustomReports(prev => prev.filter(x => x.id !== c.id))}>Delete</button></div></td>
                        </tr>
                      ))}
                      {reportTemplates.length === 0 && customReports.length === 0 && <tr><td colSpan={6} className="text-center text-muted">No templates or custom reports available.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      case 'builder':
        return renderReportBuilder();
      default:
        return renderStandardReports();
    }
  };

  // inline modal styles (reused)
  const modalBackdropStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 };
  const modalContainerStyle = { background: '#fff', padding: 20, width: 520, borderRadius: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' };

  // Final render (uses combined view)
  return (
    <
     
    >
      <div className="container-fluid">
        <div className="mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            {activeSection !== 'standard' && (
              <button onClick={() => setActiveSection('standard')} className="btn btn-link d-flex align-items-center gap-2">
                <Icon icon="heroicons:arrow-left" /> Back to Reports
              </button>
            )}

           
          </div>

          <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
            <Icon icon="heroicons:chart-bar" /> Payroll Reports & Analytics
          </h5>
          <p className="text-muted">Cards + Table view — view summary and full detail together.</p>
        </div>

        {/* Combined content area (cards + table stacked per activeSection) */}
        {renderCombinedSection()}

        {/* Add / Edit Report Modal */}
        {showReportModal && (
          <div style={modalBackdropStyle}>
            <div style={modalContainerStyle}>
              <h5>{isEditMode ? 'Edit Report' : 'Add New Report'}</h5>

              <div className="mb-3">
                <label className="form-label">Report Name</label>
                <input type="text" className="form-control" value={reportForm.name} onChange={(e) => setReportForm(prev => ({ ...prev, name: e.target.value }))} />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={reportForm.category} onChange={(e) => setReportForm(prev => ({ ...prev, category: e.target.value }))}>
                  <option value="standard">Standard</option>
                  <option value="compliance">Compliance</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="2" value={reportForm.description} onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}></textarea>
              </div>

              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Frequency</label>
                  <select className="form-select" value={reportForm.frequency} onChange={(e) => setReportForm(prev => ({ ...prev, frequency: e.target.value }))}>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Format</label>
                  <select className="form-select" value={Array.isArray(reportForm.format) ? reportForm.format[0] : reportForm.format} onChange={(e) => setReportForm(prev => ({ ...prev, format: [e.target.value] }))}>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={() => setShowReportModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveReport}>{isEditMode ? 'Update' : 'Save'}</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default PayrollReports;
