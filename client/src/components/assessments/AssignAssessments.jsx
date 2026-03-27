import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Send,
  Calendar,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Filter,
  X,
  Users,
  ClipboardList
} from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import '../../App.css';
import { assessmentAPI } from '../../utils/api';
import { BASE_URL } from '../../config/api.config';

const AssignAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchCandidate, setSearchCandidate] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loadedPreselectedCount, setLoadedPreselectedCount] = useState(0);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const [assessmentsData, candidatesResponse, assignmentsData, preselectedData] = await Promise.all([
        assessmentAPI.list(),
        fetch(`${BASE_URL}/api/resume/candidates`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
        assessmentAPI.listAssignments(),
        assessmentAPI.getPreselectedCandidates().catch(() => ({ candidate_ids: [], candidate_emails: [] }))
      ]);
      
      let candidatesData = [];
      if (candidatesResponse.ok) {
        candidatesData = await candidatesResponse.json();
        console.log('📋 Fetched candidates for assessment assignment:', candidatesData);
      } else {
        const errorData = await candidatesResponse.json().catch(() => ({ detail: 'Failed to fetch candidates' }));
        console.error('Failed to fetch candidates:', errorData);
      }
      
      setAssessments(assessmentsData || []);
      // Keep all candidates (including Rejected) so that Resume Screening preselected IDs always appear here.
      const allCandidates = candidatesData || [];
      console.log(`📋 Loaded ${allCandidates.length} candidates (including rejected)`);
      setCandidates(allCandidates);
      setAssignments(assignmentsData || []);

      const preselectedIds = new Set((preselectedData?.candidate_ids || []).map((id) => Number(id)));
      if (preselectedIds.size > 0) {
        const matchedIds = allCandidates
          .map((c) => c.id)
          .filter((id) => preselectedIds.has(Number(id)));
        setSelectedCandidates(matchedIds);
        setLoadedPreselectedCount(matchedIds.length);
      } else {
        setLoadedPreselectedCount(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCandidates([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter candidates by search and status
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.candidate_name?.toLowerCase().includes(searchCandidate.toLowerCase()) ||
      candidate.candidate_email?.toLowerCase().includes(searchCandidate.toLowerCase()) ||
      candidate.role?.toLowerCase().includes(searchCandidate.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'Interview Stage' && candidate.score >= 70) ||
      (filterStatus === 'Screening' && candidate.score < 70 && candidate.score >= 50) ||
      (filterStatus === 'Applied' && candidate.score < 50);
    
    return matchesSearch && matchesStatus;
  });

  // Toggle candidate selection
  const toggleCandidateSelection = (candidateId) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  // Select all filtered candidates
  const selectAllCandidates = () => {
    const allIds = filteredCandidates.map(c => c.id);
    setSelectedCandidates(allIds);
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedCandidates([]);
    setLoadedPreselectedCount(0);
    assessmentAPI.clearPreselectedCandidates().catch(() => null);
  };

  // Assign assessment
  const handleAssign = async () => {
    if (selectedCandidates.length === 0) {
      alert('⚠️ Please select at least one candidate');
      return;
    }
    if (!selectedAssessment) {
      alert('⚠️ Please select an assessment');
      return;
    }

    try {
      setLoading(true);
      const assessment = assessments.find(a => a.id === parseInt(selectedAssessment));
      
      // Create assignments for each candidate
      for (const candidateId of selectedCandidates) {
        await assessmentAPI.assign(candidateId, parseInt(selectedAssessment), dueDate || null);
      }

      // Send emails if enabled
      if (sendEmail && assessment) {
        for (const candidateId of selectedCandidates) {
          const candidate = candidates.find(c => c.id === candidateId);
          if (candidate && candidate.candidate_email) {
            await sendAssessmentEmail(candidate, assessment);
          }
        }
      }

      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      await assessmentAPI.clearPreselectedCandidates().catch(() => null);
      setLoadedPreselectedCount(0);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error assigning assessment:', error);
      alert('❌ Failed to assign assessment');
    } finally {
      setLoading(false);
    }
  };

  // Send assessment email
  const sendAssessmentEmail = async (candidate, assessment) => {
    const testLinks = {
      aptitude: `${window.location.origin}/assessment/aptitude?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`,
      coding: `${window.location.origin}/assessment/coding?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`,
      communication: `${window.location.origin}/assessment/communication?name=${encodeURIComponent(candidate.candidate_name)}&email=${encodeURIComponent(candidate.candidate_email)}`
    };

    const testLink = testLinks[assessment.type];
    if (!testLink) return;

    const emailBody = `
Dear ${candidate.candidate_name},

You have been assigned to take the ${assessment.name} assessment.

Assessment Details:
- Type: ${assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}
- Difficulty: ${assessment.difficulty || 'Medium'}
${dueDate ? `- Due Date: ${new Date(dueDate).toLocaleDateString()}` : ''}

Please click the link below to start your assessment:
${testLink}

Important Instructions:
1. You will receive an OTP to verify your identity
2. Complete the assessment within the time limit
3. Ensure stable internet connection
4. Answer all questions carefully

Good luck!

Best regards,
Recruitment Team
    `.trim();

    try {
      await fetch(`${BASE_URL}/api/send-assessment-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: candidate.candidate_email,
          to_name: candidate.candidate_name,
          subject: `Assessment Invitation - ${assessment.name}`,
          body: emailBody,
          test_type: assessment.type,
          test_link: testLink
        })
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedCandidates([]);
    setSelectedAssessment('');
    setDueDate('');
    setSendEmail(true);
    setSearchCandidate('');
  };

  // Get assignment status badge
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'badge bg-success-subtle text-success';
      case 'in progress':
        return 'badge bg-info-subtle text-info';
      case 'assigned':
        return 'badge bg-warning-subtle text-warning';
      case 'expired':
        return 'badge bg-danger-subtle text-danger';
      default:
        return 'badge bg-secondary-subtle text-secondary';
    }
  };

  // Get candidate by ID
  const getCandidateName = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    return candidate?.candidate_name || 'Unknown';
  };

  // Get assessment by ID
  const getAssessmentName = (assessmentId) => {
    const assessment = assessments.find(a => a.id === assessmentId);
    return assessment?.name || 'Unknown';
  };

  // Get selected assessment details
  const selectedAssessmentDetails = selectedAssessment 
    ? assessments.find(a => a.id === parseInt(selectedAssessment))
    : null;

  // Get status color for badges
  const getStatusColor = (status) => {
    if (!status) return 'bg-secondary';
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('interview')) return 'bg-primary';
    if (lowerStatus.includes('screening')) return 'bg-info';
    if (lowerStatus.includes('applied')) return 'bg-warning';
    if (lowerStatus.includes('shortlisted')) return 'bg-success';
    return 'bg-secondary';
  };

  // Helper to toggle candidate
  const toggleCandidate = (candidateId) => {
    toggleCandidateSelection(candidateId);
  };

  // Select all visible candidates
  const selectAllVisible = () => {
    selectAllCandidates();
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header - align with JobList/CreateJob */}
      <div className="mb-4 d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h4 className="fw-bold h4 d-flex align-items-center gap-2 mb-0">
            <Icon icon="heroicons:clipboard-document-check" className="text-black" style={{ fontSize: 28 }} />
            Assign Assessment
          </h4>
          <p className="text-secondary mb-0 mt-1">
            Select candidates and assign them an assessment test.
          </p>
        </div>
        <div className="d-flex flex-column align-items-end gap-2">
          <span className="text-muted small">
            Selected candidates:{' '}
            <span className="fw-medium text-body">{selectedCandidates.length}</span>
          </span>
          <div className="d-flex flex-wrap align-items-center justify-content-end gap-2">
            <div className="d-flex align-items-center gap-2 px-3 py-2 bg-primary-subtle text-primary rounded-3">
              <ClipboardList size={18} />
              <span className="fw-medium">
                {selectedCandidates.length} selected
              </span>
            </div>
            <button
              className="btn refresh-btn d-inline-flex align-items-center gap-2"
              onClick={fetchData}
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                <Send size={18} className="text-success" />
              </div>
              <div>
                <h6 className="alert-heading mb-1">
                  Assessment "{selectedAssessmentDetails?.name}" assigned successfully to {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''}!
                </h6>
                <p className="mb-0 small">
                  Due Date: {dueDate ? new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No deadline'} • Email notifications sent
                </p>
              </div>
            </div>
            <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
          </div>
        </div>
      )}

      {loadedPreselectedCount > 0 && (
        <div className="alert alert-info mb-4 d-flex align-items-center justify-content-between">
          <span>Loaded {loadedPreselectedCount} candidates from Resume Screening selection.</span>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={clearSelection}>
            Clear preselected
          </button>
        </div>
      )}

      <div className="row g-4">
        {/* Left Section - Candidate Selection */}
        <div className="col-lg-8">
          <div className="card border shadow-none">
            <div className="card-header bg-white border-bottom">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 d-flex align-items-center gap-2">
                  <Users size={18} />
                  Select Candidates
                </h5>
                <div className="d-flex gap-2">
                  <button
                    onClick={selectAllVisible}
                    className="btn btn-sm btn-primary"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Clear
                  </button>
                </div>
              </div>
              {/* Search and Filter */}
              <div className="row g-3 align-items-end">
                <div className="col-md-8">
                  <label className="form-label small text-muted mb-1">Search candidates</label>
                  <div className="position-relative">
                    <Search size={16} className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                    <input
                      type="text"
                      className="form-control ps-5"
                      placeholder="Name, email or role..."
                      value={searchCandidate}
                      onChange={(e) => setSearchCandidate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label small text-muted mb-1">Status</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Filter size={16} />
                    </span>
                    <select
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="Interview Stage">Interview Stage</option>
                      <option value="Screening">Screening</option>
                      <option value="Applied">Applied</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate List */}
            <div className="card-body p-0">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => toggleCandidate(candidate.id)}
                  className={`p-3 border-bottom ${
                    selectedCandidates.includes(candidate.id)
                      ? 'bg-primary-subtle'
                      : 'hover-bg-light'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <label
                        className={`custom-checkbox mb-0 d-inline-flex align-items-center justify-content-center ${
                          selectedCandidates.includes(candidate.id) ? 'checked' : ''
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCandidate(candidate.id);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <input
                          type="checkbox"
                          className="d-none"
                          checked={selectedCandidates.includes(candidate.id)}
                          readOnly
                        />
                        <span className="checkbox-box">
                          {selectedCandidates.includes(candidate.id) && (
                            <span className="checkmark">✓</span>
                          )}
                        </span>
                      </label>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{candidate.candidate_name}</h6>
                      <p className="text-muted small mb-1">{candidate.role || 'N/A'}</p>
                      <p className="text-muted small mb-0">{candidate.candidate_email}</p>
                    </div>
                    <span
                      className={`badge ${getStatusColor(
                        candidate.score >= 70
                          ? 'Interview Stage'
                          : candidate.score >= 50
                          ? 'Screening'
                          : 'Applied'
                      )}`}
                    >
                      {candidate.score >= 70
                        ? 'Interview Stage'
                        : candidate.score >= 50
                        ? 'Screening'
                        : 'Applied'}
                    </span>
                  </div>
                </div>
              ))}
              {filteredCandidates.length === 0 && (
                <div className="text-center py-5 mb-4">
                  <p className="text-muted mb-0">No candidates found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Assessment & Details */}
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-3">
            {/* Assessment Selection */}
            <div className="card border shadow-none">
              <div className="card-body">
                <h5 className="mb-3 d-flex align-items-center gap-2">
                  <ClipboardList size={18} />
                  Assessment Details
                </h5>
                <div className="mb-3">
                  <label className="form-label">
                    Select Assessment <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={selectedAssessment}
                    onChange={(e) => setSelectedAssessment(e.target.value)}
                    required
                  >
                    <option value="">Choose an assessment...</option>
                    {assessments.map((assessment) => (
                      <option key={assessment.id} value={assessment.id}>
                        {assessment.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedAssessmentDetails && (
                  <div className="alert alert-info mb-3">
                    <div className="d-flex justify-content-between small">
                      <span>Type:</span>
                      <span className="fw-medium">{selectedAssessmentDetails.type}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Difficulty:</span>
                      <span className="fw-medium">{selectedAssessmentDetails.difficulty || 'Medium'}</span>
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Due Date <span className="text-danger">*</span>
                  </label>
                  <p className="text-muted small mb-2">Submissions will be prevented after this date</p>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {dueDate && (
                    <p className="text-primary small mt-2">
                      📅 Due: {new Date(dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="sendEmailCheck"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="sendEmailCheck">
                    <Mail size={16} className="me-1" />
                    Send email notifications
                  </label>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="card border-primary-subtle bg-primary-subtle">
              <div className="card-body">
                <h6 className="card-title mb-3">Assignment Summary</h6>
                <div className="small">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Candidates:</span>
                    <span className="fw-medium">{selectedCandidates.length}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Assessment:</span>
                    <span className="fw-medium">
                      {selectedAssessmentDetails ? selectedAssessmentDetails.name : 'Not selected'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Due Date:</span>
                    <span className="fw-medium">
                      {dueDate ? new Date(dueDate).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assign Button */}
            <button
              className="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center"
              onClick={handleAssign}
              disabled={selectedCandidates.length === 0 || !selectedAssessment || !dueDate || loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Assigning...
                </>
              ) : (
                <>
                  <Send size={18} className="me-2" />
                  <span>{selectedCandidates.length > 0 ? `Assign to ${selectedCandidates.length} Candidate${selectedCandidates.length !== 1 ? 's' : ''}` : 'Assign Assessment'}</span>
                </>
              )}
            </button>
            
            {selectedCandidates.length === 0 && (
              <p className="text-muted small text-center">Please select at least one candidate</p>
            )}
            {!selectedAssessment && selectedCandidates.length > 0 && (
              <p className="text-muted small text-center">Please choose an assessment</p>
            )}
            {!dueDate && selectedCandidates.length > 0 && selectedAssessment && (
              <p className="text-muted small text-center">Please set a due date</p>
            )}
          </div>
        </div>
      </div>


      <style jsx>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AssignAssessments;



