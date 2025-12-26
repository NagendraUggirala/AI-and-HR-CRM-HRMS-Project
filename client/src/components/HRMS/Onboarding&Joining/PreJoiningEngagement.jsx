import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const PreJoiningEngagement = () => {
  // ==================== MENU ITEMS ====================
  const menuItems = [
    { title: 'Dashboard', link: '/recruiter/dashboard', active: false },
    { title: 'Job Openings', link: '/recruiter/jobs', active: false },
    { title: 'Candidates', link: '/recruiter/candidates' },
    { title: 'Interviews', link: '/recruiter/interviews' },
    { title: 'Pre-Joining', link: '/recruiter/pre-joining', active: true },
    { title: 'Onboarding', link: '/recruiter/onboarding' },
    { title: 'Reports', link: '/recruiter/reports' }
  ];

  const userInfo = {
    name: 'Recruiter User',
    role: 'HR Recruiter',
    email: 'recruiter@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Recruiter'
  };

  // ==================== INITIAL CANDIDATES DATA ====================
  const initialCandidates = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      jobTitle: 'Senior Software Engineer',
      department: 'Engineering',
      joiningDate: '2024-01-15',
      offerLetterDate: '2024-11-15',
      managerName: 'Jane Doe',
      hrContactName: 'Sarah Wilson',
      hrContactPhone: '+1 (555) 999-8888',
      status: 'pending_documents',
      
      forms: {
        personalInfo: { completed: false, lastUpdated: null },
        emergencyContact: { completed: false, lastUpdated: null },
        educationalDetails: { completed: false, lastUpdated: null },
        previousEmployment: { completed: false, lastUpdated: null },
        bankDetails: { completed: false, lastUpdated: null },
        statutoryInfo: { completed: false, lastUpdated: null },
        familyDetails: { completed: false, lastUpdated: null },
        nomineeDetails: { completed: false, lastUpdated: null },
        declarations: { completed: false, lastUpdated: null },
        backgroundVerification: { completed: false, lastUpdated: null }
      },
      
      formData: {
        personalInfo: {},
        emergencyContact: {},
        educationalDetails: {},
        previousEmployment: {},
        bankDetails: {},
        statutoryInfo: {},
        familyDetails: {},
        nomineeDetails: {},
        declarations: {},
        backgroundVerification: {}
      },
      
      documents: {
        personalInfo: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        emergencyContact: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        educationalDetails: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        previousEmployment: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        bankDetails: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        statutoryInfo: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        familyDetails: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: false
        },
        nomineeDetails: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        declarations: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        backgroundVerification: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        }
      },
      
      communications: {
        welcomeEmail: { sent: false, date: null, opened: false },
        joiningInstructions: { sent: false, date: null, opened: false },
        firstDaySchedule: { sent: false, date: null, opened: false },
        officeDetails: { sent: false, date: null, opened: false },
        dressCodeGuide: { sent: false, date: null, opened: false },
        itAccessInfo: { sent: false, date: null, opened: false },
        parkingInfo: { sent: false, date: null, opened: false },
        teamIntroduction: { sent: false, date: null, opened: false }
      },
      
      reminders: []
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      jobTitle: 'Marketing Manager',
      department: 'Marketing',
      joiningDate: '2024-01-20',
      offerLetterDate: '2024-11-18',
      managerName: 'Michael Brown',
      hrContactName: 'Robert Wilson',
      hrContactPhone: '+1 (555) 777-6666',
      status: 'documents_review',
      
      forms: {
        personalInfo: { completed: true, lastUpdated: '2024-12-01' },
        emergencyContact: { completed: true, lastUpdated: '2024-12-01' },
        educationalDetails: { completed: true, lastUpdated: '2024-12-01' },
        previousEmployment: { completed: false, lastUpdated: null },
        bankDetails: { completed: true, lastUpdated: '2024-12-01' },
        statutoryInfo: { completed: true, lastUpdated: '2024-12-01' },
        familyDetails: { completed: true, lastUpdated: '2024-12-01' },
        nomineeDetails: { completed: false, lastUpdated: null },
        declarations: { completed: false, lastUpdated: null },
        backgroundVerification: { completed: true, lastUpdated: '2024-12-01' }
      },
      
      formData: {
        personalInfo: {
          fullName: 'Sarah Johnson',
          dateOfBirth: '1990-05-15',
          gender: 'Female',
          maritalStatus: 'Single',
          nationality: 'Indian',
          panNumber: 'ABCDE1234F',
          aadhaarNumber: '123456789012',
          email: 'sarah.j@email.com',
          personalPhone: '+1 (555) 987-6543'
        },
        emergencyContact: {
          primaryName: 'Michael Johnson',
          primaryRelationship: 'Father',
          primaryPhone: '+1 (555) 111-2222',
          primaryAddress: '123 Main St, New York'
        }
      },
      
      documents: {
        personalInfo: { 
          status: 'approved', 
          submitted: true, 
          files: ['aadhaar.pdf'], 
          date: '2024-12-01',
          required: true
        },
        emergencyContact: { 
          status: 'approved', 
          submitted: true, 
          files: ['emergency_form.pdf'], 
          date: '2024-12-01',
          required: true
        },
        educationalDetails: { 
          status: 'approved', 
          submitted: true, 
          files: ['degree.pdf', 'marksheet.pdf'], 
          date: '2024-12-01',
          required: true
        },
        previousEmployment: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        bankDetails: { 
          status: 'approved', 
          submitted: true, 
          files: ['cheque.pdf'], 
          date: '2024-12-01',
          required: true
        },
        statutoryInfo: { 
          status: 'approved', 
          submitted: true, 
          files: ['pan.pdf', 'aadhaar_front.jpg'], 
          date: '2024-12-01',
          required: true
        },
        familyDetails: { 
          status: 'rejected', 
          submitted: true, 
          files: ['family.pdf'], 
          date: '2024-12-01', 
          rejectionReason: 'Incomplete information',
          required: false
        },
        nomineeDetails: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        declarations: { 
          status: 'pending', 
          submitted: false, 
          files: [],
          required: true
        },
        backgroundVerification: { 
          status: 'submitted', 
          submitted: true, 
          files: ['consent_form.pdf'], 
          date: '2024-12-01',
          required: true
        }
      },
      
      communications: {
        welcomeEmail: { sent: true, date: '2024-11-28', opened: true },
        joiningInstructions: { sent: true, date: '2024-11-29', opened: true },
        firstDaySchedule: { sent: false, date: null, opened: false },
        officeDetails: { sent: true, date: '2024-11-29', opened: true },
        dressCodeGuide: { sent: false, date: null, opened: false },
        itAccessInfo: { sent: false, date: null, opened: false },
        parkingInfo: { sent: false, date: null, opened: false },
        teamIntroduction: { sent: false, date: null, opened: false }
      },
      
      reminders: [
        { 
          id: 1, 
          type: 'document', 
          documentType: 'previousEmployment', 
          sentDate: '2024-12-03', 
          status: 'sent',
          message: 'Please submit your previous employment documents'
        }
      ]
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '+1 (555) 456-7890',
      jobTitle: 'Product Manager',
      department: 'Product',
      joiningDate: '2024-01-25',
      offerLetterDate: '2024-11-20',
      managerName: 'Emily Davis',
      hrContactName: 'Lisa Miller',
      hrContactPhone: '+1 (555) 444-3333',
      status: 'completed',
      
      forms: {
        personalInfo: { completed: true, lastUpdated: '2024-11-25' },
        emergencyContact: { completed: true, lastUpdated: '2024-11-25' },
        educationalDetails: { completed: true, lastUpdated: '2024-11-25' },
        previousEmployment: { completed: true, lastUpdated: '2024-11-26' },
        bankDetails: { completed: true, lastUpdated: '2024-11-26' },
        statutoryInfo: { completed: true, lastUpdated: '2024-11-27' },
        familyDetails: { completed: true, lastUpdated: '2024-11-27' },
        nomineeDetails: { completed: true, lastUpdated: '2024-11-27' },
        declarations: { completed: true, lastUpdated: '2024-11-27' },
        backgroundVerification: { completed: true, lastUpdated: '2024-11-28' }
      },
      
      documents: {
        personalInfo: { 
          status: 'approved', 
          submitted: true, 
          files: ['personal_info.pdf'], 
          date: '2024-11-25',
          required: true
        },
        emergencyContact: { 
          status: 'approved', 
          submitted: true, 
          files: ['emergency.pdf'], 
          date: '2024-11-25',
          required: true
        },
        educationalDetails: { 
          status: 'approved', 
          submitted: true, 
          files: ['education.pdf'], 
          date: '2024-11-25',
          required: true
        },
        previousEmployment: { 
          status: 'approved', 
          submitted: true, 
          files: ['experience.pdf'], 
          date: '2024-11-26',
          required: true
        },
        bankDetails: { 
          status: 'approved', 
          submitted: true, 
          files: ['bank.pdf'], 
          date: '2024-11-26',
          required: true
        },
        statutoryInfo: { 
          status: 'approved', 
          submitted: true, 
          files: ['statutory.pdf'], 
          date: '2024-11-27',
          required: true
        },
        familyDetails: { 
          status: 'approved', 
          submitted: true, 
          files: ['family.pdf'], 
          date: '2024-11-27',
          required: false
        },
        nomineeDetails: { 
          status: 'approved', 
          submitted: true, 
          files: ['nominee.pdf'], 
          date: '2024-11-27',
          required: true
        },
        declarations: { 
          status: 'approved', 
          submitted: true, 
          files: ['declaration.pdf'], 
          date: '2024-11-27',
          required: true
        },
        backgroundVerification: { 
          status: 'approved', 
          submitted: true, 
          files: ['bgv.pdf'], 
          date: '2024-11-28',
          required: true
        }
      },
      
      communications: {
        welcomeEmail: { sent: true, date: '2024-11-20', opened: true },
        joiningInstructions: { sent: true, date: '2024-11-21', opened: true },
        firstDaySchedule: { sent: true, date: '2024-11-22', opened: true },
        officeDetails: { sent: true, date: '2024-11-21', opened: true },
        dressCodeGuide: { sent: true, date: '2024-11-22', opened: true },
        itAccessInfo: { sent: true, date: '2024-11-23', opened: true },
        parkingInfo: { sent: true, date: '2024-11-22', opened: true },
        teamIntroduction: { sent: true, date: '2024-11-23', opened: true }
      },
      
      reminders: []
    }
  ];

  // ==================== STATE MANAGEMENT ====================
  const [candidates, setCandidates] = useState(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  
  const [selectedForm, setSelectedForm] = useState('');
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const [uploadDocument, setUploadDocument] = useState({
    candidateId: null,
    documentType: '',
    file: null,
    comments: '',
    fileName: ''
  });

  const [reminderData, setReminderData] = useState({
    candidateId: null,
    type: 'document',
    documentType: '',
    communicationType: '',
    date: '',
    message: ''
  });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: 'Engineering',
    joiningDate: '',
    managerName: '',
    hrContactName: '',
    hrContactPhone: ''
  });

  // ==================== DOCUMENT CHECKLIST ====================
  const documentChecklist = [
    {
      id: 'personalInfo',
      name: 'Personal Information Form',
      description: 'Basic personal details, contact information',
      required: true,
      fileTypes: ['pdf', 'doc', 'docx'],
      maxSize: '5MB'
    },
    {
      id: 'emergencyContact',
      name: 'Emergency Contact Form',
      description: 'Emergency contact details',
      required: true,
      fileTypes: ['pdf', 'doc', 'docx'],
      maxSize: '5MB'
    },
    {
      id: 'educationalDetails',
      name: 'Educational Details Form',
      description: 'Educational qualifications and certificates',
      required: true,
      fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSize: '10MB'
    },
    {
      id: 'previousEmployment',
      name: 'Previous Employment Details',
      description: 'Previous work experience and references',
      required: true,
      fileTypes: ['pdf', 'doc', 'docx'],
      maxSize: '10MB'
    },
    {
      id: 'bankDetails',
      name: 'Bank Account Details Form',
      description: 'Bank account information for salary',
      required: true,
      fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSize: '5MB'
    },
    {
      id: 'statutoryInfo',
      name: 'Statutory Information',
      description: 'PAN, Aadhaar, PF, ESI documents',
      required: true,
      fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSize: '10MB'
    },
    {
      id: 'familyDetails',
      name: 'Family Details Form',
      description: 'Family member information',
      required: false,
      fileTypes: ['pdf', 'doc', 'docx'],
      maxSize: '5MB'
    },
    {
      id: 'nomineeDetails',
      name: 'Nominee Details Form',
      description: 'Nominee information for benefits',
      required: true,
      fileTypes: ['pdf', 'doc', 'docx'],
      maxSize: '5MB'
    },
    {
      id: 'declarations',
      name: 'Declaration Forms',
      description: 'Various declarations and agreements',
      required: true,
      fileTypes: ['pdf', 'doc', 'docx'],
      maxSize: '5MB'
    },
    {
      id: 'backgroundVerification',
      name: 'Background Verification Consent',
      description: 'Consent for background verification',
      required: true,
      fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSize: '5MB'
    }
  ];

  // ==================== COMMUNICATION TEMPLATES ====================
  const communicationTemplates = [
    {
      id: 'welcomeEmail',
      name: 'Welcome Email',
      subject: 'Welcome to TechCorp - Your Journey Begins!',
      description: 'Initial welcome email with company introduction',
      trigger: 'Immediately after offer acceptance'
    },
    {
      id: 'joiningInstructions',
      name: 'Joining Instructions',
      subject: 'Your Joining Instructions - TechCorp',
      description: 'Detailed joining instructions and next steps',
      trigger: '7 days before joining'
    },
    {
      id: 'firstDaySchedule',
      name: 'First Day Schedule',
      subject: 'Your First Day Schedule at TechCorp',
      description: 'Detailed schedule for the first day',
      trigger: '3 days before joining'
    },
    {
      id: 'officeDetails',
      name: 'Office Location & Reporting Details',
      subject: 'Office Details - TechCorp',
      description: 'Office address, reporting time, and contact person',
      trigger: '5 days before joining'
    },
    {
      id: 'dressCode',
      name: 'Dress Code & Culture Guide',
      subject: 'Dress Code and Company Culture - TechCorp',
      description: 'Information about dress code and company culture',
      trigger: '5 days before joining'
    },
    {
      id: 'itAccess',
      name: 'IT Systems Access Information',
      subject: 'IT Access Instructions - TechCorp',
      description: 'Instructions for IT systems and credentials',
      trigger: '2 days before joining'
    },
    {
      id: 'parkingInfo',
      name: 'Parking & Facilities Information',
      subject: 'Office Facilities Information - TechCorp',
      description: 'Parking, cafeteria, and other facility details',
      trigger: '3 days before joining'
    },
    {
      id: 'teamIntroduction',
      name: 'Team Introduction Email',
      subject: 'Meet Your Team - TechCorp',
      description: 'Introduction to team members and manager',
      trigger: '1 day before joining'
    }
  ];

  // ==================== HELPER FUNCTIONS ====================
  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved': return <span className="badge bg-success">Approved</span>;
      case 'rejected': return <span className="badge bg-danger">Rejected</span>;
      case 'submitted': return <span className="badge bg-info">Submitted</span>;
      default: return <span className="badge bg-secondary">Pending</span>;
    }
  };

  const getOverallStatusBadge = (status) => {
    switch(status) {
      case 'pending_documents': return <span className="badge bg-warning">Pending Documents</span>;
      case 'documents_review': return <span className="badge bg-info">Under Review</span>;
      case 'completed': return <span className="badge bg-success">Completed</span>;
      case 'documents_pending': return <span className="badge bg-secondary">Documents Pending</span>;
      default: return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  const getCompletionPercentage = (candidate) => {
    if (!candidate?.documents) return 0;
    const requiredDocs = documentChecklist.filter(doc => doc.required);
    const submitted = requiredDocs.filter(doc => 
      candidate.documents[doc.id]?.submitted
    ).length;
    return Math.round((submitted / requiredDocs.length) * 100);
  };

  const getFormCompletionPercentage = (candidate) => {
    if (!candidate?.forms) return 0;
    const completed = Object.values(candidate.forms).filter(form => form.completed).length;
    return Math.round((completed / Object.keys(candidate.forms).length) * 100);
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchTerm === '' || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || candidate.department === filterDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const stats = {
    total: candidates.length,
    pending: candidates.filter(c => c.status === 'pending_documents').length,
    inReview: candidates.filter(c => c.status === 'documents_review').length,
    completed: candidates.filter(c => c.status === 'completed').length,
    formsCompleted: candidates.reduce((total, c) => {
      return total + Object.values(c.forms).filter(form => form.completed).length;
    }, 0),
    documentsSubmitted: candidates.reduce((total, c) => {
      return total + Object.values(c.documents).filter(doc => doc.submitted).length;
    }, 0)
  };

  // ==================== EVENT HANDLERS ====================
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedCandidate || !selectedForm) return;

    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === selectedCandidate.id) {
        const updatedForms = {
          ...candidate.forms,
          [selectedForm]: { 
            completed: true, 
            lastUpdated: new Date().toISOString().split('T')[0] 
          }
        };

        const updatedFormData = {
          ...candidate.formData,
          [selectedForm]: formData
        };

        return {
          ...candidate,
          forms: updatedForms,
          formData: updatedFormData
        };
      }
      return candidate;
    }));

    setShowFormModal(false);
    setSelectedForm('');
    setFormData({});
    alert(`Form submitted successfully for ${selectedCandidate.name}`);
  };

  const handleDocumentAction = (candidateId, documentId, action, reason = '') => {
    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        const updatedDocuments = {
          ...candidate.documents,
          [documentId]: {
            ...candidate.documents[documentId],
            status: action,
            reviewedBy: userInfo.name,
            reviewedDate: new Date().toISOString().split('T')[0],
            ...(action === 'rejected' && reason ? { rejectionReason: reason } : {})
          }
        };

        // Check if all required documents are approved
        const requiredDocs = documentChecklist.filter(doc => doc.required);
        const allRequiredApproved = requiredDocs.every(doc => 
          updatedDocuments[doc.id]?.status === 'approved'
        );

        let newStatus = candidate.status;
        if (allRequiredApproved) {
          newStatus = 'completed';
        } else if (action === 'submitted' || action === 'rejected') {
          newStatus = 'documents_review';
        }

        return {
          ...candidate,
          documents: updatedDocuments,
          status: newStatus
        };
      }
      return candidate;
    }));

    alert(`Document ${action} successfully!`);
  };

  const handleSendCommunication = (candidateId, communicationId) => {
    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        const updatedCommunications = {
          ...candidate.communications,
          [communicationId]: {
            sent: true,
            date: new Date().toISOString().split('T')[0],
            sentBy: userInfo.name,
            opened: false
          }
        };

        return {
          ...candidate,
          communications: updatedCommunications
        };
      }
      return candidate;
    }));

    alert(`Communication sent to ${candidates.find(c => c.id === candidateId)?.name}`);
  };

  const handleUploadDocument = () => {
    if (!uploadDocument.file || !uploadDocument.documentType || !uploadDocument.candidateId) {
      alert('Please select a file and document type');
      return;
    }

    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === uploadDocument.candidateId) {
        const updatedDocuments = {
          ...candidate.documents,
          [uploadDocument.documentType]: {
            status: 'submitted',
            submitted: true,
            date: new Date().toISOString().split('T')[0],
            fileName: uploadDocument.fileName || uploadDocument.file.name,
            fileType: uploadDocument.file.type,
            fileSize: `${(uploadDocument.file.size / 1024 / 1024).toFixed(2)} MB`,
            comments: uploadDocument.comments,
            uploadedBy: 'Candidate',
            files: [...(candidate.documents[uploadDocument.documentType]?.files || []), {
              name: uploadDocument.file.name,
              type: uploadDocument.file.type,
              size: uploadDocument.file.size,
              uploadDate: new Date().toISOString()
            }]
          }
        };

        let newStatus = candidate.status;
        if (candidate.status === 'pending_documents') {
          newStatus = 'documents_review';
        }

        return {
          ...candidate,
          documents: updatedDocuments,
          status: newStatus
        };
      }
      return candidate;
    }));

    setUploadDocument({
      candidateId: null,
      documentType: '',
      file: null,
      comments: '',
      fileName: ''
    });
    setShowUploadModal(false);
    alert('Document uploaded successfully!');
  };

  const handleSendReminder = () => {
    if (!reminderData.candidateId || 
        (reminderData.type === 'document' && !reminderData.documentType) ||
        (reminderData.type === 'communication' && !reminderData.communicationType)) {
      alert('Please fill all required fields');
      return;
    }

    const newReminder = {
      id: Date.now(),
      type: reminderData.type,
      documentType: reminderData.documentType,
      communicationType: reminderData.communicationType,
      sentDate: reminderData.date || new Date().toISOString().split('T')[0],
      message: reminderData.message || 'Reminder sent',
      status: 'sent',
      sentBy: userInfo.name
    };

    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === reminderData.candidateId) {
        return {
          ...candidate,
          reminders: [...candidate.reminders, newReminder]
        };
      }
      return candidate;
    }));

    setReminderData({
      candidateId: null,
      type: 'document',
      documentType: '',
      communicationType: '',
      date: '',
      message: ''
    });
    setShowReminderModal(false);
    alert('Reminder sent successfully!');
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    
    if (!newCandidate.name || !newCandidate.email || !newCandidate.joiningDate) {
      alert('Please fill all required fields');
      return;
    }

    const newCandidateObj = {
      id: candidates.length + 1,
      ...newCandidate,
      phone: newCandidate.phone || '+1 (555) 000-0000',
      offerLetterDate: new Date().toISOString().split('T')[0],
      status: 'pending_documents',
      forms: {
        personalInfo: { completed: false, lastUpdated: null },
        emergencyContact: { completed: false, lastUpdated: null },
        educationalDetails: { completed: false, lastUpdated: null },
        previousEmployment: { completed: false, lastUpdated: null },
        bankDetails: { completed: false, lastUpdated: null },
        statutoryInfo: { completed: false, lastUpdated: null },
        familyDetails: { completed: false, lastUpdated: null },
        nomineeDetails: { completed: false, lastUpdated: null },
        declarations: { completed: false, lastUpdated: null },
        backgroundVerification: { completed: false, lastUpdated: null }
      },
      formData: {},
      documents: {
        personalInfo: { status: 'pending', submitted: false, files: [], required: true },
        emergencyContact: { status: 'pending', submitted: false, files: [], required: true },
        educationalDetails: { status: 'pending', submitted: false, files: [], required: true },
        previousEmployment: { status: 'pending', submitted: false, files: [], required: true },
        bankDetails: { status: 'pending', submitted: false, files: [], required: true },
        statutoryInfo: { status: 'pending', submitted: false, files: [], required: true },
        familyDetails: { status: 'pending', submitted: false, files: [], required: false },
        nomineeDetails: { status: 'pending', submitted: false, files: [], required: true },
        declarations: { status: 'pending', submitted: false, files: [], required: true },
        backgroundVerification: { status: 'pending', submitted: false, files: [], required: true }
      },
      communications: {
        welcomeEmail: { sent: false, date: null, opened: false },
        joiningInstructions: { sent: false, date: null, opened: false },
        firstDaySchedule: { sent: false, date: null, opened: false },
        officeDetails: { sent: false, date: null, opened: false },
        dressCodeGuide: { sent: false, date: null, opened: false },
        itAccessInfo: { sent: false, date: null, opened: false },
        parkingInfo: { sent: false, date: null, opened: false },
        teamIntroduction: { sent: false, date: null, opened: false }
      },
      reminders: []
    };

    setCandidates([...candidates, newCandidateObj]);
    setNewCandidate({
      name: '',
      email: '',
      phone: '',
      jobTitle: '',
      department: 'Engineering',
      joiningDate: '',
      managerName: '',
      hrContactName: '',
      hrContactPhone: ''
    });
    setShowAddCandidateModal(false);
    alert('Candidate added successfully!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadDocument(prev => ({ 
        ...prev, 
        file,
        fileName: file.name
      }));
    }
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterDepartment('all');
    alert('Filters cleared!');
  };

  // ==================== MODAL COMPONENTS ====================

  const AddCandidateModal = () => (
    <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Add New Candidate</h5>
            <button className="btn-close" onClick={() => setShowAddCandidateModal(false)}></button>
          </div>
          
          <form onSubmit={handleAddCandidate}>
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={newCandidate.email}
                  onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={newCandidate.phone}
                  onChange={(e) => setNewCandidate({...newCandidate, phone: e.target.value})}
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCandidate.jobTitle}
                  onChange={(e) => setNewCandidate({...newCandidate, jobTitle: e.target.value})}
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  value={newCandidate.department}
                  onChange={(e) => setNewCandidate({...newCandidate, department: e.target.value})}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Joining Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={newCandidate.joiningDate}
                  onChange={(e) => setNewCandidate({...newCandidate, joiningDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Manager Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCandidate.managerName}
                  onChange={(e) => setNewCandidate({...newCandidate, managerName: e.target.value})}
                />
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAddCandidateModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const ChecklistModal = () => (
    <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Document Checklist</h5>
            <button className="btn-close" onClick={() => setShowChecklistModal(false)}></button>
          </div>
          
          <div className="modal-body pt-0">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Description</th>
                    <th>Required</th>
                    <th>File Types</th>
                    <th>Max Size</th>
                  </tr>
                </thead>
                <tbody>
                  {documentChecklist.map(doc => (
                    <tr key={doc.id}>
                      <td>{doc.name}</td>
                      <td>{doc.description}</td>
                      <td>
                        {doc.required ? 
                          <span className="badge bg-danger">Required</span> : 
                          <span className="badge bg-secondary">Optional</span>
                        }
                      </td>
                      <td>{doc.fileTypes.join(', ').toUpperCase()}</td>
                      <td>{doc.maxSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={() => setShowChecklistModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TemplatesModal = () => (
    <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Communication Templates</h5>
            <button className="btn-close" onClick={() => setShowTemplatesModal(false)}></button>
          </div>
          
          <div className="modal-body pt-0">
            <div className="row g-3">
              {communicationTemplates.map(template => (
                <div key={template.id} className="col-12 col-md-6">
                  <div className="card border h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title mb-0">{template.name}</h6>
                        <span className="badge bg-info">Template</span>
                      </div>
                      <p className="card-text small text-muted mb-2">{template.description}</p>
                      <div className="mb-2">
                        <small className="text-muted d-block mb-1">Subject:</small>
                        <small className="fw-medium">{template.subject}</small>
                      </div>
                      <div>
                        <small className="text-muted d-block mb-1">Trigger:</small>
                        <small className="text-success">{template.trigger}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={() => setShowTemplatesModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FormModal = () => {
    const formFields = {
      personalInfo: [
        { id: 'fullName', label: 'Full Name', type: 'text', required: true },
        { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
        { id: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true }
      ],
      emergencyContact: [
        { id: 'primaryName', label: 'Primary Contact Name', type: 'text', required: true },
        { id: 'primaryRelationship', label: 'Relationship', type: 'text', required: true },
        { id: 'primaryPhone', label: 'Primary Phone', type: 'tel', required: true }
      ]
    };

    const fields = formFields[selectedForm] || [];

    return (
      <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                {selectedForm ? selectedForm.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : 'Form'} - {selectedCandidate?.name}
              </h5>
              <button className="btn-close" onClick={() => setShowFormModal(false)}></button>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body pt-0">
                {fields.map(field => (
                  <div className="mb-3" key={field.id}>
                    <label className="form-label">
                      {field.label} {field.required && <span className="text-danger">*</span>}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select
                        className="form-select"
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                        required={field.required}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="form-control"
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
                
                {fields.length === 0 && (
                  <div className="alert alert-info">
                    This form is under development. In a real application, you would see all form fields here.
                  </div>
                )}
              </div>
              
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowFormModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const DocumentDetailsModal = () => {
    const completionPercentage = getCompletionPercentage(selectedCandidate);
    const docConfig = documentChecklist.find(doc => doc.id === selectedForm);

    return (
      <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Document Management - {selectedCandidate?.name}</h5>
              <button className="btn-close" onClick={() => setShowDocumentModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <div className="position-relative" style={{ width: '80px', height: '80px' }}>
                            <div className="position-absolute w-100 h-100">
                              <svg width="80" height="80" viewBox="0 0 36 36">
                                <path className="circle-bg"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#eee"
                                  strokeWidth="3"
                                />
                                <path className="circle"
                                  stroke={completionPercentage === 100 ? '#198754' : 
                                         completionPercentage > 50 ? '#0dcaf0' : '#ffc107'}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  fill="none"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  strokeDasharray={`${completionPercentage}, 100`}
                                />
                              </svg>
                            </div>
                            <div className="position-absolute top-50 start-50 translate-middle text-center">
                              <span className="fw-bold">{completionPercentage}%</span>
                            </div>
                          </div>
                          <div>
                            <div className="fw-medium">{completionPercentage}% Complete</div>
                            <div className="text-muted small">
                              {Object.values(selectedCandidate?.documents || {}).filter(d => d.submitted).length} documents submitted
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="fw-bold mb-3">Document Checklist</h6>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th width="100">Status</th>
                      <th width="120">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentChecklist.map(doc => {
                      const docStatus = selectedCandidate?.documents[doc.id];
                      return (
                        <tr key={doc.id}>
                          <td>
                            <div>
                              <div className="fw-medium">{doc.name}</div>
                              <small className="text-muted">{doc.description}</small>
                            </div>
                          </td>
                          <td>{getStatusBadge(docStatus?.status || 'pending')}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              {docStatus?.submitted ? (
                                <>
                                  {docStatus.status === 'submitted' && (
                                    <>
                                      <button
                                        className="btn btn-outline-success"
                                        onClick={() => handleDocumentAction(selectedCandidate.id, doc.id, 'approved')}
                                      >
                                        Approve
                                      </button>
                                      <button
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                          const reason = prompt('Enter rejection reason:');
                                          if (reason) {
                                            handleDocumentAction(selectedCandidate.id, doc.id, 'rejected', reason);
                                          }
                                        }}
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  <button className="btn btn-outline-primary" disabled>
                                    View
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                      setUploadDocument({
                                        candidateId: selectedCandidate.id,
                                        documentType: doc.id,
                                        file: null,
                                        comments: '',
                                        fileName: ''
                                      });
                                      setShowUploadModal(true);
                                    }}
                                  >
                                    Upload
                                  </button>
                                  <button
                                    className="btn btn-outline-info"
                                    onClick={() => {
                                      setSelectedForm(doc.id);
                                      setFormData(selectedCandidate?.formData[doc.id] || {});
                                      setShowFormModal(true);
                                    }}
                                  >
                                    Fill Form
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-secondary" onClick={() => setShowDocumentModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CommunicationModal = () => (
    <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Pre-Joining Communications - {selectedCandidate?.name}</h5>
            <button className="btn-close" onClick={() => setShowCommunicationModal(false)}></button>
          </div>
          
          <div className="modal-body pt-0">
            <div className="alert alert-info mb-4">
              <div className="d-flex align-items-center gap-2">
                📧
                <span>Email: <strong>{selectedCandidate?.email}</strong> | Phone: <strong>{selectedCandidate?.phone}</strong></span>
              </div>
            </div>

            <h6 className="fw-bold mb-3">Communication Status</h6>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Communication</th>
                    <th width="100">Status</th>
                    <th width="120">Sent Date</th>
                    <th width="150">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {communicationTemplates.map(template => {
                    const commStatus = selectedCandidate?.communications[template.id];
                    return (
                      <tr key={template.id}>
                        <td>
                          <div>
                            <div className="fw-medium">{template.name}</div>
                            <small className="text-muted">{template.description}</small>
                          </div>
                        </td>
                        <td>
                          {commStatus?.sent ? (
                            <span className="badge bg-success">Sent</span>
                          ) : (
                            <span className="badge bg-secondary">Pending</span>
                          )}
                        </td>
                        <td>{commStatus?.date || '-'}</td>
                        <td>
                          {!commStatus?.sent ? (
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleSendCommunication(selectedCandidate.id, template.id)}
                            >
                              Send Now
                            </button>
                          ) : (
                            <button 
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleSendCommunication(selectedCandidate.id, template.id)}
                            >
                              Resend
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={() => setShowCommunicationModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UploadDocumentModal = () => (
    <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Upload Document</h5>
            <button className="btn-close" onClick={() => setShowUploadModal(false)}></button>
          </div>
          
          <div className="modal-body pt-0">
            <div className="mb-3">
              <label className="form-label">Document Type</label>
              <select 
                className="form-select"
                value={uploadDocument.documentType}
                onChange={(e) => setUploadDocument({...uploadDocument, documentType: e.target.value})}
              >
                <option value="">Select document type</option>
                {documentChecklist.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Upload File</label>
              <input 
                type="file" 
                className="form-control"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              {uploadDocument.file && (
                <div className="mt-2">
                  <small className="text-muted">Selected: {uploadDocument.file.name}</small>
                </div>
              )}
            </div>
            
            <div className="mb-3">
              <label className="form-label">Comments (Optional)</label>
              <textarea 
                className="form-control" 
                rows="3"
                value={uploadDocument.comments}
                onChange={(e) => setUploadDocument({...uploadDocument, comments: e.target.value})}
                placeholder="Add any comments..."
              ></textarea>
            </div>
          </div>
          
          <div className="modal-footer border-0">
            <button className="btn btn-outline-secondary" onClick={() => setShowUploadModal(false)}>
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleUploadDocument}
              disabled={!uploadDocument.file || !uploadDocument.documentType}
            >
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CandidateDetailsModal = () => {
    const docCompletion = getCompletionPercentage(selectedCandidate);
    const formCompletion = getFormCompletionPercentage(selectedCandidate);
    
    return (
      <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Candidate Overview - {selectedCandidate?.name}</h5>
              <button className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="row mb-4">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-12">
                      <h6 className="text-muted mb-2">Candidate Information</h6>
                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <div className="fw-medium small">Full Name</div>
                          <div className="fw-bold">{selectedCandidate?.name}</div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="fw-medium small">Email Address</div>
                          <div className="fw-bold">{selectedCandidate?.email}</div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="fw-medium small">Phone Number</div>
                          <div className="fw-bold">{selectedCandidate?.phone}</div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="fw-medium small">Job Title</div>
                          <div className="fw-bold">{selectedCandidate?.jobTitle}</div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="fw-medium small">Department</div>
                          <div className="fw-bold">{selectedCandidate?.department}</div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="fw-medium small">Joining Date</div>
                          <div className="fw-bold">{selectedCandidate?.joiningDate}</div>
                        </div>
                        <div className="col-md-6 mb-2">
                          <div className="fw-medium small">Overall Status</div>
                          <div className="fw-bold">{getOverallStatusBadge(selectedCandidate?.status)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <h6 className="text-muted mb-2">Progress Summary</h6>
                      <div className="row">
                        <div className="col-6 col-md-3">
                          <div className="card border">
                            <div className="card-body text-center p-2">
                              <div className="text-muted small">Forms</div>
                              <div className="fw-bold">{formCompletion}%</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="card border">
                            <div className="card-body text-center p-2">
                              <div className="text-muted small">Documents</div>
                              <div className="fw-bold">{docCompletion}%</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="card border">
                            <div className="card-body text-center p-2">
                              <div className="text-muted small">Communications</div>
                              <div className="fw-bold">
                                {Object.values(selectedCandidate?.communications || {}).filter(c => c.sent).length}/{communicationTemplates.length}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="card border">
                            <div className="card-body text-center p-2">
                              <div className="text-muted small">Days to Join</div>
                              <div className="fw-bold">
                                {selectedCandidate?.joiningDate ? 
                                  Math.ceil((new Date(selectedCandidate.joiningDate) - new Date()) / (1000 * 60 * 60 * 24)) : 
                                  'N/A'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card border h-100">
                    <div className="card-body">
                      <h6 className="text-muted mb-3">Quick Actions</h6>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setShowDetailsModal(false);
                            setShowDocumentModal(true);
                          }}
                        >
                          📋 Manage Documents
                        </button>
                        <button
                          className="btn btn-outline-info"
                          onClick={() => {
                            setShowDetailsModal(false);
                            setShowCommunicationModal(true);
                          }}
                        >
                          📧 Manage Communications
                        </button>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => {
                            setShowDetailsModal(false);
                            setUploadDocument({
                              candidateId: selectedCandidate.id,
                              documentType: '',
                              file: null,
                              comments: '',
                              fileName: ''
                            });
                            setShowUploadModal(true);
                          }}
                        >
                          📎 Upload Document
                        </button>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => {
                            setShowDetailsModal(false);
                            setReminderData({
                              candidateId: selectedCandidate.id,
                              type: 'document',
                              documentType: '',
                              communicationType: '',
                              date: '',
                              message: ''
                            });
                            setShowReminderModal(true);
                          }}
                        >
                          🔔 Send Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReminderModal = () => (
    <div className="modal show d-block fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Send Reminder</h5>
            <button className="btn-close" onClick={() => setShowReminderModal(false)}></button>
          </div>
          
          <div className="modal-body pt-0">
            <div className="mb-3">
              <label className="form-label">Reminder Type</label>
              <select 
                className="form-select"
                value={reminderData.type}
                onChange={(e) => setReminderData({...reminderData, type: e.target.value})}
              >
                <option value="document">Document Reminder</option>
                <option value="communication">Communication Reminder</option>
              </select>
            </div>
            
            {reminderData.type === 'document' ? (
              <div className="mb-3">
                <label className="form-label">Document Type</label>
                <select 
                  className="form-select"
                  value={reminderData.documentType}
                  onChange={(e) => setReminderData({...reminderData, documentType: e.target.value})}
                >
                  <option value="">Select document</option>
                  {documentChecklist.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="mb-3">
                <label className="form-label">Communication Type</label>
                <select 
                  className="form-select"
                  value={reminderData.communicationType}
                  onChange={(e) => setReminderData({...reminderData, communicationType: e.target.value})}
                >
                  <option value="">Select communication</option>
                  {communicationTemplates.map(comm => (
                    <option key={comm.id} value={comm.id}>{comm.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="mb-3">
              <label className="form-label">Reminder Message</label>
              <textarea 
                className="form-control" 
                rows="3"
                value={reminderData.message}
                onChange={(e) => setReminderData({...reminderData, message: e.target.value})}
                placeholder="Enter reminder message..."
              ></textarea>
            </div>
          </div>
          
          <div className="modal-footer border-0">
            <button className="btn btn-outline-secondary" onClick={() => setShowReminderModal(false)}>
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleSendReminder}
              disabled={!reminderData.type || 
                (reminderData.type === 'document' && !reminderData.documentType) ||
                (reminderData.type === 'communication' && !reminderData.communicationType)}
            >
              Send Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== MAIN COMPONENT RENDER ====================
  return (
    <div 
      menuItems={menuItems} 
      userInfo={userInfo}
      appName="Pre-Joining Engagement"
    >
      <div className="container-fluid px-3 px-md-4 py-3">

        {/* ==================== HEADER ==================== */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h5 className="fw-bold mb-1">Pre-Joining Engagement</h5>
            <p className="text-muted mb-0">Manage candidate forms, documents, and communications before joining</p>
          </div>

          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-primary d-flex align-items-center gap-2"
              onClick={() => setShowChecklistModal(true)}
            >
              📋 Checklist
            </button>
            <button 
              className="btn btn-outline-info d-flex align-items-center gap-2"
              onClick={() => setShowTemplatesModal(true)}
            >
              📧 Templates
            </button>
            <button 
              className="btn btn-outline-warning d-flex align-items-center gap-2"
              onClick={() => {
                if (filteredCandidates.length > 0) {
                  setReminderData({
                    candidateId: filteredCandidates[0].id,
                    type: 'document',
                    documentType: '',
                    communicationType: '',
                    date: '',
                    message: ''
                  });
                  setShowReminderModal(true);
                } else {
                  alert('No candidates available to send reminders');
                }
              }}
            >
              🔔 Reminders
            </button>
            <button 
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={() => setShowAddCandidateModal(true)}
            >
              ➕ Add Candidate
            </button>
          </div>
        </div>

        {/* ==================== STATISTICS ==================== */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-4 col-lg-2">
            <div className="card border h-100">
              <div className="card-body text-center p-2 p-md-3">
                <h6 className="text-muted mb-1 mb-md-2 small">Total Candidates</h6>
                <h4 className="fw-bold mb-0">{stats.total}</h4>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="card border h-100">
              <div className="card-body text-center p-2 p-md-3">
                <h6 className="text-muted mb-1 mb-md-2 small">Forms Completed</h6>
                <h4 className="fw-bold text-primary mb-0">{stats.formsCompleted}</h4>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="card border h-100">
              <div className="card-body text-center p-2 p-md-3">
                <h6 className="text-muted mb-1 mb-md-2 small">Documents</h6>
                <h4 className="fw-bold text-info mb-0">{stats.documentsSubmitted}</h4>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="card border h-100">
              <div className="card-body text-center p-2 p-md-3">
                <h6 className="text-muted mb-1 mb-md-2 small">Under Review</h6>
                <h4 className="fw-bold text-warning mb-0">{stats.inReview}</h4>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="card border h-100">
              <div className="card-body text-center p-2 p-md-3">
                <h6 className="text-muted mb-1 mb-md-2 small">Completed</h6>
                <h4 className="fw-bold text-success mb-0">{stats.completed}</h4>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <div className="card border h-100">
              <div className="card-body text-center p-2 p-md-3">
                <h6 className="text-muted mb-1 mb-md-2 small">Pending</h6>
                <h4 className="fw-bold text-danger mb-0">{stats.pending}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== FILTER BAR ==================== */}
        <div className="card border mb-4">
          <div className="card-body p-3">
            <div className="row g-2 g-md-3">
              <div className="col-12 col-md-4 mb-2 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    className="form-control border-start-0 ps-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-6 col-md-3 mb-2 mb-md-0">
                <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="pending_documents">Pending Documents</option>
                  <option value="documents_review">Under Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="col-6 col-md-3 mb-2 mb-md-0">
                <select className="form-select" value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
                  <option value="all">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div className="col-12 col-md-2">
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={handleRefresh}
                >
                  🔄 Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CANDIDATES TABLE ==================== */}
        <div className="card border">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-3 ps-md-4 py-3 border-0">Candidate</th>
                    <th className="py-3 border-0 d-none d-md-table-cell">Position</th>
                    <th className="py-3 border-0">Forms</th>
                    <th className="py-3 border-0">Documents</th>
                    <th className="py-3 border-0 d-none d-md-table-cell">Status</th>
                    <th className="pe-3 pe-md-4 py-3 border-0 text-end">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCandidates.map((candidate) => {
                    const docCompletion = getCompletionPercentage(candidate);
                    const formCompletion = getFormCompletionPercentage(candidate);
                    
                    return (
                      <tr key={candidate.id} className="border-top">
                        <td className="ps-3 ps-md-4 py-3">
                          <div className="d-flex align-items-center gap-2 gap-md-3">
                            <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary"
                              style={{ width: '36px', height: '36px', color: 'white' }}>
                              👤
                            </div>
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <strong className="d-block small">{candidate.name}</strong>
                              </div>
                              <small className="text-muted d-block">
                                {candidate.email}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 d-none d-md-table-cell">
                          <div>
                            <div className="fw-medium">{candidate.jobTitle}</div>
                            <small className="text-muted">{candidate.department}</small>
                          </div>
                        </td>

                        <td className="py-3">
                          <div className="d-flex align-items-center gap-2">
                            <div className="position-relative" style={{ width: '40px', height: '40px' }}>
                              <svg width="40" height="40" viewBox="0 0 36 36">
                                <path className="circle-bg"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#eee"
                                  strokeWidth="3"
                                />
                                <path className="circle"
                                  stroke={formCompletion === 100 ? '#198754' : 
                                         formCompletion > 50 ? '#0dcaf0' : '#ffc107'}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  fill="none"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  strokeDasharray={`${formCompletion}, 100`}
                                />
                              </svg>
                              <div className="position-absolute top-50 start-50 translate-middle text-center">
                                <span className="fw-bold small">{formCompletion}%</span>
                              </div>
                            </div>
                            <div>
                              <small className="text-muted">Forms</small>
                            </div>
                          </div>
                        </td>

                        <td className="py-3">
                          <div className="d-flex align-items-center gap-2">
                            <div className="position-relative" style={{ width: '40px', height: '40px' }}>
                              <svg width="40" height="40" viewBox="0 0 36 36">
                                <path className="circle-bg"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#eee"
                                  strokeWidth="3"
                                />
                                <path className="circle"
                                  stroke={docCompletion === 100 ? '#198754' : 
                                         docCompletion > 50 ? '#0dcaf0' : '#ffc107'}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  fill="none"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  strokeDasharray={`${docCompletion}, 100`}
                                />
                              </svg>
                              <div className="position-absolute top-50 start-50 translate-middle text-center">
                                <span className="fw-bold small">{docCompletion}%</span>
                              </div>
                            </div>
                            <div>
                              <small className="text-muted">Docs</small>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 d-none d-md-table-cell">
                          {getOverallStatusBadge(candidate.status)}
                        </td>

                        <td className="pe-3 pe-md-4 py-3 text-end">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => {
                                setSelectedCandidate(candidate);
                                setShowDetailsModal(true);
                              }}
                              title="View Details"
                            >
                              👁️
                            </button>

                            <button
                              className="btn btn-outline-info btn-sm"
                              onClick={() => {
                                setSelectedCandidate(candidate);
                                setShowDocumentModal(true);
                              }}
                              title="Documents"
                            >
                              📋
                            </button>

                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => {
                                setSelectedCandidate(candidate);
                                setShowCommunicationModal(true);
                              }}
                              title="Communications"
                            >
                              📧
                            </button>

                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() => {
                                setSelectedCandidate(candidate);
                                setUploadDocument({
                                  candidateId: candidate.id,
                                  documentType: '',
                                  file: null,
                                  comments: '',
                                  fileName: ''
                                });
                                setShowUploadModal(true);
                              }}
                              title="Upload"
                            >
                              📎
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="py-5">
                          📝
                          <h6 className="text-muted">No candidates found</h6>
                          <p className="text-muted mb-0 small">Try adjusting your search filters or add a new candidate</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer bg-transparent border-0 px-3 px-md-4 py-3">
            <div className="text-muted small">
              Showing {filteredCandidates.length} of {candidates.length} candidates
            </div>
          </div>
        </div>

        {/* ==================== MODALS ==================== */}
        {showAddCandidateModal && <AddCandidateModal />}
        {showChecklistModal && <ChecklistModal />}
        {showTemplatesModal && <TemplatesModal />}
        {showFormModal && <FormModal />}
        {showDocumentModal && selectedCandidate && <DocumentDetailsModal />}
        {showCommunicationModal && selectedCandidate && <CommunicationModal />}
        {showUploadModal && <UploadDocumentModal />}
        {showDetailsModal && selectedCandidate && <CandidateDetailsModal />}
        {showReminderModal && <ReminderModal />}

      </div>
    </div>
  );
};

export default PreJoiningEngagement;