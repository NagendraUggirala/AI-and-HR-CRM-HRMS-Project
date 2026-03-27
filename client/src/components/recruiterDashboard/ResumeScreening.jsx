import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Upload, FileText, CheckCircle, XCircle, Mail, Briefcase, AlertCircle, Eye } from 'lucide-react';
import { BASE_URL } from '../../config/api.config';
import { assessmentAPI } from '../../utils/api';
import '../../App.css';

const ResumeScreening = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'candidates');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    experienceLevel: 'fresher'
  });
  const [errors, setErrors] = useState({});
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [loadedPreselectedCount, setLoadedPreselectedCount] = useState(0);
  const [preselectedCandidateIds, setPreselectedCandidateIds] = useState([]);
  /** Server SCORE_THRESHOLD (from .env); never hardcode 25 — must match backend. */
  const [screeningThreshold, setScreeningThreshold] = useState(null);

  useEffect(() => {
    // Load candidates preselected from Resume Screening selection (saved for Assign Assessment)
    assessmentAPI
      .getPreselectedCandidates()
      .then((data) => {
        const ids = (data?.candidate_ids || []).map((id) => Number(id)).filter((n) => Number.isFinite(n));
        setPreselectedCandidateIds(ids);
      })
      .catch(() => {
        setPreselectedCandidateIds([]);
        setLoadedPreselectedCount(0);
      });
  }, []);

  useEffect(() => {
    // When both candidates list and preselected IDs are ready, sync selection
    if (!candidates || candidates.length === 0) return;
    if (!preselectedCandidateIds || preselectedCandidateIds.length === 0) return;
    if (selectedCandidateIds.length > 0) return; // respect current user selection

    const matchedIds = candidates
      .map((c) => Number(c.id))
      .filter((id) => preselectedCandidateIds.includes(id));

    setSelectedCandidateIds(matchedIds);
    setLoadedPreselectedCount(matchedIds.length);
  }, [candidates, preselectedCandidateIds, selectedCandidateIds.length]);

  // Load threshold from API (same source as candidate rows' `threshold` field)
  useEffect(() => {
    const loadScreeningConfig = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${BASE_URL}/api/resume/screening-config`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          const t = Number(data?.score_threshold);
          if (Number.isFinite(t)) setScreeningThreshold(t);
        }
      } catch (e) {
        console.warn('Could not load screening-config:', e);
      }
    };
    loadScreeningConfig();
  }, []);

  // Fetch AI-screened candidates
  const fetchCandidates = async () => {
    setLoadingCandidates(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('❌ No authentication token found');
        setCandidates([]);
        setLoadingCandidates(false);
        return;
      }

      console.log('📥 Fetching AI-screened candidates from:', `${BASE_URL}/api/resume/candidates`);
      
      const response = await fetch(`${BASE_URL}/api/resume/candidates?limit=1000&show_all=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📊 Response status:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Fetched AI screening candidates:', data);
        console.log(`📊 Total candidates received: ${data.length}`);
        
        if (data.length === 0) {
          console.warn('⚠️ No candidates returned. Possible reasons:');
          console.warn('  1. No candidates have been screened yet');
          console.warn('  2. Recruiter has no jobs/applications');
          console.warn('  3. All candidates are filtered out');
        }
        
        setCandidates(data);
        // Keep only currently visible selected candidates.
        setSelectedCandidateIds((prev) => {
          const visibleIds = new Set((data || []).map((c) => c.id));
          return prev.filter((id) => visibleIds.has(id));
        });
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to fetch candidates. Status:', response.status);
        console.error('❌ Error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { detail: errorText || 'Failed to fetch candidates' };
        }
        
        console.error('❌ Error details:', errorData);
        setCandidates([]); // Set empty array on error
      }
    } catch (error) {
      console.error('❌ Network error fetching candidates:', error);
      console.error('❌ Error stack:', error.stack);
      setCandidates([]); // Set empty array on error
    } finally {
      setLoadingCandidates(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'candidates') {
      fetchCandidates();
    }
  }, [activeTab]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ file: 'Only PDF and DOCX files are allowed' });
        return;
      }
      setSelectedFile(file);
      setErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedFile) newErrors.file = 'Please select a resume file';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleUpload = async () => {
    if (!validateForm()) return;

    setIsUploading(true);
    setUploadResult(null);

    const formDataToSend = new FormData();
    formDataToSend.append('file', selectedFile);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('experience_level', formData.experienceLevel);

    try {
      const response = await fetch(`${BASE_URL}/api/resume/process`, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        const result = await response.json();
        setUploadResult(result);
        // Clear form
        setSelectedFile(null);
        setFormData({ role: '', experienceLevel: 'fresher' });
        // Reset file input
        document.getElementById('resume-file-input').value = '';
      } else {
        const errorData = await response.json();
        setUploadResult({
          status: 'error',
          message: errorData.detail || 'Failed to process resume'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        status: 'error',
        message: 'Network error. Please check if backend is running.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getCandidateThreshold = (candidate) => {
    const threshold = Number(candidate?.threshold);
    if (Number.isFinite(threshold)) return threshold;
    if (Number.isFinite(screeningThreshold)) return screeningThreshold;
    return null;
  };

  const isCandidateShortlisted = (candidate) => {
    const stage = (candidate?.stage || '').toLowerCase();
    if (stage) return stage !== 'rejected';
    const th = getCandidateThreshold(candidate);
    if (th == null) return false;
    return Number(candidate?.score) >= th;
  };

  const renderUploadTab = () => {
    return (
      <div className="d-grid gap-4">
        {/* Upload Form - ref JobList/CreateJob: card border shadow-none */}
        <div className="card border shadow-none">
          <div className="card-body p-24">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-8 col-xl-6">
                <h4 className="fw-semibold mb-1 text-dark">Screen a Resume</h4>
                <p className="text-secondary-light small mb-4">
                  Upload a resume to automatically extract information, generate job description, and calculate match score.
                </p>
                <div className="row g-3">
                  {/* File Upload */}
                  <div className="col-12">
                    <label className="form-label">Resume File <span className="text-danger">*</span></label>
                    <div className="upload-btn  rounded-3 border-2 border-secondary bg-light" style={{ minHeight: '160px' }}>
                      <input
                        id="resume-file-input"
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        className="d-none"
                      />
                      <label htmlFor="resume-file-input" className="mb-0 d-flex flex-column align-items-center justify-content-center gap-2 py-5 px-4 w-100" style={{ cursor: 'pointer', minHeight: '160px' }}>
                        <Icon icon="heroicons:arrow-up-tray" className="upload-icon text-muted" style={{ fontSize: 28 }} />
                        <span className="small fw-medium text-dark">
                          {selectedFile ? selectedFile.name : 'Click to upload PDF or DOCX'}
                        </span>
                        <span className="text-muted" style={{ fontSize: 12 }}>Maximum file size: 10MB</span>
                      </label>
                    </div>
                    {errors.file && <p className="text-danger small mt-1 mb-0">{errors.file}</p>}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Role / Position <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Software Engineer, Data Analyst"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                    {errors.role && <p className="text-danger small mt-1 mb-0">{errors.role}</p>}
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Experience Level <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={formData.experienceLevel}
                      onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    >
                      <option value="fresher">Fresher / Entry Level</option>
                      <option value="junior">Junior (1-3 years)</option>
                      <option value="mid">Mid-Level (3-5 years)</option>
                      <option value="senior">Senior (5-10 years)</option>
                      <option value="lead">Lead / Principal (10+ years)</option>
                    </select>
                    {errors.experienceLevel && <p className="text-danger small mt-1 mb-0">{errors.experienceLevel}</p>}
                  </div>
                  <div className="col-12 pt-1">
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="resume-submit-btn d-inline-flex align-items-center justify-content-center gap-2"
                      style={{ width: 'auto', minWidth: '220px' }}
                    >
                      {isUploading ? (
                        <>
                          <Icon icon="heroicons:arrow-path" className="spin" style={{ width: 18, height: 18 }} />
                          Processing Resume...
                        </>
                      ) : (
                        <>
                          <Icon icon="heroicons:arrow-up-tray" style={{ width: 18, height: 18 }} />
                          Screen Resume with AI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Result - card ref JobList */}
        {uploadResult && (
          <div className={`card border shadow-none ${uploadResult.status === 'error' ? 'border-danger' : uploadResult.status === 'shortlisted' ? 'border-success' : 'border-warning'}`}>
            <div className="card-body">
              <div className="d-flex gap-3 align-items-start">
                {uploadResult.status === 'error' ? (
                  <XCircle className="flex-shrink-0 text-danger" size={28} />
                ) : uploadResult.status === 'shortlisted' ? (
                  <CheckCircle className="flex-shrink-0 text-success" size={28} />
                ) : (
                  <AlertCircle className="flex-shrink-0 text-warning" size={28} />
                )}
                <div className="flex-grow-1">
                  <h5 className="fw-semibold mb-2">
                    {uploadResult.status === 'error'
                      ? 'Processing Failed'
                      : uploadResult.status === 'shortlisted'
                        ? 'Candidate Shortlisted!'
                        : 'Candidate Rejected'}
                  </h5>
                  {uploadResult.status === 'error' ? (
                    <p className="text-secondary-light mb-0">{uploadResult.message}</p>
                  ) : (
                    <div className="d-grid gap-3">
                      <div className="row g-3">
                        <div className="col-6 col-md-3">
                          <p className="text-muted small mb-0">Name</p>
                          <p className="fw-medium mb-0">{uploadResult.candidate?.name || 'N/A'}</p>
                        </div>
                        <div className="col-6 col-md-3">
                          <p className="text-muted small mb-0">Email</p>
                          <p className="fw-medium mb-0">{uploadResult.candidate?.email || 'N/A'}</p>
                        </div>
                        <div className="col-6 col-md-3">
                          <p className="text-muted small mb-0">Role</p>
                          <p className="fw-medium mb-0">{uploadResult.role}</p>
                        </div>
                        <div className="col-6 col-md-3">
                          <p className="text-muted small mb-0">Experience</p>
                          <p className="fw-medium mb-0 text-capitalize">{uploadResult.experience_level}</p>
                        </div>
                      </div>
                      {uploadResult.candidate?.skills && (
                        <div>
                          <p className="text-muted small mb-1">Skills</p>
                          <div className="d-flex flex-wrap gap-1">
                            {(Array.isArray(uploadResult.candidate.skills)
                              ? uploadResult.candidate.skills
                              : uploadResult.candidate.skills.split(',')
                            ).map((skill, idx) => (
                              <span key={idx} className="badge bg-primary-subtle text-primary">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="bg-light rounded-3 p-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="small fw-medium">Match Score</span>
                          <span className={`fw-bold ${uploadResult.score >= uploadResult.threshold ? 'text-success' : 'text-danger'}`}>
                            {uploadResult.score.toFixed(1)}%
                          </span>
                        </div>
                        <div className="progress" style={{ height: 8 }}>
                          <div
                            className={`progress-bar ${uploadResult.score >= uploadResult.threshold ? 'bg-success' : 'bg-danger'}`}
                            style={{ width: `${uploadResult.score}%` }}
                          />
                        </div>
                        <p className="text-muted small mt-2 mb-0">Threshold: {uploadResult.threshold}%</p>
                      </div>
                      <div className="d-flex align-items-center gap-2 small">
                        <Mail size={16} />
                        <span>
                          Email Status: <span className={`fw-medium ${uploadResult.email_status === 'yes' ? 'text-success' : uploadResult.email_status === 'skipped' ? 'text-muted' : 'text-danger'}`}>
                            {uploadResult.email_status === 'yes' ? 'Sent Successfully' : uploadResult.email_status === 'skipped' ? 'Skipped (Not Shortlisted)' : 'Failed'}
                          </span>
                        </span>
                      </div>
                      {uploadResult.jd_preview && (
                        <div>
                          <p className="text-muted small mb-1">Generated Job Description (Preview)</p>
                          <div className="bg-light p-3 rounded text-secondary small">
                            {uploadResult.jd_preview}...
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCandidatesTab = () => {
    const toggleCandidateSelection = (candidateId) => {
      setSelectedCandidateIds((prev) =>
        prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId]
      );
    };

    const allVisibleSelected = candidates.length > 0 && selectedCandidateIds.length === candidates.length;

    const handleSelectAllVisible = () => {
      if (allVisibleSelected) {
        setSelectedCandidateIds([]);
        return;
      }
      setSelectedCandidateIds(candidates.map((c) => c.id));
    };

    const handleAssignAssessment = async () => {
      if (selectedCandidateIds.length === 0) {
        alert('Please select at least one candidate to assign assessments.');
        return;
      }
      try {
        const selectedCandidates = candidates.filter((c) => selectedCandidateIds.includes(c.id));
        await assessmentAPI.savePreselectedCandidates(
          selectedCandidates.map((c) => c.id),
          selectedCandidates.map((c) => c.candidate_email).filter(Boolean)
        );
        navigate('/recruiter/assign-assessment');
      } catch (error) {
        console.error('Failed to prepare selected candidates:', error);
        alert('Failed to load selected candidates for assignment.');
      }
    };

    return (
      <div className="card border shadow-none mb-4">
        <div className="card-header bg-transparent border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span className="small text-muted">
            Selected: <span className="fw-semibold text-dark">{selectedCandidateIds.length}</span>
          </span>
        </div>
        {loadedPreselectedCount > 0 && (
          <div className="alert alert-info mb-3 d-flex align-items-center justify-content-between mx-3">
            <span>Loaded {loadedPreselectedCount} candidates from Resume Screening selection.</span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={async () => {
                try {
                  await assessmentAPI.clearPreselectedCandidates();
                } catch (e) {
                  console.warn('Failed to clear preselected candidates:', e);
                } finally {
                  setPreselectedCandidateIds([]);
                  setLoadedPreselectedCount(0);
                  setSelectedCandidateIds([]);
                }
              }}
            >
              Clear preselected
            </button>
          </div>
        )}
        {loadingCandidates ? (
          <div className="card-body text-center py-5">
            <Icon icon="heroicons:arrow-path" className="spin text-primary" style={{ fontSize: 32 }} />
            <p className="text-secondary-light mt-2 mb-0">Loading candidates...</p>
          </div>
        ) : candidates.length === 0 ? (
          <div className="card-body text-center py-5 justify-items-center">
            <FileText className="text-muted mb-3" size={48} />
            <h6 className="mb-2">No Candidates Yet</h6>
            <p className="text-secondary-light mb-0">
              Start screening resumes to see candidates here
            </p>
          </div>
        ) : (
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="text-center" style={{ width: 48 }}>
                      <input
                        type="checkbox"
                        checked={allVisibleSelected}
                        onChange={handleSelectAllVisible}
                        aria-label="Select all candidates"
                      />
                    </th>
                    <th className="text-start">CANDIDATE</th>
                    <th className="text-start">ROLE</th>
                    <th className="text-start">EXPERIENCE</th>
                    <th className="text-start">SKILLS</th>
                    <th className="text-center">SCORE</th>
                    <th className="text-center">EMAIL STATUS</th>
                    <th className="text-start">SCREENED ON</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={selectedCandidateIds.includes(candidate.id)}
                          onChange={() => toggleCandidateSelection(candidate.id)}
                          aria-label={`Select ${candidate.candidate_name || 'candidate'}`}
                        />
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="fw-medium">{candidate.candidate_name || 'N/A'}</span>
                          <span className="small text-secondary-light">{candidate.candidate_email || 'N/A'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Briefcase size={16} className="text-muted" />
                          {candidate.role}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-info-subtle text-info text-capitalize">
                          {candidate.experience_level}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {candidate.candidate_skills?.split(',').slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="badge bg-light text-dark">
                              {skill.trim()}
                            </span>
                          ))}
                          {candidate.candidate_skills?.split(',').length > 3 && (
                            <span className="badge bg-primary-subtle text-primary">
                              +{candidate.candidate_skills.split(',').length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <span className={`fw-semibold ${isCandidateShortlisted(candidate) ? 'text-success' : 'text-danger'}`}>
                            {Number(candidate.score || 0).toFixed(1)}%
                          </span>
                          {isCandidateShortlisted(candidate) ? (
                            <CheckCircle size={16} className="text-success" />
                          ) : (
                            <XCircle size={16} className="text-danger" />
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${candidate.email_sent === 'yes' ? 'bg-success-subtle text-success' : candidate.email_sent === 'no' ? 'bg-secondary-subtle text-secondary' : 'bg-danger-subtle text-danger'}`}>
                          {candidate.email_sent === 'yes' ? 'Sent' : candidate.email_sent === 'no' ? 'Not Sent' : 'Failed'}
                        </span>
                      </td>
                      <td className="text-secondary-light small">
                        {new Date(candidate.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Calculate stats
  const totalScreened = candidates.length;
  const shortlisted = candidates.filter((candidate) => isCandidateShortlisted(candidate)).length;
  const avgScore = candidates.length > 0 ?
    (candidates.reduce((acc, c) => acc + c.score, 0) / candidates.length).toFixed(1) :
    '0';

  return (
    <div className="container-fluid py-4">
      {/* Page Header - ref JobList / CreateJob: icon + title left, Refresh right */}
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h4 className="fw-bold h4 d-flex align-items-center gap-2 mb-0">
            <Icon icon="heroicons:document-magnifying-glass" className="text-black" style={{ fontSize: 28 }} />
            AI Resume Screening
          </h4>
          <p className="text-secondary-light mb-0 mt-1">
            View all candidates processed through AI resume screening
          </p>
        </div>
        <button
          type="button"
          onClick={fetchCandidates}
          className="btn refresh-btn d-flex align-items-center gap-2"
          disabled={loadingCandidates}
        >
          <Icon icon="heroicons:arrow-path" style={{ width: 16, height: 16 }} className={loadingCandidates ? 'spin' : ''} />
          {loadingCandidates ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* KPI Stats - ref JobList: kpi-row / kpi-card (App.css) */}
      <div className="kpi-row mb-4">
        {[
          { title: 'Total Screened', value: totalScreened, icon: 'heroicons:user-group', bg: 'kpi-primary', color: 'kpi-primary-text' },
          { title: 'Shortlisted', value: shortlisted, icon: 'heroicons:check-badge', bg: 'kpi-success', color: 'kpi-success-text' },
          { title: 'Avg Score', value: `${avgScore}%`, icon: 'heroicons:chart-bar', bg: 'kpi-info', color: 'kpi-info-text' }
        ].map((item, index) => (
          <div className="kpi-col" key={index}>
            <div className="kpi-card">
              <div className="kpi-card-body">
                <div className={`kpi-icon ${item.bg}`}>
                  <Icon icon={item.icon} className={`kpi-icon-style ${item.color}`} />
                </div>
                <div className="kpi-content">
                  <div className="kpi-title">{item.title}</div>
                  <div className="kpi-value">{item.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation - inside card ref JobList */}
      <div className="card border shadow-none mb-4">
        <div className="card-body p-0">
          <ul className="nav nav-tabs border-bottom mb-0 px-3">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'candidates' ? 'active' : ''}`}
                onClick={() => setActiveTab('candidates')}
              >
                <Icon icon="heroicons:eye" style={{ width: 18, height: 18 }} />
                View Candidates ({candidates.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'upload' ? 'active' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                <Icon icon="heroicons:arrow-up-tray" style={{ width: 18, height: 18 }} />
                Screen Resume
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content - everything in cards */}
      {activeTab === 'candidates' ? renderCandidatesTab() : renderUploadTab()}
    </div>
  );
};

export default ResumeScreening;

