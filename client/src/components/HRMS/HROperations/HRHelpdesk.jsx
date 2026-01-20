import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const HRHelpdesk = () => {
  // Existing states
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    employeeName: '',
    employeeId: '',
    department: ''
  });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeView, setActiveView] = useState('list');
  const [internalNotes, setInternalNotes] = useState({});
  const [assignedAgents] = useState(['John HR', 'Priya Kumar', 'IT Support', 'Admin Team', 'Finance Team']);
  const [userRole] = useState('hr_admin');
  const [selectedAgent, setSelectedAgent] = useState('');

  // NEW STATES from Helpdesk component
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    location: 'All Locations',
    status: 'all',
    category: 'all',
    priority: 'all',
    agent: ''
  });

  // Mock data
  const mockTickets = [
    {
      id: 1,
      title: 'PF Deduction Issue',
      category: 'Payroll queries',
      priority: 'high',
      status: 'open',
      description: 'PF deduction seems incorrect in last month payslip. Need clarification on the calculation.',
      createdAt: '2024-01-15T10:30:00Z',
      assignedTo: 'John HR',
      employeeName: 'Rahul Sharma',
      employeeId: 'EMP001',
      department: 'Engineering',
      resolutionTime: null,
      lastUpdated: '2024-01-15T10:30:00Z',
      location: 'Hyderabad'
    },
    {
      id: 2,
      title: 'Leave Balance Update',
      category: 'Leave and attendance issues',
      priority: 'medium',
      status: 'in-progress',
      description: 'My leave balance is not updated after my vacation last week. Please check and update.',
      createdAt: '2024-01-14T14:20:00Z',
      assignedTo: 'Priya Kumar',
      employeeName: 'Priya Kumar',
      employeeId: 'EMP002',
      department: 'Sales',
      resolutionTime: null,
      lastUpdated: '2024-01-15T09:15:00Z',
      location: 'Hyderabad'
    },
    {
      id: 3,
      title: 'Email Access Issue',
      category: 'IT access issues',
      priority: 'low',
      status: 'resolved',
      description: 'Cannot access corporate email from mobile device. Getting authentication error.',
      createdAt: '2024-01-13T09:15:00Z',
      assignedTo: 'IT Support',
      employeeName: 'Amit Patel',
      employeeId: 'EMP003',
      department: 'Marketing',
      resolutionTime: '2024-01-13T16:45:00Z',
      lastUpdated: '2024-01-13T16:45:00Z',
      location: 'Bangalore'
    },
    {
      id: 4,
      title: 'Policy Clarification Needed',
      category: 'Policy clarifications',
      priority: 'medium',
      status: 'open',
      description: 'Need clarification on new work from home policy regarding core working hours.',
      createdAt: '2024-01-16T11:20:00Z',
      assignedTo: null,
      employeeName: 'Sneha Reddy',
      employeeId: 'EMP004',
      department: 'HR',
      resolutionTime: null,
      lastUpdated: '2024-01-16T11:20:00Z',
      location: 'Hyderabad'
    },
    {
      id: 5,
      title: 'Reimbursement Pending',
      category: 'Reimbursement queries',
      priority: 'high',
      status: 'in-progress',
      description: 'Travel reimbursement for December business trip is still pending approval.',
      createdAt: '2024-01-12T15:45:00Z',
      assignedTo: 'Finance Team',
      employeeName: 'Rajesh Kumar',
      employeeId: 'EMP005',
      department: 'Operations',
      resolutionTime: null,
      lastUpdated: '2024-01-15T14:30:00Z',
      location: 'Delhi'
    },
    {
      id: 6,
      title: 'Address Change Request',
      category: 'Personal data updates',
      priority: 'low',
      status: 'closed',
      description: 'Need to update my residential address in company records.',
      createdAt: '2024-01-10T09:00:00Z',
      assignedTo: 'Admin Team',
      employeeName: 'Meera Singh',
      employeeId: 'EMP006',
      department: 'Engineering',
      resolutionTime: '2024-01-11T11:30:00Z',
      lastUpdated: '2024-01-11T11:30:00Z',
      location: 'Chennai'
    },
    {
      id: 7,
      title: 'Laptop Repair Request',
      category: 'IT access issues',
      priority: 'high',
      status: 'open',
      description: 'Company laptop screen cracked, need urgent repair.',
      createdAt: '2024-01-17T09:00:00Z',
      assignedTo: 'IT Support',
      employeeName: 'Vikram Singh',
      employeeId: 'EMP007',
      department: 'Engineering',
      resolutionTime: null,
      lastUpdated: '2024-01-17T09:00:00Z',
      location: 'Bangalore'
    },
    {
      id: 8,
      title: 'Insurance Claim Process',
      category: 'Policy clarifications',
      priority: 'medium',
      status: 'in-progress',
      description: 'Need guidance on health insurance claim process.',
      createdAt: '2024-01-16T14:30:00Z',
      assignedTo: 'John HR',
      employeeName: 'Priya Sharma',
      employeeId: 'EMP008',
      department: 'Finance',
      resolutionTime: null,
      lastUpdated: '2024-01-17T10:15:00Z',
      location: 'Hyderabad'
    },
    {
      id: 9,
      title: 'Training Request',
      category: 'General HR queries',
      priority: 'low',
      status: 'open',
      description: 'Request for advanced Excel training workshop.',
      createdAt: '2024-01-18T11:00:00Z',
      assignedTo: null,
      employeeName: 'Ravi Kumar',
      employeeId: 'EMP009',
      department: 'Sales',
      resolutionTime: null,
      lastUpdated: '2024-01-18T11:00:00Z',
      location: 'Mumbai'
    },
    {
      id: 10,
      title: 'Salary Certificate Request',
      category: 'Document requests',
      priority: 'medium',
      status: 'resolved',
      description: 'Need salary certificate for visa application.',
      createdAt: '2024-01-10T10:00:00Z',
      assignedTo: 'Finance Team',
      employeeName: 'Anjali Mehta',
      employeeId: 'EMP010',
      department: 'Marketing',
      resolutionTime: '2024-01-12T15:30:00Z',
      lastUpdated: '2024-01-12T15:30:00Z',
      location: 'Delhi'
    }
  ];

  const categories = [
    'Payroll queries',
    'Leave and attendance issues',
    'Policy clarifications',
    'IT access issues',
    'Document requests',
    'Reimbursement queries',
    'Personal data updates',
    'General HR queries',
    'Grievances and complaints'
  ];

  // NEW: Mock locations for filtering
  const locations = ['All Locations', 'Hyderabad', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai'];

  // NEW: Mock employees for autocomplete
  const employeesData = [
    { id: 1, name: 'Rahul Sharma (EMP001)' },
    { id: 2, name: 'Priya Kumar (EMP002)' },
    { id: 3, name: 'Amit Patel (EMP003)' },
    { id: 4, name: 'Sneha Reddy (EMP004)' },
    { id: 5, name: 'Rajesh Kumar (EMP005)' },
    { id: 6, name: 'Meera Singh (EMP006)' },
    { id: 7, name: 'Vikram Singh (EMP007)' },
    { id: 8, name: 'Priya Sharma (EMP008)' },
    { id: 9, name: 'Ravi Kumar (EMP009)' },
    { id: 10, name: 'Anjali Mehta (EMP010)' },
  ];

  // Initialize with mock data
  useEffect(() => {
    setTickets(mockTickets);
  }, []);

  // Calculate statistics
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length,
    highPriority: tickets.filter(t => t.priority === 'high').length,
    unassigned: tickets.filter(t => !t.assignedTo).length,
    // New metrics
    today: tickets.filter(t => {
      const today = new Date().toISOString().split('T')[0];
      return t.createdAt.split('T')[0] === today;
    }).length,
    overdue: tickets.filter(t => {
      if (t.status !== 'open' && t.status !== 'in-progress') return false;
      const created = new Date(t.createdAt);
      const now = new Date();
      const daysDiff = (now - created) / (1000 * 60 * 60 * 24);
      return daysDiff > 3;
    }).length,
    averageResolution: calculateAverageResolutionTime()
  };

  function calculateAverageResolutionTime() {
    const resolvedTickets = tickets.filter(t => t.resolutionTime && t.status === 'resolved');
    if (resolvedTickets.length === 0) return 0;

    const totalHours = resolvedTickets.reduce((sum, ticket) => {
      const created = new Date(ticket.createdAt);
      const resolved = new Date(ticket.resolutionTime);
      const hours = (resolved - created) / (1000 * 60 * 60);
      return sum + hours;
    }, 0);

    return Math.round(totalHours / resolvedTickets.length);
  }

  // Handle create ticket
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.title.trim() || !newTicket.category || !newTicket.description.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const newTicketObj = {
      id: tickets.length + 1,
      ...newTicket,
      status: 'open',
      createdAt: new Date().toISOString(),
      assignedTo: null,
      resolutionTime: null,
      lastUpdated: new Date().toISOString(),
      location: 'Hyderabad' // Default location
    };

    setTickets([newTicketObj, ...tickets]);
    setNewTicket({
      title: '',
      category: '',
      priority: 'medium',
      description: '',
      employeeName: '',
      employeeId: '',
      department: ''
    });

    alert(`Ticket created successfully! Ticket ID: #${newTicketObj.id}`);
  };

  // Handle view ticket
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  // Update ticket status
  const updateTicketStatus = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const updatedTicket = {
          ...ticket,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        };

        if (newStatus === 'resolved' && !ticket.resolutionTime) {
          updatedTicket.resolutionTime = new Date().toISOString();
        }

        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket(updatedTicket);
        }

        return updatedTicket;
      }
      return ticket;
    });

    setTickets(updatedTickets);
  };

  // Assign ticket to agent
  const assignTicket = (ticketId, agentName) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId ? {
        ...ticket,
        assignedTo: agentName,
        lastUpdated: new Date().toISOString()
      } : ticket
    );
    setTickets(updatedTickets);

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, assignedTo: agentName });
    }
  };

  // Add internal note
  const addInternalNote = (ticketId, note) => {
    if (!note.trim()) return;

    const noteObj = {
      id: Date.now(),
      content: note,
      timestamp: new Date().toISOString(),
      author: userRole === 'hr_admin' ? 'You' : 'HR Support',
      ticketId: ticketId
    };

    setInternalNotes(prev => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), noteObj]
    }));
  };

  // NEW: Handle download/export
  const handleDownload = () => {
    const dataStr = JSON.stringify(filteredAndSortedTickets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hr-tickets-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('📄 Tickets exported successfully!');
  };

  // NEW: Handle search
  const handleSearch = () => {
    setShowSearchSuggestions(false);
    setCurrentPage(1); // Reset to first page on new search
  };

  // NEW: Handle clear filters
  const handleClearFilters = () => {
    setStatusFilter('all');
    setCategoryFilter('all');
    setPriorityFilter('all');
    setLocationFilter('All Locations');
    setSelectedAgent('');
    setFromDate('');
    setToDate('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Filter and sort tickets
  const filteredAndSortedTickets = tickets
    .filter(ticket => {
      if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && ticket.category !== categoryFilter) return false;
      if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false;
      if (selectedAgent && ticket.assignedTo !== selectedAgent) return false;

      // NEW: Location filter
      if (locationFilter !== 'All Locations' && ticket.location !== locationFilter) return false;

      // NEW: Date range filter
      if (fromDate && toDate) {
        const ticketDate = new Date(ticket.createdAt).toISOString().split('T')[0];
        if (ticketDate < fromDate || ticketDate > toDate) return false;
      }

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          ticket.title.toLowerCase().includes(searchLower) ||
          ticket.description.toLowerCase().includes(searchLower) ||
          ticket.employeeName?.toLowerCase().includes(searchLower) ||
          ticket.employeeId?.toLowerCase().includes(searchLower) ||
          ticket.id.toString().includes(searchLower)
        );
      }

      return true;
    })
    .sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aVal = priorityOrder[a.priority] || 0;
          bVal = priorityOrder[b.priority] || 0;
          break;
        case 'createdAt':
          aVal = new Date(a.createdAt);
          bVal = new Date(b.createdAt);
          break;
        case 'lastUpdated':
          aVal = new Date(a.lastUpdated);
          bVal = new Date(b.lastUpdated);
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }

      return sortOrder === 'asc' ?
        (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) :
        (aVal > bVal ? -1 : aVal < bVal ? 1 : 0);
    });

  // NEW: Pagination logic
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedTickets = filteredAndSortedTickets.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredAndSortedTickets.length / recordsPerPage);

  // NEW: Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#059669';
      default: return '#6b7280';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#1d4ed8';
      case 'in-progress': return '#7c3aed';
      case 'resolved': return '#15803d';
      case 'closed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  // Styles
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      padding: '24px'
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px'
    },
    ticketForm: {
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      marginBottom: '24px'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      fontSize: '14px',
      marginTop: '4px'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      fontSize: '14px',
      minHeight: '100px',
      resize: 'vertical'
    },
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: '#f8f9fa',
      color: '#6c757d',
      border: '1px solid #dee2e6'
    },
    ticketsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      padding: '16px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#495057',
      borderBottom: '2px solid #e9ecef'
    },
    tableCell: {
      padding: '16px',
      borderBottom: '1px solid #e9ecef'
    },
    priorityBadge: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      background: 'white',
      borderRadius: '16px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflowY: 'auto'
    }
  };

  const cardStyle = {
    background: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    width: '150px'
  };

  const labelStyle = {
    color: '#6c757d',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '8px'
  };

  const valueStyle = {
    fontSize: '1.5rem',
    fontWeight: '700'
  };

  // Modal component
  const TicketModal = ({ ticket, onClose }) => {
    const [note, setNote] = useState('');
    const [assignTo, setAssignTo] = useState(ticket.assignedTo || '');
    const ticketNotes = internalNotes[ticket.id] || [];

    const handleAddNote = () => {
      if (note.trim()) {
        addInternalNote(ticket.id, note);
        setNote('');
      }
    };

    return (
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e9ecef' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h2 style={{ margin: 0, color: '#212529' }}>Ticket #{ticket.id}</h2>
                <h3 style={{ margin: '8px 0 0', color: '#495057' }}>{ticket.title}</h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: '#6c757d',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{
                ...styles.priorityBadge,
                backgroundColor: getPriorityColor(ticket.priority) + '20',
                color: getPriorityColor(ticket.priority)
              }}>
                {ticket.priority}
              </span>
              <span style={{
                ...styles.priorityBadge,
                backgroundColor: getStatusColor(ticket.status) + '20',
                color: getStatusColor(ticket.status)
              }}>
                {ticket.status}
              </span>
              <span style={{
                ...styles.priorityBadge,
                backgroundColor: '#e7f1ff',
                color: '#0d6efd'
              }}>
                {ticket.category}
              </span>
              <span style={{
                ...styles.priorityBadge,
                backgroundColor: '#e7f1ff',
                color: '#0d6efd'
              }}>
                {ticket.location}
              </span>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {/* Ticket Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <h4 style={{ color: '#495057', marginBottom: '12px' }}>Employee Details</h4>
                <div style={{ color: '#6c757d', lineHeight: '1.8' }}>
                  <div><strong>Name:</strong> {ticket.employeeName || 'Not provided'}</div>
                  <div><strong>ID:</strong> {ticket.employeeId || 'N/A'}</div>
                  <div><strong>Department:</strong> {ticket.department || 'N/A'}</div>
                  <div><strong>Location:</strong> {ticket.location || 'N/A'}</div>
                </div>
              </div>
              <div>
                <h4 style={{ color: '#495057', marginBottom: '12px' }}>Ticket Details</h4>
                <div style={{ color: '#6c757d', lineHeight: '1.8' }}>
                  <div><strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}</div>
                  <div><strong>Last Updated:</strong> {new Date(ticket.lastUpdated).toLocaleString()}</div>
                  <div><strong>Assigned To:</strong> {ticket.assignedTo || 'Unassigned'}</div>
                  {ticket.resolutionTime && (
                    <div><strong>Resolved:</strong> {new Date(ticket.resolutionTime).toLocaleString()}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#495057', marginBottom: '12px' }}>Description</h4>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                color: '#495057',
                lineHeight: '1.6'
              }}>
                {ticket.description}
              </div>
            </div>

            {/* Assignment Section */}
            {userRole === 'hr_admin' && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#495057', marginBottom: '12px' }}>Assign Ticket</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Agent</option>
                    {assignedAgents.map(agent => (
                      <option key={agent} value={agent}>{agent}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => assignTicket(ticket.id, assignTo)}
                    disabled={!assignTo}
                    style={{
                      ...styles.button,
                      ...styles.primaryButton,
                      opacity: assignTo ? 1 : 0.5
                    }}
                  >
                    Assign
                  </button>
                </div>
              </div>
            )}

            {/* Internal Notes */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ color: '#495057', marginBottom: '12px' }}>Internal Notes</h4>
              <div style={{
                maxHeight: '200px',
                overflowY: 'auto',
                marginBottom: '16px',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '12px'
              }}>
                {ticketNotes.length === 0 ? (
                  <div style={{ color: '#adb5bd', textAlign: 'center', padding: '20px' }}>No internal notes yet</div>
                ) : (
                  ticketNotes.map(note => (
                    <div key={note.id} style={{
                      backgroundColor: '#e7f1ff',
                      padding: '12px',
                      borderRadius: '6px',
                      marginBottom: '12px',
                      borderLeft: '4px solid #0d6efd'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                        <span style={{ fontWeight: '600', color: '#0d6efd' }}>{note.author}</span>
                        <span style={{ color: '#6c757d' }}>
                          {new Date(note.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ color: '#212529', lineHeight: '1.5' }}>{note.content}</div>
                    </div>
                  ))
                )}
              </div>

              <div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add internal note..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    marginBottom: '12px'
                  }}
                />
                <button
                  onClick={handleAddNote}
                  style={{
                    ...styles.button,
                    backgroundColor: '#198754',
                    color: 'white'
                  }}
                >
                  Add Note
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #e9ecef' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                {ticket.status === 'open' && (
                  <button
                    onClick={() => updateTicketStatus(ticket.id, 'in-progress')}
                    style={{
                      ...styles.button,
                      backgroundColor: '#0d6efd',
                      color: 'white'
                    }}
                  >
                    Start Progress
                  </button>
                )}
                {ticket.status === 'in-progress' && (
                  <button
                    onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                    style={{
                      ...styles.button,
                      backgroundColor: '#198754',
                      color: 'white'
                    }}
                  >
                    Mark as Resolved
                  </button>
                )}
                {ticket.status !== 'closed' && (
                  <button
                    onClick={() => updateTicketStatus(ticket.id, 'closed')}
                    style={{
                      ...styles.button,
                      backgroundColor: '#6c757d',
                      color: 'white'
                    }}
                  >
                    Close Ticket
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  ...styles.button,
                  backgroundColor: 'white',
                  color: '#6c757d',
                  border: '1px solid #dee2e6'
                }}>
                  Escalate
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this ticket?')) {
                      setTickets(tickets.filter(t => t.id !== ticket.id));
                      onClose();
                    }
                  }}
                  style={{
                    ...styles.button,
                    backgroundColor: '#dc3545',
                    color: 'white'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={styles.container}>
        {/* NEW: Breadcrumb Navigation */}

        {/* Header - Updated */}
        <div className="mt-3 mb-4">
          <h4 className="fw-semibold mb-2 d-flex align-items-center">
            <Icon
              icon="heroicons-outline:lifebuoy"
              className="me-2"
              width={24}
              height={24}
            />
            HR Helpdesk & Ticketing System
          </h4>
          <p className="text-muted">
            Manage all HR queries and support requests in one place
          </p>
        </div>

        {/* Statistics Cards Grid */}
        <div style={{ marginBottom: '24px', overflowX: 'auto' }}>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              minWidth: '1200px',
            }}
          >
            {/* Total Tickets */}
            <div style={cardStyle}>
              <div style={labelStyle}>Total Tickets</div>
              <div style={{ ...valueStyle, color: '#0d6efd' }}>{stats.total}</div>
            </div>

            {/* Open */}
            <div style={cardStyle}>
              <div style={labelStyle}>Open</div>
              <div style={{ ...valueStyle, color: '#dc3545' }}>{stats.open}</div>
            </div>

            {/* In Progress */}
            <div style={cardStyle}>
              <div style={labelStyle}>In Progress</div>
              <div style={{ ...valueStyle, color: '#0dcaf0' }}>{stats.inProgress}</div>
            </div>

            {/* Resolved */}
            <div style={cardStyle}>
              <div style={labelStyle}>Resolved</div>
              <div style={{ ...valueStyle, color: '#198754' }}>{stats.resolved}</div>
            </div>

            {/* High Priority */}
            <div style={cardStyle}>
              <div style={labelStyle}>High Priority</div>
              <div style={{ ...valueStyle, color: '#dc3545' }}>{stats.highPriority}</div>
            </div>

            {/* Unassigned */}
            <div style={cardStyle}>
              <div style={labelStyle}>Unassigned</div>
              <div style={{ ...valueStyle, color: '#fd7e14' }}>{stats.unassigned}</div>
            </div>

            {/* Today's Tickets */}
            <div style={cardStyle}>
              <div style={labelStyle}>Today's Tickets</div>
              <div style={{ ...valueStyle, color: '#20c997' }}>{stats.today}</div>
            </div>

            {/* Overdue */}
            <div style={cardStyle}>
              <div style={labelStyle}>Overdue</div>
              <div style={{ ...valueStyle, color: '#ffc107' }}>{stats.overdue}</div>
            </div>
          </div>
        </div>



        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Left Column */}
          <div>
            {/* Create Ticket Form */}
            <div style={styles.ticketForm}>
              <h5 style={{ color: '#212529', marginBottom: '20px', fontSize: '1.5rem' }}>Create New Ticket</h5>
              <form onSubmit={handleCreateTicket}>
                <div style={styles.formGrid}>
                  <div>
                    <label style={{ display: 'block', color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Title *</strong>
                    </label>
                    <input
                      type="text"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                      placeholder="Brief description of issue"
                      required
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Category *</strong>
                    </label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      required
                      style={styles.input}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Priority</strong>
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                      style={styles.input}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Employee Name</strong>
                    </label>
                    <input
                      type="text"
                      value={newTicket.employeeName}
                      onChange={(e) => setNewTicket({ ...newTicket, employeeName: e.target.value })}
                      placeholder="Optional"
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', color: '#495057', marginBottom: '8px', fontSize: '14px' }}>
                    <strong>Description *</strong>
                  </label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="Detailed description of the issue..."
                    required
                    style={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    marginTop: '20px',
                    width: '100%',
                    fontSize: '16px',
                    padding: '12px'
                  }}
                >
                  Create Ticket
                </button>
              </form>
            </div>



            {/* NEW: Pagination Component */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="small text-muted">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedTickets.length)} of {filteredAndSortedTickets.length} tickets
                </div>
                <nav aria-label="Page navigation">
                  <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <li
                            key={pageNum}
                            className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        );
                      } else if (
                        (pageNum === currentPage - 2 && currentPage > 3) ||
                        (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <li key={pageNum} className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        );
                      }
                      return null;
                    })}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
          {/* Category Breakdown */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              {categories.map(category => {
                const count = tickets.filter(t => t.category === category).length;
                const percentage = tickets.length > 0 ? ((count / tickets.length) * 100).toFixed(1) : 0;
                return (
                  <div key={category} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: '#495057', fontSize: '14px' }}>{category}</span>
                      <div>
                        <span style={{ color: '#212529', fontWeight: '500', fontSize: '14px' }}>{count}</span>
                        <span style={{ color: '#6c757d', fontSize: '12px', marginLeft: '8px' }}>({percentage}%)</span>
                      </div>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: '#0d6efd',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          <div>
           

            

            
          </div>
        </div>

       

        {/* Tickets Table */}
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e9ecef' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h5 style={{ color: '#212529', margin: 0, fontSize: '1.25rem' }}>
                All Tickets <span style={{ color: '#6c757d' }}>({filteredAndSortedTickets.length})</span>
              </h5>
              
            </div>
             {/* NEW: Enhanced Filters Section */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <h6 className="card-title mb-3">Filters & Search</h6>
            <div className="row g-3">
              {/* Location Filter */}
              <div className="col-lg-2 col-md-4 col-sm-6">
                <label className="form-label small fw-semibold">Location</label>
                <select
                  className="form-select form-select-sm"
                  value={locationFilter}
                  onChange={(e) => {
                    setLocationFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="col-lg-2 col-md-4 col-sm-6">
                <label className="form-label small fw-semibold">Status</label>
                <select
                  className="form-select form-select-sm"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <label className="form-label small fw-semibold">
                  Date Range
                  <i
                    className="bi bi-info-circle-fill text-primary ms-1"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Filter tickets by creation date"
                  ></i>
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Search with Autocomplete */}
              <div className="col-lg-3 col-md-6 col-sm-12 position-relative">
                <label className="form-label small fw-semibold">Search</label>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search tickets, employees..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSearchSuggestions(e.target.value.length > 0);
                      setCurrentPage(1);
                    }}
                    onFocus={() => searchTerm.length > 0 && setShowSearchSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>

                {/* Autocomplete Suggestions */}
                {showSearchSuggestions && (
                  <div
                    className="position-absolute w-100 mt-1"
                    style={{ zIndex: 1000 }}
                  >
                    <div className="card border shadow-sm">
                      <div className="card-body p-0">
                        <div className="list-group list-group-flush" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {employeesData
                            .filter(emp =>
                              emp.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .slice(0, 5)
                            .map(emp => (
                              <button
                                key={emp.id}
                                type="button"
                                className="list-group-item list-group-item-action text-start small py-2"
                                onClick={() => {
                                  setSearchTerm(emp.name);
                                  setShowSearchSuggestions(false);
                                  setCurrentPage(1);
                                }}
                              >
                                {emp.name}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Records per page */}
              <div className="col-lg-2 col-md-4 col-sm-6">
                <label className="form-label small fw-semibold">Records per page</label>
                <select
                  className="form-select form-select-sm"
                  value={recordsPerPage}
                  onChange={(e) => {
                    setRecordsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5 Records</option>
                  <option value={10}>10 Records</option>
                  <option value={20}>20 Records</option>
                  <option value={50}>50 Records</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="small text-muted">
                  Showing {filteredAndSortedTickets.length} of {tickets.length} tickets
                </span>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleClearFilters}
                >
                  <i className="bi bi-x-circle me-1"></i> Clear Filters
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleDownload}
                >
                  <i className="bi bi-download me-1"></i> Export
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>

          <div style={{ overflowX: 'auto', margin: "10px" }}>
            <table style={styles.ticketsTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>ID</th>
                  <th style={styles.tableHeader}>Title</th>
                  <th style={styles.tableHeader}>Category</th>
                  <th style={styles.tableHeader}>Priority</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Location</th>
                  <th style={styles.tableHeader}>Created</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTickets.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ ...styles.tableCell, textAlign: 'center', color: '#6c757d' }}>
                      No tickets found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  paginatedTickets.map(ticket => (
                    <tr key={ticket.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td style={styles.tableCell}>
                        <strong style={{ color: '#212529' }}>#{ticket.id}</strong>
                      </td>
                      <td style={styles.tableCell}>
                        <div>
                          <strong style={{ color: '#212529' }}>{ticket.title}</strong>
                          <div style={{ color: '#6c757d', fontSize: '13px', marginTop: '4px' }}>
                            {ticket.description.substring(0, 60)}...
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#e7f1ff',
                          color: '#0d6efd',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {ticket.category}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.priorityBadge,
                          backgroundColor: getPriorityColor(ticket.priority) + '20',
                          color: getPriorityColor(ticket.priority)
                        }}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.priorityBadge,
                          backgroundColor: getStatusColor(ticket.status) + '20',
                          color: getStatusColor(ticket.status)
                        }}>
                          {ticket.status}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#f8f9fa',
                          color: '#495057',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {ticket.location}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={{ color: '#6c757d', fontSize: '13px' }}>
                          {new Date(ticket.createdAt).toLocaleDateString()}
                          <div style={{ fontSize: '11px', color: '#adb5bd' }}>
                            {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            style={{
                              ...styles.button,
                              backgroundColor: '#0d6efd',
                              color: 'white',
                              padding: '6px 12px',
                              fontSize: '13px'
                            }}
                          >
                            View
                          </button>
                          {userRole === 'hr_admin' && ticket.status === 'open' && (
                            <button
                              onClick={() => updateTicketStatus(ticket.id, 'in-progress')}
                              style={{
                                ...styles.button,
                                backgroundColor: '#198754',
                                color: 'white',
                                padding: '6px 12px',
                                fontSize: '13px'
                              }}
                            >
                              Start
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedTicket && (
          <TicketModal
            ticket={selectedTicket}
            onClose={() => {
              setShowModal(false);
              setSelectedTicket(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default HRHelpdesk;