import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const LoansAdvances = () => {
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
      nextDueDate: '2024-11-15'
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
      nextDueDate: '2024-11-10'
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleViewDetails(loan)}
                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                          >
                            <Icon icon="heroicons:eye" />
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteLoan(loan.id)}
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
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
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
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
                        <span className="input-group-text">$</span>
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
      </div>
  
  );
};

export default LoansAdvances;