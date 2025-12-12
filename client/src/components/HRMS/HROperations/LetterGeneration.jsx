import React, { useState, useEffect } from 'react';
import {
  FileText, FileCheck, CheckCircle, XCircle, Download, Printer, Edit, Eye,
  Clock, Calendar, User, Building, DollarSign, Percent, Award, TrendingUp,
  AlertCircle, Shield, MapPin, Phone, Mail, Globe, Briefcase, Users,
  Send, Copy, Share2, Lock, Unlock, Search, Filter, Bell, MoreVertical,
  ChevronRight, ExternalLink, Upload, Save, RefreshCw, Settings, BarChart3,
  Archive, History, Database, Bot, Sparkles, Zap, Brain, Target,
  FileSignature, FileCode, FileArchive, FileImage, BookOpen, Clipboard,
  ClipboardCheck, ClipboardCopy, Book, Library, Newspaper, Type,
  Bold, Italic, Underline, List, ListOrdered, Quote, Code, Image,
  Camera, Music, Film, Headphones, Mic, Volume2, QrCode, Barcode,
  Keyboard, Mouse, Monitor, Smartphone, Tablet, Watch, Headset,
  Paperclip, Link, Bookmark, Heart, Star, Flag, Info, HelpCircle,
  Fingerprint, Navigation, Compass, Car, Train, Plane, Ship, Bike,
  Bus, Taxi, ShoppingCart, ShoppingBag, Wallet, Coins, Rupee, Ruler,
  Scissors, Cube, Cylinder, Pyramid, Cone, Sphere, Diamond,
  Plus, Minus, X as XIcon, Check as CheckIcon, Infinity, Pi, Sigma, Omega,
  Copyright, Registered, Trademark, TrendingDown, Cloud, Cpu, HardDrive,
  Battery, Wifi, Key, CreditCard, Layers, Grid, Box, Terminal,
  Play, Pause, Power, BatteryCharging, Thermometer, Wind, Flame,
  Snowflake, Beaker, FlaskConical, TestTube, Pill, HeartPulse,
  PersonStanding, UploadCloud, DownloadCloud, CloudRain, CloudSnow,
  CloudLightning, CloudDrizzle, CloudFog, CloudSun, CloudMoon,
  Cloudy, SunDim, SunMedium, SunBright, Tornado, Hurricane,
  Earthquake, Volcano, Meteor, Comet, Satellite, Telescope,
  Microscope, Bone, Skull, Hand, Foot, GitBranch, GitMerge,
  Columns, Rows, LayoutGrid, FolderSearch, CloudOff, Square,
  Circle, Triangle, Crosshair, Alpha, Beta, Gamma, Delta, Epsilon,
  Zeta, Eta, Theta, Iota, Kappa, Lambda, Mu, Nu, Xi, Omicron,
  Rho, Tau, Upsilon, Phi, Chi, Psi, Euro, PoundSterling, Yen,
  Bitcoin, AlarmClock, Timer, Hourglass, SandTimer, CalendarClock,
  CalendarMinus, CalendarPlus, CalendarX, CalendarCheck, CalendarRange,
  CalendarSearch, CalendarHeart, CalendarStar, CalendarSync, Clock4,
  Clock5, Clock6, Clock7, Clock8, Clock9, Clock10, Clock11, Clock12,
  Clock1, Clock2, Clock3, ClockArrowUp, ClockArrowDown, RotateCcw,
  RotateCw, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, StopCircle,
  PowerOff, BatteryWarning, BatteryEmpty, Plug, PlugZap, PlugOff,
  Unplug, Cigarette, CigaretteOff, Coffee, CoffeeOff, Wine, WineOff,
  Beer, BeerOff, GlassWater, GlassWaterOff, Droplet, DropletOff,
  ThermometerSnowflake, ThermometerSun, CloudWind, CloudHail,
  CloudSleet, PersonWalking, PersonRunning, PersonSwimming,
  PersonSkiing, PersonSnowboarding, PersonSurfing, PersonClimbing,
  PersonJumping, PersonFalling, FileUp, UserX, Scale, CalendarDays,
  HardDriveDownload, HardDriveUpload, ServerCog, RouterCog, Network,
  CloudUpload, CloudDownload, CloudSync, Brackets, Braces,
  Parentheses, CurlyBraces, Octagon, Hexagon, Pentagon, Octagram,
  Cross, TimerReset, TimerOff, GitPullRequest, GitCommit, GitCompare,
  GitFork, Grid3x3, Layout, LayoutList, Boxes, Package2, PackageOpen,
  FolderInput, FolderOutput, FolderMinus, FolderPlus, FolderKey,
  FolderX, FolderCheck, FolderArchive, FolderDown, FolderUp,
  FileMinus, FilePlus, FileX, FileVideo, FileAudio, ClipboardList,
  ClipboardX, FormInput, AlignLeft, AlignCenter, AlignRight,
  Strikethrough, Heading, Pilcrow, ListChecks, CornerDownLeft,
  Delete, Eraser, PaintBucket, Palette, Highlighter, PenTool,
  Video, ZapOff, Bluetooth, Scan, ScanLine, Gamepad2, Scanner,
  Fax, Projector, Speaker, PhoneCall, PhoneForwarded, PhoneIncoming,
  PhoneMissed, PhoneOff, PhoneOutgoing, Voicemail, MessageCircle,
  MailOpen, Inbox, Link2, EyeOff, BookmarkCheck, BellOff,
  AlertTriangle, XOctagon, ShieldOff, UserCheck, UserPlus,
  UserMinus, UserCircle, UserSquare, FileEdit, FileDigit,
  FileSpreadsheet, FileJson, FileKey, FileLock, FileOutput,
  FileInput, FileDiff, FileBadge, FileWarning, FileQuestion,
  FilePieChart, FileBarChart, FileLineChart, FileHeart, FileClock,
  FileCog, FileTerminal, FileType, FileDown, FileAxis3d, FileBox,
  FileCheck2, FileX2, FileStack, FilePenLine, FileBadge2,
  FileChartColumn, FileChartLine, FileChartPie, FileCode2,
  LayoutDashboard, Home, Wrench, Truck, FileClock as FileClockIcon,
  Mail as MailIcon, CheckSquare, Square as SquareIcon,
  Radio, ToggleLeft, ToggleRight, Sliders, CreditCard as CreditCardIcon,
  AlertOctagon, FileWarning as FileWarningIcon,
  Menu, X
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const LetterGeneration = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [workflowStep, setWorkflowStep] = useState(1);
  const [aiGeneratedContent, setAiGeneratedContent] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);
  const [workflowRequests, setWorkflowRequests] = useState([]);
  const [employeeRequests, setEmployeeRequests] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Menu items for the dashboard layout
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={20} />, active: true },
    { id: 'templates', label: 'Templates', icon: <FileText size={20} /> },
    { id: 'generator', label: 'Generator', icon: <FileEdit size={20} /> },
    { id: 'requests', label: 'Requests', icon: <ClipboardList size={20} /> },
    { id: 'workflow', label: 'Workflow', icon: <GitBranch size={20} /> },
    { id: 'employee', label: 'Employees', icon: <User size={20} /> },
    { id: 'archive', label: 'Archive', icon: <Archive size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  // User info for the dashboard layout
  const userInfo = {
    name: 'HR Manager',
    role: 'Human Resources',
    avatar: 'HR'
  };

  // Letter Templates Data with all 12 templates
  const [letterTemplates, setLetterTemplates] = useState([
    {
      id: 1,
      templateId: 'TMP001',
      templateName: 'Experience Certificate',
      templateType: 'experience',
      category: 'Employment',
      description: 'Certifies employment duration and role with performance details',
      icon: 'FileCheck',
      usageCount: 245,
      lastUsed: '2024-03-15',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
        { name: 'relievingDate', label: 'Relieving Date', type: 'date', required: false },
        { name: 'employmentDuration', label: 'Employment Duration', type: 'text', required: true },
        { name: 'responsibilities', label: 'Key Responsibilities', type: 'textarea', required: true },
        { name: 'achievements', label: 'Achievements', type: 'textarea', required: false },
        { name: 'performanceRating', label: 'Performance Rating', type: 'select', options: ['Excellent', 'Good', 'Average', 'Below Average'] },
        { name: 'reasonForLeaving', label: 'Reason for Leaving', type: 'text', required: false }
      ],
      workflowSteps: ['Request Submission', 'Manager Approval', 'HR Approval', 'Generation', 'Digital Signature'],
      sla: '24 hours',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 2,
      templateId: 'TMP002',
      templateName: 'Relieving Letter',
      templateType: 'relieving',
      category: 'Exit',
      description: 'Confirms employment termination with clearance verification',
      icon: 'CheckCircle',
      usageCount: 189,
      lastUsed: '2024-03-18',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Finance', 'IT'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
        { name: 'lastWorkingDate', label: 'Last Working Date', type: 'date', required: true },
        { name: 'relievingDate', label: 'Relieving Date', type: 'date', required: true },
        { name: 'noticePeriod', label: 'Notice Period Served', type: 'text', required: true },
        { name: 'clearanceStatus', label: 'Clearance Status', type: 'select', options: ['Completed', 'Pending', 'Partial'], required: true },
        { name: 'assetsReturned', label: 'Assets Returned', type: 'textarea', required: true },
        { name: 'duesCleared', label: 'Dues Cleared', type: 'select', options: ['Yes', 'No', 'Partial'], required: true },
        { name: 'finalSettlement', label: 'Final Settlement Details', type: 'textarea', required: false }
      ],
      workflowSteps: ['Request Submission', 'Department Clearance', 'Finance Clearance', 'IT Clearance', 'HR Approval', 'Generation'],
      sla: '48 hours',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 3,
      templateId: 'TMP003',
      templateName: 'Salary Certificate',
      templateType: 'salary',
      category: 'Financial',
      description: 'Official salary verification for banks and loans',
      icon: 'DollarSign',
      usageCount: 312,
      lastUsed: '2024-03-20',
      status: 'Active',
      autoApprove: true,
      requiredApprovals: ['HR', 'Finance'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
        { name: 'salaryEffectiveDate', label: 'Salary Effective Date', type: 'date', required: true },
        { name: 'monthlyCTC', label: 'Monthly CTC (₹)', type: 'number', required: true },
        { name: 'annualCTC', label: 'Annual CTC (₹)', type: 'number', required: true },
        { name: 'basicSalary', label: 'Basic Salary (₹)', type: 'number', required: true },
        { name: 'hra', label: 'HRA (₹)', type: 'number', required: true },
        { name: 'specialAllowance', label: 'Special Allowance (₹)', type: 'number', required: true },
        { name: 'otherAllowances', label: 'Other Allowances (₹)', type: 'number', required: false },
        { name: 'pfDeduction', label: 'PF Deduction (₹)', type: 'number', required: true },
        { name: 'professionalTax', label: 'Professional Tax (₹)', type: 'number', required: true },
        { name: 'takeHomeSalary', label: 'Take Home Salary (₹)', type: 'number', required: true },
        { name: 'incomeTax', label: 'Income Tax (₹)', type: 'number', required: true }
      ],
      workflowSteps: ['Request Submission', 'Auto-Approval', 'Generation', 'Digital Signature'],
      sla: '2 hours',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 4,
      templateId: 'TMP004',
      templateName: 'No Objection Certificate (NOC)',
      templateType: 'noc',
      category: 'Legal',
      description: 'Permission for external activities with compliance checking',
      icon: 'Shield',
      usageCount: 78,
      lastUsed: '2024-03-10',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Legal'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'activityType', label: 'Activity Type', type: 'select', options: ['Part-time Course', 'Freelance Work', 'Business Activity', 'Consulting', 'Other'], required: true },
        { name: 'activityDescription', label: 'Activity Description', type: 'textarea', required: true },
        { name: 'activityDuration', label: 'Activity Duration', type: 'text', required: true },
        { name: 'startDate', label: 'Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'End Date', type: 'date', required: true },
        { name: 'purpose', label: 'Purpose', type: 'textarea', required: true },
        { name: 'conflictCheck', label: 'Conflict of Interest Check', type: 'select', options: ['No Conflict', 'Potential Conflict', 'Requires Review'], required: true },
        { name: 'nonDisclosure', label: 'Non-Disclosure Required', type: 'checkbox', required: false },
        { name: 'complianceCheck', label: 'Compliance Check Status', type: 'select', options: ['Approved', 'Pending', 'Rejected'], required: true }
      ],
      workflowSteps: ['Request Submission', 'Manager Review', 'Legal Review', 'HR Approval', 'Generation'],
      sla: '72 hours',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 5,
      templateId: 'TMP005',
      templateName: 'Employment Verification Letter',
      templateType: 'verification',
      category: 'Employment',
      description: 'Verifies current employment status for external verification',
      icon: 'UserCheck',
      usageCount: 156,
      lastUsed: '2024-03-12',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['HR', 'Manager'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
        { name: 'employmentStatus', label: 'Employment Status', type: 'select', options: ['Active', 'Probation', 'Contract', 'Intern'], required: true },
        { name: 'currentSalary', label: 'Current Salary (₹)', type: 'number', required: false },
        { name: 'verificationPurpose', label: 'Verification Purpose', type: 'select', options: ['Bank Loan', 'Visa Application', 'Rental Agreement', 'Other'], required: true },
        { name: 'verifierName', label: 'Verifier Name', type: 'text', required: true },
        { name: 'verifierContact', label: 'Verifier Contact', type: 'text', required: true },
        { name: 'verificationDate', label: 'Verification Date', type: 'date', required: true }
      ],
      workflowSteps: ['Request Submission', 'Manager Verification', 'HR Approval', 'Generation'],
      sla: '24 hours',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 6,
      templateId: 'TMP006',
      templateName: 'Promotion Letter',
      templateType: 'promotion',
      category: 'Career',
      description: 'Official promotion notification with new responsibilities',
      icon: 'TrendingUp',
      usageCount: 45,
      lastUsed: '2024-02-28',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Department Head'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'currentDesignation', label: 'Current Designation', type: 'text', required: true },
        { name: 'newDesignation', label: 'New Designation', type: 'text', required: true },
        { name: 'currentDepartment', label: 'Current Department', type: 'text', required: true },
        { name: 'newDepartment', label: 'New Department', type: 'text', required: false },
        { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
        { name: 'currentSalary', label: 'Current Salary (₹)', type: 'number', required: true },
        { name: 'newSalary', label: 'New Salary (₹)', type: 'number', required: true },
        { name: 'percentageIncrease', label: 'Percentage Increase (%)', type: 'number', required: true },
        { name: 'newResponsibilities', label: 'New Responsibilities', type: 'textarea', required: true },
        { name: 'performanceBasis', label: 'Performance Basis', type: 'textarea', required: true },
        { name: 'probationPeriod', label: 'Probation Period', type: 'text', required: false },
        { name: 'reportingManager', label: 'Reporting Manager', type: 'text', required: true }
      ],
      workflowSteps: ['Initiation', 'Performance Review', 'Department Head Approval', 'HR Approval', 'Generation', 'Employee Acceptance'],
      sla: '5 days',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 7,
      templateId: 'TMP007',
      templateName: 'Transfer Letter',
      templateType: 'transfer',
      category: 'Career',
      description: 'Official transfer notification to new location/department',
      icon: 'MapPin',
      usageCount: 32,
      lastUsed: '2024-02-15',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Department Head'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'currentDesignation', label: 'Current Designation', type: 'text', required: true },
        { name: 'currentLocation', label: 'Current Location', type: 'text', required: true },
        { name: 'newLocation', label: 'New Location', type: 'text', required: true },
        { name: 'currentDepartment', label: 'Current Department', type: 'text', required: true },
        { name: 'newDepartment', label: 'New Department', type: 'text', required: false },
        { name: 'transferType', label: 'Transfer Type', type: 'select', options: ['Permanent', 'Temporary', 'Project-based'], required: true },
        { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
        { name: 'transferReason', label: 'Transfer Reason', type: 'textarea', required: true },
        { name: 'relocationAllowance', label: 'Relocation Allowance (₹)', type: 'number', required: false },
        { name: 'reportingManager', label: 'New Reporting Manager', type: 'text', required: true },
        { name: 'noticePeriod', label: 'Notice Period', type: 'text', required: true },
        { name: 'handoverRequirements', label: 'Handover Requirements', type: 'textarea', required: true }
      ],
      workflowSteps: ['Initiation', 'Department Approval', 'HR Approval', 'Employee Consent', 'Generation'],
      sla: '3 days',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 8,
      templateId: 'TMP008',
      templateName: 'Confirmation Letter',
      templateType: 'confirmation',
      category: 'Employment',
      description: 'Confirms permanent employment after probation period',
      icon: 'CheckCircle',
      usageCount: 89,
      lastUsed: '2024-03-05',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
        { name: 'probationEndDate', label: 'Probation End Date', type: 'date', required: true },
        { name: 'confirmationDate', label: 'Confirmation Date', type: 'date', required: true },
        { name: 'performanceReview', label: 'Performance Review', type: 'select', options: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'], required: true },
        { name: 'confirmedSalary', label: 'Confirmed Salary (₹)', type: 'number', required: true },
        { name: 'newBenefits', label: 'New Benefits', type: 'textarea', required: false },
        { name: 'noticePeriod', label: 'Notice Period', type: 'text', required: true },
        { name: 'nextReviewDate', label: 'Next Review Date', type: 'date', required: false },
        { name: 'reportingManager', label: 'Reporting Manager', type: 'text', required: true }
      ],
      workflowSteps: ['Performance Review', 'Manager Recommendation', 'HR Approval', 'Generation', 'Employee Acknowledgment'],
      sla: '2 days',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 9,
      templateId: 'TMP009',
      templateName: 'Increment Letter',
      templateType: 'increment',
      category: 'Financial',
      description: 'Official salary increment notification',
      icon: 'TrendingUp',
      usageCount: 67,
      lastUsed: '2024-03-01',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Finance'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'currentSalary', label: 'Current Salary (₹)', type: 'number', required: true },
        { name: 'newSalary', label: 'New Salary (₹)', type: 'number', required: true },
        { name: 'incrementAmount', label: 'Increment Amount (₹)', type: 'number', required: true },
        { name: 'percentageIncrease', label: 'Percentage Increase (%)', type: 'number', required: true },
        { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
        { name: 'appraisalCycle', label: 'Appraisal Cycle', type: 'text', required: true },
        { name: 'performanceRating', label: 'Performance Rating', type: 'select', options: ['A - Outstanding', 'B - Excellent', 'C - Good', 'D - Average', 'E - Below Average'], required: true },
        { name: 'performanceHighlights', label: 'Performance Highlights', type: 'textarea', required: true },
        { name: 'nextReviewDate', label: 'Next Review Date', type: 'date', required: true }
      ],
      workflowSteps: ['Appraisal Review', 'Manager Recommendation', 'Finance Approval', 'HR Approval', 'Generation'],
      sla: '3 days',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 10,
      templateId: 'TMP010',
      templateName: 'Loan Sanction Letter',
      templateType: 'loan',
      category: 'Financial',
      description: 'Approval for employee loan with terms and conditions',
      icon: 'CreditCard',
      usageCount: 23,
      lastUsed: '2024-02-20',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Finance'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'loanType', label: 'Loan Type', type: 'select', options: ['Personal Loan', 'Vehicle Loan', 'Home Loan', 'Education Loan', 'Medical Loan'], required: true },
        { name: 'loanAmount', label: 'Loan Amount (₹)', type: 'number', required: true },
        { name: 'interestRate', label: 'Interest Rate (%)', type: 'number', required: true },
        { name: 'tenure', label: 'Tenure (Months)', type: 'number', required: true },
        { name: 'emiAmount', label: 'EMI Amount (₹)', type: 'number', required: true },
        { name: 'sanctionDate', label: 'Sanction Date', type: 'date', required: true },
        { name: 'disbursementDate', label: 'Disbursement Date', type: 'date', required: true },
        { name: 'collateral', label: 'Collateral Details', type: 'textarea', required: false },
        { name: 'repaymentStartDate', label: 'Repayment Start Date', type: 'date', required: true },
        { name: 'processingFees', label: 'Processing Fees (₹)', type: 'number', required: false },
        { name: 'insuranceRequired', label: 'Insurance Required', type: 'checkbox', required: false }
      ],
      workflowSteps: ['Application Submission', 'Credit Check', 'Manager Approval', 'Finance Approval', 'HR Approval', 'Generation'],
      sla: '5 days',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 11,
      templateId: 'TMP011',
      templateName: 'Warning Letter',
      templateType: 'warning',
      category: 'Disciplinary',
      description: 'Formal warning for policy violations or performance issues',
      icon: 'AlertTriangle',
      usageCount: 12,
      lastUsed: '2024-02-10',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Legal'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
        { name: 'warningType', label: 'Warning Type', type: 'select', options: ['Verbal', 'First Written', 'Final Written', 'Show Cause'], required: true },
        { name: 'violationCategory', label: 'Violation Category', type: 'select', options: ['Attendance', 'Performance', 'Behavior', 'Policy Violation', 'Security Breach'], required: true },
        { name: 'incidentDescription', label: 'Incident Description', type: 'textarea', required: true },
        { name: 'incidentDate', label: 'Incident Date', type: 'date', required: true },
        { name: 'policyViolated', label: 'Policy Violated', type: 'textarea', required: true },
        { name: 'expectedBehavior', label: 'Expected Behavior', type: 'textarea', required: true },
        { name: 'improvementPeriod', label: 'Improvement Period', type: 'text', required: true },
        { name: 'nextReviewDate', label: 'Next Review Date', type: 'date', required: true },
        { name: 'consequences', label: 'Consequences of Non-compliance', type: 'textarea', required: true },
        { name: 'employeeAcknowledgment', label: 'Employee Acknowledgment Required', type: 'checkbox', required: true }
      ],
      workflowSteps: ['Incident Report', 'Manager Review', 'HR Review', 'Legal Review', 'Generation', 'Employee Acknowledgment'],
      sla: '3 days',
      digitalSignature: true,
      verificationCode: true
    },
    {
      id: 12,
      templateId: 'TMP012',
      templateName: 'Termination Letter',
      templateType: 'termination',
      category: 'Exit',
      description: 'Official termination of employment with reasons and settlements',
      icon: 'XCircle',
      usageCount: 8,
      lastUsed: '2024-02-05',
      status: 'Active',
      autoApprove: false,
      requiredApprovals: ['Manager', 'HR', 'Legal', 'Finance'],
      aiOptimized: true,
      defaultFields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
        { name: 'terminationDate', label: 'Termination Date', type: 'date', required: true },
        { name: 'lastWorkingDate', label: 'Last Working Date', type: 'date', required: true },
        { name: 'terminationType', label: 'Termination Type', type: 'select', options: ['Voluntary', 'Involuntary', 'Retrenchment', 'Resignation Accepted', 'Termination for Cause'], required: true },
        { name: 'terminationReason', label: 'Termination Reason', type: 'textarea', required: true },
        { name: 'noticePeriod', label: 'Notice Period', type: 'text', required: true },
        { name: 'severancePackage', label: 'Severance Package (₹)', type: 'number', required: false },
        { name: 'finalSettlement', label: 'Final Settlement Details', type: 'textarea', required: true },
        { name: 'assetsReturn', label: 'Assets to be Returned', type: 'textarea', required: true },
        { name: 'exitInterview', label: 'Exit Interview Required', type: 'checkbox', required: true },
        { name: 'nonCompete', label: 'Non-compete Clause', type: 'textarea', required: false },
        { name: 'confidentiality', label: 'Confidentiality Agreement', type: 'checkbox', required: true }
      ],
      workflowSteps: ['Termination Initiation', 'Manager Approval', 'HR Review', 'Legal Review', 'Finance Settlement', 'Generation'],
      sla: '5 days',
      digitalSignature: true,
      verificationCode: true
    }
  ]);

  // Letter Requests Data with workflow status
  const [letterRequests, setLetterRequests] = useState([
    {
      id: 1,
      requestId: 'LTR-REQ-2024-001',
      employeeId: 'EMP001',
      employeeName: 'RAHUL SHARMA',
      employeeEmail: 'rahul.sharma@company.com',
      templateType: 'experience',
      templateName: 'Experience Certificate',
      requestDate: '2024-03-15',
      purpose: 'CANADA VISA APPLICATION',
      priority: 'High',
      status: 'approved',
      statusColor: 'success',
      workflowStatus: 'completed',
      approvedBy: ['Manager', 'HR'],
      approvalDate: '2024-03-15',
      generatedDate: '2024-03-15',
      downloadDate: '2024-03-16',
      downloadCount: 1,
      digitalSignature: true,
      verificationCode: 'VER-2024-001',
      auditTrail: [
        { action: 'Employee Request Submitted', by: 'RAHUL SHARMA', timestamp: '2024-03-15 10:30:00', step: 'Request Submission' },
        { action: 'Manager Approved', by: 'PRIYA VERMA', timestamp: '2024-03-15 14:20:00', step: 'Manager Approval' },
        { action: 'HR Approved', by: 'HR DEPARTMENT', timestamp: '2024-03-15 16:45:00', step: 'HR Approval' },
        { action: 'Letter Generated', by: 'SYSTEM', timestamp: '2024-03-15 16:50:00', step: 'Generation' },
        { action: 'Digital Signature Applied', by: 'SYSTEM', timestamp: '2024-03-15 16:51:00', step: 'Digital Signature' },
        { action: 'Downloaded by Employee', by: 'RAHUL SHARMA', timestamp: '2024-03-16 09:15:00', step: 'Download' }
      ]
    },
    {
      id: 2,
      requestId: 'LTR-REQ-2024-002',
      employeeId: 'EMP002',
      employeeName: 'PRIYA PATEL',
      employeeEmail: 'priya.patel@company.com',
      templateType: 'salary',
      templateName: 'Salary Certificate',
      requestDate: '2024-03-18',
      purpose: 'HOME LOAN',
      priority: 'Medium',
      status: 'approved',
      statusColor: 'success',
      workflowStatus: 'completed',
      approvedBy: ['HR', 'Finance'],
      approvalDate: '2024-03-18',
      generatedDate: '2024-03-18',
      downloadDate: '2024-03-18',
      downloadCount: 2,
      digitalSignature: true,
      verificationCode: 'VER-2024-002',
      auditTrail: [
        { action: 'Employee Request Submitted', by: 'PRIYA PATEL', timestamp: '2024-03-18 11:20:00', step: 'Request Submission' },
        { action: 'Auto-Approved by System', by: 'AI SYSTEM', timestamp: '2024-03-18 11:20:00', step: 'Auto-Approval' },
        { action: 'Letter Generated', by: 'SYSTEM', timestamp: '2024-03-18 11:21:00', step: 'Generation' },
        { action: 'Digital Signature Applied', by: 'SYSTEM', timestamp: '2024-03-18 11:21:30', step: 'Digital Signature' },
        { action: 'Downloaded by Employee', by: 'PRIYA PATEL', timestamp: '2024-03-18 11:30:00', step: 'Download' },
        { action: 'Downloaded for Bank Verification', by: 'PRIYA PATEL', timestamp: '2024-03-18 15:45:00', step: 'Download' }
      ]
    },
    {
      id: 3,
      requestId: 'LTR-REQ-2024-003',
      employeeId: 'EMP003',
      employeeName: 'AMIT KUMAR',
      employeeEmail: 'amit.kumar@company.com',
      templateType: 'relieving',
      templateName: 'Relieving Letter',
      requestDate: '2024-03-20',
      purpose: 'EXIT FORMALITIES',
      priority: 'High',
      status: 'pending',
      statusColor: 'warning',
      workflowStatus: 'in_progress',
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: 'Department Clearance',
      auditTrail: [
        { action: 'Employee Request Submitted', by: 'AMIT KUMAR', timestamp: '2024-03-20 09:45:00', step: 'Request Submission' },
        { action: 'Department Clearance Initiated', by: 'SYSTEM', timestamp: '2024-03-20 09:46:00', step: 'Department Clearance' }
      ]
    },
    {
      id: 4,
      requestId: 'LTR-REQ-2024-004',
      employeeId: 'EMP004',
      employeeName: 'SNEHA REDDY',
      employeeEmail: 'sneha.reddy@company.com',
      templateType: 'noc',
      templateName: 'No Objection Certificate (NOC)',
      requestDate: '2024-03-22',
      purpose: 'PART-TIME COURSE',
      priority: 'Low',
      status: 'rejected',
      statusColor: 'danger',
      workflowStatus: 'terminated',
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      rejectionReason: 'Course conflicts with working hours',
      auditTrail: [
        { action: 'Employee Request Submitted', by: 'SNEHA REDDY', timestamp: '2024-03-22 14:20:00', step: 'Request Submission' },
        { action: 'Manager Review Completed', by: 'MANAGER', timestamp: '2024-03-22 16:30:00', step: 'Manager Review' },
        { action: 'Request Rejected - Conflict with Work Schedule', by: 'MANAGER', timestamp: '2024-03-22 16:35:00', step: 'Rejection' }
      ]
    },
    {
      id: 5,
      requestId: 'LTR-REQ-2024-005',
      employeeId: 'EMP005',
      employeeName: 'RAJESH KUMAR',
      employeeEmail: 'rajesh.kumar@company.com',
      templateType: 'promotion',
      templateName: 'Promotion Letter',
      requestDate: '2024-03-25',
      purpose: 'PROMOTION TO SENIOR MANAGER',
      priority: 'High',
      status: 'pending',
      statusColor: 'warning',
      workflowStatus: 'in_progress',
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: 'Department Head Approval',
      auditTrail: [
        { action: 'HR Initiated Promotion Process', by: 'HR DEPARTMENT', timestamp: '2024-03-25 11:00:00', step: 'Initiation' },
        { action: 'Performance Review Completed', by: 'MANAGER', timestamp: '2024-03-25 14:30:00', step: 'Performance Review' }
      ]
    },
    {
      id: 6,
      requestId: 'LTR-REQ-2024-006',
      employeeId: 'EMP006',
      employeeName: 'VIKAS SINGH',
      employeeEmail: 'vikas.singh@company.com',
      templateType: 'verification',
      templateName: 'Employment Verification Letter',
      requestDate: '2024-03-24',
      purpose: 'BANK LOAN VERIFICATION',
      priority: 'Medium',
      status: 'approved',
      statusColor: 'success',
      workflowStatus: 'completed',
      approvedBy: ['HR', 'Manager'],
      approvalDate: '2024-03-24',
      generatedDate: '2024-03-24',
      downloadDate: '2024-03-24',
      downloadCount: 1,
      digitalSignature: true,
      verificationCode: 'VER-2024-004',
      auditTrail: [
        { action: 'Employee Request Submitted', by: 'VIKAS SINGH', timestamp: '2024-03-24 09:15:00', step: 'Request Submission' },
        { action: 'Manager Verification Completed', by: 'MANAGER', timestamp: '2024-03-24 11:30:00', step: 'Manager Verification' },
        { action: 'HR Approved', by: 'HR DEPARTMENT', timestamp: '2024-03-24 14:45:00', step: 'HR Approval' },
        { action: 'Letter Generated', by: 'SYSTEM', timestamp: '2024-03-24 14:50:00', step: 'Generation' },
        { action: 'Downloaded for Bank', by: 'VIKAS SINGH', timestamp: '2024-03-24 16:20:00', step: 'Download' }
      ]
    },
    {
      id: 7,
      requestId: 'LTR-REQ-2024-007',
      employeeId: 'EMP007',
      employeeName: 'ANITA DESAI',
      employeeEmail: 'anita.desai@company.com',
      templateType: 'increment',
      templateName: 'Increment Letter',
      requestDate: '2024-03-26',
      purpose: 'SALARY INCREMENT',
      priority: 'Medium',
      status: 'pending',
      statusColor: 'warning',
      workflowStatus: 'in_progress',
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: 'Finance Approval',
      auditTrail: [
        { action: 'Appraisal Review Completed', by: 'MANAGER', timestamp: '2024-03-26 10:00:00', step: 'Appraisal Review' },
        { action: 'Manager Recommendation Submitted', by: 'MANAGER', timestamp: '2024-03-26 10:30:00', step: 'Manager Recommendation' }
      ]
    },
    {
      id: 8,
      requestId: 'LTR-REQ-2024-008',
      employeeId: 'EMP008',
      employeeName: 'SANJAY VERMA',
      employeeEmail: 'sanjay.verma@company.com',
      templateType: 'loan',
      templateName: 'Loan Sanction Letter',
      requestDate: '2024-03-27',
      purpose: 'HOME LOAN SANCTION',
      priority: 'High',
      status: 'pending',
      statusColor: 'warning',
      workflowStatus: 'in_progress',
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: 'Credit Check',
      auditTrail: [
        { action: 'Application Submitted', by: 'SANJAY VERMA', timestamp: '2024-03-27 09:00:00', step: 'Application Submission' }
      ]
    }
  ]);

  // Generated Letters Archive
  const [letterArchive, setLetterArchive] = useState([
    {
      id: 1,
      letterId: 'LTR-2024-001',
      templateName: 'Experience Certificate',
      employeeName: 'RAHUL SHARMA',
      employeeId: 'EMP001',
      employeeEmail: 'rahul.sharma@company.com',
      generationDate: '2024-03-15',
      purpose: 'CANADA VISA APPLICATION',
      downloadCount: 3,
      lastAccessed: '2024-03-16',
      fileSize: '245 KB',
      status: 'Active',
      digitalSignature: true,
      verificationCode: 'VER-2024-001',
      format: 'PDF',
      version: '1.0',
      workflowId: 'WF-2024-001'
    },
    {
      id: 2,
      letterId: 'LTR-2024-002',
      templateName: 'Salary Certificate',
      employeeName: 'PRIYA PATEL',
      employeeId: 'EMP002',
      employeeEmail: 'priya.patel@company.com',
      generationDate: '2024-03-18',
      purpose: 'HOME LOAN',
      downloadCount: 2,
      lastAccessed: '2024-03-18',
      fileSize: '189 KB',
      status: 'Active',
      digitalSignature: true,
      verificationCode: 'VER-2024-002',
      format: 'PDF',
      version: '1.0',
      workflowId: 'WF-2024-002'
    },
    {
      id: 3,
      letterId: 'LTR-2024-004',
      templateName: 'Employment Verification Letter',
      employeeName: 'VIKAS SINGH',
      employeeId: 'EMP006',
      employeeEmail: 'vikas.singh@company.com',
      generationDate: '2024-03-24',
      purpose: 'BANK LOAN VERIFICATION',
      downloadCount: 1,
      lastAccessed: '2024-03-24',
      fileSize: '198 KB',
      status: 'Active',
      digitalSignature: true,
      verificationCode: 'VER-2024-004',
      format: 'PDF',
      version: '1.0',
      workflowId: 'WF-2024-006'
    },
    {
      id: 4,
      letterId: 'LTR-2024-005',
      templateName: 'Confirmation Letter',
      employeeName: 'ROHAN MEHTA',
      employeeId: 'EMP009',
      employeeEmail: 'rohan.mehta@company.com',
      generationDate: '2024-03-20',
      purpose: 'PROBATION COMPLETION',
      downloadCount: 1,
      lastAccessed: '2024-03-20',
      fileSize: '175 KB',
      status: 'Active',
      digitalSignature: true,
      verificationCode: 'VER-2024-005',
      format: 'PDF',
      version: '1.0',
      workflowId: 'WF-2024-009'
    }
  ]);

  // Statistics
  const statistics = {
    totalTemplates: letterTemplates.length,
    totalRequests: letterRequests.length,
    approvedRequests: letterRequests.filter(r => r.status === 'approved').length,
    pendingRequests: letterRequests.filter(r => r.status === 'pending').length,
    rejectedRequests: letterRequests.filter(r => r.status === 'rejected').length,
    totalDownloads: letterRequests.reduce((sum, req) => sum + req.downloadCount, 0),
    aiOptimized: letterTemplates.filter(t => t.aiOptimized).length,
    autoApprove: letterTemplates.filter(t => t.autoApprove).length,
    digitalSignatures: letterRequests.filter(r => r.digitalSignature).length,
    avgProcessingTime: '4.2 hours'
  };

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    return new Date(dateTimeString.replace(' ', 'T')).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="badge bg-success">Approved</span>;
      case 'pending': return <span className="badge bg-warning">Pending</span>;
      case 'rejected': return <span className="badge bg-danger">Rejected</span>;
      case 'Active': return <span className="badge bg-success">Active</span>;
      case 'Inactive': return <span className="badge bg-secondary">Inactive</span>;
      case 'completed': return <span className="badge bg-success">Completed</span>;
      case 'in_progress': return <span className="badge bg-warning">In Progress</span>;
      case 'terminated': return <span className="badge bg-danger">Terminated</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return <span className="badge bg-danger">High</span>;
      case 'Medium': return <span className="badge bg-warning">Medium</span>;
      case 'Low': return <span className="badge bg-info">Low</span>;
      default: return <span className="badge bg-secondary">{priority}</span>;
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'FileCheck': FileCheck,
      'CheckCircle': CheckCircle,
      'DollarSign': DollarSign,
      'Shield': Shield,
      'TrendingUp': TrendingUp,
      'UserCheck': UserCheck,
      'MapPin': MapPin,
      'CreditCard': CreditCard,
      'AlertTriangle': AlertTriangle,
      'XCircle': XCircle,
      'FileText': FileText
    };
    
    const Icon = iconMap[iconName] || FileText;
    return <Icon size={20} />;
  };

  // Handlers
  const handleAddTemplate = (templateData) => {
    const newTemplate = {
      id: letterTemplates.length + 1,
      ...templateData,
      templateId: `TMP${String(letterTemplates.length + 1).padStart(3, '0')}`,
      usageCount: 0,
      lastUsed: null,
      status: 'Active',
      workflowSteps: ['Request Submission', 'Approval', 'Generation', 'Digital Signature'],
      sla: '24 hours',
      digitalSignature: true,
      verificationCode: true
    };
    
    setLetterTemplates(prev => [...prev, newTemplate]);
    setShowTemplateModal(false);
    alert(`Template "${newTemplate.templateName}" added successfully!`);
  };

  const handleGenerateLetter = (letterData) => {
    const newLetter = {
      id: letterArchive.length + 1,
      ...letterData,
      letterId: `LTR-${new Date().getFullYear()}-${String(letterArchive.length + 1).padStart(3, '0')}`,
      generationDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      lastAccessed: null,
      fileSize: '~250 KB',
      status: 'Active',
      digitalSignature: true,
      verificationCode: `VER-${new Date().getFullYear()}-${String(letterArchive.length + 1).padStart(3, '0')}`,
      format: 'PDF',
      version: '1.0',
      workflowId: `WF-${new Date().getFullYear()}-${String(letterArchive.length + 1).padStart(3, '0')}`
    };
    
    // Create request
    const newRequest = {
      id: letterRequests.length + 1,
      requestId: `LTR-REQ-${new Date().getFullYear()}-${String(letterRequests.length + 1).padStart(3, '0')}`,
      employeeId: letterData.employeeId || 'EMP001',
      employeeName: letterData.employeeName || 'Employee',
      employeeEmail: letterData.employeeEmail || 'employee@company.com',
      templateType: letterData.templateType,
      templateName: letterData.templateName,
      requestDate: new Date().toISOString().split('T')[0],
      purpose: letterData.purpose || 'General Purpose',
      priority: letterData.priority || 'Medium',
      status: 'approved',
      statusColor: 'success',
      workflowStatus: 'completed',
      approvedBy: ['System'],
      approvalDate: new Date().toISOString().split('T')[0],
      generatedDate: new Date().toISOString().split('T')[0],
      downloadDate: null,
      downloadCount: 0,
      digitalSignature: true,
      verificationCode: newLetter.verificationCode,
      auditTrail: [
        { 
          action: 'Letter Generated by HR', 
          by: 'HR Manager', 
          timestamp: new Date().toLocaleString(),
          step: 'Generation' 
        },
        { 
          action: 'Digital Signature Applied', 
          by: 'SYSTEM', 
          timestamp: new Date().toLocaleString(),
          step: 'Digital Signature' 
        }
      ]
    };
    
    setLetterArchive(prev => [...prev, newLetter]);
    setLetterRequests(prev => [...prev, newRequest]);
    setShowLetterModal(false);
    alert(`Letter generated successfully! Letter ID: ${newLetter.letterId}`);
  };

  const handleApproveRequest = (requestId) => {
    const request = letterRequests.find(r => r.id === requestId);
    if (!request) return;

    setLetterRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: 'approved',
            statusColor: 'success',
            workflowStatus: 'completed',
            approvedBy: [...req.approvedBy, 'HR Manager'],
            approvalDate: new Date().toISOString().split('T')[0],
            generatedDate: new Date().toISOString().split('T')[0],
            digitalSignature: true,
            verificationCode: `VER-${new Date().getFullYear()}-${requestId}`,
            auditTrail: [
              ...req.auditTrail,
              { 
                action: 'Approved by HR Manager', 
                by: 'HR Manager', 
                timestamp: new Date().toLocaleString(),
                step: 'HR Approval' 
              }
            ]
          } 
        : req
    ));
    
    // Generate the letter and add to archive
    const newLetter = {
      id: letterArchive.length + 1,
      letterId: `LTR-${new Date().getFullYear()}-${String(letterArchive.length + 1).padStart(3, '0')}`,
      templateName: request.templateName,
      employeeName: request.employeeName,
      employeeId: request.employeeId,
      employeeEmail: request.employeeEmail,
      generationDate: new Date().toISOString().split('T')[0],
      purpose: request.purpose,
      downloadCount: 0,
      lastAccessed: null,
      fileSize: '~250 KB',
      status: 'Active',
      digitalSignature: true,
      verificationCode: `VER-${new Date().getFullYear()}-${String(letterArchive.length + 1).padStart(3, '0')}`,
      format: 'PDF',
      version: '1.0',
      workflowId: `WF-${new Date().getFullYear()}-${requestId}`
    };
    
    setLetterArchive(prev => [...prev, newLetter]);
    
    alert(`Request approved and letter generated! Letter ID: ${newLetter.letterId}`);
  };

  const handleRejectRequest = (requestId) => {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      setLetterRequests(prev => prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status: 'rejected',
              statusColor: 'danger',
              workflowStatus: 'terminated',
              rejectionReason: reason,
              auditTrail: [
                ...request.auditTrail,
                { 
                  action: 'Rejected by HR Manager', 
                  by: 'HR Manager', 
                  timestamp: new Date().toLocaleString(),
                  step: 'Rejection',
                  details: `Reason: ${reason}`
                }
              ]
            } 
          : request
      ));
      alert('Request rejected successfully!');
    }
  };

  const handleDownloadLetter = (letterId) => {
    const letter = letterArchive.find(l => l.id === letterId);
    if (!letter) return;
    
    // Update download count
    setLetterArchive(prev => prev.map(l => 
      l.id === letterId 
        ? { ...l, downloadCount: l.downloadCount + 1, lastAccessed: new Date().toISOString().split('T')[0] }
        : l
    ));
    
    // Create and download file
    const content = `
      ${letter.templateName}
      ========================================
      
      Letter ID: ${letter.letterId}
      Verification Code: ${letter.verificationCode}
      Generated Date: ${formatDate(letter.generationDate)}
      
      ========================================
      
      TO WHOM IT MAY CONCERN
      
      This is to certify that ${letter.employeeName} (Employee ID: ${letter.employeeId}) 
      ${letter.templateName.toLowerCase() === 'experience certificate' ? 
        'was employed with our organization' : 
        'is an employee of our organization'}.
      
      Purpose: ${letter.purpose}
      
      This document is digitally signed and can be verified using the verification code provided above.
      
      ========================================
      
      Digital Signature: ${letter.digitalSignature ? 'VERIFIED' : 'NOT AVAILABLE'}
      Format: ${letter.format}
      Version: ${letter.version}
      File Size: ${letter.fileSize}
      Last Accessed: ${letter.lastAccessed ? formatDate(letter.lastAccessed) : 'N/A'}
      Total Downloads: ${letter.downloadCount}
      
      ========================================
      
      This is an official document generated by the HR Letter Generation System.
      For verification, please contact HR Department.
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${letter.letterId}-${letter.employeeName.replace(/\s+/g, '-')}-${letter.templateName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Letter downloaded successfully!\nLetter ID: ${letter.letterId}\nVerification Code: ${letter.verificationCode}`);
  };

  const handleViewAuditTrail = (requestId) => {
    const request = letterRequests.find(r => r.id === requestId);
    if (!request) return;

    const auditDetails = request.auditTrail.map(trail => 
      `${formatDateTime(trail.timestamp)} - ${trail.action} by ${trail.by} (${trail.step})`
    ).join('\n\n');

    alert(`Audit Trail for ${request.requestId}:\n\n${auditDetails}`);
  };

  // Filter templates based on search term
  const filteredTemplates = letterTemplates.filter(template =>
    searchTerm === '' ||
    template.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.templateType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter requests based on search term
  const filteredRequests = letterRequests.filter(request =>
    searchTerm === '' ||
    request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter archive based on search term
  const filteredArchive = letterArchive.filter(letter =>
    searchTerm === '' ||
    letter.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.letterId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    letter.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Employee Portal View
  const EmployeePortal = () => {
    const [employeeView, setEmployeeView] = useState('myRequests');
    const [selectedEmployee, setSelectedEmployee] = useState({
      id: 'EMP001',
      name: 'RAHUL SHARMA',
      email: 'rahul.sharma@company.com',
      department: 'Engineering',
      designation: 'Senior Developer'
    });

    return (
      <div className="row g-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h6 className="fw-bold mb-0">Employee Portal</h6>
              <small className="text-muted">Employee self-service for letter requests</small>
            </div>
            <div className="card-body">
              {/* Employee Profile Card */}
              <div className="mb-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="card bg-primary bg-opacity-10 border-primary">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <User size={24} className="text-primary me-3" />
                          <div>
                            <div className="fw-bold text-truncate">{selectedEmployee.name}</div>
                            <small className="text-muted text-truncate">{selectedEmployee.designation}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-info bg-opacity-10 border-info">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <FileText size={24} className="text-info me-3" />
                          <div>
                            <div className="fw-bold">
                              {letterRequests.filter(r => r.employeeId === selectedEmployee.id).length}
                            </div>
                            <small className="text-muted">Total Requests</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-success bg-opacity-10 border-success">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <Download size={24} className="text-success me-3" />
                          <div>
                            <div className="fw-bold">
                              {letterRequests.filter(r => r.employeeId === selectedEmployee.id)
                                .reduce((sum, req) => sum + req.downloadCount, 0)}
                            </div>
                            <small className="text-muted">Total Downloads</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs for Mobile */}
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className={`btn ${employeeView === 'myRequests' ? 'btn-primary' : 'btn-outline-primary'} btn-responsive`}
                    onClick={() => setEmployeeView('myRequests')}
                  >
                    <span className="d-none d-sm-inline">My Requests</span>
                    <span className="d-sm-none">Requests</span>
                  </button>
                  <button
                    className={`btn ${employeeView === 'requestLetter' ? 'btn-primary' : 'btn-outline-primary'} btn-responsive`}
                    onClick={() => setEmployeeView('requestLetter')}
                  >
                    <span className="d-none d-sm-inline">Request New</span>
                    <span className="d-sm-none">Request</span>
                  </button>
                  <button
                    className={`btn ${employeeView === 'downloads' ? 'btn-primary' : 'btn-outline-primary'} btn-responsive`}
                    onClick={() => setEmployeeView('downloads')}
                  >
                    Downloads
                  </button>
                </div>
              </div>

              {employeeView === 'myRequests' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="min-width-120">Request ID</th>
                        <th className="d-none d-md-table-cell min-width-150">Letter Type</th>
                        <th className="min-width-100">Date</th>
                        <th className="min-width-100">Purpose</th>
                        <th className="min-width-100">Status</th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {letterRequests
                        .filter(r => r.employeeId === selectedEmployee.id)
                        .map(request => (
                          <tr key={request.id}>
                            <td className="small text-truncate">{request.requestId}</td>
                            <td className="d-none d-md-table-cell text-truncate">{request.templateName}</td>
                            <td>{formatDate(request.requestDate)}</td>
                            <td>
                              <div className="text-truncate" title={request.purpose}>
                                {request.purpose}
                              </div>
                            </td>
                            <td>{getStatusBadge(request.status)}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-info btn-sm btn-icon"
                                  onClick={() => handleViewAuditTrail(request.id)}
                                  title="View Details"
                                >
                                  <Eye size={12} />
                                </button>
                                {request.status === 'approved' && (
                                  <button
                                    className="btn btn-outline-success btn-sm btn-icon"
                                    onClick={() => {
                                      const archiveLetter = letterArchive.find(l => 
                                        l.employeeId === request.employeeId && 
                                        l.templateName === request.templateName
                                      );
                                      if (archiveLetter) {
                                        handleDownloadLetter(archiveLetter.id);
                                      }
                                    }}
                                    title="Download"
                                  >
                                    <Download size={12} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}

              {employeeView === 'requestLetter' && (
                <div className="row g-3">
                  {letterTemplates.map(template => (
                    <div key={template.id} className="col-12 col-md-6 col-lg-4">
                      <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex align-items-start mb-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                              {getIconComponent(template.icon)}
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1 text-truncate">{template.templateName}</h6>
                              <small className="text-muted d-block text-truncate-2">{template.description}</small>
                            </div>
                          </div>
                          <div className="mb-3">
                            <span className="badge bg-info me-2">{template.category}</span>
                            {template.autoApprove && (
                              <span className="badge bg-success">Auto-approve</span>
                            )}
                          </div>
                          <button
                            className="btn btn-primary mt-auto btn-responsive"
                            onClick={() => {
                              const newRequest = {
                                id: letterRequests.length + 1,
                                requestId: `LTR-REQ-${new Date().getFullYear()}-${String(letterRequests.length + 1).padStart(3, '0')}`,
                                employeeId: selectedEmployee.id,
                                employeeName: selectedEmployee.name,
                                employeeEmail: selectedEmployee.email,
                                templateType: template.templateType,
                                templateName: template.templateName,
                                requestDate: new Date().toISOString().split('T')[0],
                                purpose: 'Employee Request',
                                priority: 'Medium',
                                status: template.autoApprove ? 'approved' : 'pending',
                                statusColor: template.autoApprove ? 'success' : 'warning',
                                workflowStatus: template.autoApprove ? 'completed' : 'in_progress',
                                approvedBy: [],
                                approvalDate: null,
                                generatedDate: null,
                                downloadDate: null,
                                downloadCount: 0,
                                digitalSignature: true,
                                verificationCode: `VER-${new Date().getFullYear()}-${String(letterRequests.length + 1).padStart(3, '0')}`,
                                auditTrail: [
                                  { 
                                    action: 'Employee Request Submitted', 
                                    by: selectedEmployee.name, 
                                    timestamp: new Date().toLocaleString(),
                                    step: 'Request Submission' 
                                  }
                                ]
                              };
                              
                              setLetterRequests(prev => [...prev, newRequest]);
                              alert(`Letter request submitted successfully! Request ID: ${newRequest.requestId}`);
                            }}
                          >
                            Request Letter
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {employeeView === 'downloads' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="min-width-120">Letter ID</th>
                        <th className="d-none d-md-table-cell min-width-150">Letter Type</th>
                        <th className="min-width-100">Generated</th>
                        <th className="min-width-80">Downloads</th>
                        <th className="d-none d-sm-table-cell min-width-120">Verification</th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {letterArchive
                        .filter(l => l.employeeId === selectedEmployee.id)
                        .map(letter => (
                          <tr key={letter.id}>
                            <td className="small text-truncate">{letter.letterId}</td>
                            <td className="d-none d-md-table-cell text-truncate">{letter.templateName}</td>
                            <td>{formatDate(letter.generationDate)}</td>
                            <td>{letter.downloadCount}</td>
                            <td className="d-none d-sm-table-cell">
                              <code className="small text-truncate d-block">{letter.verificationCode}</code>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary btn-icon"
                                onClick={() => handleDownloadLetter(letter.id)}
                                title="Download"
                              >
                                <Download size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Letter Generator Modal
  const LetterGeneratorModal = () => {
    const [formData, setFormData] = useState({});
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
      if (selectedLetter) {
        const template = letterTemplates.find(t => t.id === selectedLetter.id);
        if (template) {
          setSelectedTemplate(template);
          const initialData = {};
          template.defaultFields.forEach(field => {
            initialData[field.name] = field.type === 'checkbox' ? false : '';
          });
          setFormData(initialData);
        }
      }
    }, [selectedLetter]);

    const handleInputChange = (fieldName, value) => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
    };

    const handleGenerate = () => {
      if (!selectedTemplate) {
        alert('Please select a template first');
        return;
      }

      // Validate required fields
      const requiredFields = selectedTemplate.defaultFields.filter(field => field.required);
      const missingFields = requiredFields.filter(field => !formData[field.name]);

      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.map(f => f.label).join(', ')}`);
        return;
      }

      handleGenerateLetter({
        templateName: selectedTemplate.templateName,
        templateType: selectedTemplate.templateType,
        employeeName: formData.employeeName || '',
        employeeId: formData.employeeId || 'EMP' + Math.floor(Math.random() * 1000),
        employeeEmail: formData.employeeEmail || '',
        department: formData.department || '',
        purpose: formData.purpose || 'General Purpose',
        priority: 'Medium',
        digitalSignature: true,
        auditTrail: true
      });
    };

    const renderField = (field) => {
      switch(field.type) {
        case 'text':
          return (
            <input
              type="text"
              className="form-control form-control-sm"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
        case 'number':
          return (
            <input
              type="number"
              className="form-control form-control-sm"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
        case 'date':
          return (
            <input
              type="date"
              className="form-control form-control-sm"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
            />
          );
        case 'textarea':
          return (
            <textarea
              className="form-control form-control-sm"
              rows="3"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
        case 'select':
          return (
            <select
              className="form-select form-select-sm"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        case 'checkbox':
          return (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
                id={field.name}
              />
              <label className="form-check-label" htmlFor={field.name}>
                {field.label}
              </label>
            </div>
          );
        default:
          return (
            <input
              type="text"
              className="form-control form-control-sm"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
      }
    };

    if (!selectedTemplate && !selectedLetter) {
      return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <FileEdit className="me-2" />
                  Select Template
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowLetterModal(false)}></button>
              </div>
              
              <div className="modal-body">
                <div className="alert alert-info mb-4">
                  <Info className="me-2" size={16} />
                  Please select a template to generate a letter.
                </div>
                
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  {letterTemplates.slice(0, 6).map(template => (
                    <div key={template.id} className="col">
                      <div 
                        className="card border hover-lift cursor-pointer"
                        onClick={() => setSelectedLetter(template)}
                      >
                        <div className="card-body">
                          <div className="d-flex align-items-start">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                              {getIconComponent(template.icon)}
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1 text-truncate">{template.templateName}</h6>
                              <small className="text-muted text-truncate-2 d-block">{template.description}</small>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="badge bg-info bg-opacity-10 text-info">
                              {template.category}
                            </span>
                            {template.autoApprove && (
                              <span className="badge bg-success bg-opacity-10 text-success ms-2">
                                Auto-approve
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowLetterModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">
                <FileEdit className="me-2" />
                Generate {selectedTemplate?.templateName}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => {
                setShowLetterModal(false);
                setSelectedLetter(null);
              }}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-info mb-4">
                <Info className="me-2" size={16} />
                Fill in the details below to generate {selectedTemplate?.templateName}.
                <span className="text-danger"> * Required fields</span>
              </div>
              
              <div className="row g-3">
                {selectedTemplate?.defaultFields.map((field, index) => (
                  <div key={field.name} className={`col-12 ${field.type === 'textarea' ? '' : 'col-md-6'}`}>
                    <label className="form-label">
                      {field.label}
                      {field.required && <span className="text-danger"> *</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <h6 className="fw-bold mb-3">Letter Options</h6>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={true}
                        readOnly
                        id="digitalSignature"
                      />
                      <label className="form-check-label" htmlFor="digitalSignature">
                        Include Digital Signature
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={true}
                        readOnly
                        id="verificationCode"
                      />
                      <label className="form-check-label" htmlFor="verificationCode">
                        Generate Verification Code
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={true}
                        readOnly
                        id="auditTrail"
                      />
                      <label className="form-check-label" htmlFor="auditTrail">
                        Enable Audit Trail
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={true}
                        readOnly
                        id="workflowTracking"
                      />
                      <label className="form-check-label" htmlFor="workflowTracking">
                        Enable Workflow Tracking
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm" 
                onClick={() => {
                  setShowLetterModal(false);
                  setSelectedLetter(null);
                }}
              >
                Cancel
              </button>
              <button 
                type="button"
                className="btn btn-primary btn-sm" 
                onClick={handleGenerate}
              >
                <FileEdit className="me-2" size={16} />
                Generate Letter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Component
  const mainContent = (
    <div className="container-fluid px-2 px-md-3 py-2 py-md-3">
      <style>
        {`
          /* Custom CSS for responsive design */
          @media (max-width: 768px) {
            .table-responsive {
              font-size: 0.75rem;
            }
            .btn-group .btn {
              padding: 0.2rem 0.4rem;
            }
            .card-header h6 {
              font-size: 0.9rem;
            }
            .stat-card {
              padding: 0.75rem;
            }
            h5 {
              font-size: 1.1rem;
            }
            .btn-sm {
              font-size: 0.7rem;
              padding: 0.2rem 0.4rem;
            }
            .btn-responsive {
              font-size: 0.75rem;
              padding: 0.25rem 0.5rem;
            }
            .modal-dialog {
              margin: 0.5rem;
            }
          }
          
          @media (max-width: 576px) {
            .container-fluid {
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }
            .btn-responsive {
              font-size: 0.7rem;
              padding: 0.2rem 0.4rem;
            }
            .btn {
              font-size: 0.75rem;
              padding: 0.3rem 0.6rem;
            }
            .modal-dialog {
              margin: 0.25rem;
            }
            .modal-content {
              border-radius: 0.375rem;
            }
            h5 {
              font-size: 1rem;
            }
            .table td, .table th {
              padding: 0.5rem;
            }
            .card-body {
              padding: 1rem;
            }
          }
          
          /* Truncation utilities */
          .text-truncate-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-truncate-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Responsive buttons */
          .btn-responsive {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          /* Icon only buttons on small screens */
          .btn-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          }
          
          @media (min-width: 768px) {
            .btn-icon {
              width: auto;
              height: auto;
              padding: 0.375rem 0.75rem;
            }
          }
          
          /* Table column min widths */
          .min-width-80 {
            min-width: 80px;
          }
          
          .min-width-100 {
            min-width: 100px;
          }
          
          .min-width-120 {
            min-width: 120px;
          }
          
          .min-width-150 {
            min-width: 150px;
          }
          
          /* Card responsive */
          .card-title-responsive {
            font-size: 1rem;
          }
          
          @media (max-width: 768px) {
            .card-title-responsive {
              font-size: 0.9rem;
            }
          }
          
          /* Hide/show based on screen size */
          .mobile-only {
            display: none !important;
          }
          
          .desktop-only {
            display: block !important;
          }
          
          @media (max-width: 768px) {
            .mobile-only {
              display: block !important;
            }
            .desktop-only {
              display: none !important;
            }
          }
          
          /* Mobile menu */
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1040;
            display: none;
          }
          
          .mobile-menu-overlay.show {
            display: block;
          }
          
          .mobile-nav {
            position: fixed;
            top: 0;
            left: -300px;
            width: 280px;
            height: 100%;
            background-color: white;
            z-index: 1050;
            transition: left 0.3s;
            overflow-y: auto;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          }
          
          .mobile-nav.show {
            left: 0;
          }
          
          /* Hover effects */
          .hover-lift {
            transition: transform 0.2s, box-shadow 0.2s;
          }
          
          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          
          /* Template grid responsiveness */
          .template-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
          }
          
          @media (max-width: 768px) {
            .template-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              gap: 0.75rem;
            }
          }
          
          @media (max-width: 576px) {
            .template-grid {
              grid-template-columns: 1fr;
              gap: 0.5rem;
            }
          }
          
          /* Action buttons container */
          .action-buttons {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
          
          @media (max-width: 768px) {
            .action-buttons {
              gap: 0.25rem;
            }
            .action-buttons .btn {
              flex: 1;
              min-width: 0;
              text-align: center;
            }
          }
          
          /* Template card responsive */
          .template-card {
            height: 100%;
          }
          
          .template-card .btn {
            width: 100%;
          }
          
          @media (max-width: 768px) {
            .template-card {
              margin-bottom: 0.5rem;
            }
          }
        `}
      </style>
      
      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="p-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0 text-truncate">HR Letter System</h5>
            <button className="btn btn-link text-dark p-0" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="d-grid gap-2">
            {menuItems.map(section => (
              <button
                key={section.id}
                type="button"
                className={`btn ${activeSection === section.id ? 'btn-primary' : 'btn-outline-primary'} text-start d-flex align-items-center gap-2 btn-responsive`}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                {React.cloneElement(section.icon, { size: 18 })}
                <span className="text-truncate">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center flex-grow-1">
            <button 
              className="btn btn-outline-secondary d-md-none me-2 btn-icon"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex-grow-1">
              <h5 className="fw-bold mb-1 text-truncate">HR Letter Generation System</h5>
              <p className="text-muted mb-0 d-none d-md-block small text-truncate">
                <FileText className="me-2 text-primary" size={14} />
                Complete HR letter management with 12 templates
              </p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              type="button"
              className="btn btn-primary d-flex align-items-center gap-1 btn-responsive" 
              onClick={() => setShowLetterModal(true)}
            >
              <FileEdit size={16} />
              <span className="d-none d-sm-inline">Generate</span>
              <span className="d-sm-none">New</span>
            </button>
            <button 
              type="button"
              className="btn btn-success d-flex align-items-center gap-1 btn-responsive"
              onClick={() => setShowTemplateModal(true)}
            >
              <FileText size={16} />
              <span className="d-none d-sm-inline">Template</span>
              <span className="d-sm-none">Add</span>
            </button>
            <button 
              type="button"
              className="btn btn-info d-flex align-items-center gap-1 btn-responsive text-white"
              onClick={() => setShowAIAssistant(true)}
            >
              <Bot size={16} />
              <span className="d-none d-sm-inline">AI</span>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="p-2 p-md-3 bg-primary bg-opacity-10 rounded mb-3">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <div className="spinner-grow spinner-grow-sm text-success" role="status"></div>
                  <span className="fw-medium small">System Active</span>
                </div>
                <div className="vr d-none d-md-inline"></div>
                <span className="text-muted small">{statistics.totalTemplates} templates</span>
                <div className="vr d-none d-md-inline"></div>
                <span className="text-muted small">{statistics.totalRequests} requests</span>
              </div>
            </div>
            <div className="col-md-4 text-md-end mt-2 mt-md-0">
              <div className="d-flex flex-wrap gap-1 gap-md-2 justify-content-end">
                <span className="badge bg-success bg-opacity-10 text-success small">
                  <CheckCircle size={10} className="me-1" />
                  {statistics.approvedRequests} Approved
                </span>
                <span className="badge bg-info bg-opacity-10 text-info small">
                  <Sparkles size={10} className="me-1" />
                  {statistics.aiOptimized} AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards - Responsive */}
      <div className="row g-2 g-md-3 mb-3 mb-md-4">
        <div className="col-6 col-md-3">
          <div className="p-2 p-md-3 bg-white border rounded stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Templates</div>
                <div className="h4 h3-md mb-0 fw-bold text-primary">{statistics.totalTemplates}</div>
              </div>
              <FileText size={20} className="text-primary opacity-75 d-none d-md-block" />
              <FileText size={16} className="text-primary opacity-75 d-md-none" />
            </div>
            <div className="small text-success mt-2">
              <CheckCircle size={10} className="me-1" />
              {statistics.aiOptimized} AI optimized
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-2 p-md-3 bg-white border rounded stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Requests</div>
                <div className="h4 h3-md mb-0 fw-bold text-success">{statistics.totalRequests}</div>
              </div>
              <ClipboardList size={20} className="text-success opacity-75 d-none d-md-block" />
              <ClipboardList size={16} className="text-success opacity-75 d-md-none" />
            </div>
            <div className="small text-muted mt-2">
              {statistics.approvedRequests} approved • {statistics.pendingRequests} pending
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-2 p-md-3 bg-white border rounded stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Auto-Approved</div>
                <div className="h4 h3-md mb-0 fw-bold text-warning">{statistics.autoApprove}</div>
              </div>
              <Zap size={20} className="text-warning opacity-75 d-none d-md-block" />
              <Zap size={16} className="text-warning opacity-75 d-md-none" />
            </div>
            <div className="small text-warning mt-2">Instant approval</div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-2 p-md-3 bg-white border rounded stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Downloads</div>
                <div className="h4 h3-md mb-0 fw-bold text-info">{statistics.totalDownloads}</div>
              </div>
              <Download size={20} className="text-info opacity-75 d-none d-md-block" />
              <Download size={16} className="text-info opacity-75 d-md-none" />
            </div>
            <div className="small text-muted mt-2">Letter downloads</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Desktop Only */}
      <div className="mb-3 mb-md-4 desktop-only">
        <div className="d-flex flex-wrap gap-1 gap-md-2">
          {menuItems.map(section => (
            <button
              key={section.id}
              type="button"
              className={`btn ${activeSection === section.id ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center gap-2 btn-responsive`}
              onClick={() => setActiveSection(section.id)}
            >
              {React.cloneElement(section.icon, { size: 16 })}
              <span className="d-none d-sm-inline">{section.label}</span>
              <span className="d-sm-none">
                {section.label.substring(0, 3)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-3 mb-md-4">
        <div className="row g-2 g-md-3">
          <div className="col-12 col-md-8">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search templates, requests, letters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button" className="btn btn-outline-primary d-none d-md-flex align-items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <button type="button" className="btn btn-outline-primary d-md-none btn-sm">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex gap-1 gap-md-2">
              <button 
                type="button"
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center btn-responsive"
                onClick={() => window.location.reload()}
                title="Refresh"
              >
                <RefreshCw size={16} />
                <span className="d-none d-md-inline ms-1">Refresh</span>
              </button>
              <button 
                type="button"
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center btn-responsive"
                onClick={() => window.print()}
                title="Print"
              >
                <Printer size={16} />
                <span className="d-none d-md-inline ms-1">Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      {activeSection === 'dashboard' && (
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">Recent Letter Requests</h6>
                <span className="badge bg-primary">{letterRequests.length}</span>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th className="min-width-120">Request ID</th>
                        <th className="d-none d-md-table-cell min-width-120">Employee</th>
                        <th className="min-width-100">Type</th>
                        <th className="min-width-80">Status</th>
                        <th className="d-none d-sm-table-cell min-width-80">Date</th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {letterRequests.slice(0, 5).map(request => (
                        <tr key={request.id}>
                          <td className="small text-truncate">{request.requestId}</td>
                          <td className="d-none d-md-table-cell text-truncate">{request.employeeName}</td>
                          <td className="text-truncate" title={request.templateName}>
                            {request.templateName}
                          </td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td className="d-none d-sm-table-cell">{formatDate(request.requestDate)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-info btn-sm btn-icon"
                                onClick={() => handleViewAuditTrail(request.id)}
                                title="View Details"
                              >
                                <Eye size={12} />
                              </button>
                              {request.status === 'pending' && (
                                <button 
                                  className="btn btn-outline-success btn-sm btn-icon"
                                  onClick={() => handleApproveRequest(request.id)}
                                  title="Approve"
                                >
                                  <CheckCircle size={12} />
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
          
          <div className="col-12 col-lg-4">
            <div className="card h-100">
              <div className="card-header">
                <h6 className="fw-bold mb-0">Quick Actions</h6>
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-grid gap-2 mb-3">
                  <button 
                    className="btn btn-primary d-flex align-items-center justify-content-center gap-2 btn-responsive"
                    onClick={() => setShowLetterModal(true)}
                  >
                    <FileEdit size={16} />
                    Generate New Letter
                  </button>
                  <button 
                    className="btn btn-success d-flex align-items-center justify-content-center gap-2 btn-responsive"
                    onClick={() => setActiveSection('templates')}
                  >
                    <FileText size={16} />
                    Browse Templates
                  </button>
                  <button 
                    className="btn btn-info d-flex align-items-center justify-content-center gap-2 btn-responsive text-white"
                    onClick={() => setShowAIAssistant(true)}
                  >
                    <Bot size={16} />
                    Ask AI Assistant
                  </button>
                </div>
                
                <div className="mt-auto">
                  <h6 className="fw-bold mb-3">System Status</h6>
                  <div className="list-group">
                    <div className="list-group-item py-2">
                      <div className="d-flex justify-content-between">
                        <span className="small">Letter Templates</span>
                        <span className="badge bg-primary small">{statistics.totalTemplates}</span>
                      </div>
                    </div>
                    <div className="list-group-item py-2">
                      <div className="d-flex justify-content-between">
                        <span className="small">Pending Approvals</span>
                        <span className="badge bg-warning small">{statistics.pendingRequests}</span>
                      </div>
                    </div>
                    <div className="list-group-item py-2">
                      <div className="d-flex justify-content-between">
                        <span className="small">Digital Signatures</span>
                        <span className="badge bg-success small">{statistics.digitalSignatures}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Section */}
      {activeSection === 'templates' && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="fw-bold mb-2 mb-md-0">
                  <FileText className="me-2" size={18} />
                  All Letter Templates ({letterTemplates.length})
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">{statistics.totalTemplates} templates</span>
                  <button 
                    type="button"
                    className="btn btn-sm btn-outline-primary d-flex align-items-center btn-responsive"
                    onClick={() => setShowTemplateModal(true)}
                  >
                    <FileText size={14} className="me-1" />
                    <span className="d-none d-sm-inline">Add Template</span>
                    <span className="d-sm-none">Add</span>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="template-grid">
                  {filteredTemplates.map(template => (
                    <div key={template.id} className="template-card">
                      <div className="card h-100 border hover-lift">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex align-items-start mb-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                              {getIconComponent(template.icon)}
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1 text-truncate" title={template.templateName}>{template.templateName}</h6>
                              <small className="text-muted text-truncate-2 d-block">{template.description}</small>
                            </div>
                            {template.aiOptimized && (
                              <span className="badge bg-success small">
                                <Sparkles size={10} className="me-1" />
                                AI
                              </span>
                            )}
                          </div>
                          
                          <div className="mb-3">
                            <div className="small text-muted mb-1">Category</div>
                            <span className="badge bg-info bg-opacity-10 text-info small">
                              {template.category}
                            </span>
                            {template.autoApprove && (
                              <span className="badge bg-success bg-opacity-10 text-success ms-2 small">
                                Auto-approve
                              </span>
                            )}
                          </div>
                          
                          <div className="mb-3">
                            <div className="small text-muted mb-1">Required Approvals</div>
                            <div className="d-flex flex-wrap gap-1">
                              {template.requiredApprovals.slice(0, 2).map((approval, idx) => (
                                <span key={idx} className="badge bg-light text-dark border small">
                                  {approval}
                                </span>
                              ))}
                              {template.requiredApprovals.length > 2 && (
                                <span className="badge bg-light text-dark border small">
                                  +{template.requiredApprovals.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-auto d-flex justify-content-between align-items-center">
                            <div className="small text-muted">
                              Used {template.usageCount} times
                            </div>
                            <button 
                              type="button"
                              className="btn btn-sm btn-primary btn-responsive"
                              onClick={() => {
                                setSelectedLetter(template);
                                setShowLetterModal(true);
                              }}
                            >
                              Use
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requests Section */}
      {activeSection === 'requests' && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="fw-bold mb-2 mb-md-0">
                  <ClipboardList className="me-2" size={18} />
                  Letter Requests ({letterRequests.length})
                </h6>
                <div className="d-flex flex-wrap gap-1 gap-md-2">
                  <span className="badge bg-warning small">{statistics.pendingRequests} pending</span>
                  <span className="badge bg-success small">{statistics.approvedRequests} approved</span>
                  <span className="badge bg-danger small">{statistics.rejectedRequests} rejected</span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="min-width-120">Request ID</th>
                        <th className="d-none d-md-table-cell min-width-120">Employee</th>
                        <th className="min-width-100">Type</th>
                        <th className="d-none d-sm-table-cell min-width-80">Date</th>
                        <th className="min-width-80">Status</th>
                        <th className="d-none d-lg-table-cell min-width-80">Priority</th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map(request => (
                        <tr key={request.id}>
                          <td className="small text-truncate">{request.requestId}</td>
                          <td className="d-none d-md-table-cell">
                            <div className="text-truncate">{request.employeeName}</div>
                            <small className="text-muted d-block text-truncate">{request.employeeId}</small>
                          </td>
                          <td className="text-truncate" title={request.templateName}>
                            {request.templateName}
                          </td>
                          <td className="d-none d-sm-table-cell">{formatDate(request.requestDate)}</td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td className="d-none d-lg-table-cell">{getPriorityBadge(request.priority)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                type="button"
                                className="btn btn-outline-primary btn-sm btn-icon"
                                onClick={() => handleViewAuditTrail(request.id)}
                                title="View Details"
                              >
                                <Eye size={12} />
                              </button>
                              {request.status === 'pending' && (
                                <>
                                  <button 
                                    type="button"
                                    className="btn btn-outline-success btn-sm btn-icon"
                                    onClick={() => handleApproveRequest(request.id)}
                                    title="Approve"
                                  >
                                    <CheckCircle size={12} />
                                  </button>
                                  <button 
                                    type="button"
                                    className="btn btn-outline-danger btn-sm btn-icon"
                                    onClick={() => handleRejectRequest(request.id)}
                                    title="Reject"
                                  >
                                    <XCircle size={12} />
                                  </button>
                                </>
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
        </div>
      )}

      {/* Employee Portal Section */}
      {activeSection === 'employee' && <EmployeePortal />}

      {/* Archive Section */}
      {activeSection === 'archive' && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="fw-bold mb-2 mb-md-0">
                  <Archive className="me-2" size={18} />
                  Letter Archive ({letterArchive.length})
                </h6>
                <div className="d-flex flex-wrap gap-1 gap-md-2">
                  <span className="badge bg-primary small">{letterArchive.length} letters</span>
                  <span className="badge bg-success small">
                    {letterArchive.filter(l => l.digitalSignature).length} Signed
                  </span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="min-width-120">Letter ID</th>
                        <th className="d-none d-md-table-cell min-width-120">Type</th>
                        <th className="min-width-120">Employee</th>
                        <th className="d-none d-lg-table-cell min-width-80">Generated</th>
                        <th className="min-width-80">Downloads</th>
                        <th className="d-none d-sm-table-cell min-width-80">Status</th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArchive.map(letter => (
                        <tr key={letter.id}>
                          <td className="small text-truncate">{letter.letterId}</td>
                          <td className="d-none d-md-table-cell text-truncate">{letter.templateName}</td>
                          <td>
                            <div className="text-truncate">{letter.employeeName}</div>
                            <small className="text-muted d-block text-truncate">{letter.employeeId}</small>
                          </td>
                          <td className="d-none d-lg-table-cell">{formatDate(letter.generationDate)}</td>
                          <td>
                            <div className="text-center">
                              <div className="fw-medium">{letter.downloadCount}</div>
                            </div>
                          </td>
                          <td className="d-none d-sm-table-cell">{getStatusBadge(letter.status)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                type="button"
                                className="btn btn-outline-primary btn-sm btn-icon"
                                onClick={() => handleDownloadLetter(letter.id)}
                                title="Download"
                              >
                                <Download size={12} />
                              </button>
                              <button 
                                type="button"
                                className="btn btn-outline-info btn-sm btn-icon"
                                onClick={() => {
                                  const details = `Letter Details:\n\nID: ${letter.letterId}\nEmployee: ${letter.employeeName} (${letter.employeeId})\nTemplate: ${letter.templateName}\nPurpose: ${letter.purpose}\nGenerated: ${formatDate(letter.generationDate)}\nDownloads: ${letter.downloadCount}\nVerification: ${letter.verificationCode}\nDigital Signature: ${letter.digitalSignature ? 'Yes' : 'No'}`;
                                  alert(details);
                                }}
                                title="View Details"
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

      {/* Reports Section */}
      {activeSection === 'reports' && (
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h6 className="fw-bold mb-0">
                  <FileText className="me-2" size={18} />
                  Letter Usage Report
                </h6>
              </div>
              <div className="card-body d-flex flex-column">
                <p className="text-muted small">Complete report of letter templates usage, approvals, and downloads.</p>
                <div className="mb-3">
                  <h6 className="small fw-bold">Report Includes:</h6>
                  <ul className="small">
                    <li>Template-wise usage statistics</li>
                    <li>Approval and rejection rates</li>
                    <li>Download frequency analysis</li>
                    <li>Monthly trends and patterns</li>
                  </ul>
                </div>
                <button type="button" className="btn btn-primary w-100 mt-auto btn-responsive" onClick={() => alert('Report generation functionality would be implemented here')}>
                  <Download className="me-2" size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-success text-white">
                <h6 className="fw-bold mb-0">
                  <Users className="me-2" size={18} />
                  Employee-wise Report
                </h6>
              </div>
              <div className="card-body d-flex flex-column">
                <p className="text-muted small">Detailed report of letter requests and usage by each employee.</p>
                <div className="mb-3">
                  <h6 className="small fw-bold">Report Includes:</h6>
                  <ul className="small">
                    <li>Employee-wise request history</li>
                    <li>Most requested letter types</li>
                    <li>Approval status per employee</li>
                    <li>Department-wise analysis</li>
                  </ul>
                </div>
                <button type="button" className="btn btn-success w-100 mt-auto btn-responsive" onClick={() => alert('Report generation functionality would be implemented here')}>
                  <Download className="me-2" size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === 'settings' && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h6 className="fw-bold mb-0">
                  <Settings className="me-2" size={18} />
                  System Settings
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Default Digital Signature</label>
                      <select className="form-select form-select-sm">
                        <option>Enable for all letters</option>
                        <option>Enable based on template</option>
                        <option>Disable by default</option>
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Auto-Approval Rules</label>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label small">Enable for salary certificates</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label small">Enable for experience certificates</label>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Default Letter Format</label>
                      <select className="form-select form-select-sm">
                        <option>PDF</option>
                        <option>DOCX</option>
                        <option>Both PDF and DOCX</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Audit Trail Retention</label>
                      <select className="form-select form-select-sm">
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                        <option>Indefinite</option>
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Notification Settings</label>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label small">Email for new requests</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label small">Email for approvals</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label small">Email for downloads</label>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Default Workflow SLA</label>
                      <input type="text" className="form-control form-control-sm" defaultValue="24 hours" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="btn btn-primary btn-responsive">
                    <Save className="me-2" size={16} />
                    Save Settings
                  </button>
                  <button className="btn btn-outline-secondary ms-2 btn-responsive">
                    <RefreshCw className="me-2" size={16} />
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Categories Summary */}
      {activeSection === 'dashboard' && (
        <div className="mt-4">
          <h6 className="fw-bold mb-3">
            <FileText size={16} className="me-2" />
            Template Categories
          </h6>
          <div className="row g-2 g-md-3">
            {['Employment', 'Financial', 'Exit', 'Legal', 'Career', 'Disciplinary'].map(category => {
              const count = letterTemplates.filter(t => t.category === category).length;
              return (
                <div key={category} className="col-6 col-md-4 col-lg-2">
                  <div className="p-2 p-md-3 border rounded text-center">
                    <div className="h4 h3-md fw-bold mb-1">{count}</div>
                    <div className="small text-muted">{category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals */}
      {showLetterModal && <LetterGeneratorModal />}
      
      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold small">
                  <Bot className="me-2" size={18} />
                  HR Letter AI Assistant
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAIAssistant(false)}></button>
              </div>
              
              <div className="modal-body">
                <div className="alert alert-info mb-3 small">
                  <Info className="me-2" size={14} />
                  Ask me anything about HR letters, templates, or workflows!
                </div>
                
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Type your question..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        alert('AI Assistant functionality would be implemented here');
                      }
                    }}
                  />
                  <button 
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => alert('AI Assistant functionality would be implemented here')}
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Template Modal */}
      {showTemplateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold small">
                  <FileText className="me-2" size={18} />
                  Add New Template
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowTemplateModal(false)}></button>
              </div>
              
              <div className="modal-body">
                <div className="alert alert-info mb-3 small">
                  <Info className="me-2" size={14} />
                  Create a new letter template with custom fields and workflow.
                </div>
                
                <div className="mb-3">
                  <label className="form-label small fw-bold">Template Name *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g., Experience Certificate"
                    required
                  />
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Category *</label>
                    <select className="form-select form-select-sm" required>
                      <option value="Employment">Employment</option>
                      <option value="Financial">Financial</option>
                      <option value="Exit">Exit</option>
                      <option value="Legal">Legal</option>
                      <option value="Career">Career</option>
                      <option value="Disciplinary">Disciplinary</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Template Type *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g., experience, salary, relieving"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label small fw-bold">Description *</label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="3"
                    placeholder="Brief description of this template..."
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="autoApprove" />
                    <label className="form-check-label small" htmlFor="autoApprove">
                      Enable auto-approval for this template
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="aiOptimized" defaultChecked />
                    <label className="form-check-label small" htmlFor="aiOptimized">
                      Enable AI optimization
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowTemplateModal(false)}>
                  Cancel
                </button>
                <button 
                  type="button"
                  className="btn btn-primary btn-sm" 
                  onClick={() => {
                    alert('Template saved successfully!');
                    setShowTemplateModal(false);
                  }}
                >
                  <Save className="me-2" size={14} />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      menuItems={menuItems}
      userInfo={userInfo}
      appName="HR Letter Generation System"
      isMobileMenuOpen={isMobileMenuOpen}
      setIsMobileMenuOpen={setIsMobileMenuOpen}
    >
      {mainContent}
    </div>
  );
};

export default LetterGeneration;