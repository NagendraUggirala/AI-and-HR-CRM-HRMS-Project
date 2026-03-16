import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { BASE_URL } from '../../config/api.config';
import '../../App.css';

const PipelineOverview = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');

  // Fetch candidates data
  const fetchCandidates = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Please login to view pipeline');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/recruiter_dashboard/candidates`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCandidates(data);
        setError(null);
      } else {
        setError('Failed to fetch candidates');
      }
    } catch (err) {
      console.error('Pipeline fetch error:', err);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Group candidates by stage
  const groupCandidatesByStage = () => {
    const stages = {
      'Applied': [],
      'Screening': [],
      'Interview': [],
      'Offer': [],
      'Hired': [],
      'Rejected': []
    };

    candidates.forEach(candidate => {
      const stage = candidate.stage || 'Applied';
      if (stages[stage]) {
        stages[stage].push(candidate);
      }
    });

    return stages;
  };

  // Filter candidates based on search and stage
  const getFilteredCandidates = () => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStage !== 'all') {
      filtered = filtered.filter(candidate => candidate.stage === selectedStage);
    }

    return filtered;
  };

  const stages = groupCandidatesByStage();
  const filteredCandidates = getFilteredCandidates();

  const stageIconMap = {
    Applied: 'heroicons:user-group',
    Screening: 'heroicons:clock',
    Interview: 'heroicons:chat-bubble-left-right',
    Offer: 'heroicons:envelope',
    Hired: 'heroicons:check-badge',
    Rejected: 'heroicons:x-circle'
  };

  const stageBgMap = {
    Applied: 'kpi-primary',
    Screening: 'kpi-warning',
    Interview: 'kpi-info',
    Offer: 'bg-primary',
    Hired: 'kpi-success',
    Rejected: 'bg-danger'
  };

  const stageColorMap = {
    Applied: 'kpi-primary-text',
    Screening: 'kpi-warning-text',
    Interview: 'kpi-info-text',
    Offer: 'text-white',
    Hired: 'kpi-success-text',
    Rejected: 'text-white'
  };

  const StageCard = ({ stage, candidates, bgClass }) => (
    <div className="card border shadow-none h-100">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <div className={`kpi-icon ${bgClass} rounded-2`} style={{ width: 40, height: 40 }}>
              <Icon icon={stageIconMap[stage] || 'heroicons:user'} className={`kpi-icon-style ${stageColorMap[stage] || 'kpi-primary-text'}`} style={{ fontSize: 20 }} />
            </div>
            <h6 className="fw-semibold mb-0 text-dark">{stage}</h6>
          </div>
          <span className="badge bg-secondary">{candidates.length}</span>
        </div>
        <div className="d-grid gap-2">
          {candidates.slice(0, 3).map((candidate) => (
            <div key={candidate.id} className="p-2 bg-light rounded-2">
              <p className="small fw-medium mb-0 text-dark">{candidate.name}</p>
              <p className="small text-muted mb-0">{candidate.role}</p>
            </div>
          ))}
          {candidates.length > 3 && (
            <button
              type="button"
              className="btn btn-link btn-sm p-0 text-primary text-start"
              onClick={() => { setSelectedStage(stage); navigate('/candidates'); }}
            >
              View {candidates.length - 3} more
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="card border shadow-none">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary-light mb-0">Loading pipeline...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
          <AlertCircle size={20} className="me-2" />
          <div className="flex-grow-1">{error}</div>
          <button type="button" className="btn refresh-btn d-inline-flex align-items-center gap-2" onClick={fetchCandidates}>
            <Icon icon="heroicons:arrow-path" style={{ width: 16, height: 16 }} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Page Header - ref JobList */}
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h4 className="fw-bold h4 d-flex align-items-center gap-2 mb-0">
            <Icon icon="heroicons:view-columns" className="text-black" style={{ fontSize: 28 }} />
            Recruitment Pipeline
          </h4>
          <p className="text-secondary-light mb-0 mt-1">Track candidates through each stage</p>
        </div>
        <button
          type="button"
          className="btn refresh-btn d-flex align-items-center gap-2"
          onClick={fetchCandidates}
        >
          <Icon icon="heroicons:arrow-path" style={{ width: 16, height: 16 }} />
          Refresh
        </button>
      </div>

      {/* KPI row - ref JobList */}
      <div className="kpi-row mb-4">
        {[
          { title: 'Total Candidates', value: candidates.length, icon: 'heroicons:user-group', bg: 'kpi-primary', color: 'kpi-primary-text' },
          { title: 'Applied', value: stages.Applied.length, icon: 'heroicons:user-plus', bg: 'kpi-info', color: 'kpi-info-text' },
          { title: 'In Interview', value: stages.Interview.length, icon: 'heroicons:chat-bubble-left-right', bg: 'kpi-warning', color: 'kpi-warning-text' },
          { title: 'Hired', value: stages.Hired.length, icon: 'heroicons:check-badge', bg: 'kpi-success', color: 'kpi-success-text' }
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

      {/* Search and Filter - ref JobList: card */}
      <div className="card border shadow-none mb-4">
        <div className="card-body d-flex flex-wrap gap-3 align-items-center">
          <div className="position-relative flex-fill" style={{ minWidth: '260px' }}>
            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" style={{ pointerEvents: 'none', fontSize: 18 }} />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="form-select w-auto"
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
          >
            <option value="all">All Stages</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Pipeline Stages - cards in grid */}
      <div className="row g-3 mb-4">
        {['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'].map((stage) => (
          <div key={stage} className="col-12 col-sm-6 col-lg-4">
            <StageCard stage={stage} candidates={stages[stage]} bgClass={stageBgMap[stage] || 'kpi-primary'} />
          </div>
        ))}
      </div>

      {/* Pipeline Flow - card */}
      <div className="card border shadow-none mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-4 text-dark">Pipeline Flow</h5>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            {Object.entries(stages).map(([stage, stageCandidates], index) => (
              <React.Fragment key={stage}>
                <div className="text-center">
                  <div className={`rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold mb-2 ${
                    stage === 'Applied' ? 'bg-primary' : stage === 'Screening' ? 'bg-warning' : stage === 'Interview' ? 'bg-info' :
                    stage === 'Offer' ? 'bg-primary' : stage === 'Hired' ? 'bg-success' : 'bg-danger'
                  }`} style={{ width: 48, height: 48 }}>
                    {stageCandidates.length}
                  </div>
                  <p className="small fw-medium mb-0 text-dark">{stage}</p>
                  <p className="small text-muted mb-0">{stageCandidates.length} candidates</p>
                </div>
                {index < Object.keys(stages).length - 1 && (
                  <Icon icon="heroicons:chevron-right" className="text-muted" style={{ fontSize: 20 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate List - card */}
      {selectedStage !== 'all' && (
        <div className="card border shadow-none">
          <div className="card-body">
            <h5 className="fw-semibold mb-4 text-dark">
              {selectedStage} Candidates ({filteredCandidates.length})
            </h5>
            <div className="d-grid gap-2">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                      <span className="small fw-medium text-primary">{candidate.name?.charAt(0) || '?'}</span>
                    </div>
                    <div>
                      <p className="small fw-medium mb-0 text-dark">{candidate.name}</p>
                      <p className="small text-muted mb-0">{candidate.role}</p>
                      <p className="small text-secondary mb-0">{candidate.email}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${
                      candidate.stage === 'Applied' ? 'bg-primary-subtle text-primary' :
                      candidate.stage === 'Screening' ? 'bg-warning-subtle text-warning' :
                      candidate.stage === 'Interview' ? 'bg-info-subtle text-info' :
                      candidate.stage === 'Offer' ? 'bg-primary-subtle text-primary' :
                      candidate.stage === 'Hired' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'
                    }`}>
                      {candidate.stage}
                    </span>
                    <button
                      type="button"
                      className="job-listings-btn"
                      title="View"
                      onClick={() => navigate('/candidates')}
                    >
                      <Icon icon="heroicons:eye" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineOverview;
