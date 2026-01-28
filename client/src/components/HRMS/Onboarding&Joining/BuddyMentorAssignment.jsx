// src/components/HRMS/Onboarding%26Joining/BuddyMentorAssignment.jsx
import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BuddyMentorAssignment = () => {
  // ==================== CONSTANTS ====================
  const menuItems = [
    { title: "Dashboard", link: "/recruiter/dashboard", active: false },
    { title: "Job Openings", link: "/recruiter/jobs", active: false },
    { title: "Candidates", link: "/recruiter/candidates", active: false },
    { title: "Interviews", link: "/recruiter/interviews", active: false },
    { title: "Pre-Joining", link: "/recruiter/pre-joining", active: false },
    { title: "Onboarding", link: "/recruiter/onboarding", active: true },
    { title: "Reports", link: "/recruiter/reports", active: false },
  ];

  const programTypes = [
    "New Hire Buddy Program",
    "Leadership Mentorship",
    "Cross-functional Buddy",
    "Virtual Buddy Program",
    "Technical Mentorship",
    "Executive Coaching",
  ];

  const departments = [
    "All",
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
    "Product",
    "Design",
  ];
  const locations = [
    "All",
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Remote",
    "Global",
  ];
  const communicationTypes = [
    "welcome_call",
    "weekly_checkin",
    "welcome_meeting",
    "strategy_session",
    "training_session",
    "progress_review",
    "feedback_session",
    "other",
  ];

  // ==================== INITIAL DATA ====================
  const initialBuddyPrograms = [
    {
      id: 1,
      name: "Q1 2024 New Hire Buddy Program",
      description: "Comprehensive buddy program for Q1 2024 new hires",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      programType: "New Hire Buddy Program",
      department: "All",
      location: "All",

      assignmentRules: [
        {
          id: 1,
          rule: "Buddies must have minimum 1 year tenure",
          mandatory: true,
          weight: 40,
        },
        {
          id: 2,
          rule: "Same department pairing preferred",
          mandatory: false,
          weight: 30,
        },
        {
          id: 3,
          rule: "Regular weekly check-ins required",
          mandatory: true,
          weight: 20,
        },
        {
          id: 4,
          rule: "Feedback submission every 2 weeks",
          mandatory: true,
          weight: 10,
        },
        {
          id: 5,
          rule: "Maximum 2 new joiners per buddy",
          mandatory: true,
          weight: 15,
        },
        {
          id: 6,
          rule: "Same location pairing preferred",
          mandatory: false,
          weight: 25,
        },
        {
          id: 7,
          rule: "Skill matching required for technical roles",
          mandatory: true,
          weight: 35,
        },
      ],

      assignments: [
        {
          id: 1,
          buddy: {
            id: 101,
            name: "John Davis",
            department: "Engineering",
            role: "Senior Software Engineer",
            tenure: "3 years",
            email: "john.davis@company.com",
            phone: "+91-9876543210",
            currentAssignments: 1,
            maxAssignments: 2,
            rating: 4.8,
            totalMentees: 5,
            officeLocation: "Bangalore",
            skills: ["JavaScript", "React", "Node.js"],
            availability: "Available",
            joinDate: "2020-03-15",
          },
          newJoiner: {
            id: 201,
            name: "Rahul Sharma",
            department: "Engineering",
            role: "Software Engineer",
            joinDate: "2024-01-15",
            email: "rahul.sharma@company.com",
            phone: "+91-9876543220",
            location: "Bangalore",
            onboardingStage: "Week 2",
            background: "Fresh graduate from IIT Delhi",
            skills: ["JavaScript", "Python", "React"],
            assignedBuddy: true,
          },
          assignmentDate: "2024-01-15",
          status: "active",
          matchScore: 85,
          pairingReason: "Same department and location",

          communicationRecords: [
            {
              id: 1,
              type: "welcome_call",
              date: "2024-01-15",
              duration: "30 mins",
              topics: ["Introduction", "Team Structure", "Tools"],
              followUp: ["Share tool access"],
              notes: "Good introductory call",
            },
            {
              id: 2,
              type: "weekly_checkin",
              date: "2024-01-22",
              duration: "45 mins",
              topics: ["Progress review", "Challenges"],
              followUp: ["Schedule training session"],
              notes: "Facing challenges with CI/CD setup",
            },
          ],

          lastCheckIn: "2024-03-15",
          nextCheckIn: "2024-03-22",
          feedbackScore: 4.5,
          completionPercentage: 60,
          milestones: [
            {
              id: 1,
              name: "Initial onboarding",
              completed: true,
              date: "2024-01-22",
            },
            {
              id: 2,
              name: "First project assignment",
              completed: true,
              date: "2024-02-15",
            },
            {
              id: 3,
              name: "Mid-program review",
              completed: false,
              date: "2024-03-15",
            },
          ],
        },
        {
          id: 2,
          buddy: {
            id: 102,
            name: "Priya Patel",
            department: "Marketing",
            role: "Marketing Manager",
            tenure: "2 years",
            email: "priya.patel@company.com",
            phone: "+91-9876543211",
            currentAssignments: 2,
            maxAssignments: 3,
            rating: 4.6,
            totalMentees: 8,
            officeLocation: "Delhi",
            skills: ["Digital Marketing", "Content Strategy", "SEO"],
            availability: "Available",
            joinDate: "2021-06-10",
          },
          newJoiner: {
            id: 202,
            name: "Anjali Singh",
            department: "Marketing",
            role: "Marketing Executive",
            joinDate: "2024-01-20",
            email: "anjali.singh@company.com",
            phone: "+91-9876543221",
            location: "Delhi",
            onboardingStage: "Week 3",
            background: "2 years experience in digital marketing",
            skills: ["Social Media", "Content Writing", "Google Analytics"],
            assignedBuddy: true,
          },
          assignmentDate: "2024-01-20",
          status: "active",
          matchScore: 90,
          pairingReason: "Same department and marketing expertise",

          communicationRecords: [
            {
              id: 1,
              type: "welcome_meeting",
              date: "2024-01-20",
              duration: "60 mins",
              topics: ["Marketing processes", "Campaigns", "Tools"],
              followUp: [
                "Share campaign templates",
                "Schedule analytics training",
              ],
              notes: "Very enthusiastic new joiner",
            },
          ],

          lastCheckIn: "2024-03-18",
          nextCheckIn: "2024-03-25",
          feedbackScore: 4.8,
          completionPercentage: 75,
          milestones: [
            {
              id: 1,
              name: "Campaign overview",
              completed: true,
              date: "2024-01-27",
            },
            {
              id: 2,
              name: "Tool training",
              completed: true,
              date: "2024-02-10",
            },
            {
              id: 3,
              name: "First campaign assignment",
              completed: false,
              date: "2024-03-20",
            },
          ],
        },
      ],

      buddyResponsibilities: [
        {
          id: 1,
          category: "Week 1",
          tasks: [
            {
              id: 1,
              task: "Initial welcome meeting",
              description: "Introduce company culture and team",
              deadline: "Day 1",
              status: "completed",
              priority: "high",
            },
            {
              id: 2,
              task: "Tool access setup",
              description: "Help with email, Slack, and other tools",
              deadline: "Day 2",
              status: "completed",
              priority: "high",
            },
            {
              id: 3,
              task: "Team introductions",
              description: "Introduce to immediate team members",
              deadline: "Day 3",
              status: "completed",
              priority: "medium",
            },
          ],
        },
        {
          id: 2,
          category: "Week 2",
          tasks: [
            {
              id: 4,
              task: "Process walkthrough",
              description: "Explain team processes and workflows",
              deadline: "Week 2",
              status: "in-progress",
              priority: "high",
            },
            {
              id: 5,
              task: "Tools training",
              description: "Train on specific job-related tools",
              deadline: "Week 2",
              status: "in-progress",
              priority: "medium",
            },
            {
              id: 6,
              task: "First task assignment",
              description: "Assign and guide through first task",
              deadline: "Week 2",
              status: "pending",
              priority: "medium",
            },
          ],
        },
        {
          id: 3,
          category: "Month 1",
          tasks: [
            {
              id: 7,
              task: "First month review",
              description: "Review progress and address concerns",
              deadline: "Month 1",
              status: "pending",
              priority: "high",
            },
            {
              id: 8,
              task: "Career path discussion",
              description: "Discuss growth opportunities",
              deadline: "Month 1",
              status: "pending",
              priority: "low",
            },
            {
              id: 9,
              task: "Feedback collection",
              description: "Collect formal feedback from new joiner",
              deadline: "Month 1",
              status: "pending",
              priority: "medium",
            },
          ],
        },
      ],

      feedback: [
        {
          id: 1,
          assignmentId: 1,
          submittedBy: "Rahul Sharma",
          role: "newJoiner",
          date: "2024-02-15",
          overallRating: 4.5,
          categories: [
            {
              category: "Responsiveness",
              rating: 5,
              comment: "Always available when needed",
            },
            {
              category: "Knowledge Sharing",
              rating: 4,
              comment: "Very knowledgeable about processes",
            },
            {
              category: "Support",
              rating: 5,
              comment: "Extremely supportive throughout",
            },
            {
              category: "Communication",
              rating: 4,
              comment: "Clear and effective communication",
            },
          ],
          overallComment:
            "John has been very supportive during my onboarding. He made the transition smooth.",
          improvementSuggestions: "More structured check-ins would be helpful",
          wouldRecommend: true,
          anonymous: false,
        },
        {
          id: 2,
          assignmentId: 2,
          submittedBy: "Priya Patel",
          role: "buddy",
          date: "2024-02-20",
          overallRating: 4.8,
          categories: [
            {
              category: "Learning Speed",
              rating: 5,
              comment: "Quick to learn and adapt",
            },
            {
              category: "Proactiveness",
              rating: 5,
              comment: "Very proactive in seeking help",
            },
            {
              category: "Engagement",
              rating: 4,
              comment: "Engaged in all discussions",
            },
            {
              category: "Initiative",
              rating: 5,
              comment: "Takes initiative on tasks",
            },
          ],
          overallComment:
            "Anjali is quick to learn and adapt to our marketing processes.",
          improvementSuggestions: "None",
          wouldRecommend: true,
          anonymous: false,
        },
      ],

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
          HR: 1,
        },
        locationDistribution: {
          Bangalore: 9,
          Delhi: 4,
          Mumbai: 2,
        },
        satisfactionScore: 4.6,
        timeToProductivity: "28 days",
      },

      totalPairs: 15,
      activePairs: 12,
      completionRate: 80,
      overallRating: 4.7,
      createdBy: "Sarah Johnson",
      createdAt: "2023-12-15",
    },
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
  const [showEditProgramModal, setShowEditProgramModal] = useState(false);
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);

  // Selected items
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [selectedNewJoiner, setSelectedNewJoiner] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Form states
  const [programForm, setProgramForm] = useState({
    name: "",
    description: "",
    programType: "New Hire Buddy Program",
    department: "All",
    location: "All",
    startDate: "",
    endDate: "",
    status: "active",
    assignmentRules: [
      {
        id: 1,
        rule: "Buddies must have minimum 1 year tenure",
        mandatory: true,
        weight: 40,
      },
      {
        id: 2,
        rule: "Same department pairing preferred",
        mandatory: false,
        weight: 30,
      },
    ],
  });

  const [assignmentForm, setAssignmentForm] = useState({
    programId: null,
    buddyId: null,
    newJoinerId: null,
    assignmentDate: new Date().toISOString().split("T")[0],
    notes: "",
    pairingReason: "",
  });

  const [feedbackForm, setFeedbackForm] = useState({
    assignmentId: null,
    submittedBy: "",
    role: "newJoiner",
    overallRating: 0,
    categories: [
      { category: "Responsiveness", rating: 0, comment: "" },
      { category: "Knowledge Sharing", rating: 0, comment: "" },
      { category: "Support", rating: 0, comment: "" },
      { category: "Communication", rating: 0, comment: "" },
    ],
    overallComment: "",
    improvementSuggestions: "",
    wouldRecommend: true,
    anonymous: false,
  });

  const [communicationForm, setCommunicationForm] = useState({
    assignmentId: null,
    type: "weekly_checkin",
    date: new Date().toISOString().split("T")[0],
    duration: "",
    topics: "",
    followUp: "",
    notes: "",
  });

  const [bulkAssignForm, setBulkAssignForm] = useState({
    programId: null,
    assignments: [],
  });

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [viewMode, setViewMode] = useState("programs");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // ==================== INITIALIZE DATA ====================
  useEffect(() => {
    const initializeData = () => {
      // Extract buddies and new joiners from programs
      const allBuddies = [];
      const allNewJoiners = [];

      buddyPrograms.forEach((program) => {
        program.assignments.forEach((assignment) => {
          if (!allBuddies.find((b) => b.id === assignment.buddy.id)) {
            allBuddies.push(assignment.buddy);
          }
          if (!allNewJoiners.find((n) => n.id === assignment.newJoiner.id)) {
            allNewJoiners.push(assignment.newJoiner);
          }
        });
      });

      // Add more sample buddies
      const additionalBuddies = [
        {
          id: 103,
          name: "Michael Chen",
          department: "Engineering",
          role: "Tech Lead",
          tenure: "5 years",
          email: "michael.chen@company.com",
          phone: "+91-9876543212",
          currentAssignments: 1,
          maxAssignments: 2,
          rating: 4.9,
          totalMentees: 12,
          officeLocation: "Bangalore",
          skills: ["Java", "Spring Boot", "Microservices", "AWS"],
          availability: "Available",
          joinDate: "2018-08-20",
        },
        {
          id: 104,
          name: "Lisa Wang",
          department: "HR",
          role: "HR Business Partner",
          tenure: "5 years",
          email: "lisa.wang@company.com",
          phone: "+91-9876543213",
          currentAssignments: 0,
          maxAssignments: 3,
          rating: 4.7,
          totalMentees: 10,
          officeLocation: "Bangalore",
          skills: ["Employee Relations", "Policy Guidance", "Onboarding"],
          availability: "Available",
          joinDate: "2018-11-15",
        },
        {
          id: 105,
          name: "David Wilson",
          department: "Finance",
          role: "Finance Manager",
          tenure: "6 years",
          email: "david.wilson@company.com",
          phone: "+91-9876543214",
          currentAssignments: 1,
          maxAssignments: 2,
          rating: 4.5,
          totalMentees: 6,
          officeLocation: "Delhi",
          skills: ["Financial Planning", "Budget Management", "Forecasting"],
          availability: "Available",
          joinDate: "2017-05-10",
        },
      ];

      // Add unassigned new joiners
      const unassignedNewJoiners = [
        {
          id: 203,
          name: "Sneha Gupta",
          department: "HR",
          role: "HR Executive",
          joinDate: "2024-02-15",
          email: "sneha.gupta@company.com",
          phone: "+91-9876543223",
          location: "Bangalore",
          onboardingStage: "Week 1",
          background: "MBA in HR from XLRI",
          skills: ["Recruitment", "Employee Engagement", "Policy Making"],
          assignedBuddy: false,
        },
        {
          id: 204,
          name: "Rajesh Nair",
          department: "Finance",
          role: "Financial Analyst",
          joinDate: "2024-02-20",
          email: "rajesh.nair@company.com",
          phone: "+91-9876543224",
          location: "Delhi",
          onboardingStage: "Week 1",
          background: "CA with 4 years experience",
          skills: ["Financial Analysis", "Excel", "Reporting"],
          assignedBuddy: false,
        },
        {
          id: 205,
          name: "Amit Kumar",
          department: "Engineering",
          role: "Frontend Developer",
          joinDate: "2024-02-25",
          email: "amit.kumar@company.com",
          phone: "+91-9876543225",
          location: "Bangalore",
          onboardingStage: "Week 1",
          background: "2 years React experience",
          skills: ["React", "TypeScript", "Next.js", "CSS"],
          assignedBuddy: false,
        },
      ];

      setBuddies([...allBuddies, ...additionalBuddies]);
      setNewJoiners([...allNewJoiners, ...unassignedNewJoiners]);

      // Set default selected program
      if (buddyPrograms.length > 0 && !selectedProgram) {
        setSelectedProgram(buddyPrograms[0]);
      }

      setLoading(false);
    };

    initializeData();
  }, []);

  // ==================== HELPER FUNCTIONS ====================
  const getStatusBadge = (status) => {
    const badges = {
      active: <span className="badge bg-success">Active</span>,
      completed: <span className="badge bg-secondary">Completed</span>,
      draft: <span className="badge bg-light text-dark">Draft</span>,
      archived: <span className="badge bg-dark">Archived</span>,
      paused: <span className="badge bg-warning">Paused</span>,
    };
    return badges[status] || <span className="badge bg-info">{status}</span>;
  };

  const getTaskStatusBadge = (status) => {
    const badges = {
      completed: <span className="badge bg-success">Completed</span>,
      "in-progress": <span className="badge bg-warning">In Progress</span>,
      pending: <span className="badge bg-secondary">Pending</span>,
      overdue: <span className="badge bg-danger">Overdue</span>,
      cancelled: <span className="badge bg-dark">Cancelled</span>,
    };
    return badges[status] || <span className="badge bg-info">{status}</span>;
  };

  const getCommunicationTypeBadge = (type) => {
    const badges = {
      welcome_call: <span className="badge bg-primary">Welcome Call</span>,
      weekly_checkin: <span className="badge bg-success">Weekly Check-in</span>,
      welcome_meeting: <span className="badge bg-info">Welcome Meeting</span>,
      strategy_session: (
        <span className="badge bg-warning">Strategy Session</span>
      ),
      training_session: (
        <span className="badge bg-purple">Training Session</span>
      ),
      progress_review: <span className="badge bg-orange">Progress Review</span>,
      feedback_session: <span className="badge bg-teal">Feedback Session</span>,
    };
    return badges[type] || <span className="badge bg-secondary">{type}</span>;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: <span className="badge bg-danger">High</span>,
      medium: <span className="badge bg-warning">Medium</span>,
      low: <span className="badge bg-info">Low</span>,
    };
    return (
      badges[priority] || <span className="badge bg-secondary">{priority}</span>
    );
  };

  const calculateMatchScore = (buddy, newJoiner, program) => {
    if (!buddy || !newJoiner || !program) return 0;

    let score = 0;
    let maxPossibleScore = 0;

    program.assignmentRules.forEach((rule) => {
      maxPossibleScore += rule.weight;

      let ruleMatched = false;

      switch (rule.id) {
        case 1: // Minimum tenure
          const tenureYears = parseInt(buddy.tenure);
          ruleMatched = tenureYears >= 1;
          break;
        case 2: // Same department
          ruleMatched = buddy.department === newJoiner.department;
          break;
        case 3: // Weekly check-ins
          ruleMatched = true; // Assume buddy will follow
          break;
        case 4: // Feedback submission
          ruleMatched = true; // Assume buddy will follow
          break;
        case 5: // Max assignments
          ruleMatched = buddy.currentAssignments < buddy.maxAssignments;
          break;
        case 6: // Same location
          ruleMatched = buddy.officeLocation === newJoiner.location;
          break;
        case 7: // Skill matching
          const commonSkills =
            buddy.skills?.filter((skill) => newJoiner.skills?.includes(skill))
              .length || 0;
          ruleMatched = commonSkills > 0;
          break;
        default:
          ruleMatched = true;
      }

      if (ruleMatched) {
        score += rule.mandatory ? rule.weight : rule.weight;
      }
    });

    // Calculate normalized score (0-100)
    const normalizedScore =
      maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;

    return normalizedScore;
  };

  const filterPrograms = () => {
    let filtered = buddyPrograms;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((program) => program.status === activeTab);
    }

    // Filter by department
    if (filterDepartment !== "all") {
      filtered = filtered.filter(
        (program) =>
          program.department === filterDepartment ||
          program.department === "All",
      );
    }

    // Filter by location
    if (filterLocation !== "all") {
      filtered = filtered.filter(
        (program) =>
          program.location === filterLocation || program.location === "All",
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (program) =>
          program.name.toLowerCase().includes(term) ||
          program.description.toLowerCase().includes(term) ||
          program.programType.toLowerCase().includes(term),
      );
    }

    return filtered;
  };

  // ==================== HANDLERS ====================

  // 1. Create Buddy Program
  const handleCreateProgram = () => {
    if (!programForm.name || !programForm.startDate) {
      alert("Please fill in all required fields");
      return;
    }

    const newProgram = {
      id: Date.now(),
      ...programForm,
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
        locationDistribution: {},
        satisfactionScore: 0,
        timeToProductivity: "N/A",
      },
      totalPairs: 0,
      activePairs: 0,
      completionRate: 0,
      overallRating: 0,
      createdBy: "Sarah Johnson",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setBuddyPrograms([...buddyPrograms, newProgram]);
    setShowCreateProgram(false);
    setProgramForm({
      name: "",
      description: "",
      programType: "New Hire Buddy Program",
      department: "All",
      location: "All",
      startDate: "",
      endDate: "",
      status: "active",
      assignmentRules: [
        {
          id: 1,
          rule: "Buddies must have minimum 1 year tenure",
          mandatory: true,
          weight: 40,
        },
        {
          id: 2,
          rule: "Same department pairing preferred",
          mandatory: false,
          weight: 30,
        },
      ],
    });

    alert("Buddy program created successfully!");
  };

  // 2. Assign Buddy to New Joiner
  const handleAssignBuddy = () => {
    const {
      programId,
      buddyId,
      newJoinerId,
      assignmentDate,
      notes,
      pairingReason,
    } = assignmentForm;

    if (!programId || !buddyId || !newJoinerId) {
      alert("Please select program, buddy, and new joiner");
      return;
    }

    const program = buddyPrograms.find((p) => p.id === programId);
    const buddy = buddies.find((b) => b.id === buddyId);
    const newJoiner = newJoiners.find((n) => n.id === newJoinerId);

    if (!program || !buddy || !newJoiner) {
      alert("Invalid selection");
      return;
    }

    if (buddy.currentAssignments >= buddy.maxAssignments) {
      alert("Selected buddy has reached maximum assignments");
      return;
    }

    if (newJoiner.assignedBuddy) {
      alert("This new joiner already has a buddy assigned");
      return;
    }

    // Calculate match score
    const matchScore = calculateMatchScore(buddy, newJoiner, program);

    // Create new assignment
    const newAssignment = {
      id: Date.now(),
      buddy: {
        ...buddy,
        currentAssignments: buddy.currentAssignments + 1,
      },
      newJoiner: {
        ...newJoiner,
        assignedBuddy: true,
      },
      assignmentDate: assignmentDate || new Date().toISOString().split("T")[0],
      status: "active",
      matchScore,
      pairingReason: pairingReason || "Manual assignment",
      communicationRecords: [],
      lastCheckIn: null,
      nextCheckIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      feedbackScore: 0,
      completionPercentage: 0,
      milestones: [
        { id: 1, name: "Initial onboarding", completed: false, date: null },
        { id: 2, name: "First task completion", completed: false, date: null },
        { id: 3, name: "Mid-program review", completed: false, date: null },
      ],
      notes,
    };

    // Update program
    setBuddyPrograms((prev) =>
      prev.map((p) => {
        if (p.id === programId) {
          const updatedAssignments = [...p.assignments, newAssignment];
          const activePairs = updatedAssignments.filter(
            (a) => a.status === "active",
          ).length;
          const totalPairs = updatedAssignments.length;
          const avgMatchScore =
            updatedAssignments.reduce((sum, a) => sum + a.matchScore, 0) /
            totalPairs;

          return {
            ...p,
            assignments: updatedAssignments,
            totalPairs,
            activePairs,
            analytics: {
              ...p.analytics,
              totalPairs,
              activePairs,
              averageMatchScore: avgMatchScore,
              departmentDistribution: {
                ...p.analytics.departmentDistribution,
                [newJoiner.department]:
                  (p.analytics.departmentDistribution[newJoiner.department] ||
                    0) + 1,
              },
              locationDistribution: {
                ...p.analytics.locationDistribution,
                [newJoiner.location]:
                  (p.analytics.locationDistribution[newJoiner.location] || 0) +
                  1,
              },
            },
          };
        }
        return p;
      }),
    );

    // Update buddy assignments count
    setBuddies((prev) =>
      prev.map((b) =>
        b.id === buddyId
          ? {
              ...b,
              currentAssignments: b.currentAssignments + 1,
              totalMentees: b.totalMentees + 1,
            }
          : b,
      ),
    );

    // Update new joiner status
    setNewJoiners((prev) =>
      prev.map((n) =>
        n.id === newJoinerId ? { ...n, assignedBuddy: true } : n,
      ),
    );

    setShowAssignmentModal(false);
    setAssignmentForm({
      programId: null,
      buddyId: null,
      newJoinerId: null,
      assignmentDate: new Date().toISOString().split("T")[0],
      notes: "",
      pairingReason: "",
    });
    alert("Buddy assigned successfully!");
  };

  // 3. Submit Feedback
  const handleSubmitFeedback = () => {
    const {
      assignmentId,
      submittedBy,
      role,
      overallRating,
      categories,
      overallComment,
    } = feedbackForm;

    if (!assignmentId || !submittedBy || !overallRating) {
      alert("Please fill all required fields");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      assignmentId,
      submittedBy,
      role,
      date: new Date().toISOString().split("T")[0],
      overallRating: parseFloat(overallRating),
      categories: categories.map((cat) => ({
        ...cat,
        rating: parseFloat(cat.rating),
      })),
      overallComment,
      improvementSuggestions: feedbackForm.improvementSuggestions,
      wouldRecommend: feedbackForm.wouldRecommend,
      anonymous: feedbackForm.anonymous,
    };

    // Find program containing the assignment
    let programId = null;
    const updatedPrograms = buddyPrograms.map((program) => {
      const assignment = program.assignments.find((a) => a.id === assignmentId);
      if (assignment) {
        programId = program.id;

        // Update assignment feedback score
        const updatedAssignments = program.assignments.map((a) =>
          a.id === assignmentId
            ? { ...a, feedbackScore: parseFloat(overallRating) }
            : a,
        );

        // Calculate new average rating
        const allFeedback = [...program.feedback, newFeedback];
        const totalRating = allFeedback.reduce(
          (sum, fb) => sum + fb.overallRating,
          0,
        );
        const averageRating = totalRating / allFeedback.length;

        // Calculate category averages
        const categoryAverages = {};
        categories.forEach((cat) => {
          const categoryRatings = allFeedback.flatMap((fb) =>
            fb.categories
              .filter((c) => c.category === cat.category)
              .map((c) => c.rating),
          );
          categoryAverages[cat.category] =
            categoryRatings.length > 0
              ? categoryRatings.reduce((sum, r) => sum + r, 0) /
                categoryRatings.length
              : 0;
        });

        return {
          ...program,
          assignments: updatedAssignments,
          feedback: allFeedback,
          overallRating: parseFloat(averageRating.toFixed(1)),
          analytics: {
            ...program.analytics,
            averageRating: parseFloat(averageRating.toFixed(1)),
            feedbackCount: allFeedback.length,
            satisfactionScore: parseFloat(
              (
                (program.analytics.satisfactionScore *
                  program.analytics.feedbackCount +
                  overallRating) /
                (program.analytics.feedbackCount + 1)
              ).toFixed(1),
            ),
          },
        };
      }
      return program;
    });

    setBuddyPrograms(updatedPrograms);

    // Update buddy rating if feedback is from new joiner
    if (role === "newJoiner") {
      const program = buddyPrograms.find((p) => p.id === programId);
      const assignment = program?.assignments.find(
        (a) => a.id === assignmentId,
      );
      if (assignment) {
        setBuddies((prev) =>
          prev.map((b) => {
            if (b.id === assignment.buddy.id) {
              const newRating =
                (b.rating * b.totalMentees + overallRating) /
                (b.totalMentees + 1);
              return { ...b, rating: parseFloat(newRating.toFixed(1)) };
            }
            return b;
          }),
        );
      }
    }

    setShowFeedbackModal(false);
    setFeedbackForm({
      assignmentId: null,
      submittedBy: "",
      role: "newJoiner",
      overallRating: 0,
      categories: [
        { category: "Responsiveness", rating: 0, comment: "" },
        { category: "Knowledge Sharing", rating: 0, comment: "" },
        { category: "Support", rating: 0, comment: "" },
        { category: "Communication", rating: 0, comment: "" },
      ],
      overallComment: "",
      improvementSuggestions: "",
      wouldRecommend: true,
      anonymous: false,
    });
    alert("Feedback submitted successfully!");
  };

  // 4. Record Communication
  const handleRecordCommunication = () => {
    const { assignmentId, type, date, duration, topics, followUp, notes } =
      communicationForm;

    if (!assignmentId || !date) {
      alert("Please fill required fields");
      return;
    }

    const newCommunication = {
      id: Date.now(),
      type,
      date,
      duration: duration || "N/A",
      topics: topics
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      followUp: followUp
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
      notes: notes || "",
    };

    // Find and update assignment
    const updatedPrograms = buddyPrograms.map((program) => {
      const assignmentIndex = program.assignments.findIndex(
        (a) => a.id === assignmentId,
      );
      if (assignmentIndex !== -1) {
        const updatedAssignments = [...program.assignments];
        const assignment = updatedAssignments[assignmentIndex];

        // Calculate next check-in date (7 days from now)
        const nextCheckIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];

        updatedAssignments[assignmentIndex] = {
          ...assignment,
          communicationRecords: [
            ...assignment.communicationRecords,
            newCommunication,
          ],
          lastCheckIn: date,
          nextCheckIn: nextCheckIn,
          // Update progress based on communication type
          completionPercentage: Math.min(
            assignment.completionPercentage + 5,
            100,
          ),
        };

        return {
          ...program,
          assignments: updatedAssignments,
        };
      }
      return program;
    });

    setBuddyPrograms(updatedPrograms);
    setShowCommunicationModal(false);
    setCommunicationForm({
      assignmentId: null,
      type: "weekly_checkin",
      date: new Date().toISOString().split("T")[0],
      duration: "",
      topics: "",
      followUp: "",
      notes: "",
    });
    alert("Communication recorded successfully!");
  };

  // 5. Update Task Status
  const handleUpdateTaskStatus = (programId, taskId, newStatus) => {
    setBuddyPrograms((prev) =>
      prev.map((program) => {
        if (program.id === programId) {
          const updatedResponsibilities = program.buddyResponsibilities.map(
            (category) => ({
              ...category,
              tasks: category.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task,
              ),
            }),
          );

          return {
            ...program,
            buddyResponsibilities: updatedResponsibilities,
          };
        }
        return program;
      }),
    );
  };

  // 6. Auto-match Buddies
  const handleAutoMatch = (programId) => {
    const program = buddyPrograms.find((p) => p.id === programId);
    if (!program) return;

    const unassignedNewJoiners = newJoiners.filter((n) => !n.assignedBuddy);
    const availableBuddies = buddies.filter(
      (b) => b.currentAssignments < b.maxAssignments,
    );

    if (unassignedNewJoiners.length === 0) {
      alert("No unassigned new joiners available");
      return;
    }

    if (availableBuddies.length === 0) {
      alert("No available buddies for assignment");
      return;
    }

    const matches = [];

    unassignedNewJoiners.forEach((newJoiner) => {
      let bestMatch = null;
      let bestScore = 0;

      availableBuddies.forEach((buddy) => {
        if (buddy.currentAssignments >= buddy.maxAssignments) return;

        const score = calculateMatchScore(buddy, newJoiner, program);

        if (score > bestScore) {
          bestScore = score;
          bestMatch = buddy;
        }
      });

      if (bestMatch && bestScore >= 60) {
        // Minimum threshold
        matches.push({
          newJoinerId: newJoiner.id,
          buddyId: bestMatch.id,
          score: bestScore,
        });

        // Update buddy's current assignments count
        bestMatch.currentAssignments += 1;
      }
    });

    if (matches.length === 0) {
      alert("No suitable matches found (minimum 60% match score required)");
      return;
    }

    // Process matches
    matches.forEach((match) => {
      const buddy = availableBuddies.find((b) => b.id === match.buddyId);
      const newJoiner = unassignedNewJoiners.find(
        (n) => n.id === match.newJoinerId,
      );

      if (buddy && newJoiner) {
        const newAssignment = {
          id: Date.now(),
          buddy: { ...buddy, currentAssignments: buddy.currentAssignments },
          newJoiner: { ...newJoiner, assignedBuddy: true },
          assignmentDate: new Date().toISOString().split("T")[0],
          status: "active",
          matchScore: match.score,
          pairingReason: `Auto-matched based on ${match.score}% compatibility`,
          communicationRecords: [],
          lastCheckIn: null,
          nextCheckIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          feedbackScore: 0,
          completionPercentage: 0,
          milestones: [
            { id: 1, name: "Initial onboarding", completed: false, date: null },
            {
              id: 2,
              name: "First task completion",
              completed: false,
              date: null,
            },
            { id: 3, name: "Mid-program review", completed: false, date: null },
          ],
        };

        // Update program
        setBuddyPrograms((prev) =>
          prev.map((p) => {
            if (p.id === programId) {
              return {
                ...p,
                assignments: [...p.assignments, newAssignment],
                totalPairs: p.totalPairs + 1,
                activePairs: p.activePairs + 1,
                analytics: {
                  ...p.analytics,
                  totalPairs: p.analytics.totalPairs + 1,
                  activePairs: p.analytics.activePairs + 1,
                  averageMatchScore:
                    (p.analytics.averageMatchScore * p.analytics.totalPairs +
                      match.score) /
                    (p.analytics.totalPairs + 1),
                  departmentDistribution: {
                    ...p.analytics.departmentDistribution,
                    [newJoiner.department]:
                      (p.analytics.departmentDistribution[
                        newJoiner.department
                      ] || 0) + 1,
                  },
                  locationDistribution: {
                    ...p.analytics.locationDistribution,
                    [newJoiner.location]:
                      (p.analytics.locationDistribution[newJoiner.location] ||
                        0) + 1,
                  },
                },
              };
            }
            return p;
          }),
        );

        // Update buddy
        setBuddies((prev) =>
          prev.map((b) =>
            b.id === buddy.id
              ? {
                  ...b,
                  currentAssignments: b.currentAssignments + 1,
                  totalMentees: b.totalMentees + 1,
                }
              : b,
          ),
        );

        // Update new joiner
        setNewJoiners((prev) =>
          prev.map((n) =>
            n.id === newJoiner.id ? { ...n, assignedBuddy: true } : n,
          ),
        );
      }
    });

    alert(`${matches.length} new joiners auto-matched with buddies!`);
  };

  // 7. Handle Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // 8. Export Data
  const handleExportData = (type) => {
    let data, filename, contentType;

    switch (type) {
      case "programs":
        data = buddyPrograms;
        filename = "buddy-programs.json";
        contentType = "application/json";
        break;
      case "assignments":
        const allAssignments = buddyPrograms.flatMap((p) => p.assignments);
        data = allAssignments;
        filename = "buddy-assignments.json";
        contentType = "application/json";
        break;
      case "analytics":
        data = buddyPrograms.map((p) => p.analytics);
        filename = "program-analytics.json";
        contentType = "application/json";
        break;
      default:
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: contentType,
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ==================== MODAL COMPONENTS ====================

  // 1. Create Program Modal
  const CreateProgramModal = () => (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg p-1">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Create Buddy Program</h5>
            <button
              className="btn-close"
              onClick={() => setShowCreateProgram(false)}
            ></button>
          </div>

          <div className="modal-body py-2" style={{ maxHeight: "75vh", overflowY: "auto" }} >
            <div className="row g-2">
              <div className="col-md-6">
                <label className="form-label">Program Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={programForm.name}
                  onChange={(e) =>
                    setProgramForm({ ...programForm, name: e.target.value })
                  }
                  required
                  placeholder="e.g., Q2 2024 Buddy Program"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Program Type *</label>
                <select
                  className="form-select"
                  value={programForm.programType}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      programType: e.target.value,
                    })
                  }
                >
                  {programTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={programForm.description}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the program objectives, scope, and expected outcomes"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  value={programForm.department}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      department: e.target.value,
                    })
                  }
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Location</label>
                <select
                  className="form-select"
                  value={programForm.location}
                  onChange={(e) =>
                    setProgramForm({ ...programForm, location: e.target.value })
                  }
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Start Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={programForm.startDate}
                  onChange={(e) =>
                    setProgramForm({
                      ...programForm,
                      startDate: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={programForm.endDate}
                  onChange={(e) =>
                    setProgramForm({ ...programForm, endDate: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={programForm.status}
                  onChange={(e) =>
                    setProgramForm({ ...programForm, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>

            {/* Assignment Rules */}
            <div className="mt-4">
              <label className="form-label fw-bold">Assignment Rules</label>
              <div className="border rounded p-3 bg-light">
                {programForm.assignmentRules.map((rule, index) => (
                  <div
                    key={rule.id}
                    className="d-flex align-items-center gap-2 mb-2"
                  >
                    <div className="flex-grow-1">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={rule.rule}
                        onChange={(e) => {
                          const newRules = [...programForm.assignmentRules];
                          newRules[index].rule = e.target.value;
                          setProgramForm({
                            ...programForm,
                            assignmentRules: newRules,
                          });
                        }}
                        placeholder="Rule description"
                      />
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={rule.mandatory}
                        onChange={() => {
                          const newRules = [...programForm.assignmentRules];
                          newRules[index].mandatory =
                            !newRules[index].mandatory;
                          setProgramForm({
                            ...programForm,
                            assignmentRules: newRules,
                          });
                        }}
                      />
                      <label className="form-check-label small">
                        Mandatory
                      </label>
                    </div>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      style={{ width: "80px" }}
                      value={rule.weight}
                      onChange={(e) => {
                        const newRules = [...programForm.assignmentRules];
                        newRules[index].weight = parseInt(e.target.value) || 0;
                        setProgramForm({
                          ...programForm,
                          assignmentRules: newRules,
                        });
                      }}
                      min="0"
                      max="100"
                      placeholder="Weight"
                    />
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        const newRules = programForm.assignmentRules.filter(
                          (_, i) => i !== index,
                        );
                        setProgramForm({
                          ...programForm,
                          assignmentRules: newRules,
                        });
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}

                <button
                  className="btn btn-sm btn-outline-primary mt-2"
                  onClick={() => {
                    const newRules = [...programForm.assignmentRules];
                    newRules.push({
                      id: Date.now(),
                      rule: "",
                      mandatory: false,
                      weight: 10,
                    });
                    setProgramForm({
                      ...programForm,
                      assignmentRules: newRules,
                    });
                  }}
                >
                  <i className="bi bi-plus-circle me-1"></i>Add Rule
                </button>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowCreateProgram(false)}
            >
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

  // 2. Assignment Modal - Fixed Size
  const AssignmentModal = () => {
    const buddy = assignmentForm.buddyId
      ? buddies.find((b) => b.id === assignmentForm.buddyId)
      : null;
    const newJoiner = assignmentForm.newJoinerId
      ? newJoiners.find((n) => n.id === assignmentForm.newJoinerId)
      : null;
    const program = assignmentForm.programId
      ? buddyPrograms.find((p) => p.id === assignmentForm.programId)
      : null;
    const [matchScore, setMatchScore] = useState(0);

    useEffect(() => {
      if (buddy && newJoiner && program) {
        const score = calculateMatchScore(buddy, newJoiner, program);
        setMatchScore(score);
      }
    }, [buddy, newJoiner, program]);

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Buddy-New Joiner Pairing</h5>
              <button
                className="btn-close"
                onClick={() => setShowAssignmentModal(false)}
              ></button>
            </div>

            <div
              className="modal-body pt-0"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <div className="card border h-100">
                    <div className="card-header bg-light py-2">
                      <h6 className="mb-0">Select Program *</h6>
                    </div>
                    <div className="card-body p-3">
                      <select
                        className="form-select mb-2"
                        value={assignmentForm.programId || ""}
                        onChange={(e) =>
                          setAssignmentForm({
                            ...assignmentForm,
                            programId: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value="">Choose program...</option>
                        {buddyPrograms.map((program) => (
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
                    <div className="card-header bg-light py-2">
                      <h6 className="mb-0">Select Buddy *</h6>
                    </div>
                    <div className="card-body p-3">
                      <select
                        className="form-select mb-2"
                        value={assignmentForm.buddyId || ""}
                        onChange={(e) =>
                          setAssignmentForm({
                            ...assignmentForm,
                            buddyId: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value="">Choose buddy...</option>
                        {buddies
                          .filter(
                            (b) => b.currentAssignments < b.maxAssignments,
                          )
                          .sort((a, b) => b.rating - a.rating)
                          .map((buddy) => (
                            <option key={buddy.id} value={buddy.id}>
                              {buddy.name} ({buddy.department}) -{" "}
                              {buddy.currentAssignments}/{buddy.maxAssignments}
                            </option>
                          ))}
                      </select>

                      {assignmentForm.buddyId && (
                        <div className="mt-2 small">
                          <div className="fw-bold">{buddy?.name}</div>
                          <div className="text-muted">
                            Rating: {buddy?.rating}/5 | Tenure: {buddy?.tenure}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card border h-100">
                    <div className="card-header bg-light py-2">
                      <h6 className="mb-0">Select New Joiner *</h6>
                    </div>
                    <div className="card-body p-3">
                      <select
                        className="form-select mb-2"
                        value={assignmentForm.newJoinerId || ""}
                        onChange={(e) =>
                          setAssignmentForm({
                            ...assignmentForm,
                            newJoinerId: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value="">Choose new joiner...</option>
                        {newJoiners
                          .filter((n) => !n.assignedBuddy)
                          .sort(
                            (a, b) =>
                              new Date(b.joinDate) - new Date(a.joinDate),
                          )
                          .map((newJoiner) => (
                            <option key={newJoiner.id} value={newJoiner.id}>
                              {newJoiner.name} ({newJoiner.department})
                            </option>
                          ))}
                      </select>

                      {assignmentForm.newJoinerId && (
                        <div className="mt-2 small">
                          <div className="fw-bold">{newJoiner?.name}</div>
                          <div className="text-muted">
                            Joined: {newJoiner?.joinDate} | Stage:{" "}
                            {newJoiner?.onboardingStage}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {assignmentForm.buddyId &&
                assignmentForm.newJoinerId &&
                buddy &&
                newJoiner &&
                program && (
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-header bg-light py-2">
                          <h6 className="mb-0">Match Analysis</h6>
                        </div>
                        <div className="card-body p-3">
                          <div className="text-center mb-3">
                            <div
                              className={`display-4 fw-bold ${
                                matchScore >= 80
                                  ? "text-success"
                                  : matchScore >= 60
                                    ? "text-warning"
                                    : "text-danger"
                              }`}
                            >
                              {matchScore}/100
                            </div>
                            <div className="text-muted">
                              Compatibility Score
                            </div>
                          </div>

                          <div
                            className="progress mb-3"
                            style={{ height: "12px" }}
                          >
                            <div
                              className={`progress-bar ${
                                matchScore >= 80
                                  ? "bg-success"
                                  : matchScore >= 60
                                    ? "bg-warning"
                                    : "bg-danger"
                              }`}
                              style={{ width: `${matchScore}%` }}
                            ></div>
                          </div>

                          <div className="row small mb-3">
                            <div className="col-6">
                              <div className="fw-bold">Department</div>
                              <div
                                className={
                                  buddy.department === newJoiner.department
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {buddy.department === newJoiner.department
                                  ? "✓ Match"
                                  : "✗ Different"}
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="fw-bold">Location</div>
                              <div
                                className={
                                  buddy.officeLocation === newJoiner.location
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {buddy.officeLocation === newJoiner.location
                                  ? "✓ Same"
                                  : "✗ Different"}
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="fw-bold mb-2">Skills Match:</div>
                            <div className="d-flex flex-wrap gap-1">
                              {buddy.skills?.map((skill) => (
                                <span
                                  key={skill}
                                  className={`badge ${newJoiner.skills?.includes(skill) ? "bg-success" : "bg-light text-dark"}`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card border">
                        <div className="card-header bg-light py-2">
                          <h6 className="mb-0">Assignment Details</h6>
                        </div>
                        <div className="card-body p-3">
                          <div className="mb-3">
                            <label className="form-label small">
                              Assignment Date *
                            </label>
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              value={assignmentForm.assignmentDate}
                              onChange={(e) =>
                                setAssignmentForm({
                                  ...assignmentForm,
                                  assignmentDate: e.target.value,
                                })
                              }
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label small">
                              Pairing Reason
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={assignmentForm.pairingReason}
                              onChange={(e) =>
                                setAssignmentForm({
                                  ...assignmentForm,
                                  pairingReason: e.target.value,
                                })
                              }
                              placeholder="Reason for this pairing"
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label small">Notes</label>
                            <textarea
                              className="form-control form-control-sm"
                              rows="3"
                              value={assignmentForm.notes}
                              onChange={(e) =>
                                setAssignmentForm({
                                  ...assignmentForm,
                                  notes: e.target.value,
                                })
                              }
                              placeholder="Any special instructions or notes"
                            />
                          </div>

                          <div className="alert alert-info small mb-0">
                            <i className="bi bi-info-circle me-1"></i>
                            Both buddy and new joiner will be notified via
                            email.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowAssignmentModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAssignBuddy}
                disabled={
                  !assignmentForm.programId ||
                  !assignmentForm.buddyId ||
                  !assignmentForm.newJoinerId
                }
              >
                Create Pairing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. Feedback Modal - Fixed Size
  const FeedbackModal = () => {
    const assignment =
      selectedAssignment ||
      (feedbackForm.assignmentId
        ? buddyPrograms
            .flatMap((p) => p.assignments)
            .find((a) => a.id === feedbackForm.assignmentId)
        : null);

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Submit Feedback</h5>
              <button
                className="btn-close"
                onClick={() => setShowFeedbackModal(false)}
              ></button>
            </div>

            <div
              className="modal-body pt-0"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {!assignment && (
                <div className="mb-3">
                  <label className="form-label">Select Assignment *</label>
                  <select
                    className="form-select"
                    value={feedbackForm.assignmentId || ""}
                    onChange={(e) =>
                      setFeedbackForm({
                        ...feedbackForm,
                        assignmentId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Choose assignment...</option>
                    {buddyPrograms.flatMap((program) =>
                      program.assignments.map((assignment) => (
                        <option key={assignment.id} value={assignment.id}>
                          {assignment.buddy.name} - {assignment.newJoiner.name}{" "}
                          ({program.name})
                        </option>
                      )),
                    )}
                  </select>
                </div>
              )}

              {assignment && (
                <div className="alert alert-info mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <strong>Buddy:</strong> {assignment.buddy.name}
                      <br />
                      <strong>New Joiner:</strong> {assignment.newJoiner.name}
                    </div>
                    <div className="col-md-6">
                      <strong>Assignment Date:</strong>{" "}
                      {assignment.assignmentDate}
                      <br />
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
                    onChange={(e) =>
                      setFeedbackForm({
                        ...feedbackForm,
                        submittedBy: e.target.value,
                      })
                    }
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Your Role *</label>
                  <select
                    className="form-select"
                    value={feedbackForm.role}
                    onChange={(e) =>
                      setFeedbackForm({ ...feedbackForm, role: e.target.value })
                    }
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`btn btn-link p-0 me-2 ${star <= feedbackForm.overallRating ? "text-warning" : "text-muted"}`}
                        onClick={() =>
                          setFeedbackForm({
                            ...feedbackForm,
                            overallRating: star,
                          })
                        }
                      >
                        <i className="bi bi-star-fill fs-3"></i>
                      </button>
                    ))}
                  </div>
                  <span className="fw-bold fs-5">
                    {feedbackForm.overallRating}/5
                  </span>
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
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className={`btn btn-link p-0 me-1 ${star <= category.rating ? "text-warning" : "text-muted"}`}
                              onClick={() => {
                                const newCategories = [
                                  ...feedbackForm.categories,
                                ];
                                newCategories[index].rating = star;
                                setFeedbackForm({
                                  ...feedbackForm,
                                  categories: newCategories,
                                });
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
                          setFeedbackForm({
                            ...feedbackForm,
                            categories: newCategories,
                          });
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
                  onChange={(e) =>
                    setFeedbackForm({
                      ...feedbackForm,
                      overallComment: e.target.value,
                    })
                  }
                  placeholder="Share your overall experience, suggestions, or any concerns"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Improvement Suggestions</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={feedbackForm.improvementSuggestions}
                  onChange={(e) =>
                    setFeedbackForm({
                      ...feedbackForm,
                      improvementSuggestions: e.target.value,
                    })
                  }
                  placeholder="Suggestions for program improvement"
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={feedbackForm.wouldRecommend}
                      onChange={(e) =>
                        setFeedbackForm({
                          ...feedbackForm,
                          wouldRecommend: e.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label">
                      Would recommend this buddy to others
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={feedbackForm.anonymous}
                      onChange={(e) =>
                        setFeedbackForm({
                          ...feedbackForm,
                          anonymous: e.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label">
                      Submit anonymously
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleSubmitFeedback}
                disabled={
                  !feedbackForm.assignmentId ||
                  !feedbackForm.submittedBy ||
                  !feedbackForm.overallRating
                }
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Analytics Modal - Fixed Size
  const AnalyticsModal = () => {
    const analytics = selectedProgram ? selectedProgram.analytics : null;

    if (!analytics) return null;

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                Program Analytics - {selectedProgram?.name}
              </h5>
              <button
                className="btn-close"
                onClick={() => setShowAnalyticsModal(false)}
              ></button>
            </div>

            <div
              className="modal-body py-2"
              style={{ maxHeight: "65vh", maxWidth: "100%", overflowY: "auto" }}
            >
              {/* Key Metrics */}
              <div className="row mb-3">
                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center p-2">
                      <h6 className="text-muted mb-2">Total Pairs</h6>
                      <h2 className="fw-bold text-primary">
                        {analytics.totalPairs}
                      </h2>
                      <small className="text-muted">
                        Active: {analytics.activePairs}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center p-3">
                      <h6 className="text-muted mb-2">Completion Rate</h6>
                      <h2 className="fw-bold text-success">
                        {analytics.completionRate}%
                      </h2>
                      <small className="text-muted">
                        {analytics.completedPairs} completed
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center p-3">
                      <h6 className="text-muted mb-2">Avg Rating</h6>
                      <h2 className="fw-bold text-warning">
                        {analytics.averageRating}/5
                      </h2>
                      <small className="text-muted">
                        {analytics.feedbackCount} feedback
                      </small>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 mb-3">
                  <div className="card border h-100">
                    <div className="card-body text-center p-3">
                      <h6 className="text-muted mb-2">Avg Match Score</h6>
                      <h2 className="fw-bold text-info">
                        {analytics.averageMatchScore}/100
                      </h2>
                      <small className="text-muted">Pairing quality</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card border h-100">
                    <div className="card-header bg-light py-2">
                      <h6 className="mb-0">Department Distribution</h6>
                    </div>
                    <div className="card-body p-3">
                      {Object.entries(analytics.departmentDistribution).map(
                        ([dept, count]) => (
                          <div
                            key={dept}
                            className="d-flex justify-content-between align-items-center mb-2"
                          >
                            <span className="small">{dept}</span>
                            <div className="d-flex align-items-center">
                              <div
                                className="progress flex-grow-1 me-2"
                                style={{ width: "100px", height: "8px" }}
                              >
                                <div
                                  className="progress-bar bg-primary"
                                  style={{
                                    width: `${(count / analytics.totalPairs) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="fw-bold small">{count}</span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border h-100">
                    <div className="card-header bg-light py-2">
                      <h6 className="mb-0">Location Distribution</h6>
                    </div>
                    <div className="card-body p-3">
                      {Object.entries(analytics.locationDistribution).map(
                        ([location, count]) => (
                          <div
                            key={location}
                            className="d-flex justify-content-between align-items-center mb-2"
                          >
                            <span className="small">{location}</span>
                            <div className="d-flex align-items-center">
                              <div
                                className="progress flex-grow-1 me-2"
                                style={{ width: "100px", height: "8px" }}
                              >
                                <div
                                  className="progress-bar bg-success"
                                  style={{
                                    width: `${(count / analytics.totalPairs) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="fw-bold small">{count}</span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Satisfaction Metrics */}
              <div className="row">
                <div className="col-md-6">
                  <div className="card border h-100">
                    <div className="card-header bg-light py-2">
                      <h6 className="mb-0">Satisfaction Metrics</h6>
                    </div>
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="small">Satisfaction Score</span>
                        <div className="d-flex align-items-center">
                          <div
                            className="progress flex-grow-1 me-2"
                            style={{ width: "150px", height: "10px" }}
                          >
                            <div
                              className="progress-bar bg-warning"
                              style={{
                                width: `${(analytics.satisfactionScore / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="fw-bold small">
                            {analytics.satisfactionScore}/5
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small">Time to Productivity</span>
                        <span className="fw-bold small">
                          {analytics.timeToProductivity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card border h-100">
                    <div className="card-header bg-light py-2">
                      <h6 className="mb-0">Performance Overview</h6>
                    </div>
                    <div className="card-body p-3">
                      <div className="row text-center">
                        <div className="col-4">
                          <div className="h4 fw-bold text-primary">
                            {analytics.activePairs}
                          </div>
                          <div className="text-muted small">Active Pairs</div>
                        </div>
                        <div className="col-4">
                          <div className="h4 fw-bold text-success">
                            {analytics.completedPairs}
                          </div>
                          <div className="text-muted small">Completed</div>
                        </div>
                        <div className="col-4">
                          <div className="h4 fw-bold text-warning">
                            {analytics.feedbackCount}
                          </div>
                          <div className="text-muted small">Feedback</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAnalyticsModal(false)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleExportData("analytics")}
              >
                <i className="bi bi-download me-1"></i> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5. Communication Modal
  const CommunicationModal = () => {
    const assignment = communicationForm.assignmentId
      ? buddyPrograms
          .flatMap((p) => p.assignments)
          .find((a) => a.id === communicationForm.assignmentId)
      : null;

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Record Communication</h5>
              <button
                className="btn-close"
                onClick={() => setShowCommunicationModal(false)}
              ></button>
            </div>

            <div
              className="modal-body pt-0"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="mb-3">
                <label className="form-label">Assignment *</label>
                <select
                  className="form-select"
                  value={communicationForm.assignmentId || ""}
                  onChange={(e) =>
                    setCommunicationForm({
                      ...communicationForm,
                      assignmentId: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="">Select assignment...</option>
                  {buddyPrograms.flatMap((program) =>
                    program.assignments.map((assignment) => (
                      <option key={assignment.id} value={assignment.id}>
                        {assignment.buddy.name} - {assignment.newJoiner.name}
                      </option>
                    )),
                  )}
                </select>
              </div>

              {assignment && (
                <div className="alert alert-info mb-3">
                  <div className="row">
                    <div className="col-md-6">
                      <strong>Buddy:</strong> {assignment.buddy.name}
                      <br />
                      <strong>New Joiner:</strong> {assignment.newJoiner.name}
                    </div>
                    <div className="col-md-6">
                      <strong>Last Check-in:</strong>{" "}
                      {assignment.lastCheckIn || "N/A"}
                      <br />
                      <strong>Next Check-in:</strong>{" "}
                      {assignment.nextCheckIn || "N/A"}
                    </div>
                  </div>
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Communication Type *</label>
                  <select
                    className="form-select"
                    value={communicationForm.type}
                    onChange={(e) =>
                      setCommunicationForm({
                        ...communicationForm,
                        type: e.target.value,
                      })
                    }
                  >
                    {communicationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.replace(/_/g, " ").toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={communicationForm.date}
                    onChange={(e) =>
                      setCommunicationForm({
                        ...communicationForm,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={communicationForm.duration}
                    onChange={(e) =>
                      setCommunicationForm({
                        ...communicationForm,
                        duration: e.target.value,
                      })
                    }
                    placeholder="e.g., 30"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Next Check-in Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]
                    }
                    readOnly
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Topics Discussed</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={communicationForm.topics}
                    onChange={(e) =>
                      setCommunicationForm({
                        ...communicationForm,
                        topics: e.target.value,
                      })
                    }
                    placeholder="Enter topics separated by commas"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Follow-up Actions</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={communicationForm.followUp}
                    onChange={(e) =>
                      setCommunicationForm({
                        ...communicationForm,
                        followUp: e.target.value,
                      })
                    }
                    placeholder="Enter follow-up actions separated by commas"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={communicationForm.notes}
                    onChange={(e) =>
                      setCommunicationForm({
                        ...communicationForm,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Any additional notes or observations"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowCommunicationModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleRecordCommunication}
                disabled={
                  !communicationForm.assignmentId || !communicationForm.date
                }
              >
                Record Communication
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 6. Rules Modal
  const RulesModal = () => {
    const program = selectedProgram;

    if (!program) return null;

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                Assignment Rules - {program.name}
              </h5>
              <button
                className="btn-close"
                onClick={() => setShowRulesModal(false)}
              ></button>
            </div>

            <div
              className="modal-body pt-0"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                These rules are used to automatically match buddies with new
                joiners. Mandatory rules must be satisfied, while preferred
                rules enhance match quality.
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Rule</th>
                      <th>Type</th>
                      <th>Weight</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.assignmentRules.map((rule) => (
                      <tr key={rule.id}>
                        <td className="fw-medium">{rule.rule}</td>
                        <td>
                          {rule.mandatory ? (
                            <span className="badge bg-danger">Mandatory</span>
                          ) : (
                            <span className="badge bg-warning">Preferred</span>
                          )}
                        </td>
                        <td>
                          <span className="fw-bold">{rule.weight}pts</span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {rule.mandatory
                              ? "Must be satisfied for pairing"
                              : "Improves match quality"}
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {program.assignmentRules.length === 0 && (
                <div className="alert alert-warning text-center">
                  No assignment rules defined for this program.
                </div>
              )}
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-secondary"
                onClick={() => setShowRulesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 7. Checklist Modal
  const ChecklistModal = () => {
    const program = selectedProgram;

    if (!program) return null;

    const completedTasks = program.buddyResponsibilities.flatMap((c) =>
      c.tasks.filter((t) => t.status === "completed"),
    ).length;
    const totalTasks = program.buddyResponsibilities.flatMap(
      (c) => c.tasks,
    ).length;
    const completionPercentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0 d-flex align-items-start">
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="modal-title fw-bold mb-0">
                    Buddy Responsibilities Checklist - {program.name}
                  </h5>
                  <button
                    className="btn-close ms-2"
                    onClick={() => setShowChecklistModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div className="fw-bold">
                      {completedTasks}/{totalTasks} tasks completed
                    </div>
                    <div
                      className="progress mt-1"
                      style={{ height: "6px", width: "150px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="badge bg-light text-dark border">
                    {completionPercentage}% Complete
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal-body pt-3"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              {program.buddyResponsibilities.map((category) => (
                <div key={category.id} className="card border mb-3">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">{category.category}</h6>
                    <span className="badge bg-secondary">
                      {
                        category.tasks.filter((t) => t.status === "completed")
                          .length
                      }
                      /{category.tasks.length} tasks
                    </span>
                  </div>
                  <div className="card-body p-0">
                    <div className="list-group list-group-flush">
                      {category.tasks.map((task) => (
                        <div key={task.id} className="list-group-item p-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1 me-3">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <span className="fw-medium">{task.task}</span>
                                {getPriorityBadge(task.priority)}
                              </div>
                              <p className="text-muted small mb-2">
                                {task.description}
                              </p>
                              <div className="d-flex align-items-center gap-3">
                                <small className="text-muted">
                                  <i className="bi bi-calendar me-1"></i>
                                  Deadline: {task.deadline}
                                </small>
                                {task.assignedTo && (
                                  <small className="text-muted">
                                    <i className="bi bi-person me-1"></i>
                                    {task.assignedTo}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="d-flex flex-column align-items-end gap-2">
                              {getTaskStatusBadge(task.status)}
                              <div className="btn-group btn-group-sm">
                                <button
                                  className={`btn ${task.status === "completed" ? "btn-success" : "btn-outline-success"}`}
                                  onClick={() =>
                                    handleUpdateTaskStatus(
                                      program.id,
                                      task.id,
                                      "completed",
                                    )
                                  }
                                  title="Mark as Completed"
                                  disabled={task.status === "completed"}
                                >
                                  <i className="bi bi-check-lg"></i>
                                </button>
                                <button
                                  className={`btn ${task.status === "in-progress" ? "btn-warning" : "btn-outline-warning"}`}
                                  onClick={() =>
                                    handleUpdateTaskStatus(
                                      program.id,
                                      task.id,
                                      "in-progress",
                                    )
                                  }
                                  title="Mark as In Progress"
                                  disabled={task.status === "in-progress"}
                                >
                                  <i className="bi bi-clock"></i>
                                </button>
                                <button
                                  className={`btn ${task.status === "pending" ? "btn-secondary" : "btn-outline-secondary"}`}
                                  onClick={() =>
                                    handleUpdateTaskStatus(
                                      program.id,
                                      task.id,
                                      "pending",
                                    )
                                  }
                                  title="Mark as Pending"
                                  disabled={task.status === "pending"}
                                >
                                  <i className="bi bi-dash-lg"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {program.buddyResponsibilities.length === 0 && (
                <div className="alert alert-warning text-center py-4">
                  <i className="bi bi-list-check fs-4 d-block mb-2"></i>
                  No responsibilities checklist defined for this program.
                  <div className="mt-3">
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-plus-circle me-1"></i>
                      Create Checklist
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer border-0 bg-light">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="text-muted small">
                  <i className="bi bi-info-circle me-1"></i>
                  Click status buttons to update task progress
                </div>
                <div>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setShowChecklistModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary">
                    <i className="bi bi-download me-1"></i>
                    Export Checklist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 8. Buddy Profile Modal
  const BuddyProfileModal = () => {
    const buddy = selectedBuddy;

    if (!buddy) return null;

    // Get assignments for this buddy
    const buddyAssignments = buddyPrograms.flatMap((program) =>
      program.assignments.filter((a) => a.buddy.id === buddy.id),
    );

    // Calculate average feedback score
    const avgFeedbackScore =
      buddyAssignments.length > 0
        ? buddyAssignments.reduce((sum, a) => sum + (a.feedbackScore || 0), 0) /
          buddyAssignments.length
        : 0;

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                Buddy Profile - {buddy.name}
              </h5>
              <button
                className="btn-close"
                onClick={() => setShowBuddyProfile(false)}
              ></button>
            </div>

            <div
              className="modal-body pt-0"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="row mb-4">
                <div className="col-md-3 text-center">
                  <div className="bg-primary rounded-circle p-4 d-inline-block mb-3">
                    <i className="bi bi-person-badge text-white fs-1"></i>
                  </div>
                  <h5 className="fw-bold">{buddy.name}</h5>
                  <p className="text-muted">{buddy.role}</p>
                  <div className="text-warning mb-2">
                    {"★".repeat(Math.floor(buddy.rating))}
                    {"☆".repeat(5 - Math.floor(buddy.rating))}
                    <span className="ms-1 fw-bold">{buddy.rating}/5</span>
                  </div>
                  <div className="badge bg-success">{buddy.availability}</div>
                </div>

                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">
                            Contact Information
                          </h6>
                          <p className="mb-1">
                            <i className="bi bi-envelope me-2"></i>
                            {buddy.email}
                          </p>
                          <p className="mb-1">
                            <i className="bi bi-telephone me-2"></i>
                            {buddy.phone}
                          </p>
                          <p className="mb-0">
                            <i className="bi bi-building me-2"></i>
                            {buddy.officeLocation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">Assignment Status</h6>
                          <p className="mb-1">
                            Current Assignments:{" "}
                            <span className="fw-bold">
                              {buddy.currentAssignments}/{buddy.maxAssignments}
                            </span>
                          </p>
                          <p className="mb-1">
                            Total Mentees:{" "}
                            <span className="fw-bold">
                              {buddy.totalMentees}
                            </span>
                          </p>
                          <p className="mb-0">
                            Average Feedback:{" "}
                            <span className="fw-bold text-warning">
                              {avgFeedbackScore.toFixed(1)}/5
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">Department</h6>
                          <p className="fw-bold mb-0">{buddy.department}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">Tenure</h6>
                          <p className="fw-bold mb-0">{buddy.tenure}</p>
                          <small className="text-muted">
                            Joined: {buddy.joinDate}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">Availability</h6>
                          {buddy.currentAssignments < buddy.maxAssignments ? (
                            <span className="badge bg-success">
                              Available for new assignments
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              At full capacity
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {buddy.skills && buddy.skills.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Skills & Expertise</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {buddy.skills.map((skill, index) => (
                      <span key={index} className="badge bg-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h6 className="fw-bold mb-3">
                  Current Assignments ({buddyAssignments.length})
                </h6>
                {buddyAssignments.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>New Joiner</th>
                          <th>Department</th>
                          <th>Program</th>
                          <th>Match Score</th>
                          <th>Progress</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {buddyAssignments.map((assignment) => {
                          const program = buddyPrograms.find((p) =>
                            p.assignments.some((a) => a.id === assignment.id),
                          );
                          return (
                            <tr key={assignment.id}>
                              <td className="fw-bold">
                                {assignment.newJoiner.name}
                              </td>
                              <td>{assignment.newJoiner.department}</td>
                              <td>{program?.name || "N/A"}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    assignment.matchScore >= 80
                                      ? "bg-success"
                                      : assignment.matchScore >= 60
                                        ? "bg-warning"
                                        : "bg-danger"
                                  }`}
                                >
                                  {assignment.matchScore}/100
                                </span>
                              </td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "20px" }}
                                >
                                  <div
                                    className="progress-bar"
                                    style={{
                                      width: `${assignment.completionPercentage}%`,
                                    }}
                                  >
                                    {assignment.completionPercentage}%
                                  </div>
                                </div>
                              </td>
                              <td>{getStatusBadge(assignment.status)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-info">No current assignments</div>
                )}
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-secondary"
                onClick={() => setShowBuddyProfile(false)}
              >
                Close
              </button>
              {buddy.currentAssignments < buddy.maxAssignments && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setAssignmentForm((prev) => ({
                      ...prev,
                      buddyId: buddy.id,
                    }));
                    setShowBuddyProfile(false);
                    setShowAssignmentModal(true);
                  }}
                >
                  Assign to New Joiner
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 9. New Joiner Profile Modal
  const NewJoinerProfileModal = () => {
    const newJoiner = selectedNewJoiner;

    if (!newJoiner) return null;

    // Get assignment for this new joiner
    const assignment = buddyPrograms.flatMap((program) =>
      program.assignments.filter((a) => a.newJoiner.id === newJoiner.id),
    )[0];

    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">
                New Joiner Profile - {newJoiner.name}
              </h5>
              <button
                className="btn-close"
                onClick={() => setShowNewJoinerProfile(false)}
              ></button>
            </div>

            <div
              className="modal-body pt-0"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="row mb-4">
                <div className="col-md-3 text-center">
                  <div className="bg-success rounded-circle p-4 d-inline-block mb-3">
                    <i className="bi bi-person-plus text-white fs-1"></i>
                  </div>
                  <h5 className="fw-bold">{newJoiner.name}</h5>
                  <p className="text-muted">{newJoiner.role}</p>
                  <div className="mb-2">
                    <span className="badge bg-info">
                      {newJoiner.onboardingStage}
                    </span>
                  </div>
                  <div>
                    {newJoiner.assignedBuddy ? (
                      <span className="badge bg-success">Buddy Assigned</span>
                    ) : (
                      <span className="badge bg-warning">Needs Buddy</span>
                    )}
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">
                            Contact Information
                          </h6>
                          <p className="mb-1">
                            <i className="bi bi-envelope me-2"></i>
                            {newJoiner.email}
                          </p>
                          <p className="mb-0">
                            <i className="bi bi-telephone me-2"></i>
                            {newJoiner.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">
                            Onboarding Details
                          </h6>
                          <p className="mb-1">
                            Join Date:{" "}
                            <span className="fw-bold">
                              {newJoiner.joinDate}
                            </span>
                          </p>
                          <p className="mb-0">
                            Location:{" "}
                            <span className="fw-bold">
                              {newJoiner.location}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">Department</h6>
                          <p className="fw-bold mb-0">{newJoiner.department}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="card border h-100">
                        <div className="card-body">
                          <h6 className="text-muted mb-2">Buddy Status</h6>
                          {newJoiner.assignedBuddy ? (
                            <span className="badge bg-success">Assigned</span>
                          ) : (
                            <span className="badge bg-warning">Unassigned</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {newJoiner.background && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Background</h6>
                  <p className="text-muted">{newJoiner.background}</p>
                </div>
              )}

              {newJoiner.skills && newJoiner.skills.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Skills</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {newJoiner.skills.map((skill, index) => (
                      <span key={index} className="badge bg-success">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {assignment && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Buddy Assignment Details</h6>
                  <div className="card border">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <strong>Buddy:</strong> {assignment.buddy.name}
                          </p>
                          <p>
                            <strong>Department:</strong>{" "}
                            {assignment.buddy.department}
                          </p>
                          <p>
                            <strong>Tenure:</strong> {assignment.buddy.tenure}
                          </p>
                          <p>
                            <strong>Rating:</strong>{" "}
                            <span className="text-warning">
                              {assignment.buddy.rating}/5
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <strong>Match Score:</strong>{" "}
                            <span
                              className={`badge ${
                                assignment.matchScore >= 80
                                  ? "bg-success"
                                  : assignment.matchScore >= 60
                                    ? "bg-warning"
                                    : "bg-danger"
                              }`}
                            >
                              {assignment.matchScore}/100
                            </span>
                          </p>
                          <p>
                            <strong>Assignment Date:</strong>{" "}
                            {assignment.assignmentDate}
                          </p>
                          <p>
                            <strong>Progress:</strong>{" "}
                            {assignment.completionPercentage}%
                          </p>
                          <p>
                            <strong>Feedback Score:</strong>{" "}
                            <span className="text-warning">
                              {assignment.feedbackScore || "N/A"}/5
                            </span>
                          </p>
                        </div>
                      </div>

                      {assignment.communicationRecords &&
                        assignment.communicationRecords.length > 0 && (
                          <div className="mt-3">
                            <h6 className="fw-bold mb-2">
                              Recent Communications
                            </h6>
                            <div className="list-group">
                              {assignment.communicationRecords
                                .slice(0, 3)
                                .map((comm) => (
                                  <div
                                    key={comm.id}
                                    className="list-group-item"
                                  >
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <span className="fw-bold">
                                          {getCommunicationTypeBadge(comm.type)}
                                        </span>
                                        <span className="ms-2 text-muted">
                                          {comm.date}
                                        </span>
                                        {comm.duration && (
                                          <span className="ms-2 text-muted">
                                            ({comm.duration})
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {comm.topics && comm.topics.length > 0 && (
                                      <div className="mt-2">
                                        <small className="text-muted">
                                          Topics: {comm.topics.join(", ")}
                                        </small>
                                      </div>
                                    )}
                                    {comm.notes && (
                                      <div className="mt-1">
                                        <small className="text-muted">
                                          Notes: {comm.notes}
                                        </small>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer border-0">
              <button
                className="btn btn-secondary"
                onClick={() => setShowNewJoinerProfile(false)}
              >
                Close
              </button>
              {!newJoiner.assignedBuddy && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setAssignmentForm((prev) => ({
                      ...prev,
                      newJoinerId: newJoiner.id,
                    }));
                    setShowNewJoinerProfile(false);
                    setShowAssignmentModal(true);
                  }}
                >
                  Assign Buddy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== RENDER ====================
  if (loading) {
    return (
      <div className="container-fluid px-3 px-md-4 py-5">
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">
            Loading Buddy/Mentor Assignment Module...
          </p>
        </div>
      </div>
    );
  }

  const filteredPrograms = filterPrograms();

  return (
    <div className="container-fluid px-2 px-md-3 px-lg-4 py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h5 className="fw-bold mb-1">Buddy/Mentor Assignment</h5>
          <p className="text-muted mb-0">
            Facilitate successful onboarding through structured buddy programs
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={() => setShowAssignmentModal(true)}
          >
            <i className="bi bi-person-plus"></i>
            <span>Create Pairing</span>
          </button>

          <button
            className="btn btn-outline-info d-flex align-items-center gap-2"
            onClick={() => setShowCommunicationModal(true)}
          >
            <i className="bi bi-chat-left-text"></i>
            <span>Record Communication</span>
          </button>

          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => setShowCreateProgram(true)}
          >
            <i className="bi bi-plus-circle"></i>
            <span>Create Program</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="card border mb-4">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn ${viewMode === "programs" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setViewMode("programs")}
            >
              <i className="bi bi-people me-2"></i>
              Buddy Programs ({buddyPrograms.length})
            </button>
            <button
              className={`btn ${viewMode === "buddies" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setViewMode("buddies")}
            >
              <i className="bi bi-person-badge me-2"></i>
              Buddies ({buddies.length})
            </button>
            <button
              className={`btn ${viewMode === "newJoiners" ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => setViewMode("newJoiners")}
            >
              <i className="bi bi-person-plus me-2"></i>
              New Joiners ({
                newJoiners.filter((n) => !n.assignedBuddy).length
              }{" "}
              unassigned)
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
                  <i className="bi bi-arrow-up"></i>{" "}
                  {buddyPrograms.filter((p) => p.status === "active").length}{" "}
                  active
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
                    {buddyPrograms.reduce(
                      (sum, program) => sum + program.totalPairs,
                      0,
                    )}
                  </h4>
                </div>
                <div className="bg-success rounded-circle p-2">
                  <i className="bi bi-person-check text-white fs-5"></i>
                </div>
              </div>
              <div className="mt-2">
                <small className="text-success">
                  <i className="bi bi-check-circle"></i>{" "}
                  {buddyPrograms.reduce(
                    (sum, program) => sum + program.activePairs,
                    0,
                  )}{" "}
                  active
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
                  <h6 className="card-title text-muted mb-1">
                    Available Buddies
                  </h6>
                  <h4 className="fw-bold mb-0">
                    {
                      buddies.filter(
                        (b) => b.currentAssignments < b.maxAssignments,
                      ).length
                    }
                  </h4>
                </div>
                <div className="bg-warning rounded-circle p-2">
                  <i className="bi bi-person-plus text-white fs-5"></i>
                </div>
              </div>
              <div className="mt-2">
                <small className="text-success">
                  <i className="bi bi-people"></i> {buddies.length} total
                  buddies
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
                      ? (
                          buddyPrograms.reduce(
                            (sum, program) => sum + program.overallRating,
                            0,
                          ) / buddyPrograms.length
                        ).toFixed(1)
                      : "0.0"}
                    /5
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
      {viewMode === "programs" && (
        <>
          {/* Filters and Search */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-8">
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline-primary"} btn-sm`}
                  onClick={() => setActiveTab("all")}
                >
                  All Programs
                </button>
                <button
                  className={`btn ${activeTab === "active" ? "btn-success" : "btn-outline-success"} btn-sm`}
                  onClick={() => setActiveTab("active")}
                >
                  Active
                </button>
                <button
                  className={`btn ${activeTab === "completed" ? "btn-secondary" : "btn-outline-secondary"} btn-sm`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </button>
                <button
                  className={`btn ${activeTab === "draft" ? "btn-light" : "btn-outline-light"} btn-sm`}
                  onClick={() => setActiveTab("draft")}
                >
                  Drafts
                </button>

                <select
                  className="form-select form-select-sm"
                  style={{ width: "150px" }}
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments
                    .filter((d) => d !== "All")
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>

                <select
                  className="form-select form-select-sm"
                  style={{ width: "150px" }}
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  {locations
                    .filter((l) => l !== "All")
                    .map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                </select>
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
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Buddy Programs Table */}
          <div className="card border mb-4">
            <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <h6 className="mb-2 mb-md-0 fw-bold">Buddy Programs</h6>
              <span className="badge bg-primary">
                {filteredPrograms.length} programs
              </span>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort("name")}
                      >
                        Program Name{" "}
                        {sortConfig.key === "name" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="d-none d-md-table-cell">Type</th>
                      <th>Status</th>
                      <th>Pairs</th>
                      <th className="d-none d-md-table-cell">Rating</th>
                      <th className="d-none d-md-table-cell">Duration</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrograms.map((program) => (
                      <tr
                        key={program.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedProgram(program)}
                        className={
                          selectedProgram?.id === program.id
                            ? "table-active"
                            : ""
                        }
                      >
                        <td>
                          <div className="fw-bold">{program.name}</div>
                          <small className="text-muted">
                            {program.description.substring(0, 60)}...
                          </small>
                          <div className="small text-muted mt-1">
                            {program.department} • {program.location}
                          </div>
                        </td>
                        <td className="d-none d-md-table-cell">
                          <span className="badge bg-info">
                            {program.programType}
                          </span>
                        </td>
                        <td>{getStatusBadge(program.status)}</td>
                        <td>
                          <div>
                            {program.activePairs}/{program.totalPairs}
                          </div>
                          <small className="text-muted">
                            {program.completionRate}% complete
                          </small>
                        </td>
                        <td className="d-none d-md-table-cell">
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-1">
                              {program.overallRating}
                            </span>
                            <div className="text-warning">
                              {"★".repeat(Math.floor(program.overallRating))}
                            </div>
                          </div>
                        </td>
                        <td className="d-none d-md-table-cell">
                          <div>
                            {program.startDate} to {program.endDate}
                          </div>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProgram(program);
                                setShowAnalyticsModal(true);
                              }}
                              title="Analytics"
                            >
                              <i className="bi bi-graph-up"></i>
                            </button>
                            <button
                              className="btn btn-outline-success"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProgram(program);
                                setAssignmentForm((prev) => ({
                                  ...prev,
                                  programId: program.id,
                                }));
                                setShowAssignmentModal(true);
                              }}
                              title="Create Pairing"
                            >
                              <i className="bi bi-person-plus"></i>
                            </button>
                            <button
                              className="btn btn-outline-warning"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAutoMatch(program.id);
                              }}
                              title="Auto-match"
                            >
                              <i className="bi bi-robot"></i>
                            </button>
                            <button
                              className="btn btn-outline-info"
                              onClick={(e) => {
                                e.stopPropagation();
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

              {filteredPrograms.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-people fs-1 text-muted mb-3"></i>
                  <p className="text-muted">
                    No programs found matching your criteria
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowCreateProgram(true)}
                  >
                    Create Your First Program
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Program Details */}
          {selectedProgram && (
            <div className="row mt-4">
              <div className="col-12">
                <div className="card border mb-4">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">
                      Program Details: {selectedProgram.name}
                    </h6>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowRulesModal(true)}
                        title="View Rules"
                      >
                        <i className="bi bi-list-check me-1"></i>Rules
                      </button>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => setShowChecklistModal(true)}
                        title="View Checklist"
                      >
                        <i className="bi bi-check-square me-1"></i>Checklist
                      </button>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => setShowAnalyticsModal(true)}
                        title="View Analytics"
                      >
                        <i className="bi bi-graph-up me-1"></i>Analytics
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <h6 className="fw-bold mb-3">Program Information</h6>
                        <div className="list-group list-group-flush">
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Type</span>
                            <span className="fw-bold">
                              {selectedProgram.programType}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Department</span>
                            <span className="fw-bold">
                              {selectedProgram.department}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Location</span>
                            <span className="fw-bold">
                              {selectedProgram.location}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Duration</span>
                            <span className="fw-bold">
                              {selectedProgram.startDate} to{" "}
                              {selectedProgram.endDate}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Status</span>
                            <span>
                              {getStatusBadge(selectedProgram.status)}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Created By</span>
                            <span className="fw-bold">
                              {selectedProgram.createdBy}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4">
                        <h6 className="fw-bold mb-3">Quick Stats</h6>
                        <div className="list-group list-group-flush">
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Total Pairs</span>
                            <span className="fw-bold">
                              {selectedProgram.totalPairs}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Active Pairs</span>
                            <span className="fw-bold">
                              {selectedProgram.activePairs}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Completion Rate</span>
                            <span className="fw-bold">
                              {selectedProgram.completionRate}%
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Average Rating</span>
                            <span className="fw-bold">
                              {selectedProgram.overallRating}/5
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">
                              Feedback Received
                            </span>
                            <span className="fw-bold">
                              {selectedProgram.feedback.length}
                            </span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between">
                            <span className="text-muted">Created On</span>
                            <span className="fw-bold">
                              {selectedProgram.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4">
                        <h6 className="fw-bold mb-3">Recent Feedback</h6>
                        {selectedProgram.feedback.length > 0 ? (
                          <div className="list-group list-group-flush">
                            {selectedProgram.feedback.slice(0, 3).map((fb) => (
                              <div key={fb.id} className="list-group-item">
                                <div className="d-flex justify-content-between">
                                  <span className="fw-bold small">
                                    {fb.submittedBy}
                                  </span>
                                  <span className="text-warning">
                                    {fb.overallRating}/5
                                  </span>
                                </div>
                                <div className="small text-muted mt-1">
                                  {fb.overallComment.substring(0, 60)}...
                                </div>
                                <div className="small mt-1">
                                  <span className="text-muted">{fb.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="alert alert-info small">
                            No feedback yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignments Section */}
                <div className="card border">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-bold">
                      Assignments ({selectedProgram.assignments.length})
                    </h6>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setAssignmentForm((prev) => ({
                            ...prev,
                            programId: selectedProgram.id,
                          }));
                          setShowAssignmentModal(true);
                        }}
                      >
                        <i className="bi bi-person-plus me-1"></i>Add Assignment
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleAutoMatch(selectedProgram.id)}
                      >
                        <i className="bi bi-robot me-1"></i>Auto-match
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    {selectedProgram.assignments.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Buddy</th>
                              <th>New Joiner</th>
                              <th>Match Score</th>
                              <th>Assignment Date</th>
                              <th>Last Check-in</th>
                              <th>Progress</th>
                              <th>Feedback Score</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedProgram.assignments.map((assignment) => (
                              <tr key={assignment.id}>
                                <td>
                                  <div className="fw-bold">
                                    {assignment.buddy.name}
                                  </div>
                                  <small className="text-muted">
                                    {assignment.buddy.department}
                                  </small>
                                </td>
                                <td>
                                  <div className="fw-bold">
                                    {assignment.newJoiner.name}
                                  </div>
                                  <small className="text-muted">
                                    {assignment.newJoiner.department}
                                  </small>
                                </td>
                                <td>
                                  <span
                                    className={`badge ${
                                      assignment.matchScore >= 80
                                        ? "bg-success"
                                        : assignment.matchScore >= 60
                                          ? "bg-warning"
                                          : "bg-danger"
                                    }`}
                                  >
                                    {assignment.matchScore}/100
                                  </span>
                                </td>
                                <td>{assignment.assignmentDate}</td>
                                <td>{assignment.lastCheckIn || "N/A"}</td>
                                <td>
                                  <div
                                    className="progress"
                                    style={{
                                      height: "20px",
                                      minWidth: "100px",
                                    }}
                                  >
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: `${assignment.completionPercentage}%`,
                                      }}
                                    >
                                      {assignment.completionPercentage}%
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  {assignment.feedbackScore > 0 ? (
                                    <span className="badge bg-warning">
                                      {assignment.feedbackScore}/5
                                    </span>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td>{getStatusBadge(assignment.status)}</td>
                                <td>
                                  <div className="btn-group btn-group-sm">
                                    <button
                                      className="btn btn-outline-info"
                                      onClick={() => {
                                        setSelectedAssignment(assignment);
                                        setCommunicationForm((prev) => ({
                                          ...prev,
                                          assignmentId: assignment.id,
                                        }));
                                        setShowCommunicationModal(true);
                                      }}
                                      title="Record Communication"
                                    >
                                      <i className="bi bi-chat-left-text"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-warning"
                                      onClick={() => {
                                        setSelectedAssignment(assignment);
                                        setFeedbackForm((prev) => ({
                                          ...prev,
                                          assignmentId: assignment.id,
                                        }));
                                        setShowFeedbackModal(true);
                                      }}
                                      title="Submit Feedback"
                                    >
                                      <i className="bi bi-star"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="alert alert-info text-center">
                        No assignments yet. Click "Add Assignment" to create a
                        buddy-new joiner pairing.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Buddies View */}
      {viewMode === "buddies" && (
        <div className="row">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="mb-2 mb-md-0 fw-bold">Buddy Database</h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-success">
                    {
                      buddies.filter(
                        (b) => b.currentAssignments < b.maxAssignments,
                      ).length
                    }{" "}
                    available
                  </span>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleExportData("assignments")}
                  >
                    <i className="bi bi-download me-1"></i> Export
                  </button>
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
                      {buddies.map((buddy) => (
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
                              <span className="fw-bold me-1">
                                {buddy.rating}
                              </span>
                              <div className="text-warning">
                                {"★".repeat(Math.floor(buddy.rating))}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-bold">
                              {buddy.currentAssignments}/{buddy.maxAssignments}
                            </div>
                            <small className="text-muted">
                              {buddy.totalMentees} total mentees
                            </small>
                          </td>
                          <td>
                            {buddy.currentAssignments < buddy.maxAssignments ? (
                              <span className="badge bg-success">
                                Available
                              </span>
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
                              title="View Profile"
                            >
                              <i className="bi bi-eye me-1"></i>View
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
      {viewMode === "newJoiners" && (
        <div className="row">
          <div className="col-12">
            <div className="card border">
              <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h6 className="mb-2 mb-md-0 fw-bold">New Joiners</h6>
                <span className="badge bg-warning">
                  {newJoiners.filter((n) => !n.assignedBuddy).length} unassigned
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
                      {newJoiners.map((newJoiner) => (
                        <tr key={newJoiner.id}>
                          <td>
                            <div className="fw-bold">{newJoiner.name}</div>
                            <small className="text-muted">
                              {newJoiner.role}
                            </small>
                          </td>
                          <td>{newJoiner.department}</td>
                          <td>{newJoiner.location}</td>
                          <td>{newJoiner.joinDate}</td>
                          <td>
                            <span className="badge bg-info">
                              {newJoiner.onboardingStage}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {newJoiner.skills?.slice(0, 2).map((skill) => (
                                <span
                                  key={skill}
                                  className="badge bg-light text-dark"
                                >
                                  {skill}
                                </span>
                              ))}
                              {newJoiner.skills?.length > 2 && (
                                <span className="badge bg-light text-dark">
                                  +{newJoiner.skills.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            {newJoiner.assignedBuddy ? (
                              <span className="badge bg-success">Assigned</span>
                            ) : (
                              <span className="badge bg-warning">
                                Unassigned
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  setSelectedNewJoiner(newJoiner);
                                  setShowNewJoinerProfile(true);
                                }}
                                title="View Profile"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              {!newJoiner.assignedBuddy && (
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => {
                                    setSelectedNewJoiner(newJoiner);
                                    setAssignmentForm((prev) => ({
                                      ...prev,
                                      newJoinerId: newJoiner.id,
                                    }));
                                    setShowAssignmentModal(true);
                                  }}
                                  title="Assign Buddy"
                                >
                                  <i className="bi bi-person-plus"></i>
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
                    onClick={() =>
                      selectedProgram && setShowAnalyticsModal(true)
                    }
                    disabled={!selectedProgram}
                  >
                    <i className="bi bi-graph-up fs-4 mb-2"></i>
                    <span className="small">View Analytics</span>
                  </button>
                </div>

                <div className="col-6 col-md-4 col-lg-2">
                  <button
                    className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                    onClick={() =>
                      selectedProgram && handleAutoMatch(selectedProgram.id)
                    }
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
      {showRulesModal && <RulesModal />}
      {showChecklistModal && <ChecklistModal />}
      {showBuddyProfile && <BuddyProfileModal />}
      {showNewJoinerProfile && <NewJoinerProfileModal />}
    </div>
  );
};

export default BuddyMentorAssignment;