import React, { useState, useEffect } from "react";
import {
  Plus, Download, BarChart3, Users, Calendar, Send, BookOpen,
  Eye, Edit, Trash2, Copy, Save, Filter, Search, Clock, Mail,
  Bell, Target, PieChart, TrendingUp, MessageSquare, FileText,
  CheckSquare, Hash, Star, List, Grid, Zap, AlertCircle, XCircle,
  ChevronDown, ChevronUp, Upload, RefreshCw, Share2, Lock, Unlock,
  Users as UsersIcon, Building, MapPin, Tag, DownloadCloud, ExternalLink,
  MessageCircle, LineChart, Cloud, FileBarChart, Database, BellRing,
  DoorClosed, Heart, QrCode as QrCodeIcon, X
} from "lucide-react";

const SurveysPulseChecks = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [surveyVisibility, setSurveyVisibility] = useState("anonymous");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [distributionMethod, setDistributionMethod] = useState("email");
  const [scheduling, setScheduling] = useState("immediate");
  const [surveys, setSurveys] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Survey 'Q1 Engagement' has reached 85% response rate", type: "success", read: false },
    { id: 2, message: "Exit Interview survey scheduled for tomorrow", type: "info", read: false },
    { id: 3, message: "Low response rate for Wellness Pulse Check", type: "warning", read: false }
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [reminderSettings, setReminderSettings] = useState({
    enabled: true,
    frequency: 2,
    unit: "days"
  });
  const [surveyExpiry, setSurveyExpiry] = useState({
    value: 7,
    unit: "days"
  });
  const [completionMessage, setCompletionMessage] = useState("show thank you message");
  const [surveyLogic, setSurveyLogic] = useState({
    skipLogic: true,
    randomize: false,
    progressBar: true
  });
  const [scheduledSurveys, setScheduledSurveys] = useState([]);
  const [recurringSurveys, setRecurringSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [recurrencePattern, setRecurrencePattern] = useState("monthly");
  const [correlationData, setCorrelationData] = useState(null);

  // Add CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .spin {
        animation: spin 1s linear infinite;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in {
        animation: fadeIn 0.3s ease-out;
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .slide-in {
        animation: slideIn 0.3s ease-out;
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      .pulse {
        animation: pulse 0.3s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    
    // Load saved drafts from localStorage
    const savedDrafts = localStorage.getItem('surveyDrafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const questionTypes = [
    { id: "rating", label: "Rating Scale", icon: Star, description: "1-5 or 1-10 rating scale" },
    { id: "nps", label: "NPS", icon: TrendingUp, description: "Net Promoter Score (0-10)" },
    { id: "multiple", label: "Multiple Choice", icon: CheckSquare, description: "Select one or multiple options" },
    { id: "open", label: "Open-Ended", icon: MessageSquare, description: "Text-based responses" },
    { id: "matrix", label: "Matrix", icon: Grid, description: "Grid of questions and options" },
    { id: "ranking", label: "Ranking", icon: List, description: "Rank items in order" },
    { id: "dropdown", label: "Dropdown", icon: ChevronDown, description: "Select from dropdown" },
    { id: "slider", label: "Slider", icon: Hash, description: "Visual slider for ratings" }
  ];

  const surveyTemplates = [
    { id: "engagement", name: "Employee Engagement", questions: 15, estimatedTime: "10 min", usage: "Monthly", icon: Users },
    { id: "satisfaction", name: "Job Satisfaction", questions: 12, estimatedTime: "8 min", usage: "Quarterly", icon: Star },
    { id: "exit", name: "Exit Interview", questions: 10, estimatedTime: "15 min", usage: "On Exit", icon: DoorClosed },
    { id: "onboarding", name: "Onboarding Feedback", questions: 8, estimatedTime: "5 min", usage: "After 30 days", icon: Users },
    { id: "training", name: "Training Feedback", questions: 10, estimatedTime: "7 min", usage: "Post-training", icon: BookOpen },
    { id: "wellness", name: "Wellness Pulse Check", questions: 6, estimatedTime: "3 min", usage: "Bi-weekly", icon: Heart }
  ];

  const targetAudiences = [
    { id: "all", label: "All Employees", count: 1250 },
    { id: "department", label: "By Department", count: 450 },
    { id: "location", label: "By Location", count: 320 },
    { id: "role", label: "By Role", count: 280 },
    { id: "tenure", label: "By Tenure", count: 190 },
    { id: "custom", label: "Custom Group", count: 85 }
  ];

  const distributionMethods = [
    { id: "email", label: "Email Campaign", icon: Mail, description: "Send survey link via email" },
    { id: "in-app", label: "In-App Notification", icon: Bell, description: "Display survey within application" },
    { id: "sms", label: "SMS", icon: MessageCircle, description: "Send survey link via SMS" },
    { id: "qr", label: "QR Code", icon: QrCodeIcon, description: "Generate QR code for access" },
    { id: "link", label: "Shareable Link", icon: Share2, description: "Generate shareable survey link" }
  ];

  const schedulingOptions = [
    { id: "immediate", label: "Send Immediately" },
    { id: "scheduled", label: "Schedule for Later" },
    { id: "recurring", label: "Recurring Survey" },
    { id: "trigger", label: "Event-Triggered" }
  ];

  const recurrenceOptions = [
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly" },
    { id: "biannual", label: "Bi-Annual" },
    { id: "annual", label: "Annual" }
  ];

  const questionBank = [
    { id: 1, question: "How satisfied are you with your current job role?", type: "rating", category: "engagement", used: 42 },
    { id: 2, question: "Would you recommend our company as a great place to work?", type: "nps", category: "engagement", used: 38 },
    { id: 3, question: "What do you enjoy most about working here?", type: "open", category: "satisfaction", used: 35 },
    { id: 4, question: "How would you rate your work-life balance?", type: "rating", category: "wellness", used: 40 },
    { id: 5, question: "Do you feel supported by your manager?", type: "multiple", category: "management", used: 45 },
    { id: 6, question: "What areas need improvement in your department?", type: "open", category: "improvement", used: 32 },
    { id: 7, question: "Rate your satisfaction with company benefits:", type: "rating", category: "benefits", used: 28 },
    { id: 8, question: "How clear are your career growth opportunities?", type: "rating", category: "growth", used: 30 }
  ];

  const analyticsData = {
    responseRate: 87,
    completionRate: 91,
    averageNPS: 42,
    totalResponses: 1087,
    departmentComparison: [
      { department: "Engineering", responseRate: 92, satisfaction: 4.2 },
      { department: "Sales", responseRate: 85, satisfaction: 4.0 },
      { department: "Marketing", responseRate: 88, satisfaction: 4.3 },
      { department: "HR", responseRate: 95, satisfaction: 4.5 },
      { department: "Operations", responseRate: 82, satisfaction: 3.9 }
    ],
    trendData: [
      { month: "Jan", engagement: 4.1, responseRate: 84 },
      { month: "Feb", engagement: 4.2, responseRate: 86 },
      { month: "Mar", engagement: 4.3, responseRate: 87 },
      { month: "Apr", engagement: 4.4, responseRate: 89 },
      { month: "May", engagement: 4.3, responseRate: 87 }
    ]
  };

  // Handler Functions
  const handleAddQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      question: "",
      required: false,
      options: type === "multiple" || type === "dropdown" ? ["Option 1", "Option 2"] : [],
      scale: type === "rating" ? 5 : type === "nps" ? 10 : 5,
      // Matrix question structure
      matrixRows: type === "matrix" ? ["Row 1", "Row 2"] : [],
      matrixColumns: type === "matrix" ? ["Column 1", "Column 2", "Column 3"] : [],
      // Ranking question structure
      rankingItems: type === "ranking" ? ["Item 1", "Item 2", "Item 3"] : []
    };
    setQuestions([...questions, newQuestion]);
    setShowQuestionBank(false);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleUseTemplate = (templateId) => {
    const template = surveyTemplates.find(t => t.id === templateId);
    setSelectedTemplate(template);
    setSurveyTitle(`${template.name} Survey`);
    // Add sample questions when template is selected
    setQuestions([
      {
        id: 1,
        type: "rating",
        question: "How satisfied are you with your current role?",
        required: true,
        scale: 5
      },
      {
        id: 2,
        type: "nps",
        question: "How likely are you to recommend working here?",
        required: true,
        scale: 10
      }
    ]);
    showNotification(`Template "${template.name}" loaded with sample questions!`);
  };

  const handleAddFromQuestionBank = (question) => {
    const newQuestion = {
      ...question,
      id: Date.now(),
      required: false
    };
    setQuestions([...questions, newQuestion]);
    setShowQuestionBank(false);
    showNotification(`Question added from bank: "${question.question.substring(0, 50)}..."`);
  };

  const handleLaunchSurvey = () => {
    if (!surveyTitle.trim()) {
      showNotification("Please enter a survey title", "warning");
      return;
    }
    if (questions.length === 0) {
      showNotification("Please add at least one question", "warning");
      return;
    }
    
    const surveyData = {
      id: Date.now(),
      title: surveyTitle,
      questions,
      visibility: surveyVisibility,
      audience: selectedAudience,
      distribution: distributionMethod,
      scheduling,
      status: "active",
      createdAt: new Date().toISOString(),
      launchDate: new Date().toISOString(),
      responses: 0
    };
    
    setSurveys([surveyData, ...surveys]);
    setQuestions([]);
    setSurveyTitle("");
    setSelectedTemplate(null);
    
    showNotification(`"${surveyTitle}" launched successfully! Recipients will receive invitations.`, "success");
    
    // Log to console for debugging
    console.log("Survey launched:", surveyData);
  };

  const handleSaveDraft = () => {
    if (!surveyTitle.trim()) {
      showNotification("Please enter a survey title before saving", "warning");
      return;
    }
    
    const draftData = {
      id: Date.now(),
      title: surveyTitle,
      questions,
      visibility: surveyVisibility,
      audience: selectedAudience,
      distribution: distributionMethod,
      scheduling,
      lastSaved: new Date().toISOString()
    };
    
    const updatedDrafts = [draftData, ...drafts.filter(d => d.title !== surveyTitle)];
    setDrafts(updatedDrafts);
    localStorage.setItem('surveyDrafts', JSON.stringify(updatedDrafts));
    
    showNotification("Survey saved as draft!", "success");
  };

  const handleExportResults = (format) => {
    const data = {
      surveyTitle,
      questions,
      responses: analyticsData,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileName = `${surveyTitle.replace(/\s+/g, '_')}_results_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
    
    showNotification(`Results exported as ${format.toUpperCase()}!`, "success");
  };

  const handleSendReminders = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newNotifications = [
        ...notifications,
        {
          id: notifications.length + 1,
          message: `Reminders sent for "${surveyTitle}"`,
          type: "info",
          read: false
        }
      ];
      setNotifications(newNotifications);
      setIsRefreshing(false);
      
      showNotification(`Reminders sent successfully to non-respondents!`, "success");
    }, 1500);
  };

  const handleScheduleSurvey = () => {
    if (!surveyTitle.trim() || questions.length === 0) {
      showNotification("Please complete survey details before scheduling", "warning");
      return;
    }
    
    if (scheduling === "scheduled" && (!scheduleDate || !scheduleTime)) {
      showNotification("Please select date and time for scheduled survey", "warning");
      return;
    }
    
    const surveySchedule = {
      id: Date.now(),
      title: surveyTitle,
      questions,
      method: distributionMethod,
      audience: selectedAudience,
      scheduledFor: scheduling === "immediate" ? new Date().toISOString() : `${scheduleDate}T${scheduleTime}:00`,
      recurrence: scheduling === "recurring" ? recurrencePattern : null,
      status: "scheduled",
      createdAt: new Date().toISOString()
    };
    
    if (scheduling === "recurring") {
      setRecurringSurveys([...recurringSurveys, surveySchedule]);
      showNotification(`Recurring survey scheduled (${recurrencePattern})!`, "success");
    } else {
      setScheduledSurveys([...scheduledSurveys, surveySchedule]);
      showNotification(`Survey scheduled for ${new Date(surveySchedule.scheduledFor).toLocaleString()}!`, "success");
    }
    
    setShowScheduleModal(false);
    console.log("Survey scheduled:", surveySchedule);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      showNotification("Data refreshed successfully!", "success");
    }, 1000);
  };

  const handleNewSurvey = () => {
    setSurveyTitle("");
    setQuestions([]);
    setSelectedTemplate(null);
    setSurveyVisibility("anonymous");
    setSelectedAudience("all");
    setDistributionMethod("email");
    setScheduling("immediate");
    setActiveTab("create");
    
    showNotification("New survey started. All fields cleared.", "info");
  };

  const handleDuplicateSurvey = (survey) => {
    const duplicatedSurvey = {
      ...survey,
      id: Date.now(),
      title: `${survey.title} (Copy)`,
      createdAt: new Date().toISOString(),
      status: "draft"
    };
    
    setSurveys([duplicatedSurvey, ...surveys]);
    showNotification(`Survey duplicated as "${duplicatedSurvey.title}"`, "success");
  };

  const handleViewSurvey = (survey) => {
    setSurveyTitle(survey.title);
    setQuestions(survey.questions || []);
    setSurveyVisibility(survey.visibility || "anonymous");
    setSelectedAudience(survey.audience || "all");
    setDistributionMethod(survey.distribution || "email");
    setScheduling(survey.scheduling || "immediate");
    setActiveTab("create");
    
    showNotification(`Loaded survey: "${survey.title}"`, "info");
  };

  const handleToggleQuestionBank = () => {
    setShowQuestionBank(!showQuestionBank);
  };

  const handleClearSurvey = () => {
    if (window.confirm("Are you sure you want to clear all questions?")) {
      setQuestions([]);
      showNotification("All questions cleared", "info");
    }
  };

  const handleFilterAnalytics = () => {
    showNotification("Analytics filters applied", "info");
  };

  const handleToggleNotification = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: !notification.read } : notification
    ));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    showNotification("All notifications marked as read", "success");
  };

  const handleExportPDF = () => {
    handleExportResults("pdf");
  };

  const handleExportExcel = () => {
    handleExportResults("excel");
  };

  const handleShareSurvey = () => {
    if (navigator.share) {
      navigator.share({
        title: surveyTitle,
        text: "Check out this survey I created",
        url: window.location.href
      }).then(() => {
        showNotification("Survey shared successfully!", "success");
      }).catch(() => {
        showNotification("Sharing cancelled", "info");
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      showNotification("Survey link copied to clipboard!", "success");
    }
  };

  const handleGenerateQRCode = () => {
    showNotification("QR Code generated for survey access", "success");
    // In a real app, this would generate and display a QR code
  };

  const handleUpdateReminderSettings = (field, value) => {
    setReminderSettings({ ...reminderSettings, [field]: value });
    showNotification("Reminder settings updated", "info");
  };

  const handleUpdateSurveyLogic = (field) => {
    setSurveyLogic({ ...surveyLogic, [field]: !surveyLogic[field] });
    showNotification(`${field} ${!surveyLogic[field] ? 'enabled' : 'disabled'}`, "info");
  };

  const handleLoadDraft = (draft) => {
    setSurveyTitle(draft.title);
    setQuestions(draft.questions || []);
    setSurveyVisibility(draft.visibility || "anonymous");
    setSelectedAudience(draft.audience || "all");
    setDistributionMethod(draft.distribution || "email");
    setScheduling(draft.scheduling || "immediate");
    setActiveTab("create");
    
    showNotification(`Draft "${draft.title}" loaded`, "info");
  };

  const handleDeleteDraft = (draftId) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      const updatedDrafts = drafts.filter(d => d.id !== draftId);
      setDrafts(updatedDrafts);
      localStorage.setItem('surveyDrafts', JSON.stringify(updatedDrafts));
      showNotification("Draft deleted", "success");
    }
  };

  const showNotification = (message, type = "info") => {
    // Create a temporary notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      min-width: 300px;
      max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const styles = {
    container: {
      background: "#f8fafc",
      minHeight: "100vh",
      padding: "24px",
      fontFamily: "'Inter', sans-serif"
    },
    header: {
      background: "white",
      padding: "24px",
      borderRadius: "12px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    mainTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 8px 0",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    subtitle: {
      fontSize: "14px",
      color: "#64748b",
      margin: "0"
    },
    headerActions: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      position: "relative"
    },
    notificationsButton: {
      position: "relative",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    notificationsBadge: {
      position: "absolute",
      top: "-5px",
      right: "-5px",
      background: "#ef4444",
      color: "white",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      fontSize: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    notificationsPanel: {
      position: "absolute",
      top: "100%",
      right: 0,
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      width: "300px",
      maxHeight: "400px",
      overflow: "auto",
      zIndex: 1000
    },
    notificationItem: {
      padding: "12px",
      borderBottom: "1px solid #f3f4f6",
      cursor: "pointer",
      transition: "background 0.2s"
    },
    navTabs: {
      display: "flex",
      gap: "4px",
      background: "#f1f5f9",
      padding: "4px",
      borderRadius: "8px",
      marginBottom: "24px"
    },
    navTab: {
      flex: 1,
      padding: "12px 16px",
      borderRadius: "6px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      color: "#64748b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "all 0.2s"
    },
    activeNavTab: {
      background: "white",
      color: "#3b82f6",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    },
    sectionCard: {
      background: "white",
      padding: "24px",
      borderRadius: "12px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#1e293b",
      margin: "0 0 20px 0",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    grid2Col: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "20px",
      marginBottom: "24px"
    },
    grid3Col: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px",
      marginBottom: "24px"
    },
    grid4Col: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px",
      marginBottom: "24px"
    },
    formGroup: {
      marginBottom: "16px"
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "6px"
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      background: "white",
      cursor: "pointer"
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      cursor: "text"
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      minHeight: "80px",
      resize: "vertical",
      cursor: "text"
    },
    checkboxGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "8px"
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      cursor: "pointer"
    },
    radioGroup: {
      display: "flex",
      gap: "16px",
      marginTop: "8px"
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      cursor: "pointer"
    },
    button: {
      padding: "10px 20px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      background: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s",
      minHeight: "40px"
    },
    primaryButton: {
      background: "#3b82f6",
      color: "white",
      borderColor: "#3b82f6"
    },
    secondaryButton: {
      background: "#eff6ff",
      color: "#3b82f6",
      borderColor: "#3b82f6"
    },
    successButton: {
      background: "#10b981",
      color: "white",
      borderColor: "#10b981"
    },
    outlineButton: {
      background: "white",
      color: "#3b82f6",
      borderColor: "#3b82f6"
    },
    chip: {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "500",
      background: "#f1f5f9",
      color: "#64748b",
      marginRight: "8px",
      marginBottom: "8px"
    },
    card: {
      background: "white",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      marginBottom: "12px",
      cursor: "pointer",
      transition: "all 0.2s"
    },
    selectedCard: {
      borderColor: "#3b82f6",
      background: "#f0f9ff",
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)"
    },
    questionCard: {
      background: "#f8fafc",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      marginBottom: "12px",
      position: "relative"
    },
    metricCard: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      textAlign: "center"
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
      marginTop: "24px",
      justifyContent: "flex-end",
      flexWrap: "wrap"
    },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      marginTop: "8px"
    },
    smallButton: {
      padding: "6px 12px",
      fontSize: "12px"
    },
    searchBox: {
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      width: "300px",
      cursor: "text"
    },
    previewContainer: {
      background: "#f9fafb",
      padding: "20px",
      borderRadius: "8px",
      border: "2px dashed #d1d5db",
      minHeight: "200px"
    },
    draftsList: {
      marginTop: "20px",
      paddingTop: "20px",
      borderTop: "1px solid #e5e7eb"
    },
    draftItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      marginBottom: "8px",
      background: "#f9fafb"
    }
  };

  // Render Functions (keep your existing render functions, but update button onClick handlers)

  const renderCreateSurvey = () => (
    <div className="fade-in">
      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><Plus size={20} />Survey Creation</h4>
        
        <div style={styles.grid2Col}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Survey Title</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Enter survey title"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Visibility Mode</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  checked={surveyVisibility === "anonymous"}
                  onChange={() => setSurveyVisibility("anonymous")}
                />
                <span>Anonymous</span>
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  checked={surveyVisibility === "identified"}
                  onChange={() => setSurveyVisibility("identified")}
                />
                <span>Identified</span>
              </label>
            </div>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Survey Description</label>
          <textarea
            style={styles.textarea}
            placeholder="Describe the purpose of this survey..."
            rows={3}
          />
        </div>
      </div>

      <div style={styles.sectionCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h4 style={styles.sectionTitle}><FileText size={20} />Survey Questions ({questions.length})</h4>
          <div style={styles.buttonGroup}>
            <button 
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handleToggleQuestionBank}
            >
              <BookOpen size={16} /> Question Bank
            </button>
            {questions.length > 0 && (
              <button 
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={handleClearSurvey}
              >
                <Trash2 size={16} /> Clear All
              </button>
            )}
            <button 
              style={{ ...styles.button, ...styles.primaryButton }}
              onClick={() => setShowQuestionBank(true)}
            >
              <Plus size={16} /> Add Question
            </button>
          </div>
        </div>

        {showQuestionBank && (
          <div style={{ marginBottom: "24px", animation: "fadeIn 0.3s ease-out" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h5 style={{ ...styles.label, fontSize: "16px", margin: 0 }}>Question Types</h5>
              <input
                type="text"
                style={styles.searchBox}
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div style={styles.grid3Col}>
              {questionTypes.map(type => (
                <div 
                  key={type.id}
                  style={styles.card}
                  onClick={() => handleAddQuestion(type.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <div style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "8px", 
                      background: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <type.icon size={20} color="#3b82f6" />
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px" }}>{type.label}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{type.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "24px" }}>
              <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Question Bank</h5>
              {questionBank.map(q => (
                <div key={q.id} style={styles.questionCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "500", marginBottom: "4px" }}>{q.question}</div>
                      <div style={{ display: "flex", gap: "8px", fontSize: "12px", color: "#6b7280" }}>
                        <span style={styles.chip}>{q.type}</span>
                        <span style={styles.chip}>Used {q.used} times</span>
                      </div>
                    </div>
                    <button 
                      style={{ ...styles.button, ...styles.smallButton }}
                      onClick={() => handleAddFromQuestionBank(q)}
                    >
                      <Plus size={12} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {questions.length > 0 ? (
          <div>
            {questions.map((q, index) => (
              <div key={q.id} style={styles.questionCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ fontWeight: "600", color: "#3b82f6" }}>Q{index + 1}</span>
                      <input
                        type="text"
                        style={{ ...styles.input, flex: 1 }}
                        placeholder="Enter your question here..."
                        value={q.question}
                        onChange={(e) => handleQuestionChange(q.id, "question", e.target.value)}
                      />
                    </div>
                    
                    {/* Question type specific inputs */}
                    {q.type === "rating" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                        <span style={{ fontSize: "13px" }}>Scale:</span>
                        <select 
                          style={{ ...styles.select, width: "100px" }}
                          value={q.scale}
                          onChange={(e) => handleQuestionChange(q.id, "scale", parseInt(e.target.value))}
                        >
                          <option value="3">1-3</option>
                          <option value="5">1-5</option>
                          <option value="7">1-7</option>
                          <option value="10">1-10</option>
                        </select>
                      </div>
                    )}
                    
                    {q.type === "multiple" && (
                      <div style={{ marginTop: "12px" }}>
                        <div style={{ fontSize: "13px", marginBottom: "8px" }}>Options:</div>
                        {q.options.map((option, optIndex) => (
                          <div key={optIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                            <input
                              type="text"
                              style={{ ...styles.input, flex: 1 }}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...q.options];
                                newOptions[optIndex] = e.target.value;
                                handleQuestionChange(q.id, "options", newOptions);
                              }}
                            />
                            <button 
                              style={{ ...styles.button, ...styles.smallButton }}
                              onClick={() => {
                                const newOptions = q.options.filter((_, i) => i !== optIndex);
                                handleQuestionChange(q.id, "options", newOptions);
                              }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        <button 
                          style={{ ...styles.button, ...styles.outlineButton, ...styles.smallButton }}
                          onClick={() => {
                            const newOptions = [...q.options, `Option ${q.options.length + 1}`];
                            handleQuestionChange(q.id, "options", newOptions);
                          }}
                        >
                          <Plus size={12} /> Add Option
                        </button>
                      </div>
                    )}

                    {q.type === "matrix" && (
                      <div style={{ marginTop: "12px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                          <div>
                            <div style={{ fontSize: "13px", marginBottom: "8px", fontWeight: "500" }}>Matrix Rows (Questions):</div>
                            {(q.matrixRows || []).map((row, rowIndex) => (
                              <div key={rowIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                <input
                                  type="text"
                                  style={{ ...styles.input, flex: 1 }}
                                  value={row}
                                  onChange={(e) => {
                                    const newRows = [...(q.matrixRows || [])];
                                    newRows[rowIndex] = e.target.value;
                                    handleQuestionChange(q.id, "matrixRows", newRows);
                                  }}
                                />
                                <button 
                                  style={{ ...styles.button, ...styles.smallButton }}
                                  onClick={() => {
                                    const newRows = (q.matrixRows || []).filter((_, i) => i !== rowIndex);
                                    handleQuestionChange(q.id, "matrixRows", newRows);
                                  }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                            <button 
                              style={{ ...styles.button, ...styles.outlineButton, ...styles.smallButton }}
                              onClick={() => {
                                const newRows = [...(q.matrixRows || []), `Row ${(q.matrixRows || []).length + 1}`];
                                handleQuestionChange(q.id, "matrixRows", newRows);
                              }}
                            >
                              <Plus size={12} /> Add Row
                            </button>
                          </div>
                          <div>
                            <div style={{ fontSize: "13px", marginBottom: "8px", fontWeight: "500" }}>Matrix Columns (Options):</div>
                            {(q.matrixColumns || []).map((col, colIndex) => (
                              <div key={colIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                <input
                                  type="text"
                                  style={{ ...styles.input, flex: 1 }}
                                  value={col}
                                  onChange={(e) => {
                                    const newCols = [...(q.matrixColumns || [])];
                                    newCols[colIndex] = e.target.value;
                                    handleQuestionChange(q.id, "matrixColumns", newCols);
                                  }}
                                />
                                <button 
                                  style={{ ...styles.button, ...styles.smallButton }}
                                  onClick={() => {
                                    const newCols = (q.matrixColumns || []).filter((_, i) => i !== colIndex);
                                    handleQuestionChange(q.id, "matrixColumns", newCols);
                                  }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                            <button 
                              style={{ ...styles.button, ...styles.outlineButton, ...styles.smallButton }}
                              onClick={() => {
                                const newCols = [...(q.matrixColumns || []), `Column ${(q.matrixColumns || []).length + 1}`];
                                handleQuestionChange(q.id, "matrixColumns", newCols);
                              }}
                            >
                              <Plus size={12} /> Add Column
                            </button>
                          </div>
                        </div>
                        <div style={{ padding: "12px", background: "#f9fafb", borderRadius: "6px", fontSize: "12px", color: "#6b7280" }}>
                          Matrix questions allow respondents to rate multiple items on the same scale.
                        </div>
                      </div>
                    )}

                    {q.type === "ranking" && (
                      <div style={{ marginTop: "12px" }}>
                        <div style={{ fontSize: "13px", marginBottom: "8px" }}>Items to Rank:</div>
                        {(q.rankingItems || []).map((item, itemIndex) => (
                          <div key={itemIndex} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                            <span style={{ fontSize: "14px", color: "#6b7280", width: "24px" }}>{itemIndex + 1}.</span>
                            <input
                              type="text"
                              style={{ ...styles.input, flex: 1 }}
                              value={item}
                              onChange={(e) => {
                                const newItems = [...(q.rankingItems || [])];
                                newItems[itemIndex] = e.target.value;
                                handleQuestionChange(q.id, "rankingItems", newItems);
                              }}
                            />
                            <button 
                              style={{ ...styles.button, ...styles.smallButton }}
                              onClick={() => {
                                const newItems = (q.rankingItems || []).filter((_, i) => i !== itemIndex);
                                handleQuestionChange(q.id, "rankingItems", newItems);
                              }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        <button 
                          style={{ ...styles.button, ...styles.outlineButton, ...styles.smallButton }}
                          onClick={() => {
                            const newItems = [...(q.rankingItems || []), `Item ${(q.rankingItems || []).length + 1}`];
                            handleQuestionChange(q.id, "rankingItems", newItems);
                          }}
                        >
                          <Plus size={12} /> Add Item
                        </button>
                        <div style={{ marginTop: "8px", padding: "12px", background: "#f9fafb", borderRadius: "6px", fontSize: "12px", color: "#6b7280" }}>
                          Respondents will rank these items in order of preference.
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={styles.buttonGroup}>
                    <button 
                      style={{ ...styles.button, ...styles.smallButton }}
                      onClick={() => handleRemoveQuestion(q.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                  <label style={{ ...styles.checkboxLabel, fontSize: "13px" }}>
                    <input
                      type="checkbox"
                      checked={q.required}
                      onChange={(e) => handleQuestionChange(q.id, "required", e.target.checked)}
                    />
                    <span>Required question</span>
                  </label>
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>
                    {q.type.charAt(0).toUpperCase() + q.type.slice(1)} Question
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.previewContainer}>
            <div style={{ textAlign: "center", color: "#6b7280" }}>
              <FileText size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
              <p style={{ marginBottom: "8px" }}>No questions added yet</p>
              <p style={{ fontSize: "14px" }}>Click "Add Question" to start building your survey</p>
            </div>
          </div>
        )}
      </div>

      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><Clock size={20} />Survey Settings</h4>
        
        <div style={styles.grid3Col}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Survey Expiry</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input 
                type="number" 
                style={styles.input} 
                placeholder="7" 
                value={surveyExpiry.value}
                onChange={(e) => setSurveyExpiry({...surveyExpiry, value: parseInt(e.target.value) || 7})}
              />
              <select 
                style={styles.select}
                value={surveyExpiry.unit}
                onChange={(e) => setSurveyExpiry({...surveyExpiry, unit: e.target.value})}
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Reminder Settings</label>
            <select 
              style={styles.select}
              value={`${reminderSettings.frequency}`}
              onChange={(e) => handleUpdateReminderSettings("frequency", parseInt(e.target.value))}
            >
              <option value="1">Send 1 reminder</option>
              <option value="2">Send 2 reminders</option>
              <option value="3">Send 3 reminders</option>
              <option value="0">No reminders</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Completion Message</label>
            <select 
              style={styles.select}
              value={completionMessage}
              onChange={(e) => setCompletionMessage(e.target.value)}
            >
              <option value="show thank you message">Show thank you message</option>
              <option value="redirect to website">Redirect to website</option>
              <option value="show results summary">Show results summary</option>
              <option value="custom message">Custom message</option>
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Survey Logic & Skip Patterns</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={surveyLogic.skipLogic}
                onChange={() => handleUpdateSurveyLogic("skipLogic")}
              />
              <span>Enable skip logic based on responses</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={surveyLogic.randomize}
                onChange={() => handleUpdateSurveyLogic("randomize")}
              />
              <span>Randomize question order</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={surveyLogic.progressBar}
                onChange={() => handleUpdateSurveyLogic("progressBar")}
              />
              <span>Show progress bar</span>
            </label>
          </div>
        </div>
      </div>

      {/* Drafts Section */}
      {drafts.length > 0 && (
        <div style={styles.draftsList}>
          <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Saved Drafts</h5>
          {drafts.map(draft => (
            <div key={draft.id} style={styles.draftItem}>
              <div>
                <div style={{ fontWeight: "500" }}>{draft.title}</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>
                  {draft.questions?.length || 0} questions • Last saved: {new Date(draft.lastSaved).toLocaleDateString()}
                </div>
              </div>
              <div style={styles.buttonGroup}>
                <button 
                  style={{ ...styles.button, ...styles.smallButton }}
                  onClick={() => handleLoadDraft(draft)}
                >
                  <Eye size={12} /> Load
                </button>
                <button 
                  style={{ ...styles.button, ...styles.smallButton }}
                  onClick={() => handleDeleteDraft(draft.id)}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Update your other render functions similarly, replacing button onClick handlers with actual functions

  const renderDistributeSurvey = () => (
    <div className="fade-in">
      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><Send size={20} />Survey Distribution</h4>
        
        <div style={styles.grid2Col}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Distribution Method</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {distributionMethods.map(method => (
                <div 
                  key={method.id}
                  style={{
                    ...styles.card,
                    ...(distributionMethod === method.id ? styles.selectedCard : {})
                  }}
                  onClick={() => setDistributionMethod(method.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <method.icon size={20} color={distributionMethod === method.id ? "#3b82f6" : "#6b7280"} />
                    <div>
                      <div style={{ fontWeight: "500" }}>{method.label}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{method.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Scheduling</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {schedulingOptions.map(option => (
                <div 
                  key={option.id}
                  style={{
                    ...styles.card,
                    ...(scheduling === option.id ? styles.selectedCard : {})
                  }}
                  onClick={() => setScheduling(option.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Calendar size={20} color={scheduling === option.id ? "#3b82f6" : "#6b7280"} />
                    <div style={{ fontWeight: "500" }}>{option.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {scheduling === "scheduled" && (
              <div style={{ marginTop: "16px" }}>
                <div style={styles.grid2Col}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Schedule Date</label>
                    <input
                      type="date"
                      style={styles.input}
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Schedule Time</label>
                    <input
                      type="time"
                      style={styles.input}
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {scheduling === "recurring" && (
              <div style={{ marginTop: "16px" }}>
                <label style={styles.label}>Recurrence Pattern</label>
                <select
                  style={styles.select}
                  value={recurrencePattern}
                  onChange={(e) => setRecurrencePattern(e.target.value)}
                >
                  {recurrenceOptions.map(recurrence => (
                    <option key={recurrence.id} value={recurrence.id}>{recurrence.label}</option>
                  ))}
                </select>
                <div style={{ marginTop: "12px", padding: "12px", background: "#f0f9ff", borderRadius: "6px", fontSize: "13px", color: "#1e40af" }}>
                  This survey will be automatically sent {recurrencePattern === "weekly" ? "every week" :
                  recurrencePattern === "monthly" ? "every month" :
                  recurrencePattern === "quarterly" ? "every quarter" :
                  recurrencePattern === "biannual" ? "twice a year" : "annually"}.
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Target Audience</label>
          <div style={styles.grid3Col}>
            {targetAudiences.map(audience => (
              <div 
                key={audience.id}
                style={{
                  ...styles.card,
                  ...(selectedAudience === audience.id ? styles.selectedCard : {})
                }}
                onClick={() => setSelectedAudience(audience.id)}
              >
                <div style={{ textAlign: "center" }}>
                  <UsersIcon size={24} style={{ marginBottom: "8px", color: selectedAudience === audience.id ? "#3b82f6" : "#6b7280" }} />
                  <div style={{ fontWeight: "500", marginBottom: "4px" }}>{audience.label}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{audience.count} employees</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><Bell size={20} />Distribution & Participation Tracking</h4>
        
        <div style={styles.grid4Col}>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#3b82f6", marginBottom: "8px" }}>1,250</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Total Recipients</div>
            <div style={{ fontSize: "12px", color: "#10b981" }}>100% target audience</div>
          </div>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#10b981", marginBottom: "8px" }}>1,087</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Emails Sent</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>87% delivery rate</div>
          </div>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#f59e0b", marginBottom: "8px" }}>945</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Opened</div>
            <div style={{ fontSize: "12px", color: "#10b981" }}>87% open rate</div>
          </div>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#8b5cf6", marginBottom: "8px" }}>782</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Started</div>
            <div style={{ fontSize: "12px", color: "#f59e0b" }}>72% start rate</div>
          </div>
        </div>

        <div style={{ marginTop: "24px", padding: "16px", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #bae6fd" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h5 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Survey Completion Status</h5>
            <span style={{ ...styles.chip, background: "#d1fae5", color: "#065f46" }}>
              {Math.round((782 / 1250) * 100)}% Completion Rate
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            <div style={{ padding: "12px", background: "white", borderRadius: "6px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#3b82f6", marginBottom: "4px" }}>782</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Completed</div>
            </div>
            <div style={{ padding: "12px", background: "white", borderRadius: "6px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#f59e0b", marginBottom: "4px" }}>163</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>In Progress</div>
            </div>
            <div style={{ padding: "12px", background: "white", borderRadius: "6px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#ef4444", marginBottom: "4px" }}>305</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Not Started</div>
            </div>
            <div style={{ padding: "12px", background: "white", borderRadius: "6px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#6b7280", marginBottom: "4px" }}>0</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Bounced</div>
            </div>
          </div>
          <div style={{ marginTop: "16px", padding: "12px", background: "white", borderRadius: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>Reminder Status</span>
              <span style={{ fontSize: "14px", color: "#6b7280" }}>2 of 3 reminders sent</span>
            </div>
            <div style={{ height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: "67%", height: "100%", background: "#3b82f6", borderRadius: "4px" }}></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleLaunchSurvey}
          >
            <Send size={16} /> Launch Survey Now
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={() => {
              if (scheduling === "scheduled" || scheduling === "recurring") {
                handleScheduleSurvey();
              } else {
                setShowScheduleModal(true);
              }
            }}
          >
            <Calendar size={16} /> Schedule Campaign
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleSendReminders}
          >
            <BellRing size={16} /> Send Reminders
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleShareSurvey}
          >
            <Share2 size={16} /> Share Link
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleGenerateQRCode}
          >
            <QrCodeIcon size={16} /> Generate QR
          </button>
        </div>

        {(scheduledSurveys.length > 0 || recurringSurveys.length > 0) && (
          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #e5e7eb" }}>
            <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Scheduled & Recurring Surveys</h5>
            
            {scheduledSurveys.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px", color: "#6b7280" }}>One-Time Scheduled</div>
                {scheduledSurveys.map(survey => (
                  <div key={survey.id} style={{ ...styles.card, marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: "500" }}>{survey.title}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          Scheduled for: {new Date(survey.scheduledFor).toLocaleString()}
                        </div>
                      </div>
                      <span style={{ ...styles.chip, background: "#fef3c7", color: "#92400e" }}>Scheduled</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {recurringSurveys.length > 0 && (
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px", color: "#6b7280" }}>Recurring Surveys</div>
                {recurringSurveys.map(survey => (
                  <div key={survey.id} style={{ ...styles.card, marginBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: "500" }}>{survey.title}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          Recurrence: {survey.recurrence === "weekly" ? "Weekly" :
                          survey.recurrence === "monthly" ? "Monthly" :
                          survey.recurrence === "quarterly" ? "Quarterly" :
                          survey.recurrence === "biannual" ? "Bi-Annual" : "Annual"}
                        </div>
                      </div>
                      <span style={{ ...styles.chip, background: "#dbeafe", color: "#1e40af" }}>Recurring</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="fade-in">
      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><BarChart3 size={20} />Survey Analytics Dashboard</h4>
        
        <div style={styles.grid4Col}>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#3b82f6", marginBottom: "8px" }}>
              {analyticsData.responseRate}%
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Response Rate</div>
            <div style={{ fontSize: "12px", color: "#10b981" }}>↑ 3% from last month</div>
          </div>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#10b981", marginBottom: "8px" }}>
              {analyticsData.completionRate}%
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Completion Rate</div>
            <div style={{ fontSize: "12px", color: "#10b981" }}>↑ 2% from last month</div>
          </div>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#8b5cf6", marginBottom: "8px" }}>
              {analyticsData.averageNPS}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Average NPS Score</div>
            <div style={{ fontSize: "12px", color: analyticsData.averageNPS >= 50 ? "#10b981" : "#f59e0b" }}>
              {analyticsData.averageNPS >= 50 ? "Excellent" : analyticsData.averageNPS >= 0 ? "Good" : "Needs Improvement"}
            </div>
          </div>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#f59e0b", marginBottom: "8px" }}>
              {analyticsData.totalResponses}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Total Responses</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Out of 1,250 recipients</div>
          </div>
        </div>

        <div style={{ marginTop: "24px", padding: "16px", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #bae6fd" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <Target size={20} color="#3b82f6" />
            <h5 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Question-wise Analysis</h5>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            <div style={{ padding: "12px", background: "white", borderRadius: "6px" }}>
              <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Q1: Job Satisfaction</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ flex: 1, height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "82%", height: "100%", background: "#3b82f6", borderRadius: "4px" }}></div>
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>4.1/5</span>
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>1,087 responses</div>
            </div>
            <div style={{ padding: "12px", background: "white", borderRadius: "6px" }}>
              <div style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Q2: NPS Score</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ flex: 1, height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: "84%", height: "100%", background: "#10b981", borderRadius: "4px" }}></div>
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600" }}>42/100</span>
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>945 responses</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><PieChart size={20} />Department Comparison</h4>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "12px", fontWeight: "500", color: "#374151" }}>Department</th>
                <th style={{ textAlign: "center", padding: "12px", fontWeight: "500", color: "#374151" }}>Response Rate</th>
                <th style={{ textAlign: "center", padding: "12px", fontWeight: "500", color: "#374151" }}>Satisfaction Score</th>
                <th style={{ textAlign: "center", padding: "12px", fontWeight: "500", color: "#374151" }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.departmentComparison.map(dept => (
                <tr key={dept.department} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{dept.department}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>{dept.responseRate}%</div>
                      <div style={{
                        width: "60px",
                        height: "6px",
                        background: "#e5e7eb",
                        borderRadius: "3px",
                        overflow: "hidden"
                      }}>
                        <div style={{
                          width: `${dept.responseRate}%`,
                          height: "100%",
                          background: "#3b82f6",
                          borderRadius: "3px"
                        }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <div style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      background: dept.satisfaction >= 4 ? "#d1fae5" : "#fef3c7",
                      color: dept.satisfaction >= 4 ? "#065f46" : "#92400e",
                      borderRadius: "12px",
                      fontWeight: "600"
                    }}>
                      {dept.satisfaction}/5
                    </div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <TrendingUp size={16} color={dept.responseRate > 85 ? "#10b981" : "#f59e0b"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><LineChart size={20} />Trend Analysis</h4>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>Engagement Score Trend</div>
            <div style={{ fontSize: "24px", fontWeight: "600" }}>4.3/5</div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handleExportResults}
            >
              <Download size={16} /> Export Data
            </button>
            <button 
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handleFilterAnalytics}
            >
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div style={{
          display: "flex",
          height: "200px",
          alignItems: "flex-end",
          gap: "20px",
          padding: "20px 0",
          borderTop: "1px solid #e5e7eb"
        }}>
          {analyticsData.trendData.map((month, index) => (
            <div key={month.month} style={{ flex: 1, textAlign: "center" }}>
              <div style={{
                height: `${(month.engagement - 3) * 40}px`,
                background: "linear-gradient(to top, #3b82f6, #60a5fa)",
                borderRadius: "4px 4px 0 0",
                marginBottom: "8px"
              }}></div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>{month.month}</div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>{month.engagement}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><TrendingUp size={20} />Correlation Analysis</h4>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
          Identify relationships between survey responses and employee demographics
        </p>
        <div style={styles.grid2Col}>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Satisfaction vs Tenure</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px" }}>Correlation: +0.72</div>
            <div style={{ 
              height: "100px", 
              background: "linear-gradient(to right, #3b82f6, #60a5fa, #93c5fd)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "flex-end",
              padding: "8px"
            }}>
              <div style={{ fontSize: "12px", color: "white" }}>Strong positive correlation</div>
            </div>
          </div>
          <div style={styles.metricCard}>
            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Engagement vs Department</div>
            <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "12px" }}>Variance: 0.35</div>
            <div style={{ 
              height: "100px", 
              background: "linear-gradient(to right, #10b981, #34d399, #6ee7b7)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "flex-end",
              padding: "8px"
            }}>
              <div style={{ fontSize: "12px", color: "white" }}>Moderate variation across departments</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.sectionCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h4 style={styles.sectionTitle}><MessageSquare size={20} />Sentiment Analysis</h4>
          <div style={{ display: "flex", gap: "8px" }}>
            <button 
              style={{ ...styles.button, ...styles.primaryButton }}
              onClick={handleExportPDF}
            >
              <DownloadCloud size={16} /> Export PDF
            </button>
            <button 
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handleExportExcel}
            >
              <DownloadCloud size={16} /> Export Excel
            </button>
          </div>
        </div>

        <div style={styles.grid2Col}>
          <div>
            <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Word Cloud</h5>
            <div style={{
              background: "#f9fafb",
              padding: "24px",
              borderRadius: "8px",
              minHeight: "200px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {["Great", "Supportive", "Challenging", "Growth", "Balance", "Collaborative", "Flexible", "Innovative"].map(word => (
                <span key={word} style={{
                  fontSize: `${Math.random() * 20 + 14}px`,
                  fontWeight: "600",
                  color: "#3b82f6",
                  opacity: Math.random() * 0.5 + 0.5
                }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Sentiment Breakdown</h5>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px" }}>Positive</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#10b981" }}>68%</span>
              </div>
              <div style={{ height: "12px", background: "#e5e7eb", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ width: "68%", height: "100%", background: "#10b981", borderRadius: "6px" }}></div>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px" }}>Neutral</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#6b7280" }}>22%</span>
              </div>
              <div style={{ height: "12px", background: "#e5e7eb", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ width: "22%", height: "100%", background: "#6b7280", borderRadius: "6px" }}></div>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px" }}>Negative</span>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#ef4444" }}>10%</span>
              </div>
              <div style={{ height: "12px", background: "#e5e7eb", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ width: "10%", height: "100%", background: "#ef4444", borderRadius: "6px" }}></div>
              </div>
            </div>

            <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px", marginTop: "24px" }}>Actionable Insights</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={styles.card}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <AlertCircle size={16} color="#f59e0b" />
                  <div>
                    <div style={{ fontWeight: "500" }}>Management Feedback Needed</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>23% of responses mention management issues</div>
                  </div>
                </div>
              </div>
              <div style={styles.card}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <CheckSquare size={16} color="#10b981" />
                  <div>
                    <div style={{ fontWeight: "500" }}>High Work-Life Balance Satisfaction</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>87% positive responses on flexible work</div>
                  </div>
                </div>
              </div>
              <div style={styles.card}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <TrendingUp size={16} color="#3b82f6" />
                  <div>
                    <div style={{ fontWeight: "500" }}>Improvement in Career Growth</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>15% increase in growth opportunity ratings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="fade-in">
      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><BookOpen size={20} />Survey Templates</h4>
        
        <div style={{ marginBottom: "24px" }}>
          <input
            type="text"
            style={styles.searchBox}
            placeholder="Search templates..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={styles.grid3Col}>
          {surveyTemplates.map(template => {
            const Icon = template.icon;
            return (
              <div 
                key={template.id}
                style={{
                  ...styles.card,
                  ...(selectedTemplate?.id === template.id ? styles.selectedCard : {}),
                  cursor: "pointer"
                }}
                onClick={() => handleUseTemplate(template.id)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "10px", 
                    background: selectedTemplate?.id === template.id ? "#dbeafe" : "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Icon size={24} color={selectedTemplate?.id === template.id ? "#3b82f6" : "#6b7280"} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "16px" }}>{template.name}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>{template.questions} questions • {template.estimatedTime}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ ...styles.chip, background: "#d1fae5", color: "#065f46" }}>
                    {template.usage}
                  </span>
                  <button 
                    style={{ ...styles.button, ...styles.outlineButton, ...styles.smallButton }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(template.id);
                    }}
                  >
                    <Copy size={12} /> Use Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "24px" }}>
          <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Recently Used Surveys</h5>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: "500" }}>Q1 Engagement Survey 2024</div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>Launched: Jan 15, 2024 • Responses: 1,087</div>
                </div>
                <div style={styles.buttonGroup}>
                  <button 
                    style={{ ...styles.button, ...styles.smallButton }}
                    onClick={() => handleViewSurvey({
                      title: "Q1 Engagement Survey 2024",
                      questions: questionBank.slice(0, 3),
                      visibility: "anonymous"
                    })}
                  >
                    <Eye size={12} /> View
                  </button>
                  <button 
                    style={{ ...styles.button, ...styles.smallButton }}
                    onClick={() => handleDuplicateSurvey({
                      title: "Q1 Engagement Survey 2024",
                      questions: questionBank.slice(0, 3),
                      visibility: "anonymous"
                    })}
                  >
                    <Copy size={12} /> Duplicate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestionBankSection = () => (
    <div className="fade-in">
      <div style={styles.sectionCard}>
        <h4 style={styles.sectionTitle}><Database size={20} />Question Bank Management</h4>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <input
            type="text"
            style={styles.searchBox}
            placeholder="Search questions by keyword, type, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={() => handleAddQuestion("multiple")}
          >
            <Plus size={16} /> Add New Question
          </button>
        </div>

        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
          <button style={{ ...styles.button, ...styles.secondaryButton }}>All Categories</button>
          <button style={{ ...styles.button, ...styles.outlineButton }}>Engagement</button>
          <button style={{ ...styles.button, ...styles.outlineButton }}>Satisfaction</button>
          <button style={{ ...styles.button, ...styles.outlineButton }}>Management</button>
          <button style={{ ...styles.button, ...styles.outlineButton }}>Benefits</button>
          <button style={{ ...styles.button, ...styles.outlineButton }}>Wellness</button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ textAlign: "left", padding: "12px", fontWeight: "500", color: "#374151" }}>Question</th>
                <th style={{ textAlign: "left", padding: "12px", fontWeight: "500", color: "#374151" }}>Type</th>
                <th style={{ textAlign: "left", padding: "12px", fontWeight: "500", color: "#374151" }}>Category</th>
                <th style={{ textAlign: "left", padding: "12px", fontWeight: "500", color: "#374151" }}>Times Used</th>
                <th style={{ textAlign: "left", padding: "12px", fontWeight: "500", color: "#374151" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionBank.map(q => (
                <tr key={q.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{q.question}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ 
                      ...styles.chip,
                      background: q.type === "rating" ? "#fef3c7" : 
                                 q.type === "nps" ? "#dbeafe" : 
                                 q.type === "open" ? "#d1fae5" : "#f3f4f6",
                      color: q.type === "rating" ? "#92400e" : 
                             q.type === "nps" ? "#1e40af" : 
                             q.type === "open" ? "#065f46" : "#6b7280"
                    }}>
                      {q.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={styles.chip}>{q.category}</span>
                  </td>
                  <td style={{ padding: "12px", fontWeight: "600" }}>{q.used}</td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        style={{ ...styles.button, ...styles.smallButton }}
                        onClick={() => handleAddFromQuestionBank(q)}
                      >
                        <Plus size={12} /> Add
                      </button>
                      <button 
                        style={{ ...styles.button, ...styles.smallButton }}
                        onClick={() => showNotification(`Editing question: ${q.question.substring(0, 30)}...`)}
                      >
                        <Edit size={12} />
                      </button>
                      <button 
                        style={{ ...styles.button, ...styles.smallButton }}
                        onClick={() => handleAddFromQuestionBank({...q, question: `${q.question} (Copy)`})}
                      >
                        <Copy size={12} />
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
  );

  const tabs = [
    { id: "create", label: "Create Survey", icon: Plus },
    { id: "distribute", label: "Distribute", icon: Send },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "templates", label: "Templates", icon: BookOpen },
    { id: "questionbank", label: "Question Bank", icon: Database }
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h4 style={styles.mainTitle}>
            <BarChart3 size={24} />
            Survey & Pulse Check Management
          </h4>
          <p style={styles.subtitle}>
            Create, distribute, and analyze employee surveys and pulse checks
          </p>
        </div>
        
        <div style={styles.headerActions}>
          <div 
            style={styles.notificationsButton}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span style={styles.notificationsBadge}>
                {unreadNotifications}
              </span>
            )}
          </div>
          
          {showNotifications && (
            <div className="slide-in" style={styles.notificationsPanel}>
              <div style={{ padding: "12px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "500" }}>Notifications</span>
                <button 
                  style={{ ...styles.button, ...styles.smallButton }}
                  onClick={handleMarkAllNotificationsRead}
                >
                  Mark all read
                </button>
              </div>
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  style={{
                    ...styles.notificationItem,
                    background: notification.read ? "white" : "#f0f9ff"
                  }}
                  onClick={() => handleToggleNotification(notification.id)}
                >
                  <div style={{ fontSize: "14px" }}>{notification.message}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    {notification.type === "success" ? "✅" : notification.type === "warning" ? "⚠️" : "ℹ️"} Just now
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <RefreshCw size={16} className="spin" /> Refreshing...
              </>
            ) : (
              <>
                <RefreshCw size={16} /> Refresh
              </>
            )}
          </button>
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleNewSurvey}
          >
            <Plus size={16} /> New Survey
          </button>
        </div>
      </div>

      <div style={styles.navTabs}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.navTab,
                ...(activeTab === tab.id ? styles.activeNavTab : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "create" && renderCreateSurvey()}
      {activeTab === "distribute" && renderDistributeSurvey()}
      {activeTab === "analytics" && renderAnalytics()}
      {activeTab === "templates" && renderTemplates()}
      {activeTab === "questionbank" && renderQuestionBankSection()}

      {/* Action Buttons */}
      {(activeTab === "create" || activeTab === "distribute") && (
        <div style={styles.actionButtons}>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleSaveDraft}
          >
            <Save size={16} /> Save as Draft
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={() => setShowPreview(true)}
          >
            <Eye size={16} /> Preview Survey
          </button>
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleLaunchSurvey}
          >
            <Send size={16} /> Launch Survey
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h4 style={{ margin: 0 }}>Survey Preview</h4>
              <button 
                style={{ ...styles.button, ...styles.secondaryButton }} 
                onClick={() => setShowPreview(false)}
              >
                ✕ Close
              </button>
            </div>
            <div style={{ background: "#f9fafb", padding: "24px", borderRadius: "8px" }}>
              <h3 style={{ marginBottom: "16px" }}>{surveyTitle || "Survey Title"}</h3>
              <p style={{ color: "#6b7280", marginBottom: "24px" }}>This is a preview of how your survey will appear to respondents.</p>
              
              {questions.length > 0 ? (
                <div>
                  {questions.map((q, index) => (
                    <div key={q.id} style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e5e7eb" }}>
                      <div style={{ fontWeight: "600", marginBottom: "12px" }}>
                        {index + 1}. {q.question || "Your question here"}
                        {q.required && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>}
                      </div>
                      
                      {q.type === "rating" && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          {Array.from({ length: q.scale }).map((_, i) => (
                            <button key={i} style={{ ...styles.button, padding: "8px 12px" }}>
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {q.type === "nps" && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          {Array.from({ length: 11 }).map((_, i) => (
                            <button key={i} style={{ ...styles.button, padding: "8px 12px" }}>
                              {i}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {q.type === "multiple" && (
                        <div>
                          {q.options.map((option, optIndex) => (
                            <label key={optIndex} style={{ ...styles.checkboxLabel, display: "block", marginBottom: "8px" }}>
                              <input type="checkbox" />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {q.type === "open" && (
                        <textarea style={styles.textarea} placeholder="Type your response here..." rows={3} />
                      )}
                      
                      {q.type === "matrix" && q.matrixRows && q.matrixColumns && (
                        <div style={{ marginTop: "12px" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                            <thead>
                              <tr>
                                <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #e5e7eb" }}></th>
                                {q.matrixColumns.map((col, idx) => (
                                  <th key={idx} style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {q.matrixRows.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                  <td style={{ padding: "8px", borderBottom: "1px solid #f3f4f6", fontWeight: "500" }}>{row}</td>
                                  {q.matrixColumns.map((_, colIdx) => (
                                    <td key={colIdx} style={{ padding: "8px", borderBottom: "1px solid #f3f4f6", textAlign: "center" }}>
                                      <input type="radio" name={`matrix-${q.id}-${rowIdx}`} />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      {q.type === "ranking" && q.rankingItems && (
                        <div style={{ marginTop: "12px" }}>
                          <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                            Drag items to rank them in order of preference
                          </div>
                          {q.rankingItems.map((item, idx) => (
                            <div key={idx} style={{ 
                              padding: "12px", 
                              background: "#f9fafb", 
                              border: "1px solid #e5e7eb", 
                              borderRadius: "6px", 
                              marginBottom: "8px",
                              display: "flex",
                              alignItems: "center",
                              gap: "12px"
                            }}>
                              <span style={{ 
                                width: "24px", 
                                height: "24px", 
                                borderRadius: "50%", 
                                background: "#3b82f6", 
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                              }}>
                                {idx + 1}
                              </span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>
                  <FileText size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
                  <p>Add questions to see the preview</p>
                </div>
              )}
              
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <button style={{ ...styles.button, ...styles.primaryButton }}>
                  Submit Survey
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveysPulseChecks;