import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
  useMemo,
} from "react";

import { 
  // Icons from your original import
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, 
  FaSort, FaSortUp, FaSortDown, FaEye, FaUsers,
  FaFileExport, FaFileImport, FaCopy, FaCheckSquare,
  FaSquare, FaCalendarAlt, FaClock, FaMoneyBillWave,
  
  // Additional icons needed based on errors
  FaPrint, FaBell, FaInbox, FaInfoCircle, FaPlusCircle,
  FaPencilAlt, FaCaretUp, FaCaretDown, FaDownload,
  FaUpload, FaCalendarWeek, FaUserCheck, FaEyeSlash
} from 'react-icons/fa';

// import { 
//   FaSearch, FaPlusCircle, FaPeopleCarry, FaTrash, FaPencilAlt, 
//   FaCalendarWeek, FaUserCheck, FaClock, FaBell, FaDownload, 
//   FaUpload, FaSync, FaCalendarPlus, FaExchangeAlt, FaEnvelope, 
//   FaChartLine, FaPrint, FaFilter, FaInbox, FaCheckCircle,
//   FaCalendar, FaUser, FaBuilding, FaDesktop, FaCaretUp,
//   FaCaretDown, FaCalendarAlt, FaUsers, FaFileExport, FaFileImport,
//   FaRedo, FaEye, FaEyeSlash, FaListAlt, FaArrowRight,
//   FaBars, FaTimes, FaAngleDown, FaAngleRight
// } from 'react-icons/fa';

// ----------------------------------------
// CONTEXT + REDUCER (Same as before)
// ----------------------------------------
const ShiftContext = createContext();

const initialState = {
  shiftTemplates: [
    {
      id: 1,
      name: "General Shift",
      type: "general",
      startTime: "09:00",
      endTime: "18:00",
      gracePeriod: 15,
      breakHours: "01:00",
      weekOffPattern: "Sat-Sun",
      payMultiplier: 1.0,
      multipleShiftsPerDay: false,
      description: "Standard office hours",
    },
    {
      id: 2,
      name: "Night Shift",
      type: "night",
      startTime: "22:00",
      endTime: "06:00",
      gracePeriod: 20,
      breakHours: "00:45",
      weekOffPattern: "Rotational",
      payMultiplier: 1.5,
      multipleShiftsPerDay: false,
      description: "Night shift with premium pay",
    },
    {
      id: 3,
      name: "Rotational Shift",
      type: "rotational",
      startTime: "14:00",
      endTime: "22:00",
      gracePeriod: 15,
      breakHours: "00:30",
      weekOffPattern: "Weekly Rotational",
      payMultiplier: 1.2,
      multipleShiftsPerDay: true,
      description: "Rotates between morning and evening",
    },
  ],
  shiftAssignments: [
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "John Doe",
      employeeDepartment: "IT",
      shiftTemplateId: 1,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      assignmentType: "individual",
      status: "active",
      notes: "Regular shift assignment",
      rosterType: "weekly",
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Jane Smith",
      employeeDepartment: "HR",
      shiftTemplateId: 2,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      assignmentType: "rotational",
      status: "active",
      notes: "Night shift rotation",
      rosterType: "monthly",
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Mike Johnson",
      employeeDepartment: "Operations",
      shiftTemplateId: 3,
      startDate: "2024-03-01",
      endDate: "",
      assignmentType: "bulk",
      status: "active",
      notes: "Rotational shift",
      rosterType: "weekly",
    },
  ],
  flexibleWork: [
    {
      id: 1,
      employeeId: "EMP004",
      employeeName: "Sarah Williams",
      employeeDepartment: "Marketing",
      flexibleStart: "08:00",
      flexibleEnd: "17:00",
      coreStart: "10:00",
      coreEnd: "16:00",
      remoteDays: ["Mon", "Wed", "Fri"],
      workPattern: "hybrid",
      compressedWeek: false,
      effectiveDate: "2024-01-01",
      status: "active",
    },
    {
      id: 2,
      employeeId: "EMP005",
      employeeName: "Robert Brown",
      employeeDepartment: "Finance",
      flexibleStart: "07:00",
      flexibleEnd: "16:00",
      coreStart: "09:00",
      coreEnd: "15:00",
      remoteDays: ["Tue", "Thu"],
      workPattern: "flexible",
      compressedWeek: true,
      effectiveDate: "2024-02-01",
      status: "active",
    },
  ],
  shiftSwapRequests: [
    {
      id: 1,
      fromEmployeeId: "EMP001",
      fromEmployeeName: "John Doe",
      toEmployeeId: "EMP002",
      toEmployeeName: "Jane Smith",
      shiftDate: "2024-03-15",
      reason: "Doctor appointment",
      status: "pending",
      requestedDate: "2024-03-10",
    },
  ],
  notifications: [
    {
      id: 1,
      type: "shift_change",
      title: "Shift Change Notification",
      message: "Your shift has been changed from General to Night shift",
      date: "2024-03-01",
      read: false,
    },
    {
      id: 2,
      type: "swap_request",
      title: "Shift Swap Request",
      message: "John Doe wants to swap shifts with you on March 15",
      date: "2024-03-10",
      read: false,
    },
  ],
};

const shiftReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD_SHIFT_TEMPLATE":
      return {
        ...state,
        shiftTemplates: [...state.shiftTemplates, action.payload],
      };
    case "UPDATE_SHIFT_TEMPLATE":
      return {
        ...state,
        shiftTemplates: state.shiftTemplates.map((template) =>
          template.id === action.payload.id ? action.payload : template
        ),
      };
    case "DELETE_SHIFT_TEMPLATE":
      return {
        ...state,
        shiftTemplates: state.shiftTemplates.filter(
          (template) => template.id !== action.payload
        ),
      };
    case "BULK_DELETE_SHIFT_TEMPLATES":
      return {
        ...state,
        shiftTemplates: state.shiftTemplates.filter(
          (template) => !action.payload.includes(template.id)
        ),
      };
    case "ADD_SHIFT_ASSIGNMENT":
      return {
        ...state,
        shiftAssignments: [...state.shiftAssignments, action.payload],
      };
    case "UPDATE_SHIFT_ASSIGNMENT":
      return {
        ...state,
        shiftAssignments: state.shiftAssignments.map((assignment) =>
          assignment.id === action.payload.id ? action.payload : assignment
        ),
      };
    case "DELETE_SHIFT_ASSIGNMENT":
      return {
        ...state,
        shiftAssignments: state.shiftAssignments.filter(
          (assignment) => assignment.id !== action.payload
        ),
      };
    case "BULK_DELETE_ASSIGNMENTS":
      return {
        ...state,
        shiftAssignments: state.shiftAssignments.filter(
          (assignment) => !action.payload.includes(assignment.id)
        ),
      };
    case "BULK_ASSIGN_SHIFTS":
      return {
        ...state,
        shiftAssignments: [...state.shiftAssignments, ...action.payload],
      };
    case "ADD_FLEXIBLE_WORK":
      return {
        ...state,
        flexibleWork: [...state.flexibleWork, action.payload],
      };
    case "UPDATE_FLEXIBLE_WORK":
      return {
        ...state,
        flexibleWork: state.flexibleWork.map((work) =>
          work.id === action.payload.id ? action.payload : work
        ),
      };
    case "DELETE_FLEXIBLE_WORK":
      return {
        ...state,
        flexibleWork: state.flexibleWork.filter(
          (work) => work.id !== action.payload
        ),
      };
    case "ADD_SHIFT_SWAP_REQUEST":
      return {
        ...state,
        shiftSwapRequests: [...state.shiftSwapRequests, action.payload],
      };
    case "UPDATE_SHIFT_SWAP_REQUEST":
      return {
        ...state,
        shiftSwapRequests: state.shiftSwapRequests.map((request) =>
          request.id === action.payload.id ? action.payload : request
        ),
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    case "CLEAR_ALL_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

// ----------------------------------------
// CUSTOM HOOKS (Same as before)
// ----------------------------------------
const useShiftManagement = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error("useShiftManagement must be used within ShiftProvider");
  }
  return context;
};

// Hook for managing shift templates

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};


// Shift Templates Hook
const useShiftTemplates = () => {
  
  const [templates, setTemplates] = useLocalStorage('shiftTemplates', [
    {
      id: '1',
      name: 'Morning Shift',
      type: 'regular',
      startTime: '09:00',
      endTime: '17:00',
      payMultiplier: 1.0,
      gracePeriod: 15,
      weekOffPattern: 'Saturday-Sunday',
      description: 'Standard morning shift',
      color: '#3B82F6',
      enabled: true,
      breakDuration: 60,
      overtimeEligible: true,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Night Shift',
      type: 'night',
      startTime: '22:00',
      endTime: '06:00',
      payMultiplier: 1.5,
      gracePeriod: 20,
      weekOffPattern: 'Rotational',
      description: 'Night shift with extra pay',
      color: '#1F2937',
      enabled: true,
      breakDuration: 45,
      overtimeEligible: true,
      createdAt: '2024-01-20T14:45:00Z',
      updatedAt: '2024-01-20T14:45:00Z'
    },
    {
      id: '3',
      name: 'Flexi Shift',
      type: 'flexible',
      startTime: '10:00',
      endTime: '19:00',
      payMultiplier: 1.0,
      gracePeriod: 30,
      weekOffPattern: 'Flexible',
      description: 'Flexible working hours',
      color: '#10B981',
      enabled: true,
      breakDuration: 60,
      overtimeEligible: false,
      createdAt: '2024-01-25T09:15:00Z',
      updatedAt: '2024-01-25T09:15:00Z'
    }
  ]);

  const [selectedTemplates, setSelectedTemplates] = useLocalStorage('selectedShiftTemplates', []);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const addTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      enabled: true
    };
    setTemplates(prev => [...prev, newTemplate]);
    return newTemplate;
  };

  const updateTemplate = (updatedTemplate) => {
    setTemplates(prev => prev.map(template => 
      template.id === updatedTemplate.id 
        ? { ...updatedTemplate, updatedAt: new Date().toISOString() }
        : template
    ));
    setEditingTemplate(null);
  };

  const deleteTemplate = (id) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
    setSelectedTemplates(prev => prev.filter(templateId => templateId !== id));
  };

  const bulkDeleteTemplates = (ids) => {
    setTemplates(prev => prev.filter(template => !ids.includes(template.id)));
    setSelectedTemplates([]);
  };

  const duplicateTemplate = (id) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      const duplicated = {
        ...template,
        id: Date.now().toString(),
        name: `${template.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTemplates(prev => [...prev, duplicated]);
    }
  };

  const toggleTemplateSelection = (id) => {
    setSelectedTemplates(prev => 
      prev.includes(id) 
        ? prev.filter(templateId => templateId !== id)
        : [...prev, id]
    );
  };

  const selectAllTemplates = () => {
    if (selectedTemplates.length === templates.length) {
      setSelectedTemplates([]);
    } else {
      setSelectedTemplates(templates.map(t => t.id));
    }
  };

  const toggleTemplateStatus = (id) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, enabled: !template.enabled, updatedAt: new Date().toISOString() }
        : template
    ));
  };

  const exportTemplates = () => {
    const dataStr = JSON.stringify(templates, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `shift-templates-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTemplates = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          // Add imported templates with new IDs
          const newTemplates = imported.map(t => ({
            ...t,
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            createdAt: t.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));
          setTemplates(prev => [...prev, ...newTemplates]);
          alert(`${newTemplates.length} templates imported successfully!`);
        }
      } catch (error) {
        alert('Error importing templates. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const getStats = () => {
    const total = templates.length;
    const active = templates.filter(t => t.enabled).length;
    const nightShifts = templates.filter(t => t.type === 'night').length;
    const regularShifts = templates.filter(t => t.type === 'regular').length;
    const flexibleShifts = templates.filter(t => t.type === 'flexible').length;
    
    return {
      total,
      active,
      nightShifts,
      regularShifts,
      flexibleShifts,
      inactive: total - active
    };
  };

  return {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    bulkDeleteTemplates,
    duplicateTemplate,
    toggleTemplateStatus,
    editingTemplate,
    setEditingTemplate,
    selectedTemplates,
    toggleTemplateSelection,
    selectAllTemplates,
    exportTemplates,
    importTemplates,
    getStats
  };
};


// Hook for managing shift assignments
// Custom Hook for Local Storage Management
const useShiftAssignments = () => {
  const [assignments, setAssignments] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('shiftAssignments');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  // Save to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem('shiftAssignments', JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setAssignments(prev => [newAssignment, ...prev]);
  };

  const updateAssignment = (updated) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === updated.id 
          ? { ...updated, updatedAt: new Date().toISOString() }
          : assignment
      )
    );
    setEditingAssignment(null);
  };

  const deleteAssignment = (id) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
    setSelectedAssignments(prev => prev.filter(assignId => assignId !== id));
  };

  const bulkDeleteAssignments = (ids) => {
    setAssignments(prev => prev.filter(assignment => !ids.includes(assignment.id)));
    setSelectedAssignments([]);
  };

  const bulkAssignShifts = (newAssignments) => {
    const assignmentsWithIds = newAssignments.map(assignment => ({
      ...assignment,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    setAssignments(prev => [...assignmentsWithIds, ...prev]);
  };

  const toggleAssignmentSelection = (id) => {
    setSelectedAssignments(prev => 
      prev.includes(id) 
        ? prev.filter(assignId => assignId !== id)
        : [...prev, id]
    );
  };

  const selectAllAssignments = () => {
    const allIds = assignments.map(assignment => assignment.id);
    if (selectedAssignments.length === allIds.length) {
      setSelectedAssignments([]);
    } else {
      setSelectedAssignments(allIds);
    }
  };

  return {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    bulkDeleteAssignments,
    bulkAssignShifts,
    editingAssignment,
    setEditingAssignment,
    selectedAssignments,
    toggleAssignmentSelection,
    selectAllAssignments
  };
};


// Hook for managing flexible work
const useFlexibleWork = () => {
  const [flexibleWork, setFlexibleWork] = useState(() => {
    const saved = localStorage.getItem('flexibleWorkArrangements');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingWork, setEditingWork] = useState(null);

  useEffect(() => {
    localStorage.setItem('flexibleWorkArrangements', JSON.stringify(flexibleWork));
  }, [flexibleWork]);

  const addWork = (work) => {
    const newWork = { ...work, id: Date.now().toString() };
    setFlexibleWork(prev => [...prev, newWork]);
  };

  const updateWork = (work) => {
    setFlexibleWork(prev => 
      prev.map(w => w.id === work.id ? work : w)
    );
    setEditingWork(null);
  };

  const deleteWork = (id) => {
    setFlexibleWork(prev => prev.filter(w => w.id !== id));
  };

  return {
    flexibleWork,
    addWork,
    updateWork,
    deleteWork,
    editingWork,
    setEditingWork
  };
};


// Hook for managing shift swap requests
const useShiftSwapRequests = () => {
  const { state, dispatch } = useShiftManagement();

  const addSwapRequest = (request) => {
    const newId = Math.max(...state.shiftSwapRequests.map(r => r.id), 0) + 1;
    dispatch({
      type: "ADD_SHIFT_SWAP_REQUEST",
      payload: { ...request, id: newId },
    });
  };

  const updateSwapRequest = (request) => {
    dispatch({ type: "UPDATE_SHIFT_SWAP_REQUEST", payload: request });
  };

  return {
    swapRequests: state.shiftSwapRequests,
    addSwapRequest,
    updateSwapRequest,
  };
};

// Hook for managing notifications
const useNotifications = () => {
  const { state, dispatch } = useShiftManagement();

  const addNotification = (notification) => {
    const newId = Math.max(...state.notifications.map(n => n.id), 0) + 1;
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { ...notification, id: newId },
    });
  };

  const markAsRead = (id) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: id });
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL_NOTIFICATIONS" });
  };

  return {
    notifications: state.notifications,
    unreadCount: state.notifications.filter(n => !n.read).length,
    addNotification,
    markAsRead,
    clearAll,
  };
};

// ----------------------------------------
// RESPONSIVE FORM COMPONENTS
// ----------------------------------------
const ShiftTemplateForm = ({ template, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(template || {
    name: '',
    type: 'regular',
    startTime: '09:00',
    endTime: '17:00',
    payMultiplier: 1.0,
    gracePeriod: 15,
    weekOffPattern: 'Saturday-Sunday',
    description: '',
    color: '#3B82F6',
    breakDuration: 60,
    overtimeEligible: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const shiftTypes = [
    { value: 'regular', label: 'Regular Shift', icon: '☀️' },
    { value: 'night', label: 'Night Shift', icon: '🌙' },
    { value: 'flexible', label: 'Flexible Shift', icon: '🔄' },
    { value: 'rotational', label: 'Rotational Shift', icon: '🔄' },
    { value: 'part-time', label: 'Part Time', icon: '⏰' },
    { value: 'weekend', label: 'Weekend Shift', icon: '📅' }
  ];

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">{template ? 'Edit Shift Template' : 'Add New Shift Template'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Template Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Morning Shift, Night Shift"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Shift Type *</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                {shiftTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Start Time *</label>
              <input
                type="time"
                className="form-control"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">End Time *</label>
              <input
                type="time"
                className="form-control"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Pay Multiplier *</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  name="payMultiplier"
                  value={formData.payMultiplier}
                  onChange={handleChange}
                  step="0.1"
                  min="0.5"
                  max="3"
                  required
                />
                <span className="input-group-text">x</span>
              </div>
              <small className="text-muted">e.g., 1.0 for regular, 1.5 for night shift</small>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Grace Period (minutes)</label>
              <input
                type="number"
                className="form-control"
                name="gracePeriod"
                value={formData.gracePeriod}
                onChange={handleChange}
                min="0"
                max="60"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Break Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                name="breakDuration"
                value={formData.breakDuration}
                onChange={handleChange}
                min="0"
                max="180"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Week-off Pattern</label>
              <select
                className="form-select"
                name="weekOffPattern"
                value={formData.weekOffPattern}
                onChange={handleChange}
              >
                <option value="Saturday-Sunday">Saturday-Sunday</option>
                <option value="Sunday">Sunday Only</option>
                <option value="Rotational">Rotational</option>
                <option value="Flexible">Flexible</option>
                <option value="None">No Fixed Week-off</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Template Color</label>
              <div className="d-flex align-items-center">
                <input
                  type="color"
                  className="form-control form-control-color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  title="Choose template color"
                  style={{ width: '50px', height: '38px' }}
                />
                <span className="ms-2 small text-muted">For visual identification</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Optional description about this shift template..."
            />
          </div>

          <div className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="overtimeEligible"
                checked={formData.overtimeEligible}
                onChange={handleChange}
                id="overtimeEligible"
              />
              <label className="form-check-label" htmlFor="overtimeEligible">
                Overtime Eligible
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {template ? 'Update Template' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Shift Assignment Form Component
const ShiftAssignmentForm = ({ assignment, templates, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    employeeDepartment: 'IT',
    shiftTemplateId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'active',
    assignmentType: 'individual',
    notes: ''
  });

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!assignment) {
      setFormData({
        employeeName: '',
        employeeId: '',
        employeeDepartment: 'IT',
        shiftTemplateId: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        status: 'active',
        assignmentType: 'individual',
        notes: ''
      });
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="mb-0">{assignment ? 'Edit Assignment' : 'Add New Assignment'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Employee Name *</label>
              <input
                type="text"
                className="form-control"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Employee ID *</label>
              <input
                type="text"
                className="form-control"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                name="employeeDepartment"
                value={formData.employeeDepartment}
                onChange={handleChange}
              >
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Shift Template *</label>
              <select
                className="form-select"
                name="shiftTemplateId"
                value={formData.shiftTemplateId}
                onChange={handleChange}
                required
              >
                <option value="">Select a shift</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} ({template.type})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date (Optional)</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Assignment Type</label>
              <select
                className="form-select"
                name="assignmentType"
                value={formData.assignmentType}
                onChange={handleChange}
              >
                <option value="individual">Individual</option>
                <option value="bulk">Bulk</option>
                <option value="rotational">Rotational</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                placeholder="Additional notes about this assignment..."
              />
            </div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary me-2">
              {assignment ? 'Update Assignment' : 'Add Assignment'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// FlexibleWorkForm Component
const FlexibleWorkForm = ({ work, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(work || {
    employeeName: '',
    employeeId: '',
    employeeDepartment: '',
    workPattern: 'hybrid',
    flexibleStart: '08:00',
    flexibleEnd: '17:00',
    coreStart: '10:00',
    coreEnd: '15:00',
    remoteDays: [],
    isActive: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRemoteDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      remoteDays: prev.remoteDays.includes(day)
        ? prev.remoteDays.filter(d => d !== day)
        : [...prev.remoteDays, day]
    }));
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="card border mb-4">
      <div className="card-header bg-light">
        <h6 className="mb-0">
          {work ? 'Edit Flexible Work Arrangement' : 'Add New Flexible Work Arrangement'}
        </h6>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Employee Info */}
            <div className="col-md-4">
              <label className="form-label">Employee Name *</label>
              <input
                type="text"
                className="form-control"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Employee ID *</label>
              <input
                type="text"
                className="form-control"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                name="employeeDepartment"
                value={formData.employeeDepartment}
                onChange={handleChange}
              />
            </div>

            {/* Work Pattern */}
            <div className="col-md-6">
              <label className="form-label">Work Pattern *</label>
              <select
                className="form-select"
                name="workPattern"
                value={formData.workPattern}
                onChange={handleChange}
                required
              >
                <option value="hybrid">Hybrid (Mix of Office & Remote)</option>
                <option value="remote">Fully Remote</option>
                <option value="office">Office Only</option>
                <option value="flexible">Flexible Hours</option>
                <option value="shift">Shift Work</option>
              </select>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <div className="form-check form-switch mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  id="isActive"
                />
                <label className="form-check-label" htmlFor="isActive">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </label>
              </div>
            </div>

            {/* Time Settings */}
            <div className="col-md-6">
              <label className="form-label">Flexible Hours</label>
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="time"
                    className="form-control"
                    name="flexibleStart"
                    value={formData.flexibleStart}
                    onChange={handleChange}
                  />
                  <small className="text-muted">Start</small>
                </div>
                <div className="col-6">
                  <input
                    type="time"
                    className="form-control"
                    name="flexibleEnd"
                    value={formData.flexibleEnd}
                    onChange={handleChange}
                  />
                  <small className="text-muted">End</small>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label">Core Hours (Required)</label>
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="time"
                    className="form-control"
                    name="coreStart"
                    value={formData.coreStart}
                    onChange={handleChange}
                  />
                  <small className="text-muted">Start</small>
                </div>
                <div className="col-6">
                  <input
                    type="time"
                    className="form-control"
                    name="coreEnd"
                    value={formData.coreEnd}
                    onChange={handleChange}
                  />
                  <small className="text-muted">End</small>
                </div>
              </div>
            </div>

            {/* Remote Days - Only show for hybrid/remote patterns */}
            {(formData.workPattern === 'hybrid' || formData.workPattern === 'remote') && (
              <div className="col-12">
                <label className="form-label">Remote Working Days</label>
                <div className="d-flex flex-wrap gap-2">
                  {days.map(day => (
                    <div key={day} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.remoteDays.includes(day)}
                        onChange={() => handleRemoteDayToggle(day)}
                        id={`day-${day}`}
                      />
                      <label className="form-check-label" htmlFor={`day-${day}`}>
                        {day.substring(0, 3)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="col-12">
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {work ? 'Update' : 'Add'} Arrangement
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


// ----------------------------------------
// RESPONSIVE SEARCH & FILTER COMPONENT
// ----------------------------------------
const SearchFilter = ({ activeSection, onSearch, onFilterChange, stats }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
    const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  useEffect(() => {
    const filters = {};
    if (filterType !== 'all') filters.type = filterType;
    if (filterStatus !== 'all') filters.status = filterStatus;
    if (filterDepartment !== 'all') filters.department = filterDepartment;
    onFilterChange(filters);
  }, [filterType, filterStatus, filterDepartment, onFilterChange]);
  useEffect(() => {
    onFilterChange({
      type: filterType === 'all' ? null : filterType,
      status: filterStatus === 'all' ? null : filterStatus === 'active'
    });
  }, [filterType, filterStatus, onFilterChange]);

  // Mobile version
  if (isMobile) {
    return (
      <div className="mb-3">
        <div className="card border">
          <div className="card-body p-2">
            {/* Search Input */}
            <div className="input-group mb-2">
              <span className="input-group-text bg-light">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search arrangements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="d-flex flex-wrap gap-1">
              <select 
                className="form-select form-select-sm flex-grow-1"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
                <option value="office">Office</option>
                <option value="flexible">Flexible</option>
              </select>
              <select 
                className="form-select form-select-sm flex-grow-1"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Stats - Mobile */}
            {stats && (
              <div className="d-flex justify-content-between mt-2 small">
                <span className="text-muted">
                  Total: <span className="fw-bold">{stats.total}</span>
                </span>
                <span className="text-muted">
                  Active: <span className="fw-bold text-success">{stats.active}</span>
                </span>
                <span className="text-muted">
                  Hybrid: <span className="fw-bold text-primary">{stats.hybrid}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
    // Desktop version
    return (
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border">
            <div className="card-body p-3">
              <div className="row g-3 align-items-center">
                {/* Search Column */}
                <div className="col-md-8">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <FaSearch className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search arrangements by employee name, ID, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button">
                      <FaFilter className="me-1" /> Filter
                    </button>
                  </div>
                </div>
  
                {/* Filter Columns */}
                <div className="col-md-4">
                  <div className="d-flex gap-2">
                    <select 
                      className="form-select"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Work Patterns</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Remote</option>
                      <option value="office">Office</option>
                      <option value="flexible">Flexible Hours</option>
                    </select>
                    <select 
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active Only</option>
                      <option value="inactive">Inactive Only</option>
                    </select>
                  </div>
                </div>
  
                {/* Stats Row */}
                {stats && (
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <div className="small text-muted">
                        Showing <span className="fw-bold">{stats.filtered}</span> of <span className="fw-bold">{stats.total}</span> arrangements
                      </div>
                      <div className="d-flex gap-3">
                        <div className="text-center">
                          <div className="small text-muted">Active</div>
                          <div className="fw-bold text-success">{stats.active}</div>
                        </div>
                        <div className="text-center">
                          <div className="small text-muted">Hybrid</div>
                          <div className="fw-bold text-primary">{stats.hybrid}</div>
                        </div>
                        <div className="text-center">
                          <div className="small text-muted">Remote</div>
                          <div className="fw-bold text-info">{stats.remote}</div>
                        </div>
                        <div className="text-center">
                          <div className="small text-muted">Office</div>
                          <div className="fw-bold text-warning">{stats.office}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="row mb-3">
      <div className="col-md-6 col-lg-8">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search assignments by employee name, ID, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <div className="d-flex gap-2">
          <select 
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select 
            className="form-select form-select-sm"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="all">All Depts</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </div>
    </div>
  );
};



// ----------------------------------------
// RESPONSIVE BULK ASSIGNMENT COMPONENT
// ----------------------------------------
const BulkAssignmentForm = ({ templates, onAssign, onCancel }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [employeeList, setEmployeeList] = useState('');
  const [formData, setFormData] = useState({
    employees: '',
    department: 'IT',
    shiftTemplateId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'active'
  });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employees = employeeList.split('\n').filter(e => e.trim());
        // Parse employees input (comma or newline separated)
    const employeeEntries = formData.employees
      .split(/[\n,]/)
      .map(entry => entry.trim())
      .filter(entry => entry.length > 0);
    
    if (employeeEntries.length === 0) {
      alert('Please enter at least one employee');
      return;
    }
       const assignments = employeeEntries.map(employee => {
      const [employeeName, employeeId] = employee.split(':').map(s => s.trim());
      return {
        employeeName: employeeName || employee,
        employeeId: employeeId || `EMP${Math.floor(Math.random() * 10000)}`,
        employeeDepartment: formData.department,
        shiftTemplateId: formData.shiftTemplateId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        assignmentType: 'bulk',
        notes: `Bulk assignment - ${new Date().toLocaleDateString()}`
      };
    });
    const assignmentData = employees.map(employee => ({
      employee: employee.trim(),
      templateId: selectedTemplate,
      templateName: templates.find(t => t.id === selectedTemplate)?.name || '',
      assignedDate: new Date().toISOString()
    }));
    onAssign(assignmentData);
    onAssign(assignments);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Bulk Assign Shift Templates</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Template</label>
            <select
              className="form-select"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              required
            >
              <option value="">Choose a template...</option>
              {templates.filter(t => t.enabled).map(template => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.startTime} - {template.endTime})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Employee List (one per line) *
            </label>
            <textarea
              className="form-control"
              rows="6"
              value={employeeList}
              onChange={(e) => setEmployeeList(e.target.value)}
              placeholder="Enter employee names or IDs, one per line:
John Doe
Jane Smith
Robert Johnson"
              required
            />
            <small className="text-muted">Each line will be treated as a separate employee</small>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Assign Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
    return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="mb-0">Bulk Shift Assignment</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Employees (One per line or comma-separated) *
              <small className="text-muted ms-2">Format: Name:ID or just Name</small>
            </label>
            <textarea
              className="form-control"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              rows="4"
              placeholder="John Doe:EMP001&#10;Jane Smith:EMP002&#10;Mike Johnson"
              required
            />
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Shift Template *</label>
              <select
                className="form-select"
                name="shiftTemplateId"
                value={formData.shiftTemplateId}
                onChange={handleChange}
                required
              >
                <option value="">Select a shift</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} ({template.type})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date (Optional)</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary me-2">
              Assign to All Employees
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Stats Cards Component
const TemplateStats = ({ stats }) => (
  <div className="row mb-4">
    <div className="col-md-2 col-6">
      <div className="card bg-light text-dark">
        <div className="card-body text-center p-2">
          <i className="bi bi-card-list text-primary fs-4"></i>
          <div className="h4 text-primary mb-1">{stats.total}</div>
          <div className="small">Total Templates</div>
        </div>
      </div>
    </div>
    <div className="col-md-2 col-6">
      <div className="card bg-light text-dark">
        <div className="card-body text-center p-2">
          <i className="bi bi-check-circle-fill text-success fs-4"></i>
          <div className="h4 text-success mb-1">{stats.active}</div>
          <div className="small">Active</div>
        </div>
      </div>
    </div>
    <div className="col-md-2 col-6">
      <div className="card bg-light text-dark">
        <div className="card-body text-center p-2">
          <i className="bi bi-moon-stars-fill text-dark fs-4"></i>
          <div className="h4 text-dark mb-1">{stats.nightShifts}</div>
          <div className="small">Night Shifts</div>
        </div>
      </div>
    </div>
    <div className="col-md-2 col-6">
      <div className="card bg-light text-dark">
        <div className="card-body text-center p-2">
          <i className="bi bi-arrow-repeat text-warning fs-4"></i>
          <div className="h4 text-info mb-1">{stats.regularShifts}</div>
          <div className="small">Regular</div>
        </div>
      </div>
    </div>
    <div className="col-md-2 col-6">
      <div className="card bg-light text-dark">
        <div className="card-body text-center p-2">
          <i className="bi bi-clock-history text-warning fs-4"></i>
          <div className="h4 text-warning mb-1">{stats.flexibleShifts}</div>
          <div className="small">Flexible</div>
        </div>
      </div>
    </div>
    <div className="col-md-2 col-6">
      <div className="card bg-light text-dark">
        <div className="card-body text-center p-2">
          <i className="bi bi-slash-circle-fill text-secondary fs-4"></i>
          <div className="h4 text-secondary mb-1">{stats.inactive}</div>
          <div className="small">Inactive</div>
        </div>
      </div>
    </div>
  </div>
);

// ----------------------------------------
// RESPONSIVE SHIFT ROSTER COMPONENT
// ----------------------------------------
const ShiftRoster = ({ assignments, templates }) => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [rosterType, setRosterType] = useState('weekly');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const weekDates = getWeekDates(selectedWeek);

  const getShiftForEmployee = (employeeId, date) => {
    const assignment = assignments.find(a => 
      a.employeeId === employeeId && 
      new Date(a.startDate) <= date &&
      (!a.endDate || new Date(a.endDate) >= date)
    );
    
    if (assignment) {
      const template = templates.find(t => t.id === assignment.shiftTemplateId);
      return template;
    }
    return null;
  };

  const employees = [...new Set(assignments.map(a => ({ id: a.employeeId, name: a.employeeName })))];

  if (isMobile) {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Shift Roster</h5>
          <div className="mt-2">
            <div className="d-flex flex-wrap gap-2">
              <select
                className="form-select form-select-sm flex-grow-1"
                value={rosterType}
                onChange={(e) => setRosterType(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <input
                type="date"
                className="form-control form-control-sm flex-grow-1"
                value={selectedWeek.toISOString().split('T')[0]}
                onChange={(e) => setSelectedWeek(new Date(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="list-group">
            {employees.map((employee) => (
              <div key={employee.id} className="list-group-item">
                <div className="fw-bold">{employee.name}</div>
                <small className="text-muted d-block">{employee.id}</small>
                <div className="mt-2">
                  {weekDates.map((date, index) => {
                    const shift = getShiftForEmployee(employee.id, date);
                    return (
                      <div key={index} className="mb-1">
                        <small className="text-muted">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })} {date.getDate()}/{date.getMonth() + 1}:
                        </small>
                        {shift ? (
                          <div className={`ms-2 p-1 rounded ${shift.type === 'night' ? 'bg-dark text-white' : 'bg-light'}`}>
                            <div className="small">{shift.name}</div>
                            <div className="small">{shift.startTime} - {shift.endTime}</div>
                          </div>
                        ) : (
                          <span className="ms-2 text-muted small">-</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <h5 className="mb-2 mb-md-0">Shift Roster</h5>
        <div className="d-flex flex-wrap gap-1 w-100 w-md-auto">
          <select
            className="form-select form-select-sm"
            value={rosterType}
            onChange={(e) => setRosterType(e.target.value)}
            style={{ width: '120px' }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <div className="input-group input-group-sm" style={{ width: '200px' }}>
            <span className="input-group-text">Week</span>
            <input
              type="date"
              className="form-control"
              value={selectedWeek.toISOString().split('T')[0]}
              onChange={(e) => setSelectedWeek(new Date(e.target.value))}
            />
          </div>
          <button className="btn btn-sm btn-outline-primary">
            <FaPrint className="me-1" /> Print
          </button>
          <button className="btn btn-sm btn-outline-success">
            <FaFileExport className="me-1" /> Export
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th className="text-nowrap">Employee</th>
                {weekDates.map((date, index) => (
                  <th key={index} className="text-center text-nowrap">
                    <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="small">{date.getDate()}/{date.getMonth() + 1}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="text-nowrap">
                    <div className="fw-bold">{employee.name}</div>
                    <small className="text-muted">{employee.id}</small>
                  </td>
                  {weekDates.map((date, index) => {
                    const shift = getShiftForEmployee(employee.id, date);
                    return (
                      <td key={index} className="text-center">
                        {shift ? (
                          <div className={`p-1 rounded small ${shift.type === 'night' ? 'bg-dark text-white' : 'bg-light'}`}>
                            <div>{shift.name}</div>
                            <div>{shift.startTime} - {shift.endTime}</div>
                          </div>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------
// RESPONSIVE NOTIFICATIONS COMPONENT
// ----------------------------------------
const NotificationsPanel = () => {
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="dropdown">

      {/* Trigger Button */}
      <button
        className="btn btn-outline-primary position-relative"
        type="button"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <i className="bi bi-bell fs-5"></i>

        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
{showNotifications && (
  <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content border-0 shadow-lg">
        
        {/* Header with Close Button */}
        <div className="modal-header border-bottom p-3">
          <h5 className="modal-title fw-semibold mb-0">
            <i className="bi bi-bell me-2"></i>
            Notifications
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowNotifications(false)}
            aria-label="Close"
          ></button>
        </div>

        {/* Body */}
        <div className="modal-body p-0">
          <div
            className="px-3"
            style={{ 
              maxHeight: '400px', 
              overflowY: 'auto'
            }}
          >
            {/* Empty State */}
            {notifications.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-bell-slash text-muted fs-1 d-block mb-3"></i>
                <p className="text-muted mb-0">No notifications available</p>
                <small className="text-muted">All caught up!</small>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`list-group-item list-group-item-action px-0 py-3 ${
                      !notification.read ? 'bg-light' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1 me-3">
                        <div className="d-flex align-items-center mb-1">
                          <strong className={`small ${!notification.read ? 'fw-bold' : 'fw-semibold'}`}>
                            {notification.title}
                          </strong>
                          {!notification.read && (
                            <span className="badge bg-primary ms-2 small">New</span>
                          )}
                        </div>
                        <p className="mb-1 small text-secondary">
                          {notification.message}
                        </p>
                      </div>
                      <small className="text-muted text-nowrap">
                        {notification.date}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer border-top p-3">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="small text-muted">
              {notifications.length} total • {notifications.filter(n => !n.read).length} unread
            </div>
            <div className="d-flex gap-2">
              {notifications.length > 0 && (
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={clearAll}
                >
                  <i className="bi bi-trash me-1"></i>
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

// ----------------------------------------
// RESPONSIVE LIST COMPONENTS
// ----------------------------------------
const ShiftTemplateList = () => {
  const {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    bulkDeleteTemplates,
    duplicateTemplate,
    toggleTemplateStatus,
    editingTemplate,
    setEditingTemplate,
    selectedTemplates,
    toggleTemplateSelection,
    selectAllTemplates,
    exportTemplates,
    importTemplates,
    getStats
  } = useShiftTemplates();
  
  const [showForm, setShowForm] = useState(false);
  const [showBulkAssignment, setShowBulkAssignment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [isMobile, setIsMobile] = useState(false);
  const [importFile, setImportFile] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and search templates
  const filteredTemplates = useMemo(() => {
    let result = [...templates];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(template =>
        template.name.toLowerCase().includes(term) ||
        template.type.toLowerCase().includes(term) ||
        template.description?.toLowerCase().includes(term) ||
        template.weekOffPattern?.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.type) {
      result = result.filter(template => template.type === filters.type);
    }
    if (filters.status !== null && filters.status !== undefined) {
      result = result.filter(template => template.enabled === filters.status);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [templates, searchTerm, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSubmit = (template) => {
    if (editingTemplate) {
      updateTemplate(template);
    } else {
      addTemplate(template);
    }
    setShowForm(false);
    setEditingTemplate(null);
  };

  const handleBulkDelete = () => {
    if (selectedTemplates.length > 0 && window.confirm(`Delete ${selectedTemplates.length} selected templates?`)) {
      bulkDeleteTemplates(selectedTemplates);
    }
  };

  const handleImport = () => {
    if (importFile) {
      importTemplates(importFile);
      setImportFile(null);
    }
  };

  const stats = getStats();

  if (isMobile) {
    return (
      <div className="p-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0">Shift Templates</h5>
            <small className="text-muted">{stats.total} templates, {stats.active} active</small>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowForm(!showForm)}
          >
            <FaPlus />
          </button>
        </div>

        {/* Stats Cards - Mobile */}
        <div className="row g-2 mb-3">
          <div className="col-6">
            <div className="card bg-primary text-white p-2">
              <div className="text-center">
                <div className="h5 mb-0">{stats.total}</div>
                <small>Total</small>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card bg-success text-white p-2">
              <div className="text-center">
                <div className="h5 mb-0">{stats.active}</div>
                <small>Active</small>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="mb-3">
          <div className="input-group input-group-sm">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button"
              onClick={() => setShowBulkAssignment(true)}
            >
              <FaUsers />
            </button>
          </div>
          {selectedTemplates.length > 0 && (
            <div className="d-flex gap-2 mt-2">
              <button
                className="btn btn-danger btn-sm flex-fill"
                onClick={handleBulkDelete}
              >
                <FaTrash className="me-1" /> Delete ({selectedTemplates.length})
              </button>
            </div>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <ShiftTemplateForm
            template={editingTemplate}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingTemplate(null);
            }}
          />
        )}

        {/* Bulk Assignment */}
        {showBulkAssignment && (
          <BulkAssignmentForm
            templates={templates}
            onAssign={(assignments) => {
              console.log('Bulk assignments:', assignments);
              setShowBulkAssignment(false);
            }}
            onCancel={() => setShowBulkAssignment(false)}
          />
        )}

        {/* Template List - Mobile Cards */}
        <div className="list-group">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              className={`list-group-item ${!template.enabled ? 'bg-light' : ''}`}
              style={{ borderLeft: `4px solid ${template.color}` }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    <div className="form-check me-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedTemplates.includes(template.id)}
                        onChange={() => toggleTemplateSelection(template.id)}
                      />
                    </div>
                    <div className="fw-bold">{template.name}</div>
                    {!template.enabled && (
                      <span className="badge bg-secondary ms-2">Inactive</span>
                    )}
                  </div>
                  <div className="d-flex gap-2 mb-2">
                    <span className={`badge ${
                      template.type === 'night' ? 'bg-dark' :
                      template.type === 'rotational' ? 'bg-warning text-dark' :
                      template.type === 'flexible' ? 'bg-info' :
                      template.type === 'part-time' ? 'bg-secondary' :
                      'bg-primary'
                    }`}>
                      {template.type}
                    </span>
                    <span className="badge bg-success">
                      {template.payMultiplier}x
                    </span>
                  </div>
                  <div className="small text-muted mb-1">
                    <FaClock className="me-1" />
                    {template.startTime} - {template.endTime}
                    <span className="ms-2">
                      <FaMoneyBillWave className="me-1" />
                      Pay: {template.payMultiplier}x
                    </span>
                  </div>
                  <div className="small text-muted">
                    <FaCalendarAlt className="me-1" />
                    {template.weekOffPattern}
                  </div>
                  {template.description && (
                    <div className="small mt-1">{template.description}</div>
                  )}
                </div>
                <div className="btn-group btn-group-sm flex-shrink-0">
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      setEditingTemplate(template);
                      setShowForm(true);
                    }}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => duplicateTemplate(template.id)}
                    title="Duplicate"
                  >
                    <FaCopy />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      if (window.confirm('Delete this template?')) {
                        deleteTemplate(template.id);
                      }
                    }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-4 text-muted">
            <FaInbox className="fs-3" />
            <p className="mt-2 small">No templates found. Create your first shift template!</p>
          </div>
        )}
      </div>
    );
  }

  // Desktop View
  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h4 className="mb-1">Shift Templates</h4>
          <p className="text-muted mb-0">Manage and assign shift patterns to employees</p>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <FaPlus className="me-2" /> Add Template
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowBulkAssignment(true)}
          >
            <FaUsers className="me-2" /> Bulk Assign
          </button>
          <button
            className="btn btn-outline-success"
            onClick={exportTemplates}
          >
            <FaFileExport className="me-2" /> Export
          </button>
          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <FaFileImport className="me-2" /> Import
            </button>
            <div className="dropdown-menu p-3" style={{ minWidth: '300px' }}>
              <div className="mb-3">
                <label className="form-label">Select JSON file</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".json"
                  onChange={(e) => setImportFile(e.target.files[0])}
                />
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleImport}
                disabled={!importFile}
              >
                Import Templates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <TemplateStats stats={stats} />

      {/* Search and Filter */}
      <SearchFilter
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        stats={stats}
      />

      {/* Bulk Actions */}
      {selectedTemplates.length > 0 && (
        <div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
          <div>
            <FaCheckSquare className="me-2" />
            {selectedTemplates.length} template(s) selected
          </div>
          <div className="btn-group">
            <button
              className="btn btn-sm btn-danger"
              onClick={handleBulkDelete}
            >
              <FaTrash className="me-1" /> Delete Selected
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => selectedTemplates.forEach(id => toggleTemplateStatus(id))}
            >
              Toggle Status
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <ShiftTemplateForm
          template={editingTemplate}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTemplate(null);
          }}
        />
      )}

      {/* Bulk Assignment */}
      {showBulkAssignment && (
        <BulkAssignmentForm
          templates={templates}
          onAssign={(assignments) => {
            console.log('Bulk assignments:', assignments);
            setShowBulkAssignment(false);
          }}
          onCancel={() => setShowBulkAssignment(false)}
        />
      )}

      {/* Template Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: '50px' }}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedTemplates.length === filteredTemplates.length && filteredTemplates.length > 0}
                    onChange={selectAllTemplates}
                  />
                </div>
              </th>
              <th 
                onClick={() => handleSort('name')} 
                style={{ cursor: 'pointer', minWidth: '180px' }}
                className="user-select-none"
              >
                <div className="d-flex align-items-center">
                  Template Name
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('type')} 
                style={{ cursor: 'pointer' }}
                className="user-select-none"
              >
                <div className="d-flex align-items-center">
                  Type
                  {sortConfig.key === 'type' && (
                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                  )}
                </div>
              </th>
              <th>Timing</th>
              <th 
                onClick={() => handleSort('payMultiplier')} 
                style={{ cursor: 'pointer' }}
                className="user-select-none"
              >
                <div className="d-flex align-items-center">
                  Pay
                  {sortConfig.key === 'payMultiplier' && (
                    sortConfig.direction === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />
                  )}
                </div>
              </th>
              <th>Week-off</th>
              <th style={{ width: '100px' }}>Status</th>
              <th style={{ width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((template) => (
              <tr 
                key={template.id} 
                className={!template.enabled ? 'table-secondary' : ''}
                style={{ borderLeft: `4px solid ${template.color}` }}
              >
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedTemplates.includes(template.id)}
                      onChange={() => toggleTemplateSelection(template.id)}
                    />
                  </div>
                </td>
                <td>
                  <div className="fw-bold">{template.name}</div>
                  {template.description && (
                    <small className="text-muted d-block">{template.description}</small>
                  )}
                </td>
                <td>
                  <span className={`badge ${
                    template.type === 'night' ? 'bg-dark' :
                    template.type === 'rotational' ? 'bg-warning text-dark' :
                    template.type === 'flexible' ? 'bg-info' :
                    template.type === 'part-time' ? 'bg-secondary' :
                    'bg-primary'
                  }`}>
                    {template.type}
                  </span>
                </td>
                <td>
                  <div className="text-nowrap">
                    <FaClock className="me-1" />
                    {template.startTime} - {template.endTime}
                  </div>
                  <small className="text-muted d-block">
                    Grace: {template.gracePeriod}min • Break: {template.breakDuration}min
                  </small>
                </td>
                <td>
                  <span className="badge bg-success">
                    <FaMoneyBillWave className="me-1" />
                    {template.payMultiplier}x
                  </span>
                </td>
                <td>
                  <div className="text-nowrap">
                    <FaCalendarAlt className="me-1" />
                    {template.weekOffPattern}
                  </div>
                </td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={template.enabled}
                      onChange={() => toggleTemplateStatus(template.id)}
                    />
                  </div>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        setEditingTemplate(template);
                        setShowForm(true);
                      }}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => duplicateTemplate(template.id)}
                      title="Duplicate"
                    >
                      <FaCopy />
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        if (window.confirm('Delete this template?')) {
                          deleteTemplate(template.id);
                        }
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-5 text-muted">
          <FaInbox className="fs-1 mb-3" />
          <h5>No templates found</h5>
          <p className="mb-4">Create your first shift template or adjust your search filters</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="me-2" /> Create Template
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-top">
        <div className="row">
          <div className="col-md-6">
            <small className="text-muted">
              <FaInfoCircle className="me-1" />
              Templates are automatically saved to your browser's local storage
            </small>
          </div>
          <div className="col-md-6 text-end">
            <small className="text-muted">
              Showing {filteredTemplates.length} of {templates.length} templates
              {searchTerm && ` • Searching: "${searchTerm}"`}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};


const ShiftAssignmentList = () => {
  const {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    bulkDeleteAssignments,
    bulkAssignShifts,
    editingAssignment,
    setEditingAssignment,
    selectedAssignments,
    toggleAssignmentSelection,
    selectAllAssignments,
  } = useShiftAssignments();
  
  const { templates } = useShiftTemplates();
  const [showForm, setShowForm] = useState(false);
  const [showBulkAssignment, setShowBulkAssignment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'employeeName', direction: 'asc' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and search assignments
  const filteredAssignments = useMemo(() => {
    let result = [...assignments];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(assignment =>
        assignment.employeeName?.toLowerCase().includes(term) ||
        assignment.employeeId?.toLowerCase().includes(term) ||
        assignment.employeeDepartment?.toLowerCase().includes(term) ||
        assignment.notes?.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.status) {
      result = result.filter(assignment => assignment.status === filters.status);
    }
    if (filters.department) {
      result = result.filter(assignment => assignment.employeeDepartment === filters.department);
    }
    if (filters.type) {
      result = result.filter(assignment => assignment.assignmentType === filters.type);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [assignments, searchTerm, filters, sortConfig]);

  const getTemplateName = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.name : "Unknown";
  };

  const getTemplateType = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    return template ? template.type : "Unknown";
  };

  const handleSubmit = (assignment) => {
    if (editingAssignment) {
      updateAssignment(assignment);
    } else {
      addAssignment(assignment);
    }
    setShowForm(false);
    setEditingAssignment(null);
  };

  const handleBulkDelete = () => {
    if (selectedAssignments.length > 0 && window.confirm(`Delete ${selectedAssignments.length} selected assignments?`)) {
      bulkDeleteAssignments(selectedAssignments);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Calculate statistics
  const stats = useMemo(() => ({
    total: assignments.length,
    active: assignments.filter(a => a.status === 'active').length,
    pending: assignments.filter(a => a.status === 'pending').length,
    completed: assignments.filter(a => a.status === 'completed').length
  }), [assignments]);

  // Mobile View
  if (isMobile) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0">Shift Assignments</h5>
            <small className="text-muted">{stats.total} total assignments</small>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEditingAssignment(null);
              setShowForm(!showForm);
            }}
          >
            <FaPlusCircle />
          </button>
        </div>

        <SearchFilter
          activeSection="shiftAssignments"
          onSearch={setSearchTerm}
          onFilterChange={setFilters}
          stats={stats}
        />

        {showForm && (
          <ShiftAssignmentForm
            assignment={editingAssignment}
            templates={templates}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingAssignment(null);
            }}
          />
        )}

        {showBulkAssignment && (
          <BulkAssignmentForm
            templates={templates}
            onAssign={(assignments) => {
              bulkAssignShifts(assignments);
              setShowBulkAssignment(false);
            }}
            onCancel={() => setShowBulkAssignment(false)}
          />
        )}

        {selectedAssignments.length > 0 && (
          <div className="alert alert-warning mb-3 p-2">
            <div className="d-flex justify-content-between align-items-center">
              <span>{selectedAssignments.length} selected</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleBulkDelete}
              >
                <FaTrash /> Delete Selected
              </button>
            </div>
          </div>
        )}

        <div className="list-group">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={selectedAssignments.includes(assignment.id)}
                      onChange={() => toggleAssignmentSelection(assignment.id)}
                    />
                    <div>
                      <div className="fw-bold">{assignment.employeeName}</div>
                      <small className="text-muted d-block">{assignment.employeeId}</small>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="badge bg-secondary me-1">{assignment.employeeDepartment}</span>
                    <span className={`badge me-1 ${
                      assignment.status === 'active' ? 'bg-success' :
                      assignment.status === 'pending' ? 'bg-warning' :
                      assignment.status === 'completed' ? 'bg-info' : 'bg-danger'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  
                  <div className="mt-2 small">
                    <div className="d-flex justify-content-between">
                      <span>Shift: {getTemplateName(assignment.shiftTemplateId)}</span>
                      <span className="text-muted">{getTemplateType(assignment.shiftTemplateId)}</span>
                    </div>
                    <div className="text-muted">
                      {assignment.startDate} to {assignment.endDate || "Ongoing"}
                    </div>
                    {assignment.notes && (
                      <div className="mt-1 text-truncate" title={assignment.notes}>
                        <small>{assignment.notes}</small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="btn-group btn-group-sm ms-2">
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      setEditingAssignment(assignment);
                      setShowForm(true);
                    }}
                    title="Edit"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      if (window.confirm('Delete this assignment?')) {
                        deleteAssignment(assignment.id);
                      }
                    }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-4 text-muted">
            <FaInbox className="fs-3" />
            <p className="mt-2 small">No assignments found. Create your first shift assignment!</p>
          </div>
        )}

        <div className="mt-3">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => setShowBulkAssignment(true)}
          >
            <FaUsers className="me-2" /> Bulk Assign Shifts
          </button>
        </div>
      </div>
    );
  }

  // Desktop View
  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <div>
          <h5 className="mb-1">Shift Assignments</h5>
          <div className="d-flex gap-3 small text-muted">
            <span>Total: <strong>{stats.total}</strong></span>
            <span>Active: <strong className="text-success">{stats.active}</strong></span>
            <span>Pending: <strong className="text-warning">{stats.pending}</strong></span>
            <span>Completed: <strong className="text-info">{stats.completed}</strong></span>
          </div>
        </div>
        <div className="btn-group btn-group-sm mt-2 mt-md-0">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingAssignment(null);
              setShowForm(!showForm);
            }}
          >
            <FaPlusCircle className="me-1" /> Add Assignment
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowBulkAssignment(true)}
          >
            <FaUsers className="me-1" /> Bulk Assign
          </button>
          {selectedAssignments.length > 0 && (
            <button
              className="btn btn-danger"
              onClick={handleBulkDelete}
            >
              <FaTrash className="me-1" /> Delete ({selectedAssignments.length})
            </button>
          )}
        </div>
      </div>

      <SearchFilter
        activeSection="shiftAssignments"
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        stats={stats}
      />

      {showForm && (
        <ShiftAssignmentForm
          assignment={editingAssignment}
          templates={templates}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingAssignment(null);
          }}
        />
      )}

      {showBulkAssignment && (
        <BulkAssignmentForm
          templates={templates}
          onAssign={(assignments) => {
            bulkAssignShifts(assignments);
            setShowBulkAssignment(false);
          }}
          onCancel={() => setShowBulkAssignment(false)}
        />
      )}

      <div className="table-responsive">
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedAssignments.length === filteredAssignments.length && filteredAssignments.length > 0}
                    onChange={selectAllAssignments}
                  />
                </div>
              </th>
              <th onClick={() => handleSort('employeeName')} style={{ cursor: 'pointer' }}>
                Employee {sortConfig.key === 'employeeName' && (
                  sortConfig.direction === 'asc' ? <FaCaretUp /> : <FaCaretDown />
                )}
              </th>
              <th onClick={() => handleSort('employeeDepartment')} style={{ cursor: 'pointer' }}>
                Dept {sortConfig.key === 'employeeDepartment' && (
                  sortConfig.direction === 'asc' ? <FaCaretUp /> : <FaCaretDown />
                )}
              </th>
              <th>Shift</th>
              <th onClick={() => handleSort('assignmentType')} style={{ cursor: 'pointer' }}>
                Type {sortConfig.key === 'assignmentType' && (
                  sortConfig.direction === 'asc' ? <FaCaretUp /> : <FaCaretDown />
                )}
              </th>
              <th>Period</th>
              <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                Status {sortConfig.key === 'status' && (
                  sortConfig.direction === 'asc' ? <FaCaretUp /> : <FaCaretDown />
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedAssignments.includes(assignment.id)}
                      onChange={() => toggleAssignmentSelection(assignment.id)}
                    />
                  </div>
                </td>
                <td className="text-nowrap">
                  <div className="fw-medium">{assignment.employeeName}</div>
                  <small className="text-muted d-block">{assignment.employeeId}</small>
                </td>
                <td>
                  <span className="badge bg-secondary">{assignment.employeeDepartment}</span>
                </td>
                <td>
                  <div className="fw-medium">{getTemplateName(assignment.shiftTemplateId)}</div>
                  <small className="text-muted d-block">{getTemplateType(assignment.shiftTemplateId)}</small>
                </td>
                <td>
                  <span className={`badge small ${
                    assignment.assignmentType === 'bulk' ? 'bg-primary' :
                    assignment.assignmentType === 'rotational' ? 'bg-warning text-dark' : 'bg-info'
                  }`}>
                    {assignment.assignmentType}
                  </span>
                </td>
                <td className="text-nowrap">
                  <div>{assignment.startDate}</div>
                  <small className="text-muted">to {assignment.endDate || "Ongoing"}</small>
                </td>
                <td>
                  <span className={`badge ${
                    assignment.status === 'active' ? 'bg-success' :
                    assignment.status === 'pending' ? 'bg-warning' :
                    assignment.status === 'completed' ? 'bg-info' : 'bg-danger'
                  }`}>
                    {assignment.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => {
                        setEditingAssignment(assignment);
                        setShowForm(true);
                      }}
                      title="Edit"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        if (window.confirm('Delete this assignment?')) {
                          deleteAssignment(assignment.id);
                        }
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-4 text-muted">
          <FaInbox style={{ fontSize: '3rem' }} />
          <p className="mt-2">No assignments found. Create your first shift assignment!</p>
        </div>
      )}
    </div>
  );
};

// Main Component
const FlexibleWorkList = () => {
  const {
    flexibleWork,
    addWork,
    updateWork,
    deleteWork,
    editingWork,
    setEditingWork,
  } = useFlexibleWork();
  
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'employeeName', direction: 'asc' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and search flexible work - MOVE THIS FIRST
  const filteredFlexibleWork = useMemo(() => {
    let result = [...flexibleWork];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(work =>
        work.employeeName.toLowerCase().includes(term) ||
        work.employeeId.toLowerCase().includes(term) ||
        work.employeeDepartment?.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.type) {
      result = result.filter(work => work.workPattern === filters.type);
    }
    if (filters.status !== null) {
      result = result.filter(work => work.isActive === filters.status);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [flexibleWork, searchTerm, filters, sortConfig]);

  // Calculate stats - MOVE THIS AFTER filteredFlexibleWork is defined
  const stats = useMemo(() => {
    const total = flexibleWork.length;
    const active = flexibleWork.filter(w => w.isActive).length;
    const hybrid = flexibleWork.filter(w => w.workPattern === 'hybrid').length;
    const remote = flexibleWork.filter(w => w.workPattern === 'remote').length;
    const office = flexibleWork.filter(w => w.workPattern === 'office').length;
    const filtered = filteredFlexibleWork.length;
    
    return { total, active, hybrid, remote, office, filtered };
  }, [flexibleWork, filteredFlexibleWork]); // Add filteredFlexibleWork dependency

  const handleSubmit = (work) => {
    if (editingWork) {
      updateWork(work);
    } else {
      addWork(work);
    }
    setShowForm(false);
    setEditingWork(null);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Rest of the component remains the same...
  // Mobile View
  if (isMobile) {
    return (
      <div className="container-fluid px-3 py-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold mb-0">Flexible Work Arrangements</h5>
            <p className="text-muted small mb-0">
              {stats.total} total • {stats.active} active
            </p>
          </div>
          <button
            className="btn btn-primary btn-sm d-flex align-items-center"
            onClick={() => setShowForm(!showForm)}
          >
            <FaPlusCircle className="me-1" />
            <span>Add</span>
          </button>
        </div>

        {/* Search & Filter */}
        <SearchFilter
          onSearch={setSearchTerm}
          onFilterChange={setFilters}
          stats={stats}
          activeSection="flexibleWork"
        />

        {/* Form */}
        {showForm && (
          <FlexibleWorkForm
            work={editingWork}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingWork(null);
            }}
          />
        )}

        {/* Mobile Cards List */}
        <div className="list-group">
          {filteredFlexibleWork.map((work) => (
            <div key={work.id} className="list-group-item mb-2 border rounded">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  {/* Employee Info */}
                  <div className="d-flex align-items-center mb-2">
                    <div className="avatar-sm me-2">
                      <div className="avatar-title bg-light rounded-circle text-primary">
                        {work.employeeName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="fw-bold">{work.employeeName}</div>
                      <small className="text-muted">{work.employeeId}</small>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="mb-2">
                    <span className="badge bg-secondary small">{work.employeeDepartment}</span>
                    <span className={`badge ms-1 small ${
                      work.isActive ? 'bg-success' : 'bg-secondary'
                    }`}>
                      {work.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Work Pattern */}
                  <div className="mb-2">
                    <span className={`badge ${
                      work.workPattern === 'hybrid' ? 'bg-primary' :
                      work.workPattern === 'remote' ? 'bg-success' :
                      work.workPattern === 'office' ? 'bg-info' : 'bg-warning text-dark'
                    }`}>
                      {work.workPattern}
                    </span>
                  </div>

                  {/* Time Info */}
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <div className="small text-muted">Flexible Hours</div>
                      <div className="fw-bold small">{work.flexibleStart} - {work.flexibleEnd}</div>
                    </div>
                    <div className="col-6">
                      <div className="small text-muted">Core Hours</div>
                      <div className="fw-bold small">{work.coreStart} - {work.coreEnd}</div>
                    </div>
                  </div>

                  {/* Remote Days */}
                  {work.remoteDays.length > 0 && (
                    <div className="mb-2">
                      <div className="small text-muted">Remote Days</div>
                      <div className="d-flex flex-wrap gap-1">
                        {work.remoteDays.map(day => (
                          <span key={day} className="badge bg-light text-dark small">
                            {day.substring(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="btn-group btn-group-sm flex-shrink-0">
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      setEditingWork(work);
                      setShowForm(true);
                    }}
                    title="Edit"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      if (window.confirm('Delete this arrangement?')) {
                        deleteWork(work.id);
                      }
                    }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFlexibleWork.length === 0 && (
          <div className="text-center py-5 text-muted">
            <FaInbox className="fs-1 mb-3 opacity-50" />
            <p className="mb-0">No flexible work arrangements found.</p>
            <small>Try adjusting your search or add a new arrangement.</small>
          </div>
        )}
      </div>
    );
  }

  // Desktop View
  return (
    <div className="container-fluid px-4 py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Flexible Work Arrangements</h4>
          <p className="text-muted mb-0">
            Manage employee flexible work schedules and remote arrangements
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              // Export functionality
              const data = JSON.stringify(flexibleWork, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'flexible-work-arrangements.json';
              a.click();
            }}
          >
            Export
          </button>
          <button
            className="btn btn-primary btn-sm d-flex align-items-center"
            onClick={() => setShowForm(!showForm)}
          >
            <FaPlusCircle className="me-1" /> Add Arrangement
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <SearchFilter
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        stats={stats}
        activeSection="flexibleWork"
      />

      {/* Form */}
      {showForm && (
        <FlexibleWorkForm
          work={editingWork}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingWork(null);
          }}
        />
      )}

      {/* Desktop Table */}
      <div className="card border">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th 
                    onClick={() => handleSort('employeeName')} 
                    style={{ cursor: 'pointer', minWidth: '180px' }}
                    className="ps-4"
                  >
                    <div className="d-flex align-items-center">
                      <span>Employee</span>
                      {sortConfig.key === 'employeeName' && (
                        <span className="ms-1">
                          {sortConfig.direction === 'asc' ? <FaCaretUp /> : <FaCaretDown />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('employeeDepartment')} 
                    style={{ cursor: 'pointer', minWidth: '120px' }}
                  >
                    <div className="d-flex align-items-center">
                      <span>Department</span>
                      {sortConfig.key === 'employeeDepartment' && (
                        <span className="ms-1">
                          {sortConfig.direction === 'asc' ? <FaCaretUp /> : <FaCaretDown />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th style={{ minWidth: '140px' }}>Flexible Hours</th>
                  <th style={{ minWidth: '140px' }}>Core Hours</th>
                  <th 
                    onClick={() => handleSort('workPattern')} 
                    style={{ cursor: 'pointer', minWidth: '100px' }}
                  >
                    <div className="d-flex align-items-center">
                      <span>Pattern</span>
                      {sortConfig.key === 'workPattern' && (
                        <span className="ms-1">
                          {sortConfig.direction === 'asc' ? <FaCaretUp /> : <FaCaretDown />}
                        </span>
                      )}
                    </div>
                  </th>
                  <th style={{ minWidth: '150px' }}>Remote Days</th>
                  <th style={{ minWidth: '100px' }}>Status</th>
                  <th className="text-end pe-4" style={{ minWidth: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFlexibleWork.map((work) => (
                  <tr key={work.id} className={!work.isActive ? 'opacity-75' : ''}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm me-3">
                          <div className="avatar-title bg-light rounded-circle text-primary">
                            {work.employeeName.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="fw-bold">{work.employeeName}</div>
                          <small className="text-muted">{work.employeeId}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{work.employeeDepartment}</span>
                    </td>
                    <td className="text-nowrap">
                      <div>{work.flexibleStart} - {work.flexibleEnd}</div>
                      <small className="text-muted">Flexible window</small>
                    </td>
                    <td className="text-nowrap">
                      <div>{work.coreStart} - {work.coreEnd}</div>
                      <small className="text-muted">Required core</small>
                    </td>
                    <td>
                      <span className={`badge ${
                        work.workPattern === 'hybrid' ? 'bg-primary' :
                        work.workPattern === 'remote' ? 'bg-success' :
                        work.workPattern === 'office' ? 'bg-info' : 
                        work.workPattern === 'flexible' ? 'bg-purple' : 'bg-warning text-dark'
                      }`}>
                        {work.workPattern}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {work.remoteDays.map(day => (
                          <span key={day} className="badge bg-light text-dark small">
                            {day.substring(0, 3)}
                          </span>
                        ))}
                        {work.remoteDays.length === 0 && (
                          <span className="text-muted small">-</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${work.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {work.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => {
                            setEditingWork(work);
                            setShowForm(true);
                          }}
                          title="Edit"
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            if (window.confirm('Delete this arrangement?')) {
                              deleteWork(work.id);
                            }
                          }}
                          title="Delete"
                        >
                          <FaTrash />
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

      {/* Empty State */}
      {filteredFlexibleWork.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-3">
            <FaInbox className="text-muted" style={{ fontSize: '4rem', opacity: 0.5 }} />
          </div>
          <h5 className="text-muted mb-2">No flexible work arrangements found</h5>
          <p className="text-muted mb-4">
            {searchTerm || Object.keys(filters).length > 0
              ? 'Try adjusting your search or filters'
              : 'Add your first flexible work arrangement'}
          </p>
          {!showForm && (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <FaPlusCircle className="me-2" /> Add First Arrangement
            </button>
          )}
        </div>
      )}


    </div>
  );
};
// ----------------------------------------
// RESPONSIVE MAIN COMPONENT
// ----------------------------------------
const ShiftManagement = () => {
  const [state, dispatch] = useReducer(shiftReducer, initialState);
  const [activeSection, setActiveSection] = useState("shiftTemplates");
  const [showRoster, setShowRoster] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Local storage initialization
  useEffect(() => {
    const saved = localStorage.getItem("shiftManagement");
    if (saved) {
      dispatch({ type: "INIT", payload: JSON.parse(saved) });
    } else {
      localStorage.setItem("shiftManagement", JSON.stringify(initialState));
    }
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem("shiftManagement", JSON.stringify(state));
  }, [state]);

  const sectionComponents = {
    shiftTemplates: <ShiftTemplateList />,
    shiftAssignments: <ShiftAssignmentList />,
    flexibleWork: <FlexibleWorkList />,
  };

  const sectionTitles = {
    shiftTemplates: "Shift Templates",
    shiftAssignments: "Shift Assignments",
    flexibleWork: "Flexible Work",
  };

  // Export data functionality
  const exportData = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shift-management-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          dispatch({ type: "INIT", payload: data });
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <ShiftContext.Provider value={{ state, dispatch }}>
      <div className="container-fluid py-2 py-md-4">
        {/* PAGE HEADER */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="mb-3 mb-md-0">
            <h2 className="fw-bold h4 h2-md">Shift Management & Rostering</h2>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <NotificationsPanel />
            <div className="btn-group btn-group-sm">
              <button className="btn btn-outline-success" onClick={exportData}>
                <FaDownload className="me-1" /> {!isMobile && 'Export'}
              </button>
              <label className="btn btn-outline-primary">
                <FaUpload className="me-1" /> {!isMobile && 'Import'}
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* SECTION TABS - Responsive */}
<div className="mb-4">
  {isMobile ? (
    <div className="d-flex flex-wrap gap-1">
      {Object.keys(sectionComponents).map((key) => (
        <button
          key={key}
          className={`btn btn-sm flex-fill ${activeSection === key ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setActiveSection(key);
            setShowRoster(false);
          }}
        >
          {key === 'shiftTemplates' ? <FaCalendarWeek className="me-1" /> :
           key === 'shiftAssignments' ? <FaUserCheck className="me-1" /> :
           <FaClock className="me-1" />}
          <span className="small">{sectionTitles[key].split(' ')[0]}</span>
        </button>
      ))}
    </div>
  ) : (
    <div className="row g-2">
      {Object.keys(sectionComponents).map((key) => (
        <div className="col-md-4" key={key}>
          <button
            className={`btn w-100 py-2 py-md-3 d-flex align-items-center justify-content-center ${
              activeSection === key ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => {
              setActiveSection(key);
              setShowRoster(false);
            }}
          >
            <span className="me-2">
              {key === 'shiftTemplates' ? <FaCalendarWeek size={20} /> :
               key === 'shiftAssignments' ? <FaUserCheck size={20} /> :
               <FaClock size={20} />}
            </span>
            {sectionTitles[key]}
          </button>
        </div>
      ))}
    </div>
  )}
</div>

        {/* STATISTICS DASHBOARD - Responsive */}
        <div className="row g-2 mb-4">
          <div className="col-6 col-md-3">
            <div className="card text-dark bg-light h-100">
              <div className="card-body p-2 p-md-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="card-title small mb-1">Shift Templates</div>
                    <div className="card-text fs-5 mb-0">{state.shiftTemplates.length}</div>
                  </div>
                  <FaCalendarWeek size={isMobile ? 24 : 30} />
                </div>
                <small className="opacity-75 small">
                  {state.shiftTemplates.filter(t => t.type === 'rotational').length} Rotational
                </small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-dark bg-light h-100">
              <div className="card-body p-2 p-md-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="card-title small mb-1">Active Assignments</div>
                    <div className="card-text fs-5 mb-0">
                      {state.shiftAssignments.filter(a => a.status === 'active').length}
                    </div>
                  </div>
                  <FaUserCheck size={isMobile ? 24 : 30} />
                </div>
                <small className="opacity-75 small">
                  {state.shiftAssignments.filter(a => a.assignmentType === 'bulk').length} Bulk
                </small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-dark bg-light h-100">
              <div className="card-body p-2 p-md-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="card-title small mb-1">Flexible Work</div>
                    <div className="card-text fs-5 mb-0">{state.flexibleWork.length}</div>
                  </div>
                  <FaClock size={isMobile ? 24 : 30} />
                </div>
                <small className="opacity-75 small">
                  {state.flexibleWork.filter(f => f.compressedWeek).length} Compressed
                </small>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card text-dark bg-light h-100">
              <div className="card-body p-2 p-md-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="card-title small mb-1">Notifications</div>
                    <div className="card-text fs-5 mb-0">
                      {state.notifications.filter(n => !n.read).length}
                    </div>
                  </div>
                  <FaBell size={isMobile ? 24 : 30} />
                </div>
                <small className="opacity-75 small">
                  {state.notifications.length} Total
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* ROSTER TOGGLE */}
        {activeSection === "shiftAssignments" && (
          <div className="mb-3">
            <button
              className={`btn btn-sm ${showRoster ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setShowRoster(!showRoster)}
            >
              {showRoster ? <><FaEyeSlash className="me-1" /> Hide Roster</> : <><FaEye className="me-1" /> Show Roster</>}
            </button>
          </div>
        )}

        {/* SHOW ROSTER OR ACTIVE SECTION */}
        {showRoster && activeSection === "shiftAssignments" ? (
          <ShiftRoster 
            assignments={state.shiftAssignments}
            templates={state.shiftTemplates}
          />
        ) : (
          <div className="card shadow-sm">
            
            <div className="card-body p-2 p-md-3">
              {sectionComponents[activeSection]}
            </div>
          </div>
        )}
      </div>
    </ShiftContext.Provider>
  );
};

export default ShiftManagement;