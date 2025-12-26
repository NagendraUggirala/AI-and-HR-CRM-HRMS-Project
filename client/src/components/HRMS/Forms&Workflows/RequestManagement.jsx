import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const EmployeeSelfServicePortal = () => {
  // ==================== STATE MANAGEMENT ====================
  const [activeCategory, setActiveCategory] = useState('personal');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  
  // ==================== DEFAULT REQUEST HISTORY DATA ====================
  const [requestHistory, setRequestHistory] = useState([
    {
      id: 1,
      requestId: 'REQ-1001',
      type: 'Bank Account Change Request',
      category: 'personal',
      submittedDate: '2024-03-20 10:30 AM',
      status: 'Approved',
      priority: 'high',
      description: 'Changing bank account from HDFC to ICICI for salary deposit',
      sla: '2-3 business days',
      approvers: ['Finance Department'],
      attachments: ['cheque_copy.pdf']
    },
    {
      id: 2,
      requestId: 'REQ-1002',
      type: 'Work-from-Home Request',
      category: 'work',
      submittedDate: '2024-03-18 02:15 PM',
      status: 'In Progress',
      priority: 'medium',
      description: 'Requesting work from home for next 2 weeks due to family emergency',
      sla: '2-3 business days',
      approvers: ['Reporting Manager', 'HR Department'],
      attachments: []
    },
    {
      id: 3,
      requestId: 'REQ-1003',
      type: 'Reimbursement Claim',
      category: 'financial',
      submittedDate: '2024-03-15 11:00 AM',
      status: 'Completed',
      priority: 'medium',
      description: 'Travel expense reimbursement for client meeting in Mumbai',
      sla: '5-7 business days',
      approvers: ['Finance Department'],
      attachments: ['receipts.zip']
    },
    {
      id: 4,
      requestId: 'REQ-1004',
      type: 'ID Card Reissue',
      category: 'administrative',
      submittedDate: '2024-03-10 09:45 AM',
      status: 'Rejected',
      priority: 'medium',
      description: 'Lost ID card during office commute, need replacement',
      sla: '3-5 business days',
      approvers: ['Security Department'],
      attachments: ['police_complaint.pdf']
    },
    {
      id: 5,
      requestId: 'REQ-1005',
      type: 'VPN Access Request',
      category: 'it',
      submittedDate: '2024-03-08 04:30 PM',
      status: 'Submitted',
      priority: 'medium',
      description: 'Need VPN access to work remotely from different location',
      sla: '2-3 business days',
      approvers: ['IT Security'],
      attachments: []
    },
    {
      id: 6,
      requestId: 'REQ-1006',
      type: 'Business Travel Request',
      category: 'travel',
      submittedDate: '2024-03-05 03:20 PM',
      status: 'Approved',
      priority: 'high',
      description: 'Client visit to Mumbai office for project discussion',
      sla: '3-5 business days',
      approvers: ['Reporting Manager', 'Travel Desk'],
      attachments: ['client_invitation.pdf']
    },
    {
      id: 7,
      requestId: 'REQ-1007',
      type: 'General Feedback',
      category: 'feedback',
      submittedDate: '2024-03-01 01:10 PM',
      status: 'Completed',
      priority: 'low',
      description: 'Feedback about improving cafeteria food quality and variety',
      sla: 'Acknowledgement in 1 day',
      approvers: ['HR Department'],
      attachments: []
    }
  ]);
  
  // ==================== REQUEST DATA WITH BOOTSTRAP ICONS ====================
  const requestCategories = {
    personal: {
      title: 'Personal Information',
      icon: 'bi-person-fill',
      color: '#3498db',
      description: 'Update personal and contact information'
    },
    work: {
      title: 'Work-Related',
      icon: 'bi-briefcase-fill',
      color: '#9b59b6',
      description: 'Work arrangements and changes'
    },
    administrative: {
      title: 'Administrative',
      icon: 'bi-building-fill',
      color: '#2ecc71',
      description: 'Admin support and facilities'
    },
    financial: {
      title: 'Financial',
      icon: 'bi-cash-stack',
      color: '#e74c3c',
      description: 'Financial requests and claims'
    },
    travel: {
      title: 'Travel & Expense',
      icon: 'bi-airplane-fill',
      color: '#f39c12',
      description: 'Travel requests and expense claims'
    },
    it: {
      title: 'IT & Systems',
      icon: 'bi-laptop-fill',
      color: '#1abc9c',
      description: 'IT equipment and system access'
    },
    feedback: {
      title: 'Feedback',
      icon: 'bi-chat-left-text-fill',
      color: '#34495e',
      description: 'Feedback and grievances'
    }
  };

  const allRequests = [
    // Personal Information Updates
    { 
      id: 1, 
      name: 'Bank Account Change', 
      category: 'personal', 
      description: 'Update bank account details for salary deposits', 
      icon: 'bi-bank', 
      priority: 'high', 
      sla: '2-3 business days',
      autoDescription: (data) => {
        const currentBank = data?.currentBank || '[Current Bank]';
        const newBank = data?.newBank || '[New Bank]';
        const accountNum = data?.newAccountNumber || '[Account Number]';
        const ifsc = data?.ifscCode || '[IFSC Code]';
        const branch = data?.branchName ? `, Branch: ${data.branchName}` : '';
        
        return `Request to change bank account from ${currentBank} to ${newBank} (Account: ${accountNum}, IFSC: ${ifsc}${branch}) for salary deposits.`;
      },
      fields: [
        { name: 'currentBank', label: 'Current Bank', type: 'text', required: true, maxLength: 50 },
        { name: 'currentAccountNumber', label: 'Current Account Number', type: 'text', required: true, maxLength: 20 },
        { name: 'newBank', label: 'New Bank', type: 'text', required: true, maxLength: 50 },
        { name: 'newAccountNumber', label: 'New Account Number', type: 'text', required: true, maxLength: 20 },
        { name: 'ifscCode', label: 'IFSC Code', type: 'text', required: true, maxLength: 11 },
        { name: 'branchName', label: 'Branch Name', type: 'text', required: false, maxLength: 50 },
        { name: 'cancelledCheque', label: 'Cancelled Cheque Upload', type: 'file', required: true }
      ]
    },
    { 
      id: 2, 
      name: 'Address Change', 
      category: 'personal', 
      description: 'Update current/permanent address', 
      icon: 'bi-geo-alt-fill', 
      priority: 'medium', 
      sla: '1-2 business days',
      autoDescription: (data) => {
        const addressType = data?.addressType || '[Address Type]';
        const newAddress = data?.newAddress || '[New Address]';
        const city = data?.city || '[City]';
        const pincode = data?.pincode || '[Pincode]';
        
        return `Request to update ${addressType} address: ${newAddress}, ${city} - ${pincode}.`;
      },
      fields: [
        { name: 'addressType', label: 'Address Type', type: 'select', options: ['Current', 'Permanent', 'Both'], required: true },
        { name: 'newAddress', label: 'New Address', type: 'textarea', required: true, maxLength: 200 },
        { name: 'city', label: 'City', type: 'text', required: true, maxLength: 30 },
        { name: 'pincode', label: 'Pincode', type: 'text', required: true, maxLength: 6 },
        { name: 'proofOfAddress', label: 'Proof of Address', type: 'file', required: true }
      ]
    },
    { 
      id: 3, 
      name: 'Emergency Contact Update', 
      category: 'personal', 
      description: 'Update emergency contact information', 
      icon: 'bi-telephone-plus-fill', 
      priority: 'low', 
      sla: '1 business day',
      autoDescription: (data) => {
        const contactName = data?.contactName || '[Contact Name]';
        const relationship = data?.relationship || '[Relationship]';
        const phoneNumber = data?.phoneNumber || '[Phone]';
        const altPhone = data?.alternatePhone ? `, Alt: ${data.alternatePhone}` : '';
        
        return `Update emergency contact: ${contactName} (${relationship}), Phone: ${phoneNumber}${altPhone}.`;
      },
      fields: [
        { name: 'contactName', label: 'Contact Name', type: 'text', required: true, maxLength: 50 },
        { name: 'relationship', label: 'Relationship', type: 'text', required: true, maxLength: 20 },
        { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true, maxLength: 15 },
        { name: 'alternatePhone', label: 'Alternate Phone', type: 'tel', required: false, maxLength: 15 }
      ]
    },
    
    // Work-Related Requests
    { 
      id: 7, 
      name: 'Work-from-Home Request', 
      category: 'work', 
      description: 'Request for work from home arrangement', 
      icon: 'bi-house-fill', 
      priority: 'medium', 
      sla: '2-3 business days',
      autoDescription: (data) => {
        const wfhStartDate = data?.wfhStartDate || '[Start Date]';
        const wfhEndDate = data?.wfhEndDate || '[End Date]';
        const reasonForWFH = data?.reasonForWFH || '[Reason]';
        const workLocation = data?.workLocation || '[Location]';
        
        return `Request for work from home from ${wfhStartDate} to ${wfhEndDate}. Reason: ${reasonForWFH}. Work location: ${workLocation}.`;
      },
      fields: [
        { name: 'wfhStartDate', label: 'WFH Start Date', type: 'date', required: true },
        { name: 'wfhEndDate', label: 'WFH End Date', type: 'date', required: true },
        { name: 'reasonForWFH', label: 'Reason for WFH', type: 'textarea', required: true, maxLength: 300 },
        { name: 'workLocation', label: 'Work Location', type: 'text', required: true, maxLength: 100 },
        { name: 'internetAvailability', label: 'Internet Availability', type: 'radio', options: ['Yes', 'No'], required: true }
      ]
    },
    { 
      id: 8, 
      name: 'Remote Work Approval', 
      category: 'work', 
      description: 'Request for permanent remote work', 
      icon: 'bi-globe', 
      priority: 'high', 
      sla: '5-7 business days',
      autoDescription: (data) => {
        const remoteLocation = data?.remoteLocation || '[Location]';
        const expectedStartDate = data?.expectedStartDate || '[Start Date]';
        const businessJustification = data?.businessJustification || '[Justification]';
        
        return `Request for permanent remote work from ${remoteLocation} starting ${expectedStartDate}. Justification: ${businessJustification}.`;
      },
      fields: [
        { name: 'remoteLocation', label: 'Remote Location', type: 'text', required: true, maxLength: 100 },
        { name: 'businessJustification', label: 'Business Justification', type: 'textarea', required: true, maxLength: 500 },
        { name: 'expectedStartDate', label: 'Expected Start Date', type: 'date', required: true },
        { name: 'internetSpeed', label: 'Internet Speed', type: 'text', required: true, maxLength: 20 }
      ]
    },
    { 
      id: 9, 
      name: 'Shift Change Request', 
      category: 'work', 
      description: 'Change work shift timing', 
      icon: 'bi-clock-fill', 
      priority: 'medium', 
      sla: '3-5 business days',
      autoDescription: (data) => {
        const currentShift = data?.currentShift || '[Current]';
        const requestedShift = data?.requestedShift || '[Requested]';
        const effectiveDate = data?.effectiveDate || '[Date]';
        const reason = data?.reason || '[Reason]';
        
        return `Request to change shift from ${currentShift} to ${requestedShift} shift effective ${effectiveDate}. Reason: ${reason}.`;
      },
      fields: [
        { name: 'currentShift', label: 'Current Shift', type: 'text', required: true, maxLength: 20 },
        { name: 'requestedShift', label: 'Requested Shift', type: 'select', options: ['Morning', 'General', 'Night'], required: true },
        { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
        { name: 'reason', label: 'Reason', type: 'textarea', required: true, maxLength: 200 }
      ]
    },
    
    // Administrative Requests
    { 
      id: 13, 
      name: 'ID Card Reissue', 
      category: 'administrative', 
      description: 'Request new ID card', 
      icon: 'bi-person-badge-fill', 
      priority: 'medium', 
      sla: '3-5 business days',
      autoDescription: (data) => {
        const reasonForReissue = data?.reasonForReissue || '[Reason]';
        const lastSeenDate = data?.lastSeenDate ? ` Last seen: ${data.lastSeenDate}` : '';
        const policeComplaint = data?.policeComplaint ? ` Police Complaint: ${data.policeComplaint}` : '';
        
        return `Request for ID card reissue (${reasonForReissue})${lastSeenDate}${policeComplaint}.`;
      },
      fields: [
        { name: 'reasonForReissue', label: 'Reason for Reissue', type: 'select', options: ['Lost', 'Damaged', 'Information Update'], required: true },
        { name: 'lastSeenDate', label: 'Last Seen Date', type: 'date', required: false },
        { name: 'policeComplaint', label: 'Police Complaint (if lost)', type: 'text', required: false, maxLength: 20 },
        { name: 'passportPhoto', label: 'Passport Photo', type: 'file', required: true }
      ]
    },
    { 
      id: 14, 
      name: 'Access Card Request', 
      category: 'administrative', 
      description: 'Request building access card', 
      icon: 'bi-key-fill', 
      priority: 'medium', 
      sla: '2-3 business days',
      autoDescription: (data) => {
        const accessType = data?.accessType || '[Type]';
        const accessAreas = Array.isArray(data?.accessAreas) && data.accessAreas.length > 0 
          ? data.accessAreas.join(', ') 
          : '[Areas]';
        const validity = data?.validity || '[Validity]';
        const endDate = data?.endDate ? ` until ${data.endDate}` : '';
        
        return `Request for ${accessType} access card for areas: ${accessAreas} (${validity}${endDate}).`;
      },
      fields: [
        { name: 'accessType', label: 'Access Type', type: 'select', options: ['New', 'Replacement', 'Additional'], required: true },
        { name: 'accessAreas', label: 'Access Areas', type: 'multiselect', options: ['Main Gate', 'Parking', 'Floor Access', 'Server Room', 'Lab'], required: true },
        { name: 'validity', label: 'Validity', type: 'select', options: ['Permanent', 'Temporary'], required: true },
        { name: 'endDate', label: 'End Date (if temporary)', type: 'date', required: false }
      ]
    },
    
    // Financial Requests
    { 
      id: 19, 
      name: 'Salary Advance', 
      category: 'financial', 
      description: 'Request salary advance payment', 
      icon: 'bi-cash', 
      priority: 'high', 
      sla: '3-5 business days',
      autoDescription: (data) => {
        const advanceAmount = data?.advanceAmount || '[Amount]';
        const numberOfInstallments = data?.numberOfInstallments || '[Installments]';
        const reasonForAdvance = data?.reasonForAdvance || '[Reason]';
        const emergencyContact = data?.emergencyContact || '[Contact]';
        
        return `Request for salary advance of ₹${advanceAmount} in ${numberOfInstallments} installments. Reason: ${reasonForAdvance}. Emergency contact: ${emergencyContact}.`;
      },
      fields: [
        { name: 'advanceAmount', label: 'Advance Amount (₹)', type: 'number', required: true, max: 100000 },
        { name: 'numberOfInstallments', label: 'Number of Installments', type: 'select', options: ['1', '2', '3', '4', '5', '6'], required: true },
        { name: 'reasonForAdvance', label: 'Reason for Advance', type: 'textarea', required: true, maxLength: 300 },
        { name: 'emergencyContact', label: 'Emergency Contact', type: 'text', required: true, maxLength: 50 },
        { name: 'supportingDocuments', label: 'Supporting Documents', type: 'file', required: false }
      ]
    },
    { 
      id: 21, 
      name: 'Reimbursement Claim', 
      category: 'financial', 
      description: 'Submit expenses for reimbursement', 
      icon: 'bi-receipt', 
      priority: 'medium', 
      sla: '5-7 business days',
      autoDescription: (data) => {
        const totalAmount = data?.totalAmount || '[Amount]';
        const expenseType = data?.expenseType || '[Expense Type]';
        const expensePeriod = data?.expensePeriod || '[Period]';
        const description = data?.description || '[Description]';
        
        return `Reimbursement claim of ₹${totalAmount} for ${expenseType} expenses (Period: ${expensePeriod}). Description: ${description}.`;
      },
      fields: [
        { name: 'expenseType', label: 'Expense Type', type: 'select', options: ['Travel', 'Medical', 'Books', 'Internet', 'Other'], required: true },
        { name: 'totalAmount', label: 'Total Amount (₹)', type: 'number', required: true, max: 50000 },
        { name: 'expensePeriod', label: 'Expense Period', type: 'month', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true, maxLength: 200 },
        { name: 'supportingBills', label: 'Supporting Bills', type: 'file', required: true }
      ]
    },
    
    // Travel & Expense
    { 
      id: 25, 
      name: 'Business Travel Request', 
      category: 'travel', 
      description: 'Request approval for business travel', 
      icon: 'bi-airplane', 
      priority: 'high', 
      sla: '3-5 business days',
      autoDescription: (data) => {
        const destination = data?.destination || '[Destination]';
        const travelStartDate = data?.travelStartDate || '[Start]';
        const travelEndDate = data?.travelEndDate || '[End]';
        const purposeOfTravel = data?.purposeOfTravel || '[Purpose]';
        const estimatedCost = data?.estimatedCost || '[Cost]';
        
        return `Business travel to ${destination} from ${travelStartDate} to ${travelEndDate}. Purpose: ${purposeOfTravel}. Estimated cost: ₹${estimatedCost}.`;
      },
      fields: [
        { name: 'purposeOfTravel', label: 'Purpose of Travel', type: 'textarea', required: true, maxLength: 300 },
        { name: 'destination', label: 'Destination', type: 'text', required: true, maxLength: 50 },
        { name: 'travelStartDate', label: 'Travel Start Date', type: 'date', required: true },
        { name: 'travelEndDate', label: 'Travel End Date', type: 'date', required: true },
        { name: 'estimatedCost', label: 'Estimated Cost (₹)', type: 'number', required: true, max: 100000 },
        { name: 'travelMode', label: 'Travel Mode', type: 'multiselect', options: ['Flight', 'Train', 'Car', 'Bus'], required: true }
      ]
    },
    { 
      id: 27, 
      name: 'Expense Reimbursement', 
      category: 'travel', 
      description: 'Submit travel expenses', 
      icon: 'bi-receipt-cutoff', 
      priority: 'medium', 
      sla: '5-7 business days',
      autoDescription: (data) => {
        const totalClaimAmount = data?.totalClaimAmount || '[Amount]';
        const currency = data?.currency ? `(${data.currency})` : '';
        const travelReferenceId = data?.travelReferenceId || '[Reference]';
        const expenseDetails = data?.expenseDetails || '[Details]';
        
        return `Travel expense reimbursement of ₹${totalClaimAmount} ${currency} for travel reference ${travelReferenceId}. Details: ${expenseDetails}.`;
      },
      fields: [
        { name: 'travelReferenceId', label: 'Travel Reference ID', type: 'text', required: true, maxLength: 20 },
        { name: 'totalClaimAmount', label: 'Total Claim Amount', type: 'number', required: true, max: 100000 },
        { name: 'currency', label: 'Currency', type: 'select', options: ['INR', 'USD', 'EUR'], required: true },
        { name: 'expenseDetails', label: 'Expense Details', type: 'textarea', required: true, maxLength: 300 },
        { name: 'billsReceipts', label: 'Bills/Receipts', type: 'file', required: true }
      ]
    },
    
    // IT & Systems
    { 
      id: 30, 
      name: 'Software Access', 
      category: 'it', 
      description: 'Request access to software/tools', 
      icon: 'bi-display', 
      priority: 'medium', 
      sla: '1-2 business days',
      autoDescription: (data) => {
        const requiredAccessLevel = data?.requiredAccessLevel || '[Access Level]';
        const softwareName = data?.softwareName || '[Software]';
        const version = data?.version ? ` v${data.version}` : '';
        const projectTeam = data?.projectTeam || '[Project/Team]';
        const purposeOfAccess = data?.purposeOfAccess || '[Purpose]';
        
        return `Request for ${requiredAccessLevel} access to ${softwareName}${version} for ${projectTeam}. Purpose: ${purposeOfAccess}.`;
      },
      fields: [
        { name: 'softwareName', label: 'Software Name', type: 'text', required: true, maxLength: 50 },
        { name: 'version', label: 'Version', type: 'text', required: true, maxLength: 20 },
        { name: 'purposeOfAccess', label: 'Purpose of Access', type: 'textarea', required: true, maxLength: 200 },
        { name: 'requiredAccessLevel', label: 'Required Access Level', type: 'select', options: ['Read Only', 'Read-Write', 'Admin'], required: true },
        { name: 'projectTeam', label: 'Project/Team', type: 'text', required: true, maxLength: 50 }
      ]
    },
    { 
      id: 31, 
      name: 'VPN Access Request', 
      category: 'it', 
      description: 'Request for VPN access', 
      icon: 'bi-shield-lock-fill', 
      priority: 'medium', 
      sla: '2-3 business days',
      autoDescription: (data) => {
        const accessType = data?.accessType || '[Access Type]';
        const duration = data?.duration || '[Duration]';
        const requiredLocations = data?.requiredLocations || '[Locations]';
        const reasonForVPN = data?.reasonForVPN || '[Reason]';
        
        return `Request for ${accessType} VPN access for ${duration}. Locations: ${requiredLocations}. Reason: ${reasonForVPN}.`;
      },
      fields: [
        { name: 'accessType', label: 'Access Type', type: 'select', options: ['Full Time', 'On-demand', 'Temporary'], required: true },
        { name: 'reasonForVPN', label: 'Reason for VPN', type: 'textarea', required: true, maxLength: 300 },
        { name: 'requiredLocations', label: 'Required Locations', type: 'text', required: true, maxLength: 100 },
        { name: 'duration', label: 'Duration', type: 'text', required: true, maxLength: 20 },
        { name: 'deviceDetails', label: 'Device Details', type: 'textarea', required: true, maxLength: 200 }
      ]
    },
    
    // Feedback & Grievances
    { 
      id: 35, 
      name: 'General Feedback', 
      category: 'feedback', 
      description: 'Share workplace feedback', 
      icon: 'bi-chat-left-text', 
      priority: 'low', 
      sla: 'Acknowledgement in 1 day',
      autoDescription: (data) => {
        const feedbackType = data?.feedbackType || '[Type]';
        const category = data?.category || '[Category]';
        const anonymous = data?.anonymous === true || data?.anonymous === 'true' ? '(Submitted anonymously)' : '';
        
        return `${feedbackType} feedback about ${category}. ${anonymous}`;
      },
      fields: [
        { name: 'feedbackType', label: 'Feedback Type', type: 'select', options: ['Positive', 'Constructive', 'Concern'], required: true },
        { name: 'category', label: 'Category', type: 'select', options: ['Work Environment', 'Processes', 'Facilities', 'Team'], required: true },
        { name: 'feedbackDetails', label: 'Feedback Details', type: 'textarea', required: true, maxLength: 500 },
        { name: 'suggestions', label: 'Suggestions', type: 'textarea', required: false, maxLength: 300 },
        { name: 'anonymous', label: 'Submit Anonymously', type: 'checkbox', required: false }
      ]
    },
    { 
      id: 37, 
      name: 'HR Grievance', 
      category: 'feedback', 
      description: 'Raise HR concerns', 
      icon: 'bi-shield-exclamation', 
      priority: 'high', 
      sla: 'Initial response in 2 business days',
      autoDescription: (data) => {
        const grievanceType = data?.grievanceType || '[Type]';
        const dateOfIncident = data?.dateOfIncident ? ` (Date: ${data.dateOfIncident})` : '';
        const confidentiality = data?.confidentiality || '[Level]';
        
        return `HR grievance regarding ${grievanceType}${dateOfIncident}. Confidentiality: ${confidentiality}.`;
      },
      fields: [
        { name: 'grievanceType', label: 'Grievance Type', type: 'select', options: ['Workplace Issue', 'Policy Concern', 'Interpersonal'], required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true, maxLength: 1000 },
        { name: 'dateOfIncident', label: 'Date of Incident', type: 'date', required: false },
        { name: 'expectedOutcome', label: 'Expected Outcome', type: 'textarea', required: true, maxLength: 300 },
        { name: 'confidentiality', label: 'Confidentiality', type: 'select', options: ['Standard', 'Confidential'], required: true }
      ]
    }
  ];

  // ==================== FORM STATE ====================
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [charCount, setCharCount] = useState({});

  // ==================== HELPER FUNCTIONS ====================
  const filteredRequests = allRequests.filter(req => req.category === activeCategory);

  const filteredHistory = requestHistory.filter(req => {
    const matchesSearch = searchTerm === '' || 
      req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requestId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Submitted': { bg: 'primary', text: 'Submitted' },
      'In Progress': { bg: 'warning', text: 'In Progress' },
      'Approved': { bg: 'success', text: 'Approved' },
      'Rejected': { bg: 'danger', text: 'Rejected' },
      'Completed': { bg: 'secondary', text: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig['Submitted'];
    
    return (
      <span className={`badge bg-${config.bg}`}>
        {config.text}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      'high': { bg: 'danger', text: 'High' },
      'medium': { bg: 'warning', text: 'Medium' },
      'low': { bg: 'success', text: 'Low' }
    };
    
    const config = priorityConfig[priority] || priorityConfig['medium'];
    
    return (
      <span className={`badge bg-${config.bg}`}>
        {config.text}
      </span>
    );
  };

  // FIXED: Each button opens specific form
  const handleQuickBankChange = () => {
    const bankRequest = allRequests.find(r => r.name === 'Bank Account Change');
    if (bankRequest) {
      setSelectedRequest(bankRequest);
      setShowRequestModal(true);
      // Auto-fill some sample data for demo
      setFormData({
        currentBank: 'HDFC Bank',
        currentAccountNumber: '123456789012',
        newBank: 'ICICI Bank',
        newAccountNumber: '987654321012',
        ifscCode: 'ICIC0001234',
        branchName: 'MG Road Branch'
      });
      setFormErrors({});
      setCharCount({});
    }
  };

  const handleQuickWFHRequest = () => {
    const wfhRequest = allRequests.find(r => r.name === 'Work-from-Home Request');
    if (wfhRequest) {
      setSelectedRequest(wfhRequest);
      setShowRequestModal(true);
      // Auto-fill dates
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      setFormData({
        wfhStartDate: today.toISOString().split('T')[0],
        wfhEndDate: nextWeek.toISOString().split('T')[0],
        workLocation: 'Home - Bangalore',
        internetAvailability: 'Yes'
      });
      setFormErrors({});
      setCharCount({});
    }
  };

  const handleQuickReimbursement = () => {
    const reimbursementRequest = allRequests.find(r => r.name === 'Reimbursement Claim');
    if (reimbursementRequest) {
      setSelectedRequest(reimbursementRequest);
      setShowRequestModal(true);
      // Auto-fill sample data
      setFormData({
        expenseType: 'Travel',
        totalAmount: 7500,
        expensePeriod: '2024-03',
        description: 'Travel expenses for client meeting in Mumbai'
      });
      setFormErrors({});
      setCharCount({});
    }
  };

  const handleQuickITRequest = () => {
    const itRequest = allRequests.find(r => r.name === 'Software Access');
    if (itRequest) {
      setSelectedRequest(itRequest);
      setShowRequestModal(true);
      // Auto-fill sample data
      setFormData({
        softwareName: 'Microsoft Project',
        version: '2021',
        requiredAccessLevel: 'Read-Write',
        projectTeam: 'Project Management Team',
        purposeOfAccess: 'To manage project timelines and resources'
      });
      setFormErrors({});
      setCharCount({});
    }
  };

  const handleQuickFeedback = () => {
    const feedbackRequest = allRequests.find(r => r.name === 'General Feedback');
    if (feedbackRequest) {
      setSelectedRequest(feedbackRequest);
      setShowRequestModal(true);
      // Auto-fill sample data
      setFormData({
        feedbackType: 'Constructive',
        category: 'Work Environment',
        feedbackDetails: 'The office environment is good, but we need more collaborative spaces.',
        suggestions: 'Add more meeting rooms with whiteboards'
      });
      setFormErrors({});
      setCharCount({});
    }
  };

  const handleFormChange = (fieldName, value, maxLength) => {
    // Count characters for textareas
    if (maxLength && typeof value === 'string') {
      setCharCount(prev => ({
        ...prev,
        [fieldName]: value.length
      }));
      
      // Truncate if exceeds max length
      if (value.length > maxLength) {
        value = value.substring(0, maxLength);
      }
    }
    
    setFormData({
      ...formData,
      [fieldName]: value
    });
    
    // Clear error for this field
    if (formErrors[fieldName]) {
      setFormErrors({
        ...formErrors,
        [fieldName]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!selectedRequest) return errors;

    selectedRequest.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors[field.name] = `${field.label} is required`;
        }
        
        // Validate max length for text fields
        if (field.maxLength && value && value.length > field.maxLength) {
          errors[field.name] = `Maximum ${field.maxLength} characters allowed`;
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill all required fields correctly');
      return;
    }

    // Generate description from form data
    const generatedDescription = selectedRequest.autoDescription 
      ? selectedRequest.autoDescription(formData)
      : selectedRequest.description;

    const newRequest = {
      id: requestHistory.length + 1,
      requestId: `REQ-${1000 + requestHistory.length + 1}`,
      type: selectedRequest.name,
      category: selectedRequest.category,
      submittedDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Submitted',
      priority: selectedRequest.priority,
      description: generatedDescription,
      sla: selectedRequest.sla,
      approvers: getDefaultApprovers(selectedRequest.category),
      attachments: []
    };

    setRequestHistory([newRequest, ...requestHistory]);
    setShowRequestModal(false);
    setSelectedRequest(null);
    setFormData({});
    setFormErrors({});
    setCharCount({});
    
    alert(`✅ ${selectedRequest.name} submitted successfully!\nRequest ID: ${newRequest.requestId}\n\nGenerated Description:\n${generatedDescription}`);
  };

  const getDefaultApprovers = (category) => {
    const approverMap = {
      'personal': ['HR Department'],
      'work': ['Reporting Manager', 'HR Department'],
      'financial': ['Finance Department'],
      'administrative': ['Admin Department'],
      'travel': ['Reporting Manager', 'Travel Desk'],
      'it': ['IT Department'],
      'feedback': ['HR Department']
    };
    return approverMap[category] || ['HR Department'];
  };

  const getStats = () => {
    const total = requestHistory.length;
    const submitted = requestHistory.filter(req => req.status === 'Submitted').length;
    const inProgress = requestHistory.filter(req => req.status === 'In Progress').length;
    const approved = requestHistory.filter(req => req.status === 'Approved').length;
    const completed = requestHistory.filter(req => req.status === 'Completed').length;
    
    return { total, submitted, inProgress, approved, completed };
  };

  const stats = getStats();

  // ==================== MODAL COMPONENTS ====================

  // Request Form Modal with Category-Specific Fields
  const RequestFormModal = () => {
    if (!selectedRequest) return null;

    const category = requestCategories[selectedRequest.category];
    
    // Safely generate description
    const getGeneratedDescription = () => {
      if (!selectedRequest.autoDescription) {
        return selectedRequest.description;
      }
      
      try {
        // Create a safe copy of formData with defaults
        const safeData = { ...formData };
        
        // Ensure all fields have at least placeholder values
        selectedRequest.fields.forEach(field => {
          if (!safeData.hasOwnProperty(field.name) || 
              safeData[field.name] === '' || 
              safeData[field.name] === null || 
              safeData[field.name] === undefined) {
            safeData[field.name] = `[${field.label}]`;
          }
        });
        
        return selectedRequest.autoDescription(safeData);
      } catch (error) {
        console.error("Error generating description:", error);
        return selectedRequest.description;
      }
    };
    
    const generatedDescription = getGeneratedDescription();

    const renderFormField = (field) => {
      const fieldValue = formData[field.name] || '';
      
      switch (field.type) {
        case 'textarea':
          return (
            <div>
              <textarea
                className={`form-control ${formErrors[field.name] ? 'is-invalid' : ''}`}
                rows={field.maxLength > 200 ? 4 : 3}
                value={fieldValue}
                onChange={(e) => handleFormChange(field.name, e.target.value, field.maxLength)}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
                required={field.required}
                maxLength={field.maxLength}
              />
              {field.maxLength && (
                <div className="text-end mt-1">
                  <small className={`text-muted ${charCount[field.name] > field.maxLength * 0.9 ? 'text-warning' : ''}`}>
                    {charCount[field.name] || 0}/{field.maxLength} characters
                  </small>
                </div>
              )}
              {formErrors[field.name] && (
                <div className="invalid-feedback">{formErrors[field.name]}</div>
              )}
            </div>
          );
        
        case 'select':
          return (
            <select
              className={`form-select ${formErrors[field.name] ? 'is-invalid' : ''}`}
              value={fieldValue}
              onChange={(e) => handleFormChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        
        case 'multiselect':
          const values = Array.isArray(fieldValue) ? fieldValue : [];
          return (
            <select
              className={`form-select ${formErrors[field.name] ? 'is-invalid' : ''}`}
              multiple
              value={values}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleFormChange(field.name, selected);
              }}
              required={field.required}
              style={{ height: '100px' }}
            >
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        
        case 'radio':
          return (
            <div>
              {field.options.map(option => (
                <div className="form-check form-check-inline" key={option}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={field.name}
                    value={option}
                    checked={fieldValue === option}
                    onChange={(e) => handleFormChange(field.name, e.target.value)}
                    required={field.required}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
              {formErrors[field.name] && (
                <div className="text-danger small">{formErrors[field.name]}</div>
              )}
            </div>
          );
        
        case 'checkbox':
          return (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={fieldValue || false}
                onChange={(e) => handleFormChange(field.name, e.target.checked)}
                required={field.required}
              />
              <label className="form-check-label">
                {field.label}
              </label>
            </div>
          );
        
        case 'file':
          return (
            <div>
              <input
                type="file"
                className={`form-control ${formErrors[field.name] ? 'is-invalid' : ''}`}
                onChange={(e) => handleFormChange(field.name, e.target.files[0])}
                required={field.required}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <small className="text-muted">Max 10MB, PDF, JPG, PNG, DOC formats</small>
            </div>
          );
        
        default:
          return (
            <input
              type={field.type}
              className={`form-control ${formErrors[field.name] ? 'is-invalid' : ''}`}
              value={fieldValue}
              onChange={(e) => handleFormChange(field.name, e.target.value, field.maxLength)}
              required={field.required}
              maxLength={field.maxLength}
              max={field.max}
              min={field.min}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          );
      }
    };

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0" style={{ backgroundColor: category.color, color: 'white' }}>
              <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                <i className={`${selectedRequest.icon} fs-4`}></i>
                <span>{selectedRequest.name}</span>
              </h5>
              <button 
                className="btn-close btn-close-white" 
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedRequest(null);
                  setFormErrors({});
                  setFormData({});
                }}
              ></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="alert alert-light mb-4">
                <div className="row">
                  <div className="col-12 col-md-6 mb-2">
                    <small className="text-muted">Category</small>
                    <div className="fw-bold d-flex align-items-center gap-2">
                      <i className={category.icon}></i>
                      {category.title}
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mb-2">
                    <small className="text-muted">Priority</small>
                    <div>{getPriorityBadge(selectedRequest.priority)}</div>
                  </div>
                  <div className="col-12 col-md-3 mb-2">
                    <small className="text-muted">SLA</small>
                    <div className="fw-bold">{selectedRequest.sla}</div>
                  </div>
                </div>
                <p className="mb-0 text-muted mt-2">{selectedRequest.description}</p>
              </div>
              
              {/* Generated Description Preview */}
              <div className="alert alert-info mb-4">
                <h6 className="fw-bold mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-card-text"></i>
                  Auto-Generated Description Preview:
                </h6>
                <p className="mb-0 small">
                  {generatedDescription}
                </p>
                <small className="text-muted mt-2 d-block">
                  <i className="bi bi-info-circle me-1"></i>
                  This description is automatically generated from your form inputs
                </small>
              </div>
              
              <form onSubmit={handleSubmitRequest}>
                <div className="row">
                  {selectedRequest.fields.map((field, index) => (
                    <div key={index} className={`col-12 ${field.type === 'textarea' ? 'mb-4' : 'mb-3'}`}>
                      <label className="form-label fw-medium">
                        {field.label} {field.required && <span className="text-danger">*</span>}
                      </label>
                      {renderFormField(field)}
                    </div>
                  ))}
                </div>
              </form>
            </div>
            
            <div className="modal-footer border-0">
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedRequest(null);
                  setFormErrors({});
                  setFormData({});
                }}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSubmitRequest}
                style={{ backgroundColor: category.color, borderColor: category.color }}
              >
                <i className="bi bi-check-circle me-2"></i>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Guide Modal
  const GuideModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0 bg-primary text-white">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-info-circle me-2"></i>
                Quick Guide
              </h5>
              <button className="btn-close btn-close-white" onClick={() => setShowGuideModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="alert alert-light mb-4">
                <h6 className="fw-bold">How Auto-Description Works</h6>
                <p className="mb-0">
                  When you fill the form, a description is automatically generated from your inputs. 
                  This saves time and ensures consistency in request descriptions.
                </p>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card border">
                    <div className="card-body">
                      <h6 className="card-title text-primary d-flex align-items-center gap-2">
                        <i className="bi bi-lightning"></i>
                        Quick Actions
                      </h6>
                      <ul className="mb-0 small">
                        <li><strong>Bank Change:</strong> Auto-fills with sample bank details</li>
                        <li><strong>WFH Request:</strong> Auto-fills with next week's dates</li>
                        <li><strong>Reimbursement:</strong> Auto-fills with sample expense data</li>
                        <li><strong>IT Request:</strong> Auto-fills with software details</li>
                        <li><strong>Feedback:</strong> Auto-fills with feedback categories</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div className="card border">
                    <div className="card-body">
                      <h6 className="card-title text-success d-flex align-items-center gap-2">
                        <i className="bi bi-card-text"></i>
                        Auto Description Examples
                      </h6>
                      <ul className="mb-0 small">
                        <li><strong>Bank:</strong> "Change from HDFC to ICICI (Account: XXXX, IFSC: XXXX)"</li>
                        <li><strong>WFH:</strong> "WFH from [date] to [date], Reason: [reason]"</li>
                        <li><strong>Travel:</strong> "Travel to [place] from [dates], Cost: ₹[amount]"</li>
                        <li><strong>IT:</strong> "Access to [software] for [project], Level: [access]"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-primary" onClick={() => setShowGuideModal(false)}>
                <i className="bi bi-check me-2"></i>
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== MAIN COMPONENT ====================
  return (
    <div className="container-fluid px-2 px-md-3 px-lg-4 py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div className="mb-3 mb-md-0">
          <h5 className="fw-bold mb-1">
            <i className="bi bi-briefcase me-2"></i>
           Request Management
          </h5>
          <p className="text-muted mb-0 d-none d-md-block">Submit and track requests with auto-generated descriptions</p>
          <p className="text-muted mb-0 d-md-none">Auto-generated request descriptions</p>
        </div>

        <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
          <button 
            className="btn btn-outline-primary d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
            onClick={() => setShowGuideModal(true)}
          >
            <i className="bi bi-question-circle"></i>
            <span>Quick Guide</span>
          </button>
          
          <button 
            className="btn btn-primary d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
            onClick={() => {
              if (filteredRequests.length > 0) {
                setSelectedRequest(filteredRequests[0]);
                setShowRequestModal(true);
              }
            }}
          >
            <i className="bi bi-plus-circle"></i>
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards - REMOVED BACKGROUND COLOR FROM ICONS */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-muted mb-1">Total Requests</h6>
                  <h4 className="fw-bold mb-0">{stats.total}</h4>
                </div>
                <div className="p-2"> {/* Removed bg-primary and rounded-circle classes */}
                  <i className="bi bi-list-task text-primary fs-4"></i> {/* Changed to text-primary */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-muted mb-1">In Progress</h6>
                  <h4 className="fw-bold mb-0">{stats.inProgress}</h4>
                </div>
                <div className="p-2"> {/* Removed bg-warning and rounded-circle classes */}
                  <i className="bi bi-clock-history text-warning fs-4"></i> {/* Changed to text-warning */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-muted mb-1">Approved</h6>
                  <h4 className="fw-bold mb-0">{stats.approved}</h4>
                </div>
                <div className="p-2"> {/* Removed bg-success and rounded-circle classes */}
                  <i className="bi bi-check-circle text-success fs-4"></i> {/* Changed to text-success */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="card border h-100">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-muted mb-1">Completed</h6>
                  <h4 className="fw-bold mb-0">{stats.completed}</h4>
                </div>
                <div className="p-2"> {/* Removed bg-secondary and rounded-circle classes */}
                  <i className="bi bi-check2-all text-secondary fs-4"></i> {/* Changed to text-secondary */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="card border mb-4">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2">
            {Object.entries(requestCategories).map(([key, category]) => (
              <button
                key={key}
                className={`btn ${activeCategory === key ? 'btn-primary' : 'btn-outline-primary'} btn-sm d-flex align-items-center gap-2`}
                onClick={() => setActiveCategory(key)}
              >
                <i className={category.icon}></i>
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Request Grid */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <h6 className="mb-2 mb-md-0 fw-bold d-flex align-items-center gap-2">
                <i className={requestCategories[activeCategory].icon}></i>
                <span>{requestCategories[activeCategory].title} Requests</span>
              </h6>
              <span className="badge bg-primary">{filteredRequests.length} requests available</span>
            </div>
            
            <div className="card-body">
              {filteredRequests.length > 0 ? (
                <div className="row g-3">
                  {filteredRequests.map(request => (
                    <div key={request.id} className="col-12 col-md-6 col-lg-4">
                      <div 
                        className="card border h-100 hover-shadow"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowRequestModal(true);
                        }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <i className={`${request.icon} fs-4 text-primary`}></i>
                            {getPriorityBadge(request.priority)}
                          </div>
                          <h6 className="card-title fw-bold">{request.name}</h6>
                          <p className="card-text text-muted small">
                            <i className="bi bi-card-text me-1"></i>
                            {request.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <small className="text-muted d-flex align-items-center gap-1">
                              <i className="bi bi-clock"></i>
                              {request.sla}
                            </small>
                            <small className="text-primary d-flex align-items-center gap-1">
                              <i className="bi bi-magic"></i>
                              Auto-description
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="text-muted mb-3">
                    <i className="bi bi-inbox fs-1"></i>
                  </div>
                  <h6 className="text-muted">No requests available in this category</h6>
                  <p className="text-muted small">Select a different category to view available requests</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Request History */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <h6 className="mb-2 mb-md-0 fw-bold">
                <i className="bi bi-clock-history me-2"></i>
                Request History
              </h6>
              <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                <div className="input-group input-group-sm">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by ID or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="form-select form-select-sm"
                  style={{ width: 'auto' }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Submitted">Submitted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Request ID</th>
                      <th className="d-none d-md-table-cell">Type</th>
                      <th>Category</th>
                      <th>Submitted Date</th>
                      <th>Status</th>
                      <th>SLA</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.map(request => (
                      <tr key={request.id}>
                        <td>
                          <div className="fw-bold text-primary">{request.requestId}</div>
                        </td>
                        <td className="d-none d-md-table-cell">
                          <div className="fw-medium">{request.type}</div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <i className={requestCategories[request.category]?.icon}></i>
                            <span className="d-none d-md-inline">{requestCategories[request.category]?.title}</span>
                            <span className="d-inline d-md-none">{requestCategories[request.category]?.title.substring(0, 3)}</span>
                          </div>
                        </td>
                        <td>
                          <div className="small">{request.submittedDate}</div>
                        </td>
                        <td>{getStatusBadge(request.status)}</td>
                        <td>
                          <small className="text-muted">{request.sla}</small>
                        </td>
                        <td>
                          <small className="text-muted" style={{ maxWidth: '200px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {request.description}
                          </small>
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

      {/* Quick Actions - FIXED with Specific Forms */}
      <div className="row mt-4 g-3">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-light">
              <h6 className="mb-0 fw-bold">
                <i className="bi bi-lightning me-2"></i>
                Quick Actions (Auto-fill enabled)
              </h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6 col-md-4 col-lg-2">
                  <button 
                    className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                    onClick={handleQuickBankChange}
                  >
                    <i className="bi bi-bank fs-4 mb-2"></i>
                    <span className="small">Bank Change</span>
                    <small className="text-muted">Auto-fill demo</small>
                  </button>
                </div>
                
                <div className="col-6 col-md-4 col-lg-2">
                  <button 
                    className="btn btn-outline-success w-100 d-flex flex-column align-items-center py-3"
                    onClick={handleQuickWFHRequest}
                  >
                    <i className="bi bi-house fs-4 mb-2"></i>
                    <span className="small">WFH Request</span>
                    <small className="text-muted">Auto-fill dates</small>
                  </button>
                </div>
                
                <div className="col-6 col-md-4 col-lg-2">
                  <button 
                    className="btn btn-outline-info w-100 d-flex flex-column align-items-center py-3"
                    onClick={handleQuickReimbursement}
                  >
                    <i className="bi bi-cash-stack fs-4 mb-2"></i>
                    <span className="small">Reimbursement</span>
                    <small className="text-muted">Auto-fill sample</small>
                  </button>
                </div>
                
                <div className="col-6 col-md-4 col-lg-2">
                  <button 
                    className="btn btn-outline-warning w-100 d-flex flex-column align-items-center py-3"
                    onClick={handleQuickITRequest}
                  >
                    <i className="bi bi-laptop fs-4 mb-2"></i>
                    <span className="small">IT Request</span>
                    <small className="text-muted">Auto-fill details</small>
                  </button>
                </div>
                
                <div className="col-6 col-md-4 col-lg-2">
                  <button 
                    className="btn btn-outline-danger w-100 d-flex flex-column align-items-center py-3"
                    onClick={handleQuickFeedback}
                  >
                    <i className="bi bi-chat-dots fs-4 mb-2"></i>
                    <span className="small">Feedback</span>
                    <small className="text-muted">Auto-fill categories</small>
                  </button>
                </div>
                
                <div className="col-6 col-md-4 col-lg-2">
                  <button 
                    className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                    onClick={() => setShowGuideModal(true)}
                  >
                    <i className="bi bi-question-circle fs-4 mb-2"></i>
                    <span className="small">Help Guide</span>
                    <small className="text-muted">Learn more</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showRequestModal && <RequestFormModal />}
      {showGuideModal && <GuideModal />}
    </div>
  );
};

export default EmployeeSelfServicePortal;