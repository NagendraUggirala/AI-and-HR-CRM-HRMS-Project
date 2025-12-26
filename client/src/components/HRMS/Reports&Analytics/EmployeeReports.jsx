import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Printer, 
  BarChart3, 
  Users, 
  TrendingDown, 
  TrendingUp, 
  UserPlus,
  MoveRight,
  Calendar,
  Building,
  Briefcase,
  PieChart,
  Clock
} from 'lucide-react';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const EmployeeReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [reportData, setReportData] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    headcount: true,
    attrition: false,
    joining: true,
    movement: false
  });

  // Sample data for reports
  const headcountData = [
    { id: 1, department: 'Engineering', location: 'Bangalore', headcount: 150, growth: 12, male: 110, female: 40, permanent: 130, contract: 20 },
    { id: 2, department: 'Sales', location: 'Mumbai', headcount: 85, growth: 8, male: 55, female: 30, permanent: 70, contract: 15 },
    { id: 3, department: 'Marketing', location: 'Delhi', headcount: 45, growth: 15, male: 25, female: 20, permanent: 40, contract: 5 },
    { id: 4, department: 'HR', location: 'Bangalore', headcount: 25, growth: 5, male: 10, female: 15, permanent: 22, contract: 3 },
    { id: 5, department: 'Finance', location: 'Chennai', headcount: 35, growth: -2, male: 20, female: 15, permanent: 30, contract: 5 },
    { id: 6, department: 'Operations', location: 'Hyderabad', headcount: 65, growth: 10, male: 45, female: 20, permanent: 55, contract: 10 },
  ];

  const attritionData = [
    { id: 1, department: 'Engineering', location: 'Bangalore', total: 120, voluntary: 80, involuntary: 40, attritionRate: 15.2, avgTenure: 2.5 },
    { id: 2, department: 'Sales', location: 'Mumbai', total: 25, voluntary: 15, involuntary: 10, attritionRate: 8.5, avgTenure: 1.8 },
    { id: 3, department: 'Marketing', location: 'Delhi', total: 12, voluntary: 8, involuntary: 4, attritionRate: 5.2, avgTenure: 3.2 },
    { id: 4, department: 'Operations', location: 'Hyderabad', total: 18, voluntary: 12, involuntary: 6, attritionRate: 7.1, avgTenure: 2.8 },
  ];

  const onboardingData = [
    { id: 1, department: 'Engineering', location: 'Bangalore', newJoiners: 25, accepted: 22, declined: 3, timeToJoin: 15, onboardingComplete: 20, probationComplete: 18 },
    { id: 2, department: 'Sales', location: 'Mumbai', newJoiners: 12, accepted: 10, declined: 2, timeToJoin: 10, onboardingComplete: 9, probationComplete: 8 },
    { id: 3, department: 'Marketing', location: 'Delhi', newJoiners: 8, accepted: 7, declined: 1, timeToJoin: 12, onboardingComplete: 6, probationComplete: 5 },
  ];

  const movementData = [
    { id: 1, type: 'Promotion', employee: 'Rajesh Kumar', from: 'Senior Engineer', to: 'Tech Lead', department: 'Engineering', date: '2024-01-15' },
    { id: 2, type: 'Transfer', employee: 'Priya Sharma', from: 'Bangalore', to: 'Mumbai', department: 'Sales', date: '2024-01-10' },
    { id: 3, type: 'Designation Change', employee: 'Arun Patel', from: 'Analyst', to: 'Senior Analyst', department: 'Finance', date: '2024-01-05' },
    { id: 4, type: 'Department Change', employee: 'Sneha Reddy', from: 'Marketing', to: 'Product', department: 'Product', date: '2024-01-03' },
  ];

  // KPI Metrics
  const kpiMetrics = {
    totalHeadcount: 1480,
    activeEmployees: 1420,
    newJoiners: 65,
    attritionRate: 8.2,
    retentionRate: 91.8,
    avgTimeToJoin: 14,
    promotionRate: 12.5,
    onboardingCompletion: 88.3
  };

  const reports = [
    { id: 'headcount', name: 'Headcount & Demographics', icon: <Users size={16} />, color: 'primary' },
    { id: 'attrition', name: 'Attrition Analytics', icon: <TrendingDown size={16} />, color: 'danger' },
    { id: 'joining', name: 'Joining & Onboarding', icon: <UserPlus size={16} />, color: 'success' },
    { id: 'movement', name: 'Employee Movement', icon: <MoveRight size={16} />, color: 'warning' },
  ];

  const departments = ['All Departments', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
  const locations = ['All Locations', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleExportReport = (type) => {
    const data = {
      headcount: headcountData,
      attrition: attritionData,
      joining: onboardingData,
      movement: movementData
    };

    const csv = [
      ['Report Type', type.toUpperCase()],
      ['Generated On', new Date().toLocaleDateString()],
      [],
      ...data[type].map(item => Object.values(item))
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderReportSection = (title, section, data, columns, actions = true) => {
    return (
      <div className="card border shadow-none mb-4">
        <div 
          className="card-header d-flex justify-content-between align-items-center cursor-pointer" 
          onClick={() => toggleSection(section)}
        >
          <div>
            <h6 className="mb-0">{title}</h6>
          </div>
          <div className="d-flex align-items-center gap-2">
            {actions && (
              <>
                <button 
                  className="btn btn-sm btn-outline-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExportReport(section);
                  }}
                >
                  <Download size={14} className="me-1" /> Export
                </button>
              </>
            )}
            <span className={`transform ${expandedSections[section] ? 'rotate-180' : ''}`}>
              <i className="ri-arrow-down-s-line"></i>
            </span>
          </div>
        </div>
        {expandedSections[section] && (
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index} className="text-start">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      {Object.values(item).slice(1).map((value, idx) => (
                        <td key={idx} className="text-start">
                          {typeof value === 'number' && value < 10 ? value.toFixed(1) : value}
                          {idx === columns.length - 2 && value.toString().includes('%') && ' %'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Wrap the entire content with RecruiterDashboardLayout
  return (
    
      <div className="container-fluid py-4">
        {/* Page Header */}
        <div className="mb-4">
          <h5 className="mb-2"><i className='ri-bar-chart-line m-2'></i>Employee Reports & Analytics</h5>
          <p className="text-secondary-light mb-0">Comprehensive workforce analytics and insights dashboard.</p>
        </div>

        {/* KPI Summary */}
        <div className="row mb-4">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border shadow-none h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 rounded p-3 me-3">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="fw-bold text-secondary-light small">Total Headcount</div>
                    <div className="h4 mb-0">{kpiMetrics.totalHeadcount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border shadow-none h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 rounded p-3 me-3">
                    <TrendingUp className="text-success" size={24} />
                  </div>
                  <div>
                    <div className="fw-bold text-secondary-light small">Retention Rate</div>
                    <div className="h4 mb-0">{kpiMetrics.retentionRate}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border shadow-none h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-danger bg-opacity-10 rounded p-3 me-3">
                    <TrendingDown className="text-danger" size={24} />
                  </div>
                  <div>
                    <div className="fw-bold text-secondary-light small">Attrition Rate</div>
                    <div className="h4 mb-0">{kpiMetrics.attritionRate}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border shadow-none h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-warning bg-opacity-10 rounded p-3 me-3">
                    <Clock className="text-warning" size={24} />
                  </div>
                  <div>
                    <div className="fw-bold text-secondary-light small">Avg Time to Join</div>
                    <div className="h4 mb-0">{kpiMetrics.avgTimeToJoin} days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="card border shadow-none mb-4">
          <div className="card-body">
            <h6 className="mb-3">Report Categories</h6>
            <div className="row g-3">
              {reports.map((report) => (
                <div className="col-md-3 col-sm-6" key={report.id}>
                  <div 
                    className={`card border cursor-pointer ${selectedReport === report.id ? 'border-primary border-2' : ''}`}
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <div className="card-body text-center">
                      <div className={`mb-2 text-${report.color}`}>
                        {report.icon}
                      </div>
                      <div className="fw-medium">{report.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card border shadow-none mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search size={16} className="text-muted" />
                  </span>
                  <input 
                    className="form-control" 
                    placeholder="Search reports..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept === 'All Departments' ? 'all' : dept.toLowerCase()}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc === 'All Locations' ? 'all' : loc.toLowerCase()}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <div className="d-flex gap-2">
                  <button className="btn btn-dark w-100" onClick={handlePrint}>
                    <Printer size={14} className="me-2" /> Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Sections */}
        {renderReportSection(
          'Headcount & Demographics Reports',
          'headcount',
          headcountData,
          ['Department', 'Location', 'Headcount', 'Growth %', 'Male', 'Female', 'Permanent', 'Contract']
        )}

        {renderReportSection(
          'Attrition Analytics Reports',
          'attrition',
          attritionData,
          ['Department', 'Location', 'Total', 'Voluntary', 'Involuntary', 'Attrition Rate', 'Avg Tenure']
        )}

        {renderReportSection(
          'Joining & Onboarding Reports',
          'joining',
          onboardingData,
          ['Department', 'Location', 'New Joiners', 'Accepted', 'Declined', 'Time to Join', 'Onboarding Complete', 'Probation Complete']
        )}

        {renderReportSection(
          'Employee Movement Reports',
          'movement',
          movementData,
          ['Type', 'Employee', 'From', 'To', 'Department', 'Date']
        )}

        {/* Additional Analytics */}
        <div className="card border shadow-none mb-4">
          <div className="card-header">
            <h6 className="mb-0">Additional Analytics & Insights</h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Retention Rate Metrics</span>
                    <span className="badge bg-success">Available</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Replacement Cost Analysis</span>
                    <span className="badge bg-success">Available</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Age Distribution Analysis</span>
                    <span className="badge bg-success">Available</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Gender Diversity Chart</span>
                    <span className="badge bg-success">Available</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Department Strength Over Time</span>
                    <span className="badge bg-success">Available</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Tenure Distribution</span>
                    <span className="badge bg-success">Available</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Attrition Trends & Forecasting</span>
                    <span className="badge bg-warning">In Progress</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Exit Interview Insights</span>
                    <span className="badge bg-success">Available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="row mb-4">
          <div className="col-md-3 col-6">
            <div className="card border shadow-none text-center">
              <div className="card-body">
                <div className="text-secondary-light small">Offer Acceptance Rate</div>
                <div className="h5 mb-0">84.5%</div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border shadow-none text-center">
              <div className="card-body">
                <div className="text-secondary-light small">Onboarding Completion</div>
                <div className="h5 mb-0">88.3%</div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border shadow-none text-center">
              <div className="card-body">
                <div className="text-secondary-light small">Probation Completion</div>
                <div className="h5 mb-0">92.1%</div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border shadow-none text-center">
              <div className="card-body">
                <div className="text-secondary-light small">First Year Attrition</div>
                <div className="h5 mb-0">18.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default EmployeeReports;