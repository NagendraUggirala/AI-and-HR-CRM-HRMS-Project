import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart3,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Download,
  Filter,
  FileText,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  PieChart,
  Building,
  MapPin,
  CheckCircle,
  XCircle,
  Printer,
  Mail,
  Bell,
  Home,
  Settings,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Eye,
  Plus,
  Info,
  Zap,
  Activity,
  Target,
  Award,
  Thermometer,
  Coffee,
  Sun,
  Moon,
  UserCheck,
  UserX,
  Watch,
  FileSpreadsheet,
  FilePieChart,
  FileBarChart,
  MoreVertical,
  Smartphone,
  Monitor,
  Laptop,
  Globe,
  Navigation,
  Cloud,
  Wind,
  ThermometerSun
} from "lucide-react";

/* ===========================================================
   COMPLETE CSS STYLES
   =========================================================== */
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
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
  border-color: #3b82f6;
}

.filter-actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.btn-primary {
  padding: 10px 18px;
  background: #3b82f6;
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
  background: #2563eb;
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

.kpi-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-icon.present { background: #d1fae5; color: #10b981; }
.kpi-icon.absent { background: #fee2e2; color: #ef4444; }
.kpi-icon.late { background: #fef3c7; color: #f59e0b; }
.kpi-icon.overtime { background: #dbeafe; color: #3b82f6; }
.kpi-icon.punctuality { background: #dcfce7; color: #16a34a; }
.kpi-icon.consistency { background: #e0f2fe; color: #0ea5e9; }
.kpi-icon.alerts { background: #fef3c7; color: #d97706; }
.kpi-icon.leave { background: #f3e8ff; color: #8b5cf6; }

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
  color: #3b82f6;
  border-bottom: 3px solid #3b82f6;
  background: #f0f9ff;
}

/* CALENDAR PANEL */
.cal-wrap {
  background: #ffffff;
  border: 1px solid #dbe4f1;
  padding: 24px;
  border-radius: 14px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cal-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.cal-nav {
  display: flex;
  gap: 10px;
}

.cal-btn {
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.cal-btn:hover {
  background: #e2e8f0;
}

.week-row {
  display: grid;
  grid-template-columns: repeat(7,1fr);
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: #64748b;
  padding: 0 4px;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.cal-day,
.cal-empty {
  height: 90px;
  border-radius: 10px;
  padding: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  position: relative;
  transition: all 0.2s;
}

.cal-day:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cal-day.present { 
  background: #f0fdf4; 
  border-color: #86efac; 
}
.cal-day.absent  { 
  background: #fef2f2; 
  border-color: #fca5a5; 
}
.cal-day.leave   { 
  background: #fffbeb; 
  border-color: #fde68a; 
}
.cal-day.late    { 
  background: #fefce8; 
  border-color: #fde047; 
}

.cal-num {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.today-badge {
  background: #3b82f6;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.cal-dots {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.cal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.cal-dot.present { background: #22c55e; }
.cal-dot.absent  { background: #ef4444; }
.cal-dot.leave   { background: #f59e0b; }
.cal-dot.late    { background: #eab308; }

.legend {
  margin-top: 20px;
  display: flex;
  gap: 24px;
  font-size: 13px;
  flex-wrap: wrap;
}

.leg-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.leg-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.leg-dot.present { background: #22c55e; }
.leg-dot.absent { background: #ef4444; }
.leg-dot.leave { background: #f59e0b; }
.leg-dot.late { background: #eab308; }

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
  grid-template-columns: 2fr 1fr;
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

/* REPORTS GRID */
.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.report-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;
  cursor: pointer;
}

.report-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #93c5fd;
}

.report-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.report-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.report-icon.standard { background: #dbeafe; color: #3b82f6; }
.report-icon.exception { background: #fee2e2; color: #ef4444; }
.report-icon.analytics { background: #d1fae5; color: #10b981; }

.report-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.report-desc {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 16px;
  line-height: 1.5;
}

.report-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #94a3b8;
}

.report-type {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}

.report-type.standard { background: #dbeafe; color: #1d4ed8; }
.report-type.exception { background: #fee2e2; color: #dc2626; }
.report-type.analytics { background: #d1fae5; color: #047857; }

/* ANALYTICS CARDS */
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.metric-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.metric-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.metric-trend {
  font-size: 13px;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
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

.status-present { background: #d1fae5; color: #065f46; }
.status-absent { background: #fee2e2; color: #991b1b; }
.status-late { background: #fef3c7; color: #92400e; }
.status-leave { background: #e0f2fe; color: #075985; }

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

/* RESPONSIVE */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .reports-grid {
    grid-template-columns: repeat(2, 1fr);
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
  .reports-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    overflow-x: auto;
  }
  
  .tab-btn {
    padding: 12px 16px;
    font-size: 13px;
  }
}
`;

/* ===========================================================
   CALENDAR COMPONENT
   =========================================================== */
const AttendanceCalendar = ({ attendanceData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const format = (d) => d.toISOString().split("T")[0];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let daysArray = [];
    
    // Empty days for previous month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const dayDate = new Date(year, month, d);
      const dayStr = format(dayDate);
      const records = attendanceData.filter(x => x.date === dayStr);

      let statuses = [];
      if (records.length > 0) {
        records.forEach(record => {
          statuses.push(record.status);
          if (record.late > 0) statuses.push('late');
        });
      }

      daysArray.push({
        day: d,
        dateStr: dayStr,
        statuses: statuses.length > 0 ? [...new Set(statuses)] : ['none'],
        records: records
      });
    }

    return daysArray;
  }, [attendanceData, year, month]);

  const getDayClass = (statuses) => {
    if (statuses.includes('absent')) return 'absent';
    if (statuses.includes('leave')) return 'leave';
    if (statuses.includes('late')) return 'late';
    if (statuses.includes('present')) return 'present';
    return '';
  };

  return (
    <div className="cal-wrap">
      <div className="cal-header">
        <div className="cal-title">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </div>
        <div className="cal-nav">
          <button className="cal-btn" onClick={prevMonth}>
            <ChevronLeft size={18} />
          </button>
          <button className="cal-btn" onClick={goToday}>
            Today
          </button>
          <button className="cal-btn" onClick={nextMonth}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="week-row">
        <div>Sun</div><div>Mon</div><div>Tue</div>
        <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="cal-grid">
        {days.map((day, index) =>
          day === null ? (
            <div key={index} className="cal-empty" />
          ) : (
            <div key={index} className={`cal-day ${getDayClass(day.statuses)}`}>
              <div className="cal-num">
                {day.day}
                {day.dateStr === format(new Date()) && (
                  <span className="today-badge">Today</span>
                )}
              </div>
              <div className="cal-dots">
                {day.statuses.map((status, idx) => (
                  <div key={idx} className={`cal-dot ${status}`} />
                ))}
              </div>
              {day.records.length > 0 && (
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                  {day.records.length} records
                </div>
              )}
            </div>
          )
        )}
      </div>

      <div className="legend">
        <div className="leg-item">
          <div className="leg-dot present"></div>
          <span>Present</span>
        </div>
        <div className="leg-item">
          <div className="leg-dot absent"></div>
          <span>Absent</span>
        </div>
        <div className="leg-item">
          <div className="leg-dot leave"></div>
          <span>Leave</span>
        </div>
        <div className="leg-item">
          <div className="leg-dot late"></div>
          <span>Late</span>
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   MAIN COMPONENT
   =========================================================== */
const AttendanceReports = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("manager");
  const [selectedReport, setSelectedReport] = useState(null);

  const [filters, setFilters] = useState({
    date: "month",
    department: "all",
    location: "all",
    employee: "all",
  });

  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);

  /* -----------------------
     MOCK DATA GENERATION
     ----------------------- */
  useEffect(() => {
    // Generate employees
    const emps = [
      { id: "EMP001", name: "John Smith", department: "Engineering", location: "HQ" },
      { id: "EMP002", name: "Sarah Johnson", department: "Marketing", location: "HQ" },
      { id: "EMP003", name: "Robert Chen", department: "Sales", location: "Branch A" },
      { id: "EMP004", name: "Maria Garcia", department: "HR", location: "HQ" },
      { id: "EMP005", name: "David Kim", department: "Engineering", location: "Remote" },
      { id: "EMP006", name: "Lisa Wang", department: "Finance", location: "HQ" },
      { id: "EMP007", name: "Tom Brown", department: "Operations", location: "Branch B" },
      { id: "EMP008", name: "Emma Davis", department: "Marketing", location: "Remote" }
    ];
    setEmployees(emps);

    // Generate attendance data
    const attendance = [];
    const today = new Date();

    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      emps.forEach(emp => {
        const rand = Math.random();
        let status = "present";
        let late = 0;
        let overtime = 0;

        if (rand < 0.05) status = "absent";
        else if (rand < 0.1) status = "leave";
        else if (rand < 0.25) {
          status = "present";
          late = Math.floor(Math.random() * 30);
        }

        if (status === "present" && rand < 0.3) {
          overtime = Math.floor(Math.random() * 4);
        }

        attendance.push({
          id: `${emp.id}_${dateStr}`,
          date: dateStr,
          employeeId: emp.id,
          employeeName: emp.name,
          department: emp.department,
          location: emp.location,
          status,
          late,
          overtime,
          inTime: status === 'present' ? `09:${Math.floor(Math.random() * 15)}` : null,
          outTime: status === 'present' ? `18:${Math.floor(Math.random() * 45)}` : null
        });
      });
    }
    setAttendanceData(attendance);

    // Generate analytics data
    const analytics = {
      trends: {
        daily: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
          present: Math.floor(Math.random() * 10) + 85,
          absent: Math.floor(Math.random() * 5) + 2,
          late: Math.floor(Math.random() * 8) + 1,
          overtime: Math.floor(Math.random() * 15) + 5
        })),
        department: [
          { name: 'Engineering', present: 96, absent: 2, late: 2, overtime: 45 },
          { name: 'Marketing', present: 94, absent: 3, late: 3, overtime: 32 },
          { name: 'Sales', present: 88, absent: 8, late: 4, overtime: 28 },
          { name: 'HR', present: 98, absent: 1, late: 1, overtime: 12 },
          { name: 'Finance', present: 95, absent: 3, late: 2, overtime: 18 },
          { name: 'Operations', present: 90, absent: 6, late: 4, overtime: 22 }
        ],
        location: [
          { name: 'HQ', present: 94, absent: 3, late: 3, overtime: 85 },
          { name: 'Branch A', present: 92, absent: 5, late: 3, overtime: 38 },
          { name: 'Branch B', present: 89, absent: 7, late: 4, overtime: 25 },
          { name: 'Remote', present: 91, absent: 5, late: 4, overtime: 8 }
        ]
      },
      metrics: {
        absenteeismRate: 4.2,
        punctualityScore: 88.7,
        leaveUtilization: 65.3,
        overtimeRate: 18.5,
        attendanceConsistency: 91.2,
        peakAbsenceDays: ['Monday', 'Friday'],
        peakAbsencePeriods: ['January', 'December'],
        anomalyThreshold: 3,
        predictiveAlerts: 12
      }
    };
    setAnalyticsData(analytics);

    // Generate reports
    const reportList = [
      {
        id: 1,
        name: 'Daily Attendance Summary',
        type: 'standard',
        frequency: 'daily',
        description: 'Daily attendance summary with present/absent/late counts for all employees',
        lastGenerated: '2024-01-20',
        columns: ['Employee', 'Department', 'In Time', 'Out Time', 'Status', 'Overtime']
      },
      {
        id: 2,
        name: 'Monthly Attendance Register',
        type: 'standard',
        frequency: 'monthly',
        description: 'Complete monthly attendance register for payroll processing',
        lastGenerated: '2024-01-01',
        columns: ['Date', 'Employee', 'Shift', 'Hours', 'Status', 'Remarks']
      },
      {
        id: 3,
        name: 'Absent/Late Employee Report',
        type: 'exception',
        frequency: 'weekly',
        description: 'List of employees with frequent absences or late arrivals',
        lastGenerated: '2024-01-15',
        columns: ['Employee', 'Department', 'Absent Days', 'Late Count', 'Action Required']
      },
      {
        id: 4,
        name: 'Overtime Analysis Report',
        type: 'analytics',
        frequency: 'monthly',
        description: 'Overtime trends and department-wise analysis with cost impact',
        lastGenerated: '2024-01-10',
        columns: ['Department', 'Total Overtime', 'Avg Overtime', 'Cost Impact', 'Trend']
      },
      {
        id: 5,
        name: 'Leave Utilization Report',
        type: 'analytics',
        frequency: 'monthly',
        description: 'Leave type utilization and balance analysis with forecasting',
        lastGenerated: '2024-01-05',
        columns: ['Leave Type', 'Allocated', 'Used', 'Balance', 'Utilization %']
      },
      {
        id: 6,
        name: 'Department-wise Statistics',
        type: 'analytics',
        frequency: 'weekly',
        description: 'Department-level attendance metrics and comparisons',
        lastGenerated: '2024-01-18',
        columns: ['Department', 'Present %', 'Absent %', 'Late %', 'Overtime Hours']
      },
      {
        id: 7,
        name: 'Attendance Exception Report',
        type: 'exception',
        frequency: 'daily',
        description: 'All attendance exceptions and violations with approval status',
        lastGenerated: '2024-01-19',
        columns: ['Employee', 'Exception Type', 'Date', 'Duration', 'Approval Status']
      },
      {
        id: 8,
        name: 'Muster Roll Report',
        type: 'standard',
        frequency: 'monthly',
        description: 'Official muster roll for statutory compliance and payroll',
        lastGenerated: '2023-12-31',
        columns: ['Employee', 'Days Worked', 'Leave Days', 'Holidays', 'Net Payable Days']
      },
      {
        id: 9,
        name: 'Employee-wise Attendance Summary',
        type: 'standard',
        frequency: 'monthly',
        description: 'Individual employee attendance summary with trends',
        lastGenerated: '2024-01-15',
        columns: ['Employee', 'Present Days', 'Absent Days', 'Late Days', 'Overtime Hours']
      },
      {
        id: 10,
        name: 'Location-wise Attendance Trends',
        type: 'analytics',
        frequency: 'weekly',
        description: 'Attendance patterns and trends across different locations',
        lastGenerated: '2024-01-17',
        columns: ['Location', 'Present %', 'Absent %', 'Late %', 'Peak Hours']
      }
    ];
    setReports(reportList);

    // Generate alerts
    const alertList = [
      { id: 1, type: 'anomaly', employee: 'Robert Chen', message: '3 consecutive late arrivals this week', severity: 'medium', date: '2024-01-19' },
      { id: 2, type: 'pattern', employee: 'Sarah Johnson', message: 'High absenteeism on Mondays (4 out of last 6)', severity: 'high', date: '2024-01-18' },
      { id: 3, type: 'threshold', department: 'Sales', message: 'Department absenteeism rate > 8% this month', severity: 'high', date: '2024-01-17' },
      { id: 4, type: 'predictive', employee: 'David Kim', message: 'Likely absence pattern detected for next week', severity: 'low', date: '2024-01-16' },
      { id: 5, type: 'overtime', employee: 'John Smith', message: 'Excessive overtime detected (45 hours this month)', severity: 'medium', date: '2024-01-15' }
    ];
    setAlerts(alertList);
  }, []);

  /* -----------------------
     CALCULATE STATISTICS
     ----------------------- */
  const filteredData = useMemo(() => {
    let data = [...attendanceData];
    
    if (filters.department !== "all") {
      data = data.filter(item => item.department === filters.department);
    }
    
    if (filters.location !== "all") {
      data = data.filter(item => item.location === filters.location);
    }
    
    if (filters.employee !== "all") {
      data = data.filter(item => item.employeeId === filters.employee);
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
  }, [attendanceData, filters, search]);

  const statistics = useMemo(() => {
    if (filteredData.length === 0) return {};
    
    const totalRecords = filteredData.length;
    const presentCount = filteredData.filter(x => x.status === "present").length;
    const absentCount = filteredData.filter(x => x.status === "absent").length;
    const leaveCount = filteredData.filter(x => x.status === "leave").length;
    const lateCount = filteredData.filter(x => x.late > 0).length;
    const totalOvertime = filteredData.reduce((sum, x) => sum + x.overtime, 0);
    const avgOvertime = totalOvertime / presentCount || 0;
    
    return {
      totalRecords,
      presentCount,
      absentCount,
      leaveCount,
      lateCount,
      presentRate: ((presentCount / totalRecords) * 100).toFixed(1),
      absentRate: ((absentCount / totalRecords) * 100).toFixed(1),
      lateRate: ((lateCount / totalRecords) * 100).toFixed(1),
      leaveRate: ((leaveCount / totalRecords) * 100).toFixed(1),
      totalOvertime,
      avgOvertime: avgOvertime.toFixed(1)
    };
  }, [filteredData]);

  /* -----------------------
     TAB RENDERING
     ----------------------- */
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "reports":
        return renderReports();
      case "analytics":
        return renderAnalytics();
      case "exceptions":
        return renderExceptions();
      case "alerts":
        return renderAlerts();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#1e293b' }}>
        Attendance Dashboard Overview
      </h2>
      
      <div className="dashboard-grid">
        <div>
          <div className="chart-card">
            <div className="chart-title">
              Daily Attendance Trends
              <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
                <option>Last 30 Days</option>
                <option>Last 60 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '4px', padding: '20px 0' }}>
              {analyticsData.trends?.daily.slice(-14).map((day, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: `${day.present}%`, backgroundColor: '#10b981', borderRadius: '4px 4px 0 0' }} />
                  <div style={{ width: '12px', height: `${day.absent}%`, backgroundColor: '#ef4444', marginTop: '2px' }} />
                  <div style={{ width: '12px', height: `${day.late}%`, backgroundColor: '#f59e0b', marginTop: '2px' }} />
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
                    {new Date(day.date).getDate()}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }} />
                Present
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
                Absent
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%' }} />
                Late
              </div>
            </div>
          </div>

          <AttendanceCalendar attendanceData={filteredData} />
        </div>

        <div>
          <div className="chart-card">
            <div className="chart-title">
              Department Performance
            </div>
            <div style={{ marginTop: '16px' }}>
              {analyticsData.trends?.department.map((dept, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 500 }}>{dept.name}</span>
                    <span style={{ color: '#475569' }}>{dept.present}% Present</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${dept.present}%`,
                        background: `linear-gradient(90deg, #10b981, #22c55e)`,
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                    <span>Absent: {dept.absent}%</span>
                    <span>Late: {dept.late}%</span>
                    <span>OT: {dept.overtime}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card" style={{ marginTop: '20px' }}>
            <div className="chart-title">
              Top Performers
            </div>
            <div style={{ marginTop: '12px' }}>
              {employees.slice(0, 4).map((emp, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderBottom: index < 3 ? '1px solid #f1f5f9' : 'none',
                    backgroundColor: index === 0 ? '#f0f9ff' : 'transparent'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      backgroundColor: index === 0 ? '#3b82f6' : '#10b981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '14px' }}>{emp.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{emp.department}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#10b981', fontSize: '16px' }}>
                      {Math.floor(Math.random() * 10) + 92}%
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Attendance</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderReports = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
          Standard Reports Library
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

      <div className="reports-grid">
        {reports.map(report => (
          <div key={report.id} className="report-card" onClick={() => setSelectedReport(report)}>
            <div className="report-header">
              <div className={`report-icon ${report.type}`}>
                {report.type === 'standard' ? <FileText size={20} /> :
                 report.type === 'exception' ? <AlertCircle size={20} /> :
                 <BarChart3 size={20} />}
              </div>
              <div>
                <div className="report-title">{report.name}</div>
                <span className={`report-type ${report.type}`}>
                  {report.type.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="report-desc">
              {report.description}
            </div>
            <div className="report-footer">
              <div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Frequency: {report.frequency}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  Last Generated: {report.lastGenerated}
                </div>
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

  const renderAnalytics = () => (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#1e293b' }}>
        Analytics & Insights
      </h2>

      <div className="analytics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <PieChart size={18} color="#8b5cf6" />
            <div className="metric-title">Absenteeism Rate</div>
          </div>
          <div className="metric-value">{analyticsData.metrics?.absenteeismRate || 0}%</div>
          <div className="metric-trend">
            <TrendingUp size={14} />
            Industry average: 3.5%
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
            Lower than industry standard by 0.7%
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <Target size={18} color="#16a34a" />
            <div className="metric-title">Punctuality Score</div>
          </div>
          <div className="metric-value">{analyticsData.metrics?.punctualityScore || 0}%</div>
          <div className="metric-trend">
            <TrendingUp size={14} />
            Target: 90% ✓
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
            Exceeding target by {analyticsData.metrics?.punctualityScore - 90 || 0}%
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <Clock size={18} color="#3b82f6" />
            <div className="metric-title">Overtime Rate</div>
          </div>
          <div className="metric-value">{analyticsData.metrics?.overtimeRate || 0}%</div>
          <div className="metric-trend">
            <TrendingUp size={14} />
            +2.3% from last month
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
            Primarily in Engineering & Sales departments
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <Calendar size={18} color="#f59e0b" />
            <div className="metric-title">Leave Utilization</div>
          </div>
          <div className="metric-value">{analyticsData.metrics?.leaveUtilization || 0}%</div>
          <div className="metric-trend">
            Optimal range: 60-70%
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
            Within optimal utilization range
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <TrendingUp size={18} color="#0ea5e9" />
            <div className="metric-title">Attendance Consistency</div>
          </div>
          <div className="metric-value">{analyticsData.metrics?.attendanceConsistency || 0}%</div>
          <div className="metric-trend">
            <TrendingUp size={14} />
            Very Good
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
            94% of employees have 85% consistency
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <AlertCircle size={18} color="#dc2626" />
            <div className="metric-title">Predictive Alerts</div>
          </div>
          <div className="metric-value">{analyticsData.metrics?.predictiveAlerts || 0}</div>
          <div className="metric-trend">
            <AlertCircle size={14} />
            Requires attention
          </div>
          <div style={{ marginTop: '12px', fontSize: '13px', color: '#64748b' }}>
            {analyticsData.metrics?.predictiveAlerts || 0} patterns detected this month
          </div>
        </div>
      </div>

      <div className="chart-card" style={{ marginTop: '24px' }}>
        <div className="chart-title">
          Peak Absence Analysis
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Peak Absence Days</div>
            <div>
              {(analyticsData.metrics?.peakAbsenceDays || ['Monday', 'Friday']).map((day, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: index < 1 ? '1px solid #f1f5f9' : 'none'
                }}>
                  <span style={{ color: '#475569' }}>{day}</span>
                  <span style={{ fontWeight: 600, color: '#dc2626' }}>
                    {day === 'Monday' ? '68%' : day === 'Friday' ? '72%' : '60%'} absence
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>High Absence Periods</div>
            <div>
              {(analyticsData.metrics?.peakAbsencePeriods || ['January', 'December']).map((period, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: index < 1 ? '1px solid #f1f5f9' : 'none'
                }}>
                  <span style={{ color: '#475569' }}>{period}</span>
                  <span style={{ fontWeight: 600, color: '#d97706' }}>
                    {period === 'January' ? '85%' : '82%'} higher than average
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderExceptions = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
          Attendance Exception Reports
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '14px' }}>
            <option>All Exception Types</option>
            <option>Late Arrivals</option>
            <option>Early Departures</option>
            <option>Absent Without Leave</option>
            <option>Overtime Violations</option>
          </select>
          <button className="btn-primary">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Exception Type</th>
              <th>Date & Time</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .filter(record => record.status === 'absent' || record.late > 15)
              .slice(0, 10)
              .map((record, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#3b82f6',
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
                      backgroundColor: '#dbeafe',
                      color: '#1d4ed8',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      {record.department}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {record.status === 'absent' ? (
                        <>
                          <XCircle size={14} color="#ef4444" />
                          <span style={{ color: '#dc2626', fontWeight: 500 }}>Absent</span>
                        </>
                      ) : (
                        <>
                          <Clock size={14} color="#f59e0b" />
                          <span style={{ color: '#d97706', fontWeight: 500 }}>
                            Late by {record.late} mins
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>{record.date}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {record.inTime} - {record.outTime}
                    </div>
                  </td>
                  <td>
                    {record.status === 'absent' ? 'Full Day' : `${record.late} mins`}
                  </td>
                  <td>
                    <span className={`status-badge ${record.status === 'absent' ? 'status-absent' : 'status-late'}`}>
                      {record.status === 'absent' ? 'Pending Review' : 'In Review'}
                    </span>
                  </td>
                  <td>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderAlerts = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
          Predictive Alerts & Anomaly Detection
        </h2>
        <button className="btn-secondary" style={{ backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' }}>
          <AlertCircle size={16} />
          Configure Alerts
        </button>
      </div>

      <div className="alerts-grid">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-card alert-${alert.severity}`}>
            <div className="alert-header">
              <AlertCircle size={18} />
              <div className="alert-title">
                {alert.type.toUpperCase()} ALERT
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748b' }}>
                {alert.date}
              </div>
            </div>
            <div style={{ fontSize: '14px', marginBottom: '12px' }}>
              {alert.employee ? `${alert.employee}: ${alert.message}` : alert.message}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '6px 12px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer',
                flex: 1
              }}>
                Acknowledge
              </button>
              <button style={{
                padding: '6px 12px',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer',
                flex: 1
              }}>
                View Pattern
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-card" style={{ marginTop: '24px' }}>
        <div className="chart-title">
          Anomaly Detection Rules
        </div>
        <div style={{ marginTop: '16px' }}>
          {[
            { rule: 'Consecutive Late Arrivals', threshold: '3 consecutive days', count: 12, color: '#ef4444' },
            { rule: 'Frequent Absence Pattern', threshold: 'Same day weekly absence', count: 8, color: '#f59e0b' },
            { rule: 'Excessive Overtime', threshold: '>15 hours per week', count: 5, color: '#3b82f6' },
            { rule: 'Department Threshold', threshold: 'Absenteeism rate > 8%', count: 2, color: '#8b5cf6' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '14px' }}>{item.rule}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Trigger: {item.threshold}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: item.color }}>
                  {item.count}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  This month
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  /* -----------------------
     MAIN RENDER
     ----------------------- */
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
              backgroundColor: '#3b82f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BarChart3 size={24} color="white" />
            </div>
            <div>
              <div className="header-title">Attendance Reports & Analytics</div>
              <div className="header-sub">
                <span>HRMS Dashboard</span>
                <span>•</span>
                <span>Version 3.8</span>
                <span>•</span>
                <span>Comprehensive analytics and insights</span>
              </div>
            </div>
          </div>

          {/* SEARCH + ROLE */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "#94a3b8" }} />
              <input
                className="search-box"
                placeholder="Search reports or employees..."
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
              <option value="employee">👤 Employee</option>
              <option value="manager">👔 Manager</option>
              <option value="hr">🏢 HR Admin</option>
              <option value="admin">⚙️ System Admin</option>
            </select>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filter-section">
          <div className="filter-row">
            <select
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
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
              value={filters.employee}
              onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
            >
              <option value="all">All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
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
                <div className="kpi-label">Present Rate</div>
                <div className="kpi-value">{statistics.presentRate || 0}%</div>
                <div className="kpi-trend">
                  <TrendingUp size={12} />
                  +2.1% from last month
                </div>
              </div>
              <div className="kpi-icon present">
                <CheckCircle size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Absent Rate</div>
                <div className="kpi-value">{statistics.absentRate || 0}%</div>
                <div className="kpi-trend" style={{ color: '#ef4444' }}>
                  <TrendingUp size={12} />
                  -0.3% from last month
                </div>
              </div>
              <div className="kpi-icon absent">
                <XCircle size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Late Arrivals</div>
                <div className="kpi-value">{statistics.lateRate || 0}%</div>
                <div className="kpi-trend" style={{ color: '#f59e0b' }}>
                  <AlertCircle size={12} />
                  Requires attention
                </div>
              </div>
              <div className="kpi-icon late">
                <Clock size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Total Overtime</div>
                <div className="kpi-value">{statistics.totalOvertime || 0}h</div>
                <div className="kpi-trend">
                  <Zap size={12} />
                  {statistics.avgOvertime || 0}h avg per employee
                </div>
              </div>
              <div className="kpi-icon overtime">
                <Zap size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Punctuality Score</div>
                <div className="kpi-value">{analyticsData.metrics?.punctualityScore || 0}%</div>
                <div className="kpi-trend">
                  <Target size={12} />
                  Target: 90% ✓
                </div>
              </div>
              <div className="kpi-icon punctuality">
                <Target size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Consistency Score</div>
                <div className="kpi-value">{analyticsData.metrics?.attendanceConsistency || 0}%</div>
                <div className="kpi-trend">
                  <TrendingUp size={12} />
                  Very Good
                </div>
              </div>
              <div className="kpi-icon consistency">
                <Activity size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Alerts</div>
                <div className="kpi-value">{alerts.length}</div>
                <div className="kpi-trend" style={{ color: '#d97706' }}>
                  <Bell size={12} />
                  Requires review
                </div>
              </div>
              <div className="kpi-icon alerts">
                <Bell size={20} />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-content">
                <div className="kpi-label">Leave Utilization</div>
                <div className="kpi-value">{analyticsData.metrics?.leaveUtilization || 0}%</div>
                <div className="kpi-trend" style={{ color: '#8b5cf6' }}>
                  <Calendar size={12} />
                  Optimal range
                </div>
              </div>
              <div className="kpi-icon leave">
                <Calendar size={20} />
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
            className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            <FileText size={16} />
            Reports
          </button>
          <button
            className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 size={16} />
            Analytics
          </button>
          <button
            className={`tab-btn ${activeTab === "exceptions" ? "active" : ""}`}
            onClick={() => setActiveTab("exceptions")}
          >
            <AlertCircle size={16} />
            Exceptions
          </button>
          <button
            className={`tab-btn ${activeTab === "alerts" ? "active" : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            <Bell size={16} />
            Alerts
          </button>
          {(role === "hr" || role === "admin") && (
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

        {/* REPORT MODAL */}
        {selectedReport && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                  {selectedReport.name}
                </h3>
                <button 
                  onClick={() => setSelectedReport(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#64748b' }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
                  {selectedReport.description}
                </div>
                
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                    Columns Included:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedReport.columns.map((col, idx) => (
                      <span key={idx} style={{
                        padding: '4px 8px',
                        backgroundColor: '#e2e8f0',
                        color: '#475569',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                    Date Range
                  </label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '8px' }}>
                    Format
                  </label>
                  <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <option>PDF</option>
                    <option>Excel (XLSX)</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button className="btn-secondary" onClick={() => setSelectedReport(null)}>
                  Cancel
                </button>
                <button className="btn-primary">
                  <Download size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceReports;