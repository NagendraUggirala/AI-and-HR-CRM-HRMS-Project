import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const StatutoryCompliance = () => {
  const [activeSection, setActiveSection] = useState('pf');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [selectedForm, setSelectedForm] = useState(null);
  
  // PF Configuration State
  const [pfConfig, setPfConfig] = useState({
    employeeContribution: 12,
    employerContribution: 12,
    epfContribution: 8.33,
    epsContribution: 3.67,
    edliContribution: 0.5,
    ceilingLimit: 15000,
    autoCalculation: true,
    uanMandatory: true
  });

  // ESI Configuration State
  const [esiConfig, setEsiConfig] = useState({
    employeeContribution: 0.75,
    employerContribution: 3.25,
    salaryThreshold: 21000,
    autoRegistration: true,
    halfYearlyReturns: true
  });

  // Professional Tax State
  const [ptConfig, setPtConfig] = useState({
    state: 'Maharashtra',
    slabs: [
      { from: 0, to: 7500, amount: 0 },
      { from: 7501, to: 10000, amount: 175 },
      { from: 10001, to: Infinity, amount: 200 }
    ],
    deductionCycle: 'monthly'
  });

  // TDS Configuration State
  const [tdsConfig, setTdsConfig] = useState({
    taxRegime: 'new',
    financialYear: '2024-25',
    declarationRequired: true,
    form16Generation: true,
    quarterlyTDS: true
  });

  // LWF Configuration State
  const [lwfConfig, setLwfConfig] = useState({
    state: 'Maharashtra',
    employeeContribution: 12,
    employerContribution: 12,
    deductionFrequency: 'annual'
  });

  // Gratuity Configuration
  const [gratuityConfig, setGratuityConfig] = useState({
    eligibilityYears: 5,
    calculationMethod: 'last_drawn',
    ceilingLimit: 2000000,
    autoProvisioning: true
  });

  // Bonus Configuration
  const [bonusConfig, setBonusConfig] = useState({
    eligibilityThreshold: 21000,
    calculationRate: 8.33,
    minimumBonus: 100,
    partialYearCalculation: true
  });

  // Employees Data
  const [employees, setEmployees] = useState([]);
  const [pfStatements, setPfStatements] = useState([]);
  const [esiStatements, setEsiStatements] = useState([]);
  const [tdsStatements, setTdsStatements] = useState([]);
  const [complianceForms, setComplianceForms] = useState([]);
  const [declarations, setDeclarations] = useState([]);
  const [reconciliationReports, setReconciliationReports] = useState([]);

  // Investment Declarations
  const [investmentDeclarations, setInvestmentDeclarations] = useState({
    section80C: 0,
    section80D: 0,
    section80CCD: 0,
    hraExemption: 0,
    ltaExemption: 0,
    homeLoanInterest: 0,
    educationLoanInterest: 0,
    npsContribution: 0,
    totalDeclared: 0
  });

  const itemsPerPage = 6;

  // Calculate KPIs
  const kpis = useMemo(() => {
    const pendingDeclarations = declarations.filter(d => d.status === 'pending').length;
    const pendingForms = complianceForms.filter(f => f.status === 'pending').length;
    const totalPFContribution = employees.reduce((sum, emp) => sum + (emp.pfContribution || 0), 0);
    const totalESIContribution = employees.reduce((sum, emp) => sum + (emp.esiContribution || 0), 0);
    const totalTDSDeduction = employees.reduce((sum, emp) => sum + (emp.tdsDeduction || 0), 0);
    
    return {
      pendingDeclarations,
      pendingForms,
      totalPFContribution,
      totalESIContribution,
      totalTDSDeduction,
      totalEmployees: employees.length,
      eligiblePF: employees.filter(emp => emp.pfEligible).length,
      eligibleESI: employees.filter(emp => emp.esiEligible).length
    };
  }, [employees, declarations, complianceForms]);

  // Filter data based on search and type
  const getFilteredData = () => {
    let data = [];
    switch(activeSection) {
      case 'employees':
        data = employees.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterType !== 'All') {
          data = data.filter(item => item[filterType] === true);
        }
        break;
      case 'forms':
        data = complianceForms.filter(item => 
          item.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterType !== 'All') {
          data = data.filter(item => item.status === filterType);
        }
        break;
      case 'declarations':
        data = declarations.filter(item => 
          item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.financialYear.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterType !== 'All') {
          data = data.filter(item => item.status === filterType);
        }
        break;
      case 'reports':
        data = reconciliationReports.filter(item => 
          item.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.period.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        data = [];
    }
    return data;
  };

  // Pagination
  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Initial data loading
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Employees data
    setEmployees([
      { 
        id: 'EMP001', 
        name: 'John Smith', 
        employeeId: 'EMP001',
        department: 'Engineering',
        basicSalary: 50000,
        grossSalary: 75000,
        pfEligible: true,
        esiEligible: false,
        ptApplicable: true,
        tdsApplicable: true,
        pfUAN: '100123456789',
        esiNumber: '',
        doj: '2022-03-15',
        pfContribution: 6000,
        esiContribution: 0,
        tdsDeduction: 4500,
        ptDeduction: 200,
        lastDeclaration: '2024-03-31'
      },
      { 
        id: 'EMP002', 
        name: 'Sarah Johnson', 
        employeeId: 'EMP002',
        department: 'Marketing',
        basicSalary: 40000,
        grossSalary: 55000,
        pfEligible: true,
        esiEligible: true,
        ptApplicable: true,
        tdsApplicable: true,
        pfUAN: '100987654321',
        esiNumber: 'ESI123456',
        doj: '2021-06-20',
        pfContribution: 4800,
        esiContribution: 412,
        tdsDeduction: 3500,
        ptDeduction: 200,
        lastDeclaration: '2024-03-31'
      },
      { 
        id: 'EMP003', 
        name: 'Mike Chen', 
        employeeId: 'EMP003',
        department: 'Sales',
        basicSalary: 30000,
        grossSalary: 45000,
        pfEligible: true,
        esiEligible: true,
        ptApplicable: true,
        tdsApplicable: true,
        pfUAN: '100555666777',
        esiNumber: 'ESI789012',
        doj: '2023-01-10',
        pfContribution: 3600,
        esiContribution: 337,
        tdsDeduction: 2500,
        ptDeduction: 175,
        lastDeclaration: '2024-03-31'
      },
      { 
        id: 'EMP004', 
        name: 'Emily Davis', 
        employeeId: 'EMP004',
        department: 'HR',
        basicSalary: 35000,
        grossSalary: 48000,
        pfEligible: true,
        esiEligible: true,
        ptApplicable: true,
        tdsApplicable: true,
        pfUAN: '100111222333',
        esiNumber: 'ESI456789',
        doj: '2020-11-05',
        pfContribution: 4200,
        esiContribution: 360,
        tdsDeduction: 3000,
        ptDeduction: 200,
        lastDeclaration: '2024-03-15'
      },
      { 
        id: 'EMP005', 
        name: 'David Wilson', 
        employeeId: 'EMP005',
        department: 'Finance',
        basicSalary: 60000,
        grossSalary: 85000,
        pfEligible: true,
        esiEligible: false,
        ptApplicable: true,
        tdsApplicable: true,
        pfUAN: '100444555666',
        esiNumber: '',
        doj: '2019-08-12',
        pfContribution: 7200,
        esiContribution: 0,
        tdsDeduction: 6000,
        ptDeduction: 200,
        lastDeclaration: '2024-03-31'
      }
    ]);

    // Compliance Forms
    setComplianceForms([
      { id: 1, formName: 'Form 16', employeeName: 'John Smith', financialYear: '2023-24', status: 'generated', generatedDate: '2024-06-15' },
      { id: 2, formName: 'Form 12A', employeeName: 'Sarah Johnson', financialYear: '2023-24', status: 'pending', dueDate: '2024-06-30' },
      { id: 3, formName: 'Form 5', employeeName: 'Mike Chen', financialYear: 'March 2024', status: 'submitted', submittedDate: '2024-04-15' },
      { id: 4, formName: 'ESI Return', employeeName: 'Emily Davis', period: 'Oct 2023 - Mar 2024', status: 'generated', generatedDate: '2024-04-10' },
      { id: 5, formName: 'PT Return', employeeName: 'David Wilson', period: 'March 2024', status: 'submitted', submittedDate: '2024-04-05' }
    ]);

    // Investment Declarations
    setDeclarations([
      { id: 1, employeeName: 'John Smith', financialYear: '2024-25', status: 'submitted', submittedDate: '2024-01-31', verified: true },
      { id: 2, employeeName: 'Sarah Johnson', financialYear: '2024-25', status: 'pending', dueDate: '2024-06-30', verified: false },
      { id: 3, employeeName: 'Mike Chen', financialYear: '2024-25', status: 'draft', lastModified: '2024-03-15', verified: false },
      { id: 4, employeeName: 'Emily Davis', financialYear: '2024-25', status: 'submitted', submittedDate: '2024-01-28', verified: true },
      { id: 5, employeeName: 'David Wilson', financialYear: '2024-25', status: 'submitted', submittedDate: '2024-02-10', verified: true }
    ]);

    // Reconciliation Reports
    setReconciliationReports([
      { id: 1, reportName: 'PF Reconciliation', period: 'March 2024', status: 'completed', generatedDate: '2024-04-10', type: 'pf' },
      { id: 2, reportName: 'ESI Reconciliation', period: 'Oct 2023 - Mar 2024', status: 'completed', generatedDate: '2024-04-05', type: 'esi' },
      { id: 3, reportName: 'TDS Reconciliation', period: 'Q4 FY 2023-24', status: 'pending', dueDate: '2024-05-31', type: 'tds' },
      { id: 4, reportName: 'PT Reconciliation', period: 'March 2024', status: 'completed', generatedDate: '2024-04-12', type: 'pt' },
      { id: 5, reportName: 'Annual Compliance', period: 'FY 2023-24', status: 'in-progress', progress: 60, type: 'consolidated' }
    ]);

    // PF Statements
    setPfStatements([
      { id: 1, employeeId: 'EMP001', month: 'March 2024', employeeContribution: 6000, employerContribution: 6000, total: 12000, status: 'paid' },
      { id: 2, employeeId: 'EMP002', month: 'March 2024', employeeContribution: 4800, employerContribution: 4800, total: 9600, status: 'paid' },
      { id: 3, employeeId: 'EMP003', month: 'March 2024', employeeContribution: 3600, employerContribution: 3600, total: 7200, status: 'paid' }
    ]);

    // ESI Statements
    setEsiStatements([
      { id: 1, employeeId: 'EMP002', month: 'March 2024', employeeContribution: 412, employerContribution: 1788, total: 2200, status: 'paid' },
      { id: 2, employeeId: 'EMP003', month: 'March 2024', employeeContribution: 337, employerContribution: 1463, total: 1800, status: 'paid' },
      { id: 3, employeeId: 'EMP004', month: 'March 2024', employeeContribution: 360, employerContribution: 1560, total: 1920, status: 'paid' }
    ]);

    // TDS Statements
    setTdsStatements([
      { id: 1, employeeId: 'EMP001', quarter: 'Q4 FY 2023-24', tdsAmount: 4500, depositedDate: '2024-04-15', challanNo: 'CH123456' },
      { id: 2, employeeId: 'EMP002', quarter: 'Q4 FY 2023-24', tdsAmount: 3500, depositedDate: '2024-04-15', challanNo: 'CH123457' },
      { id: 3, employeeId: 'EMP003', quarter: 'Q4 FY 2023-24', tdsAmount: 2500, depositedDate: '2024-04-15', challanNo: 'CH123458' }
    ]);

    setIsLoading(false);
  };

  // Status badge functions
  const getStatusBadge = (status) => {
    const styles = {
      'pending': 'bg-warning-subtle text-warning',
      'submitted': 'bg-info-subtle text-info',
      'generated': 'bg-success-subtle text-success',
      'completed': 'bg-success-subtle text-success',
      'in-progress': 'bg-warning-subtle text-warning',
      'draft': 'bg-secondary-subtle text-secondary',
      'verified': 'bg-success-subtle text-success',
      'paid': 'bg-success-subtle text-success',
      'overdue': 'bg-danger-subtle text-danger'
    };

    return (
      <span className={`badge ${styles[status] || 'bg-secondary-subtle text-secondary'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const styles = {
      'pf': 'bg-primary-subtle text-primary',
      'esi': 'bg-info-subtle text-info',
      'tds': 'bg-success-subtle text-success',
      'pt': 'bg-warning-subtle text-warning',
      'lwf': 'bg-danger-subtle text-danger',
      'gratuity': 'bg-dark-subtle text-dark',
      'bonus': 'bg-purple-subtle text-purple',
      'consolidated': 'bg-secondary-subtle text-secondary'
    };

    return (
      <span className={`badge ${styles[type] || 'bg-secondary-subtle text-secondary'}`}>
        {type.toUpperCase()}
      </span>
    );
  };

  // Format functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Action handlers
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleGenerateForm = (formType) => {
    setSelectedForm(formType);
    setShowFormModal(true);
  };

  const handleCalculatePF = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const employeeContribution = (employee.basicSalary * pfConfig.employeeContribution) / 100;
      const employerContribution = (employee.basicSalary * pfConfig.employerContribution) / 100;
      
      alert(`PF Calculation for ${employee.name}:
      Employee Contribution (${pfConfig.employeeContribution}%): ${formatCurrency(employeeContribution)}
      Employer Contribution (${pfConfig.employerContribution}%): ${formatCurrency(employerContribution)}
      Total: ${formatCurrency(employeeContribution + employerContribution)}`);
    }
  };

  const handleCalculateESI = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee && employee.grossSalary <= esiConfig.salaryThreshold) {
      const employeeContribution = (employee.grossSalary * esiConfig.employeeContribution) / 100;
      const employerContribution = (employee.grossSalary * esiConfig.employerContribution) / 100;
      
      alert(`ESI Calculation for ${employee.name}:
      Employee Contribution (${esiConfig.employeeContribution}%): ${formatCurrency(employeeContribution)}
      Employer Contribution (${esiConfig.employerContribution}%): ${formatCurrency(employerContribution)}
      Total: ${formatCurrency(employeeContribution + employerContribution)}`);
    } else {
      alert('Employee not eligible for ESI (Salary exceeds threshold)');
    }
  };

  const handleCalculatePT = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const slab = ptConfig.slabs.find(s => 
        employee.grossSalary >= s.from && employee.grossSalary <= s.to
      );
      alert(`Professional Tax for ${employee.name}: ${formatCurrency(slab?.amount || 0)}`);
    }
  };

  const handleCalculateTDS = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      // Simplified TDS calculation
      const annualSalary = employee.grossSalary * 12;
      let tds = 0;
      
      if (tdsConfig.taxRegime === 'new') {
        if (annualSalary <= 700000) tds = 0;
        else if (annualSalary <= 900000) tds = (annualSalary - 700000) * 0.05 / 12;
        else if (annualSalary <= 1200000) tds = (10000 + (annualSalary - 900000) * 0.10) / 12;
        else tds = (25000 + (annualSalary - 1200000) * 0.15) / 12;
      } else {
        // Old regime calculation
        if (annualSalary <= 250000) tds = 0;
        else if (annualSalary <= 500000) tds = (annualSalary - 250000) * 0.05 / 12;
        else if (annualSalary <= 1000000) tds = (12500 + (annualSalary - 500000) * 0.20) / 12;
        else tds = (112500 + (annualSalary - 1000000) * 0.30) / 12;
      }
      
      alert(`TDS Calculation for ${employee.name}:
      Monthly TDS Deduction: ${formatCurrency(tds)}
      Annual Projected TDS: ${formatCurrency(tds * 12)}`);
    }
  };

  const handleCalculateGratuity = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const doj = new Date(employee.doj);
      const now = new Date();
      const yearsOfService = (now - doj) / (1000 * 60 * 60 * 24 * 365.25);
      
      if (yearsOfService >= gratuityConfig.eligibilityYears) {
        const gratuity = (employee.basicSalary * 15 * yearsOfService) / 26;
        const cappedGratuity = Math.min(gratuity, gratuityConfig.ceilingLimit);
        
        alert(`Gratuity Calculation for ${employee.name}:
        Years of Service: ${yearsOfService.toFixed(2)}
        Last Drawn Salary: ${formatCurrency(employee.basicSalary)}
        Calculated Gratuity: ${formatCurrency(gratuity)}
        Capped Amount: ${formatCurrency(cappedGratuity)}`);
      } else {
        alert(`Employee needs ${(gratuityConfig.eligibilityYears - yearsOfService).toFixed(2)} more years for gratuity eligibility`);
      }
    }
  };

  const handleCalculateBonus = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const bonus = Math.max(
        (employee.basicSalary * bonusConfig.calculationRate) / 100,
        bonusConfig.minimumBonus
      );
      
      alert(`Bonus Calculation for ${employee.name}:
      Bonus Amount: ${formatCurrency(bonus)}
      (${bonusConfig.calculationRate}% of basic salary or minimum ${formatCurrency(bonusConfig.minimumBonus)})`);
    }
  };

  const handleUpdateConfig = (section, key, value) => {
    switch(section) {
      case 'pf':
        setPfConfig(prev => ({ ...prev, [key]: value }));
        break;
      case 'esi':
        setEsiConfig(prev => ({ ...prev, [key]: value }));
        break;
      case 'pt':
        setPtConfig(prev => ({ ...prev, [key]: value }));
        break;
      case 'tds':
        setTdsConfig(prev => ({ ...prev, [key]: value }));
        break;
      case 'lwf':
        setLwfConfig(prev => ({ ...prev, [key]: value }));
        break;
      case 'gratuity':
        setGratuityConfig(prev => ({ ...prev, [key]: value }));
        break;
      case 'bonus':
        setBonusConfig(prev => ({ ...prev, [key]: value }));
        break;
      default:
        break;
    }
  };

  const handleExportReport = () => {
    let csvData = [];
    let headers = [];
    
    switch(activeSection) {
      case 'employees':
        headers = ['Employee ID', 'Name', 'Department', 'Basic Salary', 'PF Contribution', 'ESI Contribution', 'TDS Deduction'];
        csvData = employees.map(emp => [
          emp.employeeId, 
          emp.name, 
          emp.department, 
          formatCurrency(emp.basicSalary), 
          formatCurrency(emp.pfContribution), 
          formatCurrency(emp.esiContribution), 
          formatCurrency(emp.tdsDeduction)
        ]);
        break;
      case 'forms':
        headers = ['Form Name', 'Employee', 'Financial Year/Period', 'Status', 'Date'];
        csvData = complianceForms.map(form => [
          form.formName, 
          form.employeeName, 
          form.financialYear || form.period, 
          form.status, 
          form.generatedDate || form.submittedDate || 'N/A'
        ]);
        break;
      case 'reports':
        headers = ['Report Name', 'Period', 'Status', 'Generated Date', 'Type'];
        csvData = reconciliationReports.map(report => [
          report.reportName, 
          report.period, 
          report.status, 
          report.generatedDate || 'N/A', 
          report.type
        ]);
        break;
      default:
        headers = ['Data', 'Export'];
        csvData = [['No data to export']];
    }
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance_${activeSection}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadInitialData();
      setCurrentPage(1);
      setSearchTerm('');
      setFilterType('All');
      alert('Compliance data refreshed successfully!');
    }, 1000);
  };

  // Sidebar content
  const sidebarContent = (
    <nav className="space-y-1 p-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Compliance Sections
      </div>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'pf' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('pf')}
      >
        <Icon icon="heroicons:building-library" className="mr-3 h-5 w-5" />
        Provident Fund (PF)
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'esi' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('esi')}
      >
        <Icon icon="heroicons:heart" className="mr-3 h-5 w-5" />
        Employee State Insurance (ESI)
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'pt' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('pt')}
      >
        <Icon icon="heroicons:briefcase" className="mr-3 h-5 w-5" />
        Professional Tax (PT)
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'tds' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('tds')}
      >
        <Icon icon="heroicons:banknotes" className="mr-3 h-5 w-5" />
        TDS Management
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'lwf' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('lwf')}
      >
        <Icon icon="heroicons:users" className="mr-3 h-5 w-5" />
        Labour Welfare Fund
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'gratuity' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('gratuity')}
      >
        <Icon icon="heroicons:gift" className="mr-3 h-5 w-5" />
        Gratuity Management
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'bonus' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('bonus')}
      >
        <Icon icon="heroicons:sparkles" className="mr-3 h-5 w-5" />
        Bonus Act Compliance
      </button>
      
      <div className="pt-4 border-t border-gray-200 mt-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Compliance Status
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Employees:</span>
            <span className="font-semibold text-primary">{kpis.totalEmployees}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">PF Eligible:</span>
            <span className="font-semibold text-success">{kpis.eligiblePF}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">ESI Eligible:</span>
            <span className="font-semibold text-info">{kpis.eligibleESI}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Declarations:</span>
            <span className="font-semibold text-warning">{kpis.pendingDeclarations}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total PF Contribution:</span>
            <span className="font-semibold text-primary">{formatCurrency(kpis.totalPFContribution)}</span>
          </div>
        </div>
      </div>
    </nav>
  );

  // User info for sidebar
  const userInfo = {
    name: 'Compliance Manager',
    role: 'HR Compliance',
    email: 'compliance@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Compliance'
  };

  // Render different sections
  const renderPF = () => (
    <div className="row g-4">
      {/* PF Configuration */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Provident Fund (PF) Configuration</h5>
              <button className="btn btn-primary" onClick={() => handleGenerateForm('PF')}>
                <Icon icon="heroicons:document-plus" className="me-2" />
                Generate Form 5/10C
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Contribution Rates */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Contribution Rates (%)</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Employee Contribution</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={pfConfig.employeeContribution}
                          onChange={(e) => handleUpdateConfig('pf', 'employeeContribution', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Employer Contribution</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={pfConfig.employerContribution}
                          onChange={(e) => handleUpdateConfig('pf', 'employerContribution', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">EPS Contribution</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={pfConfig.epsContribution}
                          onChange={(e) => handleUpdateConfig('pf', 'epsContribution', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">EDLI Contribution</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={pfConfig.edliContribution}
                          onChange={(e) => handleUpdateConfig('pf', 'edliContribution', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">PF Settings</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Ceiling Limit</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={pfConfig.ceilingLimit}
                          onChange={(e) => handleUpdateConfig('pf', 'ceilingLimit', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input 
                            className="form-check-input"
                            type="checkbox"
                            checked={pfConfig.autoCalculation}
                            onChange={(e) => handleUpdateConfig('pf', 'autoCalculation', e.target.checked)}
                          />
                          <label className="form-check-label">
                            Auto PF Calculation
                          </label>
                        </div>
                        <div className="form-check">
                          <input 
                            className="form-check-input"
                            type="checkbox"
                            checked={pfConfig.uanMandatory}
                            onChange={(e) => handleUpdateConfig('pf', 'uanMandatory', e.target.checked)}
                          />
                          <label className="form-check-label">
                            UAN Number Mandatory
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PF Statements */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">PF Statements - March 2024</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Employee Contribution</th>
                            <th>Employer Contribution</th>
                            <th>Total PF</th>
                            <th>UAN Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pfStatements.map(statement => {
                            const employee = employees.find(emp => emp.employeeId === statement.employeeId);
                            return (
                              <tr key={statement.id}>
                                <td>{statement.employeeId}</td>
                                <td>{employee?.name || 'N/A'}</td>
                                <td className="text-primary">{formatCurrency(statement.employeeContribution)}</td>
                                <td className="text-success">{formatCurrency(statement.employerContribution)}</td>
                                <td className="fw-bold">{formatCurrency(statement.total)}</td>
                                <td>{employee?.pfUAN || 'N/A'}</td>
                                <td>{getStatusBadge(statement.status)}</td>
                                <td>
                                  <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleCalculatePF(employee?.id)}
                                  >
                                    Calculate
                                  </button>
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

              {/* PF Reports */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">PF Reports & Forms</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:document-text" className="text-primary fs-1 mb-3" />
                            <h6 className="fw-bold">Form 5/10C</h6>
                            <p className="text-muted small mb-3">Monthly PF Return</p>
                            <button 
                              className="btn btn-outline-primary w-100"
                              onClick={() => handleGenerateForm('Form5')}
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:document-chart-bar" className="text-success fs-1 mb-3" />
                            <h6 className="fw-bold">Reconciliation Report</h6>
                            <p className="text-muted small mb-3">PF Contribution Reconciliation</p>
                            <button 
                              className="btn btn-outline-success w-100"
                              onClick={() => handleGenerateForm('PFReconciliation')}
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:arrow-down-tray" className="text-info fs-1 mb-3" />
                            <h6 className="fw-bold">UAN Update</h6>
                            <p className="text-muted small mb-3">Employee UAN Details</p>
                            <button className="btn btn-outline-info w-100">
                              Download Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderESI = () => (
    <div className="row g-4">
      {/* ESI Configuration */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Employee State Insurance (ESI) Configuration</h5>
              <button className="btn btn-primary" onClick={() => handleGenerateForm('ESI')}>
                <Icon icon="heroicons:document-plus" className="me-2" />
                Generate ESI Return
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Contribution Rates */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">ESI Contribution Rates (%)</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Employee Contribution</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={esiConfig.employeeContribution}
                          onChange={(e) => handleUpdateConfig('esi', 'employeeContribution', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Employer Contribution</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={esiConfig.employerContribution}
                          onChange={(e) => handleUpdateConfig('esi', 'employerContribution', parseFloat(e.target.value))}
                          step="0.01"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Salary Threshold</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={esiConfig.salaryThreshold}
                          onChange={(e) => handleUpdateConfig('esi', 'salaryThreshold', parseFloat(e.target.value))}
                        />
                        <div className="form-text">Employees earning below this amount are eligible for ESI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">ESI Settings</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-check">
                          <input 
                            className="form-check-input"
                            type="checkbox"
                            checked={esiConfig.autoRegistration}
                            onChange={(e) => handleUpdateConfig('esi', 'autoRegistration', e.target.checked)}
                          />
                          <label className="form-check-label">
                            Auto-register eligible employees
                          </label>
                        </div>
                        <div className="form-check">
                          <input 
                            className="form-check-input"
                            type="checkbox"
                            checked={esiConfig.halfYearlyReturns}
                            onChange={(e) => handleUpdateConfig('esi', 'halfYearlyReturns', e.target.checked)}
                          />
                          <label className="form-check-label">
                            Half-yearly ESI Returns
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="alert alert-info">
                          <Icon icon="heroicons:information-circle" className="me-2" />
                          Current ESI rates: Employee 0.75%, Employer 3.25% of gross wages
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ESI Statements */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">ESI Statements - March 2024</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Gross Salary</th>
                            <th>ESI Number</th>
                            <th>Employee Contribution</th>
                            <th>Employer Contribution</th>
                            <th>Total ESI</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {esiStatements.map(statement => {
                            const employee = employees.find(emp => emp.employeeId === statement.employeeId);
                            return (
                              <tr key={statement.id}>
                                <td>{statement.employeeId}</td>
                                <td>{employee?.name || 'N/A'}</td>
                                <td>{employee ? formatCurrency(employee.grossSalary) : 'N/A'}</td>
                                <td>{employee?.esiNumber || 'N/A'}</td>
                                <td className="text-primary">{formatCurrency(statement.employeeContribution)}</td>
                                <td className="text-success">{formatCurrency(statement.employerContribution)}</td>
                                <td className="fw-bold">{formatCurrency(statement.total)}</td>
                                <td>
                                  <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleCalculateESI(employee?.id)}
                                  >
                                    Calculate
                                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );

  const renderPT = () => (
    <div className="row g-4">
      {/* PT Configuration */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Professional Tax (PT) Configuration</h5>
              <button className="btn btn-primary" onClick={() => handleGenerateForm('PT')}>
                <Icon icon="heroicons:document-plus" className="me-2" />
                Generate PT Return
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* State Selection */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">State-wise Configuration</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">State</label>
                        <select 
                          className="form-select"
                          value={ptConfig.state}
                          onChange={(e) => handleUpdateConfig('pt', 'state', e.target.value)}
                        >
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Deduction Cycle</label>
                        <select 
                          className="form-select"
                          value={ptConfig.deductionCycle}
                          onChange={(e) => handleUpdateConfig('pt', 'deductionCycle', e.target.value)}
                        >
                          <option value="monthly">Monthly</option>
                          <option value="annual">Annual</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PT Slabs */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">PT Slabs for {ptConfig.state}</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>From Salary</th>
                            <th>To Salary</th>
                            <th>PT Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ptConfig.slabs.map((slab, index) => (
                            <tr key={index}>
                              <td>{formatCurrency(slab.from)}</td>
                              <td>{slab.to === Infinity ? 'Above' : formatCurrency(slab.to)}</td>
                              <td className="fw-bold">{formatCurrency(slab.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee PT Details */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">Employee Professional Tax Details</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Gross Salary</th>
                            <th>PT Applicable</th>
                            <th>PT Amount</th>
                            <th>PT Number</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map(employee => (
                            <tr key={employee.id}>
                              <td>
                                <div className="fw-semibold">{employee.name}</div>
                                <div className="small text-muted">{employee.department}</div>
                              </td>
                              <td>{formatCurrency(employee.grossSalary)}</td>
                              <td>
                                {employee.ptApplicable ? (
                                  <span className="badge bg-success-subtle text-success">Yes</span>
                                ) : (
                                  <span className="badge bg-secondary-subtle text-secondary">No</span>
                                )}
                              </td>
                              <td className="fw-bold">{formatCurrency(employee.ptDeduction)}</td>
                              <td>PT{employee.employeeId}</td>
                              <td>
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleCalculatePT(employee.id)}
                                >
                                  Calculate
                                </button>
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
          </div>
        </div>
      </div>
    </div>
  );

  const renderTDS = () => (
    <div className="row g-4">
      {/* TDS Configuration */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Tax Deducted at Source (TDS) Management</h5>
              <button className="btn btn-primary" onClick={() => handleGenerateForm('Form16')}>
                <Icon icon="heroicons:document-plus" className="me-2" />
                Generate Form 16
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Tax Regime Selection */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Tax Regime Configuration</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Tax Regime</label>
                        <div className="mb-3">
                          <div className="form-check">
                            <input 
                              className="form-check-input"
                              type="radio"
                              name="taxRegime"
                              value="new"
                              checked={tdsConfig.taxRegime === 'new'}
                              onChange={(e) => handleUpdateConfig('tds', 'taxRegime', e.target.value)}
                            />
                            <label className="form-check-label">
                              New Tax Regime (Default)
                            </label>
                          </div>
                          <div className="form-check">
                            <input 
                              className="form-check-input"
                              type="radio"
                              name="taxRegime"
                              value="old"
                              checked={tdsConfig.taxRegime === 'old'}
                              onChange={(e) => handleUpdateConfig('tds', 'taxRegime', e.target.value)}
                            />
                            <label className="form-check-label">
                              Old Tax Regime (With Deductions)
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Financial Year</label>
                        <select 
                          className="form-select"
                          value={tdsConfig.financialYear}
                          onChange={(e) => handleUpdateConfig('tds', 'financialYear', e.target.value)}
                        >
                          <option value="2024-25">2024-25</option>
                          <option value="2023-24">2023-24</option>
                          <option value="2022-23">2022-23</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Declarations */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Investment Declarations (Old Regime)</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label small">Section 80C</label>
                        <input type="number" className="form-control form-control-sm" placeholder="Max 150,000" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">Section 80D</label>
                        <input type="number" className="form-control form-control-sm" placeholder="Health Insurance" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">HRA Exemption</label>
                        <input type="number" className="form-control form-control-sm" placeholder="Rent paid" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">LTA Exemption</label>
                        <input type="number" className="form-control form-control-sm" placeholder="Leave Travel" />
                      </div>
                      <div className="col-12 mt-2">
                        <button className="btn btn-sm btn-outline-primary w-100">
                          Update Declarations
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee TDS Details */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">Employee TDS Details - FY 2023-24</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Gross Salary</th>
                            <th>Annual Income</th>
                            <th>TDS Deduction</th>
                            <th>Tax Regime</th>
                            <th>Form 16 Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map(employee => (
                            <tr key={employee.id}>
                              <td>
                                <div className="fw-semibold">{employee.name}</div>
                                <div className="small text-muted">{employee.employeeId}</div>
                              </td>
                              <td>{formatCurrency(employee.grossSalary)}</td>
                              <td>{formatCurrency(employee.grossSalary * 12)}</td>
                              <td className="fw-bold text-danger">{formatCurrency(employee.tdsDeduction)}</td>
                              <td>
                                <span className="badge bg-primary-subtle text-primary">
                                  {tdsConfig.taxRegime === 'new' ? 'New' : 'Old'}
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-success-subtle text-success">
                                  Generated
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleCalculateTDS(employee.id)}
                                  >
                                    Calculate TDS
                                  </button>
                                  <button className="btn btn-sm btn-outline-success">
                                    Form 16
                                  </button>
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

              {/* TDS Reports */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">TDS Reports & Forms</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-3">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:document-text" className="text-primary fs-1 mb-3" />
                            <h6 className="fw-bold">Form 16</h6>
                            <p className="text-muted small mb-3">Part A & B</p>
                            <button className="btn btn-outline-primary w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:document-chart-bar" className="text-success fs-1 mb-3" />
                            <h6 className="fw-bold">Form 24Q</h6>
                            <p className="text-muted small mb-3">Quarterly TDS Return</p>
                            <button className="btn btn-outline-success w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:calculator" className="text-warning fs-1 mb-3" />
                            <h6 className="fw-bold">TDS Calculator</h6>
                            <p className="text-muted small mb-3">Tax Calculation</p>
                            <button className="btn btn-outline-warning w-100">
                              Open Calculator
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:arrow-down-tray" className="text-info fs-1 mb-3" />
                            <h6 className="fw-bold">TDS Challan</h6>
                            <p className="text-muted small mb-3">Challan 281</p>
                            <button className="btn btn-outline-info w-100">
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLWF = () => (
    <div className="row g-4">
      {/* LWF Configuration */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">Labour Welfare Fund (LWF) Management</h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* LWF Configuration */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">LWF Configuration - {lwfConfig.state}</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">State</label>
                        <select 
                          className="form-select"
                          value={lwfConfig.state}
                          onChange={(e) => handleUpdateConfig('lwf', 'state', e.target.value)}
                        >
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Employee Contribution (₹)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={lwfConfig.employeeContribution}
                          onChange={(e) => handleUpdateConfig('lwf', 'employeeContribution', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Employer Contribution (₹)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={lwfConfig.employerContribution}
                          onChange={(e) => handleUpdateConfig('lwf', 'employerContribution', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Deduction Frequency</label>
                        <select 
                          className="form-select"
                          value={lwfConfig.deductionFrequency}
                          onChange={(e) => handleUpdateConfig('lwf', 'deductionFrequency', e.target.value)}
                        >
                          <option value="annual">Annual</option>
                          <option value="half-yearly">Half-yearly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LWF Information */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">LWF Information</h6>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-info">
                      <h6 className="alert-heading">Labour Welfare Fund Details</h6>
                      <p className="small mb-0">
                        The Labour Welfare Fund is a statutory contribution paid by both employers and employees for the welfare of labourers.
                      </p>
                    </div>
                    <div className="mt-3">
                      <h6 className="fw-bold">Current Rates for {lwfConfig.state}:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-2">• Employee Contribution: ₹{lwfConfig.employeeContribution}</li>
                        <li className="mb-2">• Employer Contribution: ₹{lwfConfig.employerContribution}</li>
                        <li>• Frequency: {lwfConfig.deductionFrequency === 'annual' ? 'Once a year' : lwfConfig.deductionFrequency}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* LWF Report */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">LWF Contribution Report - FY 2023-24</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Employee ID</th>
                            <th>Employee Contribution</th>
                            <th>Employer Contribution</th>
                            <th>Total LWF</th>
                            <th>Payment Status</th>
                            <th>Due Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map(employee => (
                            <tr key={employee.id}>
                              <td className="fw-semibold">{employee.name}</td>
                              <td>{employee.employeeId}</td>
                              <td className="text-primary">{formatCurrency(lwfConfig.employeeContribution)}</td>
                              <td className="text-success">{formatCurrency(lwfConfig.employerContribution)}</td>
                              <td className="fw-bold">{formatCurrency(lwfConfig.employeeContribution + lwfConfig.employerContribution)}</td>
                              <td>
                                <span className="badge bg-success-subtle text-success">Paid</span>
                              </td>
                              <td>31-Mar-2024</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGratuity = () => (
    <div className="row g-4">
      {/* Gratuity Configuration */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">Gratuity Management</h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Configuration */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Gratuity Configuration</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Eligibility Years</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={gratuityConfig.eligibilityYears}
                          onChange={(e) => handleUpdateConfig('gratuity', 'eligibilityYears', parseInt(e.target.value))}
                        />
                        <div className="form-text">Minimum years of service required for gratuity eligibility</div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Calculation Method</label>
                        <select 
                          className="form-select"
                          value={gratuityConfig.calculationMethod}
                          onChange={(e) => handleUpdateConfig('gratuity', 'calculationMethod', e.target.value)}
                        >
                          <option value="last_drawn">Last drawn salary</option>
                          <option value="average_salary">Average of last 10 months</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Ceiling Limit (₹)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={gratuityConfig.ceilingLimit}
                          onChange={(e) => handleUpdateConfig('gratuity', 'ceilingLimit', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input 
                            className="form-check-input"
                            type="checkbox"
                            checked={gratuityConfig.autoProvisioning}
                            onChange={(e) => handleUpdateConfig('gratuity', 'autoProvisioning', e.target.checked)}
                          />
                          <label className="form-check-label">
                            Auto-provisioning of gratuity liability
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gratuity Formula */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Gratuity Calculation Formula</h6>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-success">
                      <h6 className="alert-heading">Gratuity Calculation</h6>
                      <p className="mb-2 fw-bold">Formula:</p>
                      <p className="mb-1">(Last drawn salary × 15 × Years of service) ÷ 26</p>
                      <p className="small mb-0">Where 26 represents the number of working days in a month</p>
                    </div>
                    <div className="mt-3">
                      <h6 className="fw-bold">Example:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">• Last drawn salary: ₹50,000</li>
                        <li className="mb-1">• Years of service: 10</li>
                        <li className="mb-1">• Calculation: (50,000 × 15 × 10) ÷ 26</li>
                        <li className="mb-1">• Gratuity amount: ₹2,88,462</li>
                        <li>• Ceiling limit: ₹20,00,000 (maximum payable)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Gratuity Eligibility */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">Employee Gratuity Eligibility & Calculation</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Date of Joining</th>
                            <th>Years of Service</th>
                            <th>Last Drawn Salary</th>
                            <th>Eligibility</th>
                            <th>Projected Gratuity</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map(employee => {
                            const doj = new Date(employee.doj);
                            const now = new Date();
                            const yearsOfService = (now - doj) / (1000 * 60 * 60 * 24 * 365.25);
                            const isEligible = yearsOfService >= gratuityConfig.eligibilityYears;
                            const gratuityAmount = isEligible ? 
                              Math.min((employee.basicSalary * 15 * yearsOfService) / 26, gratuityConfig.ceilingLimit) : 0;
                            
                            return (
                              <tr key={employee.id}>
                                <td>
                                  <div className="fw-semibold">{employee.name}</div>
                                  <div className="small text-muted">{employee.department}</div>
                                </td>
                                <td>{employee.doj}</td>
                                <td>{yearsOfService.toFixed(2)} years</td>
                                <td>{formatCurrency(employee.basicSalary)}</td>
                                <td>
                                  {isEligible ? (
                                    <span className="badge bg-success-subtle text-success">Eligible</span>
                                  ) : (
                                    <span className="badge bg-warning-subtle text-warning">
                                      {Math.ceil(gratuityConfig.eligibilityYears - yearsOfService)} years to go
                                    </span>
                                  )}
                                </td>
                                <td className="fw-bold text-primary">
                                  {isEligible ? formatCurrency(gratuityAmount) : 'N/A'}
                                </td>
                                <td>
                                  <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleCalculateGratuity(employee.id)}
                                  >
                                    Calculate
                                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );

  const renderBonus = () => (
    <div className="row g-4">
      {/* Bonus Configuration */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <h5 className="mb-0">Bonus Act Compliance</h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Configuration */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Bonus Configuration</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Eligibility Threshold (₹)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={bonusConfig.eligibilityThreshold}
                          onChange={(e) => handleUpdateConfig('bonus', 'eligibilityThreshold', parseInt(e.target.value))}
                        />
                        <div className="form-text">Employees earning below this amount are eligible for bonus</div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Calculation Rate (%)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={bonusConfig.calculationRate}
                          onChange={(e) => handleUpdateConfig('bonus', 'calculationRate', parseFloat(e.target.value))}
                          step="0.01"
                        />
                        <div className="form-text">Percentage of basic salary for bonus calculation</div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Minimum Bonus (₹)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={bonusConfig.minimumBonus}
                          onChange={(e) => handleUpdateConfig('bonus', 'minimumBonus', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input 
                            className="form-check-input"
                            type="checkbox"
                            checked={bonusConfig.partialYearCalculation}
                            onChange={(e) => handleUpdateConfig('bonus', 'partialYearCalculation', e.target.checked)}
                          />
                          <label className="form-check-label">
                            Partial year bonus calculation
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bonus Information */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Bonus Act Information</h6>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-warning">
                      <h6 className="alert-heading">Payment of Bonus Act, 1965</h6>
                      <p className="small mb-0">
                        The Act applies to establishments with 20 or more employees. Eligible employees must be paid a minimum bonus of 8.33% of their salary or ₹100, whichever is higher.
                      </p>
                    </div>
                    <div className="mt-3">
                      <h6 className="fw-bold">Key Points:</h6>
                      <ul className="list-unstyled">
                        <li className="mb-1">• Eligibility: Employees earning ≤ ₹21,000 per month</li>
                        <li className="mb-1">• Minimum Bonus: 8.33% of salary or ₹100</li>
                        <li className="mb-1">• Maximum Bonus: 20% of salary</li>
                        <li className="mb-1">• Payment Time: Within 8 months from accounting year end</li>
                        <li>• Partial Year: Pro-rata calculation for employees who worked less than 30 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Bonus Calculation */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">Employee Bonus Calculation - FY 2023-24</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Basic Salary</th>
                            <th>Eligibility</th>
                            <th>Bonus Rate</th>
                            <th>Bonus Amount</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map(employee => {
                            const isEligible = employee.basicSalary <= bonusConfig.eligibilityThreshold;
                            const bonusAmount = isEligible ? 
                              Math.max((employee.basicSalary * bonusConfig.calculationRate) / 100, bonusConfig.minimumBonus) : 0;
                            
                            return (
                              <tr key={employee.id}>
                                <td>
                                  <div className="fw-semibold">{employee.name}</div>
                                  <div className="small text-muted">{employee.employeeId}</div>
                                </td>
                                <td>{formatCurrency(employee.basicSalary)}</td>
                                <td>
                                  {isEligible ? (
                                    <span className="badge bg-success-subtle text-success">Eligible</span>
                                  ) : (
                                    <span className="badge bg-secondary-subtle text-secondary">Not Eligible</span>
                                  )}
                                </td>
                                <td>{bonusConfig.calculationRate}%</td>
                                <td className="fw-bold text-success">
                                  {isEligible ? formatCurrency(bonusAmount) : 'N/A'}
                                </td>
                                <td>
                                  <span className="badge bg-warning-subtle text-warning">Pending</span>
                                </td>
                                <td>
                                  <button 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleCalculateBonus(employee.id)}
                                  >
                                    Calculate
                                  </button>
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
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Employee Compliance Status</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={handleExportReport}
              className="btn btn-primary"
            >
              <Icon icon="heroicons:document-arrow-down" className="me-2" />
              Export
            </button>
            <button 
              onClick={handleRefreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Filters */}
        <div className="p-4 border-bottom">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
              <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
              >
                <option value="All">All Employees</option>
                <option value="pfEligible">PF Eligible</option>
                <option value="esiEligible">ESI Eligible</option>
                <option value="tdsApplicable">TDS Applicable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Employee</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">PF Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">ESI Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">TDS Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Last Declaration</th>
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
                        <div className="small text-muted">{employee.employeeId} • {employee.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {employee.pfEligible ? (
                      <>
                        <div className="fw-semibold text-primary">{formatCurrency(employee.pfContribution)}</div>
                        <div className="small text-muted">UAN: {employee.pfUAN}</div>
                      </>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary">Not Eligible</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {employee.esiEligible ? (
                      <>
                        <div className="fw-semibold text-info">{formatCurrency(employee.esiContribution)}</div>
                        <div className="small text-muted">ESI: {employee.esiNumber}</div>
                      </>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary">Not Eligible</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {employee.tdsApplicable ? (
                      <>
                        <div className="fw-semibold text-success">{formatCurrency(employee.tdsDeduction)}</div>
                        <div className="small text-muted">Monthly TDS</div>
                      </>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary">Not Applicable</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div>{employee.lastDeclaration}</div>
                    <div className="small text-muted">Form 16: Generated</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleViewDetails(employee)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </button>
                      <button className="btn btn-sm btn-outline-warning">
                        Update
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
            <Icon icon="heroicons:users" className="text-4xl mb-3" />
            <h5>No employees found</h5>
            <p>No employees match your search criteria.</p>
          </div>
        )}

        {/* Compliance Summary */}
        <div className="p-4 border-top">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="card border">
                <div className="card-body text-center">
                  <div className="text-primary mb-2">
                    <Icon icon="heroicons:building-library" className="fs-1" />
                  </div>
                  <h4 className="fw-bold">{kpis.eligiblePF}</h4>
                  <p className="text-muted mb-0">PF Eligible Employees</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border">
                <div className="card-body text-center">
                  <div className="text-info mb-2">
                    <Icon icon="heroicons:heart" className="fs-1" />
                  </div>
                  <h4 className="fw-bold">{kpis.eligibleESI}</h4>
                  <p className="text-muted mb-0">ESI Eligible Employees</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border">
                <div className="card-body text-center">
                  <div className="text-success mb-2">
                    <Icon icon="heroicons:document-check" className="fs-1" />
                  </div>
                  <h4 className="fw-bold">{declarations.filter(d => d.verified).length}</h4>
                  <p className="text-muted mb-0">Verified Declarations</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border">
                <div className="card-body text-center">
                  <div className="text-warning mb-2">
                    <Icon icon="heroicons:clock" className="fs-1" />
                  </div>
                  <h4 className="fw-bold">{kpis.pendingDeclarations}</h4>
                  <p className="text-muted mb-0">Pending Declarations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} employees
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
  );

  const renderForms = () => (
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Compliance Forms & Returns</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={handleExportReport}
              className="btn btn-primary"
            >
              <Icon icon="heroicons:document-arrow-down" className="me-2" />
              Export
            </button>
            <button 
              onClick={handleRefreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Filters */}
        <div className="p-4 border-bottom">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
              <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
              <input
                type="text"
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
              >
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="generated">Generated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Forms Table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Form Name</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Employee</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Period</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Date</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((form) => (
                <tr key={form.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <div className="fw-medium text-dark">{form.formName}</div>
                  </td>
                  <td className="px-4 py-3">{form.employeeName}</td>
                  <td className="px-4 py-3">{form.financialYear || form.period}</td>
                  <td className="px-4 py-3">{getStatusBadge(form.status)}</td>
                  <td className="px-4 py-3">{form.generatedDate || form.submittedDate || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleViewDetails(form)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </button>
                      {form.status === 'generated' && (
                        <button className="btn btn-sm btn-outline-success">
                          Download
                        </button>
                      )}
                      {form.status === 'pending' && (
                        <button className="btn btn-sm btn-outline-warning">
                          Generate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-5 text-muted">
            <Icon icon="heroicons:document-text" className="text-4xl mb-3" />
            <h5>No forms found</h5>
            <p>No forms match your search criteria.</p>
          </div>
        )}

        {/* Form Types Summary */}
        <div className="p-4 border-top">
          <h6 className="mb-3">Available Form Types</h6>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="card border cursor-pointer" onClick={() => handleGenerateForm('Form16')}>
                <div className="card-body text-center">
                  <div className="text-primary mb-2">
                    <Icon icon="heroicons:document-text" className="fs-1" />
                  </div>
                  <h6 className="fw-bold">Form 16</h6>
                  <p className="text-muted small mb-0">TDS Certificate</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border cursor-pointer" onClick={() => handleGenerateForm('Form5')}>
                <div className="card-body text-center">
                  <div className="text-success mb-2">
                    <Icon icon="heroicons:document-chart-bar" className="fs-1" />
                  </div>
                  <h6 className="fw-bold">Form 5/10C</h6>
                  <p className="text-muted small mb-0">PF Return</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border cursor-pointer" onClick={() => handleGenerateForm('ESI')}>
                <div className="card-body text-center">
                  <div className="text-info mb-2">
                    <Icon icon="heroicons:document-duplicate" className="fs-1" />
                  </div>
                  <h6 className="fw-bold">ESI Return</h6>
                  <p className="text-muted small mb-0">Half-yearly</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border cursor-pointer" onClick={() => handleGenerateForm('PT')}>
                <div className="card-body text-center">
                  <div className="text-warning mb-2">
                    <Icon icon="heroicons:document" className="fs-1" />
                  </div>
                  <h6 className="fw-bold">PT Return</h6>
                  <p className="text-muted small mb-0">Monthly/Annual</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} forms
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
  );

  const renderDeclarations = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Investment Declarations</h5>
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={() => handleGenerateForm('Declaration')}>
                  <Icon icon="heroicons:document-plus" className="me-2" />
                  New Declaration
                </button>
                <button className="btn btn-outline-primary">
                  <Icon icon="heroicons:bell" className="me-2" />
                  Send Reminders
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Declaration Status */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Declaration Status - FY 2024-25</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Status</th>
                            <th>Submitted Date</th>
                            <th>Verified</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {declarations.map(declaration => (
                            <tr key={declaration.id}>
                              <td className="fw-semibold">{declaration.employeeName}</td>
                              <td>{getStatusBadge(declaration.status)}</td>
                              <td>{declaration.submittedDate || declaration.lastModified || 'N/A'}</td>
                              <td>
                                {declaration.verified ? (
                                  <span className="badge bg-success-subtle text-success">Yes</span>
                                ) : (
                                  <span className="badge bg-warning-subtle text-warning">Pending</span>
                                )}
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary">
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Sections */}
              <div className="col-md-6">
                <div className="card border h-100">
                  <div className="card-header">
                    <h6 className="mb-0">Investment Declaration Sections</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-2">
                      <div className="col-12">
                        <label className="form-label small">Section 80C (Max ₹1,50,000)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={investmentDeclarations.section80C}
                          onChange={(e) => setInvestmentDeclarations(prev => ({...prev, section80C: parseFloat(e.target.value)}))}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">Section 80D</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={investmentDeclarations.section80D}
                          onChange={(e) => setInvestmentDeclarations(prev => ({...prev, section80D: parseFloat(e.target.value)}))}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">NPS (80CCD)</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={investmentDeclarations.npsContribution}
                          onChange={(e) => setInvestmentDeclarations(prev => ({...prev, npsContribution: parseFloat(e.target.value)}))}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">HRA Exemption</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={investmentDeclarations.hraExemption}
                          onChange={(e) => setInvestmentDeclarations(prev => ({...prev, hraExemption: parseFloat(e.target.value)}))}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small">Home Loan Interest</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={investmentDeclarations.homeLoanInterest}
                          onChange={(e) => setInvestmentDeclarations(prev => ({...prev, homeLoanInterest: parseFloat(e.target.value)}))}
                        />
                      </div>
                      <div className="col-12 mt-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Total Declared:</span>
                          <span className="text-primary fw-bold">
                            {formatCurrency(
                              investmentDeclarations.section80C +
                              investmentDeclarations.section80D +
                              investmentDeclarations.npsContribution +
                              investmentDeclarations.hraExemption +
                              investmentDeclarations.homeLoanInterest
                            )}
                          </span>
                        </div>
                        <button className="btn btn-primary w-100 mt-2">
                          Save Declaration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-header bg-transparent border-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Compliance Reports & Reconciliation</h5>
              <button 
                onClick={handleExportReport}
                className="btn btn-primary"
              >
                <Icon icon="heroicons:document-arrow-down" className="me-2" />
                Export Reports
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {/* Reports Summary */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">Available Reports</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Report Name</th>
                            <th>Period</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Generated Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reconciliationReports.map(report => (
                            <tr key={report.id}>
                              <td className="fw-semibold">{report.reportName}</td>
                              <td>{report.period}</td>
                              <td>{getTypeBadge(report.type)}</td>
                              <td>{getStatusBadge(report.status)}</td>
                              <td>{report.generatedDate || 'N/A'}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button className="btn btn-sm btn-outline-primary">
                                    View
                                  </button>
                                  {report.status === 'completed' && (
                                    <button className="btn btn-sm btn-outline-success">
                                      Download
                                    </button>
                                  )}
                                  {report.status === 'pending' && (
                                    <button className="btn btn-sm btn-outline-warning">
                                      Generate
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
              </div>

              {/* Report Generation */}
              <div className="col-12">
                <div className="card border">
                  <div className="card-header">
                    <h6 className="mb-0">Generate New Reports</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:chart-bar" className="text-primary fs-1 mb-3" />
                            <h6 className="fw-bold">PF Reconciliation</h6>
                            <p className="text-muted small mb-3">Employee vs Employer contribution</p>
                            <button className="btn btn-outline-primary w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:chart-pie" className="text-success fs-1 mb-3" />
                            <h6 className="fw-bold">TDS Reconciliation</h6>
                            <p className="text-muted small mb-3">Quarterly TDS statement</p>
                            <button className="btn btn-outline-success w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:chart-bar" className="text-warning fs-1 mb-3" />
                            <h6 className="fw-bold">Compliance Summary</h6>
                            <p className="text-muted small mb-3">All statutory compliance</p>
                            <button className="btn btn-outline-warning w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:document-text" className="text-info fs-1 mb-3" />
                            <h6 className="fw-bold">Annual Return</h6>
                            <p className="text-muted small mb-3">Year-end compliance report</p>
                            <button className="btn btn-outline-info w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:document-chart-bar" className="text-danger fs-1 mb-3" />
                            <h6 className="fw-bold">Audit Report</h6>
                            <p className="text-muted small mb-3">Statutory audit compliance</p>
                            <button className="btn btn-outline-danger w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card border h-100">
                          <div className="card-body text-center">
                            <Icon icon="heroicons:calculator" className="text-dark fs-1 mb-3" />
                            <h6 className="fw-bold">Tax Projection</h6>
                            <p className="text-muted small mb-3">Next FY tax liability</p>
                            <button className="btn btn-outline-dark w-100">
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'pf':
        return renderPF();
      case 'esi':
        return renderESI();
      case 'pt':
        return renderPT();
      case 'tds':
        return renderTDS();
      case 'lwf':
        return renderLWF();
      case 'gratuity':
        return renderGratuity();
      case 'bonus':
        return renderBonus();
      case 'employees':
        return renderEmployees();
      case 'forms':
        return renderForms();
      case 'declarations':
        return renderDeclarations();
      case 'reports':
        return renderReports();
      default:
        return renderPF();
    }
  };

  if (isLoading) {
    return (
      <RecruiterDashboardLayout 
        sidebarContent={sidebarContent}
        userInfo={userInfo}
        appName="Statutory Compliance Engine"
      >
        <div className="container-fluid">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </RecruiterDashboardLayout>
    );
  }

  return (
    <div
      sidebarContent={sidebarContent}
      userInfo={userInfo}
      appName="Statutory Compliance Engine"
    >
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            {activeSection !== 'pf' && (
              <button
                onClick={() => setActiveSection('pf')}
                className="btn btn-link d-flex align-items-center gap-2"
              >
                <Icon icon="heroicons:arrow-left" />
                Back to Compliance
              </button>
            )}
          </div>
          <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
            <Icon icon="heroicons:shield-check" />
            Statutory Compliance Engine v4.3
          </h5>
          <p className="text-muted">
            Manage PF, ESI, TDS, Professional Tax, LWF, Gratuity, and Bonus compliance with automated calculations
          </p>
        </div>

        {/* Compliance Status Summary */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border border-primary">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">Total PF Contribution</p>
                    <h4 className="fw-bold text-primary mb-0">{formatCurrency(kpis.totalPFContribution)}</h4>
                  </div>
                  <Icon icon="heroicons:building-library" className="text-primary fs-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border border-info">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">Total ESI Contribution</p>
                    <h4 className="fw-bold text-info mb-0">{formatCurrency(kpis.totalESIContribution)}</h4>
                  </div>
                  <Icon icon="heroicons:heart" className="text-info fs-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border border-success">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">Total TDS Deduction</p>
                    <h4 className="fw-bold text-success mb-0">{formatCurrency(kpis.totalTDSDeduction)}</h4>
                  </div>
                  <Icon icon="heroicons:banknotes" className="text-success fs-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border border-warning">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">Pending Declarations</p>
                    <h4 className="fw-bold text-warning mb-0">{kpis.pendingDeclarations}</h4>
                  </div>
                  <Icon icon="heroicons:clock" className="text-warning fs-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {renderContent()}

        {/* Quick Links Footer */}
      

        {/* Generate Form Modal */}
        {showFormModal && selectedForm && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:document-plus" />
                    Generate {selectedForm} Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowFormModal(false);
                      setSelectedForm(null);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-4">
                    <label className="form-label">Select Period</label>
                    <select className="form-select">
                      <option>March 2024</option>
                      <option>Q4 FY 2023-24</option>
                      <option>Full Year 2023-24</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Format</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="format" id="pdf" defaultChecked />
                        <label className="form-check-label" htmlFor="pdf">
                          PDF
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="format" id="excel" />
                        <label className="form-check-label" htmlFor="excel">
                          Excel
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="format" id="csv" />
                        <label className="form-check-label" htmlFor="csv">
                          CSV
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <Icon icon="heroicons:information-circle" className="me-2" />
                    The form will be generated with all relevant employee data and calculations.
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowFormModal(false);
                        setSelectedForm(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => {
                        alert(`Generating ${selectedForm} form... This may take a moment.`);
                        setShowFormModal(false);
                        setSelectedForm(null);
                      }}
                    >
                      <Icon icon="heroicons:document-arrow-down" className="me-2" />
                      Generate & Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showModal && selectedItem && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:eye" />
                    Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {activeSection === 'employees' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Employee Name</label>
                        <p className="form-control-plaintext fw-bold">{selectedItem.name}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Employee ID</label>
                        <p className="form-control-plaintext">{selectedItem.employeeId}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Department</label>
                        <p className="form-control-plaintext">{selectedItem.department}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Date of Joining</label>
                        <p className="form-control-plaintext">{selectedItem.doj}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Basic Salary</label>
                        <p className="form-control-plaintext fw-bold text-primary">{formatCurrency(selectedItem.basicSalary)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Gross Salary</label>
                        <p className="form-control-plaintext">{formatCurrency(selectedItem.grossSalary)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">PF Contribution</label>
                        <p className="form-control-plaintext">{formatCurrency(selectedItem.pfContribution)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">ESI Contribution</label>
                        <p className="form-control-plaintext">{formatCurrency(selectedItem.esiContribution)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">TDS Deduction</label>
                        <p className="form-control-plaintext">{formatCurrency(selectedItem.tdsDeduction)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Professional Tax</label>
                        <p className="form-control-plaintext">{formatCurrency(selectedItem.ptDeduction)}</p>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">PF UAN Number</label>
                        <p className="form-control-plaintext">{selectedItem.pfUAN || 'N/A'}</p>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">ESI Number</label>
                        <p className="form-control-plaintext">{selectedItem.esiNumber || 'N/A'}</p>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'forms' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Form Name</label>
                        <p className="form-control-plaintext fw-bold">{selectedItem.formName}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Employee Name</label>
                        <p className="form-control-plaintext">{selectedItem.employeeName}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">
                          {selectedItem.financialYear ? 'Financial Year' : 'Period'}
                        </label>
                        <p className="form-control-plaintext">{selectedItem.financialYear || selectedItem.period}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Status</label>
                        <p className="form-control-plaintext">{getStatusBadge(selectedItem.status)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">
                          {selectedItem.generatedDate ? 'Generated Date' : 
                           selectedItem.submittedDate ? 'Submitted Date' : 'Date'}
                        </label>
                        <p className="form-control-plaintext">
                          {selectedItem.generatedDate || selectedItem.submittedDate || 'N/A'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatutoryCompliance;