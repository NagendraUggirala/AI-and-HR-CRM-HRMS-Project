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

  const [attendanceReports, setAttendanceReports] = useState([
    {
      id: 1,
      reportName: 'Daily Attendance Summary',
      date: '2024-01-15',
      generated: '09:00 AM',
      totalEmployees: 1480,
      present: 1420,
      absent: 45,
      onLeave: 35,
      status: 'generated',
      department: 'All'
    },
    {
      id: 2,
      reportName: 'Late Arrivals List',
      date: '2024-01-15',
      generated: '10:30 AM',
      lateArrivals: 12,
      avgDelay: '25 mins',
      department: 'Engineering',
      status: 'generated',
      location: 'Bangalore'
    },
    {
      id: 3,
      reportName: 'Monthly Attendance Register',
      date: '2024-01-01',
      generated: '08:45 AM',
      totalEmployees: 1480,
      avgAttendance: '94.2%',
      department: 'All',
      status: 'generated',
      month: 'January 2024'
    },
    {
      id: 4,
      reportName: 'Exception Report',
      date: '2024-01-15',
      generated: '11:15 AM',
      exceptions: 18,
      pendingCases: 8,
      department: 'All',
      status: 'pending',
      location: 'All'
    },
    {
      id: 5,
      reportName: 'Compliance Muster Roll',
      date: '2024-01-31',
      generated: '06:00 PM',
      format: 'Factory Act',
      department: 'All',
      status: 'generated',
      period: 'January 2024'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = ['all', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'All'];

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
    const matchesDate = report.date === selectedDate;
    const matchesDepartment = filterDepartment === 'all' || report.department === filterDepartment;
    return matchesDate && matchesDepartment;
  });

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
                    <h6 className="small text-muted fw-medium mb-1">Today's Reports and  Analytics</h6>
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
                    <p className="h5 text-dark mb-0">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <option>Daily Attendance Summary</option>
                    <option>Monthly Attendance Register</option>
                    <option>Late Arrivals List</option>
                    <option>Exception Report</option>
                    <option>Compliance Muster Roll</option>
                    <option>WFH Tracking Report</option>
                    <option>Overtime Summary</option>
                    <option>Department-wise Summary</option>
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
                        <span className="h4 fw-bold text-dark">3</span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div className="progress-bar bg-primary" style={{width: '100%'}}></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Generated: 3</span>
                        <span>Total: 3</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Monthly Reports</span>
                        <span className="h4 fw-bold text-dark">1</span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div className="progress-bar bg-success" style={{width: '50%'}}></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Generated: 1</span>
                        <span>Total: 2</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-0">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium text-muted">Compliance Reports</span>
                        <span className="h4 fw-bold text-dark">1</span>
                      </div>
                      <div className="progress mb-2" style={{ height: '8px' }}>
                        <div className="progress-bar bg-warning" style={{width: '100%'}}></div>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Generated: 1</span>
                        <span>Total: 1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="card border shadow-none mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h5 fw-bold text-dark">Today's Attendance Reports</h2>
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
                        <div className="text-muted">{report.date}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{report.generated}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{report.department}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">
                          {report.totalEmployees && `${report.totalEmployees} employees`}
                          {report.lateArrivals && `${report.lateArrivals} late arrivals`}
                          {report.exceptions && `${report.exceptions} exceptions`}
                          {report.format && `${report.format} format`}
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
                        <option>Daily Attendance Summary</option>
                        <option>Monthly Attendance Register</option>
                        <option>Late Arrivals List</option>
                        <option>Exception Report</option>
                        <option>Compliance Muster Roll</option>
                        <option>WFH Tracking Report</option>
                        <option>Overtime Summary</option>
                        <option>Department-wise Summary</option>
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