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
  AlertCircle
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

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

  const menuItems = [
    { title: 'Dashboard', link: '/recruiter/dashboard', active: false },
    { title: 'Job Openings', link: '/recruiter/jobs', active: false },
    { title: 'Candidates', link: '/recruiter/candidates' },
    { title: 'Interviews', link: '/recruiter/interviews' },
    { title: 'Pre-Joining', link: '/recruiter/pre-joining' },
    { title: 'Onboarding', link: '/recruiter/onboarding' },
    { title: 'Reports', link: '/recruiter/reports' },
    { title: 'Exit Management', link: '/recruiter/exit-management', active: true }
  ];

  const userInfo = {
    name: 'Sarah Johnson',
    role: 'HR Head',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  };

  // Sample data (same as before)
  const exitCases = [
    { id: 1, employeeId: 'EMP001', employeeName: 'Rahul Sharma', department: 'Engineering', role: 'Senior Software Engineer', resignationDate: '2024-03-01', lastWorkingDay: '2024-04-15', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Better opportunity', clearanceProgress: 40, pendingClearances: ['IT', 'Finance', 'HR'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'In Progress', exitInterview: 'Scheduled', settlement: 'Pending' },
    { id: 2, employeeId: 'EMP002', employeeName: 'Priya Patel', department: 'Marketing', role: 'Marketing Manager', resignationDate: '2024-02-15', lastWorkingDay: '2024-03-30', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Career growth', clearanceProgress: 75, pendingClearances: ['Admin'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'Completed', exitInterview: 'Completed', settlement: 'In Progress' },
    { id: 3, employeeId: 'EMP003', employeeName: 'Amit Kumar', department: 'Sales', role: 'Sales Executive', resignationDate: '2024-01-20', lastWorkingDay: '2024-02-29', noticePeriod: '30 days', exitType: 'Termination', exitReason: 'Performance', clearanceProgress: 100, pendingClearances: [], status: 'Completed', escalationLevel: 0, knowledgeTransfer: 'Completed', exitInterview: 'Completed', settlement: 'Completed' },
    { id: 4, employeeId: 'EMP004', employeeName: 'Sneha Reddy', department: 'HR', role: 'HR Executive', resignationDate: '2024-03-10', lastWorkingDay: '2024-04-25', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Higher studies', clearanceProgress: 25, pendingClearances: ['IT', 'Admin', 'Finance', 'HR', 'Department'], status: 'Pending', escalationLevel: 1, knowledgeTransfer: 'Pending', exitInterview: 'Pending', settlement: 'Pending' },
    { id: 5, employeeId: 'EMP005', employeeName: 'Rajesh Verma', department: 'Finance', role: 'Finance Analyst', resignationDate: '2024-02-28', lastWorkingDay: '2024-04-12', noticePeriod: '45 days', exitType: 'Retirement', exitReason: 'Retirement', clearanceProgress: 90, pendingClearances: ['IT'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'In Progress', exitInterview: 'Scheduled', settlement: 'In Progress' },
    { id: 6, employeeId: 'EMP006', employeeName: 'Meera Joshi', department: 'Engineering', role: 'Frontend Developer', resignationDate: '2024-03-05', lastWorkingDay: '2024-04-19', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Relocation', clearanceProgress: 60, pendingClearances: ['Finance', 'Admin'], status: 'In Progress', escalationLevel: 0, knowledgeTransfer: 'In Progress', exitInterview: 'Scheduled', settlement: 'Pending' },
    { id: 7, employeeId: 'EMP007', employeeName: 'Vikram Singh', department: 'Operations', role: 'Operations Manager', resignationDate: '2024-01-15', lastWorkingDay: '2024-01-31', noticePeriod: 'Immediate', exitType: 'Termination', exitReason: 'Policy violation', clearanceProgress: 100, pendingClearances: [], status: 'Completed', escalationLevel: 2, knowledgeTransfer: 'Not Required', exitInterview: 'Not Conducted', settlement: 'Completed' },
    { id: 8, employeeId: 'EMP008', employeeName: 'Anjali Gupta', department: 'Marketing', role: 'Content Writer', resignationDate: '2024-03-12', lastWorkingDay: '2024-04-26', noticePeriod: '45 days', exitType: 'Resignation', exitReason: 'Better opportunity', clearanceProgress: 30, pendingClearances: ['IT', 'Admin', 'HR'], status: 'Pending', escalationLevel: 0, knowledgeTransfer: 'Pending', exitInterview: 'Pending', settlement: 'Pending' }
  ];

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
                          filteredSettlements;
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

  // Filter data
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

  // Get current items
  const getCurrentItems = () => {
    if (viewMode === 'exitCases') return filteredExits;
    if (viewMode === 'alumni') return filteredAlumni;
    return filteredSettlements;
  };

  const currentItems = getCurrentItems();
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItemsPage = currentItems.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, viewMode]);

  const handleExport = () => {
    // Export logic
    alert('Export functionality');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleViewExit = (exitId) => {
    if (viewMode === 'exitCases') {
      const exit = exitCases.find(e => e.id === exitId);
      if (exit) {
        setSelectedExit(exit);
        setShowClearanceModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowClearanceModal(false);
    setSelectedExit(null);
  };

  // Responsive table rendering functions
  const renderExitCasesTable = () => (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{width: 40}} className="text-center d-none d-md-table-cell">
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
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style={{width: '36px', height: '36px', fontSize: '12px'}}>
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
                    <div className="progress" style={{height: '6px'}}>
                      <div 
                        className={`progress-bar ${getProgressColor(exit.clearanceProgress)}`} 
                        style={{width: `${exit.clearanceProgress}%`}}
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
                  <button type="button" className="btn btn-icon btn-light p-1 d-none d-md-inline" title="Interview">
                    <MessageSquare size={14} />
                  </button>
                  <button type="button" className="btn btn-icon btn-light p-1 d-none d-md-inline" title="Transfer">
                    <Share2 size={14} />
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
            <th style={{width: 40}} className="text-center d-none d-md-table-cell">
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
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style={{width: '36px', height: '36px', fontSize: '12px'}}>
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
                <div className="progress" style={{height: '6px'}}>
                  <div 
                    className={`progress-bar ${alumni.engagementLevel === 'High' ? 'bg-success' : alumni.engagementLevel === 'Medium' ? 'bg-warning' : 'bg-danger'}`} 
                    style={{width: alumni.engagementLevel === 'High' ? '80%' : alumni.engagementLevel === 'Medium' ? '50%' : '30%'}}
                  ></div>
                </div>
                <small className="text-muted d-none d-xxl-block">{alumni.engagementLevel}</small>
              </td>
              <td className="text-center">
                <div className="btn-group btn-group-sm" role="group">
                  <button type="button" className="btn btn-icon btn-light p-1" title="View">
                    <Eye size={14} />
                  </button>
                  <button type="button" className="btn btn-icon btn-light p-1 d-none d-md-inline" title="Message">
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
            <th style={{width: 40}} className="text-center d-none d-md-table-cell">
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
                  <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3" style={{width: '36px', height: '36px', fontSize: '12px'}}>
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
                  <button type="button" className="btn btn-icon btn-light p-1" title="View">
                    <Eye size={14} />
                  </button>
                  <button type="button" className="btn btn-icon btn-light p-1 d-none d-md-inline" title="Download">
                    <Download size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const mainContent = (
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
          <button 
            className="btn btn-dark d-flex align-items-center gap-2 btn-sm" 
            onClick={handleExport}
            title="Export"
          >
            <Download size={14} />
            <span className="d-none d-sm-inline">Export</span>
          </button>
          
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
              className="btn btn-outline-primary btn-sm d-none d-md-inline-flex flex-grow-1 flex-lg-grow-0"
              onClick={() => alert('Exit Trends Analysis')}
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

      {/* Search and Filters - Responsive */}
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

      {/* Bulk Actions Bar - Responsive */}
      {selectedExits.length > 0 && (
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
      <div className="card border shadow-none mb-4">
        <div className="card-body p-0">
          {viewMode === 'exitCases' && renderExitCasesTable()}
          {viewMode === 'alumni' && renderAlumniTable()}
          {viewMode === 'settlements' && renderSettlementsTable()}
        </div>
      </div>

      {/* Pagination - Responsive */}
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4 gap-3">
        <div className="order-2 order-sm-1">
          <small className="text-secondary-light">
            Showing <strong>{startIndex+1}</strong> to <strong>{Math.min(endIndex, currentItems.length)}</strong> of <strong>{currentItems.length}</strong>
          </small>
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center gap-3 order-1 order-sm-2">
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-outline-secondary btn-sm" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            
            <div className="d-none d-sm-flex gap-1">
              {[...Array(Math.min(3, totalPages))].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button 
                    key={pageNum}
                    className={pageNum === currentPage ? 'btn btn-primary btn-sm' : 'btn btn-outline-secondary btn-sm'} 
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 3 && (
                <>
                  <span className="px-2">...</span>
                  <button 
                    className={totalPages === currentPage ? 'btn btn-primary btn-sm' : 'btn btn-outline-secondary btn-sm'} 
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button 
              className="btn btn-outline-secondary btn-sm" 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          <select 
            className="form-select form-select-sm w-auto" 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Clearance Details Modal - Responsive */}
      {showClearanceModal && selectedExit && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Clearance Details - {selectedExit.employeeName}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <h6 className="card-title">Employee Info</h6>
                        <div className="row">
                          <div className="col-6">
                            <small className="text-muted">Employee ID</small>
                            <div className="fw-bold small">{selectedExit.employeeId}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Department</small>
                            <div className="fw-bold small">{selectedExit.department}</div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-6">
                            <small className="text-muted">Role</small>
                            <div className="fw-bold small">{selectedExit.role}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Last Day</small>
                            <div className="fw-bold small">{selectedExit.lastWorkingDay}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <h6 className="card-title">Clearance Progress</h6>
                        <div className="d-flex align-items-center gap-3">
                          <div className="flex-grow-1">
                            <div className="progress" style={{height: '8px'}}>
                              <div 
                                className={`progress-bar ${getProgressColor(selectedExit.clearanceProgress)}`} 
                                style={{width: `${selectedExit.clearanceProgress}%`}}
                              ></div>
                            </div>
                          </div>
                          <div className="h4 fw-bold">{selectedExit.clearanceProgress}%</div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <small className="text-muted">Progress</small>
                          <small className="text-muted">{selectedExit.pendingClearances.length} pending</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border mb-4">
                  <div className="card-header">
                    <h6 className="mb-0">Department Clearance</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-2">
                      {['IT', 'Admin', 'Finance', 'HR', 'Department'].map((dept, index) => (
                        <div key={index} className="col-12 col-md-6">
                          <div className="card border">
                            <div className="card-body p-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <h6 className="mb-0 small">{dept}</h6>
                                <span className={`badge ${selectedExit.pendingClearances.includes(dept) ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'}`}>
                                  {selectedExit.pendingClearances.includes(dept) ? 'Pending' : 'Completed'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-12 col-md-4">
                    <div className="card border">
                      <div className="card-body text-center p-2">
                        <div className="mb-1">
                          <i className="bi bi-chat-dots text-primary fs-5"></i>
                        </div>
                        <h6 className="small">Exit Interview</h6>
                        <span className={`badge ${getStatusBadge(selectedExit.exitInterview)} small`}>
                          {selectedExit.exitInterview}
                        </span>
                        <button className="btn btn-sm btn-outline-primary w-100 mt-2">
                          {selectedExit.exitInterview === 'Pending' ? 'Schedule' : 'View'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="card border">
                      <div className="card-body text-center p-2">
                        <div className="mb-1">
                          <i className="bi bi-share text-warning fs-5"></i>
                        </div>
                        <h6 className="small">Knowledge Transfer</h6>
                        <span className={`badge ${getStatusBadge(selectedExit.knowledgeTransfer)} small`}>
                          {selectedExit.knowledgeTransfer}
                        </span>
                        <button className="btn btn-sm btn-outline-primary w-100 mt-2">
                          {selectedExit.knowledgeTransfer === 'Pending' ? 'Initiate' : 'View'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="card border">
                      <div className="card-body text-center p-2">
                        <div className="mb-1">
                          <i className="bi bi-cash text-success fs-5"></i>
                        </div>
                        <h6 className="small">Settlement</h6>
                        <span className={`badge ${getStatusBadge(selectedExit.settlement)} small`}>
                          {selectedExit.settlement}
                        </span>
                        <button className="btn btn-sm btn-outline-primary w-100 mt-2">
                          {selectedExit.settlement === 'Pending' ? 'Calculate' : 'View'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-success" disabled={selectedExit.status !== 'Completed'}>
                  <i className="bi bi-file-earmark-check me-1"></i>
                  Generate Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      menuItems={menuItems}
      userInfo={userInfo}
      appName="Exit Management & Clearance"
    >
      {mainContent}
    </div>
  );
};

export default ExitManagement;