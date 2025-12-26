import React, { useState, useEffect, useMemo } from "react";
import {
  Calculator,
  Clock,
  Lock,
  Unlock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  FileText,
  Download,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  Zap,
  CalendarDays,
  CreditCard,
  Edit,
  Printer,
  ChevronRight,
  ChevronLeft,
  Search,
  Home,
  Settings,
  UserX,
  Plus,
  Database
} from "lucide-react";

const styles = `
.page {
  background: #f1f5f9;
  min-height: 100vh;
  padding-bottom: 40px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* HEADER */
.header-top {
  background: #ffffff;
  padding: 18px 22px;
  border-bottom: 1px solid #dbe4ee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-title {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.header-sub {
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* SEARCH */
.search-box {
  padding: 10px 12px 10px 36px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  width: 280px;
  font-size: 14px;
  transition: all 0.2s;
}

.search-box:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* FILTER PANEL */
.filter-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #dbe4ee;
  margin: 18px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.filter-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-row select {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: white;
  font-size: 14px;
  min-width: 180px;
  cursor: pointer;
}

.filter-row select:focus {
  outline: none;
  border-color: #8b5cf6;
}

.filter-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.btn-primary {
  padding: 10px 18px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #7c3aed;
}

.btn-secondary {
  padding: 10px 18px;
  background: white;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.btn-warning {
  padding: 10px 18px;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-warning:hover {
  background: #d97706;
}

.btn-danger {
  padding: 10px 18px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-danger:hover {
  background: #dc2626;
}

/* KPI CARDS */
.kpi-section {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #dbe4ee;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.kpi-card {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 18px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.kpi-content {
  flex: 1;
}

.kpi-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 6px;
}

.kpi-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.kpi-trend {
  font-size: 12px;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.kpi-trend.negative {
  color: #ef4444;
}

.kpi-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-icon.realtime { background: #ede9fe; color: #8b5cf6; }
.kpi-icon.frozen { background: #dbeafe; color: #3b82f6; }
.kpi-icon.loss { background: #fee2e2; color: #ef4444; }
.kpi-icon.overtime { background: #fef3c7; color: #d97706; }
.kpi-icon.holiday { background: #dcfce7; color: #16a34a; }
.kpi-icon.leave { background: #f3e8ff; color: #8b5cf6; }
.kpi-icon.corrections { background: #fef9c3; color: #ca8a04; }
.kpi-icon.processed { background: #d1fae5; color: #10b981; }

/* TABS */
.tabs {
  background: #fff;
  padding: 0;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  gap: 0;
  overflow-x: auto;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.tab-btn {
  padding: 16px 24px;
  border: none;
  background: none;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #475569;
  background: #f8fafc;
}

.tab-btn.active {
  color: #8b5cf6;
  border-bottom: 3px solid #8b5cf6;
  background: #f5f3ff;
}

/* TAB CONTENT */
.tab-content {
  background: #fff;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-top: 0;
  min-height: 400px;
}

/* DASHBOARD LAYOUT */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 24px;
  margin-top: 20px;
}

.chart-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* PAYROLL PROCESS SECTION */
.payroll-process {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.process-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.process-step {
  text-align: center;
  padding: 16px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  position: relative;
}

.process-step.active {
  background: #f5f3ff;
  border-color: #8b5cf6;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
}

.process-step.completed {
  background: #f0fdf4;
  border-color: #22c55e;
}

.process-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  background: #e2e8f0;
  color: #64748b;
}

.process-step.active .process-icon {
  background: #8b5cf6;
  color: white;
}

.process-step.completed .process-icon {
  background: #22c55e;
  color: white;
}

/* FREEZE STATUS */
.freeze-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #f5f3ff, #ede9fe);
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #ddd6fe;
  margin-bottom: 20px;
}

.freeze-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.freeze-badge.frozen {
  background: #fee2e2;
  color: #dc2626;
}

.freeze-badge.unfrozen {
  background: #d1fae5;
  color: #065f46;
}

/* TABLE STYLES */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th {
  background: #f8fafc;
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
}

.data-table tr:hover {
  background: #f8fafc;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.status-pending { background: #fef3c7; color: #92400e; }
.status-processed { background: #d1fae5; color: #065f46; }
.status-frozen { background: #dbeafe; color: #1e40af; }
.status-error { background: #fee2e2; color: #991b1b; }

.amount-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.amount-positive { background: #d1fae5; color: #065f46; }
.amount-negative { background: #fee2e2; color: #991b1b; }
.amount-neutral { background: #e2e8f0; color: #475569; }

/* ALERTS */
.alerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.alert-card {
  border-radius: 12px;
  padding: 18px;
  border: 1px solid;
  background: white;
}

.alert-high { border-color: #fca5a5; background: #fef2f2; }
.alert-medium { border-color: #fcd34d; background: #fffbeb; }
.alert-low { border-color: #93c5fd; background: #eff6ff; }

.alert-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.alert-title {
  font-weight: 600;
  font-size: 14px;
}

.alert-high .alert-title { color: #dc2626; }
.alert-medium .alert-title { color: #d97706; }
.alert-low .alert-title { color: #2563eb; }

/* INTEGRATION STATUS */
.integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.integration-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.integration-status {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
}

.status-connected { background: #d1fae5; color: #10b981; }
.status-disconnected { background: #fee2e2; color: #ef4444; }
.status-syncing { background: #fef3c7; color: #d97706; }

/* ACTION BUTTONS */
.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-icon {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: auto;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .process-steps {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
  }
  
  .filter-row {
    flex-direction: column;
  }
  
  .kpi-grid,
  .integration-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    overflow-x: auto;
  }
  
  .tab-btn {
    padding: 12px 16px;
    font-size: 13px;
  }
  
  .process-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;

const PayrollFreezeComponent = ({ freezeStatus, onToggleFreeze }) => {
  return (
    <div className="freeze-status">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: freezeStatus.isFrozen ? '#fee2e2' : '#d1fae5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {freezeStatus.isFrozen ? <Lock size={24} color="#dc2626" /> : <Unlock size={24} color="#16a34a" />}
        </div>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>
            Attendance Data Status: {freezeStatus.isFrozen ? 'Frozen' : 'Open'}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            {freezeStatus.isFrozen 
              ? `Data frozen for payroll processing until ${freezeStatus.freezeEndDate}`
              : 'Attendance data is live and updating'}
          </div>
        </div>
      </div>
      <button 
        className={`btn-${freezeStatus.isFrozen ? 'primary' : 'warning'}`}
        onClick={onToggleFreeze}
      >
        {freezeStatus.isFrozen ? <Unlock size={16} /> : <Lock size={16} />}
        {freezeStatus.isFrozen ? 'Unfreeze Data' : 'Freeze for Payroll'}
      </button>
    </div>
  );
};

const PayrollProcessSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Data Collection', icon: <Database size={20} /> },
    { id: 2, name: 'Attendance Freeze', icon: <Lock size={20} /> },
    { id: 3, name: 'Calculations', icon: <Calculator size={20} /> },
    { id: 4, name: 'Approval', icon: <CheckCircle size={20} /> },
    { id: 5, name: 'Processing', icon: <CreditCard size={20} /> }
  ];

  return (
    <div className="payroll-process">
      <div className="process-header">
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
            Payroll Processing Status
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
            Current Period: Jan 1 - Jan 31, 2024
          </div>
        </div>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          Next Run: Feb 5, 2024
        </div>
      </div>
      
      <div className="process-steps">
        {steps.map(step => {
          let status = '';
          if (step.id < currentStep) status = 'completed';
          else if (step.id === currentStep) status = 'active';
          
          return (
            <div key={step.id} className={`process-step ${status}`}>
              <div className="process-icon">
                {step.icon}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b', marginBottom: '4px' }}>
                Step {step.id}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {step.name}
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button className="btn-secondary">
          <RefreshCw size={16} />
          Refresh Status
        </button>
        <button className="btn-primary">
          <CheckCircle size={16} />
          View Details
        </button>
      </div>
    </div>
  );
};

const PayrollIntegration = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("payroll-admin");
  
  const [filters, setFilters] = useState({
    period: "current-month",
    department: "all",
    location: "all",
    employee: "all",
    status: "all"
  });

  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [integrationStatus, setIntegrationStatus] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [freezeStatus, setFreezeStatus] = useState({
    isFrozen: false,
    freezeStartDate: "",
    freezeEndDate: "",
    frozenBy: ""
  });

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // Generate employees
    const emps = [
      { id: "EMP001", name: "John Smith", department: "Engineering", location: "HQ", basicSalary: 5000 },
      { id: "EMP002", name: "Sarah Johnson", department: "Marketing", location: "HQ", basicSalary: 4500 },
      { id: "EMP003", name: "Robert Chen", department: "Sales", location: "Branch A", basicSalary: 4000 },
      { id: "EMP004", name: "Maria Garcia", department: "HR", location: "HQ", basicSalary: 4200 },
      { id: "EMP005", name: "David Kim", department: "Engineering", location: "Remote", basicSalary: 5500 },
      { id: "EMP006", name: "Lisa Wang", department: "Finance", location: "HQ", basicSalary: 4800 },
      { id: "EMP007", name: "Tom Brown", department: "Operations", location: "Branch B", basicSalary: 3800 },
      { id: "EMP008", name: "Emma Davis", department: "Marketing", location: "Remote", basicSalary: 4300 }
    ];
    setEmployees(emps);

    // Generate payroll data
    const today = new Date();
    const payroll = [];

    emps.forEach(emp => {
      let totalPresent = 0;
      let totalAbsent = 0;
      let totalLate = 0;
      let totalOvertime = 0;
      let holidayWorkDays = 0;
      let leaveWithoutPay = 0;

      // Generate attendance data for current month
      for (let d = 1; d <= 31; d++) {
        const date = new Date(today.getFullYear(), today.getMonth(), d);
        if (date.getMonth() !== today.getMonth()) break;

        const rand = Math.random();
        
        let status = "present";

        if (rand < 0.05) {
          status = "absent";
          totalAbsent++;
          if (rand < 0.02) {
            leaveWithoutPay++;
          }
        } else if (rand < 0.1) {
          status = "leave";
        } else if (rand < 0.25) {
          status = "present";
          totalLate++;
        } else {
          status = "present";
          totalPresent++;
        }

        if (status === "present" && rand < 0.3) {
          totalOvertime += Math.floor(Math.random() * 4);
        }

        // Random holiday work
        if (date.getDay() === 0 && rand < 0.2) {
          holidayWorkDays++;
        }
      }

      // Calculate payroll impact
      const dailyRate = emp.basicSalary / 30;
      const lossOfPay = totalAbsent * dailyRate;
      const overtimePay = totalOvertime * (dailyRate / 8 * 1.5);
      const holidayPay = holidayWorkDays * dailyRate * 2;
      const leaveWithoutPayDeduction = leaveWithoutPay * dailyRate;
      
      const netPay = emp.basicSalary - lossOfPay - leaveWithoutPayDeduction + overtimePay + holidayPay;

      payroll.push({
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.department,
        basicSalary: emp.basicSalary,
        totalPresent,
        totalAbsent,
        totalLate,
        totalOvertime,
        holidayWorkDays,
        leaveWithoutPay,
        lossOfPay: parseFloat(lossOfPay.toFixed(2)),
        overtimePay: parseFloat(overtimePay.toFixed(2)),
        holidayPay: parseFloat(holidayPay.toFixed(2)),
        leaveWithoutPayDeduction: parseFloat(leaveWithoutPayDeduction.toFixed(2)),
        netPay: parseFloat(netPay.toFixed(2)),
        status: "pending",
        lastUpdated: today.toISOString().split("T")[0]
      });
    });

    setPayrollData(payroll);

    // Set integration status
    setIntegrationStatus({
      attendanceSync: { status: 'connected', lastSync: '2024-01-19 23:59:59' },
      payrollSync: { status: 'connected', lastSync: '2024-01-19 23:59:59' },
      dataFreshness: { status: 'current', hoursAgo: 0.5 },
      errorCount: 2
    });

    // Set freeze status
    setFreezeStatus({
      isFrozen: false,
      freezeStartDate: "",
      freezeEndDate: "",
      frozenBy: ""
    });

    // Generate alerts
    const alertList = [
      { id: 1, type: 'sync', message: 'Payroll sync delayed by 2 hours', severity: 'medium', date: '2024-01-19' },
      { id: 2, type: 'calculation', message: 'Overtime calculation mismatch for 3 employees', severity: 'high', date: '2024-01-19' },
      { id: 3, type: 'freeze', message: 'Attendance freeze required for payroll processing', severity: 'medium', date: '2024-01-18' },
      { id: 4, type: 'correction', message: '5 attendance corrections pending approval', severity: 'low', date: '2024-01-18' },
      { id: 5, type: 'holiday', message: 'Holiday work entries missing for 2 employees', severity: 'medium', date: '2024-01-17' }
    ];
    setAlerts(alertList);
  }, []);

  const filteredData = useMemo(() => {
    let data = [...payrollData];
    
    if (filters.department !== "all") {
      data = data.filter(item => item.department === filters.department);
    }
    
    if (filters.location !== "all") {
      const filteredEmps = employees.filter(emp => emp.location === filters.location);
      const empIds = filteredEmps.map(emp => emp.id);
      data = data.filter(item => empIds.includes(item.employeeId));
    }
    
    if (filters.employee !== "all") {
      data = data.filter(item => item.employeeId === filters.employee);
    }
    
    if (filters.status !== "all") {
      data = data.filter(item => item.status === filters.status);
    }
    
    if (search) {
      const query = search.toLowerCase();
      data = data.filter(item =>
        item.employeeName.toLowerCase().includes(query) ||
        item.employeeId.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query)
      );
    }
    
    return data;
  }, [payrollData, filters, search, employees]);

  const statistics = useMemo(() => {
    if (filteredData.length === 0) return {};
    
    const totalEmployees = filteredData.length;
    const totalSalary = filteredData.reduce((sum, x) => sum + x.basicSalary, 0);
    const totalNetPay = filteredData.reduce((sum, x) => sum + x.netPay, 0);
    const totalLossOfPay = filteredData.reduce((sum, x) => sum + x.lossOfPay, 0);
    const totalOvertimePay = filteredData.reduce((sum, x) => sum + x.overtimePay, 0);
    const totalHolidayPay = filteredData.reduce((sum, x) => sum + x.holidayPay, 0);
    const totalCorrections = filteredData.filter(x => x.status === 'pending').length;
    const avgOvertimeHours = filteredData.reduce((sum, x) => sum + x.totalOvertime, 0) / totalEmployees;
    
    return {
      totalEmployees,
      totalSalary: parseFloat(totalSalary.toFixed(2)),
      totalNetPay: parseFloat(totalNetPay.toFixed(2)),
      totalLossOfPay: parseFloat(totalLossOfPay.toFixed(2)),
      totalOvertimePay: parseFloat(totalOvertimePay.toFixed(2)),
      totalHolidayPay: parseFloat(totalHolidayPay.toFixed(2)),
      totalCorrections,
      avgOvertimeHours: parseFloat(avgOvertimeHours.toFixed(1)),
      totalDeductions: parseFloat((totalLossOfPay + filteredData.reduce((sum, x) => sum + x.leaveWithoutPayDeduction, 0)).toFixed(2)),
      totalAdditions: parseFloat((totalOvertimePay + totalHolidayPay).toFixed(2))
    };
  }, [filteredData]);

  const handleToggleFreeze = () => {
    if (freezeStatus.isFrozen) {
      setFreezeStatus({
        isFrozen: false,
        freezeStartDate: "",
        freezeEndDate: "",
        frozenBy: ""
      });
    } else {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 3);
      
      setFreezeStatus({
        isFrozen: true,
        freezeStartDate: today.toISOString().split("T")[0],
        freezeEndDate: endDate.toISOString().split("T")[0],
        frozenBy: "Admin User"
      });
    }
  };

  const handleRunPayroll = () => {
    alert("Payroll processing initiated. This will calculate salaries for all employees.");
  };

  const handleExportData = (format) => {
    alert(`Exporting payroll data in ${format} format...`);
    setShowExportModal(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "payroll-calculation":
        return renderPayrollCalculation();
      case "integration":
        return renderIntegration();
      case "corrections":
        return renderCorrections();
      case "reports":
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#1e293b' }}>
        Payroll Integration Dashboard
      </h2>
      
      <PayrollFreezeComponent 
        freezeStatus={freezeStatus} 
        onToggleFreeze={handleToggleFreeze} 
      />
      
      <PayrollProcessSteps currentStep={2} />
      
      <div className="dashboard-grid">
        <div>
          <div className="chart-card">
            <div className="chart-title">
              Payroll Impact Analysis
              <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
                <option>Current Month</option>
                <option>Last Month</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '20px 0' }}>
              {filteredData.slice(0, 8).map((emp, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <div style={{ width: '16px', height: `${(emp.basicSalary / 6000) * 100}%`, backgroundColor: '#8b5cf6', borderRadius: '4px 4px 0 0' }} />
                    <div style={{ width: '16px', height: `${(emp.netPay / 6000) * 100}%`, backgroundColor: '#10b981', borderRadius: '4px 4px 0 0' }} />
                    <div style={{ width: '16px', height: `${(emp.lossOfPay / 1000) * 100}%`, backgroundColor: '#ef4444', borderRadius: '4px 4px 0 0' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px', textAlign: 'center' }}>
                    {emp.employeeName.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#64748b', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#8b5cf6', borderRadius: '2px' }} />
                Basic Salary
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '2px' }} />
                Net Pay
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: '#ef4444', borderRadius: '2px' }} />
                Deductions
              </div>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-title">
              Top Deductions & Additions
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px', color: '#dc2626' }}>
                  Deductions (${statistics.totalDeductions || 0})
                </div>
                <div>
                  {[
                    { label: 'Loss of Pay', value: statistics.totalLossOfPay || 0 },
                    { label: 'Leave Without Pay', value: (statistics.totalDeductions - statistics.totalLossOfPay) || 0 }
                  ].map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: index < 1 ? '1px solid #f1f5f9' : 'none'
                    }}>
                      <span style={{ color: '#475569' }}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: '#dc2626' }}>
                        ${item.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px', color: '#16a34a' }}>
                  Additions (${statistics.totalAdditions || 0})
                </div>
                <div>
                  {[
                    { label: 'Overtime Pay', value: statistics.totalOvertimePay || 0 },
                    { label: 'Holiday Pay', value: statistics.totalHolidayPay || 0 }
                  ].map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: index < 1 ? '1px solid #f1f5f9' : 'none'
                    }}>
                      <span style={{ color: '#475569' }}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: '#16a34a' }}>
                        ${item.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="chart-card">
            <div className="chart-title">
              Integration Status
            </div>
            <div className="integration-grid">
              <div className="integration-card">
                <div className={`integration-status status-${integrationStatus.attendanceSync?.status || 'disconnected'}`}>
                  {integrationStatus.attendanceSync?.status === 'connected' ? '✓' : '!'}
                </div>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>Attendance Sync</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Last sync: {integrationStatus.attendanceSync?.lastSync || 'N/A'}
                </div>
              </div>
              
              <div className="integration-card">
                <div className={`integration-status status-${integrationStatus.payrollSync?.status || 'disconnected'}`}>
                  {integrationStatus.payrollSync?.status === 'connected' ? '✓' : '!'}
                </div>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>Payroll Sync</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Last sync: {integrationStatus.payrollSync?.lastSync || 'N/A'}
                </div>
              </div>
              
              <div className="integration-card">
                <div className={`integration-status status-${integrationStatus.dataFreshness?.status || 'disconnected'}`}>
                  {integrationStatus.dataFreshness?.status === 'current' ? '✓' : '!'}
                </div>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>Data Freshness</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {integrationStatus.dataFreshness?.hoursAgo || 0} hours ago
                </div>
              </div>
              
              <div className="integration-card">
                <div className={`integration-status status-${integrationStatus.errorCount > 0 ? 'disconnected' : 'connected'}`}>
                  {integrationStatus.errorCount || 0}
                </div>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>Errors</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {integrationStatus.errorCount || 0} issues found
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card" style={{ marginTop: '20px' }}>
            <div className="chart-title">
              Action Required
            </div>
            <div style={{ marginTop: '12px' }}>
              {alerts.slice(0, 3).map((alert, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderBottom: index < 2 ? '1px solid #f1f5f9' : 'none'
                }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '6px',
                    backgroundColor: alert.severity === 'high' ? '#fee2e2' : alert.severity === 'medium' ? '#fef3c7' : '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <AlertCircle size={14} color={alert.severity === 'high' ? '#dc2626' : alert.severity === 'medium' ? '#d97706' : '#2563eb'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>
                      {alert.type.toUpperCase()}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {alert.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <button 
                className="btn-secondary" 
                style={{ width: '100%' }}
                onClick={() => setActiveTab('reports')}
              >
                View All Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderPayrollCalculation = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
          Payroll Calculation Details
        </h2>
        <div className="action-buttons">
          <button className="btn-primary" onClick={handleRunPayroll}>
            <Calculator size={16} />
            Run Payroll
          </button>
          <button className="btn-secondary" onClick={() => setShowExportModal(true)}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Present Days</th>
              <th>Absent Days</th>
              <th>Overtime (Hrs)</th>
              <th>Holiday Work</th>
              <th>Basic Salary</th>
              <th>Loss of Pay</th>
              <th>Overtime Pay</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 15).map((record, index) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}>
                      {record.employeeName.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{record.employeeName}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{record.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#ede9fe',
                    color: '#5b21b6',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500
                  }}>
                    {record.department}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#16a34a' }}>
                    {record.totalPresent}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: record.totalAbsent > 0 ? '#dc2626' : '#64748b' }}>
                    {record.totalAbsent}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} color="#d97706" />
                    <span style={{ fontWeight: 600, color: '#d97706' }}>
                      {record.totalOvertime}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`amount-badge ${record.holidayWorkDays > 0 ? 'amount-positive' : 'amount-neutral'}`}>
                    {record.holidayWorkDays} days
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#475569' }}>
                    ${record.basicSalary.toFixed(2)}
                  </div>
                </td>
                <td>
                  <div style={{ color: '#dc2626', fontWeight: 600 }}>
                    ${record.lossOfPay.toFixed(2)}
                  </div>
                </td>
                <td>
                  <div style={{ color: '#16a34a', fontWeight: 600 }}>
                    ${record.overtimePay.toFixed(2)}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>
                    ${record.netPay.toFixed(2)}
                  </div>
                </td>
                <td>
                  <span className={`status-badge status-${record.status}`}>
                    {record.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-icon" onClick={() => setSelectedRecord(record)}>
                      <CheckCircle size={14} />
                    </button>
                    <button className="btn-icon">
                      <Edit size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          Showing {Math.min(15, filteredData.length)} of {filteredData.length} employees
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary">
            <ChevronLeft size={16} />
            Previous
          </button>
          <button className="btn-secondary">
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );

  const renderIntegration = () => (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#1e293b' }}>
        Attendance-Payroll Integration Features
      </h2>

      <div className="chart-card">
        <div className="chart-title">
          Real-time Data Flow
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#dcfce7',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Database size={20} color="#16a34a" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Real-time Attendance Data</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Live sync with payroll system</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Sync Frequency:</span>
                <span style={{ fontWeight: 500 }}>Every 15 minutes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Last Sync:</span>
                <span style={{ fontWeight: 500 }}>Just now</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>Data Latency:</span>
                <span style={{ fontWeight: 500, color: '#10b981' }}>&lt; 5 minutes</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#fee2e2',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lock size={20} color="#dc2626" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Attendance Freeze</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Secure payroll processing</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Current Status:</span>
                <span className={`freeze-badge ${freezeStatus.isFrozen ? 'frozen' : 'unfrozen'}`}>
                  {freezeStatus.isFrozen ? 'Frozen' : 'Unfrozen'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span>Freeze Window:</span>
                <span style={{ fontWeight: 500 }}>3 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>Next Freeze:</span>
                <span style={{ fontWeight: 500 }}>Feb 1-3, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: '24px' }}>
        <div className="chart-title">
          Calculation Rules & Configuration
        </div>
        <div style={{ marginTop: '16px' }}>
          {[
            { 
              feature: 'Loss of Pay Calculation', 
              description: 'Automatic deduction based on absence days',
              formula: 'Daily Rate × Absent Days',
              status: 'active'
            },
            { 
              feature: 'Overtime Hours Feed', 
              description: 'Overtime hours automatically added to payroll',
              formula: 'Hourly Rate × 1.5 × Overtime Hours',
              status: 'active'
            },
            { 
              feature: 'Holiday Working Pay', 
              description: 'Double pay for holiday work days',
              formula: 'Daily Rate × 2 × Holiday Work Days',
              status: 'active'
            },
            { 
              feature: 'Leave Without Pay Tracking', 
              description: 'Track and deduct for unauthorized leave',
              formula: 'Daily Rate × LWOP Days',
              status: 'active'
            }
          ].map((rule, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: rule.status === 'active' ? '#d1fae5' : '#fef3c7',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {rule.status === 'active' ? <CheckCircle size={16} color="#10b981" /> : <AlertCircle size={16} color="#d97706" />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{rule.feature}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{rule.description}</div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#475569', fontFamily: 'monospace' }}>
                  {rule.formula}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`status-badge ${rule.status === 'active' ? 'status-processed' : 'status-pending'}`}>
                  {rule.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderCorrections = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
          Attendance Corrections & Post-Payroll Handling
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-primary" onClick={() => setShowCorrectionModal(true)}>
            <Plus size={16} />
            Add Correction
          </button>
          <select style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
            <option>All Correction Types</option>
            <option>Time Correction</option>
            <option>Status Change</option>
            <option>Overtime Update</option>
            <option>Post-Payroll Adjustment</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Original Date</th>
              <th>Correction Type</th>
              <th>Original Value</th>
              <th>Corrected Value</th>
              <th>Payroll Impact</th>
              <th>Status</th>
              <th>Requested By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                employeeName: 'John Smith',
                originalDate: '2024-01-15',
                correctionType: 'Overtime Update',
                originalValue: '2 hours',
                correctedValue: '4 hours',
                payrollImpact: '+$75.00',
                status: 'pending',
                requestedBy: 'Manager',
                requestedDate: '2024-01-18'
              },
              {
                id: 2,
                employeeName: 'Sarah Johnson',
                originalDate: '2024-01-16',
                correctionType: 'Status Change',
                originalValue: 'Absent',
                correctedValue: 'Present',
                payrollImpact: '+$150.00',
                status: 'approved',
                requestedBy: 'HR',
                requestedDate: '2024-01-17'
              },
              {
                id: 3,
                employeeName: 'Robert Chen',
                originalDate: '2024-01-10',
                correctionType: 'Time Correction',
                originalValue: '09:30 AM',
                correctedValue: '09:00 AM',
                payrollImpact: 'No Impact',
                status: 'rejected',
                requestedBy: 'Employee',
                requestedDate: '2024-01-12'
              },
              {
                id: 4,
                employeeName: 'Maria Garcia',
                originalDate: '2024-01-05',
                correctionType: 'Post-Payroll Adjustment',
                originalValue: 'Present',
                correctedValue: 'Leave',
                payrollImpact: '-$140.00',
                status: 'pending',
                requestedBy: 'Payroll Admin',
                requestedDate: '2024-01-19'
              }
            ].map((correction, index) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#8b5cf6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}>
                      {correction.employeeName.charAt(0)}
                    </div>
                    <div style={{ fontWeight: 500 }}>{correction.employeeName}</div>
                  </div>
                </td>
                <td>{correction.originalDate}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: '#e0f2fe',
                    color: '#075985',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500
                  }}>
                    {correction.correctionType}
                  </span>
                </td>
                <td>
                  <div style={{ color: '#64748b', fontSize: '13px' }}>
                    {correction.originalValue}
                  </div>
                </td>
                <td>
                  <div style={{ color: '#1e293b', fontWeight: 500, fontSize: '13px' }}>
                    {correction.correctedValue}
                  </div>
                </td>
                <td>
                  <span className={`amount-badge ${
                    correction.payrollImpact.startsWith('+') ? 'amount-positive' :
                    correction.payrollImpact.startsWith('-') ? 'amount-negative' :
                    'amount-neutral'
                  }`}>
                    {correction.payrollImpact}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${correction.status}`}>
                    {correction.status}
                  </span>
                </td>
                <td>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{correction.requestedBy}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{correction.requestedDate}</div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-icon">
                      <CheckCircle size={14} color="#10b981" />
                    </button>
                    <button className="btn-icon">
                      <XCircle size={14} color="#ef4444" />
                    </button>
                    <button className="btn-icon">
                      <CheckCircle size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderReports = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
          Payroll Integration Reports
        </h2>
        <div className="action-buttons">
          <button className="btn-primary">
            <Download size={16} />
            Export All
          </button>
          <button className="btn-secondary">
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {[
          {
            id: 1,
            name: 'Payroll-Attendance Reconciliation',
            type: 'reconciliation',
            description: 'Monthly reconciliation report showing attendance vs payroll data',
            frequency: 'monthly',
            columns: ['Employee', 'Present Days', 'Payable Days', 'Difference', 'Status']
          },
          {
            id: 2,
            name: 'Loss of Pay Report',
            type: 'deduction',
            description: 'Detailed report of all loss of pay calculations and deductions',
            frequency: 'monthly',
            columns: ['Employee', 'Absent Days', 'Daily Rate', 'Deduction', 'Approval']
          },
          {
            id: 3,
            name: 'Overtime Payment Summary',
            type: 'addition',
            description: 'Overtime hours and corresponding payments summary',
            frequency: 'monthly',
            columns: ['Employee', 'Overtime Hours', 'Rate', 'Total Pay', 'Department']
          },
          {
            id: 4,
            name: 'Holiday Working Compensation',
            type: 'addition',
            description: 'Report of holiday work days and double pay compensation',
            frequency: 'monthly',
            columns: ['Employee', 'Holiday Days', 'Regular Pay', 'Additional Pay', 'Total']
          },
          {
            id: 5,
            name: 'Leave Without Pay Report',
            type: 'deduction',
            description: 'Unauthorized leave days and corresponding salary deductions',
            frequency: 'monthly',
            columns: ['Employee', 'LWOP Days', 'Deduction', 'Reason', 'Manager Approval']
          },
          {
            id: 6,
            name: 'Post-Payroll Correction Log',
            type: 'audit',
            description: 'Audit trail of all post-payroll attendance corrections',
            frequency: 'monthly',
            columns: ['Date', 'Employee', 'Correction', 'Impact', 'Approved By']
          },
          {
            id: 7,
            name: 'Attendance Freeze Log',
            type: 'audit',
            description: 'Complete history of attendance freeze periods for payroll',
            frequency: 'quarterly',
            columns: ['Period', 'Freeze Date', 'Unfreeze Date', 'Processed By', 'Status']
          },
          {
            id: 8,
            name: 'Integration Health Report',
            type: 'system',
            description: 'System health and data sync status between attendance and payroll',
            frequency: 'weekly',
            columns: ['Component', 'Last Sync', 'Status', 'Errors', 'Latency']
          }
        ].map(report => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: report.type === 'reconciliation' ? '#dbeafe' : 
                                report.type === 'deduction' ? '#fee2e2' : 
                                report.type === 'addition' ? '#d1fae5' : '#fef3c7',
                color: report.type === 'reconciliation' ? '#3b82f6' : 
                       report.type === 'deduction' ? '#ef4444' : 
                       report.type === 'addition' ? '#10b981' : '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {report.type === 'reconciliation' ? <FileText size={20} /> :
                 report.type === 'deduction' ? <TrendingDown size={20} /> :
                 report.type === 'addition' ? <TrendingUp size={20} /> :
                 <Database size={20} />}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
                  {report.name}
                </div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: report.type === 'reconciliation' ? '#dbeafe' : 
                                  report.type === 'deduction' ? '#fee2e2' : 
                                  report.type === 'addition' ? '#d1fae5' : '#fef3c7',
                  color: report.type === 'reconciliation' ? '#1d4ed8' : 
                         report.type === 'deduction' ? '#dc2626' : 
                         report.type === 'addition' ? '#047857' : '#92400e'
                }}>
                  {report.type.toUpperCase()}
                </span>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: '1.5' }}>
              {report.description}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8' }}>
              <div>
                <div>Frequency: {report.frequency}</div>
                <div>Last Generated: 2024-01-19</div>
              </div>
              <button className="btn-icon" style={{ padding: '6px' }}>
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderCorrectionModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
            Add Attendance Correction
          </h3>
          <button 
            onClick={() => setShowCorrectionModal(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748b' }}
          >
            ×
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                Employee
              </label>
              <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <option>Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                Date
              </label>
              <input 
                type="date" 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
              Correction Type
            </label>
            <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <option>Status Change</option>
              <option>Time Correction</option>
              <option>Overtime Update</option>
              <option>Holiday Work Addition</option>
            </select>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                Original Value
              </label>
              <input 
                type="text" 
                placeholder="e.g., Absent or 09:30"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                Corrected Value
              </label>
              <input 
                type="text" 
                placeholder="e.g., Present or 09:00"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
              Reason for Correction
            </label>
            <textarea 
              rows={3}
              placeholder="Explain the reason for this correction..."
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
            />
          </div>
          
          <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '4px' }}>
              Estimated Payroll Impact: <span style={{ color: '#dc2626' }}>-$150.00</span>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              This will affect the next payroll run. Changes are irreversible once processed.
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={() => setShowCorrectionModal(false)}>
            Cancel
          </button>
          <button className="btn-primary">
            <CheckCircle size={16} />
            Submit Correction
          </button>
        </div>
      </div>
    </div>
  );

  const renderExportModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
            Export Payroll Data
          </h3>
          <button 
            onClick={() => setShowExportModal(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748b' }}
          >
            ×
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
              Export Format
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {['PDF', 'Excel', 'CSV'].map(format => (
                <button
                  key={format}
                  onClick={() => handleExportData(format)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#8b5cf6'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>{format}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {format === 'PDF' ? 'For reports' : format === 'Excel' ? 'For analysis' : 'For import'}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
              Date Range
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input 
                type="date" 
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
              <input 
                type="date" 
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
              Include
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {['Employee Details', 'Attendance Summary', 'Payroll Calculations', 'Deductions', 'Additions', 'Net Pay'].map(item => (
                <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={() => setShowExportModal(false)}>
            Cancel
          </button>
          <button className="btn-primary">
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>

      <div className="page">
        {/* HEADER */}
        <div className="header-top">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#8b5cf6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calculator size={24} color="white" />
            </div>
            <div>
              <div className="header-title">Attendance-Payroll Integration</div>
              <div className="header-sub">
                <span>HRMS Dashboard</span>
                <span>•</span>
                <span>Seamless Integration</span>
                <span>•</span>
                <span>Real-time Data Sync</span>
              </div>
            </div>
          </div>

          {/* SEARCH + ROLE */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "#94a3b8" }} />
              <input
                className="search-box"
                placeholder="Search employees or payroll data..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ 
                padding: "10px 14px", 
                borderRadius: "8px", 
                border: "1px solid #cbd5e1",
                background: "white",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              <option value="payroll-admin">💰 Payroll Admin</option>
              <option value="hr">🏢 HR Manager</option>
              <option value="finance">📊 Finance</option>
              <option value="admin">⚙️ System Admin</option>
            </select>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filter-section">
          <div className="filter-row">
            <select
              value={filters.period}
              onChange={(e) => setFilters({ ...filters, period: e.target.value })}
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>

            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="all">All Locations</option>
              <option value="HQ">Headquarters</option>
              <option value="Branch A">Branch A</option>
              <option value="Branch B">Branch B</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processed">Processed</option>
              <option value="frozen">Frozen</option>
              <option value="error">Error</option>
            </select>

            <div className="filter-actions">
              <button className="btn-primary">
                <Filter size={16} />
                Apply Filters
              </button>
              <button className="btn-secondary">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="kpi-section">
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Real-time Sync</div>
                <div className="kpi-value">{integrationStatus.dataFreshness?.hoursAgo || 0.5}h</div>
                <div className="kpi-trend">
                  <Clock size={12} />
                  Last sync: Just now
                </div>
              </div>
              <div className="kpi-icon realtime">
                <RefreshCw size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Data Status</div>
                <div className="kpi-value">{freezeStatus.isFrozen ? 'Frozen' : 'Live'}</div>
                <div className="kpi-trend" style={{ color: freezeStatus.isFrozen ? '#ef4444' : '#10b981' }}>
                  {freezeStatus.isFrozen ? <Lock size={12} /> : <Unlock size={12} />}
                  {freezeStatus.isFrozen ? 'For payroll processing' : 'Ready for updates'}
                </div>
              </div>
              <div className="kpi-icon frozen">
                {freezeStatus.isFrozen ? <Lock size={20} /> : <Unlock size={20} />}
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Total Loss of Pay</div>
                <div className="kpi-value">${statistics.totalLossOfPay || 0}</div>
                <div className="kpi-trend negative">
                  <TrendingDown size={12} />
                  Affects {filteredData.filter(x => x.lossOfPay > 0).length} employees
                </div>
              </div>
              <div className="kpi-icon loss">
                <TrendingDown size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Overtime Pay</div>
                <div className="kpi-value">${statistics.totalOvertimePay || 0}</div>
                <div className="kpi-trend">
                  <TrendingUp size={12} />
                  {statistics.avgOvertimeHours || 0}h avg per employee
                </div>
              </div>
              <div className="kpi-icon overtime">
                <Zap size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Holiday Pay</div>
                <div className="kpi-value">${statistics.totalHolidayPay || 0}</div>
                <div className="kpi-trend">
                  <CalendarDays size={12} />
                  Double pay for holiday work
                </div>
              </div>
              <div className="kpi-icon holiday">
                <CalendarDays size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Leave Without Pay</div>
                <div className="kpi-value">
                  {filteredData.reduce((sum, x) => sum + x.leaveWithoutPay, 0)} days
                </div>
                <div className="kpi-trend negative">
                  <UserX size={12} />
                  ${(statistics.totalDeductions - statistics.totalLossOfPay).toFixed(2)} deduction
                </div>
              </div>
              <div className="kpi-icon leave">
                <UserX size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Pending Corrections</div>
                <div className="kpi-value">{statistics.totalCorrections || 0}</div>
                <div className="kpi-trend" style={{ color: '#d97706' }}>
                  <AlertCircle size={12} />
                  Requires review
                </div>
              </div>
              <div className="kpi-icon corrections">
                <AlertCircle size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Processed Payroll</div>
                <div className="kpi-value">
                  ${(statistics.totalNetPay || 0).toLocaleString()}
                </div>
                <div className="kpi-trend">
                  <CheckCircle size={12} />
                  For {statistics.totalEmployees || 0} employees
                </div>
              </div>
              <div className="kpi-icon processed">
                <CheckCircle size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Home size={16} />
            Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === "payroll-calculation" ? "active" : ""}`}
            onClick={() => setActiveTab("payroll-calculation")}
          >
            <Calculator size={16} />
            Payroll Calculation
          </button>
          <button
            className={`tab-btn ${activeTab === "integration" ? "active" : ""}`}
            onClick={() => setActiveTab("integration")}
          >
            <Database size={16} />
            Integration
          </button>
          <button
            className={`tab-btn ${activeTab === "corrections" ? "active" : ""}`}
            onClick={() => setActiveTab("corrections")}
          >
            <Edit size={16} />
            Corrections
          </button>
          <button
            className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            <FileText size={16} />
            Reports
          </button>
          {(role === "payroll-admin" || role === "finance") && (
            <button
              className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={16} />
              Settings
            </button>
          )}
        </div>

        {/* TAB CONTENT */}
        <div className="tab-content">
          {renderTabContent()}
        </div>

        {/* MODALS */}
        {showCorrectionModal && renderCorrectionModal()}
        {showExportModal && renderExportModal()}

        {/* SELECTED RECORD MODAL */}
        {selectedRecord && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                  Payroll Details: {selectedRecord.employeeName}
                </h3>
                <button 
                  onClick={() => setSelectedRecord(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748b' }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Employee ID</div>
                    <div style={{ fontWeight: 500 }}>{selectedRecord.employeeId}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Department</div>
                    <div style={{ fontWeight: 500 }}>{selectedRecord.department}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Present Days</div>
                    <div style={{ fontWeight: 500, color: '#16a34a' }}>{selectedRecord.totalPresent}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Absent Days</div>
                    <div style={{ fontWeight: 500, color: '#dc2626' }}>{selectedRecord.totalAbsent}</div>
                  </div>
                </div>
                
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#1e293b' }}>
                    Salary Breakdown
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Basic Salary</div>
                      <div style={{ fontWeight: 600 }}>${selectedRecord.basicSalary.toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Loss of Pay</div>
                      <div style={{ fontWeight: 600, color: '#dc2626' }}>-${selectedRecord.lossOfPay.toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Overtime Pay</div>
                      <div style={{ fontWeight: 600, color: '#16a34a' }}>+${selectedRecord.overtimePay.toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Holiday Pay</div>
                      <div style={{ fontWeight: 600, color: '#16a34a' }}>+${selectedRecord.holidayPay.toFixed(2)}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>Net Pay</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>
                        ${selectedRecord.netPay.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button className="btn-secondary" onClick={() => setSelectedRecord(null)}>
                  Close
                </button>
                <button className="btn-primary">
                  <Download size={16} />
                  Export Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PayrollIntegration;