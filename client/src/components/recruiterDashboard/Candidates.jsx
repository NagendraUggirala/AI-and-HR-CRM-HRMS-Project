import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AlertCircle, Upload, CheckCircle, XCircle, FileText } from 'lucide-react';
import CandidateProfilePage from './CandidateProfilePage';
import { BASE_URL, API_ENDPOINTS } from '../../config/api.config';
import '../../App.css';

const CandidatesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    skills: '',
    job: '',
    stage: '',
    aiScreened: ''
  });
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Backend integration
  const [candidates, setCandidates] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch jobs from backend (for "All Jobs" filter options; same source as JobList.jsx)
  const fetchJobs = async () => {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
      const url = `${BASE_URL}${API_ENDPOINTS.JOBS.LIST}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const transformedJobs = Array.isArray(data)
          ? data.map(job => ({
              id: job.id,
              title: (job.title || '').toString().trim(),
              department: job.department || '',
              status: job.status || ''
            }))
          : [];
        setJobsData(transformedJobs);
      }
    } catch (err) {
      // Non-blocking: candidates table should still work even if job list fails.
      console.error('❌ Error fetching jobs for filters:', err);
    }
  };

  // AI Screening state
  const [aiScreening, setAiScreening] = useState({
    isProcessing: false,
    currentIndex: 0,
    total: 0,
    results: [],
    showModal: false
  });

  // Track which candidates have been AI screened (for backward compatibility)
  const [aiScreenedEmails, setAiScreenedEmails] = useState(new Set());

  // Fetch candidates from backend
  const fetchCandidates = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Please login to view candidates');
      setLoading(false);
      return;
    }

    try {
      setRefreshing(true);
      const url = `${BASE_URL}/api/recruiter_dashboard/candidates`;
      
      console.log('📥 Fetching candidates from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Candidates fetched:', data);
        
        // Transform backend data to match display format
        const transformedCandidates = data.map(candidate => ({
          id: candidate.id,
          name: candidate.name,
          email: candidate.email,
          role: candidate.role,
          skills: candidate.skills ? candidate.skills.split(',').map(s => s.trim()) : [],
          stage: candidate.stage || 'Applied',
          status: candidate.stage === 'Hired' ? 'Completed' : 
                  candidate.stage === 'Interview' ? 'In Progress' : 
                  candidate.stage === 'Offer' ? 'Awaiting Decision' : 'Pending',
          resume_url: candidate.resume_url,
          notes: candidate.notes,
          recruiter_comments: candidate.recruiter_comments,
          resume_screened: candidate.resume_screened || 'no', // Get from backend API response
          fullData: candidate
        }));
        
        setCandidates(transformedCandidates);
        setError(null);
      } else if (response.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => navigate('/login'), 2000);
      } else if (response.status === 403) {
        setError('You do not have permission to view candidates.');
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.detail || 'Failed to fetch candidates');
      }
    } catch (err) {
      console.error('❌ Error fetching candidates:', err);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchAIScreenedCandidates = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/resume/candidates?limit=1000&show_all=true`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const screenedSet = new Set(
          data
            .filter(c => c.resume_screened === "yes" || c.resume_screened === "Yes")
            .map(c => c.candidate_email?.toLowerCase().trim())
            .filter(Boolean)
        );
        setAiScreenedEmails(screenedSet);
      }
    } catch (error) {
      console.error('Error fetching AI screened candidates:', error);
    }
  };

  // Update aiScreenedEmails set from candidates data (for backward compatibility)
  useEffect(() => {
    if (candidates.length > 0) {
      const screenedEmails = new Set(
        candidates
          .filter(c => c.resume_screened === "yes" || c.resume_screened === "Yes")
          .map(c => c.email?.toLowerCase().trim())
          .filter(email => email)
      );
      console.log('🔍 AI-Screened emails from candidates:', Array.from(screenedEmails));
      setAiScreenedEmails(screenedEmails);
    }
  }, [candidates]);

  // Fetch candidates and AI-screened list when component mounts
  useEffect(() => {
    fetchCandidates();
    fetchAIScreenedCandidates();
    fetchJobs();
  }, []);

  // If PipelineOverview redirects here with a stage, apply it to the Stage filter.
  useEffect(() => {
    const stageFromNav = location.state?.stage;
    if (stageFromNav) {
      setFilters(prev => ({ ...prev, stage: String(stageFromNav).toLowerCase() }));
    }
  }, [location.state?.stage]);

  const insights = {
    total: candidates.length,
    inInterview: candidates.filter(c => c.stage === 'Interview').length,
    offersSent: candidates.filter(c => c.stage === 'Offer').length,
    hired: candidates.filter(c => c.stage === 'Hired').length
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCandidates(candidates.map(c => c.id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleSelectCandidate = (id) => {
    setSelectedCandidates(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const getStageColor = (stage) => {
    const colors = {
      'Applied': 'bg-primary-subtle text-primary',
      'Screening': 'bg-info-subtle text-info',
      'Interview': 'bg-warning-subtle text-warning',
      'Offer': 'bg-success-subtle text-success',
      'Hired': 'bg-success-subtle text-success'
    };
    return colors[stage] || 'bg-secondary-subtle text-secondary';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'text-secondary',
      'In Progress': 'text-primary',
      'Completed': 'text-success',
      'Awaiting Decision': 'text-warning'
    };
    return colors[status] || 'text-secondary';
  };

  // Job options for the filter dropdown.
  // Prefer real jobs list (same as JobList.jsx). If it fails/empty, fall back to candidate roles.
  const jobFilterOptions = React.useMemo(() => {
    const titlesFromJobs = jobsData
      .map(j => j.title)
      .filter(Boolean);

    const titlesFromCandidates = candidates
      .map(c => (c.role || '').toString().trim())
      .filter(Boolean);

    const uniqueTitles = Array.from(new Set((titlesFromJobs.length ? titlesFromJobs : titlesFromCandidates)))
      .sort((a, b) => a.localeCompare(b));

    return uniqueTitles;
  }, [jobsData, candidates]);

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkills = !filters.skills || candidate.skills.some(skill => 
      skill.toLowerCase().includes(filters.skills.toLowerCase())
    );
    
    const matchesJob =
      !filters.job ||
      candidate.role.toLowerCase().trim() === filters.job.toLowerCase().trim();
    
    const matchesStage = !filters.stage || candidate.stage.toLowerCase() === filters.stage.toLowerCase();
    
    const isAiScreened =
      (candidate.resume_screened || '').toString().toLowerCase().trim() === 'yes' ||
      aiScreenedEmails.has(candidate.email?.toLowerCase().trim());
    const matchesAiScreened =
      !filters.aiScreened ||
      (filters.aiScreened === 'yes' ? isAiScreened : !isAiScreened);
    
    return matchesSearch && matchesSkills && matchesJob && matchesStage && matchesAiScreened;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleExport = () => {
    const csv = [
      ['Candidate Name', 'Job Role', 'Skills', 'Stage', 'Status'],
      ...filteredCandidates.map(candidate => [
        candidate.name,
        candidate.role,
        candidate.skills.join(', '),
        candidate.stage,
        candidate.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidates-list.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleViewCandidate = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setSelectedCandidate(candidate);
      setShowCandidateModal(true);
    }
  };

  const handleCloseCandidateModal = () => {
    setShowCandidateModal(false);
    setSelectedCandidate(null);
  };

  // AI Resume Screening for bulk candidates
  const handleAIScreening = async () => {
    const selectedCandidateData = candidates.filter(c => selectedCandidates.includes(c.id));
    
    console.log('📋 Selected Candidates:', selectedCandidateData);
    console.log('📋 Resume URLs:', selectedCandidateData.map(c => ({ name: c.name, resume_url: c.resume_url })));
    
    // Filter candidates that have resume URLs (check for truthy and non-empty strings)
    const candidatesWithResumes = selectedCandidateData.filter(c => 
      c.resume_url && c.resume_url.trim() !== '' && c.resume_url !== 'null' && c.resume_url !== 'undefined'
    );
    
    console.log('📋 Candidates with resumes:', candidatesWithResumes.length);
    
    if (candidatesWithResumes.length === 0) {
      const candidateNames = selectedCandidateData.map(c => c.name).join(', ');
      alert(`⚠️ No resumes found for selected candidates.\n\nSelected: ${candidateNames}\n\nPlease ensure candidates have uploaded resumes. Check the 'resume_url' field in the database.`);
      return;
    }

    // Check which candidates have already been screened
    try {
      const token = localStorage.getItem('token');
      const aiScreenedResponse = await fetch(`${BASE_URL}/api/resume/candidates?limit=1000&show_all=true`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const aiScreenedCandidates = aiScreenedResponse.ok ? await aiScreenedResponse.json() : [];
      
      // Create a set of already screened emails for quick lookup (using resume_screened field)
      const screenedEmails = new Set(
        aiScreenedCandidates
          .filter(c => c.resume_screened === "yes" || c.resume_screened === "Yes")
          .map(c => c.candidate_email?.toLowerCase().trim())
          .filter(email => email)
      );
      
      // Filter out already screened candidates (trim and lowercase for robust matching)
      const notYetScreened = candidatesWithResumes.filter(c => 
        !screenedEmails.has(c.email?.toLowerCase().trim())
      );
      
      const alreadyScreened = candidatesWithResumes.filter(c => 
        screenedEmails.has(c.email?.toLowerCase().trim())
      );
      
      console.log('📋 Already screened:', alreadyScreened.length);
      console.log('📋 Not yet screened:', notYetScreened.length);
      
      if (alreadyScreened.length > 0 && notYetScreened.length === 0) {
        alert(`⚠️ All selected candidates have already been screened with AI.\n\nAlready screened:\n${alreadyScreened.map(c => '• ' + c.name).join('\n')}\n\nThey cannot be screened again. Please select different candidates.`);
        return;
      }
      
      if (alreadyScreened.length > 0) {
        const proceed = window.confirm(
          `⚠️ ${alreadyScreened.length} candidate(s) have already been screened and will be skipped:\n${alreadyScreened.map(c => '• ' + c.name).join('\n')}\n\n✅ ${notYetScreened.length} new candidate(s) will be screened:\n${notYetScreened.map(c => '• ' + c.name).join('\n')}\n\nDo you want to proceed with screening the new candidates only?`
        );
        if (!proceed) return;
      }
      
      // Update candidatesWithResumes to only include not yet screened
      if (notYetScreened.length === 0) {
        alert('⚠️ No new candidates to screen. All selected candidates have already been screened.');
        return;
      }
      
      // Continue with notYetScreened candidates
      candidatesWithResumes.length = 0;
      candidatesWithResumes.push(...notYetScreened);
      
    } catch (error) {
      console.error('Error checking already screened candidates:', error);
      // Continue anyway if check fails
    }

    if (candidatesWithResumes.length < selectedCandidateData.length) {
      const withoutResumes = selectedCandidateData.filter(c => !c.resume_url || c.resume_url.trim() === '');
      if (withoutResumes.length > 0) {
        const proceed = window.confirm(
          `Only ${candidatesWithResumes.length} of ${selectedCandidateData.length} selected candidates can be screened.\n\nCandidates without resumes:\n${withoutResumes.map(c => '• ' + c.name).join('\n')}\n\nDo you want to proceed with AI screening for those with resumes?`
        );
        if (!proceed) return;
      }
    }

    // Initialize AI screening state
    setAiScreening({
      isProcessing: true,
      currentIndex: 0,
      total: candidatesWithResumes.length,
      results: [],
      showModal: true
    });

    // Process each resume one by one
    const results = [];
    for (let i = 0; i < candidatesWithResumes.length; i++) {
      const candidate = candidatesWithResumes[i];
      
      setAiScreening(prev => ({
        ...prev,
        currentIndex: i + 1
      }));

      try {
        // Fetch the resume file from the server
        const resumeResponse = await fetch(`${BASE_URL}/${candidate.resume_url}`);
        
        if (!resumeResponse.ok) {
          results.push({
            candidate: candidate.name,
            status: 'error',
            message: 'Resume file not found'
          });
          continue;
        }

        const resumeBlob = await resumeResponse.blob();
        const fileName = candidate.resume_url.split('/').pop();
        
        // Create FormData for AI screening
        const formData = new FormData();
        formData.append('file', resumeBlob, fileName);
        formData.append('role', candidate.role);
        formData.append('experience_level', 'mid'); // Default, can be enhanced
        // Link screening result back to the same Candidate row (by id) to avoid email mismatches from resume extraction.
        formData.append('candidate_id', String(candidate.id));
        formData.append('candidate_email', candidate.email || '');

        // Send to AI screening endpoint
        const screeningResponse = await fetch(`${BASE_URL}/api/resume/process`, {
          method: 'POST',
          body: formData
        });

        if (screeningResponse.ok) {
          const result = await screeningResponse.json();
          results.push({
            candidateId: candidate.id,
            candidate: candidate.name,
            status: result.status,
            score: result.score,
            email_status: result.email_status,
            message: `Score: ${result.score.toFixed(1)}% - ${result.status}`
          });

          // Backend/database: resume/process API already updated Candidate, candidate_records, and Application tables with stage (Rejected/Applied) and resume_screened.
          // Update UI immediately so the row reflects new stage and AI SCREENED = Yes without waiting for refetch.
          const nextStage = result.status === 'rejected' ? 'Rejected' : 'Applied';
          setCandidates(prev =>
            prev.map(c =>
              c.id === candidate.id
                ? {
                    ...c,
                    stage: nextStage,
                    status:
                      nextStage === 'Rejected'
                        ? 'Completed'
                        : nextStage === 'Interview'
                          ? 'In Progress'
                          : nextStage === 'Offer'
                            ? 'Awaiting Decision'
                            : 'Pending',
                    resume_screened: 'yes'
                  }
                : c
            )
          );
        } else {
          const errorData = await screeningResponse.json().catch(() => ({}));
          results.push({
            candidateId: candidate.id,
            candidate: candidate.name,
            status: 'error',
            message: errorData.detail || 'Processing failed'
          });
          // Do not force stage to Rejected for generic errors.
          // Keep the existing stage and let backend remain the source of truth.
        }
      } catch (error) {
        console.error(`Error processing ${candidate.name}:`, error);
        results.push({
          candidateId: candidate.id,
          candidate: candidate.name,
          status: 'error',
          message: 'Network error'
        });
        // Keep existing stage on network errors; do not force a rejection in UI.
      }

      // Small delay between requests to avoid overwhelming the server
      if (i < candidatesWithResumes.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Update final state
    setAiScreening(prev => ({
      ...prev,
      isProcessing: false,
      results: results
    }));

    // Clear selection after processing
    setSelectedCandidates([]);

    // Sync frontend with backend/DB: stage and resume_screened are already updated in DB by resume/process API; refetch so list and Pipeline stay in sync.
    await fetchCandidates();
    await fetchAIScreenedCandidates();
  };

  const closeAIScreeningModal = () => {
    setAiScreening({
      isProcessing: false,
      currentIndex: 0,
      total: 0,
      results: [],
      showModal: false
    });
  };

  const viewAIScreeningResults = () => {
    closeAIScreeningModal();
    navigate('/resume-screening', { state: { tab: 'candidates' } });
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Header: title left, actions right */}
      <div className="mb-4 d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h4 className="fw-bold h4 d-flex align-items-center gap-2 mb-0">
            <Icon icon="heroicons:user-group" className="text-black" style={{ fontSize: 28 }} />
            Candidates
          </h4>
          <p className="text-secondary mb-0 mt-1">View, filter, and manage all job applicants.</p>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <button
            type="button"
            className="btn refresh-btn d-inline-flex align-items-center gap-2"
            onClick={async () => {
              setRefreshing(true);
              await fetchCandidates();
              await fetchAIScreenedCandidates();
              await fetchJobs();
              setRefreshing(false);
            }}
            disabled={refreshing}
          >
            <Icon icon="heroicons:arrow-path" style={{ width: 16, height: 16 }} className={refreshing ? 'spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            type="button"
            className="sync-btn d-inline-flex align-items-center gap-2"
            onClick={async () => {
              try {
                const response = await fetch(`${BASE_URL}/api/resume/sync-stages`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
                });
                if (response.ok) {
                  const result = await response.json();
                  alert(`✅ Stages synced successfully!\n\nUpdated ${result.records_updated} candidate_records\nUpdated ${result.candidates_updated} candidate records`);
                  await fetchCandidates();
                  await fetchAIScreenedCandidates();
                } else {
                  alert('⚠️ Failed to sync stages. Please check backend logs.');
                }
              } catch (error) {
                console.error('Error syncing stages:', error);
                alert('⚠️ Error syncing stages. Please check console.');
              }
            }}
            title="Sync candidate stages based on scores"
          >
            <Icon icon="heroicons:arrow-path" style={{ width: 16, height: 16 }} />
            Sync Stages
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center rounded-3 mb-4 py-3" role="alert">
          <AlertCircle size={20} className="me-2 flex-shrink-0" />
          <div className="flex-grow-1">{error}</div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary-light">Loading candidates...</p>
        </div>
      ) : candidates.length === 0 && !error ? (
        <div className="card border shadow-none">
          <div className="card-body text-center py-5">
            <h5 className="mb-2">No Candidates Yet</h5>
            <p className="text-secondary-light mb-3">
              No candidates have applied to your jobs yet. Make sure your jobs are published!
            </p>
            <button
              type="button"
              className="create-job-btn d-inline-flex align-items-center gap-2"
              onClick={() => navigate('/jobslist')}
            >
              <Icon icon="heroicons:briefcase" style={{ width: 16, height: 16 }} />
              View Jobs
            </button>
          </div>
        </div>
      ) : null}

      {/* Candidates Content - Only show if not loading and has candidates */}
      {!loading && candidates.length > 0 && (
        <>

      {/* KPI Summary - App.css kpi-row/kpi-card (ref JobList) */}
      <div className="kpi-row mb-4">
        {[
          { title: 'Total Candidates', value: insights.total, icon: 'heroicons:user-group', bg: 'kpi-primary', color: 'kpi-primary-text' },
          { title: 'In Interview', value: insights.inInterview, icon: 'heroicons:chat-bubble-left-right', bg: 'kpi-info', color: 'kpi-info-text' },
          { title: 'Offers Sent', value: insights.offersSent, icon: 'heroicons:envelope', bg: 'kpi-success', color: 'kpi-success-text' },
          { title: 'Hired', value: insights.hired, icon: 'heroicons:check-badge', bg: 'kpi-warning', color: 'kpi-warning-text' }
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

      {/* Filters & Search */}
      <div className="card border shadow-none mb-4">
        <div className="card-header bg-transparent border-bottom py-3">
          <h6 className="fw-semibold mb-0 d-flex align-items-center gap-2">
            <Icon icon="heroicons:funnel" style={{ width: 18, height: 18 }} />
            Filter & search
          </h6>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label small text-muted mb-1">Search</label>
              <div className="position-relative">
                <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" style={{ pointerEvents: 'none', fontSize: 18 }} />
                <input
                  className="form-control ps-5"
                  placeholder="Name, role, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Skills</label>
              <select
                className="form-select"
                value={filters.skills}
                onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
              >
                <option value="">All Skills</option>
                <option value="react">React.js</option>
                <option value="python">Python</option>
                <option value="sql">SQL</option>
                <option value="figma">Figma</option>
                <option value="js">JavaScript</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
                <option value="typescript">TypeScript</option>
                <option value="node">Node.js</option>
                <option value="mongodb">MongoDB</option>
                <option value="selenium">Selenium</option>
                <option value="tableau">Tableau</option>
                <option value="aws">AWS</option>
                <option value="docker">Docker</option>
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Job</label>
              <select
                className="form-select"
                value={filters.job}
                onChange={(e) => setFilters(prev => ({ ...prev, job: e.target.value }))}
              >
                <option value="">All Jobs</option>
                {jobFilterOptions.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Stage</label>
              <select
                className="form-select"
                value={filters.stage}
                onChange={(e) => setFilters(prev => ({ ...prev, stage: e.target.value }))}
              >
                <option value="">All Stages</option>
                <option value="applied">Applied</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">AI SCREENED</label>
              <select
                className="form-select"
                value={filters.aiScreened}
                onChange={(e) => setFilters(prev => ({ ...prev, aiScreened: e.target.value }))}
              >
                <option value="">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="col-12 col-md-6 col-lg-2 d-flex justify-content-md-end">
              <button type="button" className="sync-btn d-inline-flex align-items-center gap-2 w-100 w-md-auto justify-content-center" onClick={handleExport}>
                <Icon icon="heroicons:document-arrow-down" style={{ width: 16, height: 16 }} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCandidates.length > 0 && (
        <div className="alert alert-info d-flex align-items-center justify-content-between flex-wrap gap-3 rounded-3 py-3 mb-4">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="fw-semibold">
              {selectedCandidates.length} candidate{selectedCandidates.length > 1 ? 's' : ''} selected
            </span>
            <div className="vr d-none d-sm-block" style={{ height: '1.25rem' }} />
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="create-assessment-btn d-inline-flex align-items-center gap-2"
                onClick={handleAIScreening}
                title="Process selected candidates with AI Resume Screening"
                disabled={selectedCandidates.some(id => {
                  const candidate = candidates.find(c => c.id === id);
                  return candidate && (candidate.resume_screened === "yes" || candidate.resume_screened === "Yes");
                })}
              >
                <Icon icon="heroicons:arrow-up-tray" style={{ width: 18, height: 18 }} />
                AI Resume Screening
              </button>
              <button type="button" className="delete-btn d-inline-flex align-items-center gap-2">
                <Icon icon="heroicons:trash" style={{ width: 16, height: 16 }} />
                Delete
              </button>
            </div>
          </div>
          <button type="button" onClick={() => setSelectedCandidates([])} className="btn btn-link p-0 text-decoration-none fw-medium">
            Clear selection
          </button>
        </div>
      )}

      {/* Candidates Table */}
      <div className="card border shadow-none mb-4 overflow-hidden">
        <div className="card-header bg-transparent border-bottom py-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <h6 className="fw-semibold mb-0">Candidates list</h6>
          <span className="badge bg-primary-subtle text-primary">{filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: 44 }} className="text-center py-3">
                  <label className={`custom-checkbox mb-0 d-inline-flex align-items-center justify-content-center ${selectedCandidates.length === currentCandidates.length && currentCandidates.length > 0 ? 'checked' : ''}`} style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      className="d-none"
                      checked={selectedCandidates.length === currentCandidates.length && currentCandidates.length > 0}
                      onChange={handleSelectAll}
                    />
                    <span className="checkbox-box">
                      {selectedCandidates.length === currentCandidates.length && currentCandidates.length > 0 && <span className="checkmark">✓</span>}
                    </span>
                  </label>
                </th>
                <th className="text-start py-3 small text-uppercase text-muted fw-semibold">Candidate</th>
                <th className="text-start py-3 small text-uppercase text-muted fw-semibold">Job role</th>
                <th className="text-start py-3 small text-uppercase text-muted fw-semibold">Skills</th>
                <th className="text-center py-3 small text-uppercase text-muted fw-semibold">Resume</th>
                <th className="text-center py-3 small text-uppercase text-muted fw-semibold">AI screened</th>
                <th className="text-center py-3 small text-uppercase text-muted fw-semibold">Stage</th>
                <th className="text-center py-3 small text-uppercase text-muted fw-semibold" style={{ width: 90 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates.map(candidate => (
                <tr key={candidate.id}>
                  <td className="text-center align-middle">
                    <label className={`custom-checkbox mb-0 d-inline-flex align-items-center justify-content-center ${selectedCandidates.includes(candidate.id) ? 'checked' : ''}`} style={{ cursor: (candidate.resume_screened === "yes" || candidate.resume_screened === "Yes") ? 'not-allowed' : 'pointer' }} title={candidate.resume_screened === "yes" || candidate.resume_screened === "Yes" ? "This candidate's resume has already been screened" : ''}>
                      <input
                        type="checkbox"
                        className="d-none"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleSelectCandidate(candidate.id)}
                        disabled={candidate.resume_screened === "yes" || candidate.resume_screened === "Yes"}
                      />
                      <span className="checkbox-box">
                        {selectedCandidates.includes(candidate.id) && <span className="checkmark">✓</span>}
                      </span>
                    </label>
                  </td>
                  <td className="text-start align-middle">
                    <span className="fw-medium">{candidate.name}</span>
                  </td>
                  <td className="text-start align-middle text-muted">{candidate.role}</td>
                  <td className="text-start align-middle">
                    <div className="d-flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="badge bg-light text-dark border">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="badge bg-primary-subtle text-primary">
                          +{candidate.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    {candidate.resume_url && candidate.resume_url.trim() !== '' ? (
                      <span className="badge bg-success-subtle text-success d-inline-flex align-items-center gap-1" title={candidate.resume_url}>
                        <FileText size={12} />
                        Available
                      </span>
                    ) : (
                      <span className="badge bg-danger-subtle text-danger d-inline-flex align-items-center gap-1">
                        <XCircle size={12} />
                        Missing
                      </span>
                    )}
                  </td>
                  <td className="text-center align-middle">
                    {candidate.resume_screened === "yes" || candidate.resume_screened === "Yes" ? (
                      <span className="badge bg-success-subtle text-success d-inline-flex align-items-center gap-1" title="Resume has been screened with AI">
                        <CheckCircle size={12} />
                        Yes
                      </span>
                    ) : (
                      <span className="badge bg-warning-subtle text-warning d-inline-flex align-items-center gap-1" title="Resume not yet screened">
                        <XCircle size={12} />
                        No
                      </span>
                    )}
                  </td>
                  <td className="text-center align-middle">
                    <span className={`badge ${getStageColor(candidate.stage)}`}>
                      {candidate.stage}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    <button
                      type="button"
                      className="btn btn-sm job-listings-btn d-inline-flex align-items-center justify-content-center"
                      style={{ width: 36, height: 36 }}
                      title="View profile"
                      onClick={() => handleViewCandidate(candidate.id)}
                    >
                      <Icon icon="heroicons:eye" style={{ width: 18, height: 18 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card border shadow-none mb-4">
        <div className="card-body py-3">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="small text-muted">
              Showing <strong className="text-body">{startIndex + 1}</strong>–<strong className="text-body">{Math.min(endIndex, filteredCandidates.length)}</strong> of <strong className="text-body">{filteredCandidates.length}</strong> candidates
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      className={pageNum === currentPage ? 'btn btn-primary' : 'btn btn-outline-secondary'}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              <select
                className="form-select form-select-sm w-auto"
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                style={{ minWidth: '70px' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="small text-muted ms-1">per page</span>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Profile Modal - ref JobList: centered overlay (App.css) */}
      {showCandidateModal && selectedCandidate && (
        <div
          className="job-modal-overlay"
          tabIndex="-1"
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseCandidateModal(); }}
        >
          <div className="job-modal-dialog" style={{ maxWidth: '900px' }} onClick={e => e.stopPropagation()}>
            <CandidateProfilePage
              candidate={selectedCandidate}
              onClose={handleCloseCandidateModal}
            />
          </div>
        </div>
      )}

      {/* AI Screening Progress Modal - ref JobList: hrms-modal (App.css) */}
      {aiScreening.showModal && (
        <div className="hrms-modal-overlay">
          <div className="hrms-modal hrms-modal-xl" style={{ maxWidth: '900px', width: '95%' }}>
            <div className="hrms-modal-header">
              <h5 className="d-flex align-items-center gap-2 mb-0">
                <Icon icon="heroicons:arrow-up-tray" style={{ width: 20, height: 20 }} />
                AI Resume Screening Progress
              </h5>
              {!aiScreening.isProcessing && (
                <button type="button" className="hrms-modal-close" onClick={closeAIScreeningModal} aria-label="Close">&times;</button>
              )}
            </div>
            <div className="hrms-modal-body">
                {aiScreening.isProcessing ? (
                  <>
                    {/* Processing State */}
                    <div className="text-center mb-4">
                      <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Processing...</span>
                      </div>
                      <h6 className="mb-2">
                        Processing {aiScreening.currentIndex} of {aiScreening.total} resumes...
                      </h6>
                      <p className="text-secondary-light mb-3">
                        Please wait while we analyze resumes with AI. This may take a few minutes.
                      </p>
                      {/* Progress Bar */}
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ 
                            width: `${(aiScreening.currentIndex / aiScreening.total) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Already Processed Results */}
                    {aiScreening.results.length > 0 && (
                      <div className="mt-4">
                        <h6 className="mb-3">Processed Candidates:</h6>
                        <div className="list-group">
                          {aiScreening.results.map((result, idx) => (
                            <div 
                              key={idx} 
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <div className="d-flex align-items-center">
                                {result.status === 'shortlisted' ? (
                                  <CheckCircle size={16} className="text-success me-2" />
                                ) : result.status === 'rejected' ? (
                                  <XCircle size={16} className="text-warning me-2" />
                                ) : (
                                  <XCircle size={16} className="text-danger me-2" />
                                )}
                                <div>
                                  <strong>{result.candidate}</strong>
                                  <br />
                                  <small className="text-secondary-light">{result.message}</small>
                                </div>
                              </div>
                              {result.status === 'shortlisted' && (
                                <span className="badge bg-success">Shortlisted</span>
                              )}
                              {result.status === 'rejected' && (
                                <span className="badge bg-warning">Rejected</span>
                              )}
                              {result.status === 'error' && (
                                <span className="badge bg-danger">Error</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Completed State */}
                    <div className="text-center mb-4 justify-items-center">
                      <CheckCircle size={48} className="text-success mb-3" />
                      <h5 className="mb-2">Screening Complete!</h5>
                      <p className="text-secondary-light">
                        Processed {aiScreening.total} candidate{aiScreening.total > 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Results Summary */}
                    <div className="row mb-4">
                      <div className="col-4 text-center">
                        <div className="card border shadow-none">
                          <div className="card-body">
                            <div className="h3 mb-0 text-success">
                              {aiScreening.results.filter(r => r.status === 'shortlisted').length}
                            </div>
                            <small className="text-secondary-light">Shortlisted</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <div className="card border shadow-none">
                          <div className="card-body">
                            <div className="h3 mb-0 text-warning">
                              {aiScreening.results.filter(r => r.status === 'rejected').length}
                            </div>
                            <small className="text-secondary-light">Rejected</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <div className="card border shadow-none">
                          <div className="card-body">
                            <div className="h3 mb-0 text-danger">
                              {aiScreening.results.filter(r => r.status === 'error').length}
                            </div>
                            <small className="text-secondary-light">Errors</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div>
                      <h6 className="mb-3">Detailed Results:</h6>
                      <div className="list-group">
                        {aiScreening.results.map((result, idx) => (
                          <div 
                            key={idx} 
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <div className="d-flex align-items-center">
                              {result.status === 'shortlisted' ? (
                                <CheckCircle size={16} className="text-success me-2" />
                              ) : result.status === 'rejected' ? (
                                <XCircle size={16} className="text-warning me-2" />
                              ) : (
                                <XCircle size={16} className="text-danger me-2" />
                              )}
                              <div>
                                <strong>{result.candidate}</strong>
                                <br />
                                <small className="text-secondary-light">{result.message}</small>
                                {result.email_status && result.email_status === 'yes' && (
                                  <span className="ms-2">
                                    <span className="badge bg-success-subtle text-success">✉ Email Sent</span>
                                  </span>
                                )}
                              </div>
                            </div>
                            {result.status === 'shortlisted' && (
                              <span className="badge bg-success">Shortlisted</span>
                            )}
                            {result.status === 'rejected' && (
                              <span className="badge bg-warning">Rejected</span>
                            )}
                            {result.status === 'error' && (
                              <span className="badge bg-danger">Error</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
            </div>
            {!aiScreening.isProcessing && (
              <div className="hrms-modal-footer">
                <button type="button" className="close-btn" onClick={closeAIScreeningModal}>
                  Close
                </button>
                <button type="button" className="save-template-btn d-inline-flex align-items-center gap-2" onClick={viewAIScreeningResults}>
                  <Icon icon="heroicons:eye" style={{ width: 16, height: 16 }} />
                  View All Results
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
};

export default CandidatesPage;
