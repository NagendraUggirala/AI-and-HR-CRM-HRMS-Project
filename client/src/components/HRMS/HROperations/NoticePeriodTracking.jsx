import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Eye, 
  Edit,
  Calendar,
  Clock,
  DollarSign,
  Percent,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  Zap,
  Bot,
  Brain,
  Sparkles,
  Target,
  Users,
  FileText,
  Calculator,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Settings,
  MoreVertical,
  Send,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bell,
  UserCheck,
  FileCheck,
  Mail,
  Phone,
  Briefcase,
  Award,
  Crown,
  X,
  Check,
  File,
  Trash2,
  Copy,
  Share2,
  Info,
  Star,
  Heart,
  FolderPlus,
  Upload,
  Save,
  Lock,
  Unlock,
  Volume2,
  Mic,
  Video,
  PhoneCall,
  MapPin,
  Globe,
  Link,
  FileUp,
  UserX,
  Scale,
  CalendarDays
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';


const NoticePeriodTracking = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCases, setSelectedCases] = useState([]);
  const [showResignationModal, setShowResignationModal] = useState(false);
  const [showBuyoutModal, setShowBuyoutModal] = useState(false);
  const [showWaiverModal, setShowWaiverModal] = useState(false);
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
  const [showHRInterviewModal, setShowHRInterviewModal] = useState(false);
  const [showExitFormalitiesModal, setShowExitFormalitiesModal] = useState(false);
  const [showRetentionModal, setShowRetentionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [aiChatMessage, setAiChatMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [lwdDate, setLwdDate] = useState('');
  const [buyoutAmount, setBuyoutAmount] = useState(0);
  const [shortfallAmount, setShortfallAmount] = useState(0);
  
  // Calculator states
  const [calculatorData, setCalculatorData] = useState({
    resignationDate: new Date().toISOString().split('T')[0],
    noticePeriod: '60',
    monthlySalary: '₹1,50,000',
    buyoutDays: '30',
    currentLWD: '',
    extensionDays: '15',
    waiverDays: '15'
  });
  
  // Add calculator results state
  const [calculatorResults, setCalculatorResults] = useState({
    lwdResult: '',
    buyoutResult: '',
    extensionResult: '',
    daysRemainingResult: '',
    waiverResult: ''
  });
  
  const [automationStatus, setAutomationStatus] = useState({
    resignationWorkflow: true,
    autoCalculation: true,
    smartNotifications: true,
    predictiveAnalytics: true,
    autoApprovals: false
  });

  // ==================== DATA ====================
  const menuItems = [
    { title: 'Dashboard', link: '/recruiter/dashboard', active: false },
    { title: 'Job Openings', link: '/recruiter/jobs', active: false },
    { title: 'Candidates', link: '/recruiter/candidates' },
    { title: 'Interviews', link: '/recruiter/interviews' },
    { title: 'Pre-Joining', link: '/recruiter/pre-joining' },
    { title: 'Onboarding', link: '/recruiter/onboarding' },
    { title: 'Reports', link: '/recruiter/reports' },
    { title: 'Exit Management', link: '/recruiter/exit-management', active: true }
  ];

  const userInfo = {
    name: 'Sarah Johnson',
    role: 'HR Head',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  };

  const [noticePeriodCases, setNoticePeriodCases] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'Engineering',
      role: 'Senior Software Engineer',
      resignationDate: '2024-03-01',
      submittedDate: '2024-02-28',
      noticePeriod: '60 days',
      noticePeriodDays: 60,
      lastWorkingDay: '2024-04-30',
      daysRemaining: 15,
      status: 'Active',
      managerAcknowledged: true,
      managerAckDate: '2024-03-01',
      managerEmail: 'manager@company.com',
      hrInterviewScheduled: '2024-03-05',
      hrInterviewCompleted: false,
      counterOfferStatus: 'Pending',
      buyoutRequested: false,
      waiverRequested: false,
      extensionRequested: false,
      retentionAttempted: true,
      retentionSuccess: false,
      resignationReason: 'Better opportunity',
      resignationComments: 'Received offer with 40% hike',
      exitInterviewScheduled: false,
      acceptanceLetterSent: false,
      exitFormalitiesStarted: false,
      dailyTracker: [
        { date: '2024-03-01', status: 'Resignation Submitted', completed: true },
        { date: '2024-03-02', status: 'Manager Acknowledged', completed: true },
        { date: '2024-03-05', status: 'HR Interview', completed: false }
      ]
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'Marketing',
      role: 'Marketing Manager',
      resignationDate: '2024-02-25',
      submittedDate: '2024-02-24',
      noticePeriod: '45 days',
      noticePeriodDays: 45,
      lastWorkingDay: '2024-04-10',
      daysRemaining: 0,
      status: 'Completed',
      managerAcknowledged: true,
      managerAckDate: '2024-02-26',
      managerEmail: 'marketing.head@company.com',
      hrInterviewScheduled: '2024-02-28',
      hrInterviewCompleted: true,
      counterOfferStatus: 'Accepted',
      buyoutRequested: true,
      waiverRequested: false,
      extensionRequested: false,
      retentionAttempted: true,
      retentionSuccess: true,
      resignationReason: 'Career growth',
      resignationComments: 'Leadership role opportunity',
      exitInterviewScheduled: true,
      acceptanceLetterSent: true,
      exitFormalitiesStarted: true,
      dailyTracker: [
        { date: '2024-02-24', status: 'Resignation Submitted', completed: true },
        { date: '2024-02-26', status: 'Manager Acknowledged', completed: true },
        { date: '2024-02-28', status: 'HR Interview', completed: true },
        { date: '2024-03-01', status: 'Counter Offer Accepted', completed: true },
        { date: '2024-04-10', status: 'Exit Completed', completed: true }
      ]
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Sales',
      role: 'Sales Executive',
      resignationDate: '2024-03-05',
      submittedDate: '2024-03-05',
      noticePeriod: '30 days',
      noticePeriodDays: 30,
      lastWorkingDay: '2024-04-04',
      daysRemaining: 25,
      status: 'Active',
      managerAcknowledged: false,
      managerAckDate: null,
      managerEmail: 'sales.head@company.com',
      hrInterviewScheduled: null,
      hrInterviewCompleted: false,
      counterOfferStatus: 'Not Started',
      buyoutRequested: false,
      waiverRequested: false,
      extensionRequested: false,
      retentionAttempted: false,
      retentionSuccess: false,
      resignationReason: 'Relocation',
      resignationComments: 'Moving to another city',
      exitInterviewScheduled: false,
      acceptanceLetterSent: false,
      exitFormalitiesStarted: false,
      dailyTracker: [
        { date: '2024-03-05', status: 'Resignation Submitted', completed: true }
      ]
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Sneha Reddy',
      department: 'HR',
      role: 'HR Executive',
      resignationDate: '2024-03-10',
      submittedDate: '2024-03-09',
      noticePeriod: '60 days',
      noticePeriodDays: 60,
      lastWorkingDay: '2024-05-09',
      daysRemaining: 45,
      status: 'Active',
      managerAcknowledged: false,
      managerAckDate: null,
      managerEmail: 'hr.head@company.com',
      hrInterviewScheduled: null,
      hrInterviewCompleted: false,
      counterOfferStatus: 'Not Started',
      buyoutRequested: false,
      waiverRequested: true,
      extensionRequested: false,
      retentionAttempted: false,
      retentionSuccess: false,
      resignationReason: 'Higher studies',
      resignationComments: 'Pursuing MBA abroad',
      exitInterviewScheduled: false,
      acceptanceLetterSent: false,
      exitFormalitiesStarted: false,
      dailyTracker: [
        { date: '2024-03-09', status: 'Resignation Submitted', completed: true }
      ]
    }
  ]);

  const [buyoutRequests, setBuyoutRequests] = useState([
    {
      id: 1,
      employeeId: 'EMP005',
      employeeName: 'Rajesh Verma',
      department: 'Finance',
      buyoutAmount: '₹75,000',
      requestedDate: '2024-03-05',
      status: 'Pending',
      approvalLevel: 'Manager',
      reason: 'Early joining at new company',
      daysToBuyout: 45,
      monthlySalary: '₹2,00,000',
      calculatedAmount: '₹75,000',
      approvedByManager: false,
      approvedByHR: false,
      approvedByFinance: false
    }
  ]);

  const [waiverRequests, setWaiverRequests] = useState([
    {
      id: 1,
      employeeId: 'EMP004',
      employeeName: 'Sneha Reddy',
      department: 'HR',
      requestedDate: '2024-03-10',
      status: 'Pending',
      reason: 'University admission deadline approaching',
      supportingDocs: ['Admission_Letter.pdf', 'Visa_Application.pdf', 'Fee_Receipt.pdf'],
      waiverDays: 30,
      waiverReason: 'Higher studies abroad',
      waiverDetails: 'MBA program starting in May 2024',
      approvedByManager: false,
      approvedByHR: false,
      approvedByDirector: false
    },
    {
      id: 2,
      employeeId: 'EMP006',
      employeeName: 'Arjun Mehta',
      department: 'Engineering',
      requestedDate: '2024-03-08',
      status: 'Approved',
      reason: 'Medical emergency in family',
      supportingDocs: ['Medical_Certificate.pdf', 'Doctor_Note.pdf'],
      waiverDays: 20,
      waiverReason: 'Family emergency',
      waiverDetails: 'Father undergoing heart surgery',
      approvedByManager: true,
      approvedByHR: true,
      approvedByDirector: true
    }
  ]);

  const [counterOffers, setCounterOffers] = useState([
    {
      id: 1,
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'Marketing',
      offeredSalary: '₹18,00,000',
      currentSalary: '₹14,40,000',
      salaryHike: '25%',
      additionalBenefits: 'Performance bonus, Stock options, Flexible hours',
      status: 'Accepted',
      decisionDate: '2024-03-01',
      retentionProbability: '85%',
      managerApproved: true,
      hrApproved: true,
      offeredRole: 'Senior Marketing Manager',
      counterOfferDate: '2024-02-28',
      employeeResponse: 'Accepted with gratitude',
      notes: 'Employee was looking for career growth, offered leadership role'
    },
    {
      id: 2,
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'Engineering',
      offeredSalary: '₹25,00,000',
      currentSalary: '₹18,00,000',
      salaryHike: '38%',
      additionalBenefits: 'Remote work option, Additional leave, Conference budget',
      status: 'Pending',
      decisionDate: null,
      retentionProbability: '65%',
      managerApproved: false,
      hrApproved: false,
      offeredRole: 'Tech Lead',
      counterOfferDate: '2024-03-03',
      employeeResponse: 'Considering the offer',
      notes: 'Employee has competing offer from FAANG company'
    },
    {
      id: 3,
      employeeId: 'EMP007',
      employeeName: 'Kavya Singh',
      department: 'Product',
      offeredSalary: '₹22,00,000',
      currentSalary: '₹17,00,000',
      salaryHike: '29%',
      additionalBenefits: 'Product ownership, Team lead role',
      status: 'Rejected',
      decisionDate: '2024-03-05',
      retentionProbability: '45%',
      managerApproved: true,
      hrApproved: true,
      offeredRole: 'Product Lead',
      counterOfferDate: '2024-03-01',
      employeeResponse: 'Declined - pursuing entrepreneurship',
      notes: 'Employee starting own startup, not interested in counter offer'
    }
  ]);

  const [extensionRequests, setExtensionRequests] = useState([
    {
      id: 1,
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Sales',
      currentLWD: '2024-04-04',
      requestedLWD: '2024-04-18',
      extensionDays: 14,
      reason: 'Project handover requires more time',
      status: 'Pending',
      managerApproval: 'Pending',
      hrApproval: 'Pending',
      extensionReason: 'Critical project transition',
      extensionDetails: 'Training new team member on key accounts',
      approvedByManager: false,
      approvedByHR: false
    },
    {
      id: 2,
      employeeId: 'EMP008',
      employeeName: 'Neha Gupta',
      department: 'Operations',
      currentLWD: '2024-04-15',
      requestedLWD: '2024-05-01',
      extensionDays: 16,
      reason: 'Client project completion',
      status: 'Approved',
      managerApproval: 'Approved',
      hrApproval: 'Approved',
      extensionReason: 'Client request for continuity',
      extensionDetails: 'Key client requested employee to stay until project completion',
      approvedByManager: true,
      approvedByHR: true
    }
  ]);

  const resignationReasons = [
    'Better opportunity',
    'Career growth',
    'Higher studies',
    'Relocation',
    'Personal reasons',
    'Health issues',
    'Work-life balance',
    'Compensation',
    'Management issues',
    'Retirement',
    'Entrepreneurship',
    'Other'
  ];

  const aiPredictions = {
    highRiskDepartments: ['Engineering', 'Sales'],
    predictedResignations: 3,
    avgNoticePeriod: '54 days',
    retentionSuccessRate: '68%',
    riskFactors: ['Compensation gap', 'Career growth', 'Workload']
  };

  const aiInsights = [
    {
      id: 1,
      type: 'risk',
      title: 'Engineering Department High Risk',
      description: '45% higher resignation rate than company average',
      confidence: '92%',
      recommendedAction: 'Conduct retention workshops',
      icon: <AlertCircle className="text-danger" />
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'Counter Offer Success High',
      description: '78% acceptance rate for offers above 20% hike',
      confidence: '88%',
      recommendedAction: 'Pre-approve counter offer budget',
      icon: <TrendingUp className="text-success" />
    },
    {
      id: 3,
      type: 'efficiency',
      title: 'Automate 60% of Workflows',
      description: 'AI can automate interview scheduling and follow-ups',
      confidence: '95%',
      recommendedAction: 'Enable smart automation',
      icon: <Zap className="text-warning" />
    }
  ];

  const statistics = {
    totalActiveCases: noticePeriodCases.filter(c => c.status === 'Active').length,
    pendingManagerAck: noticePeriodCases.filter(c => c.status === 'Active' && !c.managerAcknowledged).length,
    pendingBuyout: buyoutRequests.filter(r => r.status === 'Pending').length,
    pendingWaiver: waiverRequests.filter(r => r.status === 'Pending').length,
    pendingCounter: counterOffers.filter(r => r.status === 'Pending').length,
    averageNoticeDays: 56,
    retentionSuccess: 2,
    todayResignations: 1,
    weekResignations: 3,
    autoProcessed: 12,
    timeSaved: '42 hours'
  };

  // ==================== UTILITY FUNCTIONS ====================
  const calculateLastWorkingDay = (resignationDate, noticePeriodDays) => {
    const date = new Date(resignationDate);
    date.setDate(date.getDate() + parseInt(noticePeriodDays));
    return date.toISOString().split('T')[0];
  };

  const calculateDaysRemaining = (lastWorkingDay) => {
    const today = new Date();
    const lwd = new Date(lastWorkingDay);
    const diffTime = lwd - today;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const calculateBuyoutAmount = (monthlySalary, daysToBuyout) => {
    const salary = parseInt(monthlySalary.replace(/[^0-9]/g, ''));
    const dailyRate = salary / 30;
    return Math.round(dailyRate * daysToBuyout);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="badge bg-warning text-dark">Active</span>;
      case 'Completed': return <span className="badge bg-success">Completed</span>;
      case 'Pending': return <span className="badge bg-secondary">Pending</span>;
      case 'Approved': return <span className="badge bg-success">Approved</span>;
      case 'Rejected': return <span className="badge bg-danger">Rejected</span>;
      case 'Accepted': return <span className="badge bg-success">Accepted</span>;
      case 'Not Started': return <span className="badge bg-light text-dark">Not Started</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  const getRiskLevel = (daysRemaining) => {
    if (daysRemaining <= 7) return { level: 'High', color: 'danger' };
    if (daysRemaining <= 14) return { level: 'Medium', color: 'warning' };
    return { level: 'Low', color: 'success' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // ==================== NOTIFICATION FUNCTIONS ====================
  const showNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    alert(`${type.toUpperCase()}: ${message}`);
  };

  // ==================== CALCULATOR FUNCTIONS ====================
  const handleCalculateLWD = () => {
    const lastWorkingDay = calculateLastWorkingDay(calculatorData.resignationDate, parseInt(calculatorData.noticePeriod));
    setCalculatorResults(prev => ({
      ...prev,
      lwdResult: `Last Working Day: ${lastWorkingDay}`
    }));
    showNotification(`Last Working Day: ${lastWorkingDay}`, 'info');
  };

  const handleCalculateBuyout = () => {
    const amount = calculateBuyoutAmount(calculatorData.monthlySalary, parseInt(calculatorData.buyoutDays));
    setCalculatorResults(prev => ({
      ...prev,
      buyoutResult: `Buyout Amount: ${formatCurrency(amount)}`
    }));
    showNotification(`Buyout Amount: ${formatCurrency(amount)}`, 'info');
  };

  const handleCalculateExtension = () => {
    if (calculatorData.currentLWD) {
      const newLWD = new Date(new Date(calculatorData.currentLWD).getTime() + (parseInt(calculatorData.extensionDays) * 24 * 60 * 60 * 1000));
      setCalculatorResults(prev => ({
        ...prev,
        extensionResult: `New Last Working Day: ${newLWD.toISOString().split('T')[0]}`
      }));
      showNotification(`New Last Working Day: ${newLWD.toISOString().split('T')[0]}`, 'info');
    } else {
      showNotification('Please select a current LWD date', 'warning');
    }
  };

  const handleCalculateDaysRemaining = () => {
    if (lwdDate) {
      const daysRemaining = calculateDaysRemaining(lwdDate);
      setCalculatorResults(prev => ({
        ...prev,
        daysRemainingResult: `Days Remaining: ${daysRemaining} days`
      }));
      showNotification(`Days remaining until ${lwdDate}: ${daysRemaining} days`, 'info');
    } else {
      showNotification('Please select a Last Working Day', 'warning');
    }
  };

  const handleCalculateWaiver = () => {
    const newNoticePeriod = parseInt(calculatorData.noticePeriod) - parseInt(calculatorData.waiverDays);
    setCalculatorResults(prev => ({
      ...prev,
      waiverResult: `New Notice Period: ${newNoticePeriod} days`
    }));
    showNotification(`After waiver: ${newNoticePeriod} days notice period`, 'info');
  };

  // ==================== ACTION HANDLERS ====================
  const handleResignationSubmit = (formData) => {
    const lastWorkingDay = calculateLastWorkingDay(formData.resignationDate, formData.noticePeriod);
    const daysRemaining = calculateDaysRemaining(lastWorkingDay);
    
    const newCase = {
      id: noticePeriodCases.length + 1,
      ...formData,
      noticePeriodDays: parseInt(formData.noticePeriod),
      lastWorkingDay,
      daysRemaining,
      status: 'Active',
      managerAcknowledged: false,
      managerAckDate: null,
      hrInterviewScheduled: null,
      hrInterviewCompleted: false,
      counterOfferStatus: 'Not Started',
      buyoutRequested: false,
      waiverRequested: false,
      extensionRequested: false,
      retentionAttempted: false,
      retentionSuccess: false,
      resignationComments: '',
      exitInterviewScheduled: false,
      acceptanceLetterSent: false,
      exitFormalitiesStarted: false,
      dailyTracker: [
        { date: formData.resignationDate, status: 'Resignation Submitted', completed: true }
      ]
    };

    setNoticePeriodCases(prev => [...prev, newCase]);
    setShowResignationModal(false);
    showNotification(`Resignation submitted for ${formData.employeeName}. Last Working Day: ${lastWorkingDay}`, 'success');
  };

  const handleBuyoutRequest = (formData) => {
    const calculatedAmount = calculateBuyoutAmount(formData.monthlySalary, parseInt(formData.daysToBuyout));
    
    const newRequest = {
      id: buyoutRequests.length + 1,
      ...formData,
      buyoutAmount: formatCurrency(calculatedAmount),
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      approvalLevel: 'Manager',
      calculatedAmount: formatCurrency(calculatedAmount),
      approvedByManager: false,
      approvedByHR: false,
      approvedByFinance: false
    };

    setBuyoutRequests(prev => [...prev, newRequest]);
    
    // Update employee record
    setNoticePeriodCases(prev => prev.map(emp => 
      emp.employeeId === formData.employeeId 
        ? { ...emp, buyoutRequested: true }
        : emp
    ));
    
    setShowBuyoutModal(false);
    showNotification(`Buyout request submitted for ${formData.employeeName}. Amount: ${formatCurrency(calculatedAmount)}`, 'success');
  };

  const handleWaiverRequest = (formData) => {
    const newRequest = {
      id: waiverRequests.length + 1,
      ...formData,
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      approvedByManager: false,
      approvedByHR: false,
      approvedByDirector: false
    };

    setWaiverRequests(prev => [...prev, newRequest]);
    
    // Update employee record
    setNoticePeriodCases(prev => prev.map(emp => 
      emp.employeeId === formData.employeeId 
        ? { ...emp, waiverRequested: true }
        : emp
    ));
    
    setShowWaiverModal(false);
    showNotification(`Waiver request submitted for ${formData.employeeName}`, 'success');
  };

  const handleWaiverApprove = (id) => {
    setWaiverRequests(prev => prev.map(req => 
      req.id === id 
        ? { 
            ...req, 
            status: 'Approved',
            approvedByManager: true,
            approvedByHR: true,
            approvedByDirector: true
          }
        : req
    ));
    
    // Update employee last working day if waiver reduces notice period
    const waiver = waiverRequests.find(w => w.id === id);
    if (waiver) {
      const employee = noticePeriodCases.find(e => e.employeeId === waiver.employeeId);
      if (employee) {
        const newLWD = new Date(employee.lastWorkingDay);
        newLWD.setDate(newLWD.getDate() - waiver.waiverDays);
        const updatedEmployee = {
          ...employee,
          lastWorkingDay: newLWD.toISOString().split('T')[0],
          daysRemaining: calculateDaysRemaining(newLWD.toISOString().split('T')[0])
        };
        setNoticePeriodCases(prev => prev.map(e => 
          e.id === employee.id ? updatedEmployee : e
        ));
      }
    }
    
    showNotification('Waiver request approved and notice period updated', 'success');
  };

  const handleWaiverReject = (id) => {
    setWaiverRequests(prev => prev.map(req => 
      req.id === id 
        ? { ...req, status: 'Rejected' }
        : req
    ));
    showNotification('Waiver request rejected', 'warning');
  };

  const handleCounterOffer = (formData) => {
    const hikePercentage = ((parseInt(formData.offeredSalary.replace(/[^0-9]/g, '')) - 
                            parseInt(formData.currentSalary.replace(/[^0-9]/g, ''))) / 
                            parseInt(formData.currentSalary.replace(/[^0-9]/g, ''))) * 100;
    
    const newOffer = {
      id: counterOffers.length + 1,
      ...formData,
      salaryHike: `${Math.round(hikePercentage)}%`,
      status: 'Pending',
      decisionDate: null,
      retentionProbability: `${Math.min(90, Math.round(hikePercentage * 2))}%`,
      managerApproved: false,
      hrApproved: false,
      counterOfferDate: new Date().toISOString().split('T')[0]
    };

    setCounterOffers(prev => [...prev, newOffer]);
    
    // Update employee record
    setNoticePeriodCases(prev => prev.map(emp => 
      emp.employeeId === formData.employeeId 
        ? { 
            ...emp, 
            counterOfferStatus: 'Pending',
            retentionAttempted: true 
          }
        : emp
    ));
    
    setShowCounterOfferModal(false);
    showNotification(`Counter offer submitted for ${formData.employeeName} with ${Math.round(hikePercentage)}% hike`, 'success');
  };

  const handleCounterOfferApprove = (id) => {
    setCounterOffers(prev => prev.map(offer => 
      offer.id === id 
        ? { 
            ...offer, 
            status: 'Accepted',
            decisionDate: new Date().toISOString().split('T')[0],
            managerApproved: true,
            hrApproved: true
          }
        : offer
    ));
    
    // Update employee status if counter offer accepted
    const offer = counterOffers.find(c => c.id === id);
    if (offer) {
      setNoticePeriodCases(prev => prev.map(emp => 
        emp.employeeId === offer.employeeId 
          ? { 
              ...emp, 
              counterOfferStatus: 'Accepted',
              retentionSuccess: true,
              status: 'Withdrawn' // Employee stays
            }
          : emp
      ));
    }
    
    showNotification('Counter offer accepted and employee retention successful', 'success');
  };

  const handleCounterOfferReject = (id) => {
    setCounterOffers(prev => prev.map(offer => 
      offer.id === id 
        ? { 
            ...offer, 
            status: 'Rejected',
            decisionDate: new Date().toISOString().split('T')[0]
          }
        : offer
    ));
    showNotification('Counter offer rejected', 'warning');
  };

  const handleExtensionRequest = (formData) => {
    const currentLWD = new Date(formData.currentLWD);
    const requestedLWD = new Date(formData.requestedLWD);
    const extensionDays = Math.ceil((requestedLWD - currentLWD) / (1000 * 60 * 60 * 24));
    
    const newRequest = {
      id: extensionRequests.length + 1,
      ...formData,
      extensionDays,
      status: 'Pending',
      managerApproval: 'Pending',
      hrApproval: 'Pending',
      approvedByManager: false,
      approvedByHR: false
    };

    setExtensionRequests(prev => [...prev, newRequest]);
    
    // Update employee record
    setNoticePeriodCases(prev => prev.map(emp => 
      emp.employeeId === formData.employeeId 
        ? { 
            ...emp, 
            extensionRequested: true,
            lastWorkingDay: formData.requestedLWD,
            daysRemaining: calculateDaysRemaining(formData.requestedLWD)
          }
        : emp
    ));
    
    setShowExtensionModal(false);
    showNotification(`Extension request submitted for ${formData.employeeName}. New LWD: ${formData.requestedLWD}`, 'success');
  };

  const handleExtensionApprove = (id) => {
    setExtensionRequests(prev => prev.map(req => 
      req.id === id 
        ? { 
            ...req, 
            status: 'Approved',
            managerApproval: 'Approved',
            hrApproval: 'Approved',
            approvedByManager: true,
            approvedByHR: true
          }
        : req
    ));
    showNotification('Extension request approved', 'success');
  };

  const handleExtensionReject = (id) => {
    setExtensionRequests(prev => prev.map(req => 
      req.id === id 
        ? { 
            ...req, 
            status: 'Rejected',
            managerApproval: 'Rejected',
            hrApproval: 'Rejected'
          }
        : req
    ));
    
    // Revert employee last working day if extension was already applied
    const extension = extensionRequests.find(e => e.id === id);
    if (extension) {
      const employee = noticePeriodCases.find(e => e.employeeId === extension.employeeId);
      if (employee) {
        setNoticePeriodCases(prev => prev.map(e => 
          e.id === employee.id 
            ? { 
                ...e, 
                lastWorkingDay: extension.currentLWD,
                daysRemaining: calculateDaysRemaining(extension.currentLWD)
              }
            : e
        ));
      }
    }
    
    showNotification('Extension request rejected', 'warning');
  };

  const handleSendAcceptanceLetter = () => {
    if (selectedEmployee) {
      const updatedCases = noticePeriodCases.map(caseItem => 
        caseItem.id === selectedEmployee.id 
          ? { ...caseItem, acceptanceLetterSent: true }
          : caseItem
      );
      setNoticePeriodCases(updatedCases);
      setShowAcceptanceModal(false);
      showNotification(`Acceptance letter sent to ${selectedEmployee.employeeName}`, 'success');
    }
  };

  const handleManagerAcknowledgment = (caseId) => {
    const updatedCases = noticePeriodCases.map(caseItem => 
      caseItem.id === caseId 
        ? { 
            ...caseItem, 
            managerAcknowledged: true,
            managerAckDate: new Date().toISOString().split('T')[0]
          }
        : caseItem
    );
    setNoticePeriodCases(updatedCases);
    showNotification('Manager acknowledgment recorded', 'success');
  };

  const handleScheduleHRInterview = (caseId, date) => {
    const updatedCases = noticePeriodCases.map(caseItem => 
      caseItem.id === caseId 
        ? { ...caseItem, hrInterviewScheduled: date }
        : caseItem
    );
    setNoticePeriodCases(updatedCases);
    setShowHRInterviewModal(false);
    showNotification(`HR Interview scheduled for ${date}`, 'success');
  };

  const handleStartExitFormalities = (caseId) => {
    const updatedCases = noticePeriodCases.map(caseItem => 
      caseItem.id === caseId 
        ? { ...caseItem, exitFormalitiesStarted: true }
        : caseItem
    );
    setNoticePeriodCases(updatedCases);
    setShowExitFormalitiesModal(false);
    showNotification('Exit formalities started', 'success');
  };

  const handleRetentionConversation = (caseId) => {
    const updatedCases = noticePeriodCases.map(caseItem => 
      caseItem.id === caseId 
        ? { ...caseItem, retentionAttempted: true }
        : caseItem
    );
    setNoticePeriodCases(updatedCases);
    setShowRetentionModal(false);
    showNotification('Retention conversation recorded', 'success');
  };

  const handleExportReports = () => {
    const data = {
      noticePeriodCases,
      buyoutRequests,
      waiverRequests,
      counterOffers,
      extensionRequests,
      statistics,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notice-period-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(false);
    showNotification('Report exported successfully', 'success');
  };

  const handlePrintReport = () => {
    window.print();
    showNotification('Printing report...', 'info');
  };

  const handleSendReminders = () => {
    const pendingCases = noticePeriodCases.filter(c => 
      c.status === 'Active' && !c.managerAcknowledged
    );
    
    if (pendingCases.length > 0) {
      showNotification(`Reminders sent to ${pendingCases.length} managers`, 'info');
    } else {
      showNotification('No pending acknowledgments', 'info');
    }
  };

  const handleRefreshData = () => {
    showNotification('Data refreshed successfully', 'success');
  };

  // Calculator handler
  const handleCalculatorChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ==================== MODAL COMPONENTS ====================

  const ResignationSubmissionModal = () => {
    const [formData, setFormData] = useState({
      employeeId: '',
      employeeName: '',
      department: '',
      role: '',
      resignationDate: new Date().toISOString().split('T')[0],
      noticePeriod: '60',
      resignationReason: '',
      comments: '',
      managerEmail: '',
      submissionMethod: 'online'
    });

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                <FileText className="me-2" />
                Online Resignation Submission
              </h5>
              <button className="btn-close" onClick={() => setShowResignationModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Employee ID *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    required
                    placeholder="EMPXXX"
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Employee Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.employeeName}
                    onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Department *</label>
                  <select
                    className="form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Role *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Resignation Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.resignationDate}
                    onChange={(e) => setFormData({...formData, resignationDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Notice Period *</label>
                  <select
                    className="form-select"
                    value={formData.noticePeriod}
                    onChange={(e) => setFormData({...formData, noticePeriod: e.target.value})}
                    required
                  >
                    <option value="30">30 Days</option>
                    <option value="45">45 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Resignation Reason *</label>
                <select
                  className="form-select"
                  value={formData.resignationReason}
                  onChange={(e) => setFormData({...formData, resignationReason: e.target.value})}
                  required
                >
                  <option value="">Select Reason</option>
                  {resignationReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Additional Comments</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.comments}
                  onChange={(e) => setFormData({...formData, comments: e.target.value})}
                  placeholder="Provide additional details or feedback..."
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Reporting Manager Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.managerEmail}
                  onChange={(e) => setFormData({...formData, managerEmail: e.target.value})}
                  required
                  placeholder="manager@company.com"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowResignationModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleResignationSubmit(formData)}
                disabled={!formData.employeeId || !formData.employeeName || !formData.department || 
                         !formData.role || !formData.resignationReason || !formData.managerEmail}
              >
                <Send className="me-2" size={16} />
                Submit Resignation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BuyoutRequestModal = () => {
    const [formData, setFormData] = useState({
      employeeId: '',
      employeeName: '',
      department: '',
      monthlySalary: '',
      daysToBuyout: '',
      reason: '',
      urgency: 'Normal'
    });

    const calculatedAmount = formData.monthlySalary && formData.daysToBuyout 
      ? calculateBuyoutAmount(formData.monthlySalary, parseInt(formData.daysToBuyout))
      : 0;

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                <DollarSign className="me-2" />
                Notice Period Buyout Request
              </h5>
              <button className="btn-close" onClick={() => setShowBuyoutModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-info">
                <strong>AI Calculation:</strong> Buyout amount = (Monthly Salary ÷ 30) × Days to Buyout
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Employee *</label>
                <select
                  className="form-select"
                  value={formData.employeeId}
                  onChange={(e) => {
                    const employee = noticePeriodCases.find(c => c.employeeId === e.target.value);
                    setFormData({
                      ...formData,
                      employeeId: e.target.value,
                      employeeName: employee?.employeeName || '',
                      department: employee?.department || ''
                    });
                  }}
                  required
                >
                  <option value="">Select Employee</option>
                  {noticePeriodCases.filter(c => c.status === 'Active').map(employee => (
                    <option key={employee.id} value={employee.employeeId}>
                      {employee.employeeName} ({employee.employeeId}) - {employee.department}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Monthly Salary (₹) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.monthlySalary}
                    onChange={(e) => setFormData({...formData, monthlySalary: e.target.value})}
                    required
                    placeholder="₹1,50,000"
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Days to Buyout *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.daysToBuyout}
                    onChange={(e) => setFormData({...formData, daysToBuyout: e.target.value})}
                    required
                    placeholder="30"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Reason for Buyout *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  required
                  placeholder="Explain why buyout is required..."
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Urgency Level</label>
                <select
                  className="form-select"
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                >
                  <option value="Normal">Normal (7 days approval)</option>
                  <option value="High">High (3 days approval)</option>
                  <option value="Urgent">Urgent (24 hours approval)</option>
                </select>
              </div>
              
              <div className="card border">
                <div className="card-body">
                  <h6 className="card-title">Buyout Summary</h6>
                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted">Calculated Amount</small>
                      <div className="h4 fw-bold text-success">{formatCurrency(calculatedAmount)}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Approval Workflow</small>
                      <div>
                        <span className="badge bg-secondary me-1">Manager</span>
                        <span className="badge bg-secondary me-1">HR</span>
                        <span className="badge bg-secondary">Finance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowBuyoutModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleBuyoutRequest(formData)}
                disabled={!formData.employeeId || !formData.monthlySalary || !formData.daysToBuyout || !formData.reason}
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const WaiverRequestModal = () => {
    const [formData, setFormData] = useState({
      employeeId: '',
      employeeName: '',
      department: '',
      waiverDays: '',
      waiverReason: '',
      waiverDetails: '',
      supportingDocs: []
    });

    const [docName, setDocName] = useState('');

    const addDocument = () => {
      if (docName.trim()) {
        setFormData(prev => ({
          ...prev,
          supportingDocs: [...prev.supportingDocs, `${docName}.pdf`]
        }));
        setDocName('');
      }
    };

    const removeDocument = (index) => {
      setFormData(prev => ({
        ...prev,
        supportingDocs: prev.supportingDocs.filter((_, i) => i !== index)
      }));
    };

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                <Shield className="me-2" />
                Notice Period Waiver Request
              </h5>
              <button className="btn-close" onClick={() => setShowWaiverModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-warning">
                <AlertCircle className="me-2" size={20} />
                <strong>Note:</strong> Waiver requests require director-level approval and valid supporting documents.
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Employee *</label>
                <select
                  className="form-select"
                  value={formData.employeeId}
                  onChange={(e) => {
                    const employee = noticePeriodCases.find(c => c.employeeId === e.target.value);
                    setFormData({
                      ...formData,
                      employeeId: e.target.value,
                      employeeName: employee?.employeeName || '',
                      department: employee?.department || ''
                    });
                  }}
                  required
                >
                  <option value="">Select Employee</option>
                  {noticePeriodCases.filter(c => c.status === 'Active').map(employee => (
                    <option key={employee.id} value={employee.employeeId}>
                      {employee.employeeName} ({employee.employeeId}) - {employee.department}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Waiver Days *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.waiverDays}
                    onChange={(e) => setFormData({...formData, waiverDays: e.target.value})}
                    required
                    min="1"
                    max="90"
                    placeholder="Number of days to waive"
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Waiver Reason *</label>
                  <select
                    className="form-select"
                    value={formData.waiverReason}
                    onChange={(e) => setFormData({...formData, waiverReason: e.target.value})}
                    required
                  >
                    <option value="">Select Reason</option>
                    <option value="Higher studies">Higher studies</option>
                    <option value="Medical emergency">Medical emergency</option>
                    <option value="Family emergency">Family emergency</option>
                    <option value="Relocation">Relocation</option>
                    <option value="Personal reasons">Personal reasons</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Waiver Details *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.waiverDetails}
                  onChange={(e) => setFormData({...formData, waiverDetails: e.target.value})}
                  required
                  placeholder="Provide detailed explanation for waiver request..."
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Supporting Documents</label>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="Document name (without extension)"
                  />
                  <button 
                    className="btn btn-outline-primary" 
                    type="button"
                    onClick={addDocument}
                  >
                    Add Document
                  </button>
                </div>
                
                {formData.supportingDocs.length > 0 ? (
                  <div className="card border">
                    <div className="card-body">
                      <h6 className="card-title">Uploaded Documents</h6>
                      <ul className="list-group list-group-flush">
                        {formData.supportingDocs.map((doc, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                              <FileText size={14} className="me-2" />
                              {doc}
                            </span>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeDocument(index)}
                            >
                              <X size={12} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    <Info size={16} className="me-2" />
                    Add supporting documents for waiver approval
                  </div>
                )}
              </div>
              
              <div className="card border">
                <div className="card-body">
                  <h6 className="card-title">Approval Workflow</h6>
                  <div className="d-flex justify-content-between">
                    <div className="text-center">
                      <div className={`badge ${formData.employeeId ? 'bg-primary' : 'bg-secondary'} p-2 mb-1`}>
                        Manager
                      </div>
                      <div className="small">Level 1</div>
                    </div>
                    <div className="text-center">
                      <div className="badge bg-secondary p-2 mb-1">HR Head</div>
                      <div className="small">Level 2</div>
                    </div>
                    <div className="text-center">
                      <div className="badge bg-secondary p-2 mb-1">Director</div>
                      <div className="small">Level 3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowWaiverModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-warning" 
                onClick={() => handleWaiverRequest(formData)}
                disabled={!formData.employeeId || !formData.waiverDays || !formData.waiverReason || !formData.waiverDetails}
              >
                Submit Waiver Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CounterOfferModal = () => {
    const [formData, setFormData] = useState({
      employeeId: '',
      employeeName: '',
      department: '',
      currentSalary: '',
      offeredSalary: '',
      offeredRole: '',
      additionalBenefits: '',
      notes: ''
    });

    const hikePercentage = formData.currentSalary && formData.offeredSalary 
      ? ((parseInt(formData.offeredSalary.replace(/[^0-9]/g, '')) - 
         parseInt(formData.currentSalary.replace(/[^0-9]/g, ''))) / 
         parseInt(formData.currentSalary.replace(/[^0-9]/g, ''))) * 100
      : 0;

    const retentionProbability = Math.min(95, Math.max(30, Math.round(hikePercentage * 2)));

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                <Percent className="me-2" />
                Counter Offer Proposal
              </h5>
              <button className="btn-close" onClick={() => setShowCounterOfferModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-info">
                <TrendingUp className="me-2" size={20} />
                <strong>AI Prediction:</strong> {hikePercentage > 0 ? `${retentionProbability}% retention probability` : 'Enter salary details'}
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Employee *</label>
                <select
                  className="form-select"
                  value={formData.employeeId}
                  onChange={(e) => {
                    const employee = noticePeriodCases.find(c => c.employeeId === e.target.value);
                    setFormData({
                      ...formData,
                      employeeId: e.target.value,
                      employeeName: employee?.employeeName || '',
                      department: employee?.department || ''
                    });
                  }}
                  required
                >
                  <option value="">Select Employee</option>
                  {noticePeriodCases.filter(c => c.status === 'Active' && c.counterOfferStatus !== 'Accepted').map(employee => (
                    <option key={employee.id} value={employee.employeeId}>
                      {employee.employeeName} ({employee.employeeId}) - {employee.department}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Current Salary (₹) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.currentSalary}
                    onChange={(e) => setFormData({...formData, currentSalary: e.target.value})}
                    required
                    placeholder="₹14,40,000"
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Offered Salary (₹) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.offeredSalary}
                    onChange={(e) => setFormData({...formData, offeredSalary: e.target.value})}
                    required
                    placeholder="₹18,00,000"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Offered Role/Position *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.offeredRole}
                  onChange={(e) => setFormData({...formData, offeredRole: e.target.value})}
                  required
                  placeholder="e.g., Senior Manager, Tech Lead"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Additional Benefits</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.additionalBenefits}
                  onChange={(e) => setFormData({...formData, additionalBenefits: e.target.value})}
                  placeholder="Stock options, bonus, flexible hours, remote work, etc."
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Notes & Strategy</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Retention strategy, key points to discuss, timing, etc."
                />
              </div>
              
              <div className="card border">
                <div className="card-body">
                  <h6 className="card-title">Counter Offer Summary</h6>
                  <div className="row">
                    <div className="col-4">
                      <small className="text-muted">Salary Hike</small>
                      <div className={`h4 fw-bold ${hikePercentage > 0 ? 'text-success' : 'text-muted'}`}>
                        {hikePercentage > 0 ? `${Math.round(hikePercentage)}%` : '--'}
                      </div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">Retention Probability</small>
                      <div className={`h4 fw-bold ${retentionProbability > 70 ? 'text-success' : retentionProbability > 50 ? 'text-warning' : 'text-danger'}`}>
                        {hikePercentage > 0 ? `${retentionProbability}%` : '--'}
                      </div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">Approval Required</small>
                      <div className="d-flex flex-column">
                        <span className="badge bg-secondary mb-1">Manager</span>
                        <span className="badge bg-secondary">HR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowCounterOfferModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleCounterOffer(formData)}
                disabled={!formData.employeeId || !formData.currentSalary || !formData.offeredSalary || !formData.offeredRole}
              >
                Create Counter Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ExtensionRequestModal = () => {
    const [formData, setFormData] = useState({
      employeeId: '',
      employeeName: '',
      department: '',
      currentLWD: '',
      requestedLWD: '',
      extensionReason: '',
      extensionDetails: ''
    });

    const extensionDays = formData.currentLWD && formData.requestedLWD 
      ? Math.ceil((new Date(formData.requestedLWD) - new Date(formData.currentLWD)) / (1000 * 60 * 60 * 24))
      : 0;

    useEffect(() => {
      if (formData.employeeId) {
        const employee = noticePeriodCases.find(c => c.employeeId === formData.employeeId);
        if (employee) {
          setFormData(prev => ({
            ...prev,
            currentLWD: employee.lastWorkingDay,
            employeeName: employee.employeeName,
            department: employee.department
          }));
        }
      }
    }, [formData.employeeId]);

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                <CalendarDays className="me-2" />
                Notice Period Extension Request
              </h5>
              <button className="btn-close" onClick={() => setShowExtensionModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-info">
                <Calendar className="me-2" size={20} />
                <strong>Note:</strong> Extension requests should have valid business reasons and project requirements.
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Employee *</label>
                <select
                  className="form-select"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  required
                >
                  <option value="">Select Employee</option>
                  {noticePeriodCases.filter(c => c.status === 'Active').map(employee => (
                    <option key={employee.id} value={employee.employeeId}>
                      {employee.employeeName} ({employee.employeeId}) - {employee.department}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Current Last Working Day *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.currentLWD}
                    onChange={(e) => setFormData({...formData, currentLWD: e.target.value})}
                    required
                    disabled
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Requested Last Working Day *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.requestedLWD}
                    onChange={(e) => setFormData({...formData, requestedLWD: e.target.value})}
                    required
                    min={formData.currentLWD}
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Extension Reason *</label>
                <select
                  className="form-select"
                  value={formData.extensionReason}
                  onChange={(e) => setFormData({...formData, extensionReason: e.target.value})}
                  required
                >
                  <option value="">Select Reason</option>
                  <option value="Project handover">Project handover</option>
                  <option value="Client request">Client request</option>
                  <option value="Knowledge transfer">Knowledge transfer</option>
                  <option value="Critical timeline">Critical timeline</option>
                  <option value="Successor training">Successor training</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Extension Details *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.extensionDetails}
                  onChange={(e) => setFormData({...formData, extensionDetails: e.target.value})}
                  required
                  placeholder="Detailed explanation of why extension is required..."
                />
              </div>
              
              <div className="card border">
                <div className="card-body">
                  <h6 className="card-title">Extension Summary</h6>
                  <div className="row">
                    <div className="col-4">
                      <small className="text-muted">Extension Days</small>
                      <div className={`h4 fw-bold ${extensionDays > 0 ? 'text-primary' : 'text-muted'}`}>
                        {extensionDays > 0 ? `${extensionDays} days` : '--'}
                      </div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">New Notice Period</small>
                      <div className="fw-bold">
                        {formData.employeeId && extensionDays > 0 ? 
                          `${noticePeriodCases.find(e => e.employeeId === formData.employeeId)?.noticePeriodDays + extensionDays} days` : 
                          '--'
                        }
                      </div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">Approval Required</small>
                      <div className="d-flex flex-column">
                        <span className="badge bg-secondary mb-1">Manager</span>
                        <span className="badge bg-secondary">HR</span>
                      </div>
                    </div>
                  </div>
                  {extensionDays > 30 && (
                    <div className="alert alert-warning mt-2 mb-0">
                      <AlertCircle size={16} className="me-1" />
                      Extensions over 30 days require additional justification and director approval.
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowExtensionModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-info" 
                onClick={() => handleExtensionRequest(formData)}
                disabled={!formData.employeeId || !formData.currentLWD || !formData.requestedLWD || !formData.extensionReason || !formData.extensionDetails}
              >
                Submit Extension Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AcceptanceLetterModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                <FileCheck className="me-2" />
                Send Resignation Acceptance Letter
              </h5>
              <button className="btn-close" onClick={() => setShowAcceptanceModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-success">
                <CheckCircle className="me-2" size={20} />
                This will send an official resignation acceptance letter to {selectedEmployee?.employeeName}
              </div>
              
              <div className="card mb-3">
                <div className="card-body">
                  <h6>Letter Preview:</h6>
                  <div className="border p-3 bg-light rounded">
                    <p className="mb-2">Date: {new Date().toLocaleDateString()}</p>
                    <p className="mb-2">To: {selectedEmployee?.employeeName}</p>
                    <p className="mb-2">Employee ID: {selectedEmployee?.employeeId}</p>
                    <p className="mb-2">Department: {selectedEmployee?.department}</p>
                    <p className="mb-2">Subject: Acceptance of Resignation</p>
                    <p className="mb-2">
                      This letter is to formally acknowledge and accept your resignation submitted on {selectedEmployee?.resignationDate}. 
                      Your last working day will be {selectedEmployee?.lastWorkingDay}.
                    </p>
                    <p>Please complete all exit formalities before your last working day.</p>
                    <p className="mt-3">Sincerely,<br/>HR Department</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowAcceptanceModal(false)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSendAcceptanceLetter}>
                <Send className="me-2" size={16} />
                Send Acceptance Letter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ExportModal = () => {
    const [exportFormat, setExportFormat] = useState('json');
    const [includeData, setIncludeData] = useState({
      cases: true,
      requests: true,
      statistics: true,
      analytics: true
    });

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">
                <Download className="me-2" />
                Export Reports
              </h5>
              <button className="btn-close" onClick={() => setShowExportModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Export Format</label>
                <div className="d-flex gap-3">
                  {['json', 'csv', 'pdf', 'excel'].map(format => (
                    <div key={format} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exportFormat"
                        id={format}
                        checked={exportFormat === format}
                        onChange={() => setExportFormat(format)}
                      />
                      <label className="form-check-label" htmlFor={format}>
                        {format.toUpperCase()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Include Data</label>
                <div className="row">
                  {Object.entries(includeData).map(([key, value]) => (
                    <div key={key} className="col-6 mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setIncludeData(prev => ({
                            ...prev,
                            [key]: e.target.checked
                          }))}
                          id={`include-${key}`}
                        />
                        <label className="form-check-label" htmlFor={`include-${key}`}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card border">
                <div className="card-body">
                  <h6>Export Summary</h6>
                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted">Format</small>
                      <div className="fw-bold">{exportFormat.toUpperCase()}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Items Included</small>
                      <div className="fw-bold">
                        {Object.values(includeData).filter(v => v).length} / 4
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowExportModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleExportReports}>
                <Download className="me-2" size={16} />
                Export Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== MAIN COMPONENT ====================
  const mainContent = (
    <div className="container-fluid px-3 px-md-4 py-3">
      {/* Header - Changed h4 to h5 for smaller size */}
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h5 className="fw-bold mb-2">Notice Period Tracking & Management</h5>
            <p className="text-muted mb-0">
              <Bot size={16} className="me-2 text-primary" />
              AI-powered resignation workflow with predictive analytics and automated processing
            </p>
          </div>
          
          <div className="d-flex flex-wrap gap-2">
            <button 
              className="btn btn-primary d-flex align-items-center gap-2" 
              onClick={() => setShowResignationModal(true)}
            >
              <FileText size={16} />
              <span>Submit Resignation</span>
            </button>
            <button 
              className="btn btn-outline-primary d-flex align-items-center gap-2"
              onClick={() => setShowExportModal(true)}
            >
              <Download size={16} />
              <span>Export Reports</span>
            </button>
            <button 
              className="btn btn-outline-secondary d-flex align-items-center gap-2"
              onClick={handlePrintReport}
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* AI Status Bar */}
        <div className="p-3 bg-primary bg-opacity-10 rounded mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="spinner-grow spinner-grow-sm text-success" role="status"></div>
                  <span className="fw-medium">AI System Active</span>
                </div>
                <div className="vr"></div>
                <span className="text-muted small">Processing real-time analytics</span>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center gap-3 justify-content-end">
                <span className="badge bg-success bg-opacity-10 text-success">
                  <Zap size={12} className="me-1" />
                  95% Prediction Accuracy
                </span>
                <span className="badge bg-info bg-opacity-10 text-info">
                  <Sparkles size={12} className="me-1" />
                  Auto-processing Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Active Cases</div>
                <div className="h3 mb-0 fw-bold text-primary">{statistics.totalActiveCases}</div>
              </div>
              <Clock size={24} className="text-primary opacity-75" />
            </div>
            <div className="small text-success mt-2">
              <TrendingUp size={12} className="me-1" />
              +{statistics.weekResignations} this week
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Pending Approvals</div>
                <div className="h3 mb-0 fw-bold text-warning">
                  {statistics.pendingBuyout + statistics.pendingWaiver + statistics.pendingManagerAck}
                </div>
              </div>
              <AlertCircle size={24} className="text-warning opacity-75" />
            </div>
            <div className="small text-warning mt-2">Requires attention</div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">AI Time Saved</div>
                <div className="h3 mb-0 fw-bold text-success">{statistics.timeSaved}</div>
              </div>
              <Zap size={24} className="text-success opacity-75" />
            </div>
            <div className="small text-muted mt-2">Through automation</div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Retention Success</div>
                <div className="h3 mb-0 fw-bold text-info">{statistics.retentionSuccess}</div>
              </div>
              <TrendingUp size={24} className="text-info opacity-75" />
            </div>
            <div className="small text-success mt-2">{aiPredictions.retentionSuccessRate} success rate</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {[
            { key: 'dashboard', label: 'AI Dashboard', icon: <BarChart3 size={16} /> },
            { key: 'cases', label: 'Active Cases', icon: <Users size={16} /> },
            { key: 'buyout', label: 'Buyout Requests', icon: <DollarSign size={16} /> },
            { key: 'waiver', label: 'Waiver Requests', icon: <Shield size={16} /> },
            { key: 'counter', label: 'Counter Offers', icon: <Percent size={16} /> },
            { key: 'extension', label: 'Extension Requests', icon: <CalendarDays size={16} /> },
            { key: 'workflow', label: 'Resignation Workflow', icon: <Zap size={16} /> },
            { key: 'calculators', label: 'Calculators', icon: <Calculator size={16} /> }
          ].map(section => (
            <button
              key={section.key}
              className={`btn ${activeSection === section.key ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center gap-2`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search employees, departments, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-primary">
                <Filter size={16} className="me-2" />
                AI Filter
              </button>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={handleRefreshData}
              >
                <RefreshCw size={16} />
              </button>
              <button 
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={() => setShowSettingsModal(true)}
              >
                <Settings size={16} />
              </button>
              <button 
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={() => setShowReminderModal(true)}
              >
                <Bell size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calculators Section */}
      {activeSection === 'calculators' && (
        <div className="row g-4">
          {/* Last Working Day Calculator */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h6 className="fw-bold mb-0">
                  <Calculator className="me-2" />
                  Last Working Day Calculator
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Resignation Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={calculatorData.resignationDate}
                    onChange={(e) => setCalculatorData({...calculatorData, resignationDate: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Notice Period (Days) *</label>
                  <select 
                    className="form-select" 
                    value={calculatorData.noticePeriod}
                    onChange={(e) => setCalculatorData({...calculatorData, noticePeriod: e.target.value})}
                  >
                    <option value="30">30 Days</option>
                    <option value="45">45 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                  </select>
                </div>
                <button className="btn btn-primary w-100" onClick={handleCalculateLWD}>
                  Calculate LWD
                </button>
                {calculatorResults.lwdResult && (
                  <div className="mt-3 alert alert-success">
                    <Calendar className="me-2" size={16} />
                    <strong>{calculatorResults.lwdResult}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Buyout Calculator */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-success text-white">
                <h6 className="fw-bold mb-0">
                  <DollarSign className="me-2" />
                  Buyout Calculator
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Monthly Salary (₹) *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="₹1,50,000"
                    value={calculatorData.monthlySalary}
                    onChange={(e) => setCalculatorData({...calculatorData, monthlySalary: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Days to Buyout *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="30"
                    value={calculatorData.buyoutDays}
                    onChange={(e) => setCalculatorData({...calculatorData, buyoutDays: e.target.value})}
                  />
                </div>
                <button className="btn btn-success w-100" onClick={handleCalculateBuyout}>
                  Calculate Buyout
                </button>
                {calculatorResults.buyoutResult && (
                  <div className="mt-3 alert alert-success">
                    <DollarSign className="me-2" size={16} />
                    <strong>{calculatorResults.buyoutResult}</strong>
                  </div>
                )}
                <div className="mt-2 small text-muted">
                  Formula: (Monthly Salary ÷ 30) × Days to Buyout
                </div>
              </div>
            </div>
          </div>
          
          {/* Extension Calculator */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-info text-white">
                <h6 className="fw-bold mb-0">
                  <CalendarDays className="me-2" />
                  Extension Calculator
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Current Last Working Day *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={calculatorData.currentLWD}
                    onChange={(e) => setCalculatorData({...calculatorData, currentLWD: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Extension Days *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="15"
                    value={calculatorData.extensionDays}
                    onChange={(e) => setCalculatorData({...calculatorData, extensionDays: e.target.value})}
                  />
                </div>
                <button className="btn btn-info w-100 text-white" onClick={handleCalculateExtension}>
                  Calculate Extension
                </button>
                {calculatorResults.extensionResult && (
                  <div className="mt-3 alert alert-info">
                    <CalendarDays className="me-2" size={16} />
                    <strong>{calculatorResults.extensionResult}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Days Remaining Calculator */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-warning text-dark">
                <h6 className="fw-bold mb-0">
                  <Clock className="me-2" />
                  Days Remaining Calculator
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Last Working Day *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={lwdDate}
                    onChange={(e) => setLwdDate(e.target.value)}
                  />
                </div>
                <button className="btn btn-warning w-100" onClick={handleCalculateDaysRemaining}>
                  Calculate Days Remaining
                </button>
                {calculatorResults.daysRemainingResult && (
                  <div className="mt-3 alert alert-warning">
                    <Clock className="me-2" size={16} />
                    <strong>{calculatorResults.daysRemainingResult}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Waiver Calculator */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-danger text-white">
                <h6 className="fw-bold mb-0">
                  <Shield className="me-2" />
                  Waiver Calculator
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Current Notice Period (Days) *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="60"
                    value={calculatorData.noticePeriod}
                    onChange={(e) => setCalculatorData({...calculatorData, noticePeriod: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Waiver Days Requested *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="15"
                    value={calculatorData.waiverDays}
                    onChange={(e) => setCalculatorData({...calculatorData, waiverDays: e.target.value})}
                  />
                </div>
                <button className="btn btn-danger w-100" onClick={handleCalculateWaiver}>
                  Calculate After Waiver
                </button>
                {calculatorResults.waiverResult && (
                  <div className="mt-3 alert alert-danger">
                    <Shield className="me-2" size={16} />
                    <strong>{calculatorResults.waiverResult}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shortfall Calculator */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-secondary text-white">
                <h6 className="fw-bold mb-0">
                  <Calculator className="me-2" />
                  Shortfall Calculator
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Required Notice Period (Days)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="60"
                    value={calculatorData.noticePeriod}
                    onChange={(e) => setCalculatorData({...calculatorData, noticePeriod: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Actual Service Days</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="45"
                    value={calculatorData.buyoutDays}
                    onChange={(e) => setCalculatorData({...calculatorData, buyoutDays: e.target.value})}
                  />
                </div>
                <button 
                  className="btn btn-secondary w-100" 
                  onClick={() => {
                    const shortfall = parseInt(calculatorData.noticePeriod) - parseInt(calculatorData.buyoutDays);
                    if (shortfall > 0) {
                      setShortfallAmount(shortfall);
                      showNotification(`Shortfall: ${shortfall} days`, 'info');
                    } else {
                      showNotification('No shortfall - service completed', 'success');
                    }
                  }}
                >
                  Calculate Shortfall
                </button>
                {shortfallAmount > 0 && (
                  <div className="mt-3 alert alert-secondary">
                    <AlertCircle className="me-2" size={16} />
                    <strong>Shortfall: {shortfallAmount} days</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h6 className="fw-bold mb-0">
                  <Info className="me-2" />
                  Calculator Quick Reference
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-primary rounded-circle p-2 me-3">
                        <Calculator size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="fw-bold">LWD Calculator</div>
                        <small className="text-muted">Resignation Date + Notice Period</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-success rounded-circle p-2 me-3">
                        <DollarSign size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="fw-bold">Buyout Calculator</div>
                        <small className="text-muted">(Monthly Salary ÷ 30) × Days</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-info rounded-circle p-2 me-3">
                        <CalendarDays size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="fw-bold">Extension Calculator</div>
                        <small className="text-muted">Current LWD + Extension Days</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Cases Section */}
      {activeSection === 'cases' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">Active Notice Period Cases</h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">{statistics.totalActiveCases} cases</span>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowResignationModal(true)}
                  >
                    <FileText size={14} className="me-1" />
                    Add New
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCases(noticePeriodCases.filter(c => c.status === 'Active').map(c => c.id));
                              } else {
                                setSelectedCases([]);
                              }
                            }}
                          />
                        </th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Resignation Date</th>
                        <th>Notice Period</th>
                        <th>Last Working Day</th>
                        <th>Days Left</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {noticePeriodCases.filter(c => c.status === 'Active').map(caseItem => {
                        const risk = getRiskLevel(caseItem.daysRemaining);
                        return (
                          <tr key={caseItem.id}>
                            <td>
                              <input 
                                type="checkbox" 
                                className="form-check-input"
                                checked={selectedCases.includes(caseItem.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCases(prev => [...prev, caseItem.id]);
                                  } else {
                                    setSelectedCases(prev => prev.filter(id => id !== caseItem.id));
                                  }
                                }}
                              />
                            </td>
                            <td>
                              <div className="fw-medium">{caseItem.employeeName}</div>
                              <small className="text-muted">{caseItem.employeeId}</small>
                            </td>
                            <td>
                              <span className="badge bg-info bg-opacity-10 text-info">{caseItem.department}</span>
                            </td>
                            <td>{caseItem.resignationDate}</td>
                            <td>
                              <span className="badge bg-light text-dark">{caseItem.noticePeriod}</span>
                            </td>
                            <td>{caseItem.lastWorkingDay}</td>
                            <td>
                              <div className={`fw-bold text-${risk.color}`}>
                                {caseItem.daysRemaining} days
                              </div>
                            </td>
                            <td>{getStatusBadge(caseItem.status)}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-outline-primary"
                                  onClick={() => {
                                    setSelectedEmployee(caseItem);
                                    setShowDetailsModal(true);
                                  }}
                                >
                                  <Eye size={12} />
                                </button>
                                <button 
                                  className="btn btn-outline-success"
                                  onClick={() => {
                                    setSelectedEmployee(caseItem);
                                    setShowAcceptanceModal(true);
                                  }}
                                  disabled={caseItem.acceptanceLetterSent}
                                >
                                  <FileCheck size={12} />
                                </button>
                                <button 
                                  className="btn btn-outline-warning"
                                  onClick={() => {
                                    setSelectedEmployee(caseItem);
                                    setShowRetentionModal(true);
                                  }}
                                >
                                  <MessageSquare size={12} />
                                </button>
                                <button 
                                  className="btn btn-outline-info"
                                  onClick={() => handleManagerAcknowledgment(caseItem.id)}
                                  disabled={caseItem.managerAcknowledged}
                                >
                                  <UserCheck size={12} />
                                </button>
                              </div>
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
      )}

      {/* Buyout Requests Section */}
      {activeSection === 'buyout' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <DollarSign className="me-2" />
                  Buyout Requests
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-warning">{statistics.pendingBuyout} pending</span>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowBuyoutModal(true)}
                  >
                    <DollarSign size={14} className="me-1" />
                    New Buyout Request
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Requested Date</th>
                        <th>Buyout Amount</th>
                        <th>Days to Buyout</th>
                        <th>Status</th>
                        <th>Approval Level</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyoutRequests.map(request => (
                        <tr key={request.id}>
                          <td>
                            <div className="fw-medium">{request.employeeName}</div>
                            <small className="text-muted">{request.employeeId}</small>
                          </td>
                          <td>{request.department}</td>
                          <td>{request.requestedDate}</td>
                          <td className="fw-bold text-success">{request.buyoutAmount}</td>
                          <td>{request.daysToBuyout}</td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <span className={`badge ${request.approvedByManager ? 'bg-success' : 'bg-secondary'}`}>M</span>
                              <span className={`badge ${request.approvedByHR ? 'bg-success' : 'bg-secondary'}`}>HR</span>
                              <span className={`badge ${request.approvedByFinance ? 'bg-success' : 'bg-secondary'}`}>F</span>
                            </div>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => handleWaiverApprove(request.id)}
                                disabled={request.status === 'Approved'}
                              >
                                <Check size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleWaiverReject(request.id)}
                                disabled={request.status === 'Rejected'}
                              >
                                <X size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  setSelectedEmployee(noticePeriodCases.find(c => c.employeeId === request.employeeId));
                                  setShowDetailsModal(true);
                                }}
                              >
                                <Eye size={12} />
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
        </div>
      )}

      {/* Waiver Requests Section */}
      {activeSection === 'waiver' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <Shield className="me-2" />
                  Notice Period Waiver Requests
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-warning">
                    {waiverRequests.filter(r => r.status === 'Pending').length} pending
                  </span>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => setShowWaiverModal(true)}
                  >
                    <Shield size={14} className="me-1" />
                    New Waiver Request
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Requested Date</th>
                        <th>Waiver Days</th>
                        <th>Reason</th>
                        <th>Documents</th>
                        <th>Status</th>
                        <th>Approvals</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waiverRequests.map(request => (
                        <tr key={request.id}>
                          <td>
                            <div className="fw-medium">{request.employeeName}</div>
                            <small className="text-muted">{request.employeeId}</small>
                          </td>
                          <td>{request.department}</td>
                          <td>{request.requestedDate}</td>
                          <td className="fw-bold">{request.waiverDays} days</td>
                          <td>
                            <div className="small text-truncate" style={{ maxWidth: '150px' }} title={request.reason}>
                              {request.reason}
                            </div>
                          </td>
                          <td>
                            {request.supportingDocs.length > 0 ? (
                              <span className="badge bg-info">
                                <FileText size={12} className="me-1" />
                                {request.supportingDocs.length} docs
                              </span>
                            ) : (
                              <span className="badge bg-secondary">No docs</span>
                            )}
                          </td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <span className={`badge ${request.approvedByManager ? 'bg-success' : 'bg-secondary'}`} title="Manager">M</span>
                              <span className={`badge ${request.approvedByHR ? 'bg-success' : 'bg-secondary'}`} title="HR">HR</span>
                              <span className={`badge ${request.approvedByDirector ? 'bg-success' : 'bg-secondary'}`} title="Director">D</span>
                            </div>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              {request.status === 'Pending' && (
                                <>
                                  <button 
                                    className="btn btn-outline-success"
                                    onClick={() => handleWaiverApprove(request.id)}
                                  >
                                    <Check size={12} />
                                  </button>
                                  <button 
                                    className="btn btn-outline-danger"
                                    onClick={() => handleWaiverReject(request.id)}
                                  >
                                    <X size={12} />
                                  </button>
                                </>
                              )}
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  const employee = noticePeriodCases.find(e => e.employeeId === request.employeeId);
                                  if (employee) {
                                    setSelectedEmployee(employee);
                                    setShowDetailsModal(true);
                                  }
                                }}
                              >
                                <Eye size={12} />
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
        </div>
      )}

      {/* Counter Offers Section */}
      {activeSection === 'counter' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <Percent className="me-2" />
                  Counter Offers & Retention
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">
                    {counterOffers.filter(o => o.status === 'Pending').length} pending
                  </span>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowCounterOfferModal(true)}
                  >
                    <Percent size={14} className="me-1" />
                    New Counter Offer
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Current Salary</th>
                        <th>Offered Salary</th>
                        <th>Hike %</th>
                        <th>Retention Probability</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {counterOffers.map(offer => (
                        <tr key={offer.id}>
                          <td>
                            <div className="fw-medium">{offer.employeeName}</div>
                            <small className="text-muted">{offer.employeeId}</small>
                            <div className="small text-muted">{offer.offeredRole}</div>
                          </td>
                          <td>{offer.department}</td>
                          <td className="fw-bold">{offer.currentSalary}</td>
                          <td className={`fw-bold ${offer.status === 'Accepted' ? 'text-success' : 'text-primary'}`}>
                            {offer.offeredSalary}
                          </td>
                          <td>
                            <span className={`badge ${parseFloat(offer.salaryHike) > 30 ? 'bg-success' : parseFloat(offer.salaryHike) > 20 ? 'bg-warning' : 'bg-info'}`}>
                              {offer.salaryHike}
                            </span>
                          </td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className={`progress-bar ${parseInt(offer.retentionProbability) > 70 ? 'bg-success' : parseInt(offer.retentionProbability) > 50 ? 'bg-warning' : 'bg-danger'}`}
                                style={{ width: `${offer.retentionProbability}` }}
                              >
                                {offer.retentionProbability}
                              </div>
                            </div>
                          </td>
                          <td>{getStatusBadge(offer.status)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              {offer.status === 'Pending' && (
                                <>
                                  <button 
                                    className="btn btn-outline-success"
                                    onClick={() => handleCounterOfferApprove(offer.id)}
                                  >
                                    <Check size={12} />
                                  </button>
                                  <button 
                                    className="btn btn-outline-danger"
                                    onClick={() => handleCounterOfferReject(offer.id)}
                                  >
                                    <X size={12} />
                                  </button>
                                </>
                              )}
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  const employee = noticePeriodCases.find(e => e.employeeId === offer.employeeId);
                                  if (employee) {
                                    setSelectedEmployee(employee);
                                    setShowDetailsModal(true);
                                  }
                                }}
                              >
                                <Eye size={12} />
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
        </div>
      )}

      {/* Extension Requests Section */}
      {activeSection === 'extension' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <CalendarDays className="me-2" />
                  Notice Period Extension Requests
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-info">
                    {extensionRequests.filter(r => r.status === 'Pending').length} pending
                  </span>
                  <button 
                    className="btn btn-info btn-sm"
                    onClick={() => setShowExtensionModal(true)}
                  >
                    <CalendarDays size={14} className="me-1" />
                    New Extension Request
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Current LWD</th>
                        <th>Requested LWD</th>
                        <th>Extension Days</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Approvals</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extensionRequests.map(request => (
                        <tr key={request.id}>
                          <td>
                            <div className="fw-medium">{request.employeeName}</div>
                            <small className="text-muted">{request.employeeId}</small>
                          </td>
                          <td>{request.department}</td>
                          <td>{request.currentLWD}</td>
                          <td className="fw-bold">{request.requestedLWD}</td>
                          <td>
                            <span className={`badge ${request.extensionDays > 30 ? 'bg-warning' : 'bg-primary'}`}>
                              {request.extensionDays} days
                            </span>
                          </td>
                          <td>
                            <div className="small text-truncate" style={{ maxWidth: '150px' }} title={request.reason}>
                              {request.reason}
                            </div>
                          </td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <span className={`badge ${request.approvedByManager ? 'bg-success' : 'bg-secondary'}`} title="Manager">M</span>
                              <span className={`badge ${request.approvedByHR ? 'bg-success' : 'bg-secondary'}`} title="HR">HR</span>
                            </div>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              {request.status === 'Pending' && (
                                <>
                                  <button 
                                    className="btn btn-outline-success"
                                    onClick={() => handleExtensionApprove(request.id)}
                                  >
                                    <Check size={12} />
                                  </button>
                                  <button 
                                    className="btn btn-outline-danger"
                                    onClick={() => handleExtensionReject(request.id)}
                                  >
                                    <X size={12} />
                                  </button>
                                </>
                              )}
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  const employee = noticePeriodCases.find(e => e.employeeId === request.employeeId);
                                  if (employee) {
                                    setSelectedEmployee(employee);
                                    setShowDetailsModal(true);
                                  }
                                }}
                              >
                                <Eye size={12} />
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
        </div>
      )}

      {/* Daily Countdown Tracker */}
      <div className="mt-4 pt-3 border-top">
        <h6 className="fw-bold mb-3">
          <Clock size={16} className="me-2" />
          Daily Countdown Tracker
        </h6>
        <div className="row g-3">
          {noticePeriodCases.filter(c => c.status === 'Active').map(caseItem => {
            const risk = getRiskLevel(caseItem.daysRemaining);
            return (
              <div key={caseItem.id} className="col-12 col-md-6 col-lg-4">
                <div className={`p-3 border rounded border-${risk.color} border-2`}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold mb-1">{caseItem.employeeName}</h6>
                      <small className="text-muted">{caseItem.department} • {caseItem.employeeId}</small>
                    </div>
                    <span className={`badge bg-${risk.color}`}>
                      {caseItem.daysRemaining} days left
                    </span>
                  </div>
                  <div className="progress mb-2" style={{ height: '8px' }}>
                    <div 
                      className={`progress-bar bg-${risk.color}`}
                      style={{ 
                        width: `${((caseItem.noticePeriodDays - caseItem.daysRemaining) / caseItem.noticePeriodDays * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between small">
                    <span>Started: {caseItem.resignationDate}</span>
                    <span>Ends: {caseItem.lastWorkingDay}</span>
                  </div>
                  
                  <div className="mt-2 d-flex flex-wrap gap-1">
                    {caseItem.waiverRequested && (
                      <span className="badge bg-warning">
                        <Shield size={10} className="me-1" />
                        Waiver Requested
                      </span>
                    )}
                    {caseItem.counterOfferStatus === 'Pending' && (
                      <span className="badge bg-primary">
                        <Percent size={10} className="me-1" />
                        Counter Offer
                      </span>
                    )}
                    {caseItem.extensionRequested && (
                      <span className="badge bg-info">
                        <CalendarDays size={10} className="me-1" />
                        Extension
                      </span>
                    )}
                    {!caseItem.managerAcknowledged && (
                      <span className="badge bg-danger">
                        <AlertCircle size={10} className="me-1" />
                        Pending Manager Ack
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showResignationModal && <ResignationSubmissionModal />}
      {showBuyoutModal && <BuyoutRequestModal />}
      {showWaiverModal && <WaiverRequestModal />}
      {showCounterOfferModal && <CounterOfferModal />}
      {showExtensionModal && <ExtensionRequestModal />}
      {showAcceptanceModal && selectedEmployee && <AcceptanceLetterModal />}
      {showExportModal && <ExportModal />}
    </div>
  );

  return mainContent;
};

export default NoticePeriodTracking;