import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const EmployeeMasterData = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      designation: 'Senior Developer',
      location: 'New York',
      employmentType: 'Full-time',
      status: 'Active',
      joinDate: '2020-05-15',
      salary: 75000
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Marketing',
      designation: 'Marketing Manager',
      location: 'San Francisco',
      employmentType: 'Full-time',
      status: 'Active',
      joinDate: '2019-08-20',
      salary: 68000
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Alex Rivera',
      email: 'alex.rivera@company.com',
      phone: '+1 (555) 345-6789',
      department: 'HR',
      designation: 'HR Specialist',
      location: 'Chicago',
      employmentType: 'Full-time',
      status: 'On Leave',
      joinDate: '2021-01-10',
      salary: 58000
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Finance',
      designation: 'Financial Analyst',
      location: 'Boston',
      employmentType: 'Full-time',
      status: 'Active',
      joinDate: '2020-11-05',
      salary: 65000
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Sales',
      designation: 'Sales Manager',
      location: 'Austin',
      employmentType: 'Full-time',
      status: 'Active',
      joinDate: '2018-03-12',
      salary: 82000
    },
    {
      id: 6,
      employeeId: 'EMP006',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      phone: '+1 (555) 678-9012',
      department: 'Operations',
      designation: 'Operations Manager',
      location: 'Seattle',
      employmentType: 'Contract',
      status: 'Active',
      joinDate: '2022-02-28',
      salary: 78000
    },
    {
      id: 7,
      employeeId: 'EMP007',
      name: 'Robert Brown',
      email: 'robert.brown@company.com',
      phone: '+1 (555) 789-0123',
      department: 'IT',
      designation: 'System Administrator',
      location: 'Remote',
      employmentType: 'Full-time',
      status: 'Inactive',
      joinDate: '2019-07-15',
      salary: 72000
    },
    {
      id: 8,
      employeeId: 'EMP008',
      name: 'Jennifer Lee',
      email: 'jennifer.lee@company.com',
      phone: '+1 (555) 890-1234',
      department: 'Engineering',
      designation: 'Frontend Developer',
      location: 'New York',
      employmentType: 'Full-time',
      status: 'Active',
      joinDate: '2021-09-22',
      salary: 68000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    designation: '',
    location: 'New York',
    employmentType: 'Full-time',
    salary: ''
  });
  const itemsPerPage = 6;

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const departments = [...new Set(employees.map(emp => emp.department))];
    const avgSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees;
    const recentJoin = employees
      .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))[0]?.joinDate || 'N/A';

    return {
      totalEmployees: totalEmployees,
      activeEmployees: activeEmployees,
      departments: departments.length,
      avgSalary: avgSalary,
      recentJoin: recentJoin
    };
  }, [employees]);

  // Filter and search
  const filteredData = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === 'All' || emp.department === departmentFilter;
      const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'salary' || sortConfig.key === 'joinDate') {
        aVal = sortConfig.key === 'salary' ? Number(aVal) : new Date(aVal);
        bVal = sortConfig.key === 'salary' ? Number(bVal) : new Date(bVal);
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

  // Get unique departments for filter
  const departments = ['All', ...new Set(employees.map(emp => emp.department))];
  const statuses = ['All', 'Active', 'On Leave', 'Inactive'];

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-success-subtle text-success',
      'On Leave': 'bg-warning-subtle text-warning',
      'Inactive': 'bg-danger-subtle text-danger'
    };

    const icons = {
      'Active': 'heroicons:check-circle',
      'On Leave': 'heroicons:clock',
      'Inactive': 'heroicons:x-circle'
    };

    return (
      <span className={`badge d-flex align-items-center ${styles[status]}`}>
        <Icon icon={icons[status]} className="me-1" />
        {status}
      </span>
    );
  };

  const getEmploymentTypeBadge = (type) => {
    const styles = {
      'Full-time': 'bg-primary-subtle text-primary',
      'Contract': 'bg-info-subtle text-info',
      'Part-time': 'bg-secondary-subtle text-secondary',
      'Intern': 'bg-light text-dark'
    };

    return (
      <span className={`badge ${styles[type]}`}>
        {type}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      if (selectedEmployee?.id === id) {
        setShowModal(false);
      }
    }
  };

  const handleAddEmployee = () => {
    const newId = employees.length + 1;
    const newEmp = {
      id: newId,
      employeeId: `EMP${String(newId).padStart(3, '0')}`,
      ...newEmployee,
      salary: parseInt(newEmployee.salary),
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setEmployees([...employees, newEmp]);
    setShowAddModal(false);
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      department: 'Engineering',
      designation: '',
      location: 'New York',
      employmentType: 'Full-time',
      salary: ''
    });
  };

  const exportToCSV = () => {
    const headers = ['Employee ID', 'Name', 'Email', 'Phone', 'Department', 'Designation', 'Location', 'Employment Type', 'Status', 'Salary', 'Join Date'];
    const csvData = [headers];
    
    sortedData.forEach(record => {
      csvData.push([
        record.employeeId,
        record.name,
        record.email,
        record.phone,
        record.department,
        record.designation,
        record.location,
        record.employmentType,
        record.status,
        formatCurrency(record.salary),
        formatDate(record.joinDate)
      ]);
    });

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_master_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const refreshData = () => {
    setCurrentPage(1);
    setSearchTerm('');
    setDepartmentFilter('All');
    setStatusFilter('All');
    setSortConfig({ key: 'name', direction: 'asc' });
    alert('Employee data refreshed successfully!');
  };

  // Sidebar content
  const sidebarContent = (
    <nav className="space-y-1 p-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Employee Master
      </div>
      
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:users" className="mr-3 h-5 w-5" />
        All Employees
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:user-plus" className="mr-3 h-5 w-5" />
        Add Employee
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:document-chart-bar" className="mr-3 h-5 w-5" />
        Reports
      </button>
      
      <div className="pt-4 border-t border-gray-200 mt-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Stats
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Employees:</span>
            <span className="font-semibold">{kpis.totalEmployees}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active:</span>
            <span className="font-semibold text-green-600">{kpis.activeEmployees}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Departments:</span>
            <span className="font-semibold">{kpis.departments}</span>
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
            <Icon icon="heroicons:user-group" />
            Employee Master Data
          </h5>
          <p className="text-muted">
            Manage all employee information, profiles, and employment details in one place.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:users" className="text-primary text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-bold mb-1">Total Employees</h6>
                  <div className="text-muted fs-4">{kpis.totalEmployees}</div>
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
                  <h6 className="text-bold mb-1">Active Employees</h6>
                  <div className="text-muted fs-4">{kpis.activeEmployees}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-info-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:building-office" className="text-info text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-bold mb-1">Departments</h6>
                  <div className="text-muted fs-4">{kpis.departments}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none h-100">
              <div className="card-body d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="w-60-px h-60-px bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                    <Icon icon="heroicons:currency-dollar" className="text-warning text-2xl" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-bold mb-1">Avg. Salary</h6>
                  <div className="text-muted fs-4">{formatCurrency(kpis.avgSalary)}</div>
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
                  placeholder="Search by name, email, or employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control ps-5"
                />
              </div>

              {/* Department Filter */}
              <div style={{ minWidth: '150px' }}>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="form-select"
                >
                  <option value="All">All Departments</option>
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
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
                  <Icon icon="heroicons:user-plus" className="me-2" />
                  Add Employee
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

        {/* Employees Table */}
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Employee Records</h5>
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
                      onClick={() => handleSort('name')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        Employee
                        <Icon 
                          icon={`heroicons:chevron-${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                          className="small" 
                        />
                      </div>
                    </th>
                    <th 
                      className="border-0 px-3 py-3 text-uppercase fw-bold text-dark cursor-pointer"
                      onClick={() => handleSort('department')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        Department
                        <Icon 
                          icon={`heroicons:chevron-${sortConfig.key === 'department' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                          className="small" 
                        />
                      </div>
                    </th>
                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Contact</th>
                    <th 
                      className="border-0 px-3 py-3 text-uppercase fw-bold text-dark cursor-pointer"
                      onClick={() => handleSort('salary')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        Salary
                        <Icon 
                          icon={`heroicons:chevron-${sortConfig.key === 'salary' && sortConfig.direction === 'asc' ? 'up' : 'down'}`} 
                          className="small" 
                        />
                      </div>
                    </th>
                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((employee) => (
                    <tr key={employee.id} className="border-bottom">
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="w-40-px h-40-px bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                            <Icon icon="heroicons:user" className="text-muted" />
                          </div>
                          <div>
                            <div className="fw-medium text-dark">{employee.name}</div>
                            <div className="small text-muted">
                              {employee.employeeId} • {employee.designation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{employee.department}</div>
                        <div className="small text-muted">{employee.location}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-muted">{employee.email}</div>
                        <div className="small text-muted">{employee.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="fw-semibold text-dark">{formatCurrency(employee.salary)}</div>
                        <div className="small text-muted">
                          {getEmploymentTypeBadge(employee.employmentType)}
                        </div>
                      </td>
                      <td className="px-4 py-3" style={{width:"120px"}}>
                        {getStatusBadge(employee.status)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleViewDetails(employee)}
                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                          >
                            <Icon icon="heroicons:eye" />
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
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
                <Icon icon="heroicons:user-group" className="text-4xl mb-3" />
                <h5>No employees found</h5>
                <p>No records found matching your search criteria.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
                <div className="small text-muted">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} employees
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

        {/* Employee Details Modal */}
        {showModal && selectedEmployee && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:user-circle" />
                    Employee Details - {selectedEmployee.name}
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
                      <h6 className="fw-semibold mb-3">Personal Information</h6>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Name</label>
                        <p className="form-control-plaintext">{selectedEmployee.name}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Employee ID</label>
                        <p className="form-control-plaintext">{selectedEmployee.employeeId}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Email</label>
                        <p className="form-control-plaintext">{selectedEmployee.email}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Phone</label>
                        <p className="form-control-plaintext">{selectedEmployee.phone}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-semibold mb-3">Employment Information</h6>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Department</label>
                        <p className="form-control-plaintext">{selectedEmployee.department}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Designation</label>
                        <p className="form-control-plaintext">{selectedEmployee.designation}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Location</label>
                        <p className="form-control-plaintext">{selectedEmployee.location}</p>
                      </div>
                      <div className="mb-2">
                        <label className="form-label small fw-semibold">Join Date</label>
                        <p className="form-control-plaintext">{formatDate(selectedEmployee.joinDate)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-3 mt-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Employment Type</label>
                      <p className="form-control-plaintext">
                        {getEmploymentTypeBadge(selectedEmployee.employmentType)}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>
                      <p className="form-control-plaintext">
                        {getStatusBadge(selectedEmployee.status)}
                      </p>
                    </div>
                    <div className="col-md-12">
                      <label className="form-label fw-semibold">Annual Salary</label>
                      <p className="form-control-plaintext text-primary fw-bold">
                        {formatCurrency(selectedEmployee.salary)}
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
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => handleDeleteEmployee(selectedEmployee.id)}
                  >
                    <Icon icon="heroicons:trash" className="me-2" />
                    Delete Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:user-plus" />
                    Add New Employee
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
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Department</label>
                      <select
                        className="form-select"
                        value={newEmployee.department}
                        onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                        <option value="Operations">Operations</option>
                        <option value="IT">IT</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newEmployee.designation}
                        onChange={(e) => setNewEmployee({...newEmployee, designation: e.target.value})}
                        placeholder="Enter designation"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <select
                        className="form-select"
                        value={newEmployee.location}
                        onChange={(e) => setNewEmployee({...newEmployee, location: e.target.value})}
                      >
                        <option value="New York">New York</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Boston">Boston</option>
                        <option value="Austin">Austin</option>
                        <option value="Seattle">Seattle</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Employment Type</label>
                      <select
                        className="form-select"
                        value={newEmployee.employmentType}
                        onChange={(e) => setNewEmployee({...newEmployee, employmentType: e.target.value})}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Intern">Intern</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Annual Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newEmployee.salary}
                        onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                        placeholder="Enter annual salary"
                      />
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
                    onClick={handleAddEmployee}
                    disabled={!newEmployee.name || !newEmployee.email || !newEmployee.designation || !newEmployee.salary}
                  >
                    <Icon icon="heroicons:user-plus" className="me-2" />
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default EmployeeMasterData;