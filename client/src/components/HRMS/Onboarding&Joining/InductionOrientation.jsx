import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const InductionOrientation = () => {
  // ==================== MENU ITEMS ====================
  const menuItems = [
    { title: 'Dashboard', link: '/recruiter/dashboard', active: false },
    { title: 'Job Openings', link: '/recruiter/jobs', active: false },
    { title: 'Candidates', link: '/recruiter/candidates' },
    { title: 'Interviews', link: '/recruiter/interviews' },
    { title: 'Pre-Joining', link: '/recruiter/pre-joining' },
    { title: 'Onboarding', link: '/recruiter/onboarding', active: true },
    { title: 'Reports', link: '/recruiter/reports' }
  ];

  const userInfo = {
    name: 'Sarah Johnson',
    role: 'HR Head',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  };

  // ==================== INITIAL DATA ====================
  const initialPrograms = [
    {
      id: 1,
      name: 'Q1 2024 New Hire Orientation',
      description: 'Comprehensive onboarding for Q1 2024 hires',
      type: 'batch',
      status: 'upcoming',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      duration: '5 days',
      location: 'Main Auditorium',
      meetingLink: '',
      totalSessions: 12,
      completedSessions: 0,
      totalParticipants: 25,
      confirmedParticipants: 22,
      attendanceRate: 0,
      overallRating: 0,
      schedule: [
        {
          id: 1,
          title: 'Welcome & Company Overview',
          date: '2024-04-01',
          startTime: '09:00',
          endTime: '10:30',
          agenda: 'Introduction to company culture, values, and history',
          trainer: 'John Doe',
          meetingLink: 'https://zoom.us/j/123456789',
          venue: 'Main Auditorium',
          isVirtual: false,
          materials: ['Company Handbook.pdf', 'Welcome Package.zip']
        }
      ],
      participants: [],
      trainers: [],
      materials: [
        { id: 1, name: 'Company Handbook.pdf', type: 'document', uploadedDate: '2024-03-28' },
        { id: 2, name: 'Welcome Package.zip', type: 'archive', uploadedDate: '2024-03-28' }
      ],
      feedback: [],
      certificates: []
    },
    {
      id: 2,
      name: 'March 2024 Individual Onboarding',
      description: 'Individual onboarding for March hires',
      type: 'individual',
      status: 'ongoing',
      startDate: '2024-03-25',
      endDate: '2024-03-29',
      duration: '5 days',
      location: 'Virtual',
      totalSessions: 8,
      completedSessions: 3,
      totalParticipants: 1,
      confirmedParticipants: 1,
      attendanceRate: 100,
      overallRating: 4.8,
      schedule: [],
      participants: [],
      trainers: [],
      materials: [],
      feedback: [],
      certificates: []
    }
  ];

  const initialPolicies = [
    {
      id: 1,
      name: 'Employee Code of Conduct',
      category: 'general',
      description: 'Standards of behavior expected from all employees',
      version: '3.2',
      effectiveDate: '2024-01-01',
      readTime: '15 minutes',
      status: 'published',
      acknowledgments: 145,
      lastAcknowledged: '2024-03-20',
      required: true,
      content: 'Full policy content here...',
      modules: [
        { id: 1, title: 'Introduction', content: 'Introduction to code of conduct...', read: false },
        { id: 2, title: 'Professional Behavior', content: 'Standards for professional behavior...', read: false },
        { id: 3, title: 'Ethical Guidelines', content: 'Ethical guidelines and principles...', read: false }
      ],
      quiz: [
        {
          id: 1,
          question: 'What is the primary purpose of the Code of Conduct?',
          options: ['To restrict employees', 'To guide ethical behavior', 'To enforce rules', 'To limit creativity'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Who should you report violations to?',
          options: ['HR Department', 'Your Manager', 'Compliance Officer', 'All of the above'],
          correctAnswer: 3
        }
      ],
      passingScore: 70,
      documents: ['Code_of_Conduct_v3.2.pdf'],
      completionTracking: {
        totalEmployees: 150,
        completed: 145,
        pending: 5,
        averageScore: 85.5
      }
    },
    {
      id: 2,
      name: 'POSH Policy',
      category: 'compliance',
      description: 'Prevention of Sexual Harassment at Workplace',
      version: '2.1',
      effectiveDate: '2024-01-15',
      readTime: '20 minutes',
      status: 'mandatory',
      acknowledgments: 150,
      lastAcknowledged: '2024-03-22',
      required: true,
      content: 'Full POSH policy content...',
      modules: [
        { id: 1, title: 'Definition & Scope', content: 'Definition of sexual harassment...', read: false },
        { id: 2, title: 'Prevention Measures', content: 'Measures to prevent harassment...', read: false },
        { id: 3, title: 'Complaint Procedure', content: 'How to file complaints...', read: false }
      ],
      quiz: [
        {
          id: 1,
          question: 'What constitutes sexual harassment?',
          options: ['Physical advances', 'Verbal comments', 'Non-verbal gestures', 'All of the above'],
          correctAnswer: 3
        }
      ],
      passingScore: 80,
      documents: ['POSH_Policy_v2.1.pdf'],
      completionTracking: {
        totalEmployees: 150,
        completed: 150,
        pending: 0,
        averageScore: 92.3
      }
    },
    {
      id: 3,
      name: 'Data Privacy & Confidentiality Agreement',
      category: 'security',
      description: 'Data privacy and confidentiality requirements',
      version: '1.0',
      effectiveDate: '2024-02-01',
      readTime: '10 minutes',
      status: 'mandatory',
      acknowledgments: 148,
      lastAcknowledged: '2024-03-25',
      required: true,
      content: 'Full data privacy policy content...',
      modules: [
        { id: 1, title: 'Data Classification', content: 'Types of data and classification...', read: false },
        { id: 2, title: 'Confidentiality Obligations', content: 'Employee obligations...', read: false }
      ],
      quiz: [
        {
          id: 1,
          question: 'Can you share confidential data with external parties?',
          options: ['Yes, if needed', 'No, never without authorization', 'Only with friends', 'Sometimes'],
          correctAnswer: 1
        }
      ],
      passingScore: 75,
      documents: ['Data_Privacy_Policy_v1.0.pdf'],
      completionTracking: {
        totalEmployees: 150,
        completed: 148,
        pending: 2,
        averageScore: 88.7
      }
    }
  ];

  // ==================== STATE MANAGEMENT ====================
  const [inductionPrograms, setInductionPrograms] = useState(initialPrograms);
  const [policies, setPolicies] = useState(initialPolicies);
  const [loading, setLoading] = useState(false);
  const [showCreateProgram, setShowCreateProgram] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  
  // Enhanced states
  const [showTrainerAssignmentModal, setShowTrainerAssignmentModal] = useState(false);
  const [showBulkAttendanceModal, setShowBulkAttendanceModal] = useState(false);
  const [showPolicyUploadModal, setShowPolicyUploadModal] = useState(false);
  const [showMaterialDistributionModal, setShowMaterialDistributionModal] = useState(false);
  const [showVenueBookingModal, setShowVenueBookingModal] = useState(false);
  const [showSessionAgendaModal, setShowSessionAgendaModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showPolicyQuizModal, setShowPolicyQuizModal] = useState(false);
  const [showPolicyModuleModal, setShowPolicyModuleModal] = useState(false);
  
  const [policyCompletionData, setPolicyCompletionData] = useState({});
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [currentPolicyModule, setCurrentPolicyModule] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [feedbackData, setFeedbackData] = useState({});

  // Form states
  const [programForm, setProgramForm] = useState({
    name: '',
    description: '',
    type: 'batch',
    startDate: '',
    endDate: '',
    location: '',
    maxParticipants: 30
  });

  const [trainerAssignmentData, setTrainerAssignmentData] = useState({
    programId: null,
    sessionId: null,
    trainerName: '',
    trainerEmail: '',
    trainerRole: ''
  });

  const [sessionAgendaForm, setSessionAgendaForm] = useState({
    programId: null,
    sessionTitle: '',
    sessionDate: '',
    startTime: '',
    endTime: '',
    agenda: '',
    meetingLink: '',
    venue: '',
    isVirtual: false
  });

  const [materialForm, setMaterialForm] = useState({
    programId: null,
    materialName: '',
    materialType: 'document',
    file: null,
    description: ''
  });

  const [venueForm, setVenueForm] = useState({
    programId: null,
    venueName: '',
    address: '',
    capacity: '',
    bookingDate: '',
    startTime: '',
    endTime: '',
    amenities: []
  });

  // ==================== HANDLERS ====================
  const handleCreateProgram = () => {
    const newProgram = {
      id: inductionPrograms.length + 1,
      ...programForm,
      status: 'draft',
      duration: '5 days',
      totalSessions: 0,
      completedSessions: 0,
      totalParticipants: 0,
      confirmedParticipants: 0,
      attendanceRate: 0,
      overallRating: 0,
      schedule: [],
      participants: [],
      trainers: [],
      materials: [],
      feedback: [],
      certificates: []
    };

    setInductionPrograms([...inductionPrograms, newProgram]);
    setShowCreateProgram(false);
    setProgramForm({
      name: '',
      description: '',
      type: 'batch',
      startDate: '',
      endDate: '',
      location: '',
      maxParticipants: 30
    });
    alert('Induction program created successfully!');
  };

  const handleAssignTrainer = () => {
    const { programId, sessionId, trainerName } = trainerAssignmentData;
    
    if (!programId || !sessionId || !trainerName) {
      alert('Please fill all required fields');
      return;
    }

    alert(`Trainer ${trainerName} assigned successfully!`);
    setShowTrainerAssignmentModal(false);
    setTrainerAssignmentData({
      programId: null,
      sessionId: null,
      trainerName: ''
    });
  };

  const handleCompletePolicy = (policyId) => {
    setPolicyCompletionData(prev => ({
      ...prev,
      [policyId]: {
        completed: true,
        completionDate: new Date().toISOString().split('T')[0]
      }
    }));

    setPolicies(prev => prev.map(p => 
      p.id === policyId 
        ? { 
            ...p, 
            acknowledgments: p.acknowledgments + 1,
            lastAcknowledged: new Date().toISOString().split('T')[0],
            completionTracking: {
              ...p.completionTracking,
              completed: p.completionTracking.completed + 1,
              pending: p.completionTracking.pending - 1
            }
          }
        : p
    ));

    alert('Policy completed successfully!');
  };

  const handleCreateSession = () => {
    if (!sessionAgendaForm.programId || !sessionAgendaForm.sessionTitle) {
      alert('Please fill all required fields');
      return;
    }

    const newSession = {
      id: Date.now(),
      ...sessionAgendaForm,
      materials: []
    };

    setInductionPrograms(prev => prev.map(program => 
      program.id === sessionAgendaForm.programId
        ? {
            ...program,
            schedule: [...(program.schedule || []), newSession],
            totalSessions: (program.totalSessions || 0) + 1
          }
        : program
    ));

    setShowSessionAgendaModal(false);
    setSessionAgendaForm({
      programId: null,
      sessionTitle: '',
      sessionDate: '',
      startTime: '',
      endTime: '',
      agenda: '',
      meetingLink: '',
      venue: '',
      isVirtual: false
    });
    alert('Session created successfully!');
  };

  const handleDistributeMaterial = () => {
    if (!materialForm.programId || !materialForm.materialName) {
      alert('Please fill all required fields');
      return;
    }

    const newMaterial = {
      id: Date.now(),
      ...materialForm,
      uploadedDate: new Date().toISOString().split('T')[0]
    };

    setInductionPrograms(prev => prev.map(program => 
      program.id === materialForm.programId
        ? {
            ...program,
            materials: [...(program.materials || []), newMaterial]
          }
        : program
    ));

    setShowMaterialDistributionModal(false);
    setMaterialForm({
      programId: null,
      materialName: '',
      materialType: 'document',
      file: null,
      description: ''
    });
    alert('Material distributed successfully!');
  };

  const handleBookVenue = () => {
    if (!venueForm.programId || !venueForm.venueName || !venueForm.bookingDate) {
      alert('Please fill all required fields');
      return;
    }

    setInductionPrograms(prev => prev.map(program => 
      program.id === venueForm.programId
        ? {
            ...program,
            location: venueForm.venueName,
            venueDetails: venueForm
          }
        : program
    ));

    setShowVenueBookingModal(false);
    setVenueForm({
      programId: null,
      venueName: '',
      address: '',
      capacity: '',
      bookingDate: '',
      startTime: '',
      endTime: '',
      amenities: []
    });
    alert('Venue booked successfully!');
  };

  const handleSubmitFeedback = (programId) => {
    const feedback = feedbackData[programId];
    if (!feedback || !feedback.rating) {
      alert('Please provide a rating');
      return;
    }

    setInductionPrograms(prev => prev.map(program => 
      program.id === programId
        ? {
            ...program,
            feedback: [...(program.feedback || []), {
              id: Date.now(),
              ...feedback,
              submittedDate: new Date().toISOString().split('T')[0]
            }],
            overallRating: calculateAverageRating(program.id)
          }
        : program
    ));

    setShowFeedbackModal(false);
    setFeedbackData(prev => ({ ...prev, [programId]: null }));
    alert('Feedback submitted successfully!');
  };

  const calculateAverageRating = (programId) => {
    const program = inductionPrograms.find(p => p.id === programId);
    if (!program || !program.feedback || program.feedback.length === 0) return 0;
    const sum = program.feedback.reduce((acc, f) => acc + (f.rating || 0), 0);
    return parseFloat((sum / program.feedback.length).toFixed(1));
  };

  const handleGenerateCertificate = (programId, participantId) => {
    const certificate = {
      id: Date.now(),
      programId,
      participantId,
      issuedDate: new Date().toISOString().split('T')[0],
      certificateNumber: `CERT-${Date.now()}`
    };

    setInductionPrograms(prev => prev.map(program => 
      program.id === programId
        ? {
            ...program,
            certificates: [...(program.certificates || []), certificate]
          }
        : program
    ));

    alert('Certificate generated successfully!');
  };

  const handleCompletePolicyModule = (policyId, moduleId) => {
    setPolicies(prev => prev.map(policy => 
      policy.id === policyId
        ? {
            ...policy,
            modules: policy.modules.map(module => 
              module.id === moduleId ? { ...module, read: true } : module
            )
          }
        : policy
    ));
  };

  const handleSubmitQuiz = (policyId) => {
    const policy = policies.find(p => p.id === policyId);
    if (!policy || !policy.quiz) return;

    let correctAnswers = 0;
    policy.quiz.forEach((question, index) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / policy.quiz.length) * 100;
    const passed = score >= policy.passingScore;

    if (passed) {
      handleCompletePolicy(policyId);
      alert(`Quiz passed! Score: ${score.toFixed(1)}%`);
    } else {
      alert(`Quiz failed. Score: ${score.toFixed(1)}%. Passing score: ${policy.passingScore}%`);
    }

    setShowPolicyQuizModal(false);
    setQuizAnswers({});
  };

  // ==================== RESPONSIVE MODALS ====================

  // 1. Create Program Modal
  const CreateProgramModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Create New Induction Program</h5>
              <button className="btn-close" onClick={() => setShowCreateProgram(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Program Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={programForm.name}
                    onChange={(e) => setProgramForm({...programForm, name: e.target.value})}
                    required
                    placeholder="e.g., Q2 2024 Orientation"
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Program Type *</label>
                  <select
                    className="form-select"
                    value={programForm.type}
                    onChange={(e) => setProgramForm({...programForm, type: e.target.value})}
                  >
                    <option value="batch">Batch Program</option>
                    <option value="individual">Individual</option>
                    <option value="virtual">Virtual</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={programForm.description}
                  onChange={(e) => setProgramForm({...programForm, description: e.target.value})}
                  placeholder="Program description"
                />
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Start Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={programForm.startDate}
                    onChange={(e) => setProgramForm({...programForm, startDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">End Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={programForm.endDate}
                    onChange={(e) => setProgramForm({...programForm, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-8 mb-3">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={programForm.location}
                    onChange={(e) => setProgramForm({...programForm, location: e.target.value})}
                    required
                    placeholder="e.g., Main Auditorium"
                  />
                </div>
                
                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">Max Participants</label>
                  <input
                    type="number"
                    className="form-control"
                    value={programForm.maxParticipants}
                    onChange={(e) => setProgramForm({...programForm, maxParticipants: parseInt(e.target.value) || 0})}
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowCreateProgram(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleCreateProgram}
                disabled={!programForm.name || !programForm.startDate || !programForm.endDate || !programForm.location}
              >
                Create Program
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Trainer Assignment Modal
  const TrainerAssignmentModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Assign Trainer</h5>
              <button className="btn-close" onClick={() => setShowTrainerAssignmentModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label className="form-label">Select Program</label>
                <select 
                  className="form-select"
                  value={trainerAssignmentData.programId || ''}
                  onChange={(e) => setTrainerAssignmentData({
                    ...trainerAssignmentData, 
                    programId: parseInt(e.target.value)
                  })}
                >
                  <option value="">Choose program...</option>
                  {inductionPrograms.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Trainer Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={trainerAssignmentData.trainerName}
                  onChange={(e) => setTrainerAssignmentData({...trainerAssignmentData, trainerName: e.target.value})}
                  placeholder="Enter trainer name"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Trainer Role</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., HR Manager"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Trainer Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="trainer@company.com"
                />
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowTrainerAssignmentModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleAssignTrainer}
                disabled={!trainerAssignmentData.programId || !trainerAssignmentData.trainerName}
              >
                Assign Trainer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. Bulk Attendance Modal
  const BulkAttendanceModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Bulk Attendance</h5>
              <button className="btn-close" onClick={() => setShowBulkAttendanceModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="alert alert-info mb-3">
                <strong>Note:</strong> This feature allows you to mark attendance for multiple participants at once.
              </div>
              
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rahul Sharma</td>
                      <td>Engineering</td>
                      <td>
                        <select className="form-select form-select-sm">
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Priya Patel</td>
                      <td>Marketing</td>
                      <td>
                        <select className="form-select form-select-sm">
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowBulkAttendanceModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary">
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Policy Modal
  const PolicyModal = () => {
    const policy = selectedPolicy || policies[0];
    
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">{policy?.name}</h5>
              <button className="btn-close" onClick={() => setShowPolicyModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="alert alert-light mb-4">
                <div className="row">
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Version</small>
                    <div className="fw-bold">{policy?.version}</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Effective Date</small>
                    <div className="fw-bold">{policy?.effectiveDate}</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Read Time</small>
                    <div className="fw-bold">{policy?.readTime}</div>
                  </div>
                  <div className="col-6 col-md-3">
                    <small className="text-muted">Status</small>
                    <div>
                      {policy?.status === 'mandatory' ? (
                        <span className="badge bg-danger">Mandatory</span>
                      ) : (
                        <span className="badge bg-success">Published</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="fw-bold">Policy Content</h6>
                <p>{policy?.description}</p>
              </div>
              
              <div className="card border">
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Completion Statistics</h6>
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="fw-bold">{policy?.completionTracking.completed}</div>
                      <div className="text-muted small">Completed</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold">{policy?.completionTracking.pending}</div>
                      <div className="text-muted small">Pending</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold">{policy?.completionTracking.averageScore.toFixed(1)}</div>
                      <div className="text-muted small">Avg Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowPolicyModal(false)}>
                Close
              </button>
              {policy?.modules && policy.modules.length > 0 && (
                <button 
                  className="btn btn-info"
                  onClick={() => {
                    setSelectedPolicy(policy);
                    setCurrentPolicyModule(0);
                    setShowPolicyModuleModal(true);
                    setShowPolicyModal(false);
                  }}
                >
                  Read Modules
                </button>
              )}
              {policy?.quiz && policy.quiz.length > 0 && (
                <button 
                  className="btn btn-warning"
                  onClick={() => {
                    setSelectedPolicy(policy);
                    setShowPolicyQuizModal(true);
                    setShowPolicyModal(false);
                  }}
                >
                  Take Quiz
                </button>
              )}
              <button 
                className="btn btn-success"
                onClick={() => handleCompletePolicy(policy?.id)}
              >
                Acknowledge Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5. Session Agenda Modal
  const SessionAgendaModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Create Session Agenda</h5>
              <button className="btn-close" onClick={() => setShowSessionAgendaModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label className="form-label">Select Program *</label>
                <select 
                  className="form-select"
                  value={sessionAgendaForm.programId || ''}
                  onChange={(e) => setSessionAgendaForm({
                    ...sessionAgendaForm, 
                    programId: parseInt(e.target.value)
                  })}
                >
                  <option value="">Choose program...</option>
                  {inductionPrograms.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Session Title *</label>
                <input
                  type="text"
                  className="form-control"
                  value={sessionAgendaForm.sessionTitle}
                  onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, sessionTitle: e.target.value})}
                  placeholder="e.g., Company Culture & Values"
                  required
                />
              </div>

              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Session Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={sessionAgendaForm.sessionDate}
                    onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, sessionDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-12 col-md-3 mb-3">
                  <label className="form-label">Start Time *</label>
                  <input
                    type="time"
                    className="form-control"
                    value={sessionAgendaForm.startTime}
                    onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, startTime: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-12 col-md-3 mb-3">
                  <label className="form-label">End Time *</label>
                  <input
                    type="time"
                    className="form-control"
                    value={sessionAgendaForm.endTime}
                    onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, endTime: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Agenda/Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={sessionAgendaForm.agenda}
                  onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, agenda: e.target.value})}
                  placeholder="Detailed agenda for this session"
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={sessionAgendaForm.isVirtual}
                    onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, isVirtual: e.target.checked})}
                  />
                  <label className="form-check-label">Virtual Session</label>
                </div>
              </div>

              {sessionAgendaForm.isVirtual ? (
                <div className="mb-3">
                  <label className="form-label">Meeting Link *</label>
                  <input
                    type="url"
                    className="form-control"
                    value={sessionAgendaForm.meetingLink}
                    onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, meetingLink: e.target.value})}
                    placeholder="https://zoom.us/j/..."
                    required={sessionAgendaForm.isVirtual}
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <label className="form-label">Venue *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={sessionAgendaForm.venue}
                    onChange={(e) => setSessionAgendaForm({...sessionAgendaForm, venue: e.target.value})}
                    placeholder="e.g., Conference Room A"
                    required={!sessionAgendaForm.isVirtual}
                  />
                </div>
              )}
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowSessionAgendaModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleCreateSession}
                disabled={!sessionAgendaForm.programId || !sessionAgendaForm.sessionTitle}
              >
                Create Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 6. Material Distribution Modal
  const MaterialDistributionModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Distribute Materials</h5>
              <button className="btn-close" onClick={() => setShowMaterialDistributionModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label className="form-label">Select Program *</label>
                <select 
                  className="form-select"
                  value={materialForm.programId || ''}
                  onChange={(e) => setMaterialForm({
                    ...materialForm, 
                    programId: parseInt(e.target.value)
                  })}
                >
                  <option value="">Choose program...</option>
                  {inductionPrograms.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row">
                <div className="col-12 col-md-8 mb-3">
                  <label className="form-label">Material Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={materialForm.materialName}
                    onChange={(e) => setMaterialForm({...materialForm, materialName: e.target.value})}
                    placeholder="e.g., Company Handbook"
                    required
                  />
                </div>
                
                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">Material Type *</label>
                  <select
                    className="form-select"
                    value={materialForm.materialType}
                    onChange={(e) => setMaterialForm({...materialForm, materialType: e.target.value})}
                  >
                    <option value="document">Document</option>
                    <option value="video">Video</option>
                    <option value="presentation">Presentation</option>
                    <option value="archive">Archive</option>
                    <option value="link">Link</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={materialForm.description}
                  onChange={(e) => setMaterialForm({...materialForm, description: e.target.value})}
                  placeholder="Material description"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload File</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setMaterialForm({...materialForm, file: e.target.files[0]})}
                />
                <small className="text-muted">Supported formats: PDF, DOCX, PPTX, ZIP, MP4</small>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowMaterialDistributionModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleDistributeMaterial}
                disabled={!materialForm.programId || !materialForm.materialName}
              >
                Distribute Material
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 7. Venue Booking Modal
  const VenueBookingModal = () => {
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Book Venue</h5>
              <button className="btn-close" onClick={() => setShowVenueBookingModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label className="form-label">Select Program *</label>
                <select 
                  className="form-select"
                  value={venueForm.programId || ''}
                  onChange={(e) => setVenueForm({
                    ...venueForm, 
                    programId: parseInt(e.target.value)
                  })}
                >
                  <option value="">Choose program...</option>
                  {inductionPrograms.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Venue Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={venueForm.venueName}
                    onChange={(e) => setVenueForm({...venueForm, venueName: e.target.value})}
                    placeholder="e.g., Main Auditorium"
                    required
                  />
                </div>
                
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={venueForm.capacity}
                    onChange={(e) => setVenueForm({...venueForm, capacity: e.target.value})}
                    placeholder="Number of seats"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={venueForm.address}
                  onChange={(e) => setVenueForm({...venueForm, address: e.target.value})}
                  placeholder="Venue address"
                />
              </div>

              <div className="row">
                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">Booking Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={venueForm.bookingDate}
                    onChange={(e) => setVenueForm({...venueForm, bookingDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={venueForm.startTime}
                    onChange={(e) => setVenueForm({...venueForm, startTime: e.target.value})}
                  />
                </div>
                
                <div className="col-12 col-md-4 mb-3">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={venueForm.endTime}
                    onChange={(e) => setVenueForm({...venueForm, endTime: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowVenueBookingModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleBookVenue}
                disabled={!venueForm.programId || !venueForm.venueName || !venueForm.bookingDate}
              >
                Book Venue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 8. Feedback Modal
  const FeedbackModal = () => {
    const program = selectedProgram || inductionPrograms[0];
    const feedback = feedbackData[program?.id] || { rating: 0, comments: '' };

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Program Feedback</h5>
              <button className="btn-close" onClick={() => setShowFeedbackModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="mb-3">
                <label className="form-label">Program: {program?.name}</label>
              </div>

              <div className="mb-3">
                <label className="form-label">Rating * (1-5)</label>
                <select
                  className="form-select"
                  value={feedback.rating}
                  onChange={(e) => setFeedbackData({
                    ...feedbackData,
                    [program.id]: { ...feedback, rating: parseInt(e.target.value) }
                  })}
                  required
                >
                  <option value="0">Select rating...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comments</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={feedback.comments}
                  onChange={(e) => setFeedbackData({
                    ...feedbackData,
                    [program.id]: { ...feedback, comments: e.target.value }
                  })}
                  placeholder="Share your feedback about the program..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">What did you like most?</label>
                <input
                  type="text"
                  className="form-control"
                  value={feedback.likedMost || ''}
                  onChange={(e) => setFeedbackData({
                    ...feedbackData,
                    [program.id]: { ...feedback, likedMost: e.target.value }
                  })}
                  placeholder="What aspects did you find most valuable?"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Suggestions for improvement</label>
                <input
                  type="text"
                  className="form-control"
                  value={feedback.suggestions || ''}
                  onChange={(e) => setFeedbackData({
                    ...feedbackData,
                    [program.id]: { ...feedback, suggestions: e.target.value }
                  })}
                  placeholder="How can we improve?"
                />
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowFeedbackModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleSubmitFeedback(program?.id)}
                disabled={!feedback.rating}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 9. Policy Module Reading Modal
  const PolicyModuleModal = () => {
    const policy = selectedPolicy || policies[0];
    const currentModule = policy?.modules?.[currentPolicyModule];

    if (!policy || !currentModule) return null;

    const allModulesRead = policy.modules.every(m => m.read);
    const isLastModule = currentPolicyModule === policy.modules.length - 1;

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">{policy.name} - Module {currentPolicyModule + 1}</h5>
              <button className="btn-close" onClick={() => setShowPolicyModuleModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="mb-3">
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ width: `${((currentPolicyModule + 1) / policy.modules.length) * 100}%` }}
                  ></div>
                </div>
                <small className="text-muted">
                  Module {currentPolicyModule + 1} of {policy.modules.length}
                </small>
              </div>

              <div className="card border mb-3">
                <div className="card-body">
                  <h6 className="fw-bold">{currentModule.title}</h6>
                  <p className="mt-3">{currentModule.content}</p>
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={currentModule.read}
                  onChange={() => handleCompletePolicyModule(policy.id, currentModule.id)}
                />
                <label className="form-check-label">
                  I have read and understood this module
                </label>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => {
                  if (currentPolicyModule > 0) {
                    setCurrentPolicyModule(currentPolicyModule - 1);
                  } else {
                    setShowPolicyModuleModal(false);
                  }
                }}
              >
                {currentPolicyModule > 0 ? 'Previous' : 'Close'}
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  if (!isLastModule) {
                    setCurrentPolicyModule(currentPolicyModule + 1);
                  } else {
                    if (allModulesRead) {
                      setShowPolicyModuleModal(false);
                      if (policy.quiz && policy.quiz.length > 0) {
                        setShowPolicyQuizModal(true);
                      } else {
                        handleCompletePolicy(policy.id);
                      }
                    } else {
                      alert('Please mark all modules as read');
                    }
                  }
                }}
              >
                {isLastModule ? (allModulesRead ? 'Complete' : 'Mark as Read') : 'Next Module'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 10. Policy Quiz Modal
  const PolicyQuizModal = () => {
    const policy = selectedPolicy || policies[0];

    if (!policy || !policy.quiz || policy.quiz.length === 0) return null;

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">{policy.name} - Quiz</h5>
              <button className="btn-close" onClick={() => setShowPolicyQuizModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="alert alert-info mb-3">
                <strong>Instructions:</strong> Answer all questions. Passing score: {policy.passingScore}%
              </div>

              {policy.quiz.map((question, index) => (
                <div key={question.id} className="card border mb-3">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">
                      Question {index + 1}: {question.question}
                    </h6>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${question.id}`}
                          id={`option-${question.id}-${optIndex}`}
                          checked={quizAnswers[question.id] === optIndex}
                          onChange={() => setQuizAnswers({
                            ...quizAnswers,
                            [question.id]: optIndex
                          })}
                        />
                        <label className="form-check-label" htmlFor={`option-${question.id}-${optIndex}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowPolicyQuizModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleSubmitQuiz(policy.id)}
                disabled={Object.keys(quizAnswers).length < policy.quiz.length}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== HELPER FUNCTIONS ====================
  const filteredPrograms = inductionPrograms.filter(program => {
    if (activeTab === 'all') return true;
    return program.status === activeTab;
  }).filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ongoing': return <span className="badge bg-success">Ongoing</span>;
      case 'upcoming': return <span className="badge bg-warning">Upcoming</span>;
      case 'completed': return <span className="badge bg-secondary">Completed</span>;
      case 'draft': return <span className="badge bg-light text-dark">Draft</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  // ==================== RENDER ====================
  return (
    <>
      <div className="container-fluid px-2 px-md-3 px-lg-4 py-3">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">Induction & Orientation</h5>
            <p className="text-muted mb-0 d-none d-md-block">Complete onboarding management with policy acknowledgment</p>
            <p className="text-muted mb-0 d-md-none">Onboarding management system</p>
          </div>

          <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
            <button 
              className="btn btn-outline-primary d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowBulkAttendanceModal(true)}
            >
              <i className="bi bi-people d-none d-md-inline"></i>
              <span>Bulk Attendance</span>
            </button>
            
            <button 
              className="btn btn-outline-info d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowPolicyUploadModal(true)}
            >
              <i className="bi bi-upload d-none d-md-inline"></i>
              <span>Upload Policy</span>
            </button>
            
            <button 
              className="btn btn-primary d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowCreateProgram(true)}
            >
              <i className="bi bi-plus-circle d-none d-md-inline"></i>
              <span>Create Program</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Total Programs</h6>
                    <h4 className="fw-bold mb-0">{inductionPrograms.length}</h4>
                  </div>
                  <div className="bg-primary rounded-circle p-2">
                    <i className="bi bi-calendar-event text-white fs-5"></i>
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
                    <h6 className="card-title text-muted mb-1">Total Participants</h6>
                    <h4 className="fw-bold mb-0">
                      {inductionPrograms.reduce((sum, program) => sum + program.totalParticipants, 0)}
                    </h4>
                  </div>
                  <div className="bg-success rounded-circle p-2">
                    <i className="bi bi-people text-white fs-5"></i>
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
                    <h6 className="card-title text-muted mb-1">Policy Completion</h6>
                    <h4 className="fw-bold mb-0">
                      {policies.filter(p => p.required).reduce((sum, policy) => {
                        const rate = policy.completionTracking.completed / policy.completionTracking.totalEmployees;
                        return sum + rate;
                      }, 0) / policies.filter(p => p.required).length * 100 || 0}%
                    </h4>
                  </div>
                  <div className="bg-warning rounded-circle p-2">
                    <i className="bi bi-file-check text-white fs-5"></i>
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
                    <h6 className="card-title text-muted mb-1">Avg. Rating</h6>
                    <h4 className="fw-bold mb-0">
                      {inductionPrograms.length > 0 
                        ? (inductionPrograms.reduce((sum, program) => sum + program.overallRating, 0) / inductionPrograms.length).toFixed(1)
                        : '0.0'}/5
                    </h4>
                  </div>
                  <div className="bg-info rounded-circle p-2">
                    <i className="bi bi-star text-white fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search - Responsive Layout */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-8">
            <div className="d-flex flex-wrap gap-2">
              <button 
                className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`btn ${activeTab === 'ongoing' ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                onClick={() => setActiveTab('ongoing')}
              >
                Ongoing
              </button>
              <button 
                className={`btn ${activeTab === 'upcoming' ? 'btn-warning' : 'btn-outline-warning'} btn-sm`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`btn ${activeTab === 'completed' ? 'btn-secondary' : 'btn-outline-secondary'} btn-sm`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="col-12 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Induction Programs Table - Responsive */}
        <div className="card border mb-4">
          <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <h6 className="mb-2 mb-md-0 fw-bold">Induction Programs</h6>
            <span className="badge bg-primary">{filteredPrograms.length} programs</span>
          </div>
          
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="d-none d-md-table-cell">Program Name</th>
                    <th className="d-table-cell d-md-none">Program</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th className="d-none d-md-table-cell">Schedule</th>
                    <th className="d-none d-md-table-cell">Participants</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrograms.map(program => (
                    <tr key={program.id}>
                      <td>
                        <div className="fw-bold">{program.name}</div>
                        <small className="text-muted d-none d-md-block">{program.description.substring(0, 50)}...</small>
                        <small className="text-muted d-block d-md-none">
                          {program.startDate} to {program.endDate}
                        </small>
                      </td>
                      <td>
                        <span className={`badge ${
                          program.type === 'batch' ? 'bg-primary' :
                          program.type === 'individual' ? 'bg-info' : 'bg-success'
                        }`}>
                          {program.type}
                        </span>
                      </td>
                      <td>{getStatusBadge(program.status)}</td>
                      <td className="d-none d-md-table-cell">
                        <div>{program.startDate} to {program.endDate}</div>
                        <small className="text-muted">{program.duration}</small>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <div>{program.confirmedParticipants}/{program.totalParticipants}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="fw-bold me-1">{program.overallRating}</span>
                          <div className="text-warning">
                            {'★'.repeat(Math.floor(program.overallRating))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => {
                              setSelectedProgram(program);
                            }}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button 
                            className="btn btn-outline-info"
                            onClick={() => {
                              setSelectedProgram(program);
                              setShowSessionAgendaModal(true);
                            }}
                            title="Add Session"
                          >
                            <i className="bi bi-calendar-plus"></i>
                          </button>
                          <button 
                            className="btn btn-outline-success"
                            onClick={() => {
                              setSelectedProgram(program);
                              setShowBulkAttendanceModal(true);
                            }}
                            title="Attendance"
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                          <button 
                            className="btn btn-outline-warning"
                            onClick={() => {
                              setSelectedProgram(program);
                              setShowFeedbackModal(true);
                            }}
                            title="Feedback"
                          >
                            <i className="bi bi-star"></i>
                          </button>
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => handleGenerateCertificate(program.id, null)}
                            title="Generate Certificate"
                          >
                            <i className="bi bi-award"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="card-footer bg-light d-none d-md-block">
            <small className="text-muted">
              Showing {filteredPrograms.length} of {inductionPrograms.length} programs
            </small>
          </div>
        </div>

        {/* Session Schedules Section */}
        {selectedProgram && selectedProgram.schedule && selectedProgram.schedule.length > 0 && (
          <div className="card border mb-4">
            <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <h6 className="mb-2 mb-md-0 fw-bold">Session Schedule: {selectedProgram.name}</h6>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  setSessionAgendaForm({...sessionAgendaForm, programId: selectedProgram.id});
                  setShowSessionAgendaModal(true);
                }}
              >
                <i className="bi bi-plus"></i> Add Session
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Session</th>
                      <th className="d-none d-md-table-cell">Date & Time</th>
                      <th>Location</th>
                      <th className="d-none d-md-table-cell">Trainer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProgram.schedule.map(session => (
                      <tr key={session.id}>
                        <td>
                          <div className="fw-bold">{session.title}</div>
                          <small className="text-muted d-block d-md-none">
                            {session.date} {session.startTime} - {session.endTime}
                          </small>
                        </td>
                        <td className="d-none d-md-table-cell">
                          <div>{session.date}</div>
                          <small className="text-muted">{session.startTime} - {session.endTime}</small>
                        </td>
                        <td>
                          {session.isVirtual ? (
                            <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary">
                              <i className="bi bi-camera-video"></i> Virtual
                            </a>
                          ) : (
                            <span><i className="bi bi-geo-alt"></i> {session.venue}</span>
                          )}
                        </td>
                        <td className="d-none d-md-table-cell">{session.trainer || '-'}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              setSelectedSession(session);
                            }}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Policy Acknowledgment Section - Responsive */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="mb-2 mb-md-0 fw-bold">Policy Acknowledgment</h6>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowPolicyUploadModal(true)}
                >
                  <i className="bi bi-plus"></i> Add Policy
                </button>
              </div>
              
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Policy</th>
                        <th className="d-none d-md-table-cell">Category</th>
                        <th>Status</th>
                        <th className="d-none d-md-table-cell">Completion</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.map(policy => {
                        const completion = policyCompletionData[policy.id] || {};
                        const progress = (policy.completionTracking.completed / policy.completionTracking.totalEmployees) * 100;
                        
                        return (
                          <tr key={policy.id}>
                            <td>
                              <div>
                                <div className="fw-bold">{policy.name}</div>
                                <small className="text-muted d-block d-md-none">{policy.category}</small>
                              </div>
                            </td>
                            <td className="d-none d-md-table-cell">
                              <span className={`badge ${
                                policy.category === 'compliance' ? 'bg-danger' :
                                policy.category === 'security' ? 'bg-warning' : 'bg-secondary'
                              }`}>
                                {policy.category}
                              </span>
                            </td>
                            <td>
                              {policy.status === 'mandatory' ? (
                                <span className="badge bg-danger">Mandatory</span>
                              ) : (
                                <span className="badge bg-success">Published</span>
                              )}
                            </td>
                            <td className="d-none d-md-table-cell">
                              <div>
                                <div className="d-flex justify-content-between mb-1">
                                  <small>{policy.completionTracking.completed}/{policy.completionTracking.totalEmployees}</small>
                                  <small>{progress.toFixed(1)}%</small>
                                </div>
                                <div className="progress" style={{ height: '6px' }}>
                                  <div 
                                    className="progress-bar" 
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => {
                                    setSelectedPolicy(policy);
                                    setShowPolicyModal(true);
                                  }}
                                  title="View Policy"
                                >
                                  <i className="bi bi-eye"></i>
                                </button>
                                {policy.modules && policy.modules.length > 0 && (
                                  <button
                                    className="btn btn-outline-info"
                                    onClick={() => {
                                      setSelectedPolicy(policy);
                                      setCurrentPolicyModule(0);
                                      setShowPolicyModuleModal(true);
                                    }}
                                    title="Read Modules"
                                  >
                                    <i className="bi bi-book"></i>
                                  </button>
                                )}
                                {policy.quiz && policy.quiz.length > 0 && (
                                  <button
                                    className="btn btn-outline-warning"
                                    onClick={() => {
                                      setSelectedPolicy(policy);
                                      setShowPolicyQuizModal(true);
                                    }}
                                    title="Take Quiz"
                                  >
                                    <i className="bi bi-question-circle"></i>
                                  </button>
                                )}
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => handleCompletePolicy(policy.id)}
                                  disabled={completion.completed}
                                  title="Acknowledge"
                                >
                                  <i className="bi bi-check-circle"></i>
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

        {/* Quick Actions - Responsive Grid */}
        <div className="row mt-4 g-3">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light">
                <h6 className="mb-0 fw-bold">Quick Actions</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowCreateProgram(true)}
                    >
                      <i className="bi bi-plus-circle fs-4 mb-2"></i>
                      <span className="small">Create Program</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-success w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowTrainerAssignmentModal(true)}
                    >
                      <i className="bi bi-person-plus fs-4 mb-2"></i>
                      <span className="small">Assign Trainer</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-info w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowMaterialDistributionModal(true)}
                    >
                      <i className="bi bi-folder-symlink fs-4 mb-2"></i>
                      <span className="small">Materials</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-warning w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowBulkAttendanceModal(true)}
                    >
                      <i className="bi bi-people fs-4 mb-2"></i>
                      <span className="small">Attendance</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-danger w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowPolicyUploadModal(true)}
                    >
                      <i className="bi bi-upload fs-4 mb-2"></i>
                      <span className="small">Upload Policy</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowVenueBookingModal(true)}
                    >
                      <i className="bi bi-calendar-check fs-4 mb-2"></i>
                      <span className="small">Book Venue</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Summary Cards */}
        <div className="row mt-4 d-md-none">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light">
                <h6 className="mb-0 fw-bold">Summary</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <small className="text-muted d-block">Active Programs</small>
                      <span className="fw-bold">
                        {inductionPrograms.filter(p => p.status === 'ongoing').length}
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <small className="text-muted d-block">Pending Policies</small>
                      <span className="fw-bold">
                        {policies.reduce((sum, p) => sum + p.completionTracking.pending, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Modals */}
        {showCreateProgram && <CreateProgramModal />}
        {showTrainerAssignmentModal && <TrainerAssignmentModal />}
        {showBulkAttendanceModal && <BulkAttendanceModal />}
        {showPolicyModal && <PolicyModal />}
        {showSessionAgendaModal && <SessionAgendaModal />}
        {showMaterialDistributionModal && <MaterialDistributionModal />}
        {showVenueBookingModal && <VenueBookingModal />}
        {showFeedbackModal && <FeedbackModal />}
        {showPolicyModuleModal && <PolicyModuleModal />}
        {showPolicyQuizModal && <PolicyQuizModal />}
      </div>
    </>
  );
};

export default InductionOrientation;