import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Lightbulb,
  FileCheck,
  CheckCircle,
  XCircle,
  Download,
  Printer,
  Edit,
  Eye,
  Clock,
  User,
  Building,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Shield,
  MapPin,
  Briefcase,
  Users,
  Send,
  Search,
  Filter,
  ChevronRight,
  Save,
  RefreshCw,
  Settings,
  BarChart3,
  Archive,
  Bot,
  Sparkles,
  Zap,
  FileSignature,
  Info,
  Plus,
  X as XIcon,
  Check as CheckIcon,
  CreditCard,
  GitBranch,
  ClipboardList,
  AlertTriangle,
  UserCheck,
  FileEdit,
  FileClock as FileClockIcon,
  Mail as MailIcon,
  Square as SquareIcon,
  CreditCard as CreditCardIcon,
  FileWarning as FileWarningIcon,
  Menu,
  X,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

// Add these state variables with the existing ones at the top
const LetterGeneration = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showLetterDetailsCard, setShowLetterDetailsCard] = useState(false);
  const [workflowRequests, setWorkflowRequests] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Add these state variables
  const [showAuditTrailModal, setShowAuditTrailModal] = useState(false);
  const [selectedAuditTrail, setSelectedAuditTrail] = useState([]);
  const [selectedAuditRequest, setSelectedAuditRequest] = useState(null);
  const [showAuditTrailCard, setShowAuditTrailCard] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  // Add these state variables at the beginning of your component, after the other useState declarations
  const [formData, setFormData] = useState({});
  // Add these state variables at the beginning
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  // Add this notification state at the top
  const [actionNotification, setActionNotification] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  const [showBulkApproveConfirm, setShowBulkApproveConfirm] = useState(false);
  const [showRejectReasonCard, setShowRejectReasonCard] = useState(false);
  const [showWorkflowReport, setShowWorkflowReport] = useState(false);
  const [showDigitalSignatureCard, setShowDigitalSignatureCard] = useState(false);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [pendingApprovalCount, setPendingApprovalCount] = useState(0);
  const [terminatedCount, setTerminatedCount] = useState(0);
  const [selectedRequestToReject, setSelectedRequestToReject] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedSignatureRequest, setSelectedSignatureRequest] = useState(null);
  // For new workflow modal
  const [newWorkflowTemplate, setNewWorkflowTemplate] = useState("");
  const [newWorkflowPriority, setNewWorkflowPriority] = useState("Medium");
  const [newWorkflowPurpose, setNewWorkflowPurpose] = useState("");
  const [workflowView, setWorkflowView] = useState("all");
  const [workflowFilter, setWorkflowFilter] = useState({
    templateType: "",
    priority: "",
    search: "",
  });
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(false);
  // Ref for SLA inputs
  const slaHighRef = useRef(null);
  const slaMediumRef = useRef(null);
  const slaLowRef = useRef(null);
  // ... rest of your code
  // Initialize workflow requests if not already initialized
  // Update your workflowRequests initialization to include the new fields
  useEffect(() => {
    if (workflowRequests.length === 0) {
      const initialWorkflows = letterRequests.map((request) => ({
        ...request,
        // Add these three fields with data from letterRequests
        designation: request.designation || "Senior Developer",
        department: request.department || "Engineering",
        lastPromoted: request.lastPromoted || "2023-06-15",
        workflowStatus:
          request.status === "approved"
            ? "completed"
            : request.status === "rejected"
            ? "terminated"
            : "in_progress",
        currentStep: request.currentStep || "Request Submission",
        steps:
          letterTemplates.find((t) => t.templateType === request.templateType)
            ?.workflowSteps || [],
        progress: 0,
        digitalSignature: request.digitalSignature || false,
        hrArchived: false,
        auditTrail: request.auditTrail || [],
      }));
      setWorkflowRequests(initialWorkflows);
    }
  }, []);
  // Menu items for the dashboard layout
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart3 size={20} />,
      active: true,
    },
    { id: "templates", label: "Templates", icon: <FileText size={20} /> },
    { id: "generator", label: "Generator", icon: <FileEdit size={20} /> },
    { id: "requests", label: "Requests", icon: <ClipboardList size={20} /> },
    { id: "workflow", label: "Workflow", icon: <GitBranch size={20} /> },
    { id: "employee", label: "Employees", icon: <User size={20} /> },
    { id: "archive", label: "Archive", icon: <Archive size={20} /> },
    { id: "reports", label: "Reports", icon: <FileText size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  // User info for the dashboard layout
  const userInfo = {
    name: "HR Manager",
    role: "Human Resources",
    avatar: "HR",
  };

  // Letter Templates Data with all 12 templates
  const [letterTemplates, setLetterTemplates] = useState([
    {
      id: 1,
      templateId: "TMP001",
      templateName: "Experience Certificate",
      templateType: "experience",
      category: "Employment",
      description:
        "Certifies employment duration and role with performance details",
      icon: "FileCheck",
      usageCount: 245,
      lastUsed: "2024-03-15",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "joiningDate",
          label: "Joining Date",
          type: "date",
          required: true,
        },
        {
          name: "relievingDate",
          label: "Relieving Date",
          type: "date",
          required: false,
        },
        {
          name: "employmentDuration",
          label: "Employment Duration",
          type: "text",
          required: true,
        },
        {
          name: "responsibilities",
          label: "Key Responsibilities",
          type: "textarea",
          required: true,
        },
        {
          name: "achievements",
          label: "Achievements",
          type: "textarea",
          required: false,
        },
        {
          name: "performanceRating",
          label: "Performance Rating",
          type: "select",
          options: ["Excellent", "Good", "Average", "Below Average"],
        },
        {
          name: "reasonForLeaving",
          label: "Reason for Leaving",
          type: "text",
          required: false,
        },
      ],
      workflowSteps: [
        "Request Submission",
        "Manager Approval",
        "HR Approval",
        "Generation",
        "Digital Signature",
      ],
      sla: "24 hours",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 2,
      templateId: "TMP002",
      templateName: "Relieving Letter",
      templateType: "relieving",
      category: "Exit",
      description:
        "Confirms employment termination with clearance verification",
      icon: "CheckCircle",
      usageCount: 189,
      lastUsed: "2024-03-18",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Finance", "IT"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "joiningDate",
          label: "Joining Date",
          type: "date",
          required: true,
        },
        {
          name: "lastWorkingDate",
          label: "Last Working Date",
          type: "date",
          required: true,
        },
        {
          name: "relievingDate",
          label: "Relieving Date",
          type: "date",
          required: true,
        },
        {
          name: "noticePeriod",
          label: "Notice Period Served",
          type: "text",
          required: true,
        },
        {
          name: "clearanceStatus",
          label: "Clearance Status",
          type: "select",
          options: ["Completed", "Pending", "Partial"],
          required: true,
        },
        {
          name: "assetsReturned",
          label: "Assets Returned",
          type: "textarea",
          required: true,
        },
        {
          name: "duesCleared",
          label: "Dues Cleared",
          type: "select",
          options: ["Yes", "No", "Partial"],
          required: true,
        },
        {
          name: "finalSettlement",
          label: "Final Settlement Details",
          type: "textarea",
          required: false,
        },
      ],
      workflowSteps: [
        "Request Submission",
        "Department Clearance",
        "Finance Clearance",
        "IT Clearance",
        "HR Approval",
        "Generation",
      ],
      sla: "48 hours",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 3,
      templateId: "TMP003",
      templateName: "Salary Certificate",
      templateType: "salary",
      category: "Financial",
      description: "Official salary verification for banks and loans",
      icon: "DollarSign",
      usageCount: 312,
      lastUsed: "2024-03-20",
      status: "Active",
      autoApprove: true,
      requiredApprovals: ["HR", "Finance"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "joiningDate",
          label: "Joining Date",
          type: "date",
          required: true,
        },
        {
          name: "salaryEffectiveDate",
          label: "Salary Effective Date",
          type: "date",
          required: true,
        },
        {
          name: "monthlyCTC",
          label: "Monthly CTC (₹)",
          type: "number",
          required: true,
        },
        {
          name: "annualCTC",
          label: "Annual CTC (₹)",
          type: "number",
          required: true,
        },
        {
          name: "basicSalary",
          label: "Basic Salary (₹)",
          type: "number",
          required: true,
        },
        { name: "hra", label: "HRA (₹)", type: "number", required: true },
        {
          name: "specialAllowance",
          label: "Special Allowance (₹)",
          type: "number",
          required: true,
        },
        {
          name: "otherAllowances",
          label: "Other Allowances (₹)",
          type: "number",
          required: false,
        },
        {
          name: "pfDeduction",
          label: "PF Deduction (₹)",
          type: "number",
          required: true,
        },
        {
          name: "professionalTax",
          label: "Professional Tax (₹)",
          type: "number",
          required: true,
        },
        {
          name: "takeHomeSalary",
          label: "Take Home Salary (₹)",
          type: "number",
          required: true,
        },
        {
          name: "incomeTax",
          label: "Income Tax (₹)",
          type: "number",
          required: true,
        },
      ],
      workflowSteps: [
        "Request Submission",
        "Auto-Approval",
        "Generation",
        "Digital Signature",
      ],
      sla: "2 hours",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 4,
      templateId: "TMP004",
      templateName: "No Objection Certificate (NOC)",
      templateType: "noc",
      category: "Legal",
      description:
        "Permission for external activities with compliance checking",
      icon: "Shield",
      usageCount: 78,
      lastUsed: "2024-03-10",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Legal"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "activityType",
          label: "Activity Type",
          type: "select",
          options: [
            "Part-time Course",
            "Freelance Work",
            "Business Activity",
            "Consulting",
            "Other",
          ],
          required: true,
        },
        {
          name: "activityDescription",
          label: "Activity Description",
          type: "textarea",
          required: true,
        },
        {
          name: "activityDuration",
          label: "Activity Duration",
          type: "text",
          required: true,
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },
        { name: "endDate", label: "End Date", type: "date", required: true },
        { name: "purpose", label: "Purpose", type: "textarea", required: true },
        {
          name: "conflictCheck",
          label: "Conflict of Interest Check",
          type: "select",
          options: ["No Conflict", "Potential Conflict", "Requires Review"],
          required: true,
        },
        {
          name: "nonDisclosure",
          label: "Non-Disclosure Required",
          type: "checkbox",
          required: false,
        },
        {
          name: "complianceCheck",
          label: "Compliance Check Status",
          type: "select",
          options: ["Approved", "Pending", "Rejected"],
          required: true,
        },
      ],
      workflowSteps: [
        "Request Submission",
        "Manager Review",
        "Legal Review",
        "HR Approval",
        "Generation",
      ],
      sla: "72 hours",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 5,
      templateId: "TMP005",
      templateName: "Employment Verification Letter",
      templateType: "verification",
      category: "Employment",
      description:
        "Verifies current employment status for external verification",
      icon: "UserCheck",
      usageCount: 156,
      lastUsed: "2024-03-12",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["HR", "Manager"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "joiningDate",
          label: "Joining Date",
          type: "date",
          required: true,
        },
        {
          name: "employmentStatus",
          label: "Employment Status",
          type: "select",
          options: ["Active", "Probation", "Contract", "Intern"],
          required: true,
        },
        {
          name: "currentSalary",
          label: "Current Salary (₹)",
          type: "number",
          required: false,
        },
        {
          name: "verificationPurpose",
          label: "Verification Purpose",
          type: "select",
          options: [
            "Bank Loan",
            "Visa Application",
            "Rental Agreement",
            "Other",
          ],
          required: true,
        },
        {
          name: "verifierName",
          label: "Verifier Name",
          type: "text",
          required: true,
        },
        {
          name: "verifierContact",
          label: "Verifier Contact",
          type: "text",
          required: true,
        },
        {
          name: "verificationDate",
          label: "Verification Date",
          type: "date",
          required: true,
        },
      ],
      workflowSteps: [
        "Request Submission",
        "Manager Verification",
        "HR Approval",
        "Generation",
      ],
      sla: "24 hours",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 6,
      templateId: "TMP006",
      templateName: "Promotion Letter",
      templateType: "promotion",
      category: "Career",
      description: "Official promotion notification with new responsibilities",
      icon: "TrendingUp",
      usageCount: 45,
      lastUsed: "2024-02-28",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Department Head"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "currentDesignation",
          label: "Current Designation",
          type: "text",
          required: true,
        },
        {
          name: "newDesignation",
          label: "New Designation",
          type: "text",
          required: true,
        },
        {
          name: "currentDepartment",
          label: "Current Department",
          type: "text",
          required: true,
        },
        {
          name: "newDepartment",
          label: "New Department",
          type: "text",
          required: false,
        },
        {
          name: "effectiveDate",
          label: "Effective Date",
          type: "date",
          required: true,
        },
        {
          name: "currentSalary",
          label: "Current Salary (₹)",
          type: "number",
          required: true,
        },
        {
          name: "newSalary",
          label: "New Salary (₹)",
          type: "number",
          required: true,
        },
        {
          name: "percentageIncrease",
          label: "Percentage Increase (%)",
          type: "number",
          required: true,
        },
        {
          name: "newResponsibilities",
          label: "New Responsibilities",
          type: "textarea",
          required: true,
        },
        {
          name: "performanceBasis",
          label: "Performance Basis",
          type: "textarea",
          required: true,
        },
        {
          name: "probationPeriod",
          label: "Probation Period",
          type: "text",
          required: false,
        },
        {
          name: "reportingManager",
          label: "Reporting Manager",
          type: "text",
          required: true,
        },
      ],
      workflowSteps: [
        "Initiation",
        "Performance Review",
        "Department Head Approval",
        "HR Approval",
        "Generation",
        "Employee Acceptance",
      ],
      sla: "5 days",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 7,
      templateId: "TMP007",
      templateName: "Transfer Letter",
      templateType: "transfer",
      category: "Career",
      description: "Official transfer notification to new location/department",
      icon: "MapPin",
      usageCount: 32,
      lastUsed: "2024-02-15",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Department Head"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "currentDesignation",
          label: "Current Designation",
          type: "text",
          required: true,
        },
        {
          name: "currentLocation",
          label: "Current Location",
          type: "text",
          required: true,
        },
        {
          name: "newLocation",
          label: "New Location",
          type: "text",
          required: true,
        },
        {
          name: "currentDepartment",
          label: "Current Department",
          type: "text",
          required: true,
        },
        {
          name: "newDepartment",
          label: "New Department",
          type: "text",
          required: false,
        },
        {
          name: "transferType",
          label: "Transfer Type",
          type: "select",
          options: ["Permanent", "Temporary", "Project-based"],
          required: true,
        },
        {
          name: "effectiveDate",
          label: "Effective Date",
          type: "date",
          required: true,
        },
        {
          name: "transferReason",
          label: "Transfer Reason",
          type: "textarea",
          required: true,
        },
        {
          name: "relocationAllowance",
          label: "Relocation Allowance (₹)",
          type: "number",
          required: false,
        },
        {
          name: "reportingManager",
          label: "New Reporting Manager",
          type: "text",
          required: true,
        },
        {
          name: "noticePeriod",
          label: "Notice Period",
          type: "text",
          required: true,
        },
        {
          name: "handoverRequirements",
          label: "Handover Requirements",
          type: "textarea",
          required: true,
        },
      ],
      workflowSteps: [
        "Initiation",
        "Department Approval",
        "HR Approval",
        "Employee Consent",
        "Generation",
      ],
      sla: "3 days",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 8,
      templateId: "TMP008",
      templateName: "Confirmation Letter",
      templateType: "confirmation",
      category: "Employment",
      description: "Confirms permanent employment after probation period",
      icon: "CheckCircle",
      usageCount: 89,
      lastUsed: "2024-03-05",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "joiningDate",
          label: "Joining Date",
          type: "date",
          required: true,
        },
        {
          name: "probationEndDate",
          label: "Probation End Date",
          type: "date",
          required: true,
        },
        {
          name: "confirmationDate",
          label: "Confirmation Date",
          type: "date",
          required: true,
        },
        {
          name: "performanceReview",
          label: "Performance Review",
          type: "select",
          options: ["Excellent", "Good", "Satisfactory", "Needs Improvement"],
          required: true,
        },
        {
          name: "confirmedSalary",
          label: "Confirmed Salary (₹)",
          type: "number",
          required: true,
        },
        {
          name: "newBenefits",
          label: "New Benefits",
          type: "textarea",
          required: false,
        },
        {
          name: "noticePeriod",
          label: "Notice Period",
          type: "text",
          required: true,
        },
        {
          name: "nextReviewDate",
          label: "Next Review Date",
          type: "date",
          required: false,
        },
        {
          name: "reportingManager",
          label: "Reporting Manager",
          type: "text",
          required: true,
        },
      ],
      workflowSteps: [
        "Performance Review",
        "Manager Recommendation",
        "HR Approval",
        "Generation",
        "Employee Acknowledgment",
      ],
      sla: "2 days",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 9,
      templateId: "TMP009",
      templateName: "Increment Letter",
      templateType: "increment",
      category: "Financial",
      description: "Official salary increment notification",
      icon: "TrendingUp",
      usageCount: 67,
      lastUsed: "2024-03-01",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Finance"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "currentSalary",
          label: "Current Salary (₹)",
          type: "number",
          required: true,
        },
        {
          name: "newSalary",
          label: "New Salary (₹)",
          type: "number",
          required: true,
        },
        {
          name: "incrementAmount",
          label: "Increment Amount (₹)",
          type: "number",
          required: true,
        },
        {
          name: "percentageIncrease",
          label: "Percentage Increase (%)",
          type: "number",
          required: true,
        },
        {
          name: "effectiveDate",
          label: "Effective Date",
          type: "date",
          required: true,
        },
        {
          name: "appraisalCycle",
          label: "Appraisal Cycle",
          type: "text",
          required: true,
        },
        {
          name: "performanceRating",
          label: "Performance Rating",
          type: "select",
          options: [
            "A - Outstanding",
            "B - Excellent",
            "C - Good",
            "D - Average",
            "E - Below Average",
          ],
          required: true,
        },
        {
          name: "performanceHighlights",
          label: "Performance Highlights",
          type: "textarea",
          required: true,
        },
        {
          name: "nextReviewDate",
          label: "Next Review Date",
          type: "date",
          required: true,
        },
      ],
      workflowSteps: [
        "Appraisal Review",
        "Manager Recommendation",
        "Finance Approval",
        "HR Approval",
        "Generation",
      ],
      sla: "3 days",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 10,
      templateId: "TMP010",
      templateName: "Loan Sanction Letter",
      templateType: "loan",
      category: "Financial",
      description: "Approval for employee loan with terms and conditions",
      icon: "CreditCard",
      usageCount: 23,
      lastUsed: "2024-02-20",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Finance"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "loanType",
          label: "Loan Type",
          type: "select",
          options: [
            "Personal Loan",
            "Vehicle Loan",
            "Home Loan",
            "Education Loan",
            "Medical Loan",
          ],
          required: true,
        },
        {
          name: "loanAmount",
          label: "Loan Amount (₹)",
          type: "number",
          required: true,
        },
        {
          name: "interestRate",
          label: "Interest Rate (%)",
          type: "number",
          required: true,
        },
        {
          name: "tenure",
          label: "Tenure (Months)",
          type: "number",
          required: true,
        },
        {
          name: "emiAmount",
          label: "EMI Amount (₹)",
          type: "number",
          required: true,
        },
        {
          name: "sanctionDate",
          label: "Sanction Date",
          type: "date",
          required: true,
        },
        {
          name: "disbursementDate",
          label: "Disbursement Date",
          type: "date",
          required: true,
        },
        {
          name: "collateral",
          label: "Collateral Details",
          type: "textarea",
          required: false,
        },
        {
          name: "repaymentStartDate",
          label: "Repayment Start Date",
          type: "date",
          required: true,
        },
        {
          name: "processingFees",
          label: "Processing Fees (₹)",
          type: "number",
          required: false,
        },
        {
          name: "insuranceRequired",
          label: "Insurance Required",
          type: "checkbox",
          required: false,
        },
      ],
      workflowSteps: [
        "Application Submission",
        "Credit Check",
        "Manager Approval",
        "Finance Approval",
        "HR Approval",
        "Generation",
      ],
      sla: "5 days",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 11,
      templateId: "TMP011",
      templateName: "Warning Letter",
      templateType: "warning",
      category: "Disciplinary",
      description: "Formal warning for policy violations or performance issues",
      icon: "AlertTriangle",
      usageCount: 12,
      lastUsed: "2024-02-10",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Legal"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "issueDate",
          label: "Issue Date",
          type: "date",
          required: true,
        },
        {
          name: "warningType",
          label: "Warning Type",
          type: "select",
          options: ["Verbal", "First Written", "Final Written", "Show Cause"],
          required: true,
        },
        {
          name: "violationCategory",
          label: "Violation Category",
          type: "select",
          options: [
            "Attendance",
            "Performance",
            "Behavior",
            "Policy Violation",
            "Security Breach",
          ],
          required: true,
        },
        {
          name: "incidentDescription",
          label: "Incident Description",
          type: "textarea",
          required: true,
        },
        {
          name: "incidentDate",
          label: "Incident Date",
          type: "date",
          required: true,
        },
        {
          name: "policyViolated",
          label: "Policy Violated",
          type: "textarea",
          required: true,
        },
        {
          name: "expectedBehavior",
          label: "Expected Behavior",
          type: "textarea",
          required: true,
        },
        {
          name: "improvementPeriod",
          label: "Improvement Period",
          type: "text",
          required: true,
        },
        {
          name: "nextReviewDate",
          label: "Next Review Date",
          type: "date",
          required: true,
        },
        {
          name: "consequences",
          label: "Consequences of Non-compliance",
          type: "textarea",
          required: true,
        },
        {
          name: "employeeAcknowledgment",
          label: "Employee Acknowledgment Required",
          type: "checkbox",
          required: true,
        },
      ],
      workflowSteps: [
        "Incident Report",
        "Manager Review",
        "HR Review",
        "Legal Review",
        "Generation",
        "Employee Acknowledgment",
      ],
      sla: "3 days",
      digitalSignature: true,
      verificationCode: true,
    },
    {
      id: 12,
      templateId: "TMP012",
      templateName: "Termination Letter",
      templateType: "termination",
      category: "Exit",
      description:
        "Official termination of employment with reasons and settlements",
      icon: "XCircle",
      usageCount: 8,
      lastUsed: "2024-02-05",
      status: "Active",
      autoApprove: false,
      requiredApprovals: ["Manager", "HR", "Legal", "Finance"],
      aiOptimized: true,
      defaultFields: [
        {
          name: "employeeName",
          label: "Employee Name",
          type: "text",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          type: "text",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
        },
        {
          name: "department",
          label: "Department",
          type: "text",
          required: true,
        },
        {
          name: "joiningDate",
          label: "Joining Date",
          type: "date",
          required: true,
        },
        {
          name: "terminationDate",
          label: "Termination Date",
          type: "date",
          required: true,
        },
        {
          name: "lastWorkingDate",
          label: "Last Working Date",
          type: "date",
          required: true,
        },
        {
          name: "terminationType",
          label: "Termination Type",
          type: "select",
          options: [
            "Voluntary",
            "Involuntary",
            "Retrenchment",
            "Resignation Accepted",
            "Termination for Cause",
          ],
          required: true,
        },
        {
          name: "terminationReason",
          label: "Termination Reason",
          type: "textarea",
          required: true,
        },
        {
          name: "noticePeriod",
          label: "Notice Period",
          type: "text",
          required: true,
        },
        {
          name: "severancePackage",
          label: "Severance Package (₹)",
          type: "number",
          required: false,
        },
        {
          name: "finalSettlement",
          label: "Final Settlement Details",
          type: "textarea",
          required: true,
        },
        {
          name: "assetsReturn",
          label: "Assets to be Returned",
          type: "textarea",
          required: true,
        },
        {
          name: "exitInterview",
          label: "Exit Interview Required",
          type: "checkbox",
          required: true,
        },
        {
          name: "nonCompete",
          label: "Non-compete Clause",
          type: "textarea",
          required: false,
        },
        {
          name: "confidentiality",
          label: "Confidentiality Agreement",
          type: "checkbox",
          required: true,
        },
      ],
      workflowSteps: [
        "Termination Initiation",
        "Manager Approval",
        "HR Review",
        "Legal Review",
        "Finance Settlement",
        "Generation",
      ],
      sla: "5 days",
      digitalSignature: true,
      verificationCode: true,
    },
  ]);

  // Letter Requests Data with workflow status
  const [letterRequests, setLetterRequests] = useState([
    {
      id: 1,
      requestId: "LTR-REQ-2024-001",
      employeeId: "EMP001",
      employeeName: "RAHUL SHARMA",
      employeeEmail: "rahul.sharma@company.com",
      // New fields added
      designation: "Senior Software Engineer",
      department: "Engineering",
      lastPromoted: "2023-06-15",
      // Existing fields
      templateType: "experience",
      templateName: "Experience Certificate",
      requestDate: "2024-03-15",
      purpose: "CANADA VISA APPLICATION",
      priority: "High",
      status: "approved",
      statusColor: "success",
      workflowStatus: "completed",
      approvedBy: ["Manager", "HR"],
      approvalDate: "2024-03-15",
      generatedDate: "2024-03-15",
      downloadDate: "2024-03-16",
      downloadCount: 1,
      digitalSignature: true,
      verificationCode: "VER-2024-001",
      auditTrail: [
        {
          action: "Employee Request Submitted",
          by: "RAHUL SHARMA",
          timestamp: "2024-03-15 10:30:00",
          step: "Request Submission",
        },
        {
          action: "Manager Approved",
          by: "PRIYA VERMA",
          timestamp: "2024-03-15 14:20:00",
          step: "Manager Approval",
        },
        {
          action: "HR Approved",
          by: "HR DEPARTMENT",
          timestamp: "2024-03-15 16:45:00",
          step: "HR Approval",
        },
        {
          action: "Letter Generated",
          by: "SYSTEM",
          timestamp: "2024-03-15 16:50:00",
          step: "Generation",
        },
        {
          action: "Digital Signature Applied",
          by: "SYSTEM",
          timestamp: "2024-03-15 16:51:00",
          step: "Digital Signature",
        },
        {
          action: "Downloaded by Employee",
          by: "RAHUL SHARMA",
          timestamp: "2024-03-16 09:15:00",
          step: "Download",
        },
      ],
    },
    {
      id: 2,
      requestId: "LTR-REQ-2024-002",
      employeeId: "EMP002",
      employeeName: "PRIYA PATEL",
      employeeEmail: "priya.patel@company.com",
      // New fields added
      designation: "Lead Developer",
      department: "Technology",
      lastPromoted: "2023-03-10",
      // Existing fields
      templateType: "salary",
      templateName: "Salary Certificate",
      requestDate: "2024-03-18",
      purpose: "HOME LOAN",
      priority: "Medium",
      status: "approved",
      statusColor: "success",
      workflowStatus: "completed",
      approvedBy: ["HR", "Finance"],
      approvalDate: "2024-03-18",
      generatedDate: "2024-03-18",
      downloadDate: "2024-03-18",
      downloadCount: 2,
      digitalSignature: true,
      verificationCode: "VER-2024-002",
      auditTrail: [
        {
          action: "Employee Request Submitted",
          by: "PRIYA PATEL",
          timestamp: "2024-03-18 11:20:00",
          step: "Request Submission",
        },
        {
          action: "Auto-Approved by System",
          by: "AI SYSTEM",
          timestamp: "2024-03-18 11:20:00",
          step: "Auto-Approval",
        },
        {
          action: "Letter Generated",
          by: "SYSTEM",
          timestamp: "2024-03-18 11:21:00",
          step: "Generation",
        },
        {
          action: "Digital Signature Applied",
          by: "SYSTEM",
          timestamp: "2024-03-18 11:21:30",
          step: "Digital Signature",
        },
        {
          action: "Downloaded by Employee",
          by: "PRIYA PATEL",
          timestamp: "2024-03-18 11:30:00",
          step: "Download",
        },
        {
          action: "Downloaded for Bank Verification",
          by: "PRIYA PATEL",
          timestamp: "2024-03-18 15:45:00",
          step: "Download",
        },
      ],
    },
    {
      id: 3,
      requestId: "LTR-REQ-2024-003",
      employeeId: "EMP003",
      employeeName: "AMIT KUMAR",
      employeeEmail: "amit.kumar@company.com",
      // New fields added
      designation: "Project Manager",
      department: "Operations",
      lastPromoted: "2023-09-22",
      // Existing fields
      templateType: "relieving",
      templateName: "Relieving Letter",
      requestDate: "2024-03-20",
      purpose: "EXIT FORMALITIES",
      priority: "High",
      status: "pending",
      statusColor: "warning",
      workflowStatus: "in_progress",
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: "Department Clearance",
      auditTrail: [
        {
          action: "Employee Request Submitted",
          by: "AMIT KUMAR",
          timestamp: "2024-03-20 09:45:00",
          step: "Request Submission",
        },
        {
          action: "Department Clearance Initiated",
          by: "SYSTEM",
          timestamp: "2024-03-20 09:46:00",
          step: "Department Clearance",
        },
      ],
    },
    {
      id: 4,
      requestId: "LTR-REQ-2024-004",
      employeeId: "EMP004",
      employeeName: "SNEHA REDDY",
      employeeEmail: "sneha.reddy@company.com",
      // New fields added
      designation: "HR Manager",
      department: "Human Resources",
      lastPromoted: "2023-11-05",
      // Existing fields
      templateType: "noc",
      templateName: "No Objection Certificate (NOC)",
      requestDate: "2024-03-22",
      purpose: "PART-TIME COURSE",
      priority: "Low",
      status: "rejected",
      statusColor: "danger",
      workflowStatus: "terminated",
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      rejectionReason: "Course conflicts with working hours",
      auditTrail: [
        {
          action: "Employee Request Submitted",
          by: "SNEHA REDDY",
          timestamp: "2024-03-22 14:20:00",
          step: "Request Submission",
        },
        {
          action: "Manager Review Completed",
          by: "MANAGER",
          timestamp: "2024-03-22 16:30:00",
          step: "Manager Review",
        },
        {
          action: "Request Rejected - Conflict with Work Schedule",
          by: "MANAGER",
          timestamp: "2024-03-22 16:35:00",
          step: "Rejection",
        },
      ],
    },
    {
      id: 5,
      requestId: "LTR-REQ-2024-005",
      employeeId: "EMP005",
      employeeName: "RAJESH KUMAR",
      employeeEmail: "rajesh.kumar@company.com",
      // New fields added
      designation: "Senior Manager",
      department: "Business Development",
      lastPromoted: "2023-12-18",
      // Existing fields
      templateType: "promotion",
      templateName: "Promotion Letter",
      requestDate: "2024-03-25",
      purpose: "PROMOTION TO SENIOR MANAGER",
      priority: "High",
      status: "pending",
      statusColor: "warning",
      workflowStatus: "in_progress",
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: "Department Head Approval",
      auditTrail: [
        {
          action: "HR Initiated Promotion Process",
          by: "HR DEPARTMENT",
          timestamp: "2024-03-25 11:00:00",
          step: "Initiation",
        },
        {
          action: "Performance Review Completed",
          by: "MANAGER",
          timestamp: "2024-03-25 14:30:00",
          step: "Performance Review",
        },
      ],
    },
    {
      id: 6,
      requestId: "LTR-REQ-2024-006",
      employeeId: "EMP006",
      employeeName: "VIKAS SINGH",
      employeeEmail: "vikas.singh@company.com",
      // New fields added
      designation: "Technical Architect",
      department: "Engineering",
      lastPromoted: "2023-08-30",
      // Existing fields
      templateType: "verification",
      templateName: "Employment Verification Letter",
      requestDate: "2024-03-24",
      purpose: "BANK LOAN VERIFICATION",
      priority: "Medium",
      status: "approved",
      statusColor: "success",
      workflowStatus: "completed",
      approvedBy: ["HR", "Manager"],
      approvalDate: "2024-03-24",
      generatedDate: "2024-03-24",
      downloadDate: "2024-03-24",
      downloadCount: 1,
      digitalSignature: true,
      verificationCode: "VER-2024-004",
      auditTrail: [
        {
          action: "Employee Request Submitted",
          by: "VIKAS SINGH",
          timestamp: "2024-03-24 09:15:00",
          step: "Request Submission",
        },
        {
          action: "Manager Verification Completed",
          by: "MANAGER",
          timestamp: "2024-03-24 11:30:00",
          step: "Manager Verification",
        },
        {
          action: "HR Approved",
          by: "HR DEPARTMENT",
          timestamp: "2024-03-24 14:45:00",
          step: "HR Approval",
        },
        {
          action: "Letter Generated",
          by: "SYSTEM",
          timestamp: "2024-03-24 14:50:00",
          step: "Generation",
        },
        {
          action: "Downloaded for Bank",
          by: "VIKAS SINGH",
          timestamp: "2024-03-24 16:20:00",
          step: "Download",
        },
      ],
    },
    {
      id: 7,
      requestId: "LTR-REQ-2024-007",
      employeeId: "EMP007",
      employeeName: "ANITA DESAI",
      employeeEmail: "anita.desai@company.com",
      // New fields added
      designation: "Finance Analyst",
      department: "Finance",
      lastPromoted: "2023-05-12",
      // Existing fields
      templateType: "increment",
      templateName: "Increment Letter",
      requestDate: "2024-03-26",
      purpose: "SALARY INCREMENT",
      priority: "Medium",
      status: "pending",
      statusColor: "warning",
      workflowStatus: "in_progress",
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: "Finance Approval",
      auditTrail: [
        {
          action: "Appraisal Review Completed",
          by: "MANAGER",
          timestamp: "2024-03-26 10:00:00",
          step: "Appraisal Review",
        },
        {
          action: "Manager Recommendation Submitted",
          by: "MANAGER",
          timestamp: "2024-03-26 10:30:00",
          step: "Manager Recommendation",
        },
      ],
    },
    {
      id: 8,
      requestId: "LTR-REQ-2024-008",
      employeeId: "EMP008",
      employeeName: "SANJAY VERMA",
      employeeEmail: "sanjay.verma@company.com",
      // New fields added
      designation: "Marketing Head",
      department: "Marketing",
      lastPromoted: "2023-10-08",
      // Existing fields
      templateType: "loan",
      templateName: "Loan Sanction Letter",
      requestDate: "2024-03-27",
      purpose: "HOME LOAN SANCTION",
      priority: "High",
      status: "pending",
      statusColor: "warning",
      workflowStatus: "in_progress",
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      currentStep: "Credit Check",
      auditTrail: [
        {
          action: "Application Submitted",
          by: "SANJAY VERMA",
          timestamp: "2024-03-27 09:00:00",
          step: "Application Submission",
        },
      ],
    },
  ]);

  // Generated Letters Archive
  const [letterArchive, setLetterArchive] = useState([
    {
      id: 1,
      letterId: "LTR-2024-001",
      templateName: "Experience Certificate",
      employeeName: "RAHUL SHARMA",
      employeeId: "EMP001",
      employeeEmail: "rahul.sharma@company.com",
      generationDate: "2024-03-15",
      purpose: "CANADA VISA APPLICATION",
      downloadCount: 3,
      lastAccessed: "2024-03-16",
      fileSize: "245 KB",
      status: "Active",
      digitalSignature: true,
      verificationCode: "VER-2024-001",
      format: "PDF",
      version: "1.0",
      workflowId: "WF-2024-001",
    },
    {
      id: 2,
      letterId: "LTR-2024-002",
      templateName: "Salary Certificate",
      employeeName: "PRIYA PATEL",
      employeeId: "EMP002",
      employeeEmail: "priya.patel@company.com",
      generationDate: "2024-03-18",
      purpose: "HOME LOAN",
      downloadCount: 2,
      lastAccessed: "2024-03-18",
      fileSize: "189 KB",
      status: "Active",
      digitalSignature: true,
      verificationCode: "VER-2024-002",
      format: "PDF",
      version: "1.0",
      workflowId: "WF-2024-002",
    },
    {
      id: 3,
      letterId: "LTR-2024-004",
      templateName: "Employment Verification Letter",
      employeeName: "VIKAS SINGH",
      employeeId: "EMP006",
      employeeEmail: "vikas.singh@company.com",
      generationDate: "2024-03-24",
      purpose: "BANK LOAN VERIFICATION",
      downloadCount: 1,
      lastAccessed: "2024-03-24",
      fileSize: "198 KB",
      status: "Active",
      digitalSignature: true,
      verificationCode: "VER-2024-004",
      format: "PDF",
      version: "1.0",
      workflowId: "WF-2024-006",
    },
    {
      id: 4,
      letterId: "LTR-2024-005",
      templateName: "Confirmation Letter",
      employeeName: "ROHAN MEHTA",
      employeeId: "EMP009",
      employeeEmail: "rohan.mehta@company.com",
      generationDate: "2024-03-20",
      purpose: "PROBATION COMPLETION",
      downloadCount: 1,
      lastAccessed: "2024-03-20",
      fileSize: "175 KB",
      status: "Active",
      digitalSignature: true,
      verificationCode: "VER-2024-005",
      format: "PDF",
      version: "1.0",
      workflowId: "WF-2024-009",
    },
  ]);

  // Statistics
  const statistics = {
    totalTemplates: letterTemplates.length,
    totalRequests: letterRequests.length,
    approvedRequests: letterRequests.filter((r) => r.status === "approved")
      .length,
    pendingRequests: letterRequests.filter((r) => r.status === "pending")
      .length,
    rejectedRequests: letterRequests.filter((r) => r.status === "rejected")
      .length,
    totalDownloads: letterRequests.reduce(
      (sum, req) => sum + req.downloadCount,
      0
    ),
    aiOptimized: letterTemplates.filter((t) => t.aiOptimized).length,
    autoApprove: letterTemplates.filter((t) => t.autoApprove).length,
    digitalSignatures: letterRequests.filter((r) => r.digitalSignature).length,
    avgProcessingTime: "4.2 hours",
  };

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    return new Date(dateTimeString.replace(" ", "T")).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="badge bg-success">Approved</span>;
      case "pending":
        return <span className="badge bg-warning">Pending</span>;
      case "rejected":
        return <span className="badge bg-danger">Rejected</span>;
      case "Active":
        return <span className="badge bg-success">Active</span>;
      case "Inactive":
        return <span className="badge bg-secondary">Inactive</span>;
      case "completed":
        return <span className="badge bg-success">Completed</span>;
      case "in_progress":
        return <span className="badge bg-warning">In Progress</span>;
      case "terminated":
        return <span className="badge bg-danger">Terminated</span>;
      default:
        return <span className="badge bg-info">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <span className="badge bg-danger">High</span>;
      case "Medium":
        return <span className="badge bg-warning">Medium</span>;
      case "Low":
        return <span className="badge bg-info">Low</span>;
      default:
        return <span className="badge bg-secondary">{priority}</span>;
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      FileCheck: FileCheck,
      CheckCircle: CheckCircle,
      DollarSign: DollarSign,
      Shield: Shield,
      TrendingUp: TrendingUp,
      UserCheck: UserCheck,
      MapPin: MapPin,
      CreditCard: CreditCard,
      AlertTriangle: AlertTriangle,
      XCircle: XCircle,
      FileText: FileText,
    };

    const Icon = iconMap[iconName] || FileText;
    return <Icon size={20} />;
  };

  const handleGenerateLetter = (letterData) => {
    const newLetter = {
      id: letterArchive.length + 1,
      ...letterData,
      letterId: `LTR-${new Date().getFullYear()}-${String(
        letterArchive.length + 1
      ).padStart(3, "0")}`,
      generationDate: new Date().toISOString().split("T")[0],
      downloadCount: 0,
      lastAccessed: null,
      fileSize: "~250 KB",
      status: "Active",
      digitalSignature: true,
      verificationCode: `VER-${new Date().getFullYear()}-${String(
        letterArchive.length + 1
      ).padStart(3, "0")}`,
      format: "PDF",
      version: "1.0",
      workflowId: `WF-${new Date().getFullYear()}-${String(
        letterArchive.length + 1
      ).padStart(3, "0")}`,
    };

    // Create request
    const newRequest = {
      id: letterRequests.length + 1,
      requestId: `LTR-REQ-${new Date().getFullYear()}-${String(
        letterRequests.length + 1
      ).padStart(3, "0")}`,
      employeeId: letterData.employeeId || "EMP001",
      employeeName: letterData.employeeName || "Employee",
      employeeEmail: letterData.employeeEmail || "employee@company.com",
      templateType: letterData.templateType,
      templateName: letterData.templateName,
      requestDate: new Date().toISOString().split("T")[0],
      purpose: letterData.purpose || "General Purpose",
      priority: letterData.priority || "Medium",
      status: "approved",
      statusColor: "success",
      workflowStatus: "completed",
      approvedBy: ["System"],
      approvalDate: new Date().toISOString().split("T")[0],
      generatedDate: new Date().toISOString().split("T")[0],
      downloadDate: null,
      downloadCount: 0,
      digitalSignature: true,
      verificationCode: newLetter.verificationCode,
      auditTrail: [
        {
          action: "Letter Generated by HR",
          by: "HR Manager",
          timestamp: new Date().toLocaleString(),
          step: "Generation",
        },
        {
          action: "Digital Signature Applied",
          by: "SYSTEM",
          timestamp: new Date().toLocaleString(),
          step: "Digital Signature",
        },
      ],
    };

    setLetterArchive((prev) => [...prev, newLetter]);
    setLetterRequests((prev) => [...prev, newRequest]);
    setShowLetterModal(false);
    alert(`Letter generated successfully! Letter ID: ${newLetter.letterId}`);
  };

  // Update handleApproveRequest function
  const handleApproveRequest = (requestId) => {
    const request = letterRequests.find((r) => r.id === requestId);
    if (!request) return;

    setLetterRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? {
              ...req,
              status: "approved",
              statusColor: "success",
              workflowStatus: "completed",
              approvedBy: [...req.approvedBy, "HR Manager"],
              approvalDate: new Date().toISOString().split("T")[0],
              generatedDate: new Date().toISOString().split("T")[0],
              digitalSignature: true,
              verificationCode: `VER-${new Date().getFullYear()}-${requestId}`,
              auditTrail: [
                ...req.auditTrail,
                {
                  action: "Approved by HR Manager",
                  by: "HR Manager",
                  timestamp: new Date().toLocaleString(),
                  step: "HR Approval",
                },
              ],
            }
          : req
      )
    );

    // Generate the letter and add to archive
    const newLetter = {
      id: letterArchive.length + 1,
      letterId: `LTR-${new Date().getFullYear()}-${String(
        letterArchive.length + 1
      ).padStart(3, "0")}`,
      templateName: request.templateName,
      employeeName: request.employeeName,
      employeeId: request.employeeId,
      employeeEmail: request.employeeEmail,
      generationDate: new Date().toISOString().split("T")[0],
      purpose: request.purpose,
      downloadCount: 0,
      lastAccessed: null,
      fileSize: "~250 KB",
      status: "Active",
      digitalSignature: true,
      verificationCode: `VER-${new Date().getFullYear()}-${String(
        letterArchive.length + 1
      ).padStart(3, "0")}`,
      format: "PDF",
      version: "1.0",
      workflowId: `WF-${new Date().getFullYear()}-${requestId}`,
    };

    setLetterArchive((prev) => [...prev, newLetter]);

    setActionNotification({
      show: true,
      type: "success",
      title: "Request Approved",
      message: `Request ${request.requestId} approved and letter generated! Letter ID: ${newLetter.letterId}`,
    });
  };

  // Update handleRejectRequest function (use card-based rejection)
  const handleRejectRequest = (requestId) => {
    const request = letterRequests.find((r) => r.id === requestId);
    if (!request) return;

    setSelectedRequestToReject(request);
    setShowRejectReasonCard(true);
  };

  const handleDownloadLetter = (letterId) => {
    const letter = letterArchive.find((l) => l.id === letterId);
    if (!letter) return;

    // Update download count
    setLetterArchive((prev) =>
      prev.map((l) =>
        l.id === letterId
          ? {
              ...l,
              downloadCount: l.downloadCount + 1,
              lastAccessed: new Date().toISOString().split("T")[0],
            }
          : l
      )
    );

    // Create and download file
    const content = `
      ${letter.templateName}
      ========================================
      
      Letter ID: ${letter.letterId}
      Verification Code: ${letter.verificationCode}
      Generated Date: ${formatDate(letter.generationDate)}
      
      ========================================
      
      TO WHOM IT MAY CONCERN
      
      This is to certify that ${letter.employeeName} (Employee ID: ${
      letter.employeeId
    }) 
      ${
        letter.templateName.toLowerCase() === "experience certificate"
          ? "was employed with our organization"
          : "is an employee of our organization"
      }.
      
      Purpose: ${letter.purpose}
      
      This document is digitally signed and can be verified using the verification code provided above.
      
      ========================================
      
      Digital Signature: ${
        letter.digitalSignature ? "VERIFIED" : "NOT AVAILABLE"
      }
      Format: ${letter.format}
      Version: ${letter.version}
      File Size: ${letter.fileSize}
      Last Accessed: ${
        letter.lastAccessed ? formatDate(letter.lastAccessed) : "N/A"
      }
      Total Downloads: ${letter.downloadCount}
      
      ========================================
      
      This is an official document generated by the HR Letter Generation System.
      For verification, please contact HR Department.
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${letter.letterId}-${letter.employeeName.replace(
      /\s+/g,
      "-"
    )}-${letter.templateName.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(
      `Letter downloaded successfully!\nLetter ID: ${letter.letterId}\nVerification Code: ${letter.verificationCode}`
    );
  };

  const handleViewAuditTrail = (request) => {
    setSelectedAuditRequest(request);
    setSelectedAuditTrail(request.auditTrail || []);
    setShowAuditTrailModal(true);
  };

  // Filter workflows based on view and filters
  const filteredWorkflows = workflowRequests.filter((request) => {
    // Apply view filter
    if (workflowView === "active" && request.workflowStatus !== "in_progress")
      return false;
    if (workflowView === "pending" && request.status !== "pending_approval")
      return false;
    if (workflowView === "completed" && request.workflowStatus !== "completed")
      return false;

    // Apply template filter
    if (
      workflowFilter.templateType &&
      request.templateType !== workflowFilter.templateType
    )
      return false;

    // Apply priority filter
    if (workflowFilter.priority && request.priority !== workflowFilter.priority)
      return false;

    // Apply search filter
    if (workflowFilter.search) {
      const searchLower = workflowFilter.search.toLowerCase();
      return (
        request.requestId.toLowerCase().includes(searchLower) ||
        request.employeeName.toLowerCase().includes(searchLower) ||
        request.employeeId.toLowerCase().includes(searchLower) ||
        request.templateName.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // Handle workflow approval
  const handleWorkflowApproval = (requestId) => {
    const request = workflowRequests.find((r) => r.id === requestId);
    if (!request) return;

    const template = letterTemplates.find(
      (t) => t.templateType === request.templateType
    );
    const currentStepIndex =
      template?.workflowSteps?.findIndex(
        (step) => step === request.currentStep
      ) || 0;
    const totalSteps = template?.workflowSteps?.length || 0;

    if (currentStepIndex < totalSteps - 1) {
      // Move to next step
      const nextStep =
        template?.workflowSteps?.[currentStepIndex + 1] || "Next Step";

      setWorkflowRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? {
                ...req,
                currentStep: nextStep,
                approvedBy: [...req.approvedBy, "HR Manager"],
                auditTrail: [
                  ...req.auditTrail,
                  {
                    action: `Step Approved: ${req.currentStep}`,
                    by: "HR Manager",
                    timestamp: new Date().toLocaleString(),
                    step: nextStep,
                  },
                ],
              }
            : req
        )
      );

      alert(`Approved! Moved to: ${nextStep}`);
    } else {
      // Complete workflow
      setWorkflowRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? {
                ...req,
                status: "approved",
                workflowStatus: "completed",
                currentStep: "Completed",
                approvedBy: [...req.approvedBy, "HR Manager"],
                approvalDate: new Date().toISOString().split("T")[0],
                auditTrail: [
                  ...req.auditTrail,
                  {
                    action: "Workflow Completed",
                    by: "HR Manager",
                    timestamp: new Date().toLocaleString(),
                    step: "Completion",
                  },
                ],
              }
            : req
        )
      );

      // Generate letter
      const newLetter = {
        id: letterArchive.length + 1,
        letterId: `LTR-${new Date().getFullYear()}-${String(
          letterArchive.length + 1
        ).padStart(3, "0")}`,
        templateName: request.templateName,
        employeeName: request.employeeName,
        employeeId: request.employeeId,
        employeeEmail: request.employeeEmail,
        generationDate: new Date().toISOString().split("T")[0],
        purpose: request.purpose,
        downloadCount: 0,
        lastAccessed: null,
        fileSize: "~250 KB",
        status: "Active",
        digitalSignature: true,
        verificationCode: `VER-${new Date().getFullYear()}-${String(
          letterArchive.length + 1
        ).padStart(3, "0")}`,
        format: "PDF",
        version: "1.0",
        workflowId: request.requestId,
      };

      setLetterArchive((prev) => [...prev, newLetter]);
      alert("Workflow completed! Letter generated and archived.");
    }
  };

  // Handle advancing workflow
  const handleAdvanceWorkflow = (requestId) => {
    const request = workflowRequests.find((r) => r.id === requestId);
    if (!request) return;

    const template = letterTemplates.find(
      (t) => t.templateType === request.templateType
    );
    const currentStepIndex =
      template?.workflowSteps?.findIndex(
        (step) => step === request.currentStep
      ) || 0;
    const totalSteps = template?.workflowSteps?.length || 0;

    if (currentStepIndex < totalSteps - 1) {
      const nextStep =
        template?.workflowSteps?.[currentStepIndex + 1] || "Next Step";

      setWorkflowRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? {
                ...req,
                currentStep: nextStep,
                auditTrail: [
                  ...req.auditTrail,
                  {
                    action: `Advanced to: ${nextStep}`,
                    by: "HR Manager",
                    timestamp: new Date().toLocaleString(),
                    step: nextStep,
                  },
                ],
              }
            : req
        )
      );

      alert(`Advanced to: ${nextStep}`);
    }
  };

  // Simulate employee request
  const simulateEmployeeRequest = () => {
    const employees = [
      "RAJESH KUMAR",
      "ANITA DESAI",
      "SANJAY VERMA",
      "ROHAN MEHTA",
    ];
    const purposes = [
      "Promotion Letter",
      "Salary Certificate",
      "Experience Letter",
      "Transfer Letter",
    ];
    const employee = employees[Math.floor(Math.random() * employees.length)];
    const purpose = purposes[Math.floor(Math.random() * purposes.length)];
    const template =
      letterTemplates.find((t) => t.templateType === "experience") ||
      letterTemplates[0];

    const newRequest = {
      id: workflowRequests.length + 1,
      requestId: `LTR-REQ-${new Date().getFullYear()}-${String(
        workflowRequests.length + 1
      ).padStart(3, "0")}`,
      employeeId: `EMP${String(workflowRequests.length + 100).padStart(
        3,
        "0"
      )}`,
      employeeName: employee,
      employeeEmail: `${employee.toLowerCase().replace(" ", ".")}@company.com`,
      templateType: template.templateType,
      templateName: template.templateName,
      requestDate: new Date().toISOString().split("T")[0],
      purpose: purpose,
      priority: "Medium",
      status: "pending_approval",
      workflowStatus: "in_progress",
      currentStep: "Request Submission",
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      digitalSignature: true,
      verificationCode: null,
      autoApproved: false,
      hrArchived: false,
      auditTrail: [
        {
          action: "Employee Request Submitted",
          by: employee,
          timestamp: new Date().toLocaleString(),
          step: "Request Submission",
          details: `Simulated request for ${purpose}`,
        },
      ],
    };

    setWorkflowRequests((prev) => [...prev, newRequest]);
    alert(
      `Employee request simulated successfully!\nRequest ID: ${newRequest.requestId}\nEmployee: ${employee}\nPurpose: ${purpose}`
    );
  };

  // View workflow details
  // Handle viewing workflow details
  const handleViewWorkflowDetails = (requestId) => {
    const request = workflowRequests.find((r) => r.id === requestId);
    if (!request) return;

    setSelectedWorkflow(request);
    setShowWorkflowDetails(true);

    // Show detailed information
  //   const details = `
  //   Workflow Details:
    
  //   Request ID: ${request.requestId}
  //   Employee: ${request.employeeName} (${request.employeeId})
  //   Letter Type: ${request.templateName}
  //   Purpose: ${request.purpose}
  //   Status: ${request.status}
  //   Priority: ${request.priority}
  //   Current Step: ${request.currentStep}
  //   Requested: ${formatDate(request.requestDate)}
    
  //   Audit Trail:
  //   ${request.auditTrail
  //     .map(
  //       (trail) =>
  //         `${formatDateTime(trail.timestamp)} - ${trail.action} by ${trail.by}`
  //     )
  //     .join("\n")}
  // `;
  };

  // Save workflow configuration
  const saveWorkflowConfig = () => {
    alert("Workflow configuration saved successfully!");
  };

  // Save SLA settings
  const saveSLASettings = () => {
    const highSLA = slaHighRef.current?.value || "4";
    const mediumSLA = slaMediumRef.current?.value || "24";
    const lowSLA = slaLowRef.current?.value || "72";

    alert(
      `SLA settings updated:\nHigh: ${highSLA} hours\nMedium: ${mediumSLA} hours\nLow: ${lowSLA} hours`
    );
  };
  // Handle template auto-approve toggle
  const handleTemplateAutoApprove = (templateId, enabled) => {
    setLetterTemplates((prev) =>
      prev.map((template) =>
        template.id === templateId
          ? { ...template, autoApprove: enabled }
          : template
      )
    );
  };
  // Helper functions
  const confirmBulkApprove = () => {
    const pendingRequests = workflowRequests.filter(
      (req) => req.status === "pending_approval"
    );

    const updatedRequests = workflowRequests.map((req) => {
      if (req.status === "pending_approval") {
        return {
          ...req,
          status: "approved",
          workflowStatus: "completed",
          approvedBy: [...req.approvedBy, "HR Manager"],
          approvalDate: new Date().toISOString().split("T")[0],
          auditTrail: [
            ...req.auditTrail,
            {
              action: "Bulk Approved",
              by: "HR Manager",
              timestamp: new Date().toLocaleString(),
              step: "Bulk Approval",
            },
          ],
        };
      }
      return req;
    });

    setWorkflowRequests(updatedRequests);
    setShowBulkApproveConfirm(false);

    setNotification({
      show: true,
      type: "success",
      message: `Successfully approved ${pendingRequests.length} pending requests`,
    });
  };

  const handleConfirmRejection = () => {
    if (!rejectionReason.trim() || !selectedRequestToReject) {
      setActionNotification({
        show: true,
        type: "warning",
        title: "Validation Required",
        message: "Please enter a rejection reason before confirming.",
      });
      return;
    }

    // Update workflowRequests if this is a workflow request
    setWorkflowRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequestToReject.id
          ? {
              ...req,
              status: "rejected",
              workflowStatus: "terminated",
              rejectionReason: rejectionReason,
              auditTrail: [
                ...req.auditTrail,
                {
                  action: "Workflow Rejected",
                  by: "HR Manager",
                  timestamp: new Date().toLocaleString(),
                  step: "Rejection",
                  details: `Reason: ${rejectionReason}`,
                },
              ],
            }
          : req
      )
    );

    // Also update letterRequests if needed
    setLetterRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequestToReject.id
          ? {
              ...req,
              status: "rejected",
              statusColor: "danger",
              workflowStatus: "terminated",
              rejectionReason: rejectionReason,
              auditTrail: [
                ...req.auditTrail,
                {
                  action: "Rejected by HR Manager",
                  by: "HR Manager",
                  timestamp: new Date().toLocaleString(),
                  step: "Rejection",
                  details: `Reason: ${rejectionReason}`,
                },
              ],
            }
          : req
      )
    );

    // Show success notification
    setActionNotification({
      show: true,
      type: "success",
      title: "Request Rejected",
      message: `Request ${selectedRequestToReject.requestId} has been rejected successfully. The rejection reason has been recorded.`,
    });

    // Reset states
    setShowRejectReasonCard(false);
    setSelectedRequestToReject(null);
    setRejectionReason("");
  };

  const calculateAverageSLA = () => {
    const templates = workflowRequests
      .map((req) =>
        letterTemplates.find((t) => t.templateType === req.templateType)
      )
      .filter((t) => t);

    if (templates.length === 0) return "N/A";

    const totalHours = templates.reduce((sum, t) => {
      const sla = t.sla || "24 hours";
      const hours = parseInt(sla) * (sla.includes("day") ? 24 : 1);
      return sum + hours;
    }, 0);

    return `${Math.round(totalHours / templates.length)} hours`;
  };

  const calculateCompletionRate = () => {
    if (workflowRequests.length === 0) return 0;
    const completed = workflowRequests.filter(
      (r) => r.workflowStatus === "completed"
    ).length;
    return Math.round((completed / workflowRequests.length) * 100);
  };

  // Update handleCreateWorkflow function
  const handleCreateWorkflow = () => {
    if (!newWorkflowTemplate || !newWorkflowPurpose) {
      setNotification({
        show: true,
        type: "warning",
        message: "Please select a template and enter a purpose",
      });
      return;
    }

    const template = letterTemplates.find(
      (t) => t.templateType === newWorkflowTemplate
    );
    const employees = [
      "RAHUL SHARMA",
      "PRIYA PATEL",
      "AMIT KUMAR",
      "SNEHA REDDY",
    ];
    const employee = employees[Math.floor(Math.random() * employees.length)];

    const newWorkflow = {
      id: workflowRequests.length + 1,
      requestId: `LTR-REQ-${new Date().getFullYear()}-${String(
        workflowRequests.length + 1
      ).padStart(3, "0")}`,
      employeeId: `EMP${String(workflowRequests.length + 1).padStart(3, "0")}`,
      employeeName: employee,
      employeeEmail: `${employee.toLowerCase().replace(" ", ".")}@company.com`,
      templateType: template.templateType,
      templateName: template.templateName,
      requestDate: new Date().toISOString().split("T")[0],
      purpose: newWorkflowPurpose,
      priority: newWorkflowPriority,
      status: "pending_approval",
      workflowStatus: "in_progress",
      currentStep: template.workflowSteps[0] || "Request Submission",
      approvedBy: [],
      approvalDate: null,
      generatedDate: null,
      downloadDate: null,
      downloadCount: 0,
      digitalSignature: true,
      verificationCode: null,
      autoApproved: template.autoApprove,
      hrArchived: false,
      auditTrail: [
        {
          action: "Workflow Created",
          by: "HR Manager",
          timestamp: new Date().toLocaleString(),
          step: "Creation",
        },
      ],
    };

    setWorkflowRequests((prev) => [...prev, newWorkflow]);
    setShowRequestModal(false);

    // Reset form
    setNewWorkflowTemplate("");
    setNewWorkflowPriority("Medium");
    setNewWorkflowPurpose("");

    setNotification({
      show: true,
      type: "success",
      message: `New workflow created successfully! Request ID: ${newWorkflow.requestId}`,
    });
  };

  // Filter templates based on search term
  const filteredTemplates = letterTemplates.filter(
    (template) =>
      searchTerm === "" ||
      template.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.templateType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter requests based on search term
  const filteredRequests = letterRequests.filter(
    (request) =>
      searchTerm === "" ||
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter archive based on search term
  const filteredArchive = letterArchive.filter(
    (letter) =>
      searchTerm === "" ||
      letter.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.letterId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Employee Portal View
  const EmployeePortal = () => {
    const [employeeView, setEmployeeView] = useState("myRequests");
    const [selectedEmployee, setSelectedEmployee] = useState({
      id: "EMP001",
      name: "RAHUL SHARMA",
      email: "rahul.sharma@company.com",
      department: "Engineering",
      designation: "Senior Developer",
    });

    return (
      <div className="row g-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h6 className="fw-bold mb-0">Employee Portal</h6>
              <small className="text-muted">
                Employee self-service for letter requests
              </small>
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
                            <div className="fw-bold text-truncate">
                              {selectedEmployee.name}
                            </div>
                            <small className="text-muted text-truncate">
                              {selectedEmployee.designation}
                            </small>
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
                              {
                                letterRequests.filter(
                                  (r) => r.employeeId === selectedEmployee.id
                                ).length
                              }
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
                              {letterRequests
                                .filter(
                                  (r) => r.employeeId === selectedEmployee.id
                                )
                                .reduce(
                                  (sum, req) => sum + req.downloadCount,
                                  0
                                )}
                            </div>
                            <small className="text-muted">
                              Total Downloads
                            </small>
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
                    className={`btn ${
                      employeeView === "myRequests"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } btn-responsive`}
                    onClick={() => setEmployeeView("myRequests")}
                  >
                    <span className="d-none d-sm-inline">My Requests</span>
                    <span className="d-sm-none">Requests</span>
                  </button>
                  <button
                    className={`btn ${
                      employeeView === "requestLetter"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } btn-responsive`}
                    onClick={() => setEmployeeView("requestLetter")}
                  >
                    <span className="d-none d-sm-inline">Request New</span>
                    <span className="d-sm-none">Request</span>
                  </button>
                  <button
                    className={`btn ${
                      employeeView === "downloads"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } btn-responsive`}
                    onClick={() => setEmployeeView("downloads")}
                  >
                    Downloads
                  </button>
                </div>
              </div>

              {employeeView === "myRequests" && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="min-width-120">Request ID</th>
                        <th className="d-none d-md-table-cell min-width-150">
                          Letter Type
                        </th>
                        <th className="d-none d-lg-table-cell min-width-100">
                          Designation
                        </th>
                        <th className="d-none d-xl-table-cell min-width-100">
                          Department
                        </th>
                        <th className="min-width-100">Date</th>
                        <th className="min-width-100">Purpose</th>
                        <th className="d-none d-sm-table-cell min-width-100">
                          Last Promoted
                        </th>
                        <th className="d-none d-sm-table-cell min-width-100">
                          Last Increment
                        </th>
                        <th className="min-width-100">Status</th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {letterRequests
                        .filter((r) => r.employeeId === selectedEmployee.id)
                        .map((request) => (
                          <tr key={request.id}>
                            <td className="small text-truncate">
                              {request.requestId}
                              <small className="text-muted d-block d-md-none">
                                {request.templateName}
                              </small>
                            </td>
                            <td className="d-none d-md-table-cell text-truncate">
                              {request.templateName}
                            </td>
                            <td className="d-none d-lg-table-cell text-truncate">
                              {request.designation || "Senior Developer"}
                            </td>
                            <td className="d-none d-xl-table-cell text-truncate">
                              {request.department || "Engineering"}
                            </td>
                            <td>{formatDate(request.requestDate)}</td>
                            <td>
                              <div
                                className="text-truncate"
                                title={request.purpose}
                              >
                                {request.purpose}
                              </div>
                            </td>
                            <td className="d-none d-sm-table-cell">
                              {request.lastPromoted
                                ? formatDate(request.lastPromoted)
                                : "2023-06-15"}
                            </td>
                            <td className="d-none d-sm-table-cell">
                              {request.lastIncrement
                                ? formatDate(request.lastIncrement)
                                : "2023-04-15"}
                            </td>
                            <td>{getStatusBadge(request.status)}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-info btn-sm btn-icon"
                                  onClick={() =>
                                    handleViewAuditTrail(request.id)
                                  }
                                  title="View Details"
                                >
                                  <Eye size={12} />
                                </button>
                                {request.status === "approved" && (
                                  <button
                                    className="btn btn-outline-success btn-sm btn-icon"
                                    onClick={() => {
                                      const archiveLetter = letterArchive.find(
                                        (l) =>
                                          l.employeeId === request.employeeId &&
                                          l.templateName ===
                                            request.templateName
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

              {employeeView === "requestLetter" && (
                <div className="row g-3">
                  {letterTemplates.map((template) => (
                    <div key={template.id} className="col-12 col-md-6 col-lg-4">
                      <div className="card h-100">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex align-items-start mb-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                              {getIconComponent(template.icon)}
                            </div>
                            <div className="flex-grow-1">
<h6 className="fw-bold mb-1 text-truncate" style={{ fontSize: '14px' }}>
  {template.templateName}
</h6>
                              <small className="text-muted d-block text-truncate-2">
                                {template.description}
                              </small>
                            </div>
                          </div>
                          <div className="mb-3">
                            <span className="badge bg-info me-2">
                              {template.category}
                            </span>
                            {template.autoApprove && (
                              <span className="badge bg-success">
                                Auto-approve
                              </span>
                            )}
                          </div>
                          <button
                            className="btn btn-primary mt-auto btn-responsive"
                            onClick={() => {
                              const newRequest = {
                                id: letterRequests.length + 1,
                                requestId: `LTR-REQ-${new Date().getFullYear()}-${String(
                                  letterRequests.length + 1
                                ).padStart(3, "0")}`,
                                employeeId: selectedEmployee.id,
                                employeeName: selectedEmployee.name,
                                employeeEmail: selectedEmployee.email,
                                templateType: template.templateType,
                                templateName: template.templateName,
                                requestDate: new Date()
                                  .toISOString()
                                  .split("T")[0],
                                purpose: "Employee Request",
                                priority: "Medium",
                                status: template.autoApprove
                                  ? "approved"
                                  : "pending",
                                statusColor: template.autoApprove
                                  ? "success"
                                  : "warning",
                                workflowStatus: template.autoApprove
                                  ? "completed"
                                  : "in_progress",
                                approvedBy: [],
                                approvalDate: null,
                                generatedDate: null,
                                downloadDate: null,
                                downloadCount: 0,
                                digitalSignature: true,
                                verificationCode: `VER-${new Date().getFullYear()}-${String(
                                  letterRequests.length + 1
                                ).padStart(3, "0")}`,
                                auditTrail: [
                                  {
                                    action: "Employee Request Submitted",
                                    by: selectedEmployee.name,
                                    timestamp: new Date().toLocaleString(),
                                    step: "Request Submission",
                                  },
                                ],
                              };

                              setLetterRequests((prev) => [
                                ...prev,
                                newRequest,
                              ]);
                              alert(
                                `Letter request submitted successfully! Request ID: ${newRequest.requestId}`
                              );
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

              {employeeView === "downloads" && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="min-width-120">Letter ID</th>
                        <th className="d-none d-md-table-cell min-width-150">
                          Letter Type
                        </th>
                        <th className="min-width-100">Generated</th>
                        <th className="min-width-80">Downloads</th>
                        <th className="d-none d-sm-table-cell min-width-120">
                          Verification
                        </th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {letterArchive
                        .filter((l) => l.employeeId === selectedEmployee.id)
                        .map((letter) => (
                          <tr key={letter.id}>
                            <td className="small text-truncate">
                              {letter.letterId}
                            </td>
                            <td className="d-none d-md-table-cell text-truncate">
                              {letter.templateName}
                            </td>
                            <td>{formatDate(letter.generationDate)}</td>
                            <td>{letter.downloadCount}</td>
                            <td className="d-none d-sm-table-cell">
                              <code className="small text-truncate d-block">
                                {letter.verificationCode}
                              </code>
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
        const template = letterTemplates.find(
          (t) => t.id === selectedLetter.id
        );
        if (template) {
          setSelectedTemplate(template);
          const initialData = {};
          template.defaultFields.forEach((field) => {
            initialData[field.name] = field.type === "checkbox" ? false : "";
          });
          setFormData(initialData);
        }
      }
    }, [selectedLetter]);

    const handleInputChange = (fieldName, value) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    };

    const handleGenerate = () => {
      if (!selectedTemplate) {
        alert("Please select a template first");
        return;
      }

      // Validate required fields
      const requiredFields = selectedTemplate.defaultFields.filter(
        (field) => field.required
      );
      const missingFields = requiredFields.filter(
        (field) => !formData[field.name]
      );

      if (missingFields.length > 0) {
        alert(
          `Please fill in all required fields: ${missingFields
            .map((f) => f.label)
            .join(", ")}`
        );
        return;
      }

      handleGenerateLetter({
        templateName: selectedTemplate.templateName,
        templateType: selectedTemplate.templateType,
        employeeName: formData.employeeName || "",
        employeeId:
          formData.employeeId || "EMP" + Math.floor(Math.random() * 1000),
        employeeEmail: formData.employeeEmail || "",
        department: formData.department || "",
        purpose: formData.purpose || "General Purpose",
        priority: "Medium",
        digitalSignature: true,
        auditTrail: true,
      });
    };

    const renderField = (field) => {
      switch (field.type) {
        case "text":
          return (
            <input
              type="text"
              className="form-control form-control-sm"
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
        case "number":
          return (
            <input
              type="number"
              className="form-control form-control-sm"
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
        case "date":
          return (
            <input
              type="date"
              className="form-control form-control-sm"
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
            />
          );
        case "textarea":
          return (
            <textarea
              className="form-control form-control-sm"
              rows="3"
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
        case "select":
          return (
            <select
              className="form-select form-select-sm"
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        case "checkbox":
          return (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) =>
                  handleInputChange(field.name, e.target.checked)
                }
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
              value={formData[field.name] || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label}`}
              required={field.required}
            />
          );
      }
    };

    if (!selectedTemplate && !selectedLetter) {
      return (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <FileEdit className="me-2" />
                  Select Template
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowLetterModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="alert alert-info mb-4">
                  <Info className="me-2" size={16} />
                  Please select a template to generate a letter.
                </div>

                <div className="row row-cols-1 row-cols-md-2 g-3">
                  {letterTemplates.slice(0, 6).map((template) => (
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
                              <h6 className="fw-bold mb-1 text-truncate">
                                {template.templateName}
                              </h6>
                              <small className="text-muted text-truncate-2 d-block">
                                {template.description}
                              </small>
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
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowLetterModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="modal show d-block"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">
                <FileEdit className="me-2" />
                Generate {selectedTemplate?.templateName}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => {
                  setShowLetterModal(false);
                  setSelectedLetter(null);
                }}
              ></button>
            </div>

            <div className="modal-body">
              <div className="alert alert-info mb-4">
                <Info className="me-2" size={16} />
                Fill in the details below to generate{" "}
                {selectedTemplate?.templateName}.
                <span className="text-danger"> * Required fields</span>
              </div>

              <div className="row g-3">
                {selectedTemplate?.defaultFields.map((field, index) => (
                  <div
                    key={field.name}
                    className={`col-12 ${
                      field.type === "textarea" ? "" : "col-md-6"
                    }`}
                  >
                    <label className="form-label">
                      {field.label}
                      {field.required && (
                        <span className="text-danger"> *</span>
                      )}
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
                      <label
                        className="form-check-label"
                        htmlFor="digitalSignature"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="verificationCode"
                      >
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
                      <label
                        className="form-check-label"
                        htmlFor="workflowTracking"
                      >
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
              <h5 className="fw-bold mb-1 text-truncate">
                HR Letter Generation System
              </h5>
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
                  <div
                    className="spinner-grow spinner-grow-sm text-success"
                    role="status"
                  ></div>
                  <span className="fw-medium small">System Active</span>
                </div>
                <div className="vr d-none d-md-inline"></div>
                <span className="text-muted small">
                  {statistics.totalTemplates} templates
                </span>
                <div className="vr d-none d-md-inline"></div>
                <span className="text-muted small">
                  {statistics.totalRequests} requests
                </span>
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
                <div className="h4 h3-md mb-0 fw-bold text-primary">
                  {statistics.totalTemplates}
                </div>
              </div>
              <FileText
                size={20}
                className="text-primary opacity-75 d-none d-md-block"
              />
              <FileText
                size={16}
                className="text-primary opacity-75 d-md-none"
              />
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
                <div className="h4 h3-md mb-0 fw-bold text-success">
                  {statistics.totalRequests}
                </div>
              </div>
              <ClipboardList
                size={20}
                className="text-success opacity-75 d-none d-md-block"
              />
              <ClipboardList
                size={16}
                className="text-success opacity-75 d-md-none"
              />
            </div>
            <div className="small text-muted mt-2">
              {statistics.approvedRequests} approved •{" "}
              {statistics.pendingRequests} pending
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="p-2 p-md-3 bg-white border rounded stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Auto-Approved</div>
                <div className="h4 h3-md mb-0 fw-bold text-warning">
                  {statistics.autoApprove}
                </div>
              </div>
              <Zap
                size={20}
                className="text-warning opacity-75 d-none d-md-block"
              />
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
                <div className="h4 h3-md mb-0 fw-bold text-info">
                  {statistics.totalDownloads}
                </div>
              </div>
              <Download
                size={20}
                className="text-info opacity-75 d-none d-md-block"
              />
              <Download size={16} className="text-info opacity-75 d-md-none" />
            </div>
            <div className="small text-muted mt-2">Letter downloads</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Desktop Only */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex overflow-auto">
            <div className="d-flex flex-nowrap gap-2 w-100">
              {menuItems.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`btn d-flex align-items-center gap-2 px-3 py-2 rounded flex-shrink-0 ${
                    activeSection === section.id
                      ? "btn-primary text-white"
                      : "btn-outline-primary"
                  }`}
                  style={{
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                >
                  {React.cloneElement(section.icon, { size: 16 })}
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>
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
              <button
                type="button"
                className="btn btn-outline-primary d-none d-md-flex align-items-center gap-1"
              >
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <button
                type="button"
                className="btn btn-outline-primary d-md-none btn-sm"
              >
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
      {activeSection === "dashboard" && (
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">Recent Letter Requests</h6>
                <span className="badge bg-primary">
                  {letterRequests.length}
                </span>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th className="min-width-120">Request ID</th>
                        <th className="d-none d-md-table-cell min-width-120">
                          Employee
                        </th>
                        <th className="d-none d-lg-table-cell min-width-100">
                          Designation
                        </th>
                        <th className="d-none d-xl-table-cell min-width-100">
                          Department
                        </th>
                        <th className="min-width-100">Type</th>
                        <th className="d-none d-sm-table-cell min-width-100">
                          Last Promoted
                        </th>
                        <th className="min-width-80">Status</th>
                        <th className="d-none d-sm-table-cell min-width-80">
                          Date
                        </th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {letterRequests.slice(0, 5).map((request) => (
                        <tr key={request.id}>
                          <td className="small text-truncate">
                            {request.requestId}
                          </td>
                          <td className="d-none d-md-table-cell text-truncate">
                            {request.employeeName}
                            <small className="text-muted d-block">
                              {request.employeeId}
                            </small>
                          </td>
                          <td className="d-none d-lg-table-cell text-truncate">
                            {request.designation}
                          </td>
                          <td className="d-none d-xl-table-cell text-truncate">
                            {request.department}
                          </td>
                          <td
                            className="text-truncate"
                            title={request.templateName}
                          >
                            <div className="small fw-medium">
                              {request.templateName}
                            </div>
                            <small className="text-muted d-block d-md-none">
                              {getPriorityBadge(request.priority)}
                            </small>
                          </td>
                          <td className="d-none d-sm-table-cell">
                            {formatDate(request.lastPromoted)}
                          </td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td className="d-none d-sm-table-cell">
                            {formatDate(request.requestDate)}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-info btn-sm btn-icon"
                                onClick={() => handleViewAuditTrail(request)}
                                title="View Audit Trail"
                              >
                                <Eye size={12} />
                              </button>

                              {request.status === "pending" && (
                                <button
                                  className="btn btn-outline-success btn-sm btn-icon"
                                  onClick={() =>
                                    handleApproveRequest(request.id)
                                  }
                                  title="Approve"
                                >
                                  <CheckCircle size={12} />
                                </button>
                              )}
                              {request.status === "pending" && (
                                <button
                                  className="btn btn-outline-danger btn-sm btn-icon"
                                  onClick={() =>
                                    handleRejectRequest(request.id)
                                  }
                                  title="Reject"
                                >
                                  <XCircle size={12} />
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
                    onClick={() => setActiveSection("templates")}
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
                        <span className="badge bg-primary small">
                          {statistics.totalTemplates}
                        </span>
                      </div>
                    </div>
                    <div className="list-group-item py-2">
                      <div className="d-flex justify-content-between">
                        <span className="small">Pending Approvals</span>
                        <span className="badge bg-warning small">
                          {statistics.pendingRequests}
                        </span>
                      </div>
                    </div>
                    <div className="list-group-item py-2">
                      <div className="d-flex justify-content-between">
                        <span className="small">Digital Signatures</span>
                        <span className="badge bg-success small">
                          {statistics.digitalSignatures}
                        </span>
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
      {activeSection === "templates" && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="fw-bold mb-2 mb-md-0">
                  <FileText className="me-2" size={18} />
                  All Letter Templates ({letterTemplates.length})
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">
                    {statistics.totalTemplates} templates
                  </span>
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
                  {filteredTemplates.map((template) => (
                    <div key={template.id} className="template-card">
                      <div className="card h-100 border hover-lift">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex align-items-start mb-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                              {getIconComponent(template.icon)}
                            </div>
                            <div className="flex-grow-1">
                              <h6
                                className="fw-bold mb-1 text-truncate"
                                title={template.templateName}
                              >
                                {template.templateName}
                              </h6>
                              <small className="text-muted text-truncate-2 d-block">
                                {template.description}
                              </small>
                            </div>
                            {template.aiOptimized && (
                              <span className="badge bg-success small">
                                <Sparkles size={10} className="me-1" />
                                AI
                              </span>
                            )}
                          </div>

                          <div className="mb-3">
                            <div className="small text-muted mb-1">
                              Category
                            </div>
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
                            <div className="small text-muted mb-1">
                              Required Approvals
                            </div>
                            <div className="d-flex flex-wrap gap-1">
                              {template.requiredApprovals
                                .slice(0, 2)
                                .map((approval, idx) => (
                                  <span
                                    key={idx}
                                    className="badge bg-light text-dark border small"
                                  >
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

      {/* // Generator Section */}
      {activeSection === "generator" && (
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h6 className="fw-bold mb-0">
                  <FileEdit className="me-2" size={18} />
                  Letter Generator
                </h6>
                <small>
                  Generate letters using templates with dynamic data population
                </small>
              </div>
              <div className="card-body">
                {/* Template Selection */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">1. Select Template</h6>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                    {letterTemplates.map((template) => (
                      <div key={template.id} className="col">
                        <div
                          className={`card border cursor-pointer hover-lift ${
                            selectedLetter?.id === template.id
                              ? "border-primary border-2"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedLetter(template);
                            // Initialize form data for selected template
                            const initialData = {};
                            template.defaultFields.forEach((field) => {
                              initialData[field.name] =
                                field.type === "checkbox" ? false : "";
                            });
                            setFormData(initialData);
                          }}
                        >
                          <div className="card-body d-flex flex-column p-3">
                            {/* Top content */}
                            <div className="d-flex align-items-start mb-2">
                              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                                {getIconComponent(template.icon)}
                              </div>

                              <div
                                className="flex-grow-1"
                                style={{ minWidth: 0 }}
                              >
                                <div
                                  className="fw-bold text-truncate"
                                  style={{
                                    fontSize: "0.8rem",
                                    lineHeight: "1.1",
                                    marginBottom: "0.125rem",
                                  }}
                                >
                                  {template.templateName}
                                </div>

                                <div
                                  className="text-muted"
                                  style={{
                                    fontSize: "0.7rem",
                                    lineHeight: "1",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {template.description}
                                </div>
                              </div>
                            </div>

                            {/* Push badges to bottom */}
                            <div className="mt-auto">
                              <span
                                className="badge bg-info bg-opacity-10 text-info me-1"
                                style={{ fontSize: "0.65rem" }}
                              >
                                {template.category}
                              </span>

                              {template.aiOptimized && (
                                <span
                                  className="badge bg-success bg-opacity-10 text-success"
                                  style={{ fontSize: "0.65rem" }}
                                >
                                  AI Optimized
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Form Fields */}
                {selectedLetter && (
                  <>
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">
                        2. Fill Letter Details
                        <span className="text-danger ms-2">
                          * Required fields
                        </span>
                      </h6>
                      <div className="row g-3">
                        {selectedLetter.defaultFields.map((field, index) => (
                          <div
                            key={field.name}
                            className={`col-12 ${
                              field.type === "textarea" ? "" : "col-md-6"
                            }`}
                          >
                            <label className="form-label">
                              {field.label}
                              {field.required && (
                                <span className="text-danger"> *</span>
                              )}
                            </label>

                            {field.type === "text" && (
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.name]: e.target.value,
                                  }))
                                }
                                placeholder={`Enter ${field.label}`}
                                required={field.required}
                              />
                            )}

                            {field.type === "number" && (
                              <div className="input-group input-group-sm">
                                <span className="input-group-text">₹</span>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={formData[field.name] || ""}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      [field.name]: e.target.value,
                                    }))
                                  }
                                  placeholder={`Enter ${field.label}`}
                                  required={field.required}
                                />
                              </div>
                            )}

                            {field.type === "date" && (
                              <input
                                type="date"
                                className="form-control form-control-sm"
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.name]: e.target.value,
                                  }))
                                }
                                required={field.required}
                              />
                            )}

                            {field.type === "textarea" && (
                              <textarea
                                className="form-control form-control-sm"
                                rows="3"
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.name]: e.target.value,
                                  }))
                                }
                                placeholder={`Enter ${field.label}`}
                                required={field.required}
                              />
                            )}

                            {field.type === "select" && (
                              <select
                                className="form-select form-select-sm"
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.name]: e.target.value,
                                  }))
                                }
                                required={field.required}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            )}

                            {field.type === "checkbox" && (
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={formData[field.name] || false}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      [field.name]: e.target.checked,
                                    }))
                                  }
                                  id={field.name}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={field.name}
                                >
                                  {field.label}
                                </label>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">3. Letter Options</h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card border">
                            <div className="card-body">
                              <h6 className="fw-bold mb-3">
                                Generation Options
                              </h6>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={true}
                                  readOnly
                                  id="digitalSignature"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="digitalSignature"
                                >
                                  Include Digital Signature
                                </label>
                                <small className="text-muted d-block">
                                  Adds secure digital signature to letter
                                </small>
                              </div>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={true}
                                  readOnly
                                  id="verificationCode"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="verificationCode"
                                >
                                  Generate Verification Code
                                </label>
                                <small className="text-muted d-block">
                                  Unique code for letter verification
                                </small>
                              </div>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={true}
                                  onChange={(e) =>
                                    console.log(
                                      "Audit trail:",
                                      e.target.checked
                                    )
                                  }
                                  id="auditTrail"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="auditTrail"
                                >
                                  Enable Audit Trail
                                </label>
                                <small className="text-muted d-block">
                                  Track all activities for this letter
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="card border">
                            <div className="card-body">
                              <h6 className="fw-bold mb-3">Delivery Options</h6>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="emailEmployee"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="emailEmployee"
                                >
                                  Email to Employee
                                </label>
                                <small className="text-muted d-block">
                                  Send letter to employee's email
                                </small>
                              </div>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="archiveCopy"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="archiveCopy"
                                >
                                  Archive HR Copy
                                </label>
                                <small className="text-muted d-block">
                                  Store copy in HR archive
                                </small>
                              </div>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="notifyManager"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="notifyManager"
                                >
                                  Notify Manager
                                </label>
                                <small className="text-muted d-block">
                                  Send notification to manager
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview Section */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">
                        <Eye className="me-2" size={18} />
                        4. Preview
                      </h6>
                      <div className="card border">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0">Letter Preview</h6>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                // Preview functionality
                                alert("Letter preview would be displayed here");
                              }}
                            >
                              <Eye size={14} className="me-1" />
                              Preview Full Letter
                            </button>
                          </div>

                          <div className="p-3 border rounded bg-light">
                            <h5 className="text-center fw-bold mb-4">
                              {selectedLetter.templateName}
                            </h5>

                            <div className="mb-3">
                              <strong>To Whom It May Concern,</strong>
                            </div>

                            <div className="mb-3">
                              {selectedLetter.defaultFields.slice(0, 3).map(
                                (field) =>
                                  formData[field.name] && (
                                    <div key={field.name} className="mb-1">
                                      <strong>{field.label}:</strong>{" "}
                                      {formData[field.name]}
                                    </div>
                                  )
                              )}
                            </div>

                            <div className="mb-3">
                              This is a preview of the{" "}
                              {selectedLetter.templateName.toLowerCase()}. The
                              complete letter will be generated with all details
                              filled above.
                            </div>

                            <div className="mt-4">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="small text-muted">
                                    Digital Signature: Yes
                                  </div>
                                  <div className="small text-muted">
                                    Verification Code: VER-
                                    {new Date().getFullYear()}-XXXX
                                  </div>
                                </div>
                                <div className="col-md-6 text-end">
                                  <div className="small text-muted">
                                    Generated: {new Date().toLocaleDateString()}
                                  </div>
                                  <div className="small text-muted">
                                    Status: Ready for Generation
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setSelectedLetter(null);
                          setFormData({});
                        }}
                      >
                        <XIcon size={16} className="me-2" />
                        Clear Form
                      </button>

                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            // Save as draft functionality
                            alert("Letter saved as draft successfully!");
                          }}
                        >
                          <Save size={16} className="me-2" />
                          Save Draft
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            // Validate required fields
                            const requiredFields =
                              selectedLetter.defaultFields.filter(
                                (field) => field.required
                              );
                            const missingFields = requiredFields.filter(
                              (field) => !formData[field.name]
                            );

                            if (missingFields.length > 0) {
                              alert(
                                `Please fill in all required fields: ${missingFields
                                  .map((f) => f.label)
                                  .join(", ")}`
                              );
                              return;
                            }

                            // Generate letter
                            const newLetter = {
                              id: letterArchive.length + 1,
                              letterId: `LTR-${new Date().getFullYear()}-${String(
                                letterArchive.length + 1
                              ).padStart(3, "0")}`,
                              templateName: selectedLetter.templateName,
                              templateType: selectedLetter.templateType,
                              employeeName:
                                formData.employeeName || "Employee Name",
                              employeeId:
                                formData.employeeId ||
                                "EMP" + Math.floor(Math.random() * 1000),
                              employeeEmail:
                                formData.employeeEmail ||
                                "employee@company.com",
                              department: formData.department || "Department",
                              designation:
                                formData.designation || "Designation",
                              generationDate: new Date()
                                .toISOString()
                                .split("T")[0],
                              purpose: formData.purpose || "General Purpose",
                              downloadCount: 0,
                              lastAccessed: null,
                              fileSize: "~250 KB",
                              status: "Active",
                              digitalSignature: true,
                              verificationCode: `VER-${new Date().getFullYear()}-${String(
                                letterArchive.length + 1
                              ).padStart(3, "0")}`,
                              format: "PDF",
                              version: "1.0",
                              workflowId: `WF-${new Date().getFullYear()}-${
                                letterArchive.length + 1
                              }`,
                              formData: { ...formData },
                            };

                            // Create request
                            const newRequest = {
                              id: letterRequests.length + 1,
                              requestId: `LTR-REQ-${new Date().getFullYear()}-${String(
                                letterRequests.length + 1
                              ).padStart(3, "0")}`,
                              employeeId:
                                formData.employeeId ||
                                "EMP" + Math.floor(Math.random() * 1000),
                              employeeName:
                                formData.employeeName || "Employee Name",
                              employeeEmail:
                                formData.employeeEmail ||
                                "employee@company.com",
                              templateType: selectedLetter.templateType,
                              templateName: selectedLetter.templateName,
                              requestDate: new Date()
                                .toISOString()
                                .split("T")[0],
                              purpose: formData.purpose || "General Purpose",
                              priority: "Medium",
                              status: "approved",
                              statusColor: "success",
                              workflowStatus: "completed",
                              approvedBy: ["HR Manager"],
                              approvalDate: new Date()
                                .toISOString()
                                .split("T")[0],
                              generatedDate: new Date()
                                .toISOString()
                                .split("T")[0],
                              downloadDate: null,
                              downloadCount: 0,
                              digitalSignature: true,
                              verificationCode: newLetter.verificationCode,
                              auditTrail: [
                                {
                                  action: "Letter Generated by HR",
                                  by: "HR Manager",
                                  timestamp: new Date().toLocaleString(),
                                  step: "Generation",
                                },
                                {
                                  action: "Digital Signature Applied",
                                  by: "SYSTEM",
                                  timestamp: new Date().toLocaleString(),
                                  step: "Digital Signature",
                                },
                                {
                                  action: "Archived in HR Copy",
                                  by: "SYSTEM",
                                  timestamp: new Date().toLocaleString(),
                                  step: "HR Archival",
                                },
                              ],
                            };

                            // Update state
                            setLetterArchive((prev) => [...prev, newLetter]);
                            setLetterRequests((prev) => [...prev, newRequest]);

                            // Reset form
                            setSelectedLetter(null);
                            setFormData({});

                            alert(
                              `Letter generated successfully!\nLetter ID: ${newLetter.letterId}\nVerification Code: ${newLetter.verificationCode}`
                            );
                          }}
                        >
                          <FileCheck size={16} className="me-2" />
                          Generate Letter
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {!selectedLetter && (
                  <div className="text-center py-5">
                    <FileEdit size={48} className="text-muted mb-3" />
                    <h6 className="fw-bold">
                      Select a template to start generating
                    </h6>
                    <p className="text-muted">
                      Choose from 12 letter templates to create professional HR
                      letters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Stats */}
          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-header">
                <h6 className="fw-bold mb-0">Generation Stats</h6>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span className="small">Total Generated</span>
                    <span className="badge bg-primary">
                      {letterArchive.length}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span className="small">Today's Generation</span>
                    <span className="badge bg-success">
                      {
                        letterArchive.filter(
                          (l) =>
                            l.generationDate ===
                            new Date().toISOString().split("T")[0]
                        ).length
                      }
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span className="small">Most Used Template</span>
                    <span className="badge bg-info">
                      {
                        letterTemplates.reduce((prev, current) =>
                          prev.usageCount > current.usageCount ? prev : current
                        ).templateName
                      }
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span className="small">Digital Signatures</span>
                    <span className="badge bg-warning">
                      {letterArchive.filter((l) => l.digitalSignature).length}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="fw-bold mb-3">Recent Generations</h6>
                  <div className="list-group list-group-flush">
                    {letterArchive
                      .slice(-3)
                      .reverse()
                      .map((letter) => (
                        <div
                          key={letter.id}
                          className="list-group-item px-0 py-2"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-bold small text-truncate">
                                {letter.templateName}
                              </div>
                              <div className="text-muted small text-truncate">
                                {letter.employeeName}
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="small text-muted">
                                {formatDate(letter.generationDate)}
                              </div>
                              <button
                                className="btn btn-sm btn-outline-primary mt-1"
                                onClick={() => handleDownloadLetter(letter.id)}
                              >
                                <Download size={12} />
                              </button>
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
      )}

      {/* Workflow Section */}
      {activeSection === "workflow" && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h6 className="fw-bold mb-0">
                  <GitBranch className="me-2" size={18} />
                  Letter Generation Workflow
                </h6>
                <small>
                  Complete workflow management with employee requests,
                  approvals, digital signatures, and audit trails
                </small>
              </div>
              <div className="card-body">
                {/* Notification Card */}
                {notification.show && (
                  <div
                    className={`alert alert-${notification.type} alert-dismissible fade show mb-4`}
                  >
                    <div className="d-flex align-items-center">
                      {notification.type === "success" && (
                        <CheckCircle size={20} className="me-2" />
                      )}
                      {notification.type === "info" && (
                        <Info size={20} className="me-2" />
                      )}
                      {notification.type === "warning" && (
                        <AlertTriangle size={20} className="me-2" />
                      )}
                      {notification.type === "danger" && (
                        <XCircle size={20} className="me-2" />
                      )}
                      <span className="flex-grow-1">
                        {notification.message}
                      </span>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() =>
                          setNotification({
                            show: false,
                            type: "",
                            message: "",
                          })
                        }
                      ></button>
                    </div>
                  </div>
                )}

                {/* Confirmation Card for Bulk Approve */}
                {showBulkApproveConfirm && (
                  <div className="card border-warning mb-4">
                    <div className="card-body">
                      <div className="d-flex">
                        <AlertTriangle
                          size={24}
                          className="text-warning me-3"
                        />
                        <div className="flex-grow-1">
                          <h6 className="fw-bold text-warning mb-2">
                            Confirm Bulk Approval
                          </h6>
                          <p className="mb-0">
                            Are you sure you want to approve all{" "}
                            {pendingRequestsCount} pending requests?
                          </p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => setShowBulkApproveConfirm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={confirmBulkApprove}
                        >
                          Yes, Approve All
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rejection Reason Card */}
                {showRejectReasonCard && selectedRequestToReject && (
                  <div className="card border-danger mb-4 shadow-sm">
                    <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <XCircle className="me-2" size={20} />
                        <h6 className="fw-bold mb-0">Reject Request</h6>
                      </div>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => {
                          setShowRejectReasonCard(false);
                          setSelectedRequestToReject(null);
                          setRejectionReason("");
                        }}
                      ></button>
                    </div>

                    <div className="card-body">
                      {/* Request Information - Responsive Grid */}
                      <div className="row g-3 mb-4">
                        <div className="col-12 col-md-6">
                          <div className="card border">
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center mb-2">
                                <FileText
                                  size={16}
                                  className="text-muted me-2"
                                />
                                <small className="text-muted">Request ID</small>
                              </div>
                              <div className="fw-bold text-truncate">
                                {selectedRequestToReject.requestId}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="card border">
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center mb-2">
                                <User size={16} className="text-muted me-2" />
                                <small className="text-muted">Employee</small>
                              </div>
                              <div className="fw-bold text-truncate">
                                {selectedRequestToReject.employeeName}
                              </div>
                              <small className="text-muted">
                                {selectedRequestToReject.employeeId}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Employee Details - Collapsible on Mobile */}
                      <div className="row g-3 mb-4">
                        <div className="col-12 col-md-4">
                          <div className="card border">
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center mb-2">
                                <Briefcase
                                  size={16}
                                  className="text-muted me-2"
                                />
                                <small className="text-muted">
                                  Designation
                                </small>
                              </div>
                              <div className="small fw-medium text-truncate">
                                {selectedRequestToReject.designation ||
                                  "Senior Developer"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="card border">
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center mb-2">
                                <Building
                                  size={16}
                                  className="text-muted me-2"
                                />
                                <small className="text-muted">Department</small>
                              </div>
                              <div className="small fw-medium text-truncate">
                                {selectedRequestToReject.department ||
                                  "Engineering"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="card border">
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center mb-2">
                                <FileText
                                  size={16}
                                  className="text-muted me-2"
                                />
                                <small className="text-muted">
                                  Letter Type
                                </small>
                              </div>
                              <div className="small fw-medium text-truncate">
                                {selectedRequestToReject.templateName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rejection Reason Input */}
                      <div className="mb-4">
                        <label className="form-label fw-bold d-flex align-items-center mb-3">
                          <AlertCircle size={18} className="text-danger me-2" />
                          Rejection Reason *
                          <span className="text-danger ms-1">(Required)</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <Edit size={16} className="text-muted" />
                          </span>
                          <textarea
                            className="form-control"
                            rows="4"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Please provide a detailed reason for rejection. This will be recorded in the audit trail and may be shared with the employee."
                            style={{ resize: "vertical" }}
                          />
                        </div>
                        <div className="form-text text-muted mt-2">
                          <small>
                            <Info size={12} className="me-1" />
                            Enter a clear and professional reason. This will be
                            visible in the audit trail.
                          </small>
                        </div>
                      </div>

                      {/* Quick Reason Suggestions */}
                      <div className="mb-4">
                        <label className="form-label small fw-bold text-muted mb-2">
                          <Lightbulb size={14} className="me-1" />
                          Quick Suggestions:
                        </label>
                        <div className="d-flex flex-wrap gap-2">
                          {[
                            "Incomplete information provided",
                            "Documentation requirements not met",
                            "Policy violation",
                            "Insufficient justification",
                            "Pending clearance from other departments",
                            "Timeline constraints",
                            "Budgetary restrictions",
                          ].map((reason, index) => (
                            <button
                              key={index}
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>
                                setRejectionReason((prev) =>
                                  prev ? `${prev}\n${reason}` : reason
                                )
                              }
                            >
                              {reason}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons - Responsive Layout */}
                      <div className="row g-2 mt-4">
                        <div className="col-12 col-md-6 order-2 order-md-1">
                          <button
                            className="btn btn-outline-secondary w-100 h-100 d-flex align-items-center justify-content-center py-2"
                            onClick={() => {
                              setShowRejectReasonCard(false);
                              setSelectedRequestToReject(null);
                              setRejectionReason("");
                            }}
                          >
                            <X size={16} className="me-2" />
                            Cancel
                          </button>
                        </div>
                        <div className="col-12 col-md-6 order-1 order-md-2 mb-2 mb-md-0">
                          <button
                            className="btn btn-danger w-100 d-flex align-items-center justify-content-center py-2"
                            onClick={handleConfirmRejection}
                            disabled={!rejectionReason.trim()}
                          >
                            <CheckCircle size={16} className="me-2" />
                            Confirm Rejection
                          </button>
                          {!rejectionReason.trim() && (
                            <small className="text-danger d-block mt-1 text-center">
                              <AlertCircle size={12} className="me-1" />
                              Please enter a rejection reason
                            </small>
                          )}
                        </div>
                      </div>

                      {/* Warning Message */}
                      <div className="alert alert-warning mt-4 p-2 p-md-3">
                        <div className="d-flex">
                          <AlertTriangle
                            size={18}
                            className="me-2 flex-shrink-0"
                          />
                          <div>
                            <small className="fw-bold">Important:</small>
                            <small className="d-block">
                              This action cannot be undone. The request will be
                              marked as rejected in the system audit trail.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Workflow Report Card */}
                {showWorkflowReport && (
                  <div className="card border-info mb-4">
                    <div className="card-header bg-info text-white">
                      <h6 className="fw-bold mb-0">
                        <FileText className="me-2" size={18} />
                        Workflow Report
                      </h6>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setShowWorkflowReport(false)}
                      ></button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card border mb-3">
                            <div className="card-body">
                              <h6 className="fw-bold mb-3">Status Summary</h6>
                              <div className="d-flex justify-content-between mb-2">
                                <span>Completed:</span>
                                <span className="fw-bold text-success">
                                  {completedCount}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                <span>In Progress:</span>
                                <span className="fw-bold text-primary">
                                  {inProgressCount}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                <span>Pending Approval:</span>
                                <span className="fw-bold text-warning">
                                  {pendingApprovalCount}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span>Terminated:</span>
                                <span className="fw-bold text-danger">
                                  {terminatedCount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card border mb-3">
                            <div className="card-body">
                              <h6 className="fw-bold mb-3">
                                Performance Metrics
                              </h6>
                              <div className="d-flex justify-content-between mb-2">
                                <span>Total Workflows:</span>
                                <span className="fw-bold">
                                  {workflowRequests.length}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                <span>Average SLA:</span>
                                <span className="fw-bold">
                                  {calculateAverageSLA()}
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span>Completion Rate:</span>
                                <span className="fw-bold">
                                  {calculateCompletionRate()}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setShowWorkflowReport(false)}
                        >
                          Close Report
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Digital Signature Details Card */}
                {showDigitalSignatureCard && selectedSignatureRequest && (
                  <div className="card border-info mb-4">
                    <div className="card-header bg-info text-white">
                      <h6 className="fw-bold mb-0">
                        <FileSignature className="me-2" size={18} />
                        Digital Signature Details
                      </h6>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => {
                          setShowDigitalSignatureCard(false);
                          setSelectedSignatureRequest(null);
                        }}
                      ></button>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="card border">
                            <div className="card-body">
                              <h6 className="fw-bold mb-3">
                                Signature Information
                              </h6>
                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Request ID
                                </small>
                                <span className="fw-medium">
                                  {selectedSignatureRequest.requestId}
                                </span>
                              </div>
                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Verification Code
                                </small>
                                <code className="bg-light p-1 rounded">
                                  VER-{new Date().getFullYear()}-
                                  {selectedSignatureRequest.id}
                                </code>
                              </div>
                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Signature Status
                                </small>
                                <span className="badge bg-success">
                                  VERIFIED
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card border">
                            <div className="card-body">
                              <h6 className="fw-bold mb-3">
                                Verification Details
                              </h6>
                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Verified By
                                </small>
                                <span className="fw-medium">HR Department</span>
                              </div>
                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Verification Timestamp
                                </small>
                                <span className="fw-medium">
                                  {new Date().toLocaleString()}
                                </span>
                              </div>
                              <div className="mb-2">
                                <small className="text-muted d-block">
                                  Expiry Date
                                </small>
                                <span className="fw-medium">
                                  {new Date(
                                    Date.now() + 90 * 24 * 60 * 60 * 1000
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => {
                            setShowDigitalSignatureCard(false);
                            setSelectedSignatureRequest(null);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Workflow Actions Section */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowRequestModal(true)}
                  >
                    <Plus size={16} className="me-2" />
                    Start New Workflow
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setPendingRequestsCount(
                        workflowRequests.filter(
                          (r) => r.status === "pending_approval"
                        ).length
                      );
                      setShowBulkApproveConfirm(true);
                    }}
                  >
                    <CheckCircle size={16} className="me-2" />
                    Bulk Approve All
                  </button>
                  <button
                    className="btn btn-info text-white"
                    onClick={() => {
                      setCompletedCount(
                        workflowRequests.filter(
                          (r) => r.workflowStatus === "completed"
                        ).length
                      );
                      setInProgressCount(
                        workflowRequests.filter(
                          (r) => r.workflowStatus === "in_progress"
                        ).length
                      );
                      setPendingApprovalCount(
                        workflowRequests.filter(
                          (r) => r.status === "pending_approval"
                        ).length
                      );
                      setTerminatedCount(
                        workflowRequests.filter(
                          (r) => r.workflowStatus === "terminated"
                        ).length
                      );
                      setShowWorkflowReport(true);
                    }}
                  >
                    <FileText size={16} className="me-2" />
                    Generate Report
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => simulateEmployeeRequest()}
                  >
                    <User size={16} className="me-2" />
                    Simulate Employee Request
                  </button>
                </div>

                {/* Workflow Statistics */}
                <div className="row mb-4">
                  <div className="col-6 col-md-3">
                    <div className="card border hover-lift">
                      <div className="card-body text-center">
                        <div className="h4 fw-bold text-primary">
                          {
                            workflowRequests.filter(
                              (r) => r.workflowStatus === "in_progress"
                            ).length
                          }
                        </div>
                        <div className="small text-muted">In Progress</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border hover-lift">
                      <div className="card-body text-center">
                        <div className="h4 fw-bold text-success">
                          {
                            workflowRequests.filter(
                              (r) => r.workflowStatus === "completed"
                            ).length
                          }
                        </div>
                        <div className="small text-muted">Completed</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border hover-lift">
                      <div className="card-body text-center">
                        <div className="h4 fw-bold text-warning">
                          {
                            workflowRequests.filter(
                              (r) => r.status === "pending_approval"
                            ).length
                          }
                        </div>
                        <div className="small text-muted">Pending Approval</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card border hover-lift">
                      <div className="card-body text-center">
                        <div className="h4 fw-bold text-danger">
                          {
                            workflowRequests.filter(
                              (r) => r.workflowStatus === "terminated"
                            ).length
                          }
                        </div>
                        <div className="small text-muted">Terminated</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workflow Tabs */}
                <ul
                  className="nav nav-tabs mb-4"
                  id="workflowTabs"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        workflowView === "all" ? "active" : ""
                      }`}
                      onClick={() => setWorkflowView("all")}
                      type="button"
                    >
                      <GitBranch size={16} className="me-2" />
                      All Workflows ({workflowRequests.length})
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        workflowView === "active" ? "active" : ""
                      }`}
                      onClick={() => setWorkflowView("active")}
                      type="button"
                    >
                      <Clock size={16} className="me-2" />
                      Active (
                      {
                        workflowRequests.filter(
                          (r) => r.workflowStatus === "in_progress"
                        ).length
                      }
                      )
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        workflowView === "pending" ? "active" : ""
                      }`}
                      onClick={() => setWorkflowView("pending")}
                      type="button"
                    >
                      <AlertCircle size={16} className="me-2" />
                      Pending (
                      {
                        workflowRequests.filter(
                          (r) => r.status === "pending_approval"
                        ).length
                      }
                      )
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        workflowView === "completed" ? "active" : ""
                      }`}
                      onClick={() => setWorkflowView("completed")}
                      type="button"
                    >
                      <CheckCircle size={16} className="me-2" />
                      Completed (
                      {
                        workflowRequests.filter(
                          (r) => r.workflowStatus === "completed"
                        ).length
                      }
                      )
                    </button>
                  </li>
                </ul>

                {/* Filter Controls */}
                <div className="row mb-4">
                  <div className="col-md-4">
                    <select
                      className="form-select form-select-sm"
                      onChange={(e) =>
                        setWorkflowFilter({
                          ...workflowFilter,
                          templateType: e.target.value,
                        })
                      }
                      value={workflowFilter.templateType}
                    >
                      <option value="">All Templates</option>
                      {letterTemplates.map((template) => (
                        <option key={template.id} value={template.templateType}>
                          {template.templateName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select form-select-sm"
                      onChange={(e) =>
                        setWorkflowFilter({
                          ...workflowFilter,
                          priority: e.target.value,
                        })
                      }
                      value={workflowFilter.priority}
                    >
                      <option value="">All Priorities</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div className="input-group input-group-sm">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search workflows..."
                        value={workflowFilter.search}
                        onChange={(e) =>
                          setWorkflowFilter({
                            ...workflowFilter,
                            search: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {}}
                      >
                        <Search size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Workflow Table */}
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: "120px" }}>Request ID</th>
                        <th style={{ width: "150px" }}>Employee</th>
                        <th style={{ width: "120px" }}>Designation</th>
                        <th style={{ width: "120px" }}>Department</th>
                        <th style={{ width: "120px" }}>Letter Type</th>
                        <th style={{ width: "100px" }}>Current Step</th>
                        <th style={{ width: "100px" }}>Status</th>
                        <th style={{ width: "80px" }}>SLA</th>
                        <th style={{ width: "100px" }}>Last Promoted</th>
                        <th style={{ width: "150px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWorkflows.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center py-4">
                            <div className="text-muted">
                              <GitBranch size={24} className="mb-2" />
                              <p className="mb-0">No workflows found</p>
                              <small>
                                Start a new workflow or adjust your filters
                              </small>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredWorkflows.map((request) => {
                          const template = letterTemplates.find(
                            (t) => t.templateType === request.templateType
                          );
                          const currentStepIndex =
                            template?.workflowSteps?.findIndex(
                              (step) => step === request.currentStep
                            ) || 0;
                          const totalSteps =
                            template?.workflowSteps?.length || 0;
                          const progressPercentage =
                            totalSteps > 0
                              ? ((currentStepIndex + 1) / totalSteps) * 100
                              : 0;

                          return (
                            <tr key={request.id}>
                              <td>
                                <div className="small fw-bold text-truncate">
                                  {request.requestId}
                                </div>
                                <small className="text-muted">
                                  {formatDate(request.requestDate)}
                                </small>
                              </td>
                              <td>
                                <div className="fw-medium text-truncate">
                                  {request.employeeName}
                                </div>
                                <small className="text-muted d-block text-truncate">
                                  {request.employeeId}
                                </small>
                              </td>
                              <td>
                                <div
                                  className="text-truncate"
                                  title={
                                    request.designation || "Senior Developer"
                                  }
                                >
                                  {request.designation || "Senior Developer"}
                                </div>
                              </td>
                              <td>
                                <div
                                  className="text-truncate"
                                  title={request.department || "Engineering"}
                                >
                                  {request.department || "Engineering"}
                                </div>
                              </td>
                              <td>
                                <div className="text-truncate">
                                  {request.templateName}
                                </div>
                                <small className="text-muted d-block">
                                  {getPriorityBadge(request.priority)}
                                </small>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="progress flex-grow-1 me-2"
                                    style={{ height: "4px" }}
                                  >
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${progressPercentage}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <small className="text-nowrap">
                                    {currentStepIndex + 1}/{totalSteps}
                                  </small>
                                </div>
                                <small className="text-muted d-block text-truncate">
                                  {request.currentStep}
                                </small>
                              </td>
                              <td>
                                <div className="d-flex flex-column">
                                  {getStatusBadge(request.status)}
                                  {request.autoApproved && (
                                    <small className="text-success mt-1">
                                      <Zap size={10} className="me-1" />
                                      Auto-approved
                                    </small>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <Clock
                                    size={12}
                                    className="me-1 text-warning"
                                  />
                                  <small>{template?.sla || "24h"}</small>
                                </div>
                              </td>
                              <td>
                                <div className="small">
                                  {request.lastPromoted
                                    ? formatDate(request.lastPromoted)
                                    : "2023-06-15"}
                                </div>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() =>
                                      handleViewWorkflowDetails(request.id)
                                    }
                                    title="View Details"
                                  >
                                    <Eye size={12} />
                                  </button>

                                  {request.status === "pending_approval" && (
                                    <>
                                      <button
                                        className="btn btn-outline-success"
                                        onClick={() =>
                                          handleWorkflowApproval(request.id)
                                        }
                                        title="Approve"
                                      >
                                        <CheckCircle size={12} />
                                      </button>
                                      <button
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                          const req = workflowRequests.find(
                                            (r) => r.id === request.id
                                          );
                                          if (req) {
                                            setSelectedRequestToReject(req);
                                            setShowRejectReasonCard(true);
                                          }
                                        }}
                                        title="Reject"
                                      >
                                        <XCircle size={12} />
                                      </button>
                                    </>
                                  )}

                                  {request.workflowStatus === "in_progress" &&
                                    request.currentStep && (
                                      <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                          handleAdvanceWorkflow(request.id)
                                        }
                                        title="Advance Step"
                                      >
                                        <ChevronRight size={12} />
                                      </button>
                                    )}

                                  {request.digitalSignature &&
                                    request.workflowStatus === "completed" && (
                                      <button
                                        className="btn btn-outline-info"
                                        onClick={() => {
                                          const req = workflowRequests.find(
                                            (r) => r.id === request.id
                                          );
                                          if (req) {
                                            setSelectedSignatureRequest(req);
                                            setShowDigitalSignatureCard(true);
                                          }
                                        }}
                                        title="View Digital Signature"
                                      >
                                        <FileSignature size={12} />
                                      </button>
                                    )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Workflow Details Modal */}
                {showWorkflowDetails && selectedWorkflow && (
                  <div
                    className="modal show d-block"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1060,
                    }}
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title fw-bold">
                            <GitBranch className="me-2" size={18} />
                            Workflow Details: {selectedWorkflow.requestId}
                          </h5>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => {
                              setShowWorkflowDetails(false);
                              setSelectedWorkflow(null);
                            }}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="card border">
                                <div className="card-body">
                                  <h6 className="fw-bold mb-3">
                                    Request Information
                                  </h6>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Request ID
                                    </small>
                                    <span className="fw-medium">
                                      {selectedWorkflow.requestId}
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Employee
                                    </small>
                                    <span className="fw-medium">
                                      {selectedWorkflow.employeeName} (
                                      {selectedWorkflow.employeeId})
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Letter Type
                                    </small>
                                    <span className="fw-medium">
                                      {selectedWorkflow.templateName}
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Purpose
                                    </small>
                                    <span className="fw-medium">
                                      {selectedWorkflow.purpose}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card border">
                                <div className="card-body">
                                  <h6 className="fw-bold mb-3">
                                    Workflow Status
                                  </h6>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Current Status
                                    </small>
                                    {getStatusBadge(selectedWorkflow.status)}
                                  </div>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Current Step
                                    </small>
                                    <span className="fw-medium">
                                      {selectedWorkflow.currentStep}
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Priority
                                    </small>
                                    {getPriorityBadge(
                                      selectedWorkflow.priority
                                    )}
                                  </div>
                                  <div className="mb-2">
                                    <small className="text-muted d-block">
                                      Requested On
                                    </small>
                                    <span className="fw-medium">
                                      {formatDate(selectedWorkflow.requestDate)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card border mb-4">
                            <div className="card-header">
                              <h6 className="fw-bold mb-0">Audit Trail</h6>
                            </div>
                            <div className="card-body">
                              <div className="timeline">
                                {selectedWorkflow.auditTrail.map(
                                  (trail, index) => (
                                    <div
                                      key={index}
                                      className="timeline-item mb-3"
                                    >
                                      <div className="d-flex">
                                        <div
                                          className="timeline-marker bg-primary rounded-circle"
                                          style={{
                                            width: "12px",
                                            height: "12px",
                                            marginTop: "4px",
                                          }}
                                        ></div>
                                        <div className="ms-3 flex-grow-1">
                                          <div className="d-flex justify-content-between">
                                            <span className="fw-medium">
                                              {trail.action}
                                            </span>
                                            <small className="text-muted">
                                              {formatDateTime(trail.timestamp)}
                                            </small>
                                          </div>
                                          <div className="small text-muted">
                                            By: {trail.by} • Step: {trail.step}
                                          </div>
                                          {trail.details && (
                                            <div className="small mt-1 text-muted">
                                              {trail.details}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              setShowWorkflowDetails(false);
                              setSelectedWorkflow(null);
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Start New Workflow Modal */}
                {showRequestModal && (
                  <div
                    className="modal show d-block"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 1060,
                    }}
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title fw-bold">
                            <Plus className="me-2" size={18} />
                            Start New Workflow
                          </h5>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowRequestModal(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Select Template
                                </label>
                                <select
                                  className="form-select"
                                  value={newWorkflowTemplate}
                                  onChange={(e) =>
                                    setNewWorkflowTemplate(e.target.value)
                                  }
                                >
                                  <option value="">Select a template</option>
                                  {letterTemplates.map((template) => (
                                    <option
                                      key={template.id}
                                      value={template.templateType}
                                    >
                                      {template.templateName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Priority
                                </label>
                                <select
                                  className="form-select"
                                  value={newWorkflowPriority}
                                  onChange={(e) =>
                                    setNewWorkflowPriority(e.target.value)
                                  }
                                >
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                  <option value="Low">Low</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="mb-3">
                                <label className="form-label fw-bold">
                                  Purpose
                                </label>
                                <textarea
                                  className="form-control"
                                  rows="3"
                                  value={newWorkflowPurpose}
                                  onChange={(e) =>
                                    setNewWorkflowPurpose(e.target.value)
                                  }
                                  placeholder="Enter the purpose of this workflow..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowRequestModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleCreateWorkflow()}
                            disabled={
                              !newWorkflowTemplate || !newWorkflowPurpose
                            }
                          >
                            Create Workflow
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Workflow Configuration */}
                <div className="mt-5">
                  <h6 className="fw-bold mb-4">
                    <Settings className="me-2" size={18} />
                    Workflow Configuration
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="fw-bold mb-3">
                            Auto-Approval Configuration
                          </h6>
                          {letterTemplates.map((template) => (
                            <div key={template.id} className="form-check mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={template.autoApprove}
                                onChange={(e) =>
                                  handleTemplateAutoApprove(
                                    template.id,
                                    e.target.checked
                                  )
                                }
                                id={`auto-${template.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`auto-${template.id}`}
                              >
                                {template.templateName}
                                <small className="text-muted d-block">
                                  {template.autoApprove
                                    ? "Auto-approved"
                                    : "Requires manual approval"}
                                </small>
                              </label>
                            </div>
                          ))}
                          <div className="mt-3">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                setNotification({
                                  show: true,
                                  type: "success",
                                  message:
                                    "Workflow configuration saved successfully!",
                                });
                                saveWorkflowConfig();
                              }}
                            >
                              <Save size={14} className="me-2" />
                              Save Configuration
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-body">
                          <h6 className="fw-bold mb-3">
                            SLA & Priority Settings
                          </h6>
                          <div className="mb-3">
                            <label className="form-label small fw-bold">
                              High Priority SLA
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control"
                                defaultValue="4"
                                ref={slaHighRef}
                              />
                              <select
                                className="form-select"
                                style={{ width: "100px" }}
                              >
                                <option>hours</option>
                                <option>days</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label small fw-bold">
                              Medium Priority SLA
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control"
                                defaultValue="24"
                                ref={slaMediumRef}
                              />
                              <select
                                className="form-select"
                                style={{ width: "100px" }}
                              >
                                <option>hours</option>
                                <option>days</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label small fw-bold">
                              Low Priority SLA
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className="form-control"
                                defaultValue="72"
                                ref={slaLowRef}
                              />
                              <select
                                className="form-select"
                                style={{ width: "100px" }}
                              >
                                <option>hours</option>
                                <option>days</option>
                              </select>
                            </div>
                          </div>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              const highSLA = slaHighRef.current?.value || "4";
                              const mediumSLA =
                                slaMediumRef.current?.value || "24";
                              const lowSLA = slaLowRef.current?.value || "72";

                              setNotification({
                                show: true,
                                type: "success",
                                message: `SLA settings updated: High: ${highSLA} hours, Medium: ${mediumSLA} hours, Low: ${lowSLA} hours`,
                              });
                              saveSLASettings();
                            }}
                          >
                            <Save size={14} className="me-2" />
                            Update SLA Settings
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
      )}

      {/* Requests Section */}
      {activeSection === "requests" && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="fw-bold mb-2 mb-md-0">
                  <ClipboardList className="me-2" size={18} />
                  Letter Requests ({letterRequests.length})
                </h6>
                <div className="d-flex flex-wrap gap-1 gap-md-2">
                  <span className="badge bg-warning small">
                    {statistics.pendingRequests} pending
                  </span>
                  <span className="badge bg-success small">
                    {statistics.approvedRequests} approved
                  </span>
                  <span className="badge bg-danger small">
                    {statistics.rejectedRequests} rejected
                  </span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="min-width-120">Request ID</th>
                        <th className="d-none d-md-table-cell min-width-120">
                          Employee
                        </th>
                        <th className="d-none d-lg-table-cell min-width-100">
                          Designation
                        </th>
                        <th className="d-none d-xl-table-cell min-width-100">
                          Department
                        </th>
                        <th className="min-width-100">Type</th>
                        <th className="d-none d-sm-table-cell min-width-100">
                          Last Increment
                        </th>
                        <th className="d-none d-sm-table-cell min-width-80">
                          Date
                        </th>
                        <th className="min-width-80">Status</th>
                        <th className="d-none d-lg-table-cell min-width-80">
                          Priority
                        </th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="small text-truncate">
                            {request.requestId}
                          </td>
                          <td className="d-none d-md-table-cell">
                            <div className="text-truncate">
                              {request.employeeName}
                            </div>
                            <small className="text-muted d-block text-truncate">
                              {request.employeeId}
                            </small>
                          </td>
                          <td className="d-none d-lg-table-cell text-truncate">
                            {request.designation || "Senior Developer"}
                          </td>
                          <td className="d-none d-xl-table-cell text-truncate">
                            {request.department || "Engineering"}
                          </td>
                          <td
                            className="text-truncate"
                            title={request.templateName}
                          >
                            <div className="small fw-medium">
                              {request.templateName}
                            </div>
                            <small className="text-muted d-block d-md-none">
                              {getPriorityBadge(request.priority)}
                            </small>
                          </td>
                          <td className="d-none d-sm-table-cell">
                            {request.lastIncrement
                              ? formatDate(request.lastIncrement)
                              : "2023-04-15"}
                          </td>
                          <td className="d-none d-sm-table-cell">
                            {formatDate(request.requestDate)}
                          </td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td className="d-none d-lg-table-cell">
                            {getPriorityBadge(request.priority)}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm btn-icon"
                                onClick={() => handleViewAuditTrail(request)}
                                title="View Details"
                              >
                                <Eye size={12} />
                              </button>

                              {request.status === "pending" && (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-outline-success btn-sm btn-icon"
                                    onClick={() =>
                                      handleApproveRequest(request.id)
                                    }
                                    title="Approve"
                                  >
                                    <CheckCircle size={12} />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm btn-icon"
                                    onClick={() =>
                                      handleRejectRequest(request.id)
                                    }
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
      {activeSection === "employee" && <EmployeePortal />}

      {/* Archive Section */}
      {activeSection === "archive" && (
        <div className="row g-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="fw-bold mb-2 mb-md-0">
                  <Archive className="me-2" size={18} />
                  Letter Archive ({letterArchive.length})
                </h6>
                <div className="d-flex flex-wrap gap-1 gap-md-2">
                  <span className="badge bg-primary small">
                    {letterArchive.length} letters
                  </span>
                  <span className="badge bg-success small">
                    {letterArchive.filter((l) => l.digitalSignature).length}{" "}
                    Signed
                  </span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="min-width-120">Letter ID</th>
                        <th className="d-none d-md-table-cell min-width-120">
                          Type
                        </th>
                        <th className="min-width-120">Employee</th>
                        <th className="d-none d-lg-table-cell min-width-100">
                          Designation
                        </th>
                        <th className="d-none d-xl-table-cell min-width-100">
                          Department
                        </th>
                        <th className="d-none d-lg-table-cell min-width-80">
                          Generated
                        </th>
                        <th className="min-width-80">Downloads</th>
                        <th className="d-none d-sm-table-cell min-width-100">
                          Last Promoted
                        </th>
                        <th className="d-none d-sm-table-cell min-width-80">
                          Status
                        </th>
                        <th className="min-width-80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArchive.map((letter) => (
                        <tr key={letter.id}>
                          <td className="small text-truncate">
                            {letter.letterId}
                            <small className="text-muted d-block d-md-none">
                              {letter.templateName}
                            </small>
                          </td>
                          <td className="d-none d-md-table-cell text-truncate">
                            {letter.templateName}
                          </td>
                          <td>
                            <div className="text-truncate">
                              {letter.employeeName}
                            </div>
                            <small className="text-muted d-block text-truncate">
                              {letter.employeeId}
                            </small>
                            <div className="d-block d-lg-none small">
                              <span className="text-muted">Designation: </span>
                              {letter.designation || "Senior Developer"}
                            </div>
                          </td>
                          <td className="d-none d-lg-table-cell text-truncate">
                            {letter.designation || "Senior Developer"}
                          </td>
                          <td className="d-none d-xl-table-cell text-truncate">
                            {letter.department || "Engineering"}
                          </td>
                          <td className="d-none d-lg-table-cell">
                            {formatDate(letter.generationDate)}
                          </td>
                          <td>
                            <div className="text-center">
                              <div className="fw-medium">
                                {letter.downloadCount}
                              </div>
                              <small className="text-muted d-block d-lg-none">
                                Downloads
                              </small>
                            </div>
                          </td>
                          <td className="d-none d-sm-table-cell">
                            {letter.lastPromoted
                              ? formatDate(letter.lastPromoted)
                              : "2023-06-15"}
                          </td>
                          <td className="d-none d-sm-table-cell">
                            {getStatusBadge(letter.status)}
                          </td>
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
                                  setSelectedLetter(letter);
                                  setShowLetterDetailsCard(true);
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
      {activeSection === "reports" && (
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
                <p className="text-muted small">
                  Complete report of letter templates usage, approvals, and
                  downloads.
                </p>
                <div className="mb-3">
                  <h6 className="small fw-bold">Report Includes:</h6>
                  <ul className="small">
                    <li>Template-wise usage statistics</li>
                    <li>Approval and rejection rates</li>
                    <li>Download frequency analysis</li>
                    <li>Monthly trends and patterns</li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-auto btn-responsive"
                  onClick={() =>
                    alert(
                      "Report generation functionality would be implemented here"
                    )
                  }
                >
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
                <p className="text-muted small">
                  Detailed report of letter requests and usage by each employee.
                </p>
                <div className="mb-3">
                  <h6 className="small fw-bold">Report Includes:</h6>
                  <ul className="small">
                    <li>Employee-wise request history</li>
                    <li>Most requested letter types</li>
                    <li>Approval status per employee</li>
                    <li>Department-wise analysis</li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn btn-success w-100 mt-auto btn-responsive"
                  onClick={() =>
                    alert(
                      "Report generation functionality would be implemented here"
                    )
                  }
                >
                  <Download className="me-2" size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === "settings" && (
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
                      <label className="form-label small fw-bold">
                        Default Digital Signature
                      </label>
                      <select className="form-select form-select-sm">
                        <option>Enable for all letters</option>
                        <option>Enable based on template</option>
                        <option>Disable by default</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">
                        Auto-Approval Rules
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked
                        />
                        <label className="form-check-label small">
                          Enable for salary certificates
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label small">
                          Enable for experience certificates
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">
                        Default Letter Format
                      </label>
                      <select className="form-select form-select-sm">
                        <option>PDF</option>
                        <option>DOCX</option>
                        <option>Both PDF and DOCX</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label small fw-bold">
                        Audit Trail Retention
                      </label>
                      <select className="form-select form-select-sm">
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                        <option>Indefinite</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">
                        Notification Settings
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked
                        />
                        <label className="form-check-label small">
                          Email for new requests
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultChecked
                        />
                        <label className="form-check-label small">
                          Email for approvals
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label small">
                          Email for downloads
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold">
                        Default Workflow SLA
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        defaultValue="24 hours"
                      />
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
      {activeSection === "dashboard" && (
        <div className="mt-4">
          <h6 className="fw-bold mb-3">
            <FileText size={16} className="me-2" />
            Template Categories
          </h6>
          <div className="row g-2 g-md-3">
            {[
              "Employment",
              "Financial",
              "Exit",
              "Legal",
              "Career",
              "Disciplinary",
            ].map((category) => {
              const count = letterTemplates.filter(
                (t) => t.category === category
              ).length;
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

      {/* Add Action Notification Component (add this at the top of your workflow section) */}
      {actionNotification.show && (
        <div
          className={`alert alert-${actionNotification.type} alert-dismissible fade show mb-4`}
        >
          <div className="d-flex align-items-center">
            {actionNotification.type === "success" && (
              <CheckCircle size={20} className="me-2" />
            )}
            {actionNotification.type === "warning" && (
              <AlertTriangle size={20} className="me-2" />
            )}
            {actionNotification.type === "danger" && (
              <XCircle size={20} className="me-2" />
            )}
            {actionNotification.type === "info" && (
              <Info size={20} className="me-2" />
            )}
            <div className="flex-grow-1">
              <h6 className="fw-bold mb-1">{actionNotification.title}</h6>
              <p className="mb-0">{actionNotification.message}</p>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() =>
                setActionNotification({
                  show: false,
                  type: "",
                  title: "",
                  message: "",
                })
              }
            ></button>
          </div>
        </div>
      )}
      {showAuditTrailModal && (
        <div
          className="card shadow-lg position-fixed top-50 start-50 translate-middle"
          style={{ width: "600px", zIndex: 1050 }}
        >
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              Audit Trail – {selectedAuditRequest?.requestId}
            </h6>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setShowAuditTrailModal(false)}
            >
              ✕
            </button>
          </div>

          <div
            className="card-body"
            style={{ maxHeight: "350px", overflowY: "auto" }}
          >
            {selectedAuditTrail.length === 0 ? (
              <p className="text-muted">No audit trail available</p>
            ) : (
              <ul className="list-group list-group-flush">
                {selectedAuditTrail.map((log, index) => (
                  <li key={index} className="list-group-item">
                    <div className="fw-bold">{log.action}</div>
                    <div className="small text-muted">
                      By {log.by} • {log.step}
                    </div>
                    <div className="small text-secondary">{log.timestamp}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-footer text-end">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowAuditTrailModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showAuditTrailCard && selectedRequest && (
        <div
          className="card shadow-lg position-fixed top-50 start-50 translate-middle"
          style={{ width: "650px", zIndex: 1050 }}
        >
          {/* Header */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              Request Details – {selectedRequest.requestId}
            </h6>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setShowAuditTrailCard(false)}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div
            className="card-body"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {/* Basic Info */}
            <div className="mb-3">
              <strong>Employee:</strong> {selectedRequest.employeeName}
              <br />
              <strong>Template:</strong> {selectedRequest.templateName}
              <br />
              <strong>Status:</strong> {getStatusBadge(selectedRequest.status)}
              <br />
              <strong>Priority:</strong>{" "}
              {getPriorityBadge(selectedRequest.priority)}
            </div>

            <hr />

            {/* Audit Trail */}
            <h6 className="mb-2">Audit Trail</h6>

            {selectedRequest.auditTrail?.length > 0 ? (
              <ul className="list-group list-group-flush">
                {selectedRequest.auditTrail.map((log, index) => (
                  <li key={index} className="list-group-item">
                    <div className="fw-bold">{log.action}</div>
                    <small className="text-muted">
                      {log.by} • {log.step}
                    </small>
                    <br />
                    <small className="text-secondary">{log.timestamp}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No audit trail available</p>
            )}
          </div>

          {/* Footer */}
          <div className="card-footer text-end">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowAuditTrailCard(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showLetterDetailsCard && selectedLetter && (
        <div
          className="card shadow-lg position-fixed top-50 start-50 translate-middle"
          style={{ width: "600px", zIndex: 1050 }}
        >
          {/* Header */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Letter Details – {selectedLetter.letterId}</h6>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setShowLetterDetailsCard(false)}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="card-body">
            <div className="mb-2">
              <strong>Employee:</strong> {selectedLetter.employeeName} (
              {selectedLetter.employeeId})
            </div>

            <div className="mb-2">
              <strong>Template:</strong> {selectedLetter.templateName}
            </div>

            <div className="mb-2">
              <strong>Purpose:</strong> {selectedLetter.purpose}
            </div>

            <div className="mb-2">
              <strong>Generated Date:</strong>{" "}
              {formatDate(selectedLetter.generationDate)}
            </div>

            <div className="mb-2">
              <strong>Total Downloads:</strong> {selectedLetter.downloadCount}
            </div>

            <div className="mb-2">
              <strong>Verification Code:</strong>{" "}
              {selectedLetter.verificationCode}
            </div>

            <div className="mb-2">
              <strong>Digital Signature:</strong>{" "}
              {selectedLetter.digitalSignature ? (
                <span className="badge bg-success">Yes</span>
              ) : (
                <span className="badge bg-danger">No</span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer text-end">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowLetterDetailsCard(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showLetterModal && <LetterGeneratorModal />}

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold small">
                  <Bot className="me-2" size={18} />
                  HR Letter AI Assistant
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowAIAssistant(false)}
                ></button>
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
                      if (e.key === "Enter") {
                        alert(
                          "AI Assistant functionality would be implemented here"
                        );
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      alert(
                        "AI Assistant functionality would be implemented here"
                      )
                    }
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
        <div
          className="modal show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold small">
                  <FileText className="me-2" size={18} />
                  Add New Template
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowTemplateModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="alert alert-info mb-3 small">
                  <Info className="me-2" size={14} />
                  Create a new letter template with custom fields and workflow.
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g., Experience Certificate"
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">
                      Category *
                    </label>
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
                    <label className="form-label small fw-bold">
                      Template Type *
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="e.g., experience, salary, relieving"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Description *
                  </label>
                  <textarea
                    className="form-control form-control-sm"
                    rows="3"
                    placeholder="Brief description of this template..."
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoApprove"
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="autoApprove"
                    >
                      Enable auto-approval for this template
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="aiOptimized"
                      defaultChecked
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="aiOptimized"
                    >
                      Enable AI optimization
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowTemplateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    alert("Template saved successfully!");
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
