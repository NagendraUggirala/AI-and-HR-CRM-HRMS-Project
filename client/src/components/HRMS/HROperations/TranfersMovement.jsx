import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Badge,
  Alert as MuiAlert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  FormControlLabel,
  Switch,
  Snackbar,
  Fab,
  Fade,
  Menu,
  MenuItem as MenuItemComponent,
  LinearProgress,
  CardHeader
} from '@mui/material';
import {
  TransferWithinAStation as TransferIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  CheckCircle as CheckIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  History as HistoryIcon,
  ArrowForward as ArrowForwardIcon,
  Email as EmailIcon,
  AttachFile as AttachFileIcon,
  Save as SaveIcon,
  Send as SendIcon,
  CheckCircleOutline as ApproveIcon,
  NotInterested as RejectIcon,
  SwapHoriz as SwapHorizIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Print as PrintIcon,
  AccessTime as TimeIcon,
  AccountTree as OrgChartIcon,
  AutoGraph as AutoGraphIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Sample data for departments and locations
const sampleDepartments = [
  'Engineering',
  'Product Management', 
  'Sales',
  'Marketing',
  'Human Resources',
  'Finance',
  'Operations',
  'Customer Support'
];

const sampleLocations = [
  'Bangalore',
  'Delhi', 
  'Mumbai',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata'
];

// Predefined organization data
const predefinedOrganizationData = {
  departments: sampleDepartments.map((dept, index) => ({
    id: `D${index + 1}`,
    name: dept,
    code: dept.substring(0, 3).toUpperCase(),
    head: `${dept} Head`,
    employeeCount: Math.floor(Math.random() * 50) + 10
  })),
  locations: sampleLocations.map((loc, index) => ({
    id: `L${index + 1}`,
    name: loc,
    code: loc.substring(0, 3).toUpperCase(),
    address: `${loc} Office Address`,
    type: loc === 'Bangalore' ? 'Head Office' : 'Branch',
    employeeCount: Math.floor(Math.random() * 100) + 20
  })),
  designations: [
    { id: '1', name: 'Software Engineer', code: 'SE', grade: 'L1', level: 1, minSalary: 600000, maxSalary: 900000 },
    { id: '2', name: 'Senior Software Engineer', code: 'SSE', grade: 'L2', level: 2, minSalary: 900000, maxSalary: 1500000 },
    { id: '3', name: 'Tech Lead', code: 'TL', grade: 'L3', level: 3, minSalary: 1500000, maxSalary: 2000000 },
    { id: '4', name: 'Engineering Manager', code: 'EM', grade: 'L4', level: 4, minSalary: 2000000, maxSalary: 3000000 },
    { id: '5', name: 'Product Manager', code: 'PM', grade: 'L3', level: 3, minSalary: 1200000, maxSalary: 1800000 },
    { id: '6', name: 'HR Executive', code: 'HRE', grade: 'L2', level: 2, minSalary: 500000, maxSalary: 800000 },
    { id: '7', name: 'HR Manager', code: 'HRM', grade: 'L3', level: 3, minSalary: 800000, maxSalary: 1200000 },
    { id: '8', name: 'Sales Executive', code: 'SALE', grade: 'L2', level: 2, minSalary: 400000, maxSalary: 700000 },
    { id: '9', name: 'Senior Sales Executive', code: 'SSALE', grade: 'L3', level: 3, minSalary: 700000, maxSalary: 1000000 },
    { id: '10', name: 'Finance Analyst', code: 'FA', grade: 'L2', level: 2, minSalary: 600000, maxSalary: 900000 },
    { id: '11', name: 'Marketing Manager', code: 'MM', grade: 'L3', level: 3, minSalary: 800000, maxSalary: 1200000 }
  ],
  reportingManagers: [
    { id: '1', name: 'Jane Smith', employeeId: 'EMP002', designation: 'HR Manager', department: 'Human Resources', location: 'Bangalore', email: 'jane.smith@company.com' },
    { id: '2', name: 'Robert Johnson', employeeId: 'EMP003', designation: 'Head of Product', department: 'Product Management', location: 'Bangalore', email: 'robert.johnson@company.com' },
    { id: '3', name: 'Mike Wilson', employeeId: 'EMP006', designation: 'Sales Director', department: 'Sales', location: 'Mumbai', email: 'mike.wilson@company.com' },
    { id: '4', name: 'Sarah Davis', employeeId: 'EMP007', designation: 'Marketing Director', department: 'Marketing', location: 'Chennai', email: 'sarah.davis@company.com' },
    { id: '5', name: 'David Brown', employeeId: 'EMP008', designation: 'HR Director', department: 'Human Resources', location: 'Bangalore', email: 'david.brown@company.com' },
    { id: '6', name: 'Lisa Wang', employeeId: 'EMP009', designation: 'CFO', department: 'Finance', location: 'Bangalore', email: 'lisa.wang@company.com' }
  ]
};

// Main Component
const TransferMovement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State Management
  const [activeTab, setActiveTab] = useState(0);
  const [transferRequests, setTransferRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [organization, setOrganization] = useState(predefinedOrganizationData);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filters and Search State
  const [filters, setFilters] = useState({
    status: '',
    requestType: '',
    department: '',
    location: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // Notification State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Bulk Operations State
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkActionMenu, setBulkActionMenu] = useState(null);
  
  // Form State
  const [newTransfer, setNewTransfer] = useState({
    employeeId: '',
    requestType: 'Internal Transfer',
    newDepartment: '',
    newLocation: '',
    newDesignation: '',
    newReportingManager: '',
    transferDate: new Date(),
    effectiveDate: new Date(new Date().setDate(new Date().getDate() + 15)),
    reason: '',
    notes: '',
    relocationSupportRequired: false,
    travelAssistance: false,
    accommodationSupport: false,
    familyRelocation: false,
    estimatedCost: '',
    attachments: []
  });

  // Reminders State
  const [reminders, setReminders] = useState([
    { id: 1, approver: 'Jane Smith', role: 'Current Manager', daysPending: 3, requestId: 'TR002' },
    { id: 2, approver: 'HR Director', role: 'HR Approval', daysPending: 5, requestId: 'TR002' },
    { id: 3, approver: 'Mike Wilson', role: 'Current Manager', daysPending: 1, requestId: 'TR003' }
  ]);

  // Sample Data - More realistic data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Create realistic employee data
      const employeeData = [
        {
          id: '1',
          name: 'John Doe',
          employeeId: 'EMP001',
          currentDepartment: 'Engineering',
          currentLocation: 'Bangalore',
          currentDesignation: 'Senior Software Engineer',
          currentReportingManager: 'Jane Smith',
          email: 'john.doe@company.com',
          phone: '+91 9876543210',
          grade: 'L3',
          salary: 1500000,
          avatarColor: '#4caf50'
        },
        {
          id: '2',
          name: 'Jane Smith',
          employeeId: 'EMP002',
          currentDepartment: 'HR',
          currentLocation: 'Delhi',
          currentDesignation: 'HR Manager',
          currentReportingManager: 'David Brown',
          email: 'jane.smith@company.com',
          phone: '+91 9876543211',
          grade: 'L4',
          salary: 1200000,
          avatarColor: '#2196f3'
        },
        {
          id: '3',
          name: 'Robert Johnson',
          employeeId: 'EMP003',
          currentDepartment: 'Sales',
          currentLocation: 'Mumbai',
          currentDesignation: 'Sales Executive',
          currentReportingManager: 'Mike Wilson',
          email: 'robert.johnson@company.com',
          phone: '+91 9876543212',
          grade: 'L2',
          salary: 800000,
          avatarColor: '#ff9800'
        },
        {
          id: '4',
          name: 'Alice Williams',
          employeeId: 'EMP004',
          currentDepartment: 'Marketing',
          currentLocation: 'Chennai',
          currentDesignation: 'Marketing Manager',
          currentReportingManager: 'Sarah Davis',
          email: 'alice.williams@company.com',
          phone: '+91 9876543213',
          grade: 'L4',
          salary: 1300000,
          avatarColor: '#9c27b0'
        },
        {
          id: '5',
          name: 'Michael Brown',
          employeeId: 'EMP005',
          currentDepartment: 'Finance',
          currentLocation: 'Hyderabad',
          currentDesignation: 'Finance Analyst',
          currentReportingManager: 'Lisa Wang',
          email: 'michael.brown@company.com',
          phone: '+91 9876543214',
          grade: 'L3',
          salary: 1100000,
          avatarColor: '#f44336'
        }
      ];

      // Create realistic transfer requests
      const transferData = [
        {
          id: 'TR001',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          requestType: 'Internal Transfer',
          currentDepartment: 'Engineering',
          newDepartment: 'Product Management',
          currentLocation: 'Bangalore',
          newLocation: 'Bangalore',
          currentDesignation: 'Senior Software Engineer',
          newDesignation: 'Product Manager',
          currentReportingManager: 'Jane Smith',
          newReportingManager: 'Robert Johnson',
          transferDate: new Date('2024-06-01'),
          effectiveDate: new Date('2024-06-15'),
          reason: 'Career growth opportunity and skill alignment with product management',
          status: 'Approved',
          submittedDate: new Date('2024-05-15'),
          approvedDate: new Date('2024-05-20'),
          approvalWorkflow: [
            { step: 1, approverName: 'Jane Smith', approverRole: 'Current Manager', status: 'Approved', date: new Date('2024-05-16'), comments: 'Employee has shown great potential for product role' },
            { step: 2, approverName: 'Robert Johnson', approverRole: 'New Manager', status: 'Approved', date: new Date('2024-05-18'), comments: 'Looking forward to having John in the team' },
            { step: 3, approverName: 'HR Manager', approverRole: 'HR Approval', status: 'Approved', date: new Date('2024-05-20'), comments: 'All documentation verified and approved' }
          ],
          relocationSupportRequired: false,
          documents: [],
          notes: 'Employee to complete handover by June 10th',
          createdBy: 'John Doe',
          lastModified: new Date('2024-05-22')
        },
        {
          id: 'TR002',
          employeeId: 'EMP002',
          employeeName: 'Jane Smith',
          requestType: 'Location Transfer',
          currentDepartment: 'HR',
          newDepartment: 'HR',
          currentLocation: 'Delhi',
          newLocation: 'Bangalore',
          currentDesignation: 'HR Manager',
          newDesignation: 'HR Manager',
          currentReportingManager: 'David Brown',
          newReportingManager: 'David Brown',
          transferDate: new Date('2024-07-01'),
          effectiveDate: new Date('2024-07-15'),
          reason: 'Head office relocation and family reasons',
          status: 'Pending',
          submittedDate: new Date('2024-06-10'),
          approvalWorkflow: [
            { step: 1, approverName: 'David Brown', approverRole: 'Current Manager', status: 'Approved', date: new Date('2024-06-12'), comments: 'Approved - important for head office operations' },
            { step: 2, approverName: 'HR Director', approverRole: 'HR Approval', status: 'Pending' },
            { step: 3, approverName: 'Finance', approverRole: 'Budget Approval', status: 'Pending' }
          ],
          relocationSupportRequired: true,
          relocationDetails: {
            travelAssistance: true,
            accommodationSupport: true,
            familyRelocation: true,
            estimatedCost: 50000,
            approvedBudget: 45000
          },
          documents: [],
          notes: 'Requires temporary accommodation for 2 months',
          createdBy: 'Jane Smith',
          lastModified: new Date('2024-06-12')
        },
        {
          id: 'TR003',
          employeeId: 'EMP003',
          employeeName: 'Robert Johnson',
          requestType: 'Promotion Transfer',
          currentDepartment: 'Sales',
          newDepartment: 'Sales',
          currentLocation: 'Mumbai',
          newLocation: 'Mumbai',
          currentDesignation: 'Sales Executive',
          newDesignation: 'Senior Sales Executive',
          currentReportingManager: 'Mike Wilson',
          newReportingManager: 'Mike Wilson',
          transferDate: new Date('2024-08-01'),
          effectiveDate: new Date('2024-08-01'),
          reason: 'Exceptional performance and exceeding sales targets',
          status: 'Approved',
          submittedDate: new Date('2024-07-01'),
          approvedDate: new Date('2024-07-05'),
          approvalWorkflow: [
            { step: 1, approverName: 'Mike Wilson', approverRole: 'Current Manager', status: 'Approved', date: new Date('2024-07-02'), comments: 'Top performer in the team' },
            { step: 2, approverName: 'Sales Director', approverRole: 'Department Head', status: 'Approved', date: new Date('2024-07-04'), comments: 'Well deserved promotion' },
            { step: 3, approverName: 'HR Manager', approverRole: 'HR Approval', status: 'Approved', date: new Date('2024-07-05'), comments: 'Salary revision processed' }
          ],
          relocationSupportRequired: false,
          documents: [],
          notes: 'Salary revision effective from August 1st',
          createdBy: 'Mike Wilson',
          lastModified: new Date('2024-07-05')
        },
        {
          id: 'TR004',
          employeeId: 'EMP004',
          employeeName: 'Alice Williams',
          requestType: 'Department Transfer',
          currentDepartment: 'Marketing',
          newDepartment: 'Product Marketing',
          currentLocation: 'Chennai',
          newLocation: 'Chennai',
          currentDesignation: 'Marketing Manager',
          newDesignation: 'Product Marketing Manager',
          currentReportingManager: 'Sarah Davis',
          newReportingManager: 'Robert Johnson',
          transferDate: new Date('2024-09-01'),
          effectiveDate: new Date('2024-09-15'),
          reason: 'Better alignment with career goals in product marketing',
          status: 'Rejected',
          submittedDate: new Date('2024-08-15'),
          rejectionDate: new Date('2024-08-20'),
          approvalWorkflow: [
            { step: 1, approverName: 'Sarah Davis', approverRole: 'Current Manager', status: 'Rejected', date: new Date('2024-08-18'), comments: 'Critical resource for ongoing campaign' },
            { step: 2, approverName: 'Robert Johnson', approverRole: 'New Manager', status: 'Not Required' },
            { step: 3, approverName: 'HR Manager', approverRole: 'HR Approval', status: 'Not Required' }
          ],
          relocationSupportRequired: false,
          documents: [],
          notes: 'Request can be reconsidered after Q4 campaigns',
          createdBy: 'Alice Williams',
          lastModified: new Date('2024-08-20')
        },
        {
          id: 'TR005',
          employeeId: 'EMP005',
          employeeName: 'Michael Brown',
          requestType: 'Location Transfer',
          currentDepartment: 'Finance',
          newDepartment: 'Finance',
          currentLocation: 'Hyderabad',
          newLocation: 'Bangalore',
          currentDesignation: 'Finance Analyst',
          newDesignation: 'Senior Finance Analyst',
          transferDate: new Date('2024-10-01'),
          effectiveDate: new Date('2024-10-01'),
          reason: 'New position opening at head office',
          status: 'Completed',
          submittedDate: new Date('2024-09-01'),
          approvedDate: new Date('2024-09-10'),
          completionDate: new Date('2024-10-01'),
          approvalWorkflow: [
            { step: 1, approverName: 'Lisa Wang', approverRole: 'Current Manager', status: 'Approved', date: new Date('2024-09-05'), comments: 'Approved with immediate effect' },
            { step: 2, approverName: 'Finance Head', approverRole: 'Department Head', status: 'Approved', date: new Date('2024-09-08'), comments: 'Required for head office operations' },
            { step: 3, approverName: 'HR Manager', approverRole: 'HR Approval', status: 'Approved', date: new Date('2024-09-10'), comments: 'All formalities completed' }
          ],
          relocationSupportRequired: true,
          relocationDetails: {
            travelAssistance: true,
            accommodationSupport: false,
            familyRelocation: false,
            estimatedCost: 25000,
            approvedBudget: 25000
          },
          documents: [],
          notes: 'Relocation completed successfully',
          createdBy: 'Lisa Wang',
          lastModified: new Date('2024-10-05')
        }
      ];

      setEmployees(employeeData);
      setTransferRequests(transferData);
      setLoading(false);
      showNotification('Data loaded successfully', 'success');
    };

    fetchData();
  }, []);

  // Notification Handler
  const showNotification = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Filtered Requests with search and filters
  const filteredRequests = transferRequests.filter(request => {
    // Search term matching
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      request.employeeName.toLowerCase().includes(searchLower) ||
      request.employeeId.toLowerCase().includes(searchLower) ||
      request.id.toLowerCase().includes(searchLower) ||
      request.currentDepartment.toLowerCase().includes(searchLower) ||
      request.newDepartment.toLowerCase().includes(searchLower) ||
      request.currentLocation.toLowerCase().includes(searchLower) ||
      request.newLocation.toLowerCase().includes(searchLower) ||
      request.requestType.toLowerCase().includes(searchLower) ||
      request.status.toLowerCase().includes(searchLower);
    
    // Filter matching
    const matchesStatus = !filters.status || request.status === filters.status;
    const matchesType = !filters.requestType || request.requestType === filters.requestType;
    const matchesDept = !filters.department || 
      request.currentDepartment === filters.department || 
      request.newDepartment === filters.department;
    const matchesLocation = !filters.location || 
      request.currentLocation === filters.location || 
      request.newLocation === filters.location;

    return matchesSearch && matchesStatus && matchesType && matchesDept && matchesLocation;
  });

  // Get unique departments and locations for filters
  const uniqueDepartments = Array.from(new Set([
    ...transferRequests.map(r => r.currentDepartment),
    ...transferRequests.map(r => r.newDepartment),
    ...sampleDepartments
  ])).filter(Boolean).sort();

  const uniqueLocations = Array.from(new Set([
    ...transferRequests.map(r => r.currentLocation),
    ...transferRequests.map(r => r.newLocation),
    ...sampleLocations
  ])).filter(Boolean).sort();

  // Handlers
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (mode, request) => {
    setDialogMode(mode);
    if (request) {
      setSelectedRequest(request);
      if (mode === 'edit') {
        const employee = employees.find(e => e.employeeId === request.employeeId);
        setNewTransfer({
          employeeId: request.employeeId,
          requestType: request.requestType,
          newDepartment: request.newDepartment,
          newLocation: request.newLocation,
          newDesignation: request.newDesignation,
          newReportingManager: request.newReportingManager,
          transferDate: new Date(request.transferDate),
          effectiveDate: new Date(request.effectiveDate),
          reason: request.reason,
          notes: request.notes || '',
          relocationSupportRequired: request.relocationSupportRequired || false,
          travelAssistance: request.relocationDetails?.travelAssistance || false,
          accommodationSupport: request.relocationDetails?.accommodationSupport || false,
          familyRelocation: request.relocationDetails?.familyRelocation || false,
          estimatedCost: request.relocationDetails?.estimatedCost || '',
          attachments: [],
          currentReportingManager: employee?.currentReportingManager || ''
        });
      }
    } else {
      // Reset form for new request
      setNewTransfer({
        employeeId: '',
        requestType: 'Internal Transfer',
        newDepartment: '',
        newLocation: '',
        newDesignation: '',
        newReportingManager: '',
        transferDate: new Date(),
        effectiveDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        reason: '',
        notes: '',
        relocationSupportRequired: false,
        travelAssistance: false,
        accommodationSupport: false,
        familyRelocation: false,
        estimatedCost: '',
        attachments: [],
        currentReportingManager: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const handleSubmitTransfer = () => {
    // Find employee details using employeeId
    const employee = employees.find(e => e.employeeId === newTransfer.employeeId);
    
    if (!employee) {
      showNotification('Please select a valid employee', 'error');
      return;
    }
    
    // Validate required fields
    if (!newTransfer.newDepartment || !newTransfer.newLocation || !newTransfer.reason) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    
    // Generate new ID
    const newId = `TR${(transferRequests.length + 1).toString().padStart(3, '0')}`;
    
    // Create new request
    const newRequest = {
      id: newId,
      employeeId: newTransfer.employeeId,
      employeeName: employee.name,
      requestType: newTransfer.requestType,
      currentDepartment: employee.currentDepartment,
      newDepartment: newTransfer.newDepartment,
      currentLocation: employee.currentLocation,
      newLocation: newTransfer.newLocation,
      currentDesignation: employee.currentDesignation,
      newDesignation: newTransfer.newDesignation,
      currentReportingManager: employee.currentReportingManager,
      newReportingManager: newTransfer.newReportingManager,
      transferDate: newTransfer.transferDate,
      effectiveDate: newTransfer.effectiveDate,
      reason: newTransfer.reason,
      status: 'Pending',
      submittedDate: new Date(),
      approvalWorkflow: [
        { step: 1, approverName: employee.currentReportingManager, approverRole: 'Current Manager', status: 'Pending' },
        { step: 2, approverName: newTransfer.newReportingManager, approverRole: 'New Manager', status: 'Pending' },
        { step: 3, approverName: 'HR Manager', approverRole: 'HR Approval', status: 'Pending' }
      ],
      notes: newTransfer.notes,
      relocationSupportRequired: newTransfer.relocationSupportRequired,
      relocationDetails: newTransfer.relocationSupportRequired ? {
        travelAssistance: newTransfer.travelAssistance,
        accommodationSupport: newTransfer.accommodationSupport,
        familyRelocation: newTransfer.familyRelocation,
        estimatedCost: newTransfer.estimatedCost ? parseInt(newTransfer.estimatedCost) : 0
      } : null,
      documents: [],
      createdBy: 'Current User',
      lastModified: new Date()
    };

    if (dialogMode === 'create') {
      setTransferRequests([newRequest, ...transferRequests]);
      showNotification('Transfer request submitted successfully!', 'success');
    } else if (dialogMode === 'edit' && selectedRequest) {
      const updatedRequests = transferRequests.map(req => 
        req.id === selectedRequest.id ? { 
          ...newRequest, 
          id: selectedRequest.id, 
          status: selectedRequest.status,
          submittedDate: selectedRequest.submittedDate,
          approvalWorkflow: selectedRequest.approvalWorkflow,
          approvedDate: selectedRequest.approvedDate,
          rejectionDate: selectedRequest.rejectionDate,
          completionDate: selectedRequest.completionDate
        } : req
      );
      setTransferRequests(updatedRequests);
      showNotification('Transfer request updated successfully!', 'success');
    }

    handleCloseDialog();
  };

  const handleDeleteRequest = (id) => {
    if (window.confirm('Are you sure you want to delete this transfer request?')) {
      setTransferRequests(transferRequests.filter(req => req.id !== id));
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      showNotification('Transfer request deleted successfully!', 'success');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = transferRequests.map(req => {
      if (req.id === id) {
        const updatedRequest = {
          ...req,
          status: newStatus,
          lastModified: new Date()
        };
        
        if (newStatus === 'Approved' && !req.approvedDate) {
          updatedRequest.approvedDate = new Date();
        } else if (newStatus === 'Rejected' && !req.rejectionDate) {
          updatedRequest.rejectionDate = new Date();
        } else if (newStatus === 'Completed' && !req.completionDate) {
          updatedRequest.completionDate = new Date();
        }
        
        return updatedRequest;
      }
      return req;
    });
    
    setTransferRequests(updatedRequests);
    showNotification(`Transfer request ${newStatus.toLowerCase()} successfully!`, 'success');
  };

  const handleSendReminders = () => {
    // Find pending transfers that need reminders
    const pendingTransfers = transferRequests.filter(r => r.status === 'Pending');
    
    if (pendingTransfers.length === 0) {
      showNotification('No pending transfers found for reminders', 'info');
      return;
    }
    
    // Send reminders to all approvers
    const approversToRemind = [];
    pendingTransfers.forEach(transfer => {
      transfer.approvalWorkflow.forEach(step => {
        if (step.status === 'Pending') {
          approversToRemind.push({
            approver: step.approverName,
            role: step.approverRole,
            employee: transfer.employeeName,
            requestId: transfer.id
          });
        }
      });
    });
    
    // Update reminders state
    const newReminders = approversToRemind.map((approver, index) => ({
      id: reminders.length + index + 1,
      approver: approver.approver,
      role: approver.role,
      daysPending: 1,
      requestId: approver.requestId,
      employee: approver.employee
    }));
    
    setReminders([...reminders, ...newReminders]);
    showNotification(`Reminders sent to ${approversToRemind.length} approvers`, 'success');
  };

  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      showNotification('Please select at least one request', 'warning');
      return;
    }

    switch (action) {
      case 'approve':
        setTransferRequests(transferRequests.map(req => 
          selectedRows.includes(req.id) ? { 
            ...req, 
            status: 'Approved',
            approvedDate: new Date(),
            lastModified: new Date()
          } : req
        ));
        showNotification(`${selectedRows.length} request(s) approved successfully!`, 'success');
        break;
      
      case 'reject':
        setTransferRequests(transferRequests.map(req => 
          selectedRows.includes(req.id) ? { 
            ...req, 
            status: 'Rejected',
            rejectionDate: new Date(),
            lastModified: new Date()
          } : req
        ));
        showNotification(`${selectedRows.length} request(s) rejected successfully!`, 'success');
        break;
      
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedRows.length} request(s)?`)) {
          setTransferRequests(transferRequests.filter(req => !selectedRows.includes(req.id)));
          setSelectedRows([]);
          showNotification(`${selectedRows.length} request(s) deleted successfully!`, 'success');
        }
        break;
      
      case 'print':
        printSelectedData();
        break;
      
      case 'send_reminders':
        // Send reminders for selected transfers
        const selectedTransfers = transferRequests.filter(req => selectedRows.includes(req.id));
        const approvers = [];
        
        selectedTransfers.forEach(transfer => {
          transfer.approvalWorkflow.forEach(step => {
            if (step.status === 'Pending') {
              approvers.push({
                approver: step.approverName,
                role: step.approverRole,
                employee: transfer.employeeName,
                requestId: transfer.id
              });
            }
          });
        });
        
        if (approvers.length > 0) {
          const newReminders = approvers.map((approver, index) => ({
            id: reminders.length + index + 1,
            ...approver,
            daysPending: 1
          }));
          
          setReminders([...reminders, ...newReminders]);
          showNotification(`Reminders sent to ${approvers.length} approvers for selected transfers`, 'success');
        } else {
          showNotification('No pending approvers found for selected transfers', 'info');
        }
        break;
      
      case 'duplicate':
        // Duplicate selected transfers
        const duplicatedTransfers = transferRequests
          .filter(req => selectedRows.includes(req.id))
          .map((req, index) => ({
            ...req,
            id: `TR${(transferRequests.length + index + 1).toString().padStart(3, '0')}`,
            status: 'Pending',
            submittedDate: new Date(),
            approvedDate: null,
            rejectionDate: null,
            completionDate: null,
            approvalWorkflow: req.approvalWorkflow.map(step => ({
              ...step,
              status: 'Pending',
              date: null,
              comments: ''
            }))
          }));
        
        setTransferRequests([...duplicatedTransfers, ...transferRequests]);
        showNotification(`${duplicatedTransfers.length} request(s) duplicated successfully!`, 'success');
        break;
    }
    
    setSelectedRows([]);
    setBulkActionMenu(null);
  };

  const exportToCSV = () => {
    const selectedData = selectedRows.length > 0 
      ? transferRequests.filter(req => selectedRows.includes(req.id))
      : transferRequests;
    
    const csvContent = [
      ['Transfer ID', 'Employee ID', 'Employee Name', 'Request Type', 'Current Department', 'New Department', 'Current Location', 'New Location', 'Status', 'Transfer Date', 'Effective Date', 'Submitted Date', 'Reason'],
      ...selectedData.map(req => [
        req.id,
        req.employeeId,
        req.employeeName,
        req.requestType,
        req.currentDepartment,
        req.newDepartment,
        req.currentLocation,
        req.newLocation,
        req.status,
        req.transferDate.toLocaleDateString(),
        req.effectiveDate.toLocaleDateString(),
        req.submittedDate.toLocaleDateString(),
        req.reason
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transfer_requests_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification(`Data exported as CSV! (${selectedData.length} records)`, 'success');
  };

  const printSelectedData = () => {
    const selectedData = selectedRows.length > 0 
      ? transferRequests.filter(req => selectedRows.includes(req.id))
      : transferRequests;
    
    const printWindow = window.open('', '_blank');
    const printContent = `
      <html>
        <head>
          <title>Transfer Requests Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { text-align: center; margin-bottom: 30px; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Transfer Requests Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Total Records: ${selectedData.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Transfer ID</th>
                <th>Employee Name</th>
                <th>Request Type</th>
                <th>From Department</th>
                <th>To Department</th>
                <th>From Location</th>
                <th>To Location</th>
                <th>Status</th>
                <th>Effective Date</th>
              </tr>
            </thead>
            <tbody>
              ${selectedData.map(req => `
                <tr>
                  <td>${req.id}</td>
                  <td>${req.employeeName}</td>
                  <td>${req.requestType}</td>
                  <td>${req.currentDepartment}</td>
                  <td>${req.newDepartment}</td>
                  <td>${req.currentLocation}</td>
                  <td>${req.newLocation}</td>
                  <td>${req.status}</td>
                  <td>${req.effectiveDate.toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            <p>This report is generated from HRMS System</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      case 'Completed': return 'info';
      case 'Cancelled': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckIcon />;
      case 'Pending': return <PendingIcon />;
      case 'Rejected': return <CancelIcon />;
      case 'Completed': return <CheckIcon />;
      case 'Cancelled': return <CancelIcon />;
      default: return <PendingIcon />;
    }
  };

  // Clear all filters and search
  const clearFilters = () => {
    setFilters({
      status: '',
      requestType: '',
      department: '',
      location: ''
    });
    setSearchTerm('');
    showNotification('Filters and search cleared', 'info');
  };

  // Search and Filter Bar Component
  const SearchFilterBar = () => {
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    return (
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa'
      }}>
        {/* Main Search Row */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          mb: showAdvancedFilters ? 2 : 0
        }}>
          {/* Search Input */}
          <Box sx={{ flexGrow: 1, position: 'relative' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search transfers, employees, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  pl: 4,
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }
              }}
            />
            <SearchIcon 
              sx={{ 
                position: 'absolute', 
                left: 12, 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'text.secondary'
              }} 
            />
          </Box>

          {/* Quick Filter Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant={filters.status === 'Pending' ? "contained" : "outlined"}
              color={filters.status === 'Pending' ? "warning" : "primary"}
              onClick={() => setFilters({
                ...filters,
                status: filters.status === 'Pending' ? '' : 'Pending'
              })}
              startIcon={<PendingIcon />}
            >
              Pending
            </Button>
            
            <Button
              size="small"
              variant={filters.status === 'Approved' ? "contained" : "outlined"}
              color={filters.status === 'Approved' ? "success" : "primary"}
              onClick={() => setFilters({
                ...filters,
                status: filters.status === 'Approved' ? '' : 'Approved'
              })}
              startIcon={<CheckIcon />}
            >
              Approved
            </Button>

            <IconButton
              size="small"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              sx={{
                border: '1px solid',
                borderColor: showAdvancedFilters ? 'primary.main' : '#e0e0e0',
                backgroundColor: showAdvancedFilters ? 'primary.light' : 'white'
              }}
            >
              <FilterIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Advanced Filters Section */}
        {showAdvancedFilters && (
          <Fade in={showAdvancedFilters}>
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: 'white',
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Request Type</InputLabel>
                    <Select
                      value={filters.requestType}
                      label="Request Type"
                      onChange={(e) => setFilters({...filters, requestType: e.target.value})}
                    >
                      <MenuItem value="">All Types</MenuItem>
                      <MenuItem value="Internal Transfer">Internal Transfer</MenuItem>
                      <MenuItem value="Location Transfer">Location Transfer</MenuItem>
                      <MenuItem value="Promotion Transfer">Promotion Transfer</MenuItem>
                      <MenuItem value="Department Transfer">Department Transfer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={filters.department}
                      label="Department"
                      onChange={(e) => setFilters({...filters, department: e.target.value})}
                    >
                      <MenuItem value="">All Departments</MenuItem>
                      {uniqueDepartments.map(dept => (
                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Location</InputLabel>
                    <Select
                      value={filters.location}
                      label="Location"
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    >
                      <MenuItem value="">All Locations</MenuItem>
                      {uniqueLocations.map(loc => (
                        <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      onClick={clearFilters}
                      startIcon={<RefreshIcon />}
                    >
                      Reset Filters
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => setShowAdvancedFilters(false)}
                      startIcon={<CheckIcon />}
                    >
                      Apply Filters
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Active Filters Display */}
        {(filters.status || filters.requestType || filters.department || filters.location || searchTerm) && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filters.status && (
              <Chip
                label={`Status: ${filters.status}`}
                size="small"
                onDelete={() => setFilters({...filters, status: ''})}
                deleteIcon={<CloseIcon fontSize="small" />}
                color="primary"
                variant="outlined"
              />
            )}
            {filters.requestType && (
              <Chip
                label={`Type: ${filters.requestType}`}
                size="small"
                onDelete={() => setFilters({...filters, requestType: ''})}
                deleteIcon={<CloseIcon fontSize="small" />}
                color="primary"
                variant="outlined"
              />
            )}
            {filters.department && (
              <Chip
                label={`Dept: ${filters.department}`}
                size="small"
                onDelete={() => setFilters({...filters, department: ''})}
                deleteIcon={<CloseIcon fontSize="small" />}
                color="primary"
                variant="outlined"
              />
            )}
            {filters.location && (
              <Chip
                label={`Location: ${filters.location}`}
                size="small"
                onDelete={() => setFilters({...filters, location: ''})}
                deleteIcon={<CloseIcon fontSize="small" />}
                color="primary"
                variant="outlined"
              />
            )}
            {searchTerm && (
              <Chip
                label={`Search: "${searchTerm}"`}
                size="small"
                onDelete={() => setSearchTerm('')}
                deleteIcon={<CloseIcon fontSize="small" />}
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </Box>
    );
  };

  const TransferStatsCard = () => {
    // Calculate statistics
    const totalTransfers = transferRequests.length;
    const pendingTransfers = transferRequests.filter(r => r.status === 'Pending').length;
    const approvedTransfers = transferRequests.filter(r => r.status === 'Approved').length;
    const rejectedTransfers = transferRequests.filter(r => r.status === 'Rejected').length;
    const completedTransfers = transferRequests.filter(r => r.status === 'Completed').length;
    
    // Calculate approval rate
    const approvalRate = totalTransfers > 0 
      ? Math.round((approvedTransfers / totalTransfers) * 100) 
      : 0;
    
    // Calculate transfers ending soon (effective date within next 30 days)
    const endingSoon = transferRequests.filter(r => {
      const effectiveDate = new Date(r.effectiveDate);
      const today = new Date();
      const diffTime = effectiveDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 30 && r.status === 'Approved';
    }).length;

    // Calculate average processing time
    const completedRequests = transferRequests.filter(r => r.status === 'Completed' && r.submittedDate && r.completionDate);
    const avgProcessingDays = completedRequests.length > 0
      ? Math.round(completedRequests.reduce((sum, req) => {
          const submitted = new Date(req.submittedDate);
          const completed = new Date(req.completionDate);
          const diffTime = completed - submitted;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return sum + diffDays;
        }, 0) / completedRequests.length)
      : 0;

    const stats = [
      { 
        title: 'Total Transfers', 
        value: totalTransfers, 
        color: 'primary.main',
        icon: <TransferIcon />,
        progress: 100,
        description: 'All time transfers'
      },
      { 
        title: 'Pending', 
        value: pendingTransfers, 
        color: 'warning.main',
        icon: <PendingIcon />,
        progress: totalTransfers > 0 ? (pendingTransfers / totalTransfers) * 100 : 0,
        description: 'Awaiting approval'
      },
      { 
        title: 'Approved', 
        value: approvedTransfers, 
        color: 'success.main',
        icon: <CheckIcon />,
        progress: totalTransfers > 0 ? (approvedTransfers / totalTransfers) * 100 : 0,
        description: 'Successfully approved'
      },
      { 
        title: 'Rejected', 
        value: rejectedTransfers, 
        color: 'error.main',
        icon: <CancelIcon />,
        progress: totalTransfers > 0 ? (rejectedTransfers / totalTransfers) * 100 : 0,
        description: 'Requests declined'
      },
      { 
        title: 'Approval Rate', 
        value: `${approvalRate}%`, 
        color: 'info.main',
        icon: <TrendingUpIcon />,
        progress: approvalRate,
        description: 'Success ratio'
      },
      { 
        title: 'Avg Processing', 
        value: `${avgProcessingDays}d`, 
        color: 'secondary.main',
        icon: <TimeIcon />,
        progress: Math.min((avgProcessingDays / 30) * 100, 100),
        description: 'Average time to complete'
      }
    ];

    return (
      <Card sx={{ height: '100%', boxShadow: 3, width: '100%', borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Transfer Statistics
            </Typography>
            <Chip 
              label={`${pendingTransfers} pending`} 
              color="warning" 
              size="small"
              icon={<WarningIcon />}
            />
          </Box>

          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={4} lg={2} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: `${stat.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1
                      }}>
                        {React.cloneElement(stat.icon, { 
                          sx: { 
                            fontSize: 20, 
                            color: stat.color 
                          } 
                        })}
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: stat.color,
                        mb: 0.5
                      }}
                    >
                      {stat.value}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium',
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        mb: 1
                      }}
                    >
                      {stat.title}
                    </Typography>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.progress} 
                      sx={{ 
                        height: 4, 
                        borderRadius: 2,
                        backgroundColor: `${stat.color}20`,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: stat.color
                        }
                      }} 
                    />
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mt: 1,
                        color: 'text.disabled'
                      }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const QuickActionsCard = () => (
    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('create')}
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
              }}
            >
              New Transfer Request
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => showNotification('Bulk upload feature coming soon!', 'info')}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              Bulk Upload (CSV)
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AssessmentIcon />}
              onClick={exportToCSV}
              sx={{ py: 1.5, borderRadius: 2 }}
            >
              Generate Reports
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const TransferRequestTable = () => {
    const isSelected = (id) => selectedRows.includes(id);

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = filteredRequests.map((n) => n.id);
        setSelectedRows(newSelected);
        return;
      }
      setSelectedRows([]);
    };

    const handleClick = (id) => {
      const selectedIndex = selectedRows.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRows, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelected = newSelected.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1),
        );
      }

      setSelectedRows(newSelected);
    };

    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3, borderRadius: 2 }}>
        {/* Search and Filter Bar */}
        <SearchFilterBar />
        
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < filteredRequests.length}
                    checked={filteredRequests.length > 0 && selectedRows.length === filteredRequests.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Transfer ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>From → To</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Effective Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        No matching transfers found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {searchTerm || Object.values(filters).some(f => f) 
                          ? 'Try adjusting your search or filters'
                          : 'No transfer requests found. Create your first transfer request!'}
                      </Typography>
                      {(searchTerm || Object.values(filters).some(f => f)) && (
                        <Button 
                          variant="outlined" 
                          onClick={clearFilters}
                          startIcon={<RefreshIcon />}
                        >
                          Clear all filters
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request) => {
                    const isItemSelected = isSelected(request.id);
                    const employee = employees.find(e => e.employeeId === request.employeeId);
                    
                    return (
                      <TableRow 
                        key={request.id} 
                        hover 
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          }
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={() => handleClick(request.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium" color="primary">
                            {request.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: employee?.avatarColor || 'primary.main' 
                            }}>
                              {request.employeeName.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {request.employeeName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {request.employeeId}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="caption" display="block">
                              <BusinessIcon sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                              {request.currentDepartment} → {request.newDepartment}
                            </Typography>
                            <Typography variant="caption" display="block">
                              <LocationIcon sx={{ fontSize: 12, verticalAlign: 'middle', mr: 0.5 }} />
                              {request.currentLocation} → {request.newLocation}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={request.requestType}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarIcon fontSize="small" />
                            <Typography variant="body2">
                              {request.effectiveDate.toLocaleDateString()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(request.status)}
                            label={request.status}
                            size="small"
                            color={getStatusColor(request.status)}
                            variant="filled"
                            sx={{ 
                              borderRadius: 1,
                              fontWeight: 'medium'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="View Details">
                              <IconButton 
                                size="small" 
                                onClick={() => handleOpenDialog('view', request)}
                                sx={{ color: 'info.main' }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton 
                                size="small" 
                                onClick={() => handleOpenDialog('edit', request)}
                                disabled={request.status === 'Approved' || request.status === 'Completed' || request.status === 'Rejected'}
                                sx={{ color: 'primary.main' }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Approve">
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleStatusChange(request.id, 'Approved')}
                                disabled={request.status === 'Approved' || request.status === 'Completed' || request.status === 'Rejected'}
                              >
                                <ApproveIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleStatusChange(request.id, 'Rejected')}
                                disabled={request.status === 'Rejected' || request.status === 'Completed' || request.status === 'Approved'}
                              >
                                <RejectIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    );
  };

  const TransferRequestDialog = () => (
    <Dialog 
      open={openDialog} 
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="md"
      fullScreen={isMobile}
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TransferIcon />
            {dialogMode === 'create' ? 'Create New Transfer Request' : 
             dialogMode === 'edit' ? 'Edit Transfer Request' : 'Transfer Request Details'}
          </Box>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        {dialogMode === 'view' && selectedRequest ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6">
                      Basic Information
                    </Typography>
                    <Chip
                      label={selectedRequest.status}
                      color={getStatusColor(selectedRequest.status)}
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Employee
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedRequest.employeeName} ({selectedRequest.employeeId})
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Request Type
                      </Typography>
                      <Chip
                        label={selectedRequest.requestType}
                        size="small"
                        color="primary"
                        sx={{ borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Transfer Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedRequest.transferDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Effective Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedRequest.effectiveDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Submitted Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedRequest.submittedDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Transfer Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Current Details
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemAvatar>
                            <BusinessIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Department" secondary={selectedRequest.currentDepartment} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <LocationIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Location" secondary={selectedRequest.currentLocation} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <WorkIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Designation" secondary={selectedRequest.currentDesignation} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <PersonIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Reporting Manager" secondary={selectedRequest.currentReportingManager} />
                        </ListItem>
                      </List>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        New Details
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemAvatar>
                            <ArrowForwardIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Department" secondary={selectedRequest.newDepartment} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <ArrowForwardIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Location" secondary={selectedRequest.newLocation} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <ArrowForwardIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Designation" secondary={selectedRequest.newDesignation} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <ArrowForwardIcon fontSize="small" />
                          </ListItemAvatar>
                          <ListItemText primary="Reporting Manager" secondary={selectedRequest.newReportingManager} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Approval Workflow
                  </Typography>
                  <Stepper orientation={isMobile ? "vertical" : "horizontal"} sx={{ mt: 2 }}>
                    {selectedRequest.approvalWorkflow.map((step) => (
                      <Step key={step.step} completed={step.status === 'Approved'}>
                        <StepLabel
                          optional={
                            step.date && (
                              <Typography variant="caption">
                                {new Date(step.date).toLocaleDateString()}
                              </Typography>
                            )
                          }
                          error={step.status === 'Rejected'}
                        >
                          <Box>
                            <Typography variant="body2">{step.approverName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {step.approverRole}
                            </Typography>
                            {step.comments && (
                              <Typography variant="caption" display="block">
                                {step.comments}
                              </Typography>
                            )}
                          </Box>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Reason & Notes
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                    {selectedRequest.reason}
                  </Typography>
                  {selectedRequest.notes && (
                    <>
                      <Typography variant="subtitle2" gutterBottom>
                        Additional Notes:
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {selectedRequest.notes}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Select Employee</InputLabel>
                <Select
                  value={newTransfer.employeeId}
                  label="Select Employee"
                  onChange={(e) => {
                    const employee = employees.find(emp => emp.employeeId === e.target.value);
                    setNewTransfer({
                      ...newTransfer,
                      employeeId: e.target.value,
                      currentReportingManager: employee?.currentReportingManager || ''
                    });
                  }}
                >
                  <MenuItem value="">Select an employee</MenuItem>
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.employeeId}>
                      {employee.name} ({employee.employeeId}) - {employee.currentDepartment}, {employee.currentLocation}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Select an employee to transfer
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Request Type</InputLabel>
                <Select
                  value={newTransfer.requestType}
                  label="Request Type"
                  onChange={(e) => setNewTransfer({...newTransfer, requestType: e.target.value})}
                >
                  <MenuItem value="Internal Transfer">Internal Transfer</MenuItem>
                  <MenuItem value="Location Transfer">Location Transfer</MenuItem>
                  <MenuItem value="Promotion Transfer">Promotion Transfer</MenuItem>
                  <MenuItem value="Department Transfer">Department Transfer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Transfer Date"
                type="date"
                value={newTransfer.transferDate ? newTransfer.transferDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setNewTransfer({...newTransfer, transferDate: new Date(e.target.value)})}
                size="small"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Effective Date"
                type="date"
                value={newTransfer.effectiveDate ? newTransfer.effectiveDate.toISOString().split('T')[0] : ''}
                onChange={(date) => setNewTransfer({...newTransfer, effectiveDate: new Date(date.target.value)})}
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>New Department</InputLabel>
                <Select
                  value={newTransfer.newDepartment}
                  label="New Department"
                  onChange={(e) => setNewTransfer({...newTransfer, newDepartment: e.target.value})}
                >
                  <MenuItem value="">Select department</MenuItem>
                  {sampleDepartments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>New Location</InputLabel>
                <Select
                  value={newTransfer.newLocation}
                  label="New Location"
                  onChange={(e) => setNewTransfer({...newTransfer, newLocation: e.target.value})}
                >
                  <MenuItem value="">Select location</MenuItem>
                  {sampleLocations.map((loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>New Designation</InputLabel>
                <Select
                  value={newTransfer.newDesignation}
                  label="New Designation"
                  onChange={(e) => setNewTransfer({...newTransfer, newDesignation: e.target.value})}
                >
                  <MenuItem value="">Select designation</MenuItem>
                  {organization.designations.map((designation) => (
                    <MenuItem key={designation.id} value={designation.name}>
                      {designation.name} ({designation.grade})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>New Reporting Manager</InputLabel>
                <Select
                  value={newTransfer.newReportingManager}
                  label="New Reporting Manager"
                  onChange={(e) => setNewTransfer({...newTransfer, newReportingManager: e.target.value})}
                >
                  <MenuItem value="">Select manager</MenuItem>
                  {organization.reportingManagers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.name}>
                      {manager.name} - {manager.designation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Reason for Transfer *"
                value={newTransfer.reason}
                onChange={(e) => setNewTransfer({...newTransfer, reason: e.target.value})}
                required
                helperText="Please provide detailed reason for the transfer"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Additional Notes"
                value={newTransfer.notes}
                onChange={(e) => setNewTransfer({...newTransfer, notes: e.target.value})}
                helperText="Any additional information or special instructions"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newTransfer.relocationSupportRequired}
                    onChange={(e) => setNewTransfer({
                      ...newTransfer, 
                      relocationSupportRequired: e.target.checked,
                      travelAssistance: e.target.checked ? newTransfer.travelAssistance : false,
                      accommodationSupport: e.target.checked ? newTransfer.accommodationSupport : false,
                      familyRelocation: e.target.checked ? newTransfer.familyRelocation : false
                    })}
                  />
                }
                label="Require Relocation Support"
              />
            </Grid>

            {newTransfer.relocationSupportRequired && (
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Relocation Support Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={newTransfer.travelAssistance}
                              onChange={(e) => setNewTransfer({...newTransfer, travelAssistance: e.target.checked})}
                            />
                          }
                          label="Travel Assistance"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={newTransfer.accommodationSupport}
                              onChange={(e) => setNewTransfer({...newTransfer, accommodationSupport: e.target.checked})}
                            />
                          }
                          label="Accommodation Support"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={newTransfer.familyRelocation}
                              onChange={(e) => setNewTransfer({...newTransfer, familyRelocation: e.target.checked})}
                            />
                          }
                          label="Family Relocation Support"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleCloseDialog} startIcon={<CloseIcon />}>
          Cancel
        </Button>
        {dialogMode !== 'view' && (
          <>
            <Button 
              variant="outlined" 
              startIcon={<SaveIcon />}
              onClick={() => {
                showNotification('Draft saved successfully', 'info');
                handleCloseDialog();
              }}
            >
              Save Draft
            </Button>
            <Button 
              variant="contained" 
              startIcon={<SendIcon />}
              onClick={handleSubmitTransfer}
              disabled={!newTransfer.employeeId || !newTransfer.reason || !newTransfer.newDepartment || !newTransfer.newLocation}
              sx={{
                background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)'
              }}
            >
              {dialogMode === 'create' ? 'Submit Request' : 'Update Request'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );

  // Organization Chart Component - IMPROVED VERSION
  const OrganizationChart = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    const [chartType, setChartType] = useState('flow'); // flow, matrix, network

    // Calculate department transfer statistics
    const departmentStats = organization.departments.map(dept => {
      const transfersIn = transferRequests.filter(r => r.newDepartment === dept.name).length;
      const transfersOut = transferRequests.filter(r => r.currentDepartment === dept.name).length;
      const netChange = transfersIn - transfersOut;
      
      return {
        ...dept,
        transfersIn,
        transfersOut,
        netChange,
        transferRate: transfersIn + transfersOut
      };
    }).sort((a, b) => b.transferRate - a.transferRate);

    // Calculate location transfer statistics
    const locationStats = organization.locations.map(loc => {
      const transfersIn = transferRequests.filter(r => r.newLocation === loc.name).length;
      const transfersOut = transferRequests.filter(r => r.currentLocation === loc.name).length;
      const netChange = transfersIn - transfersOut;
      
      return {
        ...loc,
        transfersIn,
        transfersOut,
        netChange,
        transferRate: transfersIn + transfersOut
      };
    }).sort((a, b) => b.transferRate - a.transferRate);

    // Get top transfer routes
    const transferRoutes = [];
    transferRequests.forEach(request => {
      const routeKey = `${request.currentDepartment}:${request.currentLocation}->${request.newDepartment}:${request.newLocation}`;
      const existingRoute = transferRoutes.find(r => r.key === routeKey);
      
      if (existingRoute) {
        existingRoute.count++;
        existingRoute.requests.push(request.id);
      } else {
        transferRoutes.push({
          key: routeKey,
          fromDept: request.currentDepartment,
          fromLoc: request.currentLocation,
          toDept: request.newDepartment,
          toLoc: request.newLocation,
          count: 1,
          requests: [request.id]
        });
      }
    });

    transferRoutes.sort((a, b) => b.count - a.count);

    return (
      <Box>
        <Paper sx={{ p: 3, mb: 3, boxShadow: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              <OrgChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Organization Transfer Analytics
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label="Flow Chart"
                color={chartType === 'flow' ? 'primary' : 'default'}
                onClick={() => setChartType('flow')}
                variant={chartType === 'flow' ? 'filled' : 'outlined'}
                icon={<SwapHorizIcon />}
              />
              <Chip
                label="Matrix View"
                color={chartType === 'matrix' ? 'primary' : 'default'}
                onClick={() => setChartType('matrix')}
                variant={chartType === 'matrix' ? 'filled' : 'outlined'}
                icon={<Grid />}
              />
              <Chip
                label="Network"
                color={chartType === 'network' ? 'primary' : 'default'}
                onClick={() => setChartType('network')}
                variant={chartType === 'network' ? 'filled' : 'outlined'}
                icon={<OrgChartIcon />}
              />
            </Box>
          </Box>

          {chartType === 'flow' ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', boxShadow: 2, borderRadius: 2 }}>
                  <CardHeader
                    title="Department Transfer Flow"
                    subheader="Employee movements between departments"
                    avatar={<BusinessIcon color="primary" />}
                  />
                  <CardContent>
                    <Box sx={{ height: 300, overflow: 'auto' }}>
                      {departmentStats.map((dept, index) => (
                        <Box key={dept.id} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" fontWeight="medium">
                              {dept.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="caption" color="error">
                                -{dept.transfersOut}
                              </Typography>
                              <SwapHorizIcon fontSize="small" color="action" />
                              <Typography variant="caption" color="success">
                                +{dept.transfersIn}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: '45%', 
                              height: 8, 
                              bgcolor: 'error.light',
                              borderRadius: 4,
                              position: 'relative'
                            }}>
                           
                            </Box>
                            <ArrowForwardIcon fontSize="small" color="action" />
                            <Box sx={{ 
                              width: '45%', 
                              height: 8, 
                              bgcolor: 'success.light',
                              borderRadius: 4,
                              position: 'relative'
                            }}>
                           
                            </Box>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={dept.transfersOut > 0 ? Math.min((dept.transfersOut / Math.max(...departmentStats.map(d => d.transfersOut))) * 100, 100) : 0}
                            sx={{ 
                              height: 4, 
                              borderRadius: 2,
                              bgcolor: 'transparent',
                              mt: 0.5,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: 'error.main'
                              }
                            }}
                          />
                          <LinearProgress 
                            variant="determinate" 
                            value={dept.transfersIn > 0 ? Math.min((dept.transfersIn / Math.max(...departmentStats.map(d => d.transfersIn))) * 100, 100) : 0}
                            sx={{ 
                              height: 4, 
                              borderRadius: 2,
                              bgcolor: 'transparent',
                              mt: 0.5,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: 'success.main'
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', boxShadow: 2, borderRadius: 2 }}>
                  <CardHeader
                    title="Location Transfer Flow"
                    subheader="Employee movements between locations"
                    avatar={<LocationIcon color="primary" />}
                  />
                  <CardContent>
                    <Box sx={{ height: 300, overflow: 'auto' }}>
                      {locationStats.map((loc, index) => (
                        <Box key={loc.id} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" fontWeight="medium">
                              {loc.name} {loc.type === 'Head Office' && '🏢'}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="caption" color="error">
                                -{loc.transfersOut}
                              </Typography>
                              <SwapHorizIcon fontSize="small" color="action" />
                              <Typography variant="caption" color="success">
                                +{loc.transfersIn}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: '45%', 
                              height: 8, 
                              bgcolor: 'error.light',
                              borderRadius: 4
                            }} />
                            <ArrowForwardIcon fontSize="small" color="action" />
                            <Box sx={{ 
                              width: '45%', 
                              height: 8, 
                              bgcolor: 'success.light',
                              borderRadius: 4
                            }} />
                          </Box>
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              Net Change: 
                              <Typography 
                                component="span" 
                                variant="caption" 
                                sx={{ 
                                  ml: 1,
                                  color: loc.netChange > 0 ? 'success.main' : loc.netChange < 0 ? 'error.main' : 'text.secondary',
                                  fontWeight: 'bold'
                                }}
                              >
                                {loc.netChange > 0 ? '+' : ''}{loc.netChange}
                              </Typography>
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardHeader
                    title="Top Transfer Routes"
                    subheader="Most frequent employee movement patterns"
                    avatar={<TrendingUpIcon color="primary" />}
                  />
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>From Department</TableCell>
                            <TableCell>From Location</TableCell>
                            <TableCell>To Department</TableCell>
                            <TableCell>To Location</TableCell>
                            <TableCell align="center">Transfer Count</TableCell>
                            <TableCell align="center">Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {transferRoutes.slice(0, 5).map((route, index) => (
                            <TableRow key={route.key} hover>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <BusinessIcon fontSize="small" color="action" />
                                  {route.fromDept}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <LocationIcon fontSize="small" color="action" />
                                  {route.fromLoc}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <BusinessIcon fontSize="small" color="action" />
                                  {route.toDept}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <LocationIcon fontSize="small" color="action" />
                                  {route.toLoc}
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Chip 
                                  label={route.count} 
                                  size="small" 
                                  color="primary"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Chip 
                                  label="Active" 
                                  size="small" 
                                  color="success"
                                  variant="filled"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : chartType === 'matrix' ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Transfer Matrix (Department × Location)
              </Typography>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Typography variant="caption" fontWeight="bold">
                      Dept/Loc →
                    </Typography>
                  </Grid>
                  {organization.locations.slice(0, 4).map(loc => (
                    <Grid item xs={2} key={loc.id}>
                      <Typography variant="caption" fontWeight="bold" align="center">
                        {loc.code}
                      </Typography>
                    </Grid>
                  ))}
                  
                  {organization.departments.slice(0, 5).map(dept => (
                    <React.Fragment key={dept.id}>
                      <Grid item xs={2}>
                        <Typography variant="caption" fontWeight="bold">
                          {dept.code}
                        </Typography>
                      </Grid>
                      {organization.locations.slice(0, 4).map(loc => {
                        const transfers = transferRequests.filter(r => 
                          r.currentDepartment === dept.name && 
                          r.currentLocation === loc.name
                        ).length;
                        
                        return (
                          <Grid item xs={2} key={`${dept.id}-${loc.id}`}>
                            <Box
                              sx={{
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: transfers > 0 ? 
                                  `rgba(33, 150, 243, ${Math.min(transfers / 5, 1)})` : 
                                  'white',
                                borderRadius: 1,
                                border: '1px solid #e0e0e0'
                              }}
                            >
                              <Typography variant="caption" fontWeight={transfers > 0 ? 'bold' : 'normal'}>
                                {transfers}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </Grid>
              </Paper>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Network Visualization
              </Typography>
              <Paper sx={{ 
                p: 4, 
                bgcolor: '#fafafa',
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <OrgChartIcon sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Interactive network visualization
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Showing connections between departments and locations
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<AutoGraphIcon />}
                    onClick={() => showNotification('Network visualization coming soon!', 'info')}
                  >
                    Launch Interactive View
                  </Button>
                </Box>
              </Paper>
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  // Reports Component
  const ReportsAnalytics = () => {
    const stats = {
      totalTransfers: transferRequests.length,
      pendingTransfers: transferRequests.filter(r => r.status === 'Pending').length,
      approvedTransfers: transferRequests.filter(r => r.status === 'Approved').length,
      rejectedTransfers: transferRequests.filter(r => r.status === 'Rejected').length,
      completedTransfers: transferRequests.filter(r => r.status === 'Completed').length,
      approvalRate: transferRequests.length > 0 
        ? Math.round((transferRequests.filter(r => r.status === 'Approved').length / transferRequests.length) * 100) 
        : 0,
      avgProcessingTime: 7, // days
      departmentsInvolved: new Set(transferRequests.map(r => r.newDepartment)).size,
      locationsInvolved: new Set(transferRequests.map(r => r.newLocation)).size
    };

    const transferTypeDistribution = [
      { type: 'Internal Transfer', count: transferRequests.filter(r => r.requestType === 'Internal Transfer').length, color: '#4caf50' },
      { type: 'Location Transfer', count: transferRequests.filter(r => r.requestType === 'Location Transfer').length, color: '#2196f3' },
      { type: 'Promotion Transfer', count: transferRequests.filter(r => r.requestType === 'Promotion Transfer').length, color: '#ff9800' },
      { type: 'Department Transfer', count: transferRequests.filter(r => r.requestType === 'Department Transfer').length, color: '#9c27b0' }
    ];

    const departmentStats = organization.departments.map(dept => ({
      name: dept.name,
      transfersIn: transferRequests.filter(r => r.newDepartment === dept.name).length,
      transfersOut: transferRequests.filter(r => r.currentDepartment === dept.name).length
    })).sort((a, b) => b.transfersIn - a.transfersIn);

    return (
      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Reports & Analytics
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={exportToCSV}
              sx={{ borderRadius: 2 }}
            >
              Export as CSV
            </Button>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={printSelectedData}
              sx={{ borderRadius: 2 }}
            >
              Print Report
            </Button>
          </Box>
        </Box>
        
        {/* Summary Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                  {stats.totalTransfers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Transfers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h4" color="success.main" gutterBottom fontWeight="bold">
                  {stats.approvalRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approval Rate
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h4" color="warning.main" gutterBottom fontWeight="bold">
                  {stats.departmentsInvolved}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Departments Involved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h4" color="info.main" gutterBottom fontWeight="bold">
                  {stats.locationsInvolved}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Locations Involved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Transfer Type Distribution */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Transfer Type Distribution
          </Typography>
          <Grid container spacing={2}>
            {transferTypeDistribution.map((item) => {
              const percentage = stats.totalTransfers > 0 ? (item.count / stats.totalTransfers * 100).toFixed(1) : 0;
              return (
                <Grid item xs={12} sm={6} md={3} key={item.type}>
                  <Card variant="outlined" sx={{ boxShadow: 1, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{item.type}</Typography>
                      <Typography variant="h4" color="primary">{item.count}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {percentage}% of total
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Department Statistics */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Department Transfer Statistics
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Transfers In</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Transfers Out</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Net Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departmentStats.map((dept) => (
                  <TableRow key={dept.name}>
                    <TableCell>{dept.name}</TableCell>
                    <TableCell align="right">{dept.transfersIn}</TableCell>
                    <TableCell align="right">{dept.transfersOut}</TableCell>
                    <TableCell align="right">
                      <Typography color={dept.transfersIn - dept.transfersOut > 0 ? "success.main" : "error.main"}>
                        {dept.transfersIn - dept.transfersOut > 0 ? '+' : ''}{dept.transfersIn - dept.transfersOut}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Status Distribution */}
        <Box>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Status Distribution
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'warning.light', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{stats.pendingTransfers}</Typography>
                  <Typography variant="body2">Pending</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'success.light', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{stats.approvedTransfers}</Typography>
                  <Typography variant="body2">Approved</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'error.light', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{stats.rejectedTransfers}</Typography>
                  <Typography variant="body2">Rejected</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: 'info.light', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{stats.completedTransfers}</Typography>
                  <Typography variant="body2">Completed</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ p: isMobile ? 1 : 3 }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TransferIcon fontSize="large" />
                Transfer & Movement Management
              </Typography>
              <Fab
                color="primary"
                size="small"
                onClick={() => handleOpenDialog('create')}
                sx={{ 
                  display: isMobile ? 'none' : 'flex',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
                }}
              >
                <AddIcon />
              </Fab>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Manage internal transfers, location changes, promotions, and employee movements
            </Typography>
          </Box>

          {/* Tabs */}
          <Paper sx={{ mb: 3, boxShadow: 2, borderRadius: 2 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': {
                  fontWeight: 'bold'
                }
              }}
            >
              <Tab label="All Transfers" icon={<TransferIcon />} iconPosition="start" />
              <Tab label="Pending Approvals" icon={<PendingIcon />} iconPosition="start" />
              <Tab label="Transfer History" icon={<HistoryIcon />} iconPosition="start" />
              <Tab label="Organization Chart" icon={<OrgChartIcon />} iconPosition="start" />
              <Tab label="Reports & Analytics" icon={<AssessmentIcon />} iconPosition="start" />
            </Tabs>
          </Paper>

          {/* Main Content */}
          {activeTab === 0 && (
            <>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                  <TransferStatsCard />
                </Grid>
                <Grid item xs={12} md={4}>
                  <QuickActionsCard />
                </Grid>
              </Grid>
              
              <TransferRequestTable />
              
              {/* Floating Action Button for Mobile */}
              <Fab
                color="primary"
                sx={{
                  position: 'fixed',
                  bottom: 16,
                  right: 16,
                  display: isMobile ? 'flex' : 'none',
                  boxShadow: 3,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                }}
                onClick={() => handleOpenDialog('create')}
              >
                <AddIcon />
              </Fab>
            </>
          )}

          {activeTab === 1 && (
            <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Pending Approvals 
                  <Chip 
                    label={transferRequests.filter(r => r.status === 'Pending').length} 
                    color="warning" 
                    size="small" 
                    sx={{ ml: 2 }} 
                    icon={<WarningIcon />}
                  />
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    onClick={handleSendReminders}
                    sx={{ borderRadius: 2 }}
                  >
                    Send Reminders
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<CheckIcon />}
                    onClick={() => {
                      const pendingIds = transferRequests
                        .filter(r => r.status === 'Pending')
                        .map(r => r.id);
                      
                      if (pendingIds.length > 0) {
                        setSelectedRows(pendingIds);
                        handleBulkAction('approve');
                      } else {
                        showNotification('No pending requests to approve', 'info');
                      }
                    }}
                    sx={{ borderRadius: 2 }}
                  >
                    Approve All
                  </Button>
                </Box>
              </Box>
              
              {transferRequests.filter(r => r.status === 'Pending').length === 0 ? (
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                  No pending approvals. All transfer requests have been processed.
                </Alert>
              ) : (
                <>
                  {/* Pending Approvals Table */}
                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Request ID</TableCell>
                          <TableCell>Employee</TableCell>
                          <TableCell>Transfer Details</TableCell>
                          <TableCell>Pending Since</TableCell>
                          <TableCell>Approvers</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transferRequests
                          .filter(r => r.status === 'Pending')
                          .map((request) => (
                            <TableRow key={request.id} hover>
                              <TableCell>
                                <Typography variant="body2" fontWeight="medium" color="primary">
                                  {request.id}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Avatar sx={{ width: 32, height: 32 }}>
                                    {request.employeeName.charAt(0)}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="body2" fontWeight="medium">
                                      {request.employeeName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {request.employeeId}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {request.currentDepartment} → {request.newDepartment}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {request.currentLocation} → {request.newLocation}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {new Date(request.submittedDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {Math.floor((new Date() - new Date(request.submittedDate)) / (1000 * 60 * 60 * 24))} days ago
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                  {request.approvalWorkflow
                                    .filter(step => step.status === 'Pending')
                                    .map(step => (
                                      <Chip
                                        key={step.step}
                                        label={`${step.approverName} (${step.approverRole})`}
                                        size="small"
                                        variant="outlined"
                                        color="warning"
                                        sx={{ borderRadius: 1 }}
                                      />
                                    ))}
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    startIcon={<ApproveIcon />}
                                    onClick={() => handleStatusChange(request.id, 'Approved')}
                                    sx={{ borderRadius: 2 }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    startIcon={<RejectIcon />}
                                    onClick={() => handleStatusChange(request.id, 'Rejected')}
                                    sx={{ borderRadius: 2 }}
                                  >
                                    Reject
                                  </Button>
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleOpenDialog('view', request)}
                                    sx={{ borderRadius: 2 }}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Reminders Section */}
                  <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                    <CardHeader
                      title="Pending Reminders"
                      subheader="Approvers waiting for action"
                      avatar={<EmailIcon color="warning" />}
                      action={
                        <Button
                          size="small"
                          startIcon={<RefreshIcon />}
                          onClick={handleSendReminders}
                        >
                          Refresh
                        </Button>
                      }
                    />
                    <CardContent>
                      {reminders.length === 0 ? (
                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                          No pending reminders
                        </Alert>
                      ) : (
                        <List dense>
                          {reminders.map((reminder) => (
                            <ListItem
                              key={reminder.id}
                              secondaryAction={
                                <IconButton size="small" edge="end">
                                  <EmailIcon />
                                </IconButton>
                              }
                              divider
                            >
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'warning.light', width: 32, height: 32 }}>
                                  <WarningIcon fontSize="small" />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" fontWeight="medium">
                                    {reminder.approver} ({reminder.role})
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="caption" color="text.secondary">
                                    Request: {reminder.requestId} • Employee: {reminder.employee} • Pending for {reminder.daysPending} days
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </Paper>
          )}

          {activeTab === 2 && (
            <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Transfer History
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={exportToCSV}
                    sx={{ borderRadius: 2 }}
                  >
                    Export All as CSV
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    onClick={printSelectedData}
                    sx={{ borderRadius: 2 }}
                  >
                    Print All
                  </Button>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Complete history of all employee transfers and movements
              </Typography>
              <TransferRequestTable />
            </Paper>
          )}

          {activeTab === 3 && (
            <OrganizationChart />
          )}

          {activeTab === 4 && (
            <ReportsAnalytics />
          )}

          {/* Dialogs and Modals */}
          <TransferRequestDialog />
          
          {/* Snackbar for notifications */}
          <Snackbar 
            open={snackbar.open} 
            autoHideDuration={6000} 
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={() => setSnackbar({ ...snackbar, open: false })} 
              severity={snackbar.severity}
              sx={{ width: '100%', borderRadius: 2 }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
    </div>
  );
};

export default TransferMovement;