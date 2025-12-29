import React, { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Badge,
  Alert,
  CircularProgress,
  Divider,
  LinearProgress,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Snackbar
} from '@mui/material';
import {
  Checklist as ChecklistIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Laptop as LaptopIcon,
  BusinessCenter as BusinessCenterIcon,
  AccountBalance as AccountBalanceIcon,
  Email as EmailIcon,
  VpnKey as VpnKeyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Task as TaskIcon,
  AssignmentInd as AssignmentIndIcon,
  AccountBox as AccountBoxIcon,
  Badge as BadgeIcon,
  Folder as FolderIcon,
  Security as SecurityIcon,
  Monitor as MonitorIcon,
  Settings as SettingsIcon,
  Chair as ChairIcon,
  CreditCard as CreditCardIcon,
  Parking as ParkingIcon,
  Wallet as WalletIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  Group as GroupIcon,
  Storefront as StorefrontIcon
} from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Sample departments
const departments = [
  { id: 'HR', name: 'Human Resources', color: '#1976d2' },
  { id: 'IT', name: 'IT', color: '#388e3c' },
  { id: 'ADMIN', name: 'Admin', color: '#f57c00' },
  { id: 'FINANCE', name: 'Finance', color: '#7b1fa2' }
];

// Sample responsible persons
const responsiblePersons = [
  { id: '1', name: 'John Doe', department: 'HR', email: 'john.doe@company.com' },
  { id: '2', name: 'Jane Smith', department: 'IT', email: 'jane.smith@company.com' },
  { id: '3', name: 'Mike Johnson', department: 'ADMIN', email: 'mike.johnson@company.com' },
  { id: '4', name: 'Sarah Williams', department: 'FINANCE', email: 'sarah.williams@company.com' }
];

// Default checklist templates by department
const getDefaultChecklist = (departmentId) => {
  const checklists = {
    HR: [
      { id: 'HR1', task: 'Profile Creation', description: 'Create employee profile in system', priority: 'High', estimatedDays: 1 },
      { id: 'HR2', task: 'Documentation', description: 'Collect and verify all documents', priority: 'High', estimatedDays: 2 },
      { id: 'HR3', task: 'ID Card', description: 'Generate and issue employee ID card', priority: 'Medium', estimatedDays: 1 },
      { id: 'HR4', task: 'Induction', description: 'Schedule and conduct induction program', priority: 'Medium', estimatedDays: 3 }
    ],
    IT: [
      { id: 'IT1', task: 'Laptop Allocation', description: 'Allocate laptop with required specifications', priority: 'High', estimatedDays: 1 },
      { id: 'IT2', task: 'Email Setup', description: 'Create email account and credentials', priority: 'High', estimatedDays: 1 },
      { id: 'IT3', task: 'System Access', description: 'Provision access to required systems', priority: 'High', estimatedDays: 2 },
      { id: 'IT4', task: 'Tools & Software', description: 'Install required tools and software', priority: 'Medium', estimatedDays: 1 }
    ],
    ADMIN: [
      { id: 'ADMIN1', task: 'Desk Allocation', description: 'Assign workspace/desk', priority: 'Medium', estimatedDays: 1 },
      { id: 'ADMIN2', task: 'Access Card', description: 'Issue office access card', priority: 'High', estimatedDays: 1 },
      { id: 'ADMIN3', task: 'Parking', description: 'Allocate parking space if applicable', priority: 'Low', estimatedDays: 1 }
    ],
    FINANCE: [
      { id: 'FIN1', task: 'Bank Account Verification', description: 'Verify bank account details', priority: 'High', estimatedDays: 2 },
      { id: 'FIN2', task: 'Salary Structure', description: 'Set up salary structure and components', priority: 'High', estimatedDays: 3 }
    ]
  };
  return checklists[departmentId] || [];
};

const JoiningDayManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Main tab state
  const [activeTab, setActiveTab] = useState(0);

  // Joining Checklist States
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [checklists, setChecklists] = useState({});
  const [showChecklistDialog, setShowChecklistDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    department: '',
    task: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    dueDate: '',
    estimatedDays: 1
  });

  // Profile Creation States
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showProfileReviewDialog, setShowProfileReviewDialog] = useState(false);
  const [profileForm, setProfileForm] = useState({
    candidateId: '',
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joiningDate: '',
    reportingManager: '',
    generateIdAuto: true
  });
  const [profileStep, setProfileStep] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Filter and Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Notification State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Sample data initialization
  useEffect(() => {
    // Initialize with sample employees
    const sampleEmployees = [
      {
        id: 'EMP001',
        name: 'Rajesh Kumar',
        department: 'Engineering',
        designation: 'Software Engineer',
        joiningDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        candidateId: 'CAND001'
      },
      {
        id: 'EMP002',
        name: 'Priya Sharma',
        department: 'Marketing',
        designation: 'Marketing Executive',
        joiningDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'in-progress',
        candidateId: 'CAND002'
      }
    ];

    setEmployees(sampleEmployees);
    
    // Initialize checklists for existing employees
    const initialChecklists = {};
    sampleEmployees.forEach(emp => {
      initialChecklists[emp.id] = {
        HR: getDefaultChecklist('HR').map(t => ({
          ...t,
          assignedTo: '',
          dueDate: '',
          status: 'pending',
          completedDate: null
        })),
        IT: getDefaultChecklist('IT').map(t => ({
          ...t,
          assignedTo: '',
          dueDate: '',
          status: 'pending',
          completedDate: null
        })),
        ADMIN: getDefaultChecklist('ADMIN').map(t => ({
          ...t,
          assignedTo: '',
          dueDate: '',
          status: 'pending',
          completedDate: null
        })),
        FINANCE: getDefaultChecklist('FINANCE').map(t => ({
          ...t,
          assignedTo: '',
          dueDate: '',
          status: 'pending',
          completedDate: null
        }))
      };
    });
    setChecklists(initialChecklists);
  }, []);

  // Calculate checklist progress
  const calculateProgress = (employeeId) => {
    const empChecklists = checklists[employeeId] || {};
    let totalTasks = 0;
    let completedTasks = 0;

    Object.values(empChecklists).forEach(deptTasks => {
      deptTasks.forEach(task => {
        totalTasks++;
        if (task.status === 'completed') {
          completedTasks++;
        }
      });
    });

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  // Identify bottlenecks
  const identifyBottlenecks = (employeeId) => {
    const empChecklists = checklists[employeeId] || {};
    const bottlenecks = [];
    const today = new Date();

    Object.entries(empChecklists).forEach(([dept, tasks]) => {
      tasks.forEach(task => {
        if (task.status === 'pending' && task.dueDate) {
          const dueDate = new Date(task.dueDate);
          if (dueDate < today) {
            bottlenecks.push({
              ...task,
              department: dept,
              daysOverdue: Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
            });
          }
        }
        if (task.status === 'pending' && task.priority === 'High' && !task.assignedTo) {
          bottlenecks.push({
            ...task,
            department: dept,
            reason: 'High priority task not assigned'
          });
        }
      });
    });

    return bottlenecks;
  };

  // Generate Employee ID
  const generateEmployeeId = (department, firstName, lastName) => {
    const deptCode = department.substring(0, 3).toUpperCase();
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `EMP${deptCode}${initials}${randomNum}`;
  };

  // Handle checklist view
  const handleViewChecklist = (employee) => {
    setSelectedEmployee(employee);
    setShowChecklistDialog(true);
  };

  // Handle task assignment
  const handleAssignTask = (taskId, department, employeeId) => {
    const task = checklists[employeeId][department].find(t => t.id === taskId);
    setCurrentTask({ ...task, taskId, department, employeeId });
    setTaskForm({
      department: department,
      task: task.task,
      description: task.description,
      assignedTo: task.assignedTo || '',
      priority: task.priority,
      dueDate: task.dueDate || '',
      estimatedDays: task.estimatedDays
    });
    setShowTaskDialog(true);
  };

  // Save task assignment
  const handleSaveTask = () => {
    const { employeeId, department, taskId } = currentTask;
    const updatedChecklists = { ...checklists };
    const taskIndex = updatedChecklists[employeeId][department].findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
      updatedChecklists[employeeId][department][taskIndex] = {
        ...updatedChecklists[employeeId][department][taskIndex],
        assignedTo: taskForm.assignedTo,
        dueDate: taskForm.dueDate,
        priority: taskForm.priority
      };
      setChecklists(updatedChecklists);
      setShowTaskDialog(false);
      showSnackbar('Task assigned successfully', 'success');
    }
  };

  // Complete task
  const handleCompleteTask = (taskId, department, employeeId) => {
    const updatedChecklists = { ...checklists };
    const taskIndex = updatedChecklists[employeeId][department].findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
      updatedChecklists[employeeId][department][taskIndex] = {
        ...updatedChecklists[employeeId][department][taskIndex],
        status: 'completed',
        completedDate: new Date().toISOString().split('T')[0]
      };
      setChecklists(updatedChecklists);
      showSnackbar('Task marked as completed', 'success');
    }
  };

  // Create new profile
  const handleCreateProfile = () => {
    setProfileForm({
      candidateId: '',
      employeeId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      joiningDate: '',
      reportingManager: '',
      generateIdAuto: true
    });
    setProfileStep(0);
    setShowProfileDialog(true);
  };

  // Auto-fill from candidate
  const handleAutoFillFromCandidate = (candidateId) => {
    // Simulate API call to fetch candidate data
    const candidateData = {
      firstName: 'Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      department: 'Engineering',
      designation: 'Software Engineer'
    };
    
    setProfileForm(prev => ({
      ...prev,
      candidateId,
      ...candidateData,
      employeeId: prev.generateIdAuto ? generateEmployeeId(candidateData.department, candidateData.firstName, candidateData.lastName) : prev.employeeId
    }));
  };

  // Save profile
  const handleSaveProfile = () => {
    const newProfile = {
      id: Date.now().toString(),
      ...profileForm,
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };
    
    setProfiles([...profiles, newProfile]);
    
    // Create checklist for new employee
    const newChecklists = { ...checklists };
    newChecklists[profileForm.employeeId] = {
      HR: getDefaultChecklist('HR').map(t => ({
        ...t,
        assignedTo: '',
        dueDate: '',
        status: 'pending',
        completedDate: null
      })),
      IT: getDefaultChecklist('IT').map(t => ({
        ...t,
        assignedTo: '',
        dueDate: '',
        status: 'pending',
        completedDate: null
      })),
      ADMIN: getDefaultChecklist('ADMIN').map(t => ({
        ...t,
        assignedTo: '',
        dueDate: '',
        status: 'pending',
        completedDate: null
      })),
      FINANCE: getDefaultChecklist('FINANCE').map(t => ({
        ...t,
        assignedTo: '',
        dueDate: '',
        status: 'pending',
        completedDate: null
      }))
    };
    setChecklists(newChecklists);
    
    // Add to employees list
    setEmployees([...employees, {
      id: profileForm.employeeId,
      name: `${profileForm.firstName} ${profileForm.lastName}`,
      department: profileForm.department,
      designation: profileForm.designation,
      joiningDate: profileForm.joiningDate,
      status: 'pending',
      candidateId: profileForm.candidateId
    }]);
    
    setShowProfileDialog(false);
    showSnackbar('Profile created successfully', 'success');
  };

  // Approve profile
  const handleApproveProfile = (profileId) => {
    const updatedProfiles = profiles.map(p => 
      p.id === profileId ? { ...p, status: 'approved', approvedAt: new Date().toISOString() } : p
    );
    setProfiles(updatedProfiles);
    showSnackbar('Profile approved. Welcome email sent.', 'success');
  };

  // Send welcome email
  const handleSendWelcomeEmail = (profile) => {
    // Simulate sending welcome email with credentials
    showSnackbar(`Welcome email sent to ${profile.email} with login credentials`, 'success');
  };

  // Show snackbar
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Get filtered employees
  const getFilteredEmployees = () => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
      const matchesDept = departmentFilter === 'all' || emp.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  };

  // Render Checklist Tab
  const renderChecklistTab = () => (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Joining Checklist Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Department</InputLabel>
            <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} label="Department">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Employee List */}
      <Grid container spacing={2}>
        {getFilteredEmployees().map((employee) => {
          const progress = calculateProgress(employee.id);
          const bottlenecks = identifyBottlenecks(employee.id);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={employee.id}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {employee.name.charAt(0)}
                    </Avatar>
                  }
                  title={employee.name}
                  subheader={`${employee.designation} • ${employee.department}`}
                  action={
                    <IconButton onClick={() => handleViewChecklist(employee)}>
                      <VisibilityIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Checklist Progress
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {progress}%
                      </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Joining Date: {new Date(employee.joiningDate).toLocaleDateString()}
                    </Typography>
                    <Chip
                      label={employee.status}
                      size="small"
                      color={
                        employee.status === 'completed' ? 'success' :
                        employee.status === 'in-progress' ? 'warning' : 'default'
                      }
                    />
                  </Box>

                  {bottlenecks.length > 0 && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      <Typography variant="caption">
                        {bottlenecks.length} bottleneck{bottlenecks.length > 1 ? 's' : ''} identified
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Progress Dashboard */}
      <Card sx={{ mt: 3 }}>
        <CardHeader title="Checklist Progress Dashboard" />
        <CardContent>
          <Grid container spacing={3}>
            {departments.map((dept) => {
              const allTasks = Object.values(checklists).flatMap(empChecklist => 
                empChecklist[dept.id] || []
              );
              const completedTasks = allTasks.filter(t => t.status === 'completed').length;
              const totalTasks = allTasks.length;
              const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
              
              return (
                <Grid item xs={12} sm={6} md={3} key={dept.id}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {dept.name}
                    </Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={progress}
                        size={80}
                        sx={{ color: dept.color }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="caption" component="div" color="text.secondary">
                          {Math.round(progress)}%
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {completedTasks} / {totalTasks} tasks completed
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Checklist Dialog */}
      <Dialog
        open={showChecklistDialog}
        onClose={() => setShowChecklistDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Checklist for {selectedEmployee?.name}
            </Typography>
            <IconButton onClick={() => setShowChecklistDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box sx={{ mt: 2 }}>
              {departments.map((dept) => {
                const tasks = checklists[selectedEmployee.id]?.[dept.id] || [];
                const deptProgress = tasks.length > 0
                  ? (tasks.filter(t => t.status === 'completed').length / tasks.length) * 100
                  : 0;

                return (
                  <Card key={dept.id} sx={{ mb: 3 }}>
                    <CardHeader
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6">{dept.name}</Typography>
                          <Chip label={`${Math.round(deptProgress)}%`} size="small" />
                        </Box>
                      }
                    />
                    <CardContent>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Task</TableCell>
                              <TableCell>Assigned To</TableCell>
                              <TableCell>Due Date</TableCell>
                              <TableCell>Priority</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tasks.map((task) => (
                              <TableRow key={task.id}>
                                <TableCell>
                                  <Typography variant="body2" fontWeight="medium">
                                    {task.task}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {task.description}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  {task.assignedTo ? (
                                    <Chip label={responsiblePersons.find(p => p.id === task.assignedTo)?.name || task.assignedTo} size="small" />
                                  ) : (
                                    <Chip label="Not Assigned" size="small" color="warning" />
                                  )}
                                </TableCell>
                                <TableCell>
                                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={task.priority}
                                    size="small"
                                    color={
                                      task.priority === 'High' ? 'error' :
                                      task.priority === 'Medium' ? 'warning' : 'default'
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={task.status}
                                    size="small"
                                    color={task.status === 'completed' ? 'success' : 'default'}
                                    icon={task.status === 'completed' ? <CheckCircleIcon /> : <PendingIcon />}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Tooltip title="Assign Task">
                                      <IconButton
                                        size="small"
                                        onClick={() => handleAssignTask(task.id, dept.id, selectedEmployee.id)}
                                      >
                                        <AssignmentIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    {task.status !== 'completed' && (
                                      <Tooltip title="Mark Complete">
                                        <IconButton
                                          size="small"
                                          color="success"
                                          onClick={() => handleCompleteTask(task.id, dept.id, selectedEmployee.id)}
                                        >
                                          <CheckCircleIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Bottlenecks Section */}
              {identifyBottlenecks(selectedEmployee.id).length > 0 && (
                <Card sx={{ mt: 3, bgcolor: 'warning.light' }}>
                  <CardHeader
                    title={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WarningIcon color="warning" />
                        <Typography variant="h6">Bottlenecks Identified</Typography>
                      </Box>
                    }
                  />
                  <CardContent>
                    <List>
                      {identifyBottlenecks(selectedEmployee.id).map((bottleneck, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'error.main' }}>
                              <WarningIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${bottleneck.task} (${bottleneck.department})`}
                            secondary={
                              bottleneck.daysOverdue
                                ? `${bottleneck.daysOverdue} days overdue`
                                : bottleneck.reason
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Task Assignment Dialog */}
      <Dialog open={showTaskDialog} onClose={() => setShowTaskDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Department"
              value={taskForm.department}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Task"
              value={taskForm.task}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={taskForm.description}
              disabled
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Assign To</InputLabel>
              <Select
                value={taskForm.assignedTo}
                onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                label="Assign To"
              >
                {responsiblePersons
                  .filter(p => p.department === taskForm.department)
                  .map(person => (
                    <MenuItem key={person.id} value={person.id}>
                      {person.name} ({person.email})
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                label="Priority"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTaskDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained">Assign</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  // Render Profile Creation Tab
  const renderProfileCreationTab = () => (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Employee Profile Creation
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleCreateProfile}
        >
          Create New Profile
        </Button>
      </Box>

      {/* Profiles List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>{profile.employeeId}</TableCell>
                <TableCell>{`${profile.firstName} ${profile.lastName}`}</TableCell>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.department}</TableCell>
                <TableCell>{profile.designation}</TableCell>
                <TableCell>{new Date(profile.joiningDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={profile.status}
                    size="small"
                    color={
                      profile.status === 'approved' ? 'success' :
                      profile.status === 'pending_review' ? 'warning' : 'default'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedProfile(profile);
                          setShowProfileReviewDialog(true);
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {profile.status === 'pending_review' && (
                      <Tooltip title="Approve">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleApproveProfile(profile.id)}
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {profile.status === 'approved' && (
                      <Tooltip title="Send Welcome Email">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleSendWelcomeEmail(profile)}
                        >
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Profile Creation Dialog */}
      <Dialog
        open={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Employee Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Stepper activeStep={profileStep} sx={{ mb: 4 }}>
              <Step>
                <StepLabel>Basic Information</StepLabel>
              </Step>
              <Step>
                <StepLabel>Job Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review & Submit</StepLabel>
              </Step>
            </Stepper>

            {profileStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Candidate ID"
                    value={profileForm.candidateId}
                    onChange={(e) => {
                      const candidateId = e.target.value;
                      setProfileForm({ ...profileForm, candidateId });
                      if (candidateId) {
                        handleAutoFillFromCandidate(candidateId);
                      }
                    }}
                    helperText="Enter candidate ID to auto-fill information"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    required
                  />
                </Grid>
              </Grid>
            )}

            {profileStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={profileForm.generateIdAuto}
                        onChange={(e) => setProfileForm({ 
                          ...profileForm, 
                          generateIdAuto: e.target.checked,
                          employeeId: e.target.checked 
                            ? generateEmployeeId(profileForm.department || 'GEN', profileForm.firstName || 'X', profileForm.lastName || 'Y')
                            : ''
                        })}
                      />
                    }
                    label="Auto-generate Employee ID"
                  />
                </Grid>
                {!profileForm.generateIdAuto && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Employee ID"
                      value={profileForm.employeeId}
                      onChange={(e) => setProfileForm({ ...profileForm, employeeId: e.target.value })}
                      required
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={profileForm.department}
                      onChange={(e) => {
                        const dept = e.target.value;
                        setProfileForm({ 
                          ...profileForm, 
                          department: dept,
                          employeeId: profileForm.generateIdAuto
                            ? generateEmployeeId(dept, profileForm.firstName || 'X', profileForm.lastName || 'Y')
                            : profileForm.employeeId
                        });
                      }}
                      label="Department"
                    >
                      <MenuItem value="Engineering">Engineering</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                      <MenuItem value="HR">HR</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Designation"
                    value={profileForm.designation}
                    onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Joining Date"
                    type="date"
                    value={profileForm.joiningDate}
                    onChange={(e) => setProfileForm({ ...profileForm, joiningDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Reporting Manager"
                    value={profileForm.reportingManager}
                    onChange={(e) => setProfileForm({ ...profileForm, reportingManager: e.target.value })}
                  />
                </Grid>
              </Grid>
            )}

            {profileStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>Review Profile Information</Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Employee ID</Typography>
                    <Typography variant="body1" fontWeight="medium">{profileForm.employeeId}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="body1" fontWeight="medium">{`${profileForm.firstName} ${profileForm.lastName}`}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{profileForm.email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1">{profileForm.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Department</Typography>
                    <Typography variant="body1">{profileForm.department}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Designation</Typography>
                    <Typography variant="body1">{profileForm.designation}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Joining Date</Typography>
                    <Typography variant="body1">{new Date(profileForm.joiningDate).toLocaleDateString()}</Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProfileDialog(false)}>Cancel</Button>
          {profileStep > 0 && (
            <Button onClick={() => setProfileStep(profileStep - 1)}>Back</Button>
          )}
          {profileStep < 2 ? (
            <Button onClick={() => setProfileStep(profileStep + 1)} variant="contained">
              Next
            </Button>
          ) : (
            <Button onClick={handleSaveProfile} variant="contained">
              Create Profile
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Profile Review Dialog */}
      <Dialog
        open={showProfileReviewDialog}
        onClose={() => setShowProfileReviewDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Profile Review</DialogTitle>
        <DialogContent>
          {selectedProfile && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Employee ID</Typography>
                  <Typography variant="body1" fontWeight="medium">{selectedProfile.employeeId}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="body1" fontWeight="medium">{`${selectedProfile.firstName} ${selectedProfile.lastName}`}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography variant="body1">{selectedProfile.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Department</Typography>
                  <Typography variant="body1">{selectedProfile.department}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Designation</Typography>
                  <Typography variant="body1">{selectedProfile.designation}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip
                    label={selectedProfile.status}
                    size="small"
                    color={selectedProfile.status === 'approved' ? 'success' : 'warning'}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProfileReviewDialog(false)}>Close</Button>
          {selectedProfile?.status === 'pending_review' && (
            <Button
              onClick={() => {
                handleApproveProfile(selectedProfile.id);
                setShowProfileReviewDialog(false);
              }}
              variant="contained"
              color="success"
            >
              Approve Profile
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Joining Day Management
        </Typography>

        <Paper sx={{ mt: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<ChecklistIcon />}
              iconPosition="start"
              label="Joining Checklist"
            />
            <Tab
              icon={<PersonAddIcon />}
              iconPosition="start"
              label="Employee Profile Creation"
            />
          </Tabs>

          <Divider />

          {activeTab === 0 && renderChecklistTab()}
          {activeTab === 1 && renderProfileCreationTab()}
        </Paper>

        {/* Snackbar for Notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default JoiningDayManagement;
