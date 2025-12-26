import React, { useState, useEffect } from "react";
import {
  Settings, Users, Clock, AlertCircle, CheckCircle, XCircle,
  Send, Edit, FileText, Calendar, Bell, Zap, Layers, Filter,
  ChevronRight, Plus, Trash2, Copy, Save, Eye, History,
  Download, Upload, RefreshCw, Search, UserPlus, Mail, MessageSquare,
  ExternalLink, RotateCcw, Shield, Lock, Unlock, EyeOff,
  Database, CreditCard, FileText as FileTextIcon, AlertTriangle,
  Cpu, Cloud, CheckSquare, X
} from "lucide-react";

const WorkflowEngine = () => {
  const [activeSection, setActiveSection] = useState("config");
  const [workflowType, setWorkflowType] = useState("linear");
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [autoApprovalRules, setAutoApprovalRules] = useState([
    { id: 1, condition: "amount", operator: "<=", value: "1000", action: "auto-approve" }
  ]);
  const [escalationRules, setEscalationRules] = useState([
    { 
      id: 1, 
      name: "Primary Approver Timeout", 
      trigger: "timeout", 
      timeout: 48, 
      unit: "hours", 
      action: "escalate",
      target: "skip-level",
      notifyOriginal: true,
      isEnabled: true 
    },
    { 
      id: 2, 
      name: "Out of Office", 
      trigger: "out-of-office", 
      action: "delegate",
      target: "backup-approver",
      notifyOriginal: true,
      isEnabled: true 
    }
  ]);
  const [workflowStages, setWorkflowStages] = useState([
    { id: 1, level: "direct-manager", approvers: [], timeout: 24, isEnabled: true }
  ]);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    slack: false,
    whatsapp: false
  });
  const [auditSettings, setAuditSettings] = useState({
    logActions: true,
    trackModifications: true,
    recordIP: false,
    archive: true,
    retentionPeriod: 365
  });
  const [integrationSettings, setIntegrationSettings] = useState({
    updateEmployeeMaster: true,
    triggerPayroll: false,
    generateDocuments: true,
    createCalendarEvents: true,
    updateAttendance: true,
    createTasks: true,
    logAuditTrail: true,
    notifyStakeholders: true,
    syncWithCRM: false,
    updateProjectManagement: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Add CSS for spin animation
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
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const approvalLevels = [
    { id: "direct-manager", label: "Direct Manager", icon: Users },
    { id: "skip-level", label: "Skip-level Manager", icon: Users },
    { id: "hr", label: "HR", icon: Users },
    { id: "dept-head", label: "Department Head", icon: Users },
    { id: "finance", label: "Finance", icon: Users },
    { id: "admin", label: "Admin", icon: Users },
    { id: "c-suite", label: "C-Suite", icon: Users }
  ];

  const escalationTargets = [
    { id: "skip-level", label: "Skip-level Manager" },
    { id: "dept-head", label: "Department Head" },
    { id: "hr", label: "HR Department" },
    { id: "admin", label: "Administrator" },
    { id: "backup-approver", label: "Backup Approver" },
    { id: "auto-assign", label: "Auto-assign based on availability" }
  ];

  const integrationTypes = [
    { id: "employee-master", label: "Employee Master Data", icon: Database },
    { id: "payroll", label: "Payroll System", icon: CreditCard },
    { id: "documents", label: "Document Generation", icon: FileTextIcon },
    { id: "calendar", label: "Calendar Events", icon: Calendar },
    { id: "attendance", label: "Attendance/Leave Systems", icon: Clock },
    { id: "tasks", label: "Task Management", icon: CheckSquare },
    { id: "audit", label: "Audit Trail", icon: Shield },
    { id: "notifications", label: "Stakeholder Notifications", icon: Bell },
    { id: "crm", label: "CRM Systems", icon: Users },
    { id: "project", label: "Project Management", icon: Layers }
  ];

  const conditions = [
    { id: "amount", label: "Amount", operator: ">=", value: "" },
    { id: "type", label: "Type", operator: "equals", value: "" },
    { id: "frequency", label: "Frequency", operator: "<=", value: "" }
  ];

  // Button Functionality Handlers
  const handleAddStage = () => {
    const newStage = {
      id: workflowStages.length + 1,
      level: "direct-manager",
      approvers: [],
      timeout: 24,
      isEnabled: true
    };
    setWorkflowStages([...workflowStages, newStage]);
    console.log("Added new workflow stage:", newStage);
  };

  const handleDeleteStage = (stageId) => {
    if (workflowStages.length > 1) {
      const updatedStages = workflowStages.filter(stage => stage.id !== stageId);
      setWorkflowStages(updatedStages);
      console.log("Deleted stage:", stageId);
    } else {
      alert("Cannot delete the last stage. Workflow must have at least one stage.");
    }
  };

  const handleEditStage = (stageId) => {
    console.log("Editing stage:", stageId);
    const stage = workflowStages.find(s => s.id === stageId);
    alert(`Edit stage ${stageId}: ${stage.level}`);
  };

  const handleAddAutoApprovalRule = () => {
    const newRule = {
      id: autoApprovalRules.length + 1,
      condition: "amount",
      operator: "<=",
      value: "",
      action: "auto-approve"
    };
    setAutoApprovalRules([...autoApprovalRules, newRule]);
    console.log("Added new auto-approval rule:", newRule);
  };

  const handleDeleteAutoApprovalRule = (ruleId) => {
    const updatedRules = autoApprovalRules.filter(rule => rule.id !== ruleId);
    setAutoApprovalRules(updatedRules);
    console.log("Deleted auto-approval rule:", ruleId);
  };

  const handleAddEscalationRule = () => {
    const newRule = {
      id: escalationRules.length + 1,
      name: `New Escalation Rule ${escalationRules.length + 1}`,
      trigger: "timeout",
      timeout: 48,
      unit: "hours",
      action: "escalate",
      target: "skip-level",
      notifyOriginal: true,
      isEnabled: true
    };
    setEscalationRules([...escalationRules, newRule]);
    console.log("Added new escalation rule:", newRule);
  };

  const handleDeleteEscalationRule = (ruleId) => {
    const updatedRules = escalationRules.filter(rule => rule.id !== ruleId);
    setEscalationRules(updatedRules);
    console.log("Deleted escalation rule:", ruleId);
  };

  const handleToggleEscalationRule = (ruleId) => {
    const updatedRules = escalationRules.map(rule => 
      rule.id === ruleId ? { ...rule, isEnabled: !rule.isEnabled } : rule
    );
    setEscalationRules(updatedRules);
    console.log("Toggled escalation rule:", ruleId);
  };

  const handleSaveConfiguration = () => {
    setIsSaving(true);
    console.log("Saving configuration...");
    
    const config = {
      workflowType,
      workflowStages,
      autoApprovalRules,
      escalationRules,
      notifications,
      auditSettings,
      integrationSettings
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log("Configuration saved:", config);
      setIsSaving(false);
      alert("Configuration saved successfully!");
    }, 1000);
  };

  const handleSaveAsTemplate = () => {
    const templateName = prompt("Enter template name:");
    if (templateName) {
      const template = {
        name: templateName,
        workflowType,
        workflowStages,
        autoApprovalRules,
        escalationRules,
        createdAt: new Date().toISOString()
      };
      console.log("Saved as template:", template);
      alert(`Template "${templateName}" saved successfully!`);
    }
  };

  const handlePreviewWorkflow = () => {
    setShowPreview(!showPreview);
    console.log("Preview workflow:", showPreview ? "closed" : "opened");
  };

  const handleExportConfiguration = () => {
    const config = {
      workflowType,
      workflowStages,
      autoApprovalRules,
      escalationRules,
      notifications,
      auditSettings,
      integrationSettings,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `workflow-config-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log("Exported configuration:", config);
  };

  const handleImportConfiguration = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target.result);
          console.log("Imported configuration:", config);
          
          if (config.workflowType) setWorkflowType(config.workflowType);
          if (config.workflowStages) setWorkflowStages(config.workflowStages);
          if (config.autoApprovalRules) setAutoApprovalRules(config.autoApprovalRules);
          if (config.escalationRules) setEscalationRules(config.escalationRules);
          if (config.notifications) setNotifications(config.notifications);
          if (config.auditSettings) setAuditSettings(config.auditSettings);
          if (config.integrationSettings) setIntegrationSettings(config.integrationSettings);
          
          alert("Configuration imported successfully!");
        } catch (error) {
          alert("Error importing configuration. Please check the file format.");
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all settings to defaults? This cannot be undone.")) {
      setWorkflowType("linear");
      setWorkflowStages([{ id: 1, level: "direct-manager", approvers: [], timeout: 24, isEnabled: true }]);
      setAutoApprovalRules([{ id: 1, condition: "amount", operator: "<=", value: "1000", action: "auto-approve" }]);
      setEscalationRules([
        { 
          id: 1, 
          name: "Primary Approver Timeout", 
          trigger: "timeout", 
          timeout: 48, 
          unit: "hours", 
          action: "escalate",
          target: "skip-level",
          notifyOriginal: true,
          isEnabled: true 
        },
        { 
          id: 2, 
          name: "Out of Office", 
          trigger: "out-of-office", 
          action: "delegate",
          target: "backup-approver",
          notifyOriginal: true,
          isEnabled: true 
        }
      ]);
      setNotifications({ email: true, sms: false, push: true, slack: false, whatsapp: false });
      setAuditSettings({ logActions: true, trackModifications: true, recordIP: false, archive: true, retentionPeriod: 365 });
      setIntegrationSettings({
        updateEmployeeMaster: true,
        triggerPayroll: false,
        generateDocuments: true,
        createCalendarEvents: true,
        updateAttendance: true,
        createTasks: true,
        logAuditTrail: true,
        notifyStakeholders: true,
        syncWithCRM: false,
        updateProjectManagement: false
      });
      console.log("Reset all settings to defaults");
    }
  };

  const handleTestNotifications = () => {
    console.log("Testing notifications...");
    setTimeout(() => {
      alert("Test notifications sent! Check your email and notifications.");
    }, 500);
  };

  const handleViewAuditLog = () => {
    console.log("Opening audit log...");
    alert("Opening audit log...");
  };

  const handleSearchApprovers = () => {
    if (searchQuery.trim()) {
      console.log("Searching approvers for:", searchQuery);
      alert(`Searching approvers: ${searchQuery}`);
    }
  };

  const handleAddApprover = () => {
    console.log("Opening add approver modal...");
    alert("Opening add approver form...");
  };

  const handleSendTestEmail = () => {
    console.log("Sending test email...");
    setTimeout(() => {
      alert("Test email sent successfully!");
    }, 500);
  };

  const handleEnableWorkflow = () => {
    console.log("Enabling workflow...");
    alert("Workflow enabled and activated!");
  };

  const handleDisableWorkflow = () => {
    if (window.confirm("Disable this workflow? Active requests will be paused.")) {
      console.log("Disabling workflow...");
      alert("Workflow disabled!");
    }
  };

  const handleCloneWorkflow = () => {
    const clonedStages = workflowStages.map(stage => ({
      ...stage,
      id: stage.id + 100,
      name: `${stage.level} (Clone)`
    }));
    
    setWorkflowStages([...workflowStages, ...clonedStages]);
    console.log("Cloned workflow stages");
    alert("Workflow stages cloned! Edit the new stages as needed.");
  };

  const handleValidateConfiguration = () => {
    const errors = [];
    
    if (workflowStages.length === 0) {
      errors.push("Workflow must have at least one stage");
    }
    
    if (errors.length > 0) {
      alert("Validation Errors:\n" + errors.join("\n"));
    } else {
      alert("Configuration is valid!");
    }
    
    console.log("Configuration validation:", errors.length > 0 ? "Failed" : "Passed");
  };

  const handleToggleIntegration = (integrationId) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [integrationId]: !prev[integrationId]
    }));
    console.log("Toggled integration:", integrationId, "to", !integrationSettings[integrationId]);
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
      alignItems: "center"
    },
    searchBox: {
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px",
      width: "200px"
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
      background: "white"
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "14px"
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
    ruleCard: {
      background: "#f8fafc",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "12px",
      border: "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    stageCard: {
      background: "#f0f9ff",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "12px",
      borderLeft: "4px solid #3b82f6"
    },
    escalationCard: {
      background: "#fef3c7",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "12px",
      borderLeft: "4px solid #f59e0b"
    },
    integrationCard: {
      background: "#f0f9ff",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "12px",
      border: "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
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
    statusBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500"
    },
    activeBadge: {
      background: "#d1fae5",
      color: "#065f46"
    },
    inactiveBadge: {
      background: "#f3f4f6",
      color: "#6b7280"
    }
  };

  const renderWorkflowConfig = () => (
    <div style={styles.sectionCard}>
      <h4 style={styles.sectionTitle}><Settings size={20} />Workflow Configuration</h4>
      
      <div style={styles.grid2Col}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Workflow Type</label>
          <select 
            style={styles.select} 
            value={workflowType}
            onChange={(e) => setWorkflowType(e.target.value)}
          >
            <option value="linear">Linear Approval (Sequential)</option>
            <option value="parallel">Parallel Approval (Simultaneous)</option>
            <option value="conditional">Conditional Routing</option>
            <option value="hybrid">Hybrid Workflow</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Default Timeout</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input 
              type="number" 
              style={styles.input} 
              placeholder="Hours" 
              defaultValue="24" 
            />
            <select style={styles.select}>
              <option>Hours</option>
              <option>Days</option>
              <option>Business Days</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h5 style={{ ...styles.label, fontSize: "16px", margin: 0 }}>Workflow Stages</h5>
          <div style={styles.buttonGroup}>
            <button 
              style={{ ...styles.button, ...styles.primaryButton, ...styles.smallButton }}
              onClick={handleAddStage}
            >
              <Plus size={14} /> Add Stage
            </button>
            <button 
              style={{ ...styles.button, ...styles.secondaryButton, ...styles.smallButton }}
              onClick={handleCloneWorkflow}
            >
              <Copy size={14} /> Clone
            </button>
          </div>
        </div>
        
        {workflowStages.map((stage, index) => (
          <div key={stage.id} style={styles.stageCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h6 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>
                Stage {index + 1}: {approvalLevels.find(l => l.id === stage.level)?.label}
              </h6>
              <div style={styles.buttonGroup}>
                <button 
                  style={{ ...styles.button, ...styles.outlineButton, ...styles.smallButton }}
                  onClick={() => handleEditStage(stage.id)}
                >
                  <Edit size={14} /> Edit
                </button>
                <button 
                  style={{ ...styles.button, ...styles.secondaryButton, ...styles.smallButton }}
                  onClick={() => handleDeleteStage(stage.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Approvers:</span>
              <span style={styles.chip}>To be assigned</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAutoApprovalRules = () => (
    <div style={styles.sectionCard}>
      <h4 style={styles.sectionTitle}><Zap size={20} />Auto-Approval Rules</h4>
      
      <div style={styles.grid3Col}>
        {conditions.map(condition => (
          <div key={condition.id} style={styles.formGroup}>
            <label style={styles.label}>{condition.label}</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select style={{ ...styles.select, flex: 1 }}>
                <option>{condition.operator}</option>
                <option>=</option>
                <option>{"<"}</option>
                <option>{">"}</option>
                <option>{"<="}</option>
                <option>{">="}</option>
                <option>≠</option>
              </select>
              <input 
                type="text" 
                style={{ ...styles.input, flex: 2 }} 
                placeholder={`Enter ${condition.label.toLowerCase()}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Approval Action</label>
        <select style={styles.select}>
          <option>Auto-approve</option>
          <option>Auto-reject</option>
          <option>Route to specific approver</option>
          <option>Skip certain levels</option>
        </select>
      </div>

      <button 
        style={{ ...styles.button, ...styles.primaryButton, marginTop: "16px" }}
        onClick={handleAddAutoApprovalRule}
      >
        <Plus size={16} /> Add Rule
      </button>

      <div style={{ marginTop: "24px" }}>
        <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Existing Rules</h5>
        {autoApprovalRules.map(rule => (
          <div key={rule.id} style={styles.ruleCard}>
            <div>
              <strong>Rule #{rule.id}:</strong> {rule.condition} {rule.operator} {rule.value} → {rule.action}
            </div>
            <button 
              style={{ ...styles.button, ...styles.secondaryButton, ...styles.smallButton }}
              onClick={() => handleDeleteAutoApprovalRule(rule.id)}
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEscalationRules = () => (
    <div style={styles.sectionCard}>
      <h4 style={styles.sectionTitle}><Clock size={20} />Escalation & Delegation Rules</h4>
      
      <div style={styles.grid2Col}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Default Escalation Time</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input type="number" style={styles.input} defaultValue="48" />
            <select style={styles.select}>
              <option>Hours</option>
              <option>Days</option>
              <option>Business Days</option>
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Default Action on Timeout</label>
          <select style={styles.select}>
            <option>Escalate to next level</option>
            <option>Auto-approve</option>
            <option>Auto-reject</option>
            <option>Send reminder and wait</option>
            <option>Assign to admin for manual handling</option>
          </select>
        </div>
      </div>

      <div style={styles.grid2Col}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Out-of-Office Handling</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span>Auto-assign to backup approver</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span>Send email notification to primary approver</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span>Create calendar reminder for follow-up</span>
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Delegation Rules</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span>Allow approvers to delegate</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" />
              <span>Require manager approval for delegation</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span>Limit delegation duration</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h5 style={{ ...styles.label, fontSize: "16px", margin: 0 }}>Escalation Rules</h5>
          <button 
            style={{ ...styles.button, ...styles.primaryButton, ...styles.smallButton }}
            onClick={handleAddEscalationRule}
          >
            <Plus size={14} /> Add Rule
          </button>
        </div>
        
        {escalationRules.map(rule => (
          <div key={rule.id} style={styles.escalationCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h6 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>
                    {rule.name}
                  </h6>
                  <span style={{ 
                    ...styles.statusBadge, 
                    ...(rule.isEnabled ? styles.activeBadge : styles.inactiveBadge)
                  }}>
                    {rule.isEnabled ? "Active" : "Inactive"}
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                  <div><strong>Trigger:</strong> {rule.trigger === "timeout" ? `${rule.timeout} ${rule.unit} timeout` : "Out of Office"}</div>
                  <div><strong>Action:</strong> {rule.action === "escalate" ? "Escalate to" : "Delegate to"} {escalationTargets.find(t => t.id === rule.target)?.label}</div>
                  <div><strong>Notify Original Approver:</strong> {rule.notifyOriginal ? "Yes" : "No"}</div>
                </div>
              </div>
              <div style={styles.buttonGroup}>
                <button 
                  style={{ ...styles.button, ...styles.outlineButton, ...styles.smallButton }}
                  onClick={() => handleToggleEscalationRule(rule.id)}
                >
                  {rule.isEnabled ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button 
                  style={{ ...styles.button, ...styles.secondaryButton, ...styles.smallButton }}
                  onClick={() => handleDeleteEscalationRule(rule.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkflowActions = () => (
    <div style={styles.sectionCard}>
      <h4 style={styles.sectionTitle}><Send size={20} />Workflow Actions</h4>
      
      <div style={styles.grid3Col}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Approval Actions</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                defaultChecked 
                onChange={(e) => console.log("Require comments:", e.target.checked)}
              />
              <span>Require comments on approval</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                defaultChecked 
                onChange={(e) => console.log("Require reasons:", e.target.checked)}
              />
              <span>Require reasons on rejection</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                defaultChecked 
              />
              <span>Allow send back for modification</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                defaultChecked 
              />
              <span>Enable bulk approval</span>
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Notifications</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
              />
              <span>Email notifications</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
              />
              <span>SMS notifications</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
              />
              <span>Push notifications</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={notifications.slack}
                onChange={(e) => setNotifications({...notifications, slack: e.target.checked})}
              />
              <span>Slack/Teams notifications</span>
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Audit Settings</label>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={auditSettings.logActions}
                onChange={(e) => setAuditSettings({...auditSettings, logActions: e.target.checked})}
              />
              <span>Log all approval actions</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={auditSettings.trackModifications}
                onChange={(e) => setAuditSettings({...auditSettings, trackModifications: e.target.checked})}
              />
              <span>Track modification history</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={auditSettings.recordIP}
                onChange={(e) => setAuditSettings({...auditSettings, recordIP: e.target.checked})}
              />
              <span>Record IP addresses</span>
            </label>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={auditSettings.archive}
                onChange={(e) => setAuditSettings({...auditSettings, archive: e.target.checked})}
              />
              <span>Archive completed workflows</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button 
          style={{ ...styles.button, ...styles.secondaryButton }}
          onClick={handleTestNotifications}
        >
          <Bell size={16} /> Test Notifications
        </button>
        <button 
          style={{ ...styles.button, ...styles.secondaryButton }}
          onClick={handleViewAuditLog}
        >
          <History size={16} /> View Audit Log
        </button>
        <button 
          style={{ ...styles.button, ...styles.secondaryButton }}
          onClick={handleSendTestEmail}
        >
          <Mail size={16} /> Send Test Email
        </button>
      </div>
    </div>
  );

  const renderIntegrationActions = () => (
    <div style={styles.sectionCard}>
      <h4 style={styles.sectionTitle}><Layers size={20} />Integration Actions</h4>
      
      <div style={{ marginBottom: "24px" }}>
        <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>System Integrations</h5>
        
        {integrationTypes.map(integration => {
          const Icon = integration.icon;
          const integrationKey = integration.id === "employee-master" ? "updateEmployeeMaster" :
                                integration.id === "payroll" ? "triggerPayroll" :
                                integration.id === "documents" ? "generateDocuments" :
                                integration.id === "calendar" ? "createCalendarEvents" :
                                integration.id === "attendance" ? "updateAttendance" :
                                integration.id === "tasks" ? "createTasks" :
                                integration.id === "audit" ? "logAuditTrail" :
                                integration.id === "notifications" ? "notifyStakeholders" :
                                integration.id === "crm" ? "syncWithCRM" : "updateProjectManagement";
          
          const isEnabled = integrationSettings[integrationKey];
          
          return (
            <div key={integration.id} style={styles.integrationCard}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "8px", 
                  background: isEnabled ? "#dbeafe" : "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Icon size={20} color={isEnabled ? "#3b82f6" : "#6b7280"} />
                </div>
                <div>
                  <div style={{ fontWeight: "500", color: "#1f2937" }}>{integration.label}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {integration.id === "employee-master" ? "Auto-update employee records on approval" :
                     integration.id === "payroll" ? "Trigger payroll changes automatically" :
                     integration.id === "documents" ? "Generate approval letters and contracts" :
                     integration.id === "calendar" ? "Create calendar events for approvals" :
                     integration.id === "attendance" ? "Update attendance and leave systems" :
                     integration.id === "tasks" ? "Create follow-up tasks for departments" :
                     integration.id === "audit" ? "Log activities in system audit trail" :
                     integration.id === "notifications" ? "Send email notifications to stakeholders" :
                     integration.id === "crm" ? "Sync approval status with CRM systems" :
                     "Update project management tools"}
                  </div>
                </div>
              </div>
              <button 
                style={{ 
                  ...styles.button, 
                  ...styles.smallButton,
                  background: isEnabled ? "#3b82f6" : "#f3f4f6",
                  color: isEnabled ? "white" : "#6b7280",
                  borderColor: isEnabled ? "#3b82f6" : "#d1d5db"
                }}
                onClick={() => handleToggleIntegration(integrationKey)}
              >
                {isEnabled ? <CheckSquare size={14} /> : <X size={14} />}
              </button>
            </div>
          );
        })}
      </div>

      <div style={styles.grid2Col}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Integration Mode</label>
          <select style={styles.select}>
            <option>Real-time sync</option>
            <option>Batch processing</option>
            <option>Manual trigger</option>
            <option>Scheduled sync</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Error Handling</label>
          <select style={styles.select}>
            <option>Retry failed integrations</option>
            <option>Send error alerts</option>
            <option>Queue for manual processing</option>
            <option>Skip and continue</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h5 style={{ ...styles.label, fontSize: "16px", marginBottom: "16px" }}>Integration Test</h5>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={() => alert("Testing all integrations...")}
          >
            <RefreshCw size={16} /> Test All Integrations
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={() => alert("Viewing integration logs...")}
          >
            <FileTextIcon size={16} /> View Integration Logs
          </button>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: "config", label: "Configuration", icon: Settings },
    { id: "auto-approval", label: "Auto-Approval", icon: Zap },
    { id: "escalation", label: "Escalation", icon: Clock },
    { id: "actions", label: "Actions", icon: Send },
    { id: "integration", label: "Integration", icon: Layers }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h4 style={styles.mainTitle}>
            <Settings size={24} />
            Approval Workflow Configuration
          </h4>
          <p style={styles.subtitle}>
            Configure approval workflows, escalation rules, and integration actions
          </p>
        </div>
        
        <div style={styles.headerActions}>
          <input
            type="text"
            style={styles.searchBox}
            placeholder="Search approvers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleSearchApprovers}
          >
            <Search size={16} />
          </button>
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleAddApprover}
          >
            <UserPlus size={16} /> Add Approver
          </button>
        </div>
      </div>

      <div style={styles.navTabs}>
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              style={{
                ...styles.navTab,
                ...(activeSection === section.id ? styles.activeNavTab : {})
              }}
              onClick={() => setActiveSection(section.id)}
            >
              <Icon size={16} />
              {section.label}
            </button>
          );
        })}
      </div>

      {activeSection === "config" && renderWorkflowConfig()}
      {activeSection === "auto-approval" && renderAutoApprovalRules()}
      {activeSection === "escalation" && renderEscalationRules()}
      {activeSection === "actions" && renderWorkflowActions()}
      {activeSection === "integration" && renderIntegrationActions()}

      <div style={styles.actionButtons}>
        <div style={{ display: "flex", gap: "12px", flex: 1 }}>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleValidateConfiguration}
          >
            <Shield size={16} /> Validate
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleImportConfiguration}
          >
            <Upload size={16} /> Import
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleExportConfiguration}
          >
            <Download size={16} /> Export
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleResetToDefaults}
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handlePreviewWorkflow}
          >
            <Eye size={16} /> {showPreview ? "Hide Preview" : "Preview Workflow"}
          </button>
          <button 
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleSaveAsTemplate}
          >
            <Copy size={16} /> Save as Template
          </button>
          {workflowStages.some(s => s.isEnabled) ? (
            <button 
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handleDisableWorkflow}
            >
              <Lock size={16} /> Disable Workflow
            </button>
          ) : (
            <button 
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={handleEnableWorkflow}
            >
              <Unlock size={16} /> Enable Workflow
            </button>
          )}
          <button 
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={handleSaveConfiguration}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <RefreshCw size={16} className="spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save Configuration
              </>
            )}
          </button>
        </div>
      </div>

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
            maxWidth: "800px",
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h4 style={{ margin: 0 }}>Workflow Preview</h4>
              <button style={{ ...styles.button, ...styles.secondaryButton }} onClick={() => setShowPreview(false)}>✕ Close</button>
            </div>
            <pre style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", overflow: "auto" }}>
              {JSON.stringify({
                workflowType,
                workflowStages,
                autoApprovalRules,
                escalationRules,
                notifications,
                auditSettings,
                integrationSettings
              }, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowEngine;