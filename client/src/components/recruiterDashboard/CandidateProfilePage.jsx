import React, { useState } from 'react';
import { Download, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign, Clock, Linkedin, Github, X, CheckCircle } from 'lucide-react';

const CandidateProfilePage = ({ candidate, onClose }) => {
  const fullData = candidate.fullData || {};
  const backendBaseUrl = "http://localhost:8000";

  const [activeTab, setActiveTab] = useState('overview');
  const [currentStage, setCurrentStage] = useState(candidate.stage);
  const [actionMessage, setActionMessage] = useState(null);

  const avatar = candidate.name?.split(' ').map(n => n[0]).join('') || '?';
  const email = candidate.email || fullData.email || 'Not provided';
  const phone = fullData.phone || 'Not provided';
  const role = candidate.role || fullData.role || 'Not specified';
  const appliedDate = fullData.applied_date
    ? new Date(fullData.applied_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Not available';
  const summary = fullData.summary || fullData.about || 'No summary provided.';
  const educationDetails = fullData.education_details || {};
  const educationDegree = educationDetails.degree || fullData.education || null;
  const educationInstitution = educationDetails.institution || educationDetails.college || null;
  const educationYear = educationDetails.year || fullData.graduation_year || null;
  const experienceValue = fullData.experience || fullData.experience_years || fullData.total_experience || null;
  const lastCompany = fullData.last_company || fullData.current_company || null;
  const expectedSalary = fullData.expected_salary || 'Not specified';
  const location = fullData.location || 'Not specified';
  const availability = fullData.availability || 'Not specified';
  const noticePeriod = fullData.notice_period || 'Not specified';
  const linkedinUrl = fullData.linkedin || '';
  const githubUrl = fullData.github || '';
  const skills = Array.isArray(candidate.skills)
    ? candidate.skills
    : fullData.skills
      ? fullData.skills.split(',').map(skill => skill.trim())
      : [];
  const workHistory = Array.isArray(fullData.work_history) ? fullData.work_history : [];
  const resumeUrl = candidate.resume_url || fullData.resume_url || '';

  const showActionMessage = (message, type = 'success') => {
    setActionMessage({ message, type });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleShortlist = () => {
    if (currentStage === 'Applied') {
      setCurrentStage('Screening');
      showActionMessage(`✅ ${candidate.name} has been shortlisted and moved to Screening stage!`);
    } else {
      showActionMessage(`✅ ${candidate.name} has been shortlisted!`);
    }
  };

  const handleReject = () => {
    if (window.confirm(`Are you sure you want to reject ${candidate.name}?`)) {
      setCurrentStage('Rejected');
      showActionMessage(`❌ ${candidate.name} has been rejected.`, 'danger');
    }
  };

  const handleDownload = () => {
    if (resumeUrl) {
      // Log the raw resumeUrl for debugging
      console.log('Raw resumeUrl:', resumeUrl);

      let downloadUrl;

      // Case 1: If it's already a full URL (starts with http)
      if (resumeUrl.startsWith('http')) {
        downloadUrl = resumeUrl;
      }
      // Case 2: If it starts with '/uploads/' (full path from root)
      else if (resumeUrl.startsWith('/uploads/')) {
        downloadUrl = `${backendBaseUrl}${resumeUrl}`;
      }
      // Case 3: If it starts with 'uploads/' (relative path)
      else if (resumeUrl.startsWith('uploads/')) {
        downloadUrl = `${backendBaseUrl}/${resumeUrl}`;
      }
      // Case 4: If it starts with a slash but not /uploads/
      else if (resumeUrl.startsWith('/')) {
        downloadUrl = `${backendBaseUrl}${resumeUrl}`;
      }
      // Case 5: Just the filename (assume it's in uploads folder)
      else {
        downloadUrl = `${backendBaseUrl}/uploads/${resumeUrl}`;
      }

      console.log('Final download URL:', downloadUrl);
      window.open(downloadUrl, "_blank");
    } else {
      showActionMessage('No resume available for download', 'danger');
    }
  };

  const handleStageChange = (e) => {
    const newStage = e.target.value;
    if (newStage && newStage !== '⏭ Move to Stage') {
      setCurrentStage(newStage);
      showActionMessage(`✅ ${candidate.name} has been moved to ${newStage} stage!`);
    }
  };

  const handleSubmit = () => {
    showActionMessage(`✅ Profile updated successfully! All changes for ${candidate.name} have been saved.`);
    // You can add API call here to save the changes to the backend
  };

  const getStageColor = (stage) => {
    const colors = {
      'Applied': 'bg-primary-subtle text-primary',
      'Screening': 'bg-info-subtle text-info',
      'Interview': 'bg-warning-subtle text-warning',
      'Offer': 'bg-success-subtle text-success',
      'Hired': 'bg-success-subtle text-success',
      'Rejected': 'bg-danger-subtle text-danger'
    };
    return colors[stage] || 'bg-secondary-subtle text-secondary';
  };

  return (
    <div className="job-modal-overlay">
      <div className="job-modal-dialog custom-modal-xl" style={{ width: '900px', maxWidth: '65%' }}>
        <div className="job-modal-content" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>

          {/* Modal Header */}
          <div className="job-modal-header">
            <div>
              <h5 className="job-modal-subtitle">Candidate Profile</h5>
            </div>
            <button type="button" className="job-modal-close" onClick={onClose}>×</button>
          </div>

          {/* Modal Body with Scroll */}
          <div className="job-modal-body custom-modal-scroll">
            <div className="container-fluid p-0">

              {/* Action Message */}
              {actionMessage && (
                <div className={`alert alert-${actionMessage.type} alert-dismissible fade show mb-4`} role="alert">
                  {actionMessage.message}
                  <button type="button" className="btn-close" onClick={() => setActionMessage(null)}></button>
                </div>
              )}

              {/* Profile Header Card */}
              <div className="job-section">
                <div className="job-info-card p-4">
                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-4">
                    <div className="d-flex gap-4 flex-grow-1 align-items-center">
                      <div>
                        <h5 className="fw-bold mb-1">{candidate.name}</h5>
                        <p className="text-muted mb-3">{role}</p>
                        <div className="job-meta d-flex gap-3">
                          <span className="d-flex align-items-center gap-1">
                            <Phone size={16} />
                            {phone}
                          </span>
                          <span className="d-flex align-items-center gap-1">
                            <Mail size={16} />
                            {email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Tabs Navigation */}
              <div className="job-section">
                <div className="card border">
                  <div className="card-header bg-white border-bottom p-0">
                    <ul className="nav nav-tabs card-header-tabs border-0">
                      {['overview', 'skills', 'work history'].map((tab) => (
                        <li className="nav-item" key={tab}>
                          <button
                            onClick={() => setActiveTab(tab)}
                            className={`nav-link text-capitalize ${activeTab === tab ? 'active' : ''}`}
                            style={{ fontWeight: activeTab === tab ? '700' : '400' }}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-body p-4">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div>
                        <div className="job-section">
                          <h6 className="job-section-title mb-3">About Me</h6>
                          <p className="text-muted">{summary}</p>
                        </div>

                        <div className="row mb-4">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <h6 className="job-section-title mb-3">Education</h6>
                            <div className="job-info-card">
                              {educationDegree || educationInstitution || educationYear ? (
                                <>
                                  {educationDegree && <p className="fw-bold mb-1">{educationDegree}</p>}
                                  {educationInstitution && <p className="text-muted mb-1">{educationInstitution}</p>}
                                  {educationYear && <p className="text-muted small mb-0">Graduated: {educationYear}</p>}
                                </>
                              ) : (
                                <p className="text-muted mb-0">Education details not provided.</p>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <h6 className="job-section-title mb-3">Experience</h6>
                            <div className="job-info-card">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <Briefcase size={18} className="text-muted" />
                                {experienceValue || 'Not specified'}
                              </div>
                              <p className="text-muted small mb-0">
                                Last Company: {lastCompany || 'Not specified'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="job-info-grid">
                          <div className="job-info-card">
                            <p className="job-info-label">Expected Salary</p>
                            <p className="job-info-value">{expectedSalary}</p>
                          </div>
                          <div className="job-info-card">
                            <p className="job-info-label">Location</p>
                            <p className="job-info-value">{location}</p>
                          </div>
                          <div className="job-info-card">
                            <p className="job-info-label">Availability</p>
                            <p className="job-info-value">{availability}</p>
                          </div>
                          <div className="job-info-card">
                            <p className="job-info-label">Notice Period</p>
                            <p className="job-info-value">{noticePeriod}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 'skills' && (
                      <div>
                        <h6 className="job-section-title mb-4">Technical & Soft Skills</h6>
                        <div className="job-skills">
                          {skills.length > 0 ? skills.map((skill, index) => (
                            <span key={index} className="job-skill">
                              {skill}
                            </span>
                          )) : (
                            <span className="text-muted">No skills provided.</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Work History Tab */}
                    {activeTab === 'work history' && (
                      <div>
                        <h6 className="job-section-title mb-4">Work Experience</h6>
                        <div className="d-flex flex-column gap-3">
                          {workHistory.length > 0 ? workHistory.map((job, index) => (
                            <div key={index} className="job-info-card">
                              <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap">
                                <div>
                                  <h6 className="fw-bold mb-1">{job.role}</h6>
                                  <p className="text-primary fw-semibold mb-0">{job.company}</p>
                                </div>
                                <span className="job-badge primary">
                                  {job.duration}
                                </span>
                              </div>
                              <p className="text-muted small mb-0">{job.description}</p>
                            </div>
                          )) : (
                            <div className="job-info-card">
                              <p className="text-muted mb-0">No work history provided.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="job-modal-footer d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div className="text-muted small">
              <span>
                Last Updated:{' '}
                {fullData.updated_at
                  ? new Date(fullData.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  : 'Not available'}
              </span>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="job-listings-btn"
                disabled={!resumeUrl}
                onClick={handleDownload}
              >
                <Download size={16} />
                Download Resume
              </button>
              <button type="button" className="close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;