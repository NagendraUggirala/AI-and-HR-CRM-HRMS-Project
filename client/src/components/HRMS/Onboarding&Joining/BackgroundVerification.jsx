import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendEmail, sendBulkEmails, copyEmailToClipboard, generateMailtoLink } from '../../../services/emailService';

const BackgroundVerification = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState('');
  const [emailSubject, setEmailSubject] = useState('Background Verification - Document Request');
  const [documentRequests, setDocumentRequests] = useState([]);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ type: '', message: '' });
  const [emailMethod, setEmailMethod] = useState('api'); // 'api', 'clipboard', 'mailto'
  const [ccEmails, setCcEmails] = useState('');
  const [bccEmails, setBccEmails] = useState('');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequestEmail, setNewRequestEmail] = useState('');
  const [newRequestName, setNewRequestName] = useState('');
  const [newRequestTemplate, setNewRequestTemplate] = useState('');
  const [newRequestSubject, setNewRequestSubject] = useState('Background Verification - Document Request');

  // Required documents list
  const requiredDocuments = [
    { id: 'aadhar', name: 'Aadhar Card', required: true },
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'passport', name: 'Passport', required: false },
    { id: 'driving', name: 'Driving License', required: false },
    { id: 'education', name: 'Education Certificates', required: true },
    { id: 'experience', name: 'Experience Letters', required: true },
    { id: 'address', name: 'Address Proof', required: true },
    { id: 'bank', name: 'Bank Statement', required: false },
    { id: 'photo', name: 'Passport Size Photo', required: true }
  ];

  // Load employees from localStorage
  useEffect(() => {
    loadEmployees();
    loadDocumentRequests();
  }, []);

  const loadEmployees = () => {
    const savedProfiles = localStorage.getItem('employeeProfiles');
    if (savedProfiles) {
      const profiles = JSON.parse(savedProfiles);
      const employeeList = profiles.map(profile => ({
        id: profile.employeeId || profile.id,
        employeeId: profile.employeeId,
        name: `${profile.firstName} ${profile.middleName ? profile.middleName + ' ' : ''}${profile.lastName}`.trim(),
        email: profile.officialEmail || profile.email,
        phone: profile.phone,
        department: profile.department,
        designation: profile.designation,
        joiningDate: profile.joiningDate,
        status: profile.bgvStatus || 'Not Started',
        candidateId: profile.candidateId
      }));
      setEmployees(employeeList);
    } else {
      // Sample data if no profiles exist
      const sampleEmployees = [
        {
          id: 'EMP001',
          employeeId: 'EMP001',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@company.com',
          phone: '+91 98765 43210',
          department: 'Engineering',
          designation: 'Software Engineer',
          joiningDate: new Date().toISOString().split('T')[0],
          status: 'Pending',
          candidateId: 'CAND001'
        },
        {
          id: 'EMP002',
          employeeId: 'EMP002',
          name: 'Priya Sharma',
          email: 'priya.sharma@company.com',
          phone: '+91 98765 43211',
          department: 'Marketing',
          designation: 'Marketing Executive',
          joiningDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'In Progress',
          candidateId: 'CAND002'
        },
        {
          id: 'EMP003',
          employeeId: 'EMP003',
          name: 'Amit Kumar Patel',
          email: 'amit.patel@company.com',
          phone: '+91 98765 43212',
          department: 'Sales',
          designation: 'Sales Manager',
          joiningDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'Completed',
          candidateId: 'CAND003'
        }
      ];
      setEmployees(sampleEmployees);
    }
  };

  const loadDocumentRequests = () => {
    const savedRequests = localStorage.getItem('bgvDocumentRequests');
    if (savedRequests) {
      setDocumentRequests(JSON.parse(savedRequests));
    }
  };

  const saveDocumentRequests = (requests) => {
    localStorage.setItem('bgvDocumentRequests', JSON.stringify(requests));
    setDocumentRequests(requests);
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle employee selection
  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  // Generate personalized email template
  const generateEmailTemplate = (employeeName) => {
    return `Dear ${employeeName},\n\nWe hope this email finds you well.\n\nAs part of our standard background verification process, we require the following documents from you:\n\n${requiredDocuments.filter(doc => doc.required).map(doc => `- ${doc.name}`).join('\n')}\n\nPlease submit scanned copies (PDF format) of these documents at your earliest convenience.\n\nYou can upload the documents through our employee portal or send them via email reply.\n\nIf you have any questions or concerns, please feel free to contact us.\n\nBest regards,\nHR Team\n\n---\nThis is an automated email. Please do not reply directly to this message.`;
  };

  // Handle new request modal open
  const handleNewRequest = () => {
    setNewRequestEmail('');
    setNewRequestName('');
    setNewRequestSubject('Background Verification - Document Request');
    setNewRequestTemplate(generateEmailTemplate('Employee'));
    setShowNewRequestModal(true);
  };

  // Handle send new request
  const handleSendNewRequest = async () => {
    if (!newRequestEmail.trim() || !newRequestName.trim()) {
      alert('Please enter email and name');
      return;
    }

    if (!newRequestTemplate.trim() || !newRequestSubject.trim()) {
      alert('Please enter subject and email template');
      return;
    }

    setSendingEmail(true);
    setEmailStatus({ type: 'info', message: 'Sending email...' });

    const timestamp = new Date().toISOString();

    try {
      let emailResult;

      // Personalize template with name
      const personalizedTemplate = newRequestTemplate.replace(/\[Employee Name\]/g, newRequestName).replace(/Dear\s+[^,\n]+/, `Dear ${newRequestName}`);

      if (emailMethod === 'api') {
        emailResult = await sendBulkEmails(
          [{ email: newRequestEmail, name: newRequestName }],
          newRequestSubject,
          () => personalizedTemplate,
          {
            cc: ccEmails ? ccEmails.split(',').map(e => e.trim()).filter(e => e) : null,
            bcc: bccEmails ? bccEmails.split(',').map(e => e.trim()).filter(e => e) : null
          }
        );
      } else if (emailMethod === 'clipboard') {
        const emailContent = `To: ${newRequestEmail}\n${ccEmails ? `CC: ${ccEmails}\n` : ''}${bccEmails ? `BCC: ${bccEmails}\n` : ''}Subject: ${newRequestSubject}\n\n${personalizedTemplate}`;
        await navigator.clipboard.writeText(emailContent);
        emailResult = { success: 1, failed: 0 };
        setEmailStatus({
          type: 'success',
          message: 'Email content copied to clipboard! Please paste it into your email client and send.'
        });
      } else if (emailMethod === 'mailto') {
        const mailtoLink = generateMailtoLink(newRequestEmail, newRequestSubject, personalizedTemplate);
        window.location.href = mailtoLink;
        emailResult = { success: 1, failed: 0 };
        setEmailStatus({
          type: 'success',
          message: 'Opening email client...'
        });
      }

      if (emailResult && emailResult.success > 0) {
        const newRequest = {
          id: Date.now() + Math.random(),
          employeeId: `EXT-${Date.now()}`,
          employeeName: newRequestName,
          email: newRequestEmail,
          status: 'Request Sent',
          requestedDate: timestamp,
          documents: requiredDocuments.map(doc => ({
            id: doc.id,
            name: doc.name,
            required: doc.required,
            status: 'Pending',
            uploadedDate: null,
            fileUrl: null
          })),
          emailSent: true,
          emailSentDate: timestamp,
          emailMethod: emailMethod,
          completedDate: null
        };

        const updatedRequests = [...documentRequests, newRequest];
        saveDocumentRequests(updatedRequests);

        // Add to employees list if not exists
        const existingEmp = employees.find(emp => emp.email === newRequestEmail);
        if (!existingEmp) {
          const newEmployee = {
            id: newRequest.employeeId,
            employeeId: newRequest.employeeId,
            name: newRequestName,
            email: newRequestEmail,
            phone: '',
            department: 'External',
            designation: 'Candidate',
            joiningDate: new Date().toISOString().split('T')[0],
            status: 'In Progress',
            candidateId: `CAND-${Date.now()}`
          };
          setEmployees([...employees, newEmployee]);
        }

        setEmailStatus({
          type: 'success',
          message: 'Request sent successfully!'
        });

        setTimeout(() => {
          setShowNewRequestModal(false);
          setNewRequestEmail('');
          setNewRequestName('');
          setNewRequestTemplate('');
          setEmailStatus({ type: '', message: '' });
          setCcEmails('');
          setBccEmails('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus({
        type: 'error',
        message: error.message || 'Failed to send email. Please try again.'
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // Handle send email
  const handleSendEmail = () => {
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee');
      return;
    }

    const selectedEmps = employees.filter(emp => selectedEmployees.includes(emp.id));
    // Use first employee's name for template preview, will be personalized during sending
    const defaultTemplate = generateEmailTemplate(selectedEmps[0]?.name || 'Employee');

    setEmailTemplate(defaultTemplate);
    setShowEmailModal(true);
  };

  const handleConfirmSendEmail = async () => {
    const selectedEmps = employees.filter(emp => selectedEmployees.includes(emp.id));
    if (selectedEmps.length === 0) {
      alert('Please select at least one employee');
      return;
    }

    setSendingEmail(true);
    setEmailStatus({ type: 'info', message: 'Sending emails...' });

    const timestamp = new Date().toISOString();

    try {
      let emailResult;

      if (emailMethod === 'api') {
        // Send via API
        const recipients = selectedEmps.map(emp => ({
          email: emp.email,
          name: emp.name
        }));

        // Personalize email template for each recipient
        const personalizedTemplate = (recipient) => {
          return emailTemplate.replace(/Dear\s+[^,\n]+/, `Dear ${recipient.name}`);
        };

        emailResult = await sendBulkEmails(
          recipients,
          emailSubject,
          personalizedTemplate,
          {
            cc: ccEmails ? ccEmails.split(',').map(e => e.trim()).filter(e => e) : null,
            bcc: bccEmails ? bccEmails.split(',').map(e => e.trim()).filter(e => e) : null
          }
        );

        if (emailResult.success > 0) {
          setEmailStatus({
            type: 'success',
            message: `Successfully sent ${emailResult.success} email(s)${emailResult.failed > 0 ? `. ${emailResult.failed} failed.` : ''}`
          });
        } else {
          throw new Error('Failed to send emails via API. Try using clipboard or mailto method.');
        }
      } else if (emailMethod === 'clipboard') {
        // Copy to clipboard - create personalized content for each recipient
        let emailContent = '';
        if (selectedEmps.length === 1) {
          // Single recipient - personalize
          const personalizedBody = emailTemplate.replace(/Dear\s+[^,\n]+/, `Dear ${selectedEmps[0].name}`);
          emailContent = `To: ${selectedEmps[0].email}\n${ccEmails ? `CC: ${ccEmails}\n` : ''}${bccEmails ? `BCC: ${bccEmails}\n` : ''}Subject: ${emailSubject}\n\n${personalizedBody}`;
        } else {
          // Multiple recipients - create separate emails
          emailContent = selectedEmps.map(emp => {
            const personalizedBody = emailTemplate.replace(/Dear\s+[^,\n]+/, `Dear ${emp.name}`);
            return `To: ${emp.email}\n${ccEmails ? `CC: ${ccEmails}\n` : ''}${bccEmails ? `BCC: ${bccEmails}\n` : ''}Subject: ${emailSubject}\n\n${personalizedBody}\n\n---\n`;
          }).join('\n');
        }
        
        try {
          await navigator.clipboard.writeText(emailContent);
          emailResult = { success: selectedEmps.length, failed: 0 };
          setEmailStatus({
            type: 'success',
            message: `Email content copied to clipboard! ${selectedEmps.length > 1 ? `(${selectedEmps.length} personalized emails)` : ''} Please paste it into your email client and send.`
          });
        } catch (error) {
          throw new Error('Failed to copy to clipboard: ' + error.message);
        }
      } else if (emailMethod === 'mailto') {
        // Generate mailto link (only works for single recipient)
        if (selectedEmps.length === 1) {
          const personalizedBody = emailTemplate.replace(/Dear\s+[^,\n]+/, `Dear ${selectedEmps[0].name}`);
          const mailtoLink = generateMailtoLink(
            selectedEmps[0].email,
            emailSubject,
            personalizedBody
          );
          window.location.href = mailtoLink;
          emailResult = { success: 1, failed: 0 };
          setEmailStatus({
            type: 'success',
            message: 'Opening email client...'
          });
        } else {
          throw new Error('Mailto method only works for single recipient. Please select one employee or use API/Clipboard method.');
        }
      }

      // Create document requests only if emails were sent successfully
      if (emailResult && emailResult.success > 0) {
        const newRequests = selectedEmps.map(emp => ({
          id: Date.now() + Math.random(),
          employeeId: emp.id,
          employeeName: emp.name,
          email: emp.email,
          status: 'Request Sent',
          requestedDate: timestamp,
          documents: requiredDocuments.map(doc => ({
            id: doc.id,
            name: doc.name,
            required: doc.required,
            status: 'Pending',
            uploadedDate: null,
            fileUrl: null
          })),
          emailSent: true,
          emailSentDate: timestamp,
          emailMethod: emailMethod,
          completedDate: null
        }));

        const updatedRequests = [...documentRequests, ...newRequests];
        saveDocumentRequests(updatedRequests);

        // Update employee status
        const updatedEmployees = employees.map(emp => {
          if (selectedEmployees.includes(emp.id)) {
            return { ...emp, status: 'In Progress' };
          }
          return emp;
        });
        setEmployees(updatedEmployees);

        // Update localStorage
        const savedProfiles = localStorage.getItem('employeeProfiles');
        if (savedProfiles) {
          const profiles = JSON.parse(savedProfiles);
          const updatedProfiles = profiles.map(profile => {
            if (selectedEmployees.includes(profile.employeeId || profile.id)) {
              return { ...profile, bgvStatus: 'In Progress' };
            }
            return profile;
          });
          localStorage.setItem('employeeProfiles', JSON.stringify(updatedProfiles));
        }

        // Show success message
        setTimeout(() => {
          setShowEmailModal(false);
          setSelectedEmployees([]);
          setEmailTemplate('');
          setEmailStatus({ type: '', message: '' });
          setCcEmails('');
          setBccEmails('');
        }, 2000);
      }

    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus({
        type: 'error',
        message: error.message || 'Failed to send emails. Please try again or use a different method.'
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'Pending': return 'info';
      case 'Not Started': return 'secondary';
      case 'Request Sent': return 'primary';
      default: return 'secondary';
    }
  };

  // Get document request for employee
  const getDocumentRequest = (employeeId) => {
    return documentRequests.find(req => req.employeeId === employeeId);
  };

  // Calculate completion percentage
  const getCompletionPercentage = (request) => {
    if (!request) return 0;
    const totalDocs = request.documents.length;
    const completedDocs = request.documents.filter(doc => doc.status === 'Completed').length;
    return Math.round((completedDocs / totalDocs) * 100);
  };

  return (
   < div className="container" style={{  maxWidth: '1400px'}}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start flex-wrap mb-4" >
        <div style={{ flex: '1 1 auto', minWidth: '300px' }}>
          <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8, color: '#1F2937', lineHeight: '1.2' }}>
            Background Verification
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 0, lineHeight: '1.5' }}>
            Request and track document collection for employee background verification
          </p>
        </div>
        <div className="d-flex gap-2 flex-wrap" style={{ alignItems: 'flex-start' }}>
          <button
            className="btn btn-success"
            onClick={handleNewRequest}
            style={{
              borderRadius: 8,
              padding: '10px 20px',
              fontWeight: 500,
              fontSize: 14,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon icon="heroicons:plus-circle" style={{ fontSize: 18 }} />
            New Request
          </button>
          {selectedEmployees.length > 0 && (
            <button
              className="btn btn-primary"
              onClick={handleSendEmail}
              style={{
                borderRadius: 8,
                padding: '10px 20px',
                fontWeight: 500,
                fontSize: 14,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Icon icon="heroicons:envelope" style={{ fontSize: 18 }} />
              Send Request ({selectedEmployees.length})
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={loadEmployees}
            style={{
              borderRadius: 8,
              padding: '10px 20px',
              fontWeight: 500,
              fontSize: 14,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon icon="heroicons:arrow-path" style={{ fontSize: 18 }} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4" style={{ borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div className="card-body" style={{ padding: '20px' }}>
          <div className="row g-3 align-items-end">
            <div className="col-md-8 col-lg-9">
              <label style={{ fontSize: 14, color: '#374151', fontWeight: 500, marginBottom: 8, display: 'block' }}>
                Search
              </label>
              <div className="input-group">
                <span className="input-group-text" style={{ background: '#F9FAFB', border: '1px solid #D1D5DB', borderRight: 'none' }}>
                  <Icon icon="heroicons:magnifying-glass" style={{ fontSize: 18, color: '#6B7280' }} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    borderRadius: '0 8px 8px 0',
                    border: '1px solid #D1D5DB',
                    borderLeft: 'none',
                    padding: '10px 14px',
                    fontSize: 14,
                    transition: 'all 0.2s'
                  }}
                  placeholder="Search by name, email, or employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <label style={{ fontSize: 14, color: '#374151', fontWeight: 500, marginBottom: 8, display: 'block' }}>
                Status Filter
              </label>
              <select
                className="form-select"
                style={{
                  borderRadius: 8,
                  border: '1px solid #D1D5DB',
                  padding: '10px 14px',
                  fontSize: 14,
                  transition: 'all 0.2s'
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Not Started</option>
                <option>Pending</option>
                <option>Request Sent</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="card-body text-center text-white" style={{ padding: '20px' }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.9 }}>Total Employees</div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: '1.2' }}>{employees.length}</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="card-body text-center text-white" style={{ padding: '20px' }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.9 }}>Pending</div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: '1.2' }}>
                {employees.filter(e => e.status === 'Pending' || e.status === 'Not Started').length}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="card-body text-center text-white" style={{ padding: '20px' }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.9 }}>In Progress</div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: '1.2' }}>
                {employees.filter(e => e.status === 'In Progress' || e.status === 'Request Sent').length}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 12, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <div className="card-body text-center text-white" style={{ padding: '20px' }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.9 }}>Completed</div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: '1.2' }}>
                {employees.filter(e => e.status === 'Completed').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Requests Cards */}
      {documentRequests.length > 0 && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 style={{ fontWeight: 600, fontSize: 20, marginBottom: 0, color: '#1F2937' }}>
              Document Requests
            </h4>
            <span className="badge bg-secondary" style={{ fontSize: 13, padding: '6px 12px' }}>
              {documentRequests.length} Request{documentRequests.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="row g-3">
            {documentRequests.map((request) => {
              const completion = getCompletionPercentage(request);
              return (
                <div key={request.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0" style={{ borderRadius: 12, border: '1px solid #E5E7EB', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                    <div className="card-body" style={{ padding: '20px' }}>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h6 style={{ fontWeight: 600, fontSize: 16, color: '#1F2937', marginBottom: 6, lineHeight: '1.3', wordBreak: 'break-word' }}>
                            {request.employeeName}
                          </h6>
                          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 0, wordBreak: 'break-word' }}>
                            {request.email}
                          </p>
                        </div>
                        <span
                          className={`badge bg-${getStatusColor(request.status)}`}
                          style={{
                            fontWeight: 500,
                            borderRadius: '20px',
                            padding: '6px 12px',
                            fontSize: 11,
                            whiteSpace: 'nowrap',
                            marginLeft: '12px'
                          }}
                        >
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small style={{ color: '#6B7280', fontSize: 12, fontWeight: 500 }}>Progress</small>
                          <small style={{ color: '#1F2937', fontSize: 12, fontWeight: 600 }}>
                            {completion}%
                          </small>
                        </div>
                        <div className="progress" style={{ height: '8px', borderRadius: '4px', backgroundColor: '#F3F4F6' }}>
                          <div
                            className={`progress-bar bg-${completion === 100 ? 'success' : 'info'}`}
                            style={{ width: `${completion}%`, borderRadius: '4px', transition: 'width 0.3s' }}
                          ></div>
                        </div>
                      </div>

                      <div className="mb-3 pb-2" style={{ borderBottom: '1px solid #E5E7EB' }}>
                        <small style={{ color: '#6B7280', fontSize: 12, display: 'block', marginBottom: 4 }}>Requested Date:</small>
                        <div style={{ color: '#1F2937', fontSize: 13, fontWeight: 500 }}>
                          {new Date(request.requestedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>

                      <div className="d-flex gap-2 mt-3">
                        <button
                          className="btn btn-sm btn-outline-primary flex-fill"
                          onClick={() => {
                            alert(`Document Request Details:\n\nEmployee: ${request.employeeName}\nEmail: ${request.email}\nStatus: ${request.status}\nCompletion: ${completion}%\n\nDocuments:\n${request.documents.map(doc => `- ${doc.name}: ${doc.status}`).join('\n')}`);
                          }}
                          style={{ fontSize: 13, padding: '6px 12px' }}
                        >
                          <Icon icon="heroicons:eye" className="me-1" style={{ fontSize: 14 }} />
                          View
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this request?')) {
                              const updatedRequests = documentRequests.filter(req => req.id !== request.id);
                              saveDocumentRequests(updatedRequests);
                            }
                          }}
                          style={{ fontSize: 13, padding: '6px 12px' }}
                        >
                          <Icon icon="heroicons:trash" style={{ fontSize: 14 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Employees Table */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: 12, overflow: 'hidden' }}>
        <div className="card-header bg-white border-bottom" style={{ padding: '20px', borderBottom: '2px solid #E5E7EB' }}>
          <h5 style={{ fontWeight: 600, fontSize: 18, color: '#1F2937', marginBottom: 0 }}>
            Employees List
          </h5>
        </div>
        <div className="card-body p-0">
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-hover mb-0" style={{ marginBottom: 0 }}>
              <thead style={{ background: '#FAFBFC', fontWeight: 600 }}>
                <tr>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', width: '50px', whiteSpace: 'nowrap' }}>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                      onChange={handleSelectAll}
                      style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap' }}>
                    Employee
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap' }}>
                    Contact
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap' }}>
                    Department
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap' }}>
                    Joining Date
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap' }}>
                    Status
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', whiteSpace: 'nowrap' }}>
                    Progress
                  </th>
                  <th style={{ padding: '16px 20px', fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #E5E7EB', textAlign: 'center', whiteSpace: 'nowrap' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5" style={{ color: '#9CA3AF' }}>
                      <Icon icon="heroicons:inbox" style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }} />
                      <div style={{ fontSize: 16, fontWeight: 500 }}>No employees found</div>
                      <div style={{ fontSize: 14, marginTop: 4 }}>Try adjusting your search or filter criteria</div>
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee, idx) => {
                    const request = getDocumentRequest(employee.id);
                    const completion = getCompletionPercentage(request);
                    
                    return (
                      <tr
                        key={employee.id}
                        style={{
                          background: idx % 2 === 1 ? '#FAFBFC' : '#FFF',
                          borderBottom: '1px solid #E5E7EB'
                        }}
                      >
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                          <input
                            type="checkbox"
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={() => handleSelectEmployee(employee.id)}
                            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                          />
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937', marginBottom: 4, lineHeight: '1.4' }}>
                            {employee.name}
                          </div>
                          <div style={{ color: '#6B7280', fontSize: 12 }}>
                            ID: {employee.employeeId}
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                          <div style={{ color: '#1F2937', fontSize: 14, marginBottom: 4, lineHeight: '1.4' }}>
                            {employee.email}
                          </div>
                          <div style={{ color: '#6B7280', fontSize: 12 }}>
                            {employee.phone || 'N/A'}
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                          <div style={{ color: '#1F2937', fontSize: 14, lineHeight: '1.4' }}>
                            {employee.department}
                          </div>
                          <div style={{ color: '#6B7280', fontSize: 12 }}>
                            {employee.designation}
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle', color: '#1F2937', fontSize: 14, whiteSpace: 'nowrap' }}>
                          {new Date(employee.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                          <span
                            className={`badge bg-${getStatusColor(employee.status)}`}
                            style={{
                              fontWeight: 500,
                              borderRadius: '20px',
                              padding: '6px 12px',
                              fontSize: 11,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {employee.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle', minWidth: '150px' }}>
                          {request ? (
                            <div>
                              <div className="progress" style={{ height: '8px', marginBottom: '6px', borderRadius: '4px', backgroundColor: '#F3F4F6' }}>
                                <div
                                  className={`progress-bar bg-${completion === 100 ? 'success' : 'info'}`}
                                  style={{ width: `${completion}%`, borderRadius: '4px' }}
                                ></div>
                              </div>
                              <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>
                                {completion}% Complete
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: '#9CA3AF', fontSize: 13 }}>Not Started</span>
                          )}
                        </td>
                        <td style={{ padding: '16px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                          <div className="d-flex gap-1 justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                setSelectedEmployees([employee.id]);
                                handleSendEmail();
                              }}
                              style={{ padding: '6px 10px' }}
                              title="Send Document Request"
                            >
                              <Icon icon="heroicons:envelope" style={{ fontSize: 16 }} />
                            </button>
                            {request && (
                              <button
                                className="btn btn-sm btn-outline-info"
                                onClick={() => {
                                  alert(`Document Request Details:\n\nEmployee: ${employee.name}\nStatus: ${request.status}\nCompletion: ${completion}%\n\nDocuments:\n${request.documents.map(doc => `- ${doc.name}: ${doc.status}`).join('\n')}`);
                                }}
                                style={{ padding: '6px 10px' }}
                                title="View Details"
                              >
                                <Icon icon="heroicons:eye" style={{ fontSize: 16 }} />
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
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1055,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEmailModal(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxWidth: '900px' }}>
            <div className="modal-content" style={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <div className="modal-header bg-primary text-white" style={{ borderRadius: '12px 12px 0 0', padding: '20px 24px', borderBottom: 'none' }}>
                <h5 className="modal-title d-flex align-items-center" style={{ fontWeight: 600, fontSize: 18, marginBottom: 0 }}>
                  <Icon icon="heroicons:envelope" className="me-2" style={{ fontSize: 20 }} />
                  Send Document Request Email
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEmailModal(false)}
                  style={{ fontSize: 14 }}
                ></button>
              </div>
              <div className="modal-body" style={{ padding: '24px' }}>
                {/* Email Status */}
                {emailStatus.message && (
                  <div className={`alert alert-${emailStatus.type === 'success' ? 'success' : emailStatus.type === 'error' ? 'danger' : 'info'} mb-3`}>
                    <Icon icon={emailStatus.type === 'success' ? 'heroicons:check-circle' : emailStatus.type === 'error' ? 'heroicons:exclamation-circle' : 'heroicons:information-circle'} className="me-2" />
                    {emailStatus.message}
                  </div>
                )}

                {/* Recipients */}
                <div className="mb-3">
                  <label className="form-label fw-bold">To:</label>
                  <div className="p-2 bg-light rounded">
                    {employees
                      .filter(emp => selectedEmployees.includes(emp.id))
                      .map(emp => (
                        <span key={emp.id} className="badge bg-primary me-2 mb-1">
                          {emp.name} ({emp.email})
                        </span>
                      ))}
                  </div>
                </div>

                {/* Email Method Selection */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Email Sending Method:</label>
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="emailMethod"
                      id="method-api"
                      value="api"
                      checked={emailMethod === 'api'}
                      onChange={(e) => setEmailMethod(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="method-api">
                      <Icon icon="heroicons:server" className="me-1" />
                      API Send
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="emailMethod"
                      id="method-clipboard"
                      value="clipboard"
                      checked={emailMethod === 'clipboard'}
                      onChange={(e) => setEmailMethod(e.target.value)}
                    />
                    <label className="btn btn-outline-primary" htmlFor="method-clipboard">
                      <Icon icon="heroicons:clipboard" className="me-1" />
                      Copy to Clipboard
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="emailMethod"
                      id="method-mailto"
                      value="mailto"
                      checked={emailMethod === 'mailto'}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={selectedEmployees.length > 1}
                    />
                    <label className={`btn btn-outline-primary ${selectedEmployees.length > 1 ? 'disabled' : ''}`} htmlFor="method-mailto">
                      <Icon icon="heroicons:envelope-open" className="me-1" />
                      Mailto (Single)
                    </label>
                  </div>
                  {emailMethod === 'api' && (
                    <small className="text-muted d-block mt-1">
                      <Icon icon="heroicons:information-circle" className="me-1" />
                      Sends email directly via API. Requires backend email service configured.
                    </small>
                  )}
                  {emailMethod === 'clipboard' && (
                    <small className="text-muted d-block mt-1">
                      <Icon icon="heroicons:information-circle" className="me-1" />
                      Copies email content to clipboard. Paste into your email client and send manually.
                    </small>
                  )}
                  {emailMethod === 'mailto' && (
                    <small className="text-muted d-block mt-1">
                      <Icon icon="heroicons:information-circle" className="me-1" />
                      Opens your default email client. Works only for single recipient.
                    </small>
                  )}
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Subject:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject..."
                    style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                  />
                </div>

                {/* CC and BCC */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>CC (Optional):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ccEmails}
                      onChange={(e) => setCcEmails(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                      disabled={emailMethod === 'mailto'}
                      style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                    />
                    <small className="text-muted" style={{ fontSize: 12, marginTop: 6, display: 'block' }}>Separate multiple emails with commas</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>BCC (Optional):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={bccEmails}
                      onChange={(e) => setBccEmails(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                      disabled={emailMethod === 'mailto'}
                      style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                    />
                    <small className="text-muted" style={{ fontSize: 12, marginTop: 6, display: 'block' }}>Separate multiple emails with commas</small>
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Required Documents:</label>
                  <div className="p-3 bg-light rounded">
                    <ul className="mb-0">
                      {requiredDocuments.filter(doc => doc.required).map(doc => (
                        <li key={doc.id}>{doc.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Email Body */}
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Email Body:</label>
                  <textarea
                    className="form-control"
                    rows="10"
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    placeholder="Enter email content..."
                    disabled={sendingEmail}
                    style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>

                {/* Info Alert */}
                <div className="alert alert-info">
                  <Icon icon="heroicons:information-circle" className="me-2" />
                  <strong>Note:</strong> This email will request employees to submit scanned copies (PDF format) of the required documents.
                </div>
              </div>
              <div className="modal-footer" style={{ padding: '20px 24px', borderTop: '1px solid #E5E7EB', borderRadius: '0 0 12px 12px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailStatus({ type: '', message: '' });
                    setCcEmails('');
                    setBccEmails('');
                  }}
                  disabled={sendingEmail}
                  style={{ borderRadius: 8, padding: '10px 20px', fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmSendEmail}
                  disabled={sendingEmail || !emailTemplate.trim() || !emailSubject.trim()}
                  style={{ borderRadius: 8, padding: '10px 20px', fontWeight: 500 }}
                >
                  {sendingEmail ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon icon="heroicons:paper-airplane" className="me-2" />
                      {emailMethod === 'api' ? 'Send via API' : emailMethod === 'clipboard' ? 'Copy to Clipboard' : 'Open Email Client'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1055,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowNewRequestModal(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxWidth: '900px' }}>
            <div className="modal-content" style={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
              <div className="modal-header bg-success text-white" style={{ borderRadius: '12px 12px 0 0', padding: '20px 24px', borderBottom: 'none' }}>
                <h5 className="modal-title d-flex align-items-center" style={{ fontWeight: 600, fontSize: 18, marginBottom: 0 }}>
                  <Icon icon="heroicons:plus-circle" className="me-2" style={{ fontSize: 20 }} />
                  New Document Request
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowNewRequestModal(false);
                    setEmailStatus({ type: '', message: '' });
                    setCcEmails('');
                    setBccEmails('');
                  }}
                  style={{ fontSize: 14 }}
                ></button>
              </div>
              <div className="modal-body" style={{ padding: '24px' }}>
                {/* Email Status */}
                {emailStatus.message && (
                  <div className={`alert alert-${emailStatus.type === 'success' ? 'success' : emailStatus.type === 'error' ? 'danger' : 'info'} mb-3`}>
                    <Icon icon={emailStatus.type === 'success' ? 'heroicons:check-circle' : emailStatus.type === 'error' ? 'heroicons:exclamation-circle' : 'heroicons:information-circle'} className="me-2" />
                    {emailStatus.message}
                  </div>
                )}

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
                    Name <span className="text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRequestName}
                    onChange={(e) => setNewRequestName(e.target.value)}
                    placeholder="Enter candidate/employee name"
                    disabled={sendingEmail}
                    style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
                    Email ID <span className="text-danger">*</span>:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={newRequestEmail}
                    onChange={(e) => setNewRequestEmail(e.target.value)}
                    placeholder="Enter email address"
                    disabled={sendingEmail}
                    style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                  />
                </div>

                {/* Email Method Selection */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Email Sending Method:</label>
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="newRequestEmailMethod"
                      id="new-method-api"
                      value="api"
                      checked={emailMethod === 'api'}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={sendingEmail}
                    />
                    <label className="btn btn-outline-primary" htmlFor="new-method-api">
                      <Icon icon="heroicons:server" className="me-1" />
                      API Send
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="newRequestEmailMethod"
                      id="new-method-clipboard"
                      value="clipboard"
                      checked={emailMethod === 'clipboard'}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={sendingEmail}
                    />
                    <label className="btn btn-outline-primary" htmlFor="new-method-clipboard">
                      <Icon icon="heroicons:clipboard" className="me-1" />
                      Copy to Clipboard
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="newRequestEmailMethod"
                      id="new-method-mailto"
                      value="mailto"
                      checked={emailMethod === 'mailto'}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={sendingEmail}
                    />
                    <label className="btn btn-outline-primary" htmlFor="new-method-mailto">
                      <Icon icon="heroicons:envelope-open" className="me-1" />
                      Mailto
                    </label>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
                    Subject <span className="text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRequestSubject}
                    onChange={(e) => setNewRequestSubject(e.target.value)}
                    placeholder="Email subject..."
                    disabled={sendingEmail}
                    style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                  />
                </div>

                {/* CC and BCC */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>CC (Optional):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ccEmails}
                      onChange={(e) => setCcEmails(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                      disabled={emailMethod === 'mailto' || sendingEmail}
                      style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                    />
                    <small className="text-muted" style={{ fontSize: 12, marginTop: 6, display: 'block' }}>Separate multiple emails with commas</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>BCC (Optional):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={bccEmails}
                      onChange={(e) => setBccEmails(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                      disabled={emailMethod === 'mailto' || sendingEmail}
                      style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '10px 14px', fontSize: 14 }}
                    />
                    <small className="text-muted" style={{ fontSize: 12, marginTop: 6, display: 'block' }}>Separate multiple emails with commas</small>
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Required Documents:</label>
                  <div className="p-3 bg-light rounded">
                    <ul className="mb-0">
                      {requiredDocuments.filter(doc => doc.required).map(doc => (
                        <li key={doc.id}>{doc.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Email Template */}
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>
                    Email Template <span className="text-danger">*</span>:
                  </label>
                  <textarea
                    className="form-control"
                    rows="10"
                    value={newRequestTemplate}
                    onChange={(e) => setNewRequestTemplate(e.target.value)}
                    placeholder="Enter email content..."
                    disabled={sendingEmail}
                    style={{ borderRadius: 8, border: '1px solid #D1D5DB', padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }}
                  />
                  <small className="text-muted" style={{ fontSize: 12, marginTop: 6, display: 'block' }}>
                    You can use [Employee Name] placeholder which will be replaced automatically
                  </small>
                </div>

                {/* Info Alert */}
                <div className="alert alert-info">
                  <Icon icon="heroicons:information-circle" className="me-2" />
                  <strong>Note:</strong> This email will request the candidate/employee to submit scanned copies (PDF format) of the required documents.
                </div>
              </div>
              <div className="modal-footer" style={{ padding: '20px 24px', borderTop: '1px solid #E5E7EB', borderRadius: '0 0 12px 12px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowNewRequestModal(false);
                    setEmailStatus({ type: '', message: '' });
                    setCcEmails('');
                    setBccEmails('');
                    setNewRequestEmail('');
                    setNewRequestName('');
                    setNewRequestTemplate('');
                  }}
                  disabled={sendingEmail}
                  style={{ borderRadius: 8, padding: '10px 20px', fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSendNewRequest}
                  disabled={sendingEmail || !newRequestTemplate.trim() || !newRequestSubject.trim() || !newRequestEmail.trim() || !newRequestName.trim()}
                  style={{ borderRadius: 8, padding: '10px 20px', fontWeight: 500 }}
                >
                  {sendingEmail ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon icon="heroicons:paper-airplane" className="me-2" />
                      {emailMethod === 'api' ? 'Send via API' : emailMethod === 'clipboard' ? 'Copy to Clipboard' : 'Open Email Client'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundVerification;
