import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Download,
  Eye,
  Check,
  X,
  Plus,
  Filter,
  Users,
  Calendar,
  FileText,
  Settings,
  Share2,
  Database,
  Layout,
  BarChart3,
  Mail,
  Clock,
  Zap,
  GripVertical,
  Trash2,
  Edit,
  Copy,
  Save,
  Play,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  TrendingUp,
  PieChart,
  BarChart2,
  LineChart,
  Save as SaveIcon,
  RefreshCw,
  Code,
  Globe,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Hash,
  Percent,
  TrendingDown
} from "lucide-react";

/* ---------------- Data Sources and Fields ---------------- */
const dataSources = {
  employee: {
    name: "Employee",
    icon: <Users size={16} />,
    fields: [
      { id: "emp_id", label: "Employee ID", type: "text" },
      { id: "name", label: "Name", type: "text" },
      { id: "email", label: "Email", type: "email" },
      { id: "department", label: "Department", type: "text" },
      { id: "designation", label: "Designation", type: "text" },
      { id: "location", label: "Location", type: "text" },
      { id: "grade", label: "Grade", type: "text" },
      { id: "joining_date", label: "Joining Date", type: "date" },
      { id: "salary", label: "Salary", type: "number" },
      { id: "employment_type", label: "Employment Type", type: "text" },
      { id: "status", label: "Status", type: "text" },
    ]
  },
  attendance: {
    name: "Attendance",
    icon: <Calendar size={16} />,
    fields: [
      { id: "date", label: "Date", type: "date" },
      { id: "employee_id", label: "Employee ID", type: "text" },
      { id: "check_in", label: "Check In", type: "time" },
      { id: "check_out", label: "Check Out", type: "time" },
      { id: "work_hours", label: "Work Hours", type: "number" },
      { id: "status", label: "Status", type: "text" },
      { id: "overtime", label: "Overtime Hours", type: "number" },
      { id: "late_arrival", label: "Late Arrival (min)", type: "number" },
    ]
  },
  payroll: {
    name: "Payroll",
    icon: <BarChart3 size={16} />,
    fields: [
      { id: "employee_id", label: "Employee ID", type: "text" },
      { id: "month", label: "Month", type: "date" },
      { id: "gross_salary", label: "Gross Salary", type: "number" },
      { id: "basic", label: "Basic", type: "number" },
      { id: "hra", label: "HRA", type: "number" },
      { id: "allowances", label: "Allowances", type: "number" },
      { id: "deductions", label: "Deductions", type: "number" },
      { id: "net_salary", label: "Net Salary", type: "number" },
      { id: "tds", label: "TDS", type: "number" },
      { id: "pf", label: "PF", type: "number" },
    ]
  },
  leave: {
    name: "Leave",
    icon: <Calendar size={16} />,
    fields: [
      { id: "employee_id", label: "Employee ID", type: "text" },
      { id: "leave_type", label: "Leave Type", type: "text" },
      { id: "from_date", label: "From Date", type: "date" },
      { id: "to_date", label: "To Date", type: "date" },
      { id: "days", label: "Days", type: "number" },
      { id: "status", label: "Status", type: "text" },
      { id: "applied_date", label: "Applied Date", type: "date" },
      { id: "balance", label: "Balance", type: "number" },
    ]
  }
};

const calculationTypes = [
  { id: "sum", label: "Sum", icon: <Plus size={14} /> },
  { id: "average", label: "Average", icon: <BarChart2 size={14} /> },
  { id: "count", label: "Count", icon: <Hash size={14} /> },
  { id: "percentage", label: "Percentage", icon: <Percent size={14} /> },
  { id: "min", label: "Minimum", icon: <TrendingDown size={14} /> },
  { id: "max", label: "Maximum", icon: <TrendingUp size={14} /> },
];

const sortOrders = ["Ascending", "Descending"];

const exportFormats = [
  { id: "excel", label: "Excel", icon: <FileText size={16} />, extension: ".xlsx" },
  { id: "pdf", label: "PDF", icon: <FileText size={16} />, extension: ".pdf" },
  { id: "csv", label: "CSV", icon: <FileText size={16} />, extension: ".csv" },
];

/* ---------------- Saved Templates ---------------- */
const savedTemplates = [
  { id: 1, name: "Employee Summary Report", description: "Basic employee information with department and location", dataSource: "employee", createdAt: "2024-01-15", lastUsed: "2024-01-20" },
  { id: 2, name: "Monthly Attendance Summary", description: "Monthly attendance report by department", dataSource: "attendance", createdAt: "2024-01-10", lastUsed: "2024-01-19" },
  { id: 3, name: "Payroll Cost Analysis", description: "Department-wise payroll cost breakdown", dataSource: "payroll", createdAt: "2024-01-08", lastUsed: "2024-01-18" },
];

/* ---------------- Component ---------------- */
const CustomReportBuilder = () => {
  const [activeTab, setActiveTab] = useState("builder"); // builder, templates, scheduled, shared
  const [currentReport, setCurrentReport] = useState({
    id: Date.now(),
    name: "New Report",
    description: "",
    dataSource: "employee",
    selectedFields: [],
    filters: [],
    groupBy: [],
    calculations: [],
    sortBy: [],
    templateId: null,
    schedule: null,
    emailDistribution: [],
    exportFormat: "excel",
    shareSettings: {
      public: false,
      users: [],
      roles: [],
      apiAccess: false
    }
  });

  const [draggedField, setDraggedField] = useState(null);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [templates, setTemplates] = useState(savedTemplates);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [sharedReports, setSharedReports] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  // Get available fields for selected data source
  const availableFields = useMemo(() => {
    return dataSources[currentReport.dataSource]?.fields || [];
  }, [currentReport.dataSource]);

  // Handle data source change
  const handleDataSourceChange = (source) => {
    setCurrentReport(prev => ({
      ...prev,
      dataSource: source,
      selectedFields: [], // Clear selected fields when source changes
      filters: [],
      groupBy: []
    }));
  };

  // Handle field selection (drag and drop)
  const handleFieldDragStart = (e, field) => {
    setDraggedField(field);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleFieldDrop = (e) => {
    e.preventDefault();
    if (draggedField && !currentReport.selectedFields.find(f => f.id === draggedField.id)) {
      setCurrentReport(prev => ({
        ...prev,
        selectedFields: [...prev.selectedFields, { ...draggedField, order: prev.selectedFields.length }]
      }));
    }
    setDraggedField(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Remove field from selection
  const removeField = (fieldId) => {
    setCurrentReport(prev => ({
      ...prev,
      selectedFields: prev.selectedFields.filter(f => f.id !== fieldId)
    }));
  };

  // Reorder fields
  const moveField = (fieldId, direction) => {
    setCurrentReport(prev => {
      const fields = [...prev.selectedFields];
      const index = fields.findIndex(f => f.id === fieldId);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= fields.length) return prev;
      
      [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];
      return { ...prev, selectedFields: fields };
    });
  };

  // Add filter
  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      field: "",
      operator: "equals",
      value: ""
    };
    setCurrentReport(prev => ({
      ...prev,
      filters: [...prev.filters, newFilter]
    }));
  };

  // Update filter
  const updateFilter = (filterId, updates) => {
    setCurrentReport(prev => ({
      ...prev,
      filters: prev.filters.map(f => f.id === filterId ? { ...f, ...updates } : f)
    }));
  };

  // Remove filter
  const removeFilter = (filterId) => {
    setCurrentReport(prev => ({
      ...prev,
      filters: prev.filters.filter(f => f.id !== filterId)
    }));
  };

  // Add group by field
  const addGroupBy = (fieldId) => {
    if (!currentReport.groupBy.find(f => f === fieldId)) {
      setCurrentReport(prev => ({
        ...prev,
        groupBy: [...prev.groupBy, fieldId]
      }));
    }
  };

  // Remove group by
  const removeGroupBy = (fieldId) => {
    setCurrentReport(prev => ({
      ...prev,
      groupBy: prev.groupBy.filter(f => f !== fieldId)
    }));
  };

  // Add calculation
  const addCalculation = () => {
    const newCalc = {
      id: Date.now(),
      type: "sum",
      field: "",
      label: ""
    };
    setCurrentReport(prev => ({
      ...prev,
      calculations: [...prev.calculations, newCalc]
    }));
  };

  // Update calculation
  const updateCalculation = (calcId, updates) => {
    setCurrentReport(prev => ({
      ...prev,
      calculations: prev.calculations.map(c => c.id === calcId ? { ...c, ...updates } : c)
    }));
  };

  // Remove calculation
  const removeCalculation = (calcId) => {
    setCurrentReport(prev => ({
      ...prev,
      calculations: prev.calculations.filter(c => c.id !== calcId)
    }));
  };

  // Add sort
  const addSort = () => {
    const newSort = {
      id: Date.now(),
      field: "",
      order: "Ascending"
    };
    setCurrentReport(prev => ({
      ...prev,
      sortBy: [...prev.sortBy, newSort]
    }));
  };

  // Update sort
  const updateSort = (sortId, updates) => {
    setCurrentReport(prev => ({
      ...prev,
      sortBy: prev.sortBy.map(s => s.id === sortId ? { ...s, ...updates } : s)
    }));
  };

  // Remove sort
  const removeSort = (sortId) => {
    setCurrentReport(prev => ({
      ...prev,
      sortBy: prev.sortBy.filter(s => s.id !== sortId)
    }));
  };

  // Save as template
  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;
    
    const newTemplate = {
      id: Date.now(),
      name: templateName,
      description: templateDescription,
      dataSource: currentReport.dataSource,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString().split('T')[0],
      config: { ...currentReport }
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setShowSaveTemplateModal(false);
    setTemplateName("");
    setTemplateDescription("");
  };

  // Load template
  const loadTemplate = (template) => {
    if (template.config) {
      setCurrentReport(template.config);
      setActiveTab("builder");
    }
  };

  // Generate report
  const handleGenerateReport = () => {
    // Simulate report generation
    alert(`Generating report: ${currentReport.name}\nFields: ${currentReport.selectedFields.length}\nFormat: ${currentReport.exportFormat}`);
  };

  // Export report
  const handleExportReport = (format) => {
    const filename = `${currentReport.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format}`;
    alert(`Exporting report as ${format.toUpperCase()}: ${filename}`);
  };

  return (
    <div className="container-fluid p-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="mb-0">Custom Report Builder</h4>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-primary" 
              onClick={() => setShowSaveTemplateModal(true)}
              disabled={currentReport.selectedFields.length === 0}
            >
              <SaveIcon size={16} className="me-2" />
              Save Template
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleGenerateReport}
              disabled={currentReport.selectedFields.length === 0}
            >
              <Play size={16} className="me-2" />
              Generate Report
            </button>
          </div>
        </div>
        <p className="text-muted mb-0">Build custom reports with drag-and-drop interface, filters, calculations, and more</p>
      </div>

      {/* Tab Navigation */}
      <div className="card mb-4 border shadow-none">
        <div className="card-body">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'builder' ? 'active' : ''}`}
                onClick={() => setActiveTab('builder')}
              >
                <Layout className="me-2" size={16} />
                Report Builder
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'templates' ? 'active' : ''}`}
                onClick={() => setActiveTab('templates')}
              >
                <FileText className="me-2" size={16} />
                Saved Templates
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'scheduled' ? 'active' : ''}`}
                onClick={() => setActiveTab('scheduled')}
              >
                <Clock className="me-2" size={16} />
                Scheduled Reports
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'shared' ? 'active' : ''}`}
                onClick={() => setActiveTab('shared')}
              >
                <Share2 className="me-2" size={16} />
                Shared Reports
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Report Builder Tab */}
      {activeTab === 'builder' && (
        <div className="row">
          {/* Left Panel - Data Source & Fields */}
          <div className="col-md-3">
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Data Sources</h6>
              </div>
              <div className="card-body">
                {Object.entries(dataSources).map(([key, source]) => (
                  <button
                    key={key}
                    className={`btn w-100 mb-2 text-start ${
                      currentReport.dataSource === key ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => handleDataSourceChange(key)}
                  >
                    <span className="me-2">{source.icon}</span>
                    {source.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="card border shadow-none">
              <div className="card-header bg-light">
                <h6 className="mb-0">Available Fields</h6>
                <small className="text-muted">Drag to add</small>
              </div>
              <div className="card-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {availableFields.map(field => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={(e) => handleFieldDragStart(e, field)}
                    className="card mb-2 p-2 cursor-pointer border"
                    style={{ cursor: 'grab' }}
                  >
                    <div className="d-flex align-items-center">
                      <GripVertical size={16} className="me-2 text-muted" />
                      <div className="flex-grow-1">
                        <div className="fw-medium small">{field.label}</div>
                        <small className="text-muted">{field.type}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Report Configuration */}
          <div className="col-md-6">
            {/* Report Basic Info */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Report Configuration</h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Report Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentReport.name}
                    onChange={(e) => setCurrentReport(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter report name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={currentReport.description}
                    onChange={(e) => setCurrentReport(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter report description"
                  />
                </div>
              </div>
            </div>

            {/* Selected Fields */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Selected Fields</h6>
                <small className="text-muted">{currentReport.selectedFields.length} selected</small>
              </div>
              <div 
                className="card-body min-height-200"
                onDrop={handleFieldDrop}
                onDragOver={handleDragOver}
                style={{ minHeight: '200px', border: '2px dashed #ddd', borderRadius: '4px' }}
              >
                {currentReport.selectedFields.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <p>Drag fields from the left panel to add them</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {currentReport.selectedFields.map((field, index) => (
                      <div key={field.id} className="card p-2">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <GripVertical size={16} className="me-2 text-muted" />
                            <div>
                              <div className="fw-medium small">{field.label}</div>
                              <small className="text-muted">{field.type}</small>
                            </div>
                          </div>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-link p-0"
                              onClick={() => moveField(field.id, 'up')}
                              disabled={index === 0}
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-link p-0"
                              onClick={() => moveField(field.id, 'down')}
                              disabled={index === currentReport.selectedFields.length - 1}
                            >
                              <ChevronDown size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-link text-danger p-0"
                              onClick={() => removeField(field.id)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Filters</h6>
                <button className="btn btn-sm btn-primary" onClick={addFilter}>
                  <Plus size={14} className="me-1" />
                  Add Filter
                </button>
              </div>
              <div className="card-body">
                {currentReport.filters.length === 0 ? (
                  <p className="text-muted text-center py-3">No filters applied</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {currentReport.filters.map(filter => (
                      <div key={filter.id} className="card p-3">
                        <div className="row g-2">
                          <div className="col-md-4">
                            <select
                              className="form-select form-select-sm"
                              value={filter.field}
                              onChange={(e) => updateFilter(filter.id, { field: e.target.value })}
                            >
                              <option value="">Select Field</option>
                              {availableFields.map(f => (
                                <option key={f.id} value={f.id}>{f.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <select
                              className="form-select form-select-sm"
                              value={filter.operator}
                              onChange={(e) => updateFilter(filter.id, { operator: e.target.value })}
                            >
                              <option value="equals">Equals</option>
                              <option value="not_equals">Not Equals</option>
                              <option value="contains">Contains</option>
                              <option value="greater_than">Greater Than</option>
                              <option value="less_than">Less Than</option>
                              <option value="between">Between</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={filter.value}
                              onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                              placeholder="Value"
                            />
                          </div>
                          <div className="col-md-1">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeFilter(filter.id)}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Group By */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Group By Dimensions</h6>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <select
                    className="form-select form-select-sm"
                    onChange={(e) => {
                      if (e.target.value) {
                        addGroupBy(e.target.value);
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">Add grouping field...</option>
                    {currentReport.selectedFields.filter(f => 
                      !currentReport.groupBy.includes(f.id)
                    ).map(f => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </select>
                </div>
                {currentReport.groupBy.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {currentReport.groupBy.map(fieldId => {
                      const field = currentReport.selectedFields.find(f => f.id === fieldId);
                      return field ? (
                        <span key={fieldId} className="badge bg-primary d-flex align-items-center gap-1">
                          {field.label}
                          <button
                            className="btn btn-sm p-0 text-white"
                            onClick={() => removeGroupBy(fieldId)}
                            style={{ background: 'none', border: 'none' }}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Calculations */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Calculations</h6>
                <button className="btn btn-sm btn-primary" onClick={addCalculation}>
                  <Plus size={14} className="me-1" />
                  Add Calculation
                </button>
              </div>
              <div className="card-body">
                {currentReport.calculations.length === 0 ? (
                  <p className="text-muted text-center py-3">No calculations added</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {currentReport.calculations.map(calc => (
                      <div key={calc.id} className="card p-3">
                        <div className="row g-2">
                          <div className="col-md-4">
                            <select
                              className="form-select form-select-sm"
                              value={calc.type}
                              onChange={(e) => updateCalculation(calc.id, { type: e.target.value })}
                            >
                              {calculationTypes.map(ct => (
                                <option key={ct.id} value={ct.id}>{ct.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-4">
                            <select
                              className="form-select form-select-sm"
                              value={calc.field}
                              onChange={(e) => updateCalculation(calc.id, { field: e.target.value })}
                            >
                              <option value="">Select Field</option>
                              {currentReport.selectedFields.filter(f => f.type === 'number').map(f => (
                                <option key={f.id} value={f.id}>{f.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={calc.label}
                              onChange={(e) => updateCalculation(calc.id, { label: e.target.value })}
                              placeholder="Label"
                            />
                          </div>
                          <div className="col-md-1">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeCalculation(calc.id)}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sort */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Sort & Order</h6>
                <button className="btn btn-sm btn-primary" onClick={addSort}>
                  <Plus size={14} className="me-1" />
                  Add Sort
                </button>
              </div>
              <div className="card-body">
                {currentReport.sortBy.length === 0 ? (
                  <p className="text-muted text-center py-3">No sorting applied</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {currentReport.sortBy.map(sort => (
                      <div key={sort.id} className="card p-3">
                        <div className="row g-2">
                          <div className="col-md-6">
                            <select
                              className="form-select form-select-sm"
                              value={sort.field}
                              onChange={(e) => updateSort(sort.id, { field: e.target.value })}
                            >
                              <option value="">Select Field</option>
                              {currentReport.selectedFields.map(f => (
                                <option key={f.id} value={f.id}>{f.label}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-4">
                            <select
                              className="form-select form-select-sm"
                              value={sort.order}
                              onChange={(e) => updateSort(sort.id, { order: e.target.value })}
                            >
                              {sortOrders.map(order => (
                                <option key={order} value={order}>{order}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-2">
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeSort(sort.id)}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Export & Sharing */}
          <div className="col-md-3">
            {/* Export Format */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Export Format</h6>
              </div>
              <div className="card-body">
                {exportFormats.map(format => (
                  <button
                    key={format.id}
                    className={`btn w-100 mb-2 text-start ${
                      currentReport.exportFormat === format.id ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => setCurrentReport(prev => ({ ...prev, exportFormat: format.id }))}
                  >
                    <span className="me-2">{format.icon}</span>
                    {format.label}
                  </button>
                ))}
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => handleExportReport(currentReport.exportFormat)}
                  disabled={currentReport.selectedFields.length === 0}
                >
                  <Download size={16} className="me-2" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Email Distribution */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Email Distribution</h6>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    const email = prompt("Enter email address:");
                    if (email) {
                      setCurrentReport(prev => ({
                        ...prev,
                        emailDistribution: [...prev.emailDistribution, email]
                      }));
                    }
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="card-body">
                {currentReport.emailDistribution.length === 0 ? (
                  <p className="text-muted small">No emails added</p>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {currentReport.emailDistribution.map((email, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center">
                        <small>{email}</small>
                        <button
                          className="btn btn-sm btn-link text-danger p-0"
                          onClick={() => setCurrentReport(prev => ({
                            ...prev,
                            emailDistribution: prev.emailDistribution.filter((_, i) => i !== index)
                          }))}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Schedule */}
            <div className="card border shadow-none mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Schedule</h6>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <Clock size={16} className="me-2" />
                  {currentReport.schedule ? 'Edit Schedule' : 'Set Schedule'}
                </button>
                {currentReport.schedule && (
                  <div className="mt-2">
                    <small className="text-muted">
                      {currentReport.schedule.frequency} at {currentReport.schedule.time}
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* Sharing */}
            <div className="card border shadow-none">
              <div className="card-header bg-light">
                <h6 className="mb-0">Sharing Options</h6>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  onClick={() => setShowShareModal(true)}
                >
                  <Share2 size={16} className="me-2" />
                  Configure Sharing
                </button>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={currentReport.shareSettings.public}
                    onChange={(e) => setCurrentReport(prev => ({
                      ...prev,
                      shareSettings: { ...prev.shareSettings, public: e.target.checked }
                    }))}
                  />
                  <label className="form-check-label small">
                    Public Dashboard
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={currentReport.shareSettings.apiAccess}
                    onChange={(e) => setCurrentReport(prev => ({
                      ...prev,
                      shareSettings: { ...prev.shareSettings, apiAccess: e.target.checked }
                    }))}
                  />
                  <label className="form-check-label small">
                    API Access
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="row">
          {templates.map(template => (
            <div key={template.id} className="col-md-4 mb-4">
              <div className="card border shadow-none h-100">
                <div className="card-body">
                  <h6 className="card-title">{template.name}</h6>
                  <p className="card-text small text-muted">{template.description}</p>
                  <div className="mb-2">
                    <span className="badge bg-info">
                      {dataSources[template.dataSource]?.name}
                    </span>
                  </div>
                  <div className="small text-muted mb-3">
                    <div>Created: {template.createdAt}</div>
                    <div>Last Used: {template.lastUsed}</div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => loadTemplate(template)}
                    >
                      <Play size={14} className="me-1" />
                      Use Template
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {templates.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No saved templates</p>
            </div>
          )}
        </div>
      )}

      {/* Scheduled Reports Tab */}
      {activeTab === 'scheduled' && (
        <div className="card border shadow-none">
          <div className="card-body">
            <div className="text-center py-5">
              <Clock size={48} className="text-muted mb-3" />
              <h6>No Scheduled Reports</h6>
              <p className="text-muted">Schedule reports to run automatically at specified times</p>
              <button className="btn btn-primary" onClick={() => setActiveTab('builder')}>
                Create Scheduled Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shared Reports Tab */}
      {activeTab === 'shared' && (
        <div className="card border shadow-none">
          <div className="card-body">
            <div className="text-center py-5">
              <Share2 size={48} className="text-muted mb-3" />
              <h6>No Shared Reports</h6>
              <p className="text-muted">Reports shared with other users will appear here</p>
            </div>
          </div>
        </div>
      )}

      {/* Save Template Modal */}
      {showSaveTemplateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Save Report Template</h5>
                <button type="button" className="btn-close" onClick={() => setShowSaveTemplateModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Template Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    placeholder="Enter template description"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowSaveTemplateModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveTemplate}>
                  <SaveIcon size={16} className="me-2" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Schedule Report</h5>
                <button type="button" className="btn-close" onClick={() => setShowScheduleModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Frequency</label>
                  <select
                    className="form-select"
                    value={currentReport.schedule?.frequency || 'daily'}
                    onChange={(e) => setCurrentReport(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, frequency: e.target.value, time: prev.schedule?.time || '09:00' }
                    }))}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={currentReport.schedule?.time || '09:00'}
                    onChange={(e) => setCurrentReport(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, time: e.target.value, frequency: prev.schedule?.frequency || 'daily' }
                    }))}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={() => {
                  setShowScheduleModal(false);
                  setScheduledReports(prev => [...prev, { ...currentReport, id: Date.now() }]);
                }}>
                  <Clock size={16} className="me-2" />
                  Schedule Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Share Report</h5>
                <button type="button" className="btn-close" onClick={() => setShowShareModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Share with Users</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter user emails (comma separated)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const emails = e.target.value.split(',').map(e => e.trim()).filter(e => e);
                        if (emails.length > 0) {
                          setCurrentReport(prev => ({
                            ...prev,
                            shareSettings: {
                              ...prev.shareSettings,
                              users: [...new Set([...prev.shareSettings.users, ...emails])]
                            }
                          }));
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Share with Roles</label>
                  <select
                    className="form-select"
                    onChange={(e) => {
                      if (e.target.value) {
                        setCurrentReport(prev => ({
                          ...prev,
                          shareSettings: {
                            ...prev.shareSettings,
                            roles: [...new Set([...prev.shareSettings.roles, e.target.value])]
                          }
                        }));
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Select role...</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Finance">Finance</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {currentReport.shareSettings.roles.length > 0 && (
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {currentReport.shareSettings.roles.map((role, index) => (
                        <span key={index} className="badge bg-primary">
                          {role}
                          <button
                            className="btn btn-sm p-0 text-white ms-1"
                            onClick={() => setCurrentReport(prev => ({
                              ...prev,
                              shareSettings: {
                                ...prev.shareSettings,
                                roles: prev.shareSettings.roles.filter((_, i) => i !== index)
                              }
                            }))}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowShareModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={() => {
                  setShowShareModal(false);
                  setSharedReports(prev => [...prev, { ...currentReport, id: Date.now() }]);
                }}>
                  <Share2 size={16} className="me-2" />
                  Share Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomReportBuilder;
