import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const BuddyMentorAssignment = () => {
  // ==================== MENU ITEMS ====================
  const menuItems = [
    { title: 'Dashboard', link: '/recruiter/dashboard', active: false },
    { title: 'Job Openings', link: '/recruiter/jobs', active: false },
    { title: 'Candidates', link: '/recruiter/candidates', active: false },
    { title: 'Interviews', link: '/recruiter/interviews', active: false },
    { title: 'Pre-Joining', link: '/recruiter/pre-joining', active: false },
    { title: 'Onboarding', link: '/recruiter/onboarding', active: true },
    { title: 'Reports', link: '/recruiter/reports', active: false }
  ];

  const userInfo = {
    name: 'Sarah Johnson',
    role: 'HR Head',
    email: 'sarah.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  };

  // ==================== INITIAL BUDDY PROGRAM DATA ====================
  const initialBuddyPrograms = [
    {
      id: 1,
      name: 'Q1 2024 New Hire Buddy Program',
      description: 'Comprehensive buddy program for Q1 2024 new hires',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      programType: 'New Hire Buddy Program',
      department: 'All',
      location: 'All',
      
      // ✅ Buddy assignment rules
      assignmentRules: [
        { id: 1, rule: 'Buddies must have minimum 1 year tenure', mandatory: true, weight: 40 },
        { id: 2, rule: 'Same department pairing preferred', mandatory: false, weight: 30 },
        { id: 3, rule: 'Regular weekly check-ins required', mandatory: true, weight: 20 },
        { id: 4, rule: 'Feedback submission every 2 weeks', mandatory: true, weight: 10 },
        { id: 5, rule: 'Maximum 2 new joiners per buddy', mandatory: true, weight: 15 },
        { id: 6, rule: 'Same location pairing preferred', mandatory: false, weight: 25 },
        { id: 7, rule: 'Skill matching required for technical roles', mandatory: true, weight: 35 }
      ],
      
      // ✅ Buddy-new joiner pairing
      assignments: [
        {
          id: 1,
          buddy: {
            id: 101,
            name: 'John Davis',
            department: 'Engineering',
            role: 'Senior Software Engineer',
            tenure: '3 years',
            email: 'john.davis@company.com',
            phone: '+91-9876543210',
            currentAssignments: 1,
            maxAssignments: 2,
            rating: 4.8,
            totalMentees: 5,
            officeLocation: 'Bangalore',
            skills: ['JavaScript', 'React', 'Node.js']
          },
          newJoiner: {
            id: 201,
            name: 'Rahul Sharma',
            department: 'Engineering',
            role: 'Software Engineer',
            joinDate: '2024-01-15',
            email: 'rahul.sharma@company.com',
            phone: '+91-9876543220',
            location: 'Bangalore',
            onboardingStage: 'Week 2',
            background: 'Fresh graduate from IIT Delhi',
            skills: ['JavaScript', 'Python', 'React']
          },
          assignmentDate: '2024-01-15',
          status: 'active',
          matchScore: 85,
          pairingReason: 'Same department and location',
          
          // ✅ Communication facilitation
          communicationRecords: [
            {
              id: 1,
              type: 'welcome_call',
              date: '2024-01-15',
              duration: '30 mins',
              topics: ['Introduction', 'Team Structure', 'Tools'],
              followUp: ['Share tool access']
            },
            {
              id: 2,
              type: 'weekly_checkin',
              date: '2024-01-22',
              duration: '45 mins',
              topics: ['Progress review', 'Challenges'],
              followUp: ['Schedule training session']
            }
          ],
          
          lastCheckIn: '2024-03-15',
          nextCheckIn: '2024-03-22',
          feedbackScore: 4.5,
          completionPercentage: 60
        },
        {
          id: 2,
          buddy: {
            id: 102,
            name: 'Priya Patel',
            department: 'Marketing',
            role: 'Marketing Manager',
            tenure: '2 years',
            email: 'priya.patel@company.com',
            phone: '+91-9876543211',
            currentAssignments: 2,
            maxAssignments: 3,
            rating: 4.6,
            totalMentees: 8,
            officeLocation: 'Delhi',
            skills: ['Digital Marketing', 'Content Strategy']
          },
          newJoiner: {
            id: 202,
            name: 'Anjali Singh',
            department: 'Marketing',
            role: 'Marketing Executive',
            joinDate: '2024-01-20',
            email: 'anjali.singh@company.com',
            phone: '+91-9876543221',
            location: 'Delhi',
            onboardingStage: 'Week 3',
            background: '2 years experience in digital marketing',
            skills: ['Social Media', 'Content Writing']
          },
          assignmentDate: '2024-01-20',
          status: 'active',
          matchScore: 90,
          pairingReason: 'Same department and marketing expertise',
          
          communicationRecords: [
            {
              id: 1,
              type: 'welcome_meeting',
              date: '2024-01-20',
              duration: '60 mins',
              topics: ['Marketing processes', 'Campaigns'],
              followUp: ['Share campaign templates']
            }
          ],
          
          lastCheckIn: '2024-03-18',
          nextCheckIn: '2024-03-25',
          feedbackScore: 4.8,
          completionPercentage: 75
        }
      ],
      
      // ✅ Buddy responsibilities checklist
      buddyResponsibilities: [
        {
          id: 1,
          category: 'Week 1',
          tasks: [
            { id: 1, task: 'Initial welcome meeting', description: 'Introduce company culture and team', deadline: 'Day 1', status: 'completed' },
            { id: 2, task: 'Tool access setup', description: 'Help with email, Slack, and other tools', deadline: 'Day 2', status: 'completed' },
            { id: 3, task: 'Team introductions', description: 'Introduce to immediate team members', deadline: 'Day 3', status: 'completed' }
          ]
        },
        {
          id: 2,
          category: 'Week 2',
          tasks: [
            { id: 4, task: 'Process walkthrough', description: 'Explain team processes and workflows', deadline: 'Week 2', status: 'in-progress' },
            { id: 5, task: 'Tools training', description: 'Train on specific job-related tools', deadline: 'Week 2', status: 'in-progress' }
          ]
        },
        {
          id: 3,
          category: 'Month 1',
          tasks: [
            { id: 6, task: 'First month review', description: 'Review progress and address concerns', deadline: 'Month 1', status: 'pending' },
            { id: 7, task: 'Career path discussion', description: 'Discuss growth opportunities', deadline: 'Month 1', status: 'pending' }
          ]
        }
      ],
      
      // ✅ Buddy feedback collection
      feedback: [
        {
          id: 1,
          assignmentId: 1,
          submittedBy: 'Rahul Sharma',
          role: 'newJoiner',
          date: '2024-02-15',
          overallRating: 4.5,
          categories: [
            { category: 'Responsiveness', rating: 5, comment: 'Always available when needed' },
            { category: 'Knowledge Sharing', rating: 4, comment: 'Very knowledgeable about processes' },
            { category: 'Support', rating: 5, comment: 'Extremely supportive throughout' }
          ],
          overallComment: 'John has been very supportive during my onboarding',
          improvementSuggestions: 'More structured check-ins would be helpful',
          wouldRecommend: true
        },
        {
          id: 2,
          assignmentId: 2,
          submittedBy: 'Priya Patel',
          role: 'buddy',
          date: '2024-02-20',
          overallRating: 4.8,
          categories: [
            { category: 'Learning Speed', rating: 5, comment: 'Quick to learn and adapt' },
            { category: 'Proactiveness', rating: 5, comment: 'Very proactive in seeking help' },
            { category: 'Engagement', rating: 4, comment: 'Engaged in all discussions' }
          ],
          overallComment: 'Anjali is quick to learn and adapt',
          improvementSuggestions: 'None',
          wouldRecommend: true
        }
      ],
      
      // ✅ Buddy program analytics
      analytics: {
        totalPairs: 15,
        activePairs: 12,
        completedPairs: 3,
        averageRating: 4.7,
        completionRate: 80,
        feedbackCount: 8,
        averageMatchScore: 82,
        departmentDistribution: {
          Engineering: 8,
          Marketing: 4,
          Sales: 2,
          HR: 1
        },
        locationDistribution: {
          Bangalore: 9,
          Delhi: 4,
          Mumbai: 2
        }
      },
      
      totalPairs: 15,
      activePairs: 12,
      completionRate: 80,
      overallRating: 4.7
    },
    {
      id: 2,
      name: 'Leadership Mentorship Program',
      description: 'Executive mentorship for leadership roles',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      programType: 'Leadership Mentorship',
      department: 'Executive',
      location: 'All',
      
      assignmentRules: [
        { id: 1, rule: 'Mentors must be Director level or above', mandatory: true, weight: 50 },
        { id: 2, rule: 'Monthly strategic discussions', mandatory: true, weight: 30 },
        { id: 3, rule: 'Confidentiality agreement required', mandatory: true, weight: 20 }
      ],
      
      assignments: [
        {
          id: 4,
          buddy: {
            id: 104,
            name: 'CEO Office',
            department: 'Executive',
            role: 'CEO',
            tenure: '8 years',
            email: 'ceo@company.com',
            phone: '+91-9876543299',
            currentAssignments: 1,
            maxAssignments: 1,
            rating: 5.0,
            totalMentees: 3,
            officeLocation: 'Bangalore',
            skills: ['Leadership', 'Strategy']
          },
          newJoiner: {
            id: 204,
            name: 'Robert Chen',
            department: 'Engineering',
            role: 'VP Engineering',
            joinDate: '2024-01-10',
            email: 'robert.chen@company.com',
            phone: '+91-9876543290',
            location: 'Bangalore',
            onboardingStage: 'Month 2',
            background: '10+ years in tech leadership',
            skills: ['Leadership', 'Architecture']
          },
          assignmentDate: '2024-01-10',
          status: 'active',
          matchScore: 95,
          pairingReason: 'Executive mentorship for leadership role',
          
          communicationRecords: [
            {
              id: 1,
              type: 'strategy_session',
              date: '2024-01-10',
              duration: '90 mins',
              topics: ['Company vision', 'Leadership approach'],
              followUp: ['Schedule monthly reviews']
            }
          ],
          
          lastCheckIn: '2024-03-10',
          nextCheckIn: '2024-04-10',
          feedbackScore: 5.0,
          completionPercentage: 40
        }
      ],
      
      buddyResponsibilities: [
        {
          id: 1,
          category: 'Strategic Alignment',
          tasks: [
            { id: 1, task: 'Strategic alignment meeting', description: 'Align on company vision and goals', deadline: 'Month 1', status: 'completed' },
            { id: 2, task: 'Business review', description: 'Review business metrics and KPIs', deadline: 'Month 2', status: 'in-progress' }
          ]
        }
      ],
      
      feedback: [],
      
      analytics: {
        totalPairs: 5,
        activePairs: 5,
        completedPairs: 0,
        averageRating: 5.0,
        completionRate: 0,
        feedbackCount: 0,
        averageMatchScore: 90,
        departmentDistribution: {
          Engineering: 3,
          Sales: 1,
          Marketing: 1
        },
        locationDistribution: {
          Bangalore: 4,
          Mumbai: 1
        }
      },
      
      totalPairs: 5,
      activePairs: 5,
      completionRate: 100,
      overallRating: 4.9
    }
  ];

  // ==================== STATE MANAGEMENT ====================
  const [buddyPrograms, setBuddyPrograms] = useState(initialBuddyPrograms);
  const [buddies, setBuddies] = useState([]);
  const [newJoiners, setNewJoiners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showCreateProgram, setShowCreateProgram] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showBuddyProfile, setShowBuddyProfile] = useState(false);
  const [showNewJoinerProfile, setShowNewJoinerProfile] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showCommunicationModal, setShowCommunicationModal] = useState(false);
  const [showPairingModal, setShowPairingModal] = useState(false);
  
  // Selected items
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [selectedNewJoiner, setSelectedNewJoiner] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  
  // Form states
  const [programForm, setProgramForm] = useState({
    name: '',
    description: '',
    programType: 'New Hire Buddy Program',
    department: 'All',
    location: 'All',
    startDate: '',
    endDate: '',
    assignmentRules: [
      { id: 1, rule: 'Buddies must have minimum 1 year tenure', mandatory: true, weight: 40 },
      { id: 2, rule: 'Same department pairing preferred', mandatory: false, weight: 30 }
    ]
  });
  
  const [assignmentForm, setAssignmentForm] = useState({
    programId: null,
    buddyId: null,
    newJoinerId: null,
    assignmentDate: '',
    notes: '',
    pairingReason: ''
  });
  
  const [feedbackForm, setFeedbackForm] = useState({
    assignmentId: null,
    submittedBy: '',
    role: 'newJoiner',
    overallRating: 0,
    categories: [
      { category: 'Responsiveness', rating: 0, comment: '' },
      { category: 'Knowledge Sharing', rating: 0, comment: '' },
      { category: 'Support', rating: 0, comment: '' }
    ],
    overallComment: '',
    improvementSuggestions: '',
    wouldRecommend: true
  });
  
  const [communicationForm, setCommunicationForm] = useState({
    assignmentId: null,
    type: 'weekly_checkin',
    date: '',
    duration: '',
    topics: '',
    followUp: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('programs'); // 'programs', 'buddies', 'newJoiners'

  // ==================== INITIALIZE DATA ====================
  useEffect(() => {
    // Extract buddies and new joiners from programs
    const allBuddies = [];
    const allNewJoiners = [];
    
    buddyPrograms.forEach(program => {
      program.assignments.forEach(assignment => {
        // Add buddy if not already in list
        if (!allBuddies.find(b => b.id === assignment.buddy.id)) {
          allBuddies.push(assignment.buddy);
        }
        
        // Add new joiner if not already in list
        if (!allNewJoiners.find(n => n.id === assignment.newJoiner.id)) {
          allNewJoiners.push(assignment.newJoiner);
        }
      });
    });
    
    // Add more sample buddies
    const additionalBuddies = [
      {
        id: 105,
        name: 'Lisa Wang',
        department: 'HR',
        role: 'HR Business Partner',
        tenure: '5 years',
        email: 'lisa.wang@company.com',
        phone: '+91-9876543213',
        currentAssignments: 0,
        maxAssignments: 3,
        rating: 4.7,
        totalMentees: 10,
        officeLocation: 'Bangalore',
        skills: ['Employee Relations', 'Policy Guidance'],
        availability: 'Available'
      },
      {
        id: 106,
        name: 'David Wilson',
        department: 'Finance',
        role: 'Finance Manager',
        tenure: '6 years',
        email: 'david.wilson@company.com',
        phone: '+91-9876543214',
        currentAssignments: 1,
        maxAssignments: 2,
        rating: 4.5,
        totalMentees: 6,
        officeLocation: 'Delhi',
        skills: ['Financial Planning', 'Budget Management'],
        availability: 'Available'
      }
    ];
    
    // Add unassigned new joiners
    const unassignedNewJoiners = [
      {
        id: 205,
        name: 'Sneha Gupta',
        department: 'HR',
        role: 'HR Executive',
        joinDate: '2024-02-15',
        email: 'sneha.gupta@company.com',
        phone: '+91-9876543223',
        location: 'Bangalore',
        onboardingStage: 'Week 1',
        background: 'MBA in HR from XLRI',
        skills: ['Recruitment', 'Employee Engagement'],
        assignedBuddy: false
      },
      {
        id: 206,
        name: 'Rajesh Nair',
        department: 'Finance',
        role: 'Financial Analyst',
        joinDate: '2024-02-20',
        email: 'rajesh.nair@company.com',
        phone: '+91-9876543224',
        location: 'Delhi',
        onboardingStage: 'Week 1',
        background: 'CA with 4 years experience',
        skills: ['Financial Analysis', 'Excel'],
        assignedBuddy: false
      }
    ];
    
    setBuddies([...allBuddies, ...additionalBuddies]);
    setNewJoiners([...allNewJoiners, ...unassignedNewJoiners]);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // ==================== HANDLERS ====================

  // 1. Create Buddy Program
  const handleCreateProgram = () => {
    const newProgram = {
      id: buddyPrograms.length + 1,
      ...programForm,
      status: 'active',
      assignments: [],
      buddyResponsibilities: [],
      feedback: [],
      analytics: {
        totalPairs: 0,
        activePairs: 0,
        completedPairs: 0,
        averageRating: 0,
        completionRate: 0,
        feedbackCount: 0,
        averageMatchScore: 0,
        departmentDistribution: {},
        locationDistribution: {}
      },
      totalPairs: 0,
      activePairs: 0,
      completionRate: 0,
      overallRating: 0
    };

    setBuddyPrograms([...buddyPrograms, newProgram]);
    setShowCreateProgram(false);
    setProgramForm({
      name: '',
      description: '',
      programType: 'New Hire Buddy Program',
      department: 'All',
      location: 'All',
      startDate: '',
      endDate: '',
      assignmentRules: []
    });
    alert('Buddy program created successfully!');
  };

  // 2. Assign Buddy to New Joiner
  const handleAssignBuddy = () => {
    const { programId, buddyId, newJoinerId, assignmentDate, notes, pairingReason } = assignmentForm;
    
    if (!programId || !buddyId || !newJoinerId) {
      alert('Please select program, buddy, and new joiner');
      return;
    }

    const program = buddyPrograms.find(p => p.id === programId);
    const buddy = buddies.find(b => b.id === buddyId);
    const newJoiner = newJoiners.find(n => n.id === newJoinerId);

    if (!program || !buddy || !newJoiner) {
      alert('Invalid selection');
      return;
    }

    if (buddy.currentAssignments >= buddy.maxAssignments) {
      alert('Selected buddy has reached maximum assignments');
      return;
    }

    // Calculate match score based on rules
    let matchScore = 0;
    if (buddy.department === newJoiner.department) matchScore += 40;
    if (buddy.officeLocation === newJoiner.location) matchScore += 30;
    if (buddy.skills?.some(skill => newJoiner.skills?.includes(skill))) matchScore += 30;

    // Create new assignment
    const newAssignment = {
      id: Date.now(),
      buddy: {
        ...buddy,
        currentAssignments: buddy.currentAssignments + 1
      },
      newJoiner: {
        ...newJoiner,
        assignedBuddy: true
      },
      assignmentDate: assignmentDate || new Date().toISOString().split('T')[0],
      status: 'active',
      matchScore,
      pairingReason: pairingReason || 'Manual assignment',
      communicationRecords: [],
      lastCheckIn: null,
      nextCheckIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      feedbackScore: 0,
      completionPercentage: 0
    };

    // Update program
    setBuddyPrograms(prev => prev.map(program => {
      if (program.id === programId) {
        const updatedAssignments = [...program.assignments, newAssignment];
        const activePairs = updatedAssignments.filter(a => a.status === 'active').length;
        const totalPairs = updatedAssignments.length;
        
        return {
          ...program,
          assignments: updatedAssignments,
          totalPairs,
          activePairs,
          analytics: {
            ...program.analytics,
            totalPairs,
            activePairs,
            averageMatchScore: (program.analytics.averageMatchScore * program.analytics.totalPairs + matchScore) / (program.analytics.totalPairs + 1)
          }
        };
      }
      return program;
    }));

    // Update buddy assignments count
    setBuddies(prev => prev.map(b => 
      b.id === buddyId 
        ? { ...b, currentAssignments: b.currentAssignments + 1, totalMentees: b.totalMentees + 1 }
        : b
    ));

    // Update new joiner status
    setNewJoiners(prev => prev.map(n => 
      n.id === newJoinerId 
        ? { ...n, assignedBuddy: true }
        : n
    ));

    setShowAssignmentModal(false);
    setAssignmentForm({
      programId: null,
      buddyId: null,
      newJoinerId: null,
      assignmentDate: '',
      notes: '',
      pairingReason: ''
    });
    alert('Buddy assigned successfully!');
  };

  // 3. Submit Feedback
  const handleSubmitFeedback = () => {
    const { assignmentId, submittedBy, role, overallRating, categories, overallComment } = feedbackForm;
    
    if (!assignmentId || !submittedBy || !overallRating) {
      alert('Please fill all required fields');
      return;
    }

    const newFeedback = {
      id: Date.now(),
      assignmentId,
      submittedBy,
      role,
      date: new Date().toISOString().split('T')[0],
      overallRating: parseFloat(overallRating),
      categories: categories.map(cat => ({
        ...cat,
        rating: parseFloat(cat.rating)
      })),
      overallComment,
      improvementSuggestions: feedbackForm.improvementSuggestions,
      wouldRecommend: feedbackForm.wouldRecommend
    };

    // Update program feedback and analytics
    setBuddyPrograms(prev => prev.map(program => {
      const assignment = program.assignments.find(a => a.id === assignmentId);
      if (assignment) {
        // Update assignment feedback score
        const updatedAssignments = program.assignments.map(a => 
          a.id === assignmentId 
            ? { ...a, feedbackScore: parseFloat(overallRating) }
            : a
        );

        // Calculate new average rating
        const allFeedback = [...program.feedback, newFeedback];
        const totalRating = allFeedback.reduce((sum, fb) => sum + fb.overallRating, 0);
        const averageRating = totalRating / allFeedback.length;

        return {
          ...program,
          assignments: updatedAssignments,
          feedback: allFeedback,
          overallRating: parseFloat(averageRating.toFixed(1)),
          analytics: {
            ...program.analytics,
            averageRating: parseFloat(averageRating.toFixed(1)),
            feedbackCount: allFeedback.length
          }
        };
      }
      return program;
    }));

    setShowFeedbackModal(false);
    setFeedbackForm({
      assignmentId: null,
      submittedBy: '',
      role: 'newJoiner',
      overallRating: 0,
      categories: [
        { category: 'Responsiveness', rating: 0, comment: '' },
        { category: 'Knowledge Sharing', rating: 0, comment: '' },
        { category: 'Support', rating: 0, comment: '' }
      ],
      overallComment: '',
      improvementSuggestions: '',
      wouldRecommend: true
    });
    alert('Feedback submitted successfully!');
  };

  // 4. Record Communication
  const handleRecordCommunication = () => {
    const { assignmentId, type, date, duration, topics, followUp } = communicationForm;
    
    if (!assignmentId || !date) {
      alert('Please fill required fields');
      return;
    }

    const newCommunication = {
      id: Date.now(),
      type,
      date,
      duration,
      topics: topics.split(',').map(t => t.trim()),
      followUp: followUp.split(',').map(f => f.trim())
    };

    // Update assignment communication records
    setBuddyPrograms(prev => prev.map(program => {
      const assignmentIndex = program.assignments.findIndex(a => a.id === assignmentId);
      if (assignmentIndex !== -1) {
        const updatedAssignments = [...program.assignments];
        updatedAssignments[assignmentIndex] = {
          ...updatedAssignments[assignmentIndex],
          communicationRecords: [...updatedAssignments[assignmentIndex].communicationRecords, newCommunication],
          lastCheckIn: date
        };
        
        return {
          ...program,
          assignments: updatedAssignments
        };
      }
      return program;
    }));

    setShowCommunicationModal(false);
    setCommunicationForm({
      assignmentId: null,
      type: 'weekly_checkin',
      date: '',
      duration: '',
      topics: '',
      followUp: ''
    });
    alert('Communication recorded successfully!');
  };

  // 5. Update Checklist Task
  const handleUpdateTaskStatus = (programId, taskId, newStatus) => {
    setBuddyPrograms(prev => prev.map(program => {
      if (program.id === programId) {
        const updatedResponsibilities = program.buddyResponsibilities.map(category => ({
          ...category,
          tasks: category.tasks.map(task => 
            task.id === taskId 
              ? { ...task, status: newStatus }
              : task
          )
        }));
        
        return {
          ...program,
          buddyResponsibilities: updatedResponsibilities
        };
      }
      return program;
    }));
  };

  // 6. Auto-match Buddies
  const handleAutoMatch = (programId) => {
    const program = buddyPrograms.find(p => p.id === programId);
    if (!program) return;
    
    const unassignedNewJoiners = newJoiners.filter(n => !n.assignedBuddy);
    const availableBuddies = buddies.filter(b => b.currentAssignments < b.maxAssignments);
    
    if (unassignedNewJoiners.length === 0) {
      alert('No unassigned new joiners available');
      return;
    }
    
    if (availableBuddies.length === 0) {
      alert('No available buddies for assignment');
      return;
    }
    
    const matches = [];
    
    unassignedNewJoiners.forEach(newJoiner => {
      // Find best matching buddy
      let bestMatch = null;
      let bestScore = 0;
      
      availableBuddies.forEach(buddy => {
        if (buddy.currentAssignments >= buddy.maxAssignments) return;
        
        let score = 0;
        
        // Apply program rules
        program.assignmentRules.forEach(rule => {
          if (rule.mandatory) {
            // Check mandatory rules
            switch(rule.id) {
              case 1: // Minimum tenure
                const tenureYears = parseInt(buddy.tenure);
                if (tenureYears >= 1) score += rule.weight;
                break;
              case 3: // Weekly check-ins
                score += rule.weight; // Assume buddy will follow
                break;
              case 5: // Max assignments
                if (buddy.currentAssignments < buddy.maxAssignments) score += rule.weight;
                break;
            }
          } else {
            // Check preferred rules
            switch(rule.id) {
              case 2: // Same department
                if (buddy.department === newJoiner.department) score += rule.weight;
                break;
              case 6: // Same location
                if (buddy.officeLocation === newJoiner.location) score += rule.weight;
                break;
              case 7: // Skill matching
                const commonSkills = buddy.skills?.filter(skill => 
                  newJoiner.skills?.includes(skill)
                ).length || 0;
                if (commonSkills > 0) score += rule.weight;
                break;
            }
          }
        });
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = buddy;
        }
      });
      
      if (bestMatch) {
        matches.push({
          newJoinerId: newJoiner.id,
          buddyId: bestMatch.id,
          score: bestScore
        });
      }
    });
    
    if (matches.length === 0) {
      alert('No suitable matches found');
      return;
    }
    
    // Assign all matches
    matches.forEach(match => {
      const buddy = availableBuddies.find(b => b.id === match.buddyId);
      const newJoiner = unassignedNewJoiners.find(n => n.id === match.newJoinerId);
      
      if (buddy && newJoiner) {
        // Create assignment
        const newAssignment = {
          id: Date.now(),
          buddy: {
            ...buddy,
            currentAssignments: buddy.currentAssignments + 1
          },
          newJoiner: {
            ...newJoiner,
            assignedBuddy: true
          },
          assignmentDate: new Date().toISOString().split('T')[0],
          status: 'active',
          matchScore: match.score,
          pairingReason: 'Auto-matched based on rules',
          communicationRecords: [],
          lastCheckIn: null,
          nextCheckIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          feedbackScore: 0,
          completionPercentage: 0
        };
        
        // Update program
        setBuddyPrograms(prev => prev.map(p => {
          if (p.id === programId) {
            return {
              ...p,
              assignments: [...p.assignments, newAssignment],
              totalPairs: p.totalPairs + 1,
              activePairs: p.activePairs + 1
            };
          }
          return p;
        }));
        
        // Update buddy
        setBuddies(prev => prev.map(b => 
          b.id === buddy.id 
            ? { ...b, currentAssignments: b.currentAssignments + 1, totalMentees: b.totalMentees + 1 }
            : b
        ));
        
        // Update new joiner
        setNewJoiners(prev => prev.map(n => 
          n.id === newJoiner.id 
            ? { ...n, assignedBuddy: true }
            : n
        ));
      }
    });
    
    alert(`${matches.length} new joiners auto-matched with buddies!`);
  };

  // ==================== HELPER FUNCTIONS ====================
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return <span className="badge bg-success">Active</span>;
      case 'completed': return <span className="badge bg-secondary">Completed</span>;
      case 'draft': return <span className="badge bg-light text-dark">Draft</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  const getTaskStatusBadge = (status) => {
    switch(status) {
      case 'completed': return <span className="badge bg-success">Completed</span>;
      case 'in-progress': return <span className="badge bg-warning">In Progress</span>;
      case 'pending': return <span className="badge bg-secondary">Pending</span>;
      case 'overdue': return <span className="badge bg-danger">Overdue</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  const getCommunicationTypeBadge = (type) => {
    switch(type) {
      case 'welcome_call': return <span className="badge bg-primary">Welcome Call</span>;
      case 'weekly_checkin': return <span className="badge bg-success">Weekly Check-in</span>;
      case 'welcome_meeting': return <span className="badge bg-info">Welcome Meeting</span>;
      case 'strategy_session': return <span className="badge bg-warning">Strategy Session</span>;
      default: return <span className="badge bg-secondary">{type}</span>;
    }
  };

  const calculateProgramAnalytics = (programId) => {
    const program = buddyPrograms.find(p => p.id === programId);
    if (!program) return null;
    
    return program.analytics;
  };

  // ==================== MODAL COMPONENTS ====================

  // 1. Create Program Modal (with assignment rules)
  const CreateProgramModal = () => (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Create Buddy Program</h5>
            <button className="btn-close" onClick={() => setShowCreateProgram(false)}></button>
          </div>
          
          <div className="modal-body pt-0">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Program Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={programForm.name}
                  onChange={(e) => setProgramForm({...programForm, name: e.target.value})}
                  required
                  placeholder="e.g., Q2 2024 Buddy Program"
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Program Type *</label>
                <select
                  className="form-select"
                  value={programForm.programType}
                  onChange={(e) => setProgramForm({...programForm, programType: e.target.value})}
                >
                  <option value="New Hire Buddy Program">New Hire Buddy Program</option>
                  <option value="Leadership Mentorship">Leadership Mentorship</option>
                  <option value="Cross-functional Buddy">Cross-functional Buddy</option>
                  <option value="Virtual Buddy Program">Virtual Buddy Program</option>
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
                placeholder="Describe the program objectives and scope"
              />
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  value={programForm.department}
                  onChange={(e) => setProgramForm({...programForm, department: e.target.value})}
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Location</label>
                <select
                  className="form-select"
                  value={programForm.location}
                  onChange={(e) => setProgramForm({...programForm, location: e.target.value})}
                >
                  <option value="All">All Locations</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" defaultValue="active">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={programForm.startDate}
                  onChange={(e) => setProgramForm({...programForm, startDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={programForm.endDate}
                  onChange={(e) => setProgramForm({...programForm, endDate: e.target.value})}
                />
              </div>
            </div>
            
            {/* Assignment Rules Section */}
            <div className="mb-3">
              <label className="form-label fw-bold">Assignment Rules</label>
              <div className="border rounded p-3">
                {programForm.assignmentRules.map((rule, index) => (
                  <div key={rule.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={rule.mandatory}
                        onChange={() => {
                          const newRules = [...programForm.assignmentRules];
                          newRules[index].mandatory = !newRules[index].mandatory;
                          setProgramForm({...programForm, assignmentRules: newRules});
                        }}
                      />
                      <label className="form-check-label">
                        {rule.rule}
                      </label>
                    </div>
                    <input
                      type="number"
                      className="form-control form-control-sm w-auto"
                      style={{width: '80px'}}
                      value={rule.weight}
                      onChange={(e) => {
                        const newRules = [...programForm.assignmentRules];
                        newRules[index].weight = parseInt(e.target.value);
                        setProgramForm({...programForm, assignmentRules: newRules});
                      }}
                      min="0"
                      max="100"
                      placeholder="Weight"
                    />
                  </div>
                ))}
                <button 
                  className="btn btn-sm btn-outline-primary mt-2"
                  onClick={() => {
                    const newRules = [...programForm.assignmentRules];
                    newRules.push({
                      id: newRules.length + 1,
                      rule: 'New rule',
                      mandatory: false,
                      weight: 10
                    });
                    setProgramForm({...programForm, assignmentRules: newRules});
                  }}
                >
                  + Add Rule
                </button>
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
              disabled={!programForm.name || !programForm.startDate}
            >
              Create Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. Assignment/Pairing Modal
  const AssignmentModal = () => {
    const [matchScore, setMatchScore] = useState(0);
    const buddy = assignmentForm.buddyId ? buddies.find(b => b.id === assignmentForm.buddyId) : null;
    const newJoiner = assignmentForm.newJoinerId ? newJoiners.find(n => n.id === assignmentForm.newJoinerId) : null;
    const program = assignmentForm.programId ? buddyPrograms.find(p => p.id === assignmentForm.programId) : null;
    
    const calculateMatchScore = () => {
      if (!buddy || !newJoiner || !program) return 0;
      
      let score = 0;
      
      // Apply program rules
      program.assignmentRules.forEach(rule => {
        if (rule.mandatory) {
          // Check mandatory rules
          switch(rule.id) {
            case 1: // Minimum tenure
              const tenureYears = parseInt(buddy.tenure);
              if (tenureYears >= 1) score += rule.weight;
              break;
            case 5: // Max assignments
              if (buddy.currentAssignments < buddy.maxAssignments) score += rule.weight;
              break;
          }
        } else {
          // Check preferred rules
          switch(rule.id) {
            case 2: // Same department
              if (buddy.department === newJoiner.department) score += rule.weight;
              break;
            case 6: // Same location
              if (buddy.officeLocation === newJoiner.location) score += rule.weight;
              break;
            case 7: // Skill matching
              const commonSkills = buddy.skills?.filter(skill => 
                newJoiner.skills?.includes(skill)
              ).length || 0;
              if (commonSkills > 0) score += rule.weight;
              break;
          }
        }
      });
      
      setMatchScore(score);
      return score;
    };
    
    useEffect(() => {
      if (buddy && newJoiner && program) {
        calculateMatchScore();
      }
    }, [buddy, newJoiner, program]);
    
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Buddy-New Joiner Pairing</h5>
              <button className="btn-close" onClick={() => setShowAssignmentModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card border h-100">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">Select Program</h6>
                    </div>
                    <div className="card-body">
                      <select 
                        className="form-select mb-3"
                        value={assignmentForm.programId || ''}
                        onChange={(e) => setAssignmentForm({
                          ...assignmentForm, 
                          programId: parseInt(e.target.value)
                        })}
                      >
                        <option value="">Choose program...</option>
                        {buddyPrograms.map(program => (
                          <option key={program.id} value={program.id}>
                            {program.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card border h-100">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">Select Buddy</h6>
                    </div>
                    <div className="card-body">
                      <select 
                        className="form-select mb-3"
                        value={assignmentForm.buddyId || ''}
                        onChange={(e) => setAssignmentForm({
                          ...assignmentForm, 
                          buddyId: parseInt(e.target.value)
                        })}
                      >
                        <option value="">Choose buddy...</option>
                        {buddies.filter(b => b.currentAssignments < b.maxAssignments).map(buddy => (
                          <option key={buddy.id} value={buddy.id}>
                            {buddy.name} - {buddy.department} ({buddy.currentAssignments}/{buddy.maxAssignments})
                          </option>
                        ))}
                      </select>
                      
                      {assignmentForm.buddyId && (
                        <div className="mt-2">
                          <small className="text-muted">Selected:</small>
                          <div className="fw-bold">
                            {buddy?.name} ({buddy?.department})
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card border h-100">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">Select New Joiner</h6>
                    </div>
                    <div className="card-body">
                      <select 
                        className="form-select mb-3"
                        value={assignmentForm.newJoinerId || ''}
                        onChange={(e) => setAssignmentForm({
                          ...assignmentForm, 
                          newJoinerId: parseInt(e.target.value)
                        })}
                      >
                        <option value="">Choose new joiner...</option>
                        {newJoiners.filter(n => !n.assignedBuddy).map(newJoiner => (
                          <option key={newJoiner.id} value={newJoiner.id}>
                            {newJoiner.name} - {newJoiner.department}
                          </option>
                        ))}
                      </select>
                      
                      {assignmentForm.newJoinerId && (
                        <div className="mt-2">
                          <small className="text-muted">Selected:</small>
                          <div className="fw-bold">
                            {newJoiner?.name} ({newJoiner?.department})
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {assignmentForm.buddyId && assignmentForm.newJoinerId && buddy && newJoiner && program && (
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="card border">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">Match Analysis</h6>
                      </div>
                      <div className="card-body">
                        <div className="text-center mb-3">
                          <div className="display-4 fw-bold text-primary">{matchScore}/100</div>
                          <div className="text-muted">Compatibility Score</div>
                        </div>
                        
                        <div className="progress mb-3" style={{ height: '10px' }}>
                          <div 
                            className="progress-bar" 
                            style={{ width: `${matchScore}%` }}
                          ></div>
                        </div>
                        
                        <h6 className="fw-bold mb-2">Rule Analysis:</h6>
                        <div className="small">
                          {program.assignmentRules.map(rule => {
                            let matched = false;
                            let reason = '';
                            
                            switch(rule.id) {
                              case 1: // Tenure
                                matched = parseInt(buddy.tenure) >= 1;
                                reason = `Tenure: ${buddy.tenure}`;
                                break;
                              case 2: // Same department
                                matched = buddy.department === newJoiner.department;
                                reason = `Departments: ${buddy.department} vs ${newJoiner.department}`;
                                break;
                              case 5: // Max assignments
                                matched = buddy.currentAssignments < buddy.maxAssignments;
                                reason = `Assignments: ${buddy.currentAssignments}/${buddy.maxAssignments}`;
                                break;
                              case 6: // Same location
                                matched = buddy.officeLocation === newJoiner.location;
                                reason = `Locations: ${buddy.officeLocation} vs ${newJoiner.location}`;
                                break;
                              case 7: // Skill matching
                                const commonSkills = buddy.skills?.filter(skill => 
                                  newJoiner.skills?.includes(skill)
                                ).length || 0;
                                matched = commonSkills > 0;
                                reason = `Common skills: ${commonSkills}`;
                                break;
                              default:
                                matched = true;
                                reason = 'Rule applied';
                            }
                            
                            return (
                              <div key={rule.id} className="d-flex justify-content-between mb-1">
                                <span className={matched ? 'text-success' : 'text-danger'}>
                                  {matched ? '✓' : '✗'} {rule.rule}
                                </span>
                                <span className="text-muted">{rule.weight}pts</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card border">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">Assignment Details</h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label">Assignment Date *</label>
                          <input
                            type="date"
                            className="form-control"
                            value={assignmentForm.assignmentDate}
                            onChange={(e) => setAssignmentForm({
                              ...assignmentForm, 
                              assignmentDate: e.target.value
                            })}
                            required
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Pairing Reason</label>
                          <input
                            type="text"
                            className="form-control"
                            value={assignmentForm.pairingReason}
                            onChange={(e) => setAssignmentForm({
                              ...assignmentForm, 
                              pairingReason: e.target.value
                            })}
                            placeholder="Reason for this pairing"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Notes</label>
                          <textarea
                            className="form-control"
                            rows="2"
                            value={assignmentForm.notes}
                            onChange={(e) => setAssignmentForm({
                              ...assignmentForm, 
                              notes: e.target.value
                            })}
                            placeholder="Any special instructions or notes"
                          />
                        </div>
                        
                        <div className="alert alert-info">
                          <small>
                            <i className="bi bi-info-circle me-1"></i>
                            Both buddy and new joiner will be notified via email.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowAssignmentModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleAssignBuddy}
                disabled={!assignmentForm.programId || !assignmentForm.buddyId || !assignmentForm.newJoinerId}
              >
                Create Pairing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. Feedback Modal
  const FeedbackModal = () => {
    const assignment = selectedAssignment;
    
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Submit Feedback</h5>
              <button className="btn-close" onClick={() => setShowFeedbackModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              {assignment && (
                <div className="alert alert-info mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <strong>Buddy:</strong> {assignment.buddy.name}<br />
                      <strong>New Joiner:</strong> {assignment.newJoiner.name}
                    </div>
                    <div className="col-md-6">
                      <strong>Assignment Date:</strong> {assignment.assignmentDate}<br />
                      <strong>Match Score:</strong> {assignment.matchScore}/100
                    </div>
                  </div>
                </div>
              )}
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Submitted By *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={feedbackForm.submittedBy}
                    onChange={(e) => setFeedbackForm({...feedbackForm, submittedBy: e.target.value})}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Your Role *</label>
                  <select
                    className="form-select"
                    value={feedbackForm.role}
                    onChange={(e) => setFeedbackForm({...feedbackForm, role: e.target.value})}
                  >
                    <option value="newJoiner">New Joiner</option>
                    <option value="buddy">Buddy/Mentor</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Overall Rating *</label>
                <div className="d-flex align-items-center mb-3">
                  <div className="rating-stars me-3">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className={`btn btn-link p-0 me-1 ${star <= feedbackForm.overallRating ? 'text-warning' : 'text-muted'}`}
                        onClick={() => setFeedbackForm({...feedbackForm, overallRating: star})}
                      >
                        <i className="bi bi-star-fill fs-4"></i>
                      </button>
                    ))}
                  </div>
                  <span className="fw-bold">{feedbackForm.overallRating}/5</span>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Category Ratings</label>
                {feedbackForm.categories.map((category, index) => (
                  <div key={index} className="card border mb-2">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-medium">{category.category}</span>
                        <div className="rating-stars">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              className={`btn btn-link p-0 me-1 ${star <= category.rating ? 'text-warning' : 'text-muted'}`}
                              onClick={() => {
                                const newCategories = [...feedbackForm.categories];
                                newCategories[index].rating = star;
                                setFeedbackForm({...feedbackForm, categories: newCategories});
                              }}
                            >
                              <i className="bi bi-star-fill"></i>
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        className="form-control form-control-sm"
                        rows="2"
                        placeholder="Comments for this category"
                        value={category.comment}
                        onChange={(e) => {
                          const newCategories = [...feedbackForm.categories];
                          newCategories[index].comment = e.target.value;
                          setFeedbackForm({...feedbackForm, categories: newCategories});
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-3">
                <label className="form-label">Overall Comments</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={feedbackForm.overallComment}
                  onChange={(e) => setFeedbackForm({...feedbackForm, overallComment: e.target.value})}
                  placeholder="Share your overall experience, suggestions, or any concerns"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Improvement Suggestions</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={feedbackForm.improvementSuggestions}
                  onChange={(e) => setFeedbackForm({...feedbackForm, improvementSuggestions: e.target.value})}
                  placeholder="Suggestions for program improvement"
                />
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={feedbackForm.wouldRecommend}
                  onChange={(e) => setFeedbackForm({...feedbackForm, wouldRecommend: e.target.checked})}
                />
                <label className="form-check-label">
                  Would recommend this buddy to others
                </label>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-outline-secondary" onClick={() => setShowFeedbackModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-success" 
                onClick={handleSubmitFeedback}
                disabled={!feedbackForm.submittedBy || !feedbackForm.overallRating}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Analytics Modal
  const AnalyticsModal = () => {
    const analytics = selectedProgram ? calculateProgramAnalytics(selectedProgram.id) : null;
    
    if (!analytics) return null;
    
    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Program Analytics - {selectedProgram?.name}</h5>
              <button className="btn-close" onClick={() => setShowAnalyticsModal(false)}></button>
            </div>
            
            <div className="modal-body pt-0">
              {/* Key Metrics */}
              <div className="row mb-4">
                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Total Pairs</h6>
                      <h2 className="fw-bold text-primary">{analytics.totalPairs}</h2>
                      <small className="text-muted">Active: {analytics.activePairs}</small>
                    </div>
                  </div>
                </div>
                
                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Completion Rate</h6>
                      <h2 className="fw-bold text-success">{analytics.completionRate}%</h2>
                      <small className="text-muted">{analytics.completedPairs} completed</small>
                    </div>
                  </div>
                </div>
                
                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Avg Rating</h6>
                      <h2 className="fw-bold text-warning">{analytics.averageRating}/5</h2>
                      <small className="text-muted">{analytics.feedbackCount} feedback</small>
                    </div>
                  </div>
                </div>
                
                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center">
                      <h6 className="text-muted">Avg Match Score</h6>
                      <h2 className="fw-bold text-info">{analytics.averageMatchScore}/100</h2>
                      <small className="text-muted">Pairing quality</small>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Department Distribution */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card border h-100">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">Department Distribution</h6>
                    </div>
                    <div className="card-body">
                      {Object.entries(analytics.departmentDistribution).map(([dept, count]) => (
                        <div key={dept} className="d-flex justify-content-between align-items-center mb-2">
                          <span>{dept}</span>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{width: '100px', height: '8px'}}>
                              <div 
                                className="progress-bar bg-primary" 
                                style={{ width: `${(count / analytics.totalPairs) * 100}%` }}
                              ></div>
                            </div>
                            <span className="fw-bold">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Location Distribution */}
                <div className="col-md-6">
                  <div className="card border h-100">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">Location Distribution</h6>
                    </div>
                    <div className="card-body">
                      {Object.entries(analytics.locationDistribution).map(([location, count]) => (
                        <div key={location} className="d-flex justify-content-between align-items-center mb-2">
                          <span>{location}</span>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{width: '100px', height: '8px'}}>
                              <div 
                                className="progress-bar bg-success" 
                                style={{ width: `${(count / analytics.totalPairs) * 100}%` }}
                              ></div>
                            </div>
                            <span className="fw-bold">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="row">
                <div className="col-12">
                  <div className="card border">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">Performance Metrics</h6>
                    </div>
                    <div className="card-body">
                      <div className="row text-center">
                        <div className="col-4">
                          <div className="display-6 fw-bold text-primary">{analytics.activePairs}</div>
                          <div className="text-muted">Active Pairs</div>
                        </div>
                        <div className="col-4">
                          <div className="display-6 fw-bold text-success">{analytics.completedPairs}</div>
                          <div className="text-muted">Completed Pairs</div>
                        </div>
                        <div className="col-4">
                          <div className="display-6 fw-bold text-warning">{analytics.feedbackCount}</div>
                          <div className="text-muted">Feedback Received</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer border-0">
              <button className="btn btn-secondary" onClick={() => setShowAnalyticsModal(false)}>
                Close
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-download"></i> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5. Communication Modal
  const CommunicationModal = () => (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Record Communication</h5>
            <button className="btn-close" onClick={() => setShowCommunicationModal(false)}></button>
          </div>
          
          <div className="modal-body pt-0">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Assignment *</label>
                <select 
                  className="form-select"
                  value={communicationForm.assignmentId || ''}
                  onChange={(e) => setCommunicationForm({
                    ...communicationForm, 
                    assignmentId: parseInt(e.target.value)
                  })}
                >
                  <option value="">Select assignment...</option>
                  {buddyPrograms.flatMap(program => 
                    program.assignments.map(assignment => (
                      <option key={assignment.id} value={assignment.id}>
                        {assignment.buddy.name} - {assignment.newJoiner.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Communication Type *</label>
                <select 
                  className="form-select"
                  value={communicationForm.type}
                  onChange={(e) => setCommunicationForm({
                    ...communicationForm, 
                    type: e.target.value
                  })}
                >
                  <option value="weekly_checkin">Weekly Check-in</option>
                  <option value="welcome_call">Welcome Call</option>
                  <option value="training_session">Training Session</option>
                  <option value="progress_review">Progress Review</option>
                  <option value="feedback_session">Feedback Session</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={communicationForm.date}
                  onChange={(e) => setCommunicationForm({
                    ...communicationForm, 
                    date: e.target.value
                  })}
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  value={communicationForm.duration}
                  onChange={(e) => setCommunicationForm({
                    ...communicationForm, 
                    duration: e.target.value
                  })}
                  placeholder="e.g., 30"
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Topics Discussed</label>
              <textarea
                className="form-control"
                rows="3"
                value={communicationForm.topics}
                onChange={(e) => setCommunicationForm({
                  ...communicationForm, 
                  topics: e.target.value
                })}
                placeholder="Enter topics separated by commas"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Follow-up Actions</label>
              <textarea
                className="form-control"
                rows="2"
                value={communicationForm.followUp}
                onChange={(e) => setCommunicationForm({
                  ...communicationForm, 
                  followUp: e.target.value
                })}
                placeholder="Enter follow-up actions separated by commas"
              />
            </div>
          </div>
          
          <div className="modal-footer border-0">
            <button className="btn btn-outline-secondary" onClick={() => setShowCommunicationModal(false)}>
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleRecordCommunication}
              disabled={!communicationForm.assignmentId || !communicationForm.date}
            >
              Record Communication
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== RENDER ====================
  if (loading) {
    return (
      <RecruiterDashboardLayout menuItems={menuItems} userInfo={userInfo} appName="Buddy/Mentor Assignment">
        <div className="container-fluid px-3 px-md-4 py-5">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading Buddy/Mentor Assignment Module...</p>
          </div>
        </div>
      </RecruiterDashboardLayout>
    );
  }

  return (
    
      <div className="container-fluid px-2 px-md-3 px-lg-4 py-3">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">Buddy/Mentor Assignment</h5>
            <p className="text-muted mb-0 d-none d-md-block">Facilitate successful onboarding through structured buddy programs</p>
            <p className="text-muted mb-0 d-md-none">Structured buddy programs for onboarding</p>
          </div>

          <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
            <button 
              className="btn btn-outline-primary d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowAssignmentModal(true)}
            >
              <i className="bi bi-person-plus d-none d-md-inline"></i>
              <span>Create Pairing</span>
            </button>
            
            <button 
              className="btn btn-outline-info d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0"
              onClick={() => setShowCommunicationModal(true)}
            >
              <i className="bi bi-chat-left-text d-none d-md-inline"></i>
              <span>Record Communication</span>
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

        {/* View Toggle */}
        <div className="card border mb-4">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2">
              <button 
                className={`btn ${viewMode === 'programs' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('programs')}
              >
                <i className="bi bi-people me-2"></i>
                Buddy Programs
              </button>
              <button 
                className={`btn ${viewMode === 'buddies' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setViewMode('buddies')}
              >
                <i className="bi bi-person-badge me-2"></i>
                Buddies ({buddies.length})
              </button>
              <button 
                className={`btn ${viewMode === 'newJoiners' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setViewMode('newJoiners')}
              >
                <i className="bi bi-person-plus me-2"></i>
                New Joiners ({newJoiners.filter(n => !n.assignedBuddy).length} unassigned)
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Total Programs</h6>
                    <h4 className="fw-bold mb-0">{buddyPrograms.length}</h4>
                  </div>
                  <div className="bg-primary rounded-circle p-2">
                    <i className="bi bi-people text-white fs-5"></i>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-success">
                    <i className="bi bi-arrow-up"></i> {buddyPrograms.filter(p => p.status === 'active').length} active
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Total Pairs</h6>
                    <h4 className="fw-bold mb-0">
                      {buddyPrograms.reduce((sum, program) => sum + program.totalPairs, 0)}
                    </h4>
                  </div>
                  <div className="bg-success rounded-circle p-2">
                    <i className="bi bi-person-check text-white fs-5"></i>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-success">
                    <i className="bi bi-check-circle"></i> {buddyPrograms.reduce((sum, program) => sum + program.activePairs, 0)} active
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <div className="card border h-100">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-1">Available Buddies</h6>
                    <h4 className="fw-bold mb-0">
                      {buddies.filter(b => b.currentAssignments < b.maxAssignments).length}
                    </h4>
                  </div>
                  <div className="bg-warning rounded-circle p-2">
                    <i className="bi bi-person-plus text-white fs-5"></i>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-success">
                    <i className="bi bi-people"></i> {buddies.length} total buddies
                  </small>
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
                      {buddyPrograms.length > 0 
                        ? (buddyPrograms.reduce((sum, program) => sum + program.overallRating, 0) / buddyPrograms.length).toFixed(1)
                        : '0.0'}/5
                    </h4>
                  </div>
                  <div className="bg-info rounded-circle p-2">
                    <i className="bi bi-star text-white fs-5"></i>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="text-success">
                    <i className="bi bi-graph-up"></i> Based on feedback
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content based on View Mode */}
        {viewMode === 'programs' && (
          <>
            {/* Filters and Search */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-8">
                <div className="d-flex flex-wrap gap-2">
                  <button 
                    className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Programs
                  </button>
                  <button 
                    className={`btn ${activeTab === 'active' ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                    onClick={() => setActiveTab('active')}
                  >
                    Active
                  </button>
                  <button 
                    className={`btn ${activeTab === 'completed' ? 'btn-secondary' : 'btn-outline-secondary'} btn-sm`}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completed
                  </button>
                  <button 
                    className={`btn ${activeTab === 'draft' ? 'btn-light' : 'btn-outline-light'} btn-sm`}
                    onClick={() => setActiveTab('draft')}
                  >
                    Drafts
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

            {/* Buddy Programs Table */}
            <div className="card border mb-4">
              <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="mb-2 mb-md-0 fw-bold">Buddy Programs</h6>
                <span className="badge bg-primary">{buddyPrograms.length} programs</span>
              </div>
              
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Program Name</th>
                        <th className="d-none d-md-table-cell">Type</th>
                        <th>Status</th>
                        <th>Pairs</th>
                        <th className="d-none d-md-table-cell">Rating</th>
                        <th className="d-none d-md-table-cell">Duration</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buddyPrograms.map(program => (
                        <tr key={program.id}>
                          <td>
                            <div className="fw-bold">{program.name}</div>
                            <small className="text-muted">{program.department} • {program.location}</small>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <span className="badge bg-info">{program.programType}</span>
                          </td>
                          <td>{getStatusBadge(program.status)}</td>
                          <td>
                            <div>{program.activePairs}/{program.totalPairs}</div>
                            <small className="text-muted">{program.completionRate}% complete</small>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <div className="d-flex align-items-center">
                              <span className="fw-bold me-1">{program.overallRating}</span>
                              <div className="text-warning">
                                {'★'.repeat(Math.floor(program.overallRating))}
                              </div>
                            </div>
                          </td>
                          <td className="d-none d-md-table-cell">
                            <div>{program.startDate} to {program.endDate}</div>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  setSelectedProgram(program);
                                  setShowAnalyticsModal(true);
                                }}
                                title="Analytics"
                              >
                                <i className="bi bi-graph-up"></i>
                              </button>
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => {
                                  setSelectedProgram(program);
                                  setShowAssignmentModal(true);
                                }}
                                title="Create Pairing"
                              >
                                <i className="bi bi-person-plus"></i>
                              </button>
                              <button 
                                className="btn btn-outline-warning"
                                onClick={() => handleAutoMatch(program.id)}
                                title="Auto-match"
                              >
                                <i className="bi bi-robot"></i>
                              </button>
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  setSelectedProgram(program);
                                  setShowRulesModal(true);
                                }}
                                title="Rules"
                              >
                                <i className="bi bi-list-check"></i>
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

            {/* Program Details */}
            {selectedProgram && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card border">
                    <div className="card-header bg-light">
                      <h6 className="mb-0 fw-bold">Program Details: {selectedProgram.name}</h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <h6 className="fw-bold">Assignment Rules</h6>
                          <div className="list-group list-group-flush">
                            {selectedProgram.assignmentRules.map(rule => (
                              <div key={rule.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{rule.rule}</span>
                                <span className={`badge ${rule.mandatory ? 'bg-danger' : 'bg-warning'}`}>
                                  {rule.mandatory ? 'Mandatory' : 'Preferred'} ({rule.weight}pts)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <h6 className="fw-bold">Buddy Responsibilities</h6>
                          <div className="list-group list-group-flush">
                            {selectedProgram.buddyResponsibilities.map(category => (
                              <div key={category.id} className="list-group-item">
                                <div className="fw-bold">{category.category}</div>
                                <div className="small">
                                  {category.tasks.map(task => (
                                    <div key={task.id} className="d-flex justify-content-between">
                                      <span>{task.task}</span>
                                      {getTaskStatusBadge(task.status)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <h6 className="fw-bold">Recent Feedback</h6>
                          {selectedProgram.feedback.length > 0 ? (
                            <div className="list-group list-group-flush">
                              {selectedProgram.feedback.slice(0, 3).map(fb => (
                                <div key={fb.id} className="list-group-item">
                                  <div className="d-flex justify-content-between">
                                    <span className="fw-bold">{fb.submittedBy}</span>
                                    <span className="text-warning">{fb.overallRating}/5</span>
                                  </div>
                                  <div className="small text-muted">{fb.overallComment.substring(0, 60)}...</div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="alert alert-info">No feedback yet</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Buddies View */}
        {viewMode === 'buddies' && (
          <div className="row">
            <div className="col-12">
              <div className="card border">
                <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                  <h6 className="mb-2 mb-md-0 fw-bold">Buddy Database</h6>
                  <div className="d-flex gap-2">
                    <span className="badge bg-success">
                      {buddies.filter(b => b.currentAssignments < b.maxAssignments).length} available
                    </span>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Location</th>
                          <th>Tenure</th>
                          <th>Rating</th>
                          <th>Assignments</th>
                          <th>Availability</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {buddies.map(buddy => (
                          <tr key={buddy.id}>
                            <td>
                              <div className="fw-bold">{buddy.name}</div>
                              <small className="text-muted">{buddy.role}</small>
                            </td>
                            <td>{buddy.department}</td>
                            <td>{buddy.officeLocation}</td>
                            <td>{buddy.tenure}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="fw-bold me-1">{buddy.rating}</span>
                                <div className="text-warning">
                                  {'★'.repeat(Math.floor(buddy.rating))}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="fw-bold">{buddy.currentAssignments}/{buddy.maxAssignments}</div>
                              <small className="text-muted">{buddy.totalMentees} total mentees</small>
                            </td>
                            <td>
                              {buddy.currentAssignments < buddy.maxAssignments ? (
                                <span className="badge bg-success">Available</span>
                              ) : (
                                <span className="badge bg-danger">Full</span>
                              )}
                            </td>
                            <td>
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => {
                                  setSelectedBuddy(buddy);
                                  setShowBuddyProfile(true);
                                }}
                              >
                                View
                              </button>
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

        {/* New Joiners View */}
        {viewMode === 'newJoiners' && (
          <div className="row">
            <div className="col-12">
              <div className="card border">
                <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                  <h6 className="mb-2 mb-md-0 fw-bold">New Joiners</h6>
                  <span className="badge bg-warning">
                    {newJoiners.filter(n => !n.assignedBuddy).length} unassigned
                  </span>
                </div>
                
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Location</th>
                          <th>Join Date</th>
                          <th>Onboarding Stage</th>
                          <th>Skills</th>
                          <th>Buddy Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newJoiners.map(newJoiner => (
                          <tr key={newJoiner.id}>
                            <td>
                              <div className="fw-bold">{newJoiner.name}</div>
                              <small className="text-muted">{newJoiner.role}</small>
                            </td>
                            <td>{newJoiner.department}</td>
                            <td>{newJoiner.location}</td>
                            <td>{newJoiner.joinDate}</td>
                            <td>
                              <span className="badge bg-info">{newJoiner.onboardingStage}</span>
                            </td>
                            <td>
                              <div className="d-flex flex-wrap gap-1">
                                {newJoiner.skills?.slice(0, 2).map(skill => (
                                  <span key={skill} className="badge bg-light text-dark">{skill}</span>
                                ))}
                                {newJoiner.skills?.length > 2 && (
                                  <span className="badge bg-light text-dark">+{newJoiner.skills.length - 2}</span>
                                )}
                              </div>
                            </td>
                            <td>
                              {newJoiner.assignedBuddy ? (
                                <span className="badge bg-success">Assigned</span>
                              ) : (
                                <span className="badge bg-warning">Unassigned</span>
                              )}
                            </td>
                            <td>
                              {!newJoiner.assignedBuddy && (
                                <button 
                                  className="btn btn-outline-success btn-sm"
                                  onClick={() => {
                                    setSelectedNewJoiner(newJoiner);
                                    setAssignmentForm(prev => ({
                                      ...prev,
                                      newJoinerId: newJoiner.id
                                    }));
                                    setShowAssignmentModal(true);
                                  }}
                                >
                                  Assign Buddy
                                </button>
                              )}
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

        {/* Quick Actions */}
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
                      onClick={() => setShowAssignmentModal(true)}
                    >
                      <i className="bi bi-person-plus fs-4 mb-2"></i>
                      <span className="small">Create Pairing</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-info w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowCommunicationModal(true)}
                    >
                      <i className="bi bi-chat-left-text fs-4 mb-2"></i>
                      <span className="small">Record Communication</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-warning w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => setShowFeedbackModal(true)}
                    >
                      <i className="bi bi-chat-dots fs-4 mb-2"></i>
                      <span className="small">Submit Feedback</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-danger w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => selectedProgram && setShowAnalyticsModal(true)}
                      disabled={!selectedProgram}
                    >
                      <i className="bi bi-graph-up fs-4 mb-2"></i>
                      <span className="small">View Analytics</span>
                    </button>
                  </div>
                  
                  <div className="col-6 col-md-4 col-lg-2">
                    <button 
                      className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                      onClick={() => selectedProgram && handleAutoMatch(selectedProgram.id)}
                      disabled={!selectedProgram}
                    >
                      <i className="bi bi-robot fs-4 mb-2"></i>
                      <span className="small">Auto-match</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Modals */}
        {showCreateProgram && <CreateProgramModal />}
        {showAssignmentModal && <AssignmentModal />}
        {showFeedbackModal && <FeedbackModal />}
        {showAnalyticsModal && <AnalyticsModal />}
        {showCommunicationModal && <CommunicationModal />}
      </div>
    
  );
};

export default BuddyMentorAssignment;