import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

// Import MUI components
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  LinearProgress,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Checklist as ChecklistIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  Assignment as AssignmentIcon,
  Email as EmailIcon,
  AccountCircle as AccountCircleIcon,
  Computer as ComputerIcon,
  Business as BusinessIcon,
  CreditCard as CreditCardIcon,
  People as PeopleIcon,
  Send as SendIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// JoiningDayManagement Component
const JoiningDayManagement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [newJoiners, setNewJoiners] = useState([]);
  const [selectedJoiner, setSelectedJoiner] = useState(null);
  const [tasks, setTasks] = useState({
    hr: [],
    it: [],
    admin: [],
    finance: []
  });
  const [openJoinerDialog, setOpenJoinerDialog] = useState(false);
  const [openAddJoinerModal, setOpenAddJoinerModal] = useState(false);
  const [openSendEmailModal, setOpenSendEmailModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [joinerToDelete, setJoinerToDelete] = useState(null);
  const [progressData, setProgressData] = useState({
    hr: 0,
    it: 0,
    admin: 0,
    finance: 0,
    overall: 0
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Form states
  const [newJoinerForm, setNewJoinerForm] = useState({
    name: '',
    email: '',
    designation: '',
    department: 'Engineering',
    joiningDate: new Date().toISOString().split('T')[0],
    phone: '',
    address: '',
    status: 'Pending'
  });

  const [emailForm, setEmailForm] = useState({
    subject: 'Welcome to the Company!',
    message: 'Dear [Employee Name],\n\nWelcome to our team! We are excited to have you on board.'
  });

  const [reportForm, setReportForm] = useState({
    type: 'daily',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    format: 'pdf'
  });

  // Sample initial data
  const initialJoiners = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@company.com',
      designation: 'Software Engineer',
      department: 'Engineering',
      joiningDate: '2024-06-15',
      phone: '+91 9876543210',
      address: 'Bangalore, India',
      status: 'Pending',
      profilePic: '',
      employeeId: 'EMP-00123'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@company.com',
      designation: 'HR Executive',
      department: 'Human Resources',
      joiningDate: '2024-06-15',
      phone: '+91 9876543211',
      address: 'Delhi, India',
      status: 'In Progress',
      profilePic: '',
      employeeId: 'EMP-00124'
    }
  ];

  const initialTasks = {
    hr: [
      { id: 1, title: 'Profile Creation', completed: true, assignedTo: 'HR Team' },
      { id: 2, title: 'Document Verification', completed: true, assignedTo: 'HR Team' },
      { id: 3, title: 'ID Card Generation', completed: false, assignedTo: 'HR Admin' },
      { id: 4, title: 'Induction Scheduling', completed: false, assignedTo: 'HR Manager' },
      { id: 5, title: 'Policy Acknowledgment', completed: false, assignedTo: 'HR Executive' }
    ],
    it: [
      { id: 6, title: 'Email ID Creation', completed: false, assignedTo: 'IT Admin' },
      { id: 7, title: 'Laptop Allocation', completed: false, assignedTo: 'IT Support' },
      { id: 8, title: 'System Access', completed: false, assignedTo: 'IT Security' },
      { id: 9, title: 'VPN Setup', completed: false, assignedTo: 'Network Team' },
      { id: 10, title: 'Software Installation', completed: false, assignedTo: 'IT Support' }
    ],
    admin: [
      { id: 11, title: 'Desk Allocation', completed: false, assignedTo: 'Admin Executive' },
      { id: 12, title: 'Access Card', completed: false, assignedTo: 'Security' },
      { id: 13, title: 'Parking Slot', completed: false, assignedTo: 'Facilities' },
      { id: 14, title: 'Locker Assignment', completed: false, assignedTo: 'Admin' }
    ],
    finance: [
      { id: 15, title: 'Bank Account Verification', completed: false, assignedTo: 'Finance Executive' },
      { id: 16, title: 'Salary Structure Setup', completed: false, assignedTo: 'Payroll Team' },
      { id: 17, title: 'Tax Declaration', completed: false, assignedTo: 'Finance' }
    ]
  };

  const steps = ['Pre-Joining', 'Joining Day', 'Induction', 'Probation'];

  useEffect(() => {
    // Load from localStorage or use initial data
    const savedJoiners = localStorage.getItem('joiners');
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedJoiners) {
      setNewJoiners(JSON.parse(savedJoiners));
    } else {
      setNewJoiners(initialJoiners);
      localStorage.setItem('joiners', JSON.stringify(initialJoiners));
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
    
    calculateProgress();
  }, []);

  useEffect(() => {
    calculateProgress();
  }, [tasks]);

  const calculateProgress = () => {
    const allTasks = [
      ...tasks.hr,
      ...tasks.it,
      ...tasks.admin,
      ...tasks.finance
    ];
    
    const completedTasks = allTasks.filter(task => task.completed).length;
    const hrCompleted = tasks.hr.filter(task => task.completed).length;
    const itCompleted = tasks.it.filter(task => task.completed).length;
    const adminCompleted = tasks.admin.filter(task => task.completed).length;
    const financeCompleted = tasks.finance.filter(task => task.completed).length;
    
    setProgressData({
      hr: Math.round((hrCompleted / tasks.hr.length) * 100),
      it: Math.round((itCompleted / tasks.it.length) * 100),
      admin: Math.round((adminCompleted / tasks.admin.length) * 100),
      finance: Math.round((financeCompleted / tasks.finance.length) * 100),
      overall: Math.round((completedTasks / allTasks.length) * 100)
    });
  };

  const handleTaskToggle = (dept, taskId) => {
    const updatedTasks = { ...tasks };
    const taskIndex = updatedTasks[dept].findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      updatedTasks[dept][taskIndex].completed = !updatedTasks[dept][taskIndex].completed;
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      showSnackbar('Task updated successfully!', 'success');
    }
  };

  const handleJoinerSelect = (joiner) => {
    setSelectedJoiner(joiner);
    setOpenJoinerDialog(true);
  };

  // Form handlers
  const handleNewJoinerFormChange = (e) => {
    const { name, value } = e.target;
    setNewJoinerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNewJoiner = (formData) => {
    if (!formData.name || !formData.email || !formData.designation) {
      showSnackbar('Please fill all required fields', 'error');
      return false;
    }

    const newJoiner = {
      id: Date.now(), // Generate unique ID
      ...formData,
      employeeId: `EMP-${String(Date.now()).slice(-5)}`,
      profilePic: '',
      status: 'Pending'
    };

    const updatedJoiners = [...newJoiners, newJoiner];
    setNewJoiners(updatedJoiners);
    localStorage.setItem('joiners', JSON.stringify(updatedJoiners));
    
    showSnackbar('New joiner added successfully!', 'success');
    
    // Reset form
    setNewJoinerForm({
      name: '',
      email: '',
      designation: '',
      department: 'Engineering',
      joiningDate: new Date().toISOString().split('T')[0],
      phone: '',
      address: '',
      status: 'Pending'
    });
    
    return true;
  };

  const handleSendWelcomeEmail = () => {
    // In real app, this would send emails
    showSnackbar(`Welcome emails sent to ${newJoiners.length} joiners!`, 'success');
    setOpenSendEmailModal(false);
  };

  const handleGenerateReport = () => {
    const reportData = {
      type: reportForm.type,
      period: `${reportForm.startDate} to ${reportForm.endDate}`,
      format: reportForm.format,
      data: {
        totalJoiners: newJoiners.length,
        completedTasks: tasks.hr.concat(tasks.it, tasks.admin, tasks.finance).filter(t => t.completed).length,
        pendingTasks: tasks.hr.concat(tasks.it, tasks.admin, tasks.finance).filter(t => !t.completed).length,
        departmentProgress: progressData
      }
    };
    
    console.log('Report generated:', reportData);
    showSnackbar(`Report generated in ${reportForm.format.toUpperCase()} format!`, 'success');
    setOpenReportModal(false);
  };

  const handleCompleteOnboarding = () => {
    // Update all joiners to completed status
    const updatedJoiners = newJoiners.map(joiner => ({
      ...joiner,
      status: 'Completed'
    }));
    
    setNewJoiners(updatedJoiners);
    localStorage.setItem('joiners', JSON.stringify(updatedJoiners));
    
    showSnackbar('Onboarding completed for all joiners!', 'success');
    setOpenCompleteModal(false);
  };

  const handleDeleteJoiner = () => {
    const updatedJoiners = newJoiners.filter(joiner => joiner.id !== joinerToDelete);
    setNewJoiners(updatedJoiners);
    localStorage.setItem('joiners', JSON.stringify(updatedJoiners));
    
    showSnackbar('Joiner deleted successfully!', 'success');
    setOpenDeleteModal(false);
    setJoinerToDelete(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleEditDetails = () => {
    if (selectedJoiner) {
      // In real app, this would navigate to edit page
      showSnackbar(`Editing details for ${selectedJoiner.name}`, 'info');
    }
  };

  const handleViewFullProfile = () => {
    if (selectedJoiner) {
      // In real app, this would navigate to profile page
      showSnackbar(`Viewing profile of ${selectedJoiner.name}`, 'info');
    }
  };

  const renderTaskList = (department, tasksList) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
          {department === 'hr' && <PeopleIcon color="primary" sx={{ mr: 1 }} />}
          {department === 'it' && <ComputerIcon color="secondary" sx={{ mr: 1 }} />}
          {department === 'admin' && <BusinessIcon color="success" sx={{ mr: 1 }} />}
          {department === 'finance' && <CreditCardIcon color="warning" sx={{ mr: 1 }} />}
          <Typography variant="h6" sx={{ textTransform: 'uppercase', fontSize: isMobile ? '0.9rem' : '1rem' }}>
            {department.toUpperCase()} Tasks
          </Typography>
          <Chip 
            label={`${progressData[department]}%`} 
            size="small" 
            sx={{ ml: 'auto' }}
            color={progressData[department] === 100 ? 'success' : 'primary'}
          />
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={progressData[department]} 
          sx={{ mb: 2, height: 8, borderRadius: 1 }}
        />
        
        <List>
          {tasksList.map((task) => (
            <ListItem key={task.id} sx={{ flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(department, task.id)}
                  icon={<UncheckedIcon />}
                  checkedIcon={<CheckCircleIcon color="success" />}
                  size={isMobile ? "small" : "medium"}
                />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography 
                      sx={{ 
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        mr: 1
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Chip 
                      label={task.assignedTo} 
                      size="small" 
                      sx={{ mt: isMobile ? 0.5 : 0 }}
                      variant="outlined"
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header - Responsive */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        mb: 4,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0
      }}>
        <Box sx={{ width: isMobile ? '100%' : 'auto' }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Joining Day Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
            Manage new employee onboarding for {new Date().toLocaleDateString()}
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />} 
          onClick={() => setOpenAddJoinerModal(true)}
          size={isMobile ? "small" : "medium"}
          sx={{ 
            width: isMobile ? '100%' : 'auto',
            mt: isMobile ? 1 : 0
          }}
        >
          {isMobile ? 'Add Joiner' : 'Add New Joiner'}
        </Button>
      </Box>

      {/* Progress Stepper - Responsive */}
      <Paper sx={{ p: isMobile ? 2 : 3, mb: 4, overflowX: 'auto' }}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          orientation={isMobile ? "vertical" : "horizontal"}
          sx={{
            '& .MuiStepLabel-label': {
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Overview Cards - Responsive Grid */}
      <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
        {[
          { label: "Today's Joiners", value: newJoiners.length, color: "primary" },
          { label: "Overall Progress", value: `${progressData.overall}%`, color: "secondary" },
          { label: "Pending Tasks", value: tasks.hr.concat(tasks.it, tasks.admin, tasks.finance).filter(t => !t.completed).length, color: "error" },
          { label: "Completed", value: tasks.hr.concat(tasks.it, tasks.admin, tasks.finance).filter(t => t.completed).length, color: "success" }
        ].map((stat, index) => (
          <Grid key={index} size={{ xs: 6, sm: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ 
                textAlign: 'center', 
                p: isMobile ? 1.5 : 2 
              }}>
                <Typography 
                  color="text.secondary" 
                  gutterBottom 
                  sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                >
                  {stat.label}
                </Typography>
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  color={stat.color}
                  sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}
                >
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid - Stack on mobile */}
      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Left Column - New Joiners List */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: isMobile ? '1rem' : '1.25rem'
              }}>
                <PersonAddIcon sx={{ mr: 1, fontSize: isMobile ? '1.25rem' : '1.5rem' }} />
                Today's Joiners ({newJoiners.length})
              </Typography>
              
              <List sx={{ maxHeight: isMobile ? 300 : 400, overflow: 'auto' }}>
                {newJoiners.map((joiner) => (
                  <React.Fragment key={joiner.id}>
                    <ListItem 
                      onClick={() => handleJoinerSelect(joiner)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        bgcolor: selectedJoiner?.id === joiner.id ? 'action.selected' : 'transparent',
                        p: isMobile ? 1 : 2
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: isMobile ? 40 : 56 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'primary.main',
                            width: isMobile ? 32 : 40,
                            height: isMobile ? 32 : 40
                          }}
                        >
                          {joiner.name.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={joiner.name}
                        secondary={
                          <React.Fragment>
                            {joiner.designation}
                            <br />
                            <Typography 
                              component="span" 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}
                            >
                              {joiner.department}
                            </Typography>
                          </React.Fragment>
                        }
                        primaryTypographyProps={{
                          sx: { fontSize: isMobile ? '0.875rem' : '1rem' }
                        }}
                        secondaryTypographyProps={{
                          component: 'div', // FIX: This prevents the div inside p issue
                          sx: { fontSize: isMobile ? '0.75rem' : '0.875rem' }
                        }}
                        sx={{ 
                          ml: isMobile ? 1 : 2,
                          '& .MuiListItemText-secondary': {
                            display: 'block'
                          }
                        }}
                      />
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-end', 
                        gap: 0.5,
                        ml: 1
                      }}>
                        <Chip 
                          label={joiner.status} 
                          size="small" 
                          color={joiner.status === 'Pending' ? 'warning' : joiner.status === 'Completed' ? 'success' : 'primary'}
                          sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setJoinerToDelete(joiner.id);
                            setOpenDeleteModal(true);
                          }}
                          sx={{ color: 'error.main', p: 0.5 }}
                        >
                          <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  fullWidth={isMobile}
                  onClick={() => setOpenSendEmailModal(true)}
                  size={isMobile ? "small" : "medium"}
                >
                  {isMobile ? 'Send Email' : 'Send Welcome Email'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={calculateProgress}
                  size={isMobile ? "small" : "medium"}
                  sx={{ minWidth: isMobile ? 'auto' : undefined }}
                >
                  {isMobile ? <RefreshIcon /> : 'Refresh'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Task Management */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: isMobile ? '1rem' : '1.25rem'
              }}>
                <ChecklistIcon sx={{ mr: 1, fontSize: isMobile ? '1.25rem' : '1.5rem' }} />
                Joining Checklist
              </Typography>
              
              <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                Complete all tasks for a smooth onboarding experience
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {renderTaskList('hr', tasks.hr)}
                {renderTaskList('it', tasks.it)}
                {renderTaskList('admin', tasks.admin)}
                {renderTaskList('finance', tasks.finance)}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 3, 
                pt: 2, 
                borderTop: 1, 
                borderColor: 'divider',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 2 : 0
              }}>
                <Button 
                  variant="outlined" 
                  startIcon={<AssignmentIcon />} 
                  onClick={() => setOpenReportModal(true)}
                  size={isMobile ? "small" : "medium"}
                  fullWidth={isMobile}
                >
                  {isMobile ? 'Report' : 'Generate Report'}
                </Button>
                <Button 
                  variant="contained" 
                  endIcon={<SendIcon />} 
                  onClick={() => setOpenCompleteModal(true)}
                  size={isMobile ? "small" : "medium"}
                  fullWidth={isMobile}
                >
                  {isMobile ? 'Complete' : 'Complete Onboarding'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Responsive Dialogs */}
      <Dialog 
        open={openJoinerDialog} 
        onClose={() => setOpenJoinerDialog(false)} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircleIcon sx={{ mr: 1 }} />
            Joiner Details
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedJoiner && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center', mb: isMobile ? 3 : 0 }}>
                  <Avatar sx={{ 
                    width: isMobile ? 80 : 120, 
                    height: isMobile ? 80 : 120, 
                    mb: 2, 
                    mx: 'auto' 
                  }}>
                    {selectedJoiner.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6">{selectedJoiner.name}</Typography>
                  <Typography color="text.secondary">{selectedJoiner.designation}</Typography>
                  <Chip 
                    label={selectedJoiner.status} 
                    color="primary" 
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>
              
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Email"
                      value={selectedJoiner.email}
                      fullWidth
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Joining Date"
                      value={selectedJoiner.joiningDate}
                      fullWidth
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Department"
                      value={selectedJoiner.department}
                      fullWidth
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Employee ID"
                      value={selectedJoiner.employeeId}
                      fullWidth
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Phone"
                      value={selectedJoiner.phone}
                      fullWidth
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Address"
                      value={selectedJoiner.address}
                      fullWidth
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      label="Notes"
                      multiline
                      rows={isMobile ? 2 : 3}
                      placeholder="Add any special instructions or notes..."
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Button onClick={() => setOpenJoinerDialog(false)} fullWidth={isMobile}>
            Close
          </Button>
          <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditDetails} fullWidth={isMobile}>
            Edit Details
          </Button>
          <Button variant="contained" startIcon={<VisibilityIcon />} onClick={handleViewFullProfile} fullWidth={isMobile}>
            View Full Profile
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Joiner Modal - Responsive */}
      <Dialog 
        open={openAddJoinerModal} 
        onClose={() => setOpenAddJoinerModal(false)} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonAddIcon sx={{ mr: 1 }} />
            Add New Joiner
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label="Full Name *" 
                  variant="outlined" 
                  name="name"
                  value={newJoinerForm.name}
                  onChange={handleNewJoinerFormChange}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label="Email *" 
                  variant="outlined" 
                  type="email"
                  name="email"
                  value={newJoinerForm.email}
                  onChange={handleNewJoinerFormChange}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label="Designation *" 
                  variant="outlined"
                  name="designation"
                  value={newJoinerForm.designation}
                  onChange={handleNewJoinerFormChange}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Department *</InputLabel>
                  <Select
                    name="department"
                    value={newJoinerForm.department}
                    onChange={handleNewJoinerFormChange}
                    label="Department *"
                  >
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Operations">Operations</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label="Joining Date" 
                  variant="outlined" 
                  type="date"
                  name="joiningDate"
                  value={newJoinerForm.joiningDate}
                  onChange={handleNewJoinerFormChange}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label="Phone Number" 
                  variant="outlined"
                  name="phone"
                  value={newJoinerForm.phone}
                  onChange={handleNewJoinerFormChange}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField 
                  fullWidth 
                  label="Address" 
                  variant="outlined" 
                  multiline 
                  rows={isMobile ? 2 : 2}
                  name="address"
                  value={newJoinerForm.address}
                  onChange={handleNewJoinerFormChange}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 0 }}>
          <Button onClick={() => setOpenAddJoinerModal(false)} fullWidth={isMobile}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleAddNewJoiner(newJoinerForm)} fullWidth={isMobile}>
            Add Joiner
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send Email Modal - Responsive */}
      <Dialog 
        open={openSendEmailModal} 
        onClose={() => setOpenSendEmailModal(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 1 }} />
            Send Welcome Email
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Send welcome email to all today's joiners?
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              This will send welcome emails to {newJoiners.length} new joiners.
            </Typography>
            <TextField
              fullWidth
              label="Subject"
              value={emailForm.subject}
              onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
              sx={{ mt: 2 }}
              size="small"
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={isMobile ? 3 : 4}
              value={emailForm.message}
              onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
              sx={{ mt: 2 }}
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 0 }}>
          <Button onClick={() => setOpenSendEmailModal(false)} fullWidth={isMobile}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSendWelcomeEmail} fullWidth={isMobile}>
            Send Emails
          </Button>
        </DialogActions>
      </Dialog>

      {/* Generate Report Modal - Responsive */}
      <Dialog 
        open={openReportModal} 
        onClose={() => setOpenReportModal(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AssignmentIcon sx={{ mr: 1 }} />
            Generate Report
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportForm.type}
                    onChange={(e) => setReportForm(prev => ({ ...prev, type: e.target.value }))}
                    label="Report Type"
                  >
                    <MenuItem value="daily">Daily Onboarding Report</MenuItem>
                    <MenuItem value="weekly">Weekly Onboarding Report</MenuItem>
                    <MenuItem value="monthly">Monthly Onboarding Report</MenuItem>
                    <MenuItem value="department">Department-wise Report</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label="Start Date" 
                  type="date" 
                  value={reportForm.startDate}
                  onChange={(e) => setReportForm(prev => ({ ...prev, startDate: e.target.value }))}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField 
                  fullWidth 
                  label="End Date" 
                  type="date" 
                  value={reportForm.endDate}
                  onChange={(e) => setReportForm(prev => ({ ...prev, endDate: e.target.value }))}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Format</InputLabel>
                  <Select
                    value={reportForm.format}
                    onChange={(e) => setReportForm(prev => ({ ...prev, format: e.target.value }))}
                    label="Format"
                  >
                    <MenuItem value="pdf">PDF</MenuItem>
                    <MenuItem value="excel">Excel</MenuItem>
                    <MenuItem value="csv">CSV</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 0 }}>
          <Button onClick={() => setOpenReportModal(false)} fullWidth={isMobile}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleGenerateReport} fullWidth={isMobile}>
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Complete Onboarding Modal - Responsive */}
      <Dialog 
        open={openCompleteModal} 
        onClose={() => setOpenCompleteModal(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SendIcon sx={{ mr: 1 }} />
            Complete Onboarding
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to mark onboarding as complete?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This will move all {newJoiners.length} joiners to the next stage and archive current onboarding data.
            </Typography>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                <strong>Note:</strong> This action cannot be undone. Make sure all tasks are completed.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 0 }}>
          <Button onClick={() => setOpenCompleteModal(false)} fullWidth={isMobile}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleCompleteOnboarding} fullWidth={isMobile}>
            Complete Onboarding
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal - Responsive */}
      <Dialog 
        open={openDeleteModal} 
        onClose={() => setOpenDeleteModal(false)} 
        maxWidth="xs" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DeleteIcon color="error" sx={{ mr: 1 }} />
            Delete Joiner
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete this joiner? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 0 }}>
          <Button onClick={() => setOpenDeleteModal(false)} fullWidth={isMobile}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteJoiner} fullWidth={isMobile}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ 
          vertical: isMobile ? 'top' : 'bottom', 
          horizontal: isMobile ? 'center' : 'right' 
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Main JoiningDayManagementPage Component
const JoiningDayManagementPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Menu items for sidebar
  const menuItems = [
    {
      title: 'Authentication',
      icon: 'heroicons:lock-closed',
      link: '/auth',
      onClick: () => navigate('/auth')
    },
    {
      title: 'Joining Day Management',
      icon: 'heroicons:user-plus',
      link: '/joining-day',
      active: true,
      onClick: () => navigate('/joining-day')
    },
    {
      title: 'Employee Onboarding',
      icon: 'heroicons:document-check',
      link: '/onboarding',
      onClick: () => navigate('/onboarding')
    },
    {
      title: 'Task Management',
      icon: 'heroicons:check-circle',
      link: '/tasks',
      onClick: () => navigate('/tasks')
    },
    {
      title: 'Reports',
      icon: 'heroicons:chart-bar',
      link: '/reports',
      onClick: () => navigate('/reports')
    },
    {
      title: 'Settings',
      icon: 'heroicons:cog-6-tooth',
      link: '/settings',
      onClick: () => navigate('/settings')
    }
  ];

  // User info
  const userInfo = {
    name: 'HR Manager',
    role: 'Human Resources',
    email: 'hr.manager@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HRManager'
  };

  // State for modals
  const [openAddJoinerModal, setOpenAddJoinerModal] = useState(false);
  const [openSendEmailsModal, setOpenSendEmailsModal] = useState(false);
  const [openExportReportModal, setOpenExportReportModal] = useState(false);
  const [openCreateChecklistModal, setOpenCreateChecklistModal] = useState(false);
  const [openSendInvitationsModal, setOpenSendInvitationsModal] = useState(false);
  const [openVerifyDocsModal, setOpenVerifyDocsModal] = useState(false);
  const [openITSetupModal, setOpenITSetupModal] = useState(false);
  const [openSyncModal, setOpenSyncModal] = useState(false);
  
  // Form states for Bootstrap modal
  const [addJoinerForm, setAddJoinerForm] = useState({
    name: '',
    email: '',
    designation: '',
    department: 'Engineering',
    joiningDate: new Date().toISOString().split('T')[0],
    phone: '',
    address: ''
  });

  // Stats data
  const [stats, setStats] = useState({
    totalJoiners: 0,
    completedTasks: 0,
    pendingTasks: 0,
    upcomingJoinings: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const savedJoiners = JSON.parse(localStorage.getItem('joiners') || '[]');
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    
    const totalTasks = [
      ...(savedTasks.hr || []),
      ...(savedTasks.it || []),
      ...(savedTasks.admin || []),
      ...(savedTasks.finance || [])
    ];
    
    const completedTasks = totalTasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks.filter(task => !task.completed).length;
    
    setStats({
      totalJoiners: savedJoiners.length || 24,
      completedTasks: completedTasks || 156,
      pendingTasks: pendingTasks || 18,
      upcomingJoinings: 8
    });
  }, []);

  // Navigation handlers
  const navigateToOnboarding = () => navigate('/onboarding');
  const navigateToTasks = () => navigate('/tasks');
  const navigateToReports = () => navigate('/reports');
  const navigateToSettings = () => navigate('/settings');

  // Form handlers for Bootstrap modal
  const handleAddJoinerFormChange = (e) => {
    const { name, value } = e.target;
    setAddJoinerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewJoinerFromBootstrap = () => {
    if (!addJoinerForm.name || !addJoinerForm.email || !addJoinerForm.designation) {
      alert('Please fill all required fields (Name, Email, Designation)');
      return;
    }

    // Create new joiner object
    const newJoiner = {
      id: Date.now(),
      ...addJoinerForm,
      employeeId: `EMP-${String(Date.now()).slice(-5)}`,
      profilePic: '',
      status: 'Pending'
    };

    // Get existing joiners from localStorage
    const savedJoiners = JSON.parse(localStorage.getItem('joiners') || '[]');
    const updatedJoiners = [...savedJoiners, newJoiner];
    
    // Save to localStorage
    localStorage.setItem('joiners', JSON.stringify(updatedJoiners));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalJoiners: updatedJoiners.length
    }));

    // Show success message
    alert(`New joiner ${addJoinerForm.name} added successfully!`);
    
    // Close modal and reset form
    setOpenAddJoinerModal(false);
    setAddJoinerForm({
      name: '',
      email: '',
      designation: '',
      department: 'Engineering',
      joiningDate: new Date().toISOString().split('T')[0],
      phone: '',
      address: ''
    });
    
    // Reload the page to show updated data (or you can update state directly)
    window.location.reload();
  };

  const handleSendWelcomeEmails = () => {
    const savedJoiners = JSON.parse(localStorage.getItem('joiners') || '[]');
    alert(`Welcome emails sent to ${savedJoiners.length} joiners!`);
    setOpenSendEmailsModal(false);
  };

  const handleExportReport = () => {
    alert('Report exported successfully!');
    setOpenExportReportModal(false);
  };

  const handleCreateChecklist = () => {
    alert('Checklist created successfully!');
    setOpenCreateChecklistModal(false);
  };

  const handleSendInvitations = () => {
    alert('Invitations sent successfully!');
    setOpenSendInvitationsModal(false);
  };

  const handleVerifyDocuments = () => {
    alert('Documents verified successfully!');
    setOpenVerifyDocsModal(false);
  };

  const handleITSetupRequest = () => {
    alert('IT setup request submitted successfully!');
    setOpenITSetupModal(false);
  };

  const handleSyncWithHRIS = () => {
    alert('Sync completed successfully!');
    setOpenSyncModal(false);
  };

  return (
    <div
      menuItems={menuItems} 
      userInfo={userInfo}
      appName="HRMS - Onboarding"
    >
      <div className="container-fluid p-2 p-md-4">
        {/* Header - Responsive */}
        <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between'} align-items-${isMobile ? 'start' : 'center'} mb-4`}>
          <div className={`${isMobile ? 'w-100 mb-3' : ''}`}>
            <h5 className={`mb-2 d-flex align-items-center ${isMobile ? 'fs-6' : ''}`}>
              <Icon icon="heroicons:calendar-days" className="me-2" width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />
              Joining Day Management
            </h5>
            <p className={`text-muted ${isMobile ? 'small' : ''}`}>Manage new employee onboarding and joining day processes</p>
          </div>

          <div className={`d-flex gap-2 ${isMobile ? 'w-100 flex-wrap' : ''}`}>
            <button className={`btn btn-primary ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenAddJoinerModal(true)}>
              <Icon icon="heroicons:plus" className="me-2" />
              {isMobile ? 'Add' : 'Add New Joiner'}
            </button>
            <button className={`btn btn-outline-primary ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenSendEmailsModal(true)}>
              <Icon icon="heroicons:envelope" className="me-2" />
              {isMobile ? 'Email' : 'Send Welcome Emails'}
            </button>
            <button className={`btn btn-outline-secondary ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenExportReportModal(true)}>
              <Icon icon="heroicons:arrow-down-tray" className="me-2" />
              {isMobile ? 'Report' : 'Export Report'}
            </button>
          </div>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="row g-2 g-md-3 mb-4">
          {[
            { label: "Today's Joiners", value: stats.totalJoiners, color: "primary", change: "+2 from yesterday" },
            { label: "Completed Tasks", value: stats.completedTasks, color: "success", change: "92% completion rate" },
            { label: "Pending Tasks", value: stats.pendingTasks, color: "warning", change: "Requires attention" },
            { label: "Upcoming Joinings", value: stats.upcomingJoinings, color: "info", change: "Next 7 days" },
            { label: "Onboarding Progress", value: "78%", color: "secondary", change: "Overall completion" },
            { label: "Avg Processing Time", value: "2.5 days", color: "danger", change: "From offer to join" }
          ].map((stat, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 d-flex">
              <div className="card border shadow-sm w-100">
                <div className={`card-body text-center d-flex flex-column justify-content-center ${isMobile ? 'p-2' : ''}`}>
                  <div className={`fw-bold ${isMobile ? 'small' : 'text-secondary-light small'}`}>{stat.label}</div>
                  <div className={`fw-bold ${isMobile ? 'fs-6' : 'fs-5'} text-${stat.color} mb-1`}>{stat.value}</div>
                  <small className="text-muted">{stat.change}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions - Responsive */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border shadow-sm">
              <div className={`card-body ${isMobile ? 'p-3' : ''}`}>
                <h6 className="fw-bold mb-3">Quick Actions</h6>
                <div className={`d-flex ${isMobile ? 'flex-wrap' : 'flex-wrap'} gap-2`}>
                  <button className={`btn btn-outline-primary d-flex align-items-center ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenCreateChecklistModal(true)}>
                    <Icon icon="heroicons:document-plus" className="me-2" />
                    {isMobile ? 'Checklist' : 'Create Checklist'}
                  </button>
                  <button className={`btn btn-outline-success d-flex align-items-center ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenSendInvitationsModal(true)}>
                    <Icon icon="heroicons:envelope-open" className="me-2" />
                    {isMobile ? 'Invitations' : 'Send Invitations'}
                  </button>
                  <button className={`btn btn-outline-warning d-flex align-items-center ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenVerifyDocsModal(true)}>
                    <Icon icon="heroicons:clipboard-document-check" className="me-2" />
                    {isMobile ? 'Verify Docs' : 'Verify Documents'}
                  </button>
                  <button className={`btn btn-outline-info d-flex align-items-center ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenITSetupModal(true)}>
                    <Icon icon="heroicons:device-phone-mobile" className="me-2" />
                    {isMobile ? 'IT Setup' : 'IT Setup Request'}
                  </button>
                  <button className={`btn btn-outline-secondary d-flex align-items-center ${isMobile ? 'btn-sm flex-grow-1' : ''}`} onClick={() => setOpenSyncModal(true)}>
                    <Icon icon="heroicons:arrow-path" className="me-2" />
                    {isMobile ? 'Sync HRIS' : 'Sync with HRIS'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          <div className="col-12">
            <JoiningDayManagement />
          </div>
        </div>

        {/* Department Progress - Responsive */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border shadow-sm">
              <div className="card-header bg-light">
                <h6 className="mb-0 fw-bold">Department-wise Progress</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  {[
                    { department: 'HR Department', progress: 85, color: 'primary' },
                    { department: 'IT Department', progress: 45, color: 'warning' },
                    { department: 'Admin Department', progress: 65, color: 'info' },
                    { department: 'Finance Department', progress: 25, color: 'danger' }
                  ].map((dept, index) => (
                    <div key={index} className="col-md-3 col-6">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span className={`fw-bold ${isMobile ? 'small' : ''}`}>{dept.department}</span>
                          <span className={`text-${dept.color} ${isMobile ? 'small' : ''}`}>{dept.progress}%</span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div className={`progress-bar bg-${dept.color}`} style={{ width: `${dept.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Bootstrap Modals */}
      {/* Add New Joiner Modal */}
      {openAddJoinerModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : 'modal-lg'}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:user-plus" className="me-2" />
                  Add New Joiner
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenAddJoinerModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      placeholder="Enter full name" 
                      name="name"
                      value={addJoinerForm.name}
                      onChange={handleAddJoinerFormChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Email *</label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm" 
                      placeholder="Enter email" 
                      name="email"
                      value={addJoinerForm.email}
                      onChange={handleAddJoinerFormChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Designation *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      placeholder="Enter designation" 
                      name="designation"
                      value={addJoinerForm.designation}
                      onChange={handleAddJoinerFormChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Department</label>
                    <select 
                      className="form-select form-select-sm"
                      name="department"
                      value={addJoinerForm.department}
                      onChange={handleAddJoinerFormChange}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Joining Date</label>
                    <input 
                      type="date" 
                      className="form-control form-control-sm" 
                      name="joiningDate"
                      value={addJoinerForm.joiningDate}
                      onChange={handleAddJoinerFormChange}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control form-control-sm" 
                      placeholder="Enter phone number" 
                      name="phone"
                      value={addJoinerForm.phone}
                      onChange={handleAddJoinerFormChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea 
                      className="form-control form-control-sm" 
                      placeholder="Enter address" 
                      rows="2"
                      name="address"
                      value={addJoinerForm.address}
                      onChange={handleAddJoinerFormChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenAddJoinerModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleAddNewJoinerFromBootstrap}>Add Joiner</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Welcome Emails Modal */}
      {openSendEmailsModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : ''}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:envelope" className="me-2" />
                  Send Welcome Emails
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenSendEmailsModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Send welcome emails to all today's joiners?</p>
                <div className="alert alert-info">
                  <Icon icon="heroicons:information-circle" className="me-2" />
                  This will send emails to {stats.totalJoiners} new joiners.
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenSendEmailsModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSendWelcomeEmails}>Send Emails</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Report Modal */}
      {openExportReportModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : ''}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:arrow-down-tray" className="me-2" />
                  Export Report
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenExportReportModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Report Type</label>
                  <select className="form-select form-select-sm">
                    <option>Daily Onboarding Report</option>
                    <option>Weekly Onboarding Report</option>
                    <option>Monthly Onboarding Report</option>
                    <option>Department-wise Report</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Format</label>
                  <select className="form-select form-select-sm">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenExportReportModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleExportReport}>Export Report</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Checklist Modal */}
      {openCreateChecklistModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : 'modal-lg'}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:document-plus" className="me-2" />
                  Create New Checklist
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenCreateChecklistModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Checklist Name</label>
                  <input type="text" className="form-control form-control-sm" placeholder="Enter checklist name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <select className="form-select form-select-sm">
                    <option>All Departments</option>
                    <option>HR</option>
                    <option>IT</option>
                    <option>Admin</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tasks (one per line)</label>
                  <textarea className="form-control form-control-sm" rows={isMobile ? 3 : 5} placeholder="Enter tasks, one per line"></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenCreateChecklistModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleCreateChecklist}>Create Checklist</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Invitations Modal */}
      {openSendInvitationsModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : ''}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:envelope-open" className="me-2" />
                  Send Invitations
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenSendInvitationsModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Send induction invitations to new joiners?</p>
                <div className="alert alert-info">
                  <Icon icon="heroicons:information-circle" className="me-2" />
                  Invitations will be scheduled for the next available induction session.
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenSendInvitationsModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSendInvitations}>Send Invitations</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verify Documents Modal */}
      {openVerifyDocsModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : 'modal-lg'}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:clipboard-document-check" className="me-2" />
                  Verify Documents
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenVerifyDocsModal(false)}></button>
              </div>
              <div className="modal-body">
                <p className="mb-3">Select documents to verify:</p>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="check1" />
                  <label className="form-check-label" htmlFor="check1">Aadhar Card</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="check2" />
                  <label className="form-check-label" htmlFor="check2">PAN Card</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="check3" />
                  <label className="form-check-label" htmlFor="check3">Educational Certificates</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="check4" />
                  <label className="form-check-label" htmlFor="check4">Previous Employment Proof</label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="check5" />
                  <label className="form-check-label" htmlFor="check5">Bank Details</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenVerifyDocsModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleVerifyDocuments}>Verify Selected</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IT Setup Request Modal */}
      {openITSetupModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : 'modal-lg'}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:device-phone-mobile" className="me-2" />
                  IT Setup Request
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenITSetupModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Joiner</label>
                  <select className="form-select form-select-sm">
                    <option>Rajesh Kumar</option>
                    <option>Priya Sharma</option>
                    <option>All Joiners</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">IT Requirements</label>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="it1" />
                    <label className="form-check-label" htmlFor="it1">Laptop Allocation</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="it2" />
                    <label className="form-check-label" htmlFor="it2">Email ID Creation</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="it3" />
                    <label className="form-check-label" htmlFor="it3">VPN Access</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="it4" />
                    <label className="form-check-label" htmlFor="it4">Software Installation</label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenITSetupModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleITSetupRequest}>Submit Request</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sync with HRIS Modal */}
      {openSyncModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className={`modal-dialog ${isMobile ? 'modal-dialog-centered m-2' : ''}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="heroicons:arrow-path" className="me-2" />
                  Sync with HRIS
                </h5>
                <button type="button" className="btn-close" onClick={() => setOpenSyncModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Synchronize onboarding data with HRIS system?</p>
                <div className="alert alert-warning">
                  <Icon icon="heroicons:exclamation-triangle" className="me-2" />
                  This will update employee records in the HRIS system with current onboarding data.
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setOpenSyncModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSyncWithHRIS}>Start Sync</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoiningDayManagement;