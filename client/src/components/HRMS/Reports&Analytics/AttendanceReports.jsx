import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const AttendanceReports = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportForm, setReportForm] = useState({
    reportType: 'Daily Attendance Summary',
    dateRange: '',
    department: '',
    reason: ''
  });

  const [reportsData] = useState([
    { date: '2024-01-01', report: 'Daily Attendance Summary', status: 'Generated' },
    { date: '2024-01-02', report: 'Late Arrivals List', status: 'Generated' },
    { date: '2024-01-03', report: 'Monthly Attendance Register', status: 'Generated' },
    { date: '2024-01-04', report: 'Exception Report', status: 'Pending' },
    { date: '2024-01-05', report: 'Compliance Muster Roll', status: 'Generated' },
    { date: '2024-01-06', report: 'Department-wise Summary', status: 'Generated' },
    { date: '2024-01-07', report: 'WFH Tracking Report', status: 'Pending' },
    { date: '2024-01-08', report: 'Overtime Summary', status: 'Generated' },
    { date: '2024-01-09', report: 'Biometric Mismatch Report', status: 'Generated' },
    { date: '2024-01-10', report: 'Factory Act Compliance', status: 'Generated' },
  ]);

  const [reportsHistory, setReportsHistory] = useState([
    { id: 1, type: 'Daily Attendance Summary', from: '2024-01-10', to: '2024-01-10', generatedBy: 'System', status: 'Generated', size: '2.4 MB' },
    { id: 2, type: 'Monthly Consolidated Report', from: '2024-01-01', to: '2024-01-31', generatedBy: 'Admin User', status: 'Pending', size: '5.1 MB' },
    { id: 3, type: 'Exception Report', from: '2024-01-08', to: '2024-01-08', generatedBy: 'System', status: 'Generated', size: '1.8 MB' },
  ]);

  // Real-time Attendance Dashboard Data
  const realTimeDashboard = {
    totalEmployees: 1480,
    present: 1420,
    absent: 45,
    onLeave: 35,
    lateArrivals: 12,
    earlyDepartures: 8,
    wfh: 28,
    onTime: 1408,
    attendancePercentage: 95.9,
    lastUpdated: new Date().toLocaleTimeString()
  };

  // Enhanced Attendance Reports with Categories
  const [attendanceReports, setAttendanceReports] = useState([
    // Daily Reports
    {
      id: 1,
      reportName: 'Daily Attendance Summary',
      category: 'daily',
      date: '2024-01-15',
      generated: '09:00 AM',
      totalEmployees: 1480,
      present: 1420,
      absent: 45,
      onLeave: 35,
      holiday: 0,
      status: 'generated',
      department: 'All'
    },
    {
      id: 2,
      reportName: 'Late Arrivals List',
      category: 'daily',
      date: '2024-01-15',
      generated: '10:30 AM',
      lateArrivals: 12,
      avgDelay: '25 mins',
      department: 'Engineering',
      status: 'generated',
      location: 'Bangalore'
    },
    {
      id: 21,
      reportName: 'Early Departures List',
      category: 'daily',
      date: '2024-01-15',
      generated: '11:00 AM',
      earlyDepartures: 8,
      avgEarlyTime: '45 mins',
      department: 'All',
      status: 'generated'
    },
    {
      id: 22,
      reportName: 'Missing Punch Report',
      category: 'daily',
      date: '2024-01-15',
      generated: '12:00 PM',
      missingPunches: 15,
      pendingRegularization: 8,
      department: 'All',
      status: 'generated'
    },
    {
      id: 23,
      reportName: 'Shift-wise Attendance',
      category: 'daily',
      date: '2024-01-15',
      generated: '09:30 AM',
      generalShift: 950,
      nightShift: 380,
      morningShift: 150,
      department: 'All',
      status: 'generated'
    },
    {
      id: 24,
      reportName: 'Location-wise Attendance',
      category: 'daily',
      date: '2024-01-15',
      generated: '10:00 AM',
      bangalore: 850,
      mumbai: 420,
      delhi: 150,
      chennai: 60,
      status: 'generated'
    },
    // Monthly Reports
    {
      id: 3,
      reportName: 'Monthly Attendance Register',
      category: 'monthly',
      date: '2024-01-01',
      generated: '08:45 AM',
      totalEmployees: 1480,
      avgAttendance: '94.2%',
      department: 'All',
      status: 'generated',
      month: 'January 2024'
    },
    {
      id: 31,
      reportName: 'Department-wise Attendance Summary',
      category: 'monthly',
      date: '2024-01-31',
      generated: '09:00 AM',
      engineering: { present: 135, absent: 15, percentage: 90.0 },
      sales: { present: 78, absent: 7, percentage: 91.8 },
      marketing: { present: 42, absent: 3, percentage: 93.3 },
      department: 'All',
      status: 'generated',
      month: 'January 2024'
    },
    {
      id: 32,
      reportName: 'Consolidated Monthly Report',
      category: 'monthly',
      date: '2024-01-31',
      generated: '06:00 PM',
      totalDays: 31,
      totalPresent: 44200,
      totalAbsent: 1480,
      avgAttendance: '94.2%',
      status: 'generated',
      month: 'January 2024'
    },
    {
      id: 33,
      reportName: 'Loss of Pay Calculation',
      category: 'monthly',
      date: '2024-01-31',
      generated: '05:00 PM',
      lossOfPayEmployees: 25,
      totalLossOfPay: 156250,
      department: 'All',
      status: 'generated',
      month: 'January 2024'
    },
    {
      id: 8,
      reportName: 'Overtime Summary',
      category: 'monthly',
      date: '2024-01-31',
      generated: '04:00 PM',
      totalOvertimeHours: 1250,
      employeesWithOT: 180,
      department: 'All',
      status: 'generated',
      month: 'January 2024'
    },
    {
      id: 7,
      reportName: 'WFH Tracking Report',
      category: 'monthly',
      date: '2024-01-31',
      generated: '03:00 PM',
      totalWFHDays: 420,
      employeesWFH: 85,
      avgWFHDays: 4.9,
      department: 'All',
      status: 'generated',
      month: 'January 2024'
    },
    {
      id: 34,
      reportName: 'Attendance Percentage by Department/Location',
      category: 'monthly',
      date: '2024-01-31',
      generated: '02:00 PM',
      departmentPercentages: { Engineering: 90.0, Sales: 91.8, Marketing: 93.3 },
      locationPercentages: { Bangalore: 94.2, Mumbai: 92.8, Delhi: 95.1 },
      status: 'generated',
      month: 'January 2024'
    },
    // Exception Reports
    {
      id: 4,
      reportName: 'Exception Report',
      category: 'exception',
      date: '2024-01-15',
      generated: '11:15 AM',
      exceptions: 18,
      pendingCases: 8,
      department: 'All',
      status: 'generated',
      location: 'All'
    },
    {
      id: 41,
      reportName: 'Continuous Absence Report',
      category: 'exception',
      date: '2024-01-15',
      generated: '10:00 AM',
      continuousAbsence: 12,
      moreThan3Days: 8,
      moreThan7Days: 4,
      department: 'All',
      status: 'generated'
    },
    {
      id: 42,
      reportName: 'Frequent Late Arrivals',
      category: 'exception',
      date: '2024-01-15',
      generated: '10:30 AM',
      frequentLate: 25,
      moreThan5Times: 15,
      moreThan10Times: 10,
      department: 'All',
      status: 'generated'
    },
    {
      id: 43,
      reportName: 'Pattern-based Anomalies',
      category: 'exception',
      date: '2024-01-15',
      generated: '11:00 AM',
      anomalies: 18,
      suspiciousPatterns: 12,
      department: 'All',
      status: 'generated'
    },
    {
      id: 44,
      reportName: 'Biometric vs Applied Leave Mismatch',
      category: 'exception',
      date: '2024-01-15',
      generated: '11:30 AM',
      mismatches: 15,
      pendingResolution: 8,
      department: 'All',
      status: 'generated'
    },
    {
      id: 45,
      reportName: 'Pending Regularization Requests',
      category: 'exception',
      date: '2024-01-15',
      generated: '12:00 PM',
      pendingRequests: 22,
      overdue: 8,
      department: 'All',
      status: 'generated'
    },
    {
      id: 46,
      reportName: 'Unapproved Overtime',
      category: 'exception',
      date: '2024-01-15',
      generated: '12:30 PM',
      unapprovedOT: 15,
      totalHours: 120,
      department: 'All',
      status: 'generated'
    },
    {
      id: 47,
      reportName: 'Weekend Working without Approval',
      category: 'exception',
      date: '2024-01-15',
      generated: '01:00 PM',
      weekendWork: 8,
      withoutApproval: 5,
      department: 'All',
      status: 'generated'
    },
    // Compliance Reports
    {
      id: 5,
      reportName: 'Compliance Muster Roll',
      category: 'compliance',
      date: '2024-01-31',
      generated: '06:00 PM',
      format: 'Factory Act',
      department: 'All',
      status: 'generated',
      period: 'January 2024'
    },
    {
      id: 51,
      reportName: 'Attendance Register for Labor Department',
      category: 'compliance',
      date: '2024-01-31',
      generated: '05:30 PM',
      format: 'Labor Department',
      department: 'All',
      status: 'generated',
      period: 'January 2024'
    },
    {
      id: 52,
      reportName: 'Factory Attendance Register',
      category: 'compliance',
      date: '2024-01-31',
      generated: '06:30 PM',
      format: 'Factory Act',
      department: 'Operations',
      status: 'generated',
      period: 'January 2024'
    },
    {
      id: 53,
      reportName: 'Shops & Establishment Act Report',
      category: 'compliance',
      date: '2024-01-31',
      generated: '07:00 PM',
      format: 'Shops & Establishment Act',
      department: 'All',
      status: 'generated',
      period: 'January 2024'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedReportCategory, setSelectedReportCategory] = useState('all'); // all, daily, monthly, exception, compliance
  const [showRealTimeDashboard, setShowRealTimeDashboard] = useState(false);

  const departments = ['all', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'All'];
  const locations = ['all', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];
  const shifts = ['all', 'General', 'Night', 'Morning', 'Evening'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getReportStatus = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = reportsData.find(a => a.date === dateStr);
    return record ? record.status : null;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Generated': return 'bg-success-subtle text-success border-success';
      case 'Pending': return 'bg-warning-subtle text-warning border-warning';
      case 'Failed': return 'bg-danger-subtle text-danger border-danger';
      case 'generated': return 'bg-success-subtle text-success';
      case 'pending': return 'bg-warning-subtle text-warning';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: reportsHistory.length + 1,
      type: reportForm.reportType,
      from: reportForm.dateRange.split(' to ')[0],
      to: reportForm.dateRange.split(' to ')[1] || reportForm.dateRange.split(' to ')[0],
      generatedBy: 'Current User',
      status: 'Pending',
      size: '0.0 MB'
    };
    setReportsHistory([newReport, ...reportsHistory]);
    setShowExportModal(false);
    setReportForm({ reportType: 'Daily Attendance Summary', dateRange: '', department: '', reason: '' });
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const handleDeleteReport = (reportId) => {
    setReportsHistory(reportsHistory.filter(report => report.id !== reportId));
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedReport(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      generated: 'bg-success-subtle text-success',
      pending: 'bg-warning-subtle text-warning',
      failed: 'bg-danger-subtle text-danger',
      Generated: 'bg-success-subtle text-success',
      Pending: 'bg-warning-subtle text-warning',
      Failed: 'bg-danger-subtle text-danger'
    };

    const icons = {
      generated: 'heroicons:check-circle',
      pending: 'heroicons:clock',
      failed: 'heroicons:x-circle',
      Generated: 'heroicons:check-circle',
      Pending: 'heroicons:clock',
      Failed: 'heroicons:x-circle'
    };

    return (
      <span
        className={`badge d-flex align-items-center justify-content-center ${styles[status]}`}
        style={{
          fontSize: '11px',
          padding: '4px 6px',
          borderRadius: '6px',
          minWidth: '75px',
          display: 'inline-flex',
          gap: '3px'
        }}
      >
        <Icon icon={icons[status]} style={{ fontSize: '14px' }} />
        {status}
      </span>
    );
  };

  const filteredReports = attendanceReports.filter(report => {
    const matchesCategory = selectedReportCategory === 'all' || report.category === selectedReportCategory;
    const matchesDepartment = filterDepartment === 'all' || report.department === filterDepartment || report.department === 'All';
    // For daily reports, match by date; for others, show if category matches
    const matchesDate = selectedReportCategory === 'daily' ? report.date === selectedDate : true;
    return matchesCategory && matchesDepartment && matchesDate;
  });

  const reportCategories = [
    { id: 'all', name: 'All Reports', icon: 'heroicons:document-text' },
    { id: 'daily', name: 'Daily Reports', icon: 'heroicons:calendar' },
    { id: 'monthly', name: 'Monthly Reports', icon: 'heroicons:calendar-days' },
    { id: 'exception', name: 'Exception Reports', icon: 'heroicons:exclamation-triangle' },
    { id: 'compliance', name: 'Compliance Reports', icon: 'heroicons:shield-check' }
  ];

  const reportStats = {
    total: filteredReports.length,
    generated: filteredReports.filter(r => r.status === 'generated').length,
    pending: filteredReports.filter(r => r.status === 'pending').length
  };

  const handleExportReport = (reportId) => {
    const report = attendanceReports.find(r => r.id === reportId);
    if (report) {
      const csv = [
        ['Report Name', 'Date', 'Generated At', 'Department', 'Status'],
        [report.reportName, report.date, report.generated, report.department, report.status]
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.reportName.toLowerCase().replace(/\s+/g, '-')}-${report.date}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const handlePrintReport = (reportId) => {
    const report = attendanceReports.find(r => r.id === reportId);
    if (report) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>${report.reportName}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              .info { margin: 20px 0; }
              .info-item { margin: 5px 0; }
              .stats { display: flex; gap: 20px; margin: 20px 0; }
              .stat-box { border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; }
              .footer { margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <h1>${report.reportName}</h1>
            <div class="info">
              <div class="info-item"><strong>Date:</strong> ${report.date}</div>
              <div class="info-item"><strong>Generated:</strong> ${report.generated}</div>
              <div class="info-item"><strong>Department:</strong> ${report.department}</div>
              <div class="info-item"><strong>Status:</strong> ${report.status}</div>
            </div>
            <div class="stats">
              ${report.totalEmployees ? `<div class="stat-box"><h3>${report.totalEmployees}</h3><p>Total Employees</p></div>` : ''}
              ${report.present ? `<div class="stat-box"><h3>${report.present}</h3><p>Present</p></div>` : ''}
              ${report.absent ? `<div class="stat-box"><h3>${report.absent}</h3><p>Absent</p></div>` : ''}
              ${report.onLeave ? `<div class="stat-box"><h3>${report.onLeave}</h3><p>On Leave</p></div>` : ''}
              ${report.lateArrivals ? `<div class="stat-box"><h3>${report.lateArrivals}</h3><p>Late Arrivals</p></div>` : ''}
            </div>
            <div class="footer">
              <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
              <p>© ${new Date().getFullYear()} HRM System - Confidential Report</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const handleGenerateReport = (reportId) => {
    // Simulate report generation
    const updatedReports = attendanceReports.map(report => {
      if (report.id === reportId && report.status === 'pending') {
        return { ...report, status: 'generated', generated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      }
      return report;
    });
    setAttendanceReports(updatedReports);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-muted"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getReportStatus(day);
      days.push(
        <div key={day} className={`h-20 border border-muted p-2 ${status ? getStatusColor(status) : 'bg-white'}`}>
          <div className="fw-semibold small">{day}</div>
          {status && (
            <div className="mt-1 small fw-medium">
              {status === 'Generated' ? 'G' : status === 'Pending' ? 'P' : 'F'}
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        {dayNames.map(name => (
          <div key={name} className="fw-semibold text-center py-2 bg-light text-muted border border-muted">
            {name}
          </div>
        ))}
        {days}
      </>
    );
  };

  return (
    
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
            <Icon icon="heroicons:chart-bar" />
            Attendance Reports & Analytics
          </h5>
          <p className="text-muted">Generate and manage attendance reports, compliance documents, and analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:document-text" className="text-success fs-4" />
                  </div>
                  <div>
                    <h6 className="small text-muted fw-medium mb-1">Generated Reports</h6>
                    <p className="h5 text-dark mb-0">{reportStats.generated}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-warning-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:clock" className="text-warning fs-4" />
                  </div>
                  <div>
                    <h6 className="small text-muted fw-medium mb-1">Pending Reports</h6>
                    <p className="h5 text-dark mb-0">{reportStats.pending}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:calendar" className="text-primary fs-4" />
                  </div>
                  <div>
                    <h6 className="small text-muted fw-medium mb-1">Today's Reports</h6>
                    <p className="h5 text-dark mb-0">{reportStats.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-info-subtle p-3 rounded-circle">
                    <Icon icon="heroicons:shield-check" className="text-info fs-4" />
                  </div>
                  <div>
                    <h6 className="small text-muted fw-medium mb-1">Compliance Ready</h6>
                    <p className="h5 text-dark mb-0">
                      {attendanceReports.filter(r => r.category === 'compliance' && r.status === 'generated').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Attendance Dashboard */}
        <div className="card border shadow-none mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="h5 fw-bold text-dark mb-0">Real-time Attendance Dashboard</h5>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted">Last updated: {realTimeDashboard.lastUpdated}</small>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowRealTimeDashboard(!showRealTimeDashboard)}
              >
                <Icon icon={showRealTimeDashboard ? 'heroicons:chevron-up' : 'heroicons:chevron-down'} />
              </button>
            </div>
          </div>
          {showRealTimeDashboard && (
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-2">
                  <div className="text-center">
                    <div className="h3 fw-bold text-primary">{realTimeDashboard.totalEmployees}</div>
                    <div className="small text-muted">Total Employees</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-center">
                    <div className="h3 fw-bold text-success">{realTimeDashboard.present}</div>
                    <div className="small text-muted">Present</div>
                    <div className="small text-success">
                      ({((realTimeDashboard.present / realTimeDashboard.totalEmployees) * 100).toFixed(1)}%)
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-center">
                    <div className="h3 fw-bold text-danger">{realTimeDashboard.absent}</div>
                    <div className="small text-muted">Absent</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-center">
                    <div className="h3 fw-bold text-warning">{realTimeDashboard.onLeave}</div>
                    <div className="small text-muted">On Leave</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-center">
                    <div className="h3 fw-bold text-info">{realTimeDashboard.lateArrivals}</div>
                    <div className="small text-muted">Late Arrivals</div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-center">
                    <div className="h3 fw-bold text-secondary">{realTimeDashboard.wfh}</div>
                    <div className="small text-muted">Work from Home</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-medium">Overall Attendance Rate</span>
                  <span className="fw-bold text-success">{realTimeDashboard.attendancePercentage}%</span>
                </div>
                <div className="progress" style={{ height: '25px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: `${realTimeDashboard.attendancePercentage}%` }}
                  >
                    {realTimeDashboard.attendancePercentage}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Calendar View */}
        <div className="card border shadow-none mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="h5 fw-bold text-dark">Report Generation Calendar</h5>
              <div className="d-flex align-items-center gap-4">
                <button onClick={previousMonth} className="btn btn-outline-secondary">
                  <Icon icon="heroicons:chevron-left" />
                </button>
                <span className="fw-semibold h6 mt-1">{getMonthName(currentDate)}</span>
                <button onClick={nextMonth} className="btn btn-outline-secondary">
                  <Icon icon="heroicons:chevron-right" />
                </button>
              </div>
            </div>
            
            <div className="mb-4 d-flex gap-4 small">
              <div className="d-flex align-items-center gap-2">
                <div className="w-16-px h-16-px bg-success-subtle border border-success rounded"></div>
                <span>Generated (G)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="w-16-px h-16-px bg-warning-subtle border border-warning rounded"></div>
                <span>Pending (P)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="w-16-px h-16-px bg-danger-subtle border border-danger rounded"></div>
                <span>Failed (F)</span>
              </div>
            </div>

            <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {renderCalendar()}
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Generate Report Form */}
          <div className="col-lg-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-bold text-dark">Generate New Report</h2>
                  <button 
                    onClick={() => setShowExportModal(true)}
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <Icon icon="heroicons:plus" className="me-1" />
                    Generate Report
                  </button>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Report Type</label>
                  <select className="form-select">
                    <optgroup label="Daily Reports">
                      <option>Daily Attendance Summary</option>
                      <option>Late Arrivals List</option>
                      <option>Early Departures List</option>
                      <option>Missing Punch Report</option>
                      <option>Shift-wise Attendance</option>
                      <option>Location-wise Attendance</option>
                    </optgroup>
                    <optgroup label="Monthly Reports">
                      <option>Monthly Attendance Register</option>
                      <option>Department-wise Attendance Summary</option>
                      <option>Consolidated Monthly Report</option>
                      <option>Loss of Pay Calculation</option>
                      <option>Overtime Summary</option>
                      <option>WFH Tracking Report</option>
                      <option>Attendance Percentage by Department/Location</option>
                    </optgroup>
                    <optgroup label="Exception Reports">
                      <option>Exception Report</option>
                      <option>Continuous Absence Report</option>
                      <option>Frequent Late Arrivals</option>
                      <option>Pattern-based Anomalies</option>
                      <option>Biometric vs Applied Leave Mismatch</option>
                      <option>Pending Regularization Requests</option>
                      <option>Unapproved Overtime</option>
                      <option>Weekend Working without Approval</option>
                    </optgroup>
                    <optgroup label="Compliance Reports">
                      <option>Compliance Muster Roll</option>
                      <option>Attendance Register for Labor Department</option>
                      <option>Factory Attendance Register</option>
                      <option>Shops & Establishment Act Report</option>
                    </optgroup>
                  </select>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold">Start Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold">End Date</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Department</label>
                  <select className="form-select">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Operations</option>
                  </select>
                </div>

                <div className="alert alert-info">
                  <div className="d-flex align-items-start gap-2">
                    <Icon icon="heroicons:information-circle" className="text-info mt-1" />
                    <div>
                      <p className="fw-medium mb-1">Report Generation Info</p>
                      <p className="small mb-0">Daily reports are auto-generated at 9:00 AM | Monthly reports on 1st of each month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Type Summary */}
          <div className="col-lg-6">
            <div className="card border shadow-none">
              <div className="card-body">
                <h2 className="h5 fw-bold text-dark mb-4">Report Types Summary</h2>
                <div className="mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Daily Reports</span>
                        <span className="h4 fw-bold text-dark">
                          {attendanceReports.filter(r => r.category === 'daily').length}
                        </span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-primary" 
                          style={{
                            width: `${(attendanceReports.filter(r => r.category === 'daily' && r.status === 'generated').length / attendanceReports.filter(r => r.category === 'daily').length) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Generated: {attendanceReports.filter(r => r.category === 'daily' && r.status === 'generated').length}</span>
                        <span>Total: {attendanceReports.filter(r => r.category === 'daily').length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Monthly Reports</span>
                        <span className="h4 fw-bold text-dark">
                          {attendanceReports.filter(r => r.category === 'monthly').length}
                        </span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-success" 
                          style={{
                            width: `${(attendanceReports.filter(r => r.category === 'monthly' && r.status === 'generated').length / attendanceReports.filter(r => r.category === 'monthly').length) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Generated: {attendanceReports.filter(r => r.category === 'monthly' && r.status === 'generated').length}</span>
                        <span>Total: {attendanceReports.filter(r => r.category === 'monthly').length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Exception Reports</span>
                        <span className="h4 fw-bold text-dark">
                          {attendanceReports.filter(r => r.category === 'exception').length}
                        </span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-warning" 
                          style={{
                            width: `${(attendanceReports.filter(r => r.category === 'exception' && r.status === 'generated').length / attendanceReports.filter(r => r.category === 'exception').length) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Generated: {attendanceReports.filter(r => r.category === 'exception' && r.status === 'generated').length}</span>
                        <span>Total: {attendanceReports.filter(r => r.category === 'exception').length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-0">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Compliance Reports</span>
                        <span className="h4 fw-bold text-dark">
                          {attendanceReports.filter(r => r.category === 'compliance').length}
                        </span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-info" 
                          style={{
                            width: `${(attendanceReports.filter(r => r.category === 'compliance' && r.status === 'generated').length / attendanceReports.filter(r => r.category === 'compliance').length) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Generated: {attendanceReports.filter(r => r.category === 'compliance' && r.status === 'generated').length}</span>
                        <span>Total: {attendanceReports.filter(r => r.category === 'compliance').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Category Filter */}
        <div className="card border shadow-none mb-4">
          <div className="card-body">
            <h6 className="mb-3 fw-bold">Report Categories</h6>
            <div className="d-flex flex-wrap gap-2">
              {reportCategories.map((category) => (
                <button
                  key={category.id}
                  className={`btn ${selectedReportCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedReportCategory(category.id)}
                >
                  <Icon icon={category.icon} className="me-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="card border shadow-none mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h5 fw-bold text-dark">
                {selectedReportCategory === 'all' ? 'All Attendance Reports' :
                 selectedReportCategory === 'daily' ? 'Daily Reports' :
                 selectedReportCategory === 'monthly' ? 'Monthly Reports' :
                 selectedReportCategory === 'exception' ? 'Exception Reports' :
                 'Compliance Reports'}
              </h2>
              <div className="d-flex align-items-center gap-3">
                <select 
                  className="form-select w-auto"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
                <input 
                  type="date" 
                  className="form-control w-auto"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Report Name</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Category</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Date</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Generated At</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Department</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Details</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted text-center">Status</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-4 py-3">
                        <div className="fw-medium text-dark">{report.reportName}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge bg-${
                          report.category === 'daily' ? 'primary' :
                          report.category === 'monthly' ? 'success' :
                          report.category === 'exception' ? 'warning' :
                          'info'
                        }`}>
                          {report.category?.charAt(0).toUpperCase() + report.category?.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{report.date}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{report.generated}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{report.department}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted small">
                          {report.totalEmployees && `${report.totalEmployees} employees`}
                          {report.lateArrivals && ` • ${report.lateArrivals} late arrivals`}
                          {report.earlyDepartures && ` • ${report.earlyDepartures} early departures`}
                          {report.missingPunches && ` • ${report.missingPunches} missing punches`}
                          {report.exceptions && ` • ${report.exceptions} exceptions`}
                          {report.format && ` • ${report.format} format`}
                          {report.totalOvertimeHours && ` • ${report.totalOvertimeHours} OT hours`}
                          {report.totalWFHDays && ` • ${report.totalWFHDays} WFH days`}
                        </div>
                      </td>
                      <td className="px-4 py-3" style={{width:"30px"}}>
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                            onClick={() => handleViewReport(report)}
                          >
                            <Icon icon="heroicons:eye" style={{ fontSize: '12px' }} />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                            onClick={() => handleExportReport(report.id)}
                            disabled={report.status === 'pending'}
                          >
                            <Icon icon="heroicons:arrow-down-tray" style={{ fontSize: '12px' }} />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                            onClick={() => handlePrintReport(report.id)}
                            disabled={report.status === 'pending'}
                          >
                            <Icon icon="heroicons:printer" style={{ fontSize: '12px' }} />
                          </button>
                          {report.status === 'pending' && (
                            <button 
                              className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1"
                              onClick={() => handleGenerateReport(report.id)}
                            >
                              <Icon icon="heroicons:play" style={{ fontSize: '12px' }} />
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

        {/* Report History Table */}
        <div className="card border shadow-none mt-4">
          <div className="card-body">
            <h2 className="h5 fw-bold text-dark mb-4">Report Generation History</h2>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Report Type</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">From Date</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">To Date</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Generated By</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">File Size</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted text-center">Status</th>
                    <th className="border-0 px-4 py-3 text-uppercase small fw-semibold text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reportsHistory.map((report) => (
                    <tr key={report.id}>
                      <td className="px-4 py-3">
                        <div className="fw-medium text-dark">{report.type}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{new Date(report.from).toLocaleDateString('en-GB')}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{new Date(report.to).toLocaleDateString('en-GB')}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{report.generatedBy}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{report.size}</div>
                      </td>
                      <td className="px-4 py-3" style={{width:"30px"}}>
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            const matchingReport = attendanceReports.find(r => 
                              r.reportName === report.type || 
                              r.id === report.id
                            );
                            if (matchingReport) {
                              handleViewReport(matchingReport);
                            } else {
                              handleViewReport(report);
                            }
                          }}
                        >
                          View
                        </button>
                        {report.status === 'Pending' && (
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteReport(report.id)}
                          >
                            Cancel
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

        {/* Generate Report Modal */}
        {showExportModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Generate New Report</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowExportModal(false)}
                  ></button>
                </div>
                
                <form onSubmit={handleReportSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Report Type</label>
                      <select 
                        value={reportForm.reportType}
                        onChange={(e) => setReportForm({...reportForm, reportType: e.target.value})}
                        className="form-select"
                        required
                      >
                        <optgroup label="Daily Reports">
                          <option>Daily Attendance Summary</option>
                          <option>Late Arrivals List</option>
                          <option>Early Departures List</option>
                          <option>Missing Punch Report</option>
                          <option>Shift-wise Attendance</option>
                          <option>Location-wise Attendance</option>
                        </optgroup>
                        <optgroup label="Monthly Reports">
                          <option>Monthly Attendance Register</option>
                          <option>Department-wise Attendance Summary</option>
                          <option>Consolidated Monthly Report</option>
                          <option>Loss of Pay Calculation</option>
                          <option>Overtime Summary</option>
                          <option>WFH Tracking Report</option>
                          <option>Attendance Percentage by Department/Location</option>
                        </optgroup>
                        <optgroup label="Exception Reports">
                          <option>Exception Report</option>
                          <option>Continuous Absence Report</option>
                          <option>Frequent Late Arrivals</option>
                          <option>Pattern-based Anomalies</option>
                          <option>Biometric vs Applied Leave Mismatch</option>
                          <option>Pending Regularization Requests</option>
                          <option>Unapproved Overtime</option>
                          <option>Weekend Working without Approval</option>
                        </optgroup>
                        <optgroup label="Compliance Reports">
                          <option>Compliance Muster Roll</option>
                          <option>Attendance Register for Labor Department</option>
                          <option>Factory Attendance Register</option>
                          <option>Shops & Establishment Act Report</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label">Start Date</label>
                        <input 
                          type="date" 
                          value={reportForm.dateRange.split(' to ')[0]}
                          onChange={(e) => {
                            const dates = reportForm.dateRange.split(' to ');
                            dates[0] = e.target.value;
                            setReportForm({...reportForm, dateRange: dates.join(' to ')});
                          }}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">End Date</label>
                        <input 
                          type="date" 
                          value={reportForm.dateRange.split(' to ')[1] || ''}
                          onChange={(e) => {
                            const dates = reportForm.dateRange.split(' to ');
                            dates[1] = e.target.value;
                            setReportForm({...reportForm, dateRange: dates.join(' to ')});
                          }}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Department (Optional)</label>
                      <input 
                        type="text"
                        value={reportForm.department}
                        onChange={(e) => setReportForm({...reportForm, department: e.target.value})}
                        placeholder="Enter department name..."
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Reason/Comments</label>
                      <textarea 
                        rows="3"
                        value={reportForm.reason}
                        onChange={(e) => setReportForm({...reportForm, reason: e.target.value})}
                        placeholder="Enter reason for report generation..."
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button 
                      type="button"
                      onClick={() => setShowExportModal(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary"
                    >
                      Generate Report
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Report Details Modal */}
        {showViewModal && selectedReport && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:document-text" className="text-primary" />
                    Report Details
                  </h6>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeViewModal}
                  ></button>
                </div>
                
                <div className="modal-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="fw-semibold text-dark mb-3">Report Information</h6>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Report Name</label>
                            <p className="form-control-plaintext fw-semibold">{selectedReport.reportName || selectedReport.type}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Date/Period</label>
                            <p className="form-control-plaintext fw-semibold">
                              {selectedReport.date || `${new Date(selectedReport.from).toLocaleDateString()} to ${new Date(selectedReport.to).toLocaleDateString()}`}
                            </p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Status</label>
                            <div style={{width:"40px"}}>
                              {getStatusBadge(selectedReport.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="fw-semibold text-dark mb-3">Additional Information</h6>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Department</label>
                            <p className="form-control-plaintext fw-semibold">
                              {selectedReport.department || 'All Departments'}
                            </p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-medium text-muted">Generated At</label>
                            <p className="form-control-plaintext fw-semibold">
                              {selectedReport.generated || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {selectedReport.size && (
                            <div className="mb-3">
                              <label className="form-label fw-medium text-muted">File Size</label>
                              <p className="form-control-plaintext fw-semibold">{selectedReport.size}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="card border">
                      <div className="card-body">
                        <h6 className="fw-semibold text-dark mb-3">Report Statistics</h6>
                        <div className="row g-3">
                          {selectedReport.totalEmployees && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-primary fw-bold fs-4">{selectedReport.totalEmployees}</div>
                                  <div className="text-muted small">Total Employees</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.present && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-success fw-bold fs-4">{selectedReport.present}</div>
                                  <div className="text-muted small">Present</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.absent && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-danger fw-bold fs-4">{selectedReport.absent}</div>
                                  <div className="text-muted small">Absent</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.onLeave && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-warning fw-bold fs-4">{selectedReport.onLeave}</div>
                                  <div className="text-muted small">On Leave</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.lateArrivals && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-info fw-bold fs-4">{selectedReport.lateArrivals}</div>
                                  <div className="text-muted small">Late Arrivals</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.avgDelay && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-secondary fw-bold fs-4">{selectedReport.avgDelay}</div>
                                  <div className="text-muted small">Avg Delay</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.earlyDepartures && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-info fw-bold fs-4">{selectedReport.earlyDepartures}</div>
                                  <div className="text-muted small">Early Departures</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.missingPunches && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-warning fw-bold fs-4">{selectedReport.missingPunches}</div>
                                  <div className="text-muted small">Missing Punches</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.totalOvertimeHours && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-success fw-bold fs-4">{selectedReport.totalOvertimeHours}</div>
                                  <div className="text-muted small">OT Hours</div>
                                </div>
                              </div>
                            </div>
                          )}
                          {selectedReport.totalWFHDays && (
                            <div className="col-md-3">
                              <div className="card border text-center">
                                <div className="card-body">
                                  <div className="text-primary fw-bold fs-4">{selectedReport.totalWFHDays}</div>
                                  <div className="text-muted small">WFH Days</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Report Categories */}
                  <div className="mt-4">
                    <div className="card bg-light border">
                      <div className="card-body">
                        <h6 className="fw-semibold text-dark mb-3">Report Categories</h6>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className="d-flex align-items-center gap-2">
                              <Icon icon="heroicons:calendar" className="text-primary" />
                              <div>
                                <span className="small text-muted">Report Type:</span>
                                <div className="small fw-medium">
                                  {selectedReport.reportName?.includes('Daily') ? 'Daily Report' : 
                                   selectedReport.reportName?.includes('Monthly') ? 'Monthly Report' :
                                   selectedReport.reportName?.includes('Exception') ? 'Exception Report' :
                                   selectedReport.reportName?.includes('Compliance') ? 'Compliance Report' : 'Other Report'}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex align-items-center gap-2">
                              <Icon icon="heroicons:building-office" className="text-success" />
                              <div>
                                <span className="small text-muted">Scope:</span>
                                <div className="small fw-medium">
                                  {selectedReport.department === 'All' ? 'Organization-wide' : 'Department-specific'}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex align-items-center gap-2">
                              <Icon icon="heroicons:clock" className="text-warning" />
                              <div>
                                <span className="small text-muted">Generation Time:</span>
                                <div className="small fw-medium">{selectedReport.generated || 'Scheduled'}</div>
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
                    onClick={closeViewModal}
                    className="btn btn-secondary"
                  >
                    Close
                  </button>
                  {selectedReport.status === 'pending' || selectedReport.status === 'Pending' ? (
                    <button 
                      type="button"
                      onClick={() => {
                        handleGenerateReport(selectedReport.id);
                        closeViewModal();
                      }}
                      className="btn btn-outline-warning"
                    >
                      <Icon icon="heroicons:play" className="me-1" />
                      Generate Now
                    </button>
                  ) : (
                    <>
                      <button 
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => {
                          const reportId = selectedReport.id || attendanceReports.find(r => r.reportName === selectedReport.type)?.id;
                          if (reportId) handleExportReport(reportId);
                        }}
                      >
                        <Icon icon="heroicons:arrow-down-tray" className="me-1" />
                        Export
                      </button>
                      <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          const reportId = selectedReport.id || attendanceReports.find(r => r.reportName === selectedReport.type)?.id;
                          if (reportId) handlePrintReport(reportId);
                        }}
                      >
                        <Icon icon="heroicons:printer" className="me-1" />
                        Print
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default AttendanceReports;