import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const EmployeeSelfService = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterType, setFilterType] = useState('All');
  
  // Current User Data
  const currentUser = {
    id: 'EMP00123',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    location: 'New York, NY',
    startDate: '2022-03-15',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    manager: 'Sarah Johnson',
    employmentType: 'Full-time',
    salary: 85000
  };

  // State for different data types
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [payslips, setPayslips] = useState([]);
  const [requests, setRequests] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [upcomingHolidays, setUpcomingHolidays] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({});
  
  // New request/forms state
  const [newRequest, setNewRequest] = useState({
    type: 'leave',
    startDate: '',
    endDate: '',
    reason: '',
    attachment: null
  });
  
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: ''
  });
  
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: ''
  });

  const itemsPerPage = 6;

  // Calculate KPIs
  const kpis = useMemo(() => {
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    const unreadMessages = messages.filter(m => !m.read).length;
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const availablePayslips = payslips.filter(p => p.status === 'available').length;
    
    return {
      pendingRequests,
      unreadMessages,
      openTickets,
      availablePayslips,
      leaveBalance: leaveBalance.annual || 0
    };
  }, [requests, messages, tickets, payslips, leaveBalance]);

  // Filter data based on search and type
  const getFilteredData = () => {
    let data = [];
    switch(activeSection) {
      case 'requests':
        data = requests.filter(item => 
          item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterType !== 'All') {
          data = data.filter(item => item.type === filterType);
        }
        break;
      case 'messages':
        data = messages.filter(item => 
          item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterType !== 'All') {
          data = data.filter(item => (filterType === 'unread' ? !item.read : true));
        }
        break;
      case 'tickets':
        data = tickets.filter(item => 
          item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterType !== 'All') {
          data = data.filter(item => item.status === filterType);
        }
        break;
      case 'payslips':
        data = payslips.filter(item => 
          item.month.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'attendance':
        data = attendanceRecords.filter(item => 
          item.date.includes(searchTerm) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      default:
        data = [];
    }
    return data;
  };

  // Pagination
  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Initial data loading
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Leave requests data
    setLeaveRequests([
      { id: 1, type: 'Annual Leave', startDate: '2024-03-10', endDate: '2024-03-12', status: 'approved', days: 3 },
      { id: 2, type: 'Sick Leave', startDate: '2024-03-15', status: 'pending', days: 1 },
      { id: 3, type: 'Casual Leave', startDate: '2024-03-20', endDate: '2024-03-21', status: 'rejected', days: 2 },
      { id: 4, type: 'Annual Leave', startDate: '2024-04-01', endDate: '2024-04-05', status: 'pending', days: 5 }
    ]);

    // Messages data
    setMessages([
      { id: 1, from: 'HR Department', subject: 'Policy Update', date: '2024-03-12', read: false },
      { id: 2, from: 'Manager', subject: 'Project Review Meeting', date: '2024-03-11', read: true },
      { id: 3, from: 'Finance', subject: 'Tax Declaration Reminder', date: '2024-03-10', read: true },
      { id: 4, from: 'IT Support', subject: 'System Maintenance', date: '2024-03-09', read: false }
    ]);

    // Tickets data
    setTickets([
      { id: 'TKT001', subject: 'Laptop Hardware Issue', status: 'open', date: '2024-03-10', priority: 'high', category: 'technical' },
      { id: 'TKT002', subject: 'Email Access Problem', status: 'resolved', date: '2024-03-05', priority: 'medium', category: 'access' },
      { id: 'TKT003', subject: 'Software License Request', status: 'in-progress', date: '2024-03-08', priority: 'low', category: 'software' }
    ]);

    // Payslips data
    setPayslips([
      { id: 1, month: 'February 2024', amount: '$7,500', downloadLink: '#', status: 'available' },
      { id: 2, month: 'January 2024', amount: '$7,500', downloadLink: '#', status: 'available' },
      { id: 3, month: 'December 2023', amount: '$7,200', downloadLink: '#', status: 'available' },
      { id: 4, month: 'November 2023', amount: '$7,200', downloadLink: '#', status: 'available' }
    ]);

    // Requests data
    setRequests([
      { id: 101, type: 'leave', date: '2024-03-10', status: 'approved', description: 'Annual Leave - 3 days' },
      { id: 102, type: 'reimbursement', date: '2024-03-05', status: 'pending', amount: '$250', description: 'Travel Expenses' },
      { id: 103, type: 'attendance', date: '2024-03-01', status: 'approved', description: 'Attendance Regularization' },
      { id: 104, type: 'loan', date: '2024-02-28', status: 'pending', amount: '$1000', description: 'Personal Loan Request' }
    ]);

    // Attendance records
    setAttendanceRecords([
      { id: 1, date: '2024-03-01', checkIn: '09:05', checkOut: '18:15', status: 'present', hours: 9.17 },
      { id: 2, date: '2024-03-02', checkIn: '09:00', checkOut: '18:00', status: 'present', hours: 9 },
      { id: 3, date: '2024-03-03', checkIn: '09:30', checkOut: '17:45', status: 'late', hours: 8.25 },
      { id: 4, date: '2024-03-04', checkIn: null, checkOut: null, status: 'absent', hours: 0 },
      { id: 5, date: '2024-03-05', checkIn: '09:10', checkOut: '18:20', status: 'present', hours: 9.17 },
      { id: 6, date: '2024-03-06', checkIn: '09:05', checkOut: '17:55', status: 'present', hours: 8.83 }
    ]);

    // Documents
    setDocuments([
      { id: 1, name: 'Appointment Letter', type: 'offer', date: '2022-03-15', size: '1.2 MB' },
      { id: 2, name: 'Form 16 - FY 2023-24', type: 'tax', date: '2024-01-31', size: '2.5 MB' },
      { id: 3, name: 'Health Insurance Card', type: 'insurance', date: '2024-01-15', size: '0.8 MB' },
      { id: 4, name: 'Employee Handbook', type: 'policy', date: '2024-01-01', size: '3.2 MB' }
    ]);

    // Directory
    setDirectory([
      { id: 1, name: 'Sarah Johnson', role: 'Engineering Manager', department: 'Engineering', email: 'sarah.j@company.com', phone: '+1 (555) 111-2222' },
      { id: 2, name: 'Mike Chen', role: 'Product Manager', department: 'Product', email: 'mike.chen@company.com', phone: '+1 (555) 222-3333' },
      { id: 3, name: 'Emily Davis', role: 'HR Manager', department: 'Human Resources', email: 'emily.davis@company.com', phone: '+1 (555) 333-4444' },
      { id: 4, name: 'David Wilson', role: 'Finance Director', department: 'Finance', email: 'david.wilson@company.com', phone: '+1 (555) 444-5555' }
    ]);

    // Other data
    setUpcomingHolidays([
      { date: '2024-03-29', name: 'Good Friday' },
      { date: '2024-04-01', name: 'Easter Monday' },
      { date: '2024-05-01', name: 'Labour Day' }
    ]);

    setBirthdays([
      { name: 'Sarah Johnson', date: 'Today', department: 'Marketing' },
      { name: 'Mike Chen', date: 'Tomorrow', department: 'Engineering' }
    ]);

    setAnnouncements([
      { id: 1, title: 'Quarterly Town Hall Meeting', date: '2024-03-15', category: 'event' },
      { id: 2, title: 'New HR Policy Update', date: '2024-03-10', category: 'policy' }
    ]);

    setLeaveBalance({
      annual: 15,
      casual: 8,
      sick: 10,
      taken: 5,
      total: 38
    });

    setIsLoading(false);
  };

  // Status badge functions
  const getStatusBadge = (status) => {
    const styles = {
      'active': 'bg-success-subtle text-success',
      'pending': 'bg-warning-subtle text-warning',
      'approved': 'bg-success-subtle text-success',
      'rejected': 'bg-danger-subtle text-danger',
      'open': 'bg-info-subtle text-info',
      'resolved': 'bg-success-subtle text-success',
      'in-progress': 'bg-warning-subtle text-warning',
      'present': 'bg-success-subtle text-success',
      'late': 'bg-warning-subtle text-warning',
      'absent': 'bg-danger-subtle text-danger',
      'available': 'bg-success-subtle text-success'
    };

    return (
      <span className={`badge ${styles[status] || 'bg-secondary-subtle text-secondary'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      'high': 'bg-danger-subtle text-danger',
      'medium': 'bg-warning-subtle text-warning',
      'low': 'bg-info-subtle text-info'
    };

    return (
      <span className={`badge ${styles[priority] || 'bg-secondary-subtle text-secondary'}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Format functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Action handlers
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleMarkAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const newReq = {
      id: Date.now(),
      type: newRequest.type,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      reason: newRequest.reason,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      description: `${newRequest.type.charAt(0).toUpperCase() + newRequest.type.slice(1)} Request`
    };
    
    setRequests([newReq, ...requests]);
    
    if (newRequest.type === 'leave') {
      setLeaveRequests([{
        id: Date.now(),
        type: 'New Leave',
        startDate: newRequest.startDate,
        endDate: newRequest.endDate,
        status: 'pending',
        days: 3
      }, ...leaveRequests]);
    }
    
    setNewRequest({
      type: 'leave',
      startDate: '',
      endDate: '',
      reason: '',
      attachment: null
    });
    setShowRequestModal(false);
    
    alert('Request submitted successfully!');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const newMsg = {
      id: Date.now(),
      from: currentUser.name,
      to: newMessage.to,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    
    // In real app, this would be sent to server
    setNewMessage({
      to: '',
      subject: '',
      content: ''
    });
    setShowMessageModal(false);
    
    alert('Message sent successfully!');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTkt = {
      id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicket.subject,
      status: 'open',
      date: new Date().toISOString().split('T')[0],
      priority: newTicket.priority,
      category: newTicket.category
    };
    
    setTickets([newTkt, ...tickets]);
    setNewTicket({
      subject: '',
      category: 'technical',
      priority: 'medium',
      description: ''
    });
    
    alert('Ticket created successfully!');
  };

  const handleDownloadPayslip = (payslipId) => {
    alert(`Downloading payslip ${payslipId}...`);
    // In real app, this would trigger download
  };

  const handleRegularizeAttendance = (recordId) => {
    const updatedRecords = attendanceRecords.map(record =>
      record.id === recordId ? { ...record, status: 'regularized', needsRegularization: false } : record
    );
    setAttendanceRecords(updatedRecords);
    alert('Attendance regularized successfully!');
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadInitialData();
      setCurrentPage(1);
      setSearchTerm('');
      setFilterType('All');
      alert('Data refreshed successfully!');
    }, 1000);
  };

  const handleExportData = () => {
    let csvData = [];
    let headers = [];
    
    switch(activeSection) {
      case 'requests':
        headers = ['ID', 'Type', 'Date', 'Status', 'Description'];
        csvData = requests.map(req => [req.id, req.type, req.date, req.status, req.description]);
        break;
      case 'attendance':
        headers = ['Date', 'Check In', 'Check Out', 'Status', 'Hours'];
        csvData = attendanceRecords.map(record => [record.date, record.checkIn || '-', record.checkOut || '-', record.status, record.hours]);
        break;
      case 'payslips':
        headers = ['Month', 'Amount', 'Status'];
        csvData = payslips.map(p => [p.month, p.amount, p.status]);
        break;
      default:
        headers = ['Data', 'Export'];
        csvData = [['No data to export']];
    }
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_${activeSection}_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Sidebar content
  const sidebarContent = (
    <nav className="space-y-1 p-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Employee Portal
      </div>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('dashboard')}
      >
        <Icon icon="heroicons:home" className="mr-3 h-5 w-5" />
        Dashboard
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('profile')}
      >
        <Icon icon="heroicons:user" className="mr-3 h-5 w-5" />
        My Profile
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'requests' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('requests')}
      >
        <Icon icon="heroicons:document-text" className="mr-3 h-5 w-5" />
        My Requests
        {kpis.pendingRequests > 0 && (
          <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            {kpis.pendingRequests}
          </span>
        )}
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'messages' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('messages')}
      >
        <Icon icon="heroicons:envelope" className="mr-3 h-5 w-5" />
        Messages
        {kpis.unreadMessages > 0 && (
          <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {kpis.unreadMessages}
          </span>
        )}
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'tickets' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('tickets')}
      >
        <Icon icon="heroicons:ticket" className="mr-3 h-5 w-5" />
        Support Tickets
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'payslips' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('payslips')}
      >
        <Icon icon="heroicons:banknotes" className="mr-3 h-5 w-5" />
        Payslips
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'attendance' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('attendance')}
      >
        <Icon icon="heroicons:clock" className="mr-3 h-5 w-5" />
        Attendance
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'documents' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('documents')}
      >
        <Icon icon="heroicons:folder" className="mr-3 h-5 w-5" />
        Documents
      </button>
      
      <button 
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeSection === 'directory' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        onClick={() => setActiveSection('directory')}
      >
        <Icon icon="heroicons:users" className="mr-3 h-5 w-5" />
        Company Directory
      </button>
      
      <div className="pt-4 border-t border-gray-200 mt-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Stats
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Requests:</span>
            <span className="font-semibold text-warning">{kpis.pendingRequests}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Unread Messages:</span>
            <span className="font-semibold text-info">{kpis.unreadMessages}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Leave Balance:</span>
            <span className="font-semibold text-success">{kpis.leaveBalance} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Open Tickets:</span>
            <span className="font-semibold text-warning">{kpis.openTickets}</span>
          </div>
        </div>
      </div>
    </nav>
  );

  // User info for sidebar
  const userInfo = {
    name: currentUser.name,
    role: currentUser.position,
    email: currentUser.email,
    avatar: currentUser.avatar
  };

  // Render different sections
  const renderDashboard = () => (
    <div className="row g-4">
      {/* Welcome Card */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title mb-1">Welcome back, {currentUser.name}!</h5>
                <p className="text-muted mb-0">Here's your self-service dashboard for March 2024</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="text-end">
                  <p className="text-muted mb-0">Employee ID</p>
                  <p className="fw-bold mb-0">{currentUser.id}</p>
                </div>
                <div className="w-60-px h-60-px bg-light rounded-circle d-flex align-items-center justify-content-center">
                  <Icon icon="heroicons:user" className="text-primary text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="col-md-3">
        <div className="card border shadow-none h-100">
          <div className="card-body d-flex align-items-center">
            <div className="flex-shrink-0">
              <div className="w-60-px h-60-px bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center">
                <Icon icon="heroicons:clock" className="text-primary text-2xl" />
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="text-bold mb-1">Pending Approvals</h6>
              <div className="text-muted fs-4">{kpis.pendingRequests}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border shadow-none h-100">
          <div className="card-body d-flex align-items-center">
            <div className="flex-shrink-0">
              <div className="w-60-px h-60-px bg-success-subtle rounded-circle d-flex align-items-center justify-content-center">
                <Icon icon="heroicons:calendar" className="text-success text-2xl" />
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="text-bold mb-1">Leave Balance</h6>
              <div className="text-muted fs-4">{kpis.leaveBalance}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border shadow-none h-100">
          <div className="card-body d-flex align-items-center">
            <div className="flex-shrink-0">
              <div className="w-60-px h-60-px bg-info-subtle rounded-circle d-flex align-items-center justify-content-center">
                <Icon icon="heroicons:envelope" className="text-info text-2xl" />
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="text-bold mb-1">Unread Messages</h6>
              <div className="text-muted fs-4">{kpis.unreadMessages}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card border shadow-none h-100">
          <div className="card-body d-flex align-items-center">
            <div className="flex-shrink-0">
              <div className="w-60-px h-60-px bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                <Icon icon="heroicons:ticket" className="text-warning text-2xl" />
              </div>
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="text-bold mb-1">Open Tickets</h6>
              <div className="text-muted fs-4">{kpis.openTickets}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-body">
            <h6 className="card-title mb-3">Quick Actions</h6>
            <div className="row g-3">
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                  onClick={() => setActiveSection('requests')}
                >
                  <Icon icon="heroicons:calendar" className="fs-3 mb-2" />
                  <span>Apply Leave</span>
                </button>
              </div>
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                  onClick={() => setActiveSection('attendance')}
                >
                  <Icon icon="heroicons:clock" className="fs-3 mb-2" />
                  <span>Regularize Attendance</span>
                </button>
              </div>
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                  onClick={() => setShowRequestModal(true)}
                >
                  <Icon icon="heroicons:document-plus" className="fs-3 mb-2" />
                  <span>Submit Request</span>
                </button>
              </div>
              <div className="col-md-3">
                <button 
                  className="btn btn-outline-primary w-100 d-flex flex-column align-items-center py-3"
                  onClick={() => setActiveSection('tickets')}
                >
                  <Icon icon="heroicons:ticket" className="fs-3 mb-2" />
                  <span>Raise Ticket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="col-md-6">
        <div className="card border shadow-none h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Recent Requests</h6>
              <button 
                className="btn btn-sm btn-link text-decoration-none"
                onClick={() => setActiveSection('requests')}
              >
                View All
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.slice(0, 5).map(request => (
                    <tr key={request.id}>
                      <td className="text-capitalize">{request.type}</td>
                      <td>{request.date}</td>
                      <td>{getStatusBadge(request.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Holidays */}
      <div className="col-md-6">
        <div className="card border shadow-none h-100">
          <div className="card-body">
            <h6 className="card-title mb-3">Upcoming Holidays</h6>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingHolidays.map((holiday, index) => (
                    <tr key={index}>
                      <td>{holiday.date}</td>
                      <td className="fw-semibold">{holiday.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-body">
            <h6 className="card-title mb-3">Latest Announcements</h6>
            <div className="row g-3">
              {announcements.map(announcement => (
                <div key={announcement.id} className="col-md-6">
                  <div className="card border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{announcement.title}</h6>
                          <p className="text-muted small mb-0">{announcement.date}</p>
                        </div>
                        <span className="badge bg-primary-subtle text-primary">
                          {announcement.category}
                        </span>
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
  );

  const renderProfile = () => (
    <div className="row g-4">
      {/* Personal Information */}
      <div className="col-md-6">
        <div className="card border shadow-none h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Personal Information</h6>
              <button className="btn btn-sm btn-outline-primary">
                <Icon icon="heroicons:pencil" className="me-1" />
                Edit
              </button>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-muted">Full Name</label>
                <p className="fw-semibold mb-0">{currentUser.name}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Employee ID</label>
                <p className="fw-semibold mb-0">{currentUser.id}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Email</label>
                <p className="fw-semibold mb-0">{currentUser.email}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Phone</label>
                <p className="fw-semibold mb-0">{currentUser.phone}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Department</label>
                <p className="fw-semibold mb-0">{currentUser.department}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Position</label>
                <p className="fw-semibold mb-0">{currentUser.position}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Location</label>
                <p className="fw-semibold mb-0">{currentUser.location}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Employment Type</label>
                <p className="fw-semibold mb-0">{currentUser.employmentType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="col-md-6">
        <div className="card border shadow-none h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Bank Account Details</h6>
              <button className="btn btn-sm btn-outline-primary">
                <Icon icon="heroicons:pencil" className="me-1" />
                Edit
              </button>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small text-muted">Account Number</label>
                <p className="fw-semibold mb-0">XXXX-XXXX-1234</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Bank Name</label>
                <p className="fw-semibold mb-0">Chase Bank</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">IFSC Code</label>
                <p className="fw-semibold mb-0">CHASUS33</p>
              </div>
              <div className="col-md-6">
                <label className="form-label small text-muted">Account Type</label>
                <p className="fw-semibold mb-0">Checking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="col-md-6">
        <div className="card border shadow-none">
          <div className="card-body">
            <h6 className="card-title mb-3">Leave Balance Summary</h6>
            <div className="row g-3">
              <div className="col-6">
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="fw-bold text-primary mb-1">{leaveBalance.annual || 0}</h4>
                  <p className="text-muted small mb-0">Annual Leave</p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="fw-bold text-success mb-1">{leaveBalance.casual || 0}</h4>
                  <p className="text-muted small mb-0">Casual Leave</p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="fw-bold text-info mb-1">{leaveBalance.sick || 0}</h4>
                  <p className="text-muted small mb-0">Sick Leave</p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 bg-light rounded">
                  <h4 className="fw-bold text-danger mb-1">{leaveBalance.taken || 0}</h4>
                  <p className="text-muted small mb-0">Total Taken</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Information */}
      <div className="col-md-6">
        <div className="card border shadow-none">
          <div className="card-body">
            <h6 className="card-title mb-3">Salary Information</h6>
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label small text-muted">Annual Salary</label>
                <p className="fw-semibold text-primary mb-0">{formatCurrency(currentUser.salary)}</p>
              </div>
              <div className="col-6">
                <label className="form-label small text-muted">Monthly</label>
                <p className="fw-semibold mb-0">{formatCurrency(currentUser.salary / 12)}</p>
              </div>
              <div className="col-12">
                <label className="form-label small text-muted">Last Increment</label>
                <p className="fw-semibold mb-0">March 2023 (8%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-body">
            <h6 className="card-title mb-3">My Documents</h6>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Size</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(doc => (
                    <tr key={doc.id}>
                      <td className="fw-semibold">{doc.name}</td>
                      <td>
                        <span className="badge bg-secondary-subtle text-secondary text-capitalize">
                          {doc.type}
                        </span>
                      </td>
                      <td>{doc.date}</td>
                      <td>{doc.size}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          <Icon icon="heroicons:arrow-down-tray" className="me-1" />
                          Download
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
  );

  const renderRequests = () => (
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">My Requests</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={() => setShowRequestModal(true)}
              className="btn btn-success"
            >
              <Icon icon="heroicons:plus" className="me-2" />
              New Request
            </button>
            <button 
              onClick={handleRefreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
            <button 
              onClick={handleExportData}
              className="btn btn-primary"
            >
              <Icon icon="heroicons:document-arrow-down" className="me-2" />
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Filters */}
        <div className="p-4 border-bottom">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
              <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
              >
                <option value="All">All Types</option>
                <option value="leave">Leave</option>
                <option value="reimbursement">Reimbursement</option>
                <option value="attendance">Attendance</option>
                <option value="loan">Loan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Type</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Date</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Description</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((request) => (
                <tr key={request.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center">
                      <div className="w-40-px h-40-px bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                        <Icon icon={
                          request.type === 'leave' ? 'heroicons:calendar' :
                          request.type === 'reimbursement' ? 'heroicons:banknotes' :
                          request.type === 'attendance' ? 'heroicons:clock' :
                          'heroicons:document-text'
                        } className="text-muted" />
                      </div>
                      <div>
                        <div className="fw-medium text-dark text-capitalize">{request.type}</div>
                        {request.amount && (
                          <div className="small text-muted">{request.amount}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{request.date}</td>
                  <td className="px-4 py-3">{request.description}</td>
                  <td className="px-4 py-3">{getStatusBadge(request.status)}</td>
                  <td className="px-4 py-3">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                      >
                        <Icon icon="heroicons:eye" />
                        View
                      </button>
                      {request.status === 'pending' && (
                        <button className="btn btn-sm btn-outline-danger">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-5 text-muted">
            <Icon icon="heroicons:document-text" className="text-4xl mb-3" />
            <h5>No requests found</h5>
            <p>Submit your first request to get started.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} requests
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline-secondary"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${
                    currentPage === i + 1
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Messages</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={() => setShowMessageModal(true)}
              className="btn btn-success"
            >
              <Icon icon="heroicons:envelope" className="me-2" />
              New Message
            </button>
            <button 
              onClick={handleRefreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Filters */}
        <div className="p-4 border-bottom">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
              <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
              >
                <option value="All">All Messages</option>
                <option value="unread">Unread Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">From</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Subject</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Date</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((message) => (
                <tr key={message.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <div className="fw-medium text-dark">{message.from}</div>
                  </td>
                  <td className="px-4 py-3">{message.subject}</td>
                  <td className="px-4 py-3">{message.date}</td>
                  <td className="px-4 py-3">
                    {!message.read ? (
                      <span className="badge bg-primary">New</span>
                    ) : (
                      <span className="badge bg-secondary">Read</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => {
                          handleViewDetails(message);
                          handleMarkAsRead(message.id);
                        }}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </button>
                      {!message.read && (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="btn btn-sm btn-outline-success"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-5 text-muted">
            <Icon icon="heroicons:envelope" className="text-4xl mb-3" />
            <h5>No messages found</h5>
            <p>You're all caught up!</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} messages
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline-secondary"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${
                    currentPage === i + 1
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Support Tickets</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={handleCreateTicket}
              className="btn btn-success"
            >
              <Icon icon="heroicons:plus" className="me-2" />
              New Ticket
            </button>
            <button 
              onClick={handleRefreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Filters */}
        <div className="p-4 border-bottom">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div className="position-relative flex-fill" style={{ minWidth: '300px' }}>
              <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
              >
                <option value="All">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Ticket ID</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Subject</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Date</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Priority</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((ticket) => (
                <tr key={ticket.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <div className="fw-medium text-dark">{ticket.id}</div>
                  </td>
                  <td className="px-4 py-3">{ticket.subject}</td>
                  <td className="px-4 py-3">{ticket.date}</td>
                  <td className="px-4 py-3">{getPriorityBadge(ticket.priority)}</td>
                  <td className="px-4 py-3">{getStatusBadge(ticket.status)}</td>
                  <td className="px-4 py-3">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleViewDetails(ticket)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </button>
                      {ticket.status === 'open' && (
                        <button className="btn btn-sm btn-outline-warning">
                          Update
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-5 text-muted">
            <Icon icon="heroicons:ticket" className="text-4xl mb-3" />
            <h5>No tickets found</h5>
            <p>Create a new ticket to get started.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} tickets
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline-secondary"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${
                    currentPage === i + 1
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderPayslips = () => (
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Payslips</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={handleExportData}
              className="btn btn-primary"
            >
              <Icon icon="heroicons:document-arrow-down" className="me-2" />
              Export All
            </button>
            <button 
              onClick={handleRefreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Search */}
        <div className="p-4 border-bottom">
          <div className="position-relative" style={{ maxWidth: '400px' }}>
            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
            <input
              type="text"
              placeholder="Search by month..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control ps-5"
            />
          </div>
        </div>

        {/* Payslips Table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Month</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Amount</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((payslip) => (
                <tr key={payslip.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <div className="fw-medium text-dark">{payslip.month}</div>
                  </td>
                  <td className="px-4 py-3 fw-semibold">{payslip.amount}</td>
                  <td className="px-4 py-3">{getStatusBadge(payslip.status)}</td>
                  <td className="px-4 py-3">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleDownloadPayslip(payslip.id)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <Icon icon="heroicons:arrow-down-tray" className="me-1" />
                        Download
                      </button>
                      <button
                        onClick={() => handleViewDetails(payslip)}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-5 text-muted">
            <Icon icon="heroicons:banknotes" className="text-4xl mb-3" />
            <h5>No payslips found</h5>
            <p>No records found matching your search criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} payslips
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline-secondary"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${
                    currentPage === i + 1
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Attendance Records</h5>
          <div className="d-flex gap-2">
            <button 
              onClick={handleExportData}
              className="btn btn-primary"
            >
              <Icon icon="heroicons:document-arrow-down" className="me-2" />
              Export
            </button>
            <button 
              onClick={handleRefreshData}
              className="btn btn-outline-primary"
            >
              <Icon icon="heroicons:arrow-path" className="me-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        {/* Search */}
        <div className="p-4 border-bottom">
          <div className="position-relative" style={{ maxWidth: '400px' }}>
            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
            <input
              type="text"
              placeholder="Search by date or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control ps-5"
            />
          </div>
        </div>

        {/* Attendance Table */}
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Date</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Check In</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Check Out</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Hours</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Status</th>
                <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((record) => (
                <tr key={record.id} className="border-bottom">
                  <td className="px-4 py-3">
                    <div className="fw-medium text-dark">{record.date}</div>
                  </td>
                  <td className="px-4 py-3">{record.checkIn || '-'}</td>
                  <td className="px-4 py-3">{record.checkOut || '-'}</td>
                  <td className="px-4 py-3">{record.hours || '0'}</td>
                  <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
                  <td className="px-4 py-3">
                    {record.status === 'absent' || record.status === 'late' ? (
                      <button
                        onClick={() => handleRegularizeAttendance(record.id)}
                        className="btn btn-sm btn-outline-warning"
                      >
                        Regularize
                      </button>
                    ) : (
                      <button
                        onClick={() => handleViewDetails(record)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance Summary */}
        <div className="p-4 border-top">
          <h6 className="mb-3">This Month's Summary</h6>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <h4 className="fw-bold text-success mb-1">
                  {attendanceRecords.filter(r => r.status === 'present').length}
                </h4>
                <p className="text-muted small mb-0">Days Present</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <h4 className="fw-bold text-warning mb-1">
                  {attendanceRecords.filter(r => r.status === 'late').length}
                </h4>
                <p className="text-muted small mb-0">Late Arrivals</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <h4 className="fw-bold text-danger mb-1">
                  {attendanceRecords.filter(r => r.status === 'absent').length}
                </h4>
                <p className="text-muted small mb-0">Absences</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <h4 className="fw-bold text-primary mb-1">
                  {attendanceRecords.reduce((sum, r) => sum + (r.hours || 0), 0).toFixed(1)}
                </h4>
                <p className="text-muted small mb-0">Total Hours</p>
              </div>
            </div>
          </div>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-5 text-muted">
            <Icon icon="heroicons:clock" className="text-4xl mb-3" />
            <h5>No attendance records found</h5>
            <p>No records found matching your search criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-top d-flex align-items-center justify-content-between">
            <div className="small text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline-secondary"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${
                    currentPage === i + 1
                      ? 'btn-primary'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline-secondary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-body">
            <h6 className="card-title mb-3">My Documents</h6>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map(doc => (
                    <tr key={doc.id}>
                      <td className="fw-semibold">{doc.name}</td>
                      <td>
                        <span className="badge bg-secondary-subtle text-secondary text-capitalize">
                          {doc.type}
                        </span>
                      </td>
                      <td>{doc.date}</td>
                      <td>{doc.size}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary">
                            <Icon icon="heroicons:arrow-down-tray" className="me-1" />
                            Download
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleViewDetails(doc)}
                          >
                            View
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
  );

  const renderDirectory = () => (
    <div className="row g-4">
      <div className="col-12">
        <div className="card border shadow-none">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-title mb-0">Company Directory</h6>
              <div className="position-relative" style={{ width: '300px' }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search employees..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="row g-3">
              {directory
                .filter(person => 
                  person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  person.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  person.role.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(person => (
                  <div key={person.id} className="col-md-6">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-start">
                          <div className="w-60-px h-60-px bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                            <Icon icon="heroicons:user" className="text-muted fs-4" />
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="fw-semibold mb-1">{person.name}</h6>
                            <p className="text-muted small mb-1">{person.role}</p>
                            <p className="text-muted small mb-2">{person.department}</p>
                            <div className="d-flex gap-2">
                              <a href={`mailto:${person.email}`} className="btn btn-sm btn-outline-primary">
                                <Icon icon="heroicons:envelope" className="me-1" />
                                Email
                              </a>
                              <button className="btn btn-sm btn-outline-secondary">
                                <Icon icon="heroicons:phone" className="me-1" />
                                Call
                              </button>
                            </div>
                          </div>
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
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'profile':
        return renderProfile();
      case 'requests':
        return renderRequests();
      case 'messages':
        return renderMessages();
      case 'tickets':
        return renderTickets();
      case 'payslips':
        return renderPayslips();
      case 'attendance':
        return renderAttendance();
      case 'documents':
        return renderDocuments();
      case 'directory':
        return renderDirectory();
      default:
        return renderDashboard();
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            {activeSection !== 'dashboard' && (
              <button
                onClick={() => setActiveSection('dashboard')}
                className="btn btn-link d-flex align-items-center gap-2"
              >
                <Icon icon="heroicons:arrow-left" />
                Back
              </button>
            )}
          </div>
          <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
            <Icon icon="heroicons:user-circle" />
            Employee Self-Service Portal
          </h5>
          <p className="text-muted">
            Access your profile, submit requests, and manage your information
          </p>
        </div>

        {/* Content Area */}
        {renderContent()}

        {/* Quick Links Footer */}
        <div className="card border shadow-none mt-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex gap-3">
                <a href="#" className="text-decoration-none d-flex align-items-center gap-2">
                  <Icon icon="heroicons:question-mark-circle" />
                  <span>Help Center</span>
                </a>
                <a href="#" className="text-decoration-none d-flex align-items-center gap-2">
                  <Icon icon="heroicons:document-text" />
                  <span>Policies</span>
                </a>
                <a href="#" className="text-decoration-none d-flex align-items-center gap-2">
                  <Icon icon="heroicons:phone" />
                  <span>Contact HR</span>
                </a>
              </div>
              <div className="text-muted small">
                Employee Self-Service Portal v2.0 • Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Request Modal */}
        {showRequestModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:document-plus" />
                    Submit New Request
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowRequestModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmitRequest}>
                    <div className="mb-3">
                      <label className="form-label">Request Type</label>
                      <select 
                        className="form-select"
                        value={newRequest.type}
                        onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                      >
                        <option value="leave">Leave Request</option>
                        <option value="attendance">Attendance Regularization</option>
                        <option value="reimbursement">Expense Reimbursement</option>
                        <option value="loan">Advance/Loan</option>
                      </select>
                    </div>
                    
                    {newRequest.type === 'leave' && (
                      <>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Start Date</label>
                            <input 
                              type="date" 
                              className="form-control"
                              value={newRequest.startDate}
                              onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">End Date</label>
                            <input 
                              type="date" 
                              className="form-control"
                              value={newRequest.endDate}
                              onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Reason</label>
                          <textarea 
                            className="form-control" 
                            rows="3"
                            value={newRequest.reason}
                            onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                            required
                          ></textarea>
                        </div>
                      </>
                    )}

                    {newRequest.type === 'reimbursement' && (
                      <div className="mb-3">
                        <label className="form-label">Amount ($)</label>
                        <input type="number" className="form-control" placeholder="Enter amount" required />
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Attachment (Optional)</label>
                      <input type="file" className="form-control" />
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowRequestModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <Icon icon="heroicons:paper-airplane" className="me-2" />
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:envelope" />
                    New Message
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowMessageModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSendMessage}>
                    <div className="mb-3">
                      <label className="form-label">To</label>
                      <select 
                        className="form-select"
                        value={newMessage.to}
                        onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                        required
                      >
                        <option value="">Select recipient</option>
                        <option value="hr@company.com">HR Department</option>
                        <option value="manager@company.com">My Manager</option>
                        <option value="it@company.com">IT Support</option>
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea 
                        className="form-control" 
                        rows="5"
                        value={newMessage.content}
                        onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowMessageModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <Icon icon="heroicons:paper-airplane" className="me-2" />
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showModal && selectedItem && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="heroicons:eye" />
                    Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {activeSection === 'requests' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Request Type</label>
                        <p className="form-control-plaintext text-capitalize">{selectedItem.type}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Date</label>
                        <p className="form-control-plaintext">{selectedItem.date}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Status</label>
                        <p className="form-control-plaintext">{getStatusBadge(selectedItem.status)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Description</label>
                        <p className="form-control-plaintext">{selectedItem.description}</p>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'messages' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">From</label>
                        <p className="form-control-plaintext">{selectedItem.from}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Date</label>
                        <p className="form-control-plaintext">{selectedItem.date}</p>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Subject</label>
                        <p className="form-control-plaintext fw-bold">{selectedItem.subject}</p>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Message</label>
                        <div className="form-control-plaintext bg-light p-3 rounded">
                          {selectedItem.content || "No content available."}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'tickets' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Ticket ID</label>
                        <p className="form-control-plaintext fw-bold">{selectedItem.id}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Date</label>
                        <p className="form-control-plaintext">{selectedItem.date}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Status</label>
                        <p className="form-control-plaintext">{getStatusBadge(selectedItem.status)}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Priority</label>
                        <p className="form-control-plaintext">{getPriorityBadge(selectedItem.priority)}</p>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Subject</label>
                        <p className="form-control-plaintext">{selectedItem.subject}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeSelfService;